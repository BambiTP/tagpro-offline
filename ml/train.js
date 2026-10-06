#!/usr/bin/env node
// train.js - trains the boost-drill agent headless with PPO, on the real engine (env.js), using
// every CPU core (worker threads: each runs its own games and computes gradients for its share).
//   node ml/train.js                         train with the defaults, save ml/models/boost-policy.json
//   node ml/train.js --steps 2e7 --blocks 4  longer, with random wall blocks in the arena
//   node ml/train.js --resume                keep training the saved model
// Options: --steps N  --envs N (games per worker)  --nsteps N (decisions per game per update)
//   --epochs N  --mb N (minibatch)  --lr X  --ent X (entropy bonus)  --pickup boost|bomb|both
//   --onpath X (chance the pickup is put on the way to the target; curriculum, default 0.5)
//   --size N  --blocks N  --seed N  --workers N  --hidden N  --eval N  --out FILE  --resume
const fs = require('fs');
const path = require('path');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { BoostEnv, ACTIONS, OBS_SIZE, rng } = require('./env');
const { MLP, Adam, softmax, sample } = require('./nn');

// the networks' weights live in SharedArrayBuffers: the main thread updates them, workers read them
function sharedNet(sizes, buf) {
  const net = new MLP(sizes, () => 0.5);
  let off = 0;
  for (let l = 0; l < net.W.length; l++) {
    net.W[l] = new Float64Array(buf, off * 8, net.W[l].length); off += net.W[l].length;
    net.b[l] = new Float64Array(buf, off * 8, net.b[l].length); off += net.b[l].length;
  }
  return net;
}
const netLength = (sizes) => { let n = 0; for (let l = 0; l + 1 < sizes.length; l++) n += sizes[l] * sizes[l + 1] + sizes[l + 1]; return n; };

if (isMainThread) main();
else workerMain();

// ================= worker: plays games, computes gradients for its share =================
function workerMain() {
  const w = workerData, o = w.opt;
  const pi = sharedNet(w.piSizes, w.piBuf), vf = sharedNet(w.vfSizes, w.vfBuf);
  const gPiAll = new Float64Array(w.gPiBuf), gVAll = new Float64Array(w.gVBuf);
  const rand = rng(o.seed * 7919 + w.id);
  const envs = Array.from({ length: o.envs }, (_, i) => new BoostEnv(Object.assign({ seed: o.seed * 1000 + w.id * 100 + i }, w.envOpts)));
  let obs = envs.map((e) => e.reset());
  const N = o.envs * o.nsteps;
  const buf = {
    obs: new Array(N), act: new Int32Array(N), logp: new Float64Array(N), val: new Float64Array(N),
    rew: new Float64Array(N), done: new Uint8Array(N), adv: new Float64Array(N), ret: new Float64Array(N),
  };
  let idx = null;

  function collect() {
    const episodes = [];
    for (let t = 0; t < o.nsteps; t++) {
      for (let e = 0; e < o.envs; e++) {
        const i = t * o.envs + e, ob = obs[e];
        const p = softmax(pi.predict(ob)), a = sample(p, rand);
        buf.obs[i] = ob; buf.act[i] = a; buf.logp[i] = Math.log(p[a] + 1e-12); buf.val[i] = vf.predict(ob)[0];
        const r = envs[e].step(a);
        let rew = r.reward;
        if (r.truncated) rew += o.gamma * vf.predict(r.obs)[0]; // time limit: not a real ending, bootstrap
        buf.rew[i] = rew; buf.done[i] = r.done || r.truncated ? 1 : 0;
        if (r.done || r.truncated) { episodes.push(r.info); obs[e] = envs[e].reset(); } else obs[e] = r.obs;
      }
    }
    // generalized advantage estimation
    const last = obs.map((ob) => vf.predict(ob)[0]);
    let sum = 0, sq = 0;
    for (let e = 0; e < o.envs; e++) {
      let gae = 0;
      for (let t = o.nsteps - 1; t >= 0; t--) {
        const i = t * o.envs + e;
        const nextV = buf.done[i] ? 0 : (t === o.nsteps - 1 ? last[e] : buf.val[i + o.envs]);
        const delta = buf.rew[i] + o.gamma * nextV - buf.val[i];
        gae = delta + o.gamma * o.lam * (buf.done[i] ? 0 : gae);
        buf.adv[i] = gae; buf.ret[i] = gae + buf.val[i];
        sum += gae; sq += gae * gae;
      }
    }
    return { episodes, sum, sq, n: N };
  }

  // gradient sums (not averaged) over minibatch k of this worker's (shuffled) samples
  function grads(k, mbLocal, advMean, advStd, total) {
    const gPi = pi.zeroGrads(), gV = vf.zeroGrads();
    const st = { piLoss: 0, vLoss: 0, ent: 0, clipped: 0, kl: 0, n: 0 };
    for (let s = k * mbLocal; s < (k + 1) * mbLocal; s++) {
      const i = idx[s], A = (buf.adv[i] - advMean) / advStd, a = buf.act[i];
      const acts = pi.forward(buf.obs[i]);
      const p = softmax(acts[acts.length - 1]);
      const logp = Math.log(p[a] + 1e-12), ratio = Math.exp(logp - buf.logp[i]);
      let H = 0;
      for (const q of p) if (q > 0) H -= q * Math.log(q);
      // clipped surrogate: the gradient flows only through the unclipped branch
      const active = A >= 0 ? ratio < 1 + o.clip : ratio > 1 - o.clip;
      const dLogp = active ? -A * ratio : 0;
      const dz = new Float64Array(p.length);
      for (let j = 0; j < p.length; j++) {
        dz[j] = dLogp * ((j === a ? 1 : 0) - p[j]) + o.ent * p[j] * (Math.log(p[j] + 1e-12) + H); // + d(-ent*H)
        dz[j] /= total;
      }
      pi.backward(acts, dz, gPi);
      const vacts = vf.forward(buf.obs[i]), v = vacts[vacts.length - 1][0];
      vf.backward(vacts, [(v - buf.ret[i]) / total], gV);
      st.piLoss += -Math.min(ratio * A, Math.max(1 - o.clip, Math.min(1 + o.clip, ratio)) * A);
      st.vLoss += 0.5 * (v - buf.ret[i]) ** 2; st.ent += H; st.clipped += active ? 0 : 1; st.kl += buf.logp[i] - logp; st.n++;
    }
    // flatten into this worker's slot of the shared gradient buffers
    let off = 0;
    for (const g of gPi) { gPiAll.set(g, w.id * w.piLen + off); off += g.length; }
    off = 0;
    for (const g of gV) { gVAll.set(g, w.id * w.vfLen + off); off += g.length; }
    return st;
  }

  parentPort.on('message', (m) => {
    if (m.cmd === 'collect') parentPort.postMessage(collect());
    else if (m.cmd === 'shuffle') {
      idx = Array.from({ length: N }, (_, i) => i);
      for (let i = N - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
      parentPort.postMessage(true);
    } else if (m.cmd === 'grads') parentPort.postMessage(grads(m.k, m.mbLocal, m.advMean, m.advStd, m.total));
  });
}

// ================= main: Adam updates, logging, evaluation, saving =================
function main() {
  const { evaluate } = require('./evaluate');
  const args = (() => {
    const a = process.argv.slice(2), o = {};
    for (let i = 0; i < a.length; i++) {
      if (!a[i].startsWith('--')) continue;
      const k = a[i].slice(2), v = a[i + 1];
      if (v === undefined || v.startsWith('--')) o[k] = true; else { o[k] = isNaN(Number(v)) ? v : Number(v); i++; }
    }
    return o;
  })();
  const opt = Object.assign({
    steps: 8e6, envs: 8, nsteps: 128, epochs: 4, mb: 1024, lr: 1e-3, ent: 0.02, onpath: 0.5, gamma: 0.99, lam: 0.95,
    clip: 0.2, pickup: 'both', size: 22, blocks: 0, seed: 1, hidden: 64, eval: 500,
    workers: Math.max(1, Math.min(8, os.cpus().length)),
    out: path.join(__dirname, 'models', 'boost-policy.json'),
  }, args);
  const envOpts = { size: opt.size, blocks: opt.blocks, pickup: opt.pickup, onPath: opt.onpath };

  const piSizes = [OBS_SIZE, opt.hidden, opt.hidden, ACTIONS.length], vfSizes = [OBS_SIZE, opt.hidden, opt.hidden, 1];
  const piLen = netLength(piSizes), vfLen = netLength(vfSizes);
  const piBuf = new SharedArrayBuffer(piLen * 8), vfBuf = new SharedArrayBuffer(vfLen * 8);
  const pi = sharedNet(piSizes, piBuf), vf = sharedNet(vfSizes, vfBuf);
  let prev = null;
  if (opt.resume && fs.existsSync(opt.out)) {
    prev = JSON.parse(fs.readFileSync(opt.out, 'utf8'));
    const a = MLP.fromJSON(prev.policy), b = MLP.fromJSON(prev.value);
    if (String(a.sizes) !== String(piSizes)) throw new Error(`saved model has layers ${a.sizes}, not ${piSizes} (--hidden)`);
    pi.params().forEach((p, k) => p.set(a.params()[k])); vf.params().forEach((p, k) => p.set(b.params()[k]));
    console.log('resuming', path.relative(process.cwd(), opt.out), `(${(prev.trainedSteps / 1e6).toFixed(2)}M steps)`);
  } else {
    const rand = rng(opt.seed);
    const a = new MLP(piSizes, rand, 0.01), b = new MLP(vfSizes, rand, 1);
    pi.params().forEach((p, k) => p.set(a.params()[k])); vf.params().forEach((p, k) => p.set(b.params()[k]));
  }
  const piOpt = new Adam(pi.params(), opt.lr), vfOpt = new Adam(vf.params(), opt.lr);
  const W = opt.workers;
  const gPiBuf = new SharedArrayBuffer(W * piLen * 8), gVBuf = new SharedArrayBuffer(W * vfLen * 8);
  const gPiAll = new Float64Array(gPiBuf), gVAll = new Float64Array(gVBuf);
  const workers = Array.from({ length: W }, (_, id) => new Worker(__filename, {
    workerData: { id, opt, envOpts, piSizes, vfSizes, piBuf, vfBuf, gPiBuf, gVBuf, piLen, vfLen },
  }));
  for (const wk of workers) {
    wk.on('message', (m) => wk.reply(m));
    wk.on('error', (e) => { console.error('worker failed:', e); process.exit(1); });
  }
  const ask = (wk, msg) => new Promise((ok) => { wk.reply = ok; wk.postMessage(msg); });
  const all = (msg) => Promise.all(workers.map((wk) => ask(wk, msg)));

  // sum the workers' gradient slots into per-parameter arrays
  function summed(all, len, net) {
    const out = net.zeroGrads();
    for (let w = 0; w < W; w++) {
      let off = w * len;
      for (const g of out) { for (let i = 0; i < g.length; i++) g[i] += all[off + i]; off += g.length; }
    }
    return out;
  }

  const N = W * opt.envs * opt.nsteps, perWorker = opt.envs * opt.nsteps;
  const mbLocal = Math.max(1, Math.floor(opt.mb / W)), nMb = Math.floor(perWorker / mbLocal);
  const updates = Math.ceil(opt.steps / N);
  let totalSteps = (prev && prev.trainedSteps) || 0;
  // a checkpoint is kept when it beats the best so far, measured as time saved vs the straight-line
  // driver on the same episodes
  let best = prev && prev.stats ? prev.stats.agent.meanSeconds - prev.stats.baseline.meanSeconds : Infinity;
  let recent = [];
  const pct = (x) => (100 * x).toFixed(0) + '%';

  function save(stats) {
    fs.mkdirSync(path.dirname(opt.out), { recursive: true });
    fs.writeFileSync(opt.out, JSON.stringify({
      name: 'boost-drill', obsSize: OBS_SIZE, actions: ACTIONS, env: Object.assign({ repeat: 3 }, envOpts),
      trainedSteps: totalSteps, stats, policy: pi.toJSON(), value: vf.toJSON(),
    }));
  }

  (async () => {
    console.log(`PPO: ${updates} updates x ${N} steps (${W} workers x ${opt.envs} games), pickup=${opt.pickup}, arena ${opt.size} tiles, ${opt.blocks} wall blocks`);
    const t0 = Date.now();
    for (let u = 1; u <= updates; u++) {
      const res = await all({ cmd: 'collect' });
      totalSteps += N;
      let sum = 0, sq = 0, n = 0;
      for (const r of res) { recent.push(...r.episodes); sum += r.sum; sq += r.sq; n += r.n; }
      const advMean = sum / n, advStd = Math.sqrt(Math.max(0, sq / n - advMean * advMean)) + 1e-8;
      const lr = opt.lr * Math.max(0.05, 1 - (u - 1) / updates);
      piOpt.lr = lr; vfOpt.lr = lr;
      const st = { piLoss: 0, vLoss: 0, ent: 0, clipped: 0, kl: 0, n: 0 };
      for (let ep = 0; ep < opt.epochs; ep++) {
        await all({ cmd: 'shuffle' });
        for (let k = 0; k < nMb; k++) {
          const parts = await all({ cmd: 'grads', k, mbLocal, advMean, advStd, total: mbLocal * W });
          for (const p of parts) for (const key in st) st[key] += p[key];
          piOpt.step(summed(gPiAll, piLen, pi), 0.5);
          vfOpt.step(summed(gVAll, vfLen, vf), 0.5);
        }
      }
      if (u % 5 === 0 || u === updates) {
        const eps = recent; recent = [];
        const reach = eps.filter((e) => e.reached), used = eps.filter((e) => e.used);
        const secs = reach.reduce((a, e) => a + e.seconds, 0) / (reach.length || 1);
        const sps = Math.round((totalSteps - ((prev && prev.trainedSteps) || 0)) / ((Date.now() - t0) / 1000));
        console.log(`upd ${u}/${updates} ${(totalSteps / 1e6).toFixed(2)}M steps  eps ${eps.length}  reach ${pct(reach.length / (eps.length || 1))}  ` +
          `time ${secs.toFixed(2)}s  pickup used ${pct(used.length / (eps.length || 1))}  ent ${(st.ent / st.n).toFixed(2)}  kl ${(st.kl / st.n).toFixed(4)}  ` +
          `clip ${pct(st.clipped / st.n)}  vloss ${(st.vLoss / st.n).toFixed(3)}  ${sps} steps/s`);
      }
      if (u % 25 === 0 || u === updates) {
        const ev = evaluate(pi, Object.assign({ episodes: opt.eval, seed: 777 }, envOpts));
        const kinds = Object.entries(ev.agent.byKind).map(([k, v]) => `${k} ${v.meanSeconds.toFixed(2)}s/used ${pct(v.usedRate)}`).join(', ');
        console.log(`  eval: agent ${ev.agent.meanSeconds.toFixed(2)}s reach ${pct(ev.agent.reachRate)} (${kinds}) vs straight line ${ev.baseline.meanSeconds.toFixed(2)}s`);
        const score = ev.agent.meanSeconds - ev.baseline.meanSeconds;
        if (score < best && ev.agent.reachRate >= 0.98) {
          best = score;
          save(Object.assign({ trainedSteps: totalSteps }, ev));
          console.log('  saved', path.relative(process.cwd(), opt.out));
        }
      }
    }
    for (const wk of workers) wk.terminate();
  })().catch((e) => { console.error(e); process.exit(1); });
}

#!/usr/bin/env node
// evaluate.js - plays the same random episodes with the trained agent and with a "steer straight at
// the target" baseline, and compares how fast each gets there.
//   node ml/evaluate.js [model.json] [--episodes N] [--blocks N] [--pickup boost|bomb|both] [--onpath X]
const { BoostEnv, straightLine } = require('./env');
const { MLP, softmax, argmax } = require('./nn');

// net: an MLP (the policy) or a function obs -> action
function run(act, envOpts, episodes, seed) {
  const env = new BoostEnv(Object.assign({}, envOpts, { seed }));
  const out = { episodes, reached: 0, used: 0, seconds: 0, byKind: {} };
  for (let i = 0; i < episodes; i++) {
    let o = env.reset(), r;
    do { r = env.step(act(o)); o = r.obs; } while (!r.done && !r.truncated);
    const k = out.byKind[r.info.kind] || (out.byKind[r.info.kind] = { n: 0, used: 0, seconds: 0 });
    k.n++; k.used += r.info.used; k.seconds += r.info.seconds;
    out.reached += r.info.reached; out.used += r.info.used; out.seconds += r.info.seconds;
  }
  for (const k of Object.values(out.byKind)) { k.meanSeconds = k.seconds / k.n; k.usedRate = k.used / k.n; }
  return Object.assign(out, { reachRate: out.reached / episodes, usedRate: out.used / episodes, meanSeconds: out.seconds / episodes });
}

function evaluate(net, opts = {}) {
  const envOpts = { size: opts.size, blocks: opts.blocks, pickup: opts.pickup, onPath: opts.onPath };
  const episodes = opts.episodes || 400, seed = opts.seed || 777;
  const policy = typeof net === 'function' ? net : (o) => argmax(softmax(net.predict(o)));
  return { agent: run(policy, envOpts, episodes, seed), baseline: run(straightLine, envOpts, episodes, seed) };
}

module.exports = { evaluate };

if (require.main === module) {
  const path = require('path'), fs = require('fs');
  const a = process.argv.slice(2);
  const flag = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? (isNaN(+a[i + 1]) ? a[i + 1] : +a[i + 1]) : d; };
  const file = a.find((x) => x.endsWith('.json')) || path.join(__dirname, 'models', 'boost-policy.json');
  const model = JSON.parse(fs.readFileSync(file, 'utf8'));
  const opts = Object.assign({}, model.env, { episodes: flag('episodes', 1000), seed: flag('seed', 12345) });
  if (flag('blocks') != null) opts.blocks = flag('blocks');
  if (flag('pickup') != null) opts.pickup = flag('pickup');
  if (flag('onpath') != null) opts.onPath = flag('onpath');
  const r = evaluate(MLP.fromJSON(model.policy), opts);
  const line = (name, x) => {
    const kinds = Object.entries(x.byKind).map(([k, v]) => `${k}: ${v.meanSeconds.toFixed(2)}s, used ${(100 * v.usedRate).toFixed(0)}%`).join('; ');
    console.log(`${name.padEnd(14)} reach ${(100 * x.reachRate).toFixed(1)}%  mean ${x.meanSeconds.toFixed(2)}s  pickup used ${(100 * x.usedRate).toFixed(0)}%  (${kinds})`);
  };
  console.log(`${opts.episodes} episodes, arena ${opts.size || 30} tiles, ${opts.blocks || 0} wall blocks, pickup ${opts.pickup || 'both'}, on the way ${Math.round(100 * (opts.onPath || 0))}% of the time`);
  line('agent', r.agent);
  line('straight line', r.baseline);
  console.log(`agent is ${(100 * (1 - r.agent.meanSeconds / r.baseline.meanSeconds)).toFixed(1)}% faster on average`);
}

// nn.js - a tiny dependency-free neural net: a tanh MLP with hand-written backprop, and Adam.
// Enough for small policies; runs in Node and the browser (globalThis.TPNN).
(function () {

function gaussian(rand) {
  const u = Math.max(rand(), 1e-12), v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

class MLP {
  // sizes: [in, hidden..., out]; outScale shrinks the last layer's initial weights (0.01 for a
  // policy: starts close to uniform)
  constructor(sizes, rand = Math.random, outScale = 1) {
    this.sizes = sizes.slice();
    this.W = []; this.b = [];
    for (let l = 0; l + 1 < sizes.length; l++) {
      const n = sizes[l], m = sizes[l + 1], last = l + 2 === sizes.length;
      const W = new Float64Array(m * n), s = (last ? outScale : Math.sqrt(2)) / Math.sqrt(n);
      for (let i = 0; i < W.length; i++) W[i] = gaussian(rand) * s;
      this.W.push(W); this.b.push(new Float64Array(m));
    }
  }

  params() { const out = []; for (let l = 0; l < this.W.length; l++) out.push(this.W[l], this.b[l]); return out; }
  zeroGrads() { return this.params().map((p) => new Float64Array(p.length)); }

  // returns every layer's activations: [x, h1, ..., out] (hidden: tanh, out: linear)
  forward(x) {
    const acts = [x];
    let a = x;
    for (let l = 0; l < this.W.length; l++) {
      const W = this.W[l], b = this.b[l], n = this.sizes[l], m = this.sizes[l + 1];
      const z = new Float64Array(m), last = l + 1 === this.W.length;
      for (let j = 0; j < m; j++) {
        let s = b[j];
        const row = j * n;
        for (let i = 0; i < n; i++) s += W[row + i] * a[i];
        z[j] = last ? s : Math.tanh(s);
      }
      acts.push(z);
      a = z;
    }
    return acts;
  }

  predict(x) { const a = this.forward(x); return a[a.length - 1]; }

  // adds d(loss)/d(params) to grads (from zeroGrads()), given d(loss)/d(out)
  backward(acts, dOut, grads) {
    let d = dOut;
    for (let l = this.W.length - 1; l >= 0; l--) {
      const W = this.W[l], n = this.sizes[l], m = this.sizes[l + 1], a = acts[l];
      const gW = grads[2 * l], gb = grads[2 * l + 1];
      const prev = l > 0 ? new Float64Array(n) : null;
      for (let j = 0; j < m; j++) {
        const dj = d[j];
        if (dj === 0) continue;
        gb[j] += dj;
        const row = j * n;
        for (let i = 0; i < n; i++) {
          gW[row + i] += dj * a[i];
          if (prev) prev[i] += dj * W[row + i];
        }
      }
      if (prev) { for (let i = 0; i < n; i++) prev[i] *= 1 - a[i] * a[i]; d = prev; } // tanh'
    }
  }

  toJSON() { return { sizes: this.sizes, W: this.W.map((w) => Array.from(w, (v) => +v.toPrecision(7))), b: this.b.map((w) => Array.from(w, (v) => +v.toPrecision(7))) }; }
  static fromJSON(j) {
    const m = new MLP(j.sizes, () => 0.5);
    m.W = j.W.map((w) => Float64Array.from(w)); m.b = j.b.map((w) => Float64Array.from(w));
    return m;
  }
}

class Adam {
  constructor(params, lr = 3e-4, b1 = 0.9, b2 = 0.999, eps = 1e-8) {
    this.params = params; this.lr = lr; this.b1 = b1; this.b2 = b2; this.eps = eps; this.t = 0;
    this.m = params.map((p) => new Float64Array(p.length));
    this.v = params.map((p) => new Float64Array(p.length));
  }
  // grads: same shapes as params; maxNorm: clip the global gradient norm
  step(grads, maxNorm = Infinity) {
    let norm = 0;
    for (const g of grads) for (let i = 0; i < g.length; i++) norm += g[i] * g[i];
    norm = Math.sqrt(norm);
    const scale = norm > maxNorm ? maxNorm / norm : 1;
    this.t++;
    const c1 = 1 - this.b1 ** this.t, c2 = 1 - this.b2 ** this.t;
    for (let k = 0; k < this.params.length; k++) {
      const p = this.params[k], g = grads[k], m = this.m[k], v = this.v[k];
      for (let i = 0; i < p.length; i++) {
        const gi = g[i] * scale;
        m[i] = this.b1 * m[i] + (1 - this.b1) * gi;
        v[i] = this.b2 * v[i] + (1 - this.b2) * gi * gi;
        p[i] -= this.lr * (m[i] / c1) / (Math.sqrt(v[i] / c2) + this.eps);
      }
    }
    return norm;
  }
}

function softmax(z) {
  let mx = -Infinity;
  for (const v of z) if (v > mx) mx = v;
  const p = new Float64Array(z.length);
  let s = 0;
  for (let i = 0; i < z.length; i++) { p[i] = Math.exp(z[i] - mx); s += p[i]; }
  for (let i = 0; i < z.length; i++) p[i] /= s;
  return p;
}

function sample(p, rand = Math.random) {
  let r = rand();
  for (let i = 0; i < p.length; i++) { r -= p[i]; if (r <= 0) return i; }
  return p.length - 1;
}

function argmax(a) { let b = 0; for (let i = 1; i < a.length; i++) if (a[i] > a[b]) b = i; return b; }

const api = { MLP, Adam, softmax, sample, argmax, gaussian };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else globalThis.TPNN = api;
})();

// policy.js - a trained boost-drill policy (the JSON train.js writes): observation -> action, and
// BoostDriver, which attaches the policy to any player of a live GameRoom and drives it to a point,
// using the nearest boost or bomb when that's faster. Node or browser (globalThis.TPBoostPolicy).
(function () {
const isNode = typeof module !== 'undefined' && module.exports;
const { MLP, softmax, sample, argmax } = isNode ? require('./nn') : globalThis.TPNN;
const { ACTIONS, TARGET_RADIUS, observe, distanceField, waypoint } = isNode ? require('./env') : globalThis.TPBoostEnv;
const TILE = 0.4;

class Policy {
  constructor(model) {
    this.model = model;
    this.net = MLP.fromJSON(model.policy);
  }
  probs(obs) { return softmax(this.net.predict(obs)); }
  // greedy: the most likely action (what you want when playing); otherwise sample like in training
  act(obs, greedy = true) { const p = this.probs(obs); return greedy ? argmax(p) : sample(p); }
}

// boosts and bombs a player can use: 5 boost, 10 bomb, 14/15 red/blue team boosts. A used one is a
// string ("5.1", "10.1"...) until it respawns
function pickupsIn(tiles, team) {
  const out = [];
  for (let x = 0; x < tiles.length; x++) for (let y = 0; y < tiles[0].length; y++) {
    const t = tiles[x][y];
    if (t === 5 || (t === 14 && team === 1) || (t === 15 && team === 2)) out.push({ x, y, kind: 'boost', available: true });
    else if (t === 10) out.push({ x, y, kind: 'bomb', available: true });
  }
  return out;
}

class BoostDriver {
  // room: a GameRoom; player: one of its players (room.players[id]); opts.repeat: ticks per decision
  // (3, as trained); opts.pickupRange: only consider pickups this close (tiles); opts.greedy
  constructor(policy, room, player, opts = {}) {
    this.policy = policy; this.room = room; this.player = player;
    this.repeat = opts.repeat || 3;
    this.pickupRange = opts.pickupRange || 8;
    this.greedy = opts.greedy !== false;
    this.target = null; this.ticks = 0; this.seq = 1;
    this.keys = { up: false, down: false, left: false, right: false };
  }

  // where to go, in metres (tile * 0.4), or null to stop and let go of the keys. Walls in the way are
  // gone around (shortest path, recomputed when the target changes)
  setTarget(t) {
    this.target = t;
    this.field = t ? distanceField(this.room.tiles, Math.round(t.x / TILE), Math.round(t.y / TILE)) : null;
    if (!t) this.press(0);
  }

  arrived() {
    if (!this.target || this.player.dead) return false;
    const p = this.player.body.GetPosition();
    return Math.hypot(this.target.x - p.x, this.target.y - p.y) < TARGET_RADIUS;
  }

  // the pickup the policy is told about: the nearest one still there
  pickup(ball) {
    let best = null, bd = Infinity;
    for (const k of pickupsIn(this.room.tiles, this.player.team)) {
      const d = Math.hypot(k.x * TILE - ball.x, k.y * TILE - ball.y);
      if (d < bd && d < this.pickupRange * TILE) { best = k; bd = d; }
    }
    return best;
  }

  // call once per room.step(); returns the action it pressed (or null between decisions)
  tick() {
    if (this.ticks++ % this.repeat !== 0) return null;
    const p = this.player;
    if (!this.target || p.dead) { this.press(0); return 0; }
    const pos = p.body.GetPosition(), v = p.body.GetLinearVelocity();
    const ball = { x: pos.x, y: pos.y, vx: v.x, vy: v.y };
    this.aim = waypoint(this.room.tiles, this.field, ball, this.target);
    const a = this.policy.act(observe(this.room.tiles, ball, this.aim, this.pickup(ball)), this.greedy);
    this.press(a);
    return a;
  }

  // arrow keys, through the room's normal input path (like a client's keydown / keyup)
  press(a) {
    const want = ACTIONS[a] || ACTIONS[0], client = this.player.client;
    for (const k of ['up', 'down', 'left', 'right']) {
      if (this.keys[k] === !!want[k]) continue;
      this.keys[k] = !!want[k];
      if (client) this.room.handle(client, this.keys[k] ? 'keydown' : 'keyup', { k, t: this.seq++ });
      else this.player.keys[k] = this.keys[k];
    }
  }
}

const api = { Policy, BoostDriver, pickupsIn };
if (isNode) module.exports = api;
else globalThis.TPBoostPolicy = api;
})();

// env.js - "boost drill": a reinforcement-learning environment built on the real game engine
// (engine/game.js, same Box2D physics as the game). Each episode puts the ball, ONE boost or bomb
// and a target at random places in an arena; the agent presses arrow keys and is rewarded for
// reaching the target as fast as possible, which it learns is often by using the boost / bomb.
//
// Headless and fast: the room is never start()ed; the env calls room.step() itself on a simulated
// clock, so episodes run as fast as the CPU allows. Isomorphic: Node (require) or the browser
// (load box2d.js, constants.js, game.js first; then this is globalThis.TPBoostEnv).
(function () {
const isNode = typeof module !== 'undefined' && module.exports;
const { GameRoom, T } = isNode ? require('../engine/game') : globalThis.TPGame;
const { PHYSICS: PH, STATES } = isNode ? require('../engine/constants') : globalThis.TPConstants;

const TICK_MS = 1000 / 60;
const TARGET_RADIUS = PH.BALL_RADIUS + 0.15; // touching it, like touching a flag
// actions: 0 = no keys, 1..8 = the 8 directions (as arrow-key combos)
const ACTIONS = [
  {}, { up: 1 }, { up: 1, right: 1 }, { right: 1 }, { down: 1, right: 1 },
  { down: 1 }, { down: 1, left: 1 }, { left: 1 }, { up: 1, left: 1 },
];
const RAY_DIRS = Array.from({ length: 8 }, (_, i) => [Math.cos(i * Math.PI / 4), Math.sin(i * Math.PI / 4)]);
const RAY_MAX = 4; // metres (10 tiles)
const OBS_SIZE = 19;

// small seeded RNG (mulberry32) so runs are reproducible
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// an arena: border walls, floor inside, optional random wall blocks. Column-major tiles[x][y]
function makeArena(size, blocks, rand) {
  const tiles = [];
  for (let x = 0; x < size; x++) {
    tiles[x] = [];
    for (let y = 0; y < size; y++) tiles[x][y] = (x === 0 || y === 0 || x === size - 1 || y === size - 1) ? T.WALL : T.FLOOR;
  }
  for (let i = 0; i < blocks; i++) {
    const w = 1 + Math.floor(rand() * 3), h = 1 + Math.floor(rand() * 3);
    const x0 = 2 + Math.floor(rand() * (size - 4 - w)), y0 = 2 + Math.floor(rand() * (size - 4 - h));
    for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) tiles[x][y] = T.WALL;
  }
  return tiles;
}

// distance (m) from (x, y) along (dx, dy) to the first wall, up to RAY_MAX
function ray(tiles, x, y, dx, dy) {
  const W = tiles.length, H = tiles[0].length;
  for (let d = 0.1; d < RAY_MAX; d += 0.1) {
    const tx = Math.round((x + dx * d) / PH.TILE), ty = Math.round((y + dy * d) / PH.TILE);
    if (tx < 0 || ty < 0 || tx >= W || ty >= H || Math.floor(tiles[tx][ty]) === T.WALL || Number(tiles[tx][ty]) === T.EMPTY) return d;
  }
  return RAY_MAX;
}

// the observation, from anything: tiles (column-major grid), ball { x, y, vx, vy } in metres, target
// { x, y } in metres, pickup { x, y (tile), kind: 'boost' | 'bomb', available } or null. The agent sees
// its velocity, where the target and the pickup are (relative), the pickup's kind and whether it's
// still there, and the distance to walls in 8 directions.
function observe(tiles, ball, target, pickup) {
  const tdx = target.x - ball.x, tdy = target.y - ball.y;
  const avail = pickup && pickup.available ? 1 : 0;
  const px = avail ? pickup.x * PH.TILE - ball.x : 0, py = avail ? pickup.y * PH.TILE - ball.y : 0;
  const o = new Float64Array(OBS_SIZE);
  o[0] = ball.vx / 5; o[1] = ball.vy / 5;
  o[2] = tdx / 5; o[3] = tdy / 5; o[4] = Math.hypot(tdx, tdy) / 5;
  o[5] = px / 5; o[6] = py / 5; o[7] = Math.hypot(px, py) / 5;
  o[8] = avail && pickup.kind === 'boost' ? 1 : 0;
  o[9] = avail && pickup.kind === 'bomb' ? 1 : 0;
  o[10] = avail;
  for (let i = 0; i < 8; i++) o[11 + i] = 1 - ray(tiles, ball.x, ball.y, RAY_DIRS[i][0], RAY_DIRS[i][1]) / RAY_MAX;
  return o;
}

// a real map as a drill arena: its walls and void stay, everything else (flags, spikes, gates,
// its own boosts...) becomes floor
function drillTiles(tiles) {
  return tiles.map((col) => col.map((t) => { const n = Number(t); return Math.floor(n) === T.WALL || n === T.EMPTY ? n : T.FLOOR; }));
}

// ---- getting around walls: the agent is told to head for a waypoint, the farthest point along the
// shortest path to the target that it can roll to in a straight line (in an open arena: the target)
const open = (tiles, x, y) => tiles[x] !== undefined && y >= 0 && y < tiles[0].length && Math.floor(Number(tiles[x][y])) !== T.WALL && Number(tiles[x][y]) !== T.EMPTY && tiles[x][y] !== T.SPIKE;

// tiles -> steps to the target tile (8-way, no corner cutting); Int32Array, -1 = can't get there
function distanceField(tiles, tx, ty) {
  const W = tiles.length, H = tiles[0].length, d = new Int32Array(W * H).fill(-1);
  if (!open(tiles, tx, ty)) return d;
  const q = [tx * H + ty];
  d[q[0]] = 0;
  for (let i = 0; i < q.length; i++) {
    const x = Math.floor(q[i] / H), y = q[i] % H;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx, ny = y + dy;
      if ((!dx && !dy) || !open(tiles, nx, ny) || d[nx * H + ny] >= 0) continue;
      if (dx && dy && (!open(tiles, x + dx, y) || !open(tiles, x, y + dy))) continue;
      d[nx * H + ny] = d[q[i]] + 1;
      q.push(nx * H + ny);
    }
  }
  return d;
}

// can a ball roll straight from a to b (metres) without touching a wall?
function clearPath(tiles, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
  if (L < 1e-6) return true;
  const nx = -dy / L * 0.2, ny = dx / L * 0.2; // half a tile to each side: the ball's width plus a bit
  for (let s = 0; s <= L; s += 0.1) {
    const x = a.x + dx * s / L, y = a.y + dy * s / L;
    for (const k of [-1, 0, 1]) if (!open(tiles, Math.round((x + nx * k) / PH.TILE), Math.round((y + ny * k) / PH.TILE))) return false;
  }
  return true;
}

// the point to head for: the target if it's in a straight line, else the farthest tile along the
// shortest path that is (field from distanceField for that target)
function waypoint(tiles, field, ball, target) {
  if (clearPath(tiles, ball, target)) return target;
  const H = tiles[0].length;
  let x = Math.round(ball.x / PH.TILE), y = Math.round(ball.y / PH.TILE);
  if (!(field[x * H + y] > 0)) return target;
  let best = { x: x * PH.TILE, y: y * PH.TILE };
  for (let i = 0; i < 40 && field[x * H + y] > 0; i++) {
    let nx = x, ny = y;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const k = (x + dx) * H + y + dy;
      if (tiles[x + dx] === undefined || y + dy < 0 || y + dy >= H || field[k] < 0) continue;
      if (dx && dy && (!open(tiles, x + dx, y) || !open(tiles, x, y + dy))) continue;
      if (field[k] < field[nx * H + ny]) { nx = x + dx; ny = y + dy; }
    }
    if (nx === x && ny === y) break;
    x = nx; y = ny;
    const p = { x: x * PH.TILE, y: y * PH.TILE };
    if (!clearPath(tiles, ball, p)) break;
    best = p;
  }
  return field[x * H + y] === 0 && clearPath(tiles, ball, target) ? target : best;
}

class BoostEnv {
  // opts: size (tiles, incl. walls), blocks (random wall blocks per arena), maxSteps (decisions per
  // episode), repeat (physics ticks per decision: 3 = 20 decisions/s), pickup ('boost' | 'bomb' |
  // 'both' = random each episode), pickupNear ([min, max] tiles from the spawn to the pickup),
  // targetMin (tiles from the spawn to the target), onPath (chance the pickup is put near the straight
  // line from the spawn to the target: a curriculum, so the agent runs into pickups and learns what they
  // do), seed, tiles (play on this grid instead of an arena)
  constructor(opts = {}) {
    this.onPath = opts.onPath || 0;
    this.size = opts.size || 30;
    this.pickupNear = opts.pickupNear || [2, 7];
    this.targetMin = opts.targetMin || 12;
    this.blocks = opts.blocks || 0;
    this.maxSteps = opts.maxSteps || 240;
    this.repeat = opts.repeat || 3;
    this.pickupMode = opts.pickup || 'both';
    this.fixedTiles = opts.tiles || null;
    this.rand = rng(opts.seed == null ? (Math.random() * 2 ** 32) : opts.seed);
    this.clock = 0;
    this.room = null;
    this.episodes = 0;
  }

  // a fresh GameRoom for an arena (only needed when the walls change: pickups are just tiles)
  buildRoom(tiles) {
    const W = tiles.length, H = tiles[0].length;
    const floor = [];
    for (let x = 0; x < W; x++) for (let y = 0; y < H; y++) if (tiles[x][y] === T.FLOOR) floor.push({ x, y });
    const sp = floor[0];
    const map = { tiles, info: { name: 'Boost drill', author: 'ml' }, switches: {}, fields: {}, portals: {}, marsballs: [], spawnPoints: { red: [{ x: sp.x, y: sp.y }], blue: [{ x: sp.x, y: sp.y }] } };
    const room = new GameRoom({
      id: 'ml', map, settings: { time: 1e6, mercyRule: 0, noAfkKick: true, poosts: false, respawnWarnings: false },
      isPrivate: true, now: () => this.clock,
    });
    // timers on the simulated clock (boost/bomb respawns), not setTimeout
    this.timers = [];
    room.later = (ms, fn) => { const h = { at: this.clock + ms, fn }; this.timers.push(h); return h; };
    // skip the countdown
    this.clock += 20001;
    room.step();
    if (room.state !== STATES.ACTIVE) throw new Error('room did not start');
    const client = { emit() {}, disconnect() {} };
    room.addClient(client, { publicId: 'agent', name: 'Agent', auth: null }, { team: 1 });
    this.room = room;
    this.player = room.players[client.playerId];
    this.floor = floor;
    this.tiles = tiles;
  }

  runTimers() {
    if (!this.timers.length) return;
    const due = this.timers.filter((h) => h.at <= this.clock);
    if (!due.length) return;
    this.timers = this.timers.filter((h) => h.at > this.clock);
    for (const h of due) h.fn();
  }

  place(x, y, v) { this.room.bumpTile(x, y); this.room.setTile(x, y, v, true); }

  // tiles a ball can roll to from `from` (8-way, no corner cutting): a Set of x * 1000 + y
  reachable(from) {
    const t = this.tiles, open = (x, y) => t[x] && t[x][y] === T.FLOOR;
    const seen = new Set([from.x * 1000 + from.y]), q = [from];
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const x = c.x + dx, y = c.y + dy, k = x * 1000 + y;
        if (seen.has(k) || !open(x, y) || (dx && dy && (!open(c.x + dx, c.y) || !open(c.x, c.y + dy)))) continue;
        seen.add(k); q.push({ x, y });
      }
    }
    return seen;
  }

  pickFloor(ok) {
    for (let i = 0; i < 500; i++) {
      const t = this.floor[Math.floor(this.rand() * this.floor.length)];
      if (ok(t)) return t;
    }
    return null;
  }

  reset() {
    this.episodes++;
    if (!this.room || (this.blocks && !this.fixedTiles)) {
      this.buildRoom(this.fixedTiles ? drillTiles(this.fixedTiles) : makeArena(this.size, this.blocks, this.rand));
    } else if (this.pickup) this.place(this.pickup.x, this.pickup.y, T.FLOOR); // same room: take the last one away
    this.timers = [];
    const far = (a, b, d) => Math.hypot(a.x - b.x, a.y - b.y) >= d;
    let spawn, pickup, target;
    for (let tries = 0; tries < 60; tries++) {
      const relax = Math.max(0.2, 1 - tries / 40); // small maps: settle for closer targets and pickups
      spawn = this.pickFloor(() => true);
      const reach = this.fixedTiles ? this.reachable(spawn) : null; // real maps: no closed-off targets
      target = this.pickFloor((t) => far(t, spawn, this.targetMin * relax) && (!reach || reach.has(t.x * 1000 + t.y)));
      if (!target) continue;
      if (this.rand() < this.onPath) {
        // along the line, 2..7 tiles out, up to a tile to either side
        const L = Math.hypot(target.x - spawn.x, target.y - spawn.y), ux = (target.x - spawn.x) / L, uy = (target.y - spawn.y) / L;
        const d = this.pickupNear[0] + this.rand() * (this.pickupNear[1] - this.pickupNear[0]), side = (this.rand() * 2 - 1) * 1.2;
        const x = Math.round(spawn.x + ux * d - uy * side), y = Math.round(spawn.y + uy * d + ux * side);
        pickup = this.tiles[x] && this.tiles[x][y] === T.FLOOR && far({ x, y }, spawn, 2) && far({ x, y }, target, 2) ? { x, y } : null;
      } else pickup = this.pickFloor((t) => far(t, spawn, this.pickupNear[0]) && !far(t, spawn, this.pickupNear[1] / relax) && far(t, target, 2));
      if (pickup) break;
    }
    if (!pickup) throw new Error('this map is too small for a drill (needs room for a ball, a pickup and a target)');
    const kind = this.pickupMode === 'both' ? (this.rand() < 0.5 ? 'boost' : 'bomb') : this.pickupMode;
    this.pickup = { x: pickup.x, y: pickup.y, kind, base: kind === 'boost' ? T.BOOST : T.BOMB };
    this.place(pickup.x, pickup.y, this.pickup.base);
    this.target = { x: target.x * PH.TILE, y: target.y * PH.TILE, tx: target.x, ty: target.y };

    const p = this.player, V = p.body.GetPosition().constructor;
    for (const k in p.keys) p.keys[k] = false;
    p.body.SetPosition(new V(spawn.x * PH.TILE, spawn.y * PH.TILE));
    p.body.SetLinearVelocity(new V(0, 0));
    p.body.SetAngularVelocity(0);
    p.onPickups = new Set();
    this.steps = 0;
    this.used = false;
    this.usedAt = null;
    this.reached = false;
    this.field = this.blocks || this.fixedTiles ? distanceField(this.room.tiles, target.x, target.y) : null;
    this.lastDist = this.pathDist();
    return this.observe();
  }

  pos() { return this.player.body.GetPosition(); }
  dist() { const p = this.pos(); return Math.hypot(this.target.x - p.x, this.target.y - p.y); }
  // how far is left to go (for the reward): with walls, to the waypoint and then along the path
  pathDist() {
    if (!this.field) return this.dist();
    const p = this.pos(), H = this.room.tiles[0].length;
    const aim = waypoint(this.room.tiles, this.field, { x: p.x, y: p.y }, this.target);
    if (aim === this.target) return this.dist();
    const steps = this.field[Math.round(aim.x / PH.TILE) * H + Math.round(aim.y / PH.TILE)];
    return Math.hypot(aim.x - p.x, aim.y - p.y) + Math.max(0, steps) * PH.TILE;
  }
  pickupAvailable() { return this.room.tiles[this.pickup.x][this.pickup.y] === this.pickup.base; }

  // what the agent sees (see observe() below)
  observe() {
    const p = this.pos(), v = this.player.body.GetLinearVelocity();
    const ball = { x: p.x, y: p.y, vx: v.x, vy: v.y };
    this.aim = this.field ? waypoint(this.room.tiles, this.field, ball, this.target) : this.target;
    return observe(this.room.tiles, ball, this.aim,
      { x: this.pickup.x, y: this.pickup.y, kind: this.pickup.kind, available: this.pickupAvailable() });
  }

  setKeys(a) {
    const want = ACTIONS[a] || ACTIONS[0], k = this.player.keys;
    k.up = !!want.up; k.down = !!want.down; k.left = !!want.left; k.right = !!want.right;
  }

  // one physics tick (1/60 s) with the keys as they are; true once the ball touches the target
  tick() {
    this.clock += TICK_MS;
    this.runTimers();
    this.room.step();
    return this.dist() < TARGET_RADIUS;
  }

  // reward: -0.01 per decision (time), +progress toward the target (potential-based shaping), +2 on arrival
  step(a) {
    this.setKeys(a);
    const before = this.pickupAvailable();
    let reached = false;
    for (let i = 0; i < this.repeat && !reached; i++) reached = this.tick();
    this.steps++;
    if (before && !this.pickupAvailable()) { this.used = true; this.usedAt = this.steps; }
    const d = this.pathDist();
    let reward = -0.01 + 0.2 * (this.lastDist - d);
    this.lastDist = d;
    if (reached) { reward += 2; this.reached = true; }
    const done = reached;
    const truncated = !reached && this.steps >= this.maxSteps;
    return {
      obs: this.observe(), reward, done, truncated,
      info: { reached, used: this.used, kind: this.pickup.kind, steps: this.steps, seconds: this.steps * this.repeat * TICK_MS / 1000 },
    };
  }

  // everything a renderer needs
  view() {
    const p = this.pos(), v = this.player.body.GetLinearVelocity();
    return {
      tiles: this.room.tiles, ball: { x: p.x, y: p.y, vx: v.x, vy: v.y }, keys: Object.assign({}, this.player.keys),
      target: this.target, aim: this.aim || this.target, pickup: Object.assign({ available: this.pickupAvailable() }, this.pickup),
      steps: this.steps, seconds: this.steps * this.repeat * TICK_MS / 1000, reached: this.reached, used: this.used,
    };
  }
}

// a hand-written baseline: steer straight at the target, ignore the pickup
function straightLine(obs) {
  const dx = obs[2], dy = obs[3];
  const ang = Math.atan2(dy, dx); // 0 = right; ACTIONS go clockwise from up
  const i = Math.round(((ang + Math.PI / 2) / (Math.PI / 4) + 8)) % 8;
  return 1 + i;
}

const api = { BoostEnv, ACTIONS, OBS_SIZE, TARGET_RADIUS, observe, distanceField, waypoint, clearPath, straightLine, rng, makeArena, drillTiles };
if (isNode) module.exports = api;
else globalThis.TPBoostEnv = api;
})();

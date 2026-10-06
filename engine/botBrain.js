// botBrain.js - the CTF brain of a simple bot: reads game events like a client and presses keys.
// tools/bots.js drives it over sockets; local.js plugs it straight into a GameRoom (no network).
// Plays CTF: grab, run home, chase enemy flag carriers, defend; neutral flag: carry to the endzone.
// Isomorphic: also runs in the browser (the static single-player site), as globalThis.TPBotBrain.
(function () {
const TILE = 0.4;

class BotBrain {
  // i: bot number (role and defend spot); sendKey(ev, data): emits 'keydown' / 'keyup' to the game
  constructor(i, sendKey) {
    this.i = i;
    this.role = i % 2 === 0 ? 'offense' : 'defense';
    this.sendKey = sendKey;
    this.reset();
  }

  reset() {
    this.seq = 1;
    this.keys = { up: false, down: false, left: false, right: false };
    this.players = {}; this.map = null; this.id = null; this.state = 3;
    this.home = {}; this.endzone1 = null; this.endzone2 = null;
  }

  // a game event, as a client receives it
  receive(ev, d) {
    switch (ev) {
      case 'map': this.map = d.tiles.map((col) => col.slice()); this.findBases(); break; // own copy: mapupdate edits it
      case 'mapupdate': for (const t of Array.isArray(d) ? d : [d]) if (this.map) this.map[t.x][t.y] = t.v; break;
      case 'id': this.id = d; break;
      case 'time': this.state = d.state; break;
      case 'p':
        for (const u of d.u || d) {
          const p = this.players[u.id] || (this.players[u.id] = {});
          Object.assign(p, u);
          if ('rx' in u || 'ry' in u || 'lx' in u) p.at = Date.now();
        }
        break;
      case 'playerLeft': delete this.players[d]; break;
      default:
    }
  }

  findBases() {
    this.home = {};
    for (let x = 0; x < this.map.length; x++) for (let y = 0; y < this.map[0].length; y++) {
      const t = parseFloat(this.map[x][y]);
      if (Math.floor(t) === 3) this.home[1] = { x, y };
      if (Math.floor(t) === 4) this.home[2] = { x, y };
      if (Math.floor(t) === 16) this.home[3] = { x, y };            // neutral flag
      if (t === 17) (this.endzone1 || (this.endzone1 = [])).push({ x, y }); // red endzone
      if (t === 18) (this.endzone2 || (this.endzone2 = [])).push({ x, y }); // blue endzone
    }
  }

  // passable for path finding: floor-like tiles, avoiding spikes/walls/void and hostile gates
  passable(x, y, team) {
    if (x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length) return false;
    const t = parseFloat(this.map[x][y]);
    if (t === 0 || Math.floor(t) === 1 || t === 7) return false;
    if (t === 9.1 || (t === 9.2 && team === 2) || (t === 9.3 && team === 1)) return false;
    return true;
  }

  // BFS over tiles; returns next waypoint (tile) a few steps along the path
  nextWaypoint(from, to, team) {
    const H = this.map[0].length, key = (x, y) => x * H + y;
    const prev = new Map([[key(from.x, from.y), null]]);
    const q = [from];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    let found = null;
    while (q.length && prev.size < 6000) {
      const c = q.shift();
      if (c.x === to.x && c.y === to.y) { found = c; break; }
      for (const [dx, dy] of dirs) {
        const nx = c.x + dx, ny = c.y + dy;
        if (prev.has(key(nx, ny)) || !this.passable(nx, ny, team)) continue;
        if (dx && dy && (!this.passable(c.x + dx, c.y, team) || !this.passable(c.x, c.y + dy, team))) continue; // no corner cutting
        prev.set(key(nx, ny), c);
        q.push({ x: nx, y: ny });
      }
    }
    if (!found) return to;
    const path = [];
    for (let c = found; c; c = prev.get(key(c.x, c.y))) path.unshift(c);
    return path[Math.min(2, path.length - 1)];
  }

  setKey(k, down) {
    if (this.keys[k] === down) return;
    this.keys[k] = down;
    this.sendKey(down ? 'keydown' : 'keyup', { k, t: this.seq++ });
  }

  releaseKeys() { for (const k in this.keys) this.setKey(k, false); }

  // called every 50 ms while in a game
  think() {
    const me = this.players[this.id];
    if (!this.map || !me || me.dead || me.rx == null || ![1, 5, 7].includes(this.state)) return this.releaseKeys();
    // extrapolate our position since the last server update
    const dt = Math.min(0.3, (Date.now() - (me.at || Date.now())) / 1000);
    const px = me.rx + (me.lx || 0) * dt, py = me.ry + (me.ly || 0) * dt;
    const myTile = { x: Math.round(px / TILE), y: Math.round(py / TILE) };
    const enemy = me.team === 1 ? 2 : 1;
    const enemies = Object.values(this.players).filter((p) => p.team === enemy && !p.dead && p.rx != null);
    const enemyFC = enemies.find((p) => p.flag);
    let goal;
    if (this.home[3]) {
      // neutral flag: carry it to our endzone, otherwise go for the flag or its carrier
      const carrier = Object.values(this.players).find((p) => p.flag === 3 && !p.dead && p.rx != null);
      const zones = (me.team === 1 ? this.endzone1 : this.endzone2) || [];
      if (me.flag === 3 && zones.length) goal = zones.reduce((a, b) => (Math.hypot(a.x - myTile.x, a.y - myTile.y) <= Math.hypot(b.x - myTile.x, b.y - myTile.y) ? a : b));
      else if (carrier && carrier.team !== me.team) goal = { x: Math.round(carrier.rx / TILE), y: Math.round(carrier.ry / TILE) };
      else goal = this.home[3];
    } else if (me.flag) goal = this.home[me.team];
    else if (enemyFC) goal = { x: Math.round(enemyFC.rx / TILE), y: Math.round(enemyFC.ry / TILE) };
    else if (this.role === 'defense') {
      const h = this.home[me.team];
      const near = h && enemies.filter((p) => Math.hypot(p.rx / TILE - h.x, p.ry / TILE - h.y) < 8)[0];
      goal = near ? { x: Math.round(near.rx / TILE), y: Math.round(near.ry / TILE) } : h && { x: h.x + (this.i % 3) - 1, y: h.y + 2 };
    } else goal = this.home[enemy];
    if (!goal) return;
    if (!this.passable(goal.x, goal.y, me.team)) goal = this.home[me.team] || goal;
    const wp = this.nextWaypoint(myTile, goal, me.team);
    // steer: desired velocity toward the waypoint, press keys to close the velocity gap
    const tx = wp.x * TILE, ty = wp.y * TILE;
    const dx = tx - px, dy = ty - py, d = Math.hypot(dx, dy) || 1;
    const want = 2.5, dvx = dx / d * want - (me.lx || 0), dvy = dy / d * want - (me.ly || 0);
    this.setKey('right', dvx > 0.25); this.setKey('left', dvx < -0.25);
    this.setKey('down', dvy > 0.25); this.setKey('up', dvy < -0.25);
  }
}

const api = { BotBrain };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else globalThis.TPBotBrain = api;
})();

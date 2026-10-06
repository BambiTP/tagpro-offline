// game.js - an authoritative TagPro game room. Transport-agnostic and isomorphic: the Node
// server feeds it socket.io sockets, a P2P host feeds it WebRTC channels. A "client" is any
// object with emit(event, data) and disconnect(); the room calls client.onRoomEvent hooks.
//
// Packet shapes/order and timings follow captures of the real server (ref/live*, ref/replays).
// Physics mirrors the official client's prediction step exactly (same Box2D build).
(function () {
const isNode = typeof module !== 'undefined' && module.exports;
const Box2D = isNode ? require('./box2d') : globalThis.Box2D;
const C = isNode ? require('./constants') : globalThis.TPConstants;
const { PHYSICS: PH, TUNING: TU, STATES } = C;
const V = Box2D.Common.Math.b2Vec2;

const r2 = (v) => Math.round(v * 100) / 100;
const pad = (n) => (n < 10 ? '0' : '') + n;
const mmss = (ms) => { const s = Math.floor(ms / 1000); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); };

// tile ids
const T = {
  EMPTY: 0, WALL: 1, FLOOR: 2, RED_FLAG: 3, BLUE_FLAG: 4, BOOST: 5, POWERUP: 6, SPIKE: 7, BUTTON: 8,
  GATE_OFF: 9, GATE_ON: 9.1, GATE_RED: 9.2, GATE_BLUE: 9.3, BOMB: 10, RED_TILE: 11, BLUE_TILE: 12,
  PORTAL: 13, RED_BOOST: 14, BLUE_BOOST: 15, YELLOW_FLAG: 16, RED_ENDZONE: 17, BLUE_ENDZONE: 18,
  RED_POTATO: 19, BLUE_POTATO: 20, GRAVITY_WELL: 22, YELLOW_TILE: 23, RED_PORTAL: 24, BLUE_PORTAL: 25,
};
const PUPS = { 1: 'jukeJuice', 2: 'rollingBomb', 3: 'tagpro', 4: 'topSpeed' };
const PICKUP_KIND = { 5: 'boost', 14: 'boost', 15: 'boost', 6: 'powerup', 10: 'bomb' }; // floor(tile) -> touch radius

const PUBLIC_DEFAULTS = {
  time: 6, caps: 0, mercyRule: 3, overtime: true, overtimeRespawnIncrement: 3000, overtimeJukeJuice: true,
  accel: 1, topspeed: 1, bounce: 1, playerRespawnTime: 3000, speedPadRespawnTime: 10000,
  dynamiteRespawnTime: 30000, powerupRespawnTime: 60000, powerupJukeJuiceDuration: 20000,
  powerupRollingBombDuration: 20000, powerupTagproDuration: 20000, redTeamName: 'Red', blueTeamName: 'Blue',
  powerupDelay: true, ghostMode: 'disabled', poosts: true, kissingFCs: true, kissingTPs: true,
  powerupJukeJuice: true, powerupTagPro: true, powerupRollingBomb: true, powerupTopSpeed: false,
  respawnWarnings: true, pupIndicators: true, disableAllPups: false, gravityWellForce: 1, tagproMaxTags: 0,
  rollingBombForceMultipler: 1, rollingBombDistanceMultipler: 1, spacebarDetonateAll: false,
  jukeJuiceBoost: false, jukeJuiceBoostPower: 70, lastPossession: 'disabled', mapTestingMode: false,
  redTeamScore: 0, blueTeamScore: 0, maxPlayersPerTeam: 4, localTrust: false,
};

// "Local trust" (group setting): each player's own client is trusted for its ball's position, so
// movement has no input delay. Only in ghost modes where players never bump each other, since
// bumps between two client-owned balls can't be resolved fairly.
const TRUST_GHOST = new Set(['noPlayerCollisions', 'noPlayerOrMarsCollisions']);
const TRUST_MAX_SPEED = 30;   // m/s; boost + bomb on top of each other stays under this
const TRUST_SLACK = 0.6;      // m of extra movement allowed per report (jitter, late packets)

// Eggball (the official easter-2017 event mode). Client files are the real ones, served from
// /events; every number below was measured from 95 real eggball replays (Oct 2026).
const EGG_CLIENT_INFO = {
  eventTextures: { tiles: '/textures/musclescupog/tiles.png', splats: '/images/events/easter/splats.png' },
  eventSounds: [{ id: 'throw', src: '/events/easter-2016/sounds/throw' }],
  eventGraphics: [{ id: 'egg', src: '/events/easter-2016/images/egg.png' }]
    .concat(Array.from({ length: 17 }, (_, i) => ({ id: 'raptor' + (i + 1), src: `/events/easter-2017/images/raptor${i + 1}.png` })))
    .concat([{ id: 'field', src: '/events/easter-2017/images/field.png' }]),
  eventScripts: ['/events/easter-2017/scripts/easter-2017.js'],
  eventSplats: '/images/events/easter/splats.png',
};
const EGG = {
  RADIUS: 0.115, DENSITY: 2, FRICTION: 0.5, RESTITUTION: 0.6, LINEAR_DAMPING: 0.75, ANGULAR_DAMPING: 0.5, // the client's egg body
  CATEGORY: 1 << 4, MASK: 1 << 3,   // walls only
  SPAWN_OFFSET: 0.32,               // egg appears this far from the thrower's centre, toward the click
  THROW_IMPULSE: 0.5,               // 6.017 m/s with the egg's mass (replays: 6.017, every throw)
  HOLDER_SPEED: 0.9,                // top speed while holding (2.25 of 2.5)
  THROWER_SPEED: 0.5, THROWER_SLOW_MS: 1000, // after a throw (1.25 for exactly 1 s)
  INTERCEPT_MS: 3000,               // an enemy catch this soon after the throw pops the thrower
  BOAT_MS: 1500,                    // Raptor Boat: wall bounce, teammate catches in the endzone this soon after the throw
  SELF_SPLAT_MS: 50,                // the thrower catching it straight back off a wall leaves a splat
  WAITING_MS: 3000, PLAY_AFTER_HUDDLE_MS: 5000,
  CHAT: '#A654CC', TIP: '#BFFF00', RAPTORS: 17,
};

class GameRoom {
  // opts: { id, uuid, map (from mapLoader), mapName, settings, isPrivate, groupId, onEmpty, onEnd, now }
  constructor(opts) {
    this.id = opts.id;
    this.uuid = opts.uuid || opts.id;
    this.map = opts.map;
    this.mapName = opts.mapName || (opts.map.info && opts.map.info.name) || 'Untitled';
    this.settings = Object.assign({}, PUBLIC_DEFAULTS, opts.settings || {});
    for (const k of ['powerupJukeJuiceDuration', 'powerupRollingBombDuration', 'powerupTagproDuration']) this.settings[k] = Number(this.settings[k]);
    this.isPrivate = !!opts.isPrivate;
    this.groupId = opts.groupId || null;
    this.onEmpty = opts.onEmpty || (() => {});
    this.onEnd = opts.onEnd || (() => {});
    this.now = opts.now || (() => Date.now());

    this.clients = new Set();
    this.players = {};       // id -> player
    this.nextPlayerId = 1;
    this.score = { r: Number(this.settings.redTeamScore) || 0, b: Number(this.settings.blueTeamScore) || 0 };
    this.tileGen = {}; // "x,y" -> generation; bumping it cancels pending respawn timers (map test reset)
    this.tick = 0;
    this.state = STATES.COUNTDOWN;
    this.stateEndsAt = this.now() + TU.COUNTDOWN_MS;
    this.overtimeStartedAt = null;
    this.lastClockSync = this.now();
    this.ended = false;
    this.timers = [];

    this.gravity = this.settings.mode === 'gravity' || !!this.map.gravity;
    // eggball: the group's eggball mode, or its map picked directly
    this.egg = (this.settings.mode === 'eggball' || this.mapName === 'eggball')
      ? { state: '', holder: null, body: null, nextId: 0, thrower: null, throwTeam: null, throwAt: -Infinity, bounced: false, lastScoredOn: null, kicked: false, sync: false }
      : null;
    this.localTrust = !this.egg && !!this.settings.localTrust && TRUST_GHOST.has(this.settings.ghostMode);
    this.trust = new WeakMap(); // player -> last accepted report { x, y, at }
    this.trusted = new WeakSet(); // players whose client runs /localtrust.js (they've sent a report)
    this.W = this.map.tiles.length;
    this.H = this.map.tiles[0].length;
    this.tiles = this.map.tiles.map((col) => col.slice());
    this.tileState = {};     // "x,y" -> { kind, timer handles, ... }
    this.buttonsHeld = {};   // "x,y" -> Set(playerId)
    this.gravityWells = [];
    this.spawnTiles = { 1: [], 2: [] };
    this.flagHome = { 1: null, 2: null };
    this.indexMap();
    this.buildWorld();
    this.initPowerups();
  }

  // ---------- map ----------
  indexMap() {
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) {
      const t = this.tiles[x][y];
      if (t === T.RED_FLAG || t === T.RED_POTATO) this.flagHome[1] = { x, y, potato: t === T.RED_POTATO };
      if (t === T.BLUE_FLAG || t === T.BLUE_POTATO) this.flagHome[2] = { x, y, potato: t === T.BLUE_POTATO };
      if (t === T.GRAVITY_WELL) this.gravityWells.push({ x: x * PH.TILE, y: y * PH.TILE });
      if (t === T.YELLOW_FLAG) this.flagHome[3] = { x, y, potato: false };
    }
    const sp = this.map.spawnPoints || {};
    for (const [team, key] of [[1, 'red'], [2, 'blue']]) {
      const pts = sp[key] || [];
      for (const p of pts) this.spawnTiles[team].push({ x: p.x, y: p.y, radius: p.radius || 0, weight: p.weight || 1 });
      if (!this.spawnTiles[team].length && this.flagHome[team]) this.spawnTiles[team].push({ ...this.flagHome[team], radius: 5, weight: 1 });
    }
  }

  setTile(x, y, v, quiet) {
    this.tiles[x][y] = v;
    if (!quiet) this.pendingTiles.push({ x, y, v });
  }

  // ---------- physics ----------
  buildWorld() {
    this.pendingTiles = [];
    // gravity mode: same values as the official /scripts/gravity.js the client loads
    this.world = new Box2D.Dynamics.b2World(this.gravity ? new V(0, TU.GRAVITY_Y) : new V(0, 0), true);
    const fd = new Box2D.Dynamics.b2FixtureDef();
    const bd = new Box2D.Dynamics.b2BodyDef();
    fd.density = 1; fd.friction = this.gravity ? 0 : PH.WALL_FRICTION; fd.restitution = this.gravity ? TU.GRAVITY_RESTITUTION : PH.WALL_RESTITUTION * 1;
    fd.filter.categoryBits = -1;
    bd.type = Box2D.Dynamics.b2Body.b2_staticBody;
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) {
      const t = this.tiles[x][y];
      if (Math.floor(t) !== 1) continue;
      fd.shape = new Box2D.Collision.Shapes.b2PolygonShape();
      if (t === 1.1) fd.shape.SetAsArray([new V(-0.2, 0.2), new V(-0.2, -0.2), new V(0.2, 0.2)]);
      else if (t === 1.2) fd.shape.SetAsArray([new V(-0.2, -0.2), new V(0.2, -0.2), new V(-0.2, 0.2)]);
      else if (t === 1.3) fd.shape.SetAsArray([new V(0.2, -0.2), new V(0.2, 0.2), new V(-0.2, -0.2)]);
      else if (t === 1.4) fd.shape.SetAsArray([new V(0.2, 0.2), new V(-0.2, 0.2), new V(0.2, -0.2)]);
      else fd.shape.SetAsBox(0.2, 0.2);
      bd.position.Set(PH.TILE * x, PH.TILE * y);
      this.world.CreateBody(bd).CreateFixture(fd);
    }
    // spikes are solid: a static circle per spike tile; contact pops the player
    const sfd = new Box2D.Dynamics.b2FixtureDef();
    sfd.density = 1; sfd.friction = this.gravity ? 0 : PH.WALL_FRICTION; sfd.restitution = this.gravity ? TU.GRAVITY_RESTITUTION : PH.WALL_RESTITUTION;
    sfd.filter.categoryBits = -1;
    sfd.shape = new Box2D.Collision.Shapes.b2CircleShape(TU.TOUCH_RADIUS.spike);
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) {
      if (this.tiles[x][y] !== T.SPIKE) continue;
      bd.position.Set(PH.TILE * x, PH.TILE * y);
      const b = this.world.CreateBody(bd); b.CreateFixture(sfd); b.spike = true;
    }
    // Enemy touches are handled in BeginContact, i.e. during Step() *before* the solver runs:
    // the pop explosion is applied, then Box2D still resolves the collision against the (still
    // present) victim. That ordering reproduces real poosts (see tools/calib/poosts.py).
    const listener = new Box2D.Dynamics.b2ContactListener();
    listener.BeginContact = (c) => {
      const ba = c.GetFixtureA().GetBody(), bb = c.GetFixtureB().GetBody();
      const a = ba.player, b = bb.player;
      // the egg only collides with walls; a wall hit counts for a Raptor Boat and is sent at once
      if (ba.egg || bb.egg) { this.egg.bounced = true; this.egg.sync = true; return; }
      // the real server sends a ball's position the moment it hits something (replays: extra position
      // packets at landings/bounces); clients then correct their own prediction at once, which is
      // what keeps gravity.js's bouncier prediction (restitution 0.3) from showing a bounce
      if (a && !a.dead) this.queue(a, 'pos');
      if (b && !b.dead) this.queue(b, 'pos');
      if (a && b && !a.dead && !b.dead && a.team !== b.team) this.enemyContact(a, b);
      if (this.gravity) this.landed(c, a, b);
      if (a && bb.spike && !a.dead) this.pop(a, null);
      if (b && ba.spike && !b.dead) this.pop(b, null);
    };
    this.world.SetContactListener(listener);
    this.afterStep = [];
  }

  createBody(p) {
    const fd = new Box2D.Dynamics.b2FixtureDef();
    const bd = new Box2D.Dynamics.b2BodyDef();
    fd.density = PH.BALL_DENSITY; fd.friction = this.gravity ? 0 : PH.BALL_FRICTION;
    fd.restitution = (this.gravity ? TU.GRAVITY_RESTITUTION : PH.BALL_RESTITUTION) * this.settings.bounce;
    fd.shape = new Box2D.Collision.Shapes.b2CircleShape(PH.BALL_RADIUS);
    const f = C.getPlayerCollisions(this.settings.ghostMode, p.team === 1);
    fd.filter.categoryBits = f.categoryBits; fd.filter.maskBits = f.maskBits;
    bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bd.linearDamping = PH.LINEAR_DAMPING; bd.angularDamping = PH.ANGULAR_DAMPING;
    const body = this.world.CreateBody(bd);
    body.CreateFixture(fd);
    body.player = p;
    body.SetPosition(new V(-100, -100));
    body.SetActive(false);
    return body;
  }

  // ---------- clients ----------
  playerCount(team) { return Object.values(this.players).filter((p) => !team || p.team === team).length; }
  spectatorCount() { let n = 0; for (const c of this.clients) if (c.spectator && !c.recorder) n++; return n; }
  humanClients() { let n = 0; for (const c of this.clients) if (!c.recorder) n++; return n; }

  // a replay recorder: joins like the real recorder (a silent "watching" spectator)
  addRecorder(rec) {
    rec.recorder = true;
    this.addClient(rec, { id: 'recorder', name: 'recorder' }, { spectate: true, recorder: true });
  }

  send(client, ev, data) { try { client.emit(ev, data); } catch (e) { /* closed */ } }
  broadcast(ev, data, filter) { for (const c of this.clients) if (!filter || filter(c)) this.send(c, ev, data); }

  chooseTeam(pref) {
    const r = this.playerCount(1), b = this.playerCount(2);
    if ((pref === 1 || pref === 2) && (this.isPrivate || this.fixedTeams)) return pref;
    if (pref === 1 && r <= b) return 1;
    if (pref === 2 && b <= r) return 2;
    return r <= b ? 1 : 2;
  }

  // session: { id, name, auth, flair, degree }; opts: { team: 1|2|null, spectate: bool }
  addClient(client, session, opts = {}) {
    if (this.ended) { this.send(client, 'disconnectReason', 'ended'); return; }
    client.session = session;
    client.spectator = !!opts.spectate;
    client.playerId = null;
    this.clients.add(client);

    const s = this.settings;
    this.send(client, 'map', { tiles: this.tiles, splats: [], info: Object.assign({ gameMode: 'normal' }, this.map.info), id: this.id });
    this.send(client, 'clientInfo', {
      gameId: this.id, gameUuid: this.uuid, state: 9, map: this.mapName, mapfile: this.mapName,
      eventTextures: {}, eventSounds: [], eventMusic: [], eventGraphics: [], eventScripts: [], eventSplats: null, eventFlairs: [],
      gameMode: 'classic', classicGameMode: 'ctf', scoreAlgorithm: 'IPMv1.1', worldStarted: true,
      ...(s.mapTestingMode ? { mapTestingMode: true } : {}),
      ...(this.gravity ? { eventScripts: ['/scripts/gravity.js'] } : {}),
      ...(this.egg ? EGG_CLIENT_INFO : {}),
    });
    this.send(client, 'teamNames', { redTeamName: s.redTeamName, blueTeamName: s.blueTeamName });
    this.send(client, 'time', { time: Math.max(0, this.stateEndsAt - this.now()), state: this.state });
    this.send(client, 'spectators', this.spectatorCount());
    if (this.groupId) this.send(client, 'groupId', this.groupId);
    if (s.ghostMode && s.ghostMode !== 'disabled') this.send(client, 'ghostMode', s.ghostMode);
    if (s.gravityWellForce !== 1) this.send(client, 'gravityWellForce', s.gravityWellForce);

    const others = Object.values(this.players).map((p) => this.fullPlayer(p));
    if (client.spectator && opts.recorder) {
      this.send(client, 'arrivedInGame', { gameId: this.id, spectateType: 'watching', reconnect: false });
      this.send(client, 'spectators', this.spectatorCount());
      this.send(client, 'score', this.score);
      return;
    }
    if (client.spectator) {
      if (this.egg) { this.send(client, 'eggBall', { state: this.egg.state, holder: this.egg.holder }); if (this.egg.body) this.send(client, 'object', this.eggPacket()); }
      this.send(client, 'arrivedInGame', { gameId: this.id, spectateType: 'watching', reconnect: false });
      this.send(client, 'chat', { from: null, message: "You've joined a game as a spectator. Once enough players come online, you'll be redirected to a game. Q/W=Rotate through players. A=Red's flag carrier. S=Blue's flag carrier. C=Center. Z=Toggle auto-zoom. +/-=Zoom in/out.", to: 'all' });
      if (this.groupId) this.send(client, 'chat', { from: null, message: "Press 'g' to chat with your group!", to: 'all' });
      this.broadcast('spectators', this.spectatorCount());
      if (others.length) this.send(client, 'p', others);
      this.send(client, 'score', this.score);
      this.bindClient(client);
      return;
    }

    const team = this.chooseTeam(opts.team);
    const p = this.newPlayer(session, team);
    client.playerId = p.id;
    p.client = client;
    this.send(client, 'id', p.id);
    this.send(client, 'arrivedInGame', { gameId: this.id, spectateType: false });
    if (!session.auth) this.send(client, 'chat', { from: null, message: "Hi! You're currently playing unregistered which means you can't pick a custom name and your chat is limited. To register, click the Log In button on the homepage. Have fun!", to: p.id, c: '#ffffff', for: p.id });
    this.send(client, 'tips', false);
    this.send(client, 'preferredServer', '');
    if (others.length) this.send(client, 'p', others);
    this.players[p.id] = p;
    (this.playerHistory || (this.playerHistory = {}))[p.id] = {
      id: p.id, team, userId: (session.account && session.account.id) || null, displayName: p.name,
      joined: this.now(), left: null, finished: false,
    };
    this.send(client, 'p', [this.fullPlayer(p)]);
    this.broadcast('score', this.score);
    this.broadcast('chat', { from: null, message: `${p.name} has joined the ${team === 1 ? 'Red' : 'Blue'} team.`, to: 'all', for: p.id, icon: team === 1 ? 'join1' : 'join2' });
    if (this.egg) this.broadcast('eggBall', { state: this.egg.state, holder: this.egg.holder });
    this.spawnPlayer(p, this.egg && this.state !== STATES.COUNTDOWN ? this.respawnDelay() : 0);
    this.broadcastP([this.fullPlayer(p)], (c) => c !== client);
    this.bindClient(client);
    if (this.egg) this.eggWelcome(client, p);
  }

  newPlayer(session, team) {
    const id = this.nextPlayerId++;
    const p = {
      id, sessionId: session.publicId, name: session.auth ? session.name : (session.name === 'Some Ball' || !session.name ? 'Some Ball ' + id : session.name),
      newPlayer: !session.auth, team, flag: null, potatoFlag: null, selfDestructSoon: null,
      jukeJuice: false, grip: false, speed: false, tagpro: false, bomb: false, dead: true, directSet: false,
      's-tags': 0, 's-pops': 0, 's-grabs': 0, 's-returns': 0, 's-captures': 0, 's-drops': 0, 's-support': 0,
      's-hold': 0, 's-prevent': 0, 's-powerups': 0, 's-flaccids': 0, 's-handoffs': 0, 's-goodHandoffs': 0,
      score: 0, oscore: 0, dscore: 0, tagcoins: 0, up: 0, down: 0, left: 0, right: 0,
      ms: PH.MAX_SPEED * this.settings.topspeed, ac: PH.ACCEL * this.settings.accel, den: 1,
      playTime: '00:00', afk: false, pending: false, skill: null, tier: null, subTier: null,
      lx: 0, ly: 0, a: 0, ra: 0,
    };
    Object.defineProperty(p, 'draw', { value: false, writable: true, enumerable: false });
    if (session.auth) Object.assign(p, { auth: session.auth, flair: session.flair || null, degree: session.degree || 0 });
    Object.defineProperties(p, {
      body: { value: null, writable: true },
      keys: { value: { up: false, down: false, left: false, right: false } },
      sent: { value: {}, writable: true },       // last values sent, for delta compression
      lastInput: { value: this.now(), writable: true },
      afkWarned: { value: false, writable: true },
      joinedAt: { value: this.now(), writable: true },
      effects: { value: {}, writable: true },    // name -> expiry timer
      respawnAt: { value: 0, writable: true },
      touching: { value: new Set(), writable: true },
      onPickups: { value: new Set(), writable: true }, // boost/powerup/bomb tiles under the ball last tick
      portalCooldownUntil: { value: 0, writable: true },
      client: { value: null, writable: true },
      tagproTags: { value: 0, writable: true },
      accountId: { value: (session.account && session.account.id) || null, writable: true },
    });
    p.body = this.createBody(p);
    return p;
  }

  fullPlayer(p) {
    const o = {};
    for (const k of Object.keys(p)) o[k] = p[k];
    if (!p.dead && p.body.IsActive()) { const pos = p.body.GetPosition(); o.rx = r2(pos.x); o.ry = r2(pos.y); }
    o.draw = !p.dead;
    return o;
  }

  bindClient(client) {
    client.onEvent = (ev, data) => this.handle(client, ev, data);
  }

  removeClient(client) {
    if (!this.clients.has(client)) return;
    this.clients.delete(client);
    const p = client.playerId && this.players[client.playerId];
    if (p) {
      if (p.flag) this.returnFlag(p, null, true);
      if (this.egg && this.egg.holder === p.id) this.eggHolderLeft(p);
      this.world.DestroyBody(p.body);
      delete this.players[p.id];
      if (this.playerHistory && this.playerHistory[p.id]) this.playerHistory[p.id].left = this.now();
      this.broadcast('playerLeft', p.id);
      this.broadcast('chat', { from: null, message: `${p.name} has left the ${p.team === 1 ? 'Red' : 'Blue'} team.`, to: 'all', for: p.id, icon: p.team === 1 ? 'leave1' : 'leave2' });
      if (!this.ended && this.state !== STATES.COUNTDOWN && this.playerCount() === 0) this.end(this.score.r > this.score.b ? 'red' : this.score.b > this.score.r ? 'blue' : 'tie', false);
      else if (!this.ended && this.state !== STATES.COUNTDOWN && (this.playerCount(1) === 0 || this.playerCount(2) === 0) && this.isPrivate === false) { /* public: keep playing, joiner refills */ }
    } else if (client.spectator) this.broadcast('spectators', this.spectatorCount());
    if (this.humanClients() === 0) this.onEmpty(this);
  }

  // ---------- input ----------
  handle(client, ev, d) {
    const p = client.playerId && this.players[client.playerId];
    switch (ev) {
      case 'keydown': case 'keyup': {
        if (!p || !d || !(Object.hasOwn(p.keys, d.k) || d.k === 'space')) return; // not `in`: that also matches toString etc.
        const down = ev === 'keydown';
        if (d.k === 'space') { p.lastInput = this.now(); if (down) this.spacebar(p); return; }
        p.keys[d.k] = down;
        p.lastInput = this.now();
        if (p.afk) { p.afk = false; }
        const seq = Number(d.t) || 0;
        p[d.k] = down ? seq : -seq;
        this.queue(p, d.k);
        // applied with the other per-tick input, after the world step (trusted: the client jumps itself)
        if (this.gravity && down && d.k === 'up' && !this.isTrusted(p)) p.wantJump = true;
        break;
      }
      case 'chat': {
        if (!d || typeof d.message !== 'string') return;
        const msg = d.message.slice(0, 120);
        if (!msg.trim()) return;
        // more than 20 messages in 5 seconds are dropped (spam)
        const now = Date.now();
        client.chatTimes = (client.chatTimes || []).filter((t) => now - t < 5000);
        if (client.chatTimes.length >= 20) return;
        client.chatTimes.push(now);
        if (!p) { if (d.toAll) this.broadcast('chat', { from: client.session.name, message: msg, to: 'all' }); return; }
        if (d.toAll) this.broadcast('chat', { from: p.id, message: msg, to: 'all' });
        else this.broadcast('chat', { from: p.id, message: msg, to: 'team' }, (c) => c.playerId && this.players[c.playerId] && this.players[c.playerId].team === p.team);
        break;
      }
      case 'switch': {
        if (!p) return;
        const other = p.team === 1 ? 2 : 1;
        if (this.playerCount(other) > this.playerCount(p.team) && !this.isPrivate) return;
        if (p.flag) this.returnFlag(p, null, true);
        p.team = other;
        if (this.playerHistory && this.playerHistory[p.id]) this.playerHistory[p.id].team = other;
        const f = C.getPlayerCollisions(this.settings.ghostMode, other === 1);
        const fix = p.body.GetFixtureList(); const fd = fix.GetFilterData(); fd.categoryBits = f.categoryBits; fd.maskBits = f.maskBits; fix.SetFilterData(fd);
        this.queue(p, 'team');
        this.broadcast('chat', { from: null, message: `${p.name} has switched to the ${other === 1 ? 'Red' : 'Blue'} team.`, to: 'all', for: p.id, icon: other === 1 ? 'join1' : 'join2' });
        this.pop(p, null, { silent: true });
        break;
      }
      case 'name': {
        if (!p || typeof d !== 'string') return;
        const n = d.trim().slice(0, 12);
        if (!n) return;
        p.name = n; this.queue(p, 'name');
        break;
      }
      case 'p': if (d && d.id != null) this.send(client, 'pr', d.id); break;
      case 'spectate': case 'modSpectate': break;
      case 'mapRating': if (this.onMapRating && client.session.account) this.onMapRating(client.session, this.mapName, d); break; // logged in only, like the Maps page
      case 'preferredServer': case 'tips': case 'touch': case 'pings': break;
      case 'mark': if (p) this.broadcast('mark', p.id); break;
      case 'resetMap': // at most once a second (rebuilding the map is heavy)
        if (p && this.settings.mapTestingMode && !(this.lastReset > Date.now() - 1000)) { this.lastReset = Date.now(); this.resetMap(); }
        break;
      case 'lt': if (p && this.localTrust) this.trustedMove(p, d); break;
      case 'click': if (p && this.egg) this.eggThrow(p, d); break;
      default: break;
    }
  }

  // ---------- update packets ----------
  queue(p, ...fields) {
    if (!this.dirty) this.dirty = new Map();
    let set = this.dirty.get(p.id);
    if (!set) this.dirty.set(p.id, (set = new Set()));
    for (const f of fields) set.add(f);
  }

  broadcastP(u, filter) { if (u.length) this.broadcast('p', { u, t: this.tick }, filter); }

  flushDirty() {
    if (!this.dirty || !this.dirty.size) return;
    const u = [];
    for (const [id, fields] of this.dirty) {
      const p = this.players[id];
      if (!p) continue;
      const o = { id };
      for (const f of fields) {
        if (f === 'pos') Object.assign(o, this.posDelta(p, true));
        else o[f] = p[f];
      }
      u.push(o);
    }
    this.dirty.clear();
    this.broadcastP(u);
  }

  posDelta(p, force) {
    if (p.dead || !p.body.IsActive()) return {};
    const pos = p.body.GetPosition(), vel = p.body.GetLinearVelocity();
    const cur = { rx: r2(pos.x), ry: r2(pos.y), lx: r2(vel.x), ly: r2(vel.y), a: r2(p.body.GetAngularVelocity()), ra: r2(p.body.GetAngle()) };
    const o = {};
    for (const k in cur) if (force || p.sent[k] !== cur[k]) { o[k] = cur[k]; p.sent[k] = cur[k]; }
    return o;
  }

  snapshot() {
    const u = [];
    for (const p of Object.values(this.players)) {
      const d = this.posDelta(p, false);
      if (Object.keys(d).length) u.push(Object.assign({ id: p.id }, d));
    }
    if (!this.localTrust) return this.broadcastP(u);
    // local trust: a player's own client owns its position, so it never gets its own snapshot back
    for (const c of this.clients) {
      const own = c.playerId;
      const mine = own != null && this.isTrusted(this.players[own]) && u.some((o) => o.id === own);
      this.broadcastP(mine ? u.filter((o) => o.id !== own) : u, (x) => x === c);
    }
  }

  // ---------- local trust ----------
  isTrusted(p) { return this.localTrust && !!p && this.trusted.has(p); }

  // d: { x, y, vx, vy, a, ra, e } in metres / m/s, e = the player's snap epoch (lte) the client last saw
  trustedMove(p, d) {
    if (!d || p.dead || !this.playing() || !p.body.IsActive()) return;
    if (Number(d.e) !== (p.lte || 0)) return; // sent before a server snap reached the client
    const n = ['x', 'y', 'vx', 'vy', 'a', 'ra'].map((k) => Number(d[k]));
    if (!n.every(Number.isFinite)) return;
    const [x, y, vx, vy, a, ra] = n;
    const now = this.now();
    const last = this.trust.get(p);
    const from = last || p.body.GetPosition();
    const dt = last ? Math.min(0.5, (now - last.at) / 1000) : 0.5;
    const reach = TRUST_MAX_SPEED * dt + TRUST_SLACK;
    let ok = Math.hypot(vx, vy) <= TRUST_MAX_SPEED
      && Math.hypot(x - from.x, y - from.y) <= reach
      && this.trustPathClear(from.x, from.y, x, y);
    if (!ok && Math.hypot(vx, vy) <= TRUST_MAX_SPEED) { // a portal the client went through on its own?
      const pt = this.trustPortal(p, from, x, y, reach);
      if (pt) { this.teleport(p, pt.x, pt.y, pt.base, true); ok = true; }
    }
    if (!ok) { this.trust.delete(p); this.directSet(p); return; } // snap the client back to the server
    this.trust.set(p, { x, y, vx, vy, at: now });
    this.trusted.add(p);
    p.body.SetPosition(new V(x, y));
    p.body.SetLinearVelocity(new V(vx, vy));
    p.body.SetAngularVelocity(a);
    p.body.SetAngle(ra);
    // check tiles at every reported spot now: the next tick may only see a later report, and a ball
    // the client just bounced off a bomb is only on it for this one
    this.tileInteractions(p);
  }

  // an open portal near `from` whose destination is near (x, y)
  trustPortal(p, from, x, y, reach) {
    for (const key in this.map.portals) {
      const d = this.map.portals[key].destination;
      if (!d) continue;
      const [px, py] = key.split(',').map(Number);
      const t = this.tiles[px] && this.tiles[px][py];
      if (typeof t !== 'number' || ![T.PORTAL, T.RED_PORTAL, T.BLUE_PORTAL].includes(t)) continue;
      if ((t === T.RED_PORTAL && p.team !== 1) || (t === T.BLUE_PORTAL && p.team !== 2)) continue;
      if (Math.hypot(from.x - px * PH.TILE, from.y - py * PH.TILE) > reach) continue;
      if (Math.hypot(x - d.x * PH.TILE, y - d.y * PH.TILE) > reach) continue;
      return { x: px, y: py, base: t };
    }
    return null;
  }

  // what /localtrust.js needs to predict its own ball exactly like this server does
  trustConfig() {
    const s = this.settings, portals = {};
    for (const key in this.map.portals) { const d = this.map.portals[key].destination; if (d) portals[key] = [d.x, d.y]; }
    return {
      R: PH.BALL_RADIUS, tile: PH.TILE, ac: PH.ACCEL * s.accel, ms: PH.MAX_SPEED * s.topspeed,
      jjAc: TU.JUKE_JUICE_BONUS * s.accel, teamAc: TU.TEAM_TILE_BONUS * s.accel, teamMs: TU.TEAM_TILE_MAX_SPEED * s.topspeed,
      topMs: TU.TOP_SPEED_MAX * s.topspeed, touch: TU.TOUCH_RADIUS, portals,
      boostPerMs: TU.BOOST_SPEED / PH.MAX_SPEED, bombR: TU.BOMB_RADIUS, bombS: TU.BOMB_STRENGTH,
      gravity: this.gravity ? {
        jump: TU.JUMP_SPEED, restitution: TU.GRAVITY_RESTITUTION, playerReset: !!s.isPlayerJumpResetEnabled,
        jumps: Number.isFinite(this.jumpLimit()) ? this.jumpLimit() : null, // null = unlimited
      } : null,
    };
  }

  // no full wall square between the two points (sampled every ~5cm); the ball may graze a wall
  // edge, but its centre can't come within half a radius of a wall square's inside
  trustPathClear(x0, y0, x1, y1) {
    const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 0.05));
    const h = PH.TILE / 2 - PH.BALL_RADIUS / 2;
    for (let i = 1; i <= steps; i++) {
      const x = x0 + (x1 - x0) * i / steps, y = y0 + (y1 - y0) * i / steps;
      const t = this.tileAt(x, y);
      if (!t) return false;
      if (t.t !== T.WALL) continue;
      if (Math.abs(x - t.x * PH.TILE) < h && Math.abs(y - t.y * PH.TILE) < h) return false;
    }
    return true;
  }

  // ---------- spawning / popping ----------
  pickSpawn(team) {
    const list = this.spawnTiles[team];
    const total = list.reduce((a, s) => a + s.weight, 0);
    let r = Math.random() * total, s = list[0];
    for (const c of list) { r -= c.weight; if (r <= 0) { s = c; break; } }
    for (let i = 0; i < 30; i++) {
      const ang = Math.random() * Math.PI * 2, dist = Math.random() * (s.radius || 0);
      const x = Math.round(s.x + Math.cos(ang) * dist), y = Math.round(s.y + Math.sin(ang) * dist);
      if (x >= 0 && y >= 0 && x < this.W && y < this.H && this.tiles[x][y] === T.FLOOR) return { x, y };
    }
    return { x: s.x, y: s.y };
  }

  respawnDelay() {
    let d = this.settings.playerRespawnTime;
    if (this.state === STATES.OVERTIME && this.settings.overtimeRespawnIncrement) d += (this.overtimePops || 0) * this.settings.overtimeRespawnIncrement;
    return d;
  }

  spawnPlayer(p, wait) {
    const t = this.egg ? this.eggSpawnTile(p.team) : this.pickSpawn(p.team);
    const gen = p.spawnGen = (p.spawnGen || 0) + 1; // a newer spawn (eggball huddle) replaces this one
    const px = t.x * PH.TILE, py = t.y * PH.TILE;
    this.broadcast('spawn', { x: px * PH.SCALE, y: py * PH.SCALE, t: p.team, w: wait });
    const done = () => {
      if (!this.players[p.id] || this.ended || p.spawnGen !== gen) return;
      p.dead = false;
      p.body.SetActive(true);
      p.body.SetPosition(new V(px, py));
      p.body.SetLinearVelocity(new V(0, 0));
      p.body.SetAngularVelocity(0);
      p.sent = {};
      p.draw = true;
      this.queue(p, 'dead', 'draw');
      this.directSet(p);
    };
    if (wait) { p.respawnAt = this.now() + wait; this.later(wait, done); }
    else if (this.world.IsLocked()) this.afterStep.push(done); else done();
  }

  // tells clients to place the ball exactly (no reconcile easing); reset on the next tick
  directSet(p) {
    p.directSet = true;
    p.lte = (p.lte || 0) + 1; // local trust: reports from before this snap are stale
    this.trust.delete(p);
    this.queue(p, 'directSet', 'pos', 'lte');
    (this.resetDirectSet || (this.resetDirectSet = new Set())).add(p);
  }

  later(ms, fn) { const h = setTimeout(() => { if (!this.closed) fn(); }, ms); this.timers.push(h); return h; }

  // killer: player or null; opts.silent: no stats/sounds (team switch); opts.huddle: eggball reset
  // (no explosion, the caller respawns everyone)
  pop(p, killer, opts = {}) {
    if (p.dead) return;
    // a rolling bomb takes the hit: it goes off and the ball survives (replays: 196 of 197 spike, gate
    // and tag "pops" of a ball holding one were survived)
    if (p.bomb && this.settings.rollingBombBehavior !== 'classic' && !opts.silent) { this.detonateRollingBomb(p); return; }
    const pos = p.body.GetPosition();
    const at = { x: pos.x, y: pos.y };
    p.dead = true;
    p.wantJump = false;
    p.collected = [];
    p.draw = false;
    const removeBody = () => { p.body.SetLinearVelocity(new V(0, 0)); p.body.SetActive(false); };
    if (this.world.IsLocked()) this.afterStep.push(removeBody); else removeBody();
    for (const k of ['tagpro', 'bomb', 'jukeJuice', 'grip', 'speed']) if (p[k]) { p[k] = false; this.queue(p, k); }
    for (const h of Object.values(p.effects)) clearTimeout(h);
    if (p.touching && p.touching.size) { const held = [...p.touching]; p.touching = new Set(); for (const k of held) this.releaseButton(k, p); }
    p.effects = {}; p.ms = PH.MAX_SPEED * this.settings.topspeed; p.ac = PH.ACCEL * this.settings.accel;
    this.queue(p, 'dead', 'draw', 'ms', 'ac');
    if (!opts.silent) {
      p['s-pops']++; this.queue(p, 's-pops');
      if (killer) { killer['s-tags']++; this.queue(killer, 's-tags'); }
      // eggball: a splat on an endzone is temporary (replays: temp exactly when it lands on one)
      const tile = this.egg && this.tileAt(at.x, at.y), temp = !!tile && (tile.t === T.RED_ENDZONE || tile.t === T.BLUE_ENDZONE);
      this.broadcast('splat', { x: Math.round(at.x * PH.SCALE), y: Math.round(at.y * PH.SCALE), t: p.team, temp });
      this.broadcast('sound', { s: 'pop', v: 1 });
      if (this.settings.poosts && !opts.huddle) this.explode(at, TU.POP_RADIUS, TU.POP_STRENGTH, p);
    }
    if (opts.huddle) return;
    if (this.egg && this.egg.holder === p.id) this.eggHolderPopped(p, killer, at);
    if (p.flag === 3 && killer && !killer.flag && !killer.dead) this.stealFlag(p, killer);
    else if (p.flag) this.returnFlag(p, killer);
    if (this.state === STATES.OVERTIME && !opts.silent) this.overtimePops = (this.overtimePops || 0) + 1;
    this.spawnPlayer(p, this.respawnDelay());
  }

  explode(at, radius, strength, except) {
    for (const o of Object.values(this.players)) {
      if (o === except || o.dead) continue;
      const pos = o.body.GetPosition();
      const dx = pos.x - at.x, dy = pos.y - at.y, d = Math.hypot(dx, dy);
      if (d >= radius || d < 1e-6) continue;
      const k = strength * (radius - d);
      if (this.isTrusted(o)) { // the client owns the ball: send the change, its next report carries it
        this.send(o.client, 'ltKick', { vx: dx / d * k, vy: dy / d * k });
        continue;
      }
      const v = o.body.GetLinearVelocity();
      o.body.SetLinearVelocity(new V(v.x + dx / d * k, v.y + dy / d * k));
      this.queue(o, 'pos');
    }
  }

  // ---------- flags ----------
  flagTile(team) { const h = this.flagHome[team]; if (team === 3) return T.YELLOW_FLAG; return h.potato ? (team === 1 ? T.RED_POTATO : T.BLUE_POTATO) : (team === 1 ? T.RED_FLAG : T.BLUE_FLAG); }
  flagAtHome(team) { const h = this.flagHome[team]; return h && this.tiles[h.x][h.y] === this.flagTile(team); }

  grabFlag(p, team) {
    const h = this.flagHome[team];
    this.setTile(h.x, h.y, this.flagTile(team) + '.1');
    p.flag = team; p['s-grabs']++;
    p.potatoFlag = !!h.potato; p.selfDestructSoon = false;
    p.clutchFlag = this.state === STATES.CLUTCH ? true : undefined; // grabbed during clutch: can't score
    if (p.clutchFlag === undefined) delete p.clutchFlag;
    p.grabbedAt = this.now();
    p.invincibleUntil = this.now() + TU.GRAB_INVINCIBLE_MS;
    this.queue(p, 'flag', 'potatoFlag', 'selfDestructSoon', 's-grabs');
    if (p.clutchFlag) this.queue(p, 'clutchFlag');
    // overtime juke juice: a flag carrier gets juke juice when grabbing during overtime
    if (this.state === STATES.OVERTIME && this.settings.overtimeJukeJuice) this.givePowerup(p, 1, { silent: true });
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      const friendly = viewer && viewer.team === p.team;
      this.send(c, 'sound', friendly ? { s: 'friendlyalert', v: 1 } : { s: 'alert', v: viewer ? 1 : 0.25 });
    }
  }

  // neutral flag: the tagger takes the flag straight from the carrier
  stealFlag(from, to) {
    from.flag = null; from.potatoFlag = null; from.selfDestructSoon = null; from.clutchHolder = false; delete from.clutchFlag;
    from['s-drops']++; this.queue(from, 'flag', 'potatoFlag', 'selfDestructSoon', 's-drops');
    to.flag = 3; to.potatoFlag = false; to.selfDestructSoon = false; to['s-grabs']++;
    to.grabbedAt = this.now();
    to.invincibleUntil = this.now() + TU.GRAB_INVINCIBLE_MS;
    this.queue(to, 'flag', 'potatoFlag', 'selfDestructSoon', 's-grabs');
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      this.send(c, 'sound', viewer && viewer.team === to.team ? { s: 'friendlyalert', v: 1 } : { s: 'alert', v: viewer ? 1 : 0.25 });
    }
  }

  returnFlag(p, killer, silent) {
    const team = p.flag;
    p.flag = null; p.potatoFlag = null; p.selfDestructSoon = null; delete p.clutchFlag; p.clutchHolder = false;
    this.queue(p, 'flag', 'potatoFlag', 'selfDestructSoon');
    const h = this.flagHome[team];
    if (h) this.setTile(h.x, h.y, this.flagTile(team));
    if (silent) return;
    p['s-drops']++; this.queue(p, 's-drops');
    if (killer) { killer['s-returns']++; this.queue(killer, 's-returns'); }
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      const friendly = viewer && viewer.team === p.team;
      this.send(c, 'sound', { s: friendly ? 'friendlydrop' : 'drop', v: 1 });
    }
  }

  capture(p) {
    const team = p.flag;
    p.flag = null; p.potatoFlag = null; p.selfDestructSoon = null; p.clutchHolder = false; p['s-captures']++;
    this.queue(p, 'flag', 'potatoFlag', 'selfDestructSoon', 's-captures');
    const h = this.flagHome[team];
    this.setTile(h.x, h.y, this.flagTile(team));
    if (p.team === 1) this.score.r++; else this.score.b++;
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      const friendly = viewer ? viewer.team === p.team : true;
      this.send(c, 'sound', { s: friendly ? 'cheering' : 'sigh', v: friendly ? 1 : 0.75 });
    }
    this.broadcast('score', this.score);
    this.checkWinConditions(true);
  }

  // ---------- powerups / timed tiles ----------
  enabledPups() {
    const s = this.settings, out = [];
    if (s.disableAllPups) return out;
    if (s.powerupJukeJuice) out.push(1);
    if (s.powerupRollingBomb) out.push(2);
    if (s.powerupTagPro) out.push(3);
    if (s.powerupTopSpeed) out.push(4);
    return out;
  }

  initPowerups() {
    this.pupTiles = [];
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) if (this.tiles[x][y] === T.POWERUP) this.pupTiles.push({ x, y });
  }

  // at game start (powerupDelay): preview the next pup, spawn after one respawn cycle
  startPowerups() {
    for (const t of this.pupTiles) {
      if (this.settings.powerupDelay) this.schedulePowerup(t.x, t.y);
      else { const k = this.randomPup(); if (k) this.setTile(t.x, t.y, 6 + k / 10); }
    }
  }

  randomPup() { const e = this.enabledPups(); return e.length ? e[Math.floor(Math.random() * e.length)] : 0; }

  schedulePowerup(x, y) {
    const k = this.randomPup();
    if (!k) { this.setTile(x, y, T.POWERUP); return; }
    const base = 6 + k / 10;
    this.setTile(x, y, this.settings.pupIndicators ? Number(base.toFixed(1) + '2') : T.POWERUP);
    this.timedRespawn(x, y, this.settings.powerupRespawnTime, base, (i) => Number(base.toFixed(1) + String(i).padStart(2, '0')));
  }

  // generic respawn with 12 x 250ms warning frames (e.g. 5.101 .. 5.112), as measured in replays
  bumpTile(x, y) { const k = x + ',' + y; return (this.tileGen[k] = (this.tileGen[k] || 0) + 1); }
  tileCurrent(x, y, gen) { return this.tileGen[x + ',' + y] === gen; }

  timedRespawn(x, y, total, finalTile, warnTile) {
    const gen = this.bumpTile(x, y);
    const warnTotal = TU.WARNING_FRAMES * TU.WARNING_FRAME_MS;
    const warn = this.settings.respawnWarnings && total > warnTotal;
    const idle = warn ? total - warnTotal : total;
    this.later(idle, () => {
      if (!this.tileCurrent(x, y, gen)) return;
      if (!warn) return this.setTile(x, y, finalTile);
      let i = 1;
      const step = () => {
        if (!this.tileCurrent(x, y, gen)) return;
        if (i > TU.WARNING_FRAMES) return this.setTile(x, y, finalTile);
        this.setTile(x, y, warnTile(i));
        i++;
        this.later(TU.WARNING_FRAME_MS, step);
      };
      step();
    });
  }

  givePowerup(p, kind, opts = {}) {
    const s = this.settings;
    const name = PUPS[kind];
    const dur = { jukeJuice: s.powerupJukeJuiceDuration, rollingBomb: s.powerupRollingBombDuration, tagpro: s.powerupTagproDuration, topSpeed: 20000 }[name];
    if (!opts.silent) {
      p['s-powerups']++; this.queue(p, 's-powerups');
      this.broadcast('sound', { s: 'powerup', v: 1 }, (c) => c.playerId === p.id);
    }
    p.collected = (p.collected || []).filter((n) => n !== name).concat(name); // spacebar uses them in this order
    if (p.effects[name]) clearTimeout(p.effects[name]);
    if (name === 'jukeJuice') { p.jukeJuice = true; p.grip = this.now() + dur; p.ac = (PH.ACCEL + TU.JUKE_JUICE_BONUS) * s.accel; this.queue(p, 'jukeJuice', 'grip', 'ac'); }
    if (name === 'rollingBomb') { p.bomb = true; this.queue(p, 'bomb'); }
    if (name === 'tagpro') { p.tagpro = true; p.tagproTags = 0; this.queue(p, 'tagpro'); }
    if (name === 'topSpeed') { p.speed = true; p.ms = TU.TOP_SPEED_MAX * s.topspeed; this.queue(p, 'speed', 'ms'); }
    p.effects[name] = this.later(dur, () => this.clearEffect(p, name));
    // combinejjrb: picking up either juke juice or rolling bomb gives both
    if (s.combinejjrb && !opts.combined && (name === 'jukeJuice' || name === 'rollingBomb')) this.givePowerup(p, name === 'jukeJuice' ? 2 : 1, { silent: true, combined: true });
  }

  // spacebar uses held powerups: rolling bomb (default behaviour) detonates; juke juice (with
  // jukeJuiceBoost) acts like a boost and is used up. spacebarDetonateAll uses both at once,
  // otherwise the one collected first goes first.
  spacebar(p) {
    const s = this.settings;
    if (p.dead || !this.playing()) return;
    const usable = (p.collected || []).filter((n) =>
      (n === 'rollingBomb' && p.bomb && s.rollingBombBehavior !== 'classic') || (n === 'jukeJuice' && p.jukeJuice && s.jukeJuiceBoost));
    for (const n of s.spacebarDetonateAll ? usable : usable.slice(0, 1)) {
      if (n === 'rollingBomb') this.detonateRollingBomb(p);
      if (n === 'jukeJuice') { this.boost(p, s.jukeJuiceBoostPower / 100); this.clearEffect(p, 'jukeJuice'); }
    }
  }

  detonateRollingBomb(x) {
    const s = this.settings;
    this.clearEffect(x, 'rollingBomb');
    const pos = x.body.GetPosition();
    this.broadcast('bomb', { x: pos.x * PH.SCALE, y: pos.y * PH.SCALE, type: 1 });
    this.explosionSound({ x: pos.x, y: pos.y });
    this.explode({ x: pos.x, y: pos.y }, TU.ROLLING_BOMB_RADIUS * s.rollingBombDistanceMultipler, TU.ROLLING_BOMB_STRENGTH * s.rollingBombForceMultipler, x);
  }

  clearEffect(p, name) {
    if (!this.players[p.id]) return;
    clearTimeout(p.effects[name]);
    delete p.effects[name];
    if (p.collected) p.collected = p.collected.filter((n) => n !== name);
    const s = this.settings;
    if (name === 'jukeJuice') { p.jukeJuice = false; p.grip = false; p.ac = PH.ACCEL * s.accel; this.queue(p, 'jukeJuice', 'grip', 'ac'); }
    if (name === 'rollingBomb') { p.bomb = false; this.queue(p, 'bomb'); }
    if (name === 'tagpro') { p.tagpro = false; this.queue(p, 'tagpro'); }
    if (name === 'topSpeed') { p.speed = false; p.ms = PH.MAX_SPEED * s.topspeed; this.queue(p, 'speed', 'ms'); }
  }

  // ---------- tile interactions ----------
  tileAt(px, py) {
    const x = Math.round(px / PH.TILE), y = Math.round(py / PH.TILE);
    return (x >= 0 && y >= 0 && x < this.W && y < this.H) ? { x, y, t: this.tiles[x][y] } : null;
  }

  // tiles whose square overlaps the ball
  overlappingTiles(pos) {
    const out = [], R = PH.BALL_RADIUS, h = PH.TILE / 2;
    const x0 = Math.floor((pos.x - R + h) / PH.TILE), x1 = Math.floor((pos.x + R + h) / PH.TILE);
    const y0 = Math.floor((pos.y - R + h) / PH.TILE), y1 = Math.floor((pos.y + R + h) / PH.TILE);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) {
      if (x < 0 || y < 0 || x >= this.W || y >= this.H) continue;
      const cx = x * PH.TILE, cy = y * PH.TILE;
      const nx = Math.max(cx - h, Math.min(pos.x, cx + h)), ny = Math.max(cy - h, Math.min(pos.y, cy + h));
      const dist = Math.hypot(pos.x - nx, pos.y - ny);
      out.push({ x, y, t: this.tiles[x][y], center: Math.hypot(pos.x - cx, pos.y - cy), edge: dist });
    }
    return out;
  }

  touches(o, kind) { return o.center < PH.BALL_RADIUS + TU.TOUCH_RADIUS[kind]; }

  tileInteractions(p) {
    const pos = p.body.GetPosition();
    const tiles = this.overlappingTiles(pos);
    let onTeamTile = false, stillOnArrival = false;
    const nowTouching = new Set();
    // boosts, powerups and bombs fire only when the ball moves onto them: one that respawns under a
    // ball stays put until the ball leaves and comes back
    const wasOn = p.onPickups, nowOn = new Set();
    p.onPickups = nowOn;
    for (const o of tiles) {
      if (p.dead) return;
      const t = o.t, key = o.x + ',' + o.y;
      const base = typeof t === 'string' ? parseFloat(t) : t;
      const kind = PICKUP_KIND[Math.floor(base)];
      if (kind && this.touches(o, kind)) { nowOn.add(key); if (wasOn.has(key)) continue; }
      // team tiles speed up their own team (yellow: everyone), never a flag carrier (replays: 0/143 FCs boosted)
      if (o.edge < PH.BALL_RADIUS - 0.01 && !p.flag && ((base === T.RED_TILE && p.team === 1) || (base === T.BLUE_TILE && p.team === 2) || base === T.YELLOW_TILE)) onTeamTile = true;
      switch (base) {
        case T.RED_FLAG: case T.BLUE_FLAG: case T.RED_POTATO: case T.BLUE_POTATO: {
          if (!this.touches(o, 'flag')) break;
          const team = (base === T.RED_FLAG || base === T.RED_POTATO) ? 1 : 2;
          if (team !== p.team && !p.flag) this.grabFlag(p, team);
          else if (team === p.team && p.flag && p.flag !== p.team && !p.clutchFlag) this.capture(p);
          break;
        }
        case T.YELLOW_FLAG: {
          if (!this.touches(o, 'flag') || p.flag || typeof t === 'string') break;
          this.grabFlag(p, 3);
          break;
        }
        case T.RED_ENDZONE: case T.BLUE_ENDZONE: {
          if (p.flag !== 3 || o.edge >= PH.BALL_RADIUS - 0.01) break;
          if ((base === T.RED_ENDZONE && p.team === 1) || (base === T.BLUE_ENDZONE && p.team === 2)) this.capture(p);
          break;
        }
        case T.BOOST: case T.RED_BOOST: case T.BLUE_BOOST: {
          if (!this.touches(o, 'boost')) break;
          if ((base === T.RED_BOOST && p.team !== 1) || (base === T.BLUE_BOOST && p.team !== 2)) break;
          this.boost(p, 1, this.isTrusted(p)); // trusted: its client already boosted itself
          const empty = base + 0.1;
          this.setTile(o.x, o.y, String(Number(empty.toFixed(1))));
          this.timedRespawn(o.x, o.y, this.settings.speedPadRespawnTime, base, (i) => Number(empty.toFixed(1) + String(i).padStart(2, '0')));
          break;
        }
        case 6.1: case 6.2: case 6.3: case 6.4: {
          if (!this.touches(o, 'powerup')) break;
          this.givePowerup(p, Math.round((base - 6) * 10));
          this.schedulePowerup(o.x, o.y);
          break;
        }
        case T.BOMB: {
          if (!this.touches(o, 'bomb')) break;
          this.detonateBomb(o.x, o.y, this.isTrusted(p) ? p : null); // trusted: its client kicked itself
          break;
        }
        case T.BUTTON: if (this.touches(o, 'button')) nowTouching.add(key); break;
        case T.GATE_ON: case T.GATE_RED: case T.GATE_BLUE: {
          if (o.edge >= PH.BALL_RADIUS - 0.02) break;
          // pops on first contact only: a ball that survived it (rolling bomb) can roll on through;
          // a gate that switches on around a ball still pops it (replays: 98.2% vs 97.9% of gate segments)
          const gk = 'g' + this.gateGroup(o.x, o.y); // the whole connected gate counts as one thing
          if (wasOn.has(gk)) { nowOn.add(gk); break; }
          nowOn.add(gk);
          if (base === T.GATE_ON || (base === T.GATE_RED && p.team === 2) || (base === T.GATE_BLUE && p.team === 1)) this.pop(p, null);
          break;
        }
        case T.PORTAL: case T.RED_PORTAL: case T.BLUE_PORTAL: {
          if (!this.touches(o, 'portal')) break;
          if (key === p.arrivedOnPortal) { stillOnArrival = true; break; }
          if (this.isTrusted(p)) break; // the client teleports itself; see trustedMove
          if (typeof t === 'string') break;
          if ((base === T.RED_PORTAL && p.team !== 1) || (base === T.BLUE_PORTAL && p.team !== 2)) break;
          // the teleport lands the next tick (replays: 91.8% vs 87.3% of portal segments)
          if (!p.portalPending) p.portalPending = { x: o.x, y: o.y, base, tick: this.tick };
          break;
        }
        default: break;
      }
    }
    // the arrival portal re-arms once the ball has rolled off it
    if (p.arrivedOnPortal && !stillOnArrival && p.teleportTick !== this.tick) p.arrivedOnPortal = null;
    // buttons: track which buttons this player holds
    for (const key of p.touching) if (!nowTouching.has(key)) this.releaseButton(key, p);
    for (const key of nowTouching) if (!p.touching.has(key)) this.pressButton(key, p);
    p.touching = nowTouching;
    // team tiles speed the owner team up
    const ac = (PH.ACCEL + (p.jukeJuice ? TU.JUKE_JUICE_BONUS : 0) + (onTeamTile ? TU.TEAM_TILE_BONUS : 0)) * this.settings.accel;
    if (Math.abs(ac - p.ac) > 1e-9) { p.ac = ac; this.queue(p, 'ac'); }
    let ms = (p.speed ? TU.TOP_SPEED_MAX : onTeamTile ? TU.TEAM_TILE_MAX_SPEED : PH.MAX_SPEED) * this.settings.topspeed;
    if (this.egg) ms = this.eggTopSpeed(p, ms);
    if (Math.abs(ms - p.ms) > 1e-9) { p.ms = ms; this.queue(p, 'ms'); }
  }

  // clientDid: a local-trust ball that boosted itself (only the sound and the tile are left to do)
  boost(p, power = 1, clientDid = false) {
    if (clientDid) { this.broadcast('sound', { s: 'burst', v: 1 }); return; }
    const v = p.body.GetLinearVelocity();
    let dx = v.x, dy = v.y;
    const k = p.keys;
    if (Math.hypot(dx, dy) < 1e-3) { dx = (k.right ? 1 : 0) - (k.left ? 1 : 0); dy = (k.down ? 1 : 0) - (k.up ? 1 : 0); }
    const m = Math.max(Math.abs(dx), Math.abs(dy));
    if (m < 1e-6) return;
    // a boost is 3x the ball's current top speed: 7.5 normally, 15 on a team tile, and scaled by the
    // group's top speed setting (replays: 95.7% vs 89.0% of boost segments on team-tile maps; 82% vs
    // 12% on maps with a changed top speed)
    const speed = TU.BOOST_SPEED * p.ms / PH.MAX_SPEED;
    const k2 = speed * power / m; // straight: 7.5 m/s, diagonal: up to 7.5 * sqrt(2)
    p.body.SetLinearVelocity(new V(dx * k2, dy * k2));
    if (this.isTrusted(p)) this.send(p.client, 'ltVel', { vx: dx * k2, vy: dy * k2 }); // its client owns the ball
    this.broadcast('sound', { s: 'burst', v: 1 });
    this.queue(p, 'pos');
  }

  // selfKicked: the local-trust ball that set it off and already applied its own kick
  detonateBomb(x, y, selfKicked = null) {
    const at = { x: x * PH.TILE, y: y * PH.TILE };
    this.setTile(x, y, '10.1');
    this.broadcast('bomb', { x: x * 40, y: y * 40, type: 2 });
    this.explosionSound(at);
    this.explode(at, TU.BOMB_RADIUS, TU.BOMB_STRENGTH, selfKicked);
    this.timedRespawn(x, y, this.settings.dynamiteRespawnTime, T.BOMB, (i) => Number('10.1' + String(i).padStart(2, '0')));
  }

  explosionSound(at) {
    for (const c of this.clients) {
      const v = c.playerId && this.players[c.playerId];
      let vol = 1;
      if (v && !v.dead) { const pos = v.body.GetPosition(); vol = Math.min(1, 1 / Math.max(1, Math.hypot(pos.x - at.x, pos.y - at.y) * 2.5) ** 2 * 1); }
      this.send(c, 'sound', { s: 'explosion', v: vol });
    }
  }

  // trusted: the client already teleported itself (local trust), so no snap
  teleport(p, x, y, base, trusted) {
    const key = x + ',' + y;
    const conf = this.map.portals[key];
    if (!conf || !conf.destination) return;
    const d = conf.destination;
    const cooldown = Number(conf.cooldown) || 0;
    const v = p.body.GetLinearVelocity();
    p.body.SetPosition(new V(d.x * PH.TILE, d.y * PH.TILE));
    p.body.SetLinearVelocity(new V(v.x, v.y));
    p.arrivedOnPortal = d.x + ',' + d.y;
    p.teleportTick = this.tick;
    this.broadcast('sound', { s: 'teleport', v: 1 });
    // real server: flash + explosion at the destination, and directSet so clients snap instead of easing
    this.broadcast('bomb', { x: d.x * 40, y: d.y * 40, type: 3 });
    if (this.settings.poosts) this.explode({ x: d.x * PH.TILE, y: d.y * PH.TILE }, TU.PORTAL_RADIUS, TU.PORTAL_STRENGTH, p);
    if (!trusted) this.directSet(p);
    if (cooldown > 0) {
      const cool = (base + 0.1).toFixed(1);
      this.setTile(x, y, cool);
      const dk = d.x + ',' + d.y;
      const destIsPortal = this.map.portals[dk] && Math.floor(parseFloat(this.tiles[d.x][d.y])) === Math.floor(base) && typeof this.tiles[d.x][d.y] === 'number';
      if (destIsPortal && this.map.portals[dk].destination) this.setTile(d.x, d.y, (parseFloat(this.tiles[d.x][d.y]) + 0.1).toFixed(1));
      const gen = this.bumpTile(x, y);
      this.later(cooldown, () => {
        if (!this.tileCurrent(x, y, gen)) return;
        this.setTile(x, y, base);
        if (destIsPortal) this.setTile(d.x, d.y, Math.floor(parseFloat(this.tiles[d.x][d.y])) === T.PORTAL || [T.RED_PORTAL, T.BLUE_PORTAL].includes(Math.floor(parseFloat(this.tiles[d.x][d.y]))) ? Math.round(parseFloat(this.tiles[d.x][d.y]) - 0.1) : this.tiles[d.x][d.y]);
      });
    }
  }

  pressButton(key, p) {
    (this.buttonsHeld[key] || (this.buttonsHeld[key] = new Set())).add(p.id);
    this.updateGates(key);
    // a button can be wired to bombs too (e.g. Carrera NFC): stepping on it sets off the ready ones
    const sw = this.map.switches && this.map.switches[key];
    if (sw && sw.toggle) for (const t of sw.toggle) {
      const x = t.pos.x, y = t.pos.y;
      if (this.tiles[x] && this.tiles[x][y] === T.BOMB) this.detonateBomb(x, y);
    }
  }

  releaseButton(key, p) {
    const s = this.buttonsHeld[key];
    if (s) s.delete(p.id);
    this.updateGates(key);
  }

  // a toggle entry names one gate tile; the whole 8-connected gate it belongs to switches
  gateField(toggle) {
    const key = toggle.map((g) => g.pos.x + ',' + g.pos.y).join(';');
    this.gateFieldCache = this.gateFieldCache || {};
    if (this.gateFieldCache[key]) return this.gateFieldCache[key];
    const isGate = (x, y) => x >= 0 && y >= 0 && x < this.W && y < this.H && Math.floor(parseFloat(this.map.tiles[x][y])) === T.GATE_OFF;
    const seen = new Set(), out = [];
    for (const g of toggle) {
      const stack = [[g.pos.x, g.pos.y]];
      while (stack.length) {
        const [x, y] = stack.pop(), k = x + ',' + y;
        if (seen.has(k) || !isGate(x, y)) continue;
        seen.add(k); out.push([x, y]);
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if (dx || dy) stack.push([x + dx, y + dy]);
      }
    }
    return (this.gateFieldCache[key] = out);
  }

  // id of the 8-connected group of gate tiles (x, y) belongs to
  gateGroup(x, y) {
    if (!this.gateGroups) {
      this.gateGroups = {};
      let id = 0;
      const isGate = (a, b) => a >= 0 && b >= 0 && a < this.W && b < this.H && Math.floor(parseFloat(this.map.tiles[a][b])) === T.GATE_OFF;
      for (let a = 0; a < this.W; a++) for (let b = 0; b < this.H; b++) {
        if (!isGate(a, b) || this.gateGroups[a + ',' + b] !== undefined) continue;
        const stack = [[a, b]]; id++;
        while (stack.length) {
          const [u, v] = stack.pop(), k = u + ',' + v;
          if (this.gateGroups[k] !== undefined || !isGate(u, v)) continue;
          this.gateGroups[k] = id;
          for (let du = -1; du <= 1; du++) for (let dv = -1; dv <= 1; dv++) if (du || dv) stack.push([u + du, v + dv]);
        }
      }
    }
    return this.gateGroups[x + ',' + y] ?? (x + ',' + y);
  }

  // every button that controls a gate tile (a gate can be wired to several buttons)
  gateButtons(gx, gy) {
    if (!this.gateButtonMap) {
      this.gateButtonMap = {};
      for (const [bk, sw] of Object.entries(this.map.switches || {})) {
        if (!sw || !sw.toggle) continue;
        for (const [x, y] of this.gateField(sw.toggle)) (this.gateButtonMap[x + ',' + y] || (this.gateButtonMap[x + ',' + y] = new Set())).add(bk);
      }
    }
    return this.gateButtonMap[gx + ',' + gy] || new Set();
  }

  // Gate rules (confirmed): count red and blue players pressing ANY button wired to the gate;
  // more red -> red gate, more blue -> blue gate, a tie keeps the current colour. When nobody is
  // pressing, the gate keeps the last colour for the button's sticky timer, then goes back to its
  // default. Pressing again cancels the timer and switches instantly.
  updateGates(buttonKey) {
    const sw = this.map.switches[buttonKey];
    if (!sw || !sw.toggle) return;
    this.gateTimers = this.gateTimers || {};
    for (const [gx, gy] of this.gateField(sw.toggle)) {
      const gk = gx + ',' + gy;
      let red = 0, blue = 0;
      for (const bk of this.gateButtons(gx, gy)) {
        for (const id of this.buttonsHeld[bk] || []) {
          const q = this.players[id];
          if (!q || q.dead) continue;
          if (q.team === 1) red++; else blue++;
        }
      }
      const def = (this.map.fields[gk] || {}).defaultState || 'off';
      const defTile = { off: T.GATE_OFF, on: T.GATE_ON, red: T.GATE_RED, blue: T.GATE_BLUE }[def.toLowerCase()] ?? T.GATE_OFF;
      const set = (v) => { if (this.tiles[gx][gy] !== v) { this.setTile(gx, gy, v); this.gatesChanged = true; } };
      if (red || blue) {
        clearTimeout(this.gateTimers[gk]); delete this.gateTimers[gk];
        if (red > blue) set(T.GATE_RED);
        else if (blue > red) set(T.GATE_BLUE);
        continue; // tie: keep current
      }
      if (this.gateTimers[gk] || this.tiles[gx][gy] === defTile) continue;
      const sticky = (Number(sw.timer) || 0) * 1000; // map files give seconds (replays: gate reverts exactly timer s after release)
      if (sticky < 0) continue;               // -1: never goes back (stays the last team's colour)
      if (sticky === 0) { set(defTile); continue; }
      this.gateTimers[gk] = this.later(sticky, () => { delete this.gateTimers[gk]; set(defTile); });
    }
  }

  // ---------- player vs player ----------
  // Enemy touches normally arrive via BeginContact during the step. This catches the rest:
  // contacts that were already touching (e.g. tagpro picked up mid-contact) and pairs that
  // ghost modes filter out of Box2D collisions entirely.
  playerContacts() {
    for (let c = this.world.GetContactList(); c; c = c.GetNext()) {
      if (!c.IsTouching()) continue;
      const a = c.GetFixtureA().GetBody().player, b = c.GetFixtureB().GetBody().player;
      if (a && b && !a.dead && !b.dead && a.team !== b.team) this.enemyContact(a, b);
    }
    if (!this.settings.ghostMode || this.settings.ghostMode === 'disabled') return;
    const ps = Object.values(this.players).filter((p) => !p.dead);
    const reach = PH.BALL_RADIUS * 2;
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const a = ps[i], b = ps[j];
      if (a.dead || b.dead || a.team === b.team) continue;
      const fa = a.body.GetFixtureList().GetFilterData(), fb = b.body.GetFixtureList().GetFilterData();
      if ((fa.maskBits & fb.categoryBits) && (fb.maskBits & fa.categoryBits)) continue; // Box2D handles it
      const pa = a.body.GetPosition(), pb = b.body.GetPosition();
      if (Math.hypot(pa.x - pb.x, pa.y - pb.y) <= reach) this.enemyContact(a, b);
    }
  }

  // Tag rules (confirmed):
  // - touching an enemy flag carrier pops them; two flag carriers pop each other only with
  //   kissingFCs on ("no kiss" = nobody pops)
  // - a TagPro pops any enemy without TagPro; two TagPros pop each other only with kissingTPs on
  enemyContact(a, b) {
    const s = this.settings;
    if (s.rollingBombBehavior === 'classic') for (const x of [a, b]) if (x.bomb) this.detonateRollingBomb(x);
    const kills = (tagger, victim) => {
      if (this.egg) return this.egg.state === 'play' && this.egg.holder === victim.id; // only the egg holder pops
      if (tagger.tagpro && victim.tagpro) return !!s.kissingTPs;
      if (tagger.tagpro) return true;
      if (victim.flag) return tagger.flag ? !!s.kissingFCs : true;
      return false;
    };
    const pops = [];
    if (kills(a, b)) pops.push([b, a]);
    if (kills(b, a)) pops.push([a, b]);
    for (const [victim, killer] of pops) {
      if (this.now() < (victim.invincibleUntil || 0)) continue;
      if (killer.tagpro && !victim.flag) {
        killer.tagproTags++;
        if (s.tagproMaxTags && killer.tagproTags >= s.tagproMaxTags) this.clearEffect(killer, 'tagpro');
      }
    }
    for (const [victim, killer] of pops) if (this.now() >= (victim.invincibleUntil || 0)) this.pop(victim, killer);
  }

  resetMap() {
    for (let x = 0; x < this.W; x++) for (let y = 0; y < this.H; y++) {
      const orig = this.map.tiles[x][y], cur = this.tiles[x][y];
      const b = Math.floor(parseFloat(orig));
      if (![T.BOOST, T.RED_BOOST, T.BLUE_BOOST, T.BOMB, T.PORTAL, T.RED_PORTAL, T.BLUE_PORTAL, T.POWERUP].includes(b)) continue;
      this.bumpTile(x, y);
      let v = orig;
      if (b === T.POWERUP) { const k = this.randomPup(); v = k ? Number((6 + k / 10).toFixed(1)) : T.POWERUP; }
      if (String(cur) !== String(v)) this.setTile(x, y, v);
    }
  }

  // ---------- gravity mode ----------
  jumpLimit() { const n = Number(this.settings.jumpLimit); return n >= 51 ? Infinity : (Number.isFinite(n) ? n : 2); }

  jump(p) {
    if (p.dead || !this.playing()) return;
    if (p.jumpsLeft === undefined) p.jumpsLeft = this.jumpLimit();
    if (p.jumpsLeft <= 0) return;
    p.jumpsLeft--;
    const v = p.body.GetLinearVelocity();
    p.body.SetLinearVelocity(new V(v.x, v.y - TU.JUMP_SPEED));
    this.queue(p, 'pos');
  }

  // landing on the ground (a wall below the ball) restores jumps; optionally landing on a player
  // Jumps come back when the ball starts touching a surface below it (normal mostly up), whatever its
  // speed. Rolling onto a slope counts; a jump off flat ground doesn't (that contact already exists),
  // but jumping past a ledge corner or tile seam can begin a new one, which is TagPro's triple jump.
  // Replays: 10% fewer jump disagreements than resetting every tick the ball rests on the ground.
  landed(c, pa, pb) {
    if (!pa && !pb) return;
    if (pa && pb && !this.settings.isPlayerJumpResetEnabled) return;
    const wm = this.wm || (this.wm = new Box2D.Collision.b2WorldManifold());
    c.GetWorldManifold(wm);
    const n = wm.m_normal; // from A to B
    if (pa && !pa.dead && n.y > 0.5) pa.jumpsLeft = this.jumpLimit();
    if (pb && !pb.dead && n.y < -0.5) pb.jumpsLeft = this.jumpLimit();
  }

  // ---------- eggball ----------
  eggPacket() {
    const e = this.egg, b = e.body, pos = b.GetPosition(), v = b.GetLinearVelocity();
    return { id: e.id, type: 'egg', team: e.throwTeam === 2 ? 'Blue' : 'Red', directSet: false,
      rx: r2(pos.x), ry: r2(pos.y), lx: r2(v.x), ly: r2(v.y), a: r2(b.GetAngularVelocity()), draw: true };
  }

  eggWelcome(client, p) {
    const tip = (message) => this.send(client, 'chat', { from: null, message, to: p.id, c: EGG.TIP, for: p.id });
    tip('Play Egg Ball! Bring the egg to your end zone to score. 10-point mercy rule!');
    this.later(5000, () => this.players[p.id] && tip('You can pass the egg to your teammates by using the mouse and clicking.'));
    this.later(10000, () => this.players[p.id] && tip('Throwing an interception or getting tagged with the egg will cause you to pop.'));
    this.later(15000, () => this.players[p.id] && tip('You can score two points with a Raptor Boat. This occurs when you quickly bounce the egg off the wall to a teammate for the score.'));
    if (this.egg.body) this.send(client, 'object', this.eggPacket());
  }

  // pops during play respawn back in the team's own end; huddles (and the pregame) use random tiles
  // around the middle: red columns mid-10..mid, blue mid-1..mid+9, rows mid-6..mid+4 (replays: uniform)
  eggSpawnTile(team) {
    const mx = Math.floor(this.W / 2), my = Math.floor(this.H / 2);
    if (this.egg.state === 'play') return { x: team === 1 ? 6 : this.W - 7, y: my - 1 };
    const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    return team === 1 ? { x: rnd(mx - 10, mx), y: rnd(my - 6, my + 4) } : { x: rnd(mx - 1, mx + 9), y: rnd(my - 6, my + 4) };
  }

  eggTopSpeed(p, base) {
    const k = this.egg.holder === p.id ? EGG.HOLDER_SPEED : this.now() < (p.eggSlowUntil || 0) ? EGG.THROWER_SPEED : 1;
    return Math.round(base * k * 1000) / 1000;
  }

  eggState(state, holder) {
    this.egg.state = state; this.egg.holder = holder;
    this.broadcast('eggBall', { state, holder });
  }

  // the new holder's team hears an alert, the rest a drop
  eggAlert(holder) {
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      this.send(c, 'sound', viewer && viewer.team === holder.team ? { s: 'friendlyalert', v: 0.5 } : { s: 'drop', v: 0.5 });
    }
  }

  eggGive(p) {
    this.eggState(this.egg.state, p.id);
    p.potatoFlag = false; this.queue(p, 'potatoFlag');
    this.eggAlert(p);
  }

  eggLater(ms, fn) { const gen = this.egg.gen = (this.egg.gen || 0) + 1; this.later(ms, () => { if (!this.ended && this.egg.gen === gen) fn(); }); }

  // after a score (and at the start): 3 s of "HUDDLE UP!", then everyone resets
  eggWaiting() {
    this.eggState('waiting', this.egg.holder);
    this.broadcast('chat', { from: null, message: 'HUDDLE UP!', to: 'all', c: EGG.CHAT });
    this.eggLater(EGG.WAITING_MS, () => this.eggHuddle());
  }

  eggHuddle() {
    const e = this.egg;
    this.destroyEgg();
    this.eggState('huddle', e.holder);
    const all = Object.values(this.players);
    for (const p of all) this.pop(p, null, { huddle: true });
    // kickoff: a random team. Later: the team behind (eggballLosingTeamStarts, the default), else / on a
    // tie the team just scored on (replays: 1,000+ huddles, no exceptions in games with the setting)
    let team = e.kicked ? e.lastScoredOn : (Math.random() < 0.5 ? 1 : 2);
    if (e.kicked && this.settings.eggballLosingTeamStarts && this.score.r !== this.score.b) team = this.score.r < this.score.b ? 1 : 2;
    e.kicked = true;
    let pool = all.filter((p) => p.team === team);
    if (!pool.length) pool = all;
    if (pool.length) this.eggGive(pool[Math.floor(Math.random() * pool.length)]);
    else this.eggState('huddle', null);
    for (const p of all) this.spawnPlayer(p, this.respawnDelay());
    for (let i = 1; i <= 4; i++) this.later(i * 1000, () => { if (!this.ended && e.state === 'huddle') this.broadcast('chat', { from: null, message: 5 - i, to: 'all', c: EGG.CHAT }); });
    this.eggLater(EGG.PLAY_AFTER_HUDDLE_MS, () => {
      this.broadcast('sound', { s: 'go', v: 1 });
      this.eggState('play', e.holder);
    });
  }

  createEgg(x, y, team) {
    const e = this.egg;
    this.destroyEgg();
    const fd = new Box2D.Dynamics.b2FixtureDef(), bd = new Box2D.Dynamics.b2BodyDef();
    fd.density = EGG.DENSITY; fd.friction = EGG.FRICTION; fd.restitution = EGG.RESTITUTION;
    fd.shape = new Box2D.Collision.Shapes.b2CircleShape(EGG.RADIUS);
    fd.filter.categoryBits = EGG.CATEGORY; fd.filter.maskBits = EGG.MASK;
    bd.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    bd.linearDamping = EGG.LINEAR_DAMPING; bd.angularDamping = EGG.ANGULAR_DAMPING;
    bd.position.Set(x, y);
    e.body = this.world.CreateBody(bd);
    e.body.CreateFixture(fd);
    e.body.egg = true;
    e.id = e.nextId--; // the real server numbers eggs 0, -1, -2, ...
    e.throwTeam = team;
    e.bounced = false;
    return e.body;
  }

  destroyEgg() {
    const e = this.egg;
    if (!e.body) return;
    this.world.DestroyBody(e.body);
    e.body = null;
    this.broadcast('remove-egg', e.id);
  }

  // click: { x, y } in map pixels
  eggThrow(p, d) {
    const e = this.egg;
    if (e.state !== 'play' || e.holder !== p.id || p.dead || !d || !Number.isFinite(+d.x) || !Number.isFinite(+d.y) || this.world.IsLocked()) return;
    const pos = p.body.GetPosition();
    let dx = d.x / PH.SCALE - pos.x, dy = d.y / PH.SCALE - pos.y;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) return;
    dx /= len; dy /= len;
    this.eggState('play', null);
    this.send(p.client, 'sound', { s: 'throw', v: 1 });
    const now = this.now();
    p.flag = null; p.potatoFlag = null; p.selfDestructSoon = null;
    p.eggSlowUntil = now + EGG.THROWER_SLOW_MS;
    p.ms = this.eggTopSpeed(p, PH.MAX_SPEED * this.settings.topspeed);
    this.queue(p, 'flag', 'potatoFlag', 'selfDestructSoon', 'ms');
    const b = this.createEgg(pos.x + dx * EGG.SPAWN_OFFSET, pos.y + dy * EGG.SPAWN_OFFSET, p.team);
    b.ApplyImpulse(new V(dx * EGG.THROW_IMPULSE, dy * EGG.THROW_IMPULSE), b.GetWorldCenter());
    e.thrower = p.id; e.throwAt = now;
    this.broadcast('object', this.eggPacket());
  }

  // a loose egg where a holder dropped it (popped by something other than an enemy, or left)
  eggDrop(at, team) {
    if (this.world.IsLocked()) { const a = { x: at.x, y: at.y }; this.afterStep.push(() => this.egg.state === 'play' && this.egg.holder == null && !this.egg.body && this.eggDrop(a, team)); this.eggState('play', null); return; }
    this.eggState('play', null);
    this.createEgg(at.x, at.y, team);
    this.egg.thrower = null; this.egg.throwAt = -Infinity;
    this.broadcast('object', this.eggPacket());
  }

  eggHolderPopped(p, killer, at) {
    p.potatoFlag = null; this.queue(p, 'potatoFlag');
    if (this.egg.state !== 'play') return;
    if (killer && !killer.dead && killer.team !== p.team) this.eggGive(killer); // the tagger takes it
    else this.eggDrop(at, p.team);
  }

  eggHolderLeft(p) {
    const e = this.egg;
    if (e.state === 'play' && !p.dead) return this.eggDrop(p.body.GetPosition(), p.team);
    if (e.state === 'play') return this.eggDrop({ x: this.eggSpawnTile(p.team).x * PH.TILE, y: this.eggSpawnTile(p.team).y * PH.TILE }, p.team);
    const rest = Object.values(this.players).filter((q) => q !== p);
    const pool = rest.filter((q) => q.team === p.team).length ? rest.filter((q) => q.team === p.team) : rest;
    if (pool.length) this.eggGive(pool[Math.floor(Math.random() * pool.length)]); else this.eggState(e.state, null);
  }

  inOwnEndzone(p) {
    const zone = p.team === 1 ? T.RED_ENDZONE : T.BLUE_ENDZONE;
    return this.overlappingTiles(p.body.GetPosition()).some((o) => o.t === zone && o.edge < PH.BALL_RADIUS - 0.01);
  }

  eggTick(now) {
    const e = this.egg;
    if (e.state !== 'play') return;
    if (e.body) {
      const ep = e.body.GetPosition();
      for (const p of Object.values(this.players)) {
        if (p.dead) continue;
        const pos = p.body.GetPosition();
        if (Math.hypot(pos.x - ep.x, pos.y - ep.y) < PH.BALL_RADIUS + EGG.RADIUS) { this.eggCatch(p, now); break; }
      }
    }
    const h = e.holder != null && this.players[e.holder];
    if (h && !h.dead && e.state === 'play' && this.inOwnEndzone(h)) this.eggScore(h, null);
  }

  eggCatch(p, now) {
    const e = this.egg, thrower = e.thrower != null && this.players[e.thrower], since = now - e.throwAt;
    const at = e.body.GetPosition();
    if (thrower && p === thrower && since < EGG.SELF_SPLAT_MS) this.broadcast('splat', { x: Math.round(at.x * PH.SCALE), y: Math.round(at.y * PH.SCALE), t: p.team, temp: false });
    if (thrower && !thrower.dead && p.team !== e.throwTeam && since < EGG.INTERCEPT_MS) this.pop(thrower, p); // interception
    const boat = thrower && p !== thrower && p.team === e.throwTeam && e.bounced && since < EGG.BOAT_MS && this.inOwnEndzone(p);
    this.eggState('play', p.id);
    this.destroyEgg();
    p.potatoFlag = false; this.queue(p, 'potatoFlag');
    this.eggAlert(p);
    if (boat) this.eggScore(p, thrower);
  }

  // boatThrower: a Raptor Boat; the thrower's point goes on the board first (replays: boat, score,
  // then the usual huddle packets and the catcher's score; both get a capture)
  eggScore(p, boatThrower) {
    const add = (q) => { if (q.team === 1) this.score.r++; else this.score.b++; q['s-captures']++; this.queue(q, 's-captures'); };
    if (boatThrower) {
      this.broadcast('boat', Math.floor(Math.random() * EGG.RAPTORS));
      add(boatThrower);
      this.broadcast('score', this.score);
    }
    this.egg.lastScoredOn = p.team === 1 ? 2 : 1;
    this.eggWaiting();
    for (const c of this.clients) {
      const viewer = c.playerId && this.players[c.playerId];
      const friendly = viewer ? viewer.team === p.team : true;
      this.send(c, 'sound', { s: friendly ? 'cheering' : 'sigh', v: friendly ? 1 : 0.75 });
    }
    add(p);
    p.flag = null; p.potatoFlag = null; p.selfDestructSoon = null;
    this.queue(p, 'flag', 'potatoFlag', 'selfDestructSoon');
    this.broadcast('score', this.score);
    this.checkWinConditions(true);
  }

  // ---------- main loop ----------
  start() {
    this.startedAt = this.now();
    this.lastTime = this.now();
    this.acc = 0;
    const loop = () => {
      if (this.closed) return;
      const now = this.now();
      this.acc += now - this.lastTime;
      this.lastTime = now;
      let n = 0;
      while (this.acc >= 1000 / 60 && n++ < 10) { this.acc -= 1000 / 60; this.step(); }
      if (n >= 10) this.acc = 0;
      this.loopHandle = setTimeout(loop, 4);
    };
    loop();
  }

  playing() { return [STATES.ACTIVE, STATES.OVERTIME, STATES.CLUTCH].includes(this.state); }

  step() {
    this.tick++;
    const now = this.now();
    this.updateClock(now);
    if (this.playing()) {
      // the real server checks tiles at the start of the tick, before the step, and its position
      // snapshot goes out before the next tick's checks (a boost is announced right after a snapshot)
      this.interactions();
      for (const p of Object.values(this.players)) if (!p.dead) p.body.SetAwake(true);
      for (const w of this.gravityWells) {
        for (const p of Object.values(this.players)) {
          if (p.dead) continue;
          const c = p.body.GetWorldCenter();
          const o = new V(c.x - w.x, c.y - w.y);
          const len = o.Length();
          if (len > PH.GRAVITY_WELL_RANGE || len < 1e-6) continue;
          const f = PH.GRAVITY_WELL_FORCE * this.settings.gravityWellForce * p.body.GetMass() / (len * len);
          o.NegativeSelf(); o.Multiply(f);
          p.body.ApplyImpulse(o, c);
        }
      }
      this.world.Step(PH.STEP, PH.VELOCITY_ITERATIONS, PH.POSITION_ITERATIONS);
      // the real server adds key acceleration AFTER the world step (the official client predicts it
      // before); replays only line up this way: 99.7% of 250 ms segments vs 94% (tools/repro)
      if (!this.egg || this.egg.state === 'play') this.applyMovement(); // eggball: nobody moves outside play
      // local trust: a trusted ball stays exactly where its client last put it (no drift into
      // spikes etc. between reports); contacts from this step still count
      for (const p of Object.values(this.players)) {
        const l = !p.dead && this.isTrusted(p) && this.trust.get(p);
        if (l) { p.body.SetPosition(new V(l.x, l.y)); p.body.SetLinearVelocity(new V(l.vx, l.vy)); }
      }
      for (const fn of this.afterStep.splice(0)) fn();
      this.playerContacts();
      if (this.egg) this.eggTick(now);
      this.afkCheck(now);
      const pt = Number(this.settings.potatoTime) || 0;
      if (pt > 0) for (const p of Object.values(this.players)) if (p.flag && p.potatoFlag && now - p.grabbedAt >= pt) this.pop(p, null);
      if (this.tick % 60 === 0) this.secondTick(now);
    }
    if (this.pendingTiles.length) { this.broadcast('mapupdate', this.pendingTiles.length === 1 ? this.pendingTiles[0] : this.pendingTiles); this.pendingTiles = []; }
    if (this.pendingDirectReset) {
      for (const p of this.pendingDirectReset) if (this.players[p.id] && p.directSet) { p.directSet = false; this.queue(p, 'directSet'); }
      this.pendingDirectReset = null;
    }
    this.flushDirty();
    if (this.resetDirectSet && this.resetDirectSet.size) { this.pendingDirectReset = this.resetDirectSet; this.resetDirectSet = null; }
    if (this.tick % TU.SNAPSHOT_TICKS === 0) { this.snapshot(); if (this.egg && this.egg.body) this.egg.sync = true; }
    if (this.egg && this.egg.sync) { this.egg.sync = false; if (this.egg.body) this.broadcast('object', this.eggPacket()); }
  }

  // tiles under each ball (boosts, bombs, flags, portals...), and teleports due this tick
  interactions() {
    for (const p of Object.values(this.players)) {
      const q = p.portalPending;
      if (!q || q.tick >= this.tick) continue;
      p.portalPending = null;
      if (!p.dead && String(this.tiles[q.x][q.y]) === String(q.base)) this.teleport(p, q.x, q.y, q.base);
    }
    for (const p of Object.values(this.players)) if (!p.dead) this.tileInteractions(p);
  }

  // arrow keys: add ac per tick up to ms on each axis
  applyMovement() {
    for (const p of Object.values(this.players)) {
      if (p.dead) continue;
      p.body.SetAwake(true);
      if (this.isTrusted(p) && this.trust.has(p)) continue; // its client moves it
      if (p.wantJump) { p.wantJump = false; this.jump(p); }
      const v = p.body.GetLinearVelocity();
      const ms = p.ms, ac = p.ac, k = p.keys;
      if (k.left && v.x > -ms) v.x -= ac;
      if (k.right && v.x < ms) v.x += ac;
      if (k.up && v.y > -ms) v.y -= ac;
      if (k.down && v.y < ms) v.y += ac;
      p.body.SetLinearVelocity(v);
    }
  }

  secondTick(now) {
    for (const p of Object.values(this.players)) {
      p.playTime = mmss(now - p.joinedAt); this.queue(p, 'playTime');
      if (p.flag) { p['s-hold']++; this.queue(p, 's-hold'); }
      else if (!p.dead && this.flagAtHome(p.team)) {
        const h = this.flagHome[p.team], pos = p.body.GetPosition();
        if (Math.hypot(pos.x - h.x * PH.TILE, pos.y - h.y * PH.TILE) < 8 * PH.TILE) { p['s-prevent']++; this.queue(p, 's-prevent'); }
      }
      const sc = p['s-captures'] * 100 + p['s-grabs'] * 5 + p['s-tags'] * 5 + p['s-returns'] * 5 + p['s-hold'] + p['s-prevent'] + p['s-powerups'] * 5 - p['s-pops'];
      if (sc !== p.score) { p.score = sc; this.queue(p, 'score'); }
    }
  }

  afkCheck(now) {
    if (this.settings.noAfkKick) return; // single player: nobody is waiting on you
    for (const p of Object.values(this.players)) {
      const idle = now - Math.max(p.lastInput, this.startedPlayAt || 0);
      const kickAt = this.settings.mapTestingMode ? TU.MAPTEST_AFK_KICK_MS : TU.AFK_KICK_MS;
      const warnAt = kickAt - (TU.AFK_KICK_MS - TU.AFK_WARN_MS);
      if (idle > kickAt) {
        const c = p.client;
        this.send(c, 'disconnectReason', 'afk');
        this.removeClient(c);
        try { c.disconnect(); } catch (e) { /* ignore */ }
      } else if (idle > warnAt && !p.afkWarned) {
        p.afkWarned = true;
        this.send(p.client, 'chat', { from: null, message: 'MOVE! It looks like you are AFK and we are about to kick you for it!', to: p.id, c: '#ff8f8f', for: p.id });
        this.send(p.client, 'sound', { s: 'bing', v: 1 });
      } else if (idle < warnAt) p.afkWarned = false;
    }
  }

  // ---------- clock / state machine ----------
  setState(state, time) {
    this.state = state;
    this.broadcast('time', { time, state });
  }

  updateClock(now) {
    if (this.ended) return;
    if (now - this.lastClockSync >= TU.CLOCKSYNC_MS) {
      this.lastClockSync = now;
      const time = this.state === STATES.OVERTIME ? now - this.overtimeStartedAt : Math.max(0, this.stateEndsAt - now);
      this.broadcast('clocksync', { time, state: this.state });
    }
    if (this.state === STATES.COUNTDOWN && now >= this.stateEndsAt) {
      this.stateEndsAt = now + this.settings.time * 60000;
      this.startedPlayAt = now;
      this.lastClockSync = now;
      for (const p of Object.values(this.players)) p.lastInput = now;
      this.setState(STATES.ACTIVE, this.stateEndsAt - now);
      this.startPowerups();
      if (this.egg) this.eggWaiting(); // eggball starts with a huddle; "go" comes when play starts
      else this.broadcast('sound', { s: 'go', v: 1 });
    } else if (this.state === STATES.CLUTCH) {
      if (!Object.values(this.players).some((p) => p.flag && p.clutchHolder)) this.timeUp(now, true);
    } else if (this.state === STATES.ACTIVE && now >= this.stateEndsAt) {
      const holders = Object.values(this.players).filter((p) => p.flag && this.clutchEligible(p));
      if (holders.length) {
        for (const p of holders) p.clutchHolder = true;
        this.setState(STATES.CLUTCH, this.stateEndsAt - now);
        this.broadcast('chat', { from: null, message: 'Clutch Time for held flags!', to: 'all', c: '#BFFF00' });
        for (const c of this.clients) if (c.playerId) this.send(c, 'chat', { from: null, message: "Play continues until all flags are returned. You can grab the flag from the enemy's base to keep them from capping, but only flags held at the start of Clutch Time can be used to score.", to: c.playerId, c: '#63FE22', for: c.playerId });
      } else this.timeUp(now);
    }
  }

  // lastPossession: does this flag carrier's team get clutch time when the clock runs out?
  clutchEligible(p) {
    const mine = p.team === 1 ? this.score.r : this.score.b, theirs = p.team === 1 ? this.score.b : this.score.r;
    switch (this.settings.lastPossession) {
      case 'always': return true;
      case 'tied': return mine === theirs;
      case 'winnable': return mine === theirs - 1;
      case 'tiedOrWinnable': return mine === theirs || mine === theirs - 1;
      default: return false;
    }
  }

  timeUp(now) {
    {
      if (this.score.r === this.score.b && this.settings.overtime) {
        this.overtimeStartedAt = now;
        this.setState(STATES.OVERTIME, 1);
        this.broadcast('sound', { s: 'overtime', v: 1 });
        this.broadcast('chat', { from: null, message: 'OVERTIME! Next cap wins.', to: 'all', c: '#D4AF37' });
      } else this.end(this.score.r > this.score.b ? 'red' : this.score.b > this.score.r ? 'blue' : 'tie', false);
    }
  }

  checkWinConditions() {
    const { r, b } = this.score, s = this.settings;
    if (this.state === STATES.OVERTIME && r !== b) return this.end(r > b ? 'red' : 'blue', false);
    if (s.caps && (r >= s.caps || b >= s.caps)) return this.end(r > b ? 'red' : 'blue', false);
    if (s.mercyRule && Math.abs(r - b) >= s.mercyRule) return this.end(r > b ? 'red' : 'blue', true);
  }

  end(winner, isMercy) {
    if (this.ended) return;
    this.ended = true;
    this.state = STATES.ENDED;
    this.winner = winner;
    for (const p of Object.values(this.players)) if (this.playerHistory && this.playerHistory[p.id]) this.playerHistory[p.id].finished = true;
    this.broadcast('end', { winner, ranked: false, isMercy: !!isMercy });
    this.onEnd(this, winner);
    this.later(TU.END_LINGER_MS, () => this.close());
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    clearTimeout(this.loopHandle);
    for (const h of this.timers) clearTimeout(h);
    for (const c of [...this.clients]) { try { c.disconnect(); } catch (e) { /* ignore */ } }
    this.clients.clear();
    this.onEmpty(this);
  }
}

const api = { GameRoom, PUBLIC_DEFAULTS, T, TRUST_GHOST, EGG_CLIENT_INFO };
if (isNode) module.exports = api;
else globalThis.TPGame = api;
})();

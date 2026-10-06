#!/usr/bin/env node
// attach-demo.js - attaches the trained policy (BoostDriver) to a player in a real game room on one of
// this site's maps (with the map's own boosts, bombs, spikes and gates) and sends it to the enemy flag
// from random spawns. Compares it with the same path finding driven straight at each waypoint.
//   node ml/attach-demo.js [mapKey ...] [--runs N] [--model FILE]
// Headless: the room runs on a simulated clock, so this takes seconds.
const fs = require('fs');
const path = require('path');
const { GameRoom } = require('../engine/game');
const { loadMap } = require('../engine/mapLoader');
const { STATES } = require('../engine/constants');
const { decodePng } = require('./png');
const { Policy, BoostDriver } = require('./policy');
const { straightLine, rng } = require('./env');

const root = path.join(__dirname, '..');
const a = process.argv.slice(2);
const flag = (k, d) => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : d; };
const runs = Number(flag('runs', 20));
const modelFile = flag('model', path.join(__dirname, 'models', 'boost-policy.json'));
let keys = a.filter((x, i) => !x.startsWith('--') && !(i > 0 && a[i - 1].startsWith('--')));
if (!keys.length) keys = ['74724', '69860', '77073', '92282'];

const policy = new Policy(JSON.parse(fs.readFileSync(modelFile, 'utf8')));
const straight = { act: (obs) => straightLine(obs) }; // same interface as Policy
const defaults = JSON.parse(fs.readFileSync(path.join(root, 'defaults.json'), 'utf8'));

// one run: a fresh room (like engine/worker.js builds it), our player at a random spawn, drive to the
// enemy (or neutral) flag. Returns { seconds, reached, boosts, bombs, pops }
function trial(map, driverPolicy, seed) {
  let clock = 0, timers = [];
  const room = new GameRoom({
    id: 'demo', map, mapName: map.info.name, isPrivate: true, now: () => clock,
    settings: Object.assign({}, defaults, { isPrivate: true, map: 'demo', mode: 'ctf', noAfkKick: true, time: 1e6 }),
  });
  room.later = (ms, fn) => { const h = { at: clock + ms, fn }; timers.push(h); return h; };
  const advance = () => {
    clock += 1000 / 60;
    const due = timers.filter((h) => h.at <= clock);
    if (due.length) { timers = timers.filter((h) => h.at > clock); for (const h of due) h.fn(); }
    room.step();
  };
  const counts = { boosts: 0, bombs: 0 };
  const client = {
    emit(ev, d) {
      if (ev === 'sound' && d.s === 'burst') counts.boosts++;
      if (ev === 'bomb' && d.type === 2) counts.bombs++;
    },
    disconnect() {},
  };
  const rand = rng(seed), random = Math.random;
  Math.random = rand; // the room picks the spawn spot with Math.random: same spawns for both drivers
  try {
    room.addClient(client, { publicId: 'ai', name: 'AI', auth: null }, { team: 1 });
    clock += 20001; advance(); // skip the countdown
    if (room.state !== STATES.ACTIVE) throw new Error('room did not start');
    const p = room.players[client.playerId];
    const flag = room.flagHome[2] || room.flagHome[3]; // the blue flag, or the neutral one
    const driver = new BoostDriver(driverPolicy, room, p);
    driver.setTarget({ x: flag.x * 0.4, y: flag.y * 0.4 });
    for (let t = 0; t < 60 * 30; t++) {
      driver.tick();
      advance();
      if (p.flag || driver.arrived()) return Object.assign({ seconds: (t + 1) / 60, reached: true, pops: p['s-pops'] }, counts);
    }
    return Object.assign({ seconds: 30, reached: false, pops: p['s-pops'] }, counts);
  } finally { Math.random = random; room.close(); }
}

console.log(`${runs} runs per map from random red spawns to the blue (or neutral) flag, 30 s limit\n`);
for (const key of keys) {
  const map = loadMap(decodePng(fs.readFileSync(path.join(root, 'maps', key + '.png'))), JSON.parse(fs.readFileSync(path.join(root, 'maps', key + '.json'), 'utf8')));
  if (!map.tiles.some((c) => c.some((t) => t === 4 || t === 16))) { console.log(`${map.info.name}: no flag to run to, skipped`); continue; }
  const res = { ai: [], straight: [] };
  for (let i = 0; i < runs; i++) {
    res.ai.push(trial(map, policy, 1000 + i));
    res.straight.push(trial(map, straight, 1000 + i));
  }
  const sum = (list) => {
    const ok = list.filter((r) => r.reached);
    const avg = (f) => list.reduce((s, r) => s + r[f], 0) / list.length;
    return `reached ${ok.length}/${list.length}, avg ${(ok.reduce((s, r) => s + r.seconds, 0) / (ok.length || 1)).toFixed(2)}s, ` +
      `boosts ${avg('boosts').toFixed(1)}, bombs ${avg('bombs').toFixed(1)}, pops ${avg('pops').toFixed(1)} per run`;
  };
  console.log(`${map.info.name} (${key})`);
  console.log(`  AI policy:     ${sum(res.ai)}`);
  console.log(`  straight line: ${sum(res.straight)}`);
}

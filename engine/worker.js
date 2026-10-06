// engine-worker.js - the static site's game server: the GameRoom and its bots run in this Web Worker,
// off the page's main thread (which only draws), like the real game server on another machine.
// Talks to static/local-game.js with messages:
//   page -> worker: { type: 'start', choice, image: { width, height, data }, json } | { type: 'ev', ev, d } | { type: 'leave' }
//   worker -> page: { type: 'events', list: [[ev, d], ...] } | { type: 'disconnect' } | { type: 'error', message }
importScripts('box2d.js', 'constants.js', 'mapLoader.js', 'game.js', 'botBrain.js');
const { GameRoom } = self.TPGame;
const { loadMap } = self.TPMapLoader;
const { BotBrain } = self.TPBotBrain;

let room = null, player = null;

// everything sent to the page in one run of the game loop goes in one message (like socket frames)
let pending = [];
function send(ev, d) {
  if (!pending.length) queueMicrotask(flush);
  pending.push([ev, d]);
}
function flush() {
  const list = pending; pending = [];
  try { postMessage({ type: 'events', list }); } catch (e) { postMessage({ type: 'events', list: JSON.parse(JSON.stringify(list)) }); }
}

const UNREGISTERED = /^Hi! You're currently playing unregistered/; // there's no log in here

// a bot: a game client whose events go straight to its brain
function addBot(i, team) {
  let timer = null;
  const client = { emit: (ev, d) => brain.receive(ev, d), disconnect: () => clearInterval(timer) }; // the brain copies what it keeps
  const brain = new BotBrain(i, (ev, d) => client.onEvent && client.onEvent(ev, d));
  room.addClient(client, { publicId: 'bot' + i, name: 'Bot ' + (i + 1), auth: null }, { team });
  timer = setInterval(() => {
    if (room.closed) return clearInterval(timer);
    try { brain.think(); } catch (e) { console.error('bot', i + 1, e); clearInterval(timer); }
  }, 50);
}

function start({ choice, image, json }) {
  const map = loadMap(image, json);
  // the group defaults, then the launcher's Game settings (every group setting)
  const settings = Object.assign({}, choice.defaults || {}, choice.settings || {}, {
    isPrivate: true, map: choice.map, mode: choice.mode, noAfkKick: true,
  });
  room = new GameRoom({ id: 'local', uuid: 'local-' + Date.now(), map, mapName: map.info.name, settings, isPrivate: true });
  if (!room.egg && [1, 2].some((t) => !room.spawnTiles[t].length)) throw new Error(`The map "${room.mapName}" has no valid spawns, so it can't be played.`);
  room.start();
  const enemy = choice.team === 1 ? 2 : 1;
  let n = 0;
  for (let i = 0; i < choice.allies; i++) addBot(n++, choice.team);
  for (let i = 0; i < choice.enemies; i++) addBot(n++, enemy);
  player = {
    emit: (ev, d) => { if (!(ev === 'chat' && d && UNREGISTERED.test(d.message))) send(ev, d); },
    disconnect: () => { flush(); postMessage({ type: 'disconnect' }); },
  };
  room.addClient(player, { publicId: 'local', name: choice.name || 'Some Ball', auth: null }, { team: choice.team });
}

onmessage = (e) => {
  const m = e.data;
  try {
    if (m.type === 'start') start(m);
    else if (m.type === 'ev') { if (player && player.onEvent) player.onEvent(m.ev, m.d); }
    else if (m.type === 'leave') { if (room) room.close(); }
    else if (m.type === 'end' && room) room.end(room.score.r > room.score.b ? 'red' : room.score.b > room.score.r ? 'blue' : 'tie', false); // tests
  } catch (err) {
    console.error(err);
    postMessage({ type: 'error', message: (err && err.message) || 'The game stopped.' });
  }
};

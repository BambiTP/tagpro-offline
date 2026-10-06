// local-game.js - the static single-player site's game: the authoritative GameRoom (engine/game.js)
// runs in this page, and window.io hands the real client a fake socket wired straight to it.
// Loaded in place of socket.io, after the engine scripts. The launcher (index.html) leaves the
// chosen game in sessionStorage ("tpl-game").
(function () {
  let choice = null;
  try { choice = JSON.parse(sessionStorage.getItem('tpl-game') || 'null'); } catch (e) { /* none */ }
  if (!choice) { location.replace('./'); return; }
  if (choice.mode === 'gravity') document.write('<script src="./R-62bb0909b74c-z/scripts/gravity.js"><\/script>');

  const { GameRoom } = globalThis.TPGame;
  const { loadMap } = globalThis.TPMapLoader;
  const { BotBrain } = globalThis.TPBotBrain;
  const clone = (d) => (d === undefined ? d : JSON.parse(JSON.stringify(d))); // what a real socket does to every packet

  // ---- a tiny socket: events in both directions are delivered asynchronously and in order ----
  class FakeSocket {
    constructor() { this.handlers = {}; this.connected = false; this.io = { engine: { transport: { polling: false } } }; this.id = 'local'; }
    on(ev, fn) { (this.handlers[ev] || (this.handlers[ev] = [])).push(fn); return this; }
    once(ev, fn) { const w = (...a) => { this.removeListener(ev, w); fn(...a); }; return this.on(ev, w); }
    removeListener(ev, fn) { this.handlers[ev] = (this.handlers[ev] || []).filter((f) => f !== fn); return this; }
    off(ev, fn) { return this.removeListener(ev, fn); }
    listeners(ev) { return (this.handlers[ev] || []).slice(); }
    fire(ev, ...a) { for (const fn of this.listeners(ev)) { try { fn(...a); } catch (e) { console.error(e); } } }
    emitEvent(packet) { this.fire(packet[0], packet[1]); } // the client's "bulk" packets
    emit() { return this; }
    disconnect() { if (this.connected) { this.connected = false; this.fire('disconnect', 'io client disconnect'); } return this; }
    close() { return this.disconnect(); }
  }

  // ---- maps: the site's own maps/ folder, or one added on the launcher (kept in localStorage) ----
  function customMaps() { try { return JSON.parse(localStorage.getItem('tpl-maps') || '{}'); } catch (e) { return {}; } }
  async function decodePng(blob) {
    const bmp = await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' });
    const c = document.createElement('canvas');
    c.width = bmp.width; c.height = bmp.height;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bmp, 0, 0);
    return { width: c.width, height: c.height, data: ctx.getImageData(0, 0, c.width, c.height).data };
  }
  async function readMap(key) {
    const custom = customMaps()[key];
    if (custom) return loadMap(await decodePng(await (await fetch(custom.png)).blob()), custom.json);
    const [png, json] = await Promise.all([fetch('./maps/' + encodeURIComponent(key) + '.png'), fetch('./maps/' + encodeURIComponent(key) + '.json')]);
    if (!png.ok || !json.ok) throw new Error('map ' + key + ' not found');
    return loadMap(await decodePng(await png.blob()), await json.json());
  }

  async function makeRoom() {
    const map = await readMap(choice.mode === 'eggball' ? 'eggball' : choice.map);
    const settings = Object.assign({}, choice.defaults || {}, {
      isPrivate: true, map: choice.map, mode: choice.mode, time: choice.time, caps: choice.caps, mercyRule: 0,
      mapTestingMode: !!choice.mapTestingMode,
    });
    const room = new GameRoom({ id: 'local', uuid: 'local-' + Date.now(), map, mapName: map.info.name, settings, isPrivate: true });
    if (!room.egg && [1, 2].some((t) => !room.spawnTiles[t].length)) throw new Error(`The map "${room.mapName}" has no valid spawns, so it can't be played.`);
    room.start();
    const enemy = choice.team === 1 ? 2 : 1;
    let n = 0;
    for (let i = 0; i < choice.allies; i++) addBot(room, n++, choice.team);
    for (let i = 0; i < choice.enemies; i++) addBot(room, n++, enemy);
    return room;
  }

  // a bot: a game client whose events go straight to its brain
  function addBot(room, i, team) {
    let timer = null;
    const client = { emit: (ev, d) => brain.receive(ev, clone(d)), disconnect: () => clearInterval(timer) };
    const brain = new BotBrain(i, (ev, d) => client.onEvent && client.onEvent(ev, d));
    room.addClient(client, { publicId: 'bot' + i, name: 'Bot ' + (i + 1), auth: null }, { team });
    timer = setInterval(() => {
      if (room.closed) return clearInterval(timer);
      try { brain.think(); } catch (e) { console.error('bot', i + 1, e); clearInterval(timer); }
    }, 50);
  }

  const UNREGISTERED = /^Hi! You're currently playing unregistered/; // there's no log in here
  function gameSocket() {
    const s = new FakeSocket();
    const toServer = [];
    let client = null;
    s.emit = (ev, d) => {
      if (ev === 'disconnect') return s;
      const pkt = [ev, clone(d)];
      if (client) queueMicrotask(() => client.onEvent && client.onEvent(pkt[0], pkt[1]));
      else toServer.push(pkt);
      return s;
    };
    makeRoom().then((room) => {
      window.tplRoom = room;
      client = {
        emit: (ev, d) => {
          if (ev === 'chat' && d && UNREGISTERED.test(d.message)) return;
          const data = clone(d);
          queueMicrotask(() => s.fire(ev, data));
        },
        disconnect: () => queueMicrotask(() => s.disconnect()),
      };
      s.connected = true;
      s.fire('connect');
      room.addClient(client, { publicId: 'local', name: choice.name || 'Some Ball', auth: null }, { team: choice.team });
      for (const [ev, d] of toServer.splice(0)) client.onEvent && client.onEvent(ev, d);
      s.disconnect = () => { if (s.connected) { s.connected = false; room.removeClient(client); s.fire('disconnect', 'io client disconnect'); } return s; };
      addEventListener('pagehide', () => room.close());
    }).catch((e) => {
      console.error(e);
      alert((e && e.message) || "That map couldn't be loaded.");
      location.replace('./');
    });
    return s;
  }

  let game = null;
  window.io = {
    connect(url) {
      // the game socket; anything else (joiner, groups, ping tests) has no server here: a socket that never connects
      if (String(url).includes('/local') && !game) return (game = gameSocket());
      return new FakeSocket();
    },
  };
  window.io.connect.toString = () => 'local';

  // texture pack chosen on the Textures page (its "textures" cookie), like the server-rendered page
  const ASSET_IDS = { tiles: 'tiles', splats: 'splats', speedpad: 'speedpad', speedpadRed: 'speedpadred', speedpadBlue: 'speedpadblue', portal: 'portal', portalRed: 'portalred', portalBlue: 'portalblue' };
  const okUrl = (u) => typeof u === 'string' && (/^\.?\/textures\/[\w-]+\/[\w-]+\.png$/.test(u) || /^https:\/\/[^"'<>\s]+$/.test(u));
  window.tplApplyTextures = function () {
    if (choice.mode === 'eggball') return; // eggball has its own tiles
    let pack = null;
    try { const m = document.cookie.match(/(?:^|;\s*)textures=([^;]*)/); pack = m && JSON.parse(decodeURIComponent(m[1])); } catch (e) { pack = null; }
    if (!pack || typeof pack !== 'object') return;
    for (const [key, id] of Object.entries(ASSET_IDS)) {
      const img = document.getElementById(id);
      if (img && okUrl(pack[key])) img.src = pack[key].startsWith('/') ? '.' + pack[key] : pack[key];
    }
  };
})();

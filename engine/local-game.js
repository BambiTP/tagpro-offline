// local-game.js - the static single-player site's game page: the real client gets a fake socket
// (window.io) wired to the game server, which runs in a Web Worker (engine/worker.js) so this page's
// main thread only draws. Loaded in place of socket.io. The launcher (index.html) leaves the chosen
// game in sessionStorage ("tpl-game").
(function () {
  let choice = null;
  try { choice = JSON.parse(sessionStorage.getItem('tpl-game') || 'null'); } catch (e) { /* none */ }
  if (!choice) { location.replace('./'); return; }
  if (choice.mode === 'gravity') document.write('<script src="./R-62bb0909b74c-z/scripts/gravity.js"><\/script>');
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
  // the map's image (decoded here: workers can't always use a canvas) and logic
  async function readMap(key) {
    const custom = customMaps()[key];
    if (custom) return { image: await decodePng(await (await fetch(custom.png)).blob()), json: custom.json };
    const [png, json] = await Promise.all([fetch('./maps/' + encodeURIComponent(key) + '.png'), fetch('./maps/' + encodeURIComponent(key) + '.json')]);
    if (!png.ok || !json.ok) throw new Error('map ' + key + ' not found');
    return { image: await decodePng(await png.blob()), json: await json.json() };
  }

  function failed(message) {
    alert(message || "That map couldn't be loaded.");
    location.replace('./');
  }

  function gameSocket() {
    const s = new FakeSocket();
    const toServer = [];
    let worker = null;
    s.emit = (ev, d) => {
      if (ev === 'disconnect') return s;
      if (worker) worker.postMessage({ type: 'ev', ev, d: clone(d) });
      else toServer.push({ type: 'ev', ev, d: clone(d) });
      return s;
    };
    readMap(choice.mode === 'eggball' ? 'eggball' : choice.map).then(({ image, json }) => {
      worker = new Worker('./engine/worker.js');
      window.tplWorker = worker;
      worker.onerror = (e) => { console.error(e); failed('The game stopped: ' + (e.message || 'error')); };
      worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'events') { for (const [ev, d] of m.list) s.fire(ev, d); }
        else if (m.type === 'disconnect') { if (s.connected) { s.connected = false; s.fire('disconnect', 'io server disconnect'); } }
        else if (m.type === 'error') failed(m.message);
      };
      s.connected = true;
      s.fire('connect');
      worker.postMessage({ type: 'start', choice, image: { width: image.width, height: image.height, data: image.data }, json });
      for (const m of toServer.splice(0)) worker.postMessage(m);
      s.disconnect = () => { if (s.connected) { s.connected = false; worker.postMessage({ type: 'leave' }); s.fire('disconnect', 'io client disconnect'); } return s; };
      addEventListener('pagehide', () => worker.terminate());
    }).catch((e) => { console.error(e); failed(e && e.message); });
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

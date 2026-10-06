// launcher.js - the static site's home page: pick a map/mode/bots and play (game.html runs it all
// in the browser). Maps come from the site's maps/ folder, or are added here (Fortunate Maps or
// your own files) and kept in this browser's localStorage.
(function () {
  const $id = (id) => document.getElementById(id);
  const FM = 'https://fortunatemaps.herokuapp.com';
  const MAX_TILES = 256;
  const FM_OPTION = '#fm'; // the map list's "Fortunate Maps ID..." entry
  let fmProxies = []; // config.json: sites that pass Fortunate Maps files on to this page (see README)
  let siteMaps = [], defaults = {};

  const store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  };
  const customMaps = () => store.get('tpl-maps', {});

  function showError(msg) { const e = $id('error'); e.textContent = msg || ''; e.style.display = msg ? '' : 'none'; if (msg) scrollTo(0, 0); }

  function fillMaps(selected) {
    const sel = $id('map');
    sel.textContent = '';
    const add = (parent, value, label) => { const o = document.createElement('option'); o.value = value; o.textContent = label; parent.appendChild(o); };
    add(sel, 'random', 'Random (from the rotation)');
    add(sel, FM_OPTION, 'Fortunate Maps ID...');
    const custom = Object.entries(customMaps()).sort((a, b) => a[1].name.localeCompare(b[1].name));
    if (custom.length) {
      const g = document.createElement('optgroup'); g.label = 'Added by you';
      for (const [key, m] of custom) add(g, key, m.name + (m.fm ? ` (Fortunate Maps ${m.fm})` : ''));
      sel.appendChild(g);
    }
    const g = document.createElement('optgroup'); g.label = 'Maps';
    for (const m of siteMaps) if (m.key !== 'eggball') add(g, m.key, m.name);
    sel.appendChild(g);
    sel.value = [...sel.options].some((o) => o.value === selected) && selected !== FM_OPTION ? selected : 'random';
    mapChanged();
  }

  // decode + read the map, so a broken one is refused here rather than in the game
  async function checkMap(pngBlob, json) {
    let bmp;
    try { bmp = await createImageBitmap(pngBlob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' }); } catch (e) { throw new Error("That layout file isn't a PNG image."); }
    if (bmp.width > MAX_TILES || bmp.height > MAX_TILES) throw new Error(`That map is ${bmp.width} x ${bmp.height} tiles; the most is ${MAX_TILES} x ${MAX_TILES}.`);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
    const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(bmp, 0, 0);
    const map = TPMapLoader.loadMap({ width: c.width, height: c.height, data: ctx.getImageData(0, 0, c.width, c.height).data }, json);
    const has = (t) => map.tiles.some((col) => col.some((v) => Math.floor(Number(v)) === t));
    if (!has(3) && !has(4) && !has(16) && !Object.keys(map.spawnPoints).length) throw new Error('That map has no flags or spawn points.');
    return map;
  }
  const dataUrl = (blob) => new Promise((ok, fail) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = fail; r.readAsDataURL(blob); });

  async function addMap(key, pngBlob, json, extra) {
    const map = await checkMap(pngBlob, json);
    const maps = customMaps();
    maps[key] = Object.assign({ name: String(map.info.name || 'Untitled').slice(0, 80), png: await dataUrl(pngBlob), json }, extra || {});
    if (!store.set('tpl-maps', maps)) throw new Error("This browser's storage is full. Remove a map you added, then try again.");
    fillMaps(key);
    rememberMap();
    return maps[key];
  }

  // ---- Fortunate Maps ----
  const fmId = (s) => { const m = String(s).trim().match(/(?:^|\/)(\d{1,9})(?:\.\w+)?\/?$/) || String(s).match(/(?:map|png|json|preview)\/(\d{1,9})/); return m ? m[1] : null; };
  // the files of map `id`: straight from Fortunate Maps, else through each proxy in config.json
  // (a proxy is a URL prefix the Fortunate Maps URL is appended to, e.g. "https://proxy.example/?url=")
  async function fmFiles(id) {
    const via = [(u) => u].concat(fmProxies.map((p) => (u) => p + encodeURIComponent(u)));
    for (const url of via) {
      let png, json;
      try { [png, json] = await Promise.all([fetch(url(`${FM}/png/${id}`)), fetch(url(`${FM}/json/${id}`))]); } catch (e) { continue; } // blocked: try the next
      if (png.status === 404 || json.status === 404) throw Object.assign(new Error(`Fortunate Maps has no map ${id}.`), { shown: true });
      if (png.ok && json.ok) return { png: await png.blob(), json: await json.json() };
    }
    return null;
  }
  async function useFmMap() {
    const status = $id('fm-status'), id = fmId($id('fm-id').value);
    if (!id) { status.textContent = 'Enter a Fortunate Maps map number, or a link to the map.'; return; }
    const prev = $id('fm-preview');
    prev.style.display = ''; prev.src = `${FM}/preview/${id}.jpeg`; prev.onerror = () => { prev.style.display = 'none'; };
    const have = customMaps()['fm-' + id] || siteMaps.find((m) => m.key === id);
    if (have) { fillMaps(customMaps()['fm-' + id] ? 'fm-' + id : id); status.textContent = `Map ${id} is already in the list: picked.`; return; }
    status.textContent = `Downloading map ${id}...`;
    try {
      const files = await fmFiles(id);
      if (files) {
        const m = await addMap('fm-' + id, files.png, files.json, { fm: id });
        status.textContent = `Added "${m.name}" and picked it.`;
        return;
      }
    } catch (e) {
      if (e.shown || /tiles|flags|PNG/.test(e.message)) { status.textContent = e.message; return; }
    }
    // the browser wasn't allowed to read the files (Fortunate Maps doesn't allow other sites to)
    status.innerHTML = '';
    status.append(`Your browser isn't allowed to download map ${id} from Fortunate Maps directly. Save these two files, then add them under "Add your own map files": `);
    for (const ext of ['png', 'json']) {
      const a = document.createElement('a'); a.href = `${FM}/${ext}/${id}`; a.target = '_blank'; a.rel = 'noopener'; a.download = `${id}.${ext}`; a.textContent = `${id}.${ext}`;
      status.append(a, ext === 'png' ? ' and ' : '.');
    }
  }
  $id('fm-add').addEventListener('click', useFmMap);
  $id('fm-id').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); useFmMap(); } });

  // ---- your own files ----
  $id('upload-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    showError('');
    const png = $id('layout').files[0], logic = $id('logic').files[0];
    if (!png || !logic) return showError('Choose both the layout (.png) and logic (.json) files.');
    try {
      let json;
      try { json = JSON.parse(await logic.text()); } catch (e) { throw new Error("The logic file isn't valid JSON."); }
      const id = fmId(png.name.replace(/\.png$/i, ''));
      await addMap(id ? 'fm-' + id : 'file-' + Date.now(), png, json, id ? { fm: id } : {});
      $id('upload-form').reset();
    } catch (e) { showError(e.message || 'Those map files could not be read.'); }
  });

  const rememberMap = () => store.set('tpl-last', Object.assign(store.get('tpl-last', {}), { map: $id('map').value }));
  function mapChanged() {
    const v = $id('map').value;
    $id('forget').style.display = customMaps()[v] ? '' : 'none';
    $id('fm-box').style.display = v === FM_OPTION ? '' : 'none';
    if (v === FM_OPTION) $id('fm-id').focus();
  }
  $id('map').addEventListener('change', () => { mapChanged(); if ($id('map').value !== FM_OPTION) rememberMap(); });
  $id('forget').addEventListener('click', () => {
    const maps = customMaps(); delete maps[$id('map').value]; store.set('tpl-maps', maps); fillMaps('random');
  });

  // ---- play ----
  const num = (v, lo, hi, def) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : def; };
  $id('play-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    let map = $id('map').value;
    if (map === FM_OPTION) { useFmMap(); return; }
    if (map === 'random') { const pool = siteMaps.filter((m) => m.rotation); map = (pool.length ? pool : siteMaps)[Math.floor(Math.random() * (pool.length || siteMaps.length))].key; }
    const choice = {
      name: $id('name').value.trim().slice(0, 12), map: $id('map').value, mode: $id('mode').value,
      team: document.querySelector('input[name=team]:checked').value === '2' ? 2 : 1,
      allies: num($id('allies').value, 0, 3, 0), enemies: num($id('enemies').value, 0, 4, 0),
      time: num($id('time').value, 1, 60, 6), caps: num($id('caps').value, 0, 100, 0), mapTestingMode: $id('maptest').checked,
    };
    store.set('tpl-last', choice);
    try { sessionStorage.setItem('tpl-game', JSON.stringify(Object.assign({}, choice, { map, defaults }))); } catch (e) { return showError("This browser won't let the page keep the game settings (private mode?)."); }
    location.href = choice.mode === 'eggball' ? './eggball.html' : './game.html';
  });

  // ---- start: the site's maps, the defaults, and the last choices ----
  const config = fetch('./config.json').then((r) => r.json()).catch(() => ({}));
  Promise.all([fetch('./maps/index.json').then((r) => r.json()), fetch('./defaults.json').then((r) => r.json()), config]).then(([maps, defs, conf]) => {
    siteMaps = maps; defaults = defs;
    fmProxies = (Array.isArray(conf.fortunateMapsProxies) ? conf.fortunateMapsProxies : []).map(String);
    const last = store.get('tpl-last', {});
    $id('name').value = last.name || '';
    for (const k of ['mode', 'allies', 'enemies', 'time', 'caps']) if (last[k] != null) $id(k).value = last[k];
    if (last.team === 2) document.querySelector('input[name=team][value="2"]').checked = true;
    $id('maptest').checked = !!last.mapTestingMode;
    fillMaps(last.map || 'random');
  }).catch(() => showError("The map list couldn't be loaded."));
})();

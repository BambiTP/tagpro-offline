// launcher.js - the static site's home page: pick a map/mode/bots and play (game.html runs it all
// in the browser). Maps come from the site's maps/ folder, or are added here (Fortunate Maps or
// your own files) and kept in this browser's localStorage.
(function () {
  const $id = (id) => document.getElementById(id);
  const FM = 'https://fortunatemaps.herokuapp.com';
  const MAX_TILES = 256;
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
    const custom = Object.entries(customMaps()).sort((a, b) => a[1].name.localeCompare(b[1].name));
    if (custom.length) {
      const g = document.createElement('optgroup'); g.label = 'Added by you';
      for (const [key, m] of custom) add(g, key, m.name + (m.fm ? ` (Fortunate Maps ${m.fm})` : ''));
      sel.appendChild(g);
    }
    const g = document.createElement('optgroup'); g.label = 'Maps';
    for (const m of siteMaps) if (m.key !== 'eggball') add(g, m.key, m.name);
    sel.appendChild(g);
    sel.value = [...sel.options].some((o) => o.value === selected) ? selected : 'random';
    $id('forget').style.display = customMaps()[sel.value] ? '' : 'none';
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
  $id('fm-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = $id('fm-status'), id = fmId($id('fm-id').value);
    if (!id) { status.textContent = 'Enter a Fortunate Maps map number, or a link to the map.'; return; }
    const prev = $id('fm-preview');
    prev.style.display = ''; prev.src = `${FM}/preview/${id}.jpeg`; prev.onerror = () => { prev.style.display = 'none'; };
    status.textContent = `Downloading map ${id}...`;
    try {
      const [png, json] = await Promise.all([fetch(`${FM}/png/${id}`), fetch(`${FM}/json/${id}`)]);
      if (!png.ok || !json.ok) throw Object.assign(new Error(`Fortunate Maps has no map ${id}.`), { shown: true });
      const m = await addMap('fm-' + id, await png.blob(), await json.json(), { fm: id });
      status.textContent = `Added "${m.name}". It's picked in the Map list above.`;
    } catch (e) {
      if (e.shown || /tiles|flags|PNG/.test(e.message)) { status.textContent = e.message; return; }
      // usually the browser blocking the download (Fortunate Maps doesn't allow other sites to read its files)
      status.innerHTML = '';
      status.append(`Your browser couldn't download map ${id} from Fortunate Maps directly. Save these two files, then add them below: `);
      for (const ext of ['png', 'json']) {
        const a = document.createElement('a'); a.href = `${FM}/${ext}/${id}`; a.target = '_blank'; a.rel = 'noopener'; a.download = `${id}.${ext}`; a.textContent = `${id}.${ext}`;
        status.append(a, ext === 'png' ? ' and ' : '.');
      }
    }
  });

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
  $id('map').addEventListener('change', () => { $id('forget').style.display = customMaps()[$id('map').value] ? '' : 'none'; rememberMap(); });
  $id('forget').addEventListener('click', () => {
    const maps = customMaps(); delete maps[$id('map').value]; store.set('tpl-maps', maps); fillMaps('random');
  });

  // ---- play ----
  const num = (v, lo, hi, def) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : def; };
  $id('play-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    let map = $id('map').value;
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
  Promise.all([fetch('./maps/index.json').then((r) => r.json()), fetch('./defaults.json').then((r) => r.json())]).then(([maps, defs]) => {
    siteMaps = maps; defaults = defs;
    const last = store.get('tpl-last', {});
    $id('name').value = last.name || '';
    for (const k of ['mode', 'allies', 'enemies', 'time', 'caps']) if (last[k] != null) $id(k).value = last[k];
    if (last.team === 2) document.querySelector('input[name=team][value="2"]').checked = true;
    $id('maptest').checked = !!last.mapTestingMode;
    fillMaps(last.map || 'random');
  }).catch(() => showError("The map list couldn't be loaded."));
})();

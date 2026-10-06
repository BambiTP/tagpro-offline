// add-maps.js - downloads maps from Fortunate Maps into maps/ and rebuilds maps/index.json (the
// list the home page shows). Run by the "Add maps" workflow (Actions tab), or by hand:
//   node tools/add-maps.js 69860 https://fortunatemaps.herokuapp.com/map/12345 ...
//   node tools/add-maps.js            (just rebuild maps/index.json)
const fs = require('fs');
const path = require('path');

const FM = 'https://fortunatemaps.herokuapp.com';
const MAX_TILES = 256;

// maps/index.json: [{ key, name, author, rotation }] from every maps/<key>.png + .json
function writeIndex(dir) {
  let rotation = null;
  try { rotation = JSON.parse(fs.readFileSync(path.join(dir, 'rotation.json'), 'utf8')).map(String); } catch (e) { /* every map */ }
  const list = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.png')) continue;
    const key = f.slice(0, -4);
    let info = {};
    try { info = JSON.parse(fs.readFileSync(path.join(dir, key + '.json'), 'utf8')).info || {}; } catch (e) { continue; }
    list.push({ key, name: String(info.name || key), author: String(info.author || ''), rotation: key !== 'eggball' && (!rotation || rotation.includes(key)) });
  }
  list.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(list));
  return list;
}

function pngSize(buf) {
  if (buf.length < 24 || buf.toString('latin1', 12, 16) !== 'IHDR') throw new Error('not a PNG');
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

async function addMap(dir, arg) {
  const m = String(arg).match(/(\d{1,9})\/?$/) || String(arg).match(/(?:map|png|json|preview)\/(\d{1,9})/);
  if (!m) throw new Error(`"${arg}" isn't a Fortunate Maps map number or link`);
  const id = m[1], files = {};
  for (const ext of ['png', 'json']) {
    const r = await fetch(`${FM}/${ext}/${id}`, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`map ${id}: Fortunate Maps answered ${r.status}`);
    files[ext] = Buffer.from(await r.arrayBuffer());
  }
  const { w, h } = pngSize(files.png); // the site answers unknown maps with a page, not a PNG
  if (w > MAX_TILES || h > MAX_TILES) throw new Error(`map ${id} is ${w} x ${h} tiles; the most is ${MAX_TILES}`);
  const json = JSON.parse(files.json.toString('utf8'));
  fs.writeFileSync(path.join(dir, id + '.json'), files.json);
  fs.writeFileSync(path.join(dir, id + '.png'), files.png);
  return `${id}: ${(json.info && json.info.name) || 'Untitled'}`;
}

if (require.main === module) {
  (async () => {
    const dir = path.join(__dirname, '..', 'maps');
    let failed = 0;
    for (const arg of process.argv.slice(2).flatMap((a) => a.split(/[\s,]+/)).filter(Boolean)) {
      try { console.log('added', await addMap(dir, arg)); } catch (e) { failed++; console.error('FAILED', e.message); }
    }
    console.log(writeIndex(dir).length, 'maps in maps/index.json');
    process.exit(failed ? 1 : 0);
  })();
}

module.exports = { writeIndex, addMap };

// mapLoader.js - TagPro PNG+JSON map -> the tile grid the official server sends in its
// "map" packet. Grid is column-major (tiles[x][y]), exactly like the real packet.
// Isomorphic: pass a decoded image as { width, height, data: RGBA Uint8Array }.
(function () {

const COLOR_TO_TILE = {
  '000000': 0,     // empty space
  '787878': 1,     // wall
  '408050': 1.2,   // 45 deg walls
  '405080': 1.3,
  '807040': 1.1,
  '804070': 1.4,
  'd4d4d4': 2,     // floor
  'ff0000': 3,     // red flag
  '0000ff': 4,     // blue flag
  'ffff00': 5,     // boost
  '00ff00': 6,     // powerup (spawns as 6 until first respawn)
  '373737': 7,     // spike
  'b97a57': 8,     // button
  '007500': 9,     // gate (state from JSON fields)
  'ff8000': 10,    // bomb
  'dcbaba': 11,    // red team tile
  'bbb8dd': 12,    // blue team tile
  'cac000': 13,    // portal
  'ff7373': 14,    // red boost
  '7373ff': 15,    // blue boost
  '808000': 16,    // yellow flag
  'b90000': 17,    // red endzone
  '190094': 18,    // blue endzone
  'ff8080': 19,    // red potato
  '8080ff': 20,    // blue potato
  '656500': 21,    // yellow potato
  '202020': 22,    // gravity well
  'dcdcba': 23,    // yellow team tile
  'cc3300': 24,    // red portal
  '0066cc': 25,    // blue portal
};

const GATE_STATE = { off: 9, on: 9.1, red: 9.2, blue: 9.3 };

function hex2(n) { return (n < 16 ? '0' : '') + n.toString(16); }

// image: { width, height, data } ; json: Fortunate Maps / TagPro map JSON
function loadMap(image, json) {
  json = json || {};
  const fields = json.fields || {}, portals = json.portals || {};
  const W = image.width, H = image.height, d = image.data;
  const tiles = [];
  const unknown = {};
  for (let x = 0; x < W; x++) {
    tiles[x] = [];
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 4;
      if (d[i + 3] === 0) { tiles[x][y] = 0; continue; }
      const hex = hex2(d[i]) + hex2(d[i + 1]) + hex2(d[i + 2]);
      let t = COLOR_TO_TILE[hex];
      if (t === undefined) { unknown[hex] = (unknown[hex] || 0) + 1; t = 0; }
      const key = x + ',' + y;
      if (t === 9) {
        const st = fields[key] && fields[key].defaultState;
        t = GATE_STATE[(st || 'off').toLowerCase()] ?? 9;
      }
      // portals with no destination are exit-only; the real server sends them as "13.1"
      // (string, the inactive-portal look), same for team portals 24/25
      if ((t === 13 || t === 24 || t === 25) && !(portals[key] && portals[key].destination)) t = String(t + 0.1);
      tiles[x][y] = t;
    }
  }
  return {
    tiles,
    info: json.info || { name: 'Untitled', author: 'Unknown' },
    switches: json.switches || {},
    fields,
    portals,
    marsballs: json.marsballs || [],
    spawnPoints: json.spawnPoints || {},
    gravity: json.gravity,
    unknownColors: unknown,
  };
}

// some map PNGs carry extra bytes after IEND; browsers ignore them but strict decoders throw
function trimPng(buf) {
  const i = buf.lastIndexOf ? buf.lastIndexOf('IEND') : -1;
  return i > 0 && i + 8 < buf.length ? buf.slice(0, i + 8) : buf;
}

const api = { loadMap, trimPng, COLOR_TO_TILE };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else globalThis.TPMapLoader = api;
})();

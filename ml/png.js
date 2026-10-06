// png.js - a small PNG decoder for Node (no dependencies): enough for map files (non-interlaced;
// palette at 1/2/4/8 bits, grey, RGB or RGBA at 8 bits). Returns { width, height, data: RGBA bytes },
// what engine/mapLoader.js takes.
const zlib = require('zlib');
const { trimPng } = require('../engine/mapLoader');

function decodePng(buf) {
  buf = trimPng(buf);
  if (buf.toString('latin1', 1, 4) !== 'PNG') throw new Error('not a PNG');
  let off = 8, width, height, depth, type, interlace, palette = null, alpha = null;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off), kind = buf.toString('latin1', off + 4, off + 8), body = buf.subarray(off + 8, off + 8 + len);
    if (kind === 'IHDR') { width = body.readUInt32BE(0); height = body.readUInt32BE(4); depth = body[8]; type = body[9]; interlace = body[12]; }
    else if (kind === 'PLTE') palette = body;
    else if (kind === 'tRNS') alpha = body;
    else if (kind === 'IDAT') idat.push(body);
    else if (kind === 'IEND') break;
    off += 12 + len;
  }
  if (interlace) throw new Error('interlaced PNGs are not supported');
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[type];
  if (!channels || (type !== 3 && depth !== 8)) throw new Error(`PNG type ${type} at ${depth} bits is not supported`);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = Math.max(1, (channels * depth) >> 3), stride = (width * channels * depth + 7) >> 3;
  const px = Buffer.alloc(stride * height);
  // undo the per-row filters
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const row = px.subarray(y * stride, (y + 1) * stride), up = y ? px.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? row[i - bpp] : 0, b = up ? up[i] : 0, c = up && i >= bpp ? up[i - bpp] : 0;
      let v = src[i];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      row[i] = v & 255;
    }
  }
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const o = (y * width + x) * 4, r = y * stride;
    if (type === 3) {
      const bit = x * depth, i = (px[r + (bit >> 3)] >> (8 - depth - (bit & 7))) & ((1 << depth) - 1);
      data[o] = palette[i * 3]; data[o + 1] = palette[i * 3 + 1]; data[o + 2] = palette[i * 3 + 2];
      data[o + 3] = alpha && i < alpha.length ? alpha[i] : 255;
    } else {
      const s = r + x * channels;
      if (type === 0 || type === 4) { data[o] = data[o + 1] = data[o + 2] = px[s]; data[o + 3] = type === 4 ? px[s + 1] : 255; }
      else { data[o] = px[s]; data[o + 1] = px[s + 1]; data[o + 2] = px[s + 2]; data[o + 3] = type === 6 ? px[s + 3] : 255; }
    }
  }
  return { width, height, data };
}

module.exports = { decodePng };

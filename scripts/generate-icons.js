const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function createPng(size, drawPixelFn) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0
  const rowLength = 1 + size * 4;
  const rawData = Buffer.alloc(size * rowLength);

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < size; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawPixelFn(x, y, size);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const idatData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', idatData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Brand icon drawing algorithm for Taste of Naija
// Renders the squircle, pot silhouette, gold handles, steam, and 'N' monogram
function drawTasteOfNaijaIcon(x, y, size) {
  const nx = x / size;
  const ny = y / size;
  const cx = 0.5;
  const cy = 0.5;

  // Squircle corner radius
  const cornerRadius = 0.24;
  const dx = Math.abs(nx - 0.5);
  const dy = Math.abs(ny - 0.5);
  const qx = Math.max(0, dx - (0.5 - cornerRadius));
  const qy = Math.max(0, dy - (0.5 - cornerRadius));
  const distToEdge = Math.sqrt(qx * qx + qy * qy);

  // Outside squircle -> Transparent
  if (distToEdge > cornerRadius) {
    return [0, 0, 0, 0];
  }

  // Gold border ring (0.025 thickness)
  const isBorder = distToEdge > cornerRadius - 0.035 || dx > 0.465 || dy > 0.465;
  if (isBorder) {
    // Rich Gold #F5C518 with slight gradient
    return [245, 197, 24, 255];
  }

  // Inside Badge: Nigerian Emerald Green Gradient (#0E6B33 to #052E15)
  let r = Math.round(14 - ny * 9);
  let g = Math.round(107 - ny * 61);
  let b = Math.round(51 - ny * 30);

  // Rising Gold Steam (3 curls above y = 0.35)
  if (ny < 0.35 && ny > 0.10) {
    const steamY = (ny - 0.10) / 0.25;
    const leftSteam = Math.abs(nx - (0.38 + Math.sin(steamY * 5) * 0.04));
    const midSteam = Math.abs(nx - (0.50 + Math.sin(steamY * 4) * 0.03));
    const rightSteam = Math.abs(nx - (0.62 + Math.sin(steamY * 5) * 0.04));

    if (midSteam < 0.035) {
      return [254, 224, 71, 255]; // Golden Yellow
    }
    if (leftSteam < 0.032 || rightSteam < 0.032) {
      return [245, 158, 11, 240]; // Amber
    }
  }

  // Pot Rim (Ellipse at y = 0.38, rx = 0.30, ry = 0.08)
  const rimDx = (nx - 0.5) / 0.30;
  const rimDy = (ny - 0.38) / 0.08;
  const inRim = rimDx * rimDx + rimDy * rimDy <= 1.0;

  // Pot Body (Bowl below rim, down to y = 0.80)
  const bodyDx = (nx - 0.5) / 0.28;
  const bodyDy = (ny - 0.38) / 0.42;
  const inBody = ny >= 0.38 && ny <= 0.80 && bodyDx * bodyDx + bodyDy * bodyDy <= 1.0;

  // Handles (y = 0.42 to 0.54, at edges of rim)
  const leftHandleDist = Math.hypot((nx - 0.18) / 0.06, (ny - 0.48) / 0.09);
  const rightHandleDist = Math.hypot((nx - 0.82) / 0.06, (ny - 0.48) / 0.09);
  if ((leftHandleDist > 0.65 && leftHandleDist < 1.1) || (rightHandleDist > 0.65 && rightHandleDist < 1.1)) {
    return [245, 197, 24, 255]; // Gold handle
  }

  if (inRim) {
    if (rimDx * rimDx + rimDy * rimDy > 0.75) {
      return [234, 179, 8, 255]; // Rim gold highlight
    }
    return [10, 91, 44, 255]; // Dark inner bowl
  }

  if (inBody) {
    // White 'N' Monogram inside the pot (center 0.40 <= nx <= 0.60, 0.52 <= ny <= 0.68)
    const inNLeft = nx >= 0.40 && nx <= 0.44 && ny >= 0.52 && ny <= 0.68;
    const inNRight = nx >= 0.56 && nx <= 0.60 && ny >= 0.52 && ny <= 0.68;
    // Diagonal bar of 'N'
    const diagProgress = (nx - 0.41) / 0.18;
    const diagExpectedY = 0.53 + diagProgress * 0.14;
    const inNDiag = Math.abs(ny - diagExpectedY) <= 0.025 && nx >= 0.41 && nx <= 0.59;

    if (inNLeft || inNRight || inNDiag) {
      return [255, 255, 255, 255]; // Crisp white monogram
    }

    // Rich Green Pot body
    return [21, 128, 61, 255];
  }

  // Base Ember (y = 0.87, r = 0.04)
  const emberDist = Math.hypot((nx - 0.5) / 0.04, (ny - 0.87) / 0.04);
  if (emberDist <= 1.0) {
    return [249, 115, 22, 255]; // Flame orange
  }

  return [r, g, b, 255];
}

// Generates an ICO file containing 16x16, 32x32, and 48x48 PNGs
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  let offset = 6 + numImages * 16;
  const dirEntries = [];
  const imageDatas = [];

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size; // Width
    entry[1] = size >= 256 ? 0 : size; // Height
    entry[2] = 0; // Colors (0 = no palette)
    entry[3] = 0; // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    dirEntries.push(entry);
    imageDatas.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageDatas]);
}

// Generate all target icon formats
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'app');

console.log('Generating PNG icons...');
const png16 = createPng(16, drawTasteOfNaijaIcon);
const png32 = createPng(32, drawTasteOfNaijaIcon);
const png48 = createPng(48, drawTasteOfNaijaIcon);
const png180 = createPng(180, drawTasteOfNaijaIcon);
const png192 = createPng(192, drawTasteOfNaijaIcon);
const png512 = createPng(512, drawTasteOfNaijaIcon);

// Write favicon.ico
const icoBuffer = createIco([
  { size: 16, buffer: png16 },
  { size: 32, buffer: png32 },
  { size: 48, buffer: png48 },
]);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
console.log('Created public/favicon.ico and app/favicon.ico');

// Write Apple Touch Icon
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon-precomposed.png'), png180);
fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
console.log('Created Apple touch icons (180x180)');

// Write PWA Icons
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
console.log('Created PWA icons (192x192 & 512x512)');

console.log('Icon generation complete!');

const fs = require("fs");
const zlib = require("zlib");
const { execSync } = require("child_process");

const srcPath = "public/assets/aistudio/Logo_tipo_MORIA_em_3D_brilhante_8796f4cc.png";
const buf = fs.readFileSync(srcPath);

let pos = 8, width = 0, height = 0;
const idatChunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString("ascii", pos + 4, pos + 8);
  if (type === "IHDR") {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === "IDAT") {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const bpp = 3, stride = 1 + width * bpp;
const rgb = Buffer.alloc(width * height * 3);

for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  const rowStart = y * stride + 1;
  const prevRowStart = (y - 1) * width * 3;
  const outRowStart = y * width * 3;
  for (let x = 0; x < width * 3; x++) {
    const rawVal = raw[rowStart + x];
    const a = x >= 3 ? rgb[outRowStart + x - 3] : 0;
    const b = y > 0 ? rgb[prevRowStart + x] : 0;
    const c = (x >= 3 && y > 0) ? rgb[prevRowStart + x - 3] : 0;
    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      val = (rawVal + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
    }
    rgb[outRowStart + x] = val;
  }
}

console.log(`Decoded source image: ${width}x${height}`);

// Step 1: Detect Sky
// In this image, sky is light blue with some white clouds:
// Blue is high (b >= 210) and either b > r + 15 or white clouds (r > 180, g > 200, b > 230)
function isSkyColor(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum > 155 && b >= 200 && (b - r >= 15 || b >= 230)) return true;
  if (lum > 200 && b >= 210) return true;
  return false;
}

// 0: definite sky, 1: boundary/transition, 2: definite letter
const classification = new Uint8Array(width * height);
classification.fill(2);

// Flood fill from outer borders
const queue = new Int32Array(width * height * 2);
let qHead = 0, qTail = 0;

function pushSky(x, y) {
  const idx = y * width + x;
  if (classification[idx] !== 0) {
    classification[idx] = 0;
    queue[qTail++] = x;
    queue[qTail++] = y;
  }
}

for (let x = 0; x < width; x++) {
  const p0 = (0 * width + x) * 3;
  if (isSkyColor(rgb[p0], rgb[p0+1], rgb[p0+2])) pushSky(x, 0);
  const pEnd = ((height - 1) * width + x) * 3;
  if (isSkyColor(rgb[pEnd], rgb[pEnd+1], rgb[pEnd+2])) pushSky(x, height - 1);
}
for (let y = 0; y < height; y++) {
  const p0 = (y * width + 0) * 3;
  if (isSkyColor(rgb[p0], rgb[p0+1], rgb[p0+2])) pushSky(0, y);
  const pEnd = (y * width + width - 1) * 3;
  if (isSkyColor(rgb[pEnd], rgb[pEnd+1], rgb[pEnd+2])) pushSky(width - 1, y);
}

// Inner holes: center of O, loop of R, triangle of A
const innerHoles = [
  [581, 494],
  [811, 410],
  [1191, 542]
];
for (const [hx, hy] of innerHoles) {
  const p = (hy * width + hx) * 3;
  if (isSkyColor(rgb[p], rgb[p+1], rgb[p+2])) pushSky(hx, hy);
}

while (qHead < qTail) {
  const cx = queue[qHead++];
  const cy = queue[qHead++];

  const neighbors = [
    [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
  ];
  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nidx = ny * width + nx;
      if (classification[nidx] === 2) {
        const pidx = nidx * 3;
        if (isSkyColor(rgb[pidx], rgb[pidx+1], rgb[pidx+2])) {
          classification[nidx] = 0;
          queue[qTail++] = nx;
          queue[qTail++] = ny;
        }
      }
    }
  }
}

console.log(`Definite sky pixels: ${qTail / 2}`);

// Step 2: High precision alpha matting for edge pixels
// An RGBA buffer for the final result
const rgba = Buffer.alloc(width * height * 4);

// Estimate average sky color in the vicinity of boundary pixels
// Sky gradient is roughly: top (160, 205, 252) to bottom (180, 215, 250)
function getEstimatedSky(x, y) {
  const t = Math.max(0, Math.min(1, y / height));
  return {
    r: 155 + t * 25,
    g: 200 + t * 15,
    b: 252 - t * 2
  };
}

// Build a distance field from sky into letters for smooth sub-pixel transition
const alphaMap = new Float32Array(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pidx = idx * 3;
    const r = rgb[pidx], g = rgb[pidx+1], b = rgb[pidx+2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (classification[idx] === 0) {
      alphaMap[idx] = 0.0;
    } else {
      // Check if it is near the sky
      let nearSky = false;
      for (let dy = -2; dy <= 2 && !nearSky; dy++) {
        for (let dx = -2; dx <= 2 && !nearSky; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (classification[ny * width + nx] === 0) {
              nearSky = true;
            }
          }
        }
      }

      if (!nearSky) {
        // Deep inside letter: 100% opaque
        alphaMap[idx] = 1.0;
      } else {
        // Edge anti-aliased pixel!
        const sky = getEstimatedSky(x, y);
        const skyLum = 0.299 * sky.r + 0.587 * sky.g + 0.114 * sky.b;
        const letterLum = 32.0; // typical dark letter edge luminance

        // Fraction of letter vs sky based on luminance and color
        let alpha = (skyLum - lum) / (skyLum - letterLum);
        alpha = Math.max(0.0, Math.min(1.0, alpha));

        // If blue component is close to sky, reduce alpha
        if (b > 160 && (b - r) > 25) {
          const blueLikeness = Math.min(1, (b - 160) / 70);
          alpha = Math.min(alpha, 1.0 - blueLikeness * 0.7);
        }

        alphaMap[idx] = Math.max(0.0, Math.min(1.0, alpha));
      }
    }
  }
}

// Step 3: Populate RGBA and de-contaminate edge pixels from blue sky bleed
let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const pidx = idx * 3;
    const outIdx = idx * 4;
    const r = rgb[pidx], g = rgb[pidx+1], b = rgb[pidx+2];
    const a = alphaMap[idx];

    if (a <= 0.01) {
      rgba[outIdx] = 0;
      rgba[outIdx+1] = 0;
      rgba[outIdx+2] = 0;
      rgba[outIdx+3] = 0;
    } else {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      if (a >= 0.98) {
        // Pure letter: preserve original reflections and colors exactly!
        rgba[outIdx] = r;
        rgba[outIdx+1] = g;
        rgba[outIdx+2] = b;
        rgba[outIdx+3] = 255;
      } else {
        // Semi-transparent edge: decontaminate sky color
        const sky = getEstimatedSky(x, y);
        let cr = (r - (1 - a) * sky.r) / Math.max(a, 0.1);
        let cg = (g - (1 - a) * sky.g) / Math.max(a, 0.1);
        let cb = (b - (1 - a) * sky.b) / Math.max(a, 0.1);

        cr = Math.max(0, Math.min(255, cr));
        cg = Math.max(0, Math.min(255, cg));
        // Remove blue sky fringing on outer boundary:
        cb = Math.max(0, Math.min(255, Math.min(cb, Math.max(cr, cg) + 4)));

        rgba[outIdx] = Math.round(cr);
        rgba[outIdx+1] = Math.round(cg);
        rgba[outIdx+2] = Math.round(cb);
        rgba[outIdx+3] = Math.round(a * 255);
      }
    }
  }
}

console.log(`Lettering content box: X=[${minX}, ${maxX}] Y=[${minY}, ${maxY}] (width: ${maxX - minX + 1}, height: ${maxY - minY + 1})`);

// Write raw RGBA file
fs.writeFileSync("scripts/raw_rgba.bin", rgba);

// Use ImageMagick to create optimized PNG and WebP
execSync(`convert -size ${width}x${height} -depth 8 rgba:scripts/raw_rgba.bin public/assets/moria_3d_lettering.png`);
execSync(`convert -size ${width}x${height} -depth 8 rgba:scripts/raw_rgba.bin -quality 95 public/assets/moria_3d_lettering.webp`);

console.log("Generated public/assets/moria_3d_lettering.png and .webp successfully!");

// Also generate a tightly cropped version with 20px padding for optional high-density crispness
const cropW = maxX - minX + 40;
const cropH = maxY - minY + 40;
const cropX = Math.max(0, minX - 20);
const cropY = Math.max(0, minY - 20);

execSync(`convert public/assets/moria_3d_lettering.png -crop ${cropW}x${cropH}+${cropX}+${cropY} +repage public/assets/moria_3d_lettering_cropped.png`);
execSync(`convert public/assets/moria_3d_lettering_cropped.png -quality 95 public/assets/moria_3d_lettering_cropped.webp`);

console.log("Generated cropped versions successfully!");

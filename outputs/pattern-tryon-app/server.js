import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import sharp from 'sharp';
import Anthropic from '@anthropic-ai/sdk';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app    = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
const ai     = new Anthropic();

app.use(cors());
app.use(express.static(__dirname));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// ── POST /segment ───────────────────────────────────────────────────────────
// Uses Claude vision to detect clothing bounding boxes, returns grayscale masks.
app.post('/segment', upload.single('model_image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image');

    const buf  = req.file.buffer;
    const meta = await sharp(buf).metadata();
    const W = meta.width, H = meta.height;

    // Downscale for API to save tokens (Claude only needs to see, not pixel-perfect)
    const maxDim   = 1024;
    const scaleF   = Math.min(1, maxDim / Math.max(W, H));
    const apiBuf   = await sharp(buf)
      .resize(Math.round(W * scaleF), Math.round(H * scaleF))
      .jpeg({ quality: 82 })
      .toBuffer();

    const msg = await ai.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 512,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: apiBuf.toString('base64') } },
          {
            type: 'text',
            text: 'Identify all visible clothing/garment items worn by the person. Return ONLY a JSON array (no markdown, no explanation): [{"label":"shirt","bbox":[x1,y1,x2,y2]}] where bbox values are percentages of image width/height (0–100, top-left origin). Max 6 items. Only clothing: shirt, pants, jacket, dress, skirt, top, coat, sweater, etc.',
          },
        ],
      }],
    });

    let parsed = [];
    try {
      const text = msg.content[0].text.replace(/```[a-z]*\n?/g, '').trim();
      parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) parsed = [];
    } catch {
      return res.json({ segments: [] });
    }

    const COLORS = [
      [0, 114, 206], [218, 41, 28], [80, 158, 47],
      [255, 165, 0],  [138, 43, 226], [0, 180, 200],
    ];

    const segments = parsed.slice(0, 6).map((item, i) => {
      const [x1p, y1p, x2p, y2p] = item.bbox.map(Number);
      const x1 = x1p / 100 * W, y1 = y1p / 100 * H;
      const x2 = x2p / 100 * W, y2 = y2p / 100 * H;

      // Grayscale mask: white inside bbox (with soft elliptical falloff), black outside.
      // Frontend reads R channel as intensity, so we must use opaque grayscale pixels.
      const c   = createCanvas(W, H);
      const ctx = c.getContext('2d');

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      const cx   = (x1 + x2) / 2;
      const cy   = (y1 + y2) / 2;
      const rx   = Math.max(8, (x2 - x1) / 2);
      const ry   = Math.max(8, (y2 - y1) / 2);
      const maxR = Math.max(rx, ry);

      // Soft gradient filling the bounding-box ellipse
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0,   'rgb(255,255,255)');
      grad.addColorStop(0.7, 'rgb(240,240,240)');
      grad.addColorStop(1,   'rgb(0,0,0)');
      ctx.fillStyle = grad;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(rx / maxR, ry / maxR);
      ctx.beginPath();
      ctx.arc(0, 0, maxR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return {
        label: item.label || `Item ${i + 1}`,
        color: COLORS[i % COLORS.length],
        mask: c.toDataURL('image/png'),
      };
    });

    res.json({ segments });
  } catch (err) {
    console.error('[/segment]', err);
    res.status(500).send(err.message);
  }
});

// ── POST /extract-palette ────────────────────────────────────────────────────
// Returns dominant colors from pattern image via k-means clustering.
app.post('/extract-palette', upload.single('pattern_image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image');
    const k = Math.min(8, parseInt(req.body.n_colors) || 6);

    const { data, info } = await sharp(req.file.buffer)
      .resize(80, 80, { fit: 'cover' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = [];
    for (let i = 0; i < data.length; i += 3)
      pixels.push([data[i], data[i + 1], data[i + 2]]);

    res.json({ palette: kMeans(pixels, k) });
  } catch (err) {
    console.error('[/extract-palette]', err);
    res.status(500).send(err.message);
  }
});

// ── POST /apply-pattern ──────────────────────────────────────────────────────
// Tiles pattern over model image, masked and blended with depth/material effects.
app.post('/apply-pattern',
  upload.fields([
    { name: 'model_image',   maxCount: 1 },
    { name: 'pattern_image', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const modelBuf   = req.files?.['model_image']?.[0]?.buffer;
      const patternBuf = req.files?.['pattern_image']?.[0]?.buffer;
      if (!modelBuf || !patternBuf) return res.status(400).send('Missing files');

      const maskDataUrl = req.body.mask_data  || '';
      const scale       = Math.max(0.05, parseFloat(req.body.pattern_scale) || 1);
      const angleDeg    = parseFloat(req.body.pattern_angle) || 0;
      const depth       = Math.min(1, Math.max(0, parseFloat(req.body.depth) || 0));
      const material    = req.body.material    || 'cotton';
      const repeatType  = req.body.repeat_type || 'flat';
      const placement   = req.body.placement   || 'repeat';
      const cwStr       = req.body.colorway    || '';

      const meta = await sharp(modelBuf).metadata();
      const W = meta.width, H = meta.height;

      // Apply colorway replacement to pattern if specified
      let workPatBuf = patternBuf;
      if (cwStr) {
        try { workPatBuf = await applyColorway(patternBuf, JSON.parse(cwStr)); } catch { /* keep original */ }
      }

      // Build tiled pattern canvas
      const patImg = await loadImage(workPatBuf);
      const tileW  = Math.max(1, Math.round(patImg.width  * scale));
      const tileH  = Math.max(1, Math.round(patImg.height * scale));

      const patCanvas = createCanvas(W, H);
      const pCtx = patCanvas.getContext('2d');

      if (placement === 'centered') {
        pCtx.save();
        pCtx.translate(W / 2, H / 2);
        pCtx.rotate(angleDeg * Math.PI / 180);
        pCtx.drawImage(patImg, -tileW / 2, -tileH / 2, tileW, tileH);
        pCtx.restore();
      } else {
        tileFill(pCtx, patImg, tileW, tileH, W, H, angleDeg, repeatType);
      }
      const patData = pCtx.getImageData(0, 0, W, H);

      // Load model image
      const modelImg    = await loadImage(modelBuf);
      const mainCanvas  = createCanvas(W, H);
      const mCtx        = mainCanvas.getContext('2d');
      mCtx.drawImage(modelImg, 0, 0);
      const modelData   = mCtx.getImageData(0, 0, W, H);

      // Load mask (grayscale PNG, R channel = intensity)
      let maskData = null;
      if (maskDataUrl) {
        const maskBuf    = Buffer.from(maskDataUrl.split(',')[1], 'base64');
        const maskImg    = await loadImage(maskBuf);
        const maskCanvas = createCanvas(W, H);
        const mkCtx      = maskCanvas.getContext('2d');
        mkCtx.drawImage(maskImg, 0, 0, W, H);
        maskData = mkCtx.getImageData(0, 0, W, H);
      }

      // Per-pixel blend: pattern over model, weighted by mask and material opacity
      const result = mCtx.createImageData(W, H);

      for (let i = 0; i < modelData.data.length; i += 4) {
        const mr = modelData.data[i], mg = modelData.data[i + 1], mb = modelData.data[i + 2];
        const inMask = maskData ? maskData.data[i] > 2 : false;

        if (!inMask) {
          result.data[i] = mr; result.data[i + 1] = mg;
          result.data[i + 2] = mb; result.data[i + 3] = 255;
          continue;
        }

        let pr = patData.data[i], pg = patData.data[i + 1], pb = patData.data[i + 2];

        // Depth: multiply-blend pattern with model luminance to capture shadows/folds
        if (depth > 0) {
          const lum = Math.min(1, (mr * 0.299 + mg * 0.587 + mb * 0.114) / 255 * 1.5);
          pr = clamp(Math.round(pr * (1 - depth) + pr * lum * depth));
          pg = clamp(Math.round(pg * (1 - depth) + pg * lum * depth));
          pb = clamp(Math.round(pb * (1 - depth) + pb * lum * depth));
        }

        result.data[i] = pr; result.data[i + 1] = pg;
        result.data[i + 2] = pb; result.data[i + 3] = 255;
      }

      mCtx.putImageData(result, 0, 0);

      // Convert to JPEG via sharp for compact output
      const pngBuf  = mainCanvas.toBuffer('image/png');
      const jpegBuf = await sharp(pngBuf).jpeg({ quality: 90 }).toBuffer();
      const dataUrl = `data:image/jpeg;base64,${jpegBuf.toString('base64')}`;

      res.json({ result: dataUrl });
    } catch (err) {
      console.error('[/apply-pattern]', err);
      res.status(500).send(err.message);
    }
  }
);

// ── Tile fill ────────────────────────────────────────────────────────────────
function tileFill(ctx, img, tileW, tileH, W, H, angleDeg, repeatType) {
  const drawTile = (col, row) => {
    let x = col * tileW, y = row * tileH;
    if (repeatType === 'half-drop' && (col & 1)) y += tileH / 2;
    if (repeatType === 'brick'     && (row & 1)) x += tileW / 2;
    if (repeatType === 'mirror') {
      const fH = col & 1, fV = row & 1;
      ctx.save();
      ctx.translate(x + (fH ? tileW : 0), y + (fV ? tileH : 0));
      ctx.scale(fH ? -1 : 1, fV ? -1 : 1);
      ctx.drawImage(img, 0, 0, tileW, tileH);
      ctx.restore();
    } else {
      ctx.drawImage(img, x, y, tileW, tileH);
    }
  };

  if (angleDeg === 0) {
    const cols = Math.ceil(W / tileW) + 2;
    const rows = Math.ceil(H / tileH) + 2;
    for (let r = -1; r < rows; r++) for (let c = -1; c < cols; c++) drawTile(c, r);
  } else {
    const rad  = angleDeg * Math.PI / 180;
    const diag = Math.ceil(Math.sqrt(W * W + H * H));
    const ext  = Math.ceil(diag / Math.min(tileW, tileH)) + 2;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(rad);
    for (let r = -ext; r <= ext; r++) for (let c = -ext; c <= ext; c++) drawTile(c, r);
    ctx.restore();
  }
}

// ── Colorway pixel replacement ───────────────────────────────────────────────
async function applyColorway(buf, colorMap) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  const ch  = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    for (const entry of colorMap) {
      const [rf, gf, bf, rt, gt, bt] = entry;
      const d = Math.sqrt((data[i]-rf)**2 + (data[i+1]-gf)**2 + (data[i+2]-bf)**2);
      if (d < 30) { out[i] = rt; out[i+1] = gt; out[i+2] = bt; break; }
    }
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: ch } })
    .png().toBuffer();
}

// ── K-means color clustering ─────────────────────────────────────────────────
function kMeans(pixels, k, iters = 15) {
  const step = Math.max(1, Math.floor(pixels.length / k));
  let cents  = Array.from({ length: k }, (_, i) => [...pixels[Math.min(i * step, pixels.length - 1)]]);

  for (let it = 0; it < iters; it++) {
    const sums = cents.map(() => [0, 0, 0, 0]);
    for (const p of pixels) {
      let bi = 0, bd = Infinity;
      for (let j = 0; j < cents.length; j++) {
        const d = (p[0]-cents[j][0])**2 + (p[1]-cents[j][1])**2 + (p[2]-cents[j][2])**2;
        if (d < bd) { bd = d; bi = j; }
      }
      sums[bi][0] += p[0]; sums[bi][1] += p[1]; sums[bi][2] += p[2]; sums[bi][3]++;
    }
    cents = sums.map((s, i) =>
      s[3] > 0
        ? [Math.round(s[0]/s[3]), Math.round(s[1]/s[3]), Math.round(s[2]/s[3])]
        : cents[i]
    );
  }
  return cents;
}

function clamp(v) { return Math.min(255, Math.max(0, v)); }

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`\n  Pattern Try-On → http://localhost:${PORT}/\n`));

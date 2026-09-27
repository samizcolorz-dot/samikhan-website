// Recaptures the project card screenshots from the live apps.
//
// The cards on the homepage show real screenshots of tasks./finance./medical.
// samikhanapps.com. Those are static files, so they go stale as soon as an app
// changes. This regenerates them.
//
//   node scripts/refresh-screenshots.js            # all apps
//   node scripts/refresh-screenshots.js taskcue    # just one
//
// Writes assets/projects/<name>-800.webp (used) and <name>.jpg (fallback).

const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const APPS = {
  taskcue: 'https://tasks.samikhanapps.com/',
  finance: 'https://finance.samikhanapps.com/',
  medical: 'https://medical.samikhanapps.com/',
};

// Matches the width/height attributes on the <img> tags in index.html.
const OUT_W = 800;
const OUT_H = 514;
// Captured at 2x this aspect ratio, then downscaled, so text stays crisp.
const VIEW_W = 1400;
const VIEW_H = 900;

// Without these, every browser launch rasterises text slightly differently and
// the diff check below reports ~1.2% change on an unchanged page, which would
// mean a pointless commit and deploy on every scheduled run.
const LAUNCH_ARGS = [
  '--disable-gpu',
  '--force-color-profile=srgb',
  '--font-render-hinting=none',
  '--disable-lcd-text',
];

const outDir = path.resolve(__dirname, '..', 'assets', 'projects');

// Re-encoding the same page never produces identical bytes — antialiasing and
// font timing shift a few pixels every run. Comparing bytes would therefore
// commit and deploy on every scheduled run forever. Compare pixels instead and
// only rewrite when something actually looks different.
//
// Note this is only meaningful when both images came from the same renderer.
// Run locally against CI-generated files it will always report a large diff,
// because Linux and Windows rasterise fonts differently. In CI it is always
// Linux vs Linux.
//
// Measured: two captures in one browser session are pixel-identical, but two
// separate launches drifted ~1.2% until LAUNCH_ARGS below pinned rendering.
// With those flags separate launches measure 0.000%, so this threshold only
// has to clear genuine noise, not rasterisation differences.
const DIFF_THRESHOLD_PCT = 0.5;

async function looksDifferent(newPng, existingPath) {
  if (!fs.existsSync(existingPath)) return true;

  const norm = (input) => sharp(input)
    .resize(OUT_W, OUT_H, { fit: 'cover', position: 'top' })
    .greyscale().raw().toBuffer();

  let before;
  try {
    // Read into a buffer rather than handing sharp the path: it keeps the
    // input file open, and this same path is about to be overwritten, which
    // fails on Windows with "unable to open for write".
    before = await norm(fs.readFileSync(existingPath));
  } catch {
    return true; // unreadable/corrupt existing file — just replace it
  }
  const after = await norm(newPng);
  if (before.length !== after.length) return true;

  let differing = 0;
  for (let i = 0; i < after.length; i++) {
    if (Math.abs(after[i] - before[i]) > 8) differing++;
  }
  const pct = (differing / after.length) * 100;
  console.log(`  ${pct.toFixed(2)}% of pixels differ (threshold ${DIFF_THRESHOLD_PCT}%)`);
  return pct > DIFF_THRESHOLD_PCT;
}

async function capture(page, name, url) {
  console.log(`  fetching ${url}`);
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  if (!res || res.status() >= 400) {
    throw new Error(`${url} returned ${res ? res.status() : 'no response'}`);
  }
  // let fonts settle so text isn't captured mid-swap
  await page.waitForTimeout(2000);

  const png = await page.screenshot({ type: 'png' });

  const webpPath = path.join(outDir, `${name}-800.webp`);
  const jpgPath = path.join(outDir, `${name}.jpg`);

  // Encode first, then compare WebP against WebP. Comparing the raw PNG against
  // the stored WebP measures lossy-compression artefacts as well as real
  // change — enough to push TaskCue's gradient over the threshold on its own.
  const webp = await sharp(png)
    .resize(OUT_W, OUT_H, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 }).toBuffer();

  if (!(await looksDifferent(webp, webpPath))) {
    console.log(`  unchanged, keeping existing files`);
    return;
  }

  fs.writeFileSync(webpPath, webp);
  await sharp(png).resize(OUT_W, OUT_H, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82 }).toFile(jpgPath);

  console.log(`  updated ${name}-800.webp and ${name}.jpg`);
}

(async () => {
  const only = process.argv[2];
  const targets = only ? { [only]: APPS[only] } : APPS;

  if (only && !APPS[only]) {
    console.error(`unknown app "${only}". known: ${Object.keys(APPS).join(', ')}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ args: LAUNCH_ARGS });
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: VIEW_H },
    deviceScaleFactor: 2,
  });

  const failures = [];
  for (const [name, url] of Object.entries(targets)) {
    console.log(`${name}:`);
    try {
      await capture(page, name, url);
    } catch (err) {
      // One app being down shouldn't block refreshing the others.
      console.error(`  FAILED: ${err.message}`);
      failures.push(name);
    }
  }

  await browser.close();

  if (failures.length) {
    console.error(`\nfailed: ${failures.join(', ')}`);
    process.exit(1);
  }
  console.log('\nall screenshots refreshed');
})();

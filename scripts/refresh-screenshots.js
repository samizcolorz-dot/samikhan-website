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

const outDir = path.resolve(__dirname, '..', 'assets', 'projects');

async function capture(page, name, url) {
  console.log(`  fetching ${url}`);
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  if (!res || res.status() >= 400) {
    throw new Error(`${url} returned ${res ? res.status() : 'no response'}`);
  }
  // let fonts settle so text isn't captured mid-swap
  await page.waitForTimeout(2000);

  const png = await page.screenshot({ type: 'png' });

  await sharp(png).resize(OUT_W, OUT_H, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 }).toFile(path.join(outDir, `${name}-800.webp`));
  await sharp(png).resize(OUT_W, OUT_H, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 82 }).toFile(path.join(outDir, `${name}.jpg`));

  console.log(`  wrote ${name}-800.webp and ${name}.jpg`);
}

(async () => {
  const only = process.argv[2];
  const targets = only ? { [only]: APPS[only] } : APPS;

  if (only && !APPS[only]) {
    console.error(`unknown app "${only}". known: ${Object.keys(APPS).join(', ')}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
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

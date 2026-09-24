// Screenshot harness: captures every .panel of an HTML gallery at desktop + mobile widths.
// Usage: node tools/shoot.mjs <file.html> <outDir> [--panels=id1,id2] [--dark]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createRequire } from 'node:module';

const [, , file, outDir = 'shots', ...flags] = process.argv;
if (!file) { console.error('usage: node tools/shoot.mjs <file.html> <outDir> [--panels=a,b] [--dark]'); process.exit(1); }
const only = (flags.find(f => f.startsWith('--panels=')) || '').split('=')[1]?.split(',').filter(Boolean);
const dark = flags.includes('--dark');
const widths = [{ name: 'desktop', width: 1280, height: 900 }, { name: 'mobile', width: 390, height: 844 }];

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const vp of widths) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, colorScheme: dark ? 'dark' : 'light', reducedMotion: 'reduce' });
  await page.goto('file://' + resolve(file));
  await page.waitForTimeout(400);
  const ids = await page.$$eval('.panel', els => els.map(e => e.id).filter(Boolean));
  const targets = ids.length ? ids : ['page'];
  for (const id of targets) {
    if (only && !only.includes(id)) continue;
    if (id !== 'page') {
      await page.evaluate(pid => {
        document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === pid));
        document.querySelectorAll('.panel').forEach(p => { p.style.display = p.id === pid ? 'block' : 'none'; });
      }, id);
      await page.waitForTimeout(150);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const out = `${outDir}/${basename(file, '.html')}__${id}__${vp.name}${dark ? '__dark' : ''}.png`;
    await page.screenshot({ path: out, fullPage: true });
    report.push({ id, viewport: vp.name, horizontalOverflowPx: overflow, file: out });
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 2));

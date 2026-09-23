import { chromium } from 'playwright';
import { resolve } from 'node:path';
const out = process.argv[2]; const dark = process.argv.includes('--dark');
const b = await chromium.launch();
for (const vp of [{n:'desktop',width:1280,height:900},{n:'mobile',width:390,height:844}]) {
  const p = await b.newPage({ viewport: vp, reducedMotion: 'reduce', colorScheme: dark ? 'dark' : 'light' });
  const sfx = dark ? '__dark' : '';
  await p.goto('file://' + resolve('app/preview-b2.html') + '#panel-forecast'); await p.waitForTimeout(400);
  await p.click('#fc-chart-tile .seg button[data-value="year"]'); await p.waitForTimeout(400);
  await p.locator('#fc-chart-tile').screenshot({ path: `${out}/int__fc-year__${vp.n}${sfx}.png` });
  await p.goto('file://' + resolve('app/preview-b2.html') + '#panel-breakdown'); await p.waitForTimeout(400);
  await p.click('#bd-season-tile .seg button[data-value="all"]'); await p.waitForTimeout(400);
  await p.locator('#bd-season-tile').screenshot({ path: `${out}/int__bd-all__${vp.n}${sfx}.png` });
  await p.click('#bd-list-tile .seg button[data-value="eur"]'); await p.waitForTimeout(300);
  await p.locator('#bd-list-tile').screenshot({ path: `${out}/int__bd-eur__${vp.n}${sfx}.png` });
  await p.close();
}
await b.close();

import { chromium } from 'playwright';
import { resolve } from 'node:path';
const browser = await chromium.launch();
for (const d of ['a-calm-ledger','b-energy-almanac','c-soft-native']) for (const vp of [[1280,900,'desktop'],[390,844,'mobile']]) {
  const page = await browser.newPage({ viewport: { width: vp[0], height: vp[1] }, reducedMotion: 'reduce' });
  await page.goto('file://' + resolve(`directions/${d}/index.html`));
  await page.evaluate(() => { document.querySelectorAll('.panel').forEach(p => { const on = p.id==='panel-peak'; p.classList.toggle('active', on); p.style.display = on?'block':'none'; }); });
  await page.waitForTimeout(600);
  const btn = page.locator('#panel-peak button.disclosure, #panel-peak button.disc-btn').first();
  await btn.click(); await page.waitForTimeout(600);
  const id = await btn.getAttribute('aria-controls');
  const bb1 = await btn.boundingBox(); const bb2 = await page.locator('#'+id).boundingBox();
  const y = bb1.y - 10 + await page.evaluate(()=>scrollY);
  await page.screenshot({ path: `shots/eval1/${d}/int__disc-crop__${vp[2]}.png`, fullPage: true, clip: { x: 0, y, width: vp[0], height: (bb2.y+bb2.height) - bb1.y + 30 } });
  console.log(d, vp[2], bb2.height);
  await page.close();
}
await browser.close();

import { chromium } from 'playwright';
import { resolve } from 'node:path';
const dirs = { a: 'a-calm-ledger', b: 'b-energy-almanac', c: 'c-soft-native' };
const browser = await chromium.launch();
for (const [k, d] of Object.entries(dirs)) {
  for (const vp of [{n:'desktop',w:1280,h:900},{n:'mobile',w:390,h:844}]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.goto('file://' + resolve(`directions/${d}/index.html`));
    await page.waitForTimeout(600);
    await page.evaluate(() => { document.querySelectorAll('.panel').forEach(p => { const on = p.id==='panel-peak'; p.classList.toggle('active', on); p.style.display = on?'block':'none'; }); });
    await page.waitForTimeout(900);
    // estimate popover
    const est = page.locator('#panel-peak button.approx, #panel-peak button.est').first();
    await est.scrollIntoViewIfNeeded(); await est.click(); await page.waitForTimeout(500);
    await page.screenshot({ path: `shots/eval1/${d}/int__pop-est__${vp.n}.png` });
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    // focus state check: focused element after escape
    const foc = await page.evaluate(() => document.activeElement && document.activeElement.className);
    console.log(d, vp.n, 'focus after Esc:', foc);
    await page.screenshot({ path: `shots/eval1/${d}/int__focus-after-esc__${vp.n}.png` });
    // disclosure
    const disc = page.locator('#panel-peak button.disclosure, #panel-peak button.disc-btn').first();
    await disc.scrollIntoViewIfNeeded(); await disc.click(); await page.waitForTimeout(700);
    const box = await disc.boundingBox();
    await page.screenshot({ path: `shots/eval1/${d}/int__disclosure__${vp.n}.png`, fullPage: true });
    // tab focus ring: Tab through a few
    await page.close();
  }
  // hover tooltip on chart desktop
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('file://' + resolve(`directions/${d}/index.html`));
  await page.evaluate(() => { document.querySelectorAll('.panel').forEach(p => { const on = p.id==='panel-peak'; p.classList.toggle('active', on); p.style.display = on?'block':'none'; }); });
  await page.waitForTimeout(1500);
  const svg = page.locator('#panel-peak svg').filter({ has: page.locator('rect, path') });
  const chart = page.locator('#panel-peak [id*=chart], #panel-peak .chart, #panel-peak [data-chart]').first();
  const bb = await chart.boundingBox().catch(()=>null);
  if (bb) { await page.mouse.move(bb.x + bb.width*0.2, bb.y + bb.height*0.6); await page.waitForTimeout(400);
    await page.screenshot({ path: `shots/eval1/${d}/int__chart-hover.png`, clip: { x: 0, y: Math.max(0,bb.y-80), width: 1280, height: bb.height+160 } }); }
  // keyboard focus
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  await page.screenshot({ path: `shots/eval1/${d}/int__kbd-focus.png` });
  await page.close();
}
await browser.close();

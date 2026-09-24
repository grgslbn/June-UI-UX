// Evaluator 1, round 3: capture interaction states. Usage: node shots/eval1-r3/interact.mjs
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const OUT = 'shots/eval1-r3';
const file = 'file://' + resolve('app/index.html');
const browser = await chromium.launch();
const log = [];
async function open(vp, id, dark = false) {
  const page = await browser.newPage({ viewport: vp, colorScheme: dark ? 'dark' : 'light' });
  await page.goto(file + '#' + id);
  await page.waitForTimeout(700);
  return page;
}
async function shot(page, id, name) {
  await page.waitForTimeout(600);
  const el = await page.$('#' + id);
  await el.screenshot({ path: `${OUT}/int__${name}.png` });
}
const D = { width: 1280, height: 900 }, M = { width: 390, height: 844 };
const cases = [
  ['panel-peak', 'pop-peak-est', async p => p.click('#panel-peak .est')],
  ['panel-peak', 'pop-peak-rolling', async p => p.click('#panel-peak [data-pop="pk-pop-rolling"]')],
  ['panel-solar', 'pop-solar-selfuse', async p => p.click('#panel-solar [data-pop="sl-pop-selfuse"]')],
  ['panel-forecast', 'pop-fc-est', async p => p.click('#panel-forecast .est')],
  ['panel-advice', 'pop-ad-est', async p => p.click('#panel-advice .est')],
  ['panel-compare', 'pop-cp-rank', async p => p.click('#panel-compare [data-pop="cp-pop-rank"]')],
  ['panel-peak', 'disc-peak-calc', async p => p.click('#panel-peak .disc-btn')],
  ['panel-compare', 'disc-cp-rank', async p => p.click('#panel-compare .disc-btn')],
  ['panel-solar', 'disc-solar-raw', async p => p.click('#panel-solar .disc-btn')],
  ['panel-forecast', 'disc-fc-acc', async p => p.click('#panel-forecast .disc-btn')],
  ['panel-budgets', 'disc-bg-set', async p => p.click('#panel-budgets .disc-btn')],
  ['panel-advice', 'disc-ad-calc', async p => p.click('#panel-advice .disc-btn')],
  ['panel-peak', 'seg-peak-year', async p => p.click('#panel-peak .seg button:has-text("Year")')],
  ['panel-peak', 'seg-peak-week', async p => p.click('#panel-peak .seg button:has-text("Week")')],
  ['panel-solar', 'seg-solar-month', async p => p.click('#panel-solar .seg button:has-text("Month")')],
  ['panel-solar', 'seg-solar-year', async p => p.click('#panel-solar .seg button:has-text("Year")')],
  ['panel-solar', 'solar-import-off', async p => p.click('#panel-solar .sl-filter[data-series="down"]')],
  ['panel-breakdown', 'seg-bd-eur', async p => p.click('#panel-breakdown .seg--unit button:has-text("€")')],
  ['panel-breakdown', 'seg-bd-allcats', async p => p.click('#panel-breakdown .seg button:has-text("All categories")')],
  ['panel-forecast', 'seg-fc-year', async p => p.click('#panel-forecast .seg button:has-text("Year")')],
  ['panel-forecast', 'seg-fc-48h', async p => p.click('#panel-forecast .seg button:has-text("Next 48h")')],
  ['panel-budgets', 'seg-bg-week', async p => p.click('#panel-budgets .seg button:has-text("Week")')],
  ['panel-budgets', 'seg-bg-gas', async p => p.click('#panel-budgets .seg--fuel button:has-text("Gas")', { force: true })],
  ['panel-compare', 'seg-cp-gas', async p => p.click('#panel-compare .seg--fuel button:has-text("Gas")')],
  ['panel-advice', 'advice-add-plan', async p => p.click('#panel-advice .btn:has-text("Add to my plan")')],
  ['panel-advice', 'advice-dismiss', async p => p.click('#panel-advice button:has-text("Not relevant")')],
];
for (const [id, name, act] of cases) {
  const p = await open(D, id);
  try { await act(p); log.push([name, 'ok']); } catch (e) { log.push([name, 'FAIL ' + e.message.split('\n')[0]]); }
  await shot(p, id, name);
  // record aria state
  const st = await p.evaluate(pid => {
    const pan = document.getElementById(pid);
    const pop = document.querySelector('.pop.open, [role="dialog"]:not([hidden])');
    const r = pop ? pop.getBoundingClientRect() : null;
    const pr = pan.getBoundingClientRect();
    return { popRect: r && [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)], vw: innerWidth };
  }, id);
  log.push([name, JSON.stringify(st)]);
  await p.close();
}
// mobile popovers
for (const [id, name, sel] of [['panel-peak','m-pop-peak-est','#panel-peak .est'],['panel-solar','m-pop-solar','#panel-solar [data-pop="sl-pop-selfsuff"]'],['panel-forecast','m-pop-fc-band','#panel-forecast [data-pop="fc-pop-band"]']]) {
  const p = await open(M, id);
  await p.click(sel); await p.waitForTimeout(400);
  const r = await p.evaluate(() => { const e = document.querySelector('.pop.open'); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left, b.right, innerWidth]; });
  log.push([name, JSON.stringify(r)]);
  await p.screenshot({ path: `${OUT}/int__${name}.png` });
  await p.close();
}
// keyboard focus
{ const p = await open(D, 'panel-peak'); for (let i=0;i<14;i++) await p.keyboard.press('Tab'); await p.screenshot({ path: `${OUT}/int__kbd-focus.png` }); await p.close(); }
await browser.close();
console.log(log.map(l => l.join('  ')).join('\n'));

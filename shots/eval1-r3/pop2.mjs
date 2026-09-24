import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
for (const [vp, id, sel, name] of [[{width:1280,height:900},'panel-peak','#panel-peak .est','vp-pop-peak-est'],[{width:390,height:844},'panel-peak','#panel-peak .est','vp-m-pop-peak-est'],[{width:390,height:844},'panel-solar','#panel-solar [data-pop="sl-pop-selfsuff"]','vp-m-pop-solar']]) {
  const p = await b.newPage({ viewport: vp });
  await p.goto('file://' + resolve('app/index.html') + '#' + id); await p.waitForTimeout(600);
  const t = await p.$(sel); await t.scrollIntoViewIfNeeded(); await p.evaluate(() => scrollBy(0, -200)); await t.click(); await p.waitForTimeout(400);
  const r = await p.evaluate(s => { const tb = document.querySelector(s).getBoundingClientRect(); const e = [...document.querySelectorAll('.popover')].find(x => !x.hidden); const c = document.querySelector(s).closest('.surface, .tile, section'); const cr = c.getBoundingClientRect(); const pb = e && e.getBoundingClientRect(); return { trig: [tb.left|0, tb.top|0], pop: pb && [pb.left|0, pb.top|0, pb.right|0, pb.bottom|0], card: [cr.left|0, cr.right|0], pos: e && getComputedStyle(e).position }; }, sel);
  console.log(name, JSON.stringify(r));
  await p.screenshot({ path: `shots/eval1-r3/int__${name}.png` }); await p.close();
}
await b.close();

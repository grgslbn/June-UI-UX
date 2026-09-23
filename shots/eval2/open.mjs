import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
for (const d of ['a-calm-ledger','b-energy-almanac','c-soft-native']) {
  const p = await b.newPage({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
  await p.goto('file://'+resolve(`directions/${d}/index.html`)); await p.waitForTimeout(300);
  await (await p.$('[data-show="panel-peak"], [data-review="panel-peak"]')).click(); await p.waitForTimeout(600);
  await p.addStyleTag({content:'.meta{display:none!important}'});
  const disc = await p.$('.panel.active [aria-controls="calc"], .panel.active [aria-controls="calc-body"], #panel-peak [aria-controls="calc"], #panel-peak [aria-controls="calc-body"]');
  await disc.click(); await p.waitForTimeout(600);
  const box = await disc.boundingBox();
  await p.screenshot({ path:`shots/eval2/fold/${d[0]}__calc-open__mobile.png`, fullPage:true, clip:{x:0,y:box.y+ (await p.evaluate(()=>scrollY)) -20, width:390, height:1100} });
  await p.evaluate(()=>scrollTo(0,0));
  const pop = await p.$('#panel-peak [aria-controls^="pop-rolling"]'); await pop.click(); await p.waitForTimeout(400);
  await p.screenshot({ path:`shots/eval2/fold/${d[0]}__pop-rolling__mobile.png` });
  await p.close();
}
await b.close();

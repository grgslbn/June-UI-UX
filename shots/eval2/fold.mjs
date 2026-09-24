// Above-the-fold shots with reviewer chrome (.meta) hidden. node shots/eval2/fold.mjs <file> <prefix>
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const [,, file, prefix] = process.argv;
const b = await chromium.launch();
for (const vp of [{n:'desktop',w:1280,h:800},{n:'mobile',w:390,h:844}]) for (const id of ['panel-overview','panel-peak','panel-peak-history']) {
  const p = await b.newPage({ viewport:{width:vp.w,height:vp.h}, reducedMotion:'reduce' });
  await p.goto('file://'+resolve(file)); await p.waitForTimeout(300);
  const sw = await p.$(`[data-show="${id}"], [data-review="${id}"]`); await sw.click(); await p.waitForTimeout(700);
  await p.addStyleTag({content:'.meta{display:none!important}'}); await p.waitForTimeout(300);
  await p.evaluate(()=>{window.scrollTo(0,0); document.activeElement.blur();});
  await p.screenshot({ path:`shots/eval2/fold/${prefix}__${id}__${vp.n}.png` });
  await p.close();
}
await b.close();

import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('file://' + resolve('app/index.html') + '#panel-advice'); await p.waitForTimeout(600);
const n = await p.$$eval('#panel-advice .est, #panel-advice .approx', els => els.map(e => [e.tagName, e.className, e.offsetParent !== null, e.getAttribute('data-pop')]));
console.log(JSON.stringify(n));
const t = await p.$('#panel-advice button.est:visible, #panel-advice button.approx:visible');
if (t) { await t.click(); await p.waitForTimeout(400); await p.screenshot({ path: 'shots/eval1-r3/int__vp-pop-ad-est.png' }); }
await p.goto('file://' + resolve('app/index.html') + '#panel-compare'); await p.waitForTimeout(500);
await p.click('#panel-compare .disc-btn'); await p.waitForTimeout(400);
const i = await p.$('#panel-compare [data-pop="cp-pop-rank"]:visible'); if (i) { await i.click(); await p.waitForTimeout(400); }
const el = await p.$('#panel-compare'); await el.screenshot({ path: 'shots/eval1-r3/int__cp-rank-open.png' });
await b.close();

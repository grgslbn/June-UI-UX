import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:390,height:844}});
await p.goto('file://'+resolve('app/index.html')); await p.waitForTimeout(300);
const out = await p.$$eval('.panel', ps => ps.map(el => { const c = el.cloneNode(true); c.querySelectorAll('.meta, details.spec, .spec-notes').forEach(n=>n.remove()); el.style.display='block'; return '=== '+el.id+'\n'+el.innerText.replace(/\n{2,}/g,'\n'); }));
console.log(out.join('\n')); await b.close();

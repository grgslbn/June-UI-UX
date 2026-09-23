import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://'+resolve('app/index.html')); await p.waitForTimeout(400);
const l = await p.$$eval('.panel', ps => ps.flatMap(P => [...P.querySelectorAll('[role=img]')].map(h => P.id+': '+(h.getAttribute('aria-label')||('LBY:'+(document.getElementById(h.getAttribute('aria-labelledby')||'')?.innerText||'NONE'))).slice(0,220))));
console.log(l.join('\n')); await b.close();

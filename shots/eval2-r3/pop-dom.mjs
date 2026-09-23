import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
for (const vp of [{width:1280,height:900},{width:390,height:844}]) {
const p = await b.newPage({viewport:vp, reducedMotion:'reduce'});
await p.goto('file://'+resolve('app/index.html')+'#panel-peak'); await p.waitForTimeout(400);
const t = await p.$('#panel-peak [data-pop]'); await t.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
console.log(vp.width, JSON.stringify(await p.evaluate(()=>{const b=document.activeElement; const pop=document.getElementById(b.getAttribute('aria-controls')); const r=pop.getBoundingClientRect(); const br=b.getBoundingClientRect();
 // is pop following trigger in document order?
 const follows = !!(b.compareDocumentPosition(pop) & Node.DOCUMENT_POSITION_FOLLOWING); const inPanel = !!pop.closest('#panel-peak');
 const attrs=[...b.attributes].map(a=>a.name+'='+a.value).join(' '); return {attrs, role:pop.getAttribute('role'), follows, inPanel, parent: pop.parentElement.className, rect:[r.left|0,r.top|0,r.width|0,r.height|0], trig:[br.left|0,br.top|0], coversHero: r.top < 400 && r.left<600};})));
await p.screenshot({path:`shots/eval2-r3/popover-open-${vp.width}.png`});
await p.close();}
await b.close();

import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
for (const rm of ['reduce','no-preference']) {
 for (const vp of [{width:1280,height:900},{width:390,height:844}]) {
  const p = await b.newPage({viewport:vp, reducedMotion:rm});
  await p.goto('file://'+resolve('app/index.html')+'#panel-advice'); await p.waitForTimeout(500);
  const btn = await p.$('#panel-advice [data-ad-move="plan"]'); await btn.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
  const a = await p.evaluate(()=>{const e=document.activeElement; const u=document.querySelector('#panel-advice [data-ad-undo]'); const r=u?.getBoundingClientRect(); return {tag:e.tagName, txt:(e.innerText||'').slice(0,20), undo: u? {vis: r.width+'x'+r.height, disp:getComputedStyle(u).display, vis2:getComputedStyle(u).visibility}:null, itemCls: document.querySelector('#panel-advice [data-ad-item]').className}});
  if (vp.width===390 && rm==='no-preference') await p.screenshot({path:'shots/eval2-r2/task-advice-added-mobile.png'});
  await p.keyboard.press('Enter'); await p.waitForTimeout(600);
  const c = await p.evaluate(()=>({tag:document.activeElement.tagName, txt:(document.activeElement.innerText||'').slice(0,20), plan: document.querySelector('#panel-advice [data-ad-count="plan"]')?.textContent}));
  console.log(rm, vp.width, JSON.stringify(a), JSON.stringify(c));
  await p.close();
 }}
await b.close();

import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
for (const rm of ['no-preference','reduce']) for (const w of [1280,390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: rm });
  const errs=[]; p.on('pageerror', e=>errs.push(e.message));
  await p.goto('file://' + resolve('app/preview-b3.html') + '#panel-advice');
  await p.waitForTimeout(400);
  await p.focus('#panel-advice .ad-hero [data-ad-move="plan"]');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(rm==='reduce'?80:400);
  const f1 = await p.evaluate(()=>document.activeElement.textContent.trim()+'|'+document.activeElement.tagName);
  await p.keyboard.press('Enter');
  await p.waitForTimeout(rm==='reduce'?80:400);
  const f2 = await p.evaluate(()=>document.activeElement.textContent.trim());
  const counts = await p.$$eval('#panel-advice [data-ad-count]', e=>e.map(x=>x.textContent+(x.hidden?'h':'')).join(','));
  // row move
  await p.click('#panel-advice li[data-ad-item] [data-ad-move="notrel"]');
  await p.waitForTimeout(rm==='reduce'?80:400);
  const f3 = await p.evaluate(()=>document.activeElement.textContent.trim());
  if (w===390 && rm==='reduce') await p.screenshot({ path: 'shots/app-b3/int__advice-moved-m.png', fullPage: false, clip:{x:0,y:900,width:390,height:700} }).catch(()=>{});
  // seg nav via keyboard
  await p.focus('#panel-advice .ad-seg [aria-checked="true"]');
  await p.keyboard.press('ArrowRight');
  await p.waitForTimeout(400);
  const act = await p.$eval('.panel.active', e=>e.id);
  const segW = await p.evaluate(()=>{const s=document.querySelector('#panel-advice .ad-seg');return s.scrollWidth-s.clientWidth;});
  console.log(rm, w, 'undoFocus:', f1, '| backFocus:', f2, '| counts:', counts, '| rowUndoFocus:', f3, '| nav:', act, '| segOverflow:', segW, errs);
  await p.close();
}
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto('file://' + resolve('app/preview-b3.html') + '#panel-budgets');
await p.waitForTimeout(400);
await p.click('#panel-budgets [data-pop="bg-pop-gas"]');
await p.waitForTimeout(300);
await p.screenshot({ path: 'shots/app-b3/int__budgets-gas-pop.png', clip:{x:0,y:150,width:1280,height:300} });
await b.close();

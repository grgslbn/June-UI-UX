import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
const URL = 'file://' + resolve('app/index.html');
const MAIN = ['overview','compare','solar','breakdown','peak','forecast','advice','budgets'].map(t=>'panel-'+t);
const b = await chromium.launch();
const res = {};
async function open(vp, rm='reduce', hash='') {
  const p = await b.newPage({ viewport: vp, reducedMotion: rm });
  await p.goto(URL + hash); await p.waitForTimeout(400); return p;
}
// 1. keyboard order + focus visibility per main panel (desktop)
for (const id of MAIN) {
  const p = await open({width:1280,height:900}, 'reduce', '#'+id);
  // start focus on first tab link
  await p.focus('.tabs .tab');
  const stops = [];
  for (let i=0;i<80;i++) {
    const info = await p.evaluate(() => {
      const el = document.activeElement; if (!el || el===document.body) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const inMeta = !!el.closest('.meta');
      const inPanel = el.closest('.panel')?.id || (el.closest('.popover')?'popover':el.closest('.tabs')?'tabs':'chrome');
      const ring = (cs.outlineStyle!=='none' && parseFloat(cs.outlineWidth)>0) || (cs.boxShadow && cs.boxShadow!=='none');
      // pseudo ring check
      const after = getComputedStyle(el,'::after'); const pring = after.outlineStyle!=='none' && parseFloat(after.outlineWidth)>0 || (after.boxShadow && after.boxShadow!=='none');
      const name = (el.getAttribute('aria-label') || el.innerText || el.getAttribute('title')||'').trim().replace(/\s+/g,' ').slice(0,40);
      return { tag: el.tagName.toLowerCase(), role: el.getAttribute('role'), name, where: inPanel, meta: inMeta, ring: ring||pring, w:Math.round(r.width), h:Math.round(r.height), exp: el.getAttribute('aria-expanded'), chk: el.getAttribute('aria-checked'), cur: el.getAttribute('aria-current') };
    });
    if (!info) break;
    stops.push(info);
    if (info.meta && stops.length>3) break; // wrapped to reviewer chrome
    await p.keyboard.press('Tab');
  }
  res[id] = { stops: stops.filter(s=>!s.meta), noRing: stops.filter(s=>!s.meta && !s.ring).map(s=>s.name||s.tag) };
  await p.close();
}
// 2. chart alt text, popovers, disclosures, seg, targets (mobile), per all panels
const p = await open({width:390,height:844});
const ids = await p.$$eval('.panel', ps=>ps.map(x=>x.id));
const perPanel = {};
for (const id of ids) {
  await p.evaluate(i=>window.JuneApp.show(i,{top:true}), id); await p.waitForTimeout(120);
  perPanel[id] = await p.evaluate((id) => {
    const P = document.getElementById(id);
    const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
    const charts = [...P.querySelectorAll('.jc, svg:not(.icon)')].filter(vis).filter(s=>!s.closest('.jc')||s.classList.contains('jc'));
    const jc = [...P.querySelectorAll('.jc')].filter(vis).map(h=>({label: (h.getAttribute('aria-label')||'').slice(0,60), role:h.getAttribute('role'), labelled: !!(h.getAttribute('aria-label')||h.getAttribute('aria-labelledby')), tab: h.tabIndex}));
    const inter = [...P.querySelectorAll('a[href],button,[tabindex]:not([tabindex="-1"]),input,select,summary')].filter(vis).filter(e=>!e.closest('.meta')&&!e.closest('details.spec')&&!e.closest('.spec'));
    const small24 = [], small44 = [];
    inter.forEach(e=>{ const r=e.getBoundingClientRect(); const n=(e.getAttribute('aria-label')||e.innerText||'').trim().replace(/\s+/g,' ').slice(0,30);
      if (r.width<24||r.height<24) small24.push(`${n||e.tagName} ${Math.round(r.width)}x${Math.round(r.height)}`);
      else if ((r.width<44||r.height<44)) small44.push(`${n||e.tagName} ${Math.round(r.width)}x${Math.round(r.height)}${e.classList.contains('btn--primary')?' PRIMARY':''}`); });
    const primSmall = inter.filter(e=>e.classList.contains('btn--primary')).map(e=>Math.round(e.getBoundingClientRect().height));
    const pops = [...P.querySelectorAll('[data-pop]')].map(b=>({name:(b.getAttribute('aria-label')||b.innerText).trim().slice(0,40), exp:b.getAttribute('aria-expanded'), w:Math.round(b.getBoundingClientRect().width), h:Math.round(b.getBoundingClientRect().height)}));
    const discs = [...P.querySelectorAll('.disc-btn')].map(b=>({exp:b.getAttribute('aria-expanded'), ctrl: !!document.getElementById(b.getAttribute('aria-controls'))}));
    const segs = [...P.querySelectorAll('.seg')].map(s=>({role:s.getAttribute('role'), label: s.getAttribute('aria-label')||s.getAttribute('aria-labelledby')||'', n:s.children.length}));
    const h = [...P.querySelectorAll('h1,h2,h3')].map(x=>x.tagName+':'+x.innerText.trim().slice(0,30));
    const emptyNames = inter.filter(e=>!(e.getAttribute('aria-label')||e.innerText.trim()||e.getAttribute('title'))).map(e=>e.outerHTML.slice(0,80));
    return { jc, small24, small44, primSmall, pops, discs, segs, h: h.slice(0,4), hCount:h.length, emptyNames };
  }, id);
}
res.perPanel = perPanel;
// 3. popover keyboard test on Peak (desktop) + Solar
const q = await open({width:1280,height:900}, 'reduce', '#panel-peak');
const popRes = [];
for (const pid of ['panel-peak','panel-solar','panel-breakdown','panel-forecast','panel-overview']) {
  await q.evaluate(i=>window.JuneApp.show(i,{top:true}), pid); await q.waitForTimeout(100);
  const trig = await q.$$(`#${pid} [data-pop]`);
  for (const t of trig.slice(0,3)) {
    const name = await t.evaluate(b=>(b.getAttribute('aria-label')||b.innerText).trim());
    await t.focus(); await q.keyboard.press('Enter'); await q.waitForTimeout(250);
    const st = await q.evaluate(() => { const o=document.querySelector('.popover:not([hidden])'); const a=document.activeElement; return { open: !!o, visible: o? getComputedStyle(o).opacity : null, text: o? o.innerText.slice(0,90).replace(/\s+/g,' '):null, focusInside: o? o.contains(a):false, focusables: o? o.querySelectorAll('a,button').length:0, labelled: o? !!(o.getAttribute('aria-label')||o.getAttribute('aria-labelledby')):false }; });
    const exp1 = await t.getAttribute('aria-expanded');
    await q.keyboard.press('Tab'); await q.waitForTimeout(100);
    const afterTab = await q.evaluate(() => ({ inPop: !!document.activeElement.closest('.popover'), stillOpen: !!document.querySelector('.popover:not([hidden]).open')}));
    await t.focus(); await q.keyboard.press('Escape'); await q.waitForTimeout(250);
    const exp2 = await t.getAttribute('aria-expanded');
    const ret = await t.evaluate(b=>document.activeElement===b);
    popRes.push({ pid, name, ...st, expOpen: exp1, afterTab, expAfterEsc: exp2, focusReturned: ret });
  }
}
res.popovers = popRes;
// 4. Advice add + undo via keyboard
await q.evaluate(()=>window.JuneApp.show('panel-advice',{top:true})); await q.waitForTimeout(100);
const addBtn = await q.$('#panel-advice [data-ad-move="plan"]');
await addBtn.focus(); await q.keyboard.press('Enter'); await q.waitForTimeout(400);
const afterAdd = await q.evaluate(()=>({ focus: document.activeElement.innerText.trim(), live: document.querySelector('#panel-advice [data-ad-live]')?.textContent, planCount: document.querySelector('#panel-advice [data-ad-count="plan"]')?.textContent, newCount: document.querySelector('#panel-advice [data-ad-count="new"]')?.textContent }));
await q.screenshot({ path: 'shots/eval2-r2/task-advice-added.png' });
await q.keyboard.press('Enter'); await q.waitForTimeout(400);
const afterUndo = await q.evaluate(()=>({ focus: document.activeElement.innerText.trim(), live: document.querySelector('#panel-advice [data-ad-live]')?.textContent, planCount: document.querySelector('#panel-advice [data-ad-count="plan"]')?.textContent }));
res.adviceTask = { afterAdd, afterUndo };
// 5. Overview attention link -> target
await q.evaluate(()=>window.JuneApp.show('panel-overview',{top:true}));
const att = await q.$$eval('#panel-overview a[href^="#panel-"]', as=>as.map(a=>a.getAttribute('href')+' | '+a.innerText.trim().replace(/\s+/g,' ').slice(0,50)));
res.overviewLinks = att;
const deadLinks = await q.$$eval('a[href="#"]', as=>as.filter(a=>!a.closest('.meta')).map(a=>(a.closest('.panel')?.id)+': '+a.innerText.trim().slice(0,40)));
res.deadLinks = deadLinks;
// 6. disclosure toggle
await q.evaluate(()=>window.JuneApp.show('panel-peak',{top:true}));
const d = await q.$('#panel-peak .disc-btn'); await d.focus(); await q.keyboard.press('Enter'); await q.waitForTimeout(300);
res.disclosure = { exp: await d.getAttribute('aria-expanded'), name: await d.evaluate(x=>x.innerText.trim().replace(/\s+/g,' ')) };
await q.screenshot({ path:'shots/eval2-r2/peak-disclosure-open.png', fullPage:true });
// 7. reduced motion comparison on overview
for (const rm of ['reduce','no-preference']) {
  const r = await open({width:1280,height:900}, rm, '#panel-peak'); await r.waitForTimeout(50);
  res['anim_'+rm] = await r.evaluate(()=>document.getAnimations().length);
  await r.close();
}
// 8. segmented keyboard
await q.evaluate(()=>window.JuneApp.show('panel-forecast',{top:true}));
const seg = await q.$('#panel-forecast .seg [aria-checked="true"]'); await seg.focus(); await q.keyboard.press('ArrowRight'); await q.waitForTimeout(200);
res.segTest = await q.evaluate(()=>({ focused: document.activeElement.innerText.trim(), checked: document.activeElement.getAttribute('aria-checked'), group: document.activeElement.closest('.seg').getAttribute('aria-label')}));
writeFileSync('shots/eval2-r2/a11y.json', JSON.stringify(res,null,1));
await b.close();

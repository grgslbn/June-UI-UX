// Evaluator 2 accessibility probe. Usage: node shots/eval2/a11y-probe.mjs <file.html>
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const file = process.argv[2];
const PANELS = ['panel-overview', 'panel-peak', 'panel-peak-history'];
const VPS = [{ name: 'desktop', width: 1280, height: 900 }, { name: 'mobile', width: 390, height: 844 }];
const out = { file, panels: {} };
const browser = await chromium.launch();

async function open(vp, motion, id) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, reducedMotion: motion });
  await page.goto('file://' + resolve(file));
  await page.waitForTimeout(300);
  // use the page's own reviewer switcher so its JS runs
  const sw = await page.$(`[data-show="${id}"], [data-review="${id}"]`);
  if (sw) await sw.click(); else await page.evaluate(pid => document.querySelectorAll('.panel').forEach(p => { p.style.display = p.id === pid ? 'block' : 'none'; }), id);
  await page.waitForTimeout(900);
  await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
  return page;
}

const describe = () => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
  return {
    tag: el.tagName.toLowerCase(), role: el.getAttribute('role'),
    name: (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50),
    inMeta: !!el.closest('.meta'), inPanel: !!el.closest('.panel.active, .panel[style*="block"]'),
    ring, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, w: Math.round(r.width), h: Math.round(r.height)
  };
};

for (const id of PANELS) {
  const res = out.panels[id] = {};
  for (const vp of VPS) {
    const page = await open(vp, 'reduce', id);
    const r = res[vp.name] = {};
    // 1. Tab order
    const order = [];
    for (let i = 0; i < 70; i++) { await page.keyboard.press('Tab'); const d = await page.evaluate(describe); if (!d) break; order.push(d); }
    r.tabOrder = order.map(d => `${d.inMeta ? '[meta] ' : ''}${d.tag}${d.role ? '/' + d.role : ''} "${d.name}" ${d.w}x${d.h}${d.ring ? '' : ' NO-RING'}`);
    r.noRing = order.filter(d => !d.ring && !d.inMeta).map(d => d.name);
    // 2. Target sizes (visible interactive, product only)
    r.smallTargets = await page.evaluate(() => {
      const sel = 'a[href], button, [role="button"], [role="tab"], input, select, summary, [tabindex]:not([tabindex="-1"])';
      return [...document.querySelectorAll(sel)].filter(e => !e.closest('.meta') && e.offsetParent !== null && !e.closest('[hidden]')).map(e => {
        const b = e.getBoundingClientRect();
        return { name: (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40), w: Math.round(b.width), h: Math.round(b.height) };
      }).filter(t => t.w > 0 && (t.w < 44 || t.h < 44));
    });
    // 3. Popovers/disclosures via keyboard
    const ctrls = await page.evaluate(() => [...document.querySelectorAll('[aria-expanded]')].filter(e => !e.closest('.meta') && e.offsetParent !== null).map((e, i) => { e.setAttribute('data-probe', i); return i; }));
    r.expanders = [];
    for (const i of ctrls) {
      const h = await page.$(`[data-probe="${i}"]`);
      const info = await h.evaluate(e => ({ name: (e.getAttribute('aria-label') || e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 45), controls: e.getAttribute('aria-controls'), before: e.getAttribute('aria-expanded'), tag: e.tagName.toLowerCase() }));
      await h.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
      info.afterEnter = await h.getAttribute('aria-expanded');
      info.targetVisible = info.controls ? await page.evaluate(c => { const t = document.getElementById(c); if (!t) return 'missing'; const b = t.getBoundingClientRect(); return !t.hidden && b.height > 0 && getComputedStyle(t).visibility !== 'hidden'; }, info.controls) : 'n/a';
      await page.keyboard.press('Escape'); await page.waitForTimeout(300);
      info.afterEsc = await h.getAttribute('aria-expanded');
      info.focusBack = await h.evaluate(e => document.activeElement === e);
      if (info.afterEsc === 'true') { await h.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(200); }
      r.expanders.push(info);
    }
    // 4. Chart text alternatives
    r.charts = await page.evaluate(() => {
      const panel = [...document.querySelectorAll('.panel')].find(p => p.offsetParent !== null);
      const svgs = [...panel.querySelectorAll('svg')].filter(s => { const b = s.getBoundingClientRect(); return b.width > 120 && b.height > 80 && !s.closest('.meta'); });
      return svgs.map(s => {
        const host = s.closest('figure, [role="img"], .chart, [class*="chart"], .gauge') || s.parentElement;
        const lab = s.getAttribute('aria-label') || (s.getAttribute('aria-labelledby') && document.getElementById(s.getAttribute('aria-labelledby'))?.textContent) || host.getAttribute('aria-label') || (host.getAttribute('aria-labelledby') && document.getElementById(host.getAttribute('aria-labelledby'))?.textContent) || host.querySelector('figcaption, .sr-only, .visually-hidden')?.textContent || host.parentElement.querySelector('.sr-only, .visually-hidden, figcaption')?.textContent || '';
        return { cls: host.className?.baseVal ?? host.className, svgHidden: s.getAttribute('aria-hidden'), alt: lab.replace(/\s+/g, ' ').trim().slice(0, 160) };
      });
    });
    await page.close();
    // 5. Motion comparison
    if (vp.name === 'desktop') {
      const count = async motion => { const p = await open(vp, motion, id); const n = await p.evaluate(() => { let a = 0, t = 0; document.querySelectorAll('*').forEach(e => { const cs = getComputedStyle(e); if (cs.animationName !== 'none' && parseFloat(cs.animationDuration) > 0.02) a++; if (cs.transitionDuration.split(',').some(d => parseFloat(d) > 0.02)) t++; }); return { anims: a, transitions: t }; }); await p.close(); return n; };
      r.motion = { reduce: await count('reduce'), full: await count('no-preference') };
    }
  }
}
await browser.close();
console.log(JSON.stringify(out, null, 1));

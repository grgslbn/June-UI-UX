// Automated hard-gate audit for a gallery/page.
// Usage: node tools/audit.mjs <file.html> [--panels=a,b]
// Reports per panel & viewport: horizontal overflow, text < 12px, contrast failures,
// distinct font sizes / text colours in use, and whether reduced-motion is handled.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [, , file, ...flags] = process.argv;
const only = (flags.find(f => f.startsWith('--panels=')) || '').split('=')[1]?.split(',').filter(Boolean);
const src = readFileSync(file, 'utf8');
const reducedMotion = /prefers-reduced-motion/.test(src);

const browser = await chromium.launch();
const results = [];
for (const vp of [{ name: 'desktop', width: 1280, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: vp, reducedMotion: 'reduce' });
  await page.goto('file://' + resolve(file));
  await page.waitForTimeout(300);
  const ids = await page.$$eval('.panel', els => els.map(e => e.id).filter(Boolean));
  for (const id of (ids.length ? ids : ['page'])) {
    if (only && !only.includes(id)) continue;
    const r = await page.evaluate((pid) => {
      if (pid !== 'page') document.querySelectorAll('.panel').forEach(p => { p.style.display = p.id === pid ? 'block' : 'none'; });
      const root = pid === 'page' ? document.body : document.getElementById(pid);
      const parse = c => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; };
      const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const bgOf = el => { let bg = [255, 255, 255]; const stack = []; for (let e = el; e; e = e.parentElement) stack.push(e);
        for (const e of stack.reverse()) { const c = parse(getComputedStyle(e).backgroundColor); const a = c.length > 3 ? c[3] : 1; if (a > 0) bg = bg.map((v, i) => v * (1 - a) + c[i] * a); } return bg; };
      const sizes = {}, colors = {}; const small = [], lowContrast = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      while (walker.nextNode()) {
        const t = walker.currentNode; const el = t.parentElement;
        if (!t.textContent.trim() || seen.has(el)) continue; seen.add(el);
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || el.getClientRects().length === 0) continue;
        if (el.closest('[aria-hidden="true"]') || el.closest('.meta')) continue;
        const fs = parseFloat(cs.fontSize); sizes[fs] = (sizes[fs] || 0) + 1; colors[cs.color] = (colors[cs.color] || 0) + 1;
        const inSvg = !!el.closest('svg');
        if (fs < (inSvg ? 11 : 12)) small.push(`${fs}px "${t.textContent.trim().slice(0, 30)}"`);
        const fg = parse(cs.color); const fa = fg.length > 3 ? fg[3] : 1; const bg = bgOf(el);
        const fgm = fg.slice(0, 3).map((v, i) => v * fa + bg[i] * (1 - fa));
        const L1 = lum(fgm), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const large = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700);
        if (!inSvg && ratio < (large ? 3 : 4.5)) lowContrast.push(`${ratio.toFixed(2)} "${t.textContent.trim().slice(0, 30)}"`);
      }
      return { overflow: document.documentElement.scrollWidth - window.innerWidth, sizes, colorCount: Object.keys(colors).length, small, lowContrast };
    }, id);
    results.push({ panel: id, viewport: vp.name, ...r });
  }
  await page.close();
}
await browser.close();

let fails = 0;
for (const r of results) {
  const gates = [];
  if (r.overflow > 0) gates.push(`overflow ${r.overflow}px`);
  if (r.small.length) gates.push(`${r.small.length} text <12px`);
  if (r.lowContrast.length) gates.push(`${r.lowContrast.length} contrast fails`);
  fails += gates.length;
  console.log(`${gates.length ? '✗' : '✓'} ${r.panel.padEnd(22)} ${r.viewport.padEnd(8)} sizes=${Object.keys(r.sizes).length} colours=${r.colorCount} ${gates.join(' · ')}`);
  if (flags.includes('--verbose')) { r.small.slice(0, 8).forEach(s => console.log('    small', s)); r.lowContrast.slice(0, 8).forEach(s => console.log('    contrast', s)); }
}
console.log(`reduced-motion handled: ${reducedMotion ? 'yes' : 'NO'}`);
console.log(`hard-gate failures: ${fails + (reducedMotion ? 0 : 1)}`);
process.exitCode = 0;

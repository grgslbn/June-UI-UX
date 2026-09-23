// Quality gates + screenshots for one built variant.
// Usage: node tools/check-site.mjs <variant-dir> [--lighthouse] [--shots] [--dark] [--routes=nl-be/,fr-be/]
//   <variant-dir> e.g. variants/a  (must contain dist/ built with default base "/")
// Output: <variant-dir>/report/check.json + check.md, screenshots in <variant-dir>/report/shots/
// Gates: no horizontal overflow (1280, 390), no text < 12px (SVG ≥ 11px), WCAG AA text contrast,
//        0 serious/critical axe violations, reduced-motion handled, <html lang>, <title>, meta description,
//        hreflang alternates; with --lighthouse: mobile perf ≥ 90, a11y ≥ 95, best-practices ≥ 90, SEO ≥ 95.
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile, readdir } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const args = process.argv.slice(2);
const dir = resolve(args.find(a => !a.startsWith('--')) || '.');
const flag = f => args.includes(f);
const opt = k => (args.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const dist = join(dir, 'dist');
const out = join(dir, 'report');
await mkdir(join(out, 'shots'), { recursive: true });

// Standard route list (both locales). Variants must provide all of these.
const ROUTES = opt('routes')?.split(',') || [
  'nl-be/', 'nl-be/abonnementen/', 'nl-be/switch-plus/', 'nl-be/hoe-werkt-het/', 'nl-be/veelgestelde-vragen/', 'nl-be/aanmelden/',
  'fr-be/', 'fr-be/abonnements/', 'fr-be/switch-plus/', 'fr-be/comment-ca-marche/', 'fr-be/questions-frequentes/', 'fr-be/inscription/',
];

// ── static server ─────────────────────────────────────────
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4', '.webm': 'video/webm' };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); }
  catch { res.writeHead(404); return res.end('not found'); }
  try { const b = await readFile(f); res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'cache-control': 'max-age=31536000' }); res.end(b); }
  catch { res.writeHead(404); res.end('not found'); }
});
await new Promise(r => server.listen(0, r));
const origin = `http://127.0.0.1:${server.address().port}/`;

// ── page checks ───────────────────────────────────────────
const browser = await chromium.launch();
const results = [];
const cssText = async () => { let s = ''; try { for (const f of await readdir(join(dist, '_astro'))) if (f.endsWith('.css')) s += await readFile(join(dist, '_astro', f), 'utf8'); } catch {} return s; };
const reducedMotionCss = /prefers-reduced-motion/.test(await cssText());

for (const vp of [{ name: 'desktop', width: 1280, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce', colorScheme: flag('--dark') ? 'dark' : 'light' });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('pageerror', e => consoleErrors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  for (const route of ROUTES) {
    consoleErrors.length = 0;
    const resp = await page.goto(origin + route, { waitUntil: 'networkidle' }).catch(e => null);
    const status = resp ? resp.status() : 0;
    if (status !== 200) { results.push({ route, viewport: vp.name, status, gates: [`HTTP ${status}`] }); continue; }
    await page.waitForTimeout(250);
    const r = await page.evaluate(() => {
      const parse = c => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : [0, 0, 0, 0]; };
      const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const bgOf = el => { let bg = [255, 255, 255]; const st = []; for (let e = el; e; e = e.parentElement) st.push(e); for (const e of st.reverse()) { const cs = getComputedStyle(e); if (cs.backgroundImage !== 'none' && e !== document.documentElement && e !== document.body) return null; const c = parse(cs.backgroundColor); const a = c.length > 3 ? c[3] : 1; if (a > 0) bg = bg.map((v, i) => v * (1 - a) + c[i] * a); } return bg; };
      const small = [], low = [], sizes = new Set(); const seen = new Set();
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const el = w.currentNode.parentElement; const t = w.currentNode.textContent.trim();
        if (!t || seen.has(el)) continue; seen.add(el);
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || !el.getClientRects().length) continue;
        if (el.closest('[aria-hidden="true"],.sr-only,.visually-hidden,[hidden]')) continue;
        const fs = parseFloat(cs.fontSize); sizes.add(fs); const svg = !!el.closest('svg');
        if (fs < (svg ? 11 : 12)) small.push(`${fs}px "${t.slice(0, 28)}"`);
        const bg = bgOf(el); if (!bg || svg) continue; // text on images/gradients: left to axe + visual review
        const fg = parse(cs.color); const a = fg.length > 3 ? fg[3] : 1; const f2 = fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
        const L1 = lum(f2), L2 = lum(bg); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
        const large = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700);
        if (ratio < (large ? 3 : 4.5)) low.push(`${ratio.toFixed(2)} "${t.slice(0, 28)}"`);
      }
      const hreflang = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => l.hreflang);
      return {
        overflow: document.documentElement.scrollWidth - innerWidth, small, low, sizeCount: sizes.size,
        lang: document.documentElement.lang, title: document.title, desc: document.querySelector('meta[name="description"]')?.content || '',
        hreflang, h1: document.querySelectorAll('h1').length,
      };
    });
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = axe.violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => `${v.id} (${v.nodes.length})`);
    const gates = [];
    if (r.overflow > 0) gates.push(`overflow ${r.overflow}px`);
    if (r.small.length) gates.push(`${r.small.length} text <12px`);
    if (r.low.length) gates.push(`${r.low.length} contrast`);
    if (serious.length) gates.push(`axe: ${serious.join(', ')}`);
    if (!r.lang) gates.push('no <html lang>');
    if (!r.title) gates.push('no <title>');
    if (!r.desc) gates.push('no meta description');
    if (r.h1 !== 1) gates.push(`${r.h1} <h1>`);
    if (!(r.hreflang.includes('nl-BE') || r.hreflang.includes('nl-be')) || !(r.hreflang.includes('fr-BE') || r.hreflang.includes('fr-be'))) gates.push('hreflang nl-BE/fr-BE missing');
    if (consoleErrors.length) gates.push(`${consoleErrors.length} console errors`);
    if (flag('--shots')) await page.screenshot({ path: join(out, 'shots', `${route.replace(/\/$/, '').replace(/\//g, '_') || 'root'}__${vp.name}${flag('--dark') ? '__dark' : ''}.png`), fullPage: true });
    results.push({ route, viewport: vp.name, status, gates, detail: { small: r.small.slice(0, 5), low: r.low.slice(0, 5), sizes: r.sizeCount, consoleErrors: consoleErrors.slice(0, 3) } });
  }
  await ctx.close();
}

// ── Lighthouse (mobile) on key pages ─────────────────────
const lh = [];
if (flag('--lighthouse')) {
  const { default: lighthouse } = await import('lighthouse');
  const lhBrowser = await chromium.launch({ args: ['--remote-debugging-port=9333'] });
  for (const route of ['nl-be/', 'nl-be/abonnementen/', 'nl-be/aanmelden/', 'fr-be/'].filter(r => ROUTES.includes(r))) {
    const r = await lighthouse(origin + route, { port: 9333, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 3, disabled: false } });
    const c = r.lhr.categories; const a = r.lhr.audits;
    const s = { route, perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcp: a['largest-contentful-paint'].displayValue, cls: a['cumulative-layout-shift'].displayValue, tbt: a['total-blocking-time'].displayValue };
    s.gates = [s.perf < 90 && `perf ${s.perf}`, s.a11y < 95 && `a11y ${s.a11y}`, s.bp < 90 && `best-practices ${s.bp}`, s.seo < 95 && `SEO ${s.seo}`].filter(Boolean);
    lh.push(s);
  }
  await lhBrowser.close();
}
await browser.close(); server.close();

// ── report ────────────────────────────────────────────────
const fails = results.reduce((n, r) => n + r.gates.length, 0) + lh.reduce((n, r) => n + r.gates.length, 0) + (reducedMotionCss ? 0 : 1);
let md = `# Check — ${dir.split('/').slice(-2).join('/')}\n\n| Route | Viewport | Result |\n|---|---|---|\n`;
for (const r of results) md += `| ${r.route} | ${r.viewport} | ${r.gates.length ? '✗ ' + r.gates.join(' · ') : '✓'} |\n`;
if (lh.length) { md += `\n## Lighthouse (mobile)\n\n| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |\n|---|---|---|---|---|---|---|---|\n`; for (const s of lh) md += `| ${s.route} | ${s.perf} | ${s.a11y} | ${s.bp} | ${s.seo} | ${s.lcp} | ${s.cls} | ${s.tbt} |\n`; }
md += `\nreduced-motion handled: ${reducedMotionCss ? 'yes' : 'NO'}\n\n**hard-gate failures: ${fails}**\n`;
await writeFile(join(out, 'check.json'), JSON.stringify({ results, lighthouse: lh, reducedMotionCss, fails }, null, 2));
await writeFile(join(out, 'check.md'), md);
console.log(md);

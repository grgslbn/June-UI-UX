// Screenshot helper for variant A (style tile + ad-hoc routes) and an overflow finder.
// Usage (from website/variants/a): node tools/shoot.mjs [route ...] [--overflow] [--motion] [--dark]
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
const args = process.argv.slice(2);
const routes = args.filter(a => !a.startsWith('--'));
if (!routes.length) routes.push('style-tile/');
const dist = new URL('../dist/', import.meta.url).pathname;
const out = new URL('../report/shots/', import.meta.url).pathname;
await mkdir(out, { recursive: true });
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.js': 'text/javascript' };
const s = createServer(async (q, r) => { let f = join(dist, decodeURIComponent(new URL(q.url, 'http://x').pathname)); try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); r.writeHead(200, { 'content-type': T[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); } catch { r.writeHead(404); r.end(); } });
await new Promise(r => s.listen(0, r));
const origin = `http://127.0.0.1:${s.address().port}/`;
const b = await chromium.launch();
for (const vp of [{ name: 'desktop', width: 1280, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const ctx = await b.newContext({ viewport: vp, reducedMotion: args.includes('--motion') ? 'no-preference' : 'reduce', colorScheme: args.includes('--dark') ? 'dark' : 'light' });
  const p = await ctx.newPage();
  for (const route of routes) {
    await p.goto(origin + route, { waitUntil: 'networkidle' });
    if (args.includes('--overflow')) console.log(vp.name, route, await p.evaluate(() => [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 8).map(e => `${e.tagName}.${e.className} ${Math.round(e.getBoundingClientRect().right)}`)));
    if (args.includes('--segments')) { const H = await p.evaluate(() => document.documentElement.scrollHeight); const seg = vp.name === 'desktop' ? 1200 : 1400; for (let y = 0, i = 0; y < H; y += seg, i++) await p.screenshot({ path: join(out, `${route.replace(/\/$/, '').replace(/\//g, '_')}__${vp.name}__seg${i}.png`), fullPage: true, clip: { x: 0, y, width: vp.width, height: Math.min(seg, H - y) } }); continue; }
    if (args.includes('--motion')) { await p.waitForTimeout(300); await p.screenshot({ path: join(out, `${route.replace(/\/$/, '').replace(/\//g, '_')}__${vp.name}__motion-early.png`) }); await p.waitForTimeout(2200); }
    await p.screenshot({ path: join(out, `${route.replace(/\/$/, '').replace(/\//g, '_')}__${vp.name}${args.includes('--dark') ? '__dark' : ''}${args.includes('--motion') ? '__motion-end' : ''}${args.includes('--fold') ? '__fold' : ''}.png`), fullPage: !args.includes('--motion') && !args.includes('--fold') });
  }
  await ctx.close();
}
await b.close(); s.close();

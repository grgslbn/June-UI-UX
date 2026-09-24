// Generates the static brand files in public/: og images (1200×630, NL + FR), favicon set, Organization logo PNG.
// Run from website/: node variants/final/tools/make-brand-files.mjs  (uses Playwright to render with the real fonts).
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const req = createRequire(new URL('../../../package.json', import.meta.url));
const { chromium } = req('playwright');
const sharp = req('sharp');
const root = fileURLToPath(new URL('../../../', import.meta.url)); // website/
const pub = fileURLToPath(new URL('../public/', import.meta.url));
const logo = (await readFile(root + 'shared/assets/logo/june-logo.svg', 'utf8')).replace(/\s(role|aria-label)="[^"]*"/g, '');
const b64 = async (p) => (await readFile(root + p)).toString('base64');
const mont = await b64('shared/fonts/montserrat-latin.woff2');
const inter = await b64('shared/fonts/inter-latin.woff2');
const char = await b64('shared/assets/character/june-character-pointing.png');
const css = `@font-face{font-family:M;src:url(data:font/woff2;base64,${mont}) format('woff2');font-weight:500 700}
@font-face{font-family:I;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:400 700}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#f7f8f6;font-family:I;color:#14232a;position:relative;overflow:hidden}`;
const og = (k, h1a, h1b, sub, foot) => `<!doctype html><html><head><style>${css}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.logo{color:#1ca498;width:140px}.logo svg{width:100%;height:auto;display:block}
.k{margin-top:32px;font:600 20px/1 I;letter-spacing:.08em;text-transform:uppercase;color:#435359}
h1{margin-top:18px;font:600 54px/1.05 M;letter-spacing:-.02em;max-width:680px}h1 span{color:#127a71;display:block}
p{margin-top:14px;font:400 20px/1.4 I;color:#435359;max-width:640px}
.f{margin-top:22px;display:flex;gap:28px;font:600 20px/1 I;color:#14232a}.f span{padding-top:14px;border-top:3px solid #14232a}
.bar{position:absolute;left:0;right:0;top:0;height:10px;background:#1ca498}
.ch{position:absolute;right:40px;bottom:-10px;width:330px}
.rule{position:absolute;right:0;top:0;bottom:0;width:430px;background:#e3f4f2}
</style></head><body><div class="rule"></div><div class="bar"></div><img class="ch" src="data:image/png;base64,${char}">
<div class="wrap"><div class="logo">${logo}</div><p class="k">${k}</p><h1>${h1a}<span>${h1b}</span></h1><p>${sub}</p><div class="f">${foot.map(f => `<span>${f}</span>`).join('')}</div></div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const shots = {
  'og/june-nl.png': og('Onafhankelijk · geen energieleverancier', 'Energieleveranciers rekenen op je trouw.', 'Wij niet.', 'June vergelijkt minstens elke maand 17+ leveranciers voor jouw verbruik en regelt de overstap.', ['4,3/5 op Google', '20.000+ klanten', 'Geen leverancier']),
  'og/june-fr.png': og('Indépendant · pas un fournisseur d’énergie', 'Les fournisseurs comptent sur votre fidélité.', 'Pas nous.', 'Chaque mois au moins, June compare plus de 17 fournisseurs pour vous et gère le changement.', ['4,3/5 sur Google', 'Plus de 20 000 clients', 'Pas un fournisseur']),
};
for (const [f, html] of Object.entries(shots)) { await p.setContent(html); await p.waitForTimeout(300); await p.screenshot({ path: pub + f }); }
// Square marks: white wordmark on logo green (favicon / touch icon), green wordmark on white (Organization logo).
const mark = (bg, fg, pad) => `<!doctype html><html><head><style>*{margin:0}body{width:512px;height:512px;background:${bg};display:grid;place-items:center;border-radius:0}svg{width:${512 - pad * 2}px;height:auto;color:${fg}}</style></head><body>${logo}</body></html>`;
await p.setViewportSize({ width: 512, height: 512 });
await p.setContent(mark('#ffffff', '#1ca498', 56)); await p.screenshot({ path: pub + 'logo-512.png' });
await p.setContent(mark('#1ca498', '#ffffff', 64)); const icon = await p.screenshot();
await b.close();
await sharp(icon).resize(180).png().toFile(pub + 'apple-touch-icon.png');
await sharp(icon).resize(32).png().toFile(pub + 'favicon-32.png');
await sharp(icon).resize(192).png().toFile(pub + 'icon-192.png');
await writeFile(pub + 'favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1ca498"/><svg x="6" y="12" width="52" height="40" viewBox="0 0 1069 662">${logo.replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(/currentColor/g, '#fff')}</svg></svg>`);
for (const f of ['og/june-nl.png', 'og/june-fr.png', 'logo-512.png']) await sharp(pub + f).png({ compressionLevel: 9, palette: f.startsWith('logo') }).toBuffer().then((buf) => writeFile(pub + f, buf));
console.log('brand files written to', pub);

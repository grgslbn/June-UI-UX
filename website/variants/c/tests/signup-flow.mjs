import { createRequire } from 'node:module'; const { chromium } = createRequire('/home/user/June-UI-UX/website/package.json')('playwright');
import { createServer } from 'node:http'; import { readFile, stat } from 'node:fs/promises'; import { join, extname } from 'node:path';
const dist = new URL('../dist', import.meta.url).pathname; const S = new URL('../report/', import.meta.url).pathname;
const T = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png':'image/png','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.svg':'image/svg+xml' };
const s = createServer(async (q, r) => { let f = join(dist, decodeURIComponent(new URL(q.url, 'http://x').pathname)); try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); r.writeHead(200, { 'content-type': T[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); } catch { r.writeHead(404); r.end(); } });
await new Promise(r => s.listen(4457, r));
const O = 'http://127.0.0.1:4457/';
const b = await chromium.launch();
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
const events = (p) => p.evaluate(() => (window.dataLayer || []).map(e => e.event));

// 1. NL via hero form (mouse), desktop
{
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto(O + 'nl-be/');
  await p.fill('#pc-hero', '90');
  await p.click('#bereken button[type=submit]');
  ok(await p.locator('#pc-hero[aria-invalid=true]').count() === 1, 'hero invalid postcode blocked');
  await p.fill('#pc-hero', '9000');
  await Promise.all([p.waitForNavigation(), p.click('#bereken button[type=submit]')]);
  ok(p.url().includes('aanmelden/?postcode=9000'), 'hero → sign-up with postcode');
  ok((await events(p)).includes('signup_started'), 'signup_started fired on prefilled valid postcode');
  ok((await p.textContent('#su-pc-region')).includes('Fluvius'), 'region label');
  await p.screenshot({ path: S + 'f_nl_1.png', fullPage: true });
  await p.click('button[data-next=s1]');
  ok(await p.locator('#household-err:not([hidden])').count() === 1 && await p.locator('#meter-err:not([hidden])').count() === 1, 'step 1 errors shown');
  ok((await p.textContent('#su-live')).length > 5, 'live error summary: ' + await p.textContent('#su-live'));
  await p.click('label:has(input[name=household][value="3-4"])');
  await p.click('label:has(input[name=meter][value=digital])');
  await p.click('label:has(input[name=solar])');
  await p.click('button[data-next=s1]');
  await p.waitForSelector('[data-panel=est].is-active');
  ok((await p.textContent('[data-est-gross]')).includes('€'), 'estimate range: ' + await p.textContent('[data-est-gross]') + ' net ' + await p.textContent('[data-est-net]'));
  ok((await p.textContent('[data-est-next]')).includes('Premium'), 'digital+solar recommends Premium');
  await p.screenshot({ path: S + 'f_nl_2.png', fullPage: true });
  await p.click('button[data-go=s2]');
  ok(await p.locator('input[name=plan][value=premium]:checked').count() === 1, 'Premium preselected');
  await p.click('button[data-next=s2]');
  ok(await p.locator('#su-email-err:not([hidden])').count() === 1 && await p.locator('#su-terms-err:not([hidden])').count() === 1, 'step 2 errors');
  await p.fill('#su-email', 'an@voorbeeld.be');
  await p.check('#su-terms');
  ok(!(await p.isChecked('input[name=marketing]')), 'marketing unticked by default');
  await p.screenshot({ path: S + 'f_nl_3.png', fullPage: true });
  await p.click('button[data-next=s2]');
  await p.waitForSelector('[data-panel=done].is-active');
  ok((await p.textContent('[data-done-body]')).includes('an@voorbeeld.be'), 'confirmation shows email');
  await p.screenshot({ path: S + 'f_nl_4.png', fullPage: true });
  ok((await events(p)).filter(e => e === 'signup_started').length === 1, 'signup_started once: ' + (await events(p)).join(','));
  await p.goBack(); await p.waitForTimeout(200);
  ok(errs.length === 0, 'no console errors ' + errs.join('|'));
  await p.close();
}
// 2. FR, keyboard only, mobile, with ?plan=switch
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(O + 'fr-be/inscription/?plan=switch');
  ok(await p.isVisible('#plan-chip'), 'plan chip visible');
  ok(!(await events(p)).includes('signup_started'), 'no start before postcode');
  await p.focus('#su-pc');
  await p.keyboard.type('1050');
  ok((await events(p)).includes('signup_started'), 'signup_started on typed valid postcode (FR)');
  ok((await p.textContent('#su-pc-region')).includes('Sibelga'), 'Brussels region');
  await p.keyboard.press('Tab'); // energy group (both checked)
  await p.keyboard.press('ArrowLeft'); // → elec
  await p.keyboard.press('Tab'); // household group
  await p.keyboard.press('Space');
  await p.keyboard.press('ArrowRight'); // 2
  await p.keyboard.press('Tab'); // kwh summary
  await p.keyboard.press('Tab'); // meter
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('Space');
  const st = await p.evaluate(() => ({ e: document.querySelector('input[name=energy]:checked')?.value, h: document.querySelector('input[name=household]:checked')?.value, m: document.querySelector('input[name=meter]:checked')?.value }));
  ok(st.e === 'elec' && st.h && st.m, 'keyboard choices ' + JSON.stringify(st));
  await p.keyboard.press('Enter');
  await p.waitForSelector('[data-panel=est].is-active');
  ok(await p.evaluate(() => document.activeElement.id) === 'est-h', 'focus moved to estimate heading');
  ok((await p.textContent('[data-est-rec]')).includes('Switch'), 'respects ?plan: ' + await p.textContent('[data-est-rec]'));
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no overflow on estimate (mobile)');
  await p.screenshot({ path: S + 'f_fr_2.png', fullPage: true });
  await p.click('button[data-go=s2]');
  ok(await p.locator('input[name=plan][value=switch]:checked').count() === 1, 'Switch preselected from ?plan');
  await p.focus('#su-email'); await p.keyboard.type('marie@exemple.be');
  await p.keyboard.press('Tab'); await p.keyboard.press('Space');
  await p.keyboard.press('Enter');
  await p.waitForSelector('[data-panel=done].is-active');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no overflow on done (mobile)');
  await p.screenshot({ path: S + 'f_fr_4.png', fullPage: true });
  await p.close();
}
await b.close(); s.close();

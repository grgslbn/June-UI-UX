// End-to-end test of the sign-up funnel (final site). Serves a built dist and drives Chromium with Playwright.
// Usage (from website/variants/final): node tests/signup-flow.mjs [--dist=dist-funnel] [--shots]
// Covers: NL mouse desktop from the home hero form · FR keyboard-only mobile via ?plan=premium · language switch
// mid-flow keeps answers · back/reload per step · Premium + analogue meter → Switch Plus · tiny saving → honest
// "Je zit al goed" · Premium fee eats saving · no-JS plain form · 320px overflow · stale error summary cleared on back.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
const { chromium } = createRequire('/home/user/June-UI-UX/website/package.json')('playwright');

const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1];
const root = new URL('..', import.meta.url).pathname;
const dist = join(root, arg('dist') || 'dist-funnel');
const SHOTS = process.argv.includes('--shots');
const S = join(root, 'report', 'funnel-shots');
await mkdir(S, { recursive: true });
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (q, r) => {
  let f = join(dist, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); r.writeHead(200, { 'content-type': T[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); }
  catch { r.writeHead(404); r.end(); }
});
await new Promise((r) => server.listen(0, r));
const O = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else fails++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
const events = (p) => p.evaluate(() => (window.dataLayer || []).map((e) => e.event));
const dlAll = (p) => p.evaluate(() => window.dataLayer || []);
const text = (p, s) => p.locator(s).first().innerText();
const active = (p) => p.evaluate(() => document.querySelector('[data-panel].is-active')?.dataset.panel);
const noOverflow = (p) => p.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const focusedId = (p) => p.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
const settle = (p) => p.waitForFunction(() => !document.documentElement.classList.contains('su-restoring'));
async function shot(p, name) { if (SHOTS) await p.screenshot({ path: join(S, `${name}.png`), fullPage: true }); }
async function newPage(vp, opts = {}) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: vp.width < 500, isMobile: vp.width < 500, ...opts });
  const p = await ctx.newPage();
  p.errs = []; p.on('pageerror', (e) => p.errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && p.errs.push(m.text()));
  return p;
}
const PII = /@|\b\d{4}\b.*(gent|bruxelles)|voorbeeld|exemple/i;

// ── 1. NL, desktop, mouse, from the home hero form ─────────────────────────
{
  const p = await newPage({ width: 1280, height: 900 });
  await p.goto(O + 'nl-be/');
  await p.fill('#pc-hero', '9000');
  await Promise.all([p.waitForURL(/aanmelden/), p.click('form[data-pc="hero"] button[type=submit]')]);
  await settle(p);
  ok(await p.inputValue('#su-pc') === '9000', 'hero postcode carried into step 1');
  ok(await p.evaluate(() => !JSON.parse(sessionStorage.getItem('june-signup') || '{}').estSeen), 'no estSeen before the estimate');
  ok((await text(p, '#su-pc-region')).includes('9000 Gent · Vlaanderen · netbeheerder Fluvius'), 'postcode → town + region + grid operator: ' + await text(p, '#su-pc-region'));
  ok(!new URL(p.url()).search, 'query cleaned from the URL after restore (answers in storage)');
  ok((await events(p)).filter((e) => e === 'signup_started').length === 1, 'signup_started on arrival with a submitted postcode');
  const st = (await dlAll(p)).find((e) => e.event === 'signup_started');
  ok(st.postcode_region === 'VL' && !JSON.stringify(st).includes('9000'), 'signup_started has region, no postcode (no PII): ' + JSON.stringify(st));
  ok(await text(p, '#progress-meta') === 'Stap 1 van 3 · ongeveer 1 minuut' && await p.locator('.progress li').count() === 3, 'step label matches the 3-step progress');
  ok(!/€\s?\d/.test(await p.locator('.funnel-main').innerText()), 'no preset € numbers before input');
  ok(await p.locator('.fhead-help').count() === 1 && (await p.getAttribute('.fhead-help', 'href')).includes('veelgestelde-vragen'), '"Hulp nodig?" in the funnel header → FAQ');
  ok(!/TBC|\[|te bevestigen|à confirmer/i.test(await p.locator('body').innerText()), 'no visible placeholders');
  await shot(p, 'nl-d-1-home');
  // Empty submit → focused error summary with specific messages
  await p.click('button[data-next=home]');
  ok(await p.isVisible('#err-sum') && await focusedId(p) === 'err-sum', 'error summary shown and focused');
  const sumTxt = await text(p, '#err-sum');
  ok(/Nog 2 dingen/.test(sumTxt) && /personen/.test(sumTxt) && /meter/.test(sumTxt), 'summary lists specific errors: ' + sumTxt.replace(/\n/g, ' | '));
  ok((await text(p, '#su-live')).length > 10, 'aria-live summary text');
  await shot(p, 'nl-d-1-errors');
  await p.click('#err-sum a >> nth=1');
  ok(await focusedId(p) === 'su-meter-digital', 'summary link focuses the field');
  await p.click('label:has(#su-hh-5\\+)');
  ok(await p.locator('#err-sum li').count() === 1, 'fixed error leaves the summary');
  await p.click('label:has(#su-meter-digital)');
  ok(await p.isHidden('#err-sum'), 'summary gone when all fixed');
  await p.click('label:has(#su-solar)');
  ok((await text(p, '[data-row=region] dd')).includes('Fluvius'), '"Wat we van je weten" mirrors region');
  await p.click('button[data-next=home]');
  await p.waitForSelector('[data-panel=est].is-active');
  ok(p.url().endsWith('#schatting'), 'estimate has its own URL (#schatting)');
  ok(await p.evaluate(() => JSON.parse(sessionStorage.getItem('june-signup')).estSeen === true), 'estSeen stored when the estimate is viewed');
  ok(await text(p, '#progress-meta') === 'Stap 2 van 3 · je schatting', 'step label on estimate');
  const label = await text(p, '[data-est-label]'), net = await text(p, '[data-est-net]'), gross = await text(p, '[data-est-gross]');
  ok(/overhoudt.*na je (Premium|Switch Plus)-abonnement/.test(label) && /€/.test(net), `net first: "${label}" ${net} (gross ${gross})`);
  ok(await p.locator('.est-card .est-range').boundingBox().then((b) => b.height) > await p.locator('[data-est-gross]').boundingBox().then((b) => b.height), 'net is the headline, gross secondary');
  ok(await p.isVisible('.panel-h-row .tag') && /Indicatief/i.test(await text(p, '[data-panel=est] .tag')) && /Indicatief:/.test(await text(p, '.est-fn')), '"Indicatief" label + footnote');
  ok(await p.locator('#est-method li').count() === 5 && await p.evaluate(() => document.getElementById('est-method').open), 'full method note (open on desktop)');
  const r1 = (await dlAll(p)).find((e) => e.event === 'estimate_viewed');
  ok(r1 && r1.recommended_plan === 'premium' && r1.reason === 'premium-fit', 'digital + solar (5+, gas) → Premium: ' + JSON.stringify(r1));
  ok(await p.isVisible('[data-est-alt]') && /Switch Plus/.test(await text(p, '[data-est-alt]')), 'alternative net for Switch Plus shown');
  await shot(p, 'nl-d-2-estimate');
  await p.click('button[data-go-plan]');
  await p.waitForSelector('[data-panel=plan].is-active');
  ok(p.url().endsWith('#abonnement'), 'plan step URL (#abonnement)');
  ok(await p.isChecked('#su-plan-premium'), 'advised plan preselected');
  ok(!(await p.isChecked('#su-pref-ask')) && !(await p.isChecked('#su-pref-auto')), 'switch preference: no silent default');
  ok(await p.isVisible('[data-net-for=switch]') && /€/.test(await text(p, '[data-net-for=premium]')), '"wat jij overhoudt" per plan');
  ok(!(await p.isChecked('#su-marketing')) && !(await p.isChecked('#su-terms')), 'marketing consent separate and unticked');
  await p.click('button[data-next=plan]');
  const s2 = await text(p, '#err-sum');
  ok(/Nog 3 dingen/.test(s2) && /wisselen/.test(s2), 'step 3 errors incl. switch preference: ' + s2.replace(/\n/g, ' | '));
  ok(await p.evaluate(() => [...document.querySelectorAll('input[name=pref]')].every((r) => r.getAttribute('aria-invalid') === 'true')), 'aria-invalid on the preference radios while their error shows');
  await shot(p, 'nl-d-3-errors');
  // Browser back: stale summary must be gone on the estimate
  await p.goBack(); await p.waitForSelector('[data-panel=est].is-active');
  ok(await p.isHidden('#err-sum') && !(await text(p, '#su-live')), 'stale error summary cleared on back');
  await p.goForward(); await p.waitForSelector('[data-panel=plan].is-active');
  ok(await p.isHidden('#err-sum'), 'no stale summary on forward either');
  await p.click('label:has(#su-pref-ask)');
  ok(await p.evaluate(() => ![...document.querySelectorAll('input[name=pref]')].some((r) => r.hasAttribute('aria-invalid'))), 'aria-invalid removed once a preference is chosen');
  await p.fill('#su-email', 'an@voorbeeld.be');
  await p.click('label.check:has(#su-terms)');
  // Reload on step 3 keeps everything
  await p.reload(); await settle(p);
  ok(await active(p) === 'plan' && await p.inputValue('#su-email') === 'an@voorbeeld.be' && await p.isChecked('#su-pref-ask'), 'reload on step 3 keeps step + answers');
  await shot(p, 'nl-d-3-plan');
  await p.click('button[data-next=plan]');
  await p.waitForSelector('[data-panel=done].is-active');
  ok(p.url().endsWith('#bevestigd'), 'confirmation URL');
  ok((await text(p, '[data-done-body]')).includes('an@voorbeeld.be') && /Vraag het me/.test(await text(p, '[data-done-pref]')), 'confirmation recap');
  ok(await p.locator('img.done-char').count() === 1 && await p.isVisible('img.done-char'), 'cheering June character once on confirmation');
  await p.waitForFunction(() => document.querySelector('img.done-char')?.complete);
  await shot(p, 'nl-d-4-done');
  const all = await dlAll(p);
  ok(all.filter((e) => e.event === 'signup_started').length === 0, 'signup_started not re-fired after reload (once per session)');
  ok(!all.some((e) => PII.test(JSON.stringify(e))), 'no PII in any dataLayer event');
  ok(all.some((e) => e.event === 'signup_submitted' && e.pref === 'ask' && e.marketing_optin === false), 'signup_submitted with pref + consent flags');
  await p.goBack(); await p.waitForSelector('[data-panel=plan].is-active');
  ok(true, 'back from confirmation → step 3');
  ok(p.errs.length === 0, 'no console errors ' + p.errs.join(' | '));
  await p.context().close();
}

// ── 2. FR, mobile, keyboard only, via ?plan=premium ─────────────────────────
{
  const p = await newPage({ width: 390, height: 844 });
  await p.goto(O + 'fr-be/inscription/?plan=premium'); await settle(p);
  ok(await p.isVisible('#plan-chip') && /Premium/.test(await text(p, '#plan-chip')), 'plan chip from ?plan=premium');
  ok(!(await events(p)).includes('signup_started'), 'no start before a postcode is submitted');
  await p.keyboard.press('Tab'); // skip link
  let guard = 0; while (await focusedId(p) !== 'su-pc' && guard++ < 12) await p.keyboard.press('Tab');
  ok(await focusedId(p) === 'su-pc', 'postcode reachable by keyboard');
  await p.keyboard.type('1050');
  ok((await text(p, '#su-pc-region')).includes('1050 Ixelles · Bruxelles · gestionnaire de réseau Sibelga'), 'FR town line: ' + await text(p, '#su-pc-region'));
  await p.keyboard.press('Tab'); // energy group (both checked)
  await p.keyboard.press('Tab'); // household group
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); // 1 → … selects on arrow
  await p.keyboard.press('Tab'); // kWh summary
  await p.keyboard.press('Tab'); // meter
  await p.keyboard.press('Space'); // digital
  await p.keyboard.press('Tab'); await p.keyboard.press('Space'); // solar
  const st = await p.evaluate(() => ({ h: document.querySelector('input[name=household]:checked')?.value, m: document.querySelector('input[name=meter]:checked')?.value, s: document.getElementById('su-solar').checked }));
  ok(st.h && st.m === 'digital' && st.s, 'keyboard choices ' + JSON.stringify(st));
  await p.keyboard.press('Enter');
  await p.waitForSelector('[data-panel=est].is-active');
  ok((await events(p)).filter((e) => e === 'signup_started').length === 1, 'signup_started on step-1 submit (FR)');
  ok(await focusedId(p) === 'est-h', 'focus moved to the estimate heading');
  ok(p.url().endsWith('#estimation') && await text(p, '#progress-meta') === 'Étape 2 sur 3 · votre estimation', 'FR per-step URL + label');
  ok(!(await p.evaluate(() => document.getElementById('est-method').open)), 'method collapsed on mobile, basis still visible: ' + await text(p, '[data-est-basis]'));
  ok(await noOverflow(p), 'no overflow (390, estimate)');
  await shot(p, 'fr-m-2-estimate');
  const rec = (await dlAll(p)).find((e) => e.event === 'estimate_viewed');
  ok(['premium', 'switch-plus'].includes(rec.recommended_plan), 'FR advice: ' + rec.reason);
  // keyboard: Tab to the primary button
  guard = 0; while (!(await p.evaluate(() => document.activeElement?.matches('[data-go-plan]'))) && guard++ < 25) await p.keyboard.press('Tab');
  await p.keyboard.press('Enter');
  await p.waitForSelector('[data-panel=plan].is-active');
  ok(await focusedId(p) === 's2-h', 'focus on step 3 heading');
  guard = 0; while (!(await p.evaluate(() => document.activeElement?.name === 'pref')) && guard++ < 25) await p.keyboard.press('Tab');
  await p.keyboard.press('Space');
  ok(await p.isChecked('#su-pref-ask'), 'pref chosen by keyboard (first option, explicit)');
  guard = 0; while (await focusedId(p) !== 'su-email' && guard++ < 10) await p.keyboard.press('Tab');
  await p.keyboard.type('marie@exemple.be');
  await p.keyboard.press('Tab'); await p.keyboard.press('Space'); // terms
  ok(await p.isChecked('#su-terms') && !(await p.isChecked('#su-marketing')), 'terms by keyboard, marketing untouched');
  await shot(p, 'fr-m-3-plan');
  await p.keyboard.press('Enter');
  await p.waitForSelector('[data-panel=done].is-active');
  ok(await focusedId(p) === 'done-h' && p.url().endsWith('#confirmation'), 'FR confirmation, focus on heading');
  ok(await noOverflow(p), 'no overflow (390, done)');
  await p.waitForFunction(() => document.querySelector('img.done-char')?.complete);
  await shot(p, 'fr-m-4-done');
  // targets ≥ 44px on mobile (visible interactive elements in main + funnel header)
  await p.goBack(); await p.waitForSelector('[data-panel=plan].is-active');
  const small = await p.evaluate(() => [...document.querySelectorAll('.fhead a, main a, main button, main summary, main label.choice, main label.check, main label.plan-opt')]
    .filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).map((e) => (e.className || e.tagName) + ':' + Math.round(e.getBoundingClientRect().height)));
  ok(small.length === 0, 'touch targets ≥ 44px (step 3): ' + small.join(', '));
  ok(p.errs.length === 0, 'no console errors ' + p.errs.join(' | '));
  await p.context().close();
}

// ── 3. Language switch mid-flow keeps answers (and the step) ───────────────
{
  const p = await newPage({ width: 1280, height: 900 });
  await p.goto(O + 'nl-be/aanmelden/'); await settle(p);
  await p.fill('#su-pc', '4000');
  await p.click('label:has(#su-energy-elec)');
  await p.click('label:has(#su-hh-2)');
  await p.click('label:has(#su-meter-analog)');
  await p.click('label:has(#su-ev)');
  const href1 = await p.getAttribute('[data-lang-link]', 'href');
  ok(/postcode=4000/.test(href1) && /household=2/.test(href1) && /meter=analog/.test(href1) && /ev=1/.test(href1) && !/email/.test(href1), 'FR link carries the answers: ' + href1);
  await Promise.all([p.waitForURL(/inscription/), p.click('[data-lang-link]')]); await settle(p);
  ok(await p.inputValue('#su-pc') === '4000' && await p.isChecked('#su-energy-elec') && await p.isChecked('#su-hh-2') && await p.isChecked('#su-meter-analog') && await p.isChecked('#su-ev'), 'answers survive NL → FR on step 1');
  ok((await text(p, '#su-pc-region')).includes('Liège · Wallonie'), 'town line re-localised: ' + await text(p, '#su-pc-region'));
  await p.click('button[data-next=home]'); await p.waitForSelector('[data-panel=est].is-active');
  const netFr = await text(p, '[data-est-net]');
  await p.click('button[data-go-plan]'); await p.waitForSelector('[data-panel=plan].is-active');
  await p.click('label:has(#su-pref-auto)'); await p.fill('#su-email', 'x@exemple.be');
  await Promise.all([p.waitForURL(/aanmelden/), p.click('[data-lang-link]')]); await settle(p);
  ok(p.url().endsWith('#abonnement') && await active(p) === 'plan', 'FR → NL keeps the step (#abonnement)');
  ok(await p.isChecked('#su-pref-auto') && await p.inputValue('#su-email') === 'x@exemple.be', 'step-3 answers survive FR → NL');
  await p.goBack(); await p.waitForSelector('[data-panel=est].is-active').catch(() => {});
  await p.goto(O + 'nl-be/aanmelden/#schatting'); await settle(p);
  ok(await active(p) === 'est' && (await text(p, '[data-est-net]')).replace(/\s/g, '').replace('€', '') .length > 0, 'direct #schatting reload restores the estimate (NL ' + await text(p, '[data-est-net]') + ' / FR ' + netFr + ')');
  ok((await events(p)).filter((e) => e === 'signup_started').length <= 1, 'no second signup_started after the language switch');
  ok(p.errs.length === 0, 'no console errors ' + p.errs.join(' | '));
  await p.context().close();
}

// ── 4. Premium + analogue meter → Switch Plus with explanation ─────────────
{
  const p = await newPage({ width: 390, height: 844 });
  await p.goto(O + 'nl-be/aanmelden/?postcode=2000&plan=premium&household=3-4&meter=analog'); await settle(p);
  ok(await p.isChecked('#su-meter-analog') && await p.isChecked('#su-hh-3-4'), 'prefill from query (household, meter)');
  await p.click('button[data-next=home]'); await p.waitForSelector('[data-panel=est].is-active');
  ok(/Switch Plus-abonnement/.test(await text(p, '[data-est-label]')) && /Switch Plus/.test(await text(p, '[data-est-next]')), 'net computed against Switch Plus, CTA "Verder met Switch Plus"');
  ok(/analoge meter/.test(await text(p, '[data-est-notice]')), 'explanation on the estimate itself: ' + await text(p, '[data-est-notice-p]'));
  ok(await p.isVisible('[data-keep-prem]'), 'secondary "Toch Premium" offered');
  await shot(p, 'nl-m-premium-analog');
  await p.click('[data-keep-prem]'); await p.waitForSelector('[data-panel=plan].is-active');
  ok(await p.isChecked('#su-plan-premium') && await p.isVisible('#plan-warn'), 'keeping Premium shows the digital-meter warning on step 3');
  await p.context().close();
}

// ── 5. Tiny saving → honest "Je zit al goed" + guarantee, no upsell ────────
{
  const p = await newPage({ width: 320, height: 640 });
  await p.goto(O + 'nl-be/aanmelden/?postcode=8000&energy=elec&household=1&meter=digital'); await settle(p);
  await shot(p, 'nl-n-1-home');
  ok(await noOverflow(p), 'no overflow (320, step 1)');
  await p.click('button[data-next=home]'); await p.waitForSelector('[data-panel=est].is-active');
  const n = await text(p, '[data-est-notice]');
  ok(/je zit al goed/i.test(n) && /€\s99 terug/.test(n) && /abonnementsjaar/.test(n), 'low verdict with guarantee + condition: ' + n.replace(/\n/g, ' '));
  ok(await p.isHidden('[data-est-rec-box]') && /Toch verder met Switch Plus/.test(await text(p, '[data-est-next]')), 'no upsell; soft CTA');
  ok(!/Premium/.test(await text(p, '[data-est-next]')), 'Premium never advised on a tiny saving');
  ok(await noOverflow(p), 'no overflow (320, estimate)');
  await shot(p, 'nl-n-2-estimate-low');
  await p.click('button[data-go-plan]'); await p.waitForSelector('[data-panel=plan].is-active');
  ok(await noOverflow(p), 'no overflow (320, step 3)');
  await shot(p, 'nl-n-3-plan');
  await p.context().close();
}

// ── 6. Premium fits the home but its fee eats the saving → Switch Plus ─────
{
  const p = await newPage({ width: 1280, height: 900 });
  await p.goto(O + 'fr-be/inscription/?postcode=5000&energy=elec&household=2&meter=digital&solar=1'); await settle(p);
  await p.click('button[data-next=home]'); await p.waitForSelector('[data-panel=est].is-active');
  const r = (await dlAll(p)).find((e) => e.event === 'estimate_viewed');
  ok(r.recommended_plan === 'switch-plus' && ['premium-eats'].includes(r.reason) || r.verdict === 'low', 'Premium not advised when its fee eats the saving: ' + JSON.stringify(r));
  const frNet = await text(p, '[data-est-net]');
  ok(/jusqu’à .*moins que le prix de votre abonnement/.test(frNet) && !/^0\s?€/.test(frNet), 'FR partly negative net said in words: ' + frNet);
  await shot(p, 'fr-d-premium-eats');
  await p.context().close();
}

// ── 6b. Negative net (fee larger than the whole saving) → words, never "€ 0 – € 0" ──
{
  const p = await newPage({ width: 320, height: 640 });
  await p.goto(O + 'nl-be/aanmelden/?postcode=3000&energy=elec&household=1&meter=analog&solar=1'); await settle(p);
  await p.click('button[data-next=home]'); await p.waitForSelector('[data-panel=est].is-active');
  const n = await text(p, '[data-est-net]'), n2 = await text(p, '[data-est-net2]');
  ok(n === 'minder dan je abonnement kost' && n2 === n, 'negative net in words: "' + n + '"');
  ok(!/€\s?0\b/.test(await p.locator('.est-card').innerText()), 'no "€ 0" anywhere in the estimate card');
  ok(/je zit al goed/i.test(await text(p, '[data-est-notice]')), 'honest low verdict with a negative net');
  await p.click('button[data-go-plan]'); await p.waitForSelector('[data-panel=plan].is-active');
  ok(/minder dan je abonnement kost/.test(await text(p, '[data-net-for=premium]')) && !/€\s?0\b/.test(await p.locator('.plan-opts').innerText()), 'plan cards: no "€ 0" ranges');
  ok(await noOverflow(p), 'no overflow (320) with worded ranges');
  await shot(p, 'nl-n-negative-plan');
  await p.goBack(); await p.waitForSelector('[data-panel=est].is-active');
  await shot(p, 'nl-n-negative-est');
  ok(await noOverflow(p), 'no overflow (320, negative estimate)');
  await p.context().close();
}

// ── 7. Without JavaScript: one plain form ──────────────────────────────────
{
  const p = await newPage({ width: 390, height: 844 }, { javaScriptEnabled: false });
  await p.goto(O + 'nl-be/aanmelden/');
  ok(await p.isVisible('#su-pc') && await p.isVisible('#su-email') && await p.isVisible('#su-pref-ask') && await p.isHidden('[data-panel=est]') && await p.isHidden('[data-panel=done]'), 'no-JS: all questions visible, estimate/confirmation hidden');
  ok(await p.getAttribute('#su', 'method') === 'get' && await p.locator('#su button[type=submit]').count() === 2, 'no-JS: plain GET form with submit buttons');
  ok(await p.isVisible('.noscript'), 'no-JS notice');
  await p.context().close();
}

await browser.close(); server.close();
console.log(`\n${passes} passed, ${fails} failed`);
process.exitCode = fails ? 1 : 0;

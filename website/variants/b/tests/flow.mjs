// E2E: home calculator → sign-up (NL, mouse) and FR sign-up keyboard-only. Serves variants/b/dist.
import { createServer } from 'node:http'; import { readFile, stat } from 'node:fs/promises'; import { join, extname } from 'node:path';
import { chromium } from 'playwright';
const dist = '/home/user/June-UI-UX/website/variants/b/dist'; const shots = new URL('../report/flow/', import.meta.url).pathname;
await (await import('node:fs/promises')).mkdir(shots, { recursive: true });
const T = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2' };
const srv = createServer(async (q, r) => { let f = join(dist, decodeURIComponent(new URL(q.url, 'http://x').pathname)); try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); r.writeHead(200, { 'content-type': T[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); } catch { r.writeHead(404); r.end(); } });
await new Promise(r => srv.listen(4568, r)); const O = 'http://127.0.0.1:4568/';
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
const b = await chromium.launch();
const events = p => p.evaluate(() => (window.__juneEvents || []).map(e => e.event));
const vis = (p, s) => p.locator(s).isVisible();

// ── NL: mouse, desktop, from the home calculator ──
{
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(O + 'nl-be/');
  await p.fill('#calc-pc', '2000'); await p.locator('label.opt:has(input[value="semi"])').click();
  await p.click('[data-go]'); await p.waitForTimeout(700);
  ok((await p.textContent('[data-num]')).includes('€'), 'home: result shows a € range: ' + (await p.textContent('[data-num]')).trim());
  ok((await events(p)).includes('signup_started'), 'home: signup_started fired on valid postcode submit');
  await p.click('.res-cta'); await p.waitForURL(/aanmelden/);
  ok(/postcode=2000/.test(p.url()) && /woning=semi/.test(p.url()) && /plan=switch-plus/.test(p.url()), 'home → aanmelden carries query: ' + p.url().split('?')[1]);
  await p.waitForTimeout(300);
  ok(await vis(p, '[data-step="2"]') && !(await vis(p, '[data-step="1"]')), 'signup: prefilled → starts at step 2');
  ok((await p.textContent('[data-recap-text]')).includes('2000 Vlaanderen'), 'signup: recap shows ' + (await p.textContent('[data-recap-text]')));
  ok((await events(p)).filter(e => e === 'signup_started').length === 0, 'signup: signup_started not double-counted in same session');
  await p.click('[data-next="2"]');
  ok(await vis(p, '[data-errsum]'), 'step 2: error summary shown when meter/solar missing');
  ok((await p.getAttribute('[name="meter"] >> nth=0', 'aria-invalid')) === 'true', 'step 2: aria-invalid on meter');
  await p.locator('label.ch:has(input[name="meter"][value="digital"])').click();
  await p.locator('label.ch:has(input[name="zon"][value="ja"])').click();
  await p.click('[data-next="2"]'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-step="3"]'), 'step 3 visible');
  ok((await p.textContent('[data-rec-name]')).trim() === 'Premium', 'step 3: digital + solar → Premium recommended');
  ok(/stap 3 van 4/i.test(await p.title()), 'title updated: ' + await p.title());
  ok(await p.evaluate(() => document.activeElement?.id) === 's3-h', 'focus moved to step heading');
  await p.screenshot({ path: shots + 'nl-step3.png', fullPage: true });
  await p.click('[data-step="3"] [data-back]'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-step="2"]') && await p.locator('[name="meter"][value="digital"]').isChecked(), 'back keeps data');
  await p.click('[data-next="2"]'); await p.click('[data-next="3"]'); await p.waitForTimeout(200);
  ok(await p.locator('[name="plan"][value="premium"]').isChecked(), 'step 4: Premium preselected');
  ok(!(await p.locator('#su-mkt').isChecked()), 'marketing consent unticked by default');
  await p.fill('#su-email', 'not-an-email'); await p.click('[data-submit]');
  ok(await vis(p, '[data-errsum]') && (await p.textContent('#su-email-err')).length > 3, 'step 4: invalid email + terms errors: ' + await p.textContent('[data-errlist]'));
  await p.fill('#su-email', 'test@example.be'); await p.check('#su-terms'); await p.click('[data-submit]'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-done]'), 'confirmation shown');
  ok((await p.textContent('[data-done-body]')).includes('test@example.be'), 'confirmation mentions email');
  const ev = await events(p); ok(['signup_step_viewed', 'signup_step_completed', 'signup_error', 'signup_submitted'].every(e => ev.includes(e)), 'events: ' + [...new Set(ev)].join(','));
  await p.screenshot({ path: shots + 'nl-done.png', fullPage: true });
  // plans page personalised from the session
  await p.goto(O + 'nl-be/abonnementen/'); await p.waitForTimeout(200);
  ok((await p.textContent('[data-plan="switch-plus"] [data-eq-cap]')).includes('halfopen'), 'plans: equation personalised from session: ' + await p.textContent('[data-plan="switch-plus"] [data-eq-cap]'));
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));
  await p.close();
}

// ── FR: keyboard only, mobile, plan card entry (?plan=premium) + analogue warning ──
{
  const p = await b.newPage({ viewport: { width: 390, height: 844 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(O + 'fr-be/inscription/?plan=premium'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-step="1"]'), 'FR: starts at step 1');
  ok(await vis(p, '[data-plan-chip]') && (await p.textContent('[data-plan-chip-name]')) === 'Premium', 'FR: plan chip shows Premium');
  const focusTo = async sel => { for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(s => document.activeElement?.matches(s), sel)) return true; } return false; };
  ok(await focusTo('#su-pc'), 'FR kb: reach postcode by Tab');
  await p.keyboard.type('13');
  ok(await focusTo('[data-next="1"]'), 'FR kb: reach Suivant'); await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  ok((await p.textContent('#su-pc-err')).includes('4 chiffres'), 'FR kb: invalid postcode error: ' + await p.textContent('#su-pc-err'));
  await p.focus('#su-pc'); await p.keyboard.press('End'); await p.keyboard.type('48'); await p.waitForTimeout(50);
  ok((await p.textContent('[data-pc-ok]')).includes('Wallonie'), 'FR: 1348 → Wallonie');
  ok(await focusTo('[data-next="1"]'), 'FR kb: back to Suivant'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  ok((await events(p)).includes('signup_started'), 'FR: signup_started on first valid postcode');
  ok(await vis(p, '[data-step="2"]'), 'FR kb: step 2');
  ok(await focusTo('[name="meter"]'), 'FR kb: meter radios'); await p.keyboard.press('ArrowRight'); // analogue
  ok(await focusTo('[name="zon"]'), 'FR kb: solar radios'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Space');
  ok(await focusTo('[data-next="2"]'), 'FR kb: next'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-step="3"]'), 'FR kb: step 3 (' + (await p.textContent('[data-num]')).trim() + ')');
  await p.screenshot({ path: shots + 'fr-step3-mobile.png', fullPage: true });
  ok(await focusTo('[data-next="3"]'), 'FR kb: continue'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  ok(await p.locator('[name="plan"][value="premium"]').isChecked(), 'FR: explicit Premium kept');
  ok(await vis(p, '[data-prem-warn]'), 'FR: Premium + analogue warning');
  ok(await focusTo('#su-email'), 'FR kb: email'); await p.keyboard.type('marie@example.be');
  ok(await focusTo('#su-terms'), 'FR kb: terms'); await p.keyboard.press('Space');
  ok(await focusTo('[data-submit]'), 'FR kb: submit'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  ok(await vis(p, '[data-done]'), 'FR: confirmation');
  ok(await p.evaluate(() => document.activeElement?.id) === 'done-h', 'FR: focus on confirmation heading');
  await p.screenshot({ path: shots + 'fr-done-mobile.png', fullPage: true });
  ok(errs.length === 0, 'FR no page errors ' + errs.join(' | '));
  await p.close();
}
await b.close(); srv.close();

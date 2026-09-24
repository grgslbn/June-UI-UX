// E2E: sign-up flow NL + FR (mouse) and NL keyboard-only. Usage (from website/): node variants/a/tools/e2e-signup.mjs
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';
const dist = new URL('../dist/', import.meta.url).pathname;
const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.woff2': 'font/woff2', '.jpg': 'image/jpeg' };
const srv = createServer(async (q, r) => { let f = join(dist, decodeURIComponent(new URL(q.url, 'http://x').pathname)); try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); r.writeHead(200, { 'content-type': T[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); } catch { r.writeHead(404); r.end(); } });
await new Promise(r => srv.listen(0, r));
const O = `http://127.0.0.1:${srv.address().port}/`;
const b = await chromium.launch();
let fails = 0;
const ok = (c, m) => { console.log(`${c ? '✓' : '✗'} ${m}`); if (!c) fails++; };
const events = p => p.evaluate(() => (window.dataLayer || []).map(e => e.event));

for (const [loc, home, pc, town] of [['nl-be', 'nl-be/', '9000', 'Gent'], ['fr-be', 'fr-be/', '4000', 'Liège']]) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(O + home);
  await p.fill('#pc-hero', '12'); await p.click('#pc-hero ~ button');
  ok(await p.locator('#pc-hero-err').innerText() !== '', `${loc}: invalid hero postcode blocked with message`);
  await p.fill('#pc-hero', pc); await Promise.all([p.waitForURL(/postcode=/), p.click('#pc-hero ~ button')]);
  ok(await p.inputValue('#f-pc') === pc, `${loc}: postcode carried to sign-up`);
  ok((await p.locator('#f-pc-town').innerText()).includes(town), `${loc}: town confirmation shows ${town}`);
  ok((await events(p)).filter(e => e === 'signup_started').length === 1, `${loc}: signup_started fired once`);
  await p.click('#s1 button[type=submit]');
  ok(await p.locator('#s1 [data-errsum]').isVisible(), `${loc}: step-1 error summary shown`);
  ok(await p.evaluate(() => document.activeElement?.matches('[data-errsum]')), `${loc}: focus moved to error summary`);
  await p.click('label:has(> input[name=household][value="3-4"])');
  await p.click('label:has(> input[name=meter][value=digital])');
  await p.click('label:has(> input[name=solar][value=yes])');
  await p.click('#s1 button[type=submit]');
  ok(await p.locator('#s-est').isVisible(), `${loc}: estimate visible`);
  const range = await p.locator('[data-est-range]').innerText();
  ok(/\d+.*–.*\d+/.test(range), `${loc}: range shown (${range})`);
  ok((await p.locator('[data-est-cta]').innerText()).includes('Premium'), `${loc}: digital + solar recommends Premium`);
  ok((await events(p)).includes('estimate_viewed'), `${loc}: estimate_viewed`);
  await p.click('[data-go="2"]');
  ok(await p.locator('#s2').isVisible(), `${loc}: step 2 visible`);
  ok(await p.isChecked('input[name=plan][value=premium]'), `${loc}: Premium preselected`);
  ok(!(await p.isChecked('input[name=marketing]')), `${loc}: marketing consent unticked`);
  await p.goBack(); ok(await p.locator('#s-est').isVisible(), `${loc}: browser back → estimate`);
  await p.goForward(); ok(await p.locator('#s2').isVisible(), `${loc}: forward → step 2`);
  await p.fill('#f-email', 'bad@'); await p.click('#s2 button[type=submit]');
  { const ee = await p.locator('#f-email-e').innerText(), te = await p.locator('#f-terms-e').innerText(); ok(ee !== '' && te !== '', `${loc}: email + terms errors [${ee}|${te}]`); }
  await p.fill('#f-email', 'test@example.be'); await p.check('input[name=terms]');
  await p.click('#s2 button[type=submit]');
  ok(await p.locator('#s-done').isVisible(), `${loc}: confirmation visible`);
  ok((await p.locator('[data-done-body]').innerText()).includes('test@example.be'), `${loc}: confirmation mentions email`);
  ok(!JSON.stringify(await p.evaluate(() => window.dataLayer)).includes('example.be'), `${loc}: no PII in dataLayer`);
  ok(errs.length === 0, `${loc}: no page errors ${errs.join(' ')}`);
  // plan param from plans page
  const q = await (await b.newContext()).newPage();
  await q.goto(O + (loc === 'nl-be' ? 'nl-be/aanmelden/' : 'fr-be/inscription/') + '?plan=switch&postcode=1000&meter=analog');
  ok(await q.locator('[data-planchip]').isVisible(), `${loc}: plan chip from ?plan=`);
  await q.click('label:has(> input[name=household][value="1"])'); await q.click('label:has(> input[name=solar][value=no])');
  await q.click('#s1 button[type=submit]'); await q.click('[data-go="2"]');
  ok(await q.isChecked('input[name=plan][value=switch]'), `${loc}: ?plan=switch respected at step 2`);
}

// Keyboard only (NL)
{
  const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p.goto(O + 'nl-be/aanmelden/');
  const tabTo = async (sel, max = 40) => { for (let i = 0; i < max; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(s => document.activeElement?.matches(s), sel)) return true; } return false; };
  ok(await tabTo('#f-pc'), 'kbd: reach postcode'); await p.keyboard.type('2000');
  ok(await tabTo('input[name=energy]'), 'kbd: energy group'); 
  ok(await tabTo('input[name=household]'), 'kbd: household group'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
  ok(await tabTo('input[name=meter]'), 'kbd: meter group'); await p.keyboard.press('Space');
  ok(await tabTo('input[name=solar]'), 'kbd: solar group'); await p.keyboard.press('ArrowRight');
  ok(await tabTo('#s1 button[type=submit]'), 'kbd: submit'); await p.keyboard.press('Enter');
  ok(await p.locator('#s-est').isVisible() && await p.evaluate(() => document.activeElement?.id === 'est-title'), 'kbd: estimate shown, focus on heading');
  ok(await tabTo('[data-go="2"]'), 'kbd: continue'); await p.keyboard.press('Enter');
  ok(await tabTo('#f-email'), 'kbd: email'); await p.keyboard.type('kb@example.be');
  ok(await tabTo('input[name=terms]'), 'kbd: terms'); await p.keyboard.press('Space');
  ok(await tabTo('#s2 button[type=submit]'), 'kbd: submit 2'); await p.keyboard.press('Enter');
  ok(await p.locator('#s-done').isVisible(), 'kbd: confirmation');
}
await b.close(); srv.close();
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED'); process.exit(fails ? 1 : 0);

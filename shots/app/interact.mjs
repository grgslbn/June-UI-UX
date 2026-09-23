// Interaction captures for the Phase 4 foundation: popover, disclosure, Year view, keyboard chart tooltip.
// Usage: node shots/app/interact.mjs   (from repo root, after node tools/build.mjs)
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const file = 'file://' + resolve('app/index.html');
const out = 'shots/app';
const browser = await chromium.launch();
const log = [];
for (const vp of [{ n: 'desktop', width: 1280, height: 900 }, { n: 'mobile', width: 390, height: 844 }]) {
  for (const dark of [false, true]) {
    const sfx = `${vp.n}${dark ? '__dark' : ''}`;
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, colorScheme: dark ? 'dark' : 'light', reducedMotion: 'reduce' });
    await page.goto(file + '#panel-peak'); await page.waitForTimeout(400);
    // 1. ≈ popover via keyboard (Enter), then scroll a bit: must stay open
    await page.focus('[data-pop="pk-pop-est"]'); await page.keyboard.press('Enter'); await page.waitForTimeout(250);
    await page.mouse.wheel(0, 40); await page.waitForTimeout(250);
    const openAfterScroll = await page.$eval('#pk-pop-est', p => !p.hidden && p.classList.contains('open'));
    await page.screenshot({ path: `${out}/int__pop-est__${sfx}.png` });
    await page.keyboard.press('Escape'); await page.waitForTimeout(200);
    const closedOnEsc = await page.$eval('#pk-pop-est', p => p.hidden);
    const focusBack = await page.evaluate(() => document.activeElement?.dataset.pop);
    log.push({ sfx, openAfterScroll, closedOnEsc, focusBack });
    // 2. rolling-average popover (mobile check: must not cover the 4.0 figure badly)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('[data-pop="pk-pop-rolling"]'); await page.waitForTimeout(250);
    await page.screenshot({ path: `${out}/int__pop-rolling__${sfx}.png` });
    await page.mouse.click(5, vp.height - 5); await page.waitForTimeout(200);
    // 3. disclosure open
    await page.click('.disc-btn'); await page.waitForTimeout(400);
    const disc = await page.$('.disclosure');
    await disc.screenshot({ path: `${out}/int__disc-calc__${sfx}.png` });
    // 4. Year view
    await page.click('#pk-chart-tile .seg button[data-value="year"]'); await page.waitForTimeout(300);
    await (await page.$('#pk-chart-tile')).screenshot({ path: `${out}/int__year-view__${sfx}.png` });
    // 5. keyboard tooltip on the month chart
    await page.click('#pk-chart-tile .seg button[data-value="month"]'); await page.waitForTimeout(200);
    await page.focus('#pk-chart-month'); for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    await (await page.$('#pk-chart-tile')).screenshot({ path: `${out}/int__kbd-tooltip__${sfx}.png` });
    const live = await page.evaluate(() => document.querySelector('#pk-chart-month').nextElementSibling?.textContent);
    log.push({ sfx, liveTooltip: live });
    await page.close();
  }
}
// Keyboard order on the tab bar + target sizes
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(file); await page.waitForTimeout(300);
const small = await page.$$eval('.frame a, .frame button, .popover button', els => els.filter(e => e.getClientRects().length).map(e => { const r = e.getBoundingClientRect(); return { t: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 24), w: Math.round(r.width), h: Math.round(r.height) }; }).filter(r => r.w < 24 || r.h < 24));
log.push({ targetsUnder24px_mobileOverview: small });
await browser.close();
console.log(JSON.stringify(log, null, 1));

import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:1280,height:900}, reducedMotion:'reduce' });
await p.goto('file://' + resolve('app/preview-b2.html') + '#panel-breakdown'); await p.waitForTimeout(400);
await p.click('#bd-season-tile .seg button[data-value="all"]'); await p.waitForTimeout(400);
await p.locator('#bd-season-tile').screenshot({ path: 'shots/app-b2/int__bd-all__desktop.png' }); await b.close();

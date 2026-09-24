import { chromium } from 'playwright';
import { resolve } from 'node:path';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto('file://' + resolve('app/index.html') + '#panel-peak'); await p.waitForTimeout(600);
await p.click('#panel-peak .disc-btn'); await p.waitForTimeout(500);
const el = await p.$('#pk-calc-body'); await el.screenshot({ path: 'shots/eval1-r2/int__m-peak-calc.png' });
await b.close();

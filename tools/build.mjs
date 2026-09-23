// Assembles the final gallery: app/shell.html + app/panels/*.html → app/index.html
// Panel fragments are included in the order listed in app/panels/order.json.
// Each fragment contains one or more <section class="panel" id="panel-…" data-tab="…" data-label="…">.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const shell = readFileSync('app/shell.html', 'utf8');
const order = JSON.parse(readFileSync('app/panels/order.json', 'utf8'));
const parts = [];
for (const name of order) {
  const f = `app/panels/${name}.html`;
  if (!existsSync(f)) { console.warn(`skip: ${f} missing`); continue; }
  parts.push(`<!-- ═══ ${name} ═══ -->\n` + readFileSync(f, 'utf8').trim());
}
if (!shell.includes('<!-- PANELS -->')) throw new Error('app/shell.html needs a <!-- PANELS --> marker');
const out = shell.replace('<!-- PANELS -->', parts.join('\n\n'));
writeFileSync('app/index.html', out);
const ids = [...out.matchAll(/class="panel[^"]*"\s+id="([^"]+)"/g)].map(m => m[1]);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dup.length) throw new Error('duplicate panel ids: ' + dup.join(', '));
console.log(`app/index.html built — ${parts.length} fragments, ${ids.length} panels`);

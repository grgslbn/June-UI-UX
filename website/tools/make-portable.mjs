// Turns a built Astro site (root-absolute URLs, directory routes) into a portable copy that works from any
// sub-path and without directory indexes — e.g. a claude.ai artifact or a file share.
// Usage: node tools/make-portable.mjs <dist-dir> <out-dir> [--entry=nl-be/index.html]
//   • every "/x/" URL in HTML attributes, inline scripts and CSS becomes relative ("../../x/index.html")
//   • <out-dir>/index.html becomes a copy of the entry page, rewritten for depth 0, without the document
//     wrapper (the artifact host adds its own <!doctype>/<head>/<body> skeleton)
import { readFile, writeFile, mkdir, cp, rm, rename } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const [, , src, out, ...flags] = process.argv;
const entry = (flags.find(f => f.startsWith('--entry=')) || '--entry=nl-be/index.html').split('=')[1];
if (!src || !out) { console.error('usage: node tools/make-portable.mjs <dist> <out> [--entry=nl-be/index.html]'); process.exit(1); }

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });
// Hosts like claude.ai artifacts reserve names starting with "_": move Astro's _astro/ to assets/.
const ASSETS = 'assets';
await rename(join(out, '_astro'), join(out, ASSETS)).catch(() => {});
const renameRefs = s => s.replace(/(^|[\/"'(\s,])_astro\//g, `$1${ASSETS}/`);

const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

const rel = (url, depth) => {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const m = url.match(/^([^?#]*)(.*)$/);
  let path = m[1].slice(1);
  if (path === '' || path.endsWith('/')) path += 'index.html';
  return '../'.repeat(depth) + path + m[2];
};
const rewriteHtml = (s, depth) => s
  // attributes (srcset can hold several URLs)
  .replace(/\b(href|src|action|poster|data-[a-z-]+)="(\/[^"]*)"/g, (_, a, u) => `${a}="${rel(u, depth)}"`)
  .replace(/\b(srcset|imagesrcset)="([^"]*)"/g, (_, a, v) => `${a}="${v.split(',').map(p => { const [u, ...r] = p.trim().split(/\s+/); return [rel(u, depth), ...r].join(' '); }).join(', ')}"`)
  // root-absolute route strings inside inline scripts (language switch etc.)
  .replace(/(["'`])\/((?:nl-be|fr-be)\/[^"'`]*)\1/g, (_, q, u) => `${q}${rel('/' + u, depth)}${q}`);

for (const f of walk(out)) {
  const r = relative(out, f);
  const depth = dirname(r) === '.' ? 0 : dirname(r).split('/').length;
  if (f.endsWith('.html')) await writeFile(f, renameRefs(rewriteHtml(await readFile(f, 'utf8'), depth)));
  else if (f.endsWith('.css')) await writeFile(f, renameRefs((await readFile(f, 'utf8')).replace(/url\((\/[^)]+)\)/g, (_, u) => `url(${rel(u, depth)})`)));
  else if (f.endsWith('.js')) await writeFile(f, renameRefs(await readFile(f, 'utf8')));
}

// Entry page at the root, for hosts that serve one page as the landing view.
const entryHtml = await readFile(join(src, entry), 'utf8');
let page = renameRefs(rewriteHtml(entryHtml, 0));
const head = page.slice(page.indexOf('<head>') + 6, page.indexOf('</head>')).replace(/<meta[^>]*(charset|viewport)[^>]*>\s*/g, '');
const title = (head.match(/<title>[\s\S]*?<\/title>/) || [''])[0];
const bodyOpen = page.match(/<body[^>]*>/)[0];
const body = page.slice(page.indexOf(bodyOpen) + bodyOpen.length, page.lastIndexOf('</body>'));
const lang = (page.match(/<html[^>]*lang="([^"]+)"/) || [])[1];
const bodyAttrs = [...bodyOpen.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, a, v]) => `document.body.setAttribute(${JSON.stringify(a)},${JSON.stringify(v)});`).join('');
await writeFile(join(out, 'index.html'),
  `${title}\n${head.replace(title, '').trim()}\n<script>${lang ? `document.documentElement.lang=${JSON.stringify(lang)};` : ''}${bodyAttrs}</script>\n${body.trim()}\n`);
console.log(`portable copy written to ${out} (entry: ${entry})`);

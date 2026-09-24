// Each variant is a static Astro site. BASE lets the review hub serve variants side by side (e.g. /v/a/).
// `@shared` → website/shared (facts.json, routes.mjs, fonts).
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const shared = fileURLToPath(new URL(import.meta.url.includes('/variants/') ? '../../shared/' : '../shared/', import.meta.url));

// French typography: no-break space before ? ! : ; » and after « in FR pages (outside <script>/<style>/tags),
// so punctuation never wraps onto its own line.
const frTypo = {
  name: 'fr-typography',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const root = fileURLToPath(dir);
      const stack = [join(root, 'fr-be')];
      while (stack.length) {
        const d = stack.pop();
        for (const e of await readdir(d, { withFileTypes: true })) {
          const p = join(d, e.name);
          if (e.isDirectory()) { stack.push(p); continue; }
          if (!e.name.endsWith('.html')) continue;
          const html = await readFile(p, 'utf8');
          const out = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/g)
            .map(part => part.startsWith('<') ? part : part.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« '))
            .join('');
          if (out !== html) await writeFile(p, out);
        }
      }
    },
  },
};

export default defineConfig({
  site: 'https://www.june.energy',
  output: 'static',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [frTypo],
  vite: { resolve: { alias: { '@shared': shared } }, server: { fs: { allow: ['..', '../..'] } } },
});

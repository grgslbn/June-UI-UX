// Each variant is a static Astro site. BASE lets the review hub serve variants side by side (e.g. /v/a/).
// `@shared` → website/shared (facts.json, routes.mjs, fonts).
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
const shared = fileURLToPath(new URL(import.meta.url.includes('/variants/') ? '../../shared/' : '../shared/', import.meta.url));
export default defineConfig({
  site: 'https://www.june.energy',
  output: 'static',
  outDir: process.env.OUT || './dist', // parallel builders: OUT=./dist-<role>
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // Page-specific CSS (< 10 KB) is inlined; the shared global sheet stays external and cached across pages.
  vite: { build: { assetsInlineLimit: 10000 }, resolve: { alias: { '@shared': shared } }, server: { fs: { allow: ['..', '../..'] } } },
});

// Each variant is a static Astro site. BASE lets the review hub serve variants side by side (e.g. /v/a/).
import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});

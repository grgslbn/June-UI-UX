// All indexable pages, both locales, each with its hreflang alternates (nl-BE, fr-BE, x-default).
// Sign-up routes are noindex and therefore left out (routes.mjs NOINDEX).
import { ROUTES, NOINDEX, abs, alternates } from '@shared/routes.mjs';
export const GET = () => {
  const urls = Object.keys(ROUTES).filter((k) => !NOINDEX.has(k)).flatMap((key) => ['nl-be', 'fr-be'].map((loc) =>
    `  <url>\n    <loc>${abs(key, loc)}</loc>\n${alternates(key).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join('\n')}\n  </url>`));
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};

# Round 1: technical, SEO and QA evaluation (variants A, B, C, E)

Evaluator: QA engineer and technical/SEO auditor. I did not build any of these variants. Date: 2026-09-23.
Scope: only the **Technical (15%)** block of `brief/scoring-rubric.md`: Performance (6), SEO & i18n (5), Code quality (4). Targets come from `brief/seo-tech-strategy.md`.
Raw evidence is in `evaluations/scratch/qa/`: build logs, fresh check-site output (`check-<v>.md/json`), Lighthouse on all 12 routes (`lh-<v>.json`), the extended Playwright QA (`qa-<v>.json`, script `qa.mjs`, summariser `summarize.mjs`), CLS/LCP tracers (`cls.mjs`, `lcp.mjs`) and 320 px screenshots (`w320-*.png`).
The variants' own `report/check.*` files were restored after the re-run. Nothing under `variants/` was changed except the gitignored `dist/`, which was rebuilt.

## 1. Summary scores

| Variant | Performance (×6) | SEO & i18n (×5) | Code quality (×4) | **Technical subtotal /5** |
|---|---|---|---|---|
| A | 3.0 | 4.0 | 4.0 | **3.60** |
| B | 3.5 | 4.0 | 3.5 | **3.67** |
| C | 4.5 | 3.5 | 4.0 | **4.03** |
| E | 4.0 | 3.5 | 3.5 | **3.70** |

Subtotal = (6·P + 5·S + 4·Q) / 15.

## 2. Metrics (home, mobile 390×844, DPR 3)

| Variant | 1st-party JS (gz) | CSS (gz) | Total KB, Lighthouse run¹ | Total KB (gz, reduced motion)² | LCP (LH) | CLS home / worst route | Requests (home) | LH perf, 12 routes (min–avg) |
|---|---|---|---|---|---|---|---|---|
| A | 0 KB external (2.5 k chars inline) | 17.5 KB (one 70 KB sheet for every page) | 738 | 189 | **3.0 s** | 0.003 / **0.198** (nl switch-plus) | 12 | **89**–95.4 |
| B | **13.2 KB** (11 KB even on FAQ) | 10.3 KB + 9.7 k chars inline | 728 | 150 | 2.6–2.8 s | 0.002 / **0.141** (nl switch-plus) | 16 | 92–96.1 |
| C | 0 KB external (1.8 k chars inline) | 10.6 KB + 5.4 k chars inline | 646 | 149 | **1.8–2.3 s** | **0 / 0** | 8 | **98–98.8** |
| E | 0 KB external (1.0 k chars inline) | 9.0 KB | **214** | 149 | 2.4 s | 0.004 / **0.143** (fr inscription) | 10 | 92–97.3 |

¹ Lighthouse transfer size, motion allowed. The local static server does not compress, so text assets count at raw size (applies to every variant equally). Most of the A/B/C weight is the animated brand-icon WebPs (150–200 KB each).
² Playwright, initial load, `reducedMotion: reduce`, text assets gzip-sized.

Fonts are the same for every variant: self-hosted Montserrat + Inter WOFF2 (84–88 KB, ≤ 3 files), `font-display: swap`, no third-party requests before or after load. A, B and E preload 1 font; C preloads 2.

### Hard gates and builds
- `npx astro build`: all four build clean, with **0 warnings and 0 errors**. A, B and C build 14 pages (they include `/style-tile/`); E builds 13.
- `check-site.mjs --lighthouse`: **0 hard-gate failures on every variant**. Official Lighthouse set (nl home / nl plans / nl sign-up / fr home), perf/a11y/BP/SEO:
  - A: 94/97/98/94 · 100 · 100 · 100 (sign-up SEO 63 by design, it is noindex). LCP 3.0 / 2.4 / 2.1 / 3.0 s
  - B: 93/95/97/93. LCP 2.8 / 2.4 / 2.3 / 2.8 s
  - C: 98/99/99/98. LCP 2.3 / 2.0 / 2.0 / 2.3 s. CLS 0
  - E: 97/97/98/97. LCP 2.4 / 2.6 / 2.3 / 2.4 s
- I extended Lighthouse to **all 12 routes**. It found a route the gate set does not cover that would fail: **A nl-be/switch-plus/ perf 89** (CLS 0.198).

### QA beyond the gates (all four unless noted)
| Check | Result |
|---|---|
| Internal links and anchors, NL + FR, 12 routes | No 404s. Placeholder login links point to a missing anchor: A `href="#"` (3 per page, including "Alle reviews op Google"), B `#inloggen`, E `#login`. C points login to `https://www.june.energy/` (the homepage) |
| Language switch → equivalent page | **12/12 correct in all four** (on sign-up, A and B keep the query string via JS). A, B and C have correct `hreflang` + `lang` + FR `aria-label`. E: Dutch `aria-label` ("Lees deze pagina in het Frans") on a `lang="fr"` link |
| Canonical / hreflang nl-BE, fr-BE, x-default | Absolute, self-referencing, reciprocal and correct on 12/12 in all four. `<html lang>` = nl-BE / fr-BE |
| JSON-LD | Parses on every page. Organization, WebSite and WebPage everywhere. BreadcrumbList on subpages. Product/Offer on plans (69.00 / 99.00 / 198.00 EUR, yearly, VAT incl.) and switch-plus (99.00). FAQPage only on the FAQ page, and every Question matches visible text. **No AggregateRating** |
| sitemap.xml / robots.txt / 404.html | **Missing in all four** (Astro only writes a root meta-refresh with noindex and canonical, which is correct) |
| Favicon / OG image | A: `og/june-og.jpg` 1200×630. B: hashed PNG 1200×630 with width/height meta. **C and E: no `og:image` on any route**. C has no favicon file (6.4 KB SVG data-URI inlined into every HTML page) |
| Forms without JS | All postcode/calculator forms are `GET` to the locale's sign-up page and navigate with the value (checked). Sign-up pages show a `<noscript>` notice. No content is hidden without JS (0 invisible text nodes on all 48 route checks) |
| Console errors | 0 in both motion modes, all routes |
| Viewports 320 / 390 / 768 / 1024 / 1440 | No overflow at 390 and above in any variant. **At 320 px** (WCAG 1.4.10 reflow): A overflows by 52 px on 10/12 routes (hero column is 344 px wide); B 9–55 px on 7 routes; C 9–26 px on 3 routes; E 5–30 px on 3 routes |
| Images | All `<img>` have width/height and use `astro:assets` (A 19 AVIF + WebP; B WebP/AVIF; E AVIF + WebP). **C serves the 6 static icon frames as unoptimised PNG** (11–17 KB each). E has **no `loading="lazy"`** anywhere. A's `site.ts` switches every lazy image to eager after load. The LCP element is the hero text in every variant (good, not an image) |
| Reduced motion | All four honour it (no animations running under `reduce`, final numbers are in the HTML). Without reduced motion: A runs a count-up plus an infinite spinner; E runs an infinite "breathe" blob (> 5 s, no pause control); B and C have no running animations after settle. B and E use cross-document view transitions with a reduce override |

## 3. Defects per variant (ranked)

Severity: **blocker** = must fix before launch. **major** = fix before release, visible metric/SEO/a11y impact. **minor** = polish.
No variant has a blocker as a static build. Items marked (all) apply to all four variants and are listed once in §4.

### A: Calm Confidence
1. **major**: `nl-be/switch-plus/` CLS **0.198** (LH perf 89) and `fr-be/switch-plus/` 0.149. At about 100 ms the font swap reflows `.sp-price` and `.phero__aside` pushes the example bars down. **Fix:** reserve a height or `aspect-ratio` for `.phero__aside`/`.exbar`, and tune `Montserrat Fallback` metrics (or preload Inter too, as C does).
2. **major**: 320 px reflow fails on **10/12 routes** (+52 px): hero, `.sec-head__intro` and the postcode form `.pc` are fixed at about 344 px. **Fix:** `min-width: 0` / `max-width: 100%` on the hero column and `.pc__row`, and swap the fixed width for `min(100%, …)`.
3. **major**: home and how-it-works LCP **3.0 s / 3.2 s** (rubric wants < 2 s). The single 70 KB CSS bundle (`Stars.*.css`, every page's rules) is render-blocking, and the page then loads about 530–680 KB of animated icon WebPs. **Fix:** split CSS per page (as C does), inline critical CSS, and use a static-first icon swapped on intersection (E's `AnimIcon` pattern).
4. **minor**: `site.ts` forces every `loading="lazy"` image to eager after load, which undoes lazy-loading on mobile data. **Fix:** remove it or limit it to above-the-fold images.
5. **minor**: Organization `logo` → `https://www.june.energy/logo-512.png` is not shipped. Placeholder `href="#"` links (login, "Alle reviews op Google"). `/style-tile/` ships in production `dist`. Titles are over 60 characters on fr home and how (64–68). h1→h3 skip on the plans pages. Duplicate `.who__item--june .who__t !important` rules in `global.css`.

### B: Savings First
1. **major**: `estimate.ts` bundles the **whole `facts.json` (29 KB raw / 10.4 KB gz) into client JS** on 10/12 routes, including FAQ and switch-plus. JS is 11–14 KB gz per page, against a budget of ≤ 10 KB (FAQ/how target 0). **Fix:** import only the numbers the estimator needs (a `facts-client.ts` of constants generated at build) and don't load `estimate`/`track` on FAQ.
2. **major**: switch-plus CLS **0.141 (nl) / 0.129 (fr)**, plus 0.055 on the nl FAQ. The sticky CTA, `.sp-card` and `.proof-line` reflow on font swap (height 44→24). **Fix:** start the sticky bar `position: fixed` with transform, give `.sp-card` a min-height, and tune the fallback font metrics.
3. **major**: 320 px reflow fails on 7 routes (up to +55 px on fr home: `.h1a`/`.h1b` and `.proof-line`; also the plans table and the switch-plus report). **Fix:** `overflow-wrap: anywhere` on the hero lines, `min-width: 0` on grid children, and the plans table inside `overflow-x: auto`.
4. **minor**: LCP 2.6–2.8 s on home. The HTML is 86 KB raw / 23 KB gz, with 9–14 k chars of per-page inline CSS. The animated icons push the home page to about 730 KB.
5. **minor**: the placeholder login `#inloggen` is a dead anchor on 10 routes. `Offer.url` is built by string (`${fr?'inscription':'aanmelden'}`) instead of `abs('signup')`. `/style-tile/` ships. Titles on the how pages are 64/66 characters.

### C: Clear Ledger
1. **major**: **no `og:image`** on any of the 12 routes, so social and messaging shares have no image. **Fix:** add one 1200×630 OG image per locale (via `astro:assets` or a `public/og/`) in `Page.astro`.
2. **major**: 320 px reflow fails on 3 routes (nl home +26, nl switch-plus +25 on the "Is het iets voor jou?" table section, fr how +9). **Fix:** make the comparison table scroll inside its wrapper and add `min-width: 0` on `.section-head`/`.prose`.
3. **minor**: static icon frames are served as **unoptimised PNG** (11–17 KB × 6), and the animated WebPs (150–200 KB) are the default `src`, so the how page weighs about 870 KB with motion allowed. **Fix:** run the statics through `getImage({format:'webp'})` and swap in the animation only on intersection.
4. **minor**: the favicon is a 6.4 KB data-URI repeated in every HTML page, so it can't be cached. **Fix:** ship `public/favicon.svg`.
5. **minor**: meta descriptions run 168–184 characters on 5 routes and titles 62–68 on 3. The login link goes to the production homepage (`TODO`). The i18n layer is untyped JS (`c: any`). `/style-tile/` ships.

### E: Bold June
1. **major**: **no `og:image`** on any of the 12 routes. Organization `logo` is the SVG favicon (Google requires a raster logo). **Fix:** add a localised 1200×630 OG image and a 512 px PNG logo.
2. **major**: CLS **0.143 on `fr-be/inscription/`** and **0.115 on `fr-be/questions-frequentes/`**. The longer FR strings reflow on font swap (`.fsearch` and `.sec` move, `.fld__why` and the chips appear). NL is fine. **Fix:** reserve space for the search box and the first question block, and tune the Montserrat/Inter fallback metrics.
3. **major**: 320 px reflow fails on nl/fr home (+26/+30: hero `.eyebrow`, `.hero__line` and the postcode input are 320 px wide plus padding) and fr sign-up (+5, chips). **Fix:** `box-sizing`/`max-width: 100%` on the hero stack and wrap the chip grid.
4. **minor**: no image is lazy-loaded (`Character` is explicitly eager and the `<Picture>`s have no `loading`). The weight is still the lowest of the four (about 210 KB home), but the plans page reaches 400 KB. **Fix:** add `loading="lazy"` below the fold.
5. **minor**: the infinite `breathe` blob animation has no pause control (WCAG 2.2.2, reduced motion is honoured). The FR switch link has a Dutch `aria-label` inside `lang="fr"`. `#login` is a dead anchor. 53 price/figure literals are hard-coded in page components instead of read from `facts.json`.

## 4. Cross-variant items (the same fix applies to every variant)
- **major (all):** no `sitemap.xml` (only 10 indexable URLs, with `xhtml:link` alternates), no `robots.txt`, and no localised `404.html` (noindex, links to both homes). Add `@astrojs/sitemap` with a filter that excludes sign-up, a static `robots.txt` and `src/pages/404.astro`.
- **minor (all):** the external login URL is still null, so every variant has a placeholder link. Replace it once `facts.brand.login.url` is confirmed.
- **minor (all):** visible "te bevestigen / à confirmer / placeholder" flags (reviews, earnings model, guarantee terms) are correct for this stage but must be resolved before launch.
- **minor (A, B, C):** remove `/style-tile/` from production builds (it is noindex, but crawlable and shipped).
- Host config (not scorable here): 301 `/` → `/nl-be/`, non-slash → slash, Brotli, `immutable` on `/_astro/`, CSP/HSTS headers.

## 5. Code quality and production readiness

| | A | B | C | E |
|---|---|---|---|---|
| Structure | Pages are 4-line wrappers → `components/pages/*`. Typed content modules (`content/i18n.ts`, `pages.ts`, `signup.ts`). Typed JSON-LD builders (`lib/schema.ts`) that read prices from `facts.json` | Scoped CSS per component. Typed. Clean `lib/estimate.ts` and `lib/track.ts` seams. But copy lives inline in page components (`t = fr ? {...} : {...}`), `Signup.astro` is 700 lines and `Calculator.astro` 445 | `i18n/*.js` modules built from `facts.json`. Per-page CSS files. The one enhancement script lives in `Page.astro` and is inlined. Has a sign-up flow test | Smallest codebase (about 3.0 k lines), readable components, best `AnimIcon` pattern. Page components carry inline copy and hard-coded prices |
| Tokens | Synced from `app/tokens.css`, with a site layer on top. 24 raw hex values outside tokens. 850-line monolithic `global.css` with a few `!important` fixes | 5 raw hex, 1,225 `var()` uses | 7 raw hex. Dark-mode ready (`color-scheme`) | 28 raw hex |
| facts.json vs hard-coded | Good (14 literals, mostly comments/copy) | Weak (75 figure literals in copy, and the whole JSON sent to the client) | Good (21) | Weak (53) |
| A11y semantics | Skip link, `<details>` menu, fieldset/legend, aria-invalid/describedby, Escape closes menu | Richest: 18 aria-live, popover menu, fieldsets | Skip link, `<details>` menu, fieldsets, aria-invalid | Skip link, `<details>` menu, fieldsets. Aria-label language mismatch |
| Effort to production | Low–medium: split the CSS, fix the switch-plus CLS and the 320 overflow | Medium: extract copy into content modules, trim the client bundle | **Lowest**: add OG image and favicon, convert PNG statics | Medium: move copy/prices to content, add OG image, fix FR CLS |

**Overall technical ranking: C > E ≈ B > A.** C is the only variant with CLS 0 on every route, Lighthouse ≥ 98 on all 12 routes and zero external JS. Its gaps are cheap metadata fixes. E is the lightest variant but has FR font-swap CLS and missing OG images. B is the most careful on accessibility and analytics but ships too much JS and has inline copy. A has the cleanest content architecture, but it has the only sub-90 Lighthouse route, the slowest LCP and the widest 320 px failure.

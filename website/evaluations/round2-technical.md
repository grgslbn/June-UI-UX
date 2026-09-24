# Round 2: technical, SEO and QA evaluation of the integrated final site (`variants/final/`)

Evaluator: QA engineer and technical/SEO auditor (not a builder). Date: 2026-09-23.
The method is the same as in round 1 (`round1-technical.md`), run again on `variants/final/` (C base plus borrowings from A, B and E, per `brief/final-brief.md`).

Evidence is in `evaluations/scratch/qa/r2/`:
- `build.log`
- `check.md` / `check.json` (check-site run with `--narrow --site-files --lighthouse-all`)
- `lh-final.json` (my Lighthouse run on all 12 routes, with byte breakdown)
- `qa-final.json` (extended Playwright QA, `../qa.mjs`)
- `e2e.log` (funnel test)
- `nojs2.mjs` (no-JS form walk-through)
- `ov.mjs` / `shot.mjs` (width checks)

check-site overwrote `variants/final/report/check.*`. I restored the originals afterwards, so they are unchanged. Nothing is committed.

## 1. Scores: final vs C (round 1)

| | Performance (×6) | SEO & i18n (×5) | Code quality (×4) | **Technical subtotal /5** |
|---|---|---|---|---|
| C, round 1 | 4.5 | 3.5 | 4.0 | 4.03 |
| **Final, round 2** | **4.5** | **4.5** | **4.0** | **4.37** |

- **Performance:** Lighthouse 97–99 on every route and CLS 0 everywhere. It stays at 4.5 rather than 5 because LCP is 1.9–2.4 s: the rubric's 5 needs < 2 s, and home is 2.0 s, the plans pages 2.3–2.4 s and sign-up 2.3 s.
- **SEO & i18n:** complete now. The remaining gap is over-long descriptions and titles.
- **Code quality:** the round-1 technical defects are fixed. It stays at 4.0 because of small debt left where the three builders' files meet (§4).

## 2. Metrics

| Metric | C, round 1 | Final, round 2 |
|---|---|---|
| Build | clean, 14 pages incl. `/style-tile/` | **clean, 0 warnings.** 13 HTML (12 routes + 404) + 2 sitemap endpoints. Style tile removed |
| check-site (`--narrow --site-files --lighthouse-all`) | 0 failures (without narrow or site files) | **0 failures** (36 route×viewport checks incl. 320 px, site files ✓) |
| Lighthouse perf, 12 routes (min–avg) | 98–98.8 | **96–98.3** (sign-up 96–97, content pages 97–99) |
| LCP, home / plans / sign-up / worst | 1.8–2.3 / 2.0 / 2.0 / 2.34 s | 2.0 / 2.3–2.4 / 2.3 / **2.41 s** (NL plans) |
| CLS, worst route (Lighthouse and scroll tracer) | 0 | **0 on all 12** |
| TBT | 0 ms | 0 ms |
| First-party JS (gz) per page | 0 | **0** on home, how, FAQ, switch-plus. 1.2 KB on plans (ledger loads its estimate code only once an estimate exists). **18.1 KB on sign-up** (budget 45) |
| CSS (gz) | 10.6 KB + inline | 11.7–15.3 KB external + ≤ 12.6 k chars inline (budget 35) |
| HTML (gz) | 11–17 KB | 9.9–19.0 KB (plans are the largest at 85 KB raw) |
| Home, mobile: transfer / requests | 646 KB / 8 (the animated icons loaded) | **233 KB / 10** (Lighthouse) · 156 KB gz reduced motion |
| Plans, mobile: transfer | 241 KB | 436 KB (below-the-fold Premium band loaded eagerly, see N4) |
| Fonts | 2 WOFF2, 84 KB, 2 preloads | same. Keeping the Inter preload is right, because the LCP element is Inter body text on 10/12 routes |
| Third-party requests | 0 | 0 |

## 3. QA results

| Check | Result |
|---|---|
| Internal links and anchors (NL + FR, 12 routes) | **0 broken, 0 missing anchors, 0 `href="#"`**, no cross-locale links outside the switcher, trailing slash everywhere. Login is the interim `https://www.june.energy/`, which the brief accepts |
| Language switch | Maps to the equivalent page on **12/12**, with `hreflang`, `lang` and a localised `aria-label`. On the funnel it keeps answers (e2e ✓) |
| Canonical / hreflang / x-default / `<html lang>` | Correct, absolute, self-referencing and reciprocal on 12/12. The sitemap alternates match the head |
| JSON-LD | Valid on every page. Organization now has a **PNG logo** (`/logo-512.png`, 512×512, shipped). BreadcrumbList on subpages. Product/Offer 69.00/99.00/198.00 on plans and 99.00 on switch-plus. FAQPage (15 Q, all match visible text) only on the FAQ page. **No AggregateRating** |
| sitemap / robots / 404 | `sitemap-index.xml` → `sitemap-0.xml` has the **10 indexable URLs + xhtml alternates, no sign-up**. `robots.txt` allows everything, lists the sitemap and does not block sign-up. Bilingual `404.html` with noindex, per-section `lang` and links to both homes |
| OG / favicon | `og:image` per locale (`/og/june-nl.png`, `/og/june-fr.png`, 1200×630, with alt and twitter:image) on all routes. Favicon SVG + 32 px PNG + apple-touch 180 + 192 icon. No more data-URI |
| No-JS | Every postcode form (home ×2, plans, switch-plus, how, FAQ) submits as a GET to the right locale's sign-up with `postcode` + `entry` (+ `plan`). Sign-up renders all steps and a `<noscript>` notice. **0 hidden content** on all 12 routes |
| Console errors | 0, with and without reduced motion |
| Widths 320/390/768/1024/1440 | **0 page overflow on all 60 route×width combinations.** The only in-box overflow is the long word "Energieleveranciers" in the H1, which spills past its own box but stays inside the viewport at 320 (checked visually) |
| Images | All `astro:assets`, width/height set. Icons are served as a small static WebP and swapped for the animated WebP only on intersection when motion is allowed (E's pattern). The PNGs in `dist` are only `<picture>` fallbacks. The LCP element is text on every route |
| Reduced motion | Under `reduce`: 0 running animations, all content visible. Without it: the chart draw and guarantee reveals run once and settle (0 running after scroll), with no infinite loops. The guarantee reveals end at opacity 1 at 1280 and 390 |
| Funnel e2e (`node variants/final/tests/signup-flow.mjs --dist=dist`) | **84 passed, 0 failed.** Covers NL mouse, FR keyboard, language switch mid-flow, back/reload per step, Premium + analogue → Switch Plus, "Je zit al goed", no-JS form, 320 px, and a stale error summary |

## 4. Verdict on round-1 defects (C and cross-variant)

| Round-1 defect | Severity then | Verdict |
|---|---|---|
| C: no `og:image` on any route | major | **Fixed.** Localised 1200×630 PNG per locale |
| C: 320 px overflow on 3 routes | major | **Fixed.** 0 px on all 12 routes (also gated by `--narrow`) |
| C: static icons as unoptimised PNG, animated WebP as the default `src` (how page 870 KB) | minor | **Fixed.** Static-first WebP via `getImage`. How page 229 KB |
| C: favicon as a 6.4 KB data-URI in every page | minor | **Fixed.** Favicon set in `public/` |
| C: meta descriptions 168–184 chars on 5 routes, titles 62–64 | minor | **Still open.** Descriptions: NL home 168, FR home 180, NL/FR how 176/184, FR FAQ 176. Titles: how pages 62/64 |
| All: no sitemap / robots / 404 | major | **Fixed** |
| All: login placeholder | minor | **Accepted interim** (brief). Replace when `facts.brand.login.url` is confirmed |
| All: visible "te bevestigen / placeholder" flags | minor | **Fixed.** No such strings in any rendered page (interim wording instead) |
| A/B/C: `/style-tile/` shipped | minor | **Fixed.** No longer built |

## 5. New defects (ranked)

No blockers and no majors.

| # | Severity | Where | Defect | Fix |
|---|---|---|---|---|
| N1 | minor | `src/lib/estimate.js` (funnel owner) | `import facts from facts.json` ships the **whole frozen facts file (29 KB raw / 10.4 KB gz)** to the browser on sign-up. It is also lazy-loaded on plans once a visitor has an estimate. Only `plans[].priceYearly` is used (`FEES`). This is B's round-1 defect again, within budget but more than half of the funnel JS | Import a build-time constant (`export const FEES = {switch:69,…}` generated from facts, or `define` in Vite) instead of the JSON |
| N2 | minor | Seam **Lead ↔ Funnel**: `Header.astro` (`minimal` branch), `Page.astro` (`a[data-keep-state]` handler), `global.css` (`.help-link`, `.back-link`) | The funnel owner built its own header (`fhead`) in `Signup.astro` with its own keep-state language switch (`data-lang-link` in `signup-client.js`). The lead's `Header minimal` branch, its keep-state click handler and its CSS are now **dead code**, and there are two implementations of "language switch keeps funnel state" | One owner, one header. Either Signup uses `<Header minimal>` (after moving `fhead` markup in) or delete the minimal branch, the handler and the CSS |
| N3 | minor | `global.css`, `plans.css`, `funnel.css` | Unused classes: `tag--spark`, `tag--pending`, `quotes-label`, `quote-ph`, `summary--char`, `sq--ink`, `back-link`, `help-link` (global) and `vs-foot` (plans). **`.plan-g` is defined in both `plans.css` (grid callout) and `funnel.css` (max-width)** with different meanings. It is harmless today (separate pages) but will clash if the bundles merge | Delete the dead rules. Namespace the funnel class (`.fn-plan-g`) |
| N4 | minor | `ProductBand.astro` (pages owner), plans/home | Phone and dongle `<Picture>` have `loading="eager" fetchpriority="low"` although they sit about 5,400 px below the fold. Plans transfers 436 KB (home 233) and has the slowest LCP (2.3–2.4 s) and FCP (1.66 s) | `loading="lazy"` (dimensions are set, so no CLS) |
| N5 | minor | `Reviews.astro` (lead) | Rating "4,3", "1.200+", "20.000+" and "€ 326" are hard-coded NL/FR literals, while every other surface reads them from `facts.json` via `site.js`. This risks drift when the figures change (the brief requires keeping them current) | Read them from `c.rating` / `facts.*` like `CtaProof`/`HeroTile` |
| N6 | minor | i18n / props | 51 `any` types (`c: any` on every component), so there is no typed copy contract between `i18n/*.js` and components. A missing key renders an empty string silently | Convert `i18n/*.js` to `.ts` with `as const` and export a `Copy` type |
| N7 | minor | `global.css` L18 | `scroll-behavior: smooth` is global (turned off only under reduced motion). Users are fine, but automated clicks flake ("element is not stable"): my generic no-JS harness failed until it scrolled instantly. This matters for future regression tests | Scope smooth scrolling to in-page anchor jumps (`:target`), or have tests use `reducedMotion: 'reduce'` |
| N8 | minor | head | Descriptions and titles over length (see §4). Lighthouse SEO is 66 on sign-up **by design** (noindex) | Trim to ≤ 155 characters and ≤ 60 characters |

## 6. Code quality review (`variants/final/src`)

- **Structure:** C's clean layering is intact: `Base` (head/SEO) → `Page` (fonts, OG, JSON-LD, one enhancement script) → `Site` (chrome and sticky CTA). Route files are thin wrappers, copy lives in `i18n/*.js` built from `facts.json`, and CSS is split per page. Sitemap endpoints are generated from `routes.mjs` (single source of truth), so head and sitemap cannot disagree.
- **Ownership seams:**
  - The lead / pages / funnel split mostly held. The pages owner kept scoped `<style>` in its own components (`PlanHelper`, `ProductBand`, `Faq`), and the funnel logic sits behind `lib/estimate.js` (one function, `getEstimate`) plus `funnel-state.js` and `postcode.js`, which is easy to swap for June's engine.
  - The one real seam problem is N2, a duplicated funnel header and language keep-state.
  - Minor cross-file overlaps: `.hero-fig` and `.ledger` are defined in both `global.css` and `home.css` (lead-owned, both files); `.cta-proof` is in global with a plans override. These are overrides, not conflicts.
- **Dead code:**
  - `HomeProduct` is fully removed (no references).
  - The style tile is gone (no page, no CSS).
  - No unused components: every `.astro` file is imported.
  - Unused exports inside `lib/` (`PLAN_SLUGS`, `usageAndGross`, `advise`, `STORE_KEY`…) are only used internally, so this is cosmetic.
  - Dead CSS and the Header minimal branch are listed in N2 and N3.
- **Tokens:**
  - Only 3 `!important` in the whole site, all reduced-motion or utility.
  - Raw hex appears only in `plans.css .report-card` (a deliberate replica of the app's report UI, which is acceptable but could use tokens) and in the theme-color meta.
- **Accessibility semantics:** skip link, one `<main>`, `<details>` menu, fieldsets/legends, an error summary that receives focus, aria-invalid, and a localised language link with `lang`. The e2e covers keyboard-only FR.
- **Tests:** `tests/signup-flow.mjs` (84 assertions) plus check-site with the new flags. There is no unit test on `estimate.js`, which it deserves given legal sensitivity.

## 7. Production-readiness list

1. **Host/CDN:** 301 `/` → `/nl-be/` (the meta-refresh is only a fallback), non-slash → slash, legacy URL map (seo-tech §1.4), serve `404.html` with HTTP 404, Brotli, `immutable` on `/_astro/*`, `max-age=0` on HTML, and CSP / HSTS / Referrer-Policy / Permissions-Policy headers.
2. **Staging:** build the review hub with `BASE=/v/final/` plus a noindex header. Canonicals already point to production.
3. **Analytics and consent:** only `dataLayer.push` seams exist. Wire the cookieless analytics (≤ 3 KB, deferred) and the consent overlay (fixed position, no CLS) before launch, then re-run Lighthouse.
4. **Facts sign-off:** estimate model (legal), guarantee terms, cancellation/renewal, supplier commissions, KBO, login URL, and the review count/date. Resolve every `needsConfirmation` in `facts.json`, then rebuild.
5. **Sign-up backend:** the final step posts nowhere (static site). Connect the real sign-up endpoint and keep native validation as the no-JS fallback.
6. **Rich Results Test and Schema validator** on the production URLs. Search Console: submit `sitemap-index.xml` and check hreflang reports after the first crawl.
7. **Quick wins before launch:** N1 (trim the funnel JS about 10 KB), N4 (lazy Premium band, which should bring plans LCP to about 2.0 s), N8 (meta lengths), and N2/N3 (dead code).

**Verdict:** technically ship-ready as a static front end. It passes every hard gate including 320 px and site files, has CLS 0 and Lighthouse ≥ 96 on all 12 routes, the e2e is green and SEO/i18n are complete. The remaining items are minor clean-ups plus the host, analytics and legal work listed above.

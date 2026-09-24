# Round 2 scorecard — final site (C + borrowings)

| | Design (30) | UX (25) | Conversion (30) | Technical (15) | **Weighted** | Personas (simulated) |
|---|---|---|---|---|---|---|
| C · round 1 | 3.97 | 4.34 | 4.52 | 4.03 | 4.24 | 4.1 |
| **Final · round 2** | **4.25** | **4.50** | **4.68** | **4.37** | **4.46** | **4.4** |

All automated gates: 36/36 route × width (1280/390/320), Lighthouse mobile 96–99 perf / 100 a11y / 100 BP / 100 SEO (sign-up noindex by design), LCP ≤ 2.4 s, CLS 0 on all 12 routes, sitemap/robots/404/og ✓, funnel e2e 84/84.
Every persona rates the final site ≥ their round-1 favourite.

## Final polish list (consensus of all five round-2 reports)
**Lead (shell/home/tech):** mobile first screen must contain the postcode form (≤ 600px from top at 390×844) — form under H1 below 700px, three-question panel after; guarantee condition visible on mobile hero; independence claim ("Jij betaalt ons…") back to safe wording + footnote while commissions are unconfirmed; proof row grid (`max-content 1fr`, nbsp in "€ 326"); hero tile month strip meaningful (initials + current-month check) or removed; one inverse button style; FR nbsp before €/% (shared helper); footnote links ≥ 24×24; Reviews reads facts.json; remove dead Header-minimal/data-keep-state/.help-link/.back-link code; smooth scroll only when motion allowed; title ≤ 60 / meta description ≤ 160 on home.
**Pages:** one squiggle word per page; proof line once under the plan-card row (not per card); mobile sticky earlier on plans / Switch Plus (narrow data-sticky-hide); Premium images lazy; independence safe wording on plans; FAQ category headings top-aligned; stray € icon in money flow; titles/meta length on how-it-works + FAQ.
**Funnel:** `estimate.js` imports only prices (not the whole facts.json); "voordeligste contract uit onze vergelijking"; negative net → "minder dan je abonnement kost" (never "€ 0 – € 0"); `aria-invalid` on preference radios; rename `.plan-g` collision.

## Owner items before launch (cannot be fixed in code)
Phone/contact for prospects · KBO/BCE + address · supplier-commission answer (independence claim) · €326 basis · real Google reviews · Premium guarantee amount · legal sign-off on the in-browser estimate · real sign-up backend (POST), analytics + consent, host redirects + security headers, 404 status.

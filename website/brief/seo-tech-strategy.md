# June — SEO & technical web strategy

Owner: SEO & technical web strategist. Applies to every variant built from `website/template/` and checked with `website/tools/check-site.mjs`.
Scope: the 12 fixed routes (6 NL + 6 FR). The only conversion goal is **starting sign-up** (`/nl-be/aanmelden/`, `/fr-be/inscription/`).

Status of inputs: the live site was not reachable. The NL content comes from `source-content-mapping.md` (March 2026). The FR wording and every figure (€326, 20.000+, 4,3/5, 1.200+, 17+ suppliers, prices) **must be checked against the product/legal source before launch**. Items marked **[verify]** are assumptions.

---

## 0. Decisions at a glance

| Topic | Decision |
|---|---|
| Canonical host | `https://www.june.energy`, HTTPS, `www`, trailing slash always (matches `trailingSlash: 'always'`) |
| Locales | `nl-be` → `nl-BE`, `fr-be` → `fr-BE`. `x-default` → the NL equivalent of each page |
| Routing | Explicit folder routes in `src/pages/nl-be/…` and `src/pages/fr-be/…`, plus one shared `src/i18n/routes.ts` map. Astro's i18n config is optional: do not use its fallback or auto-redirect |
| Indexable pages | 10. **noindex, follow**: `aanmelden/` and `inscription/` (also left out of the sitemap). The root `/` redirects |
| Rich results | Organization, WebSite, BreadcrumbList, Product+Offer (plans), FAQPage (FAQ page only). **No AggregateRating markup** for the Google-review score (see §3.4) |
| JS | Zero JS by default. Islands only for the nav toggle, calculator, video enhancer, sign-up form and consent. FAQ uses native `<details>` with no JS |
| Perf gate | Lighthouse mobile ≥ 90, LCP < 2.5 s, CLS < 0.1, INP < 200 ms, TBT < 200 ms |
| Analytics | Cookieless first-party analytics that does not need consent. Marketing pixels load only after opt-in. The consent UI is a fixed overlay (no CLS) that never becomes the LCP element |

---

## 1. Keywords, intent, metadata, linking

### 1.1 Search landscape (Belgium, 2026)

- The generic head terms ("energieleverancier vergelijken", "comparer fournisseur énergie") are dominated by CREG-labelled comparators and regulators: VREG/VNR V-test, CREG Scan, Test-Aankoop/Test-Achats, Mijnenergie, Aanbieders.be, Comparateur-Energie.be, CallMePower, energie.wallonie.be. June should not try to rank as "yet another comparator". It should own the **automatic / ongoing** angle ("automatisch wisselen", "changer automatiquement de fournisseur", "altijd het laagste tarief", "toujours le tarif le plus bas"). The generic terms should appear as supporting vocabulary.
- Intent clusters:
  - **Transactional/brand**: "june energy", "june abonnement prijs", "june switch plus", "june avis / reviews".
  - **Commercial investigation**: "goedkoopste energieleverancier", "fournisseur d'énergie le moins cher", "energieleverancier vergelijken", "comparer énergie Belgique", "beste energiecontract".
  - **Informational / objections**: "veranderen van energieleverancier", "changer de fournisseur d'énergie", "opzegtermijn / préavis", "verbrekingsvergoeding / indemnité de rupture" (none for households), "digitale meter / compteur communicant", "capaciteitstarief / tarif capacitaire", "vast of variabel contract / contrat fixe ou variable", "dynamisch contract / contrat dynamique".
- Regional nuance: the **capaciteitstarief applies in Flanders** (since 2023). Wallonia and Brussels have different grid-tariff rules **[verify the status in 2026]**. Use "capaciteitstarief" in NL content. In FR, "tarif capacitaire" should only appear with a Flanders qualifier, or as an explanation for Walloon/Brussels users, so we don't make inaccurate claims.
- Useful facts for copy/FAQ (verify with the legal team): households can switch at any time, with one month's notice and no break fee. The new supplier handles the switch.

### 1.2 Per-page themes

| Route NL / FR | Primary intent | NL themes | FR themes |
|---|---|---|---|
| `nl-be/` / `fr-be/` | Brand + "automatic switching" | automatisch wisselen van energieleverancier; altijd het goedkoopste energietarief; energieleveranciers vergelijken; besparen op energie(factuur) | changer automatiquement de fournisseur d'énergie; toujours le tarif le moins cher; comparer les fournisseurs d'énergie; économiser sur sa facture d'énergie |
| `abonnementen/` / `abonnements/` | Price / plan choice | June prijs; abonnement energie besparen; June Switch, Switch Plus, Premium; kosten | prix June; abonnement économies d'énergie; formules June; coût |
| `switch-plus/` / `switch-plus/` | Risk-averse / guarantee | winstgarantie; gegarandeerd besparen op energie; besparingsrapport | garantie d'économies; économies garanties sur l'énergie; rapport d'économies annuel |
| `hoe-werkt-het/` / `comment-ca-marche/` | How the switching works, trust | hoe verander je van energieleverancier; overstappen energieleverancier; digitale meter uitlezen; capaciteitstarief | comment changer de fournisseur d'énergie; changement de fournisseur gaz et électricité; compteur communicant; (tarif capacitaire, Flandre) |
| `veelgestelde-vragen/` / `questions-frequentes/` | Objection handling, long tail | is June een energieleverancier; opzegtermijn energiecontract; verbrekingsvergoeding; welke leveranciers; groene stroom | June est-il un fournisseur ?; préavis contrat d'énergie; indemnité de rupture; quels fournisseurs; électricité verte |
| `aanmelden/` / `inscription/` | Conversion (noindex) | — | — |

Rules:
- Each page has one primary theme, used in the title, H1 (or a close variant), the first paragraph and at least one H2.
- Pages must not compete for the same primary term. The home page owns "automatisch wisselen"; the FAQ owns the objection long tail.
- The FR copy is **written natively, not translated word for word**. Belgian FR uses "fournisseur d'énergie", "compteur", "facture", "GRD" and "gestionnaire de réseau". Avoid French-French terms such as "Linky".
- Claims like "gemiddeld €326 per jaar" and "économisez en moyenne 326 €" need a visible footnote with the method and period. This substantiation is required by Belgian consumer law (WER Book VI) and also helps E-E-A-T.

### 1.3 Title / meta / H1 templates

The pattern is `{Primary theme} | June` (≤ 60 characters, brand last). The home page may put the brand first. Meta descriptions are 140–155 characters with the value proposition, a proof point and an implicit call to action. They must be unique for every route.

| Route | `<title>` | Meta description (draft) | H1 (draft) |
|---|---|---|---|
| nl-be/ | June: automatisch het goedkoopste energietarief | June vergelijkt elke maand alle Belgische energieleveranciers en wisselt automatisch voor jou. Gemiddeld €326 per jaar besparen, zonder gedoe. | Automatisch wisselen naar de goedkoopste energieleverancier |
| fr-be/ | June : toujours le tarif d'énergie le moins cher | June compare chaque mois tous les fournisseurs d'énergie belges et change automatiquement pour vous. En moyenne 326 € d'économies par an. | Changez automatiquement pour le fournisseur d'énergie le moins cher |
| nl-be/abonnementen/ | Abonnementen en prijzen \| June | Kies Switch (€5,75/maand), Switch Plus met winstgarantie of Premium met dongle. Jaarlijks gefactureerd, altijd opzegbaar [verify]. | Kies je June-abonnement |
| fr-be/abonnements/ | Formules et prix \| June | Switch (5,75 €/mois), Switch Plus avec garantie d'économies ou Premium avec dongle. Facturé annuellement. | Choisissez votre formule June |
| nl-be/switch-plus/ | Switch Plus: besparen met winstgarantie \| June | Bespaar je niet meer dan je abonnement kost? Dan krijg je €99 terug. Inclusief jaarlijks besparingsrapport. €8,25/maand. | Besparen met gegarandeerd resultaat |
| fr-be/switch-plus/ | Switch Plus : économies garanties \| June | Si vous n'économisez pas plus que le prix de l'abonnement, June vous rembourse 99 €. Rapport annuel inclus. 8,25 €/mois. | Des économies garanties |
| nl-be/hoe-werkt-het/ | Hoe werkt automatisch wisselen? \| June | Koppel je meter, June vergelijkt dagelijks de markt en regelt de volledige overstap. Zo werkt June, stap voor stap. | Zo zorgt June altijd voor het laagste energietarief |
| fr-be/comment-ca-marche/ | Comment fonctionne le changement automatique ? \| June | Connectez votre compteur, June compare le marché chaque jour et gère tout le changement de fournisseur. Voici comment. | Comment June vous garantit toujours le meilleur tarif |
| nl-be/veelgestelde-vragen/ | Veelgestelde vragen over June | Is June een energieleverancier? Wat met je opzegtermijn en je digitale meter? Antwoorden op alle vragen over wisselen met June. | Veelgestelde vragen |
| fr-be/questions-frequentes/ | Questions fréquentes sur June | June est-il un fournisseur ? Préavis, compteur communicant, prix : toutes les réponses sur le changement avec June. | Questions fréquentes |
| nl-be/aanmelden/ | Aanmelden \| June | Start je aanmelding bij June in 2 minuten. | Start met besparen |
| fr-be/inscription/ | Inscription \| June | Commencez votre inscription June en 2 minutes. | Commencez à économiser |

Other head tags on every page:
- `og:title`, `og:description`, `og:url` (= canonical), `og:image` (1200×630, localised text), `og:locale` (`nl_BE` / `fr_BE`), `og:locale:alternate`, and `twitter:card=summary_large_image`.
- `theme-color`, and `color-scheme` (only if the variant supports dark mode).
- `<meta name="viewport" content="width=device-width, initial-scale=1">` with no `maximum-scale` or `user-scalable=no` (these fail WCAG 1.4.4).
- Exactly **one H1** per page, which check-site already enforces. The H1 is text, not an image or SVG.

### 1.4 Internal linking plan

```
Home ──► Abonnementen ──► Switch Plus
 │  │         │                 │
 │  └► Hoe werkt het ◄──────────┤
 │          │                   │
 └► FAQ ◄───┴───────────────────┘
All of the above ──► Aanmelden (primary CTA, noindex)
```

| From | Must link to (descriptive anchor text) |
|---|---|
| Home | Abonnementen ("Bekijk de abonnementen"), Hoe werkt het ("Zo werkt June"), Switch Plus (the guarantee teaser), FAQ (the mini-FAQ's "Alle vragen"), Aanmelden (hero + final CTA) |
| Abonnementen | Aanmelden with a plan parameter for each plan (`?plan=switch`, `switch-plus`, `premium`), Switch Plus detail, FAQ entries on pricing/cancellation (fragment links such as `#opzeggen`), Hoe werkt het |
| Switch Plus | Abonnementen ("Vergelijk alle abonnementen"), Aanmelden `?plan=switch-plus`, FAQ `#winstgarantie` |
| Hoe werkt het | Abonnementen, Aanmelden, FAQ (meter / capaciteitstarief entries) |
| FAQ | Aanmelden, Hoe werkt het, Abonnementen. Answers link contextually |
| Aanmelden | Minimal chrome: logo → home, a privacy link and a FAQ link opening in the same tab. No full mega-nav (fewer exits) |
| Header nav | Abonnementen, Switch Plus, Hoe werkt het, FAQ, language switch, CTA "Start"/"Commencer" → sign-up |
| Footer | All 10 indexable pages in the current locale, legal/privacy/cookies, login (external, `rel="nofollow"` is not needed), the language switch |

Rules:
- Use plain `<a href>` links with the trailing slash, as crawlable HTML. No JS-only navigation. Never link cross-locale except from the language switcher.
- Query strings are allowed only on sign-up links. The sign-up canonical strips them.
- No "klik hier" / "cliquez ici". Anchor text states the destination.
- Legacy URLs from the current site need **301s** at the host or CDN, not meta-refresh. Suggested mapping:
  - `/nl-be/switch` → `/nl-be/abonnementen/`
  - `/nl-be/premium` → `/nl-be/abonnementen/`
  - `/nl-be/switch-plus` → `/nl-be/switch-plus/`
  - `/nl-be/hoe-werkt-het` → `/nl-be/hoe-werkt-het/`
  - `/nl-be/reviews`, `/nl-be/visie`, `/nl-be/prijzen` → the closest equivalent (home or abonnementen)
  - FR legacy slugs mapped the same way **[verify the FR legacy slugs]**
  - Every non-slash URL → the slash URL

### 1.5 Indexing

- The sign-up pages use `<meta name="robots" content="noindex, follow">` and a self-referencing canonical without query parameters. They are left out of `sitemap.xml`. **Do not** block them in `robots.txt`, or Google can't see the noindex.
- Hreflang stays on the sign-up pages. It does no harm, keeps the language switcher consistent, and the current check-site gate requires it on every route.
- Root `/`: in production, a **301 at the host** to `/nl-be/`. As a static fallback, the template's `Astro.redirect` produces a meta-refresh page. That page should also carry `noindex` and `<link rel="canonical" href="https://www.june.energy/nl-be/">`. Do not guess the language from `Accept-Language` on the server: Googlebot crawls without it.
- `robots.txt`: `User-agent: * / Allow: /` plus `Sitemap: https://www.june.energy/sitemap-index.xml` (or `/sitemap.xml`).
- Staging and the review hub (`BASE=/v/a/`): send a `noindex` header or meta and keep canonicals pointing at production. Never ship staging canonicals.
- The 404 page is localised, returns HTTP 404, carries noindex, and links to both home pages.

---

## 2. Internationalisation

### 2.1 Page pairs (single source of truth)

| key | nl-BE | fr-BE |
|---|---|---|
| home | `/nl-be/` | `/fr-be/` |
| plans | `/nl-be/abonnementen/` | `/fr-be/abonnements/` |
| switchPlus | `/nl-be/switch-plus/` | `/fr-be/switch-plus/` |
| how | `/nl-be/hoe-werkt-het/` | `/fr-be/comment-ca-marche/` |
| faq | `/nl-be/veelgestelde-vragen/` | `/fr-be/questions-frequentes/` |
| signup | `/nl-be/aanmelden/` | `/fr-be/inscription/` |

### 2.2 `src/i18n/routes.ts` (recommended shape)

```ts
export const SITE = 'https://www.june.energy';
export const LOCALES = { 'nl-be': { hreflang: 'nl-BE', htmlLang: 'nl-BE', og: 'nl_BE', label: 'Nederlands', short: 'NL' },
                         'fr-be': { hreflang: 'fr-BE', htmlLang: 'fr-BE', og: 'fr_BE', label: 'Français',   short: 'FR' } } as const;
export type Locale = keyof typeof LOCALES;
export const ROUTES = {
  home:       { 'nl-be': '',                     'fr-be': '' },
  plans:      { 'nl-be': 'abonnementen/',        'fr-be': 'abonnements/' },
  switchPlus: { 'nl-be': 'switch-plus/',         'fr-be': 'switch-plus/' },
  how:        { 'nl-be': 'hoe-werkt-het/',       'fr-be': 'comment-ca-marche/' },
  faq:        { 'nl-be': 'veelgestelde-vragen/', 'fr-be': 'questions-frequentes/' },
  signup:     { 'nl-be': 'aanmelden/',           'fr-be': 'inscription/' },
} as const;
export type RouteKey = keyof typeof ROUTES;
export const NOINDEX: RouteKey[] = ['signup'];
// Internal links: respect BASE for the review hub.
export const href = (k: RouteKey, l: Locale) => `${import.meta.env.BASE_URL}${l}/${ROUTES[k][l]}`;
// Canonical / hreflang / JSON-LD / sitemap: ALWAYS absolute production URLs, never BASE.
export const abs = (k: RouteKey, l: Locale) => `${SITE}/${l}/${ROUTES[k][l]}`;
export const alternates = (k: RouteKey) => [
  ...Object.entries(LOCALES).map(([l, v]) => ({ hreflang: v.hreflang, href: abs(k, l as Locale) })),
  { hreflang: 'x-default', href: abs(k, 'nl-be') },
];
```

- Every page passes its `routeKey` and `locale` to `Base.astro`. The layout derives `lang`, canonical, hreflang, OG locale, the switcher target, breadcrumb and robots from those. Pages never hand-write these URLs.
- Add a build-time assertion (or a unit test) that every `src/pages/{locale}/**/index.astro` exists in `ROUTES` and the reverse. The check-site route list and `ROUTES` must stay identical.
- The current `Base.astro` takes `lang` only. Extend it to `{ locale, routeKey, title, description, jsonLd?, noindex? }`.
- `astro.config.mjs`: add `site: 'https://www.june.energy'`, which is needed for `Astro.site` and sitemaps. Keep `trailingSlash: 'always'` and `build.format: 'directory'`. If Astro's `i18n` block is used, the only settings are `locales: ['nl-be','fr-be']`, `defaultLocale: 'nl-be'` and `routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false }`. **Astro's i18n does not translate slugs**, so `routes.ts` stays the source of truth either way.

### 2.3 Head output (for each page, both locales)

```html
<html lang="nl-BE">
<link rel="canonical" href="https://www.june.energy/nl-be/abonnementen/">
<link rel="alternate" hreflang="nl-BE" href="https://www.june.energy/nl-be/abonnementen/">
<link rel="alternate" hreflang="fr-BE" href="https://www.june.energy/fr-be/abonnements/">
<link rel="alternate" hreflang="x-default" href="https://www.june.energy/nl-be/abonnementen/">
```

Rules:
- The canonical is always **self-referencing**: absolute, `https://www.`, with a trailing slash and no query or fragment. Never canonicalise FR to NL.
- The hreflang set is **identical and reciprocal** on both pages of a pair, and each page includes itself.
- `x-default` points to NL, the larger audience. It could point to a language chooser page if one is ever added.
- `<html lang>` uses the BCP 47 region form (`nl-BE` / `fr-BE`). The template already does this.
- If a sitemap is used, it carries the same alternates (`xhtml:link`) as the page. Head and sitemap must never disagree.

### 2.4 Language switcher

- It links to the **equivalent** page: `alternates(routeKey)`. It never links to the other home page.
- Markup: `<a href="/fr-be/abonnements/" hreflang="fr-BE" lang="fr-BE">Français</a>` (or "FR" with `aria-label="Français"`). The current language is `aria-current="true"` text, not a link. Use `lang` on the other-language label (WCAG 3.1.2).
- It is a plain link that needs no JS. Do not use a `<select>` that navigates on change.
- On sign-up, keep `?plan=` and other non-PII query parameters when switching. Form data is not carried across (tell the user if a step would reset).
- **No automatic redirect** based on browser language or IP. An optional non-blocking hint ("Deze pagina bestaat ook in het Nederlands") may appear once, stored in `localStorage` in a try/catch. It must not cause layout shift: overlay, or a reserved slot.
- Legal and privacy pages also exist per language (outside the 12 routes, but the footer links must go to the current locale).

---

## 3. Structured data (JSON-LD)

Emit **one `<script type="application/ld+json">` with an `@graph`** per page, built in the layout from typed helpers. Give entities stable `@id`s so pages reference each other. Language-specific fields (`name`, `description`, `inLanguage`) follow the page locale. Validate every page with the Rich Results Test and the Schema.org validator before release.

### 3.1 Site-wide (every page)

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": "https://www.june.energy/#org", "name": "June", "legalName": "[verify]",
    "url": "https://www.june.energy/", "logo": { "@type": "ImageObject", "url": "https://www.june.energy/logo-512.png", "width": 512, "height": 512 },
    "sameAs": ["[LinkedIn]", "[Facebook]", "[Instagram]", "[Google Business Profile URL]"],
    "areaServed": { "@type": "Country", "name": "BE" },
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["nl", "fr"], "email": "[verify]" },
    "vatID": "[BE0… verify]" },
  { "@type": "WebSite", "@id": "https://www.june.energy/#website", "url": "https://www.june.energy/", "name": "June",
    "publisher": { "@id": "https://www.june.energy/#org" }, "inLanguage": ["nl-BE", "fr-BE"] },
  { "@type": "WebPage", "@id": "<canonical>#webpage", "url": "<canonical>", "name": "<title>", "inLanguage": "nl-BE",
    "isPartOf": { "@id": "https://www.june.energy/#website" }, "breadcrumb": { "@id": "<canonical>#breadcrumb" } }
]}
```

- No `SearchAction` (Google retired the sitelinks search box, and the site has no search).
- Use only an `Organization` node. June is an intermediary, so don't mark it up as an energy `LocalBusiness` or supplier.

### 3.2 BreadcrumbList (every page except home)

The position is logical, not tied to the URL:
- Home › Abonnementen
- Home › Abonnementen › Switch Plus
- Home › Hoe werkt het
- Home › Veelgestelde vragen
- Home › Aanmelden

The FR set uses the same structure with FR names and URLs. The same trail is also shown **visually** as a small `<nav aria-label="Kruimelpad|Fil d'Ariane">` with `<ol>`. It is optional on sign-up.

### 3.3 Product / Offer (abonnementen: all plans; switch-plus: Switch Plus only)

June sells a subscription service. Google shows Product snippets (price) for `Product` markup, and `Service` has no rich result. Use `Product` with `category: "Energy switching service"`, and make sure the visible content matches exactly.

```json
{ "@type": "Product", "@id": "https://www.june.energy/nl-be/abonnementen/#switch-plus",
  "name": "June Switch Plus", "brand": { "@id": "https://www.june.energy/#org" },
  "description": "Automatisch wisselen van energieleverancier met winstgarantie en jaarlijks besparingsrapport.",
  "image": "https://www.june.energy/og/switch-plus.png",
  "offers": { "@type": "Offer", "url": "https://www.june.energy/nl-be/aanmelden/?plan=switch-plus",
    "price": "99.00", "priceCurrency": "EUR", "availability": "https://schema.org/InStock",
    "eligibleRegion": { "@type": "Country", "name": "BE" }, "seller": { "@id": "https://www.june.energy/#org" },
    "priceSpecification": [
      { "@type": "UnitPriceSpecification", "price": "99.00", "priceCurrency": "EUR", "valueAddedTaxIncluded": true,
        "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "ANN" }, "billingDuration": "P1Y" },
      { "@type": "UnitPriceSpecification", "price": "8.25", "priceCurrency": "EUR", "valueAddedTaxIncluded": true,
        "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" },
        "priceType": "https://schema.org/ListPrice", "description": "Maandelijks equivalent, jaarlijks gefactureerd" } ] } }
```

| Plan | €/month shown | Billed yearly = `Offer.price` |
|---|---|---|
| Switch | 5,75 | 69.00 |
| Switch Plus | 8,25 | 99.00 |
| Premium | 16,50 | 198.00 |

Caveats:
- `Offer.price` = the amount actually charged (yearly). **The page must visibly show "€69 per jaar" / "69 € par an"** next to the monthly figure. Otherwise Google flags a price mismatch, and B2C consumer law requires the total price anyway.
- Prices include VAT (`valueAddedTaxIncluded: true`) **[verify]**.
- Use a dot as the decimal separator in JSON and a comma in the visible NL/FR text.
- Don't add `priceValidUntil` unless it is real. Don't use `shippingDetails` or `hasMerchantReturnPolicy` (not physical goods). The Premium dongle **[verify whether it is shipped]** would only matter for merchant listings, which we don't target.
- The €99 guarantee is not a price. Describe it in `description`, not in `Offer`.

### 3.4 AggregateRating / Review — policy caveats (decision: do NOT mark up)

- Google's review-snippet policy says **self-serving reviews** (a business marking up reviews about itself on its own Organization or LocalBusiness pages) are not eligible for stars.
- Google also says **not to aggregate ratings sourced from other sites**. The "4,3/5, 1.200+ Google reviews" figure is third-party data, so marking it up on Product/Organization is a structured-data spam risk and could lead to a manual action.
- Show the rating **visually only**: stars as an SVG with `role="img"` and `aria-label="4,3 van 5 sterren"`, the review count, the source ("Google"), an "as of" date, and a link to the Google Business Profile. Keep the figure current. A stale number is misleading advertising.
- `AggregateRating` becomes an option only if June collects reviews first-party, **on this site**, about a specific plan (Product), with the rating and count shown on that page. Even then, Organization-level stars won't show.

### 3.5 FAQPage (`veelgestelde-vragen/`, `questions-frequentes/` only)

- Each `Question` + `acceptedAnswer` mirrors the visible text exactly, answer included. The answer stays in the DOM even when the `<details>` is collapsed, which is fine. Keep links in answers as plain `<a>`.
- Since 2023 Google only shows FAQ rich results for authoritative government and health sites. So there is **no SERP benefit**. The markup is still valid and helps other search/AI surfaces, so keep it, but only on the FAQ page. Don't repeat the home page's mini-FAQ Q&As as a second FAQPage.
- **No HowTo** markup on "hoe werkt het" (the HowTo rich result is deprecated). Use `WebPage` plus an optional `VideoObject` for the explainer video (`name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`/`embedUrl`), localised per page.

---

## 4. Performance budget (premium, animated, still fast)

### 4.1 Targets (mobile, Lighthouse simulated throttling, 390×844 as in check-site)

| Metric | Gate | Stretch |
|---|---|---|
| Lighthouse Performance | ≥ 90 | ≥ 95 |
| LCP | < 2.5 s | < 1.8 s |
| CLS | < 0.1 | < 0.02 |
| TBT (lab proxy for INP) | < 200 ms | < 100 ms |
| INP (field / manual) | < 200 ms | < 100 ms |
| FCP | < 1.8 s | < 1.2 s |
| HTML (gz) | ≤ 40 KB | |
| CSS total (gz) | ≤ 35 KB, render-blocking ≤ 20 KB | inline critical CSS |
| JS per page (gz, first-party) | home/plans ≤ 25 KB, sign-up ≤ 45 KB, others ≤ 10 KB | 0 KB on FAQ/how |
| Fonts | ≤ 3 files, ≤ 110 KB total, 1 preload | |
| Page weight (initial, excl. deferred video) | ≤ 700 KB | ≤ 450 KB |
| Third-party JS before consent | 0 KB (analytics excepted, ≤ 3 KB and deferred) | |

### 4.2 JavaScript: islands only

- Astro default: **no hydration**. Allowed islands:
  1. **Nav**: mobile menu toggle. Vanilla `<script>`, ≤ 2 KB. Uses `<button aria-expanded>` plus `inert`/focus handling. It could use a `<dialog>` or the Popover API instead.
  2. **Savings calculator**: `client:visible` (or a vanilla module loaded when it scrolls into view). Preact or vanilla only, never React (about 45 KB). Debounce the computation. Its output is not the LCP element.
  3. **FAQ accordion**: **no JS**. Native `<details name="faq">` (the exclusive accordion via `name` has broad support now) with `<summary>`. Animate with `interpolate-size`/`::details-content` as progressive enhancement.
  4. **Video enhancer**: a small inline script that attaches the hero video source when the policy in §4.5 allows it.
  5. **Sign-up form**: `client:load` on sign-up only. Validation starts from native constraint validation, enhanced with JS.
  6. **Consent banner**: ≤ 5 KB, see §6.
- No jQuery, carousel libraries or animation libraries (GSAP, Lottie) on the critical path. If Lottie is essential, lazy-load it with `client:visible`, add a reduced-motion guard, and budget it separately.
- The testimonials "carousel" is a CSS scroll-snap row with prev/next buttons. Never auto-rotate (WCAG 2.2.2).
- Mark long tasks as a failure: no task > 50 ms after load on mobile.

### 4.3 Fonts: self-hosted Montserrat (display) + Inter (text)

- Self-host WOFF2 files and use **variable fonts** (Montserrat wght 600–800 range, Inter wght 400–600). The alternative is at most two static weights each.
- Subset to Latin plus what NL/FR needs: `U+0000-00FF, U+0131, U+0152-0153 (Œœ), U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F (’ “ ” – — … •), U+20AC (€), U+2122, U+2212, U+FEFF, U+FFFD`. Declare the matching `unicode-range`. Keep ë ï é è ê ç à ù ô (all in Latin-1). Drop Cyrillic, Greek and Vietnamese.
- **Preload only the font used by the LCP H1** (`<link rel="preload" as="font" type="font/woff2" crossorigin>`). Inter is discovered naturally.
- `font-display: swap` plus **metric-matched fallbacks** (`@font-face { font-family: "Montserrat Fallback"; src: local("Arial"); size-adjust; ascent-override; descent-override; line-gap-override }`) to avoid CLS on swap. Generate the values with `@capsizecss` / fontaine. Alternative: `font-display: optional` for Inter body text if the design accepts a fallback on the first cold view.
- No Google Fonts CDN (it is a privacy issue in the EU and an extra connection). Serve fonts with `Cache-Control: public, max-age=31536000, immutable` under hashed names.

### 4.4 Images

- Use `astro:assets` only: `<Picture formats={['avif','webp']} widths={[400,800,1200,1600]} sizes="…">`. Always set `width`/`height` (or `aspect-ratio`) so there is zero CLS. Include `alt` (empty for decorative images).
- **LCP image**: `loading="eager"`, `fetchpriority="high"`, and `decoding="async"` is fine. No lazy-loading above the fold. Preload it with `imagesrcset`/`imagesizes` only if it isn't discoverable in the HTML.
- Everything below the fold uses `loading="lazy"`.
- Quality: AVIF around 50–60, WebP around 75. Hero ≤ 120 KB at 800w mobile.
- Supplier/partner logos: an optimised **SVG** sprite or inline SVG (SVGO), monochrome with `currentColor`, `role="img"` plus `<title>` or a visible list. They are trademarks, so check the usage rights **[verify]**.
- OG images: static per page per locale, 1200×630, generated at build time.
- Check-site uses `deviceScaleFactor: 3`, so `sizes` must be accurate or Lighthouse will download 1200w+ images on mobile.

### 4.5 Video hero policy

- The **poster image is the LCP element**: an `astro:assets` AVIF/WebP, rendered as `<img>` (not only the `poster` attribute, which gets lower priority). The video, when played, fades in above it.
- Default markup is `<video muted playsinline loop preload="none" aria-hidden="true">` with **no `src` in the HTML**. After `load` (or `requestIdleCallback`), a script attaches `<source>` elements (AV1/VP9 WebM + H.264 MP4, 720p, ≤ 1.5 MB, 8–12 s) **only if all of these hold**:
  - `matchMedia('(min-width: 768px)')` matches, so it is **never on mobile**;
  - `prefers-reduced-motion: no-preference`;
  - `navigator.connection?.saveData` is not true;
  - `effectiveType` is not `slow-2g`, `2g` or `3g`;
  - `prefers-reduced-data` is not set (where supported).
- Autoplaying background video longer than 5 s needs a visible **pause/play button** (WCAG 2.2.2), with a label that is keyboard reachable and localised.
- The background video is decorative (`aria-hidden`). Meaning must not depend on it.
- The **explainer video** on hoe-werkt-het / comment-ca-marche uses a click-to-play facade (poster + play button). There is no third-party iframe until the user clicks. If YouTube is used, use `youtube-nocookie` and load it only after click (it is a consent-relevant third party). It needs **captions in NL and FR** (WCAG 1.2.2) and a transcript or text summary on the page, which also helps SEO.

### 4.6 Animation approach

- Use CSS only for `transform`/`opacity`. Never animate layout properties (`top`, `height`, `width`, `margin`), because that causes CLS and jank.
- **Never start the LCP element (H1, hero image) at `opacity: 0`**. Hero entrance effects may animate `transform` only, or apply to secondary elements. LCP is recorded when the element paints.
- Scroll reveals: CSS scroll-driven animations (`animation-timeline: view()`) inside `@supports`. The fallback is a single shared IntersectionObserver (≤ 1 KB). Content is visible by default; animations are added only when JS or `@supports` allows. No "hidden until JS runs".
- Page transitions: **cross-document View Transitions** via CSS `@view-transition { navigation: auto; }`. This needs no JS and degrades gracefully. Name shared elements (logo, primary CTA) with `view-transition-name`. **Avoid** Astro's `<ClientRouter />` unless SPA-like behaviour is truly needed: it adds JS and complicates analytics pageviews and focus management.
- `@media (prefers-reduced-motion: reduce)`:
  - disable scroll reveals, parallax, auto-advancing counters and view-transition animations (`::view-transition-group(*) { animation: none }`);
  - keep instant state changes;
  - don't autoplay video.
  Check-site already runs with `reducedMotion: 'reduce'` and requires the media query in CSS.
- Number count-ups (€326, 20.000+) render the final value in the HTML. Animation is decorative, and screen readers get the final number.
- Keep the INP budget: use `content-visibility: auto` on long below-fold sections (with `contain-intrinsic-size` to avoid CLS). Keep handlers cheap and passive listeners, and don't put scroll listeners on the main thread.

### 4.7 Delivery

- Hashed assets under `/_astro/` get `immutable` for 1 year. HTML gets `max-age=0, must-revalidate` (the CDN can cache with purge on deploy).
- Brotli, HTTP/2 or 3, HSTS. Security headers: CSP (allow only first-party plus the consented vendors), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Content-Type-Options`. These all feed Lighthouse Best Practices.
- `<link rel="preconnect">` only for origins used above the fold, ideally none.
- Use `build.inlineStylesheets: 'auto'` (the Astro default) to inline small CSS.

---

## 5. Accessibility (WCAG 2.2 AA), marketing-site specifics

Check-site already gates axe serious/critical violations, contrast, text ≥ 12px and `lang`. The items below go further.

**Global**
- **Skip link** is the first focusable element: "Naar de inhoud" / "Aller au contenu" → `#main`. It is visible on focus.
- Landmarks: one `<header>`, `<nav aria-label>` (main, footer, breadcrumb and language each labelled differently), `<main id="main" tabindex="-1">`, `<footer>`.
- Heading order has no skipped levels: one H1, then H2 per section.
- **Focus visible**: a custom `:focus-visible` ring with ≥ 3:1 contrast against both adjacent colours, ≥ 2px, never `outline: none` without a replacement.
  - **Focus not obscured (2.4.11)**: the sticky header and the consent banner must not cover the focused element. Use `scroll-padding-top` equal to the header height, and the banner must not overlap focusable content, or must be dismissible and pushed out of the way.
- **Target size (2.5.8)**: interactive targets ≥ 24×24 CSS px (aim for 44×44 on primary CTAs, nav, the language switch, carousel buttons, the video pause button and FAQ summaries). Inline text links are exempt.
- **Dragging (2.5.7)**: any slider in the calculator also has a numeric input or +/- buttons.
- **Language of parts (3.1.2)**: brand/product names are fine as they are. Use `lang="fr-BE"` on the "Français" switcher label, `lang="nl-BE"` on "Nederlands", and `lang="en"` on any English phrases ("Switch Plus" can stay, but on taglines like "peace of mind").
- Text is resizable to 200%, and content reflows at 320 CSS px (1.4.10). Check-site's 390px overflow gate covers most of this, so also test at 320.
- Colour is never the only signal. That covers the "best value" plan badge, error states and savings up/down.
- Motion: pause control for the video (2.2.2). No flashing. `prefers-reduced-motion` is respected (2.3.3 is AAA but cheap).
- **Consistent help (3.2.6)**: help/contact/FAQ links appear in the same place on every page, including sign-up.

**FAQ accordion**
- Use native `<details>/<summary>`. The summary text is the question. Wrap each question in an `<h3>` inside the summary, or put an `<h2>` per category above the list.
- The open/closed state is announced natively. Don't add conflicting ARIA.
- A custom disclosure (if one is ever needed) uses `<button aria-expanded aria-controls>` inside a heading, with the panel toggled by `hidden`. Consider `hidden="until-found"` so find-in-page and deep links (`#opzeggen`) open the answer.
- Deep links to a question open that `<details>` on load. This is a small inline script, and progressive.

**Calculator**
- Wrap it in `<form>` with a `<fieldset>`/`<legend>`. Every input has a visible `<label>` (not placeholder-only) and units in the label or via `aria-describedby` ("kWh per jaar").
- Use `inputmode="numeric"` and sensible `min`/`max`/`step`.
- The result goes in `<output for="…" aria-live="polite">`. Announce once per settled change (debounce 500 ms), not on every keystroke.
- Keyboard: every control is operable, with no custom sliders unless they follow the ARIA slider pattern (`role="slider"`, `aria-valuenow`/`valuetext` with "€" text).
- Result disclaimer text is visible and linked to the method.

**Sign-up form (aanmelden / inscription)**
- Every field has a visible `<label for>`. Group related fields with `fieldset`/`legend` (address, meter type, plan).
- `autocomplete` tokens: `given-name`, `family-name`, `email`, `tel`, `postal-code`, `street-address`, `address-level2`. Use `inputmode`/`type` (`email`, `tel`). This meets 1.3.5 and speeds up completion.
- Required fields are marked in text ("verplicht" / "obligatoire"), not only with `*`. Use `aria-required` or the native `required`.
- **Errors (3.3.1/3.3.3)**:
  - Validate on blur or submit, not on every keystroke.
  - The error text sits next to the field, linked with `aria-describedby`, and the field gets `aria-invalid="true"`.
  - On submit, show an error summary at the top (`role="alert"` or focus moved to a summary heading) with links to each field.
  - Messages say how to fix the problem, e.g. "Vul een Belgische postcode in (4 cijfers)".
- **Redundant entry (3.3.7)**: don't ask twice for data already given in the flow. Pre-fill the plan from `?plan=`.
- **Accessible authentication (3.3.8)**: if there is a login or OTP, allow paste and password managers, with no cognitive puzzles or CAPTCHA without an alternative.
- Multi-step: show progress as text ("Stap 2 van 4"). Move focus to the step heading on step change. The Back button keeps data. Update the document title per step ("Stap 2 van 4 – Aanmelden | June").
- No timeouts. If one is unavoidable, warn and allow extending it (2.2.1).
- The consent checkbox for terms is a real checkbox, not pre-ticked, with the terms linked. Marketing opt-in is separate and unticked (GDPR).

---

## 6. Analytics, events and consent

### 6.1 Legal frame (Belgium)

- Cookies and device storage fall under ePrivacy art. 5(3), as implemented in Belgian law and enforced by the GBA/APD. Only **strictly necessary** storage is exempt. The GBA treats analytics cookies as **needing consent**.
- Consent must be free, specific, informed and unambiguous. There are no pre-ticked boxes. **"Weigeren/Refuser" must be as easy and as prominent as "Accepteren/Accepter"** on the first layer. There is no cookie wall and no "by continuing to browse". Users can withdraw consent as easily as they gave it (a persistent "Cookie-instellingen" link in the footer). Keep a consent record, and re-ask after ≤ 6–12 months (the GBA recommends a limited duration) **[verify with DPO]**.

### 6.2 Architecture

1. **Base layer, with no consent needed (target)**: a first-party **cookieless** analytics tool with no identifiers stored on the device, IP truncation, EU hosting and aggregate-only data. Examples: Plausible or Fathom (EU), Matomo in cookieless mode, or a self-hosted collector through a first-party `/api/e` endpoint. Have the DPO/legal confirm that this counts as exempt under Belgian practice **[verify]**. If they don't confirm it, load this layer after consent as well.
2. **Marketing layer, with consent**: Google Ads / GA4 (Consent Mode v2 with `default: denied`), Meta pixel, LinkedIn. These load **only after opt-in**, via one loader, with no tags in the HTML before consent.
3. Server-side confirmation of `signup_completed` from the backend (the source of truth). Client events are for funnel diagnostics only.

### 6.3 Event plan (no PII in any event)

| Event | Fired when | Properties |
|---|---|---|
| `pageview` | Each page load | `locale`, `route_key`, `referrer_host`, `utm_*` (from the URL; not stored on the device) |
| `cta_click` | Any sign-up CTA click | `location` (`hero`/`nav`/`plans`/`final`/`faq`), `plan?`, `route_key` |
| `plan_select` | Plan card chosen on abonnementen | `plan` |
| `calculator_used` | First settled calculation | `band` (bucketed savings, e.g. `0-100`/`100-300`/`300+`), no raw consumption |
| `faq_open` | `<details>` toggle open | `question_id` |
| `video_play` | Explainer played | `route_key`, `percent` milestones 25/50/75/100 |
| `lang_switch` | Switcher used | `from`, `to`, `route_key` |
| **`signup_started`** | **Sign-up page viewed with a visible, interactive form** (first render of step 1). This is the **primary conversion (KPI)** | `locale`, `plan`, `entry_route_key` (from `document.referrer` mapped via `routes.ts`) |
| `signup_step_viewed` | Each step shown | `step` (1..n), `step_name` |
| `signup_step_completed` | A step validated and advanced | `step`, `duration_bucket` |
| `signup_error` | Validation error shown | `step`, `field` (field name, **never the value**), `error_type` |
| `signup_submitted` | Final submit (client) | `plan` |
| `signup_completed` | Backend confirms | `plan` (server-side) |

- Funnel: `pageview` → `cta_click` → `signup_started` → `signup_step_completed[1..n]` → `signup_submitted` → `signup_completed`. Report it per locale, plan and entry page.
- If "start" must mean interaction instead of a view, add `signup_first_input` (first field focus) as a secondary metric. Keep the definition fixed across variants so the variants can be compared.
- Postal code: send only the derived **region** (`VL`/`WAL`/`BXL`), and only if it's needed for reporting.
- Send events via `navigator.sendBeacon`/`fetch keepalive` so they never block navigation or INP. Wrap all calls in try/catch, because blocked analytics must not break the site.
- A/B variants: pass `variant` as a property, not via cookies, unless consent covers it.

### 6.4 Consent UI without hurting LCP/CLS

- Render the banner markup **server-side in the HTML** (no late-injected DOM), as `position: fixed` bottom sheet/overlay. Fixed-position elements don't cause layout shift. **Never push content** by inserting a top bar.
- Keep the copy short (≤ 2 lines on mobile) in a font size **smaller than the hero H1/paragraph**, so the banner never becomes the LCP element. Don't fade it in from `opacity: 0` with a delay.
- A tiny inline head script (≤ 500 B) reads the stored choice and sets `data-consent` on `<html>` before first paint. The banner is hidden by CSS when a choice exists, so there is no flash and no shift.
- First layer: "Accepteren" | "Weigeren" | "Instellingen", with equal visual weight. The details layer is a native `<dialog>`: focus is trapped and returned, Esc closes it, and it is labelled.
- It must not cover the primary CTA or the focused element on mobile (2.4.11). It gets `role="region"` with `aria-label="Cookies"`, not a modal, so the page stays usable.
- Localise NL/FR from `routes.ts`/copy files. Store the consent in a first-party cookie or localStorage with version and timestamp.

---

## 7. QA & evaluation checklist (technical / SEO)

Run on every variant: `npm run check -- variants/x --lighthouse --shots`, plus the manual items.

**Indexing & metadata**
- [ ] All 12 routes return 200 with a trailing slash. Non-slash URLs return 301 at the host (manual). The 404 page returns 404 and noindex.
- [ ] Unique `<title>` (≤ 60 characters) and meta description (70–160) per route. Titles differ between NL and FR and between pages.
- [ ] Exactly one H1, and it contains the page's primary theme. Headings are hierarchical.
- [ ] Canonical present, absolute `https://www.june.energy/…/`, self-referencing, no query, no BASE path.
- [ ] Hreflang: `nl-BE`, `fr-BE` and `x-default` on every page, **reciprocal** (A→B and B→A), pointing to 200 routes, matching `routes.ts`.
- [ ] `<html lang>` matches the route prefix (`/nl-be/` → `nl-BE`).
- [ ] Sign-up routes: `noindex, follow`, not in the sitemap, not blocked in robots.txt. All other routes are indexable (no stray noindex).
- [ ] `robots.txt` and `sitemap.xml` present in production builds. The sitemap lists exactly the 10 indexable URLs with alternates.
- [ ] OG/Twitter tags present with the locale. The OG image exists and is 1200×630.
- [ ] Language switcher links to the equivalent page, and has `hreflang` and `lang` attributes.
- [ ] Internal links: no 404s, no links missing the trailing slash, no cross-locale links outside the switcher. Every indexable page is reachable in ≤ 2 clicks from home.
- [ ] Copy: claims (€326, 20.000+, 4,3/5) have a source/footnote. Prices show both monthly and yearly totals, VAT included.

**Structured data**
- [ ] Valid JSON-LD on every page (it parses; Rich Results Test has no errors).
- [ ] Organization and WebSite on every page. BreadcrumbList on subpages, matching the visible breadcrumb.
- [ ] Product/Offer on abonnementen and switch-plus: `Offer.price` equals the visible yearly price, and the currency is EUR.
- [ ] FAQPage on the FAQ page only, with the text identical to the visible Q&A.
- [ ] **No** AggregateRating/Review markup based on Google reviews.

**Performance**
- [ ] Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, BP ≥ 90, SEO ≥ 95 on nl-be/, abonnementen/, aanmelden/ and fr-be/ (the current gate). Add FR abonnements/ and the how page (video).
- [ ] LCP < 2.5 s, CLS < 0.1, TBT < 200 ms. The LCP element is the H1 or the poster image (not the banner, not a lazy image).
- [ ] JS per page within budget. No framework runtime on pages without islands. No third-party requests before consent (apart from the approved cookieless analytics).
- [ ] Fonts: ≤ 3 WOFF2 files, self-hosted, one preload, fallback metrics defined.
- [ ] Images: every `<img>` has width/height, AVIF/WebP served, below-fold images lazy, the hero is eager with high priority.
- [ ] Video: no video bytes on mobile (390px) or with reduced motion or data saver. A pause button is present when the video plays.
- [ ] INP spot check: open the menu, use the calculator, toggle the FAQ, switch sign-up steps. Each interaction stays < 200 ms with 4× CPU throttle.

**Accessibility**
- [ ] 0 axe serious/critical violations (current gate). Contrast gates pass in light (and dark, if supported).
- [ ] Skip link works. Focus is visible everywhere and never hidden by the sticky header or the consent banner.
- [ ] Keyboard-only walk-through: nav, switcher, calculator, FAQ, carousel, video pause, consent, full sign-up with errors.
- [ ] Screen-reader spot check (VoiceOver iOS NL and NVDA FR): landmarks, headings, calculator output announced once, errors announced, step changes announced.
- [ ] Targets ≥ 24×24 px. Reflow at 320px. Zoom to 200%.
- [ ] Reduced motion: no motion, no video autoplay, final numbers shown.

**Analytics & consent**
- [ ] Before any choice: no marketing cookies or requests (check DevTools Application + Network).
- [ ] Reject is as easy as accept. Withdrawal is possible via the footer link.
- [ ] `signup_started` fires exactly once per sign-up visit. Funnel events carry no PII.
- [ ] The consent banner causes 0 CLS and is not the LCP element (Lighthouse "LCP element" audit).

---

## 8. Suggested improvements to `website/tools/check-site.mjs` (described, not edited)

Current gates: overflow, text ≥ 12px, contrast, axe (WCAG 2.2 AA tags), `lang`, `title`, meta description, exactly one H1, presence of `nl-BE`/`fr-BE` hreflang, console errors, a reduced-motion rule in CSS, and optional Lighthouse. Proposed additions (all cheap, in the same `page.evaluate`):

1. **Canonical gate**: exactly one `link[rel=canonical]`. It is absolute, starts with `https://www.june.energy/`, and its path equals the route (self-referencing, trailing slash, no query).
2. **Hreflang completeness and reciprocity**: require `x-default`. Collect `{route → alternates}` across all routes, then assert every alternate href maps to a route in `ROUTES`, that pairs point back to each other, and that each page lists itself. Today only the presence of `nl-BE`/`fr-BE` is checked.
3. **`lang` ↔ route prefix**: `nl-be/*` must be `nl-*` and `fr-be/*` must be `fr-*`. Today any non-empty value passes.
4. **Robots meta**: sign-up routes (`aanmelden/`, `inscription/`) must contain `noindex`. All others must not. Also fail if `dist/robots.txt` disallows an indexable route.
5. **Title/description quality**: length bounds (title ≤ 60–65, description 70–160), and uniqueness across all 12 routes (duplicate detection post-loop).
6. **JSON-LD validation**: every `script[type="application/ld+json"]` parses. Organization is present on all pages, BreadcrumbList on non-home pages, FAQPage only on FAQ routes, and `Offer.price` present on abonnementen. **Fail on any `AggregateRating`** (policy decision in §3.4).
7. **Language-switcher check**: a link with `hreflang` to the other locale exists, and its href equals the page's alternate for that locale.
8. **Internal link crawl**: collect all same-origin `a[href]`, fetch each unique one from the static server once, and fail on non-200. Also flag hrefs without a trailing slash, and cross-locale links outside the switcher.
9. **CLS and LCP without Lighthouse**: inject a `PerformanceObserver` (`layout-shift`, `largest-contentful-paint`) via `addInitScript`, scroll the page, and report CLS > 0.1 and the LCP element's tag/selector. This catches banner or font-swap shifts on every route and both viewports, and flags an LCP element that is a consent banner or a lazy image.
10. **JS/CSS/font budget**: use `page.on('response')` to sum transferred bytes by type per route. Fail when JS > budget (§4.1), fonts > 3 files, or a third-party origin is requested before consent (allow-list only).
11. **Image hygiene**: every `<img>` has `alt` (may be empty) and `width`/`height` or CSS aspect-ratio. The first in-viewport image is not `loading="lazy"`. Warn on JPEG/PNG where AVIF/WebP was expected.
12. **Video policy at mobile width**: on the 390px context, fail if any `video` has a non-empty `currentSrc` or any media response arrives.
13. **Target size**: measure `a, button, summary, input, [role=button]` outside running text. Warn under 24×24 (axe's `target-size` rule is only in `wcag22aa` best practice or experimental, so it may not fire).
14. **Skip link and landmarks**: the first focusable element links to `#main`, which exists, and exactly one `<main>`. Tab once and assert that the focused element is visible (not clipped).
15. **Reduced-motion check is currently global and weak**: it only greps CSS for the media query string. Also run one route with `reducedMotion: 'no-preference'` to catch console errors or broken animations in the default mode. The current runs all use `'reduce'`, so the animated experience is never tested.
16. **Robustness**:
    - `waitUntil: 'networkidle'` can hang or time out with looping video or analytics beacons. Use `load` plus a fixed settle time, with a timeout per route.
    - The Lighthouse block launches a second Chromium on a fixed port 9333. Pick a free port, or reuse `chromium.launch({ args: [--remote-debugging-port=0] })`, and read the WS endpoint.
    - Add `/fr-be/abonnements/` and `/nl-be/hoe-werkt-het/` (video page) to the Lighthouse set, and record the `lcp-element` and `INP`/TBT per route.
17. **Sitemap and robots presence**: if `dist/sitemap*.xml` exists, parse it, and assert it contains exactly the 10 indexable URLs and no sign-up URLs.
18. **Report**: add a per-route SEO column (canonical, hreflang, robots, JSON-LD types) to `check.md`, so the evaluation phase can compare variants side by side.

---

## 9. Implementation notes for variant builders (checklist)

- Extend `Base.astro` to accept `locale`, `routeKey`, `title`, `description`, `noindex` and `jsonLd`. It emits:
  - `lang`
  - canonical
  - hreflang ×3
  - robots
  - OG/Twitter
  - JSON-LD `@graph`
  - skip link
  - font preload
  - the consent-state inline script
  - `@view-transition` CSS
- Keep all copy in `src/content/{nl-be,fr-be}/…` (or `shared/content`) keyed by `routeKey`. Keep the layout free of language literals.
- Links always go through `href(key, locale)`. Absolute URLs always go through `abs(key, locale)`.
- Build with `BASE=/v/x/` for the review hub. Canonicals and hreflang still point to production (by design). Check-site serves `dist/` at `/`, so internal links must work with the default base.

# june.energy — Strategy brief (Phase 2 synthesis)

Coordinator synthesis of: `content-freeze.md`, `content-issues.md`, `ux-research.md`, `competitive-research.md`, `conversion-strategy.md`, `seo-tech-strategy.md`, `brand-strategy.md`, `shared/content/facts.json`, `shared/content/copy-baseline.md`. This is the contract for concept and build agents.

## 1. Positioning
**June is the independent switching service you pay — not the supplier. It checks the market every month for your consumption and moves you to a better contract automatically, and does the paperwork.**
- **Promise:** NL *Altijd een goed contract. Nooit meer zelf zoeken.* · FR *Toujours un bon contrat. Plus jamais besoin de chercher.*
- **Pillars:** Save without effort · On your side (you pay us, not the supplier) · Keeps working for you (every month).
- **White space we own:** no Belgian competitor keeps watching after the switch (V-test/Mijnenergie compare once; group purchases run yearly), and nobody offers a savings guarantee.
- **Tagline:** keep "Je had energie, nu heb je power." as heritage; recommended evolution "Jij de power, wij het werk." / "À vous le pouvoir, à nous le travail."

## 2. What every variant must do (non-negotiable)
1. **Hero answers three questions**: what June is (not a supplier, power keeps flowing), what it costs after the fee, what can go wrong (nothing — guarantee, cancel terms).
2. **One primary CTA everywhere:** NL **"Bereken je besparing"** · FR **"Calculez votre économie"**, ideally with an **inline postcode field** in the hero. Sticky mobile CTA after the hero. Login = small text link.
3. **Sign-up started** = first valid Belgian postcode submitted (not a click). Step 1: postcode → electricity / elec+gas → household (tap chips or "I know my kWh") → meter & extras chips → **estimate as a range, net of fee** → Step 2: plan (Switch Plus preselected "Aanbevolen · Risicovrij"; Premium if digital meter + solar) + preference (auto vs ask me) → email to save the estimate. EAN/IBAN/address later (out of scope). Funnel pages: minimal chrome, noindex.
4. **Pricing:** yearly total first (€69 / €99 / €198) with monthly alongside ("€8,25/maand, jaarlijks gefactureerd: €99") — Belgian price-indication rule. Switch Plus recommended; guarantee framed as "save more than you pay, or get €99 back" with worked example. Show net savings, "June vs doing it yourself", "how we earn money".
5. **Trust set near every CTA:** 4,3/5 Google (1.200+ reviews, source + date, no AggregateRating markup) · 20.000+ households · not a supplier · no power cut / same meter / no exit fees · guarantee.
6. **Claims:** use the safe phrasing and footnotes from the claims register (`content-freeze.md`). "17+ leveranciers" (not "alle") until confirmed. €326 always with its footnote. No "gratis" dongle ("inbegrepen"), no unqualified "goedkoopste".
7. **Languages:** NL je-form, FR vous-form, FR written natively; FR hides/qualifies Flanders-only topics (capacity tariff). Language switch → equivalent page.
8. **Tech:** Astro static, zero JS by default (islands: nav, calculator, sign-up, consent), native `<details>` FAQ, self-hosted Montserrat + Inter subsets, `site: https://www.june.energy`, canonical + hreflang (nl-BE, fr-BE, x-default) via a shared route map, structured data per `seo-tech-strategy.md`, never fade H1/LCP from opacity 0, `prefers-reduced-motion` respected. Pass `tools/check-site.mjs --lighthouse` with 0 failures.
9. **Placeholders:** on-brand, tagged in filename + alt ("placeholder"), never invented people, quotes or numbers.

## 3. Information architecture (for this exercise)
Build the fixed route list (`plan.md`). The UX research's full production sitemap (`/prijzen`, `/start`, `/over-june`, `/garantie`, `/reviews`, `/contact`, partners, referral) is the target for Phase 6 handover.
**Nav:** Hoe werkt het · Prijzen · Reviews* · FAQ · NL|FR · Inloggen · [Bereken je besparing]. (*Reviews links to a section/anchor for now.)
**Page structures:** use `ux-research.md` §4.4 as the default section order for Home, Plans & pricing, Switch Plus, How it works, FAQ, Sign-up 1–2. Variants may reorder with a stated reason.

## 4. The five concepts
| | Idea | Hero object | Persona lead | Conversion mechanism | Brand volume |
|---|---|---|---|---|---|
| **A · Calm Confidence** | "The best energy decision is the one you never have to make again." Insights app scaled into a story | Sentence + one numeral tile | Busy family / risk-averse | Trust, low cognitive load | 3/10 |
| **B · Savings First** | "Your number, in 30 seconds." The hero *is* the calculator | Live estimator with ink result card | Price-driven saver | Personalised number → commitment | 4/10 |
| **C · Honest Market** | "Leveranciers rekenen op je trouw. Wij niet." Editorial, explains the market & business model | Annotated market chart | Sceptic / researcher, often FR | Remove the main objection | 3/10 |
| **D · Product Showcase** | "Zie wat je huis verbruikt. June zorgt voor de beste prijs." | Insights app in devices + dongle, dark hero | Tech / solar owner | Perceived value → Premium/Switch Plus mix | 4/10 |
| **E · Bold June** | "Je had energie. Nu heb je power." Brand book at full volume | Giant type on June Green + blob + Junior | Young, mobile-first | Distinctiveness → recall & referral | 8/10 |

Research recommendation: build **A, B, C** in full; fold D's product story into A as a Premium section; keep E as a style tile unless it surprises. **Coordinator proposal:** make all 5 style tiles + homepage hero (cheap), then pick 3–4 for full build at checkpoint 2.

## 5. Facts June must confirm before launch (variants use safe interim phrasing)
1. Number of suppliers compared ("alle" vs "17+"; only 5 logos known).
2. €326 basis (period, sample, gross/net of fee) — and the "€511" Premium figure seen in search results.
3. Winstgarantie terms (period, measurement, payout; does Premium include it and at what amount?).
4. Contract terms: renewal, cancellation, 14-day withdrawal; VAT included in prices?
5. Does June take supplier commissions? (Independence claim depends on it.)
6. Regions served in FR (Wallonia, Brussels) and capacity-tariff messaging.
7. Comparison frequency wording (continuous / daily / monthly — pick one).
8. Phone number / support hours (60+ persona), company legal details for the footer.
9. Assets: logo files, photography, explainer video, NL/FR app screenshots, dongle photos, Junior vector.

## 6. Product-owner decisions (checkpoint 2)
- **Build in full:** A · Calm Confidence (absorbs D's product story: Premium section with the real leaf dongle, meter chooser from `variants/d`), B · Savings First, C · Honest Market, E · Bold June. D stays as a concept reference.
- **Brand green = logo green `#1CA498`** (measured from the official logo). Derive accessible text/button shades from it (white text needs ≥ 4.5:1 — use a darker step for buttons and small text; `#1CA498` is for fills, large display, icons, logo).
- **Product UI = the real current June app**: use the supplied NL/FR phone mockups, laptop dashboard and feature cards from `shared/assets/` (not recreated Insights tiles). FR pages use the FR phone mockup; NL-only feature cards only on NL pages or with FR text alternatives.
- **Real assets** (see `shared/assets/README.md`): official SVG logo everywhere (no stand-in wordmarks), the teal June character (not the red 2018 blob), leaf dongle shots, 7 animated brand icons (animated WebP + static PNG for reduced motion). Import via `astro:assets` for AVIF/WebP output. Still placeholders: lifestyle/home photography, video.

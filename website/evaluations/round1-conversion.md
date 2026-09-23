# Round 1: Conversion (CRO) evaluation

**Evaluator:** Conversion / CRO · **Date:** 23 Sep 2026 · **Variants:** A · Calm Confidence, B · Savings First, C · Honest Market, E · Bold June
**Primary conversion:** `signup_started` = first valid Belgian postcode submitted.
**Scope:** only the five Conversion criteria in `brief/scoring-rubric.md` (value proposition 7, relevance per persona 5, anxiety reduction & trust 6, pricing clarity 5, path to sign-up 7). The weighted subtotal is out of 5.
**Method:** I snapshotted each built `dist/` (as of 13:12 UTC) and served it locally. Playwright (Chromium 141) ran at 1280×800 and 390×844 (touch), NL + FR, on all 12 routes. I extracted the text of every route, measured the CTAs and postcode inputs in each viewport, scanned sticky elements at six scroll depths, measured the distance from each monthly price to its yearly price, and measured the distance from each in-body primary CTA to the nearest trust element. I walked the funnel from the hero to the estimate and then to the email step, with a hook on `dataLayer`/`__juneEvents` to record analytics events. I also checked the Premium path (digital meter + solar). Scripts, raw JSON, event logs and screenshots are in `evaluations/scratch/cro/`.

---

## 1. Summary scores (Conversion criteria, 1–5)

| Criterion (weight) | A · Calm Confidence | B · Savings First | C · Honest Market | E · Bold June |
|---|---|---|---|---|
| Value proposition (7) | **4.5** | 4.0 | **4.5** | 3.0 |
| Relevance per persona (5) | 4.0 | 4.0 | 4.0 | 3.5 |
| Anxiety reduction & trust (6) | 4.5 | 4.0 | **5.0** | 3.5 |
| Pricing clarity (5) | 4.5 | 4.0 | **4.5** | 4.0 |
| Path to sign-up (7) | 4.0 | **4.5** | **4.5** | 4.0 |
| **Weighted conversion subtotal /5** | **4.30** | **4.12** | **4.52** | **3.58** |
| Conversion-strategy §7 rubric (/100) | 84 | 80 | **89** | 73 |
| §7 gates (VP / CTA / pricing ≤ 2) | pass | pass | pass | pass |

**Ranking on conversion:** C > A > B > E. No variant fails a §7 gate. **All four fail the claims-register hard gate on C17** (a € estimate computed in the browser, see §5). That is a panel-level blocker, and the owner has to decide it, because `strategy-brief.md` §2.3 asks for an estimate while C17 and content-issues #20 forbid one computed on the client.

### Reasons for scores ≤ 3.5 (rubric requires reason + fix)
- **E, value proposition, 3.0.** The H1 is "Je had energie. Nu heb je power." It is the heritage tagline that content-issues #18 recommends retiring. It states no outcome and no benefit, so the concrete message (automatic switching, €326, not a supplier) is left to a dense 5-line paragraph. **Fix** (`/nl-be/` and `/fr-be/` hero): make the H1 outcome-first ("Altijd een goed contract. Nooit meer zelf zoeken." / « Toujours un bon contrat. Plus jamais besoin de chercher. »), move the tagline into the eyebrow or closing band, and cut the sub-head to two sentences.
- **E, relevance, 3.5.** The page speaks to young, mobile-first visitors only. Sceptics get no business-model block ("Hoe verdient June geld?" exists only as a collapsed FAQ). Risk-averse visitors get the guarantee as a slogan chip. **Fix:** add a 3-cell "Wat is June / Wat kost het / Wat als het tegenvalt" strip under the hero, as C does, and a transparency block next to pricing.
- **E, anxiety, 3.5.** Trust is the furthest from the CTAs of any variant: the median distance from an in-body CTA to a risk reducer is 99 px on desktop and 124 px on mobile, and 0 of 19 CTAs have both proof and a reducer within 40 px. The guarantee chip "Winstgarantie of € 99 terug" drops the condition. **Fix:** put the rating/count line and "Gratis · geen verplichtingen" directly under every postcode button, and rewrite the chip with its condition (§5).

---

## 2. LIFT analysis per variant (1–5; for Anxiety and Distraction, higher = better controlled)

| LIFT factor | A | B | C | E |
|---|---|---|---|---|
| Value proposition | 4.5: outcome H1 "Altijd het juiste energiecontract. Zonder er nog aan te denken." + €326 tile + Switch Plus €99/yr + guarantee card (desktop) | 4.0: "Hoeveel betaal jij te veel? Reken het uit in 30 seconden." The number is the hero, but it reads like a comparison site, and "keeps watching" is only in the sub | 4.5: "Energieleveranciers rekenen op je trouw. Wij niet." + a panel answering the three questions in brief §2.1 (what is June / €69-99-198 per year / €99 back) above the fold | 3.0: tagline H1; the benefit is buried in the paragraph |
| Relevance | 4.0: Premium/dongle section for tech users, meter chooser on plans, regulators note for sceptics | 4.0: calculator by house type, Premium recommended for digital + solar (verified), "Geen trucs. Gewoon rekenen" | 4.0: speaks directly to sceptics/FR researchers; the tech persona gets only a table row on home | 3.5: generic; Premium section is fine |
| Clarity | 4.5: calm, one focus per section | 4.0: busy home (calculator + result + 3 "wat jij overhoudt" cards) | 4.5: editorial but numbered sections, one CTA per section | 3.5: strong type, weak message hierarchy |
| Anxiety | 4.5: "what changes: only the name on your bill", no exit fee, control, data line in sign-up | 3.5: good chips; "Hoe we geld verdienen · te bevestigen"; a preset € example shown before any input can backfire | 5.0: business model, "Een 4,3, geen 5", "Wat we niet beloven", a "Wat we van je weten" panel in sign-up, 14-day withdrawal | 3.5: see above |
| Distraction | 4.0: estimate step links out ("Vergelijk de abonnementen"); "Hulp nodig?" leaves for FAQ | 3.5: long home page, many footnote links, FAQ link in the funnel | 4.5: most enclosed funnel (4 links: logo, Home, NL/FR) | 4.0: estimate step links out; FAQ link |
| Urgency | 2.0: none | 3.0: loss framing "te veel betalen" | 3.5: honest "prijs van trouw" chart (illustrative, labelled) | 2.5: "Klaar om minder te betalen?" |

---

## 3. Funnel metrics (measured)

Postcode distance = document Y of the first visible postcode input at 390×844 (value in brackets = viewports of scroll). "Sticky m" = bottom-bar CTA visible at 6 scroll depths (0/15/35/55/75/95 %).

| Metric | A | B | C | E |
|---|---|---|---|---|
| Primary CTA in 1st viewport, 1280 (body + header) | 2 (hero form + header) | **1: header only; calculator submit is below the fold** | 2 | 2 |
| Primary CTA in 1st viewport, 390 | 1 (hero button) | **0 buttons** (postcode field visible, button below) | 1 | 1 |
| Inline postcode on content pages | all (final band) | **home only**; sub-pages link to `/aanmelden/` (1 click) | all | all |
| Postcode px (m): home / plans / Switch Plus / how / FAQ | 497 (0.6) / 8417 (10.0) / 5491 (6.5) / 6942 (8.2) / 2663 (3.2) | 470 (0.6) / – / – / – / – (+1 click, then 372 px) | 570 (0.7) / 9496 (11.3) / 6401 (7.6) / 11714 (13.9) / 3914 (4.6) | 662 (0.8) / 8876 (10.5) / 7571 (9.0) / 6879 (8.2) / 3334 (4.0) |
| Sticky CTA, mobile | home, how, FAQ (partly); **none on plans, Switch Plus** | home, plans, Switch Plus, how, FAQ (partly) | home, how; **none on plans, Switch Plus, FAQ** | home, plans, how, FAQ (partly); **none on Switch Plus** |
| Sticky header CTA, desktop | all pages | all pages | all pages | **none (header scrolls away)** |
| Hidden in funnel / during hero | yes / yes | yes / yes | yes / yes | yes / yes |
| Actions to `signup_started` from home | type postcode + Enter → fires on `/aanmelden/` load | type postcode + click → fires on home (inline calculator) | type + Enter → fires on `/aanmelden/` | type + Enter → fires on `/aanmelden/` |
| Required inputs from start to estimate | 3 taps (household, meter, solar) + 1 click | **0: estimate appears instantly on home**; refined: 2 taps (meter, solar) + 1 click | 2 taps (household, meter) + 1 click | 2 taps (household, meter) + 1 click |
| Screens: start → estimate → email | 3 (woning · schatting · plan+e-mail) | 4 (woning · meter · schatting · plan+e-mail); from sub-pages the postcode is re-asked at step 1 | 2 + estimate panel | 2 + estimate panel |
| Estimate shows net of fee | yes (± €101–201 after Switch Plus) | yes (per plan) | yes (Switch Plus and Premium) | **no, gross only** |
| Premium recommended for digital + solar (H14) | yes | yes | yes | yes, **but the text below still quotes the Switch Plus price and guarantee (bug)** |
| Exits from funnel | logo, "Hulp nodig?"→FAQ, FAQ, **"Vergelijk de abonnementen" on estimate** (7 links) | logo, FAQ, lang (7) | logo, "Home", lang (4); lang switch drops `?postcode` | logo, FAQ, lang, **"Vergelijk de abonnementen" on estimate** (6) |
| Trust ≤ 40 px of in-body CTAs (proof / risk reducer, 1280) | 0/14 · 14/14 (proof median 56 px; both ≤ 80 px: 12/14) | **9/16 · 11/16** (mobile 2/16 · 4/16) | 0/20 · 18/20 (proof median 76 px) | 3/19 · 4/19 (medians 65 / 99 px) |
| Yearly total next to every monthly price | **100 %** (0 of 48 checks > 120 px) | **100 %** | **100 %** | **100 %** |
| Yearly figure larger than monthly (cards) | ×1.5 | ×1.0 on cards (same size) | ×1.3–3.2 | ×2.9–3.7 |
| 14-day withdrawal stated before commitment | yes (step 3) | yes (FAQ + flow) | yes (sign-up aside) | yes (after submit) |

All four fire `signup_started` once per session (sessionStorage guard) with region, locale and entry properties, as `conversion-strategy.md` §2.2 requires. `cta_click` is logged separately in A and C.

---

## 4. Hypotheses embodied (backlog §6)

| Variant | Hypotheses clearly embodied | Missing / weak |
|---|---|---|
| A | H1, H2, H4, H5, H6 (desktop card), H7, H10, H11, H12 (partial), H13, H14, H15 ("Stuur je schatting"), H17 (partial), H20, H21 | H9 on plan pages, H16, H8 only in FAQ |
| B | **H1 + H3** (estimate in the hero), H2, H4, H5, H7 (net on every card), H8 (block, "te bevestigen"), H9 (widest), H11, H12 (desktop), H13, H14 | H6 near the hero CTA, H17 (FAQ link), H16 |
| C | H1, H2, H4, H5, **H6** (hero panel), H7, **H8** (whole section), H10, H11, H12 (partial), H13, H14, H16 (honest "prijs van trouw"), **H17** (best enclosure), H20, H21 | H9 on plans / Switch Plus / FAQ, H18/H22 (reviews are placeholders) |
| E | H1, H2, H4, H5, H6 (chip, but unqualified), H9 (mobile), H11, H13, H14 (buggy) | H7 (no net), H8, H12, H16, P5 CTA not used |

---

## 5. Claims compliance (content-freeze §4)

**Price rule 1 (yearly next to monthly):** all four comply on every route at 1280 and 390, including FAQ answers (details opened) and the sign-up plan step.

**C17 / content-issues #20: € estimate computed in the browser (risk H): every variant fails.**

| Variant | Where | What is shown |
|---|---|---|
| B (most severe) | `/nl-be/`, `/fr-be/` hero result card **on page load, before any input** ("Voorbeeld · Rijwoning ≈ € 90 – 290 per jaar, na je abonnement"). Every plan card on home and `/abonnementen/` ("Wat jij overhoudt ≈ € 120 – 320 / € 90 – 290 / € 0 – 190"). The how-it-works band "≈ € 90 – 290". Sign-up step 3 | Footnote 6 admits "berekend in je browser … Model nog te valideren door June" |
| A | `/nl-be/aanmelden/` step 2 "€ 200 – € 300 per jaar … ± € 101 – € 201"; FR "200 € – 300 €" | Method text shows a raw placeholder: "[methode, periode en steekproef door June te bevestigen]" |
| C | `/nl-be/aanmelden/` "€ 180 – € 360 … Na je Switch Plus-abonnement: € 80 – € 260" (+ Premium net) | Best mitigated: kWh presets, €/kWh spread and a cap of € 700 all disclosed. Still a client-side preset model |
| E | `/nl-be/aanmelden/` "€ 170 – 340 per jaar" (gross only) | Method collapsed ("Hoe we dit schatten") |

**Fix for all:** until June supplies a validated model served from the server, replace the € range with the C17 safe phrasing ("Na je aanmelding berekenen we je persoonlijke besparing") and anchor on the footnoted €326 average. Keep the chip questions, because they still qualify the plan recommendation. If the owner approves a model, serve it from the server with its method footnote (C's disclosure is the template).

**Other findings**

| # | Variant · route | Text | Rule | Risk | Fix |
|---|---|---|---|---|---|
| 1 | E · `/nl-be/` hero + closing band, `/abonnementen/`, `/hoe-werkt-het/`, `/switch-plus/` (+ FR « Garantie de gain ou 99 € remboursés ») | "Winstgarantie of € 99 terug⁴" | C7 / §2.3: amount + condition + period + link always together; footnote 4 doesn't state the condition | H | "Winstgarantie: € 99 terug als je niet meer bespaart dan je abonnement" |
| 2 | B · `/nl-be/` + `/abonnementen/` Premium card (FR same) | "Winstgarantie: Minder dan € 99 bespaard? Dan krijg je € 99 terug." | C7: misstates the condition for a € 198 plan (content-issues #2 open) | H | Use the facts.json wording ("…niet meer bespaart dan je abonnement kost") and mark the Premium amount as needsConfirmation |
| 3 | B · `/nl-be/hoe-werkt-het/` | "kiest het voordeligste contract voor jou" (FR `/comment-ca-marche/` « choisit le contrat le plus avantageux pour vous ») | C6: superlative without "uit onze vergelijking" | H | Add "uit onze vergelijking" / « parmi ceux que nous comparons » |
| 4 | C · `/nl-be/switch-plus/` (FR « Prêt pour une année sans risque de perte ? ») | "Klaar voor een jaar zonder risico op verlies?" | C7: "geen risico" wording | M | "Klaar om te besparen, met winstgarantie?" |
| 5 | All · plan tagline (from facts.json, content-map) | "Besparen met gegarandeerd resultaat." / « Économisez, avec un résultat garanti. » (E adds « Des économies au résultat garanti ») | C7: "guaranteed result" without the condition | M (systemic) | Ask the owner to change the facts.json tagline to "Besparen, met winstgarantie." |
| 6 | C · `/nl-be/` hero "Jij betaalt ons, niet de leverancier."; A "Wij werken voor jou"; B "Aan jouw kant. Niet aan die van de leverancier." | Independence | C9 / issue #6 (P0 open) | M: C discloses it's unconfirmed (footnote 5); B says "te bevestigen"; A relies on its FAQ | Keep the claim only with C's footnote on every variant until commissions are confirmed |
| 7 | E · `/nl-be/aanmelden/` plan step | Order Switch Plus · Premium · Switch (desktop and mobile) | Frozen plan order §2.2 | M | Keep Switch · Switch Plus · Premium, with Switch Plus preselected |
| 8 | E · `/nl-be/` H1 | "Je had energie. Nu heb je power." | content-issues #18 (retire) | L | See §1 |
| 9 | A · `/nl-be/` H1 | "Altijd het juiste energiecontract." | Absolute "altijd" (the brief's promise is "altijd een *goed* contract") | L | "Altijd een goed energiecontract." |
| 10 | C · `/nl-be/` "Hoe een contract duurder wordt als je niets doet" chart | Illustrative supplier price curve | VI.17 comparative; it is labelled "geen echte marktprijzen" | L | Replace with CREG/VREG data before launch, as the page already notes |

Clean in all four: "17+ leveranciers" (never "alle"); €326 always with *gemiddeld/en moyenne* and footnote 1; 4,3 shown with partial stars (no ★★★★★; E's single ★ is fine); "inbegrepen / inclus" for the dongle (no "gratis"); capacity tariff limited to Flanders on FR pages; green energy "volgens de leverancier"; logos not called partners (E states this explicitly). Reviews are placeholders everywhere, so C15 can't be judged yet.

---

## 6. Top 6 issues, ranked by expected impact on `signup_started` and guardrails

1. **The in-browser € estimate is non-compliant in all four (C17).** It will have to come out or be rebuilt before launch, and it is B's entire mechanism. *Fix:* owner decision this week. Either (a) a server-side estimate API with June's validated model and C-style method disclosure, or (b) swap the € range for the safe phrasing and the €326 anchor, and keep the chip qualification. Re-score B after that; its path advantage mostly comes from this number.
2. **No sticky mobile CTA on high-intent pages.** A has none on `/abonnementen/` or `/switch-plus/`, C none on `/abonnementen/`, `/switch-plus/` or FAQ, and E none on `/switch-plus/`; E also has no persistent desktop header. On those pages the postcode sits 6.5–14 viewports down. *Fix:* a global sticky bar ([Bereken je besparing] + "★ 4,3 · 20.000+ klanten") on every content route after the first CTA leaves view. Hide it while an inline postcode form or the plan-card CTAs are in view, and while the keyboard is open. Make E's header sticky on desktop.
3. **Proof sits too far from the CTA (40 px rule, §4).** In A and C every CTA has a risk reducer within 40 px, but the rating/count is 56–90 px away. E misses both, and B misses both on mobile. *Fix:* put one line directly under each postcode button, before the helper text: "Vrijblijvend · ★ 4,3 op Google (1.200+) · 20.000+ klanten" / « Sans engagement · ★ 4,3 sur Google · plus de 20 000 clients ».
4. **Guarantee wording is qualified inconsistently** (E chips, B Premium card, C "zonder risico op verlies", the shared facts.json tagline). This is legal risk on the strongest risk-reversal asset (H6). *Fix:* one component, `GuaranteeChip`, that always renders "€ 99 terug als je niet meer bespaart dan je abonnement kost" plus a link to the conditions. Use it in the hero, on the pricing cards and at the plan step.
5. **B's calculator hides its own CTA and repeats steps.** At 1280×800 and at 390 the calculator submit is below the fold, and no primary button shows in the first mobile viewport. Sub-pages have no postcode field, and starting from them gives a 4-screen flow that asks for the postcode again. *Fix:* hero = postcode + button (house-type and energy chips appear after a valid postcode). Add the inline postcode band to the plan, Switch Plus and how-it-works pages. Merge sign-up steps 1 and 2.
6. **Exits and state loss inside the funnel.** A and E link "Vergelijk de abonnementen" from the estimate step to `/abonnementen/`. A, B and E send "Hulp nodig?" to the FAQ page. C's language switch drops `?postcode=`. *Fix:* open plan comparison and FAQ in an in-flow drawer or modal; carry the query string on the language switch (A already does); keep only logo (with leave-confirm), privacy/terms and support.

---

## 7. Recommended A/B test plan (winner: **C**, as a hybrid)

**Base (control):** C's structure (hero three-question panel, business-model section, enclosed 2-step flow, "Wat we van je weten" panel). Ship these fixes before testing, because they are compliance or hygiene, not hypotheses: C17 resolution, global sticky CTA (issue 2), proof within 40 px (issue 3), guarantee component (issue 4), language switch keeping the postcode. Port from A: the hero value card (€326 tile + Switch Plus €99/jaar + guarantee), used as C's right-hand column on mobile under the fold. Port from B: the "Wat jij overhoudt" net framing on the plan step (fed by the server model only).

**Primary metric:** `signup_started` / eligible sessions. **Guardrails:** start→`estimate_viewed`, start→`signup_completed`, 14-day cancellations. **Split:** 50/50, stratified by locale (NL/FR) and device. **Power:** at an assumed 8 % start rate, detecting a +10 % relative lift (α 0.05, power 0.8) needs about 18.500 sessions per arm. Run each test for at least 2 full weeks and never stop early on a peek.

| Order | Test | Hypothesis | Variant B arm | Why this order |
|---|---|---|---|---|
| 1 | Hero headline | H2-adjacent (VP) | A's outcome H1 "Altijd een goed energiecontract. Zonder er nog aan te denken." vs C's "Leveranciers rekenen op je trouw. Wij niet." (same panel and form) | Biggest open question between the two top variants; cheap |
| 2 | Guarantee next to CTA | H6 + H12 | GuaranteeChip + proof line inside the form group vs proof only | High ICE (60/45), no engineering |
| 3 | Instant estimate in hero | H1 → H3 | B-style estimate appears after a valid postcode (server model) vs postcode → step 1 | Only once the API exists; watch start→completed, because low-intent starts must not win |
| 4 | Net vs gross on estimate | H7 + H13 | Range net of fee (per recommended plan) vs gross range | Completion lever; compliance-safe once the server model is live |
| 5 | Cost of waiting | H16 | Personalised "elke maand wachten ≈ € X" on the estimate vs none | Low risk, needs the model |
| 6 | FR-specific proof | H22 | FR reviews + Walloon/Brussels example on `/fr-be/` vs NL-equivalent proof | Run when real reviews replace placeholders |

**Ports worth keeping even from losing variants:** B's data hand-off (query string carries postcode, house type, energy and plan into sign-up, then deep-links to step 2); B's sticky coverage; A's "Wat verandert er? Alleen de naam op je factuur." block; E's closing band copy "Je postcode is genoeg om te starten." and its explicit "Deze leveranciers zijn geen partners van June."

---

## 8. Top 3 fixes per variant

- **A:** (1) Resolve C17 on `/aanmelden/` step 2 and remove the visible "[methode, periode en steekproef…]" placeholder. (2) Add a sticky mobile CTA on `/abonnementen/` and `/switch-plus/` (postcode is 8.417 / 5.491 px down). (3) Move the proof line within 40 px of every button, show the guarantee chip in the mobile hero (today it only appears in the desktop card), and remove the "Vergelijk de abonnementen" exit from the estimate step.
- **B:** (1) Remove the preset € example from the hero and the "Wat jij overhoudt" ranges from the plan cards until a server model exists (C17). (2) Put the calculator submit in the first viewport (postcode + button first, chips after) and add inline postcode bands to the sub-pages. (3) Fix the Premium guarantee condition and the unqualified "voordeligste contract voor jou" on how-it-works (NL + FR).
- **C:** (1) C17: keep the method disclosure but serve the estimate from the server, or switch to the safe phrasing. (2) Add a sticky mobile CTA on `/abonnementen/`, `/switch-plus/` and FAQ (postcode 7.6–13.9 viewports down). (3) Bring the rating/count within 40 px of the buttons (median 76–90 px), rephrase "zonder risico op verlies", and keep the language switch from dropping the postcode.
- **E:** (1) Replace the tagline H1 with an outcome headline, and give every "Winstgarantie of € 99 terug" chip its condition. (2) Add a sticky desktop header CTA and a mobile sticky on `/switch-plus/`, and bring trust within 40 px (medians 57–124 px today). (3) Estimate step: show net of fee, fix the Premium recommendation that still quotes the Switch Plus price, restore the frozen plan order, and resolve C17.

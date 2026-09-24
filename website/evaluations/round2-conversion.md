# Round 2: Conversion (CRO) evaluation of the final site (C + borrowings)

**Evaluator:** Conversion / CRO · **Date:** 23 Sep 2026 · **Site:** `website/variants/final/dist/` (snapshot of the 16:24 UTC build) · **Brief:** `brief/final-brief.md`
**Method:** the same Playwright scripts as round 1, run on the final build: 12 routes, NL + FR, at 1280×800 and 390×844, plus spot checks at 375×667 and 320×640. The measurements cover CTAs and postcode inputs in the first viewport, sticky CTAs at six scroll depths, the distance from each monthly price to its yearly price, and the distance from each in-body CTA to proof and to a risk reducer. I walked the funnel end to end with an analytics event hook, ran 7 estimate scenarios through URL parameters, and checked the plan ledger after an estimate, the language switch mid-funnel and back navigation. Scripts, JSON, logs and screenshots are in `evaluations/scratch/cro/` (files prefixed `r2_`, output in `r2/`).
**Product-owner rules applied:** the estimate is computed in the browser, shown net of the fee first, with C's method note, no preset numbers, and never a recommendation for a plan whose fee eats the saving. Legal sign-off is pending, so I treat this as **accepted risk, not a defect, when the rules are met**. Unconfirmed facts use safe wording and show no placeholders.

---

## 1. Scores: final site vs C in round 1

| Criterion (weight) | C · round 1 | **Final · round 2** | Why it changed |
|---|---|---|---|
| Value proposition (7) | 4.5 | **4.5** | Desktop gains the A tile (Switch Plus € 99/jaar + guarantee + "elke maand gecontroleerd"). On mobile the hero form is now pushed below the fold (R1) |
| Relevance per persona (5) | 4.0 | **4.5** | Premium band with the real dongle and app, two-question plan helper, postcode → town + grid operator, analogue meter → Switch Plus with explanation, an honest "Je zit al goed" |
| Anxiety reduction & trust (6) | 5.0 | **5.0** | Approval choice early and in the funnel (no preselection), cancellation FAQ, 14-day withdrawal, "Wat we van je weten". Claims caveats R2/R3 are listed separately |
| Pricing clarity (5) | 4.5 | **5.0** | "Wat jij overhoudt" ledger per plan, shown only after an estimate; net figure first; yearly first everywhere; recommended plan follows the rules |
| Path to sign-up (7) | 4.5 | **4.5** | Sticky CTA on every page (plan-specific on plans and Switch Plus), per-step URLs, answers survive NL↔FR, 3-link funnel. Offset by the mobile hero CTA below the fold |
| **Weighted conversion subtotal /5** | **4.52** | **4.68** | |
| Conversion-strategy §7 rubric (/100) | 89 | **90** | Gains on personal value, pricing, distraction and relevance are mostly eaten by the mobile CTA position and the hidden guarantee condition |
| §7 gates (VP / CTA / pricing ≤ 2) | pass | **pass** | |

§7 detail for the final site (score × weight): VP 4.5×12 · CTA 4×12 · friction 4.5×10 · personal value 5×10 · pricing 5×10 · risk reversal 4.5×8 · anxiety 5×10 · social proof 3.5×8 · distraction 5×6 · relevance 5×6 · urgency 3.5×4 · mobile 4×4. Total 451 / 5 = 90.2.

---

## 2. Funnel metrics (final site, measured)

| Metric | C · round 1 | Final · round 2 |
|---|---|---|
| Primary CTA in first viewport, 1280 | 2 (hero + header) | 2 (hero + header); postcode at 628 px |
| Primary CTA in first viewport, 390×844 | 1 (button at 632 px) | **0 visible**: NL button top 839 px (5 px showing), FR 890 px; at 375×667 and 320×640 the input is also below the fold. **Regression R1** |
| Sticky CTA, mobile (6 scroll depths) | home, how only | **every content page, NL + FR** (home, how and FAQ use "Bereken je besparing"; plans and Switch Plus use "Switch Plus · € 99 per jaar · Kies…"). Hidden in the funnel, while the hero or final form is in view, and at the page bottom |
| Sticky header CTA, desktop | all pages | all pages |
| Postcode px (m): plans / Switch Plus / how / FAQ | 9496 / 6401 / 11714 / 3914 | 11025 / 6748 / 11982 / 4297. The sticky covers this, but on plans and Switch Plus it only appears after ~35 % scroll |
| `signup_started` | postcode + Enter → fires on `/aanmelden/` | same, once per session; props: lang, device, region, entry page, entry CTA, plan intent |
| Required inputs to estimate | 2 taps + click | 2 taps (household, meter) + click; town and grid operator confirmed inline ("9000 Gent · Vlaanderen · netbeheerder Fluvius") |
| Screens | 2 + estimate | 3 (woning · schatting · abonnement) + confirmation; each step has its own URL (`#schatting`, `#abonnement`, `#bevestigd`) and back works |
| Estimate display | gross first, then net | **net first** ("Wat je naar schatting overhoudt … € 80 – € 260"), with the gross → fee → net ledger underneath, "Indicatief" label and method note |
| Switch preference | Auto preselected | **no preselection**, both options equal (error if skipped) |
| Funnel exits | logo, Home, lang (lang dropped `?postcode`) | logo, "Hulp nodig? · Veelgesteld" → FAQ page, lang (**keeps every answer and the step**), a benign "Stuur deze schatting door" mailto |
| Proof ≤ 40 px of in-body CTAs (1280 / 390) | 0/20 · 0/20 (median 76 / 90 px) | **desktop 40–45 px on all 18 (passes the ~40 px rule)**; mobile 65 px on 16/18 |
| Risk reducer ≤ 40 px | 18/20 | **18/18 desktop, 16/18 mobile (10–12 px)** |
| Yearly total next to every monthly price | 100 % | **100 %** (48 checks; the only script miss is the hero range line, where the yearly figures are in the heading directly above) |
| Event chain | started → estimate | `cta_click` → `signup_started` → `signup_step_viewed` → `estimate_viewed` {verdict, net_band, source: illustrative} → `plan_selected` → `signup_submitted` |

### Estimate rule check (7 scenarios, NL + FR)
| Scenario | Net shown | Recommendation | Verdict against the PO rules |
|---|---|---|---|
| 1 person, electricity only, analogue | € 0 – € 10 | "Eerlijk gezegd: je zit al goed" + guarantee with its condition | OK |
| 1 person, electricity, analogue, solar | **"€ 0 – € 0"** (gross € 30–80 − € 99) | "Je zit al goed" | Rule met, but the floor at € 0 hides that the fee exceeds the saving (R5) |
| 2 people, both, digital + solar | € 50 – € 210 (Premium: € 0 – € 110) | Switch Plus ("Premium zou een groot deel van je besparing opeten") | OK; the Premium floor hides a possible −€ 48 (R5) |
| 5+, both, digital + solar | Premium € 60 – € 330 (Switch Plus € 160 – € 430) | Premium, with "met Switch Plus hou je € 99 meer over" disclosed | Rule met (fee doesn't eat the saving). Accepted ARPU trade-off; test it (T4) |
| plan=premium intent, analogue | € 140 – € 380 on Switch Plus | Switch Plus with explanation (P1 port needs a digital meter) | OK (defect 6 fixed) |
| 1 person, electricity, digital + solar + heat pump | € 10 – € 120 | Switch Plus | OK |
| FR, 2 people, both, analogue | 80 € – 260 € | Switch Plus | OK |

No preset numbers anywhere before input: the home page has no € ranges, and the plans ledger shows its method line ("Jouw besparing − je abonnement = wat jij overhoudt") until an estimate exists, then fills per plan. The Switch Plus worked example (€ 240 → € 141) is labelled "voorbeelden, geen belofte". That is acceptable.

---

## 3. Verdict per round-1 finding

| # | Round-1 finding | Verdict | Evidence |
|---|---|---|---|
| 1 | € estimate computed in the browser (C17) | **Accepted risk: rules met** | Net first, method note, "Indicatief", no presets, fee-eats-saving rule works in all 7 scenarios. Residual R5 (floor at € 0) |
| 2 | No sticky mobile CTA on plans / Switch Plus / FAQ | **Fixed** | Present on all 10 content routes NL + FR; plan-specific on plans and Switch Plus. Residual: appears only after ~35 % scroll on plans and Switch Plus |
| 3 | Proof > 40 px from CTAs | **Fixed on desktop, partly fixed on mobile** | Desktop 40–45 px; mobile 65 px (the rating line wraps under the helper line) |
| 4 | Guarantee wording | **Fixed, with one regression** | Tagline now "Besparen, met winstgarantie." / « Économisez, avec garantie de gain. »; "zonder risico op verlies" is gone; chips and cards carry the condition. **R2:** mobile hero panel shows "€ 99 terug." without its condition |
| 5 | B calculator CTA below fold | n/a (B not carried over) | But the same pattern now appears on the final mobile hero (**R1**) |
| 6 | Funnel exits / state loss | **Fixed** | 3 links + mailto; language switch keeps answers and step (tested NL → FR at `#estimation`); back → `#schatting` |
| C-1 | C17 method disclosure | **Kept** | Full assumptions under "Hoe we dit berekenden" |
| C-2 | Sticky on plans / Switch Plus / FAQ | **Fixed** | see 2 |
| C-3 | Rating distance; "zonder risico op verlies"; lang switch drops postcode | **Fixed** (mobile distance partly) | see 3, 4, 6 |
| C9 | "Jij betaalt ons, niet de leverancier" | **Regression (R3)** | Round 1 footnote 5 said commissions were unconfirmed; the final footnote drops that ("June leeft van de abonnementen van haar klanten…"), so the hero claim and the diagram's "Verdient aan je abonnement, niet aan je verbruik" now read as confirmed while issue #6 (P0) is still open |
| C1 | € 326 footnote placeholders | **Placeholders removed**; claim still lacks period and sample | Footnote now reads "berekend door June tegenover het contract vóór de overstap". This follows the PO rule (no visible placeholders), but the claim stays high-risk until June supplies the period and customer count |
| — | Cancellation question in FAQ | **Fixed** | "Kan ik mijn abonnement opzeggen?" uses safe wording: 14 days, terms shown before payment, no exit fee on the energy contract |
| — | Approve each switch yourself | **Fixed** | In the hero panel, the four-party strip, the plans intro, and an equal, non-preselected funnel choice |

---

## 4. New regressions and claims findings

| ID | Where | Issue | Rule / impact | Severity |
|---|---|---|---|---|
| **R1** | `/nl-be/`, `/fr-be/` at < 700 px | The three-question panel sits between the H1 and the form, so the hero button is below the fold (390×844: NL 839 px, FR 890 px). The sticky bar stays hidden until ~15–35 % scroll. The first mobile viewport has **no visible primary CTA** | §7 CTA and mobile ergonomics; H1 (inline postcode) weakened on the device with the most traffic | **High (conversion)** |
| **R2** | same, at < 700 px | Panel shows "€ 99 terug." / « 99 € remboursés. ». The condition paragraph is `display:none` on mobile | C7 / freeze §2.3 (amount + condition always together) | **High (claims)** |
| **R3** | `/nl-be/` + `/fr-be/` hero lede, four-party strip, footnote 5 | "Jij betaalt ons, niet de leverancier." / « C'est vous qui nous payez, pas le fournisseur. » and "Verdient aan je abonnement, niet aan je verbruik" with no qualifier | C9 / issue #6 P0: a misleading omission if commissions exist | **High (claims)** |
| **R4** | `/aanmelden/` estimate step, "Ons advies" (NL); `/inscription/` « Notre conseil » (FR) | "we zoeken elke maand het voordeligste contract voor je" / « le contrat le plus avantageux » without "uit onze vergelijking" / « parmi ceux que nous comparons » | C6 superlative | Medium |
| **R5** | estimate + plan ledger | Net ranges are floored at € 0 ("€ 0 – € 0"; Premium "€ 0 – € 110" when gross − fee reaches −€ 48) | C8 rule 2 / VI.97: understates a possible net cost | Medium |
| R6 | 390: `/abonnementen/`, `/switch-plus/` | No CTA in the first viewport; plan sticky appears only after ~35 % scroll | Path | Low |
| R7 | funnel header | "Hulp nodig? · Veelgesteld" navigates to the FAQ page. State survives through the URL, but it is an exit | §5.5 enclosed flow | Low |

Still clean: 17+ suppliers, € 326 with *gemiddeld* and a footnote, partial stars 4,3, "inbegrepen" dongle, capacity tariff limited to Flanders on FR, green energy "volgens de leverancier", no `[…]`/TBC placeholders on any of the 12 routes. Reviews are still a rating card only (C15 can't be judged; social proof stays at 3.5).

---

## 5. Remaining fixes, ranked

1. **R1: mobile hero CTA into the first viewport.** Below 700 px, put the postcode form directly under the H1 and the one-line lede, and move the three-question panel under the trust row. Alternatively, show the sticky bar at load whenever the hero button isn't in view. Target: button bottom ≤ 780 px at 390×844 NL and FR.
2. **R2: guarantee condition on mobile.** Show a short form of the condition instead of hiding it: "€ 99 terug als je niet meer bespaart dan je abonnement kost." / « 99 € remboursés si vous n'économisez pas plus que votre abonnement. »
3. **R3: independence claim.** Until issue #6 is confirmed, use the C9 safe phrasing ("June is geen energieleverancier en kiest je contract op basis van jouw verbruik") in the lede and diagram, or restore the round-1 footnote that commissions are still to be confirmed.
4. **R4:** add "uit onze vergelijking" / « parmi ceux que nous comparons » to the estimate advice copy (in `src/i18n/signup.js`).
5. **R5:** when gross − fee < 0, show "minder dan je abonnement kost" / « moins que le prix de votre abonnement » (or the signed range) instead of € 0, in both the estimate and the plan ledger.
6. **Proof within 40 px on mobile:** merge the rating into the helper line ("Vrijblijvend · ★ 4,3 Google · 20.000+ klanten"). It sits at 65 px today.
7. **R6:** show the plan sticky from the first scroll on plans and Switch Plus.
8. **Owner items before launch:** the € 326 basis (period, sample), real Google reviews (C15), commissions (issue #6), and legal sign-off on the browser estimate.

---

## 6. Updated A/B test plan (base = final site)

**Ship before testing** (compliance and hygiene, not hypotheses): fixes 1–7 above.
**Primary metric:** `signup_started` / eligible sessions. **Guardrails:** start → `estimate_viewed`, start → `signup_submitted`, 14-day cancellations, and the share of `estimate_viewed.verdict = "al goed"`, which should not fall because of copy pressure. **Split:** 50/50, stratified by locale and device. **Power:** about 18.5k sessions per arm for a +10 % relative lift at an 8 % base rate; run at least 2 full weeks and don't peek.

| Order | Test | Hypothesis | Challenger | Metric focus |
|---|---|---|---|---|
| 1 | Mobile hero order | H1 | Form directly under H1 (panel below) vs panel first, after fix 1 lands as the default | mobile starts |
| 2 | Headline | VP / H2 | A's outcome H1 "Altijd een goed energiecontract. Zonder er nog aan te denken." vs "Energieleveranciers rekenen op je trouw. Wij niet." | starts, NL and FR read separately |
| 3 | Premium recommendation for high savers | H14 / H4 | Recommend Switch Plus with Premium as the upgrade vs the current rule (Premium when digital + solar and the net stays positive) | `plan_selected` mix, completion, ARPU, 14-day cancels |
| 4 | Net vs gross headline on the estimate | H7 / H13 | Gross first (net second) vs net first | start → submitted |
| 5 | Proof inside the CTA group | H12 / H6 | Rating + guarantee chip on the same line as the button vs separate lines | starts |
| 6 | Personal cost of waiting | H16 | "Elke maand wachten ≈ € X" from the user's net estimate vs none | submitted |
| 7 | FR-specific proof | H22 | FR reviews + Walloon/Brussels example vs the current rating card | FR starts (once reviews exist) |

# Round 2 — Design evaluation (design critic): `variants/final`

**Scope.** This round scores the same six Design criteria as round 1, weighted 7/5/5/5/5/3 (total 30). It compares the final site against **C · Honest Market's round-1 scores** and against my round-1 findings for C. The findings borrowed from A, B and E are also checked.

**Method**
- **Screenshots.** All 12 routes at 1280. Home, plans, Switch Plus and sign-up at 390 and 320. FR home at every width.
- **Live Playwright runs, motion not reduced.**
  - Hero frames at 100 / 300 / 600 / 900 / 1300 / 2000 ms.
  - CTA hover and keyboard focus.
  - Mobile sticky bar and menu.
  - FAQ open state.
  - Sign-up at 1280 and 390, plus the builder's `report/funnel-shots` (estimate, "je zit al goed", Premium + analogue meter, confirmation, FR).
  - `prefers-color-scheme: dark`.
  - A horizontal-overflow sweep at 390 and 320.
- **Evidence** is in `evaluations/scratch/design/r2/` and `live/final-*` (scripts: `r2full.mjs`, `probe.mjs`, `chart.mjs`, `signup.mjs`).
- **Gates.** The site passes every gate: 0 overflow at 320, no broken images, CLS 0, LCP ≤ 2.3 s. The only unloaded image is the cheering character inside the hidden confirmation step, which is expected.

## Scores

| Criterion (weight) | C · round 1 | **Final** | Δ | Why |
|---|---|---|---|---|
| Visual hierarchy (7) | 4.0 | **4.5** | +0.5 | Spec table moved into a 3-up strip under the hero; product band and green summary card give the page rhythm; the money-flow diagram now reads left to right. The hero right column still stacks two modules (tile + chart). |
| Typography (5) | 4.5 | **4.5** | = | The editorial system is intact and FR is set natively. FR `99 €` uses a breakable space, and the proof-stat row collides on mobile. |
| Colour & imagery (5) | 3.5 | **4.0** | +0.5 | Real leaf dongle + phone band on home and plans, a June Green summary card, a teal squiggle, and the cheering character on the confirmation. There is still no photography, which is expected. |
| Brand distinctiveness (5) | 3.5 | **4.0** | +0.5 | The squiggle under "Wij niet." / "Pas nous.", the green final card and the character ×1 per page make it read as June now. The spark exists only on home; inner pages are still pure ink on paper. |
| Craft & motion (5) | 4.0 | **4.0** | = | Motion is now genuinely good, but a visible text collision on mobile and a hero tile that has lost its meaning cap this score. See below. |
| Consistency (3) | 4.5 | **4.5** | = | One system across 12 routes and both languages, and dark mode everywhere. There are three different inverse-CTA treatments. |
| **Design subtotal (/5)** | **3.97** | **4.25** | **+0.28** | Clears the 4.0 bar on design. |

## Round-1 findings for C — verdicts

| # | Round-1 finding | Verdict | Evidence |
|---|---|---|---|
| 1 | No product imagery on home | **Fixed** | "Premium · met de June Dongle" band with the real leaf dongle, the NL/FR phone mockup and an "Echte June-app" tag, on home and plans. |
| 2 | Signature motion missing (the chart was static) | **Fixed** | Both lines draw in about 700 ms and the red "prijs van trouw" ellipse follows (captured at 300 → 900 ms). The squiggle draws at 350 ms and the tile dots tick in from 900 ms. It uses app easing, runs once and never delays the CTA. |
| 3 | "Jij → June → Leverancier" diagram left 60 % empty | **Fixed** | Three nodes span the full width, with labelled edges ("abonnement, vaste jaarprijs") and a dashed return path ("Je energiefactuur betaal je, zoals nu, aan de leverancier"). |
| 4 | Hero right column crowded (spec table + chart) | **Partly** | The spec table moved into a 3-up strip under the hero, which is good. But A's status tile now sits on top of the chart, so the right column still holds two framed modules competing with the H1 and CTA. |
| 5 | Typo "er er", avatar silhouettes, amber "Wordt bevestigd" pill | **Fixed** | The typo is gone. Reviews show 4,3/5 + facts with no silhouettes. No bracket or TBC placeholders are visible anywhere. |
| 6 | Mobile chart labels at 11–12 px | **Fixed** | Below 420 px the plot drops its on-chart labels and uses a legend underneath ("Niets doen / Met June / De prijs van trouw"), which is readable at 320. |

**Borrowed elements**

| Borrowed | Verdict | Notes |
|---|---|---|
| A · hero status tile | **Partly** | See regression R2: the 12-month strip lost its meaning. |
| A · product band | **Fixed** | Same quality as A. |
| B · ledger and funnel estimate state | **Fixed** | Best-in-class. The ink estimate card shows net first and gross second, and "Eerlijk gezegd: je zit al goed" appears on a low result. |
| E · squiggle, CTA "charge" hover, cheering character on confirmation | **Fixed** | The hover lifts −2 px with a 4 px `#1CA498` offset shadow, which is on-brand. |

## New regressions

| # | Where | Problem | Severity |
|---|---|---|---|
| R1 | Home, "04 Wat klanten zeggen", proof-facts row (`.rating-facts`) at 390 and 320 | **"20.000+" overprints "klanten".** "€ 326" also breaks onto two lines ("€" / "326"). Cause: the mobile row uses `grid-template-columns: minmax(0, 7ch) …`, and 7ch at Inter/15 px is narrower than a 28 px Montserrat numeral. | High: visible on every phone view of the home page |
| R2 | Hero status tile, all widths | The month labels (j, f, m…) are `sr-only`, so the strip is 12 identical teal dots with no current month and no empty future months. A's "we checked this month" meaning is gone and it now reads as decoration. At 320 it becomes a 12-dot line. | Medium (hierarchy, craft) |
| R3 | Plans cards, Switch Plus, every CTA | Defect #2 (proof within 40 px of every CTA) was applied mechanically. "★ 4,3/5 op Google · 1.200+ reviews / 14 dagen bedenktijd" appears under **each** of the three plan buttons, and again under the product band and the promise band. The repetition makes the plan cards noisy. | Medium (hierarchy) |
| R4 | FR home 3-up strip ("vous récupérez 99 / €."), FR plans | A regular space between the amount and "€" lets the currency symbol wrap onto its own line. There are 2 instances on the FR home and 1 on the FR plans page. | Low–medium (FR typography) |
| R5 | Inverse CTAs | There are three inverse treatments: a white button on the ink promise band, a mint (`#9ad…`) button with ink text in the plans "Wat hou jij over?" ink card, and an ink button on the green summary card. | Low (consistency) |
| R6 | FAQ at 1280 | The category heading ("01 · 4 VRAGEN / Over June") sits vertically centred against its question list instead of top-aligned. With an item open it floats mid-column. | Low (craft) |
| R7 | How it works and home money-flow | The `euro` icon stacks on its own line above the edge label ("€ / betaalt een jaarprijs") and reads as a stray glyph. | Low |

## Remaining fixes, ranked by score impact

1. **R1 — proof-facts row** (craft 4.0 → 4.5). In `styles/home.css`, below the mobile breakpoint, change `.rating-facts li` to `grid-template-columns: max-content minmax(0, 1fr)`. Add `white-space: nowrap` on `strong`, and use a non-breaking space in "€ 326". Re-check at 320 in NL and FR.
2. **R2 — make the tile's strip mean something again** (hierarchy and craft). Show the month initials under the dots as in A: past months filled, the current month dark with a check, future months as outlines. Keep one "Gecontroleerd deze maand" chip. If there is no room, drop the strip rather than keep 12 anonymous dots.
3. **Brand spark beyond the home page** (brand 4.0 → 4.5). The brief allows **one squiggle word per page** and only home has one.
   - Add the squiggle to one H1 word on each page: plans "vaste", Switch Plus "winstgarantie", how it works "voordelig", FAQ "Eerlijke".
   - Reuse the green summary card as the final CTA on the funnel entry pages as well.
4. **R3 — show proof once per card row** (hierarchy 4.5 → 5). Remove the rating and "bedenktijd" lines from inside the three plan cards. Put one proof line centred under the row, next to "Alle prijzen incl. 21 % btw". Keep one line only next to *standalone* CTAs.
5. **Hero right column** (hierarchy). Merge the tile and the chart into one framed figure: put the tile's price and guarantee row as the chart's caption band. Alternatively, move the tile under the CTA on desktop so the right column carries only the chart.
6. **R4 — FR number formatting.** Format every amount through one helper that inserts U+202F or U+00A0 before "€" in FR (and after "€" in NL).
7. **R5 — one inverse-CTA rule** (consistency 5). Use a white button with ink text on ink and on green alike, and remove the mint-fill variant.
8. **R6 / R7 craft polish.** On the FAQ, add `align-self: start` to the category head. In the money-flow, place the € icon inline before the label, or remove it.

**Verdict.** The integrated site is clearly better than C: premium, trustworthy and now recognisably June, and the best-designed funnel of any round. After fixes 1–3 I would expect about 4.45 on design. The site stays editorial first. Getting it to 5 would need real photography and the brand spark on every page, not more motion.

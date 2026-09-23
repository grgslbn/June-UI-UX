# Round 3 — Evaluator 2 (UX research + accessibility)

**Persona and method:** the same persona and method as Round 2. I did not build any of this.

**Build under test:** `app/index.html`, 33 panels, after the round-2 fix round (`evaluations/round2-fixlist.md`, demo-data change log 10–13, `COMPONENTS.md` §0).

**Evidence (all in `shots/eval2-r3/`):**
- Screenshots of all 33 panels at 1280 and 390.
- Product text of every panel: `panels-text.txt`.
- Re-run probes:
  - `a11y-probe.mjs` → `a11y.json`
  - `advice-undo.mjs`
  - `labels.mjs` → `labels.txt`
- New probe `pop-dom.mjs`, with screenshots of an open popover at both widths.
- `tools/audit.mjs --verbose`: **0 hard-gate failures**. That covers 66 panel×viewport checks with 0 overflow and reduced motion handled.

**Scoring:** UX score per tab = Σ(score × weight) / 50. The weights are 5-second 12, Cognitive load 8, Action 8, Edge 8, Accessibility 8, Responsive 6.

## Summary table

| Tab | 5-sec (12) | Cog. load (8) | Action (8) | Edge (8) | A11y (8) | Responsive (6) | **UX /5** | R2 | Edge rating |
|---|---|---|---|---|---|---|---|---|---|
| Overview | 4.5 | 4.5 | 4.5 | 4.0 | 4.5 | 4.5 | **4.42** | 4.18 | 4 |
| Compare | 4.5 | 4.0 | 4.0 | 4.0 | 4.5 | 4.0 | **4.20** | 3.88 | 4 |
| Solar | 4.5 | 4.0 | 4.0 | 4.5 | 4.5 | 4.5 | **4.34** | 3.60 | 4.5 |
| Breakdown | 4.5 | 4.0 | 4.0 | 4.5 | 4.5 | 4.5 | **4.34** | 3.90 | 4.5 |
| Peak | 4.0 | 4.0 | 4.5 | 4.5 | 4.5 | 4.5 | **4.30** | 4.20 | 4.5 |
| Forecast | 4.5 | 4.0 | 4.0 | 4.5 | 4.5 | 4.5 | **4.34** | 4.12 | 4.5 |
| Advice | 4.5 | 4.5 | 4.0 | 4.5 | 4.5 | 4.0 | **4.36** | 3.80 | 4.5 |
| Budgets | 4.5 | 4.0 | 4.0 | 4.0 | 4.5 | 4.5 | **4.26** | 4.02 | 4 |
| **Overall UX (mean)** | 4.44 | 4.13 | 4.13 | 4.31 | 4.50 | 4.38 | **4.32 / 5** | 3.96 | |

**Verdict:** UX goes from 3.96 to **4.32**, which clears the 4.0 bar with 0 gate failures. Every tab is now ≥ 4.2.

The one tab that barely moved is **Peak**. Its new hero sentence leads with the Flemish comparison instead of the capacity-tariff number (regression R1 below).

---

## 1. Round-2 top 10: verdicts

| # | R2 finding | Verdict | Evidence |
|---|---|---|---|
| 1 | Solar hero "Net exporter today" is false | **Fixed** | The h1 now reads "Sent to the grid today". The supporting line names 8.4 made, 5.2 used and 4.4 drawn from the grid. The flow labels read "3.2 exported / 5.2 used at home / 4.4 imported". The Overview row says "3.2 kWh sent to the grid today". |
| 2 | Popovers were dialogs without focus management | **Fixed** | The tip has `role=note` and sits in the panel right after its trigger's block (`follows: true`). The trigger has `aria-expanded` + `aria-controls`. Tabbing away closes it, Esc closes it and returns focus. Probed on 10 tips across 5 tabs. Leftover: on desktop, the Peak "rolling average" tip covers the 4.0 kW numeral it explains (`popover-open-1280.png`). |
| 3 | Add→Undo on Advice lost focus under reduced motion | **Fixed** | With `reduce`, focus now lands on Undo at both 1280 and 390. Enter restores the tip (plan count 1 → 0) and focus returns to "Add to my plan". |
| 4 | Breakdown "May · 820 kWh" contradiction | **Fixed** | Breakdown now shows April 2026: 442 kWh total, heating 168 kWh (38%). April is highlighted in the seasonal chart, and the footnote explains "last full month". |
| 5 | Compare personal-best percentile tile; wrong "408→569" | **Fixed** | Personal best moved into "Your ranking over time". A plain line remains: "Your closest month to similar homes was November 2025". The trend sentence now reads "between 372 and 569 kWh". |
| 6 | Budgets awaiting/no-data states lacked when/what; Gas disabled with no reason | **Partly fixed** | Both states now carry an `empty__when` line ("No date yet — it depends on when your meter next reports", plus the first-readings date) and a footnote. Gas shows "Gas: no gas meter linked (i)". What remains: neither state offers a fallback action if readings never arrive, and Gas is drawn with a strikethrough (see R4). |
| 7 | No Overview new-customer state | **Fixed** | `panel-overview-new` has a day meter, "First insights on 23 May · 4 more days", "Set a budget" while you wait, and per-topic readiness chips with a rule footnote. One row contradicts its own tab (R2). |
| 8 | "Now" and readiness rules differed per tab | **Fixed** | Every tab says 20:00; the shell shows "Updated today, 20:00", and `data-updated` follows the history panels. There is one readiness rule: Solar is ready 22 May, and 7-day features unlock the morning after day 7. "This year" is dated ("ready 1 June 2026" / "from 1 June 2027"). |
| 9 | Advice € ordering; heat-pump copy | **Fixed** | "Why this one first" explicitly names the €180 carpet tip. The heat pump now says "Replacing your current electric heating", with "at the average price" stated. |
| 10 | Mobile chart labelling + tab-bar cue | **Fixed** | Peak draws only the 4.0 line, and the month peak is labelled on its red bar. On Forecast, the budget is a red line and last year has left the Month view. Solar has minus ticks, a "Net" key, and Exporting/Importing labels kept on mobile. The tab bar has an edge fade. |

**Tally:** 9 fixed, 1 partly fixed.

---

## 2. New regressions / new issues

- **R1 · Peak hero leads with the benchmark, not the answer** (`app/panels/peak.html`, `#pk-title`).
  - The h1 is now "Your peaks are 0.24 kW below the Flemish average."
  - 5-second test: *"I'm 0.24 kW below… something. Is that good? Oh, 4.0 kW, €7.40."* The intended answer (§3.6: "your capacity-tariff peak 4.0 kW, ≈ €7.40/month") becomes the second message.
  - "Your peaks" is also imprecise: the figure is the 12-month average of monthly peaks.
  - The 0.24 kW comparison appears three times: h1, strip and "You're just under average!", which still has its exclamation mark.
  - **Fix:** h1 = "Your capacity tariff is based on a 4.0 kW peak average — just under the Flemish 4.24 kW." Then make the numeral **≈ €7.40/month**, which adds information under the hero contract. Drop the "!" sentence under the strip.
- **R2 · Overview new-customer Forecast row promises a monthly forecast too early** (`app/panels/overview.html`, `panel-overview-new`).
  - The row reads "Forecast · From 23 May — Your projected use for the month".
  - The same household's Forecast state (`panel-forecast-not-enough-data`) says "This month · From 1 July".
  - **Fix:** change the row copy to "Your next days and week — month forecast from 1 July", or split the chip.
- **R3 · Same chip, two colours** for the same "forecast over, not over yet" situation.
  - Forecast over-budget uses **red** `chip alert` "Forecast to exceed budget" (`forecast.html:246`).
  - Budgets "Cutting it close" uses **amber** `chip warn` with the identical text (`budgets.html:319`).
  - The new colour rule says amber = at risk, not over yet.
  - **Fix:** use `warn` in `forecast.html`, or retitle both chips identically with the same tone.
- **R4 · Disabled segmented options are struck through** (foundation, `.seg [aria-disabled]`).
  - "~~Gas · Weekly~~", and "~~Day~~ ~~Week~~" on Peak.
  - Strikethrough reads as "removed / cancelled" and makes the label harder to read at 50% opacity. Homeowners may think gas was switched off.
  - **Fix:** keep the 50% opacity, drop the line-through, and keep the visible reason next to it.
- **R5 · Forecast Month view no longer shows last year** while the hero sentence is about "8% more than May last year".
  - This was a deliberate de-collision. But the tab's main claim is no longer visible in its main chart; it appears only in the caption ("May 2025 was 269 kWh").
  - **Fix:** add a single ghost end-marker "May 2025 · 269" in the right gutter, de-collided by the new label engine, or change the h1 to lead with 290 vs budget.
- **R6 · Overview hero numeral is again "113 kWh left"** (the product owner's original complaint about C, in the demo-data decision log).
  - This time the h1 carries 290 vs 300 and the caption explains the 113, so it no longer conflicts. I consider it acceptable under the hero contract, and it does not lower the score.
  - Keep an eye on it in user tests: people's eyes go to 113 first.
- **Minor (no score impact):**
  - "Eliq" still appears in two customer popovers: the Peak ≈ €7.40 tip and the Forecast likely-range tip.
  - The Compare trend y-axis now starts at 100, which slightly exaggerates the gap.
  - On Budgets the "stay under 8.7" line was removed from the daily chart, but the future-area text covers it.
  - Forecast next-24h end label "Best estimate 0.45 kWh" is still ambiguous: which hour?
  - The Compare-contributors state says both "Check back in a few days" (frozen copy) and "No date yet".
  - The reviewer chrome wraps to three lines at 390px (meta only).

## 3. Task walkthroughs (re-run)

| Task | Result |
|---|---|
| From Overview, find what needs attention and go there | ✔ "Worth a look" (renamed from "Needs attention", so good news isn't alarming) has three whole-row links that focus the target tab. The new-customer Overview answers "when" for every topic. |
| Understand a jargon term (Peak rolling average, Solar "used at home", Compare "more than X%") | ✔ The tips open in reading order and screen readers can now reach them. Desktop Peak tip covers the value (minor). |
| Change period / fuel / unit | ✔ Radiogroups with arrow keys and `aria-checked`. Disabled options are skipped, and a reason is visible for Gas and €. The strikethrough is noted as R4. |
| Add a tip to my plan and undo | ✔ Works with mouse and keyboard under both motion settings, with a live-region message. New `panel-advice-plan-empty` points back to "See your 3 new tips". |
| Understand why a not-ready state is incomplete and when | ✔ Every not-ready state now has a what / when / what-you-can-do line plus a footnote, on one readiness rule. The one factual slip is R2. |

## 4. Accessibility probe (summary)

- **Focus rings:** every stop in the 8 main panels has a visible ring, with 13–25 stops per panel in a logical order.
- **Targets:** nothing product-side under 24px. The Budgets 20px radios sit inside full-row labels, so they are not a failure. Primary buttons are 44px.
- **Charts:** every chart keeps a specific `role=img` text alternative, updated for the D1–D3 data.
- **Reduced motion:** 0 animations with `reduce`, 1 with `no-preference`.
- **Dead links:** 7 `href="#"` placeholders remain ("Update home profile", "Set house type", "Complete profile"). That is expected in a prototype.

## 5. Content fidelity

- The frozen-content gate passes.
- Data decisions D1–D4 are applied consistently: I checked the Overview rows, Breakdown, Solar, Forecast "now" and the over-budget figure. The over-budget pace is now 6.4 kWh/day = (270 − 187) / 13 days, which is the same formula as Budgets.
- New copy is logged in spec notes, including the "This year ready 1 June 2026" rule, which needs product confirmation.

## 6. Remaining fixes, ranked (only items that would move a score)

1. **Peak hero:** lead with the tariff answer (4.0 kW → ≈ €7.40/month), put the benchmark second, and remove the triple 0.24 repetition and the "!". Moves Peak 5-sec 4.0 → 4.5. — `app/panels/peak.html`
2. **Overview-new Forecast row** promises a monthly forecast on 23 May; the Forecast tab says 1 July. Moves Overview edge 4.0 → 4.5. — `app/panels/overview.html`
3. **"Forecast to exceed budget" chip:** red on Forecast, amber on Budgets. Make both `warn`. Forecast + Budgets cognitive load. — `app/panels/forecast.html`
4. **Disabled segments:** remove the strikethrough, keep the opacity and the visible reason. Budgets and Peak cognitive load. — foundation (`app/components.css`)
5. **Budgets no-data / awaiting:** add a fallback path, e.g. "If nothing arrives by 21 May, check your meter connection →". Moves Budgets edge 4.0 → 4.5. — `app/panels/budgets.html`
6. **Forecast Month view:** restore a last-year reference (a ghost end-marker "May 2025 · 269") so the hero's "+8%" is visible in the chart. — `app/panels/forecast.html`
7. **Row-level actions on Advice / Compare:** still 3 buttons per tip row (12 on screen). On mobile, put "Already do this / Not relevant" behind an overflow. Advice action 4.0 → 4.5. — `app/panels/advice.html`

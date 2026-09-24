# Round 3 — Evaluator 1 (principal product designer, premium consumer fintech/energy)

**Scope.** The rebuilt `app/index.html`: 33 panels, including the new `panel-overview-new` and `panel-advice-plan-empty`. I used the same method and rubric as round 2.

**Evidence** (all in `shots/eval1-r3/`):
- Screenshots of every panel at 1280 and 390, light and dark (132 PNGs).
- Interaction captures, named `int__*.png`, from these scripts:
  - `interact.mjs`: the round 2 script, re-run.
  - `pop2.mjs`: popover geometry.
  - `pop3.mjs`: the Advice ≈ marker and the Compare ranking disclosure.
- `audit.txt`: **0 hard-gate failures**, no overflow at 390 or 1280 in light or dark, and reduced motion handled.
- A source read of the changed tokens and fragments.

I scored the product UI only.

## Summary — design criteria (1–5)

Weights: hierarchy 10, typography 8, colour 8, spacing 6, data-viz 10, consistency 4, craft 4. Subtotal = Σ(w·s)/50.

| Tab | Hierarchy | Type | Colour | Spacing | Data-viz | Consist. | Craft | **Design /5** | Δ vs R2 | Edge states |
|---|---|---|---|---|---|---|---|---|---|---|
| Overview | 4.5 | 4.5 | 4.5 | 4.0 | 4.0 | 4.5 | 4.0 | **4.30** | +0.22 | 4.5 (new) |
| Compare | 4.5 | 4.0 | 4.5 | 4.0 | 4.0 | 4.0 | 4.0 | **4.18** | +0.40 | 4.0 |
| Solar | 4.0 | 4.0 | 4.5 | 4.0 | 4.0 | 4.0 | 4.5 | **4.12** | +0.38 | 4.0 |
| Breakdown | 4.5 | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | **4.10** | +0.72 | 4.0 |
| Peak | 3.5 | 4.5 | 4.5 | 4.0 | 4.5 | 4.0 | 4.0 | **4.16** | +0.06 | 4.0 |
| Forecast | 4.5 | 4.0 | 4.0 | 4.0 | 3.5 | 4.0 | 4.0 | **4.00** | +0.10 | 4.0 |
| Advice | 4.5 | 4.0 | 4.5 | 4.0 | 4.0 | 4.5 | 4.0 | **4.22** | +0.08 | 4.5 |
| Budgets | 4.5 | 4.0 | 4.0 | 4.0 | 4.5 | 4.0 | 4.0 | **4.20** | +0.46 | 4.0 |
| **Mean** | 4.31 | 4.13 | 4.38 | 4.00 | 4.06 | 4.13 | 4.06 | **4.16** | +0.30 | 4.13 |

**Overall weighted design score: 4.16 / 5**, up from 3.86. It now clears the 4.0 bar on design. Every tab is at or above 4.0, and Forecast is exactly on the line.

---

## Verdict on my round 2 top 10

| # | Round 2 fix | Verdict | Notes |
|---|---|---|---|
| 1 | Breakdown palette + data honesty | **Fixed (light) / partly (dark)** | Covered here: the April period, 442 kWh, and the highlighted April bar that agrees with the hero. Dark mode is a regression (first item under New regressions). |
| 2 | One hero contract | **Mostly fixed** | Overview, Compare, Forecast, Budgets, Advice and Breakdown all follow chip → sentence → a numeral that adds information. Over-budget Forecast now leads with "≈ 20 kWh over". **Peak** now leads with the derived "0.24 kW below the Flemish average". That is the round 1 "invented maths" figure promoted to *the answer*, and the right column repeats the same comparison. |
| 3 | Solar hero | **Fixed** | "Sent to the grid today · 3.2 kWh" names the 4.4 kWh import, and the flow numbers are printed once, on the diagram. |
| 4 | Chart labelling rule | **Mostly fixed** | Label collisions are gone. The current period is highlighted on every time series, and there are no charts with both a legend and direct labels. What remains is under Remaining fixes (items 2 and 5). |
| 5 | Solar grid chart | **Fixed** | Minus signs, the net line in ink, regular 00/06/12/18 ticks with a "Now 20:00" marker, and the direction labels kept at 390. |
| 6 | One ≈ marker | **Fixed** | An inline accent ≈ everywhere. Pill badges and "~" are gone, including on the heat pump. |
| 7 | Edge-state template | **Fixed, with one new glitch** | Every not-ready state has a "when" line, an action or "nothing to do", and a footnote. The Breakdown skeleton was replaced by the shared template. The household chip is hidden on no-house-type. The motif problem is the second item under New regressions. |
| 8 | Budgets daily chart | **Fixed** | The target is annotated only over 19–31 May, the dark muted bars are legible, and the meter key is a clean 3-row table. The hero leads with the pace. |
| 9 | Headings + one warning colour | **Partly** | Headings are fixed: sentence-case card titles, and the caps kicker removed. +73% is ink on both Overview and Compare. The warning colour is not fixed (third item under New regressions). |
| 10 | Controls polish | **Mostly fixed** | Desktop popovers now clamp inside their card: Peak's ≈ popover sits at x 92–412 in a card starting at 80. Toggle thumbs run 240 ms with no overshoot. Disabled options are struck through and faded, with a stated reason ("Gas: no gas meter linked"). Mobile Advice tabs no longer clip. Still open: the Compare "Your ranking" tip opens *upward* over the previous card's border and the disclosure header (`int__cp-rank-open.png`). |

## New regressions

1. **Breakdown in dark mode: the second category is the loudest bar.** The ramp runs dark → light (`--cat-2 #2c4349` in light, `#d5dfe0` in dark). In dark mode, "Water heating" renders near-white and outshines the accent Heating bar. In light mode it is near-black and still competes. *Fix* (`tokens.css`): start the ramp at mid-ink (cat-2 ≈ ink-500, fading lighter in light mode and darker in dark mode), so the accent stays the highest-contrast bar in both themes.
2. **The motif now peeks out from behind the tile corner.** On empty states such as `panel-compare-no-house-type` and `-no-group`, a halftone fragment pokes out at the top-right edge of the card and reads as a rendering artefact rather than a motif. *Fix* (foundation `.motif`): place it fully inside the canvas margin with a deliberate offset, or drop it on empty states.
3. **The same chip in two colours.** "Forecast to exceed budget" is **red** on `panel-forecast-over-budget` and **amber** on `panel-budgets-close`, and both describe the identical situation: forecast above budget, not yet over. The COMPONENTS §0 rule says amber means "at risk, not over yet", so Forecast is the one that is wrong. *Fix:* use `warn` in `forecast.html` and keep red for "Over budget" (actual use above the budget). Alternatively, rename the Budgets chip.
4. **The Forecast month chart lost its comparison.** The May 2025 series was removed. The hero and caption still say "+8% vs May last year (269 kWh)", but nothing in the chart shows it. The forecast end point is also unlabelled; only "Budget 300 kWh" carries a label. *Fix* (`forecast.html`): restore May 2025 as a muted ink line and direct-label both ends ("May 2026 ≈ 290 forecast", "May 2025 269"). The collision engine now handles this.

## Remaining fixes (only items that move a score)

1. **Peak hero** (`app/panels/peak.html`): make the answer the tariff figure. For example: "Your 12-month average is 4.0 kW — that's what sets your capacity tariff." Keep the numeral as ≈ €7.40/month or 4.0 kW, not both. Leave the 0.24 kW comparison in the right column only. *(Hierarchy 3.5 → 4.5, so Peak design rises to about 4.36.)*
2. **Forecast month chart** (`forecast.html`): restore May 2025 and label both end points (regression 4). *(Data-viz 3.5 → 4.5.)*
3. **Category ramp** (`tokens.css`): mid-ink first, so the accent leads in both themes (regression 1). *(Breakdown colour 4.0 → 4.5.)*
4. **One chip colour for "Forecast to exceed budget"** (`forecast.html`; regression 3). *(Colour on Forecast and Budgets: +0.5 each.)*
5. **Solar seasonal chart** (`solar.html`): switch the legend to `seriesLabels:'direct'` at the May column, as the foundation now supports. It is the last legend-driven stacked chart apart from the key row at narrow widths. *(Solar data-viz 4.0 → 4.5.)*
6. **Popover direction** (foundation `app.js`): prefer opening *below* the trigger, and never cross a card boundary. The Compare ranking tip overlaps the disclosure header. *(Consistency and craft.)*
7. **Motif placement** on empty states (foundation; regression 2). *(Craft.)*
8. **Spacing:** Peak's "What's coming up" tile has about 60 px of dead band above the CTA, and the Solar hero's left column still ends about 60 px short of the flow diagram. Align the CTA to the bottom deliberately, or let the tiles size to their content. *(Spacing 4.0 → 4.5 on Peak and Solar.)*

If items 1–4 land, the design mean rises to about 4.3.

## Notes
- **Strongest new work:** `panel-overview-new`, with readiness chips per topic, the stated unlock rule and correct dates; the Advice "Why this one first" callout; and the Budgets hero written around the pace.
- **Motion is compliant:** the tokenised durations are 90/160/240/480/700 ms, the thumbs run 240 ms with ease-out, the only infinite loop is the Solar flow, and reduced motion is honoured.
- **Dark mode** is checked on Overview, Solar, Breakdown, Budgets and Peak. The only dark-specific defect is regression 1.

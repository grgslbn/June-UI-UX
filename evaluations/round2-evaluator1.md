# Round 2 — Evaluator 1 (principal product designer, premium consumer fintech/energy)

**Scope.** Direction C "Soft Native", rolled out across all 8 tabs in `app/index.html`: 31 panels, 8 main panels and 23 edge states.

**Evidence** (all in `shots/eval1-r2/`):
- Screenshots of every panel at 1280 and 390, light and dark (124 PNGs).
- Interaction captures, named `int__*.png`, from these scripts:
  - `interact.mjs`: 26 states covering popovers, disclosures, segmented toggles, the Solar series filter and period views, and Advice add-to-plan and dismiss.
  - `pop2.mjs`: popover geometry.
  - `calc-m.mjs`: the Peak calculation table on mobile.
- A source read of `tokens.css`, `components.css`, `app.js` and the fragments.
- `tools/audit.mjs` output, saved as `audit.txt`.

I scored the product UI only. The `.meta` bar and the Spec drawers never leak into product UI.

## Summary — design criteria (1–5)

Weights: hierarchy 10, typography 8, colour 8, spacing 6, data-viz 10, consistency 4, craft 4. Subtotal = Σ(w·s)/50.

| Tab | Hierarchy | Type | Colour | Spacing | Data-viz | Consist. | Craft | **Design /5** | Edge states |
|---|---|---|---|---|---|---|---|---|---|
| Overview | 4.0 | 4.5 | 4.0 | 4.0 | 4.0 | 4.0 | 4.0 | **4.08** | n/a |
| Compare | 4.0 | 4.0 | 3.5 | 4.0 | 3.5 | 3.5 | 4.0 | **3.78** | 3.5 |
| Solar | 3.5 | 4.0 | 4.0 | 3.5 | 3.5 | 3.5 | 4.5 | **3.74** | 4.0 |
| Breakdown | 3.5 | 4.0 | 2.5 | 4.0 | 3.0 | 3.5 | 3.5 | **3.38** | 3.5 |
| Peak | 4.0 | 4.5 | 4.5 | 3.5 | 4.0 | 4.0 | 4.0 | **4.10** | 4.0 |
| Forecast | 4.0 | 4.0 | 4.0 | 4.0 | 3.5 | 4.0 | 4.0 | **3.90** | 3.5 |
| Advice | 4.5 | 4.0 | 4.5 | 4.0 | 4.0* | 3.5 | 4.0 | **4.14** | 4.0 |
| Budgets | 3.5 | 4.0 | 4.0 | 3.5 | 3.5 | 4.0 | 4.0 | **3.74** | 3.5 |
| **Mean** | 3.88 | 4.13 | 3.88 | 3.81 | 3.63 | 3.75 | 4.00 | **3.86** | 3.64 |

\*Advice has no charts, so its data-viz score rates how numbers are presented (€ and kWh pairs, the payback table).

**Overall weighted design score: 3.86 / 5.** This is the equal-weight mean of the eight tabs. It is below the 4.0 bar on design alone. Data-viz (3.63) and consistency (3.75) pull it down.

**Hard gates:** `audit.mjs` reports 0 hard-gate failures. Every panel has at most 6 font sizes and no horizontal overflow at 390 or 1280, in light or dark. Reduced motion is handled.

### Round 1 issues on C: status

| Round 1 issue | Status |
|---|---|
| Peak gauge (0–6 kW arc, −0.24 at its centre) | **Fixed.** Replaced by a 0–5 kW bullet chart with a 4.24 marker. The derived figure survives only as a chip, "0.24 kW below the Flemish average", which is acceptable. |
| Overview hero 113 vs 290 | **Fixed.** The numeral is 290, and 113 moved to the caption. **But the same pattern reappears on Budgets:** the sentence says "113 kWh left", the numeral says 8.7 kWh/day. |
| Red overuse | **Largely fixed.** On Peak, red is now only the month-peak bar and label plus the "highest" tag; the roll-off bar and hourglass are ink. Year view shows June 2025 in ink. One leftover: on Overview, +73% is red in the attention card but ink in the topic row and in the Compare hero. |
| Duplicate affordances on the attention cards | **Fixed.** Each card is a whole-card link with one chevron. |
| Leaky ≈ popover | **Partly fixed.** On mobile it becomes a bottom sheet, which is good. On desktop it is anchored below the trigger, but it is clamped to the *viewport*, not the card: on Peak it spans x 16–336 while the card starts at 80, so it overhangs the tile. |
| Mobile calculation table wrapping | **Fixed.** Month and date share a cell, and values no longer wrap (`int__m-peak-calc.png`). |
| Dark-mode active tab too subtle | **Fixed.** The active tab now has a ring. |
| Crowded threshold lines | **Not fixed.** On Peak, the 4.2 and 4.0 lines are still about 3 px apart. |

---

## Per-tab findings

### Overview — 4.08
The hero reads cleanly: status chip, answer sentence, the 290 numeral, then the meter with used, forecast and budget. The ranked "Needs attention" list and "All topics" rows are both well built.
- **Hierarchy 4.0.** The sentence and the numeral both say "290 kWh", and the hero's right 40% is empty. Items 1 and 3 in "Needs attention" repeat the Compare and Advice rows directly beside them.
- **Colour 4.0.** +73% is red only in the attention card.

### Compare — 3.78
- **Colour 3.5.**
  - *Reason:* the amber "Above similar homes" chip adds a warning hue that is not in the brief's palette logic. It is also the same amber as the Breakdown "Always on" category and close to the elec series colour. +73 is ink here but red on Overview.
  - *Fix:* in `panel-compare` `.chip`, use the neutral chip with a trend icon (as Forecast does) or `--alert` consistently. Make +73% ink on Overview.
- **Data-viz 3.5.**
  - *Reason:*
    - The line chart has **both** a legend and direct end labels.
    - The y-axis runs from 0, leaving about 40% of the plot empty below the "similar homes" line.
    - The personal-best strip runs 90→100% where higher is worse, and its ends are labelled with percentiles.
  - *Fix:*
    - Delete the legend row, since the direct labels suffice.
    - Keep bars-from-zero for bars, but let lines start near 150.
    - Reverse the strip so that "better" points right. Alternatively, label the ends "fewer homes use less" / "more homes use less" and drop the percent ticks.
- **Consistency 3.5.**
  - *Reason:* the kWh | € toggle appears only in the `-eur` state, and its callout sits under the hero, far from the toggle. `.seg--fuel` on `panel-compare` lacks `role="radiogroup"`, which every other seg has. In `panel-compare-partial`, the comparison bars show **no values**, unlike every other bar list.
  - *Fix:* show the unit toggle on every Compare state with data. Put the note directly under the toggle row. Add values to the partial-profile bars, or replace them with a "not enough detail to show amounts" line.

**Edge states: 3.5.**
- The empty states are consistent and honest; "Still gathering the group" and "No matching group" are good.
- `panel-compare-no-house-type` still shows the shell chip "Detached house · Flanders". That contradicts the state, which says no house type is set.
- `panel-compare-good` says "this month" under an April 2026 label.

### Solar — 3.74
The flow diagram is the signature moment. Travelling dots with arrowheads, and the colour mapping (export yellow, home teal, import grey) is consistent across the diagram, the legend, the filters and the seasonal bars. It degrades correctly under reduced motion.
- **Hierarchy 3.5.**
  - *Reason:* the hero leads with the eyebrow "Net exporter today" and a big **+3.2 kWh**, while the flow 400 px to the right shows 4.4 kWh imported. That is open question 18, and the layout *amplifies* it: it becomes the first thing you read. The hero also has no status chip and no answer sentence, unlike five other tabs.
  - *Fix:* in `panel-solar`, lead with an answer sentence, for example "Your panels covered 54% of today's use — 3.2 kWh went to the grid." Make the numeral 54% or 8.4 kWh made. Demote "+3.2 kWh sent" to a stat.
- **Spacing 3.5.**
  - *Reason:* the hero's left column ends at the KPI pair, leaving about 110 px of dead space. The flow numbers are shown three times: in the pills, under the nodes and in the legend list.
  - *Fix:* drop the pill labels on the arcs, or the legend values.
- **Data-viz 3.5.**
  - *Reason:*
    - The "To and from the grid" chart's y-axis below zero reads "0.5 / 1.0" with no minus sign.
    - "Exporting / Importing" labels are dropped on mobile, so the sign is ambiguous there.
    - The net line is teal, the same colour as "used at home".
    - The x-ticks run 00, 06, 12, 16, Now, 22, an irregular sequence.
    - The seasonal chart relies on a legend, with 0/350/700 ticks.
  - *Fix:* use signed or "↓ 0.5" ticks, keep the direction labels at 390, draw the net line in `--ink-700`, and use regular 00/06/12/18 ticks with a "Now" marker. On the seasonal chart, direct-label the July stack ("used at home" / "exported") and use 0/200/400/600 ticks.
- **Consistency 3.5.** The hero pattern differs, and the ≈ appears as a pill badge before numerals (see cross-tab finding 4).

**Edge state (calibrating): 4.0.** Readiness meter, date, and "nothing you need to do". Model quality.

### Breakdown — 3.38 (weakest tab)
- **Hierarchy 3.5.**
  - *Reason:* "38%" appears three times in the hero (sentence, numeral, meter). Beside it, the seasonal chart shows **May ≈ 14%** for heating, so the eye catches the contradiction within seconds. That is open question 3, and the layout makes it worse.
  - *Fix:* in `panel-breakdown`, highlight the current month in the seasonal chart and mute the others. Until product decides, make the hero label match the chart's month (or the reverse). Drop the percentage from the sentence.
  - *Note:* the "820 kWh in total" for May also conflicts with Budgets and Forecast (187 used, 290 forecast). Flag it to product next to question 3.
- **Colour 2.5.**
  - *Reason:* six categorical hues: teal, **purple, amber, pink, blue** and grey. Purple and pink appear nowhere else in the product. Amber collides with the warning chips, and blue with the gas series. Teal, the interaction and "your data" colour, is reused as a single category. It is the one tab that breaks "colour means something".
  - *Fix:* use accent for the top category and ink tints (700/500/400/300/200) for the rest, with icons and labels carrying identity. In the "All categories" stack, use the same tints and direct labels.
- **Data-viz 3.0.**
  - *Reason:*
    - The seasonal chart has no highlighted period.
    - "All categories" merges Fridge and Other into one grey, which contradicts the list, where Fridge is blue.
    - The insight sentence does not change with the toggle.
    - The hero stacked bar's five unlabeled grey segments are noise.
  - *Fix:* highlight the current month; keep the mapping 1:1 with the list; update the sentence per view; make the hero bar two segments (Heating vs the rest).
- **Consistency 3.5.** The "AT A GLANCE" caps eyebrow is used only here.
- **Craft 3.5.** In `panel-breakdown-profile` and `-not-ready`, the halftone patch sits *behind body copy*, around "energy goes" and "can", and the left tile has about 150 px of empty space.

**Edge states: 3.5.** The "What you'll see" skeleton is a nice idea, but it is a second empty-state pattern (see cross-tab finding 7). "Data not ready" has a date but no readiness meter, while every other time-based state has one.

### Peak — 4.10 (best data tab)
The bullet chart is a real improvement over round 1. Other strengths:
- The Year view works, with June 2025 in ink and "Drops out 1 Jun 2026".
- The monthly micro-strip and the "4.0 → ≈3.9" pair.
- The calc table on mobile.
- Red is disciplined.
- **Spacing 3.5.**
  - *Reason:* the Daily peaks tile has about 130 px of dead space under the stat pair, because the "What's coming up" tile is taller.
  - *Fix:* move the micro-strip into the chart tile under the stats, or let the grid stop stretching (`align-items: start`).
- **Data-viz 4.0.** The month-peak and 12-month average lines are still about 3 px apart. The "Today" bar (3.8 kW, the Latest peak) is not distinguished from the other bars, although the stat key uses the same teal swatch.
- Minor: the disabled Day and Week options look nearly identical to enabled ones.

**Edge state (history): 4.0.** Complete and calm. The capacity-tariff caveat and the 2.5 kW floor are clear. The right tile has about 120 px of dead space.

### Forecast — 3.90
- **Data-viz 3.5.**
  - *Reason:* the cumulative chart has a legend **and** stacked right-gutter labels for 300, 290 and 269. They sit within 40 px of each other with leader lines. In `-over-budget`, "Budget 270" and "May 2025 269" overlap as lines.
  - *Fix:* drop the legend. Label only "May 2026 290 (forecast)" at the end. Draw the budget as a labelled threshold *outside* the plot on the left. Draw May 2025 in ink-300 with its label on hover or in the popover.
- The 24 h chart (uncertainty band, "Now" marker, "Best estimate" direct label) is the best line chart in the gallery.

**Edge states: 3.5.**
- `-over-budget`: the hero still leads with "8% more than May 2025". The over-budget news is an amber chip in the side column, with a red line in the chart, so there are two warning colours for one fact.
- "Using about 6.2 kWh a day would keep you under it": (270 − 187) / 13 = 6.4. Check the figure.
- `-partly-ready` and `-not-enough-data` are exemplary.

### Advice — 4.14
The clearest hierarchy after Overview: one top tip, one filled primary button, and outline buttons elsewhere. Add-to-plan gives inline confirmation, updates the counts and offers Undo (`int__advice-add-plan.png`). The "Bigger investments" split is clean.
- **Consistency 3.5.**
  - *Reason:* three estimate notations: a pill "≈" badge before the hero € figure, an inline "≈ €65" in rows, and "~4,200 kWh" / "~9–11 years" on the heat pump. That breaks "one way to say estimated".
  - *Fix:* use the inline ≈ everywhere in `app/panels/advice.html`.
- On mobile, the status seg clips the "3" of "Dismissed 3" at the right edge.

**Edge states: 4.0.** They are good, but `-dismissed` and `-empty` have no "About these numbers" footnote, and no empty "My plan" state is designed.

### Budgets — 3.74
- **Hierarchy 3.5.**
  - *Reason:* the sentence answer is "113 kWh left for 13 days", but the numeral is 8.7 kWh/day. This is the two-answers problem round 1 flagged on Overview.
  - *Fix:* write the sentence around the pace ("On track — stay under 8.7 kWh a day for the last 13 days") and move 113 to the meter caption.
- **Spacing 3.5.** In the meter key, "Budget 300 kWh" wraps onto its own line at desktop width. The streak tile is half empty.
- **Data-viz 3.5.**
  - *Reason:* the "Stay under 8.7" line runs across the whole month, so days 1–11 look like failures, although that target applies only to the remaining days. In dark mode, the muted past-day bars fall to roughly 1.3:1 against the surface and nearly vanish.
  - *Fix:* draw the target only over days 19–31 (or over 12–18 as a pace line), and raise the dark `--chart-muted` token.

**Edge states: 3.5.**
- `-over` and `-close` are strong.
- `-awaiting` and `-nodata` are visually identical and give no "when" ("check back shortly"). They have no readiness meter and no footnote, which violates principle 9.
- `-setup` uses a third layout.

---

## Cross-tab consistency findings (ranked)

1. **The hero contract has fragmented into four patterns.**
   - Chip, sentence and numeral: Overview, Compare, Forecast, Advice, Budgets.
   - Eyebrow and numeral with no sentence: Solar, Peak.
   - Caps kicker, sentence and numeral: Breakdown.
   - Sentence and numeral with a different number (two answers): Budgets.

   The brief's "one answer: sentence + number + status chip" is honoured in 5 of 8 tabs.
2. **The numeral repeats the sentence.** Overview 290, Forecast 290, Breakdown 38 (three times) and Advice €65 each state the same number twice at 28 px and 52 px. Decide once: the sentence carries the context, and the numeral carries the one number without repeating it.
3. **Chart labelling rules differ per chart.**
   - Compare and Forecast use a legend *and* direct labels.
   - Solar seasonal and Breakdown all-categories use a legend only.
   - Peak and Budgets use direct labels only.
   - "Highlighted period + muted others" is applied on Budgets and Peak Year, but not on Peak Month, Breakdown seasonal or Solar seasonal.
4. **Three ≈ forms:** a pill badge before hero numerals (Solar, Peak, Forecast, Advice), an inline glyph (Overview, Advice rows), and a "~" tilde (Advice heat pump).
5. **Section headings use three systems:** CAPS kickers inside tiles ("HOW YOU COMPARE", "WHAT'S COMING UP", "YOUR BUDGET", "STAY UNDER", "YOU COULD SAVE"), 16/600 titles inside tiles ("Daily peaks"), and 16/600 titles *outside* tiles ("Needs attention", "More tips for you", "In your plan").
6. **Red and amber semantics.**
   - Red is now disciplined, and a big improvement.
   - Amber serves three roles: the warning chips ("Above similar homes", "Forecast to exceed budget"), a Breakdown category, and a hue very close to the elec series.
   - The over-budget Forecast shows an amber chip and a red line for the same fact.
7. **Two empty-state patterns** plus a form:
   - A single tile with an icon well and halftone (Compare, Solar, Forecast, Advice, Budgets).
   - A tile plus a "What you'll see" skeleton (Breakdown).
   - Chip and footnote usage is random. There is a "Setting up" chip on Budgets, a caps kicker on Compare, and nothing on Solar or Advice. Footnotes are missing on Advice dismissed and empty, and on Budgets awaiting and nodata.
8. **Shell context leaks into states.** The household chip "Detached house · Flanders" shows in `panel-compare-no-house-type`.
9. **Disabled segmented options** (`.seg button[aria-disabled]`) change colour only, from ink-700 to ink-500. The Peak Day/Week and Forecast € options read as live.
10. **Motion is consistent and well tokenised.**
    - Panel fade + 8 px rise at 240 ms.
    - Seg and tab thumbs at 320 ms with an overshoot curve. The thumbs exceed the brief's "≤ 240 ms" rule, which is acceptable but should be documented.
    - Bars grow over 480 ms and lines draw over 700 ms.
    - The disclosure uses grid-rows at 240 ms.
    - The Solar flow loop is the only infinite animation.
    - Reduced motion covers everything.

    The icon set (1.5 px Lucide-style) and the icon wells are uniform on every tab. This is a strength.

---

## Top 10 fixes (ranked by impact)

1. **Breakdown palette and data honesty.** Collapse the six category hues to accent plus ink tints. Highlight the current month in the seasonal chart. Resolve the hero-vs-May (38% vs 14%) and 820 kWh conflicts visibly, or relabel the period. Keep the category colours 1:1 between the list and the "All categories" chart. Owner: `app/panels/breakdown.html`.
2. **Enforce one hero contract**: status chip, answer sentence, and one numeral that does not repeat the sentence's number. Add a `.hero` spec to the guide. Apply it to Solar and Peak (add a sentence), Breakdown (drop "AT A GLANCE"), Budgets (sentence around 8.7/day) and Forecast over-budget (lead with the overage). Owners: foundation (`components.css`, `COMPONENTS.md`), plus solar, peak, breakdown, budgets and forecast.
3. **Solar hero.** Stop headlining "Net exporter today +3.2" beside a flow that shows net import. Lead with self-sufficiency, use "3.2 kWh sent to the grid", and remove the triple-printed flow numbers. Owner: `app/panels/solar.html`.
4. **Chart labelling rule in the chart engine.** Direct labels *or* a legend, never both. Collision-resolve right-gutter labels (Forecast 300/290/269 and 270/269). Separate or offset the Peak 4.2/4.0 thresholds. Apply "highlight + mute" to every time series. Owners: foundation (`app.js`, `components.css`), with compare, forecast and peak.
5. **Solar grid chart.** Signed negative ticks. Keep "Exporting/Importing" at 390. Draw the net line in ink, not teal. Use regular hour ticks. Direct-label the seasonal chart. Owner: `app/panels/solar.html`.
6. **One estimate marker.** Use the inline "≈" in the value's own type, and drop the pill badge in front of hero numerals and "~". Owners: foundation (`.est` in `components.css`), `app/panels/advice.html`.
7. **Edge-state template.** One empty block with an optional readiness meter, a mandatory "when", a mandatory footnote and a chip rule. Fix Budgets awaiting and nodata (add a time estimate). Stop the Breakdown halftone overlapping text. Hide the household chip in the no-house-type state. Owners: foundation (`.empty`, shell), budgets, breakdown, advice.
8. **Budgets daily chart.** Apply the 8.7 target only to the remaining days. Raise the dark-mode muted-bar contrast. Stop the meter key wrapping. Owners: `app/panels/budgets.html`, `tokens.css`.
9. **One section-heading system and one warning hue.** Retire the in-tile CAPS kickers or use them everywhere. Pick either amber or `--alert` for "forecast over". Make +73% the same colour on Overview and Compare. Owners: foundation (`tokens.css`, `components.css`), overview, compare, forecast.
10. **Controls polish.** Clamp desktop popovers to their card, not the viewport. Give disabled seg options a visible disabled treatment (lower opacity with a tooltip). Add the missing `role="radiogroup"` on Compare's fuel seg. Fix the clipped "Dismissed 3" at 390. Owners: foundation (`app.js`, `components.css`), compare, advice.

**Verdict.** The rollout is well engineered: 0 gate failures, a real component system, consistent icons and motion, and most round 1 defects are fixed. As a *design* it is not yet premium-consistent. The weakest points are Breakdown's colour, the fragmented hero pattern, and chart labelling that varies from chart to chart. **Design score 3.86/5.** Fixes 1–4 should lift it past 4.0.

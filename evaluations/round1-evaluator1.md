# Round 1 — Evaluator 1 (principal product designer, premium consumer fintech/energy)

Scope: Overview, Peak, Peak-insufficient-history for A (Calm Ledger), B (Energy Almanac), C (Soft Native). Evidence: fresh light and dark screenshots at 1280 and 390 (`shots/eval1/<dir>/`), interaction captures (`int__pop-est__*`, `int__disc-crop__*`, `int__kbd-focus.png`, scripts `shots/eval1/interact.mjs` and `disc.mjs`), a source read, and `tools/audit.mjs`. I scored the product UI only; the `.meta` chrome was checked only for leaks, and none leak.

## Summary

| Criterion (weight) | A · Calm Ledger | B · Energy Almanac | C · Soft Native |
|---|---|---|---|
| Visual hierarchy (10) | 4.0 | **4.5** | 3.5 |
| Typography (8) | 4.0 | **4.5** | 4.0 |
| Colour restraint (8) | **4.5** | 4.0 | 3.5 |
| Spacing & rhythm (6) | 4.0 | 4.0 | 4.0 |
| Data-viz clarity (10) | **4.0** | **4.0** | 3.5 |
| Consistency (4) | **4.0** | **4.0** | 3.5 |
| Craft & premium feel (4) | 3.5 | **4.0** | **4.0** |
| 5-second comprehension (12) | 4.0 | **4.5** | 4.0 |
| Cognitive load (8) | **4.0** | **4.0** | 3.5 |
| Action clarity (8) | **4.0** | **4.0** | **4.0** |
| Edge / empty states (8) | 3.5 | **4.0** | **4.0** |
| Accessibility (8) | **4.5** | 4.0 | 4.0 |
| Responsive (6) | **4.5** | 4.0 | **4.5** |
| **Weighted total / 5.0** | **4.05** | **4.15** | **3.83** |
| Hard gates (`audit.mjs`) | 0 failures | 0 failures | 0 failures |

How the totals are built. A: design 202 + UX 203 = 405. B: design 209 + UX 206 = 415. C: design 184 + UX 199 = 383.

**Ranking: B > A > C.** B and A both clear the 4.0 ship bar, but only just, and neither is best-in-class. **Recommendation:** build a hybrid on B's shell, taking specific parts from A and C (see the end of this file).

Scope note: `audit.mjs` runs light mode only. I checked the dark screenshots by eye and saw no contrast failures in any direction.

---

## Hard gates and content fidelity

- **Gates.** All three pass: 0 gate failures, at most 6 font sizes, 0px overflow at 390 and 1280 in light and dark, and reduced-motion handled. Each direction has a global `prefers-reduced-motion` block, and the count-up animation is gated in JS.
- **Numbers.** All match `demo-data.md`:
  - Overview: 290/300/187, 13 days, +73% (442 vs 255), 4.0 kW, Heating 38%, 62% +3.2 kWh, "3 new tips ≈ €150/year".
  - Peak: 3.8 kW, 4.2 kW on 12 May 18:30, 4.0 kW, 4.24 kW, ≈ €7.40, and the 5.8 kW June 2025 peak.
  - Calculation table: 48.2 ÷ 12. The "≈ 3.9 kW if it rolled off" figure is present.
  - The old 412 and 540 figures appear only in the spec drawers, as change-log entries.
- **Honesty labels.** All present:
  - "New idea" badge and the "Rough estimate, fixed regional €/kW rate…" note. A shows both in the capacity-charge block itself and repeats the note in the popover. B and C move the badge, the sub-line and the note into the ≈ popover. That counts as a demotion, which the brief allows, but the "New idea" signal is then invisible until someone taps ≈.
  - "Based on 3 months, not 12 yet", "Take this comparison lightly…", the 2.5 kW floor, and the "just added" / "rolls off next" / "highest" tags.
  - C's footnote paraphrases the rough-estimate note; the verbatim text is only in its popover.
- **Invented data (flag to product).** The inventory says the chart still works in the insufficient-history state, but `demo-data.md` gives no daily values for September 2025. B and C both **invent daily peaks** to fill that chart:
  - B: 10 days (so "today" is 10 Sep).
  - C: 18 days (so "today" is 18 Sep).
  - Both are internally consistent (day 6 = 3.4 kW; C's day 18 = 3.1 kW matches "Latest peak"), and they give different "today" dates.
  - A avoids this by **omitting the chart**. That is honest, but it drops an approved module from the state.
  - The product owner should supply canonical September data.
- **Derived copy that is not in the inventory.** Harmless, but it needs sign-off:
  - All three: "a peak is your highest 15-minute power draw".
  - A: "about 10 kWh to spare" and "Complete after June 2026".
  - C: "−0.24 kW vs Flemish average", a 0–6 kW gauge scale, and "9 more months".
  - B: a new module, "Three months pull your average up the most".

---

## A · Calm Ledger — 4.05

**Top 3 strengths**
1. **The Peak chart is the best of the three.**
   - Bars are to scale.
   - The month-peak threshold (red dotted) and the 12-month average line are labelled directly outside the plot.
   - "Today" is marked on the x-axis, and the 13 future days are shown as muted dots.
   - It is the only direction where **Year** actually re-renders the chart (a 12-month view with "5.8 kW · rolls off next").
   - It has an SVG `aria-labelledby` summary.
2. **The most disciplined colour and type.**
   - Red appears only on the peak bar, the "highest" tag and +73%. Teal is kept for interaction.
   - The dark mode is the cleanest.
3. **The best "what's coming up" logic.**
   - The "Today 4.0 kW → Without June 2025 3.9 kW" pair makes the roll-off tangible.
   - The mobile calculation table (month, with the date below; peak on the right) is excellent.

**Top 5 issues (ranked)**
1. **Peak-history: no chart.** "Chart … stay the same" is approved content. Fix: show the daily chart once canonical September data exists; until then, show a labelled empty state rather than nothing.
2. **Overview hero is split in two.** The big sentence on the left and the 290 numeral on the right compete, so the eye bounces. Fix: put the 290 numeral under the sentence in a single column, and let the budget bar span the full width beneath.
3. **Dead space on Peak desktop.** The capacity-charge column has about 150px of empty height under €7.40. In "What's coming up", the left column is one sentence facing a dense right column. Fix: pair the capacity charge with the benchmark in the right column, or drop to a single column there.
4. **The chart y-axis has no "4" tick.** The 4.0 and 4.2 threshold lines sit 2px apart and read as one double rule. Fix: add a 4 kW tick, and space the labels by offsetting them vertically (A already does this for the labels, but not for the lines).
5. **The brand is almost absent.** A plain "june." wordmark and one floating halftone patch (history state, top right, unanchored) make it read as "any fintech", which is the risk the brief named. Fix: anchor the halftone to the readiness meter, use Montserrat 600 for section titles, and give the "just under average!" moment a small June-green flourish.

**Scores ≤ 3.5**
- **Craft 3.5.** It is cold, with floating decoration and unused whitespace (see issues 3 and 5). Fix as above.
- **Edge states 3.5.** The history state loses the chart, and its right column is half empty. Fix: restore the chart and move "Nothing rolls off yet" next to the segment meter.

---

## B · Energy Almanac — 4.15

**Top 3 strengths**
1. **Strongest 5-second read.** The page headlines *are* the answer:
   - "You're just under the Flemish average — and your biggest peak rolls off next month."
   - "Your average so far is 3.0 kW — from your first 3 months of data."
   - Each is followed by one oversized light Montserrat numeral (4.0 kW / 3.0 kW), with the unit set lighter. This is Oura-grade editorial clarity.
2. **The most brand character within restraint.** The June-green squiggle under "on track" is the single best brand moment across all three directions. It is playful, it is used once, and it carries meaning.
3. **Content structure.**
   - "This month / What's coming up / What drives it" section kickers give a clear hero → support → detail path.
   - A single, well-described primary CTA ("Lower your peak", with "Tips to spread heavy appliances, in Advice" beside it).
   - Every chart has a `figcaption` text summary.

**Top 5 issues (ranked)**
1. **The peak-bar lollipop is misleading.** On the Peak chart, the red dot and stem sit well *above* the 4.2 kW bar, visually at about 5 kW, and above the month-peak line. The same happens in the history state. Fix: remove the stem, and put the "4.2 kW · 12 May, 18:30" label directly on the bar top.
2. **The hero blob reads as a smudge.** The mint blob behind "4.0" / "3.0" is clipped off-centre on the left and looks like a rendering error, especially on mobile. Fix: centre it behind the numeral at about 60% of the numeral's width with a soft edge, or drop it and let the squiggle be the only motif.
3. **"What drives it" adds load and uses red loosely.**
   - It is a new, uninventoried module.
   - It paints June 2025 in full red, a second red element on the page.
   - The avg marker cutting through each bar is fussy.
   - Fix: either cut the module (the calculation disclosure already covers it), or keep it as a quiet strip (see C's 12-bar sparkline) with red only on the "rolls off next" tag.
4. **The right rail is thin, and it moves on mobile.** On desktop, "At a glance" is sparse and the Latest/Month peak stats feel orphaned from the chart they describe. On mobile they fall *below* the chart, so Latest peak becomes the fourth thing you see. Fix: put the Latest/Month stat pair directly under the chart (as A and C do) and retire the rail.
5. **Charts are cramped at 390.** The right gutter for direct labels (Month peak / 12-mo avg) takes about 76px, and the bars become slivers. The Peak mobile page is 3,129px, the longest of the three. Fix: at <560px, put the threshold labels inside the plot above their lines on the left, and put "What drives it" / the calculation into one disclosure.
6. *(minor)* Day/Week/Year are `aria-pressed` buttons that do nothing. Fix: mark them disabled with a hint, or wire up Year.

**Scores ≤ 3.5:** none.

---

## C · Soft Native — 3.83

**Top 3 strengths**
1. **The most "app" polish.**
   - Rounded tiles on a mint canvas, a pill tab bar with a sliding thumb, hover lift, tactile buttons, and good focus rings.
   - The dark mode is rich and legible.
   - It reflows cleanly at 390.
2. **The "Your last 12 monthly peaks" micro-bar strip.** June 2025 is highlighted in red and May 2026 in teal. It explains the rolling window in one glance, better than the table does, and it is worth stealing.
3. **The Peak-history content is complete and well organised.** It has the segment meter, the floor note, the caveated benchmark, the chart, and "Nothing rolls off yet — 9 more months".

**Top 5 issues (ranked)**
1. **The gauge confuses more than it explains.**
   - On Peak, a 0–6 kW arc with an invented scale end puts a derived "−0.24 kW" at its centre, competing with the 4.0 kW hero.
   - On history, the arc is in kW but its centre reads "3 of 12 months counted", which mixes metaphors.
   - Fix: delete the gauge. Show the benchmark as the approved sentence plus a small "Below Flemish avg · 4.24 kW" chip, or as a one-line bullet chart with a 4.24 marker.
2. **The Overview hero numeral contradicts its sentence.** The headline says 290 kWh forecast vs 300, but the big number is **113 kWh left**. Two answers in one hero fails "one answer per tab". Fix: make 290 the numeral, and move "113 kWh left for 13 days" into the bar caption.
3. **Red is overused.**
   - +73% appears in red twice on Overview.
   - The roll-off progress bar, the hourglass tile, the strip bar and the chart label are all red on Peak.
   - Red stops meaning "alert". Fix: use red only for the month-peak bar and the "highest" tag; use ink or teal for the roll-off bar and the hourglass.
4. **Duplicate affordances and a leaky popover.**
   - The "Needs attention" cards have both a chevron and a "See comparison →" link.
   - The ≈ popover opens over its own trigger and the "Estimated capacity charge" label, and pokes out past the card edge at the left.
   - Fix: one affordance per card (a whole-card link with the chevron), and anchor the popover below its trigger, clamped to the container.
5. **The mobile calculation table breaks.** "5.8 / kW" wraps across two lines in every row, and the tags stack awkwardly. Fix: `white-space: nowrap` on values, and use A's pattern of putting the month and date in one cell.

**Scores ≤ 3.5**
- **Hierarchy 3.5.** Two competing heroes on both pilot screens (issues 1 and 2).
- **Colour 3.5.** Red is overused (issue 3).
- **Data-viz 3.5.** The gauge has an arbitrary scale and mixed units (issue 1). Fix: remove it; keep the bar chart and strip.
- **Consistency 3.5.** Stat styles vary (hero numeral, chip-in-row, tile stat), and the cards have duplicate CTAs. Fix: one stat component and one card affordance.
- **Cognitive load 3.5.** Invented numbers such as −0.24 and the 0–6 scale add maths the user never asked for. Fix: remove them.

---

## Premium minimal and June character

- **A** is the most *minimal* and is correct, but it is premium in a generic Swiss sense. There is no June warmth; swap the logo and it could be any utility. Trustworthy: yes. Playful: no.
- **B** best balances both halves of the brand. The editorial sentences carry the "playful but trustworthy" voice ("You're just under average!"). The light Montserrat numerals feel premium, and the squiggle is an authentic brandbook motif used once, with purpose. The blob needs work.
- **C** feels the most like a *product*, but it drifts toward the generic energy app (Tibber-like tiles, a gauge, mint everywhere). Its playfulness comes from UI chrome rather than from June's own motifs, and the extra instruments work against "minimal".

## Recommendation: hybrid on B

1. **From B (base):**
   - The editorial page headlines on every panel, including the history headline.
   - The oversized light numeral with a lighter unit.
   - The squiggle as the single brand motif.
   - The single-column rhythm with section kickers.
   - The `figcaption` chart summaries.
   - The CTA-with-context pattern.
2. **From A:**
   - The Peak chart component: to-scale bars, dotted red month-peak line, direct labels outside the plot, "Today" tick, muted future days, and working Year view.
   - The "Today 4.0 → Without June 2025 3.9 kW" comparison.
   - The mobile calculation table.
   - The colour discipline (red only on the peak bar, the "highest" tag and over-values).
   - The Overview "All topics" two-column list on desktop, instead of B's narrow rail.
3. **From C:**
   - The "Your last 12 monthly peaks" micro-strip. It replaces B's "What drives it" module.
   - The Latest/Month peak stat pair directly under the chart.
   - The sliding segmented-control and tab thumbs.
   - The hover lift on actionable rows (desktop only).
4. **Drop:** C's gauge, B's lollipop stem, B's clipped blob, and C's 113-kWh hero numeral.
5. **Needs a product-owner decision:** canonical daily September 2025 data for the insufficient-history chart, since B and C currently invent it; and whether "New idea" may live only in the popover.

# Round 2 → fix round (coordinator)

Round 2 scores: design 3.86 · UX 3.96 → **3.91** (bar 4.0). Hard gates: 0 failures.
Lowest tabs: Breakdown (design 3.38), Solar (3.74 / 3.60), Budgets (3.74), Compare (3.78 / 3.88), Advice UX 3.80.
Sources: `round2-evaluator1.md`, `round2-evaluator2.md`.

## Coordinator data decisions (apply; logged in demo-data change log 10–13)
- **D1 Solar hero** — "Net exporter today" is false (import 4.4 > export 3.2). Hero becomes **"Sent to the grid today · 3.2 kWh"** with the supporting line naming the 4.4 kWh drawn from the grid. Overview Solar row: "3.2 kWh sent to the grid today". Print the flow numbers once (diagram), not three times.
- **D2 Breakdown period = April 2026** (last full month, same as Compare). Total 442 kWh: Heating 168 (38%) · Water heating 88 (20%) · Always on 62 (14%) · Cooking 53 (12%) · Fridge & freezer 40 (9%) · Other 31 (7%). Seasonal chart: April = those shares, April highlighted as the current period. Drop the 820 kWh total. Overview Breakdown row: "Your biggest category in April."
- **D3 "Now"** is 18 May 2026, 20:00 everywhere (Forecast "Now" marker included).
- **D4 arithmetic** — Forecast over-budget daily figure recomputed correctly; Compare trend sentence uses the real range.

## Shared rules (all fragments)
- **Hero pattern:** status chip (optional) → one answer sentence → ONE big number that adds information rather than repeating the sentence. Over / alert states lead with the problem (e.g. overage).
- **Headings:** in-card title in sentence case (card-title style). Uppercase overline only for the hero kicker. No headings floating above cards except the Overview section headers.
- **Estimates:** a single inline `≈` marker (`.approx`) with a popover everywhere — no pill badges, no "~".
- **Colour:** red only for peak / over / alert, the same in every tab (+73% the same colour on Overview and Compare). Amber is not a second "over" colour. Breakdown categories: accent + ink tints (no new hues), always text-labelled.
- **Charts:** direct labels OR legend, never both; no colliding right-edge labels; always highlight the current period; negative ticks carry a minus sign.
- **Edge states:** every not-ready state says what's missing, **when** it'll be ready (or that timing is unknown and why), what the user can do, plus the footnote.

## Foundation (tokens / components / app.js / shell / overview / peak)
1. Popovers: accessible disclosure-tip pattern — placed next to the trigger in the DOM, focus handling correct, closes on focus-out and Esc; desktop popovers stay inside their card/viewport.
2. Chart label collision avoidance in JuneCharts (right-edge labels), current-period highlight option, minus signs on negative ticks.
3. Heading system + `.empty` edge-state template (with a "when" line + footnote slot); make the brand motif never sit behind body text.
4. Tab bar: horizontal-scroll cue on mobile (edge fade + active tab scrolled into view).
5. Toggle thumb motion ≤ 240 ms, no overshoot. Disabled segmented options visibly disabled. Segmented toggles get correct radiogroup semantics.
6. Header home context must follow the panel (e.g. no "Detached house" on Compare no-house-type).
7. Overview: add a **new-customer / not-ready** Overview state (`panel-overview-new`) with readiness chips on topic rows; apply D1/D2 row copy.
8. Peak: separate the 4.2 and 4.0 threshold lines/labels on mobile and desktop; balance the Daily-peaks card's empty space; move the "New idea" badge out of the customer popover (spec notes only).
9. Update COMPONENTS.md for all of the above.

## Builder 1 — Compare + Solar
- Solar: D1; grid chart (minus signs, net line in ink, keep Exporting/Importing labels on mobile, regular hour ticks); seasonal x-axis = Jun 2025–May 2026; replace "Eliq" in customer copy with plain wording ("our estimate").
- Compare: move "personal best" into the ranking disclosure (reframe plainly, no trophy on a bad percentile); fix "408→569" sentence to real range; Elec/Gas toggle semantics; +73% colour consistent with Overview; direct labels or legend, not both.

## Builder 2 — Breakdown + Forecast
- Breakdown: D2 everywhere; category colours → accent + ink tints; current month highlighted; halftone never behind text.
- Forecast: D3; right-edge label collisions (300/290/269, 270/269); Budget line vs May 2025 line distinguishable (not both grey); over-budget state leads with the overage, one "over" colour; D4 arithmetic; "This year" readiness gets a date or clear rule.

## Builder 3 — Advice + Budgets
- Advice: Undo focus with reduced motion; explain the featured-tip choice ("Most relevant for you" vs the bigger €180 tip — show why, or feature by stated rule); heat-pump copy consistent with an electrically-heated home and pricing basis stated; one ≈ marker; fix clipped "Dismissed 3" at 390px.
- Budgets: hero = one answer (not 113 left + 8.7/day competing); 8.7 kWh/day target only over remaining days; dark-mode contrast on muted bars; meter key no wrap; awaiting / not-enough-data states say when + what to do; Gas disabled with a stated reason.

# June Insights — Design brief (Phase 1 synthesis)

Coordinator synthesis of `ux-audit.md`, `visual-audit.md`, `reference-research.md`, `content-inventory.md` and `brand-notes.md`. This is the contract every direction designer and builder works to.

## Goal
Turn the approved Insights content (8 tabs, ~20 edge states) into a **premium, minimal web dashboard** — playful-but-trustworthy June, not a generic fintech. Plain HTML/CSS (+ minimal vanilla JS) with **subtle easing and animation**. Mobile comes later, but every screen must already reflow cleanly at 390px.

## Baseline (measured)
- 22 font sizes, 47 colours, 118 emoji-as-icons, 0 transitions, 0 shadows, 205 `!important`.
- Automated gates: **40 failures** — every tab has text < 12px and WCAG contrast failures; 7/8 tabs overflow at 390px; no reduced-motion handling.
- Every tab opens with 3–6 equal-weight cards; the answer is often in the side column.
- Internal/meta copy (API codes, "Real UAT data", relevance scores) leaks into the product layer.

## Design principles
1. **One answer per tab.** A single hero — plain-language sentence + one big number + status chip — in the full-width top slot.
2. **Say it, then show it.** Every chart is introduced by a one-line insight sentence.
3. **Euros before kilowatts** where € exists (≈-marked); kWh/kW second.
4. **Explain on demand.** Formulas, tables, confidence, regulation → info popover `[i]` or disclosure `[D]`. Nothing approved is deleted, only demoted.
5. **One way to say "estimated":** a single `≈` marker + popover, plus one "About these numbers" footnote per tab.
6. **Plain words first, jargon in the popover** ("used at home" before "self-consumption"; "more than 99% of similar homes" before "percentile").
7. **Colour means something or it isn't there.** June Green = interactive + "your data"; energy colours = data series only (elec yellow, gas blue); June Red = peak / over / alert only; never colour alone.
8. **One primary action per view.**
9. **Not-ready is a state, not an error:** what's missing · how long · what you can do, with one shared readiness meter.
10. **Mobile-first order:** hero → supporting → detail, single column at 390px, zero horizontal scroll.
11. **Quiet motion with purpose:** one signature animation per screen, everything else ≤ 240ms, reduced-motion respected.
12. **Brand, sparingly:** Montserrat numerals, June Green, and at most one brand motif (blob / halftone / squiggle / Junior) per screen — usually in empty or celebratory states.

## Shared foundations (all directions)
- **Type:** Montserrat for display + numerals (tabular), a UI face for text (Inter or Open Sans — direction's choice). Max 6 sizes, min 12px (11px chart ticks), weights 400/500/600 (+300 for huge numerals if chosen). Units rendered lighter/smaller than values.
- **Colour tokens:** start from `visual-audit.md §4` (`--accent #3bada8` fills, `--accent-strong #1b7773` text/buttons, ink-tinted neutrals, `--alert` from June Red, deepened energy colours). Directions may tune but must pass contrast.
- **Spacing** 4px scale; **radii** ≤ 4 values; **elevation** ≤ 2 levels.
- **Icons:** one inline-SVG line set (Lucide-style, 1.5px stroke). No emoji.
- **Components** (one version each): segmented control, status chip, `≈` estimate marker + popover, disclosure, stat, readiness meter, insight sentence, empty-state block, primary/secondary button, tab bar.
- **Charts:** 2–4 hairline gridlines, no chart borders, 12px axis labels, direct labels over legends, thresholds labelled outside the plot, highlighted period + muted others, projections dashed, uncertainty as a light band, bars from zero, entrance animation (grow/draw, staggered ≤ 300ms total). Each chart has an accessible text summary.
- **Motion tokens:** `--ease-out: cubic-bezier(.2,.8,.2,1)`, `--ease-in-out: cubic-bezier(.65,0,.35,1)`; 90 / 160 / 240 / 480 / 700ms. Animate: tab switch (fade + 8px rise), toggle thumb slide, bars grow / lines draw, hero count-up (first view), disclosure expand, card hover lift (desktop). `prefers-reduced-motion` → fades only.
- **Meta layer:** designer notes, API codes, approval text live in a collapsible "Spec notes" drawer outside the product frame (class `.meta`), never inside the UI.

## Per-tab information architecture
Use `ux-audit.md §3` as the default structure (hero → supporting → detail with `[i]`/`[D]`/`[F]`). Content must match `content-inventory.md` (copy verbatim unless it's meta; numbers per the data decision below).

## Directions to explore (Phase 2)
All three follow the principles and foundations above; they differ in **expression**.

| | A · Calm Ledger | B · Energy Almanac | C · Soft Native |
|---|---|---|---|
| Idea | Swiss precision, a beautifully set statement | Editorial: headline + oversized numeral + one chart | Premium app feel: layered surfaces, live instruments |
| Layout | Few cards, hairline dividers, strict grid | Single editorial column + side rail on desktop | Large rounded tiles (20–24px) on mint-tinted canvas |
| Hero numeral | 40–48px, Montserrat 500 | 72–96px, Montserrat 300–400, lighter unit | 48–56px inside a hero tile |
| Brand motifs | Almost none (halftone in empty states) | Squiggle underline + soft blob behind hero | Blobs/halftone as ambient depth behind surfaces |
| Motion | 150–250ms fades, bar draw-ins | Count-up + one line/bar draw per page | Hover lift, animated flow lines, sliding thumbs |
| References | Stripe, Linear, Apple HIG | Oura, Apple Health, WHOOP, Opower | Tesla/Tibber, WHOOP, Octopus Agile |
| Risk | Cold, "any fintech" | Needs great copy per state | Busy, generic app look |

**Pilot screens** for each direction: **Overview** (the summary/landing, ranked brief) and **Peak** (densest data tab) + Peak's "insufficient history" edge state. Output per direction: `directions/<a|b|c>/index.html` (+ `tokens.css`), same `.panel` structure so `tools/shoot.mjs` and `tools/audit.mjs` work on it.

## Evaluation
`scoring-rubric.md`: 13 weighted criteria (50% design / 50% UX) + automated hard gates. Two independent evaluators per round. Ship threshold ≥ 4.0 with zero gate failures.

## Open decision (needs product owner)
The mockups contain **~10 data contradictions** (ux-audit §2.7, content-inventory §flags) — e.g. budget 300 vs 450 kWh, forecast 412 vs 265 kWh, "On track" while pacing over, 3-month streak with 2 ticks, Peak's red bar on the wrong day, Solar worked example ≠ flow diagram, "3 new tips" vs 4. Proposed: build on **one consistent demo household** (`brief/demo-data.md`), keeping every approved copy pattern but aligning the numbers, and list each change for the product team.

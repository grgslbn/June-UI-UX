# Insights — UX audit (baseline: `reference/original-gallery.html`)

Sources: gallery HTML (text + inline styles), `shots/original/*` (desktop 1280, mobile 390), `brief/brand-notes.md`, `brief/scoring-rubric.md`.
Scope: UX and presentation only. Content is approved, so every copy item below stays available; recommendations re-order, demote or disclose it.

---

## 0. Headline diagnosis

1. **No tab has one hero.** Every tab opens with 3–6 cards of equal weight (white card, 11px uppercase grey label, 18–22px bold number). The eye has no entry point, so the "answer" (for example *"You're projected to use 412 kWh — 8% more than last year"*) sits in a tinted callout inside a chart card, at the same weight as its neighbours.
2. **Explanation is always on screen.** Formulas (`(Production − Export) / Production`), calculation tables (12-row peak table), confidence-band prose, regulatory floors and price-fallback disclaimers are all shown by default. Caveats are about 30–40% of the visible text on Solar, Peak and Forecast.
3. **Internal notes leak into user copy.** API codes (`sh_no_matching_group`, `sh_no_price_information`), `adjust_the_indoor_temperature · relevance 0.32`, "Real UAT data" legend badges, *"Both lines are real numbers from a live UAT probe, not invented for the mockup"*, *"Every point here is a real /similarhomes/report call"*, *"Included proactively — schema supports investment_cost…"*. The ✅ Approved notes are gallery chrome, but some of these strings sit inside the cards and have to be separated from customer copy before build.
4. **Numbers contradict each other across tabs and inside modules** (see §2.7). A premium, trustworthy feel cannot survive a customer spotting that the budget is 300 kWh on one tab and 450 kWh on another.
5. **Mobile is a squeezed desktop.** The 2/3 + 1/3 grid collapses badly: side-column cards spill outside the panel (Breakdown, Compare), three stat cards stay side by side at about 110px each (Peak: "4.0 / kW" wraps, captions break into single words), and tables wrap into 4-line rows. Baseline: horizontal overflow at 390px on 7 of 8 panels.
6. **Accessibility fails the hard gates.** 36× `#999`, 7× `#aaa`, 28× `#888` text (2.3–3.5:1). June Green `#3bada9` is used as link text ("See full breakdown →", "Update home profile →") at 2.71:1. There are 39 declarations below 11px (9px ×15, 8.5px ×5, 7.5px ×1). Status is often shown by colour alone (streak cells, red "month peak" bar, Compare bar colours).

---

## 1. Per-tab audit

### 1.1 Overview (tile grid)
- **Primary question:** "Is anything about my energy I should know or act on right now?"
- **5-second grasp:** one line of status plus the one or two tiles that need attention (for example *Compare: +73% vs similar homes*; *Budget: on track*).
- **Hierarchy problems:** 8 identical tiles, no ranking by urgency. "+73% more than similar homes" (bad news) looks the same as "On track" (good news). The headline metrics are mixed types: a category name ("Heating — 38%"), a unit ("4.0 kW"), a status ("On track"), a count ("3 new tips"). A 4-column grid of emoji chips (🥧📈👛☀️) reads playful-cheap, not premium. The Consumption tile is a greyed-out placeholder ("—", *"Already the full built tab — may not need a tile here at all"*): dead weight.
- **Cognitive load:** the Peak tile shows *"12-month rolling average — sets your capacity tariff"* (two jargon terms in the first line a user sees). The Solar tile shows *"62% self-consumed"* with no explanation.
- **Action clarity:** every tile has an identical teal "See X →" link at 2.71:1 contrast. Eight links with the same weight means no call to action stands out.
- **Edge states:** none designed. Missing: what a tile shows when its tab is in a not-ready state (Forecast <7 days, Solar calibrating, Budget not set). This is needed because Overview is where users first hit those states.
- **Open question (gallery):** 7 or 8 tiles, and whether Overview is the landing page. Recommendation: Overview **is** the landing page, a ranked summary, not a grid of equal tiles (see §3.1).

### 1.2 Compare
- **Primary question:** "Am I using more or less than homes like mine?"
- **5-second grasp:** *"You've used 73% more than similar homes this month."* (red/warm semantic) plus one visual showing You vs Similar vs Most efficient.
- **Hierarchy problems:** the hero sentence lives in the **narrow side column**, while the wide column leads with two stacked trend charts (Consumption, Ranking), each with its own pill toggles (Consumption|Ranking, Elec|Gas). The Consumption|Ranking switch appears twice, on both charts, so it is unclear whether it is a tab or a chart toggle. "Beat your personal best" competes for attention with the main comparison.
- **Cognitive load:** *percentile / decile* is the main barrier. *"above even the highest (10th decile)"*, *"March — 95.5th percentile"*, *"Currently 99.8th percentile — a bit above where you've been"*, *"Get under the 95.5th percentile mark"*. The direction is reversed from normal (higher percentile = worse), and a row of "95.5 100 100 100 100 99.8" gives almost no information. Chart explainer copy mixes user insight with provenance notes (*"Both lines are real numbers from a live UAT probe"*).
- **Colour:** bars are teal / yellow / **pink** (`#e0559b`-ish, not a brand colour). Yellow for "Your home" collides with Electricity = Sunglow Yellow.
- **Action clarity:** "Update home profile →" is a low-contrast text link at the bottom of the comparison card. It is the one action that improves the result, and it is buried.
- **Edge states:** good coverage (6 states) and honest copy. Weaknesses: raw API codes shown under each card; inconsistent layouts (centred icon states vs left-aligned result card); "€ view unavailable" is a full card when it should be an inline note on the € toggle.
- **Mobile:** the right column overflows the panel. The Ranking chart shows a pink band with the label "Highest users" nearly invisible (about 8px, low contrast).

### 1.3 Solar (solar-only capability)
- **Primary question:** "Are my panels paying off today? Am I using my own power or giving it away?"
- **5-second grasp:** *"Net exporter today: +3.2 kWh sent to the grid"* plus *"62% of your solar used at home"*.
- **Hierarchy problems:** the flow diagram (Production 8.4 → Home 5.2 / Grid 3.2; Grid 4.4 → Home) is the best glanceable module but sits in the side column. The wide column leads with Import/Export chips and a net chart whose **bars and line disagree visually** (midday bars go below zero while the net line is above zero). Four separate side cards (flow, Self-consumption, Self-sufficiency, `Consumption = Import + Production − Export`) all have equal weight.
- **Cognitive load:** *self-consumption* vs *self-sufficiency* are near-synonyms to users. Both are shown by default with formula and worked example in monospace. The identity equation card is pure reference material. "Estimated" badges appear 4× on one screen.
- **Data integrity:** the self-sufficiency worked example reads *"(6.9 − 3.2) / 6.9 = 54%"* but the flow diagram shows Home 9.6 kWh, Import 4.4 kWh (5.2/9.6 = 54%). The percentage is right but the inputs are wrong, and 3.2 is the *export* figure. The seasonal chart caption says *"July 620 kWh — over 9× December's 68 kWh"* but the bars are 100%-normalised (all the same height), so the chart **cannot show** the claim in its own caption.
- **Action clarity:** no action on the tab. That is acceptable, but a "when to run appliances" hint would give it purpose (content-inventory permitting).
- **Edge state:** "Still calibrating" is good (specific: 4 of 7 days, reassurance that Import/Export are fine). The copy is long (≈60 words) and should be cut to 2 sentences plus a disclosure.

### 1.4 Breakdown
- **Primary question:** "Where does my energy go?"
- **5-second grasp:** *"Heating is 38% of your usage this month — your biggest category."*
- **Hierarchy problems:** the "At a glance" donut and the full ranked list say the same thing twice. On mobile the donut loses its centre label (a bare ring with the caption "Biggest category this month →"). The Home-profile nudge (70% complete) sits at the same weight as data. The € fallback disclaimer (yellow box) is the first thing inside the list card, above the data.
- **Cognitive load:** low. "Always on" needs a one-line definition on demand. "Patterns vary by home." is an unnecessary hedge.
- **Colour:** the seasonal stacked chart uses 5 teal tints. Adjacent tints (Water heating vs Always on vs Cooking) cannot be told apart, and the legend has to be matched by eye. Categories are colour-only.
- **Edge states:** "Hard block" and "Data not ready yet" are good. The internal title "Hard block: required profile field missing" must not ship as user copy. There is inconsistent CTA styling: dark ink button in the nudge vs teal button in the block.
- **Mobile:** the list card (right column) overflows the panel by about 250px (visible in the screenshot).

### 1.5 Peak (capacity tariff)
- **Primary question:** "What is my capacity-tariff peak and is it costing me more?"
- **5-second grasp:** *"Your 12-month average peak: 4.0 kW ≈ €7.40/month — just under the Flemish average (4.24 kW)."*
- **Hierarchy problems:** three equal stat cards (Latest 3.8 / Month 4.2 / 12-month 4.0). The one that matters for billing (4.0 kW) is third, and the € translation (the number a user actually cares about) is in the lowest side card tagged "NEW IDEA". The benchmark ("You're just under average!") is a separate floating card. The 12-row calculation table is **expanded by default** and dominates the page (≈ 45% of the tab's height).
- **Cognitive load:** *rolling average*, *capacity tariff*, *rolls off*, *regulatory floor*, *Flemish average* all appear on one screen. "Rolling average, explained" is useful but sits on top of the table.
- **Data integrity:** the red "This month's peak" bar is on **day 5** and taller than the dashed "Month peak 4.2 kW" line, while the stat card says the month peak was **18 May, 18:30**. The chart threshold labels ("Month peak 4.2 kW", "12-month avg 4.0 kW") are about 9px coloured text overlapping the bars.
- **Action clarity:** none. A user learns their peak matters but not what to do about it (spread heavy appliances). Link to Advice.
- **Edge state (insufficient history):** good concept (3 of 12 months segmented bar, "Take this comparison lightly"). The 2.5 kW floor note is valuable but shown as a yellow warning, when it is information, not a problem.
- **Mobile:** the three stat cards stay 3-up at 110px ("4.0 / kW", captions broken word by word). The calc table wraps each row onto 3–4 lines. The benchmark card is a narrow column of one word per line.

### 1.6 Forecast
- **Primary question:** "How much will I use (and pay) this month? Will I stay within budget?"
- **5-second grasp:** *"412 kWh projected this month — 8% more than last May. On track for your budget."*
- **Hierarchy problems:** the Today/Week/Month/Year glance row comes first with 4 equal cells ("14.2 kWh / 9.1 so far + 5.1 forecast"), so the monthly answer is one of four. The hero sentence is repeated as a callout inside the chart card. The Month chart axis says *"Forecasting the next 6 months"* but runs Dec → Jun, mixing past and future with no "now" marker. The 24–48h chart is a second full-width chart of equal weight.
- **Cognitive load:** *"Likely range (95% confidence)"* plus a 3-line paragraph about variance. *"€ view unavailable — … Eliq doesn't error here like its docs claim, it silently returns €0 — the app must detect and hide that"*: developer note shown as a yellow user caveat. "Off by" table expanded.
- **Action clarity:** "View budget →" is the only action, fine, but the state chip ("On track for budget" green) is the more important signal and should connect to the hero.
- **Edge states:** budget-link variants (over / no budget) are good. The whole-tab "Building toward your first forecast" (3 of 7 days) is good. The 4 greyed "not ready" cells under it are redundant with the message above them.

### 1.7 Advice
- **Primary question:** "What is the single best thing I can do to save?"
- **5-second grasp:** the top tip plus its € saving (*"Adjust your indoor temperature — ≈ €150/year"*).
- **Hierarchy problems:** 4 equal cards, each with **3 equal-weight buttons** (Save for later / Already do this / Not relevant). That is 12 buttons on screen, all as loud as the content. Savings are split into two unaligned figures (*"Save 540 kWh/year"* green + *"≈ €150/year (average, €0.27/kWh)"*). € is what users care about, but kWh is bolder. Sort order is by relevance, so "Carpets" (650 kWh) sits below "Temperature" (540 kWh). Overview's *"Save up to 540 kWh/year with the top one"* then reads as wrong ("up to" when a bigger one exists).
- **Cognitive load:** `adjust_the_indoor_temperature · relevance 0.32` monospace debug line on every card. The heat-pump card carries a dashed border, "Upgrade example — once financing is configured" pill and a schema note: all internal.
- **Action clarity:** the three-state model is sound, but "Already do this" and "Not relevant" are both *dismissals* and should be secondary (overflow or text buttons). "Save for later" = *To do*, which is a naming mismatch with the tab label. Tabs "To do (0) / Done (0) / Discarded (0)" show empty counts prominently. On mobile, Discarded wraps under the pill row.
- **Edge states:** the single honest empty state is right. The Done/Discarded sub-states are good, but "Completed" / "Already doing this" / "Skipped" pills are colour-coded with no icon.

### 1.8 Budgets
- **Primary question:** "Am I going to stay under my limit, and what should I do per day?"
- **5-second grasp:** *"On track — 187 of 300 kWh, 13 days left. Stay under 8.7 kWh/day."*
- **Hierarchy problems:** the chart comes first. The status chip "On track" is a small pill beside the fuel toggle. Used / Forecast / Limit are spread to three corners of the card (left / centre / right-aligned), so there is no reading line. The actual answer (≤ 8.7 kWh/day) is a mid-card green number.
- **Logic/copy tension:** "On track" + *"You're averaging 10.4 kWh/day so far — ease off slightly"*. At 10.4/day × 31 = 322 kWh the user would go **over**, yet the forecast says 265 kWh. Either the status or the pacing line is wrong. As shown, the user can't tell whether to worry.
- **Streak:** *"3-month streak — Under budget since March"* but the strip shows Jan ✕, Feb (hatched / no data), Mar ✓, Apr ✓, May "So far". That is 2 completed months. Cells use red / green / hatched fills; the ✓/✕ glyphs help but hatched "no data" is unlabelled.
- **Action clarity:** no visible way to edit the budget or switch Auto/Manual from the main view. Setup (Auto "Recommended" vs Manual) is clear and well written.
- **Edge states:** "Your budget is set / First calculation is on its way" and "Still collecting your data" are good, calm and specific. The "Setting up" grey pill next to the toggles is enough status. Pacing variants (on track / cut back / already over) are strong content: make these *the* hero, not a sub-card.

---

## 2. Cross-cutting issues

### 2.1 Navigation between tabs
- 8 pill tabs wrap to 2 rows on mobile (plus the gallery's own dark chrome). No active-state indicator beyond fill; the selected pill in the screenshots is always "Compare", even on other panels (state bug in the gallery).
- Tabs are ordered by build history, not user priority. Suggested order: **Overview · Forecast · Budgets · Breakdown · Compare · Peak · Solar (conditional) · Advice**. Alternatively, group them: *Now* (Overview, Forecast, Budgets) / *Understand* (Breakdown, Compare, Peak, Solar) / *Act* (Advice).
- Mobile: a horizontally scrollable segmented bar with fade edges (the scroll stays inside the bar, so the page does not scroll sideways), or a "Topic ▾" sheet. Never wrap to 2 rows.
- Cross-links are ad hoc ("View budget →" from Forecast; nothing from Peak → Advice or Breakdown → Advice). Use a standard "Related" link at the bottom of each tab.

### 2.2 Overview's role
Make it the landing view and a **ranked brief**: one sentence of status, then 2–3 "needs attention" rows (over budget, above similar homes, new peak), then a compact list of the other topics with one metric each. Drop the Consumption placeholder tile. Tiles for not-ready tabs show "Available in 3 days", not a dead "—".

### 2.3 Pattern consistency
- The same concept is drawn differently: progress toward readiness appears as a 7-segment dash (Solar, Forecast), a 12-segment labelled bar (Peak) and a continuous bar (Breakdown profile, 30% / 70%). Pick one "readiness meter".
- Status chips: "On track for budget" (green dot pill), "On track" (✅ emoji tile), "On track" (green text + pill in chart header). Use one status chip with icon + text + semantic colour.
- Toggles: Day/Week/Month/Year pills (Solar, Peak), Month/Year (Forecast), kWh/€ (Breakdown), Elec/Gas (Compare, dark chip), Electricity · Monthly / Gas · Weekly (Budgets). There are five visual variants of a segmented control.
- Section headers alternate between UPPERCASE 11px ("YOUR ROLLING AVERAGE, EXPLAINED", "SEASONAL TREND — LAST 12 MONTHS") and sentence-case bold. Pick sentence case.
- Emoji as icons (🥧 📈 👛 🔥 🧊 ⏳ 🎯 🏆) render differently per OS and undercut "premium". Replace them with one line-icon set. Category glyphs are still useful, so keep one per energy use.

### 2.4 Estimates and caveats
There are at least 12 distinct caveats, each shown in full: "Estimated" badge, € average-price fallback, 95% band, regulatory floor, rough €/kW, "take this comparison lightly", "assumes fairly even usage", "patterns vary by home", "Illustrative", "(average, €0.27/kWh)", flow "Eliq's estimate", "Based on 3 months". Proposal:
- **One marker for estimates:** a "≈" prefix on the number and a dotted underline. Tap or hover opens a popover with the caveat text.
- **Tab-level footnote** ("About these numbers") collecting all caveats for that tab, collapsed by default.
- A caveat stays inline only if it **changes the interpretation of the hero number** (for example the 2.5 kW floor when the user is below it, or "3 of 12 months" in insufficient history).

### 2.5 Mobile behaviour
- The two-column (2/3 + 1/3) grid must collapse to a single column in **priority order**, not source order. For example, on Compare the side-column hero has to come *first*.
- Stat triplets become a stacked list (label left, value right) or a 2-up layout plus a hero, never 3-up at 390px.
- Tables (Peak calc, Forecast accuracy) become two-line list rows or stay collapsed. Never horizontal scroll.
- Charts need fewer ticks (Peak: 1/10/20/30), fewer labels on the chart itself, and a tap-to-inspect tooltip.
- Action buttons in Advice: one primary full-width button plus an overflow menu.

### 2.6 Accessibility risks (measured)
| Issue | Evidence | Fix |
|---|---|---|
| Low-contrast grey text | `#999` 2.85:1 (36×), `#aaa` 2.32:1 (7×), `#888` 3.54:1 (28×) | Secondary text ≥ `#5f6b70`-ish (≥ 4.5:1 on white and mint) |
| Brand green as text | `#3bada9` links 2.71:1 | Links/text in a dark green (`#1c6d68` = 6.1:1); keep `#3bada8` for fills and large numerals only |
| Chart colours as text | `#FF5630` 3.17:1, `#00B8D9` 2.37:1, `#f4b942` 1.77:1 (threshold labels) | Label thresholds in ink with a coloured swatch |
| Tiny text | 9px ×15, 8.5px ×5, 7.5px ×1, 10–10.5px ×37 | Minimum 12px UI text; axis ticks 11px |
| Colour-only encodings | Compare bars (teal/yellow/pink), streak cells, Breakdown 5 teal tints, Peak red bar, Import/Export chips | Direct labels, patterns or glyphs; ≤ 3 series hues |
| Emoji used as sole meaning | ✅ ⚠️ ✕ status tiles | Icon + text label |
| Toggle semantics | Pill toggles are visual only | `role=tablist` / `aria-pressed`, visible focus ring |
| Collapsibles | "▾ See the full calculation" | `<details>`/`aria-expanded`, animated only if reduced-motion allows |

### 2.7 Data-consistency defects (must fix before visual polish)
1. Budget limit: **300 kWh** (Overview, Budgets) vs **450 kWh** (Forecast "On track for budget") vs **380 kWh** (Forecast exceed-variant).
2. Monthly forecast: **412 kWh** (Forecast, Overview) vs **265 kWh** (Budgets "Forecast").
3. Budgets: "On track" alongside 10.4 kWh/day average, which projects to about 322 kWh (> 300).
4. Streak: "3-month streak" vs 2 ✓ cells.
5. Peak: red "month peak" bar on day 5 vs "18 May"; the bar exceeds the 4.2 kW line.
6. Solar: self-sufficiency worked example (6.9, 3.2) contradicts the flow diagram (9.6, 4.4).
7. Solar seasonal chart is normalised, so it can't show the "9×" in its own caption. Use absolute stacked bars.
8. Overview "Save up to 540 kWh/year with the top one" while a 650 kWh tip exists.

---

## 3. Proposed information architecture (hero → supporting → detail)

Legend: **[D]** = behind a disclosure ("Show details" / expandable), **[i]** = info popover, **[F]** = tab footnote "About these numbers".

### 3.1 Overview
1. **Hero:** one status sentence plus the most important item, for example "This month: 412 kWh forecast, on track for your 300 kWh budget."
2. **Needs attention (0–3 rows, ranked by severity):** Compare +73% vs similar homes; Peak (if a new peak raises the average); Advice "3 new tips — top saves ≈ €150/yr".
3. **All topics list:** compact rows (icon · topic · one metric · chevron). Breakdown "Heating 38%", Peak "4.0 kW avg" [i: capacity tariff], Solar "62% of your solar used at home" (solar users only), Forecast, Budgets, Advice.
4. Not-ready topics show a readiness hint ("Forecast · available in 4 days"). Consumption tile removed.

### 3.2 Forecast
1. **Hero:** "≈ 412 kWh this month" + delta chip "+8% vs May last year" + budget status chip "On track · budget 300 kWh" → View budget.
2. **Supporting:** Month/Year forecast chart with a clear "now" divider (actual solid, forecast dashed) and last year as a ghost line; direct end labels instead of a legend.
3. Glance row as a compact secondary strip: Today 14.2 · Week 92 · Year (needs more history). "so far + forecast" splits go under **[i]** or show as a two-tone bar.
4. **Next 24/48h** chart, shaded band with legend "Likely range"; the 95% paragraph moves to **[i]**.
5. **[D] "How accurate are our forecasts?"**: last month 380 → 402 (+6%, "pretty close") visible as one line; 6-month table inside.
6. **[F]** € unavailable note (as a disabled € toggle with tooltip), estimate caveats.

### 3.3 Budgets
1. **Hero:** status + remaining allowance: "On track — 113 kWh left for 13 days" with a single progress bar (used | forecast | limit marker).
2. **Pacing answer:** "Stay under 8.7 kWh/day" (variant: cut back ≤ 6.5 / already over +42 kWh). The "you're averaging 10.4" line becomes supporting text, with the "assumes even usage" part under **[i]**.
3. **Supporting:** daily bar chart (used vs forecast vs limit line), fuel/period toggle above.
4. **History & streak:** compact strip with labelled cells (✓ Under / ✕ Over / – No data) + "Best: 5 months".
5. **[D] Budget settings:** Mode (Auto +20% / Manual), period, edit. Setup flow reuses Auto/Manual cards.

### 3.4 Breakdown
1. **Hero:** "Heating is your biggest use — 38% (312 kWh) this month."
2. **Supporting:** ranked horizontal bar list (the list already *is* the chart; drop the donut or reduce it to a small companion on desktop). kWh/€ toggle; € shows "≈" plus **[i]** "average Belgian price, not your tariff".
3. Seasonal trend with **≤ 3 series** visible by default (Heating highlighted, others greyed) + insight sentence; the full 5-category view goes behind **[D]** or a series toggle.
4. Profile nudge as a slim inline banner at the bottom ("Sharpen this breakdown — profile 70% complete →").
5. **[i]** "Always on", "Estimated" on Water heating.

### 3.5 Compare
1. **Hero:** "You used 73% more than similar homes this month" + 3-bar mini chart (Most efficient 179 · You 442 · Similar 255), directly labelled, "You" in ink/accent and the others neutral.
2. **Supporting:** "Compared with: detached house, 1–2 bedrooms…" + **Update home profile** as a visible secondary button.
3. Consumption trend (You vs Similar homes, 6 months) + insight sentence. Elec/Gas toggle at tab level, not per chart.
4. **[D] "Your ranking over time"**: the Ranking chart, relabelled in plain language: "More than X% of similar homes". Percentile goes to **[i]**. Personal best reframed as "Your best month: March" with the percentile in **[i]**.
5. Empty/partial states replace the hero slot; the € unavailable state becomes an inline note on the toggle. Provenance notes and API codes are removed from the UI (kept in the spec).

### 3.6 Peak
1. **Hero:** "Your capacity-tariff peak: 4.0 kW" + "≈ €7.40/month" (≈ with **[i]** rough regional rate) + benchmark chip "Below Flemish avg 4.24 kW".
2. **Supporting:** daily peak chart with two labelled thresholds; the month's peak bar highlighted *and* labelled with date/time. Latest peak (3.8 kW, today 14:30) and Month peak (4.2 kW, 18 May) as a secondary 2-up row.
3. **"What's coming up":** "Your June 2025 peak (5.8 kW) drops out next month — your average may fall." (the rolling-average insight in one sentence plus a bar).
4. **[D] "How the 12-month average is calculated"**: explainer + 12-row table.
5. **[i]** capacity tariff, rolling average, 2.5 kW regulatory floor (shown inline only when relevant). Related: "Lower your peak → Advice".
6. Insufficient history: hero reads "Average so far: 3.0 kW · based on 3 of 12 months" + readiness meter; benchmark keeps its "take lightly" qualifier.

### 3.7 Solar
1. **Hero:** "Net exporter today: +3.2 kWh to the grid" + the flow diagram (Production 8.4 → Home 5.2 / Grid 3.2; Grid → Home 4.4) as the main visual.
2. **Supporting KPIs, plain names first:** "62% of your solar used at home" (Self-consumption **[i]**) · "54% of your energy came from your panels" (Self-sufficiency **[i]**). The formula and worked example move into each popover.
3. Day/Week/Month/Year net chart with Import/Export chips; **[D]** "Show raw production & consumption".
4. Seasonal production (absolute stacked bars self-consumed vs exported) + caption.
5. **[F]** "How the four streams relate" (identity equation, metered vs estimated). A single "≈ Estimated" marker replaces the 4 badges.

### 3.8 Advice
1. **Hero:** top tip as a featured card: title, one-line why, **"≈ €150/year"** as the big number (kWh secondary), primary button "Add to my plan" (= To do).
2. **Supporting:** remaining tips as compact rows, sorted consistently (state the sort: "Most relevant for you"). Secondary actions "Already do this" / "Not relevant" as quiet text buttons or overflow.
3. Big upgrades (heat pump) as a distinct "Bigger investments" section: investment, payback, financing.
4. Tabs: New · My plan (To do) · Done · Dismissed. Hide zero counts; the Discarded reason is shown as text.
5. **[i]** "(average €0.27/kWh)" price basis. Relevance scores and slugs removed from the UI.

---

## 4. Candidate UX principles for the design brief

1. **One answer per tab.** Each tab leads with a single sentence plus a number that answers its question. *The rubric's 5-second test fails whenever the hero shares weight with 3+ cards.*
2. **Say it in words, then show it.** Every chart is introduced by a plain-language insight sentence. *Charts support the conclusion; users shouldn't have to read the conclusion off the chart.*
3. **Euros before kilowatts.** Show € first where it exists (≈-marked), kWh/kW second. *Users decide in money; kW is jargon for most people.*
4. **Explain on demand, never by default.** Formulas, tables, confidence levels and regulatory notes live behind [i] or [D]. *Keeps every approved caveat without dumping it on the user.*
5. **One way to say "estimated".** A single ≈ marker with a popover, plus one tab footnote. *Twelve caveat styles read as uncertainty; one consistent marker reads as care.*
6. **Plain names first, technical terms in the popover.** "Used at home" before "self-consumption"; "more than X% of homes" before "percentile". *Removes the biggest comprehension barriers without deleting approved terms.*
7. **Colour means something or it isn't there.** Green = interactive, energy colours = series only, red = over or peak. Never colour alone. *Brand notes + WCAG; the current pink and yellow-for-"You" break both.*
8. **One primary action per view.** Other actions are secondary or overflow. *12 equal buttons on Advice and 8 equal links on Overview mean nothing stands out.*
9. **Not-ready is a state, not an error.** Every empty state gives: what's missing, how long, what (if anything) the user can do. Same readiness meter everywhere. *Existing copy is good; the visuals are inconsistent.*
10. **Mobile-first priority order.** Single column at 390px follows the hero → supporting → detail order. No sideways scroll, no 3-up stats. *7 of 8 panels overflow today.*

---

## 5. Top 10 prioritized recommendations

1. **Fix the data contradictions (§2.7)** before any visual work: budget 300 vs 450, forecast 412 vs 265, "On track" vs a 10.4/day pace, streak count, Peak red bar, Solar worked example, seasonal chart normalisation. Trust is the brand ("trustworthy and reliable").
2. **Add one hero per tab** (sentence + number + status chip), in the full-width top slot. Move Compare's and Solar's side-column summaries into it.
3. **Collapse all detail by default:** Peak calc table, Forecast accuracy table, Solar formulas and identity card, raw production chart, Compare ranking chart. They become [D] and [i] disclosures.
4. **Strip internal/meta copy from the UI:** API reason codes, slugs and relevance scores, "Real UAT data" badges, provenance sentences, schema notes, "NEW IDEA", "Hard block" titles, the Forecast "Eliq returns €0" note. Keep them in the spec, not on screen.
5. **Unify the estimate system:** ≈ marker + popover + tab footnote. Remove the 4 "Estimated" pills on Solar and the yellow disclaimer boxes that sit above data (Breakdown €, Peak €/kW, Forecast €).
6. **Pass the accessibility gates:** secondary text ≥ 4.5:1 (replace #999/#aaa/#888), links in dark green (#1c6d68), minimum 12px (11px axis ticks), threshold labels in ink, direct labels / glyphs for every colour-coded series, proper toggle and disclosure semantics, focus rings.
7. **Rebuild the mobile layout:** single column in priority order, stat triplets as list rows, tables as collapsed list rows, tabs as a single scrollable bar. Target 0 overflow at 390px.
8. **Turn Overview into a ranked brief** (status line → needs attention → compact topic list), drop the Consumption placeholder, and design tile states for not-ready tabs.
9. **Rework Advice actions:** the € saving is the hero number, one primary "Add to my plan", secondary dismissals, rename Save for later / To do consistently, hide zero-count tabs, fix the "up to" claim on Overview.
10. **Standardise components across tabs:** one segmented control, one status chip, one readiness meter, one insight-sentence callout, sentence-case section titles, one line-icon set replacing emoji. Limit chart palettes to ≤ 3 hues with "You" always in the same colour.

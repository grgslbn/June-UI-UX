# Round 2 — Evaluator 2 (UX research + accessibility)

Persona: senior UX researcher / accessibility specialist. My lens is an ordinary Belgian homeowner, not an energy expert. I did not build any of this.
Build evaluated: `app/index.html`, Direction C "Soft Native", 8 tabs, 31 panels (commit 33d83d7).
Evidence in `shots/eval2-r2/`:
- `index__<panel>__{desktop,mobile}.png`: all 31 panels at both widths, plus dark mode for Overview and Solar.
- `panels-text.txt`: product text of every panel.
- `a11y-probe.mjs` → `a11y.json`: keyboard order, focus ring, popover, disclosure, segmented, target size, headings, reduced motion.
- `advice-undo.mjs`: the Add-to-plan / Undo task under both motion settings.
- `labels.mjs`: every chart text alternative.
- `tools/audit.mjs --verbose`: **0 hard-gate failures**. That covers 62 panel×viewport checks, ≤ 6 sizes everywhere, 0 overflow at 390/1280, and reduced motion handled. With `reduce` the Peak panel runs 0 animations at load; with `no-preference` it runs 1.

UX score per tab = Σ(score × weight) / 50. Weights: 5-second 12, Cognitive load 8, Action 8, Edge 8, Accessibility 8, Responsive 6.

## Summary table

| Tab | 5-sec (12) | Cog. load (8) | Action (8) | Edge (8) | A11y (8) | Responsive (6) | **UX /5** |
|---|---|---|---|---|---|---|---|
| Overview | 4.5 | 4.5 | 4.5 | 3.0 | 4.0 | 4.5 | **4.18** |
| Compare | 4.5 | 3.0 | 4.0 | 4.0 | 3.5 | 4.0 | **3.88** |
| Solar | 3.0 | 3.5 | 3.5 | 4.5 | 3.5 | 4.0 | **3.60** |
| Breakdown | 4.0 | 3.5 | 4.0 | 4.0 | 3.5 | 4.5 | **3.90** |
| Peak | 4.5 | 4.0 | 4.5 | 4.5 | 3.5 | 4.0 | **4.20** |
| Forecast | 4.5 | 4.0 | 4.0 | 4.5 | 3.5 | 4.0 | **4.12** |
| Advice | 4.5 | 3.5 | 4.0 | 3.5 | 3.0 | 4.0 | **3.80** |
| Budgets | 4.5 | 4.0 | 4.0 | 3.5 | 3.5 | 4.5 | **4.02** |
| **Overall UX (mean of tabs)** | 4.31 | 3.75 | 4.06 | 3.94 | 3.50 | 4.19 | **3.96 / 5** |

Verdict: this is a clear improvement on Round 1 C, which scored 4.0 for 5-second comprehension and 3.5 for cognitive load. It is **just under the 4.0 UX bar**. Three tabs pull it down:
- **Solar:** the hero contradicts its own flow diagram.
- **Advice:** keyboard focus is lost in reduced-motion mode, and the savings copy is inconsistent.
- **Compare:** the percentile module is hard to read.

One foundation issue also affects six tabs: popovers are dialogs that never take focus.

### Round 1 C issues: status
| R1 issue | Status |
|---|---|
| Gauge "−0.24 kW" / arbitrary 0–6 kW dial | **Fixed.** It is now a 0–5 kW strip with a "0.24 kW below the Flemish average" chip and a sentence. |
| History gauge put "3 of 12 months" on a kW dial | **Fixed.** A segment readiness meter plus a strip with the 2.5 kW floor. |
| Competing numerals on Overview (113, +73, 5.8) | **Fixed.** 290 is the hero. Attention rows use body-strong text. 5.8 kW now sits inside a sentence. |
| Red overuse | **Mostly fixed.** Red remains on Overview's "+73%", the Peak month-peak bar and its legend. The roll-off bar is ink. |
| "Rolls off after June" | **Fixed.** Now "Drops out 1 Jun 2026" / "drops out on 1 June". |
| Rolling-average popover covered the hero on mobile | **Fixed.** Popovers open as a bottom sheet below 600px. |
| Dark-mode active tab too subtle | **Fixed.** The active tab now has a ring. |
| "New idea" designer badge in the product | **Still present** inside the ≈ €7.40 popover (`app/panels/peak.html:180`). It is frozen copy, but a homeowner can't make sense of it. |

---

## 1. Automated + probe results

| Check | Result |
|---|---|
| Hard gates (`audit.mjs`) | 0 failures, 31 panels × 2 viewports |
| Tab bar | 8 `<a>` links in a `<nav>`, with `aria-current="page"` on the active tab. On mobile it scrolls horizontally and the active tab is scrolled into view. Only a cut-off label hints at the scroll (no fade or arrow). |
| Keyboard order (8 main panels) | Logical, hero → supporting → detail. 13–22 stops per panel. **No stop without a visible focus ring.** |
| Segmented controls | `role=radiogroup` / `radio`, `aria-checked`, roving tabindex, arrow keys work, groups are labelled ("Period"). Disabled options are skipped. |
| Disclosures | `aria-expanded` flips and `aria-controls` resolves. Tested with Enter on the Peak calc disclosure. |
| Popovers (10 tested on 5 tabs) | Enter opens them, `aria-expanded` = true, Esc closes and returns focus. **But:** `role=dialog` + `aria-haspopup=dialog`, focus stays on the trigger, and the popover is moved to the end of `<body>`. Tab never reaches its content, and it **stays open after Tab moves away**. A screen-reader user hears "expanded" and then nothing. |
| Advice Add → Undo (keyboard) | Works with `no-preference`: focus lands on Undo, the live region announces it, counts update, and Undo restores. **Fails with `prefers-reduced-motion: reduce`:** focus drops to `<body>`, so Enter does nothing and the user is thrown to the top of the page. `focus()` fires at 0ms while `.ad-fold--note` is still `visibility:hidden`. |
| Chart text alternatives | Excellent. Every chart has `role=img` + a specific summary (numbers, extremes, "not happened yet"), and keyboard tooltips are announced through a live region. |
| Colour-only encodings | None found. The month peak is red **and** labelled, the streak cells use glyphs plus words, and import/export use position plus "Exporting/Importing" labels. Minor: on the Forecast mobile legend, "May 2025" and "Budget 300 kWh" are both grey solid lines, and the direct end labels disappear at 390px. |
| Targets | Nothing product-side under 24px. Primary buttons are 44px. ⓘ/≈ triggers are 24–28px (passes 2.5.8, but tight for older thumbs). Segments are 40px. Text links ("View budget", "See your full forecast") are 24px high. |
| Headings | Exactly one h1 per panel, and it is the hero sentence. Good. |
| Dead placeholders | `href="#"` on "Update home profile", "Set house type" and "Complete profile" (7 instances). Acceptable in a prototype, but these are the path-forward CTAs of edge states. |

---

## 2. Per tab

### Overview — 4.18
**5-second test (desktop + mobile):** *"May's fine: about 290 of my 300 kWh. And I use a lot more than my neighbours."* ✔ The intended answer, the hero sentence, the 290 numeral and the "On track" chip all agree. The used / forecast / budget bar is legible. The ranked "Needs attention" list is clear on mobile.
Task (a), find what needs attention and go there: three whole-row links with chevrons, one target each. This fixes R1's double affordance. Focus lands on the target tab.
Issues:
- Attention row 2 (Peak, "drops out on 1 June … may fall to 3.9 kW") is *good* news placed under "Needs attention". Homeowners will read it as a warning.
- "All topics" shows no jargon help. "sets your capacity tariff" has no ⓘ, although the §3.1 IA asked for one.
- The Solar row repeats the false "Net exporter today" line (see Solar).
- **Edge 3.0.** There are no Overview edge states. §3.1.4 asks that "not-ready topics show a readiness hint (Forecast · available in 4 days)". A new customer, who has the most not-ready tabs, gets no designed landing. **Fix:** add `panel-overview-new` in `app/panels/overview.html`: hero = "We're still getting to know your home", and All-topics rows swap their metric for a small readiness chip ("Forecast · from 23 May", "Peak · 3 of 12 months", "Solar · ready 21 May"), reusing the existing `.readiness` meter.
Edge-state rating: **3/5** (none designed).

### Compare — 3.88
**5-second test:** *"I used 73% more than homes like mine in April."* ✔ This is instant. The hero numeral, sentence, chip and 3-bar comparison all agree.
Task: jargon ("more than 95.5% of similar homes"). The ⓘ popover is there, but the module around it is the problem.
- **Cognitive load 3.0.**
  - The "Your own progress / Beat your personal best" tile is shown by default. It asks a homeowner to read a 90–100% percentile scale where *lower is better*. "Your best month … you used more than 95.5% of similar homes" reads like a bad result presented as a trophy. §3.5 wanted the ranking behind [D] and the personal best in plain words.
  - The chart insight "You used **408→569 kWh**" uses an arrow that implies a trend from Nov to the end of the range. In fact the range is 372–569 kWh and the series ends at 442.
  - On desktop, the legend and the direct end labels repeat each other.
  - **Fix (`app/panels/compare.html`):**
    - Collapse the whole personal-best tile into the existing "Your ranking over time" disclosure.
    - Replace the visible tile with one sentence: "Your best month was November 2025 (408 kWh). April was 442 kWh." Keep the percentile in the ⓘ.
    - Rewrite the insight to "You used between 372 and 569 kWh a month — more than similar homes every month; the gap was widest in February (569 vs 255)."
    - Drop the top legend on desktop, since the direct labels already name the lines.
- A11y 3.5: popover semantics (foundation, see cross-tab).
- The kWh | € toggle exists only in the `-eur` variant, not in the main panel. A user can't discover that € exists or why it is missing.

Edge states: 6 states, all honest, and each gives a reason. "No matching group" ("We'd rather show nothing than compare you with the wrong homes") is excellent. "Still gathering the group — check back in a few days" has no date (known Q23). The good-news state says "this month" while showing an April comparison.
Edge-state rating: **4/5**.

### Solar — 3.60
**5-second test:** *"I sent 3.2 kWh to the grid. I'm a net exporter. Wait, the grid gave me 4.4?"* ✘ The intended answer (§3.7) is "Net exporter today: +3.2 kWh". With the canonical numbers that statement is false: import 4.4 > export 3.2, so the home is a net *importer* by 1.2 kWh (known Q18). This build **makes it worse** than the source:
- "Net exporter today" is now the hero label over a giant "+3.2 kWh".
- The flow diagram right next to it shows Grid 4.4.
- The Month chart's own alt text says "exported 57.6, imported 75.0".
A homeowner who notices the mismatch stops trusting every number on the tab.
- **5-sec 3.0. Fix (`app/panels/solar.html` hero):**
  - Relabel the kicker "Sent to the grid today" and keep +3.2 kWh.
  - Make the supporting line "Your panels made 8.4 kWh; 5.2 kWh powered your home, and you bought 4.4 kWh from the grid."
  - Mirror the change in Overview's Solar row.
  - Close Q18 with product before build. Until then, no screen should assert "net exporter".
- **Cognitive load 3.5.**
  - In the flow diagram the Grid node shows "4.4 kWh", but both the export arrow (3.2) and the import arrow (4.4) touch it. It reads as "grid = 4.4 total". **Fix:** label the node "Grid · 4.4 in / 3.2 out", or drop the node total.
  - In the net chart, the teal line on top of the bars has no legend or label.
  - Both halves of the y-axis are labelled "0.5 / 1.0" with no minus sign below zero. **Fix:** remove the line, or label it "Net"; label the axis −0.5 / −1.0, or "0.5 in / 0.5 out".
- **Action 3.5.** There is no next step on the whole tab: no link to Advice ("use more of your own solar"). **Fix:** add a secondary "Use more of your own solar →" row under the seasonal chart, linking to Advice.
- The footnote and popover say "Eliq's estimate" and "Eliq is 95% confident". This is frozen copy, but the vendor name means nothing to a homeowner. Flag to product: use "our estimate".

Edge state: "Still calibrating" is excellent: day-labelled meter, "Ready on 21 May · 3 more days", "Import and Export already tracking fine", "nothing you need to do". One small inconsistency with Forecast: Solar is "ready on day 7" while Forecast is "ready the day after day 7".
Edge-state rating: **4.5/5**.

### Breakdown — 3.90
**5-second test:** *"Heating is my biggest thing, 38%."* ✔ Fast. But the kicker reads "**May 2026 · 820 kWh in total**", and on every other tab May is 187 kWh so far / 290 forecast, with April at 442. Heating alone (312 kWh) exceeds the whole month's forecast. The seasonal chart right below shows May at 14%, not 38% (known Q3). Printing the 820 total in the hero turns a buried inconsistency into a visible one.
- **5-sec 4.0, cognitive load 3.5.**
  - The 38% appears four times above the fold (headline, numeral, split bar, first list row).
  - Six category hues (purple, amber, pink, blue…) make a rainbow on a tab about one answer.
  - The seasonal chart doesn't highlight the current month, so the May 14% isn't flagged either way.
  - **Fix (`app/panels/breakdown.html`):**
    - Take "820 kWh in total" out of the hero kicker until the period is resolved. Better: resolve Q3 by relabelling the hero "March" or rescaling the categories to May = 187/290.
    - Drop the numeral/bar duplication. Keep the headline plus the split bar, and let the list carry the detail.
    - Highlight the current month in the seasonal chart (accent), with the others muted.
    - Add 820 vs 290 to `open-questions.md`. It isn't logged.
- Action: "Complete profile" is clear, but its `href="#"` is dead.

Edge states: "profile needed" has good copy and a "What you'll see" preview, but the field names are still placeholders (Q1). "Not ready" gives "Expected around 8 June 2026" and "Nothing to complete here — just needs time". Good.
Edge-state rating: **4/5**.

### Peak — 4.20
**5-second test:** *"My capacity-tariff number is 4.0 kW, about €7.40 a month, just under the Flemish average."* ✔ The R1 confusion is gone.
Task (b), jargon: ⓘ next to "12-month rolling average" and "capacity tariff", both with plain copy.
Task (d), not-ready: "Based on 3 months, not 12 yet · Complete after June 2026 · 9 more months · nothing you need to do". This is the best not-ready copy in the product.
Issues:
- The "Month peak 4.2" and "12-month avg 4.0" threshold lines sit 0.2 kW apart. At 390px they almost overlap, and the labels move to a legend where both are lines of similar weight.
- "You're just under average!" — the exclamation mark over-celebrates a 0.24 kW gap.
- The 12-month mini bar chart has no values on screen. The alt text does, so it is fine for screen readers.
- The "New idea" tag is in the ≈ popover.
- **Fix (`app/panels/peak.html`):** on mobile, keep only the 4.0 average as a line and mark the 4.2 month peak through its annotated red bar, as desktop already does. Remove the "!".

Edge state: the insufficient-history state is strong. It keeps the daily chart (15 canonical days), the "take lightly" caveat sits next to the comparison, and the 2.5 kW floor is shown on the strip.
Edge-state rating: **4.5/5**.

### Forecast — 4.12
**5-second test:** *"I'll use about 290 kWh this month, 8% more than last May, and I'm still under my budget."* ✔ The hero and budget aside answer it; "View budget" is the single link.
Task: the Month/Year and kWh/€ segments work by keyboard. € is disabled with an ⓘ saying why. Good.
Issues:
- "Now: 18 May, 14:30" in the next-24h module vs "Updated today, 20:00" on Budgets (Q7). The UI now surfaces *both* timestamps a click apart.
- The end label "Best estimate 0.27 kWh" is ambiguous: it is the value at the last hour, and it echoes the €0.27 price.
- The over-budget variant says "about 6.2 kWh a day". The spec derivation subtracts today's expected use and then still divides by 13 days. That should be 12 days → ≈ 6.7, or 6.4 on the Budgets basis. It is also inconsistent with Budgets' "cut back to 6.5" method.
- On mobile, "May 2025" and "Budget" are both grey solid lines in the legend.
- **Fix (`app/panels/forecast.html`):**
  - Use one "now" everywhere (20:00).
  - Relabel the end point "Best guess for 14:00".
  - Recompute the over-budget pace with the Budgets formula.
  - Make the budget line dashed ink on mobile, or keep its direct label.

Edge states: over-budget, no-budget, partly-ready ("Monthly forecast unlocks on 6 June 2026 · 18 more days") and not-enough-data ("What unlocks when" with per-item dates) are all specific and reassuring. The only gap: "This year — Needs a bit more history yet" never gives a date on any state (Q8).
Edge-state rating: **4.5/5**.

### Advice — 3.80
**5-second test:** *"Turning my heating down a bit saves about €150 a year. There's a button to add it."* ✔
Task: "add a tip to my plan and undo" works with a mouse. The fold-away confirmation "Added to your plan. [Undo]" is clear, counts update, and the live region announces it.
- **A11y 3.0.** With `prefers-reduced-motion: reduce`, pressing "Add to my plan" by keyboard sends focus to `<body>`. The Undo can't be reached without tabbing through the whole page again, which breaks WCAG 2.4.3 for exactly the users who ask for less motion. (`advice-undo.mjs` reproduces it at 1280 and 390.) **Fix (`app/panels/advice.html` script):** under reduced motion, focus Undo in a `requestAnimationFrame` after `.is-moved` is applied, or set `visibility` without a transition delay. More simply, drop the `visibility 0s linear var(--dur-base)` delay inside the reduced-motion media query.
- **Cognitive load 3.5.**
  - The "Top tip" saves €150, yet the second row ("Carpets…") saves €180. A homeowner asks why the top tip is the smaller one. The sort ("most relevant for you first") is stated, but only in 12px grey.
  - The heat-pump card says "Replacing gas heating", while this household's heating shows up in its *electricity* breakdown.
  - €1,134/yr = 4,200 kWh × the *electricity* price, which is misleading for a heat pump that itself runs on electricity. It is marked illustrative, but it is the biggest € on the tab.
  - **Fix:**
    - Make the hero's "Picked first because…" line visible above the fold on mobile, and add "(€180 carpet tip is below)", or sort by € once relevance ties.
    - Log the heat-pump fuel mismatch as an open question.
- Action 4.0: one filled primary, but each row still has three actions (12 on screen). On mobile, consider putting "Already do this / Not relevant" behind a "⋯" overflow.
- Edge 3.5.
  - "Nothing to suggest yet" says "usually resolves itself as more … data comes in", with no timeframe and no footnote.
  - The Done/Plan/Dismissed views are good. "Only tips you've actually done are counted" is honest.
  - **Fix:** add "We usually have tips within 2 weeks of your first readings", or a readiness meter if the data exists.

Edge-state rating: **3.5/5**.

### Budgets — 4.02
**5-second test:** *"I'm on track. 113 kWh left, stay under 8.7 a day, and I've been doing 7.9."* ✔ This is the clearest pacing answer in the product.
Issues:
- In the daily chart, days 1–11 (10.8–13.4 kWh) sit well above the 8.7 line in muted grey with no explanation. A homeowner may think "I was over for 11 days?" The insight covers only "Since 12 May". **Fix:** add "The first 11 days ran higher (≈ 12 kWh/day); since 12 May you've been under" to the insight, or label the grey group "Before 12 May".
- "Gas · Weekly" is shown disabled on every state with no visible reason (Q12). **Fix:** add an ⓘ, "No gas meter linked", next to it, as Compare/Forecast do for €, or hide it.
- **Edge 3.5.**
  - "Cutting it close" and "Over budget" are excellent: "Why we think you'll go over", recent pace → target, and a CTA to Advice.
  - "Awaiting first run" says "check back shortly": when?
  - "Not enough data" has no timeframe, no last-reading date, no action and no footnote. It is the only state in the product that breaks principle 9 ("what's missing · how long · what you can do").
  - **Fix (`app/panels/budgets.html`):**
    - Awaiting: "First calculation usually arrives within an hour", plus the Budget settings link.
    - No data: "Last reading received: 14 May. If nothing arrives by 21 May, check your meter connection →", plus the About footnote.

Edge-state rating: **3.5/5**.

---

## 3. Cross-tab findings

1. **Popover semantics (foundation, all tabs except Overview).** `role=dialog` without focus management, and DOM-moved to the end of `<body>`. For screen-reader and keyboard users the jargon explanations, the main tool for cognitive load, are effectively invisible. Popovers also stay open after Tab moves away. **Fix in `app/app.js`:** these are informational, so treat them as disclosure tips. Either keep each popover in the DOM right after its trigger, or leave it at the end of `<body>` and point to it with `aria-describedby` on the trigger. Drop `role=dialog` / `aria-haspopup`, and close on `focusout`. The alternative is to keep `dialog` but move focus to the popover heading and trap Tab until Esc.
2. **One source of truth for "May".** Four tabs describe May with different totals: Budgets/Forecast 187→290, Breakdown 820 (May!), Forecast-year chart Jan 512 → Apr 442, Compare Apr 442. Solar calls today a net export while its own numbers say import. None of these is new data work, but the redesign made each number a hero or kicker, so a homeowner sees them all. Before build, reconcile them in `brief/demo-data.md` and add the 820 total to `open-questions.md`.
3. **"Now".** Forecast says 14:30, Budgets says 20:00, and demo "today" is 20:00. Use one timestamp pattern ("Updated today, 20:00") at the same place on every data tab (foundation: a shared `.updated` slot in the tab header).
4. **Readiness rule.** Solar is ready *on* day 7 while Forecast is ready the day *after* day 7. Pick one rule, and give "This year" a date or a clear "after 12 months" everywhere.
5. **Toggles.** The fuel toggle has three forms: Compare `Elec | Gas` (dot chips), Budgets `Electricity · Monthly | Gas · Weekly` (fuel fused with period), and none on Forecast/Breakdown/Peak. The € toggle exists on Forecast and Breakdown but only in the edge variant on Compare. Standardise: fuel toggle at the tab level (§3.5), period separate, and € always shown (disabled + ⓘ when unavailable).
6. **Terminology is mostly consistent.** Wins: "Used at home / From your panels", "My plan / Dismissed", "Drops out 1 June", "≈" plus "About these numbers" on every tab. Remaining drift:
   - "12-month rolling average" is the Peak hero label, with the plain version second. Principle 6 asks for plain words first, e.g. "Your peak average (last 12 months)".
   - Overview says "Needs attention" for good news.
   - "Most efficient homes" (Compare) vs "lowest-using 10%" (footnote).
7. **Navigation.** At 390px the tab bar shows about 4 of 8 tabs with no scroll cue. **Fix (`app/components.css`):** add an edge fade mask on `.tabs-scroll` (foundation).
8. **Frozen vendor/meta copy** ("Eliq", "New idea") still reaches the product layer inside popovers and the Solar footnote. It is verbatim per the inventory, but flag it to product for a homeowner rewrite.
9. **Content fidelity.** The audit's frozen-content gate passes. All 8 tabs and the ~23 inventory edge states are present. Invented copy is clearly logged in each tab's spec notes and `open-questions.md`, *except*: the Breakdown 820 vs 290 conflict, the heat-pump fuel mismatch, and the Forecast over-budget 6.2 kWh/day derivation.

---

## 4. Top 10 fixes, ranked by impact

1. **Solar hero asserts a false "Net exporter today"** as its headline over +3.2 kWh, beside Grid 4.4. Relabel it "Sent to the grid today" and state the import. Mirror the change on Overview's Solar row. — `app/panels/solar.html`, `app/panels/overview.html`
2. **Popovers: dialog without focus.** Their content is unreachable in reading order and they stay open after Tab. Convert them to non-modal tips placed in the DOM next to the trigger (or `aria-describedby`), and close on focusout. — foundation (`app/app.js`)
3. **Advice Add→Undo loses focus under reduced motion** (focus → body). Focus Undo after the style applies, and drop the visibility transition delay inside the reduced-motion media query. — `app/panels/advice.html`
4. **Breakdown "May 2026 · 820 kWh in total"** contradicts 187/290 kWh everywhere else, and its May seasonal bar shows 14%. Remove the total from the hero, highlight the current month in the seasonal chart, and log the conflict. — `app/panels/breakdown.html`, `brief/open-questions.md`
5. **Compare personal-best percentile tile** (90–100% scale, "lower is better", a trophy for "more than 95.5%"). Move it into the "Your ranking over time" disclosure, replace it with a plain best-month sentence, and fix the "408→569" insight. — `app/panels/compare.html`
6. **Budgets "Not enough data" / "Awaiting first run" give no when or what-to-do.** Add a timeframe, the last reading date, an action and the footnote. Also explain the disabled Gas option. — `app/panels/budgets.html`
7. **Overview has no new-customer / not-ready state** (§3.1.4). Add a panel whose topic rows show readiness chips. — `app/panels/overview.html`
8. **One "now" and one readiness rule across tabs** (14:30 vs 20:00; ready on day 7 vs day 8; "This year" never dated). — foundation + `app/panels/forecast.html`, `app/panels/solar.html`
9. **Advice € ordering and heat-pump copy.** The top tip (€150) sits above a €180 tip without a visible reason. The heat pump says "replacing gas" and is priced at the electricity price. Show the relevance reason, and log the fuel mismatch. — `app/panels/advice.html`
10. **Mobile chart labelling.**
    - Peak: the 4.0/4.2 lines nearly overlap.
    - Forecast: the Budget and May 2025 lines are both grey.
    - Solar: the net line has no label and the axis has no negative signs.
    - Add a scroll-fade cue on the 390px tab bar.
    - Owners: `app/panels/peak.html`, `app/panels/forecast.html`, `app/panels/solar.html`, foundation (`app/components.css`).

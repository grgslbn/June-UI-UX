# Reference research — premium, minimal energy Insights

Research for the June "Insights" redesign (Overview, Compare, Solar, Breakdown, Peak, Forecast, Advice, Budgets).
Date: 2026-09-23. Output target: plain HTML/CSS, subtle animation.

**How to read the citations.** Most vendor sites (ouraring.com, octopus.energy, tibber.com, m3.material.io, carbondesignsystem.com, support.apple.com, stripe, linear.app, monzo.com) were **blocked by the sandbox egress proxy**, so page bodies could not be opened. Facts below come from two kinds of source:
- **[S]** = web-search result snippets from the linked page (the vendor's own page wherever possible). Treat these as reliable at the level of "this feature exists / works like this", not pixel detail.
- **[F]** = full text read directly (only Apple's Human Interface Guidelines on developer.apple.com could be fetched).
- **[GK]** = general product knowledge, not confirmed by a source in this session. Check against screenshots before relying on it.

---

## 1. References: what each does well

### 1. Oura (readiness score + contributors)
- **Hero metric.** One bold score per day (Readiness, Sleep, Activity) summarises many signals, instead of a wall of charts. [S] https://swipefile.com/oura-ring-readiness-score
- **Contributors explain the number.** Readiness has nine named contributors (e.g. Sleep Balance, HRV Balance, Body Temperature). Each opens a detail view, and you can swipe between them. [S] https://support.ouraring.com/hc/en-us/articles/360057791533-Readiness-Contributors
- **Jargon is anchored to *your* baseline.** "Balance" contributors compare your last 14 days with your two-month average, and temperature is shown as deviation from *your* norm, never an absolute. [S] https://support.ouraring.com/hc/en-us/articles/360025589793-Readiness-Score
- **Redesign moved toward long-term trends.** The newer app puts long-term health "into focus" and pushes trends ahead of the daily spike. [S] https://ouraring.com/blog/new-oura-app-experience/
- [GK] Contributor rows use a label, a short status word ("Optimal", "Pay attention") and a thin progress bar. Colour is muted, and only an attention state picks up an accent.

### 2. WHOOP
- **Answers first.** The home screen shows three separate dials (Sleep, Recovery, Strain), and each links to a deep-dive page that shows "what metrics contribute to your scores". [S] https://www.whoop.com/us/en/thelocker/the-all-new-whoop-home-screen/
- **Three-tier progressive disclosure:** glanceable score, then trend view, then detailed graphs. Colour follows a three-colour meaning scale (green/yellow/red), not decoration. Information design by Bureau Oberhaeuser. [S] https://www.925studios.co/blog/whoop-design-breakdown
- Lesson for June: "start with the question your user asks first, compress your data into an answer for that question, and layer detail behind deliberate interactions" (same source).

### 3. Stripe Dashboard
- **Tabular figures everywhere** (`font-feature-settings: 'tnum'`). Numbers are right-aligned and labels left-aligned. Rows are split by hairline rules, with no zebra striping. [S] https://www.webdesignhot.com/design.md/stripe/ , https://www.925studios.co/blog/stripe-dashboard-design-breakdown
- **Light weight at display size.** Weight 300 for big numbers, "lightness as luxury", where most products use 600–700. **Units are set lighter than values.** [S] same sources
- **Monochrome sparklines** for trends. Colour is kept for status only (succeeded/failed/pending). The chart summarises and "the table is the truth". [S] same sources
- (These are third-party teardowns of Stripe, not Stripe's own docs.)

### 4. Linear (2024 and 2026 UI refresh)
- A "calmer, more consistent interface" with fewer separators and borders. Sidebars are dimmed so the main content stands out. [S] https://linear.app/now/behind-the-latest-design-refresh , https://linear.app/changelog/2026-03-12-ui-refresh
- Neutrals moved from cool blue-grey to a **warmer grey**, "crisp but less saturated". Going too warm looks muddy. [S] https://linear.app/now/how-we-redesigned-the-linear-ui
- Lesson for June: tint the neutrals slightly toward June Green (a cool-mint grey), not pure grey, and don't overdo it.

### 5. Apple: HIG Charts, WWDC22 chart sessions, Health, Home Grid Forecast
- **Summarise the chart in words above it.** "Summarize the main message of your chart… Weather provides a title and subtitle that succinctly describe the expected precipitation for the next hour." [F] https://developer.apple.com/design/human-interface-guidelines/charts
- **Data first, chrome second.** "You want the data itself to be most prominent, while letting the descriptions and axes provide additional context without competing." Use fewer grid lines and light label colours when the chart is interactive. [F] same
- **Axis rules.** Bars start at zero. Use familiar tick sequences (0, 5, 10, not 1, 6, 11). Use a fixed range when bounds mean something (e.g. 0–100%) and a dynamic range otherwise. Put units in the title, not on every tick. [F] same
- **Chart system.** "Use smaller non-interactive charts higher in the navigation hierarchy that lead to expanded, interactive charts", and "progressively reveal chart complexity". [S] https://developer.apple.com/videos/play/wwdc2022/110342/ , https://developer.apple.com/videos/play/wwdc2022/110340/
- **Health Trends / Highlights** proactively surface a *change* ("your resting HR is trending down") in plain language, rather than asking users to find it. [S] https://techcrunch.com/2021/06/16/apple-health/
- **Home Grid Forecast** shows a simple bar strip where **green bars mark cleaner times**. A single colour carries the meaning. [S] https://support.apple.com/guide/iphone/use-grid-forecast-to-plan-your-energy-usage-iph6f57f4435/ios
- **Motion.** "Add motion purposefully… Don't add motion for the sake of adding motion." "Aim for brevity and precision." "Avoid adding motion to UI interactions that occur frequently." "Make motion optional." [F] https://developer.apple.com/design/human-interface-guidelines/motion
- **Type.** "In general, avoid light font weights… when text is small." "Minimize the number of typefaces." [F] https://developer.apple.com/design/human-interface-guidelines/typography. This is a useful counterweight to Stripe: use light weights only at display sizes.

### 6. Tibber
- **Live consumption is always front and centre.** "Every time you open the Tibber app, you see the amount of energy being used in your home." Its data-viz agency's brief was to show consumption "in a clear, neat and user-friendly way." [S] https://www.thnx.se/en/customer-cases/tibber
- Tracks monthly consumption, monthly cost and **monthly peak hour** as first-class metrics, which matters for June's Peak tab. [S] https://www.home-assistant.io/integrations/tibber/
- Hourly price plus consumption combined in one chart. [S] https://github.com/Danielhiversen/home_assistant_tibber_custom
- [GK] Dark, high-contrast UI with a single hero number and a hand-drawn/illustrative brand voice. That is close to June's "playful but trustworthy" position.

### 7. Octopus Energy (Agile, Octoplus, Saving Sessions)
- **Price bands as colour, not numbers:** half-hourly bars are green (<15p), amber (<30p), red (≥30p) and blue for negative. The chart rolls forward when tomorrow's prices are published and marks the day change. [S] https://github.com/mcintyre94/octopus-agile (community app modelled on Octopus Agile). Official page: https://octopus.energy/smart/agile/
- **Forecast with honesty:** a 7-day line with a **shaded p10–p90 uncertainty band**, plus a per-day table (cheapest slot, average, peak). [S] same source
- **Gamification that stays adult:** Saving Sessions now come as "Power Up / Power Down" on a single results dashboard, rewarded in Octopoints (800 = £1). There are daily check-ins and quizzes. [S] https://octopus.energy/saving-sessions/ , https://octopus.energy/octoplus/
- [GK] Brand illustration (Constantine the octopus) lives mainly in empty and celebratory states. The data screens stay simple. That is a good model for June's mascot Junior.

### 8. Opower home energy reports (the origin of "compare to similar homes")
- Compares you with ~100 **similar-sized neighbouring homes** and also with the "**efficient neighbours**" group, as two bars. [S] https://inhabitat.com/opower-encourages-efficiency-with-energy-report-cards/ , https://www.popsci.com/what-if-neighbors-are-watching/
- **Watch the boomerang effect.** Low users who learned the norm started using *more*. Opower added an injunctive signal (smiley for "Great"/"Good") to counter this. The "frownie" for below-average was **dropped after complaints**. [S] https://en.wikipedia.org/wiki/Opower , https://slate.com/technology/2013/03/opower-using-smiley-faces-and-peer-pressure-to-save-the-planet.html
- Lesson: praise good results, stay neutral about poor ones, and always pair a comparison with a next step.

### 9. Google Nest (Leaf)
- **One tiny positive symbol** (the green Leaf) appears whenever you pick an energy-saving setting. "The more often the Leaf appears, the more you save". The rules adapt to your home after a few days. [S] https://support.google.com/googlenest/answer/9244106?hl=en
- Monthly **Home Report** email compares with previous months. [S] https://support.google.com/googlehome/answer/9247300?hl=en
- Lesson: small gamification signals beat badges and leaderboards in a premium product.

### 10. Tesla app / Enphase / SolarEdge (solar and energy flow)
- **Tesla energy flow:** a live diagram links Solar, Powerwall, Home and Grid with animated lines. Each source has its own colour (solar orange, battery green, grid grey). You read the situation from which way the flows run. [S] https://gridtitans.com/blogs/news/how-the-tesla-app-works , https://www.tesla.com/support/energy/powerwall/mobile-app/tesla-app-for-energy
- **Enphase:** consumption in one colour (orange). Grid is grey, with **import above the zero line and export below**. "Net imported / Net exported" gives a single verdict word. Periods: day / month / year / lifetime / custom. [S] https://support.enphase.com/s/article/how-to-monitor-energy-data-in-the-enphase-app
- **mySolarEdge:** an "Energy Balance" chart shows production, consumption, import/export and battery over time, to explain self-consumption. [S] https://www.solaredge.com/en/solaredge-blog/mysolaredge
- Community forums show users struggle to read these graphs ([S] https://www.solarpaneltalk.com/forum/solar-panels-for-home/solar-panels-for-your-home/414039-trouble-interpreting-enphase-energy-graphs). June should add a plain sentence above the chart.

### 11. Monzo Trends / Revolut Analytics (spending = energy budget analogue)
- **Monzo Trends** has three views (Spending, Balance, Targets). Targets lets you set one overall monthly budget plus optional per-category targets, with progress on a graph and "left to spend" based on upcoming payments. [S] https://monzo.com/blog/targets-in-trends , https://monzo.com/help/monzo-perks/trends-spending-and-balance-web
- **Revolut** shows the current-period total up top, the average as bars below, and a **this-month-vs-last-month** comparison that highlights the categories that rose or fell. [S] https://blog.revolut.com/introducing-new-and-improved-analytics/ , https://help.revolut.com/en-US/help/accounts/budget-and-analytics/how-can-i-see-my-spending-and-income-analytics/
- [GK] Both use a "projected end-of-month" dashed line against the target line. This is the most-copied budget pattern in fintech.

### 12. Sense (breakdown and "Always On")
- Device bubbles sized by power. A named **"Always On"** bucket for standby load, with in-context education on how to reduce it. [S] https://sense.com/consumer-blog/understanding-the-sense-app/
- Makes an invisible cost concrete (e.g. 278 W ≈ $120/yr in one user's review). [S] https://restechtoday.com/living-with-the-sense-energy-monitor-frustrating-but-helpful-overall/
- Lesson for Breakdown: turn kWh into € per year and give the baseload a name.

### 13. Benelux competitors (context, not style references)
- **ENGIE Smart app:** current and previous monthly peak, **the moment the peak was set**, and an optional push notification when you set a new monthly peak (free). [S] https://www.engie.be/nl/capacity-tarif/smart-app , https://www.engie.be/nl/support/faq/dienst-na-verkoop/smart-app/je-verbruik/waar-informatie-capaciteitstarief/
- **Luminus EnergyControl:** live insight "tot op de euro" (down to the euro). You pick a maximum peak and get notified when you reach it (paid dongle). [S] https://press.luminus.be/luminus-biedt-klanten-live-en-tot-op-de-euro-inzicht-in-energie-verbruik-en-capaciteitstarief
- **Fluvius definitions** June must mirror: monthly peak = highest 15-minute peak of the month (kW). Billed value = average of the previous 12 monthly peaks. [S] https://www.fluvius.be/nl/factuur-en-tarieven/capaciteitstarief/gezinnen-en-kleine-ondernemingen/aangerekend
- Implication: peak tracking plus alerts is now **table stakes** in Belgium. June can stand out by *explaining* the peak and *what it costs in €*.

### 14. Design systems (charts, colour, motion, empty states)
- **IBM Carbon:** avoid "filling the chart frame with too many elements". Use categorical colours in their curated order. Use monochromatic palettes for trend charts and gradients for highlighting extremes. [S] https://carbondesignsystem.com/data-visualization/chart-anatomy/ , https://carbondesignsystem.com/data-visualization/color-palettes/
- **Material 3 motion:** standard easing `cubic-bezier(0.2, 0, 0, 1)`, decelerate `cubic-bezier(0, 0, 0, 1)`. Things entering the screen decelerate. Durations are 50–150 ms for state changes, 100–300 ms for components and 300–700 ms for transitions. [S] https://m3.material.io/styles/motion/easing-and-duration/tokens-specs (snippet via a GitHub summary: https://github.com/aldefy/compose-skill/blob/master/skills/compose-expert/references/material3-motion.md)
- **Empty states:** say *why* it's empty (no data yet / not connected / nothing matches) and give one next step. Use minimal graphics that support the text rather than compete with it. [S] https://app.uxcel.com/courses/common-patterns/empty-states-best-practices-330 , https://designsystems.surf/components/empty-state

---

## 2. Pattern library mapped to June's tabs

### Overview
1. **Summary sentence + three dials/tiles** (WHOOP home, Apple chart summary). Headline: "You used 8% less than last September." Below it sit three calm tiles: **Cost this month**, **Usage**, **Peak**. Each is a big number plus a tiny sparkline or delta and links to its tab. *Why:* it answers "am I OK?" in a few seconds.
2. **Small, non-interactive charts that lead to big interactive ones** (WWDC22). Overview charts don't have tooltips. Clicking opens the tab. *Why:* keeps Overview calm and makes it clear where to dig.
3. **Proactive highlight card** (Apple Health Trends). One card at most: "Your baseload rose 40 W since June — probably a new device." *Why:* one useful insight is worth more than a lot of chrome.

### Compare to similar homes
1. **Two-reference bar** (Opower): *You*, *Similar homes* and *Efficient similar homes* on one horizontal track, with dots on a line rather than three fat bars. *Why:* this is the proven behavioural format, drawn in a minimal way.
2. **Praise, don't shame** (Opower's backlash): a Nest-Leaf-style small June-Green mark for "Efficient". The "above average" state stays neutral ink plus a link to Advice, and **never red**. *Why:* avoids the boomerang effect and complaints.
3. **Say what "similar" means** (Oura's baseline explanations): "Compared with 100 homes like yours: terraced house, 3 people, gas heating." Put it on an expandable line. *Why:* trust comes from being open about the method.

### Solar
1. **Flow diagram on the hero** (Tesla, simplified): Sun → Home → Grid with thin lines. Line thickness shows the share. There is *one* slow dash animation that respects `prefers-reduced-motion`. *Why:* it explains self-consumption without a legend.
2. **Diverging bars around zero** (Enphase): import above, export below, self-consumed solar filled in June Green, grid in neutral. *Why:* sign = direction is easy to learn.
3. **Single verdict + ratio** (Enphase "Net exported"): "63% of your solar was used at home." A thin 0–100 meter uses a fixed range (Apple HIG). *Why:* self-consumption % is the number that saves money in Belgium (weak export compensation).
4. **Worth in euros:** "Saved €41 this month by using your own solar."

### Breakdown
1. **Ranked horizontal bars, no donut** (Stripe/Carbon restraint): categories sorted, value right-aligned in tabular numbers, share in a lighter weight. *Why:* bars compare better than slices, and the list reads like a statement.
2. **Named baseload** (Sense "Always On"): a separate "Always on" row with €/year and one tip. *Why:* the most actionable category.
3. **Month-over-month deltas per category** (Revolut): a small ▲/▼ with a delta *only* where the change is significant. *Why:* shows what changed without noise.

### Peak (capacity tariff)
1. **One big number with context** (Oura/WHOOP score): "**3.4 kW**" is your 12-month average peak and is what you are billed on, in large light numerals with € per year beneath ("≈ €142/yr in capacity costs"). *Why:* kW means little on its own, and € makes it real.
2. **12 monthly bars + average line** (Apple HIG: bars from zero, fixed ticks): this month's bar is highlighted. A dashed line marks the 12-month average. The 2.5 kW minimum billing floor sits as a quiet reference line. *Why:* it shows the rolling mechanism visually.
3. **"What drove it" contributors** (Oura contributors): "Set on Tue 12 Mar, 18:15–18:30: oven + EV charger + heat pump." Show a mini 15-minute timeline of that day. *Why:* ENGIE already shows *when*. June wins by showing *why* and *what to shift*.
4. **Peak alert setting** (ENGIE/Luminus): a quiet toggle, "Notify me above 4 kW". Table stakes in Belgium.

### Forecast
1. **Line + uncertainty band** (Octopus Agile p10–p90): the actual line in ink, the projection dashed, the band in 10% June Green. *Why:* honest and premium, never falsely exact.
2. **Projection vs. last year / vs. advance payment** (Monzo "left to spend"): "Projected yearly bill €1,420, about €60 below your advance payments." *Why:* the real question is "will I get a settlement bill?"
3. **Cheaper-hours strip** (Apple Grid Forecast / Octopus Agile), if June has dynamic tariffs: a 24-hour bar strip where only the "good" hours are coloured. *Why:* a single colour means the reader only has to remember one meaning.

### Advice
1. **Personalised, ranked, with € impact** (Sense education + Oura "pay attention"): each tip card shows **€/year saved**, effort (low/med/high) and a "why you're seeing this" line tied to the user's own data. *Why:* relevance beats a generic tip list.
2. **Checklist progress, adult gamification** (Nest Leaf, Octopus Power Down): "Done / Not for me". Completed tips add up to a quiet "€84/yr unlocked" total. *Why:* rewards without cheap badges.
3. **Junior appears here only** (brand notes): small, in the "all done" state.

### Budgets
1. **Target line + projected dashed line** (Monzo Targets / Revolut): cumulative spend line against a straight budget line, with the projected end-of-month shown dashed. *Why:* the most familiar fintech budget view.
2. **"Left to spend" hero** (Monzo): "€38 left for September · 7 days to go". *Why:* a number you can act on, not just a record.
3. **Status colour only at the edges** (Stripe status discipline): neutral while on track. June Red appears only once the projection goes over, and there is a gentle notice at 90%.

### Cross-tab empty states
- Missing digital meter, solar not yet connected, or less than 12 months of peak history each get: a faint halftone field or mint blob, one sentence on *why* it's empty, one CTA, and a skeleton of the future chart at 20% opacity. [Uxcel / designsystems.surf guidance above]

---

## 3. "Premium minimal" traits distilled

**Typography**
- `font-variant-numeric: tabular-nums` on every number that sits in a column or animates (Stripe). Also lining figures.
- Hero numerals are large (48–72 px desktop, 40–48 px mobile), in **Regular/Light at display size only** (Stripe's "lightness as luxury"). Keep body text Regular or heavier (Apple HIG warns against light weights at small sizes). With Montserrat, use weight 300–400 for big numbers and 600 for headings, and avoid 800 in product UI.
- **Units lighter and smaller than values:** `3.4` at 64 px, `kW` at ~40% size in secondary ink. Use a narrow no-break space before units and a comma decimal for NL/FR locales (`3,4 kW`, `€ 142`).
- At most two families (Apple HIG). Montserrat for display and numerals. Open Sans, or a swap to a modern grotesk such as Inter, for UI text.
- Letter-spacing −1 to −2% on big numerals, and +4–6% uppercase on tiny overline labels.

**Colour restraint**
- About 90% neutrals (ink `#172429`, slightly mint-tinted greys, white or near-white surfaces). Tint neutrals slightly toward green (Linear's warmer-grey lesson, applied to June's hue).
- **One interactive accent:** June Green. **June Red only for over-budget, new peak and alerts** (Stripe status discipline, Opower no-shame rule).
- Energy-type colours (electricity yellow, gas blue) apply to **data series only**. Use Carbon's approach: monochrome ramps for trends, categorical colours only when categories must be told apart.
- Keep one saturated element per viewport.

**Whitespace & layout**
- 8-pt grid. Card padding 24–32 px. Section gap 48–64 px, about twice the in-card spacing. Keep data at ≤ ~60% of the viewport so it has room.
- **Few cards.** Put the hero straight on the page background. Use cards only for peer items (tiles, tips). Split lists with hairline dividers, not boxes (Linear "fewer separators", Stripe hairlines).
- One summary sentence per section sits above the chart (Apple HIG).

**Data-viz conventions**
- Bars start at zero. Ticks go 0/1/2/3 or 0/50/100. Use 2–4 horizontal grid lines at ~8% ink and no vertical grid lines. No chart borders. Axis labels 11–12 px in secondary ink. Put the unit in the title, not on every tick.
- Label the chart directly instead of adding a legend. Highlight the current period and mute the others to ~35%.
- Show projections dashed and uncertainty as a 10–15% fill band (Octopus).
- Tooltip is a small ink chip with tabular numbers and no drop-shadow soup.
- Include a text or aria summary for every chart (Apple HIG accessibility).

**Motion**
- Easing: standard `cubic-bezier(0.2, 0, 0, 1)`. Enter/decelerate `cubic-bezier(0, 0, 0, 1)` or the softer `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). No bounce in data (Material 3 tokens).
- Durations: hover/press 120–150 ms. Tooltips/toggles 180–220 ms. Chart draw-in and tab changes 400–600 ms. Number count-up ≤ 800 ms, **first view only**.
- Stagger bars 20–30 ms each, capped at 300 ms total.
- Don't animate frequent interactions (Apple HIG). Honour `prefers-reduced-motion` with a fade only (Apple "make motion optional").
- Allowed "signature" motions: the solar flow dash, peak marker settling in, and the budget line drawing in. Pick one per screen.

---

## 4. Three candidate visual directions

### A. "Calm Ledger" (Swiss utility, refined from "Calm Utility")
**Concept.** A precise, quiet dashboard that feels like a well-set bank statement. White/near-white page, a strict 12-column grid, hairline rules, and numbers doing all the work. June Green appears only as the interactive accent and as the "you" mark in charts. Brand graphics are almost absent: a single halftone dot field in empty states, with Junior only on the "all tips done" state. Trust comes from exactness.
- **Traits:** tabular Montserrat numerals at weight 300–400. Hairline dividers instead of cards. Monochrome sparklines. Status colour only at the edges. Dense but airy tables for Breakdown/Budgets. Motion limited to 150–250 ms fades and bar draw-ins.
- **Draws on:** Stripe, Linear, Apple HIG charts, Carbon.
- **Risk:** can feel corporate and "any fintech". It loses June's playful voice, and non-expert customers may find it cold. It needs strong microcopy to stay warm.

### B. "Energy Almanac" (editorial data, refined from "Editorial Data")
**Concept.** Each tab reads like a short, well-designed magazine page. A narrative headline states the insight ("Your peak fell for the third month in a row"). Below it sits one oversized numeral (96 px+), then one clean chart and a short "what drives it" list. Squiggle lines become underlines and highlight marks. Blobs sit as soft shapes behind hero numbers. Rhythm comes from generous vertical space and a single column on mobile.
- **Traits:** big Montserrat display numerals with lighter units. Open Sans (or a grotesk) body at 16–18 px. A headline-first hierarchy on every tab. Contributor lists in Oura style. Annotation callouts drawn directly on charts. One slow signature animation per page (count-up + line draw).
- **Draws on:** Apple Health Trends/Highlights, Oura contributors, WHOOP "answer first", Apple HIG "summarize the main message", Opower comparison framing.
- **Risk:** needs good auto-generated copy for every state (up, down, flat, missing data), otherwise headlines turn generic or wrong. Less efficient for power users who want the raw numbers. Keep a "details" table fallback.

### C. "Soft Native" (layered, app-like depth)
**Concept.** Feels like a premium mobile app on the web. A mint-tinted canvas holds a few large rounded surfaces (20–24 px radius) with very soft shadows. Tiles look tactile, with a 2 px lift and shadow on hover and a spring-free ease. The Solar flow diagram and Peak gauge feel like live instruments. Brand blobs and halftone become ambient depth layers *behind* surfaces, never on them. Dark mode is a first-class citizen.
- **Traits:** a WHOOP/Tibber-style hero tile per tab, animated flow lines, a segmented-control period picker (day/week/month/year) and bottom-sheet style detail panels. Colour-coded bands (Agile style) for Forecast. More motion budget (200–400 ms), all honouring reduced motion.
- **Draws on:** Tesla energy flow, Tibber, WHOOP home, Octopus Agile price bands, Apple Home Grid Forecast.
- **Risk:** the closest to "generic app dashboard". Shadows and layers easily look busy or dated on desktop, and there is more CSS/animation work to keep at 60 fps. Brand elements used as depth can slide back into decoration.

**Recommendation for the next phase (researcher's view):** use **B "Energy Almanac"** as the base, since it is the most distinctive and fits the brand's playful but trustworthy tone. Borrow A's numeric discipline (tabular figures, hairlines, status restraint) for Breakdown and Budgets, and borrow C's single live instrument (the solar flow line) for Solar only.

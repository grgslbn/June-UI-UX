# Insights — frozen content inventory

Source: `reference/original-gallery.html` (ELIQ-579 mockup gallery). Screenshots: `shots/original/original-gallery__panel-<id>__{desktop,mobile}.png`.

**Status: FROZEN.** Redesigns may restyle, re-order within a tab, and change layout. They must **not** change:
- what a number means, or its value or unit
- honesty labels ("Estimated", "average, €0.27/kWh", "Rough estimate…", "illustrative", "Take this comparison lightly…")
- any state listed here. Every edge, empty and not-enough-data state has to ship.

Copy in `"quotes"` or code spans is verbatim. `<b>` marks the emphasis in the source; keep the emphasis, restyle it however you like. "≈ derived" means the value was read off SVG or CSS geometry, not printed text. Where the mockup contradicts itself, it is flagged **⚠ inconsistency**. Printed copy wins over chart geometry.

## Tab map

| # | Tab label (as shown) | Panel id | Primary question for a homeowner |
|---|---|---|---|
| 1 | **Overview** | `panel-consumption` | "What's the one headline from each part of my energy picture, and where should I look first?" |
| 2 | Compare | `panel-compare` | "Am I using more or less than homes like mine, and am I beating my own best?" |
| 3 | Solar | `panel-solar` | "How much of my solar power do I actually use myself, and how much goes to the grid?" |
| 4 | Breakdown | `panel-breakdown` | "What is my energy actually going on (heating, hot water, always-on…)?" |
| 5 | Peak | `panel-peak` | "How high are my power peaks, and what do they do to my capacity tariff?" |
| 6 | Forecast | `panel-forecast` | "How much am I going to use this day/week/month, and how far can I trust that?" |
| 7 | Advice | `panel-advice` | "What can I do to save energy, and how much would each tip save me?" |
| 8 | Budgets | `panel-budgets` | "Am I staying within the limit I set, and how much can I use per day to stay there?" |

> The panel id `panel-consumption` holds the **Overview** tile grid, not a Consumption chart. The Consumption tab itself is described only as "already the full built tab" and is not mocked here.

Gallery chrome (not product UI): page title "Insights tabs — mockup gallery". Subtitle: "ELIQ-579. One tab per Insights topic. Click to switch — this page persists as we work through the rest." In the tab bar, Compare is active by default.

---

## 1. Overview — `panel-consumption`

**Primary question:** What's the headline for each Insights topic, and which one should I open?

### Modules (in order)

1. **Hero image**: `overview-hero-v2.jpg`, `alt=""` (decorative). ⚠ The file is not in the repo.
2. **Tile grid.** 8 tiles, each with an icon chip, name, stat, one-line insight and link. Tile order and content:

| # | Icon (chip bg) | Name | Stat | Insight | Link |
|---|---|---|---|---|---|
| 1 | 🥧 (`#e6f5f5`) | Breakdown | "Heating — 38%" | "Your biggest category this month." | "See full breakdown →" |
| 2 | 📈 (`#fff3d6`) | Peak | "4.0 kW" | "12-month rolling average — sets your capacity tariff." | "See peak details →" |
| 3 | 👛 (`#e9f9e5`) | Budgets | "On track" | "187 of 300 kWh used, 13 days left this month." | "See your budget →" |
| 4 | ☀️ (`#fdf3e0`) | Solar | "62% self-consumed" | "Net exporter today: +3.2 kWh sent to the grid." | "See solar flow →" |
| 5 | 📊 (`#e6f5f5`) | Forecast | "412 kWh" | "Projected this month — 8% more than last year." | "See forecast →" |
| 6 | 👥 (`#fde8f0`) | Compare | "+73%" | "More than similar homes this month." | "See comparison →" |
| 7 | 💡 (`#e6f5f5`) | Advice | "3 new tips" | "Save up to 540 kWh/year with the top one." | "See all advice →" |
| 8 | ⚡ (`#f2f2f2`), tile at 50% opacity | Consumption | "—" | "Already the full built tab — may not need a tile here at all." | "See consumption →" |

- Tile 8 is a **tentative placeholder**. Its insight line is designer commentary, not product copy (see the open question in meta notes). Builders should render it as optional or disabled, or omit it. Do not treat its text as final.
- Every tile stat has to match its tab: Breakdown 38% heating, Peak 4.0 kW, Budgets 187/300 kWh with 13 days left, Solar 62% and +3.2 kWh, Forecast 412 kWh and +8%, Compare +73%, Advice top tip 540 kWh/yr.
- ⚠ "3 new tips" vs. the Advice tab's "New (4)": the Advice tab has 3 real tips plus 1 illustrative upgrade item. Keep "3 new tips".

### Edge / empty states
None designed for Overview. Tile-level fallback states are not specified. A builder can reuse each tab's own empty-state copy in short form, but must not invent new copy.

---

## 2. Compare — `panel-compare`

**Primary question:** How does my usage compare with similar homes, and am I improving against my own best?

Layout in the source: a wide column with two stacked trend charts, and a narrow column with the bar comparison and the personal-best widget.

### Modules

#### 2.1 Trend chart — Consumption view
- **Toolbar**
  - View toggle: `Consumption` (active) | `Ranking`
  - Fuel toggle: `⚡ Elec` (active) | `🔥 Gas`
- **Chart:** 2 lines over 6 months. Axis: `Mar Apr May Jun Jul Aug`.

| Series | Style | Mar | Apr | May | Jun | Jul | Aug |
|---|---|---|---|---|---|---|---|
| Your home | solid, yellow `#f4b942` | ≈409 | ≈372 | ≈513 | **569** | ≈520 | ≈440 |
| Similar homes average | dashed, teal `#3bada9` | ≈237 | ≈218 | ≈237 | **255** | ≈261 | ≈255 |

(Values ≈ derived from SVG y-coords, calibrated on the printed 569/255/408/218–262. SVG y: you 34,40,17,8,16,29; similar 62,65,62,59,58,59.)

- **Legend**
  - "Your home", with badge "Real UAT data"
  - "Similar homes average", with badge "Real UAT data"
  - (The badges are data-provenance labels for the mockup. See meta notes.)
- **Note (product copy with a meta tail):**
  - "You used 408→569 kWh over these months while similar homes stayed flat at 218-262 kWh — the gap widens most in June (569 vs 255, more than double)."
  - Meta tail, not product copy: "Both lines are real numbers from a live UAT probe, not invented for the mockup."

#### 2.2 Trend chart — Ranking view
- **Toolbar**
  - View toggle: `Consumption` | `Ranking` (active, badge "All 6 real")
  - Fuel toggle: `⚡ Elec` (active) | `🔥 Gas`
- **Chart:** 1 line with markers, pink `#e05a9c`.
  - Band labels: top band (light red) "Highest users", bottom band (light green) "Most efficient".
  - Axis: `Mar Apr May Jun Jul Aug`.
  - Printed value row (percentile):

| Mar | Apr | May | Jun | Jul | Aug |
|---|---|---|---|---|---|
| 95.5 | 100 | 100 | 100 | 100 | 99.8 |

- **Note:**
  - Product copy: "Apr–Jul: you used **more than every home** in your comparison group — above even the highest (10th decile)."
  - Meta tail, not product copy: "Every point here is a real /similarhomes/report call for that month, not an estimate."
- Semantics: a higher percentile means **more** usage, which is worse.

#### 2.3 Bar comparison card
- Title: "Compared to similar homes"
- Headline: "You've used **73% more energy** than similar homes this month — the most efficient 10% use about 179 kWh."
- Bars, in order:

| Bar | Colour | Value | Label | Height |
|---|---|---|---|---|
| Efficient | teal `#3bada9` | "179 kWh" | "Most efficient homes" | 41% |
| You | yellow `#f4b942` | "442 kWh" | "Your home" | 100% |
| Similar | pink `#e05a9c` | "255 kWh" | "Similar homes" | 58% |

- Profile block:
  - Label: "Compared using"
  - Value: "Detached house, 1–2 bedrooms, 1–2 persons, no electric cars"
  - Link: "Update home profile →"

#### 2.4 Personal best card (gamification)
- Icon 🏆. Title "Beat your personal best". Subtitle "Compared to your own last 6 months".
- Best block: label "Your most efficient month tracked", value "March — 95.5th percentile".
- Trend line: "↗ Currently 99.8th percentile — a bit above where you've been"
- Goal meter:
  - Label: "This month vs. your best"
  - Track: fill 78% (teal→yellow gradient), marker at 82%
  - Note: "Get under the **95.5th percentile** mark to set a new personal best."

### Edge / empty states (all must ship)

| State | Copy (verbatim) | Reason code |
|---|---|---|
| Missing house type (hard block) | Title "Compared to similar homes". Body "No house type set yet — this is the one field we genuinely can't compare without." Icon 🏠. Button "Set house type". | `sh_home_profile_insufficent` (API spelling). Fires **only** when `house_type` is missing. |
| Partial profile (soft nudge, not an error) | Title "Compared to similar homes". Body "You've used **9% more energy** than similar homes." Mini bars: Efficient / You / Similar (heights 44/80/73 px, no values printed). Nudge 💡 "Comparing on house type only — add living area and household size for a tighter match." | None. This is a normal 200 response. |
| No matching group | Icon 🏘️. Title "No matching group found". Body "Your home's profile is unique enough that we can't find a comparable group right now. This isn't something completing your profile further usually fixes." | `sh_no_matching_group` |
| Not enough contributors | Icon 📊. Title "Still gathering the group". Body "Not enough similar homes have reported data for this period yet. Check back in a few days." | `sh_not_enough_contributers` (API spelling) |
| € unavailable (toggle-scoped) | Icon €. Title "€ view unavailable". Body "Cost comparison needs a price formula for your contract — the kWh view above still works fine." | `sh_no_price_information`. Only affects the € toggle. |
| Good-news framing (positive variant of 2.3) | Title "Compared to similar homes". Headline, green: "Nice — you've used **16% less energy** than similar homes this month." Bars: Most efficient homes "180 kWh" (54%), Your home "250 kWh" (76%), Similar homes "298 kWh" (100%). Profile label "Compared using". | None (success variant) |

- The partial-profile nudge names "living area". Per the meta note, Belgian groups filter on **bedrooms**, not living area. The copy is kept verbatim here; raise it with the owner before changing.
- The Compare cards have a € state, but no kWh/€ toggle is drawn on the main cards. The state implies the toggle exists (see shared components).

---

## 3. Solar — `panel-solar`

**Primary question:** How much of my solar production do I use myself vs. export, and how self-sufficient am I?

The tab is gated by `requiredCapability: "solar"`. Non-solar users never see it, so there is no teaser state. Layout in the source: a wide column with two time-series cards, and a 1/3 side column with the flow diagram, KPIs and formula.

### Modules

#### 3.1 Daily net-flow chart card
- **Toolbar**
  - Period toggle: `Day` (active) | `Week` | `Month` | `Year`
  - Date navigator: "‹ 18 May ›"
- **Filter chips** (both on): "Import" (yellow dot `#f4b942`), "Export" (teal dot `#3bada9`)
- **Balance stat:** 🔆 "Net exporter today: **+3.2 kWh** sent to the grid"
- **Chart:** zero line at 50%, plus a net line (teal) and faint import/export bars.
  - X axis slots: `00 · 06 · 10 12 14 · 18 · 21 23` (12 slots, some blank).
  - Bars (8 columns, height %): imp 8, imp 5, exp 20, exp 55, exp 60, exp 30, imp 12, imp 18.
  - Net line (9 points, SVG y out of 100, zero = 50): 58, 62, 30, 10, 8, 25, 55, 64, 60. It is above zero (exporting) midday.
  - ⚠ inconsistency: the CSS draws import bars *above* the zero line and export bars *below* it, which is the opposite of the net-line convention. Builders should draw export on the positive side and import on the negative side, as the legend below defines.
- **Legend:** "Net (Production − Consumption) — above zero = exporting surplus, below = importing a deficit"
- **Disclosure:** "▾ Show raw production & consumption". It is collapsible and shown expanded in the mockup.
  - Raw chart, SVG y: Production (yellow, solid) 90, 70, 30, 10, 8, 28, 68, 88, 92. Consumption (grey, dashed) 65, 63, 58, 54, 53, 56, 60, 64, 66.
  - Legend: "Production" + badge **"Estimated"**; "Consumption" + badge **"Estimated"**.

#### 3.2 Seasonal production card
- Title: "Seasonal production — last 12 months"
- Insight: "Production peaks in July at 620 kWh — over 9× December's 68 kWh, your quietest month."
- Stacked monthly bars (bottom segment = Self-consumed, top = Exported, height %). Axis: `Jun Jul Aug Sep Oct Nov Dec Jan Feb Mar Apr May`.

| | Jun | Jul | Aug | Sep | Oct | Nov | Dec | Jan | Feb | Mar | Apr | May |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Self-consumed | 65 | 60 | 50 | 38 | 28 | 20 | 18 | 20 | 26 | 36 | 55 | 68 |
| Exported | 35 | 40 | 38 | 44 | 60 | 75 | 82 | 78 | 62 | 46 | 33 | 22 |

- ⚠ inconsistency: the bar heights are placeholder shapes. Totals are about equal every month, and export peaks in Dec. That contradicts the printed copy (Jul 620 kWh vs. Dec 68 kWh). **The copy is authoritative.** Builders should draw a series in which July is the tallest (620) and December the shortest (68), and should not invent other month values beyond that without data.
- Legend: "Self-consumed" (teal), "Exported" (yellow).

#### 3.3 Flow diagram (snapshot, "at a glance"). First in the side column.
- Top node: ☀️ "Production" "8.4 kWh"
- Arrows from the sun:
  - left, teal, pill "3.2" (export → Grid)
  - right, yellow, pill "5.2" (self-consumed → Home)
- Nodes:
  - ⚡ "Grid" "4.4 kWh"
  - mid arrow Grid→Home "4.4"
  - 🏠 "Home" "9.6 kWh"
- Summary rows:
  - "↓ Import" "4.4 kWh"
  - "↑ Export" "3.2 kWh"
  - "🔄 Self-consumed" "5.2 kWh"
- Checks: 8.4 = 3.2 + 5.2, and Home 9.6 = 5.2 + 4.4.

#### 3.4 KPI: Self-consumption
- Label: "Self-consumption", info button "i", badge **"Estimated"**
- Value: "62%"
- Body: "Of the power your panels made today, 62% was used in the home — the rest went to the grid."
- Info popover: `(Production − Export) / Production`, "Today: (8.4 − 3.2) / 8.4 = `62%`"

#### 3.5 KPI: Self-sufficiency
- Label: "Self-sufficiency", info button "i", badge **"Estimated"**
- Value: "54%"
- Body: "54% of today's usage came from your own panels — the rest was drawn from the grid."
- Info popover: `(Consumption − Import) / Consumption`, "Today: (6.9 − 3.2) / 6.9 = `54%`"
- ⚠ inconsistency: the worked example plugs in 6.9 and 3.2, which don't match the flow diagram (Home 9.6, Import 4.4). (9.6 − 4.4) / 9.6 = 54% gives the same result. Keep **54%** and the formula. The owner decides whether to correct the example to `(9.6 − 4.4) / 9.6`.

#### 3.6 Formula card
- "Consumption = Import + **Production** − Export"
- Caption: "How the four streams relate — Import/Export are metered, Production/Consumption are Eliq's estimate."

### Edge / empty states

| State | Copy (verbatim) | Reason / source |
|---|---|---|
| Still calibrating (whole-tab) | Icon ☀️. Title "Still calibrating your solar setup". Body "We need at least 7 days of import/export data to estimate your panels' production — after that, we can start showing your full solar picture. Import and Export themselves are already tracking fine; it's just Production and Consumption still calibrating." Progress: 7 segments, 4 filled. Label "4 of 7 days". | Get Location per-stream `sync_status` (`ok` vs `waiting_for_data`), plus the PV disaggregation 7-day minimum. No error code. |
| Non-solar user | The tab is hidden entirely. | `requiredCapability: "solar"` |

---

## 4. Breakdown — `panel-breakdown`

**Primary question:** Which categories (heating, hot water, always-on…) make up my energy use?

There is no time toggle. The € values come from an average-price fallback.

### Modules

#### 4.1 At a glance
- Title "At a glance"
- Donut center: "**38%** Heating"
- Foot: "Biggest category this month →"

#### 4.2 Home profile CTA (completion nudge)
- Title "🏠 Home profile"
- Percent: "70% complete". Progress bar at 70%.
- Body: "A few more details (heating type, home size) sharpen your category breakdown."
- Button: "Complete profile →"

#### 4.3 Category list
- Header "This month", unit toggle `kWh` (active) | `€`
- Honesty note, always shown: "€ values use an average Belgian price estimate — not your actual tariff."
- Rows, in order:

| Icon | Category | Badge | Value | Bar width |
|---|---|---|---|---|
| 🔥 | Heating | — | "312 kWh · 38%" | 38% |
| 🚿 | Water heating | **"Estimated"** | "164 kWh · 20%" | 20% |
| 🔌 | Always on | — | "115 kWh · 14%" | 14% |
| 🍳 | Cooking | — | "98 kWh · 12%" | 12% |
| 🧊 | Fridge & freezer | — | "74 kWh · 9%" | 9% |
| ••• | Other | — | "57 kWh · 7%" | 7% |

Total 820 kWh, 100%. The € values for the € toggle state are not specified in the mockup.

#### 4.4 Seasonal trend card
- Title "Seasonal trend — last 12 months"
- Insight: "Heating went from 9% of your usage in July to 54% in January — your biggest seasonal swing." Caveat, inline and smaller: "Patterns vary by home."
- 100%-stacked monthly bars (share %). Axis `Jan … Dec`:

| Series | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Heating `#3bada9` | 54 | 48 | 38 | 24 | 14 | 9 | 9 | 11 | 20 | 33 | 45 | 52 |
| Water heating `#5cc0bc` | 10 | 10 | 11 | 12 | 12 | 12 | 12 | 12 | 11 | 11 | 10 | 10 |
| Always on `#7fd1cd` | 8 | 8 | 9 | 9 | 10 | 12 | 13 | 12 | 10 | 9 | 8 | 8 |
| Cooking `#a6e0dd` | 9 | 9 | 10 | 11 | 12 | 13 | 13 | 12 | 11 | 10 | 9 | 9 |
| Fridge, freezer & other `#e6f5f5` | 19 | 25 | 32 | 44 | 52 | 54 | 53 | 53 | 48 | 37 | 28 | 21 |

- Legend: "Heating", "Water heating", "Always on", "Cooking", "Fridge, freezer & other". The chart merges Fridge & freezer with Other.
- ⚠ The list shows Heating at 38% "this month", and the seasonal chart's 38% is March. Other tabs imply the current month is May, where the seasonal chart shows 14%. Keep both as printed and flag to the owner.

### Edge / empty states

| State | Copy (verbatim) | Reason / source |
|---|---|---|
| Required profile field missing (hard block) | Icon 🏠. Title "Hard block: required profile field missing". ⚠ This reads as a designer label, so a builder may need product-facing title copy; flag it, don't invent one. Body "We need a couple of basics — home type and heating source — before we can break your energy down into categories." Progress 30%, "30% complete". Button "Complete profile". | Required-field config. Field names are placeholders (ask #36). |
| Data not ready yet | Icon 📊. Title "Data not ready yet". Body "We need about 3 more weeks of daily readings before we can reliably split your usage into categories. Check back soon." Sub "Nothing to complete here — just needs time." | Insufficient daily history. No code named. |

---

## 5. Peak — `panel-peak`

**Primary question:** What are my power peaks, and what 12-month average sets my capacity tariff?

### Modules

#### 5.1 Peak chart card
- **Toolbar**
  - Period toggle: `Day` | `Week` | `Month` (active) | `Year`
  - Date navigator: "‹ May 2026 ›"
- **Threshold lines (labelled):**
  - "Month peak 4.2 kW" (dashed, red `#FF5630`)
  - "12-month avg 4.0 kW" (dashed, cyan `#00B8D9`)
- **Bars:** daily peak, 15 bars in the mockup, heights %: 55, 40, 60, **92 (peak, red)**, 50, 35, 65, 45, 58, 38, 52, 44, 30, 48, 36. Axis labels: `1 5 10 15 20 25 30`.
  - ⚠ The bar count (15) doesn't match the days in the month, and the threshold positions (22% / 48% from the top) aren't on the bars' scale. Builders should plot to scale, with the peak bar = 4.2 kW on 18 May.
- **Legend:**
  - "Daily peak (kW)" (teal)
  - "This month's peak" (red)
  - "12-month average" (cyan line)

#### 5.2 Stat row (3 cards)

| Label | Value | Meta |
|---|---|---|
| Latest peak | 3.8 kW | Today, 14:30–14:45 |
| Month peak | 4.2 kW | 18 May, 18:30 |
| 12-month rolling average | 4.0 kW | This sets your capacity tariff |

#### 5.3 Rolling-average explainer card
- Title "Your rolling average, explained"
- Countdown row: icon ⏳, title "Your biggest peak is still counting", sub "5.8 kW in June 2025 — the highest of your last 12 months"
- Progress bar at 92%
- Foot: "Counts toward your average for **1 more month**, then it rolls off and your average may drop."
- Disclosure "▾ See the full calculation", which opens this table:

| Month | Peak | When | Tags |
|---|---|---|---|
| Jun 2025 | 5.8 kW | 12 Jun, 19:00 | "rolls off next", "highest" (row highlighted) |
| Jul 2025 | 3.2 kW | 28 Jul, 20:15 | |
| Aug 2025 | 3.8 kW | 14 Aug, 18:30 | |
| Sep 2025 | 4.0 kW | 3 Sep, 19:45 | |
| Oct 2025 | 3.5 kW | 21 Oct, 07:15 | |
| Nov 2025 | 4.4 kW | 9 Nov, 18:00 | |
| Dec 2025 | 3.3 kW | 24 Dec, 20:30 | |
| Jan 2026 | 2.9 kW | 15 Jan, 07:00 | |
| Feb 2026 | 4.0 kW | 2 Feb, 19:15 | |
| Mar 2026 | 4.9 kW | 18 Mar, 18:45 | |
| Apr 2026 | 4.2 kW | 7 Apr, 19:00 | |
| May 2026 | 4.2 kW | 18 May, 18:30 | "just added" |
| **Average of 12 months** | **4.0 kW** | | footer row |

(The sum is 48.2, and 48.2 / 12 = 4.02, which checks out.)

#### 5.4 Benchmark card
- Icon 📉. "Your rolling average is **4.0 kW** — the Flemish average is **4.24 kW**. You're just under average!"

#### 5.5 Capacity-charge estimate card
- Title "Estimated capacity charge", badge **"New idea"**
- Sub "Translating the kW number into a rough € figure"
- Value "≈ €7.40 / month"
- Honesty note: "Rough estimate, fixed regional €/kW rate — not your grid operator's exact rate. Eliq's price formulas can't compute this component."

### Edge / empty states

**Insufficient history (< 12 months).** The chart, Latest peak and Month peak work as usual. Only the rolling-average modules change:

- Stat row:

| Label | Value | Meta |
|---|---|---|
| Latest peak | 3.1 kW | Today, 08:15–08:30 |
| Month peak | 3.4 kW | 6 Sep, 19:00 |
| **Average so far** | 3.0 kW | Based on 3 months, not 12 yet |

- Build-up card:
  - Icon 📈. Title "Still building your 12-month average". Sub "3 of 12 months collected so far".
  - 12 segments, 3 filled. Labels `Jul Aug Sep Oct Nov Dec Jan Feb Mar Apr May Jun`.
  - Foot: "Nothing "rolls off" yet — every month you have still counts. The full picture (and your real capacity-tariff number) needs a complete 12 months."
  - Floor note: "Belgium sets a 2.5 kW regulatory floor — if your average lands below that, 2.5 kW is what actually gets billed, not your raw number."
- Benchmark (caveated): "Your average so far is **3.0 kW** — the Flemish average is **4.24 kW**." Caveat: "Take this comparison lightly — it's based on 3 months, not your full year."
- **In this state, remove** the calculation table and the capacity-charge card. Both assume a settled 12-month figure.
- Reason: history < 12 months (peakpower endpoint). No named code.

---

## 6. Forecast — `panel-forecast`

**Primary question:** How much energy will I use today, this week and this month, and how reliable is that prediction?

### Modules

#### 6.1 At-a-glance row (4 cells, each gated on its own data threshold)

| Cell | State | Value | Split line |
|---|---|---|---|
| Today | ready | 14.2 kWh | "9.1 so far + 5.1 forecast" |
| This week | ready | 92 kWh | "58 so far + 34 forecast" |
| This month | ready | 412 kWh | "240 so far + 172 forecast" |
| This year | **not ready** | 📊 "This year — needs a bit more history yet" | — |

#### 6.2 Month/Year forecast chart card
- **Toolbar**
  - Toggle: `Month` (active) | `Year`
  - Label: "Forecasting the next 6 months"
- **Headline:** 📅 "You're projected to use **412 kWh** this month — **8% more** than the same month last year."
- **Chart:** 2 lines. Axis `Dec Jan Feb Mar Apr May Jun`. SVG y out of 100, lower = higher usage:

| Series | Style | Dec | Jan | Feb | Mar | Apr | May | Jun |
|---|---|---|---|---|---|---|---|---|
| Forecast | solid teal | 55 | 42 | 28 | 12 | 8 | 20 | 38 |
| Same months last year | dashed grey | 60 | 50 | 35 | 20 | 15 | 25 | 45 |

- **Legend:** "Forecast", "Same months last year"
- **€ note:**
  - Product part: "€ view unavailable — no price formula set up for this contract yet."
  - Meta rule, binding for builders: "Verified live: Eliq doesn't error here like its docs claim, it silently returns €0 — the app must detect and hide that, never show a literal "€0 projected" as if it were real."

#### 6.3 Near-term hourly forecast card
- **Toolbar**
  - Toggle: `Next 24h` (active) | `Next 48h`
  - Label: "Now: 18 May, 14:30"
- **Chart:** a best-estimate line plus a shaded 95% band, with a dashed "now" line at x = 0.
  - Axis: `Now 16h 18h 20h 22h 00h 02h 04h 06h 08h 10h 12h 14h`.
  - 16 points, SVG y out of 100:

| pt | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Best estimate | 55 | 52 | 38 | 22 | 30 | 48 | 62 | 68 | 65 | 50 | 25 | 40 | 58 | 60 | 56 | 50 |
| Band upper | 49 | 46 | 24 | 4 | 14 | 38 | 57 | 64 | 60 | 38 | 5 | 26 | 52 | 55 | 49 | 41 |
| Band lower | 61 | 58 | 52 | 40 | 46 | 58 | 67 | 72 | 70 | 62 | 45 | 54 | 64 | 65 | 63 | 59 |

(The band is widest around the evening and morning routines and narrowest overnight and midday. That shape is the point of the chart; keep it.)
- **Legend:** "Best estimate", "Likely range (95% confidence)"
- **Explainer:** "Eliq is 95% confident your actual usage each hour will fall inside the shaded band. The band is wider around your usual morning and evening routine — those hours vary more day to day — and narrower overnight and midday, when your usage is more consistent."
- Rule (from meta): confidence bands exist **only** for the hourly forecast. Never draw a band on the Month/Year chart.

#### 6.4 Budget link card (links to the Budgets tab)
- Status pill (green): "On track for budget"
- Body: "Your forecast projects **412 kWh** this month — under your **450 kWh** electricity budget."
- Link "View budget →"
- ⚠ The Budgets tab shows a 300 kWh limit and a 265 kWh forecast. The numbers here (412 vs. 450) don't match it. Keep them as printed and flag to the owner.

#### 6.5 Forecast accuracy card
- Icon 🎯. Title "How good was last month's forecast?" Sub "Replaying what we predicted on 1 May".
- Figures: "Forecasted" "380 kWh" → "Actual" "402 kWh"
- Diff: "That's **6% higher** than predicted — pretty close."
- Disclosure "▾ See the last 6 months", which opens this table:

| Month | Forecast | Actual | Off by |
|---|---|---|---|
| May | 380 kWh | 402 kWh | +6% |
| Apr | 410 kWh | 395 kWh | -4% |
| Mar | 455 kWh | 448 kWh | -2% |
| Feb | 470 kWh | 512 kWh | +9% |
| Jan | 520 kWh | 505 kWh | -3% |
| Dec | 498 kWh | 470 kWh | -6% |

### Edge / empty states

| State | Copy (verbatim) | Reason / source |
|---|---|---|
| Per-cell not ready (glance row) | "This year — needs a bit more history yet" (icon 📊). Any cell can take this form on its own. | Guide data-readiness thresholds per horizon. No code. |
| Budget link — over | Pill (amber) "Forecast to exceed budget". Body "Your forecast projects **412 kWh** this month — over your **380 kWh** electricity budget by about 8%." Link "View budget →" | Budget exists, forecast > limit |
| Budget link — no budget | Icon 🎯. Title "No budget set up yet". Body "Set a monthly budget and we'll tell you here whether this forecast keeps you under it." Link "Set up a budget →" | No Budget configured |
| € unavailable | "€ view unavailable — no price formula set up for this contract yet." Hide € values. Never show "€0". | `unit=cost` silently returns zeros (no error code) |
| Whole tab: not enough data (< 7 days) | Block: icon 📈, title "Building toward your first forecast", body "Forecasting needs at least 7 days of energy data before it can predict anything — daily and short-term forecasts unlock first, monthly forecasts need a full month." Progress 7 segments, 3 filled, label "3 of 7 days toward your first forecast". Then a glance row with all 4 cells greyed, icon 📊: "Today / not ready", "This week / not ready", "This month / not ready", "This year / not ready". | No API code. Uses the guide's documented thresholds (7 days, and a full month for monthly). |

---

## 7. Advice — `panel-advice`

**Primary question:** What can I do to save energy, and what would each action save me per year?

### Modules

#### 7.1 Status tabs
- `New (4)` (active) · `To do (0)` · `Done (0)`, plus a separate link "Discarded (0)"

#### 7.2 Advice item list (New). Each item has: icon, title, content, category (EUC) tag, savings row and actions.

| # | Icon | Title | Content | Tag | Savings | € line | Actions |
|---|---|---|---|---|---|---|---|
| 1 | 💡 tip | Adjust your indoor temperature | "Lowering your indoor temperature slightly can meaningfully cut heating energy use without a noticeable comfort difference." | 🔥 Heating | "Save **540 kWh**/year" | "≈ **€150**/year (average, €0.27/kWh)" | Save / Already / Not relevant |
| 2 | 💡 tip | Carpets help insulate your floor | "Carpets aren't just comfortable underfoot — they also help insulate the floor, reducing heat loss." | 🔥 Heating | "Save **650 kWh**/year" | "≈ **€180**/year (average, €0.27/kWh)" | Save / Already / Not relevant |
| 3 | 💡 tip | Wash clothes at a lower temperature | "Most laundry gets just as clean at a lower wash temperature, using noticeably less energy per load." | 🧺 Washing | "Save **240 kWh**/year" | "≈ **€65**/year (average, €0.27/kWh)" | Save / Already / Not relevant |
| 4 | 🏠 upgrade (dashed card) | Upgrade to a heat pump | "Replacing gas heating with a heat pump can substantially cut your heating energy use over time." | 🔥 Heating | "Save **~4,200 kWh**/year" | "≈ **€1,134**/year (illustrative)" | Save / Not relevant (no "Already") |

- The upgrade item has an extra row: "Investment: **€8,000–12,000**", "Pays off in: **~9–11 years**", badge "💳 Financing available".
- The upgrade item's title badge reads "Upgrade example — once financing is configured". It is a mockup label, but the item is **illustrative**. The "(illustrative)" honesty label must stay if the item ships.
- Action button labels, verbatim: "+ Save for later", "✓ Already do this", "✕ Not relevant".
- Debug lines under each item are meta, not product UI:
  - "adjust_the_indoor_temperature · relevance 0.32"
  - "carpets_do_insulate · relevance 0.19"
  - "temperature_washing_machine · relevance 0.21"
  - "Included proactively — schema supports investment_cost/financing_options, not yet configured for our tenant (ask #39/#20)"
- Order is by relevance as observed (item 1 = 0.32 is the "top one" referenced on Overview). Don't inflate scores.
- EUC tag icons must match Breakdown's category icons.

### Status views and edge / empty states

**To do** (section "To do (1)"):
- Item 🧺 "Wash clothes at a lower temperature", tag "🧺 Washing"
- Savings "Save **240 kWh** / ≈**€65**/yr". Meta "Saved 3 days ago".
- Actions "✓ Mark as done", "Move back to New"

**Done** (section "Done (1) — implemented only"; the "— implemented only" suffix is a designer annotation):
- Item ✓ "Replace old lamps with LED lighting", badge "Completed", tag "💡 Lighting"
- Savings "Saved **730 kWh** / ≈**€200**/yr". Meta "Marked done 2 weeks ago — was on your To-do list first".

**Discarded** (section "Discarded (3) — skipped, not_relevant, already_implemented, all three"; the suffix is a designer annotation):

| Title | Status badge | Tag | API status |
|---|---|---|---|
| Optimize outdoor lighting | "Already doing this" | 💡 Lighting | `already_implemented` |
| Draught-proof your windows | "Not relevant" | 🔥 Heating | `not_relevant` |
| Use a smart power strip | "Skipped" | 🔌 Always on | `skipped` |

Rule: `already_implemented` belongs under **Discarded**, never Done. Done shows only items that were really implemented. Status is changed with `PATCH /advice/{id}`, using a JSON-Patch body.

**Empty state (the only one):**
- Icon 💡. Title "Nothing to suggest yet".
- Body "We don't have any personalized energy-saving tips for your home right now. This is normal early on, and usually resolves itself as more of your energy data comes in."
- Nudge 💡 "A fuller home profile also helps us find more relevant advice for you — worth checking it's up to date."
- Reason: `GET /advice` returns no items, or 404 "No advices found". There is no reason code; do **not** invent differentiated states (ask #40).

---

## 8. Budgets — `panel-budgets`

**Primary question:** Am I within my energy budget this period, and what daily pace keeps me under it?

### Modules

#### 8.1 Budget progress card
- Fuel/period tabs: `⚡ Electricity · Monthly` (active) | `🔥 Gas · Weekly`
- Status pill (green): "On track"
- **Chart:** 31 cumulative columns. Days 1–18 are "used" (teal), days 19–31 are "forecast" (grey `#d8d8d8`). A dashed red limit line is labelled "Limit 300 kWh".
  - Heights %:
    - used 11, 14, 18, 22, 25, 30, 33, 35, 39, 42, 44, 47, 49, 52, 55, 57, 60, 62
    - forecast 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88
  - Axis labels: `1 · 5 · 10 · 15 · 18 · 22 · 27 · 31`.
  - ⚠ The limit line sits at 78% height, so the forecast bars cross it visually, while the status and numbers say 265 < 300 (on track). Builders must plot to scale: the used bars end at 187, the forecast ends at 265, and the limit is 300.
  - ⚠ The legend says "(daily)" but the bars are cumulative. Keep the legend copy and flag it.
- **Legend:** "Used (daily)", "Forecast (daily)", "Limit"
- **Numbers row:** "Used so far" **187 kWh** · "Forecast" **265 kWh** · "Limit" **300 kWh**
- **Period line:** "1–31 May · day 18, 13 days left"
- **Pacing tip (on track):**
  - Icon ✅, title "On track"
  - Value (green) "≤ 8.7 kWh/day"
  - Body "Keep usage under this for the remaining 13 days and you'll stay within budget."
  - Context "You're averaging 10.4 kWh/day so far — ease off slightly and you'll land under your 300 kWh limit. Assumes fairly even usage the rest of the period."
  - Checks: 187 / 18 = 10.4, and (300 − 187) / 13 = 8.7.

#### 8.2 History & streak card
- Title "History & streak"
- Streak: 🔥 "3-month streak", "Under budget since March"
- Best: "Best ever (last 24mo)" **5 months**
- Month strip, `Jan Feb Mar Apr May`:

| Jan | Feb | Mar | Apr | May |
|---|---|---|---|---|
| ✕ over (red) | gap / no data (hatched) | ✓ under | ✓ under | "So far" (current, dashed) |

- ⚠ "3-month streak… since March" is shown with only Mar and Apr ticked, plus May in progress. Keep it as printed.

#### 8.3 Setup: new budget (mode picker)
- Title "Setting up a new budget"
- Option **Auto**, badge "Recommended": "We set your limit each period from your own forecast, +20% margin. No number to guess — it adapts as your usage changes."
- Option **Manual**: "Pick your own fixed limit. Stays the same every period until you change it." Suggestion "Suggested: 265 kWh, based on your forecast"

#### 8.4 Pacing tip: all three variants
(The card title "Pacing tip — all three states" is a designer label.)

| Variant | Icon | Title | Value | Body |
|---|---|---|---|---|
| on-track | ✅ | On track | "≤ 8.7 kWh/day" | "Keep usage under this for the remaining 13 days." |
| cut-back | ⚠️ | Cut back to stay under | "≤ 6.5 kWh/day" | "Forecast to go over — drop to this for the rest of the period." |
| already-over | ✕ | Already over | "+42 kWh over" | "Nothing to pace now — a fresh budget starts in 6 days." |

### Edge / empty states (from `Budget.status.action`)

Both states use the same card chrome: tabs `⚡ Electricity · Monthly` | `🔥 Gas · Weekly`, a status pill "Setting up", and a config footer "Mode **Auto (20% margin)**" · "Period **1–31 May**".

| State | Icon | Title | Copy | Reason code |
|---|---|---|---|---|
| Awaiting first run | ⏳ | "Your budget is set" | "First calculation is on its way — check back shortly and we'll show you where you stand." | `budget_awaiting_first_run` |
| Not enough data | 📊 | "Still collecting your data" | "Your meter hasn't reported enough recent readings yet to track this budget. Nothing wrong with your setup — this should resolve once fresh data comes in." | `budget_not_enough_data` |

Rule: the copy deliberately gives no timeframe (ask #38). Don't add one.

(The Forecast tab's "No budget set up yet" card, §6, covers the no-budget case from the Forecast side. No Budgets-tab empty state is drawn besides the setup mode picker in §8.3.)

---

## Honesty labels — master list (must survive every redesign)

| Label / copy | Where |
|---|---|
| "Estimated" badge | Solar: Production and Consumption legends, Self-consumption and Self-sufficiency KPIs. Breakdown: Water heating. |
| "Import/Export are metered, Production/Consumption are Eliq's estimate." | Solar formula card |
| "€ values use an average Belgian price estimate — not your actual tariff." | Breakdown list |
| "(average, €0.27/kWh)" | Advice € savings |
| "(illustrative)" | Advice upgrade item € |
| "Rough estimate, fixed regional €/kW rate — not your grid operator's exact rate. Eliq's price formulas can't compute this component." | Peak capacity charge |
| "New idea" badge | Peak capacity charge (designer badge; its meaning is "experimental") |
| "Take this comparison lightly — it's based on 3 months, not your full year." | Peak insufficient history |
| "Based on 3 months, not 12 yet" | Peak insufficient history |
| "Patterns vary by home." | Breakdown seasonal |
| "Assumes fairly even usage the rest of the period." | Budgets pacing |
| "Likely range (95% confidence)" and the band explainer | Forecast hourly |
| "just added", "rolls off next", "highest" tags | Peak calc table |
| Never show "€0 projected" | Forecast € handling |
| "Real UAT data", "All 6 real" | Compare. These are mockup provenance labels (see meta), not product honesty labels. |

## Reason-code index

| Code / trigger | Tab | State |
|---|---|---|
| `sh_home_profile_insufficent` | Compare | Set house type (hard block) |
| (none, partial profile) | Compare | Soft nudge |
| `sh_no_matching_group` | Compare | No matching group found |
| `sh_not_enough_contributers` | Compare | Still gathering the group |
| `sh_no_price_information` | Compare | € view unavailable |
| `sync_status: waiting_for_data` (Production/Consumption), under 7 days | Solar | Still calibrating |
| `requiredCapability: "solar"` | Solar | Tab hidden |
| Required profile fields (ask #36) | Breakdown | Hard block |
| Insufficient daily history (~3 weeks) | Breakdown | Data not ready yet |
| History < 12 months | Peak | Average so far / build-up |
| Under 7 days of data (guide threshold) | Forecast | Building toward your first forecast |
| Per-horizon threshold | Forecast | Cell "not ready" |
| `unit=cost` returns 0 | Forecast | € view unavailable |
| No budget / budget exceeded | Forecast | Budget-link variants |
| Empty list or 404 "No advices found" | Advice | Nothing to suggest yet |
| `budget_awaiting_first_run` | Budgets | Your budget is set |
| `budget_not_enough_data` | Budgets | Still collecting your data |

## Cross-tab inconsistencies to raise with the owner (do not silently "fix")
1. Forecast budget link: 412 vs. 450 kWh budget. The Budgets tab says limit 300 and forecast 265.
2. Solar self-sufficiency worked example uses 6.9 / 3.2. The flow diagram's numbers are 9.6 / 4.4, which give the same 54%.
3. Solar seasonal bar heights contradict "July 620 kWh vs. December 68 kWh".
4. Solar day chart bar direction is the opposite of the net-line sign convention.
5. Breakdown "this month" heating 38% matches March in the seasonal chart, not May.
6. Budgets chart: the forecast bars cross the limit line despite "On track". The legend says "daily" but the bars are cumulative.
7. Peak chart: 15 bars on a 1–30 axis, and the threshold lines are off scale.
8. Overview "3 new tips" vs. Advice "New (4)", where the 4th item is illustrative.

---

## Cross-tab shared components

- **Segmented toggle, period:** `Day | Week | Month | Year` (Solar, Peak). Variants: `Month | Year` (Forecast chart), `Next 24h | Next 48h` (Forecast hourly).
- **Segmented toggle, view:** `Consumption | Ranking` (Compare).
- **Unit toggle:** `kWh | €` (Breakdown; implied for Compare via `sh_no_price_information`, and for Forecast via the € note).
- **Fuel toggle:** `⚡ Elec | 🔥 Gas` (Compare). Fuel+period tabs: `⚡ Electricity · Monthly | 🔥 Gas · Weekly` (Budgets).
- **Status tabs with counts:** `New (n) | To do (n) | Done (n)` plus the "Discarded (n)" link (Advice).
- **Date navigator:** "‹ 18 May ›", "‹ May 2026 ›". Also the static "Now: 18 May, 14:30" label.
- **Filter chips with colour dot:** Import / Export (Solar).
- **Stat card / KPI:** label, big value, meta line, optional info "i" and badge (Peak stats, Solar KPIs, Forecast glance cells, Budgets numbers row, Overview tiles).
- **Status pill with dot:** On track (green), Forecast to exceed budget (amber), Setting up (grey).
- **Badge / tag:** "Estimated", "New idea", "Recommended", "Completed", "Already doing this", "Not relevant", "Skipped", "just added", "rolls off next", "highest", "💳 Financing available", plus EUC category tags (🔥 Heating, 🧺 Washing, 💡 Lighting, 🔌 Always on).
- **Progress bar (continuous):** profile completeness (70%, 30%), rolling-off countdown (92%), personal-best goal meter with marker.
- **Segmented progress (discrete count):** Solar "4 of 7 days", Forecast "3 of 7 days…", Peak "3 of 12 months".
- **Empty / edge-state block:** icon, title, body, optional CTA button, optional nudge box (💡 tinted callout) and optional progress.
- **Insight / headline callout:** icon plus one sentence with a bolded key figure (Solar balance, Forecast headline, seasonal insights, Compare headline).
- **Info popover:** formula in code style plus a worked example (Solar KPIs).
- **Disclosure ("▾ …"):** raw production & consumption, full calculation, last 6 months.
- **Data table:** month / value / when or forecast / actual / off by, with a footer total row and inline tags.
- **Legend row:** swatch or line sample (solid, dashed, band), plus label and optional badge.
- **Charts:** line and dual-line with dashed comparison; line with confidence band; bar with threshold lines; stacked 100% bars (monthly); diverging bars around zero plus a net line; cumulative bars with a limit line; 3-bar comparison; donut; horizontal category bars; percentile line with high/low bands; month-chip strip (✓ / ✕ / gap / current).
- **CTA link / button:** "… →" text links (Overview, Compare profile, Forecast budget link), primary dark button ("Complete profile →"), and pill action buttons (Advice: save, already, discard, mark done).
- **Flow diagram:** sun → grid/home nodes with value pills (Solar only; could be a reusable "energy flow" block).

---

<details>
<summary><b>Designer / meta notes: NOT product UI (do not render)</b></summary>

These lines are process annotations in the gallery. Builders must not show them in the product. They may shape behaviour, and the binding rules are already copied into the tab sections above.

- **Gallery chrome:** title "Insights tabs — mockup gallery"; subtitle "ELIQ-579…"; `.edge-label` section headings ("Also designed — …", "Edge cases — also approved", "Edge case — also approved: insufficient history").
- **Overview:** the open questions: should Consumption get a tile (8 tiles) or not (7)? Does Overview replace the default landing topic or sit alongside Consumption? The Consumption tile's insight text is itself a designer comment.
- **Compare:**
  - ✅ Approved: Consumption and Ranking trend charts on real UAT data; bar comparison with the real 73% figure; fuel toggle (gas parameter confirmed but not live-tested); personal-best widget chosen over a streak.
  - Layout: charts wide, comparison and personal best narrow.
  - Correction note: `sh_home_profile_insufficent` fires only when `house_type` is missing; Belgian groups filter on bedrooms, not living area (june-integration-notes.md §2).
  - Provenance badges "Real UAT data" and "All 6 real". The note tails "Both lines are real numbers from a live UAT probe…" and "Every point here is a real /similarhomes/report call…".
  - `es-sub` code captions, including "Not an error code — a normal response, just loose" and "Illustrative — good-news framing".
- **Solar:**
  - ✅ Approved: net-line chart, Import/Export chips and net-balance stat (from POC Module 7), collapsible raw detail, KPIs with worked-example popups (Eliq x-core-sufficiency-card-v1 pattern), seasonal stacked chart, flow diagram first in the side column.
  - Note: `requiredCapability: "solar"`, so no teaser is needed.
  - Calibrating-state provenance: `sync_status`, the 7-day minimum, and the later sweep that caught this state.
- **Breakdown:**
  - ✅ Approved: glance, list and seasonal views; profile nudge; no time toggle; € via average price.
  - ⚠ Required-field names are placeholders (ask #36, pending Hani).
  - The block title "Hard block: required profile field missing" is phrased as a designer label.
- **Peak:**
  - ✅ Approved: chart, stats, explainer with calc table, benchmark, capacity-charge idea. Combines /peak-insights concepts with Eliq peakpower.
  - Intro line: "Chart, Latest peak, and Month peak stay the same as above — only the rolling-average pieces change shape:"
  - Note: no calc table or cost card in the insufficient-history state.
- **Forecast:**
  - ✅ Approved: glance row gated per cell; Month/Year chart vs. last year; 24–48h chart with a verified band; budget cross-reference; retrospective accuracy check (`allow_historic`).
  - Verification note: scripts `investigate-forecast-hourly-band.mjs` and `investigate-forecast-cost-and-shape.mjs`; bands are hourly-only; `unit=cost` returns zeros.
  - Whole-tab note: below 7 days nothing computes; no API reason code.
  - The meta half of the € note.
- **Advice:**
  - ✅ Approved: 3 real `energy_tip` items (own translation, since `language_code=en` failed; ask #39) plus 1 illustrative upgrade; 3-action model; EUC tags match Breakdown; "(average, €0.27/kWh)" confirmed live; relevance 0.19–0.32 shown as observed.
  - Correction: `already_implemented` goes under Discarded. PATCH body is JSON-Patch `[{op:"replace",path:"/status",value:"..."}]`. "Came from To-do first" is our UX guarantee, not Eliq data.
  - Empty-state rationale: no reason code; 404 "No advices found" historically meant "not provisioned" (ask #40).
  - Debug lines: advice keys with relevance scores, and "Included proactively — schema supports investment_cost/financing_options… (ask #39/#20)".
  - The badge "Upgrade example — once financing is configured".
  - Section-title suffixes "— implemented only" and "— skipped, not_relevant, already_implemented, all three".
- **Budgets:**
  - ✅ Approved: progress chart (daily bars, month/week resolutions), pacing tip, history/streak. All derived from the real Budget and BudgetHistory schemas (`oas/eliq-insights-api.yaml`).
  - ✅ Approved: `budget_awaiting_first_run` and `budget_not_enough_data`, with no timeframe in the copy (ask #38).
  - Open: ask #37 (series step granularity; the chart assumes daily) and ask #38 (duration of `budget_not_enough_data`). Both need Hani (june-integration-notes.md §3).
  - Card title "Pacing tip — all three states".

</details>

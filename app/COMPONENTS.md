# June Insights — builder guide (Phase 4 · Soft Native foundation)

Read this before you build a tab. The reference implementation is `app/panels/overview.html` and `app/panels/peak.html`: copy their patterns. Only change files in `app/panels/<your-tab>.html`. If you need a new shared component, ask the design-system lead; do not edit `tokens.css`, `components.css`, `app.js` or `shell.html` yourself.

```
node tools/build.mjs                                   # shell.html + panels/*.html → app/index.html
node tools/audit.mjs app/index.html --verbose          # hard gates: must print 0
node tools/shoot.mjs app/index.html shots/app --panels=panel-solar[,…] [--dark]
node shots/app/interact.mjs                            # example Playwright interaction captures
```

---

## 1. Panel contract

```html
<style>
/* tab-specific LAYOUT only, always scoped */
[data-tab="solar"] .sl-flow { … }
</style>

<section class="panel" id="panel-solar" data-tab="solar" data-label="Solar · 18 May" aria-labelledby="sl-title">
  <div class="grid"> … </div>
  <p class="footnote">…About these numbers…</p>
  <div class="popover" id="sl-pop-selfuse" aria-label="Used at home" hidden>…</div>
  <details class="meta"><summary>Spec notes · Solar</summary> … </details>
</section>

<section class="panel" id="panel-solar-calibrating" data-tab="solar" data-label="Solar · still calibrating"> … </section>

<script> /* JuneCharts calls for this fragment */ </script>
```

- **Main state id = `panel-<tab>`.** Edge states are `panel-<tab>-<state>`. Every state from `brief/content-inventory.md` ships as its own panel.
- `data-tab` is the product tab key; `data-label` is the reviewer picker label. The reviewer bar builds its picker from these, grouped by tab.
- The product tab bar links to `#panel-<tab>`. Deep links such as `index.html#panel-peak-history` work.
- **Ids are global** because every fragment ends up in one page. Prefix every id with a short tab code (`ov-`, `pk-`, `cp-`, `sl-`, `bd-`, `fc-`, `ad-`, `bg-`).
- Each panel has **one `h1`**: the hero sentence or the hero label.
- End each panel with a `<details class="meta">` Spec notes drawer. It holds approvals, data changes, reason codes, derived copy that needs sign-off, and anything illustrative. **None of this goes in the product UI.**
- Links: `href="#panel-<tab>"` routes inside the app (for example, the "Lower your peak" button goes to `#panel-advice`). `href="#"` is an inert placeholder.
- Fragment `<script>`s run while the page parses. `window.JuneCharts` already exists at that point, and charts render once their panel is visible.

## 2. Layout pattern

```
[ hero tile  .span-12 (inside .ambient for the one brand motif) ]
[ main visual  .span-8            ][ supporting  .span-4        ]
[ detail disclosure  .span-12 (tables, formulas, history)        ]
footnote "About these numbers" · Spec notes
```

- `.grid` is a 12-column grid with a 20px gap. Use `.span-12 / 8 / 7 / 6 / 5 / 4`; at ≤ 960px every span becomes full width. Mobile order is the DOM order: hero, then supporting tiles, then detail.
- `.grid.stretch` gives equal-height tiles in a row. Put the CTA last in the tile with `margin-top:auto`.
- Only one `.ambient` per screen. Put it on the wrapper of the hero tile.
- Content width: 1168px. Page gutter: 24px, or 16px at ≤ 600px. Tile padding: 28px, or 20px at ≤ 600px.

## 3. Tokens (`tokens.css`): never hard-code hex

| Group | Tokens |
|---|---|
| Type | `--fs-xs 12` · `--fs-sm 14` · `--fs-md 16` · `--fs-lg 20` · `--fs-xl 28` · `--fs-hero 52` (48 on mobile). **These six sizes only.** Weights 400/500/600. `--font-display` (Montserrat) for numerals and the hero sentence, `--font-ui` (Inter) for everything else. |
| Surfaces | `--canvas`, `--surface` (tile), `--surface-sunken` (inset/track), `--surface-track`, `--surface-raised` (popover/thumb), `--hairline` |
| Ink | `--ink-900` text · `--ink-700` secondary · `--ink-500` muted (lowest allowed for text) · `--ink-400` icons/lines · `--ink-200` axis · `--ink-100` grid |
| Accent | `--accent` fills · `--accent-strong` text/links/buttons/emphasised lines · `--accent-soft` selected bg · `--accent-stripe` forecast hatch |
| Semantic | `--alert` / `--alert-graphic` / `--alert-soft` (**month peak, over budget, alerts only**) · `--positive*` · `--warn*` |
| Energy | `--elec` / `--elec-strong` / `--elec-soft`, `--gas` / `--gas-strong` / `--gas-soft`. Data series only, never chrome. |
| Categorical | `--cat-1` teal · `--cat-2` violet · `--cat-3` ochre · `--cat-4` magenta · `--cat-5` blue · `--cat-other` neutral. Fixed order, never cycled, at most 5 plus Other. Validated for CVD in light and dark. Always shown next to a text label. |
| Chart roles | `--chart-grid`, `--chart-axis`, `--chart-label`, `--chart-you`, `--chart-compare` (benchmark/similar homes), `--chart-muted` (de-emphasised bars), `--chart-rolloff` (the item leaving a window, which is **not** red), `--chart-band` |
| Space | `--s-1 4` … `--s-16 64` (4px scale), `--gap`, `--tile-pad` |
| Radii | `--r-sm 10` · `--r-md 14` · `--r-lg 24` · `--r-pill` |
| Elevation | `--shadow-1` (tile) · `--shadow-2` (hover, popover) |
| Motion | `--ease-out`, `--ease-in-out`, `--ease-emphasis` (thumbs only) · `--dur-instant 90` · `--dur-fast 160` · `--dur-base 240` · `--dur-slide 320` · `--dur-slow 480` · `--dur-draw 700` |

Dark mode switches automatically. If you use only tokens, you get it for free. Always check your panel with `--dark`.

## 4. Components (copy-paste)

Icons come from the sprite in `shell.html`: `<svg class="icon" aria-hidden="true"><use href="#i-sun"/></svg>`. Add `.sm` for 16px or `.lg` for 24px. Available: chev-r/l/d/u, arrow-r, arrow-up-r, arrow-down-l, arrow-up, arrow-down, plus, x, check, check-circle, x-circle, info, alert, user, pencil, sliders, undo, trash, clock, calendar, pie, activity, wallet, sun, line, bars, users, bulb, hourglass, trend-down, trend-up, home, building, scale, sparkle, gauge, target, trophy, credit-card, repeat, leaf, zap, flame, droplet, thermo, plug, pot, fridge, washer. Never use emoji. `#brand-bolt` is the brand mark; use it only in the wordmark or an empty state.

### Surfaces
```html
<article class="surface span-8">…</article>                <!-- elevation 1 tile -->
<a class="surface tactile" href="#panel-x">…</a>           <!-- whole-tile link, hover lift to elevation 2 -->
<div class="inset">…</div>                                 <!-- sunken panel inside a tile -->
```

### Hero tile: one answer per tab
Status, then the sentence, then **one** numeral that the sentence is about, then a caption or visual.
```html
<div class="span-12 ambient">
  <article class="surface hero">
    <div class="hero__status"><span class="chip positive"><span class="dot" aria-hidden="true"></span>On track</span><span class="xs muted">May 2026</span></div>
    <h1 class="hero__sentence" id="bg-title">On track — 113 kWh left for 13 days.</h1>
    <p class="hero__figure hero-num"><span class="num" data-count="8.7">8.7</span><span class="unit">kWh/day</span></p>
    <p class="hero__caption">stay under this to keep your budget</p>
  </article>
</div>
```
Split variant (answer on the left, comparison/visual on the right; stacks at ≤ 960px):
```html
<article class="surface hero"><div class="hero__split">
  <div><h1 class="hero__label">12-month rolling average <button class="info" …></button></h1>
       <p class="hero__figure hero-num">4.0<span class="unit">kW</span></p></div>
  <div class="hero__aside"><p class="overline">How you compare</p>…</div>
</div></article>
```
`data-count` counts the number up on first view. It is skipped under reduced motion. The final text must already be in the HTML.

### Numerals & stat
```html
<span class="stat-num">3.8<span class="unit">kW</span></span>    <!-- 28px KPI -->
<span class="mid-num">290<span class="unit">kWh</span></span>    <!-- 20px, rows / € line -->
<div class="stat-row">                                             <!-- 2–4 up with hairline dividers -->
  <div class="stat">
    <p class="stat__label"><span class="mark" aria-hidden="true"></span>Latest peak</p>
    <p class="stat__value stat-num">3.8<span class="unit">kW</span></p>
    <p class="stat__meta">Today, 14:30–14:45</p>
  </div> …
</div>
```
`.mark` variants: default accent, `.alert` for the month's peak, `.ink` for roll-off. Use a mark only when it keys to a chart colour.

### Status chip · tag · badge
```html
<span class="chip positive"><span class="dot" aria-hidden="true"></span>On track</span>
<span class="chip warn"><span class="dot" aria-hidden="true"></span>Forecast to exceed budget</span>
<span class="chip alert"><span class="dot" aria-hidden="true"></span>Over budget</span>
<span class="chip">Setting up</span>                                   <!-- neutral -->
<span class="chip positive"><svg class="icon" aria-hidden="true"><use href="#i-trend-down"/></svg>0.24 kW below the Flemish average</span>
<span class="tag">Estimated</span>  <span class="tag accent">just added</span>  <span class="tag alert">highest</span>  <span class="tag positive">Completed</span>
<h2 class="section-title">Needs attention <span class="badge">3</span></h2>
```
A chip always has a word. Colour is never the only signal.

### ≈ estimate marker, info button, popover
```html
<button class="est" type="button" data-pop="pk-pop-est" aria-label="About this estimate">≈</button><span class="mid-num">€7.40<span class="unit">/ month</span></span>
<button class="info" type="button" data-pop="sl-pop-selfuse" aria-label="What does 'used at home' mean?"><svg class="icon sm" aria-hidden="true"><use href="#i-info"/></svg></button>
<span class="approx">≈</span>&nbsp;€150/year    <!-- inert ≈ inside a link; the footnote explains it -->

<div class="popover" id="sl-pop-selfuse" aria-label="Used at home" hidden>
  <h3>Used at home <span class="tag">Estimated</span></h3>
  <p>Plain explanation first.</p>
  <p><span class="formula">(9.6 − 4.4) ÷ 9.6 = 54%</span></p>
  <p class="note">Honesty label, verbatim.</p>
</div>
```
- Behaviour is automatic. The popover opens on click or Enter below its trigger, with a caret, clamped to the viewport. On phones (< 600px) it becomes a **bottom sheet**, so it never covers the value it explains.
- It closes only on Esc (focus returns to the trigger), a click outside, or clicking the trigger again. **It never closes on scroll.**
- Never put a button inside a link. Use `.approx` there.

### Buttons & links (one primary per view)
```html
<a class="btn btn--primary" href="#panel-advice">Lower your peak <svg class="icon sm" data-nudge aria-hidden="true"><use href="#i-arrow-r"/></svg></a>
<p class="btn-note">Tips to spread heavy appliances, in Advice</p>
<button class="btn btn--secondary" type="button">Update home profile</button>
<button class="btn btn--quiet" type="button"><svg class="icon sm" aria-hidden="true"><use href="#i-undo"/></svg>Undo</button>
<a class="link" href="#panel-budgets">View budget <svg class="icon sm" aria-hidden="true"><use href="#i-arrow-r"/></svg></a>
```
Buttons are 44px tall and full width on phones (`.btn--quiet` stays inline). Disabled: `aria-disabled="true"`.

### Segmented control (period, view), fuel toggle, unit toggle
```html
<div class="seg" role="radiogroup" aria-label="Period" data-seg-target="#pk-chart-tile">
  <button type="button" data-value="day" aria-checked="false" aria-disabled="true">Day</button>
  <button type="button" data-value="month" aria-checked="true">Month</button>
  <button type="button" data-value="year" aria-checked="false">Year</button>
</div>
<!-- inside #pk-chart-tile: -->
<div data-when="month">…month chart…</div>
<div data-when="year" hidden>…year chart…</div>

<div class="seg seg--fuel" aria-label="Energy">
  <button type="button" data-value="elec" aria-checked="true"><span class="fuel-dot elec" aria-hidden="true"></span>Elec</button>
  <button type="button" data-value="gas" aria-checked="false"><span class="fuel-dot gas" aria-hidden="true"></span>Gas</button>
</div>
<div class="seg seg--unit" aria-label="Unit">
  <button type="button" data-value="kwh" aria-checked="true">kWh</button>
  <button type="button" data-value="eur" aria-checked="false" aria-disabled="true">€</button>
</div>
```
- `app.js` handles the sliding thumb, roving tabindex, and arrow keys (disabled options are skipped).
- `data-seg-target` shows the `[data-when~=value]` elements inside the target. `data-when` accepts several values separated by spaces.
- For custom logic, listen for the `seg-change` event (`e.detail.value`), which bubbles.
- A disabled option such as "€ unavailable" also needs a visible reason nearby, for example a `.info` popover or a `.callout`.

### Date navigator
```html
<div class="datenav">
  <button type="button" aria-label="Previous month"><svg class="icon sm" aria-hidden="true"><use href="#i-chev-l"/></svg></button>
  <span class="label">May 2026</span>
  <button type="button" aria-label="Next month" aria-disabled="true"><svg class="icon sm" aria-hidden="true"><use href="#i-chev-r"/></svg></button>
</div>
```

### List rows & ranked cards
```html
<div class="surface" style="padding:0"><ul class="rows">
  <li><a href="#panel-forecast" class="row">
    <span class="well row__icon"><svg class="icon" aria-hidden="true"><use href="#i-line"/></svg></span>
    <span class="row__title">Forecast</span>
    <span class="row__sub">Projected this month — 8% more than May last year (269&nbsp;kWh).</span>
    <span class="row__meta mid-num">290<span class="unit">kWh</span></span>
    <svg class="icon row__go" aria-hidden="true"><use href="#i-chev-r"/></svg>
    <span class="sr-only">See forecast</span></a></li>
</ul></div>

<ol class="rank-list"><li>
  <a href="#panel-compare" class="surface tactile rank-card">
    <span class="rank" aria-hidden="true">1</span>
    <span><span class="rank-card__topic"><svg class="icon sm" aria-hidden="true"><use href="#i-users"/></svg>Compare</span>
          <span class="rank-card__title">…</span><span class="rank-card__line">…</span></span>
    <svg class="icon row__go" aria-hidden="true"><use href="#i-chev-r"/></svg>
  </a></li></ol>
```
Each row or card has **one** affordance: the whole thing is the link, marked with a chevron. Rows can also be a `<div class="row">` when they are not links; leave out `.row__go`. Well variants: `.well.accent`, `.well.alert`.

### Budget / progress meter
```html
<div class="meter" style="--used:56.7; --fcast:87.9; --limit:90.9" role="img" aria-label="187 kWh used, 290 kWh forecast, budget 300 kWh.">
  <span class="meter__fcast grow-x"></span><span class="meter__fill grow-x"></span><span class="meter__limit"></span>
</div>
<div class="meter-key"><span><i class="sw" aria-hidden="true"></i>Used so far <b>187 kWh</b></span><span><i class="sw fcast" aria-hidden="true"></i>Forecast <b>290 kWh</b></span><span><i class="sw limit" aria-hidden="true"></i>Budget <b>300 kWh</b></span></div>
```
- Values are percentages of the meter's scale. Pick a scale a little above the largest value, for example 330 for a 300 budget.
- `.meter.over` turns the part past `--limit` red. `.meter.thin` is 8px tall. `.meter.rolloff` uses an ink fill. Put `<div class="meter-ends"><span>…</span><span>…</span></div>` under a meter for start/end labels.
- `.grow-x` animates on the panel's first view.

### Readiness meter (discrete counts only: months, days)
```html
<div class="readiness" data-done="3" data-total="12" data-labels="Jul,Aug,Sep,Oct,Nov,Dec,Jan,Feb,Mar,Apr,May,Jun"
     aria-label="3 of 12 months collected: July, August and September 2025. Complete after June 2026.">
  <div class="readiness__foot"><span><b>Complete after June 2026</b> · 9 more months</span></div>
</div>
<p class="small secondary mt-2">There's nothing you need to do — we'll keep counting.</p>
```
- `app.js` builds the segments and labels. On phones only the filled labels and the last label show.
- **Never** put a count on a kW or kWh visual, and never put a kW value on a readiness meter.

### Insight sentence, callout, footnote
```html
<p class="insight">Your highest this month was <b>4.2 kW on 12 May at 18:30</b> — just above your 4.0 kW average.</p>
<p class="callout"><svg class="icon sm" aria-hidden="true"><use href="#i-scale"/></svg><span>Belgium sets a 2.5 kW regulatory floor — …</span></p>
<!-- .callout.accent = good news / nudge, .callout.warn = caution -->
<p class="footnote"><svg class="icon sm" aria-hidden="true"><use href="#i-info"/></svg><span>About these numbers: …</span></p>
```
Every chart gets an insight sentence directly above it. Every tab gets one "About these numbers" footnote.

### Empty / not-ready state block
```html
<article class="surface span-12 empty motif">          <!-- .motif = faint halftone, max one per screen -->
  <span class="well accent"><svg class="icon" aria-hidden="true"><use href="#i-bars"/></svg></span>
  <div>
    <h1 class="empty__title">Building toward your first forecast</h1>   <!-- what's missing -->
    <p class="empty__body">…plain reason…</p>
    <div class="readiness" data-done="3" data-total="7" data-labels="…">…</div>   <!-- how long -->
    <div class="empty__actions"><a class="btn btn--secondary" href="#panel-budgets">…</a></div>   <!-- what you can do -->
  </div>
</article>
```
A not-ready state is a state, not an error. Say what is missing, how long it will take (a date, not "soon"), and what the person can do. If there is nothing to do, say so.

### Disclosure
```html
<article class="surface span-12 disclosure">
  <button class="disc-btn" type="button" aria-expanded="false" aria-controls="fc-acc-body">
    <span class="well accent"><svg class="icon" aria-hidden="true"><use href="#i-target"/></svg></span>
    <span><span class="t">How accurate are our forecasts?</span><span class="s">Last 6 months</span></span>
    <span class="chev" aria-hidden="true"><svg class="icon sm"><use href="#i-chev-d"/></svg></span>
  </button>
  <div class="disc-body" id="fc-acc-body"><div><div class="disc-inner"> … </div></div></div>
</article>
```
Charts inside a disclosure re-render when it opens.

### Table (+ mobile)
```html
<table class="table">
  <thead><tr><th scope="col">Month</th><th scope="col" class="hide-sm">When</th><th scope="col" class="r">Peak</th></tr></thead>
  <tbody><tr class="hl"><td>Jun 2025 <span class="tags"><span class="tag">rolls off next</span></span><span class="sub show-sm">12 Jun, 19:00</span></td><td class="hide-sm">12 Jun, 19:00</td><td class="r">5.8 kW</td></tr></tbody>
  <tfoot><tr><td>Average of 12 months<span class="sub">48.2 ÷ 12</span></td><td class="hide-sm"></td><td class="r">4.0 kW</td></tr></tfoot>
</table>
```
- Value cells (`td.r`) never wrap.
- On phones, either fold secondary columns into a `.sub` line with `.hide-sm` / `.show-sm` (the Peak pattern), or use `<table class="table reflow">` with `td[data-label="Actual"]` to stack each row as label/value pairs.

## 5. Charts: `window.JuneCharts`

Every chart:
- renders as SVG at its real pixel width (ResizeObserver) with 12px labels and direct labels;
- has `role="img"` and an `aria-label` from `ariaLabel`, which is **required**: one or two sentences that state the answer, not "a chart";
- is focusable, with ←/→ / Home / End stepping through points, a tooltip, a live-region announcement, and Esc to clear;
- animates once, on first reveal: bars grow, lines draw, labels fade in last. Under reduced motion it is static.

Call it once in your fragment's `<script>`, or declare it:
```html
<div data-chart="bars"><script type="application/json">{ "values": [1,2,3], "ariaLabel": "…" }</script></div>
```

### `JuneCharts.bars(el, opts)`
```js
JuneCharts.bars('#pk-chart-month', {
  values: [2.6, 2.1, …, 3.8],          // or series: [{ name, values, tone }] for stacked bars (legend added automatically)
  slots: 31,                            // total slots; the slots after values are "future" (faint baseline dots)
  labels: days(31), tipLabels: days(31).map(d => d + ' May'),
  xTicks: [0, 4, 9, 14, 24, 29],        // 0-based indices to label (default: auto-fit)
  now: { index: 17, label: 'Today' },   // bold x label
  highlight: { index: 11, tone: 'alert' },        // or [{index, tone}, …]; tones: accent | alert | ink | muted | compare | elec | gas | cat-n
  muteOthers: false, tone: 'accent',              // base tone for the other bars ('muted' when a highlight tells the story)
  annotation: { index: 11, text: '4.2 kW · 12 May, 18:30', tone: 'alert' },
  thresholds: [ { value: 4.2, label: 'Month peak', tone: 'ink' },
                { value: 4.0, label: '12-month avg', tone: 'accent', emphasis: true } ],
  futureLabel: '19–31 May still to come',
  yMax: 5, yTicks: [0,1,2,3,4,5], yLabel: 'Daily peak (kW)', unit: 'kW', decimals: 1,
  height: 240, maxBar: 18, compact: false, interactive: true, thresholdLabels: 'auto',
  tooltip: (i, v) => `…`,               // optional custom tooltip text
  ariaLabel: '…'
});
```
- Threshold labels go in a right gutter. Close labels are pushed apart and joined to their line with a leader. Below 480px they become a key row above the plot.
- Mark the most important threshold with `emphasis: true` (2px line). The others are 1px ink.
- For a spark strip, use `compact: true` with `xTicks: [0, n-1]` and `interactive: false`. See `#pk-strip`.
- Diverging bars: use `JuneCharts.diverging` (two flows around zero, optional signed net line, filter state, keyboard tooltip) — see `app/panels/solar.html` for a worked example.

### `JuneCharts.line(el, opts)`
```js
JuneCharts.line('#fc-chart', {
  labels: ['Jan', …, 'Dec'],
  series: [
    { name: 'Last year', tone: 'ink', values: [420, …] },                       // comparison = ink, not a 2nd hue
    { name: 'This year', tone: 'accent', values: [430, 380, 340, 310, 290, null, …], forecastFrom: 3 }, // dashed after index 3
    { name: 'Forecast', values: […], band: { lo: […], hi: […] } }               // confidence band
  ],
  now: { index: 4, label: 'Now' },      // vertical "now" divider
  thresholds: [{ value: 300, label: 'Budget', tone: 'alert' }],
  yLabel: 'kWh per month', unit: 'kWh', yMin: 0, yMax, yTicks, xTicks, height,
  forecastName: 'Forecast', bandName: 'Likely range', ariaLabel: '…'
});
```
- Series names become direct end labels (right gutter, collision-resolved) and a key row when there are two or more series, a forecast or a band.
- `null` values break the line.
- Tones: `accent`, `ink`, `elec`, `gas`, `accent-strong`. Use `dots: true` to mark every point.

### `JuneCharts.hbars(el, opts)`: ranked horizontal bars, rendered as an accessible HTML list
```js
JuneCharts.hbars('#bd-list', { swatch: true, items: [
  { label: 'Heating', value: 312, valueText: '<b>312 kWh</b> · 38%' },
  { label: 'Water heating', value: 160, valueText: '160 kWh', note: '<span class="tag">Estimated</span>' },
  …,
  { label: 'Other', value: 60, valueText: '60 kWh', tone: 'cat-other' } ] });
```
- `swatch: true` colours the items `--cat-1…5` in order.
- `highlight` + `muteOthers` shows a single-accent ranking.
- `max` sets a fixed scale.
- Put items in **ranked** order.

### `JuneCharts.meter(el, opts)`: an honest number line (bullet meter)
```js
JuneCharts.meter('#pk-bench', {
  min: 0, max: 5, ticks: [0,1,2,3,4,5], unit: 'kW',
  fill: { to: 4.0, provisional: false },                        // provisional = hatched ("so far")
  zones: [{ from: 0, to: 2.5, label: 'Regulatory floor', valueText: '2.5 kW' }],   // bracket under the track
  markers: [ { value: 4.0, label: 'You', kind: 'you', side: 'above', hollow: false },
             { value: 4.24, label: 'Flemish average', kind: 'ref', side: 'below', valueText: '4.24 kW' } ],
  ariaLabel: '…'
});
```
- The axis starts at zero, or at a stated `min`. End at the next round value above the largest value shown, and say why in Spec notes.
- Write deltas in words ("0.24 kW below the Flemish average"). Never show a signed reading such as "−0.24 kW".
- No gauges or dials.

Every call returns `{ el, update(opts) }` for re-rendering, for example after a fuel toggle: `chart.update({ values: gasValues })`.

## 6. Colour rules

- **June Green** means interactive, plus "your data". Only one accent.
- **June Red** (`alert`) means the month's peak, over budget, and alerts. Use it at most once or twice per screen, always with a word. The item that is rolling off, benchmarks and comparisons are **ink or neutral**.
- Energy colours appear only on data series (elec yellow, gas blue), and always with a direct label.
- Text is always ink (`900/700/500`) or `--accent-strong` / `--alert` / `--positive` / `--warn`. Never use a series colour for text.

## 7. Copy rules

- **Plain words first**, with jargon in the popover: "used at home" (self-consumption), "more than 99% of similar homes" (percentile).
- Sentence case everywhere. No ALL CAPS except `.overline` kickers.
- The hero is one sentence that answers the tab's question, plus one numeral.
- Every chart gets a "Say it, then show it" insight sentence with the key figure in `<b>`.
- Mark every estimate with `≈` and use the same popover pattern. Keep honesty labels **verbatim** (see `content-inventory.md` "Honesty labels").
- Use unambiguous dates: "Drops out 1 Jun 2026", "Complete after June 2026", "Ready on 21 May". Never write "after June" or "soon".
- € before kWh where € exists, marked with ≈.
- No meta in the UI: API codes, "Real UAT data", approval notes and "illustrative data" flags go in Spec notes. Honesty labels that the inventory says are product copy, such as "(illustrative)" on the Advice upgrade, do stay in the UI.
- Numbers must match `brief/demo-data.md`. Record any derived or new copy in Spec notes.

## 8. Motion rules

- Automatic: the panel fades in with an 8px rise (240ms), tab and segmented thumbs slide, charts animate on first reveal, `data-count` counts up, `.grow-x` meters fill, disclosures expand, and `.tactile` tiles lift on hover (desktop).
- Use one signature motion per screen. Anything else stays ≤ 240ms with the tokens. Add no new keyframes without asking.
- Reduced motion is handled globally (fades only, no count-up). Do not add JS animation that ignores it.

## 9. Accessibility checklist

- One `h1` per panel. Section titles are `h2`.
- Icons are decorative (`aria-hidden="true"`). Buttons that show only an icon need an `aria-label`.
- Targets are ≥ 24px, and primary controls are ≥ 44px on phones. The components already do this; don't shrink them.
- Never rely on colour alone: use a word, icon, label or pattern.
- Charts need `ariaLabel`. Meters and readiness need `aria-label`.
- Disabled controls: `aria-disabled="true"`. They are not in the tab order and have a visible reason nearby.
- Popovers: use `data-pop` triggers only. Don't write your own.

## 10. Definition of done (per tab)

- [ ] Every state in `content-inventory.md` for the tab is its own `.panel` (`panel-<tab>` plus `panel-<tab>-<state>`), with `data-tab` and `data-label`.
- [ ] The hero answers the tab's primary question in one sentence plus one numeral; the eye goes hero → supporting → detail.
- [ ] Numbers match `demo-data.md`; changes, derived copy and illustrative data are listed in Spec notes.
- [ ] All frozen copy and honesty labels are present (demoted into popovers or disclosures is fine, deleted is not).
- [ ] Only tokens and shared components are used; tab CSS is scoped under `[data-tab="…"]`, with no new colours, sizes or radii.
- [ ] Red is used only for peak, over or alert. Energy colours are used only on series.
- [ ] Each chart has an insight sentence above it and an `ariaLabel`, uses direct labels, and draws thresholds to scale with labels.
- [ ] `node tools/audit.mjs app/index.html --verbose` gives **0 hard-gate failures**.
- [ ] Screenshots checked by eye in light and **dark**, at 1280 and 390, including one open popover and one open disclosure. No clipped labels, no horizontal scroll, the active tab is visible.
- [ ] Keyboard: Tab reaches every control in order; segmented controls work with arrows; popovers close on Esc; charts step with arrow keys.

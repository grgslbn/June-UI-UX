# Visual audit — June Insights mockups (original gallery)

Source: `reference/original-gallery.html` (one `<style>` block of 45 KB and 219 inline `style=""` attributes), screenshots in `shots/original/` (8 panels × desktop/mobile), `brief/brand-notes.md`, `reference/brandbook-contact-sheet.png`.
All counts below come from regex passes over the CSS and the inline styles. The script is in the scratchpad and can be re-run: it extracts `<style>`, strips `<style>`/`<script>` from the body and counts property values.

---

## 1. Quantified inventory

### 1.1 Typography
**Font family:** only the system stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`, plus `ui-monospace` in 3 places (formulas and API keys). **Neither brand font (Montserrat or Open Sans) is used.**

**Font sizes: 22 distinct values in the CSS (222 declarations), plus 3 more in inline styles**

| size | uses | | size | uses |
|---|---|---|---|---|
| 11px | 39 | | 15px | 7 |
| 10.5px | 27 | | 18px | 7 (emoji icons) |
| 12px | 22 | | 14px | 7 |
| 11.5px | 21 | | 20px | 5 |
| 13px | 19 | | 8.5px | 5 |
| 9px | 15 | | 16px | 4 |
| 12.5px | 11 | | 22px | 3 |
| 10px | 10 | | 19px | 3 |
| 9.5px | 8 | | 26px | 3 (emoji icons) |
| 13.5px | 2 | | 24px | 2 |
| 14.5px | 1 | | **7.5px** | 1 (budget axis) |

- **176 of 222 declarations (79%) are 13px or smaller.** 12 of the 22 sizes are 12.5px or smaller, and 7 of those are under 11px. Values 0.5px apart (10/10.5, 11/11.5, 12/12.5, 13/13.5, 14/14.5) can't be told apart on screen. They are noise, not steps in a scale.
- The biggest data number anywhere is **24px** (`.sf-kpi-value`). KPI values are spread across 14, 14.5, 15, 18, 19, 20, 22 and 24px, so the page has no single "hero number" size.
- **Weights:** only 600 (41 uses) and 700 (15). Hierarchy comes from size alone, and every card title, row title and link is 600.
- **Line-heights:** 5 values (1.3, 1.4, 1.45, 1.5, 1.6). **Letter-spacing:** .02em (7) and .03em (2), used only on UPPERCASE card titles (9 uppercase rules, all 13px/600/#555).

### 1.2 Colour
**47 distinct hex values** in total, plus 1 rgba and 5 gradients.

**Text colours: 24 distinct (255 declarations in CSS, 15 inline)**
`#222`×49, `#888`×27, `#999`×24 (+11 inline), `#666`×19, `#fff`×18, `#555`×17, `#172429`×17, `#3bada9`×15, `#777`×14, `#1c6d68`×11, `#8a6100`×9, `#2e7d32`×9, `#aaa`×6, `#444`×5, `#ff5630`×3, `#333`×2, `#7fd1cd`×2, `#c8391f`×2, plus one each of `#eee #ccc #3f7d78 #00b8d9 #f4b942 #e05a9c`.
- That makes **11 greys used as text** (`#222 #333 #444 #555 #666 #777 #888 #999 #aaa #ccc #eee`) plus a separate ink colour `#172429`. Two "blacks" (`#222` and `#172429`) sit side by side on the same cards.
- **205 `!important`** declarations. Every card uses a `.x-card * { color:#222 }` reset and then overrides it per child, which is where most of the greys come from.

**Background colours: 31 distinct in CSS (170 declarations), 14 inline (114)**
Surfaces: `#fff`×28, `#f7f8f8`×15, `#f2f2f2`×17, `#eee`×9, `#f3fbfa`×5, `#d8d8d8`, `#e8e8e8`.
Green tints: `#e6f5f5`×17 (+17 inline), `#3bada9`×25 (+29 inline), `#5cc0bc`, `#7fd1cd`, `#a6e0dd`, `#cfeceb` (the 4-step breakdown ramp, 14 inline each).
Semantic tints: `#fff3d6`×11 (warn), `#e9f9e5`×8 (good), `#ffe0db`×3 and `#ffe9e0`×2 (two different "bad" tints), `#fdf3e0`, `#fde8f0`.
Dark shell: `#1c1c1c`, `#262626`, `#2c2c2c`.

**Accent and data colours:**

| colour | role today | on-brand? |
|---|---|---|
| `#3bada9` (88 total uses) | primary accent, active pills, bars, links, progress | ≈ June Green `#3bada8` ✔ |
| `#172429` | ink, dark toggle pill, CTA button | ≈ brand ink ✔ |
| `#f4b942` (27) | electricity / "you" bar / solar import | a warmer, duller Sunglow; ≈ ✔ |
| `#ff5630` (10) | peak bar, month-peak line, budget limit | ✘ Atlassian red-orange, **not June Red `#e85257`** |
| `#00b8d9` (4) | rolling-average line | ✘ off-palette cyan; clashes with June Green |
| `#e05a9c` (10) | "similar homes" bar and line, ranking values | ✘ off-palette magenta |
| `#2e7d32` (14) | positive text, "done" buttons | ✘ Material green, competes with June Green |
| `#8a6100` / `#c8391f` | warn / bad text | neutral tints, fine as semantic tokens |

**Chart colours used:** teal `#3bada9` (bars, lines, stacks); 4-step teal ramp `#3bada9 → #5cc0bc → #7fd1cd → #a6e0dd → #e6f5f5` (breakdown stacked months; the lightest steps are almost invisible on white); `#f4b942` (elec, solar export, "you"); `#e05a9c` (comparison); `#ff5630` (peaks and limits); `#00b8d9` (average); `#d8d8d8` (forecast bars); `#999` dashed (history line); `rgba(59,173,169,.22)` (confidence band); `opacity:.28` on solar import/export bars; pink/green bands at `opacity:.5`. SVG attributes: `#e05a9c`×7, `#3bada9`×6, `#f4b942`×4, `#999`×3.

### 1.3 Shape, spacing, depth, motion
- **Border-radius: 20 distinct values** (142 uses): 12px×26, 8×15, 10×14, 6×13, 14×12, 50%×10, 4×10, 20×10, 16×9, 7×4, 3×4, 5, 9, 2, 11, plus 5 asymmetric bar-top radii (1, 2, 3 and 8px). Cards alone use 12 *and* 14. Icon tiles use 6, 8, 9, 10, 11 and 12.
- **Padding: 39 distinct values** (100 uses). The most common are 18px×10, 3px×8, 24px×7 and `4px 12px`×7. Card padding comes in 14, 16, 18, 20, `22px 18px`, `22px 20px` and `32px 24px`.
- **Gap: 12 distinct values** (2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 16, 20). **Margin: 30 distinct values.** Only about half of the spacing values sit on a 4px grid (5, 6, 9, 10, 11, 14, 18 and 22 are common).
- **Borders:** 16 variants, including 7 different hairline greys (`#f2f2f2 #f7f7f7 #eee #f0f0f0 #ddd` …), 1.5px borders on chips, and 6 **dashed** treatments (thresholds, "unverified", "upgrade", "current month").
- **Shadows: 0.** All depth comes from white on `#f7f8f8` (a contrast of **1.07:1**), so cards barely separate from the page.
- **Transitions and animations: 0.** Tab switching is `display:none → block` with no motion anywhere.
- **Card count:** 22 separate card classes share `background:#fff; border-radius:12/14px`, so every block looks equally important.

### 1.4 Icons: all emoji (118 glyph instances, 31 distinct)
`→`×16, `💡`×12, `🔥`×11, `✅`×10, `📊`×9, `⚡`×7, `✓`×7, `✕`×6, `🏠`×5, `📈`×3, `☀️`×3, `▾`×3, `🧺`×3, `🔌`×2, `⚠️`×2, `📉`×2, `🎯`×2, and one each of `🥧 👛 👥 🏆 🏘️ 🔆 🔄 🚿 🍳 🧊 📅 💳 ↗ ↓ ↑`, plus a CSS `content:"▶"` arrowhead.
There are only 7 inline `<svg>` elements, all charts, and no SVG icons. Emoji render differently on every OS (the Linux screenshots show Noto colour emoji) and sit inside pastel tiles of 20–44px with 6 different radii.

---

## 2. Diagnosis: why it doesn't read as premium

1. **No type scale, only type drift.** 22 sizes in 0.5px steps, most of them at 9–12px. Body copy is 11–12px, meta text is 9–10.5px and one axis is 7.5px. Premium dashboards usually go the other way: fewer and larger sizes, and a hero number that is clearly the loudest thing on the screen. Here a 24px KPI is only 2× the body text, and the UPPERCASE 13px `#555` card titles shout louder than the data.
2. **Everything is weight 600.** Titles, links, pills, badges and table totals all use 600/700, so there is no quiet layer.
3. **Colour noise.** 47 hexes, 11 text greys, two blacks, two greens (brand `#3bada9` vs Material `#2e7d32`) and three off-brand chart colours (`#ff5630`, `#00b8d9`, `#e05a9c`). The Compare panel's teal/yellow/magenta bar trio looks like a default chart library. Pastel tint pills (`#e6f5f5`, `#fff3d6`, `#e9f9e5`, `#ffe0db`) appear on almost every card as insight boxes, badges and icon tiles, so nothing stands out.
4. **Card sameness and flat depth.** 22 card classes, all white with a 12/14px radius, on a `#f7f8f8` page at 1.07:1 contrast with no shadow. There is no distinction between primary (the chart), secondary (KPIs) and tertiary (notes/explanations) surfaces. KPI cards are told apart only by a 3px coloured left border, which is a dated pattern.
5. **Emoji as iconography.** 31 emoji of mixed metaphors (🥧 for breakdown, 👛 for budgets, 🧊 for the fridge) and mixed styles, set inside inconsistent tinted tiles. Emoji are the fastest way to make a UI look like a prototype.
6. **Chart styling:**
   - Thresholds are **2px dashed lines in saturated off-brand colours**, with **9px labels overlapping the bars** (Peak: "12-month avg 4.0 kW" sits on top of the bars in cyan and is illegible).
   - Axis labels are 7.5–9.5px in `#999`/`#aaa` (2.3–2.85:1 contrast, which fails).
   - Legends are separate rows of 8–9px swatches below the chart and repeat what inline labels could say. Solar has two legend styles, and Compare adds "Real UAT data" badges inside the legend.
   - Bar radii range from 1 to 8px. Bars run edge to edge with no baseline, gridlines or y-axis reference, so values can't be read except in the Peak table.
   - Low-opacity fills (`opacity:.28` solar bars, `.5` bands) wash out and make colours muddy. The breakdown stacks' lightest steps (`#a6e0dd`, `#cfeceb`, `#e6f5f5`) vanish into the white card.
   - The peak bar is a different hue (`#ff5630`) *and* has a same-colour dashed line, which encodes one fact twice.
7. **Density without rhythm.** Paddings of 14–24px on cards but 3–6px inside rows, with 39 distinct paddings and 30 margins. Text blocks run 11px with line-height 1.4, so the page feels cramped yet unstructured. On mobile (Advice) buttons wrap into 3 rows and the savings rows break awkwardly.
8. **Dark gallery shell vs light product page.** The review chrome (`#1c1c1c` with `#7fd1cd`/`#999` notes) wraps light "pages" that have a 12px radius and 24px padding. The mockups look like screenshots pasted onto a slide, and the annotations (green `✅ Approved…` notes and snake_case API keys like `sh_no_matching_group`) mix with product UI.
9. **No motion.** Tabs, toggles, disclosures ("▾ See the full calculation") and charts all snap. Hover states are absent, and so is focus styling: `button{border:none}` with no `:focus-visible` rule.
10. **Brand absent.** There is no Montserrat, no June Red and no brand motif. The only June signal is the teal.

---

## 3. WCAG contrast check (current)

Computed with the WCAG 2.x relative-luminance formula. Body text needs 4.5:1, large text (≥18.66px bold / 24px) and UI graphics need 3:1.

| foreground | background | ratio | verdict | where |
|---|---|---|---|---|
| `#222` | `#fff` | 15.91 | AAA | card body |
| `#172429` | `#fff` | 15.90 | AAA | ink values |
| `#333` / `#444` / `#555` | `#fff` | 12.63 / 9.74 / 7.46 | AAA | titles, body |
| `#666` | `#fff` | 5.74 | AA | secondary copy |
| `#777` | `#fff` | 4.48 | **fail (just)** | toggle labels |
| `#777` | `#f2f2f2` | 4.00 | **fail** | inactive pill text |
| `#888` | `#fff` | 3.54 | **fail** (27 uses) | labels, subs |
| `#999` | `#fff` | 2.85 | **fail** (35 uses) | axis, meta |
| `#999` | `#f7f8f8` | 2.68 | **fail** | notes on grey |
| `#aaa` | `#fff` | 2.32 | **fail** | seg labels, ad-key |
| `#3bada9` | `#fff` | 2.71 | **fail** (15 text uses) | links, "70% complete" |
| `#fff` | `#3bada9` | 2.71 | **fail** | active pills, primary buttons |
| `#1c6d68` | `#e6f5f5` | 5.45 | AA | badges |
| `#3f7d78` | `#e6f5f5` | 4.24 | **fail** | insight caveat |
| `#8a6100` | `#fff3d6` | 5.02 | AA | warn notes |
| `#2e7d32` | `#e9f9e5` | 4.67 | AA | good status |
| `#c8391f` | `#ffe9e0` | 4.43 | **fail (just)** | "highest" tag |
| `#ff5630` | `#fff` | 3.17 | **fail** as text (peak row, labels); OK as graphic |
| `#00b8d9` | `#fff` | 2.37 | **fail** as text *and* graphic | avg line label |
| `#f4b942` | `#fff` | 1.77 | **fail** as graphic | elec bars/lines |
| `#e05a9c` | `#fff` | 3.44 | text fail, graphic OK | similar homes |
| `#7fd1cd` / `#999` on `#1c1c1c` | | 9.66 / 5.98 | pass | gallery shell |

Brand colours on white: June Green 2.72, June Red 3.64, Sunglow 1.47, Picton ≈2.23, French Blue 3.65. **None of the brand colours can carry small text on white**, so text needs darker "ink" variants of each.

**Summary:** about 100 text declarations (`#777/#888/#999/#aaa/#3bada9` on light surfaces) fail AA. The primary button and active-pill pattern (white on June Green) fails. The elec yellow and avg-cyan series fail the 3:1 graphics minimum.

---

## 4. Proposed starting tokens

Principles: one accent (June Green) used for interaction and the "your data" series; an ink-tinted neutral ramp instead of pure greys; semantic colours distinct from the accent; energy colours for data only; June Red only for peaks, alerts and over-budget.

```css
:root {
  color-scheme: light;

  /* ── Type ─────────────────────────────────────────── */
  --font-display: "Montserrat", ui-sans-serif, system-ui, sans-serif; /* headings + hero numerals, weight 600–700 (not 800) */
  --font-ui: "Inter", "Open Sans", ui-sans-serif, system-ui, sans-serif; /* body/UI; Open Sans acceptable fallback */
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;
  /* 6-step scale (≈1.25 ratio, rounded to 4px-friendly values) */
  --text-xs: 12px;   /* axis labels, captions, badges — nothing smaller */
  --text-sm: 14px;   /* secondary copy, table cells, pills, buttons */
  --text-md: 16px;   /* body, card titles */
  --text-lg: 20px;   /* section titles, KPI values in dense rows */
  --text-xl: 28px;   /* KPI values */
  --text-2xl: 40px;  /* one hero number per view */
  --lh-tight: 1.15;  /* display & numerals */
  --lh-body: 1.5;
  --weight-regular: 400;
  --weight-medium: 500;   /* UI labels, links */
  --weight-semibold: 600; /* titles, numerals */
  --tracking-display: -0.02em;
  --tracking-caps: 0.06em; /* only for 12px overline labels, sparingly */
  --numeric: tabular-nums;  /* font-variant-numeric on all figures */

  /* ── Neutrals (ink-tinted, from brand ink #1b2a30) ── */
  --ink-900: #16242a;  /* primary text        15.9:1 on white */
  --ink-700: #4a5a61;  /* secondary text       7.2:1 */
  --ink-500: #5f6f76;  /* muted/meta text      5.2:1 on white, 4.9 on --surface-sunken */
  --ink-400: #8a979c;  /* disabled, icons (non-text) 3.0:1 */
  --ink-200: #c7d0d3;  /* strong border, chart axis line */
  --ink-100: #e3e8ea;  /* hairlines, gridlines, tracks */
  --ink-50:  #f6f8f8;  /* sunken surface, inactive pill */
  --surface: #ffffff;
  --surface-page: #f3f6f6;  /* page bg: a little deeper than today's #f7f8f8 so cards lift */
  --surface-sunken: var(--ink-50);

  /* ── Accent: June Green (single interactive hue) ─── */
  --accent: #3bada8;         /* fills: bars, progress, selection indicators (graphic 2.7:1, pair with labels) */
  --accent-strong: #1b7773;  /* text/links/buttons: 5.3:1 on white; white on it 5.3:1 */
  --accent-soft: #e8f5f4;    /* selected rows, subtle highlight (accent-strong on it: 4.8:1) */
  --on-accent: #ffffff;      /* only on --accent-strong; on --accent use --ink-900 (5.8:1) */

  /* ── Semantic ─────────────────────────────────────── */
  --alert: #d63f45;       /* June Red darkened for text: 4.5:1 */
  --alert-graphic: #e85257; /* June Red for peak bars/markers: 3.6:1 */
  --alert-soft: #fdecec;  /* alert text on it: ≥4.5:1 */
  --warn: #8a6100;        /* 5.0:1 on --warn-soft */
  --warn-soft: #fdf4dc;
  --positive: #2b7a4b;    /* 5.3:1; deliberately NOT a second teal */
  --positive-soft: #e7f4ec;

  /* ── Energy series (data only) ────────────────────── */
  --elec: #f0b429;        /* Sunglow, slightly deepened; fill only, always with direct labels */
  --elec-strong: #b88700; /* elec lines/markers & text: 3.2:1 graphic */
  --gas: #1f86c4;         /* Picton deepened: 4.0:1 */
  --water: #3087e8;       /* French Blue 3.65:1; rare in Insights — if shown next to gas, differentiate by shape/label */
  --series-you: var(--accent);
  --series-compare: var(--ink-200); /* comparison/benchmark = neutral, not a 3rd hue */
  --series-forecast: var(--ink-100); /* + hatch or 40% accent outline */

  /* ── Spacing: 4px base ────────────────────────────── */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px; --space-12: 48px;
  --card-pad: var(--space-6);        /* 24px desktop */
  --card-pad-mobile: var(--space-4); /* 16px */

  /* ── Radii ────────────────────────────────────────── */
  --radius-sm: 6px;    /* badges, bar tops (cap at 4px on narrow bars) */
  --radius-md: 10px;   /* inputs, inner panels, icon tiles */
  --radius-lg: 16px;   /* cards */
  --radius-pill: 999px;

  /* ── Elevation (2 levels + hairline) ─────────────── */
  --border-hairline: 1px solid var(--ink-100);
  --shadow-1: 0 1px 2px rgba(22,36,42,.04), 0 1px 1px rgba(22,36,42,.03); /* resting card */
  --shadow-2: 0 8px 24px -8px rgba(22,36,42,.12), 0 2px 6px rgba(22,36,42,.05); /* hover / popover / active pill thumb */

  /* ── Motion ───────────────────────────────────────── */
  --dur-instant: 90ms;  /* press, colour */
  --dur-fast: 160ms;    /* hover, focus ring, pill thumb */
  --dur-base: 240ms;    /* tab content, disclosure */
  --dur-slow: 480ms;    /* chart enter */
  --dur-count: 700ms;   /* numeric count-up */
  --ease-out: cubic-bezier(.2,.8,.2,1);      /* default: enter & settle */
  --ease-in-out: cubic-bezier(.65,0,.35,1);  /* moves between two states */
  --ease-emphasis: cubic-bezier(.3,1.3,.5,1); /* tiny overshoot: toggle thumb only */
  --stagger: 24ms;      /* per-bar delay, capped at 12 items */

  --focus-ring: 0 0 0 3px color-mix(in srgb, var(--accent) 45%, transparent);
}

/* Dark theme (ink-based, not neutral black) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* same values as below */ }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --ink-900: #e8eef0;   /* 15.1:1 on page */
  --ink-700: #a3b1b6;   /* 8.0:1 */
  --ink-500: #8a989d;   /* 5.9:1 on page, 5.3 on card */
  --ink-400: #62727a;
  --ink-200: #33444b;
  --ink-100: #22323a;
  --ink-50:  #1a292f;
  --surface: #17252a;       /* card */
  --surface-page: #0f1a1e;
  --surface-sunken: #132024;
  --accent: #4fc4bf;        /* 8.4:1 on page; use ink-900-dark text (#0f1a1e) on it */
  --accent-strong: #4fc4bf;
  --accent-soft: rgba(79,196,191,.12);
  --on-accent: #0f1a1e;
  --alert: #ff6b70; --alert-graphic: #ff6b70; --alert-soft: rgba(255,107,112,.12);
  --warn: #f0b93a;  --warn-soft: rgba(240,185,58,.12);
  --positive: #5cc98a; --positive-soft: rgba(92,201,138,.12);
  --elec: #f0b93a; --elec-strong: #f0b93a; --gas: #5cb8ec; --water: #6aa5f5;
  --shadow-1: 0 0 0 1px rgba(255,255,255,.04);
  --shadow-2: 0 12px 32px -8px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06);
}
```

**Montserrat vs alternatives.** Montserrat is the brand's display face and has a `tnum` feature, which KPI numerals need. It is wide and geometric, so use it at 600–700 for **numerals and H1/H2 only**, with −0.02em tracking. At 800 it turns "playful poster" rather than premium, and it is too wide for 12–14px UI text. For UI text, **Inter** (or Manrope as a warmer alternative) gives better small-size legibility than Open Sans and supports tabular figures. Keeping Open Sans stays on-brand but reads slightly dated. If a single-family direction is wanted, *Manrope* (numerals and UI) is the closest geometric-humanist compromise. Either way, cap the page at 2 families plus mono, and use weights 400/500/600 only.

**Consolidation targets:** 22 sizes → 6, 47 hexes → about 22 tokens, 20 radii → 4, 39 paddings → the 9-step spacing scale, 0 shadows → 2 levels, 205 `!important` → 0 (drop the `.card *` colour resets).

---

## 5. Chart style guide

- **Canvas:** charts sit directly on the card with no inner boxes or tinted chart backgrounds. Reserve ~24px on the left for y-labels, or use in-plot labels.
- **Gridlines:** 3–4 horizontal lines only, 1px solid `--ink-100`, no vertical gridlines. Baseline 1px `--ink-200`. No dashed gridlines.
- **Axis labels:** `--text-xs` (12px), `--ink-500`, tabular numerals. Show every Nth tick on mobile (days 1/8/15/22/29, hours 00/06/12/18). Put units once, in the y-axis caption, not on every tick.
- **Bars:** top radius `min(4px, width/4)` and a square bottom sitting on the baseline. Gap ≥ 30% of the bar width. One series colour (`--series-you`). Forecast or future bars use `--series-forecast` with a 1px `--ink-200` outline, not a second hue.
- **Thresholds (limit, average):** a **1px solid** `--ink-400` line, or `--alert-graphic` for a hard limit. The label goes **at the right end, outside the plot, above the line** as a small tag (`--text-xs`, 500 weight, on the card background), so it never sits on bars. Drop the dashed 2px lines entirely. If the line needs distinction, use a 2–4px lighter band instead of dashes.
- **Peaks and extremes:** colour only the peak bar `--alert-graphic` and add **one direct annotation** (a dot plus a "4.2 kW · 18 May" label above the bar). Don't draw both a red bar and a red threshold line for the same fact.
- **Legends:** go inline and direct. Label lines at their right end, and label stacked segments in a single row *above* the chart using the same 8px round dot as the series. Hide the legend when there is only one series. No "Real UAT data" badges in legends.
- **Lines:** 2px stroke, round joins, no markers except the last point (4px dot plus a value label). Confidence bands use the series colour at 12% alpha. Historical and comparison lines use `--ink-400` solid 1.5px, not dashed.
- **Comparison bars (Compare panel):** "You" = `--accent`, "Similar homes" = `--ink-200`, "Most efficient" = `--accent-soft` with an `--accent-strong` outline. Values sit above the bars in `--text-lg`. Remove the magenta.
- **Stacked categories (Breakdown):** use at most 4 categorical steps. Derive them from the accent in *lightness steps that keep ≥ 1.3:1 between neighbours*, e.g. `#1b7773 #3bada8 #86d0cc #c7e9e7`, and roll everything else into "Other" as `--ink-100`. Add 1px `--surface` gaps between segments.
- **Energy series:** elec = `--elec` fill or `--elec-strong` line; gas = `--gas`. Always label these series directly, because yellow on white can't meet 3:1 as a fill.
- **Tooltips:** `--surface`, `--shadow-2`, `--radius-md`, 12/14px text. Show a vertical crosshair in `--ink-200` on hover.
- **Enter animation:** bars grow from the baseline (`transform: scaleY(0→1)`, `transform-origin: bottom`, `--dur-slow`, `--ease-out`, `--stagger` per bar, capped at 12). Lines draw with `stroke-dashoffset` over 600ms. Donut and conic sweeps take 600ms. Animate only on first reveal (IntersectionObserver), never on data refresh.

---

## 6. Iconography and brand motifs

**Style:** one inline-SVG set in the Lucide/Feather style: 24px grid, **1.5px stroke**, round caps and joins, `currentColor`, shown at 16px (inline) or 20px (tiles). Icon tiles, if kept at all, are 36px with `--radius-md` and a `--ink-50` background and `--ink-700` icon. The accent tint is only for the one "active/primary" item. Status uses semantic colour, not new emoji.

| emoji (count) | meaning in UI | icon concept (Lucide name) |
|---|---|---|
| 🥧 | Breakdown | `pie-chart` |
| 📈 (3) | Peak / building average | `activity` or `trending-up` |
| 👛 | Budgets | `wallet` |
| ☀️ / 🔆 (4) | Solar, net exporter | `sun` / `sun-medium` |
| 📊 (9) | Forecast, data not ready | `bar-chart-3` (forecast: `line-chart`) |
| 👥 | Compare | `users` |
| 💡 (12) | Advice, tips, nudges | `lightbulb` |
| ⚡ (7) | Electricity, grid | `zap` |
| 🔥 (11) | Gas, heating, streak | `flame` (streak: `flame` in `--accent`) |
| 🏆 | Personal best | `trophy` or `award` |
| ✅ / ✓ (17) | On track, done, already do | `check-circle-2` / `check` |
| ✕ (6) | Not relevant, over | `x` / `x-circle` |
| ⚠️ (2) | Cut back / warning | `alert-triangle` |
| 🏠 / 🏘️ (6) | Home profile, no group | `home` / `building-2` |
| 🔌 | Always on | `plug` |
| 🚿 | Water heating | `shower-head` |
| 🍳 | Cooking | `cooking-pot` (or `chef-hat`) |
| 🧊 | Fridge & freezer | `refrigerator` |
| 🧺 | Washing | `washing-machine` |
| 🔄 | Self-consumed | `refresh-cw` → better `repeat` or `recycle` |
| 📉 | Below average benchmark | `trending-down` |
| 📅 | Forecast headline | `calendar` |
| 🎯 | Forecast accuracy | `target` |
| 💳 | Financing | `credit-card` |
| → / ↗ / ↑ / ↓ / ▾ / ▶ | links, deltas, disclosure | `arrow-right`, `arrow-up-right`, `arrow-up`, `arrow-down`, `chevron-down` (rotates), no glyph arrows |
| ⏳ (in screenshots) | building/waiting | `hourglass` or `loader` |

Keep the brand's **hand-drawn lightning bolt** as the only illustrative "June" mark, for example in the page header or empty states. Don't use it as a UI icon.

**Brand motifs, used sparingly (at most one per screen):**
- **Blob:** a single soft mint (`--accent-soft`) organic blob behind the hero number on Overview, or behind Junior in empty states. Use an SVG path with a 2–3% slow "breathing" morph (8s, disabled under reduced motion).
- **Halftone dots:** a 6×6 dot grid in `--ink-100` or accent at 20% in the corner of empty/"not ready" cards only. They can also serve as the forecast-bar texture in place of grey fills.
- **Squiggle:** a 2px accent squiggle as the underline under the active top-level tab or section headline (a nod to the brand book's wave lines), or as a divider in onboarding states. Never inside charts.
- **Junior:** small (≤64px), bottom-corner, in celebratory states (streaks, personal best, "on track") or empty states. At most once per screen. It replaces the 22–26px emoji hero icons in `.ae-/.sc-/.fn-/.es-` empty cards.
- **June Red** stays reserved for alerts, peaks and over-budget. Never decorative.

---

## 7. Motion recommendations

| interaction | what animates | duration / easing |
|---|---|---|
| Top-level tab switch | panel cross-fade + 8px rise (`opacity`, `translateY`); the indicator (pill or squiggle underline) slides via `transform` between tabs | 240ms `--ease-out` (indicator 240ms `--ease-in-out`) |
| Segmented toggle (Day/Week/Month, kWh/€, Elec/Gas) | a single "thumb" element slides under the labels; label colour cross-fades | 200ms `--ease-emphasis` (thumb), 160ms colour |
| Bar / line chart enter | bars `scaleY` from baseline with 24ms stagger; lines draw via `stroke-dashoffset`; threshold label fades in last | 480ms `--ease-out` (lines 600ms) |
| Chart period change | bars morph height (`transform`), no re-stagger | 320ms `--ease-in-out` |
| KPI number count-up | JS rAF tween from 0 (first view) or previous value (update); tabular-nums prevent jitter | 700ms `--ease-out`, run once |
| Progress bars / donut | width/`scaleX` or conic sweep from 0 | 600ms `--ease-out`, 120ms delay after card enters |
| Disclosure ("See the full calculation", "Show raw production") | `grid-template-rows: 0fr → 1fr` height + content fade; chevron rotates 180° | 240ms `--ease-in-out` |
| Card hover (interactive cards only) | `translateY(-2px)` + `--shadow-1 → --shadow-2` | 160ms `--ease-out` |
| Buttons / chips | background + colour; press `scale(.98)` | 90ms (press), 160ms (hover) |
| Focus | `--focus-ring` fade-in | 90ms |
| Advice item save/discard | item collapses (height + fade), list reflows | 240ms `--ease-in-out` |
| Tooltip | fade + 4px rise | 120ms `--ease-out` |

Rules:
- Animate only `transform` and `opacity` (plus `grid-template-rows` for disclosures).
- Nothing loops, except an optional blob "breathing" in empty states.
- There is no motion on scroll other than first-reveal of charts.
- Each view has one "moment" on load: charts and hero number. Everything else is static.

Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
  /* JS: skip count-up and chart stagger; render final values immediately */
}
```

**Also fix:**
- Add `:focus-visible` styles on every `.tabbtn`, toggle span (these should be real `<button role="tab">` elements) and link.
- Separate the review chrome (the dark gallery shell and approval notes) from the product surface. In the redesign, the gallery shell should use the same light tokens, with annotations in a collapsible side note, so the mockup reads as the product itself.

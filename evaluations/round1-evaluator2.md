# Round 1 — Evaluator 2 (UX research + accessibility)

Persona: senior UX researcher / accessibility specialist; lens = ordinary Flemish homeowner, not an energy expert. I did not build any of this work.
Evidence: fresh screenshots in `shots/eval2/<direction>/` (full page, light + Peak dark), above-the-fold shots with reviewer chrome hidden in `shots/eval2/fold/` (produced by `fold.mjs`), open-state shots (calc disclosure, rolling-average popover) from `open.mjs`, keyboard/ARIA/target/motion probe `shots/eval2/a11y-probe.mjs` → `shots/eval2/a11y-<direction>.json`, and `node tools/audit.mjs --verbose`.

## Summary table

| Criterion (weight) | A · Calm Ledger | B · Energy Almanac | C · Soft Native |
|---|---|---|---|
| Visual hierarchy (10) | 4.0 | **4.5** | 3.5 |
| Typography (8) | 4.0 | **4.5** | 4.0 |
| Colour restraint (8) | **4.5** | **4.5** | 3.5 |
| Spacing & rhythm (6) | 4.0 | 4.0 | 4.0 |
| Data-viz clarity (10) | 4.0 | **4.5** | 3.5 |
| Consistency (4) | 4.0 | 4.0 | 4.0 |
| Craft & premium feel (4) | 3.5 | **4.5** | 4.0 |
| 5-second comprehension (12) | **4.5** | **4.5** | 4.0 |
| Cognitive load (8) | 4.0 | 4.0 | 3.5 |
| Action clarity (8) | 4.0 | 4.0 | 4.0 |
| Edge / empty states (8) | 4.0 | 4.0 | 4.0 |
| Accessibility (8) | 4.0 | 4.0 | 4.0 |
| Responsive (6) | **4.5** | **4.5** | 4.0 |
| **Weighted total /5.0** | **4.11** | **4.29** | **3.82** |
| Hard gates (`tools/audit.mjs`) | 0 failures | 0 failures | 0 failures |

**Recommendation:** B wins. Use it as the base and bring in four specific parts of A (details in the last section). A also clears 4.0. C falls below the ship threshold because its gauge adds a second, confusing way to read the Flemish comparison and it uses red too often.

---

## 1. Automated gates and probe results

`tools/audit.mjs --verbose`: all 3 directions × 3 panels × 2 viewports pass. Each has ≤ 6 sizes, 0 overflow at 390/1280 and reduced motion handled. Note that the audit checks light mode only. I checked dark mode on the Peak panel by eye: no obvious problems, but nothing measured it.

Probe (`a11y-probe.mjs`, results in `a11y-*.json`):

| Check | A | B | C |
|---|---|---|---|
| Animations / transitions active with `reduce` → `no-preference` (Peak) | 0/0 → 28/76 | 0/0 → 31/64 | 0/0 → 32/79 |
| Focus ring on every product tab stop | Yes. Row links use a stretched `::after` ring, which I confirmed in CSS; my first computed-style pass missed it. | Yes | Yes |
| Popovers: Enter opens, `aria-expanded` flips, Esc closes, focus returns | Yes (all 3 on Peak, all 3 on Overview) | Mostly. **The "rolling average" popover opened and then shut again on Enter in 3 of 4 runs.** The page closes any popover on every `scroll` event, and the scroll caused by focusing the trigger is enough. | Yes |
| Disclosure (calc table) `aria-expanded` | Yes | Yes | Yes |
| Chart text alternative | Yes. The SVG has `role=img` + `aria-labelledby` pointing at a summary, and the chart is **focusable, with an arrow-key tooltip for each day** (best of the three). | Yes (`figcaption` summary, SVG `aria-hidden`) | Yes (`aria-label` summaries on the chart and gauge) |
| Targets < 24px (product) | **≈ € button on the Overview "Top tip saves ≈ €150" line: 14×15px (fails WCAG 2.5.8)**. The "june" home link is 20px high. | None | None |
| Targets < 44px on mobile | ⓘ 24×24, segmented 30px high, arrows 32px | ⓘ 24×24, segmented 34px, arrows 36px | ⓘ 24×24, ≈ 28px, tabs 37px, segmented 33px |
| Keyboard tab bar | Roving `role=tab`: only the active tab is in the tab order | 8 buttons in the tab order, 6 of them `aria-disabled` dead stops | Only the live tabs are focusable |
| Colour-only encodings | None. The peak bar is red **and** annotated "4.2 kW · 12 May, 18:30". | None (same approach) | None (same approach) |

---

## 2. Simulated 5-second tests (above the fold, reviewer chrome hidden)

| Panel | Intended answer | A | B | C |
|---|---|---|---|---|
| Overview | "May is on track" | *"May's on track, about 290 of my 300 kWh."* ✔ The sentence carries it. The side "Forecast for May 290" card repeats the number instead of adding anything. | *"May's on track: 290 kWh forecast, budget 300."* ✔✔ The largest numeral and the chip both say the same thing. | *"On track… 113 kWh left for 13 days."* ✔ The answer is found, but the eye goes to **113** first and the forecast number (290) gets diluted. |
| Peak | 4.0 kW, ≈ €7.40/mo, slightly below Flemish avg | *"My capacity-tariff peak is 4.0 kW, I'm below the Flemish average, about €7.40 a month."* ✔ All three are above the fold on desktop and mobile. | *"I'm just under the Flemish average and a big peak drops off next month; my number is 4.0 kW, ~€7.40."* ✔ Complete, but the headline leads with the comparison and the roll-off, so the reader takes away **two** messages. | *"4.0 kW, €7.40 a month… and −0.24 kW?"* ~ The value and the € are clear. The gauge's centre "**−0.24 kW** vs Flemish average" reads as a negative reading or a deficit, and the 0–6 kW scale is arbitrary. |
| Peak <12 mo | avg so far 3.0 kW, 3 of 12 months, take lightly | *"3.0 kW so far, only 3 months in, complete after June 2026."* ✔ On mobile the "take lightly" caveat is just below the fold, next to the comparison it qualifies. | *"3.0 kW from my first 3 months; take the comparison lightly."* ✔✔ The caveat is in the fold on mobile. | *"3.0 kW, based on 3 months… '3 of 12 months counted' inside a kW dial with a 2.5 kW floor?"* ✔ The meter and caveat are in the fold, but the gauge puts a month count on a kW scale. |

---

## 3. Heuristic task walkthroughs

| Task | A | B | C |
|---|---|---|---|
| (a) Find what needs attention and go there | A ranked list of 3 rows (01–03), each a whole-row link with a chevron. Clear. Compare and Advice appear again in "All topics", so there is some duplication. | The same ranked list, as large 752px rows. Very clear. The topics rail is secondary. | Cards have a whole-card link **plus** a separate "See comparison →" link: two affordances for one target. The Peak card's big numeral is "**5.8 kW**", which a homeowner can mistake for their current peak (A has the same risk with a smaller number). |
| (b) What do "rolling average" and "capacity tariff" mean? | ⓘ popovers next to both terms, with good plain-language copy ("that's the 'rolling' part"). | **The terms themselves have a dotted underline**, plus ⓘ. This is the most discoverable version. (See the popover bug above.) | ⓘ popovers. On mobile the rolling-average popover covers the 4.0 kW hero it explains. |
| (c) How is the average calculated? | Disclosure → a clean 12-row table with tags. Footer "Average of 12 months · 48.2 ÷ 12 = 4.0 kW". Best mobile table. Also shows "Today 4.0 → without June 2025 3.9 kW". | Disclosure with the formula stated up front ("48.2 kW ÷ 12 = 4.0 kW"), plus a new "What drives it" bar list that shows the three months pulling the average up. The strongest explanation. | Disclosure table. At 390px the Peak column wraps ("5.8 / kW" on two lines), which makes the table cramped and hard to scan. |
| (d) Why is history incomplete, and when will it be complete? | "3 of 12 months", "**Complete after June 2026**", "There's nothing you need to do". Best answer to "when". | Readiness meter plus "needs a complete 12 months". **No completion date or remaining-month count.** | "**9 more months until your average is complete**" — also a good answer. |

---

## 4. Content fidelity (vs `demo-data.md` and the inventory)

All three use the canonical numbers (290/300/187, 4.0/4.2 on 12 May/3.8, 5.8 kW rolls off, ≈ 3.9 kW, €7.40, 3.0/3.1/3.4). All three move the "New idea" badge and the full honesty note into the ≈ popover, verbatim, or show them in place. In the <12-month state all three correctly remove the calc table and the capacity-charge card.

- **A.** The <12-month state **omits the daily peak chart**. The inventory says "The chart, Latest peak and Month peak work as usual." The **"New idea"** designer badge is visible in the product UI; to a homeowner it reads like internal meta. The countdown label "11 of 12 months counted" under the roll-off bar is ambiguous (11 of what?). New copy: "Spreading the oven, washing machine and dishwasher across the evening…" and "There's nothing you need to do", which sits awkwardly next to a "Start low, stay low" CTA. "Complete after June 2026" is derived correctly.
- **B.** The new "What drives it" module is derived correctly from the table (Jun 5.8, Mar 4.9, Nov 4.4, 9 others 2.9–4.2). The September daily values are invented (10 days, making "today" 10 Sep). That is unavoidable, but it should go in the change log. "Rolls off after May 2026" is correct.
- **C.** "Rolls off after **June**" is ambiguous and arguably wrong: the June 2025 peak leaves the window after May 2026. "−0.24 kW vs Flemish average" is an invented derived metric. The visible Peak footnote paraphrases the honesty label; the verbatim text is only in the popover. That is acceptable under "demote, don't delete", but weaker than A and B. The September chart has 18 invented days, which clashes with B's 10. Pick one figure and log it.

---

## 5. Scores ≤ 3.5: reason + concrete fix

**A**
- *Craft 3.5.* It is precise but cold: this is the "any fintech" risk the brief names. The only brand moment is a halftone in the empty state. **Fix:** add the hand-drawn bolt next to the wordmark and one squiggle or soft blob on the Overview hero. Replace the monospace-feeling small caps kicker with the UI face.

**C**
- *Visual hierarchy 3.5.* The Overview hero splits attention between the sentence and **113 kWh**. The three attention cards each carry a hero-sized numeral (+73%, 5.8 kW, 3 new tips), which gives four competing heroes. The Peak hero tile holds three focal points (4.0, €7.40, gauge). **Fix:** make the hero numeral the forecast (290) or drop it. Shrink the attention-card numerals to body-strong. Take the gauge out of the hero.
- *Colour 3.5.* Red appears in +73% (twice), the countdown bar, the hourglass chip, the annotation and the tags, which dilutes "red = peak/alert". **Fix:** make the countdown bar ink or teal and keep red only for the June 2025 mini-bar. Keep red on +73% once, in the attention list.
- *Data-viz 3.5.* The gauge's 0–6 kW scale has no meaning, and "−0.24 kW" at its centre is confusing. The history gauge mixes a month count with a kW scale, and the 4.0 knob sits on top of the 4.24 tick. **Fix:** use a horizontal comparison strip (floor 2.5 · you 4.0 · Flemish 4.24) with direct labels and the words "0.24 kW below average".
- *Cognitive load 3.5.* The gauge adds a second way to read the same comparison, "3 of 12" is shown twice in the history hero, and the mobile calc table is cramped. **Fix:** remove the gauge in the history state, keep one readiness meter, and use a two-line cell (value over date) as A does.

---

## 6. Per direction: top 3 strengths, top 5 issues (ranked)

### A · Calm Ledger — 4.11
Strengths: 1) The most faithful IA to ux-audit §3.1/§3.6, with a clean hero → attention → topics order. 2) The best history state ("Complete after June 2026", "nothing you need to do") and the best mobile calc table. 3) The best chart accessibility: focusable figure, arrow-key tooltips, and the "today 4.0 → without June 2025 3.9" before/after.
Issues:
1. The <12-month state drops the daily chart, which breaks the frozen inventory.
2. The ≈ € trigger on the Overview is 14×15px, below the 24px minimum.
3. The "New idea" badge shows in the product UI as unexplained meta.
4. "11 of 12 months counted" under the roll-off bar is ambiguous. Replace it with "Counts for 1 more month" or "Rolls off after May 2026".
5. Cold overall. The desktop Peak has dead space (empty € column under the €7.40, and a half-empty "What's coming up" row). The Overview side stat repeats 290 instead of adding anything.

### B · Energy Almanac — 4.29
Strengths: 1) The strongest 5-second read. The oversized light numeral plus the sentence plus the chip is instantly understood on the Overview and in the history state. 2) The best explanation of the rolling average (underlined terms, "48.2 ÷ 12 = 4.0" formula, "What drives it" bars). 3) Premium and on-brand without noise (bolt, squiggle, blob), with the history caveat placed next to the comparison in the fold.
Issues:
1. Popovers close on any scroll, including the scroll from focusing the trigger. Keyboard users lost the rolling-average popover in 3 of 4 probe runs, and the same will happen to mobile users who nudge the page. Close on outside tap or Esc only.
2. The Peak headline carries two messages (the comparison and the roll-off). Lead with the tariff answer, e.g. "Your capacity-tariff peak is 4.0 kW — about €7.40 a month, just under the Flemish average". The roll-off already has its own section.
3. The Flemish comparison appears 3 times on desktop Peak (headline, chip, rail sentence). Keep the chip and the verbatim sentence once.
4. The history state never says when the average will be complete. Add "Complete after June 2026 · 9 more months".
5. Six `aria-disabled` tabs are dead keyboard stops. Remove them from the tab order with `tabindex=-1` until the tabs exist. Separately, the invented September data (10 days) should be added to the demo-data change log.

### C · Soft Native — 3.82
Strengths: 1) Feels like a premium native app, with consistent tiles and quiet ambient depth. 2) "9 more months until your average is complete" and the "last 12 monthly peaks" mini-chart are good ideas. 3) Solid a11y basics (alt text on the gauge and chart, whole-card targets, no targets under 24px).
Issues:
1. The gauge's "−0.24 kW" reads as a negative reading, and its 0–6 kW scale has no meaning. It confuses the Peak answer.
2. The history gauge puts "3 of 12 months" on a kW dial, duplicating the segment meter.
3. There are too many competing big numerals (113 on the Overview, the attention-card numerals, "5.8 kW" misread as the current peak).
4. Red is overused (countdown bar, chip, repeated +73%), which weakens its alert meaning.
5. "Rolls off after June" is ambiguous or wrong. The mobile calc table wraps its kW values, and on mobile the rolling-average popover covers the hero value.

---

## 7. Head-to-head and recommendation

**Ranking: B (4.29) > A (4.11) > C (3.82).** A and B both clear 4.0 with zero gate failures. C does not.

**Recommendation: B wins. Build a precise hybrid on B:**
1. **From A:** the history state's "Complete after June 2026" line and "There's nothing you need to do — we'll keep counting", placed under B's readiness meter.
2. **From A:** the focusable chart with arrow-key per-day tooltips, and A's mobile calc-table cell layout.
3. **From A:** the "Today 4.0 kW → Without June 2025 3.9 kW" before/after in B's "What's coming up".
4. **From C (optional):** the "9 more months" phrasing, as the count next to the date.
5. **B fixes:** close popovers on outside click or Esc only, not on scroll. Rewrite the Peak headline to lead with 4.0 kW / ≈ €7.40 / "just under the Flemish average" and state the comparison once. Take the dead tabs out of the tab order. Log the invented September daily data.
6. Do not carry over C's gauge or A's visible "New idea" badge.

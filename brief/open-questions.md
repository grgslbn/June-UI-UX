# Open questions for the product owner (Phase 4)

Collected from builders; each is also noted in the relevant panel's Spec notes drawer.

## Breakdown
1. New title for the hard-block state: "Tell us about your home to see where your energy goes" (replaces designer label). Required field names (home type, heating source) still placeholder — ask #36.
2. € values derived at €0.27/kWh (total ≈ €221). Confirm the "average Belgian price" basis.
3. Hero "Heating 38% this month" matches **March** in the seasonal chart; May shows 14%. Kept both as printed — pick: relabel hero period, or change May values.

## Forecast
4. Glance Today / Week re-derived to 7.9 / 54 kWh (were 14.2 / 92) to fit 290 kWh month + 7.9 kWh/day pace.
5. Accuracy check relabelled to April 2026 (Nov 2025–Apr 2026); April actual aligned to Compare's 442 kWh with a 417 kWh forecast ("6% higher — pretty close").
6. Over-budget variant uses a 270 kWh budget → "about 7%" (was "about 8%").
7. "Now: 18 May, 14:30" (frozen copy) vs demo "today" 20:00.
8. "This year" glance cell is not ready, yet the Year chart forecasts 6 months ahead — define the Year horizon.
9. Budget status chip is not a link; "View budget" is the single link to Budgets.

## Budgets
10. Auto mode = "forecast +20%", but 290 × 1.2 = 348 ≠ 300 kWh limit. How is the Auto limit derived?
11. Illustrative data needing real values: 18 daily budget values; "Cutting it close" (215 used, 318 forecast); "Over budget" (342 used, day 25).
12. Gas · Weekly disabled without visible reason — need a gas budget state + data.
13. Streak strip: Feb ✕ per demo data, Jan used as the "No data" cell example — confirm.

## Advice
14. New-view status counts show Done 1 / Dismissed 3 (source had zeros) so status views have content — confirm.
15. € rounding inconsistent in source (€145.80 → €150, €64.80 → €65) — pick one rule.
16. Renames: "Save for later" → "Add to my plan", "To do" → "My plan", "Discarded" → "Dismissed", "Saved 3 days ago" → "Added 3 days ago".
17. New copy to sign off: "Check your home profile" button (→ Breakdown), "Move back to New" on dismissed tips.

## Solar
18. **"Net exporter today" is false with canonical numbers** (import 4.4 > export 3.2 → net importer by 1.2 kWh). Frozen copy kept; suggested fix "Sent 3.2 kWh to the grid today" — or change canonical flow numbers.
19. Hourly / weekly / monthly and 10 of 12 seasonal values are illustrative (totals match canon).
20. Single colour mapping across Solar: export = yellow, used at home = green, grid import = neutral (mockup mixed colours).

## Compare
21. Trend series relabelled Nov 2025–Apr 2026 (was Mar–Aug) so the last point matches the April hero; month names in copy moved accordingly (widest gap Feb, "more than every home" Dec–Mar, best month Nov 2025).
22. Gas toggle shows the approved "Still gathering the group" state (no gas data) — acceptable?
23. Partial-profile nudge still says "living area" though Belgian groups filter on bedrooms; "Check back in a few days" has no date.
24. New copy to sign off: "See ways to use less" (→ Advice), edge-state reassurance lines, footnotes.

## Round 3 additions
25. Heating fuel of the demo home: heat-pump card assumes electric heating, but Compare offers a Gas toggle and Budgets has "no gas meter linked". Decide: all-electric home (hide Gas) or gas-heated home (rework heat-pump copy).
26. Budgets "Gas: no gas meter linked" reason and "link it in your account" line are assumptions.
27. Budgets not-enough-data: "last reading 14 May" and "check your meter if nothing arrives by 21 May" are invented.
28. Breakdown not-ready: "1 of 4 weeks, ready around 8 June 2026" is derived.
29. Forecast "This year" readiness rule: ready 1 June 2026 (main); new customers "needs 12 full months".
30. Budgets not-ready fallback tip steps ("user port switched on, reader has power and Wi-Fi, then contact us") are new copy.

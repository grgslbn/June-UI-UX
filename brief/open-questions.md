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

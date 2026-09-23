# Open questions for the product owner

Status after Phase 4 (round 3 + polish). Each item is also noted in the relevant panel's Spec notes drawer.

## Decisions needed (data & product rules)
1. **Heating fuel of the demo home.** Heat-pump tip assumes electric heating; Compare offers a Gas toggle; Budgets says "no gas meter linked". All-electric home (hide Gas) or gas-heated home (rework heat-pump copy)?
2. **Budgets Auto limit.** Auto is described as "forecast +20%", but 290 × 1.2 = 348 ≠ the 300 kWh limit. How is the Auto limit derived?
3. **€ price basis and rounding.** Breakdown/Advice € use an average €0.27/kWh; source rounding is inconsistent (€145.80 → €150, €64.80 → €65). Confirm the price and one rounding rule.
4. **Readiness rules.** Proposed: daily/weekly forecasts and Solar after 7 full days of readings; monthly forecast after the first full calendar month; yearly after 12 full months; Breakdown after 28 days. Confirm (Breakdown's "about 3 more weeks" was read as 28 days).
5. **Forecast "Year" horizon.** "This year" glance cell vs. the 6-month Year chart — what does "Year" mean?
6. **Compare partial-profile nudge** says "living area", but Belgian groups filter on bedrooms. Which field?
7. **Gas on Compare** shows the approved "Still gathering the group" state (no gas data). Acceptable?

## Data aligned by the coordinator (review, see `demo-data.md` change log 1–13)
8. Forecast month 290 kWh everywhere (was 412 / 265); budget 300 kWh; pacing "last 7 days 7.9 kWh/day".
9. Solar hero "Sent to the grid today · 3.2 kWh" + 4.4 kWh import named (the frozen "Net exporter today" was false).
10. Breakdown period = April 2026, 442 kWh (Heating 168 = 38%); 820 kWh total dropped.
11. "Now" = 18 May 2026, 20:00 on every tab; Peak month-peak date 12 May.
12. Compare trend relabelled Nov 2025–Apr 2026; month names in copy moved (widest gap Feb; best month Nov 2025).
13. Forecast glance Today 8.4 / Week 56; accuracy check on April (442 actual vs 417 forecast); over-budget variant 270 kWh budget, 6.4 kWh/day.
14. Streak: 2-month streak (Mar ✓, Apr ✓, Feb ✕, Jan "no data" example).

## Illustrative data that needs real values before build
15. Peak Sep 2025 daily peaks (insufficient-history chart).
16. Solar hourly / weekly / monthly and 10 of 12 seasonal values (totals match canon).
17. Budgets 18 daily values; "Cutting it close" (215 used / 318 forecast); "Over budget" (342 used, day 25).
18. Forecast May daily curve, last-year ghost line, 48 h band.
19. Advice status counts (Done 1 / Dismissed 3) so status views have content.

## New copy to sign off
20. Renames: "Save for later" → "Add to my plan", "To do" → "My plan", "Discarded" → "Dismissed".
21. Breakdown hard-block title "Tell us about your home to see where your energy goes" (field names still placeholder — ask #36).
22. Advice: "Why this one first" callout, "Check your home profile", "Move back to New", "More options" (mobile).
23. Budgets: "Gas: no gas meter linked"; not-ready fallback tip ("user port on, reader has power and Wi-Fi, then contact us").
24. Peak: "4.0 kW sets your capacity tariff" hero, "Drops out 1 Jun 2026", "If it rolled off today… ≈ 3.9 kW"; "New idea" badge removed from customer UI.
25. Compare: "See ways to use less", edge-state reassurance lines, € unavailable note wording.
26. Overview: "Worth a look" section title; new-customer state copy ("We're still getting to know your home").
27. Every panel's "About these numbers" footnote.

# Demo household — canonical numbers

One consistent household for every redesigned screen. Approved copy patterns stay; only numbers/dates were aligned. Every change vs. the original mockup is listed in **Change log** for product review.

**Household:** detached house, 1–2 bedrooms, 1–2 persons, no EV, rooftop solar, Flanders. Electricity shown by default (Elec/Gas toggle exists).
**"Today":** Monday **18 May 2026, 20:00**. Month = May 2026 (31 days) → 18 days elapsed, **13 days left**.

## Overview tiles
| Topic | Metric | Supporting line |
|---|---|---|
| Forecast | **290 kWh** | Projected this month — 8% more than May last year (269 kWh). |
| Budgets | **On track** | 187 of 300 kWh used, 13 days left. |
| Compare | **+73%** | More than similar homes in April. |
| Peak | **4.0 kW** | 12-month average — sets your capacity tariff. |
| Breakdown | **Heating 38%** | Your biggest category this month. |
| Solar | **62% used at home** | Net exporter today: +3.2 kWh to the grid. |
| Advice | **3 new tips** | Top tip saves ≈ €150/year. |

Ranked "needs attention" (Overview hero area): 1. Compare +73% vs similar homes · 2. Peak — your 5.8 kW June 2025 peak drops out next month · 3. Advice — 3 new tips.
Hero status sentence: "May is on track — 290 kWh forecast against your 300 kWh budget."

## Budgets (aligned with Forecast)
Limit 300 kWh · used 187 kWh · 113 kWh left · 13 days → **stay under 8.7 kWh/day**. Last 7 days averaged **7.9 kWh/day** → On track. Month forecast **290 kWh** (was 265 on Budgets and 412 on Forecast). Streak: **2-month streak** (Mar ✓, Apr ✓; Feb ✕) — best 5 months.

## Peak (pilot tab)
- Latest peak **3.8 kW** · Today, 14:30–14:45
- Month peak **4.2 kW** · **12 May, 18:30** (was 18 May — clashed with "latest peak today")
- 12-month rolling average **4.0 kW** — sets your capacity tariff; Flemish average **4.24 kW**; ≈ **€7.40/month** capacity charge (rough regional rate).
- Daily peaks 1–18 May (kW), days 19–31 not yet happened:

| Day | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| kW | 2.6 | 2.1 | 3.0 | 2.4 | 2.8 | 1.9 | 3.1 | 2.2 | 2.7 | 3.3 | 2.5 | **4.2** | 2.9 | 3.4 | 2.3 | 3.0 | 2.6 | 3.8 |

- 12-month table (unchanged except May date): Jun 2025 5.8 kW 12 Jun 19:00 *(highest, rolls off next)* · Jul 3.2 · Aug 3.8 · Sep 4.0 · Oct 3.5 · Nov 4.4 · Dec 3.3 · Jan 2026 2.9 · Feb 4.0 · Mar 4.9 · Apr 4.2 · May 4.2 *12 May 18:30 (just added)* → average **4.0 kW** (48.2 / 12 = 4.02 ✓).
- "Your biggest peak is still counting — 5.8 kW in June 2025 … counts toward your average for 1 more month, then it rolls off and your average may drop." If it rolled off today (replaced by a 4.2 kW month), average ≈ **3.9 kW**.
- **Insufficient-history state** (separate new-customer household, Sep 2025, unchanged): Latest 3.1 kW (Today 08:15–08:30), Month peak 3.4 kW (6 Sep 19:00), Average so far 3.0 kW, 3 of 12 months (Jul, Aug, Sep), 2.5 kW regulatory floor note, Flemish 4.24 kW with "take this lightly" caveat.

## Other tabs (align in Phase 4)
- Compare: comparison period = **April 2026** (last full month): You 442 · Similar 255 · Most efficient 179 kWh (+73%).
- Solar: flow diagram is canonical (Production 8.4, Home 9.6, Grid import 4.4, Export 3.2, Self-consumed 5.2). Self-sufficiency worked example becomes (9.6 − 4.4) / 9.6 = **54%**. Seasonal chart = absolute stacked kWh (Jul 620, Dec 68).
- Advice: 3 new tips + 1 "Bigger investment" (heat pump, illustrative) shown in its own section, so "3 new tips" is consistent.

## Change log (for product review)
1. Forecast month 412 → **290 kWh** (Overview, Forecast); Budgets forecast 265 → **290 kWh**; Forecast budget link 450 → **300 kWh**.
2. Budgets pacing: "averaging 10.4 kWh/day" → "last 7 days: 7.9 kWh/day" so "On track" is true.
3. Streak "3-month" → **2-month** to match ticks.
4. Peak month peak date 18 May → **12 May**; chart bars now 18 real days, highest bar = 4.2 kW on day 12.
5. Compare period labelled **April 2026**.
6. Solar self-sufficiency worked example uses flow-diagram numbers.
7. Solar seasonal chart absolute, not normalised.
8. Advice: heat-pump upgrade separated from the "new tips" count; Overview line → "Top tip saves ≈ €150/year".
9. **Peak insufficient-history daily chart (Sep 2025): illustrative values.** The source has only latest peak (3.1 kW) and month peak (3.4 kW, 6 Sep 19:00). Canonical illustrative daily peaks for 1–15 Sep 2025 ("today" = 15 Sep 2025, 08:30): 2.4, 2.1, 2.6, 2.2, 2.8, **3.4**, 2.5, 2.0, 2.7, 2.3, 2.9, 2.2, 2.6, 2.4, 3.1. Marked as illustrative in spec notes; needs real data before build.

10. **Solar hero:** "Net exporter today +3.2 kWh" was false (import 4.4 > export 3.2) → "Sent to the grid today · 3.2 kWh", with the 4.4 kWh import named. Overview Solar row → "3.2 kWh sent to the grid today".
11. **Breakdown period = April 2026** (last full month, same as Compare), total 442 kWh: Heating 168 (38%), Water heating 88 (20%), Always on 62 (14%), Cooking 53 (12%), Fridge & freezer 40 (9%), Other 31 (7%). The 820 kWh total is dropped. The seasonal chart highlights April.
12. **"Now" = 18 May 2026, 20:00** on every tab (Forecast marker was 14:30).
13. Forecast over-budget daily figure and Compare trend-range sentence recomputed.

## Phase 4 decision log
- Product owner chose **Direction C · Soft Native** for the rollout (over the evaluators' B-based hybrid). Known C issues to fix first: gauge scale/negative reading, Overview 113 kWh vs 290 kWh hero conflict, overuse of red, "Rolls off after June" ambiguity, crowded threshold lines, dark-mode active tab subtlety.

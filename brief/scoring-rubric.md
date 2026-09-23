# Evaluation rubric

Evaluators score **from screenshots + source**, never their own work. Each criterion 1–5; any score ≤ 3 must include *why* + *a concrete fix*. Weighted total out of 5.0. Ship threshold: **≥ 4.0 and zero hard-gate failures**.

## Design (50%)
| Criterion | Weight | 5 = |
|---|---|---|
| Visual hierarchy | 10 | One obvious hero per view; eye path is hero → support → detail |
| Typography | 8 | ≤ 6 sizes, tabular numerals, clear weight contrast, no text < 12px |
| Colour restraint | 8 | One accent; energy/semantic colours only where they carry meaning |
| Spacing & rhythm | 6 | Consistent 4px scale, generous whitespace, aligned edges |
| Data-viz clarity | 10 | Minimal ink, direct labels, thresholds legible, no legend hunting |
| Consistency | 4 | Same component = same look/behaviour across tabs & states |
| Craft & premium feel | 4 | Details: icon quality, subtle motion, polish, brand character without noise |

## UX (50%)
| Criterion | Weight | 5 = |
|---|---|---|
| 5-second comprehension | 12 | A first-time user can state the tab's main answer within 5 s |
| Cognitive load | 8 | Jargon explained on demand; caveats disclosed, not dumped |
| Action clarity | 8 | Next step obvious; CTAs distinct from info |
| Edge / empty states | 8 | Honest, specific, reassuring, with a path forward |
| Accessibility | 8 | WCAG AA contrast, not colour-only, focus states, reduced-motion |
| Responsive | 6 | Works at 390px with no horizontal scroll; sensible reflow |

## Hard gates (automated, `tools/`)
- No horizontal overflow at 390px and 1280px.
- All text contrast ≥ 4.5:1 (≥ 3:1 for ≥ 24px / bold ≥ 18.66px).
- No font-size < 12px (chart axis ticks ≥ 11px allowed).
- `prefers-reduced-motion` disables non-essential animation.
- All frozen content from `brief/content-inventory.md` present.

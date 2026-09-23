# Round 1 scorecard — june.energy variants

Weighted per `brief/scoring-rubric.md`: design 30 · UX 25 · conversion 30 · technical 15. Ship bar ≥ 4.0 + zero gate failures.
All four pass every `check-site` hard gate (24/24 route × viewport, 0 failures).

| Variant | Design | UX | Conversion | Technical | **Weighted** | Persona panel (simulated) |
|---|---|---|---|---|---|---|
| **C · Honest Market** | 3.97 | **4.34** | **4.52** | **4.03** | **4.24** | **4.1** (picked by Prudent + Tech) |
| A · Calm Confidence | 3.88 | 4.14 | 4.30 | 3.60 | 4.03 | 3.9 (picked by 60+ sceptic) |
| B · Savings First | 3.53 | 3.74 | 4.12 | 3.67 | 3.78 | 3.1 (picked by Saver) |
| E · Bold June | 3.95 | 3.54 | 3.58 | 3.70 | 3.70 | 2.6 (picked by none) |

Sources: `round1-design.md`, `round1-ux.md`, `round1-conversion.md`, `round1-technical.md`, `round1-personas.md`.

## Consensus across all five evaluators
- **C wins on substance** (trust, objections, clarity, performance) but is **visually the least June** → needs A's product bands and E's brand spark.
- **Borrow list:** A — hero value/status tile, Premium product band (leaf dongle + app), postcode → town + grid operator; B — "wat jij overhoudt" ledger per plan, answers carried across language switch, per-step URLs; C — three-question hero panel, "Wat we van je weten" funnel panel, footnotes column, four-party diagram; E — squiggle under one word, CTA hover, mascot on the confirmation.
- **Estimate must lead with the net figure** and never recommend a plan that eats the saving.

## Cross-variant defects (fix everywhere)
1. Sticky mobile CTA hides the focused element (WCAG 2.4.11) → `scroll-padding-bottom`.
2. No phone number / opening hours; login is a dead link.
3. No cancellation answer (A), visible placeholders/TBC (A, B, E), guarantee wording without its condition (E, B Premium, C "zonder risico op verlies").
4. Sticky mobile CTA missing on plans / Switch Plus (A, C, E).
5. No sitemap, robots.txt, 404 page, og:image (C, E).
6. 320px overflow (A 10 routes, B 7, C 3, E 3); Switch Plus CLS 0.14–0.20 (A, B); A LCP 3.0 s.
7. "Approve each switch yourself" defaults to auto and is buried.

## Decisions needed from the product owner
1. **In-browser € estimate vs claims rule C17** — all four violate it (B most: preset example + per-card nets).
2. Real phone number / hours, login URL, cancellation terms, guarantee terms, supplier commissions (independence claim).
3. Shared tagline "Besparen met gegarandeerd resultaat." in `facts.json` overstates the guarantee.

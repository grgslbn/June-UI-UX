# june.energy redesign — project plan

**Goal:** a first-class, premium commercial website for June. Astro (static), **NL + FR**, primary conversion = **start sign-up**.
**Decisions (product owner):** Astro · NL + FR · goal = sign-up start. Defaults until told otherwise: placeholder assets (clearly marked), work from content map + taxonomy (live site not reachable from this environment), variant A continuous with the in-app Insights "Soft Native" design.

## Team (agents)
| Group | Roles |
|---|---|
| Coordination | Coordinator — brief, checkpoints, merges, consistency |
| Research | Content strategist + NL/FR copywriter · UX researcher / IA · Competitive & reference researcher · Conversion (CRO) specialist · SEO & technical strategist · Brand strategist / creative director |
| Design & build | Design-system lead (shared Astro foundation) · 3–5 variant designer-developers (design + build their variant end-to-end) |
| QA | QA engineer (viewports, links, forms, console) · Technical auditor (Lighthouse, axe, CWV, SEO) |
| Evaluation | Design critic · UX evaluator · Conversion evaluator · Persona panel (Saver, Risk-averse, Tech enthusiast, sceptical 60+) — simulated, not a substitute for real user tests |

## Phases & checkpoints
| # | Phase | Output | Checkpoint |
|---|---|---|---|
| 0 | Setup | Astro workspace, `tools/check-site.mjs`, source docs | — |
| 1 | Content freeze | `shared/content/facts.json`, copy baseline NL/FR, claims register, content issues | with 2 |
| 2 | Research (6 agents, parallel) | UX research, competitive research, conversion strategy, SEO/tech strategy, brand strategy + 5 creative briefs | **Approve strategy brief, IA, concepts** |
| 3 | Concepts | 5 style tiles + homepage hero (desktop + mobile) | **Pick 3–5 to build** |
| 4 | Build | Each variant: Home, Plans & pricing, Switch Plus, How it works, FAQ, Sign-up step 1–2; header/footer; NL + FR; motion | — |
| 5 | Evaluate ×2 | Panel scores → fix round → re-score | **Review page, recommendation** |
| 6 | Handover | Winner polished across the full taxonomy, design-system guide, A/B test plan | — |

## Required routes (every variant)
`nl-be/` · `nl-be/abonnementen/` · `nl-be/switch-plus/` · `nl-be/hoe-werkt-het/` · `nl-be/veelgestelde-vragen/` · `nl-be/aanmelden/`
`fr-be/` · `fr-be/abonnements/` · `fr-be/switch-plus/` · `fr-be/comment-ca-marche/` · `fr-be/questions-frequentes/` · `fr-be/inscription/`

## Variant concepts (5 → build 3–5)
A Calm Confidence · B Savings First · C Honest Market · D Product Showcase · E Bold June (optional). See `brand-strategy.md` for creative briefs.

## Quality gates (automated, `node tools/check-site.mjs variants/<x> --lighthouse`)
No overflow at 1280/390 · no text < 12px · WCAG AA contrast · 0 serious/critical axe issues · reduced-motion handled · lang/title/description/one h1 · hreflang nl-BE + fr-BE · no console errors · Lighthouse mobile: perf ≥ 90, a11y ≥ 95, best-practices ≥ 90, SEO ≥ 95.

Rubric: `scoring-rubric.md`. Ship bar: weighted ≥ 4.0 and zero gate failures.

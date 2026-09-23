# Website evaluation rubric

Each criterion 1–5 (half points allowed). Any score ≤ 3.5 needs a reason + a concrete fix (page, section, change). Weighted total out of 5.0. **Ship bar: ≥ 4.0 and zero hard-gate failures.** Evaluators score independently, from screenshots (1280 / 390, NL + FR), interaction, and source — never their own work.

## Design (30%)
| Criterion | Weight | 5 = |
|---|---|---|
| Visual hierarchy | 7 | Each section has one obvious focus; eye path hero → proof → action |
| Typography | 5 | Clear scale, confident display type, excellent readability NL + FR (longer FR strings don't break layouts) |
| Colour & imagery | 5 | Purposeful palette, brand-true, imagery/illustration supports the message |
| Brand distinctiveness | 5 | Unmistakably June; could not be any other energy company |
| Craft & motion | 5 | Detail, polish, motion that adds meaning, never gets in the way |
| Consistency | 3 | Same component = same look/behaviour across pages and languages |

## UX (25%)
| Criterion | Weight | 5 = |
|---|---|---|
| 5-second clarity | 7 | A first-time visitor can say what June does, for whom, and why it's safe |
| Navigation & IA | 4 | Finds plans, how it works, FAQ, login, language switch effortlessly |
| Objection handling | 6 | Every key objection answered where it arises |
| Mobile experience | 4 | Designed for thumb, not squeezed desktop; sticky CTA sensible |
| Accessibility | 4 | WCAG 2.2 AA in practice: keyboard, focus, forms, semantics |

## Conversion (30%)
| Criterion | Weight | 5 = |
|---|---|---|
| Value proposition | 7 | Specific, credible, differentiated benefit above the fold |
| Relevance per persona | 5 | Saver, risk-averse, tech enthusiast and sceptic each find their reason |
| Anxiety reduction & trust | 6 | Independence, guarantee, reviews, privacy/meter access, "how we earn" all visible |
| Pricing clarity | 5 | Plans instantly comparable, total yearly price clear, recommended plan obvious |
| Path to sign-up | 7 | CTA always reachable, low-friction step 1, personalised estimate motivates continuing |

## Technical (15%)
| Criterion | Weight | 5 = |
|---|---|---|
| Performance | 6 | Lighthouse mobile ≥ 95, LCP < 2 s, no layout shift, minimal JS |
| SEO & i18n | 5 | Titles/meta/headings, structured data, hreflang, NL↔FR switch maps equivalent pages |
| Code quality | 4 | Clean Astro components, tokens, no hacks; easy to take to production |

## Hard gates (automated — `node tools/check-site.mjs variants/<x> --lighthouse`)
See `plan.md`. Plus: all frozen facts from `shared/content/facts.json` correct; every claim in the claims register presented with its required qualifier.

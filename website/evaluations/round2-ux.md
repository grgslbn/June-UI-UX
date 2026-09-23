# Round 2 — UX evaluation (final site: C + borrowings)

Evaluator: UX evaluator. I did not build this site.
Site: `website/variants/final/dist`.
Method: the same as round 1 (`round1-ux.md`). I served `dist/` locally and drove it with Playwright/Chromium at 1280, 390, 360 and 320 px, in NL and FR. I ran axe-core (WCAG 2.2 AA + best-practice) on all 12 routes.
Tests run:
- 5-second test of the home page, desktop and mobile
- objection walk on 6 page types, including collapsed FAQ answers
- navigation: NL↔FR on every route, and mid-funnel after a reload
- sign-up keyboard-only in FR on mobile
- sign-up with the mouse in NL, prefilled with `?postcode=2000&plan=premium` and an analogue meter; empty and invalid submits; browser Back, Forward and reload
- accessibility probe: landmarks, skip link, target sizes, reduced motion, and focus hidden by the sticky bar over full Tab cycles on 7 pages

Scripts are in `evaluations/scratch/ux/r2/` and `kb2.mjs`. `check.md` reports 0 hard-gate failures and Lighthouse accessibility 100 on every route.

## Scores

| | 5-sec clarity (7) | Nav & IA (4) | Objections (6) | Mobile (4) | A11y (4) | **UX /5** |
|---|---|---|---|---|---|---|
| C · round 1 | 4.5 | 4.0 | 4.5 | 4.0 | 4.5 | **4.34** |
| **Final · round 2** | **4.5** | **4.5** | **4.5** | **4.5** | **4.5** | **4.50** |

Weights as in the rubric. UX subtotal = Σ(score × weight)/25.

**Why no criterion reaches 5:**
- **5-second clarity:** on phones, the primary CTA is no longer in the first screen. This is a regression (R1 below).
- **Objections:** a prospect still has no human contact channel.
- **Mobile:** same CTA regression as above.
- **Accessibility:** the footnote hit areas are still small, and no real screen-reader session has been run.

---

## 5-second test

**Desktop (NL and FR), above the fold:**
- eyebrow "Onafhankelijk · geen energieleverancier"
- manifesto H1 with one squiggle under "Wij niet."
- subline "Jij betaalt ons, niet de leverancier … minstens elke maand"
- "gemiddeld € 326 per jaar¹"
- postcode field + CTA, with the microcopy "Vrijblijvend · 4 vragen · geen persoonsgegevens"
- 4,3/5 · 1.200+ reviews, 20.000+ klanten, "Zelfde meter, geen onderbreking"
- A's tile, now in C's type: "Aanbevolen · Switch Plus € 99 per jaar (€ 8,25/m, jaarlijks gefactureerd)", "Winstgarantie: € 99 terug als je in een abonnementsjaar niet meer bespaart dan je abonnement kost", "Elke maand gecontroleerd", "Automatisch, of pas na jouw akkoord"

Read as a first-time Belgian homeowner, the fold says: "Independent, not a supplier, I pay them. They check every month and switch automatically or with my OK. €99 a year, and I get €99 back if I don't save. My power doesn't stop." It answers all three brief questions and adds the approve-each-switch option. Desktop scores 5.

**Mobile (390):**
- The Q&A panel "Wat is June? Geen leverancier. / Wat kost het? € 69, € 99 of € 198 per jaar. / Wat als het tegenvalt? € 99 terug." now sits directly under the H1. That fixes the round-1 finding.
- **Regression:** the postcode field and CTA were pushed below the fold on every phone size tested:

| Viewport | Postcode field top, NL | Postcode field top, FR | Viewport height |
|---|---|---|---|
| 390×844 | 777 px | 828 px | 844 px |
| 360×740 | 778 px | 832 px | 740 px |
| 320×640 | 805 px | 832 px | 640 px |

  The sticky CTA only appears after the hero, and the mobile header has no CTA. So **the first mobile screen has no action at all**.

---

## Round-1 findings: verdicts

### C's round-1 issues
| # | Round-1 finding | Verdict | Evidence |
|---|---|---|---|
| 1 | Home mobile: three-answer panel below the fold | **Fixed** (but causes R1) | The panel sits directly under the H1 at 390 and 320. |
| 2 | Funnel header has only "Home"; FAQ has no contact block | **Partly** | Header now reads "Hulp nodig? · Veelgestelde vragen". The FAQ "Staat je vraag er niet bij?" block now has "Al klant? → via je account" and "Nog geen klant? → Zo werkt June / abonnementen". A prospect still has no email, phone or form (facts pending). |
| 3 | NL↔FR in the funnel loses the answers | **Fixed** | NL at `#abonnement` with postcode, household, meter and plan filled → FR link → `/fr-be/inscription/#abonnement` with postcode 2000, household 2, meter analogue, plan Switch Plus all kept. |
| 4 | Stale error summary on Back; "Stap 1 van 2" vs 3-step bar | **Fixed** | Label is now "Stap 1 van 3". After an error at step 3, browser Back shows a clean estimate. |
| 5 | Premium + analogue: "Dat houden we zo" | **Fixed** | The estimate recalculates against Switch Plus (net € 80–260, gross € 180–360 − € 99), explains that Premium needs the P1 port, and makes "Verder met Switch Plus" the primary button with "Toch Premium" secondary. The plan helper on Plans does the same ("Switch Plus past bij jou …"). |
| 6 | Sticky CTA hides focus; no analogue question in the Home FAQ | **Fixed** | Full Tab cycles on Home, Plans, Switch Plus, How it works and FAQ (NL and FR): **0 fully or partly hidden focus stops** (round 1: 3). The Home FAQ now has "Werkt June met mijn meter?" and "Kan ik mijn abonnement opzeggen?". |

### Issues that affected all variants in round 1
| Round-1 finding | Verdict | Evidence |
|---|---|---|
| Login dead or only in the mobile menu | **Fixed (interim)** | "Inloggen" goes to `https://www.june.energy/`. The mobile header has a 44×44 account icon. |
| No human contact or phone number | **Not fixed** (facts pending) | No phone number or support email anywhere. Customers are routed to their account. There is no bracketed placeholder any more. |
| Footnote superscript links 7–10 × 15 px | **Not fixed** | Still 7–10 × 15 on every content page. They pass SC 2.5.8 only under the inline exception. |
| Visible "TBC", bracket or "te bevestigen" text | **Fixed** | A grep of every route's `main` text found no placeholders. The cancellation answer uses safe interim wording (14 days' withdrawal; terms "altijd vóór je betaalt"). |
| Mobile menu has no Esc | **Fixed** | Esc closes the menu and focus returns to "Menu". |

### Patterns borrowed from A, B and E
| Pattern | Verdict |
|---|---|
| Postcode → town + grid operator (A) | **In place.** "2000 Antwerpen · Vlaanderen · netbeheerder Fluvius". For Liège it reads "généralement RESA", which is honest. |
| Focused error summary (A) combined with C's count | **In place.** "Nog 3 dingen om aan te vullen" receives focus and lists anchor links to the fields. Messages are specific (e.g. "Kies je type meter (of ‘Weet ik niet’)"). |
| Per-step URLs + reload safety (B) | **In place.** `#schatting`, `#abonnement` and `#confirmation` work with Back, Forward and reload. All answers survive a reload. |
| Ledger per plan (B) | **In place.** On Plans before an estimate there are no preset numbers. After a funnel estimate, Plans shows "Wat jij overhoudt · indicatief ≈ € 180–360 … Ons advies: Switch Plus". |
| Two-question plan helper (B/E) | **In place** on Plans, with a live result. |
| "Vraag het me eerst" as a real choice | **In place.** Nothing is preselected. Submitting without a choice gives a specific error. |

### Objection walk (NL + FR; ✓ = both languages)
| Objection | Home | Plans | Switch+ | How | FAQ | Sign-up |
|---|---|---|---|---|---|---|
| Supplier? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| How does June earn? | ✓ | ✓ | NL | – | ✓ | – |
| What if I don't save? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Power cut? | ✓ | ✓ | ✓ | ✓ | ✓ | FR |
| Exit fees? | ✓ | ✓ | ✓ | ✓ | ✓ | – |
| Analogue meter? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Can I cancel June? | ✓ | ✓ | ✓ | – | ✓ | 14 days' withdrawal shown |

This is complete coverage for the 7 objections. The only gap is human contact (objection #16, "is this a scam / can I call someone").

### Sign-up results
- **Keyboard only, FR, mobile:** completed with Tab, Space and Enter.
  - Focus moves to each step heading.
  - Every stop has a visible focus ring.
  - Chips are 52–72 px.
  - The confirmation keeps the chosen "Demandez-moi avant chaque changement".
- **Mouse, NL:**
  - Prefill arrives ("Gekozen abonnement: Premium").
  - Empty and invalid postcode give inline errors plus the focused summary.
  - The Premium + analogue conflict is resolved as described in finding 5 above.
  - Step 3 empty submit lists 3 specific errors.
- **No console errors** in any flow.

### Accessibility probe
- **Axe:** 0 violations on all 12 routes (round 1: `landmark-unique` on Plans).
- **Structure:** one `<main>` and an H1 inside main on every route. The skip link works.
- **Reduced motion:** the chart draw and tick animations stop, and static WebP icons are used.
- **Layout:** no horizontal overflow at 320 px on any route.
- **Sticky CTA:** on every content page, plan-specific on Plans and Switch Plus ("Switch Plus · € 99 per jaar … Kies Switch Plus"). It is hidden in the funnel and at the footer.

---

## New regressions
- **R1 (mobile, high): no CTA in the first screen of Home.** See the 5-second test above. The sticky bar is also hidden at the top, so a visitor must scroll before seeing any action. This breaks the brief rule "one primary CTA per view", and hurts ad traffic on mobile (about 70% of P1).
- **R2 (a11y, low): the "Hoe wil je wisselen?" error does not mark the radios invalid.** The fieldset references `pref-err` through `aria-describedby`, but neither the radios nor the group get `aria-invalid="true"`. Screen readers therefore don't announce the group as invalid when focus lands on it from the summary link.

## Remaining fixes (ranked)
1. **Home mobile hero (R1).** Show the sticky CTA bar from page load until the hero form scrolls into view, then hide it while the form is visible. Or compact the Q&A panel to three one-line rows ("Geen leverancier · € 69–198/jaar · € 99 terug") and move the subline below the form. Target: postcode field top ≤ 600 px at 390×844 and ≤ 520 px at 320×640.
2. **Human contact for prospects.** Add a contact email or form, and a phone number and hours once confirmed, to FAQ "Nog geen klant?", the funnel's "Hulp nodig?" and the footer. This is the P4 (60+) trust gap.
3. **Footnote hit areas.** Give `sup > a` padding plus a negative margin (≥ 24 × 24 px effective target) site-wide.
4. **`/aanmelden` step 3 preference error (R2).** Set `aria-invalid="true"` on the `pref` radios, or add `role="radiogroup" aria-invalid` on the fieldset, when the error shows. Remove it once a choice is made.
5. **FAQ search.** Add A's search with a live count and synonyms (opzeggen/stoppen/résilier; meter/compteur). The FAQ now has 15 questions.
6. **Screen-reader check before launch.** Run VoiceOver iOS in FR and NVDA in NL through the funnel, to confirm the live regions ("Nog N dingen…", region confirmation, plan warning) aren't announced twice.

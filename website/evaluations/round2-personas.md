# Round 2: simulated persona panel on the final site

**Site tested:** `website/variants/final/dist/` (C · Honest Market as the base, with borrowings), NL + FR
**Date:** 2026-09-23 · **Personas:** P1–P4 from `website/brief/ux-research.md` §1, with the same devices, languages and inputs as round 1 (`round1-personas.md`)

> **Read this first. This is simulated qualitative feedback, not user research.** The personas are one evaluator role-playing the desk-research archetypes, which are themselves assumptions [A]. The quotes are invented to make heuristic findings concrete. The 1–5 scores are one evaluator's judgement (n = 4 simulated personas) and cannot predict real comprehension, preference or conversion. This round checks whether the round-1 defects were fixed. It does not replace the 5–8 moderated sessions per language or the A/B tests in the brief.

---

## 1. Method

Same as round 1. The final `dist/` was served locally (`scratch/personas/serve-final.mjs`, port 4610). Each persona walked it in Playwright (`scratch/personas/walk-final.mjs`) at their own viewport and language:

- **P1:** NL, 390×844, touch
- **P2:** FR, 1440×900
- **P3:** NL, 1440×900
- **P4:** FR, 820×1180, touch

Each walk followed the same content path as round 1 and clicked a real CTA into the funnel. The persona filled in the same profile as in round 1 (P3 again entered 5.200 kWh) and reached the estimate. They then completed step 2 (plan, switching preference, email, terms) up to the confirmation screen. All four walks finished: the estimate took 2 forward clicks, and each ended on `#bevestigd` / `#confirmation`.

Evidence is in `website/evaluations/scratch/personas/r2/<persona>/final/`: screenshots of every step (fold and full page), visible text for every screen, and `log.txt`. Extra checks:

- `scratch/personas/metrics-final.mjs`: text size and tap-target size at 820 px
- `r2/fold.txt`: position of the hero submit button on mobile

**Round-1 fixes confirmed in the walk:**

- **Net-first estimate.** The large number is "wat je overhoudt" (net), with a breakdown underneath: gross, minus the fee, then net.
- **No recommendation that eats the saving.** P3, with solar, EV and heat pump, now gets **Switch Plus** recommended, with the line "Met Premium (€198) hou je naar schatting €0–110 over … Daarom raden we Switch Plus aan". A "Toch Premium" option remains.
- **Net figure on every plan card in step 2.** Example for P4: Switch 110–290 €, Switch Plus 80–260 €, Premium 0–160 € with "Nécessite un compteur numérique".
- **"Ask me first" is now an explicit choice.** It is listed first, with no default ("Demandez-moi avant chaque changement"). The confirmation screen repeats the choice.
- **"Stuur deze schatting door" / "Envoyer cette estimation à un proche"** now appears on the estimate.
- **No visible placeholders in any walked text.** No brackets, no "volgt" or "à venir", no "te valideren".
- **Step labels match the stepper** ("Stap 2 van 3").
- **Senior readability improved.** 9% of home text nodes are under 14 px at tablet width (C in round 1: 30%). The smallest tap target in the funnel is 56 px.

**Still true:**

- There is no `tel:` link or phone number anywhere.
- "Hulp nodig?" / "Besoin d'aide ?" goes to the FAQ.
- The FAQ's "Votre question n'y figure pas ?" block sends customers to their account. Non-customers are sent to "Comment fonctionne June".

---

## 2. Scorecards: final site vs each persona's round-1 favourite

| Persona | Round-1 pick | Round-1 scores (T / C / D / F) | **Final site (T / C / D / F)** | Mean R1 → final | Beats R1 pick? |
|---|---|---|---|---|---|
| P1 De Bespaarder | B · Savings First | 3 / 5 / 5 / 4 | **4 / 5 / 4 / 5** | 4,25 → **4,50** | **Yes, narrowly.** Wins on trust and finishing; still loses on desire to start |
| P2 Le Prudent | C · Honest Market | 5 / 5 / 4 / 5 | **5 / 5 / 4 / 5** | 4,75 → **4,75** | **Ties.** Better in step 2, but the company-identity and contact gaps hold it at the same score |
| P3 De Tech-liefhebber | C · Honest Market | 5 / 5 / 4 / 4 | **5 / 5 / 4 / 5** | 4,50 → **4,75** | **Yes.** The recommendation now follows the numbers |
| P4 La senior sceptique | A · Calm Confidence | 4 / 4 / 3 / 3 | **4 / 4 / 3 / 4** | 3,50 → **3,75** | **Yes, narrowly.** Capped by the missing phone number |

T = trust · C = clarity · D = desire to start · F = likelihood to finish step 2 (1–5).

### P1 · De Bespaarder: NL, mobile, from Google

*"Top of the screen: 'Energieleveranciers rekenen op je trouw. Wij niet.', then three lines: what is June, what does it cost (€69, €99 or €198 per year), and what if it disappoints (€99 back). That's the three things I wanted, in ten seconds. But I had to scroll to reach the button, because the postcode box sits right at the bottom edge of my phone. B had the calculator right there and a 'how much do you overpay' hook, and that pulled me in harder. The estimate is now exactly right: big '€80–260 per jaar, wat je overhoudt', then €180–360 minus €99. In step 2 every plan shows what I keep. Switch leaves me €110–290 and Switch Plus €80–260, so I can see I'm paying about €30 for the guarantee, and that's honest. Three steps and done. I'd finish, and I trust this more than B."* (`r2/p1/final/01-home-fold.png`, `07-after-0.png`)

### P2 · Le Prudent: FR, Brussels, desktop

*"Same serious tone I liked in C, and the recommended Switch Plus card with its guarantee now sits right next to the headline. In the estimate the net figure (140–380 €) comes first, the calculation is shown, and it recognised 'Bruxelles · Sibelga'. What really settles it: in step 2 I'm asked, with nothing pre-ticked, whether June should 'Demandez-moi avant chaque changement', and the confirmation repeats my choice. I can send the estimate to my wife before deciding. What's still missing is who you are. I found no company number, no address, no phone, and nothing on 'what if June goes bankrupt'. The FAQ tells customers to use their account, but I'm not a customer yet. I'd still finish step 2, because it costs nothing, but I'd look up the BCE number before paying."* (`r2/p2/final/01-home-fold.png`, `r2/p2/final/after-0.txt`)

### P3 · De Tech-liefhebber: NL, desktop, solar + EV + heat pump

*"This is the fix I wanted. It uses my 5.200 kWh and shows the assumptions, and instead of pushing Premium it says Premium would eat most of my saving, so it recommends Switch Plus, with a 'Toch Premium' option if I want the dongle. That's a company that isn't just upselling me. Step 2 shows net per plan, so I can decide myself. 'Wat we van je weten' is still the best privacy statement in the funnel. Still nothing on the HomeWizard I already own, and nothing on dynamic contracts, which matters with an EV and a heat pump. I'd finish with Switch Plus."* (`r2/p3/final/after-0.txt`)

### P4 · La senior sceptique: FR, Namur, tablet

*"Calmer than before and easier to read: the three lines 'Pas un fournisseur · 69, 99 ou 198 € · 99 € remboursés' say it plainly, and 'Votre électricité continue d'arriver' is right there. The questions were easy with my analogue meter, and the buttons are big. The first choice at the end is 'Demandez-moi avant chaque changement', which is what I want. And there's a button to send the estimate to a relative, so my daughter can look at it. But I still can't find a telephone number, and 'Besoin d'aide ?' only sends me to questions. I'd probably complete it with my daughter on the phone, not alone."* (`r2/p4/final/01-home-fold.png`, `r2/p4/final/step2.txt`)

---

## 3. Aggregate

Round-1 rows are copied from `round1-personas.md`.

| Site | Trust | Clarity | Desire to start | Finish step 2 | **Overall** |
|---|:-:|:-:|:-:|:-:|:-:|
| Round 1 · C Honest Market | 4,5 | 4,3 | 3,5 | 4,0 | 4,1 |
| Round 1 · A Calm Confidence | 4,0 | 4,0 | 3,8 | 3,8 | 3,9 |
| **Round 2 · final** | **4,5** | **4,8** | **3,8** | **4,8** | **4,4** |

**Verdict (simulated):** the final site is at least as good as every persona's round-1 favourite. It beats three of them, most clearly for P3, and ties P2's pick (C). The biggest gain is in step 2 completion (4,0 → 4,8), which comes from the net figure per plan, the explicit ask-first choice and the share option. "Desire to start" barely moves (3,8). The hero still has to win the first tap on mobile, and the missing human contact still holds back the two cautious personas.

---

## 4. Top 5 remaining issues and fixes

| # | Personas | Route | Issue | Fix |
|---|---|---|---|---|
| 1 | P4, P2 | all; `/fr-be/questions-frequentes/` "Votre question n'y figure pas ?" | No phone number or contact route for **prospects**. "Besoin d'aide ?" goes to the FAQ, and the FAQ sends non-customers to "Comment fonctionne June" | Add a prospect contact line: a phone number with opening hours [C] or, failing that, a monitored email or callback form, in the funnel header, the FAQ block and the footer. Say plainly if phone support does not exist |
| 2 | P2, P4 | footer, `/fr-be/`, `/nl-be/` | The placeholder is gone, but no company identity replaced it: no KBO/BCE number, no registered address | Put "June Energy [legal form] · KBO/BCE … · address" in the footer, and a short "Qui est June ?" link near the trust row [C] |
| 3 | P1 | `/nl-be/`, `/fr-be/` at 390×844 | The hero submit button starts at y ≈ 839 (NL) / 890 (FR), at or below the fold. The three-row "what / cost / guarantee" block pushes the postcode form down. No CTA is visible in the mobile header screenshot | On mobile, place the postcode form directly under the H1 and move the three-row block below it (or collapse it into one line). Keep a sticky "Bereken wat je overhoudt" bar after scroll |
| 4 | P3 | `/nl-be/abonnementen/`, `/nl-be/hoe-werkt-het/`, FAQ | Own P1 dongle (HomeWizard etc.) and dynamic contracts are still not mentioned (0 hits) | Add a plan-helper/FAQ row "Heb je al een P1-dongle?" → Switch Plus [C: support for own dongle], and a factual line on whether dynamic contracts are compared [C] |
| 5 | P2 | `/fr-be/questions-frequentes/` | No "Et si June fait faillite ?" answer. Regulator context is thin (one Brugel/CWaPE mention on the pages walked) | Add the FAQ answer ("votre contrat est chez le fournisseur et continue") and one regulator/ombudsman line per region on the FAQ page |

A lesser point: for P1, the recommended Switch Plus leaves less net than Switch (80–260 vs 110–290 €). The step-2 cards show this honestly. Add one line on the Switch Plus card, "≈ €30 more for the €99 guarantee", so the recommendation reads as insurance rather than an upsell.

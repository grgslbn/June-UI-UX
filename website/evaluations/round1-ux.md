# Round 1 — UX evaluation (A · B · C · E)

Evaluator: UX evaluator (senior UX researcher, Belgian consumer services, WCAG). I built none of these variants.
Scope: the five UX criteria in `brief/scoring-rubric.md` only: 5-second clarity (weight 7), Navigation & IA (4), Objection handling (6), Mobile experience (4), Accessibility (4).
Method: I served each `dist/` locally and drove it with Playwright (Chromium 1.56) at 1280×800/900 and 390×844 (touch, isMobile), NL and FR. I also ran axe-core (WCAG 2.2 AA + best-practice) on all 48 route × language pages at 390px and read `report/check.md` and the screenshots. Scripts and my own screenshots are in `evaluations/scratch/ux/` (`fold.mjs`, `kb.mjs`, `mouse.mjs`, `a11y.mjs`, `obsc.mjs`, `menu.mjs`, `lsw.mjs`, …).
Tests run on each variant:
1. **5-second test.** Above-the-fold screenshot and text dump of the NL and FR home, desktop and mobile.
2. **Objection walk.** I looked for the 7 objections on 6 page types, NL and FR, including collapsed FAQ answers.
3. **Navigation tasks.** Reach plans, FAQ and login. Switch NL↔FR on all 12 routes, including a filled-in funnel. Open the mobile menu by keyboard, then Esc.
4. **Sign-up.** FR on mobile with keyboard only (Tab / Space / Enter). NL on desktop with the mouse, including empty and invalid submits, the in-app Back button, browser Back, reload, and prefill via `?postcode=2000&plan=premium` with an analogue meter.
5. **Accessibility probe.** Axe; landmarks and H1 placement; skip link; target sizes; `prefers-reduced-motion`; focus visibility; focus hidden behind sticky UI (WCAG 2.4.11); language of parts.

Every variant passes the automated hard gates (`check.md`: 0 failures, Lighthouse a11y 99–100). The differences below come from interaction testing, which Lighthouse doesn't cover.

---

## Summary

| Variant | 5-sec clarity (7) | Nav & IA (4) | Objections (6) | Mobile (4) | A11y (4) | **UX subtotal /5** |
|---|---|---|---|---|---|---|
| **A · Calm Confidence** | 4.5 | 4.0 | 4.0 | 4.0 | 4.0 | **4.14** |
| **B · Savings First** | 3.5 | 4.0 | 3.5 | 4.0 | 4.0 | **3.74** |
| **C · Honest Market** | 4.5 | 4.0 | 4.5 | 4.0 | 4.5 | **4.34** |
| **E · Bold June** | 3.5 | 3.5 | 4.0 | 3.5 | 3.0 | **3.54** |

Subtotal = Σ(score × weight) / 25.
**Ranking on UX:** C > A > B > E. C and A clear 4.0 on UX. B misses because of clarity and objections, and E misses on four of the five criteria.

### Issues shared by all variants (fix once, in the shared layer)
- **The sticky mobile CTA bar hides keyboard focus (WCAG 2.2 SC 2.4.11, AA).** Over one full Tab cycle at 390px, the focused element ended up fully or partly under the bottom bar: A 3×, B 2×, C 3×, E 5× (E on FR Plans: "Choisir Switch", "Choisir Premium", "Toutes les questions" fully hidden). Fix: `html{scroll-padding-bottom: calc(var(--sticky-h) + 16px); scroll-padding-top: var(--header-h)}` and `scroll-margin` on `summary`/`a`/`button`.
- **Login is a dead link in 3 of 4 variants** (A `#`, B `#inloggen`, E `#login`; C goes to `https://www.june.energy/`). On mobile, login appears only inside the menu. Brief §4.3 asks for an account icon in the mobile header.
- **No visible human contact** (phone number or hours) on any decision page. There are placeholders, e.g. A `[telefoonnummer en openingsuren]`, B "telefoon, e-mail en openingsuren volgen". This matters most for persona P4 (60+).
- **Footnote superscript links are 9–13 × 15 px.** They pass SC 2.5.8 only under the inline exception. Wrapping them in a ≥24px hit area (padding plus negative margin) is cheap.

---

## A · Calm Confidence — 4.14

### 5-second test (4.5)
- **Desktop NL/FR, above the fold:** eyebrow "Geen energieleverancier. Wij werken voor jou." · H1 "Altijd het juiste energiecontract. Zonder er nog aan te denken." · subline "17+ leveranciers … minstens elke maand … automatisch, of pas na jouw akkoord" · postcode + CTA · 4,3/5 and 20.000+ · check chips "Je stroom blijft gewoon komen · Zelfde meter · Geen verbrekingsvergoeding". A proof card shows "Klanten besparen gemiddeld €326 · Switch Plus €99 per jaar (€8,25/m) · Winstgarantie €99 terug".
- **What a first-time Belgian homeowner would say:** "It isn't my supplier. It checks contracts every month and switches me. It costs about €99 a year, and I get that back if I don't save. My power keeps coming." All three brief questions (what it is, cost, risk) are answered.
- **Mobile:** what June is and what it risks are both in the fold (eyebrow and chips). The cost (€99) and the guarantee only appear at about y≈1200px, one screen down. The eyebrow is 13px grey-on-tint text: it carries the most important message but is easy to overlook.

### Objection coverage (NL + FR; ✓ = both languages)
| Objection | Home | Plans | Switch+ | How | FAQ | Sign-up |
|---|---|---|---|---|---|---|
| Supplier? | ✓ | ✓ | – | ✓ | ✓ | ✓ |
| How does June earn? | ✓ FAQ | ✓ block | NL | – | ✓ | – |
| What if I don't save? | ✓ | ✓ | ✓ | – | ✓ | ✓ |
| Power cut? | ✓ | – | – | ✓ | ✓ | ✓ |
| Exit fees? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Analogue meter? | ✓ | ✓ helper | ✓ | ✓ | ✓ | ✓ |
| Can I cancel June? | – | – | – | – | – | – |

**Gap:** there is no answer anywhere to "can I cancel my June subscription?". FAQ search for "résilier" returns "Aucune question trouvée".

### Sign-up (3 steps: home → estimate → plan + email)
- **Handover:** hero postcode arrives prefilled (`?postcode=4000&entry=home-hero`), with a town and grid-operator confirmation: "✓ 4000 Liège · Wallonie · gestionnaire de réseau ORES ou RESA". Best of the four.
- **Errors:** an error summary gets focus, the invalid field has `aria-invalid`, and messages are in plain words ("Een Belgische postcode heeft 4 cijfers, bv. 9000."). The meter and solar errors are both just "Maak een keuze." The summary therefore reads "Maak een keuze. Maak een keuze.", which is ambiguous.
- **Back and persistence:** in-app Back and browser Back both keep the data, and it survives a reload.
- **Keyboard (FR, mobile):** completed with Tab/Space/Enter only. Focus moves to each new step heading. All controls show a visible focus ring. Chips are 48px.
- **Plan prefill:** `plan=premium` with an analogue meter still produces "Verder met Premium" on the estimate. The estimate also computes the net figure against Premium (€2–€102) while recommending Switch Plus. The analogue/Premium conflict is only flagged at step 3.
- **Language switch** in the funnel carries postcode and plan, but not the household answers.

### Accessibility
- **Good:** skip link, one `<main>`, H1 inside main, labelled forms, error summary, reduced motion handled (static WebP icons, no count-up).
- **Axe:** heading-order on Plans (`#plan-switch-full`) and a duplicate unlabelled landmark on the FAQ hero (`.phero`).
- **Mobile menu:** a `<details>` dropdown. Esc does not close it, and focus runs on into the page while it stays open.
- **Sticky bar** hides the focused FAQ summaries and "Alle vragen" (2.4.11).

### Top 6 issues → fixes
1. **All routes: no cancellation answer.** Add FAQ "Kan ik mijn abonnement opzeggen? / Puis-je résilier mon abonnement ?" to the FAQ "Prijs en abonnement" group, the Home FAQ (replacing "Wisselt June zonder dat ik het weet?", which How-it-works already covers), and a one-line microcopy under each price on `/abonnementen`.
2. **`/aanmelden` estimate: plan conflict.** When `meter=analog` and `plan=premium`, compute the net against Switch Plus, change the primary button to "Verder met Switch Plus", and show "Premium vraagt een digitale meter" on the estimate itself, not only at step 3.
3. **Global: sticky CTA hides focus.** Add `scroll-padding-bottom` (see shared issues).
4. **`/aanmelden` step 1: identical error messages.** Make the meter and solar messages specific: "Kies je type meter (of 'Weet ik niet')." / "Laat weten of je zonnepanelen hebt."
5. **Home mobile hero: no cost in the fold.** Add "vanaf € 5,75/maand · € 99 terug-garantie" to the microcopy line under the CTA ("Voor de netkosten in jouw regio. Vrijblijvend."), and raise the eyebrow to 15px with ink colour.
6. **Header menu (`<details>`): no Esc.** Add an Esc handler and return focus to the summary. Also add a person icon for login to the mobile header bar.

---

## B · Savings First — 3.74

### 5-second test (3.5)
- **Desktop:** rating line · H1 "Hoeveel betaal jij te veel? Reken het uit in 30 seconden." · subline "June is geen leverancier. We vergelijken elke maand … Je stroom en gas blijven gewoon lopen." · calculator (postcode, housing type, energy) · dark result card "≈ € 90 – 290 per jaar, na je abonnement", with "Abonnement Switch Plus − € 99".
- **What a first-time Belgian homeowner would say:** "It's a calculator that says I overpay; June isn't a supplier." They know what June is (from the subline) and the net saving. They don't see the guarantee, and don't know what can go wrong or that June is a subscription, until they read the result card line.
- **Why 3.5:** the H1 is a question that doesn't say what June does. The whole explanation sits in the 16px subline.
- **Mobile:** the fold is H1, subline and a form (postcode, housing type). There is no CTA button, no price and no guarantee in the first screen. The result card starts at about y≈1000px.

### Objection coverage
| Objection | Home | Plans | Switch+ | How | FAQ | Sign-up |
|---|---|---|---|---|---|---|
| Supplier? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| How does June earn? | ✓ *tagged "te bevestigen"* | ✓ *tagged* | NL | – | **–** | – |
| What if I don't save? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Power cut? | ✓ FAQ | – | – | ✓ | ✓ | ✓ |
| Exit fees? | ✓ | ✓ | ✓ | ✓ | ✓ | – |
| Analogue meter? | ✓ | ✓ helper | ✓ | ✓ | ✓ | ✓ |
| Can I cancel June? | – | ✓ *"opzeg- en verlengingsregels te bevestigen"* | – | – | ✓ (inside "Wat kost June?") | – |

- The FAQ page has **no "Hoe verdient June geld?" question**, which is the #2 objection.
- On Home and Plans, the business-model block shows a visible **"te bevestigen / à confirmer" badge under the heading**. A sceptic reads that as "they don't know how they make money".
- FAQ search for "résilier" returns "0 question trouvée".

### Sign-up (4 steps: home → meter & extras → estimate → plan + email)
- **Best overall funnel mechanics:**
  - Each step is its own hash state (`#stap-2` … `#klaar`), so browser Back works.
  - The data survives a reload.
  - The **NL↔FR switch carries the whole state**, e.g. `/fr-be/inscription/?postcode=2000&woning=semi&energie=both&plan=premium`. It is the only variant that does.
- **Errors:** a focused error summary ("Kijk deze velden even na:") plus inline messages and `aria-invalid`.
- **Keyboard (FR, mobile):** completed. Focus goes to each step heading.
- **Plan prefill:** `plan=premium` with an analogue meter continues as "Verder met Premium" with a net of "€ 0 – 190", while the recommendation says Switch Plus. The warning only appears at step 4.
- **Postcode confirmation** only shows the region ("✓ Vlaanderen"), not the town or grid operator.
- **Estimate:** electricity and gas ranges don't change with the postcode or household. That is honest, since the estimate is labelled "illustratief", but it is visibly generic.
- **Hero result card on Home** shows a number before the user has entered anything ("Voorbeeld · Rijwoning"). That's acceptable because it is labelled.

### Accessibility
- **Cleanest axe result:** only `landmark-unique` on the FAQ hero.
- **Mobile menu:** a popover with a close button, Esc and light dismiss.
- **Sticky bar** hides FAQ summaries.
- **Small issue:** the method button in the estimate shows "≈" but its accessible name is "Hoe berekenen we dit?". That's acceptable, but give it a visible label.
- **Inconsistent CTA destination:** the same "Bereken je besparing" label goes to `/nl-be/#bereken` in one place on `/abonnementen` and to `/nl-be/aanmelden/` elsewhere.

### Top 6 issues → fixes
1. **Home hero: H1 doesn't say what June is.** Keep the question, but make the subline the first line of a two-line H1 block. Or change the eyebrow to "Geen leverancier · jouw vaste overstapdienst" in 15px ink. Add "Winstgarantie: € 99 terug" as a row in the result card.
2. **FAQ: add "Hoe verdient June geld? / Comment June gagne-t-elle sa vie ?"** to "Over June", and remove the visible "te bevestigen" badge from the Home and Plans business-model blocks. Keep the TBC in a code comment or footnote, not as a UI tag.
3. **Home mobile: no CTA in the fold.** Collapse the calculator to postcode + a CTA button in the first screen, then reveal housing type and energy inline after the postcode is valid. Put "vanaf € 5,75/m · € 99 terug-garantie" under it.
4. **`/aanmelden` step 3: plan conflict.** When analogue + `plan=premium`, switch the primary button to the recommended plan and compute the net against it. Show the Premium/digital-meter warning here, not only at step 4.
5. **`/abonnementen`: cancellation copy.** Replace "opzeg- en verlengingsregels te bevestigen" with the safe interim wording ("Je hebt 14 dagen bedenktijd. De opzegregels staan in onze algemene voorwaarden."), and make FAQ search match "opzeggen / résilier".
6. **Global CTA consistency:** point every "Bereken je besparing" outside Home to `/aanmelden/` (not `/#bereken`). Add `scroll-padding-bottom` for the sticky bar.

---

## C · Honest Market — 4.34

### 5-second test (4.5)
- **Desktop:** eyebrow "ONAFHANKELIJK · GEEN ENERGIELEVERANCIER" · H1 "Energieleveranciers rekenen op je trouw. Wij niet." · subline "Jij betaalt ons, niet de leverancier … minstens elke maand … De overstap regelen wij." · "gemiddeld € 326 per jaar¹" · postcode + CTA ("Daarna 4 vragen, geen persoonsgegevens").
- **Right-hand panel** answers the brief's three questions as literal Q&A:
  - "Wat is June? Geen leverancier. … je stroom en gas blijven gewoon lopen"
  - "Wat kost het? € 69, € 99 of € 198 per jaar"
  - "Wat als het tegenvalt? € 99 terug."
- **What a first-time Belgian homeowner would say:** "An independent service I pay, not a supplier. It checks every month and switches me. €69–198 a year. €99 back if it doesn't pay off." This is the most complete answer of the four.
- **Mobile:** the H1 alone could be misread as a supplier's claim, but the eyebrow and subline fix that. The Q&A panel and power-continuity line only appear in the second screen (y≈900–1200).

### Objection coverage
| Objection | Home | Plans | Switch+ | How | FAQ | Sign-up |
|---|---|---|---|---|---|---|
| Supplier? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| How does June earn? | ✓ section "Wie betaalt June? Jij." | ✓ section | NL | – | ✓ | FR |
| What if I don't save? | ✓ conditions block | ✓ | ✓ | ✓ | ✓ | ✓ |
| Power cut? | ✓ | ✓ | ✓ | ✓ | ✓ | FR |
| Exit fees? | ✓ | ✓ | ✓ | ✓ | ✓ | – |
| Analogue meter? | ✓ (1×, no Home FAQ) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Can I cancel June? | – | ✓ | ✓ | – | ✓ (tagged "WORDT BEVESTIGD") | – (14 days' withdrawal shown) |

This is the strongest coverage of the four. There is also a region FAQ and a capacity-tariff FAQ. The Home FAQ (4 questions) lacks the analogue-meter question.

### Sign-up (step 1 → estimate → plan + email, with a "Wat we van je weten" summary rail)
- **Estimate transparency is the best of the four.** It shows:
  - the gross range
  - the net after Premium **and** the net after Switch Plus
  - the assumed kWh
  - a full "Hoe we dit berekenden" method
- **Errors:** a live count ("Nog 3 dingen om aan te vullen: postcode, gezinsgrootte, meter."), focus on the first invalid field, and `aria-invalid`.
- **Back:** browser Back walks back through the steps (hash states) and keeps the answers.
- **Plan conflict:** with `plan=premium` + analogue, the page says "Je koos Premium. Dat houden we zo" and warns about the digital meter at step 2. That's acceptable, but the recommendation should win.
- **Step count doesn't match:** the label says "Stap 1 van 2" while the progress bar shows 3 steps.
- **Stale error summary:** after an email error on step 2, going Back leaves "Nog 2 dingen om aan te vullen: e-mailadres, algemene voorwaarden." visible on the estimate step.
- **Language switch** drops everything, including the `?postcode=&plan=` query.
- **Funnel header** has only "Home". There is no help or FAQ link.

### Accessibility
- **Best keyboard behaviour on the site chrome:** the mobile menu closes on Esc and focus returns to "Menu".
- **Structure:** landmarks correct. The only axe finding is `landmark-unique` on `#vergelijk` (Plans).
- **Reduced motion:** no motion at all under `reduce`.
- **Sticky bar** hides 3 focus stops on Home ("Vergelijk de abonnementen", "Alle eerlijke antwoorden").
- **Header nav has 5 items** (Winstgarantie added). That's within the checklist's ≤5, but tight in FR at 1280.

### Top 6 issues → fixes
1. **Home mobile: the three-answer panel is below the fold.** On <700px, move the "Wat is June / Wat kost het / Wat als het tegenvalt" list directly under the H1 as a compact 3-row list. Move the market chart below the CTA.
2. **`/aanmelden`: no help in the funnel header.** Add "Hulp nodig? Veelgestelde vragen" (and the phone number when confirmed) to the minimal header. Add a contact block to FAQ "Staat je vraag er niet bij?", which currently links only to How it works.
3. **`/aanmelden` language switch loses data.** Carry `postcode, energy, household, meter, extras, plan` in the FR/NL link, as B does, or keep them in `sessionStorage`.
4. **`/aanmelden`: stale error summary and step count.** Clear the error summary when leaving a step. Change "Stap 1 van 2" to "Stap 1 van 3" to match the progress bar.
5. **Estimate: plan conflict.** When analogue + Premium, make Switch Plus the primary button and keep Premium as a secondary "Toch Premium (binnenkort digitale meter)".
6. **Global:** add `scroll-padding-bottom` for the sticky bar. Add "Werkt June met een analoge meter?" to the Home FAQ (the brief's 5-question set).

---

## E · Bold June — 3.54

### 5-second test (3.5)
- **Desktop:** eyebrow "AUTOMATISCH WISSELEN VAN ENERGIELEVERANCIER" · H1 "Je had energie. Nu heb je power." · paragraph "June is geen leverancier. Elke maand vergelijken we 17+ … Je stroom blijft gewoon lopen. Klanten besparen gemiddeld € 326" · postcode + CTA · "Gratis schatting · Geen verplichtingen · Geen onderbreking" · rating row at the fold edge.
- **What a first-time Belgian homeowner would say:** "A bold brand. It switches supplier automatically. Maybe free?" There is **no price and no guarantee above the fold** on desktop or mobile ("Gratis schatting" even hints that it's free). The H1 carries no information. The meaning depends on reading the paragraph.
- **Mobile:** H1 is 5 lines in FR ("Vous aviez de l'énergie. Maintenant, vous avez le pouvoir."), and the paragraph pushes the CTA to the fold edge.

### Objection coverage
| Objection | Home | Plans | Switch+ | How | FAQ | Sign-up |
|---|---|---|---|---|---|---|
| Supplier? | ✓ | ✓ | – | – | ✓ | ✓ |
| How does June earn? | ✓ FAQ | ✓ section | – | – | ✓ | – |
| What if I don't save? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Power cut? | ✓ | – | – | ✓ | ✓ | – |
| Exit fees? | ✓ | ✓ | – | ✓ | ✓ | – |
| Analogue meter? | ✓ | ✓ helper | ✓ | ✓ | ✓ | ✓ ("Premium werkt alleen met een digitale meter") |
| Can I cancel June? | ✓ Home FAQ | ✓ | ✓ | – | ✓ own category | – |

Good coverage, and E is the only variant with the cancel question on Home. But the answer reads **"Ja. Opzegregels en verlenging invullen na bevestiging."**, a content-team instruction shipped as customer copy. The footer also shows "TBC · periode / aantal / KBO-nummer en adres" badges.

### Sign-up (step 1 → estimate → plan + email)
- **Errors:** inline messages with a count ("Er zijn 2 velden om na te kijken."), focus on the first invalid field, and `aria-invalid`.
- **Home hero postcode has no custom validation.** It uses the browser's native bubble, in the browser language ("Please match the requested format."), with no `aria-invalid` and no persistent message.
- **Prefill:** `plan=premium` arrives at step 2. The analogue warning appears at step 2 ("Je gaf aan dat je een analoge meter hebt …"). The estimate still offers "Verder met Premium" under "Ons voorstel: Switch Plus".
- **Back:** browser Back works. **A reload loses the household answers.** The **language switch loses everything**, including the query.
- **Keyboard (FR, mobile):** completed. The plan and preference radios are 20px dots inside larger cards. That's acceptable because the card is the label.

### Accessibility
- **The hero (H1 and postcode form) sits outside `<main>` on 10 of 12 pages.** It is inside `div.field-top`, and the accessibility tree places the H1 inside the **banner** landmark. The skip link "Naar de inhoud" (`#main`) therefore jumps **past the H1 and the primary form**, and landmark navigation finds no H1 in main.
- **Hero form** uses native validation, so errors aren't announced consistently and aren't localised.
- **Language of parts:** the NL page's FR link has `lang="fr"` with a Dutch `aria-label` ("Lees deze pagina in het Frans"), so it is spoken with a French voice.
- **Mobile menu (`<details>`):** Esc doesn't close it.
- **Endless "breathe" animation** on the character. `reduce` is respected, but there is no pause control.
- **Plans comparison table scrolls horizontally at 390px** (640/353px; the scroller does have `tabindex=0 role=region`).
- **Sticky bar:** hides 5 focus stops, the worst of the four, and stays visible over the footer.
- **Axe:** `landmark-unique` on 3 pages.

### Top 6 issues → fixes
1. **All content pages: hero outside main.** Move the hero `<section>` (H1 + postcode form) out of `div.field-top`/banner into `<main id="main">`. Keep the green field as a background on `main > section:first-child`.
2. **Home hero: nothing about price or guarantee.** Replace the chip line "Gratis schatting · Geen verplichtingen · Geen onderbreking" with "Vanaf € 5,75/maand · € 99 terug als je niet bespaart · Geen onderbreking". Keep "Automatisch wisselen van energieleverancier" but render it at ≥18px as a real subtitle, not an eyebrow.
3. **Home hero form: native validation.** Add `novalidate` and reuse the funnel's inline error (`aria-invalid`, `aria-describedby`, localised text "Vul een Belgische postcode van 4 cijfers in").
4. **FAQ / Home / footer: shipped placeholders.** Replace "Opzegregels en verlenging invullen na bevestiging" with the safe interim wording ("Ja. Je hebt 14 dagen bedenktijd; de opzegregels staan in onze algemene voorwaarden."). Hide the "TBC" badges in production builds.
5. **`/abonnementen` mobile table:** below 600px, turn the 640px table into three stacked plan cards with grouped rows, or `<details>` per group. No horizontal scroll.
6. **`/aanmelden` state and sticky bar:** persist step-1 answers in `sessionStorage`, carry them through the language switch, hide the sticky CTA when the footer is in view, and add `scroll-padding-bottom`.

---

## Cross-variant best patterns (merge into the winner)

| Pattern | Best in | Why |
|---|---|---|
| Hero three-question panel "Wat is June? / Wat kost het? / Wat als het tegenvalt?" | **C** (desktop) | Literally answers the brief's 5-second test. On mobile, place it directly under the H1. |
| Proof card: fee + guarantee as numbers beside the hero | **A** | Shows cost and risk in the fold without extra text. |
| Postcode confirmation with town + region + grid operator ("✓ 4000 Liège · Wallonie · ORES ou RESA") | **A** (C similar) | Proves the postcode was understood and helps FR/Brussels visitors. |
| Estimate that shows net for **both** Premium and Switch Plus, plus assumed kWh and the method | **C** | The most credible estimate. Avoids the "€2–102 net with Premium" trap in A and B. |
| "Wat we van je weten" live summary rail | **C** | Privacy reassurance plus a progress memory for P2/P4. |
| Language switch carries the full funnel state in the URL | **B** | The only variant where NL↔FR mid-funnel loses nothing. |
| Hash state per funnel step + persistence across reload | **B** (A persists too) | Browser Back and reload are safe. |
| Error summary that receives focus | **A, B** | Stronger for screen readers than focusing the first field when several errors occur. Combine with C's live count ("Nog 3 dingen …"). |
| Mobile menu: Esc closes and focus returns to the trigger | **C** (B popover has an explicit close button) | Apply to A and E. |
| FAQ with search + live result count | **A** ("Aucune question trouvée … contactez-nous") | Add a synonym map (opzeggen/stoppen/résilier). |
| Business-model section "Wie betaalt June? Jij." | **C** | The best answer to the #2 objection. Show it on Home, not only in the FAQ. |
| "Abonnement & opzeggen" FAQ category + cancel question on Home | **E** | The only variant that asks the question on Home. Needs real copy. |
| 2-question plan helper on Plans (digital meter? solar?) | **B, E** | Routes analogue homes away from Premium early. |

## Scoring rationale for scores ≤ 3.5 (per rubric)
- **B 5-sec 3.5:** the H1 doesn't state what June is. Cost and guarantee are missing from the fold, and the mobile fold has no CTA. Fix: B issues #1 and #3.
- **B objections 3.5:** no earn-money FAQ, a visible "te bevestigen" badge on the business model, and no cancellation copy. Fix: B #2 and #5.
- **E 5-sec 3.5:** the tagline H1 carries no information, and there is no price or guarantee above the fold ("Gratis schatting" is misleading). Fix: E #2.
- **E nav 3.5:** the language switch loses funnel state, the Plans table scrolls horizontally, the menu has no Esc, and the sticky CTA covers the footer. Fix: E #5, #6, plus Esc handling.
- **E mobile 3.5:** horizontal table, sticky bar over the footer and hiding focus, English native-validation bubble in the hero. Fix: E #3, #5, #6.
- **E a11y 3.0:** H1 and primary form outside `<main>` (inside the banner), which the skip link bypasses; non-localised native validation; lang/label mismatch; focus hidden behind the sticky bar. Fix: E #1, #3, plus the shared scroll-padding.

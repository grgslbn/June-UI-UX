# Round 1: simulated persona panel

**Variants tested:** A · Calm Confidence, B · Savings First, C · Honest Market, E · Bold June (built `dist/`, NL + FR)
**Date:** 2026-09-23 · **Personas:** P1–P4 from `website/brief/ux-research.md` §1

> **Read this first. This is simulated qualitative feedback, not user research.** The "personas" are an evaluator role-playing the desk-research archetypes in `ux-research.md`, which are themselves assumptions [A]. The quotes are invented to make heuristic findings concrete. They cannot tell you real preference, real comprehension or real conversion. Use this panel to pick hypotheses and fix obvious defects. It does not replace the 5–8 moderated sessions per language that the research brief asks for, or an A/B test. Scores are one evaluator's judgement on a 1–5 scale and are not statistically meaningful.

---

## 1. Method

- Each variant's `dist/` was served locally (`scratch/personas/serve.mjs`, ports 4601–4605). Each persona walked each variant with Playwright (`scratch/personas/walk.mjs`) at their device width and in their language. They followed a realistic path, clicked a real CTA into the funnel, filled in step 1 with their own profile, reached the estimate, and then completed step 2 (plan, preference, email, terms) through to the confirmation screen.
- **Screenshots** (250 in total, fold and full page for every step) and the visible text of every screen are in `website/evaluations/scratch/personas/<persona>/<variant>/`. `log.txt` records the CTA used, the forward clicks and the preselected plan. Extra captures: `p2/a/00-home-at-5s.png` (the A hero after its count-up) and `metrics.txt` (text sizes and tap-target heights at tablet width).

| Persona | Device / viewport | Lang | Path walked | Funnel input |
|---|---|---|---|---|
| **P1 De Bespaarder** (Saver) | mobile 390×844, touch | NL | Home (as Google landing) → Abonnementen → CTA | 9000 Gent · elec+gas · 2 pers (B: rijwoning) · meter "weet ik niet" · no solar · auto |
| **P2 Le Prudent** (risk-averse) | desktop 1440×900 | FR | Home → Abonnements → Switch Plus → FAQ → CTA | 1050 Ixelles · elec+gas · 3–4 pers · analogue · no solar · **"Demandez-moi d'abord"** |
| **P3 De Tech-liefhebber** | desktop 1440×900 | NL | Home → Hoe werkt het → Abonnementen → CTA | 2800 Mechelen · elec only · 3–4 pers + **5.200 kWh** entered · digital · solar + EV + heat pump · auto |
| **P4 La senior sceptique** | tablet 820×1180, touch | FR | Home → Comment ça marche → FAQ → CTA | 5000 Namur · elec+gas · 2 pers (B: 4 façades) · analogue · no solar · **"Demandez-moi d'abord"** |

**Scoring (1–5):** **Trust** (would I believe and hand over my contract?) · **Clarity** (do I understand what June is, what it costs net and what happens next?) · **Desire to start** (would I type my postcode?) · **Finish step 2** (having seen the estimate, would I pick a plan and leave my email?).

**What the walk-through confirmed mechanically:** all 16 persona × variant flows reach the estimate in 2 forward clicks (B: 3, because it has a four-step funnel) and end on a "check your mailbox" / "Top!" confirmation. The plan carries over from a plan-card CTA (`?plan=switch`) in A and C. The recommendation logic works: Switch Plus by default, Premium for digital meter + solar. **No variant has a `tel:` link or a real phone number on any page walked.** The FR FAQs show placeholders ("Appelez-nous : [numéro de téléphone et horaires]").

---

## 2. Scorecards per persona

### P1 · De Bespaarder: NL, mobile, from Google "energieleverancier vergelijken"

| Variant | Trust | Clarity | Desire to start | Finish step 2 |
|---|:-:|:-:|:-:|:-:|
| A · Calm Confidence | 4 | 4 | 4 | 4 |
| **B · Savings First** | 3 | **5** | **5** | 4 |
| C · Honest Market | 4 | 4 | 3 | 4 |
| E · Bold June | 3 | 3 | 4 | 3 |

**A.** *"First five seconds: 'Altijd het juiste energiecontract. Zonder er nog aan te denken.' Fine, but I googled to compare prices and I don't see a single euro on my screen. Not a supplier, 4,3 on Google, postcode field: that's clear and calm. I tapped 'Kies Switch' on the plans page because it's the cheapest. The estimate said €200–300, and underneath '± €131–231 after Switch'. That's the number I actually care about, so good that it's there, but it's in smaller type than the gross number. Then it recommends Switch Plus 'met winstgarantie' although I picked Switch. Honestly that made me think for a second, but €99 back if it doesn't pay off is fair. I'd finish. The only thing slowing me down is that the net figure should be the big one."* (`p1/a/07-after-0.png`)

**B.** *"'Hoeveel betaal jij te veel? Reken het uit in 30 seconden.' That's literally my search. The calculator is right there on the home page, I don't even need to scroll. On mobile it's four screens, one more than I'd like, but each one is just taps. The result card is what sold me: electricity €90–180, gas €100–210, minus €99 Switch Plus, ≈ €90–290 net. I can do that sum myself. 'Indicatief · illustratief' with a footnote 6 is a bit lawyer-ish, and the headline is a little pushy, but this is the one that talks euros. I'd finish step 2. This one was made for me."* (`p1/b/09-after-1.png`)

**C.** *"'Energieleveranciers rekenen op je trouw. Wij niet.' Clever, I had to read it twice. I like '€326 gemiddeld' right in the hero, and on the plans page I finally see all three prices without hunting. The estimate is really honest: €180–360 before, €110–290 after Switch, and it even tells me it assumed 2.800 kWh. On my phone the 'Hoe we dit berekenden' block is a wall of text I scrolled past. The stepper shows three steps but the label says 'Stap 1 van 2', which confused me briefly. I'd finish, but it didn't make me *want* to start as much as B did."* (`p1/c/07-after-0.png`)

**E.** *"Big green screen, 'Je had energie. Nu heb je power.' Fun, a bit Coolblue. I get that it's not a supplier from the paragraph below. The estimate says €170–340 per year, big and bold, but doesn't subtract the €99, so I'm now suspicious the number is inflated. Then right under 'Verder met Switch Plus' it says 'Gratis · Geen verplichtingen'. Gratis? You just told me it costs €99 a year. That's exactly the catch I was afraid of. I'd probably still type my email to keep the estimate, but I'd go and check V-test first."* (`p1/e/07-after-0.png`)

**P1 picks B:** it is the only variant where the euros show above the fold on mobile and where the estimate is broken down, net of the fee, into a sum the Saver can check.

### P2 · Le Prudent: FR, Brussels, desktop, reads the small print, compares in tabs

| Variant | Trust | Clarity | Desire to start | Finish step 2 |
|---|:-:|:-:|:-:|:-:|
| A · Calm Confidence | 4 | 4 | 4 | 4 |
| B · Savings First | 3 | 4 | 3 | 3 |
| **C · Honest Market** | **5** | **5** | 4 | **5** |
| E · Bold June | 2 | 3 | 2 | 3 |

**A.** *"Calm and serious. 'Pas un fournisseur d'énergie. Nous travaillons pour vous', and 'automatiquement, ou seulement après votre accord' in the very first paragraph. That's the control I need. The card on the right shows Switch Plus 99 € and 'Garantie de gain · 99 € remboursés'. The average figure counted up from 39 € as I watched, which felt like a gimmick. On the Switch Plus page the guarantee is clear. In the FAQ I found nothing about what happens if June goes bankrupt, and no phone number. In the estimate I read '[méthode, période et échantillon à confirmer par June]', which I assume will be fixed. I chose 'Demandez-moi d'abord' and would finish."* (`p2/a/01-home-fold.png`, `p2/a/00-home-at-5s.png`)

**B.** *"'Combien payez-vous en trop ?' That's how the door-to-door people talk. The site is well built and the calculator is right there, but it feels like it wants my postcode before I know who they are. The breakdown electricity / gas / −99 € is clear, and 'Aucune interruption de votre énergie' reassures me. But I also see 'Indicatif · illustratif' and, at the bottom, 'Modèle nog te valideren' and 'KBO-nummer volgt'. For a company I've never heard of, 'number to follow' is the wrong thing to read. I'd compare the other tabs before leaving my email."* (`p2/b/01-home-fold.png`)

**C.** *"'C'est vous qui nous payez, pas le fournisseur.' Finally someone answers how they earn money in the first sentence. On the right, three questions I would have asked: what is it, how much (69, 99 or 198 € par an), and what if it doesn't pay off (99 € remboursés). In the funnel the 'Ce que nous savons de vous' panel shows exactly what I've given them, and it recognised Bruxelles · Sibelga from my postcode. The estimate gives before and after the fee, plus the formula. 'Ce que nous ne promettons pas : de changer souvent' disarmed me completely. Before the button it tells me what comes next (EAN, 14 jours de rétractation). This is the one I'd finish, and it's the tab I'd keep."* (`p2/c/01-home-fold.png`, `p2/c/*-after-0.png`)

**E.** *"A cartoon monster and 'Maintenant, vous avez le pouvoir'. This is an energy contract, not a game. The copy underneath is actually correct (not a supplier, automatically or after my approval, electricity keeps flowing). But the estimate shows 240–480 € with no fee subtracted, and under 'Continuer avec Switch Plus' it says 'Gratuit · Sans engagement' while the line above says 99 € par an. Which is it? That kind of contradiction is exactly what I look for. I might finish because the form is short, but I trust it least."* (`p2/e/01-home-fold.png`)

**P2 picks C:** the business model, the price and the guarantee are answered in the hero, the transparent data panel follows them into the funnel, and the net estimate shows its working.

### P3 · De Tech-liefhebber: NL, desktop, digital meter + solar + EV + heat pump

| Variant | Trust | Clarity | Desire to start | Finish step 2 |
|---|:-:|:-:|:-:|:-:|
| A · Calm Confidence | 4 | 4 | 4 | 4 |
| B · Savings First | 2 | 3 | 2 | 3 |
| **C · Honest Market** | **5** | **5** | 4 | 4 |
| E · Bold June | 3 | 2 | 3 | 3 |

**A.** *"Clean, and 'Hoe werkt het' explains the P1 port and Mijn Fluvius activation. I entered my 5.200 kWh. The estimate said €250–430, and after Premium (€198) ±€52–232. It adds 'met zonnepanelen hangt je besparing ook af van je injectie', which shows someone thought about prosumers. Premium is recommended because of the dongle. Fair, although I already own a HomeWizard and nobody tells me whether Switch Plus plus my own dongle is an option. Nothing on dynamic contracts or my capacity peak with an EV and a heat pump. I'd finish, probably downgrading to Switch Plus."* (`p3/a/*-after-0.png`)

**B.** *"The calculator feels fast, but look at this estimate: '≈ €0–20 · Je zit al goed' ('you're already fine') and in the same card 'AANBEVOLEN VOOR JOU: Premium'. So you're telling me I'd save nothing and recommending your most expensive plan? The gross electricity saving (€90–220) minus €198 explains it, but the logic is backwards. 'Model nog te valideren door June' in the footnote confirms my doubt. I'd close the tab or go back and pick Switch Plus myself."* (`p3/b/*-after-1.png`)

**C.** *"This is how I like it: 'Gebaseerd op 5.200 kWh elektriciteit per jaar (jouw cijfers)', the assumptions per kWh, the EV +2.000 / heat pump +3.500 rules, and a €700 cap. It shows both options: after Premium €0–110, after Switch Plus €50–210. It still recommends Premium, but it gives me the numbers to disagree, and I respect that. 'Wat we van je weten' is the privacy statement I actually want. Nothing about HomeWizard, dynamic contracts or data export on the pages I read. I'd finish step 2, most likely with Switch Plus."* (`p3/c/*-after-0.png`)

**E.** *"Energetic, OK. The estimate shows €150–310 per year (gross), then 'Ons voorstel: Premium … June Dongle inbegrepen' and directly under it 'Switch Plus kost € 99 per jaar… Dan krijg je € 99 terug.' Wait, am I being offered Premium or Switch Plus, and what does Premium cost me net? Then again 'Gratis · Geen verplichtingen' under the button. For someone who reads specs, this is sloppy. I'd go back to the plans page to work it out."* (`p3/e/*-after-0.png`)

**P3 picks C:** the only variant that echoes the kWh they entered, shows its assumptions and gives a net figure for both plans, so a spec-reader can check the recommendation instead of taking it on trust.

### P4 · La senior sceptique: FR, Namur, tablet, analogue meter, distrusts sellers

| Variant | Trust | Clarity | Desire to start | Finish step 2 |
|---|:-:|:-:|:-:|:-:|
| **A · Calm Confidence** | **4** | **4** | **3** | **3** |
| B · Savings First | 2 | 3 | 2 | 2 |
| C · Honest Market | 4 | 3 | 3 | 3 |
| E · Bold June | 1 | 3 | 1 | 2 |

**A.** *"This one is calm. Large text, no flashing, and the first thing I read is 'Pas un fournisseur d'énergie'. 'Votre électricité continue d'arriver · Même compteur · Pas d'indemnité de rupture': that's what I wanted to hear. The questions were easy: I said 'compteur analogique' and it didn't send me away. At the end I could choose 'Demandez-moi d'abord · Vous validez vous-même chaque changement', which is what convinced me. But I looked everywhere for a telephone number. 'Besoin d'aide ?' only goes to the questions page. I would not give my e-mail before calling someone, so I'd ask my daughter to look at it with me."* (`p4/a/01-home-fold.png`)

**B.** *"'Combien payez-vous en trop ?' in big letters, and a black box with '90 – 290 €' before I've told them anything. That's a sales pitch. They say they are not a supplier, fine, but everything here is pushing me to calculate. On the next pages the text is readable and the buttons are large. It's four steps, and in the end I don't know who I'm dealing with: the bottom of the page says the company number 'volgt'. I'd stop at the estimate."* (`p4/b/01-home-fold.png`)

**C.** *"Honest words: 'C'est vous qui nous payez, pas le fournisseur.' I like that the prices are written plainly. But there is a lot of small text, footnotes and a chart about 'le prix de la fidélité' that I had to study. The form was fine, and it showed me 'Wallonie · ORES ou RESA', so they know where I live without asking for my address. 'Vous ne payez rien pour l'instant' and 'Ce qui se passe ensuite' reassured me. Still no telephone number. I'd do it with my son, not alone."* (`p4/c/01-home-fold.png`, `metrics.txt`: 30% of home text elements are under 14 px)

**E.** *"A green monster pointing at me and 'Vous avez le pouvoir'. My grandson would like it. For me this looks like an advert, and I don't sign contracts from adverts. The paragraph underneath is correct, but by then I've already decided it's not serious. The estimate says 'Gratuit' next to a 99 € subscription. No."* (`p4/e/01-home-fold.png`)

**P4 picks A**, with C second. A has the calmest tone, readable type on a tablet and says "même compteur" early. The explicit "Demandez-moi d'abord" option clinched it. None of the four variants earns a solo sign-up from P4, because none offers a phone number or a way to share the page with family.

---

## 3. Aggregated table

Each cell is the mean of the four personas' scores, rounded to 0,1 (n = 4 simulated personas; for direction only).

| Variant | Trust | Clarity | Desire to start | Finish step 2 | **Overall** | Picked by |
|---|:-:|:-:|:-:|:-:|:-:|---|
| A · Calm Confidence | 4,0 | 4,0 | 3,8 | 3,8 | **3,9** | P4 |
| B · Savings First | 2,5 | 3,8 | 3,0 | 3,0 | **3,1** | P1 |
| **C · Honest Market** | **4,5** | **4,3** | 3,5 | **4,0** | **4,1** | P2, P3 |
| E · Bold June | 2,3 | 2,8 | 2,5 | 2,8 | **2,6** | none |

The spread matters more than the mean. B wins "desire to start" for the Saver (5) but loses trust with the three other personas. A has no score below 3. C is best on trust and clarity but is the least motivating on mobile for P1 and too dense for P4. E polarises: it scores 4 on desire from P1 and 1 from P4.

---

## 4. Cross-persona findings

1. **The estimate must lead with the net figure, and the recommended plan must never cost more than the saving it shows.** E shows only the gross figure (every persona). B recommends Premium while showing "≈ €0–20 · Je zit al goed" (P3). A puts gross in large type and net in small type (P1). C, which shows net for both plans, scored highest on the estimate step.
2. **No variant has a phone number.** None has `tel:` links, and the FR FAQs contain "[numéro de téléphone et horaires]". This caps P4 at "would ask family", and it cost P2 a point on every variant. The funnel help link ("Besoin d'aide ?") goes to the FAQ, not to a person.
3. **Contradictory microcopy hurts trust the most.** E's "Gratuit · Sans engagement" sits under a €99/€198 plan CTA, and E's Premium recommendation shows the Switch Plus price line. P2 and P3 dropped E's trust score on these alone.
4. **Placeholder and "to be confirmed" text reads as unfinished or unsafe to cautious personas.** Examples: A's "[méthode, période et échantillon à confirmer]", B's "Model nog te valideren", "KBO-nummer volgt" and "liens à venir", and E's "calculée par June sur période pour nombre clients" (the brackets have been stripped, so it reads like broken French). These must be resolved or hidden before any real test.
5. **Tone splits the personas.** Loss framing ("Combien payez-vous en trop ?", B) and playfulness (mascot and "pouvoir", E) motivate P1 but read as démarchage to P2 and P4. Plain statements of the business model ("C'est vous qui nous payez", C) and control ("ou seulement après votre accord", A) work for all four. The most promising combination is B's calculator and fee breakdown inside C's or A's tone.
6. **Everyone wants "approve every switch" visible early, but it is defaulted to "auto" deep in step 2.** P2 and P4 both named it as the deciding factor. All variants default the preference to `auto`.
7. **P3's real objections are unanswered everywhere:** "I already have a HomeWizard/P1 dongle", dynamic contracts, capacity peak with an EV and a heat pump. There are 0 mentions of an own dongle or dynamic contracts on Home, How it works or Plans in any variant.
8. **Step labels are inconsistent.** C shows "Stap 1 van 2" over a 3-segment stepper. E shows "Stap 1 van 2 · Je woning" while displaying the estimate. B has 4 steps, which costs a screen on mobile. Minor, but P1 and P4 both noticed.

---

## 5. Persona-specific issues and concrete fixes

| # | Persona(s) | Variant | Route | Issue seen in walk | Change |
|---|---|---|---|---|---|
| 1 | P1, P2, P3 | E | `/nl-be/aanmelden/`, `/fr-be/inscription/` (estimate) | Only the gross estimate is shown; the fee is never subtracted | Add a "Na je abonnement (Switch Plus, €99): € x–y" line and make it the headline number, as in A/C |
| 2 | P1, P2, P3, P4 | E | same, under "Verder met …" | "Gratis · Geen verplichtingen" under a paid-plan CTA | Change to "Schatting gratis · je betaalt nog niets" / "Estimation gratuite · vous ne payez rien maintenant" |
| 3 | P3 | E | estimate when Premium is recommended | The price line always shows Switch Plus €99 | Bind the price line to the recommended plan (Premium €198, €16,50/month) |
| 4 | P3 | B | `/nl-be/aanmelden/` estimate | Recommends Premium while net ≈ €0–20 ("Je zit al goed") | If Premium's net saving < Switch Plus's net saving, recommend Switch Plus and show Premium as "if you want live data". Never pair "you're already fine" with an upsell |
| 5 | P3 | A, B, E | estimate | Net figure shown only for the recommended plan | Show net for the recommended plan *and* the next-cheaper plan with a guarantee (C's pattern) |
| 6 | P1 | A | `/nl-be/aanmelden/` estimate | Gross €200–300 is large, net €131–231 is small | Swap the hierarchy: net as the hero number, gross as the secondary line |
| 7 | P2, P4 | all | header/footer, `/fr-be/questions-frequentes/`, funnel header | No phone number; "Besoin d'aide ?" goes to the FAQ | Add a `tel:` link with opening hours in the header utility (desktop), the funnel header and the footer; the FAQ contact answer shows the real number. [C: number and hours] |
| 8 | P2, P4 | all | funnel step 2 | "Demandez-moi d'abord" is the second option and defaults to auto | Keep auto as default only if data supports it; otherwise lift the choice into the Home hero/How it works and test the default "ask" for FR 55+ (hypothesis H8 in the research) |
| 9 | P4 | all | step 2 / confirmation | No way to involve family | Add "Envoyer cette estimation à un proche" / "Stuur door naar iemand" (email/share) on the estimate and the confirmation |
| 10 | P2, P4 | B | `/fr-be/` hero | "Combien payez-vous en trop ?" reads as a sales pitch | For FR, lead with the "pas un fournisseur" line as H1/kicker and move the loss question into the calculator heading. Test NL/FR separately |
| 11 | P4, P2 | E | `/fr-be/` hero | Mascot and "Vous avez le pouvoir" undermine seriousness | Keep the mascot out of the hero for FR (or on secondary sections only); use a factual H1 |
| 12 | P4 | C | `/fr-be/` | Dense small text (≈30% of text nodes < 14 px at 820 px) and an abstract chart | Raise the minimum body/caption size to 16/14 px; label the chart "Exemple" with one sentence of plain explanation |
| 13 | P1 | C | `/nl-be/aanmelden/` (mobile) | "Hoe we dit berekenden" is open by default and is a wall of text | Collapse it into a `<details>` on mobile; keep "Gebaseerd op X kWh" visible |
| 14 | P1, P4 | C, E | funnel step label | "Stap 1 van 2" vs a 3-segment stepper; E's label is stale on the estimate screen | Make the text label match the stepper and update it per screen |
| 15 | P1 | B | `/nl-be/aanmelden/` | Four steps on mobile (meter and extras on a separate screen) | Merge "Meter en extra's" into step 1 as tap chips (3 screens, as in A/C/E) |
| 16 | P2, P3, P4 | A, B, E | estimate / footers | Visible placeholders ("[méthode … à confirmer]", "Model nog te valideren", "KBO-nummer volgt", "période pour nombre clients") | Resolve with the product owner or hide behind the content-freeze gate before any user test |
| 17 | P2 | A | `/fr-be/` hero card | The average count-up starts at 39 € / 100 € | Render the final value immediately (count-up only on scroll-in, and never for an average) |
| 18 | P3 | all | `/nl-be/abonnementen/`, `/nl-be/hoe-werkt-het/` | No answer to "I already have a HomeWizard/P1 dongle", dynamic contracts or capacity peak | Add an FAQ/plan-helper row: "Heb je al een P1-dongle?" → Switch Plus + [C: support for own dongle]; one line on dynamic contracts [C] |
| 19 | P2 | all | `/fr-be/questions-frequentes/` | No "et si June fait faillite ?" answer (0 hits) | Add: "Votre contrat est avec le fournisseur et continue" (objection #18 in the research) |

---

## 6. Which variant each persona would pick

| Persona | Pick | Why (in their words) | Runner-up |
|---|---|---|---|
| P1 De Bespaarder | **B** | "The only one that shows euros on my phone straight away and lets me check the sum: elec + gas − €99." | A (net shown, but smaller) |
| P2 Le Prudent | **C** | "They say who pays them, what it costs and what happens if it doesn't pay off, before I even ask." | A |
| P3 De Tech-liefhebber | **C** | "It used my 5.200 kWh, shows its assumptions and gives me Premium *and* Switch Plus net, so I can disagree with it." | A |
| P4 La senior sceptique | **A** | "Calm, readable, 'même compteur', and I can approve each change myself. I'd still want a phone number." | C |

**Implication for round 2 (hypothesis, not a conclusion):** use C's content model (business model in the hero, net estimate for two plans, "what we know about you" panel) with A's calm visual register and type scale. Borrow B's inline hero calculator and its elec/gas/fee breakdown for mobile NL traffic. Add a phone number and the "approve every switch" choice everywhere. Then validate with real users.

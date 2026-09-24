# June — Conversion Strategy

**Owner:** Conversion rate optimisation (CRO) specialist
**Scope:** www.june.energy redesign, NL and FR
**Primary conversion:** START SIGN-UP. Completed sign-up is the secondary conversion.
**Inputs:** `source-content-mapping.md`, `source-site-taxonomy.md`, and CRO expertise. The live site could not be reached, so none of this was checked against analytics. Every impact estimate below is a hypothesis to validate.

> **Fact check needed before launch** (marked ⚠ throughout). Do not publish these claims until June confirms them:
> (a) how the "gemiddeld €326/jaar" figure is calculated: sample, period, and whether the fee is deducted;
> (b) the exact guarantee terms: does "more than the subscription" mean net of the fee, and is the €99 a refund or a credit?
> (c) cancellation and renewal terms of the annual plan, and how the 14-day withdrawal right (herroepingsrecht / droit de rétractation) is handled;
> (d) how many suppliers are compared. The site says both "17+" and "alle leveranciers";
> (e) how June earns money: subscription only, or also supplier commissions?

---

## 0. Price facts used in this document

| Plan | Monthly equivalent | **Billed yearly (total, incl. VAT ⚠)** | Key hook |
|---|---|---|---|
| Switch | €5,75 | **€69 / jaar** | Auto-switch, analog or digital meter |
| Switch Plus | €8,25 | **€99 / jaar** | Winstgarantie: €99 back if savings ≤ subscription |
| Premium | €16,50 | **€198 / jaar** | Incl. P1 dongle, solar monitoring, 15-min dashboard, guarantee |

**Key insight:** the Switch Plus guarantee pays back €99, which is exactly its annual price. The customer's worst case is therefore roughly €0 net: if June doesn't find more savings than the plan costs, the plan is effectively free. This makes the "risk-free" story strong and verifiable, and every variant should build on it.

At the claimed average: €326 − €99 = **€227 net per year** on Switch Plus. Always show net figures next to gross figures. It builds credibility.

---

## 1. Heuristic conversion audit (LIFT)

Scores run from 1 (poor) to 5 (strong) for the current site, based on the content map.

| LIFT factor | Score | Summary |
|---|---|---|
| Value proposition | 3 | The core idea is good ("automatisch wisselen", €326), but it is framed around the mechanism rather than the outcome, and the guarantee is buried |
| Relevance | 2 | Every visitor gets the same message. There is no personalisation by region, meter or solar, and no dedicated FR landing logic visible |
| Clarity | 2 | Vague CTA, three plans with no clear recommendation, inconsistent supplier count, monthly price but yearly billing |
| Anxiety | 2 | Many objections (fee, lock-in, data access, "who are you") are either unanswered or live only in the FAQ |
| Distraction | 3 | Video hero, partner-logo wall, Login, Visie and Partnervoordelen all compete with the start |
| Urgency | 1 | No reason to act now. Every month of delay costs money, and that is never said |

### Issues ranked by expected conversion impact

| # | Issue | LIFT | Impact | Fix |
|---|---|---|---|---|
| 1 | **The hero CTA "Ontdek hoe June jou kan helpen" is vague, repeats the subheading and signals "read more", not "start"**. The visitor doesn't know what happens after the click | Clarity / VP | Very high | Use an action-plus-outcome CTA ("Bereken mijn besparing") and put an inline postcode field in the hero (§2, §5) |
| 2 | **No personalised estimate before commitment.** €326 is an abstract average, and "Koppel je teller(s)" as step 1 of "Hoe werkt het" sounds like a technical commitment | VP / Anxiety | Very high | Make a 2-step estimate the entry point of the funnel |
| 3 | **The guarantee, the strongest risk-reversal asset, is hidden on the Switch Plus sub-page** and is never presented as the "risk-free" default | Anxiety / VP | High | Default recommendation is Switch Plus. Show a guarantee badge in the hero, on the pricing cards and at the plan step |
| 4 | **Price display is ambiguous:** "€5,75 per maand (jaarlijks gefactureerd)". Visitors discover the €69/€99/€198 annual charge later, which erodes trust at checkout. It is also a compliance risk under Boek VI WER, which requires a clear total price | Anxiety / Clarity | High | Show the yearly total prominently with the monthly equivalent next to it (§3) |
| 5 | **Three plans with no recommendation.** The visitor faces a choice before seeing any value, which causes decision paralysis | Clarity / Distraction | High | Plan choice comes AFTER the estimate, with Switch Plus preselected |
| 6 | **"Hoe verdient June geld?" is never answered.** For an intermediary this is the #1 trust question ("are you steered by commissions?") | Anxiety | High | Put a transparency block next to pricing ⚠(e) |
| 7 | **Lock-in, cancellation and contract fears are not addressed**: "billed yearly", "does June break my contract?", "exit fees?" | Anxiety | High | Add microcopy under the CTA and at the plan step: withdrawal right, no break fees (Belgian residential energy contracts have no exit fee), cancellation terms ⚠(c) |
| 8 | **Data and meter-access anxiety.** "June leest je meterstand automatisch uit" suggests access without explaining consent, scope or privacy | Anxiety | Med–high | Add a "Wat we wel/niet zien" explainer, a mandate explanation and a GDPR line |
| 9 | **Inconsistent claims:** "17+ leveranciers" vs "alle Belgische leveranciers"; "werkt met analoge meters" while "Koppel je teller" implies digital | Clarity / Anxiety | Medium | Use one canonical number ⚠(d) and explain the manual/analog path explicitly |
| 10 | **No urgency or cost-of-waiting message** | Urgency | Medium | "Elke maand zonder June kost je gemiddeld ~€27" (326/12, ⚠(a)); use honest, non-countdown urgency |
| 11 | **Distractions on the decision path:** partner-logo grid (supplier logos can read as "partners", which undermines independence), Login in the primary nav, Visie/Partnervoordelen in the top nav, a video hero with no content payoff | Distraction / Anxiety | Medium | Relabel logos "We vergelijken o.a." with a neutral grey treatment. Move Login to a utility link and the others to the footer |
| 12 | **Social proof is under-used:** 4,3/5 and 20.000+ sit in the hero, but there is no proof near the CTA or pricing and no specifics in testimonials (amounts saved, region) | VP / Anxiety | Medium | Proof chip adjacent to every primary CTA. Review cards with € saved |
| 13 | **Premium's relevance is not qualified:** it only makes sense for digital meters and solar, but it is presented to everyone | Relevance | Medium | Upsell Premium conditionally, based on answers at step 1 |
| 14 | **The FAQ answer "Hoe kunnen jullie zóveel besparen?" invites scepticism** without giving proof | Anxiety | Low–med | Add a methodology note and link it from the €326 footnote ⚠(a) |
| 15 | **No FR-specific proof** (FR reviews, Walloon/Brussels examples) | Relevance | Low–med | Localise proof, not only the language |

---

## 2. Funnel definition

### 2.1 Stages and events (analytics spec)

```
ENTRY                       MICRO-CONVERSIONS                   PRIMARY            SECONDARY
Home / plan pages /    →   cta_click (any start CTA)      →   signup_started  →  estimate_viewed → plan_selected
SEA landing (NL/FR) /      postcode_focus (hero field)                           → account_created → mandate_signed
Reviews / Hoe werkt het    pricing_viewed (≥50% in view)                         → payment_completed = signup_completed
/ Referral link / FAQ      faq_open, guarantee_info_open                         → (activation: meter linked / first switch)
```

**Entry points to design for:** Homepage (NL/FR), paid-search landing pages ("energie vergelijken", "goedkoopste energieleverancier", "comparer énergie"), plan pages (Switch / Switch Plus / Premium), Hoe werkt het, Reviews, referral and partner links (Partnervoordelen), and blog/SEO content if it is added. Every entry point must reach step 1 in **one click, or zero clicks with the inline hero field**.

### 2.2 Precise definition of "sign-up started" (primary KPI)

> **`signup_started`** fires **once per session** when a visitor **successfully submits step 1 of the sign-up flow with a valid Belgian postcode** (4 digits, matched against the postcode table). It is recorded **server-side** (or client-side after validation succeeds) with the properties `entry_page`, `entry_cta_id`, `lang (nl|fr)`, `variant`, `device`, `utm_*`, `postcode_region (VL|WA|BXL)`.

- A CTA click alone is **not** a start. It is logged as `cta_click`, a micro-conversion used to diagnose drop-off between click and start.
- An entry from the inline hero postcode field counts as a start once the postcode is valid and submitted.
- Conversion rate = `signup_started` sessions / eligible sessions (excluding logged-in customers and bots).
- **Guardrail metrics** (a variant "wins" only if these do not degrade): start → `estimate_viewed` rate, start → `signup_completed` rate, refund/cancellation within 14 days. A variant that inflates starts with low-intent clicks must not win.

**`signup_completed`** = contract accepted, mandate signed and payment method confirmed.

### 2.3 Recommended flow: steps 1–2 (maximise starts, deliver a personalised estimate)

**Principle:** first ask the one question that is effortless to answer and clearly *for the user's benefit*, then give value (the estimate) **before** asking for identity, EAN codes or payment. Low effort first, highest-friction fields last.

**Step 1: "Waar woon je?" (hero-inline and page step 1)**
- **Postcode** (single field, numeric keypad on mobile). This determines the region and grid operator, which drive distribution tariffs, so it is a legitimate personalisation driver. Say so: *"Netkosten verschillen per regio."*
- Optional toggle on the same step: **Elektriciteit / Elektriciteit + gas** (default: both).
- CTA: *Bereken mijn besparing →*

**Step 2: "Vertel ons iets over je verbruik" (4 tap-only questions, about 20 seconds, with a progress bar showing "Nog 1 stap tot je besparing")**
1. **Household size**: 1 / 2 / 3–4 / 5+ (icon chips). This is the usage proxy. Offer a link *"Ik ken mijn verbruik (kWh)"* that expands exact kWh/m³ fields for power users.
2. **Meter type**: Digitale meter / Analoge meter / Weet ik niet (with a helper image). This drives Premium eligibility and the data path.
3. **Solar panels**: Ja / Nee. This drives injection tariffs and the Premium recommendation.
4. **Current supplier**: logo picker, with "Weet ik niet" allowed. This lets June express the estimate as savings versus the current supplier. Optional, but it increases estimate credibility.
- **Accelerator (optional, never required):** *"Sneller en nauwkeuriger? Upload je jaarafrekening"* (photo or PDF). Do NOT make bill upload the default: it is high friction on mobile, and many people don't have the bill at hand. Offer it as an "increase precision" path on the estimate screen too.
- **Do not ask at step 1 or 2:** name, email, EAN code, address, IBAN, heating type details or contract end date. These belong after the estimate.

**Step 3: Estimate screen (the "aha" moment)**
- Big number: *"Jij bespaart naar schatting **€280 – €360** per jaar"* (a range for honesty, ⚠(a) method). Show **net after June** too: *"= ± €230 netto met Switch Plus"*.
- Short "hoe we dit berekenden" disclosure (average of the market vs your supplier's standard tariff, profile X).
- Email capture is optional here and framed as a service: *"Stuur mij deze berekening"*. This creates a remarketable lead for visitors who don't continue.
- Then plan selection (see below), followed by account, address/EAN (auto-lookup from the address where possible), mandate and payment.

### 2.4 Plan choice: before or after the estimate?

**After.** Asking visitors to pick among €69 / €99 / €198 before they know their savings creates price-focused paralysis and anchors on cost. After the estimate, the plan decision becomes "which way do I want to capture my €X", with cost shown relative to savings.

- **Preselect Switch Plus** ("Aanbevolen – risicovrij") for everyone.
- Show **Premium** as the recommended upgrade *only* when the visitor chose "digitale meter" AND/OR "zonnepanelen": *"Met zonnepanelen haal je meer uit Premium: dongle inbegrepen."* Otherwise show it collapsed or secondary.
- **Switch** stays available as the budget option (a text link or third card), so price-sensitive users are not lost.
- Visitors arriving from a specific plan page keep that plan preselected (respect their intent), and the estimate screen shows the recommendation next to it.

### 2.5 Copy guidance for the flow
- Use "je/jij" (NL) and "vous" (FR, the Belgian consumer default). Keep sentences short, and use the second person with a benefit in every question label.
- Explain *why* each field is asked, in ≤ 8 words ("Voor je regionale nettarieven").
- Progress indicator from the start: "Stap 1 van 3". Keep the estimate step count separate from the sign-up step count so the flow feels short.
- Error states should be helpful ("Deze postcode kennen we niet. Typfout?"), never blaming.
- Under every step CTA: *"Gratis berekening · Geen verplichtingen"* / *"Calcul gratuit · Sans engagement"*.

---

## 3. Pricing presentation

### 3.1 Recommended/default plan
**Switch Plus = default and "Aanbevolen".** Reasons:
1. The guarantee equals the annual price, so worst case ≈ €0. This is the strongest risk reversal.
2. It is the middle-option (compromise) effect: flanked by €69 and €198, €99 looks like the sensible choice.
3. It has the highest expected value per customer relative to acceptance risk.

Premium works as the anchor (it makes €99 look modest) and is the *qualified* upsell for digital meter and solar visitors.

### 3.2 Monthly vs yearly display (Belgian price indication)
Boek VI Wetboek Economisch Recht (art. VI.2/VI.3–VI.4) requires the **total price payable, incl. VAT**, to be clear and unambiguous. Because billing is yearly, the **yearly total must be the primary or at least equally prominent figure**. The monthly figure may be shown as an equivalent, but must not mislead.

Recommended pattern (per card):

```
Switch Plus                       [Aanbevolen · Risicovrij]
€99 per jaar                      ← primary, large
= €8,25 per maand                 ← secondary, smaller
Bespaar je minder dan €99? Dan krijg je €99 terug.
```

- Never show "€8,25" large with "jaarlijks gefactureerd" in small print. This is the current pattern and a trust killer.
- State "incl. btw" once, near the prices. ⚠ Confirm the VAT status.
- Show **net savings** in context: "Gemiddelde besparing €326 – abonnement €99 = **€227 netto**". ⚠(a)
- In the flow, after the estimate: "Jouw geschatte besparing €310 · Kost Switch Plus €99 · **Jij houdt ± €211 over**".

### 3.3 Guarantee framing ("risk-free")
- Name: **Winstgarantie** (keep the name) plus the plain-language promise: *"Bespaar je niet meer dan je abonnement? Dan krijg je je €99 terug."* In FR: *"Garantie gain : si vous n'économisez pas plus que votre abonnement, on vous rembourse vos 99 €."*
- Short form for badges: **"Risicovrij: besparing gegarandeerd of €99 terug"** / **"Sans risque : économies garanties ou 99 € remboursés"**.
- Avoid "gratis" or "100% gratis" unless the terms truly net to zero in every case ⚠(b). Link to the terms in one click, and make the conditions scannable (3 bullets).
- Place it in the hero trust row, on the pricing card, on the plan-selection step and in the final payment step (reassurance at the moment of highest anxiety).

### 3.4 Anchoring
- Anchor on **savings, not price**: show €326 (or the personal estimate) before any price.
- Show the cost of waiting per month: "± €27 per maand" ⚠(a).
- Card order on desktop: **Switch · Switch Plus (raised, highlighted) · Premium**, with left-to-right price ascent. On mobile, show **Switch Plus first** (expanded), with the others as collapsed cards beneath.
- Optional: a "Vergelijk: wat je supplier-switching zelf kost". Doing it yourself takes about 2–3 hours per year to compare, and most people forget. This is a soft anchor for convenience value.

### 3.5 Comparison table (on /prijzen and below the cards)

| Feature | Switch | Switch Plus | Premium |
|---|---|---|---|
| Price | €69/jaar (€5,75/m) | **€99/jaar (€8,25/m)** | €198/jaar (€16,50/m) |
| Continuous market comparison (N suppliers ⚠d) | ✓ | ✓ | ✓ |
| Automatic switch, or approve each switch yourself | ✓ | ✓ | ✓ |
| All administration of the switch | ✓ | ✓ | ✓ |
| Analog and digital meter | ✓ | ✓ | Digital only |
| 100% green energy option | ✓ | ✓ | ✓ |
| **Winstgarantie (€99 back)** | – | **✓** | ✓ |
| Annual savings report | – | ✓ | ✓ |
| June P1 dongle included | – | – | ✓ |
| 15-min usage dashboard | – | – | ✓ |
| Solar monitoring (injection vs self-consumption) | – | – | ✓ |
| Best for | Lowest price | **Most people: risk-free** | Solar / digital meter / data lovers |

Rows are ordered by value to *most* visitors (core features first, differentiators next). Keep the table to ≤ 12 rows, and add "Welk plan past bij mij?" (a 2-question mini quiz that routes to the estimate) below it.

### 3.6 Above the fold (homepage)
1. **Headline, outcome-first:** "Altijd het laagste energietarief. Zonder dat je er nog naar omkijkt." / "Toujours le tarif d'énergie le plus bas. Sans y penser."
2. **Sub:** "June vergelijkt elke maand de hele markt en wisselt automatisch voor je. Gemiddeld €326 per jaar besparing." ⚠(a)
3. **Inline postcode field plus primary CTA** "Bereken mijn besparing".
4. **Trust row directly under the CTA:** ★ 4,3/5 · 1.200+ Google reviews · 20.000+ klanten · Onafhankelijk · Winstgarantie.
5. **Microcopy:** "Gratis berekening in 30 sec · Geen verplichtingen".
6. No full-bleed video autoplay behind the text. Use a still image or product visual; video goes lower or opens in a modal.

Prices are *not* above the fold on the homepage, except in variant B (savings calculator) and variant D (plan-led), where a compact "vanaf €5,75/m (€69/jaar)" line may appear.

---

## 4. Trust and anxiety reducers: inventory and placement

| Anxiety | Reducer (copy direction) | Placement |
|---|---|---|
| "Who are you? Are you a supplier?" | "June is geen energieleverancier. We zijn onafhankelijk en werken voor jou, niet voor de leveranciers." | Hero trust row (the "Onafhankelijk" chip), how-it-works, FAQ #1, flow step 1 footer |
| "How do you earn money? Are you biased?" | "Jij betaalt ons een vast abonnement. Daardoor hebben we er alle belang bij dat jij het goedkoopste contract krijgt." ⚠(e): if commissions exist, disclose them and state that the ranking is by price for you | Block next to pricing; estimate screen tooltip; FAQ |
| "Is it worth it? / Will I really save?" | Personal estimate, net savings, Winstgarantie, methodology note for €326 | Estimate screen, pricing, hero footnote |
| "Am I locked in? Can I cancel?" | 14-day withdrawal right; no exit fees on Belgian residential energy contracts; cancellation terms ⚠(c) stated plainly | Under the plan cards, plan step, payment step, FAQ |
| "Will my power be cut / will the switch go wrong?" | "Je hebt nooit onderbreking. Je stroom blijft gewoon komen, alleen de factuur verandert." | How-it-works, flow step 3, FAQ |
| "Do I stay in control?" | "Jij kiest: June wisselt automatisch, of jij keurt elke switch zelf goed." | How-it-works, plan cards, flow |
| "What data do you access? Privacy?" | "Wat we zien / wat we nooit doen" list; access via mandate/Fluvius data or dongle only with consent; GDPR; data stored in EU ⚠ | Next to "Koppel je teller", the mandate step, a privacy summary page |
| "Is this a scam / too good to be true?" | Google 4,3/5 (1.200+) with a live widget and real reviews incl. negative ones; 20.000+ customers; company details (KBO/BCE number, address) in the footer; press mentions ⚠ if any | Near every CTA (compact), reviews section, footer |
| "Which suppliers?" | "We vergelijken o.a." logo row in neutral grey, framed as coverage, not partnership | Below how-it-works, not in the hero |
| "What happens after I sign up?" | 3-step timeline: "Vandaag: berekening → Binnen X dagen: eerste switch → Elke maand: controle" | Estimate screen, payment step, confirmation |
| "Is it complicated?" | "Klaar in 3 minuten. Wij doen de administratie." | Hero microcopy, flow |
| FR audience trust | FR reviews, a Walloon/Brussels example, FR support line | FR pages specifically |

**Placement rule:** every primary CTA gets **one** proof element (rating or count) and **one** risk reducer (no obligation, guarantee or cancel) within 40 px. Use at most 2 lines of microcopy; don't clutter.

**Human support:** show a visible support channel (chat/phone/email, with hours) in the flow footer. Knowing help exists reduces abandonment at the EAN and payment steps.

---

## 5. CTA strategy

### 5.1 Primary CTA wording (one wording per variant, used consistently site-wide)

| Option | NL | FR | Notes |
|---|---|---|---|
| **P1 (recommended default)** | **Bereken mijn besparing** | **Calculer mon économie** | Outcome plus low commitment; first person tested well in comparable contexts |
| P2 | Ontdek wat jij bespaart | Découvrez combien vous économisez | Softer, curiosity |
| P3 | Start gratis berekening | Lancer le calcul gratuit | "Gratis" reduces anxiety; slightly less personal |
| P4 (plan pages, post-estimate) | Start met Switch Plus | Commencer avec Switch Plus | Use once intent is high |
| P5 (bold variant E) | Ik wil minder betalen | Je veux payer moins | Loud and emotional; test only in E |

Avoid "Ontdek hoe June jou kan helpen" (vague), "Meer info", "Aanmelden" and "Inschrijven" as primary CTAs. They signal effort without an outcome.

### 5.2 Placement
- **Hero:** inline postcode field plus button (desktop and mobile).
- **After every major content section** (how it works, pricing, reviews, FAQ): repeat the primary CTA. Reuse the same label, since consistency builds recognition.
- **Plan cards:** "Kies Switch Plus" leads to the estimate flow with the plan preselected. Do NOT skip the estimate.
- **Header:** a compact primary button "Bereken besparing" (always visible on scroll, desktop).
- **Footer:** a final CTA band with the guarantee line.

### 5.3 Sticky mobile CTA
- A bottom bar appears after the hero CTA scrolls out of view: **[Bereken mijn besparing]** with a proof micro-line ("★ 4,3 · 20.000+ klanten").
- Hide it while the hero or inline form is in view, and while the keyboard is open. Minimum height 48 px; respect the safe area. Use no dismiss "X" (it adds clutter), but hide it on /login and in the flow itself.

### 5.4 Secondary CTAs (visually subordinate: ghost or link style)
- "Hoe werkt het?" (anchor scroll or modal video, keeping the visitor on the page)
- "Bekijk de prijzen" (anchor to the pricing section)
- "Lees reviews" (opens a modal or anchor, not an off-site Google page)
- In the flow: "Upload je factuur voor een exacte berekening"
- For hesitant visitors (exit intent / after 60% scroll on desktop): "Stuur mij mijn besparing" (email capture), never a blocking modal on mobile.

### 5.5 What NOT to link out to (on conversion paths)
- **No outbound links to Google Reviews, supplier websites, VREG/CREG comparators (V-test), YouTube or social media** from the hero, pricing or flow. Embed reviews instead and show them with a "Geverifieerd via Google" source label.
- **Login** is a small text link in the utility nav, never a button next to the primary CTA.
- **Visie, Partnervoordelen, jobs and press** go to the footer.
- In the sign-up flow: **no global nav** (logo only, linking home with a leave confirmation only if data was entered), no footer links other than privacy/terms (opening in a modal) and support.
- Supplier logos must not be clickable.

---

## 6. Hypothesis backlog (for A/B tests on the winning variant)

Scoring uses **ICE**: Impact × Confidence × Ease, each 1–5. The expected-lift ranges are directional estimates on `signup_started` unless stated otherwise.

| ID | Hypothesis ("If we…, then…, because…") | Primary metric | Exp. lift | I | C | E | ICE |
|---|---|---|---|---|---|---|---|
| H1 | If we put an **inline postcode field in the hero** (vs button only), starts rise because the first step is taken on-page (foot-in-the-door) | signup_started | +10–25% | 5 | 4 | 4 | 80 |
| H2 | If the CTA says **"Bereken mijn besparing"** instead of "Ontdek hoe June jou kan helpen", clicks and starts rise because of the outcome clarity | cta_click, started | +8–20% | 4 | 4 | 5 | 80 |
| H3 | If we show a **personalised estimate before any personal data or plan choice**, completions rise because value is proven before cost | started→completed | +15–30% | 5 | 4 | 2 | 40 |
| H4 | If **Switch Plus is preselected as "Aanbevolen · Risicovrij"**, plan-step conversion and ARPU rise (compromise effect and risk reversal) | plan_selected, ARPU | +5–15% | 4 | 4 | 5 | 80 |
| H5 | If prices show the **yearly total first (€99/jaar = €8,25/m)**, completion rises and refunds fall because there is no billing surprise (guardrail: starts may dip slightly) | completed, 14-day cancels | +3–8% completed | 3 | 3 | 5 | 45 |
| H6 | If a **guarantee badge sits next to the hero CTA**, starts rise because perceived risk falls | started | +5–12% | 4 | 3 | 5 | 60 |
| H7 | If we show **net savings (savings − fee)** on the estimate, completion rises because the value is credible and concrete | completed | +4–10% | 3 | 3 | 4 | 36 |
| H8 | If we add a **"Hoe verdient June geld?" transparency block** near pricing, starts rise among consideration-stage visitors | started (pricing viewers) | +3–8% | 3 | 3 | 5 | 45 |
| H9 | If the **sticky mobile CTA** is on, mobile starts rise | started (mobile) | +5–15% | 4 | 4 | 5 | 80 |
| H10 | If we **remove the hero video** for a static or product visual, LCP improves and starts rise (performance) | started, LCP | +2–8% | 3 | 3 | 5 | 45 |
| H11 | If step 2 uses **tap chips (household size) instead of kWh inputs**, step-2 completion rises | estimate_viewed/started | +10–20% | 4 | 4 | 4 | 64 |
| H12 | If a **proof chip (★4,3 · 20.000+) sits within the CTA group** vs in a separate section, starts rise | started | +3–7% | 3 | 3 | 5 | 45 |
| H13 | If we show a **savings range ("€280–€360")** instead of a point estimate, completion rises because the range reads as more honest (guardrail: perceived value) | completed | ±5% (uncertain) | 3 | 2 | 5 | 30 |
| H14 | If **Premium is upsold only to digital meter / solar visitors**, Premium take-up rises without hurting overall completion | Premium share, completed | +20–40% Premium share | 3 | 4 | 4 | 48 |
| H15 | If we add **optional email capture "Stuur mij mijn berekening"** at the estimate, recovered sign-ups (7-day) rise | leads, 7-day completed | +5–10% recovered | 3 | 4 | 4 | 48 |
| H16 | If we add **cost-of-waiting copy ("elke maand wachten ≈ €27")**, starts rise via loss aversion | started | +2–6% | 2 | 3 | 5 | 30 |
| H17 | If the **flow has no global navigation** (enclosed checkout), completion rises | completed | +3–8% | 3 | 4 | 4 | 48 |
| H18 | If **reviews show the € saved and the region** (vs generic praise), starts rise | started | +2–5% | 2 | 3 | 4 | 24 |
| H19 | If we offer a **bill upload as an optional accelerator** on the estimate, estimate accuracy and completion rise for uploaders without hurting others | completed | +2–5% | 2 | 3 | 2 | 12 |
| H20 | If we explicitly state **"Jij keurt elke switch goed – of laat June het automatisch doen"** near the CTA, starts rise among control-seeking users | started | +2–6% | 2 | 3 | 5 | 30 |
| H21 | If we add a **"Je stroom valt nooit uit" reassurance** in the flow, abandonment at the EAN/address step falls | step completion | +2–5% | 2 | 3 | 5 | 30 |
| H22 | If **FR pages use FR-specific reviews and Walloon examples**, FR starts rise | started (FR) | +3–10% FR | 3 | 3 | 3 | 27 |

**Suggested test order** (high ICE first, and not dependent on engineering-heavy flow changes): H1/H2 → H9 → H4 → H6 → H11 → H5 (with its guardrail) → H3 once the estimate engine is ready.

### Which hypotheses each variant concept embodies

| Variant | Core bet | Hypotheses embodied | Conversion risk to watch |
|---|---|---|---|
| **A Calm Confidence** (premium minimal) | Clarity and restraint build trust; fewer elements means less distraction | H2, H6, H10, H12, H17, H20; short trust row; guarantee as quiet reassurance | Too little proof or energy leads to weak urgency; the calculator is hidden behind a button (lacks H1) |
| **B Savings First** (calculator hero) | Value proven immediately; the first step is taken in the hero | **H1, H3, H7, H11, H13, H15, H16**, H4 at plan step | Can feel "comparison-site"-like; must not lose brand trust; guard the start→complete ratio against low-intent starts |
| **C Honest Market** (transparency/editorial) | Trust through radical transparency (how June earns money, methodology, market data) | **H8**, H5, H7, H13, H18, H21, H22; €326 methodology | Long-form content can distract from the CTA; needs strong in-content CTAs and a sticky CTA (H9) |
| **D Product Showcase** (app-led, Premium upsell) | Tangible product (app, dashboard, dongle) makes the abstract service concrete; drives ARPU | **H14**, H4 (with a Premium anchor), H20, H10 (product visual instead of video) | Can make June look complex or "for techies"; analog meter users may feel excluded, so ensure Switch/Plus prominence |
| **E Bold June** (loud brand) | Emotional, memorable, urgency-driven | **H16**, P5 CTA, H9, H6 (bold guarantee), H2 | Loud tone can raise scam-anxiety in an energy context; needs proof chips close by (H12); the FR tone must be adapted, not translated |

**Recommendation:** the winning variant will likely be a **B-structure (inline calculator hero, estimate before plan) combined with C's trust blocks and A's visual restraint**. Test D's Premium logic (H14) as a module inside the flow rather than as a homepage strategy.

---

## 7. Conversion evaluation rubric (for the variant evaluation phase)

Score each criterion from 1 to 5. Weights sum to 100. **Weighted score = Σ(score × weight) / 5**, giving a maximum of 100. A variant scoring ≤ 2 on any **gate** criterion (G) cannot win, whatever its total.

| # | Criterion | Weight | 1 = poor | 3 = adequate | 5 = excellent |
|---|---|---|---|---|---|
| 1 | **Value proposition clarity (G)**: in 5 seconds, can a visitor say what June does and what they gain? | 12 | Mechanism-led or vague; no concrete benefit above the fold | Benefit stated, but generic or competing with other messages | Outcome-first headline plus a concrete € benefit plus "automatic" in one glance; 5-second test passes on NL and FR |
| 2 | **Primary CTA strength (G)**: wording, prominence, consistency | 12 | Vague label ("Meer info"), low contrast, several competing CTAs | Clear label and visible, but inconsistent across the page or no mobile sticky | One action-plus-outcome label repeated site-wide; high contrast; above the fold; sticky on mobile; secondaries clearly subordinate |
| 3 | **Friction to start**: effort from landing to `signup_started` | 10 | ≥ 2 clicks plus a form with personal data before any value | 1 click to a short step 1 | Inline postcode in the hero; zero clicks; numeric keypad; step 1 = 1 field |
| 4 | **Personalised value before commitment** | 10 | No estimate; plan and payment asked first | Generic average or estimate shown after account creation | Personal estimate (range, net of fee) before personal data and before plan choice |
| 5 | **Pricing clarity and compliance (G)** | 10 | Monthly only, yearly billing hidden; no recommended plan | Yearly visible but secondary; recommendation present | Yearly total prominent with monthly equivalent, incl. VAT; Switch Plus recommended; net savings shown; comparison table scannable |
| 6 | **Risk reversal / guarantee** | 8 | Guarantee absent or buried | Guarantee on the pricing card only | Guarantee framed as "risk-free" near the hero CTA, pricing and plan step; terms one click away |
| 7 | **Anxiety reduction coverage** (independence, business model, cancel, data, no cut-off) | 10 | ≤ 1 objection answered, and only in the FAQ | 3–4 objections answered, partly near CTAs | All key objections answered contextually at the point of doubt, with no clutter |
| 8 | **Social proof quality and placement** | 8 | Stats only in one section; generic testimonials | Rating plus count near the hero; testimonial carousel | Proof within reach of every CTA; specific reviews (€ saved, region, NL and FR); verified source label; no outbound link |
| 9 | **Distraction control** | 6 | Video hero, login/nav competing, outbound links, clickable logos | Some competing elements remain | Single focus per section; enclosed flow; Login/Visie/partners demoted; no exit links on the path |
| 10 | **Relevance and segmentation** (meter type, solar, region, language) | 6 | One-size-fits-all; FR as literal translation | Some conditional content (e.g. Premium explained) | Flow adapts (Premium only if digital/solar); localised FR proof and tone; SEA landing parity |
| 11 | **Honest urgency** | 4 | None, or fake countdowns / scarcity | Generic "start today" | Credible cost-of-waiting framing tied to the user's estimate |
| 12 | **Mobile conversion ergonomics and performance** | 4 | CTA below the fold on mobile; heavy video; LCP > 4 s; tap targets < 44 px | Usable, but the CTA is not sticky or the layout is heavy | CTA in the first viewport at 375 px; sticky CTA; LCP < 2,5 s; thumb-zone layout; no horizontal scroll |
| | **Total** | **100** | | | |

**Also record for each variant:** (a) the hypotheses from §6 it embodies, (b) the top 3 conversion risks, and (c) the elements worth porting into the winner, even if the variant loses.

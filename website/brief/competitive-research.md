# Competitive & reference research — june.energy redesign

Date: 2026-09-23 · Author: competitive & reference researcher (Phase 2)
Inputs: `source-content-mapping.md`, `source-site-taxonomy.md`, `/brief/brand-notes.md`, `/brief/reference-research.md` (in-app Insights research, which already covers Oura/Stripe/Linear/Apple/Tibber/Octopus data-viz).

**Sources and how far to trust them.** Every site I tried to fetch was blocked by the sandbox egress proxy (june.energy, mijnenergie.be, boltenergie.be, octopus.energy, lookaftermybills.com, wise.com, switchup.de, vtest.vreg.be), so nothing here was read directly. Tags:
- **[S]**: from web-search snippets of the linked page or a third-party review. Good enough to confirm a feature, a price or a model exists. Not good enough for layout detail.
- **[GK]**: general product and design knowledge that I could not confirm this session. Check it against a screenshot before building on it.
- **[F]**: fetched in full. Nothing in this document has this tag.

---

## 0. TL;DR for the strategy brief

1. **No other Belgian service does what June does.** The alternatives are manual comparison tools (V-test, Mijnenergie.be, Selectra, Callmepower), one-off group purchases (Test-Aankoop with Mega, Wikipower) and suppliers. All of them ask the household to *come back and act again*. June is the only one that keeps watching [S]. The site should sell **"you never have to do this again"**, not "cheap energy".
2. **June's model is paid and whole-market, with no commissions (verify).** That is the Flipper/Wechselpilot model, not the free, commission-funded Look After My Bills/SwitchUp/Switchcraft model. Commission-funded switchers admit they only switch you to suppliers that pay them [S]. June can make the fee a *trust asset*: "you pay us, so we work for you". **This depends on confirming June takes no supplier commissions. See the claims register.**
3. **The 2026 market backs the "someone should watch this" story.** In March 2026 Mega and Octa+ changed fixed-price tariff cards in the middle of the month. Test-Aankoop complained to the CREG and the Economic Inspection, and the CREG raised transparency concerns [S]. A monitoring service is easier to justify when even "fixed" prices move.
4. **The guarantee is the strongest asset and it is under-used.** The Winstgarantie (€99 back if savings don't beat the fee) is the only risk-reversal in the Belgian market. Flipper's "we only charge if we save you £50" [S] shows how strong this can be as a headline. It belongs next to the price, not inside a feature bullet.
5. **Expectation gap is the biggest trust risk.** Trustpilot for june.energy is mixed (~531 reviews). One recurring complaint is "only one proposal in 11 months" [S]. The site has to explain that *no switch means you are already on the best rate* and show the cadence (monthly check, first proposal within 30 days [S]).
6. **Numbers are inconsistent.** €326/yr average (Switch) vs "€511 savings per year" (Premium) [S], and 20.000+ customers vs 4.3/5 on Google with 1.200+ reviews. Pick one source of truth per claim, with a footnote. Wise-style transparency cannot coexist with unexplained averages.

---

## 1. Belgian competitors and alternatives

| Player | Type | Value prop | Price presentation | Trust devices | Sign-up first step | Guarantee |
|---|---|---|---|---|---|---|
| **V-test® (VREG)** | Government comparison tool, Flanders | Official, neutral comparison of all contracts for your address and usage. Now also **V-check**, reached from a QR code on every energy bill [S] | Estimated annual cost for your current contract vs every offer [S] | Government authority, "15 years" [S] | Postcode + consumption (or upload bill data) [S] | None. Manual, one-shot |
| **Mijnenergie.be** (Compare Group) | Commercial comparison + switch | Free, independent comparison and switch for households and businesses [S]. KBC partnership [S] | Ranked list, annual cost [GK] | Trustpilot (~198 reviews, mixed) [S]. Bank partner | Postcode + household profile [GK] | None. Earns commission [S] |
| **Selectra / Callmepower / Aanbieders / Mijn-groene-energie** | SEO content + phone sales | "Change supplier for free in 4 steps" [S] | Tariff tables per supplier [S] | Volume of content, phone line [GK] | Phone call or form [GK] | None |
| **Test-Aankoop group purchase** | Consumer-org collective buy (2025: fixed + variable, both with **Mega**) [S] | Strength in numbers + the consumer org's name | One personalised offer after the tender [S] | Test-Aankoop brand, "free and non-binding" [S] | Register, then receive offer, then accept [S] | Non-binding sign-up. Offer is one-off |
| **Wikipower** (also municipal / HLN editions) | Group purchase | 37.000+ households registered. "Previous participants saved €535 avg" [S] | Savings by region (e.g. Wallonia gas up to €727) [S] | Counter of households, media partner (HLN), municipalities [S] | Free, non-binding registration [S] | None. Once a year |
| **Bolt** | Supplier (since 2018) | Local green power from named producers [S] | 3 formulas (fixed 1 yr, variable monthly, dynamic hourly), platform fee, monthly tariff cards [S] | Producer faces/stories [S] | Tariff finder "Vind het tarief dat écht bij je past" [S] | None |
| **Mega / Octa+** | Low-cost digital suppliers | Cheap + app (myMega, My OCTA+) [S] | Monthly tariff cards. Smart/Cosy/Zen Fixed 1–3 yrs [S] | App, price leadership | Online quote | **Damaged in March 2026** by mid-month repricing of fixed contracts [S] |
| **Engie / Luminus / TotalEnergies** | Incumbents | Scale, services (solar, heat pumps) [GK] | Complex tariff cards [GK] | Brand size | Long quote form [GK] | Occasional promo credits [GK] |
| **Frank Energie (BE since Aug 2023)** | Dynamic-price supplier, NL origin | "Energy at market price", hourly prices in-app, smart charging [S] | Fixed monthly fee (NL ~€7/mo) + market price [S] | App-first, transparency | Digital meter required [S] | None |

**What this means for June**
- Every Belgian alternative is an **event**: a comparison, a group purchase, a promo. June is the only **subscription** to the outcome. Make "one-shot vs always-on" the core comparison device (a table: V-test / group purchase / June).
- Group purchases already spend heavily on "free and non-binding" and big household counters. June charges, so it has to answer "why pay?" above the fold. The answer is the guarantee plus monthly monitoring.
- June's own blog already runs "VREG V-test or June Switch?" [S]. That is proof the comparison works as content. Bring it into the product pages.

## 2. Auto-switch services abroad (June's true peers)

| Service | Model | Savings claim | Trigger rule | Notes |
|---|---|---|---|---|
| **Flipper (UK, 2016–2021)** | **£30/yr, charged only if it saves ≥ £50** [S] | £385 avg, Trustpilot 4.7 (3.800+) [S] | Monthly market check, "flips" you each time [S] | Whole-of-market *because* it took no commission [S]. Closed Sept 2021 when the market collapsed [S] |
| **Look After My Bills (UK)** | Free, commission-funded [S] | — | Switches if saving ≥ £50 at contract end [S] | "Only switched to suppliers that pay a referral fee" [S]. No longer operating [S] |
| **Switchcraft (UK)** | Free, commission-funded [S] | £268 avg [S] | Fixed plans: switch in the last 49 days, so no exit fees [S] | "Not whole of market", but "presents options in price order" [S] |
| **Weflip (UK)** | Free/commission (Flipper successor positioning) [S] | — | — | — |
| **SwitchUp (DE)** | Free, commission from the new supplier [S] | — | Annual auto-switch [S] | "Ehrliche Antworten" (honest-answers) FAQ page [S]. Publishes a competitor comparison "Tarifaufpasser im Vergleich" [S] |
| **Wechselpilot (DE)** | **20% of the savings achieved**, no other fees [S] | — | Annual [S] | Finanztest winner 12/2021. "Minor limitations" in Warentest 09/2025. WechselFabrik and Stromauskunft top [S] |
| **Pricewise / Overstappen / EasySwitch (NL)** | Free comparison + switch in 3 steps [S] | "Up to €700" / "up to €580" [S] | Manual. "Switch every year" advice [S] | automatischoverstappen.nl does annual auto-switching [S] |

**Lessons**
- **A threshold rule makes a promise concrete.** "We only switch when you save at least €X" (Flipper/LAMB £50) and "we switch in the last 49 days so you never pay exit fees" (Switchcraft) are specific, credible mechanics. June should state its switching rule in one sentence (e.g. "only when the new contract is cheaper after all costs, and never with a break fee"). **Needs product confirmation.**
- **Independence is the main differentiator in this category.** Commission-funded switchers have a structural conflict they have to disclose. A paid model is the cleaner story, *if true* for June.
- **Independent ratings (Warentest/Finanztest) are the trust currency in DE.** The Belgian equivalents are a Test-Aankoop mention, the CREG/VREG (June should cite V-test data only as context, never imply endorsement) and press. Ask the PO for any press or awards.
- **Category risk:** auto-switchers failed in the UK when the market went flat (2021). The site should also sell monitoring, reports and insight (Premium/Dongle), not only switching. That supports concept D.

## 3. Best-in-class premium conversion references

| Reference | Pattern worth borrowing | Tag |
|---|---|---|
| **Octopus Energy** | Hero with a single postcode field and a "Get a quote" CTA. Trustpilot score directly under the CTA ("800.000+ reviews, never below Excellent in 5 years"). Mascot (Constantine) only in illustration moments. Plain-English tariff names | [S] trust stats, [GK] layout |
| **Tibber** | App-screen-led hero, one hero number (live consumption), dark contrast sections. Pricing as "monthly fee + market price, nothing else" | [S] app, [GK] site |
| **Wise** | **Price calculator as the hero**: input, then fee broken into line items, then "you get", then "compare with banks". Each fee is shown, named and explained. A "no hidden fees" claim backed by the breakdown | [GK] |
| **Lemonade** | Conversational, one-question-per-screen sign-up with a progress bar. "Giveback" and "how we make money" explained in a single illustrated diagram. Strong guarantee language | [GK] |
| **Monzo / Revolut** | 3–4 tier plan table with a sticky header row and a highlighted "most popular" plan. Monthly/annual toggle. Tier cards that stack into swipeable cards on mobile | [GK] |
| **Qonto** | EU-B2C-ish trust: regulator and licence line in the hero footer, customer counts, and a trust strip of press logos. Very clean NL/FR/DE language switcher that keeps you on the same page | [GK] |
| **Stripe** | Tabular numerals, restrained gradients, light-weight display numbers, "the table is the truth". Precise micro-motion on scroll | [S] via `/brief/reference-research.md` |
| **Linear** | Calm, low-border surfaces. Content-first. Motion only for state change. Warm-tinted neutrals | [S] |
| **Oura** | Premium hardware+subscription story: product photography, then "what you get with membership", then price. A single hero metric explained by contributors. That maps to Premium + Dongle | [S]/[GK] |
| **Airbnb / Booking** | Estimator inputs as big tappable "chips" (household size, meter type) rather than form fields. Live-updating result. "Free cancellation" badge placed next to the price | [GK] |

Cross-cutting patterns:
- **Mobile sticky CTA.** A bottom bar with price and CTA ("Vanaf €5,75/maand · Start") that appears after the hero CTA scrolls out of view. Hide it inside forms. [GK]
- **Language switch.** "NL | FR" as text (no flags), kept on the same path (`/nl-be/switch-plus` ↔ `/fr-be/switch-plus`), and remembered. [GK]
- **FAQ.** Accordion with 6–8 objection-ordered questions. The first is always "Are you a supplier?" or "What does it cost/what if I don't save?". Each answer ends with a CTA or deep link. Mark up with FAQPage schema. [GK]
- **Motion.** Numbers count up once, charts draw in on first view, `prefers-reduced-motion` gives static output. Never on repeated interactions (Apple HIG [F] via the earlier research file).

## 4. Pattern library mapped to June's pages

### Home
1. **Outcome hero with a single micro-input.** "Nooit meer te veel betalen voor energie" plus a postcode or "gas / elek / beide" chip that leads into sign-up. Source: Octopus postcode hero [GK], Airbnb chips [GK].
2. **Trust line directly under the CTA.** Google 4,3/5 · 1.200+ reviews · 20.000+ households · "independent, no supplier" [content map]. Source: Octopus Trustpilot strip [S].
3. **"One-shot vs always-on" comparison block.** V-test / group purchase / June, compared on "checks every month", "switches for you", "guarantee". Source: SwitchUp "Tarifaufpasser im Vergleich" [S], June blog [S].
4. **Three-step mechanism with real timing.** Link meter, then first proposal within 30 days, then monthly check [S]. Source: Lemonade/Octopus step rows [GK].
5. **Guarantee band.** Full-width "Bespaar meer dan je abonnement, of €99 terug". Source: Flipper "only pay if we save" [S].

### Plans & pricing (Abonnementen)
1. **Three-column table** (Switch €5,75 · Switch Plus €8,25 marked "Aanbevolen" · Premium €16,50), with a sticky plan header on scroll and cards that swipe on mobile. Source: Monzo/Revolut [GK].
2. **Price shown with its break-even.** "€8,25/maand = €99/jaar. Average saving €326" as a small bar that shows fee vs saving. Source: Wise fee breakdown [GK].
3. **Guarantee badge on the tier itself**, not in a footnote. Source: Booking "free cancellation" next to price [GK].
4. **"How we make money" disclosure**, one paragraph plus a diagram: you pay June, not suppliers (verify). Source: Lemonade [GK], SwitchUp honest answers [S].
5. **Plan picker quiz** (3 questions: digital meter? solar? want the guarantee?) that recommends a plan. June already has "Welke June formule past bij jou?" [S].

### Switch Plus product page
1. **Guarantee as the hero.** Headline states the guarantee mechanics in one sentence, with the terms link directly below. Source: Flipper [S].
2. **Sample annual savings report.** A rendered mock of the report in June's Insights style. Source: Oura/Stripe [S].
3. **Switching-rule card.** "When we switch / when we don't". Source: Switchcraft 49-day rule [S].
4. **Upgrade path** to Premium: "add the Dongle for 15-minute insight". Source: Oura membership [GK].

### How it works (Hoe werkt het)
1. **Timeline with durations** (day 0 sign-up, then ≤30 days first proposal, then monthly check, then switch handled, no power interruption). Source: Switchcraft how-it-works [S].
2. **"What if nothing happens?" callout.** No switch means you're on the best deal, plus a monthly "checked" notification. This addresses the Trustpilot complaint [S].
3. **Approve-or-auto toggle illustration.** "You decide: automatic or approve each switch" [S].
4. **Coverage proof.** "17+ suppliers compared" with a logo wall [content map].

### FAQ
1. **Objection-ordered accordion.** Supplier? Cost vs saving? Break fees? Power cut? Cancel (1-month notice [S])? Analogue meter? Source: SwitchUp "Ehrliche Antworten" [S].
2. **Search + category chips** (Prijs, Overstappen, Meters, Premium). [GK]
3. **Answer, then deep link, then CTA** in each item. Include FAQPage schema. [GK]

### Sign-up steps 1–2
1. **One question per screen**, with a progress bar of 2–4 steps. Step 1: energy type (gas/elek/both, same price [S]) plus postcode. Step 2: plan choice, with the recommendation pre-selected. Source: Lemonade [GK], Octopus quote [GK].
2. **Persistent summary rail** (plan, price, guarantee) on desktop, collapsible on mobile. Source: Booking checkout [GK].
3. **Reassurance micro-copy at each field.** "Cancel anytime with 1 month notice" [S]. "We never switch without your OK" (if the approve mode is chosen). Source: Airbnb [GK].
4. **Save and resume** (email magic link). [GK]

## 5. Positioning gaps June can own

1. **"Set and forget", the only always-on option in Belgium.** Group purchases and V-test are annual chores [S].
2. **Paid means loyal to you.** Commission-funded switchers disclose conflicts [S]. June can own "independent, never paid by suppliers". **Verify.**
3. **The only guarantee in the market.** No Belgian competitor offers risk-reversal [S/GK].
4. **Protection when "fixed" isn't fixed.** The March 2026 Mega/Octa+ repricing [S]. Frame it carefully: factual and without naming competitors in ads (Belgian comparative-advertising rules).
5. **Insight + switching.** Frank/Tibber own insight *inside a supplier*. June can own **supplier-independent** insight (Dongle, solar self-consumption) that follows you across switches.
6. **NL + FR parity.** V-test is Flanders-only [S]. June covers Flanders, Brussels and Wallonia [S], so the whole country can be the pitch.

## 6. The five candidate concepts: references and risks

| Concept | Best references | Borrow | Risks |
|---|---|---|---|
| **A Calm Confidence** (mint canvas, rounded surfaces, Montserrat numerals, June Green, continuous with in-app Soft Native) | Linear, Stripe, Oura, Monzo, Qonto | Low-border surfaces, tabular display numerals, one accent colour, calm motion. Web and app feel like one product | Can read as generic fintech. Low contrast (mint on white, green text) risks WCAG AA. Needs a strong headline and guarantee to avoid being "calm but forgettable". Show the app early to justify continuity |
| **B Savings First** (calculator-led hero) | Wise, Airbnb/Booking chips, Octopus quote, Wikipower regional savings | Live estimate from 2–3 chips. Fee vs saving breakdown. Result feeds directly into sign-up step 1 | **Claim risk.** June can't personalise savings honestly without real consumption data. Must show "indicative, based on average €326" plus a methodology footnote. A calculator adds friction if it asks more than 3 inputs. Looks like a comparison site, which blurs the difference from Mijnenergie |
| **C Honest Market** (editorial, transparency/independence) | SwitchUp "Ehrliche Antworten", Lemonade "how we make money", Wise transparency, Test-Aankoop tone | "How we make money" block. One-shot vs always-on table. Market-events explainer (March 2026). Methodology page | **Must be true.** The independence and no-commission claims need legal and PO confirmation. Editorial layouts can bury the CTA, so keep a sticky CTA. Naming competitors risks comparative-advertising issues. Long reads convert worse on mobile |
| **D Product Showcase** (app/dashboard-led, Premium/Dongle upsell) | Tibber, Frank app, Oura (hardware + membership), Octopus Agile charts | App-screen hero with a live-looking savings number. Dongle product shot. "Your year in energy" report mock | Pulls attention to the €16,50 tier when most prospects need to understand Switch first. **Placeholder app screens must be clearly marked.** Needs a digital meter (analogue users get lost). Upsell can feel pushy to the "sceptical 60+" persona |
| **E Bold June** (brand book at full volume: blobs, halftone, squiggles, Junior, Red/Green) | Octopus (Constantine mascot + illustration), Lemonade (playful but trustworthy), Monzo early brand | Mascot in hero and empty states. Energy-type colours. Hand-drawn bolt | "Premium, first-class" is the brief, and 2018 blobs can look dated or childish. June Red next to money reads as an alert. Busy visuals hurt Lighthouse performance and a11y (illustration weight, contrast on halftones). Mascot localisation in NL/FR is fine, but humour must translate |

**Recommendation for which to build.** A, B and C cover the three core purchase motives: trust in the brand, a savings number, honesty and independence. D works best as a *section pattern* inside A (Premium page and app band) rather than as a whole site. E is worth doing as a style tile only, with elements borrowed into A (Junior in empty and success states, a halftone accent).

---

## Claims register items raised by this research (for content strategist)
- Does June receive **any** supplier commission? (Drives C and the "paid means loyal" positioning.)
- Switching rule: minimum saving threshold? Timing to avoid break fees (Belgian residential contracts have no break fee since 2012 [GK], so confirm and use it)?
- Reconcile €326 (Switch avg) vs €511 (Premium) [S]. Methodology and date.
- Current Google/Trustpilot figures and dates (Trustpilot historically 3.9 on 384 reviews, 2022 [S]).
- Partner channels as trust: Telenet, Touring, KBC? (Telenet and Touring landing pages exist [S].)

## Sources
- June: https://www.june.energy/nl-be/switch · https://www.june.energy/nl-be/switch-plus · https://www.june.energy/nl-be/premium · https://www.june.energy/nl/blog/vreg-v-test-vergelijken-june-switch · https://www.touring.be/nl/touring-voordelen/juneenergy · https://www2.telenet.be/residential/nl/landingspaginas/june-energy.html · https://www.trustpilot.com/review/june.energy
- V-test: https://vtest.vreg.be/ · https://www.vrt.be/vrtnws/nl/2025/08/28/v-check-v-test-energiefactuur/
- Mijnenergie: https://nl-be.trustpilot.com/review/www.mijnenergie.be · https://newsroom.kbc.com/met-mijnenergiebe-helpt-kbc-u-aan-een-voordelig-energietarief
- Group purchases: https://nl.wikipower.be/blog/test-aankoop-groepsaankoop/ · https://nl.wikipower.be/blog/winnaar-groepsaankoop-wikipower · https://www.samensterker.be/nl/groepsacties/energie
- Suppliers: https://selectra.be/nl/energie/leverancier/bolt · https://selectra.be/nl/energie/leverancier/mega · https://luna.be/en/press-releases-customers/frank-energie-maakt-met-dynamische-contracten-intrede-op-vlaamse-energiemarkt/ · https://www.frankenergie.nl/nl/dynamisch-energiecontract
- March 2026 repricing: https://www.vrt.be/vrtnws/nl/2026/03/17/na-mega-past-ook-octa-tariefkaarten-aan-voor-vaste-energiecontr/ · https://www.test-aankoop.be/woning-energie/gas-elektriciteit-mazout-pellets/pers/oorlog-midden-oosten-mega-past-tariefkaarten-aan
- UK: https://moneytothemasses.com/quick-savings/utilities/flipper-review-is-it-the-best-energy-auto-switching-site · https://moneytothemasses.com/quick-savings/utilities/look-after-my-bills-review-is-it-the-best-energy-switching-service · https://www.householdmoneysaving.com/look-after-my-bills-review/ · https://www.switchcraft.co.uk/how-it-works/ · https://www.moneyraters.com/reviews/switchcraft-review/
- DE/NL: https://www.switchup.de/fragen · https://www.switchup.de/tarifaufpasser · https://www.test.de/gas-und-strom-wechselservice-test-5447465-0/ · https://besteprodukteimtest.de/test-wechselpilot/ · https://www.pricewise.nl/overstappen-energie/ · https://www.automatischoverstappen.nl/energie/
- Octopus trust stats: https://octopus.energy/customer-service-rankings/
- Design references (Stripe, Linear, Oura, Tibber, Octopus, Apple HIG): see `/brief/reference-research.md`.

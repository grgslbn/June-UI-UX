# June website redesign — UX research & information architecture

Role: UX researcher / information architect. Scope: www.june.energy marketing site (Astro, NL + FR), primary conversion = **start sign-up**.
Inputs: `website/brief/source-content-mapping.md` (content as of March 2026), `website/brief/source-site-taxonomy.md`, `brief/brand-notes.md`, and knowledge of the Belgian retail energy market. The live site was not reachable, so this is desk research, not user research. Every persona and hypothesis here needs checking against analytics, support tickets and 5–8 moderated sessions per language.

Markers used below: **[C]** = fact or claim the product owner must confirm before it goes live; **[A]** = assumption.

---

## 0. Key findings (summary)

1. **The first objection people have is about what June is, not what it costs.** Visitors think June is a supplier, a free comparison site or a scam. "Not a supplier, your power keeps flowing, and you pay us a fixed fee" has to appear in the hero area, not in the third FAQ item.
2. **The €99 Switch Plus guarantee is exactly one year of Switch Plus fees (12 × €8,25 = €99).** So it is really *"Save more than you pay, or get your money back"*. This is the strongest trust asset on the site and it is currently hidden on a sub-page. It should be the default recommended plan and a hero-level proof point.
3. **Show net savings, not gross.** "Save €326 on average" next to a paid subscription makes people suspicious. "≈ €326 saved, €99 fee, ≈ €227 left for you" [C] is more believable and pre-empts the "too good to be true" reaction.
4. **The free public comparators (VREG V-test, CWaPE, Brugel) are the unspoken competitor.** Every comparison shopper will ask "why pay when V-test is free?". The answer (continuous monitoring, automatic switching, admin done for you, guarantee) must be on Plans & pricing and in the FAQ.
5. **The current taxonomy has no sign-up funnel at all.** It also duplicates Prices and Subscriptions, treats the Dongle as a separate product, hides the FAQ in the "utility" layer, and has no French mirror or regional logic.
6. **Sign-up should start with postcode, then a 3–4 question household profile, then an estimate, then email.** No email or EAN before value is shown. The postcode also sets the region (grid operator, capacity tariff in Flanders only, regulator) and flags edge cases such as budget meters.
7. **The 60+ sceptic decides by phone or with family help.** A visible phone number, an "approve every switch yourself" option and a printable one-page summary will lift trust more than any animation.
8. **FR is not a translation job.** FR visitors are mostly in Wallonia and Brussels, where there is no capacity tariff and regulators, grid operators and meter roll-out differ. Copy, FAQ and examples must be localised by region.
9. **Claim inconsistencies in the source content** ("17+ suppliers" vs "all Belgian suppliers"; "€326 average" with no basis; exact guarantee conditions) will undermine a premium, trust-led site. Each claim needs one definition and a footnote.

---

## 1. Personas

Region split assumption [A]: most NL traffic is Flemish (capacity tariff since 2023, digital meter roll-out largely complete); most FR traffic is Walloon or Brussels (no capacity tariff for households yet, slower digital meter roll-out, different regulator and grid operator names).

### P1 — "De Bespaarder / L'Économe" (Saver) · maps to **Switch**, upsell to Switch Plus
| | |
|---|---|
| **Context** | 28–45, rents or recently bought a house or flat, dual income, price-aware, busy. Knows they "should switch" but never does. Often arrives from a Google search ("goedkoopste energieleverancier", "fournisseur énergie moins cher") or a Meta ad. |
| **Jobs-to-be-done** | "When my energy bill goes up, I want someone to make sure I'm always on the cheapest deal without me thinking about it, so I stop overpaying and stop feeling guilty about it." |
| **Top questions** | How much will *I* save (not the average)? How much does it cost? How long does sign-up take? What do I have to do? |
| **Objections / anxieties** | "A subscription to save money? Sounds like a catch." "Is €326 real, or a marketing number?" "Why not just use V-test once a year?" |
| **Decision triggers** | A personal estimate in under a minute. Net savings after the fee. Visible Google rating (4,3/5, 1.200+ reviews [C: keep current]). "Cancel any time" [C]. |
| **Needs to see before "start"** | Price per month plus what that means per year; the net-savings figure; "takes 3 minutes"; "no change to your meter or installation". |
| **Device mix** [A] | About 70% mobile (ad → landing), with desktop for comparing. Short sessions. |
| **NL vs FR** | NL: responds to "zonder gedoe" and concrete euros. FR: "sans engagement" and "sans frais cachés" are the key reassurance phrases. "Économisez" must not read as a promo gimmick. |

### P2 — "De Voorzichtige / Le Prudent" (Risk-averse) · maps to **Switch Plus**
| | |
|---|---|
| **Context** | 35–60, homeowner, family, has been burnt by the 2022 energy crisis (fixed vs variable contract shock) or by a door-to-door seller. Reads the small print. Often compares 2–3 services in tabs. |
| **Jobs-to-be-done** | "When I hand over something as essential as my energy contract, I want guarantees and control, so I never end up worse off or without power." |
| **Top questions** | What if I don't save? Can I stay on a fixed contract? Will I ever be switched to a variable/dynamic contract without my OK? Who is liable if something goes wrong? Can I stop? |
| **Objections / anxieties** | Being locked in; exit fees; losing supply during the switch; June "switching me every month" (lots of admin and emails); data and privacy; the company going bankrupt (memories of suppliers failing in 2021–22). |
| **Decision triggers** | The **guarantee** stated plainly with its conditions; the "approve every switch yourself" option; regulator references (VREG/CWaPE/Brugel, CREG) explained correctly; a named company with an address and KBO/BCE number; an annual savings report. |
| **Needs to see before "start"** | Guarantee terms (1 sentence + link to full conditions); "you can cancel [C: notice period]"; "switching is free and your supply is never interrupted — this is guaranteed by law"; which contract types June picks (fixed/variable, green). |
| **Device mix** [A] | 50/50. Research on desktop in the evening, sign-up often on desktop. |
| **NL vs FR** | FR: the "garantie" wording is legally sensitive and needs FR-native legal copy (not "remboursement" if it is really a credit [C]). Brussels visitors look for Brugel/Sibelga; Walloon visitors look for CWaPE/ORES/RESA. |

### P3 — "De Tech-liefhebber / Le Technophile" (Tech enthusiast) · maps to **Premium** (P1 dongle + solar)
| | |
|---|---|
| **Context** | 30–55, homeowner with a digital meter, solar panels, often a heat pump, EV or home battery. Flanders-heavy (capacity tariff, prosumer tariff gone for digital meters, low injection prices). Compares with Homey, Smappee, HomeWizard, the Fluvius app and dynamic contracts. |
| **Jobs-to-be-done** | "When I've invested in solar and an EV, I want to see in real time what I produce, use and inject, and be on the contract that suits that profile, so my investment pays back faster and I keep my capacity peak low." |
| **Top questions** | Which P1 meters does the dongle support? Do I have to open the P1 port myself (Mijn Fluvius)? Wi-Fi requirements? 15-minute data, peak/capacity-tariff view? Does the comparison account for injection prices and dynamic contracts? Data export and API? Who owns my data? |
| **Objections / anxieties** | "I already have a HomeWizard, why pay €16,50/m?" Data privacy (15-minute data shows when you're home). Lock-in to hardware. Whether the algorithm handles solar, EV and dynamic tariffs properly. |
| **Decision triggers** | Real dashboard screenshots and specs; a compatibility checker; peak/capacity-tariff features; honest comparison with "Switch Plus + your own dongle" [C: is that supported?]. |
| **Needs to see before "start"** | Compatibility (meter type and P1 activation steps); what's in the box; data/privacy statement; that Premium includes the guarantee. |
| **Device mix** [A] | Desktop research, mobile for the app. Deep sessions. Reads specs. |
| **NL vs FR** | Capacity tariff content is **NL/Flanders only**. FR/Wallonia: talk about solar self-consumption and the compteur communicant roll-out instead, and don't promise peak-tariff savings. Brussels: fewer solar homes, more apartments, so Premium is less relevant. |

### P4 — "De sceptische 60-plusser / Le senior sceptique" · no specific plan, usually Switch Plus
| | |
|---|---|
| **Context** | 60–78, owns a house, often still on an analogue meter or a long-standing contract with the historic supplier (Engie/Luminus). Paper bills, domiciliation. Wary of online offers and door-to-door sellers. Often decides with a son or daughter, who may be the one actually on the site. |
| **Jobs-to-be-done** | "When my children tell me I pay too much, I want to be sure I'm not being scammed and that nothing breaks, so I can lower my bill without stress." |
| **Top questions** | Is this legit? Who are you? Will my electricity be cut off? Do I have to do anything technical? Can I call someone? What happens to my current supplier? Will I get paper bills? |
| **Objections / anxieties** | Scams and phishing ("they want my meter code and bank details"), technology ("I don't have a smart meter"), losing a social tariff or protected-customer status [C], losing the loyalty the historic supplier supposedly gives, too many changes/letters. |
| **Decision triggers** | A phone number and opening hours; a real team or address; press mentions; "works with analogue meters"; "you approve every switch"; a family member helping (so a "share this with someone" option); plain language; large readable type. |
| **Needs to see before "start"** | "No technical change at home", "your power is never interrupted", "free to leave", a human contact, and exactly what will be asked in sign-up (EAN from the bill, IBAN) and why. |
| **Device mix** [A] | Desktop or tablet (iPad), larger text, sometimes a phone via a Facebook post. Low tolerance for small tap targets and pop-ups. |
| **NL vs FR** | FR seniors in Wallonia: more analogue meters, more distrust of "démarchage". Wording must avoid anything that sounds like a sales pitch ("offre exclusive"). NL: "geen verkoper aan de deur" style reassurance. Both need formal register: FR uses **vous**; NL can use the current informal **je** but must stay respectful [C: brand decision — test "je" vs "u" with 60+]. |

**Cross-persona insight:** all four ask the same first three questions: *What are you? What does it cost me net? What can go wrong?* The homepage must answer those three before any feature content.

---

## 2. Key journeys

### J1 — First visit from a Google/Meta ad → sign-up start (P1, P4)
| Step | User state / question | Content needed | Drop-off risk | Mitigation |
|---|---|---|---|---|
| 1. Ad click ("Stop overpaying for energy") | "Is this what the ad said?" | Landing (Home or a dedicated ad variant) whose H1 matches the ad promise | Message mismatch, slow video hero on 4G | Match the ad headline; poster image instead of video on mobile; LCP < 2,5 s |
| 2. Above the fold | "What is this?" | H1 + one-line explainer: *"June isn't a supplier: we switch you to the cheapest one, automatically."* + postcode field / CTA + rating | Thinks it's a supplier or a free comparator | "Not a supplier" chip; subscription price visible in hero microcopy |
| 3. Scroll: how it works | "What do I have to do?" | 3 steps with effort per step ("2 min"), "no technical change" | Step 1 "Koppel je teller(s)" sounds technical | Reword to "Tell us about your home"; say analogue meters work |
| 4. Proof | "Is it real?" | Net-savings example, Google reviews, supplier logos, guarantee | Average figure not believable | Net figure plus footnote on method; a realistic distribution ("7 out of 10 customers save more than …") [C] |
| 5. Objections | "Catch?" | 5 top FAQs inline (supplier? money? lock-in? meter? current contract?) | FAQ is too far down | Keep the FAQ short on Home and link to the full FAQ |
| 6. CTA → sign-up step 1 | Commits to trying | Postcode-first form (prefilled if entered in hero) | Form asks for email or EAN first | See §4.4 |

### J2 — Comparison shopper → Plans & pricing → plan choice (P2, P3)
| Step | Question | Content | Drop-off risk | Mitigation |
|---|---|---|---|---|
| 1. Lands on /abonnementen (SEO "june energy prijs", or from a comparison article) | "What does it cost in total?" | 3 plan cards, monthly **and** yearly price, billing frequency, recommended = Switch Plus | Confusion between monthly and annual billing; "Prijzen" vs "Abonnementen" duplicate pages | One page; state "€8,25/month, billed yearly as €99" [C] |
| 2. Compare plans | "Which one for me?" | Feature table grouped by *Save / Guarantee / Insight*; a 2-question "Which plan fits?" helper (digital meter + solar?) | Too many rows; Dongle shown as a separate product | Collapse the table on mobile; Dongle only as a Premium feature |
| 3. Check the alternative | "Why not V-test (free)?" | "June vs. doing it yourself" block: a free comparator is a one-off; June monitors monthly and does the admin | Leaves to V-test | Honest comparison; no disparaging |
| 4. Check risk | "What if I don't save?" | Guarantee explainer + conditions link | Guarantee conditions unclear, so it reads like fine print | 3-bullet conditions inline [C] |
| 5. Choose → sign-up with plan preselected | | `?plan=switch-plus` carried into the funnel; plan can still be changed in step 2 | Plan choice lost in the funnel | Persist the chosen plan, show it in a summary rail |

### J3 — Referral / partner visitor (all personas)
| Step | Question | Content | Drop-off risk | Mitigation |
|---|---|---|---|---|
| 1. Link from a friend or partner (bank, employer, cooperative, newsletter) | "Is this the thing my friend or partner meant?" | Referral/partner landing page: *"Sarah invited you"* or co-branded partner logo + the benefit [C: referral reward, partner discount] | Generic homepage loses context | Dedicated `/uitnodiging/{code}` and `/partners/{partner}` templates; the code persists via cookie/URL through sign-up |
| 2. Benefit + explanation | "What do I get?" | Benefit stated once, then short Home content (what June is, how it works, plans) | Discount conditions unclear | Show the benefit in the funnel summary ("Partner discount applied") |
| 3. Sign-up | | Same funnel with code pre-applied; a field to enter a code manually if it was lost | Code lost across devices | "Have a code?" link in step 2 |

The current "Partnervoordelen" page mixes B2B partnership and customer benefits [A]. Split it into a **public partner-benefits index** (footer) and **per-partner landing pages** (not in the nav).

### J4 — Returning visitor / customer → login
| Step | Need | Content | Risk | Mitigation |
|---|---|---|---|---|
| 1. Types june.energy | Wants the dashboard or an invoice | "Inloggen / Se connecter" top-right on desktop; on mobile, an account icon in the header | "Login (External Portals)", plural, is confusing (app vs web vs dongle portal?) | One login entry → one page that routes to "Mijn June" web and the app store links [C: how many portals exist] |
| 2. Prospect who started sign-up and left | Wants to resume | "Continue your sign-up" via emailed magic link; the estimate is remembered | Has to start over | Save the estimate against the email captured in step 2 |
| 3. Customer looking for help | Support | Help/FAQ + contact in the footer and on the login page | Can't find contact | Contact page with phone, hours and email in both languages |

---

## 3. Objection map

Placement key: **H** = Home, **P** = Plans & pricing, **S+** = Switch Plus page, **HW** = How it works, **FAQ**, **SU** = sign-up funnel (inline microcopy), **About** = Over June / business model.
Answer mode: *inline* (sentence near the CTA), *chip/badge*, *FAQ*, *guarantee*, *proof* (numbers, reviews, logos), *explainer block*.

| # | Objection | Short answer (to be worded by copy, facts [C]) | Where | How |
|---|---|---|---|---|
| 1 | **Is June an energy supplier?** | No. June is an independent service. Your contract is with a licensed Belgian supplier; June picks it and switches for you. | H hero, HW step intro, FAQ #1, SU step 1 | Inline chip "Not a supplier" under H1; explainer diagram (You ↔ June ↔ Supplier) on HW |
| 2 | **How does June earn money?** | Customers pay a fixed subscription. [C: does June also get supplier commissions? If yes, say so and explain how neutrality is protected; if no, say "we take no commission from suppliers" — a strong claim]. | H FAQ block, P, About, FAQ | Explainer block "How we earn money" on P and About; links to the full answer |
| 3 | **Is it independent?** "Do you push certain suppliers?" | Compares [C: all / 17+] suppliers on price for your profile; ranking method described | HW (algorithm), H partner grid caption, FAQ | Supplier grid captioned "We compare X suppliers — none pay us for ranking" [C]; method page |
| 4 | **Is it safe to give meter/data access?** | What data is used (consumption, EAN), for what, stored where (EU), never sold; a mandate (volmacht) is needed only to switch for you | HW, Premium, FAQ, SU at the moment data is requested | Inline "Why we ask" tooltip at every sensitive field; privacy summary in plain words; GDPR link |
| 5 | **What if I don't save?** | Switch Plus/Premium: if savings < your fee, you get €99 back [C: exact rule, period, measurement basis, payout form] | H proof strip, P, S+ hero, FAQ, SU plan picker | Guarantee badge + 3-bullet conditions + "Read full conditions" |
| 6 | **Am I locked in? Can I cancel?** | [C: subscription term (annual billing?), cancellation notice, pro-rata refund?]; energy contracts: free to leave any time with 1 month notice (Belgian law for households) | P (under the price), FAQ, SU step 2 | Inline microcopy under each price; FAQ with exact terms |
| 7 | **What happens to my current contract? Exit fees?** | Households pay no exit fee in Belgium. The new supplier ends the old contract. No gap in supply. June checks the timing [C: e.g. fixed contract end date] | H FAQ, HW step 3, FAQ, SU (current supplier question) | HW timeline "Day 0 → about 1 month: new supplier active" [C]; reassurance in the funnel |
| 8 | **Will my power be cut / anything technical at home?** | No. Same meter, same grid operator, same cables. Only the supplier (and the bill) changes. | H hero microcopy, HW, FAQ | Inline sentence; icon list "What stays the same" |
| 9 | **Does it work with an analogue meter?** | Yes (Switch/Switch Plus) with manual meter readings or estimates [C: how often do readings have to be entered]. Premium needs a digital meter with the P1 port | H FAQ, P (plan helper), Premium, FAQ, SU step 1 (meter question with "don't know") | Plan helper routes analogue → Switch Plus; Premium card shows "Digital meter required" |
| 10 | **Solar panels / injection / prosumer?** | Comparison includes injection tariffs and the solar profile [C]; Premium monitors self-consumption. Flanders: prosumer tariff gone for digital meters; Wallonia: separate regime [C] | P, Premium, FAQ (region-specific), SU step 1 (solar yes/no) | Region-aware FAQ answers; solar toggle changes the estimate |
| 11 | **EV / heat pump / capacity tariff?** | Profile input; Premium shows 15-minute peaks (Flanders capacity tariff) [C: does the algorithm include dynamic contracts?] | Premium, FAQ (NL/Flanders), SU (optional "EV/heat pump" chips) | Flanders-only content block, hidden or reworded on FR |
| 12 | **Green energy?** | Option for 100% green electricity: the filter picks the cheapest green contract [C: definition, e.g. Belgian origin guarantees] | P (feature row), Switch pages, SU step 2 preference | Toggle "Only 100% green" in the funnel; FAQ on what "green" means |
| 13 | **Fixed or variable? Will you put me on a dynamic contract?** | [C: which contract types; the user sets the preference]; June never switches type without consent [C] | FAQ, S+, SU preferences | Preference in the funnel; FAQ |
| 14 | **Will June switch me every month (admin, letters)?** | June only switches when the gain is worth it [C: threshold]; you can approve each switch | HW, FAQ, SU preference ("Auto" vs "Ask me first") | HW "When do we switch?" block |
| 15 | **Why pay when V-test/comparators are free?** | A comparator is a one-off snapshot; June monitors monthly, does the admin and guarantees the result | P, FAQ | "June vs. doing it yourself" comparison block |
| 16 | **Too good to be true / scam?** | Company identity, reviews, press, team, regulator context, secure payment | H (proof), About, footer (legal entity, KBO/BCE, address) | Real reviews incl. the 4,3 rating (not a cherry-picked 5), team photo, contact |
| 17 | **Social tariff / budget meter / protected customer?** | [C: what June does. Likely "keep your social tariff: it applies with every supplier" or "not eligible"] | FAQ, SU step 1 (edge-case exit) | Honest early exit: "June can't help with a budget meter yet" rather than a failure later |
| 18 | **What if June goes bankrupt?** | Your energy contract is with the supplier and keeps running | FAQ, About | FAQ |
| 19 | **Apartment / shared meter / renter?** | [C] Renters can switch if the contract is in their name | FAQ, SU step 1 | FAQ + funnel helper |
| 20 | **What do I need for sign-up?** | EAN (on your bill), current supplier, IBAN [C] — "keep your bill handy" | H (near CTA), SU intro | "What you'll need" list before step 3; an EAN finder illustration |

---

## 4. Information architecture

### 4.1 Critique of the current taxonomy (`source-site-taxonomy.md`)
1. **No conversion path.** Sign-up does not appear in the map. The only conversion-ish node is "Login (External Portals)", which is for existing customers. The funnel has to be a first-class branch.
2. **Organised by the company, not by visitor questions.** Separate "Abonnementen", "Prijzen (Comparison)" and four product pages split one decision (which plan, what it costs) across up to 6 pages. Prices and Subscriptions are the same thing to a visitor.
3. **The Dongle is shown as a sibling product** although it is included in Premium. That suggests a 4th purchase decision [C: can the dongle be bought separately?].
4. **Persona-named product pages** (Saver / Risk-averse / Tech) are a useful internal model, but visitors don't self-identify. They choose by constraints: meter type, solar, wanting a guarantee. A 2-question plan helper does the matching better.
5. **FAQ sits in the "utility layer" (footer)**, but for June it is the main objection-handling tool. It needs to be in the primary nav and embedded contextually.
6. **Business model and independence have no home.** "Visie" is mission prose. "How do you earn money?" has no page.
7. **Partnervoordelen mixes** B2B, referral and customer perks without clear entry points.
8. **No language or region layer.** No FR mirror, no region-specific content (capacity tariff, regulators, grid operators).
9. **Reviews are a dead end.** Proof belongs next to decisions (hero, pricing, funnel), with the reviews page as the deep link.
10. **"Hoe werkt het?" is duplicated** (summary on Home and a detailed page) with different step wording ("Koppel je teller(s)" vs "Data verzamelen"). One canonical 3-step model is needed.
11. **Missing trust and legal pages**: contact (phone), guarantee conditions, privacy in plain words, company identity.

### 4.2 Proposed sitemap (NL `/nl-be/`, FR `/fr-be/`, mirrored slugs localised)
```
Home  /
├── Hoe werkt het / Comment ça marche          /hoe-werkt-het        /comment-ca-marche
├── Abonnementen & prijzen / Formules & prix   /prijzen              /prix
│   ├── June Switch                             /prijzen/switch
│   ├── June Switch Plus  (recommended)         /prijzen/switch-plus
│   └── June Premium (incl. dongle)             /prijzen/premium
├── Reviews / Avis                              /reviews              /avis
├── Veelgestelde vragen / Questions fréquentes  /faq                  (categories as anchors, searchable)
├── Over June / À propos                        /over-june            (mission + how we earn money + team + press)
├── Contact                                     /contact
├── Partnervoordelen / Avantages partenaires    /partners  + /partners/{slug} (unlisted landings)
├── Uitnodiging / Invitation                    /uitnodiging/{code} (referral landing, unlisted)
├── Garantievoorwaarden / Conditions garantie   /garantie
├── Legal: privacy, cookies, terms              /privacy /cookies /voorwaarden
├── Sign-up funnel                              /start  (step 1 → 2 → …, noindex, minimal chrome)
└── Login router                                /inloggen → app / web portal
```
Old URLs (`/switch`, `/switch-plus`, `/premium`, `/visie`, dongle page) get 301 redirects [C].

### 4.3 Navigation
**Desktop header (sticky, compact on scroll):**
`[June logo]  Hoe werkt het · Prijzen · Reviews · FAQ          NL | FR   Inloggen   [Bereken je besparing →]`
- 4 primary items max. "Over June" goes in the footer plus in-context links (business model).
- **Language switch**: text toggle "NL | FR" (not flags, since Belgium isn't a flag choice), which goes to the **equivalent page**, not the homepage. It persists by cookie and never redirects on IP after a manual choice. hreflang `nl-BE`/`fr-BE`. [C: German/English? Out of scope.]
- **Login**: a tertiary text link left of the CTA, clearly labelled "Inloggen" / "Se connecter", with a small user icon. It must never compete visually with the primary CTA.
- **Primary CTA** wording: action + value ("Bereken je besparing" / "Calculez votre économie"), not "Start" alone. On funnel pages the header is reduced to logo + "Hulp nodig? 03 xxx xx xx" [C] + exit.

**Mobile header (390px):** `[logo] … [NL|FR] [account icon] [☰]`. The menu sheet holds the 4 primary items, Over June, Contact (with phone), the language switch repeated, and the CTA at the bottom.
**Sticky mobile CTA bar:** appears after the hero CTA scrolls out of view and hides on the funnel, in the footer, and while the keyboard is open. Content: "Vanaf €5,75/m · [Bereken je besparing]". Height ≤ 64px, safe-area aware, does not cover cookie banner actions. On Plans it updates to the selected plan ("Switch Plus · €8,25/m [Kies]").

**Footer (4 columns + legal row):**
- *June*: Hoe werkt het, Prijzen, Switch, Switch Plus, Premium, Reviews
- *Help*: FAQ, Contact (phone + hours), Garantievoorwaarden, Inloggen, App download
- *Over June*: Missie, Hoe we geld verdienen, Pers, Vacatures [C], Partnervoordelen
- *Trust*: Google rating, regulators explainer (VREG / CWaPE / Brugel / CREG, "what they do", with no implied endorsement)
- Legal row: company name, KBO/BCE number, address, privacy, cookies, terms, NL | FR

### 4.4 Page-level structures (section order, top → bottom)

#### Home
1. **Hero**: H1 (the promise: automatic, cheapest supplier) · one-line "not a supplier" explainer · **postcode field + CTA** ("Bereken je besparing") · microcopy "Free estimate in 1 min · from €5,75/m · cancel any time [C]" · rating 4,3/5 (1.200+ Google reviews) · quiet visual (no autoplay video on mobile).
2. **Proof strip**: customer count (20.000+ [C]) · average **net** saving [C] · guarantee badge · "we compare X suppliers".
3. **How it works (3 steps)**: canonical wording shared with HW: *Tell us about your home → We check the market every month → We switch for you (or you approve)*. Link to HW.
4. **What stays the same** (anti-anxiety): same meter, same grid, no power cut, no exit fees.
5. **Plans teaser**: 3 compact cards, Switch Plus highlighted, "Compare plans" link.
6. **Guarantee spotlight**: "Save more than you pay, or get €99 back" [C].
7. **Reviews**: 3 real reviews with name, town and savings, plus a link to all.
8. **Supplier logos**: "We compare all/17+ Belgian suppliers" [C] with a neutrality caption.
9. **FAQ (5)**: supplier? · how you earn money · current contract/exit fees · analogue meter · cancel.
10. **Final CTA** with the postcode field repeated.

#### Plans & pricing (Abonnementen & prijzen)
1. H1 + one line ("One subscription, always the cheapest supplier") + **billing toggle or clear "billed yearly" statement** [C].
2. **Plan helper** (optional, 2 questions: digital meter? solar/EV?) that highlights a plan.
3. **3 plan cards**: name · who it's for · €/month + €/year · 4 key features · guarantee yes/no · CTA "Kies Switch Plus" (plan carried into the funnel). Switch Plus = "Most chosen / Aanbevolen" [C: data].
4. **Net-savings example** per plan (average saving − fee) with a method footnote.
5. **Full comparison table** (grouped rows: Saving · Guarantee · Insight & hardware · Support), collapsible on mobile.
6. **June vs. doing it yourself** (free comparator vs June).
7. **How we earn money** (short, links to About).
8. **Pricing FAQ**: billing, cancellation, changing plans, guarantee, VAT included [C], dongle ownership.
9. Final CTA.

#### Switch Plus product page
1. Hero: "Save with a guaranteed result" · price · guarantee badge · CTA "Start met Switch Plus".
2. **Guarantee explained**: a worked example visual (fee €99 vs saving → outcome), 3 conditions, link to /garantie.
3. What's included: everything in Switch + guarantee + annual savings report (show a report preview).
4. How it works for you (3 steps, the preference "auto vs approve each switch").
5. Who it's for vs Switch/Premium (mini comparison, 3 columns, 4 rows).
6. Proof: reviews that mention the guarantee or report.
7. FAQ (guarantee-specific: when is it measured, how paid out, what counts as savings).
8. Final CTA + sticky plan CTA on mobile.

#### How it works (Hoe werkt het)
1. H1 answer: "How June keeps you on the cheapest tariff" + 20-second summary.
2. **Who's who diagram**: You · June · supplier · grid operator (what each does, what stays the same).
3. **Step 1 — Tell us about your home**: data sources (manual / digital meter / dongle), what data, why, privacy.
4. **Step 2 — We check the market every month**: what's compared (price, contract type, green, solar injection), neutrality, how often.
5. **Step 3 — We switch for you**: the mandate, timeline to the new supplier being active [C], no exit fees, no interruption, "auto or approve" choice.
6. **After the switch**: app, savings report, next checks.
7. Region notes (NL: capacity tariff and digital meter; FR: Wallonia/Brussels specifics).
8. Explainer video (optional, captioned, with a transcript) + FAQ + CTA.

#### FAQ
1. H1 + **search field** + contact shortcut (phone, email).
2. Category chips: *About June · Costs & guarantee · Switching & contracts · Meters & data · Solar, EV & capacity tariff (NL) · Account & cancellation*.
3. Accordion Q&A (deep-linkable anchors, FAQPage schema), 1–3 sentence answers + "read more" links.
4. "Didn't find it?" → contact + CTA.
Region-specific answers: tagged and shown per language/region (FR hides capacity-tariff questions or states they apply to Flanders only).

#### Sign-up step 1–2 (`/start`)
Principles: value before identity; one question per screen on mobile (grouped on desktop); a progress indicator showing "Step 1 of 4 · about 3 min" [C]; minimal chrome; back never loses data; all fields have a "Why we ask" note; "Don't know" is always an option.

**Step 1 — Your home (no personal data)**
1. **Postcode** (prefilled from the hero). This sets region, grid operator, available suppliers, language defaults and the capacity-tariff relevance. Validate against Belgian postcodes and show the town name as confirmation ("2000 Antwerpen ✓").
2. **What do you need?** Electricity / Electricity + gas.
3. **Household**: number of people (1 · 2 · 3 · 4 · 5+) *or* "I know my annual use" → kWh / m³ fields (from the bill).
4. **Meter & extras** (chips, optional): digital / analogue / don't know · solar panels · EV · heat pump. Region-aware helper text.
5. Edge-case exits handled kindly: budget meter or social tariff → explain, with a contact option [C].

→ **Estimate screen** (end of step 1): "≈ €X saved per year" as a **range** · minus fee → net · recommended plan (Switch Plus by default; Premium if digital meter + solar) · method footnote · guarantee reminder. CTA "Continue with Switch Plus" + "Compare plans" link.

**Step 2 — Your plan & account**
1. Plan confirmation (switchable, shows €/m and billing) + preferences: "Switch automatically" vs "Ask me before each switch"; "Only 100% green energy".
2. **Email** (+ first name). "We'll save your estimate and send it to you." Consent checkbox for marketing kept separate and unticked. Password or magic link [C].
3. Referral/partner code field (collapsed, prefilled if present).
4. Microcopy: "No commitment yet. Next: your address, EAN and current supplier (keep your bill handy)."
→ The email is captured here so abandoned sign-ups can be resumed. Later steps (not in scope): address + EAN, current supplier/contract end, mandate e-signature, payment (domiciliation/IBAN), confirmation.

**What to ask first and why:** postcode → household → meter/solar gives an estimate in 3–4 taps. Email only after the estimate, as the price of saving it. EAN, IBAN, date of birth and address come last, because they are the highest-friction and highest-risk fields, and by then trust has been built. Never ask for the current supplier before showing the estimate, because it anchors people on "loyalty".

---

## 5. Success metrics & testable hypotheses

### 5.1 Metrics
**Primary (north star for the site):** Sign-up start rate = sessions with step 1 submitted (postcode + profile) ÷ landing sessions, segmented by NL/FR, device and channel.

**Funnel:** hero CTA/postcode interaction rate · step 1 completion · estimate → step 2 (account created) · step 2 → full sign-up completion (downstream, owned by product) · time to estimate (median < 60 s) · field-level abandonment (esp. household and meter).

**Commercial:** plan mix (share Switch Plus / Premium) · referral/partner code attach rate · estimate-to-customer conversion by recommended plan.

**Trust & comprehension:** 5-second test "What is June?" → ≥ 80% answer "not a supplier / switches for me" · FAQ search terms and zero-result rate · clicks on "How we earn money" and guarantee conditions · pre-sales support contacts by topic (should fall).

**Parity & quality:** FR vs NL start rate gap (target ≤ 15% relative) · mobile vs desktop gap · Core Web Vitals (LCP < 2,5 s, INP < 200 ms, CLS < 0,1) on 4G mid-range Android · WCAG 2.2 AA pass.

**Guardrails:** 14-day withdrawal/cancellation rate · guarantee claim rate (no overpromise) · complaint rate about "misleading savings" · returning-visitor login success rate.

### 5.2 Hypotheses (each: change → expected effect → metric)
| # | Hypothesis | Metric |
|---|---|---|
| H1 | A **postcode field in the hero** (vs a plain button) increases sign-up starts because the first step feels small and personal. | Start rate |
| H2 | A **"Not a supplier — your power keeps flowing"** line under the H1 reduces bounce and early exits among ad traffic. | Bounce, 5-s test comprehension |
| H3 | Showing **net savings (after fee)** instead of gross €326 increases step-2 conversion despite the smaller number. | Estimate → account |
| H4 | Framing the guarantee as **"Save more than you pay, or get your €99 back"** increases Switch Plus share without lowering overall conversion. | Plan mix, start rate |
| H5 | Making **Switch Plus the default recommended plan** raises average revenue per sign-up by ≥ 15% with ≤ 5% loss in completions. | ARPU, completion |
| H6 | Showing both **€/month and €/year billed** reduces post-sign-up surprise cancellations. | 14-day cancellations |
| H7 | A **"June vs doing it yourself (V-test)"** block on Pricing reduces exits to comparators. | Pricing → start rate |
| H8 | Offering **"Ask me before each switch"** in step 2 increases completion for 55+ users. | Completion by age proxy / survey |
| H9 | A **visible phone number** in header/funnel increases 60+ completion and doesn't raise call volume disproportionately. | Completion, calls per sign-up |
| H10 | A **sticky mobile CTA** increases mobile start rate by ≥ 10% without raising accidental taps (short sessions in the funnel). | Mobile start rate, step 1 time-on-step |
| H11 | **Region-aware FR copy** (Wallonia/Brussels specifics, "vous", no capacity tariff) closes the FR–NL conversion gap. | FR start rate |
| H12 | A **range estimate** ("€180–€290") is trusted more than a point estimate and lowers guarantee claims. | Estimate → account, claims |
| H13 | A **2-question plan helper** on Pricing reduces time to plan choice and Premium mis-sales to analogue-meter homes. | Time to choose, Premium refunds |
| H14 | Replacing the autoplay **video hero** with a static image improves mobile LCP and start rate. | LCP, mobile start rate |
| H15 | Showing the **honest 4,3/5 rating with review count** near the CTA converts better than curated 5-star quotes alone. | Start rate |

---

## 6. UX evaluation checklist (June-specific)

Score each item Pass / Partial / Fail. Test in NL and FR, at 390px and 1280px.

**A. Clarity of offer (first 5 seconds)**
- [ ] Above the fold states that June is **not a supplier** and **switches automatically**.
- [ ] A price or "from €5,75/m" is visible or reachable in one scroll on Home.
- [ ] One primary CTA per view, worded as a benefit/action ("Bereken je besparing"), in June Green; login is visually secondary.
- [ ] The H1 matches likely ad promises; there is no jargon (EAN, P1, capacity tariff) in the hero.

**B. Trust & proof**
- [ ] Savings claims have a stated basis (footnote/method) and are shown **net of fee** at least once.
- [ ] The Google rating is shown truthfully (4,3/5 + count + source), not only 5-star quotes.
- [ ] The guarantee is shown with its conditions within one click; the €99 amount and rule are consistent everywhere.
- [ ] "How we earn money" is answered on Home (FAQ), Pricing and About.
- [ ] The number of suppliers compared is consistent across pages ("all" vs "17+" resolved).
- [ ] Company identity (legal name, KBO/BCE, address), phone and contact are in the footer.
- [ ] Regulators are mentioned only accurately and without implying endorsement.

**C. Objection coverage** (see §3)
- [ ] Each of the 20 objections has an answer in its assigned location(s).
- [ ] "What stays the same" (meter, grid, no interruption, no exit fees) appears on Home and How it works.
- [ ] Analogue meter support and Premium's digital-meter requirement are stated on Pricing and the Premium page.
- [ ] Cancellation/commitment terms appear directly under prices.

**D. Pricing & plan choice**
- [ ] Monthly price, yearly total and billing frequency are unambiguous for all three plans.
- [ ] The recommended plan is marked and the reason is given.
- [ ] The comparison table is readable at 390px (no horizontal scroll, collapsible groups).
- [ ] The chosen plan carries into the funnel and can be changed there.
- [ ] The Dongle is presented as part of Premium, not as a separate required purchase.

**E. Sign-up step 1–2**
- [ ] Postcode is asked first; no email, EAN or IBAN before the estimate.
- [ ] Every question has a "Don't know" or skip path and a "Why we ask" hint.
- [ ] The estimate is a range, shows the fee and net result, and states its method.
- [ ] Progress and the remaining time are shown; Back keeps entered data.
- [ ] Edge cases (budget meter, social tariff, Brussels/Wallonia differences) get a clear message rather than a dead end.
- [ ] Marketing consent is separate and unticked; privacy link available.
- [ ] Inputs use correct mobile keyboards (numeric for postcode/kWh), autocomplete attributes, labels that aren't placeholders, and inline errors in plain words.
- [ ] Referral/partner code persists from the landing page and is visible in the summary.

**F. Navigation & IA**
- [ ] ≤ 5 primary nav items; FAQ is in the primary nav.
- [ ] The NL | FR switch goes to the equivalent page and persists; hreflang is present.
- [ ] Login is findable in < 5 s on mobile and desktop.
- [ ] The sticky mobile CTA appears after the hero, hides in the funnel/footer/keyboard, and doesn't cover content or the cookie banner.
- [ ] The funnel uses reduced chrome, with help/phone visible.
- [ ] Old URLs redirect; there are no dead ends (every page ends with a next step).

**G. Localisation & region**
- [ ] FR copy is native (vous, Belgian French terms: *compteur numérique*, *fournisseur*, *GRD*), not a literal translation.
- [ ] Capacity-tariff content is limited to Flanders/NL context or labelled "Vlaanderen / Flandre uniquement".
- [ ] Regulator and grid operator names match the region (VREG/Fluvius; CWaPE/ORES/RESA; Brugel/Sibelga; CREG federal).
- [ ] Number and currency formats follow nl-BE / fr-BE (€ 5,75 or 5,75 €, consistently per locale).
- [ ] Text expansion (FR ≈ +15–20%) doesn't break buttons, cards or the nav.

**H. Accessibility & inclusivity (60+ lens)**
- [ ] Body text ≥ 16px, sufficient contrast (WCAG 2.2 AA), tap targets ≥ 44px.
- [ ] No information conveyed by colour alone; focus visible; full keyboard path through the funnel.
- [ ] Video is captioned with a transcript; no autoplay with sound; `prefers-reduced-motion` is respected.
- [ ] Plain language (about B1 level); jargon explained on first use (EAN, P1, injection).
- [ ] A human contact option is visible from every decision page.

**I. Performance & quality**
- [ ] LCP < 2,5 s on mobile 4G; hero is not dependent on video; images responsive (Astro image pipeline).
- [ ] No layout shift from the cookie banner, fonts or the sticky CTA.
- [ ] Forms work without JS enhancements failing silently; analytics events are defined for every funnel step.

**J. Brand fit (premium, playful-but-trustworthy)**
- [ ] June Green is the single interactive accent; June Red only for alerts.
- [ ] Brand motifs (blob, halftone, Junior) are used sparingly, never on pricing tables or legal copy.
- [ ] Tone is confident and warm, with no hype ("gratis!!!", countdowns, fake urgency), which matters for a "too good to be true" audience.

---

## 7. Open questions for the product owner [C]
1. Exact Switch Plus/Premium guarantee rule: measurement period, basis of "savings", payout form (refund vs credit), exclusions.
2. Does June receive any commission or fee from suppliers? (Decides the wording of "how we earn money" and the neutrality claims.)
3. Number of suppliers compared: "all Belgian suppliers" vs "17+"; any excluded, and why?
4. Basis of "€326 average saving": period, sample, gross vs net, region split; can a distribution be shown?
5. Subscription term and cancellation: yearly billing, notice period, pro-rata refund, 14-day withdrawal handling.
6. Contract types June switches to (fixed / variable / dynamic) and whether the user can restrict them; the switch threshold.
7. Analogue-meter flow: how often readings are needed; is it supported in all three regions?
8. Edge cases: budget meters, social tariff/protected customers, collective meters, businesses/self-employed.
9. Referral reward and partner discount mechanics; list of active partners.
10. Login: how many portals/apps exist and which one "Inloggen" should open.
11. Dongle: sold separately? Ownership on cancellation? Compatible meters?
12. Brand register: "je" vs "u" in NL for older visitors; phone support hours per language.

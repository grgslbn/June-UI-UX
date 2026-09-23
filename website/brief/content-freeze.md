# Website content freeze: june.energy redesign (NL + FR)

**Frozen on:** 23 Sep 2026 · **Source of truth:** `website/shared/content/facts.json` · **Baseline copy:** `website/shared/content/copy-baseline.md` · **Open items:** `website/brief/content-issues.md`

Every variant reads its facts from `facts.json`. Import the file and don't retype numbers. If a variant needs a fact that isn't in the file, ask the content owner to add it. Don't make it up in the variant.

Source labels in `facts.json`:
- `content-map`: from the live site (NL, March 2026). All FR text is a new translation.
- `derived`: computed from map facts, for example the yearly totals, or taken from the Insights product in `app/`.
- `proposed`: new. It needs owner sign-off. Anything marked `needsConfirmation` can go into prototypes, but it isn't approved for go-live. Text in `[square brackets]` is a placeholder and must never ship.

## 1. Language and tone decisions

| | NL (nl-BE) | FR (fr-BE) |
|---|---|---|
| Address | **je/jij**, informal. Lower-case "je"; "jouw" only for emphasis. Never "u". | **vous**, formal. Never "tu". |
| Register | Belgian Dutch: *meter* (not "teller" in headings, although it is fine in body copy), *afrekening*, *gsm*, *postcode*, *netbeheerder*, *injectie*, *capaciteitstarief* | Belgian French: *encoder* (to enter data), *GSM*, *facture de régularisation*, *compteur numérique*, *gestionnaire de réseau*, *injection*, *tarif capacitaire*, *code postal*. Use *septante/nonante* if numbers are written out. Avoid France-only terms such as *portable*, *relevé EDF* and *box*. |
| Money | `€ 5,75` (space after €) · `€ 69` | `5,75 €` · `69 €` |
| Numbers | `20.000` · `4,3` | `20 000` (narrow no-break space) · `4,3` |
| Percent | `100%` | `100 %` (no-break space) |
| Brand | "June" in body copy. "June Energy" only in legal text, the footer and meta. Plan names stay in English in both languages: *Switch, Switch Plus, Premium, June Dongle*. | same |
| Guarantee name | *Winstgarantie* | *Garantie de gain* |

Tone: speels, betrouwbaar, zelfzeker / ludique, fiable, sûr de lui. That means short sentences and concrete numbers, with no exclamation-mark hype and no rocket emoji. The 🚀 on the live social-proof badge is dropped.

## 2. What is frozen (variants must NOT change)

1. **Prices and billing:** € 5,75 / € 8,25 / € 16,50 per month, billed yearly. That is **€ 69 / € 99 / € 198 per year**. See the §4 price display rule.
2. **Plan names, plan order (Switch, Switch Plus, Premium) and each plan's feature list.** Variants may shorten a feature label for a card, but can't add features or drop the condition part of one. Premium features marked `derived` (peak, budgets, advice) stay behind a flag until the owner confirms them.
3. **Winstgarantie terms:** € 99, the condition (you save no more than the subscription cost), the period and a link to the conditions. These always appear together.
4. **Social proof values:** 20.000+ customers; 4,3/5 on Google; 1.200+ reviews. Include the as-of date in the footnote. Show 4,3 as partial stars, never as five full stars.
5. **Average saving:** € 326 per year, always with the word *gemiddeld/en moyenne* and a footnote marker (§4).
6. **Supplier claim:** "17+ leveranciers" / "plus de 17 fournisseurs". Don't use "alle leveranciers" / "tous les fournisseurs" until issue #1 is resolved. Show only the confirmed logos, labelled as "compared", never as "partners".
7. **How-it-works:** three steps, in this order and with this meaning: connect your meter, June compares, switch automatically or with your approval. The "or with your approval" option must stay visible.
8. **FAQ answers:** the meaning is fixed. Variants may shorten the wording but can't strengthen it.
9. **Mission** text (map).
10. **Routes and slugs** (see §5).
11. **Legal footnotes** (§4), including VAT and the conditions links.

## 3. What variants MAY rewrite

- Headlines, eyebrows, sub-heads, section intros and CTA labels, as long as they stay in the same tone and every claim in them is covered by the claims register (§4). A new headline that makes a *new* claim (a number, "cheapest", "always", "free") needs owner approval.
- Microcopy: helper text, empty states, validation messages, button labels, alt text.
- Order and layout of sections, and which FAQ items appear on the home page (at least 3).
- Testimonials: selection and cropping are free. The text stays verbatim, with the reviewer's first name and date, and it must come from real Google reviews (§4, C15).
- FR copy can be adapted rather than translated literally, but FR must never claim more than NL.

## 4. Claims register

Legal frame: **Code of Economic Law (WER/CDE) Book VI**. That covers price indication (art. VI.2–VI.7: a clear, unambiguous total price in euro, incl. VAT and all compulsory costs), comparative advertising (art. VI.17), and unfair commercial practices: misleading actions (VI.97), misleading omissions (VI.99) and the blacklist (VI.100, including the Omnibus rules on consumer reviews). It also covers distance-contract information and the 14-day withdrawal right (VI.45, VI.47). The trader must be able to substantiate any factual claim on request. *This is content guidance and has not been legally reviewed. Legal counsel should validate it before launch.*

Risk: **H** = likely misleading or non-compliant as it stands · **M** = acceptable with the qualifier/footnote · **L** = low.

| # | Claim (as on the live site) | Where used | Evidence needed | Risk (Book VI) | Safe phrasing NL | Safe phrasing FR |
|---|---|---|---|---|---|---|
| C1 | "Bespaar gemiddeld €326 per jaar" | Home hero, Switch features, meta description | Calculation method, baseline (the contract before June? the default rate?), period, number of customers, elec and/or gas, gross or net of the June fee. Must be current and reproducible. | **H** without a footnote: a "gemiddeld" figure without basis or period is a misleading action (VI.97) and omission (VI.99). It also implies a typical result. | "Klanten besparen **gemiddeld € 326 per jaar**¹" + ¹"Gemiddelde besparing per klant per jaar, berekend door June op [periode] over [aantal] klanten, t.o.v. hun contract vóór de overstap. Jouw besparing hangt af van je verbruik en de marktprijzen." | "Nos clients économisent **en moyenne 326 € par an**¹" + ¹"Économie moyenne par client et par an, calculée par June sur [période] pour [nombre] clients, par rapport à leur contrat avant le changement. Votre économie dépend de votre consommation et des prix du marché." |
| C2 | "Meer dan 20.000 tevreden klanten" | Home hero badge | Customer count at a date. Is it active customers or everyone who ever signed up? "Tevreden" needs a satisfaction measure. | **M**: count is fine if true and dated. "Tevreden" is unsubstantiated (VI.97). | "20.000+ klanten" / "Meer dan 20.000 klanten gingen je voor" (+ as-of date in the footnote) | "Plus de 20 000 clients" / "Plus de 20 000 clients nous font déjà confiance" |
| C3 | "★★★★★ 4,3/5 — 1.200+ Google reviews" | Home, Reviews, sign-up | Google profile link, figures at a date | **M**: five full stars for 4,3 visually overstates the rating (VI.97). The Omnibus rules require telling people whether and how reviews are verified (VI.99/VI.100). | "4,3/5 op Google, op basis van 1.200+ reviews (stand [datum])". Partial stars. Link: "Bekijk alle reviews op Google". | "4,3/5 sur Google, sur la base de plus de 1 200 avis (au [date])". Étoiles partielles. |
| C4 | "We vergelijken **alle** energieleveranciers in België" vs. "17+ leveranciers" | Home partner grid, FAQ, Switch | Up-to-date list of suppliers compared, and whether all of their consumer contracts are included | **H**: "alle" contradicts "17+", and the market has more active suppliers. That is a misleading action (VI.97). | "We vergelijken de contracten van **17+ energieleveranciers** in België." | "Nous comparons les contrats de **plus de 17 fournisseurs d'énergie** en Belgique." |
| C5 | "Automatisch wisselen" / "zonder gedoe" / "Zodra er een betere deal is, regelen wij het" | Hero, how-it-works | Process description, including the approval option and any mandate | **M**: fine if the approval option and the meter-reading caveat are visible nearby. | "Automatisch wisselen, of na jouw akkoord. Jij kiest." | "Changement automatique, ou après votre accord. C'est vous qui choisissez." |
| C6 | "Hoe zorgt June **steeds** voor het **laagste** energietarief?" (and any "goedkoopste") | Hoe werkt het heading | Proof that it is always the lowest across the whole market, which is not realistic | **H**: an absolute superlative plus comparative advertising (VI.17) needs objective, verifiable comparison and a defined scope. | "Hoe zorgt June dat je een **voordelig** tarief hebt?" / "het voordeligste contract **uit onze vergelijking**, voor **jouw** verbruik" | "Comment June veille-t-elle à ce que vous ayez un tarif **avantageux** ?" / "le contrat le plus avantageux **parmi ceux que nous comparons**, pour **votre** consommation" |
| C7 | "Winstgarantie: Krijg €99 terug als je niet meer bespaart dan je abonnementskost" | Switch Plus, Premium, plans | T&C clause: period, how savings are measured, how to claim, amount per plan (Premium costs € 198) | **H** until the terms are published. A guarantee must state its content and conditions (VI.97/VI.99). "Geld-terug"/"geen risico" wording without conditions is misleading. | "**Winstgarantie.** Bespaar je in een abonnementsjaar niet meer dan je abonnement kost? Dan krijg je € 99 terug. [Voorwaarden]" | "**Garantie de gain.** Vous n'économisez pas plus que le prix de votre abonnement sur une année ? Vous récupérez 99 €. [Conditions]" |
| C8 | "€5,75 per maand (jaarlijks gefactureerd)" (and € 8,25, € 16,50) | Plans, cards, FAQ, sign-up | Price list incl. VAT, contract term, renewal, one-off costs (dongle, activation) | **H** if the monthly price appears alone: the total price actually payable (€ 69/99/198 per year incl. VAT) must be clear and unambiguous (VI.2–VI.7, VI.99). **M** with the rule below. | "**€ 5,75**/maand · **€ 69 per jaar**, jaarlijks gefactureerd, incl. btw" | "**5,75 €**/mois · **69 € par an**, facturé annuellement, TVA comprise" |
| C9 | "Onafhankelijke tussenpersoon" / "onafhankelijk van leveranciers" | FAQ, Visie, brand descriptor | Business model: does June receive supplier commissions? Ownership links? | **H** if June receives supplier fees and doesn't disclose them. Hiding that is a misleading omission (VI.99). | "June is geen energieleverancier en kiest je contract op basis van jouw verbruik." (+ fee disclosure if applicable) | "June n'est pas fournisseur d'énergie et choisit votre contrat sur la base de votre consommation." |
| C10 | "Optie voor 100% groene energie" | Switch features, FAQ | Definition (guarantees of origin), which contracts qualify | **M**: environmental claims must be specific (VI.97; EU Green Claims direction) | "Kies je voor groene stroom, dan vergelijken we enkel contracten met 100% groene stroom **volgens de leverancier**." | "Si vous choisissez l'électricité verte, nous ne comparons que des contrats 100 % verts **selon le fournisseur**." |
| C11 | "Real-time data via de P1-poort" / "Inzicht per 15 minuten" | Premium, Dongle | Actual data frequency (dongle live vs. dashboard at 15 min) | **M**: two different frequencies can confuse. Use one precise statement. | "Live verbruik via de June Dongle, je historiek per kwartier." | "Consommation en direct via le June Dongle, historique par quart d'heure." |
| C12 | "Werkt voor zowel analoge als digitale meters" + "June leest je meterstand automatisch uit" | Switch, how-it-works step 1 | How analogue users provide readings | **M**: automatic reading is impossible for an analogue meter (VI.97). | "Werkt met analoge en digitale meters. Met een digitale meter lezen we automatisch uit, met een analoge geef je je meterstanden zelf in." | "Fonctionne avec compteurs analogiques et numériques. Avec un compteur numérique, relevé automatique ; avec un analogique, vous encodez vos index." |
| C13 | "June Dongle inbegrepen" | Premium | Is the dongle's cost part of € 198? Who owns it after cancellation? Is there a deposit? | **M**. **H** if anyone writes "gratis dongle", because "gratis" is only allowed if there is no cost beyond the unavoidable (VI.100 blacklist). | "June Dongle inbegrepen in je Premium-abonnement." | "June Dongle compris dans votre abonnement Premium." |
| C14 | Supplier logos ("Partner Grid") | Home | Logo rights; the list must match the actual comparison | **M**: calling them "partners" suggests endorsement (VI.97). Comparative advertising must not create confusion or take unfair advantage of a trademark (VI.17). | Heading "Leveranciers die we vergelijken" + small print "Logo's zijn eigendom van hun respectieve eigenaars." | "Fournisseurs que nous comparons" + « Les logos appartiennent à leurs propriétaires respectifs. » |
| C15 | Testimonials carousel (Google reviews) | Home, Reviews | Verbatim source, date, no cherry-picking suggested as representative | **M**: Omnibus/VI.100 prohibits presenting reviews as genuine without reasonable verification, and selective display must not mislead. | Label "Uit onze Google-reviews", with date + first name, and a link to all reviews | « Extraits de nos avis Google », with date + first name, and a link to all reviews |
| C16 | Peak/capacity tariff monitoring (from the app) | Premium (derived) | Confirmation it is included in Premium; region | **M**: the capacity tariff exists only in Flanders, so on the FR site this could mislead Walloon and Brussels visitors. | "Volg je piekvermogen op, handig voor het capaciteitstarief in Vlaanderen." | "Suivez votre pic de puissance, utile pour le tarif capacitaire en Flandre." |
| C17 | Personalised savings estimate in sign-up (if a variant shows one) | Aanmelden/Inscription | A real estimation model | **H**: never show a € estimate computed in the browser from presets. | "Na je aanmelding berekenen we je persoonlijke besparing." | "Après votre inscription, nous calculons votre économie personnelle." |
| C18 | "Jaarlijks besparingsrapport" | Switch Plus | Sample report | **L** | as is | « Rapport d'économies annuel » |

### Price display rule (C8), mandatory for every variant
1. Wherever a monthly amount appears, the **yearly amount actually billed** appears in the same visual block, at least as legible as body text: "€ 69 per jaar, jaarlijks gefactureerd" / « 69 € par an, facturé annuellement ».
2. Don't use a strikethrough or "vanaf/à partir de" price, and don't show savings net of the fee unless the owner provides the data.
3. The footnote on each pricing block says: "Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier." / « Tous les prix TVA 21 % comprise. Votre consommation d'énergie est facturée par votre fournisseur. » (The VAT figure still needs confirmation.)
4. Contract term, renewal and cancellation must be one click from the price (issue #3). Pre-contractual information and the 14-day withdrawal right go in the sign-up flow before payment (VI.45, VI.47).

### Footnote set (reuse verbatim)
| id | NL | FR |
|---|---|---|
| fn-saving | see C1 | see C1 |
| fn-reviews | "Google-score en aantal reviews op [datum]." | « Note Google et nombre d'avis au [date]. » |
| fn-customers | "Aantal klanten op [datum]." | « Nombre de clients au [date]. » |
| fn-prices | see rule 3 | see rule 3 |
| fn-guarantee | "Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden." | « Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales. » |

## 5. Routes and slugs

The route list is fixed (it comes from `tools/check-site.mjs`). Every page sets `hreflang` alternates for nl-BE and fr-BE that point to its counterpart.

| Page | NL | FR |
|---|---|---|
| Home | `/nl-be/` | `/fr-be/` |
| Plans | `/nl-be/abonnementen/` | `/fr-be/abonnements/` |
| Switch Plus | `/nl-be/switch-plus/` | `/fr-be/switch-plus/` |
| How it works | `/nl-be/hoe-werkt-het/` | `/fr-be/comment-ca-marche/` |
| FAQ | `/nl-be/veelgestelde-vragen/` | `/fr-be/questions-frequentes/` |
| Sign-up | `/nl-be/aanmelden/` | `/fr-be/inscription/` |

Proposed for later (not in scope and not built now): `switch`, `premium`, `dongle` (same slugs in both locales), `prijzen` → `prix`, `visie` → `vision`, `reviews` → `avis`, `partnervoordelen` → `avantages-partenaires`, `privacy` → `confidentialite`, `algemene-voorwaarden` → `conditions-generales`. Until these pages exist, links to Switch, Premium and Dongle go to anchors on the plans page (`#switch`, `#premium`, `#dongle`). Login links to the external portal (`rel="noopener"`, marked with an external icon).

## 6. Change control
- The content owner is the only person who can change `facts.json`, and each change bumps `_meta.version`.
- Before launch: resolve every `needsConfirmation` marked BLOCKING, fill every `[placeholder]`, and get a legal review of §4 and a native Belgian-French proofread of all FR.

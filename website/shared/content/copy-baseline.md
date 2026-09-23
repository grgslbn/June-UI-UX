# Copy baseline: NL + FR

This is the default copy for every required page. Variants may restyle it and rewrite headlines and microcopy within the rules in `website/brief/content-freeze.md`. Every number, price and guarantee comes from `facts.json`: `{{facts.path}}` shows which key to bind. Superscript ¹²³ are footnotes (freeze §4). Text in `[brackets]` is a placeholder and must not ship.

**Voice:** NL uses **je/jij** (informal) and FR uses **vous** (formal). Both are Belgian: *encoder*, *GSM*, *facture de régularisation*, *compteur numérique*. Plan names stay in English. Money is formatted `€ 5,75` in NL and `5,75 €` in FR. The primary CTA on every page goes to sign-up: **Start je aanmelding / Commencer mon inscription**.

---

## Global

| Element | NL | FR |
|---|---|---|
| Nav | Hoe werkt het · Abonnementen · Switch Plus · Veelgestelde vragen | Comment ça marche · Abonnements · Switch Plus · Questions fréquentes |
| Header CTA | Aanmelden | S'inscrire |
| Login | Inloggen ↗ | Se connecter ↗ |
| Language switch | FR (aria-label "Lire en français") | NL (aria-label "Lees in het Nederlands") |
| Skip link | Naar de inhoud | Aller au contenu |
| Footer tagline | June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract. | June suit le marché de l'énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux. |
| Footer mission | De energiemarkt eerlijker en transparanter maken voor de consument. | Rendre le marché de l'énergie plus juste et plus transparent pour le consommateur. |
| Footer links | Algemene voorwaarden · Privacy · Cookies · Contact | Conditions générales · Confidentialité · Cookies · Contact |
| Footer legal | © 2026 June Energy · [KBO-nummer] | © 2026 June Energy · [numéro BCE] |
| Price footnote | Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier. | Tous les prix TVA 21 % comprise. Votre consommation d'énergie est facturée par votre fournisseur. |

---

## 1. Home: `/nl-be/` · `/fr-be/`

**SEO**
- NL title: `June: automatisch naar een voordeliger energiecontract`
- NL meta: `June vergelijkt de contracten van 17+ energieleveranciers voor jouw verbruik en regelt de overstap. Gemiddeld € 326 per jaar besparing.`
- FR title: `June : passez automatiquement à un contrat d'énergie plus avantageux`
- FR meta: `June compare les contrats de plus de 17 fournisseurs pour votre consommation et gère le changement. En moyenne 326 € d'économie par an.`

**Hero**
| | NL | FR |
|---|---|---|
| Eyebrow | 20.000+ klanten · 4,3/5 op Google² | Plus de 20 000 clients · 4,3/5 sur Google² |
| H1 | Automatisch wisselen tussen energieleveranciers. | Changez automatiquement de fournisseur d'énergie. |
| Sub | June volgt de markt voor jou op en zet je over naar een voordeliger contract. Klanten besparen gemiddeld € 326 per jaar.¹ | June suit le marché pour vous et vous fait passer à un contrat plus avantageux. Nos clients économisent en moyenne 326 € par an.¹ |
| CTA primary | Start je aanmelding | Commencer mon inscription |
| CTA secondary | Hoe werkt het? | Comment ça marche ? |
| Reassurance under CTA | Geen onderbreking van je stroom of gas · Jij houdt de controle | Aucune interruption d'électricité ni de gaz · Vous gardez le contrôle |

**How it works (3 steps)**: `{{howItWorks.short}}`
| | NL | FR |
|---|---|---|
| H2 | Hoe werkt het? | Comment ça marche ? |
| 1 | **Koppel je meter.** Met een digitale meter lezen we je verbruik automatisch uit. Een analoge meter? Dan geef je je meterstanden zelf in. | **Connectez votre compteur.** Avec un compteur numérique, nous relevons votre consommation automatiquement. Un compteur analogique ? Vous encodez vous-même vos index. |
| 2 | **June vergelijkt de markt.** We toetsen je contract minstens elke maand aan de aanbiedingen van 17+ leveranciers, op basis van jouw verbruik. | **June compare le marché.** Au moins une fois par mois, nous comparons votre contrat aux offres de plus de 17 fournisseurs, sur la base de votre consommation. |
| 3 | **Wissel automatisch.** Is er een voordeliger contract? Dan regelen wij de overstap. Automatisch, of pas na jouw akkoord: jij kiest. | **Changez automatiquement.** Un contrat plus avantageux ? Nous nous occupons du changement. Automatiquement ou seulement après votre accord : c'est vous qui choisissez. |
| Link | Meer over hoe June werkt → | En savoir plus sur le fonctionnement de June → |

**Plans teaser**: bind to `{{plans}}`
| | NL | FR |
|---|---|---|
| H2 | Kies hoeveel June voor je doet | Choisissez ce que June fait pour vous |
| Intro | Drie abonnementen, één jaarprijs. Geen verrassingen. | Trois abonnements, un prix annuel. Pas de surprise. |
| Card price pattern | **€ 5,75**/maand · € 69 per jaar, jaarlijks gefactureerd | **5,75 €**/mois · 69 € par an, facturé annuellement |
| Link | Vergelijk de abonnementen → | Comparer les abonnements → |

**Guarantee band**
| | NL | FR |
|---|---|---|
| H2 | Zeker van je besparing met Switch Plus | Votre économie assurée avec Switch Plus |
| Body | Bespaar je in een abonnementsjaar niet meer dan je abonnement kost? Dan krijg je € 99 terug.⁴ | Vous n'économisez pas plus que le prix de votre abonnement sur une année ? Vous récupérez 99 €.⁴ |
| Link | Zo werkt de winstgarantie → | Découvrir la garantie de gain → |

**Testimonials**
| | NL | FR |
|---|---|---|
| H2 | Wat klanten zeggen | Ce que disent nos clients |
| Label | Uit onze Google-reviews | Extraits de nos avis Google |
| Rating | 4,3 op 5 · 1.200+ reviews² | 4,3 sur 5 · plus de 1 200 avis² |
| Link | Alle reviews op Google ↗ | Tous les avis sur Google ↗ |

(The quotes stay verbatim in the reviewer's own language. Under a FR review, a NL page shows it untranslated with `lang="fr"`, or the page shows only reviews in its own language. The second option is preferred.)

**Suppliers**
| | NL | FR |
|---|---|---|
| H2 | Leveranciers die we vergelijken | Fournisseurs que nous comparons |
| Body | We vergelijken de contracten van 17+ energieleveranciers in België. | Nous comparons les contrats de plus de 17 fournisseurs d'énergie en Belgique. |
| Small print | Logo's zijn eigendom van hun respectieve eigenaars. | Les logos appartiennent à leurs propriétaires respectifs. |

**Mission**
| | NL | FR |
|---|---|---|
| H2 | Waarom June bestaat | Pourquoi June existe |
| Body | Energiecontracten zijn ingewikkeld gemaakt, en wie niet opvolgt, betaalt vaak te veel. June wil de energiemarkt eerlijker en transparanter maken voor de consument. We zijn geen leverancier: we staan aan jouw kant. | Les contrats d'énergie sont devenus compliqués, et celui qui ne suit pas le marché paie souvent trop. June veut rendre le marché de l'énergie plus juste et plus transparent pour le consommateur. Nous ne sommes pas fournisseur : nous sommes de votre côté. |

**FAQ (3 items)**: `not-a-supplier`, `how-so-much`, `which-suppliers`. Link: "Alle vragen →" / "Toutes les questions →"

**Closing CTA**
| | NL | FR |
|---|---|---|
| H2 | Klaar om minder te betalen voor je energie? | Prêt à payer moins pour votre énergie ? |
| Body | Aanmelden duurt twee minuten. Je postcode en je e-mailadres volstaan om te starten. | L'inscription prend deux minutes. Votre code postal et votre adresse e-mail suffisent pour commencer. |
| CTA | Start je aanmelding | Commencer mon inscription |

**Footnotes**: ¹ fn-saving · ² fn-reviews · ³ fn-customers · ⁴ fn-guarantee (see freeze §4).

---

## 2. Abonnementen / Abonnements: `/nl-be/abonnementen/` · `/fr-be/abonnements/`

**SEO**
- NL title: `Abonnementen en prijzen | June` · meta: `Switch € 69, Switch Plus € 99 of Premium € 198 per jaar. Vergelijk wat June voor je doet en kies het abonnement dat bij je past.`
- FR title: `Abonnements et prix | June` · meta: `Switch 69 €, Switch Plus 99 € ou Premium 198 € par an. Comparez ce que June fait pour vous et choisissez l'abonnement qui vous convient.`

| | NL | FR |
|---|---|---|
| H1 | Een abonnement voor elk huishouden | Un abonnement pour chaque ménage |
| Intro | Met elk abonnement volgt June de markt voor je op en regelt ze je overstap. Je betaalt één keer per jaar. | Avec chaque abonnement, June suit le marché pour vous et gère votre changement. Vous payez une fois par an. |

**Plan cards** (id anchors `#switch`, `#switch-plus`, `#premium`)

| | Switch | Switch Plus | Premium |
|---|---|---|---|
| NL tagline | Slim besparen, zonder gedoe. | Besparen met gegarandeerd resultaat. | Volledige controle voor digitale meters. |
| FR tagline | Économisez malin, sans tracas. | Économisez, avec un résultat garanti. | Le contrôle total pour les compteurs numériques. |
| NL for | Voor wie gewoon minder wil betalen. | Voor wie zekerheid wil. | Voor wie alles wil zien: verbruik, pieken, zonnepanelen. |
| FR for | Pour ceux qui veulent simplement payer moins. | Pour ceux qui veulent une certitude. | Pour ceux qui veulent tout voir : consommation, pics, panneaux solaires. |
| NL price | **€ 5,75**/maand · € 69 per jaar | **€ 8,25**/maand · € 99 per jaar | **€ 16,50**/maand · € 198 per jaar |
| FR price | **5,75 €**/mois · 69 € par an | **8,25 €**/mois · 99 € par an | **16,50 €**/mois · 198 € par an |
| Price sub | jaarlijks gefactureerd / facturé annuellement | idem | idem, dongle inbegrepen / dongle inclus |
| Features | `{{plans[0].features}}` | `{{plans[1].features}}` | `{{plans[2].features}}` (derived ones behind a flag) |
| NL CTA | Kies Switch | Kies Switch Plus | Kies Premium |
| FR CTA | Choisir Switch | Choisir Switch Plus | Choisir Premium |

Plan CTAs link to `aanmelden/?plan=<slug>` / `inscription/?plan=<slug>`.

**Comparison table**: row labels
| NL | FR | Switch | Plus | Premium |
|---|---|---|---|---|
| Analyse van 17+ leveranciers | Analyse de plus de 17 fournisseurs | ✓ | ✓ | ✓ |
| Wij regelen de overstap | Nous gérons le changement | ✓ | ✓ | ✓ |
| Automatisch of na jouw akkoord | Automatiquement ou après votre accord | ✓ | ✓ | ✓ |
| Analoge en digitale meters | Compteurs analogiques et numériques | ✓ | ✓ | digitaal / numérique |
| Optie 100% groene energie | Option 100 % énergie verte | ✓ | ✓ | ✓ |
| Winstgarantie (€ 99 terug) | Garantie de gain (99 € remboursés) | – | ✓ | ✓ |
| Jaarlijks besparingsrapport | Rapport d'économies annuel | – | ✓ | ✓ |
| June Dongle (P1) | June Dongle (P1) | – | – | ✓ |
| Live verbruik, historiek per kwartier | Consommation en direct, historique par quart d'heure | – | – | ✓ |
| Zonnepanelen: zelfverbruik en injectie | Panneaux solaires : autoconsommation et injection | – | – | ✓ |

(For a table cell, the accessible text of "–" is "Niet inbegrepen" / "Non inclus".)

**Dongle block** (`#dongle`)
| | NL | FR |
|---|---|---|
| H2 | De June Dongle | Le June Dongle |
| Body | Een klein toestel voor de P1-poort van je digitale meter. Het stuurt je verbruik en injectie live door, zodat je in de app ziet wat er gebeurt. Inbegrepen bij Premium. | Un petit appareil pour le port P1 de votre compteur numérique. Il transmet en direct votre consommation et votre injection, pour que vous voyiez dans l'app ce qui se passe. Inclus dans Premium. |
| Requirement | Je hebt een digitale meter met geactiveerde gebruikerspoort nodig. | Il vous faut un compteur numérique avec port utilisateur activé. |

**Plans FAQ**: `cost`, `guarantee`, `cancel`, `meters`. Then the price footnote.

---

## 3. Switch Plus: `/nl-be/switch-plus/` · `/fr-be/switch-plus/`

**SEO**
- NL title: `Switch Plus: besparen met winstgarantie | June` · meta: `Bespaar je niet meer dan je abonnement kost, dan krijg je € 99 terug. Switch Plus: € 8,25 per maand, € 99 per jaar.`
- FR title: `Switch Plus : économisez avec garantie de gain | June` · meta: `Si vous n'économisez pas plus que le prix de votre abonnement, vous récupérez 99 €. Switch Plus : 8,25 € par mois, 99 € par an.`

| | NL | FR |
|---|---|---|
| Eyebrow | June Switch Plus | June Switch Plus |
| H1 | Besparen met gegarandeerd resultaat. | Économisez, avec un résultat garanti. |
| Sub | Alles uit Switch, plus de zekerheid dat je abonnement zichzelf terugverdient. Doet het dat niet, dan krijg je € 99 terug.⁴ | Tout ce qu'offre Switch, plus la certitude que votre abonnement se rembourse. Sinon, vous récupérez 99 €.⁴ |
| Price | **€ 8,25**/maand · € 99 per jaar, jaarlijks gefactureerd | **8,25 €**/mois · 99 € par an, facturé annuellement |
| CTA | Kies Switch Plus | Choisir Switch Plus |
| Secondary | Vergelijk met Switch en Premium | Comparer avec Switch et Premium |

**The guarantee, step by step**
| | NL | FR |
|---|---|---|
| H2 | Zo werkt de winstgarantie | Comment fonctionne la garantie de gain |
| 1 | **Je abonnementsjaar start.** June volgt je contract op en zet je over wanneer het voordeliger kan. | **Votre année d'abonnement commence.** June suit votre contrat et vous fait changer quand c'est plus avantageux. |
| 2 | **Na een jaar maken we de rekening.** In je besparingsrapport zie je hoeveel je bespaard hebt. | **Après un an, nous faisons le compte.** Votre rapport d'économies montre combien vous avez économisé. |
| 3 | **Te weinig bespaard? Geld terug.** Bespaar je niet meer dan je abonnement kost, dan krijg je € 99 terug. | **Pas assez économisé ? Remboursé.** Si vous n'économisez pas plus que le prix de votre abonnement, vous récupérez 99 €. |
| Small print | De volledige voorwaarden staan in onze algemene voorwaarden. [link] | Toutes les conditions figurent dans nos conditions générales. [lien] |

**Annual report**
| | NL | FR |
|---|---|---|
| H2 | Je jaarlijks besparingsrapport | Votre rapport d'économies annuel |
| Body | Eén helder overzicht per jaar: wat je verbruikt hebt, bij welke leveranciers je zat, en wat dat opbracht. | Un aperçu clair chaque année : ce que vous avez consommé, chez quels fournisseurs vous étiez, et ce que cela vous a rapporté. |

**Also included**: Switch features (`{{plans[0].features}}`), with the heading "Ook inbegrepen" / "Également inclus".

**Is it for me?**
| | NL | FR |
|---|---|---|
| H2 | Switch of Switch Plus? | Switch ou Switch Plus ? |
| Body | Kies Switch als je gewoon wil besparen. Kies Switch Plus als je zeker wil zijn dat June zichzelf terugbetaalt. Heb je een digitale meter en wil je live inzicht? Bekijk dan Premium. | Choisissez Switch si vous voulez simplement économiser. Choisissez Switch Plus si vous voulez être sûr que June se rembourse. Vous avez un compteur numérique et voulez un suivi en direct ? Découvrez Premium. |

**FAQ**: `guarantee`, `cancel`, `approval`. **Closing CTA**: "Start met Switch Plus" / "Commencer avec Switch Plus".

---

## 4. Hoe werkt het / Comment ça marche: `/nl-be/hoe-werkt-het/` · `/fr-be/comment-ca-marche/`

**SEO**
- NL title: `Hoe werkt June? | Automatisch overstappen van energieleverancier` · meta: `Koppel je meter, June vergelijkt 17+ leveranciers voor jouw verbruik en regelt de overstap: automatisch of na jouw akkoord.`
- FR title: `Comment fonctionne June ? | Changer de fournisseur automatiquement` · meta: `Connectez votre compteur, June compare plus de 17 fournisseurs pour votre consommation et gère le changement : automatiquement ou après votre accord.`

| | NL | FR |
|---|---|---|
| H1 | Hoe zorgt June dat je een voordelig energietarief hebt? | Comment June veille-t-elle à ce que vous ayez un tarif d'énergie avantageux ? |
| Intro | Energieprijzen veranderen voortdurend. June volgt ze voor je op, zodat jij dat niet hoeft te doen. | Les prix de l'énergie changent sans cesse. June les suit pour vous, pour que vous n'ayez pas à le faire. |

**Detailed steps**: `{{howItWorks.detailed}}` (4 steps; text in facts.json).

**You vs. June**
| | NL | FR |
|---|---|---|
| H2 | Wat jij doet, wat wij doen | Ce que vous faites, ce que nous faisons |
| Jij / Vous | Je meldt je aan (twee minuten). Je kiest: automatisch wisselen of zelf goedkeuren. Heb je een analoge meter? Dan geef je af en toe je meterstanden in. | Vous vous inscrivez (deux minutes). Vous choisissez : changement automatique ou validation par vous. Vous avez un compteur analogique ? Vous encodez vos index de temps en temps. |
| June | We volgen de markt op, zoeken het voordeligste contract uit onze vergelijking voor jouw verbruik, sluiten het af, zeggen je oude contract op en houden je op de hoogte. | Nous suivons le marché, cherchons parmi les contrats comparés le plus avantageux pour votre consommation, le souscrivons, résilions votre ancien contrat et vous tenons informé. |

**Reassurance (3 cards)**
| NL | FR |
|---|---|
| **Geen onderbreking.** Je meter en je netbeheerder blijven dezelfde. | **Aucune interruption.** Votre compteur et votre gestionnaire de réseau restent les mêmes. |
| **Geen opzegvergoeding.** Als particulier verander je in België vrij van leverancier. | **Pas d'indemnité de rupture.** En Belgique, un particulier change librement de fournisseur. |
| **Jij houdt de controle.** Automatisch wisselen of elke overstap zelf goedkeuren: jij kiest. | **Vous gardez le contrôle.** Changement automatique ou validation de chaque changement : c'est vous qui choisissez. |

**Meters**
| | NL | FR |
|---|---|---|
| H2 | Welke meter heb je? | Quel compteur avez-vous ? |
| Digital | **Digitale meter.** We lezen je verbruik automatisch uit. Met de June Dongle (Premium) zie je het zelfs live. | **Compteur numérique.** Nous relevons votre consommation automatiquement. Avec le June Dongle (Premium), vous la voyez même en direct. |
| Analogue | **Analoge meter.** Geen probleem. Je geeft je meterstanden zelf in, wij doen de rest. | **Compteur analogique.** Pas de problème. Vous encodez vos index, nous faisons le reste. |

**Video** (optional): caption "Bekijk hoe June werkt (1 min)" / "Découvrez comment fonctionne June (1 min)". Needs captions in both languages.

**Closing CTA**: "Start je aanmelding" / "Commencer mon inscription". Secondary: "Bekijk de abonnementen" / "Voir les abonnements".

---

## 5. FAQ: `/nl-be/veelgestelde-vragen/` · `/fr-be/questions-frequentes/`

**SEO**
- NL title: `Veelgestelde vragen | June` · meta: `Alles over June: wat het kost, hoe de overstap werkt, de winstgarantie, je meter en je gegevens.`
- FR title: `Questions fréquentes | June` · meta: `Tout sur June : le prix, le changement de fournisseur, la garantie de gain, votre compteur et vos données.`

| | NL | FR |
|---|---|---|
| H1 | Veelgestelde vragen | Questions fréquentes |
| Intro | Staat je vraag er niet bij? Neem contact met ons op. | Votre question n'y figure pas ? Contactez-nous. |

**Groups** (bind items from `{{faq}}` by id; answers verbatim from facts.json)
| Group NL | Group FR | Items |
|---|---|---|
| Over June | À propos de June | not-a-supplier, independence, how-so-much, which-suppliers |
| Prijs en abonnement | Prix et abonnement | cost, guarantee, cancel |
| De overstap | Le changement de fournisseur | approval, exit-fee, no-interruption, green |
| Je meter en je gegevens | Votre compteur et vos données | meters, regions, data |

Items with a `[placeholder]` (cancel, regions, independence) are hidden until they are confirmed. Mark up the page with `FAQPage` structured data, using the same text as the visible copy.

**Closing CTA**: "Klaar om te starten?" + "Start je aanmelding" / « Prêt à commencer ? » + "Commencer mon inscription".

---

## 6. Aanmelden / Inscription: `/nl-be/aanmelden/` · `/fr-be/inscription/`

**SEO**
- NL title: `Aanmelden | June` · meta: `Meld je aan bij June in twee minuten. Je postcode en je e-mailadres volstaan om te starten.` (Consider `noindex` for the form URL. Owner to decide.)
- FR title: `Inscription | June` · meta: `Inscrivez-vous chez June en deux minutes. Votre code postal et votre adresse e-mail suffisent pour commencer.`

| | NL | FR |
|---|---|---|
| H1 | Meld je aan in twee minuten | Inscrivez-vous en deux minutes |
| Progress | Stap 1 van 2 · Je woning / Stap 2 van 2 · Je e-mailadres | Étape 1 sur 2 · Votre logement / Étape 2 sur 2 · Votre adresse e-mail |
| Plan chip (if `?plan=`) | Gekozen abonnement: Switch Plus · Wijzigen | Abonnement choisi : Switch Plus · Modifier |
| Side reassurance | 20.000+ klanten · 4,3/5 op Google · Geen onderbreking van je energie | Plus de 20 000 clients · 4,3/5 sur Google · Aucune interruption de votre énergie |

### Step 1: postcode + household / usage

| Field | NL label · helper | FR label · helper |
|---|---|---|
| Postcode | **Postcode** · "Zo weten we welke netbeheerder en welke aanbiedingen er bij jou gelden." | **Code postal** · « Pour savoir quel gestionnaire de réseau et quelles offres s'appliquent chez vous. » |
| Energy | **Wat wil je laten vergelijken?** Elektriciteit · Elektriciteit en gas | **Que voulez-vous faire comparer ?** Électricité · Électricité et gaz |
| Meter | **Welke meter heb je?** Digitale meter · Analoge meter · Ik weet het niet | **Quel compteur avez-vous ?** Compteur numérique · Compteur analogique · Je ne sais pas |
| Meter helper | "Een digitale meter heeft een schermpje en knoppen, en meestal een P1-poort." | « Un compteur numérique a un petit écran et des boutons, et généralement un port P1. » |
| Household | **Met hoeveel personen woon je?** 1 · 2 · 3–4 · 5 of meer | **Combien de personnes vivent chez vous ?** 1 · 2 · 3–4 · 5 ou plus |
| Usage (optional, disclosure) | **Ken je je jaarverbruik?** (optioneel) · "Je vindt het op je jaarlijkse afrekening. Weet je het niet, dan schatten we het voorlopig op basis van je gezin." · fields: Elektriciteit (kWh/jaar), Gas (kWh/jaar) | **Vous connaissez votre consommation annuelle ?** (facultatif) · « Vous la trouvez sur votre facture de régularisation. Sinon, nous l'estimons provisoirement sur la base de votre ménage. » · champs : Électricité (kWh/an), Gaz (kWh/an) |
| Solar | **Heb je zonnepanelen?** Ja · Nee | **Avez-vous des panneaux solaires ?** Oui · Non |
| Green (optional) | Ik wil alleen 100% groene stroom | Je veux uniquement de l'électricité 100 % verte |
| Button | Volgende | Suivant |

**Validation / states**
| State | NL | FR |
|---|---|---|
| Postcode empty | Vul je postcode in. | Indiquez votre code postal. |
| Postcode invalid | Een Belgische postcode heeft 4 cijfers. | Un code postal belge compte 4 chiffres. |
| Postcode not served | June is nog niet beschikbaar in [postcode]. Laat je e-mailadres achter, dan laten we het je weten zodra dat wel zo is. | June n'est pas encore disponible à [code postal]. Laissez votre adresse e-mail, nous vous préviendrons dès que ce sera le cas. |
| Choice missing | Maak een keuze. | Faites un choix. |
| Usage out of range | Dat lijkt ons veel. Kijk je het even na? | Cela nous semble beaucoup. Pouvez-vous vérifier ? |
| Premium + analogue | Premium werkt enkel met een digitale meter. Kies Switch of Switch Plus, of ga toch verder als je binnenkort een digitale meter krijgt. | Premium fonctionne uniquement avec un compteur numérique. Choisissez Switch ou Switch Plus, ou continuez si vous recevez bientôt un compteur numérique. |

Don't show a € savings estimate at this step (claims register C17). Optional line: "Na je aanmelding berekenen we wat June voor jou kan besparen." / « Après votre inscription, nous calculons ce que June peut vous faire économiser. »

### Step 2: email

| Element | NL | FR |
|---|---|---|
| H2 | Waar mogen we je resultaat naartoe sturen? | Où pouvons-nous vous envoyer votre résultat ? |
| Email | **E-mailadres** · "We gebruiken het alleen voor je aanmelding en je account." | **Adresse e-mail** · « Nous l'utilisons uniquement pour votre inscription et votre compte. » |
| Email invalid | Dit e-mailadres lijkt niet te kloppen. | Cette adresse e-mail ne semble pas correcte. |
| Consent (required) | Ik ga akkoord met de [algemene voorwaarden] en heb de [privacyverklaring] gelezen. | J'accepte les [conditions générales] et j'ai lu la [déclaration de confidentialité]. |
| Consent (optional, unchecked) | Stuur me af en toe tips en nieuws van June. | Envoyez-moi de temps en temps des conseils et des nouvelles de June. |
| Button | Aanmelding starten | Démarrer mon inscription |
| Under button | Je betaalt nog niets. Je hebt 14 dagen bedenktijd nadat je je abonnement afsluit. | Vous ne payez rien pour l'instant. Vous disposez de 14 jours de rétractation après la souscription de votre abonnement. |
| Back | Vorige | Précédent |

### Confirmation
| | NL | FR |
|---|---|---|
| H2 | Check je mailbox | Consultez votre boîte mail |
| Body | We stuurden een e-mail naar **[e-mail]**. Klik op de link om je aanmelding af te ronden. | Nous avons envoyé un e-mail à **[e-mail]**. Cliquez sur le lien pour finaliser votre inscription. |
| Not received | Niets ontvangen? Kijk in je spam of [stuur opnieuw]. | Rien reçu ? Vérifiez vos spams ou [renvoyez l'e-mail]. |
| Error (network) | Er ging iets mis. Je gegevens zijn niet verloren. Probeer het opnieuw. | Un problème est survenu. Vos données ne sont pas perdues. Veuillez réessayer. |

(The hand-off after the confirmation is external. See content-issues #11.)

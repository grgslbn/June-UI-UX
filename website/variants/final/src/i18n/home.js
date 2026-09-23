// Variant C "Honest Market" — homepage copy, NL + FR. Numbers from facts.json via site.js.
// Phase 4: tightened. Hero → how (3 steps) → who pays + prices → guarantee → reviews → 4 FAQs → close.
// Market facts moved to Hoe werkt het; "June vs doing it yourself" moved to Abonnementen.
import { facts, SW, SWP, PREM, G, faqById, localise, siteCopy } from './site.js';

// Cancellation: facts.json still has a [placeholder] (BLOCKING). Safe interim wording, nothing unconfirmed.
const CANCEL = {
  nl: 'Ja. Na je aanmelding heb je 14 dagen bedenktijd. De opzeg- en verlengingsregels van je June-abonnement lees je in de algemene voorwaarden. Je energiecontract zelf kan je als particulier altijd opzeggen met een maand opzeg, zonder verbrekingsvergoeding.',
  fr: 'Oui. Après votre inscription, vous disposez de 14 jours de rétractation. Les règles de résiliation et de reconduction de votre abonnement June figurent dans les conditions générales. Votre contrat d’énergie, en tant que particulier, vous pouvez toujours le résilier avec un mois de préavis, sans indemnité de rupture.',
};

const page = localise((L, m) => {
  const steps = facts.howItWorks.short.map((s) => ({ n: s.n, title: s.title[L], body: s.body[L] }));
  const faq = (id, override, fn) => ({ id, q: faqById(id).q[L], a: override || faqById(id).a[L], fn });
  if (L === 'nl') return {
    meta: {
      title: 'June: automatisch naar een voordeliger energiecontract',
      description: 'June is geen leverancier. Jij betaalt ons, dus wij volgen de markt voor jou op: 17+ energieleveranciers, minstens elke maand. Klanten besparen gemiddeld € 326 per jaar.',
    },
    hero: {
      kicker: 'Onafhankelijk · geen energieleverancier',
      h1a: 'Energieleveranciers rekenen op je trouw.', h1b: 'Wij niet.',
      lead: 'Jij betaalt ons, niet de leverancier. Dus werken we voor jou: minstens elke maand zoeken we een voordeliger contract voor jouw verbruik. De overstap regelen wij.',
      saving: ['Klanten besparen ', facts.saving.averagePerYear.display.nl, '.'],
    },
    ledger: [
      { q: 'Wat is June?', a: 'Geen leverancier.', d: 'Een onafhankelijke dienst die elke maand vergelijkt en je laat overstappen: automatisch, of pas na jouw akkoord. Je stroom blijft gewoon lopen.' },
      { q: 'Wat kost het?', a: `${m(SW.priceYearly)}, ${m(SWP.priceYearly)} of ${m(PREM.priceYearly)} per jaar.`, d: `Voor Switch, Switch Plus of Premium, jaarlijks gefactureerd (${m(SW.priceMonthly)} tot ${m(PREM.priceMonthly)} per maand). Je energie betaal je aan je leverancier.`, fn: 6 },
      { q: 'Wat als het tegenvalt?', a: `${m(G.amount)} terug.`, d: `Winstgarantie bij Switch Plus: bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je ${m(G.amount)} terug.`, fn: 4 },
    ],
    chart: {
      title: 'Hoe een contract duurder wordt als je niets doet',
      tag: 'Illustratief',
      desc: 'Illustratieve lijngrafiek over vier jaar. De lijn “Niets doen” start laag met een welkomstkorting en stijgt elk jaar trapsgewijs. De lijn “Met June” blijft ongeveer op het startniveau, omdat June opnieuw vergelijkt en wisselt. Het verschil tussen beide lijnen is omcirkeld als “de prijs van trouw”. Geen echte marktdata.',
      y: 'Wat je betaalt', x: ['Jaar 1', 'Jaar 2', 'Jaar 3', 'Jaar 4'],
      stay: ['Niets doen'], june: ['Met June'], step: ['Welkomst-', 'korting stopt'], gap: ['De prijs', 'van trouw'],
      legend: 'June vergelijkt opnieuw en wisselt: automatisch, of na jouw akkoord.',
      method: 'Vereenvoudigd verloop, geen echte marktprijzen. Bron vóór livegang: tariefdata van de CREG en de VREG.',
    },
    product: {
      kicker: 'Wat je daarna ziet', h2: 'Je ziet wat June voor je doet. Elke maand.',
      body: 'In de June-app zie je je verbruik, je contract en wat een overstap opbracht. Met Premium en de June Dongle zie je het zelfs live.',
      points: ['Switch en Switch Plus: je verbruik en je contract in de app', 'Switch Plus: elk jaar een besparingsrapport, de basis van je winstgarantie', 'Premium: June Dongle inbegrepen, live verbruik en injectie via de P1-poort'],
      link: 'Premium en de June Dongle', cap: 'De huidige June-app en de June Dongle.',
      alt: { phone: 'Verbruiksscherm van de June-app met een staafgrafiek per dag en tegels voor afname en injectie', dongle: 'De June Dongle: een wit toestel met een groene kabel in de vorm van een blad' },
    },
    tile: {
      label: 'Aanbevolen', plan: 'Switch Plus', price: m(SWP.priceYearly), per: 'per jaar', monthly: `${SWP.priceDisplay.nl.main}, jaarlijks gefactureerd`,
      guarantee: `Winstgarantie: ${m(G.amount)} terug als je in een abonnementsjaar niet meer bespaart dan je abonnement kost.`,
      checked: 'Elke maand gecontroleerd', months: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'], monthsLabel: 'Twaalf controles per jaar, één per maand',
      control: 'Automatisch, of pas na jouw akkoord', link: 'Alle abonnementen',
    },
    how: {
      n: '01', kicker: 'Wat June doet',
      h2: 'Wij kijken. Minstens elke maand. Voor jouw verbruik.',
      emph: 'Automatisch, of pas na jouw akkoord: jij kiest.',
      limit: '<strong>Wat we niet beloven:</strong> dat je vaak wisselt. Beweegt de markt niet, dan wisselen we niet.',
      more: 'Zo werkt June, stap voor stap',
    },
    steps,
    model: {
      n: '02', kicker: 'Het verdienmodel',
      h2: 'Wie betaalt June? Jij. En dat is precies de bedoeling.',
      body: ['June leeft van de abonnementen van haar klanten.', ' We zijn geen energieleverancier en kiezen je contract op basis van jouw verbruik.', 'Je betaalt ons een vaste prijs per jaar. Je energie zelf betaal je, zoals nu, aan je leverancier.'],
      caption: 'Wat je June betaalt', cols: ['Abonnement', 'Per jaar', 'Per maand'], badge: 'Aanbevolen · met winstgarantie', billed: 'jaarlijks gefactureerd', dongle: 'dongle inbegrepen',
      more: 'Vergelijk de abonnementen', vs: 'June of zelf vergelijken?',
    },
    reviews: {
      n: '04', kicker: 'Wat klanten zeggen',
      basis: 'op Google, op basis van 1.200+ reviews',
      label: 'Uit onze Google-reviews',
      ph: 'Hier komt een echte Google-review: woordelijk, met voornaam, gemeente en datum. Portret enkel met toestemming.',
    },
    faq: {
      n: '05', kicker: 'Vragen van sceptici',
      h2: 'Eerlijke antwoorden op de vragen die je nu hebt.',
      all: 'Alle eerlijke antwoorden',
      items: [
        faq('not-a-supplier'),
        faq('independence', 'June leeft van de abonnementen van haar klanten. We zijn geen leverancier en kiezen het contract op basis van jouw verbruik.', 5),
        faq('exit-fee'),
        faq('meters'),
        { id: 'cancel', q: faqById('cancel').q.nl, a: CANCEL.nl },
      ],
    },
  };
  return {
    meta: {
      title: 'June : un contrat d’énergie avantageux, automatiquement',
      description: `June n’est pas un fournisseur. C’est vous qui nous payez : nous suivons pour vous ${facts.suppliers.count.display.fr}, au moins une fois par mois. En moyenne 326 € d’économie par an.`,
    },
    hero: {
      kicker: 'Indépendant · pas un fournisseur d’énergie',
      h1a: 'Les fournisseurs comptent sur votre fidélité.', h1b: 'Pas nous.',
      lead: 'C’est vous qui nous payez, pas le fournisseur. Nous travaillons donc pour vous : au moins une fois par mois, nous cherchons un contrat plus avantageux pour votre consommation. Le changement, c’est nous.',
      saving: ['Nos clients économisent ', facts.saving.averagePerYear.display.fr, '.'],
    },
    ledger: [
      { q: 'June, c’est quoi ?', a: 'Pas un fournisseur.', d: 'Un service indépendant qui compare chaque mois et vous fait changer : automatiquement, ou seulement après votre accord. Votre électricité continue d’arriver.' },
      { q: 'Combien ça coûte ?', a: `${m(SW.priceYearly)}, ${m(SWP.priceYearly)} ou ${m(PREM.priceYearly)} par an.`, d: `Pour Switch, Switch Plus ou Premium, facturé annuellement (de ${m(SW.priceMonthly)} à ${m(PREM.priceMonthly)} par mois). Votre énergie, vous la payez à votre fournisseur.`, fn: 6 },
      { q: 'Et si ça ne rapporte pas ?', a: `${m(G.amount)} remboursés.`, d: `Garantie de gain avec Switch Plus : si vous n’économisez pas plus que le prix de votre abonnement sur une année, vous récupérez ${m(G.amount)}.`, fn: 4 },
    ],
    chart: {
      title: 'Comment un contrat devient plus cher quand on ne fait rien',
      tag: 'Illustratif',
      desc: 'Graphique linéaire illustratif sur quatre ans. La ligne « Sans rien faire » commence bas grâce à une remise de bienvenue, puis monte par paliers chaque année. La ligne « Avec June » reste proche du niveau de départ, car June compare et change à nouveau. L’écart entre les deux lignes est entouré : « le prix de la fidélité ». Aucune donnée réelle du marché.',
      y: 'Ce que vous payez', x: ['Année 1', 'Année 2', 'Année 3', 'Année 4'],
      stay: ['Sans rien', 'faire'], june: ['Avec June'], step: ['Fin de la remise', 'de bienvenue'], gap: ['Le prix de', 'la fidélité'],
      legend: 'June compare à nouveau et change : automatiquement, ou après votre accord.',
      method: 'Évolution simplifiée, sans prix réels du marché. Source avant la mise en ligne : données tarifaires de la CREG, de la CWaPE et de Brugel.',
    },
    product: {
      kicker: 'Ce que vous voyez ensuite', h2: 'Vous voyez ce que June fait pour vous. Chaque mois.',
      body: 'Dans l’app June, vous voyez votre consommation, votre contrat et ce qu’un changement vous a rapporté. Avec Premium et le June Dongle, vous le voyez même en direct.',
      points: ['Switch et Switch Plus : votre consommation et votre contrat dans l’app', 'Switch Plus : chaque année un rapport d’économies, la base de votre garantie de gain', 'Premium : June Dongle inclus, consommation et injection en direct via le port P1'],
      link: 'Premium et le June Dongle', cap: 'L’app June actuelle et le June Dongle.',
      alt: { phone: 'Écran Consommation de l’app June avec un graphique en barres par jour et des tuiles pour le prélèvement et l’injection', dongle: 'Le June Dongle : un boîtier blanc avec un câble vert en forme de feuille' },
    },
    tile: {
      label: 'Recommandé', plan: 'Switch Plus', price: m(SWP.priceYearly), per: 'par an', monthly: `${SWP.priceDisplay.fr.main}, facturé annuellement`,
      guarantee: `Garantie de gain : ${m(G.amount)} remboursés si, sur une année d’abonnement, vous n’économisez pas plus que le prix de votre abonnement.`,
      checked: 'Contrôlé chaque mois', months: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'], monthsLabel: 'Douze contrôles par an, un par mois',
      control: 'Automatiquement, ou après votre accord', link: 'Tous les abonnements',
    },
    how: {
      n: '01', kicker: 'Ce que fait June',
      h2: 'Nous surveillons. Au moins une fois par mois. Pour votre consommation.',
      emph: 'Automatiquement ou seulement après votre accord : c’est vous qui choisissez.',
      limit: '<strong>Ce que nous ne promettons pas :</strong> de changer souvent. Si le marché ne bouge pas, nous ne changeons pas.',
      more: 'Comment fonctionne June, étape par étape',
    },
    steps,
    model: {
      n: '02', kicker: 'Notre modèle',
      h2: 'Qui paie June ? Vous. Et c’est voulu.',
      body: ['June vit des abonnements de ses clients.', ' Nous ne sommes pas fournisseur d’énergie et choisissons votre contrat sur la base de votre consommation.', 'Vous nous payez un prix fixe par an. Votre énergie, vous continuez à la payer à votre fournisseur.'],
      caption: 'Ce que vous payez à June', cols: ['Abonnement', 'Par an', 'Par mois'], badge: 'Recommandé · avec garantie de gain', billed: 'facturé annuellement', dongle: 'dongle inclus',
      more: 'Comparer les abonnements', vs: 'June ou comparer soi-même ?',
    },
    reviews: {
      n: '04', kicker: 'Ce que disent nos clients',
      basis: 'sur Google, sur la base de plus de 1 200 avis',
      label: 'Extraits de nos avis Google',
      ph: 'Ici viendra un vrai avis Google : mot pour mot, avec prénom, commune et date. Portrait uniquement avec accord.',
    },
    faq: {
      n: '05', kicker: 'Questions de sceptiques',
      h2: 'Des réponses franches aux questions que vous vous posez.',
      all: 'Toutes les réponses franches',
      items: [
        faq('not-a-supplier'),
        faq('independence', 'June vit des abonnements de ses clients. Nous ne sommes pas fournisseur et choisissons le contrat sur la base de votre consommation.', 5),
        faq('exit-fee'),
        faq('meters'),
        { id: 'cancel', q: faqById('cancel').q.fr, a: CANCEL.fr },
      ],
    },
  };
});

export const homeCopy = (locale) => ({ ...siteCopy(locale), ...page(locale) });

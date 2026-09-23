// Variant C "Honest Market" — homepage copy, NL + FR. Numbers from facts.json via site.js.
// Phase 4: tightened. Hero → how (3 steps) → who pays + prices → guarantee → reviews → 4 FAQs → close.
// Market facts moved to Hoe werkt het; "June vs doing it yourself" moved to Abonnementen.
import { facts, SW, SWP, PREM, G, faqById, localise, siteCopy } from './site.js';

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
      lead: 'June is geen leverancier. Jij betaalt ons, dus wij werken voor jou: minstens elke maand zoeken we een voordeliger contract voor jouw verbruik, en we regelen de overstap.',
      saving: ['Klanten besparen ', facts.saving.averagePerYear.display.nl, '.'],
    },
    ledger: [
      { q: 'Wat is June?', a: 'Geen leverancier.', d: 'Een onafhankelijke dienst. Je stroom en gas blijven gewoon lopen, alleen wie je factureert verandert.' },
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
        faq('no-interruption'),
      ],
    },
  };
  return {
    meta: {
      title: 'June : passez automatiquement à un contrat d’énergie plus avantageux',
      description: `June n’est pas un fournisseur. C’est vous qui nous payez : nous suivons pour vous ${facts.suppliers.count.display.fr}, au moins une fois par mois. En moyenne 326 € d’économie par an.`,
    },
    hero: {
      kicker: 'Indépendant · pas un fournisseur d’énergie',
      h1a: 'Les fournisseurs comptent sur votre fidélité.', h1b: 'Pas nous.',
      lead: 'June n’est pas un fournisseur. C’est vous qui nous payez, donc nous travaillons pour vous : au moins une fois par mois, nous cherchons un contrat plus avantageux pour votre consommation, et nous gérons le changement.',
      saving: ['Nos clients économisent ', facts.saving.averagePerYear.display.fr, '.'],
    },
    ledger: [
      { q: 'June, c’est quoi ?', a: 'Pas un fournisseur.', d: 'Un service indépendant. Votre électricité et votre gaz continuent d’arriver, seul celui qui vous facture change.' },
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
        faq('no-interruption'),
      ],
    },
  };
});

export const homeCopy = (locale) => ({ ...siteCopy(locale), ...page(locale) });

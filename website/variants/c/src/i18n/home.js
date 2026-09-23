// Variant C "Honest Market" — homepage copy, NL + FR.
// Every number, price, guarantee and FAQ answer is read from facts.json (content freeze).
// FR is written natively (vous), not translated word for word.
import facts from '@shared/content/facts.json';

const [sw, swp, prem] = facts.plans;
const g = facts.guarantees.winstgarantie;
const faq = id => facts.faq.find(f => f.id === id);
const steps = facts.howItWorks.short;
const NNBSP = ' ';

export const money = (n, loc) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  const grouped = s.replace(/\B(?=(\d{3})+(?!\d))/g, loc === 'nl' ? '.' : NNBSP);
  return loc === 'nl' ? `€ ${grouped}` : `${grouped} €`;
};

const month = { nl: 'maart 2026', fr: 'mars 2026' }; // socialProof.asOf = 2026-03

export function homeCopy(locale) {
  const L = locale === 'fr-be' ? 'fr' : 'nl';
  const m = n => money(n, L);
  const common = {
    L,
    rating: facts.socialProof.googleRating.value,
    ratingDisplay: facts.socialProof.googleRating.display[L],
    customers: facts.socialProof.customers.display[L],
    steps: steps.map(s => ({ n: s.n, title: s.title[L], body: s.body[L] })),
    plans: [sw, swp, prem].map(p => ({ name: p.shortName, yearly: m(p.priceYearly), monthly: p.priceDisplay[L].main, sub: p.priceDisplay[L].sub, slug: p.slug })),
    guaranteeSummary: g.summary[L],
    footnotes: [
      { id: 'fn-1', text: facts.saving.averagePerYear.footnote[L] },
      { id: 'fn-2', text: L === 'nl' ? `Google-score en aantal reviews op ${month.nl}.` : `Note Google et nombre d’avis en ${month.fr}.` },
      { id: 'fn-3', text: L === 'nl' ? `Aantal klanten op ${month.nl}.` : `Nombre de clients en ${month.fr}.` },
      { id: 'fn-4', text: L === 'nl' ? 'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.' : 'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.' },
      { id: 'fn-5', text: L === 'nl'
        ? 'June leeft van de abonnementen van haar klanten. Of June daarnaast vergoedingen van leveranciers ontvangt, wordt vóór livegang bevestigd en dan hier vermeld.'
        : 'June vit des abonnements de ses clients. Si June perçoit en plus des rémunérations de fournisseurs, ce sera confirmé avant la mise en ligne et mentionné ici.' },
      { id: 'fn-6', text: L === 'nl' ? 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.' : 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.' },
    ],
  };

  if (L === 'nl') return {
    ...common,
    meta: {
      title: 'June: automatisch naar een voordeliger energiecontract',
      description: 'June is geen leverancier. Jij betaalt ons, dus wij volgen de markt voor jou op: 17+ energieleveranciers, minstens elke maand. Klanten besparen gemiddeld € 326 per jaar.',
    },
    ui: { skip: 'Naar de inhoud', menu: 'Menu', login: 'Inloggen', cta: 'Bereken je besparing', langOther: 'FR', langOtherLabel: 'Lire en français', navLabel: 'Hoofdmenu' },
    nav: [['Hoe werkt het', '#hoe-werkt-het'], ['Prijzen', '#prijzen'], ['Reviews', '#reviews'], ['FAQ', '#faq']],
    form: { label: 'Je postcode', placeholder: 'bv. 9000', help: 'We gebruiken je postcode om je netbeheerder te kennen. Duurt 2 minuten.', error: 'Vul een Belgische postcode in van 4 cijfers, bv. 9000.' },
    trust: { rating: `${facts.socialProof.googleRating.display.nl}`, customers: facts.socialProof.customers.display.nl, same: 'Zelfde meter, geen onderbreking' },
    hero: {
      kicker: 'Onafhankelijk · geen energieleverancier',
      h1a: 'Energieleveranciers rekenen op je trouw.', h1b: 'Wij niet.',
      lead: 'June is geen leverancier. Jij betaalt ons, dus wij werken voor jou: minstens elke maand zoeken we een voordeliger contract voor jouw verbruik, en we regelen de overstap.',
      saving: ['Klanten besparen ', facts.saving.averagePerYear.display.nl, '.'],
    },
    ledger: [
      { q: 'Wat is June?', a: 'Geen leverancier.', d: 'Een onafhankelijke dienst. Je stroom en gas blijven gewoon lopen, alleen wie je factureert verandert.' },
      { q: 'Wat kost het?', a: `${m(sw.priceYearly)} per jaar.`, d: `Met Switch: ${sw.priceDisplay.nl.main}, jaarlijks gefactureerd. Switch Plus ${m(swp.priceYearly)}, Premium ${m(prem.priceYearly)} per jaar.`, fn: 6 },
      { q: 'Wat als het tegenvalt?', a: `${m(g.amount)} terug.`, d: `Winstgarantie bij Switch Plus: bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je ${m(g.amount)} terug.`, fn: 4 },
    ],
    chart: {
      title: 'Hoe een contract duurder wordt als je niets doet',
      tag: 'Illustratief',
      desc: 'Illustratieve lijngrafiek over vier jaar. De lijn “Niets doen” start laag met een welkomstkorting en stijgt elk jaar trapsgewijs. De lijn “Met June” blijft ongeveer op het startniveau, omdat June elk jaar opnieuw vergelijkt en wisselt. Het verschil tussen beide lijnen is omcirkeld als “de prijs van trouw”. Geen echte marktdata.',
      y: 'Wat je betaalt', x: ['Jaar 1', 'Jaar 2', 'Jaar 3', 'Jaar 4'],
      stay: ['Niets doen'], june: ['Met June'], step: ['Welkomst-', 'korting stopt'], gap: ['De prijs', 'van trouw'],
      legend: 'June vergelijkt opnieuw en wisselt: automatisch, of na jouw akkoord.',
      method: 'Illustratief, geen echte marktprijzen. Methode: een vereenvoudigd verloop van een contract waarvan de welkomstkorting na een jaar afloopt, naast een contract dat minstens elke maand opnieuw wordt vergeleken. Vóór livegang te vervangen door een grafiek op basis van tariefdata van de CREG en de VREG.',
    },
    market: {
      n: '01', kicker: 'Hoe de markt werkt',
      h2: 'Drie gewone feiten over de energiemarkt.',
      intro: 'Je hoeft de energiemarkt niet te begrijpen om eerlijk behandeld te worden. Maar het helpt om te weten hoe hij werkt.',
      facts: [
        { h: 'Prijzen bewegen, ook als jij stilzit.', p: 'Leveranciers passen hun tarieven regelmatig aan. Welk contract voordelig is, verandert dus mee. Wat vorig jaar een goede keuze was, is dat vandaag niet per se nog.' },
        { h: 'Wie niets doet, betaalt vaak meer.', p: 'Wie niet opvolgt, blijft vaak op een duurder contract zitten. Niet omdat je iets fout doet, maar omdat niemand kijkt. Dat noemen wij de prijs van trouw.' },
        { h: 'Overstappen is makkelijker dan het lijkt.', p: 'Als particulier wissel je in België zonder verbrekingsvergoeding, met een maand opzeg. Je meter, je aansluiting en je netbeheerder blijven dezelfde.' },
      ],
      quote: 'Eén keer vergelijken is een foto. De markt is een film.',
      quoteNote: 'Waarom June blijft kijken, ook na je overstap.',
    },
    how: {
      n: '02', kicker: 'Wat June doet',
      h2: 'Wij kijken. Minstens elke maand. Voor jouw verbruik.',
      emph: 'Automatisch, of pas na jouw akkoord: jij kiest.',
      limit: '<strong>Wat we niet beloven:</strong> dat je vaak wisselt. Als de markt niet beweegt, wisselen we niet. Dan zit je al op het voordeligste contract uit onze vergelijking, voor jouw verbruik.',
    },
    model: {
      n: '03', kicker: 'Het verdienmodel',
      h2: 'Wie betaalt June? Jij. En dat is precies de bedoeling.',
      body: ['June leeft van de abonnementen van haar klanten.', ' We zijn geen energieleverancier en kiezen je contract op basis van jouw verbruik.', 'Je betaalt ons een vaste prijs per jaar. Je energie zelf betaal je, zoals nu, aan je leverancier.'],
      flow: { you: 'Jij', june: 'June', sup: 'Leverancier', pay: 'abonnement, vaste jaarprijs', work: `vergelijkt ${facts.suppliers.count.display.nl}, regelt de overstap`, bill: 'Je energiefactuur betaal je, zoals nu, aan de leverancier' },
      caption: 'Wat je June betaalt', cols: ['Abonnement', 'Per jaar', 'Per maand'], badge: 'Met winstgarantie', billed: 'jaarlijks gefactureerd', dongle: 'dongle inbegrepen',
    },
    vs: {
      n: '04', kicker: 'Het verschil',
      h2: 'Eén keer vergelijken, of blijven opvolgen?',
      intro: 'Zelf vergelijken kan ook, en dat is nuttig. Het verschil zit in wat er daarna gebeurt.',
      cols: [['Zelf vergelijken', 'eenmalig, online'], ['Groepsaankoop', 'één ronde per keer'], ['June', 'abonnement']],
      rows: [
        ['Hoe vaak wordt er gekeken?', 'Wanneer jij eraan denkt', 'Eén keer per ronde', 'Minstens elke maand'],
        ['Wie regelt de overstap?', 'Jij', 'Jij aanvaardt het aanbod', 'Wij, automatisch of na jouw akkoord'],
        ['En na de overstap?', 'Niemand volgt op', 'Tot de volgende ronde', 'We blijven kijken'],
        ['Wat kost het?', 'Geen abonnement, wel je tijd', 'Geen abonnement', `${m(sw.priceYearly)} tot ${m(prem.priceYearly)} per jaar`],
        ['Garantie op het resultaat?', null, null, 'Winstgarantie bij Switch Plus en Premium'],
      ],
      none: 'niet voorzien',
      caption: 'Een vergelijking van werkwijzen, niet van specifieke aanbieders. Vergelijkingssites en groepsaankopen verschillen onderling.',
    },
    promise: {
      n: '05', kicker: 'De belofte',
      h2: 'Een belofte met voorwaarden die je gewoon kunt lezen.',
      outcomes: [
        { label: 'Je kiest Switch Plus', big: m(swp.priceYearly), p: `per jaar, jaarlijks gefactureerd (${swp.priceDisplay.nl.main}). Na elk abonnementsjaar kijken we hoeveel je bespaard hebt.` },
        { label: `Meer dan ${m(swp.priceYearly)} bespaard`, big: `> ${m(swp.priceYearly)}`, p: 'Dan heeft June zichzelf terugverdiend, en hou <strong>jij</strong> het verschil.' },
        { label: `${m(swp.priceYearly)} of minder bespaard`, big: `${m(g.amount)} terug`, accent: true, p: `Dan krijg je <strong>${m(g.amount)}</strong> terug.` },
      ],
      terms: 'Lees de voorwaarden',
    },
    reviews: {
      n: '06', kicker: 'Wat klanten zeggen',
      basis: 'op Google, op basis van 1.200+ reviews',
      label: 'Uit onze Google-reviews',
      ph: 'Hier komt een echte Google-review: woordelijk, met voornaam, gemeente en datum. Portret enkel met toestemming.',
    },
    faq: {
      n: '07', kicker: 'Vragen van sceptici',
      h2: 'Eerlijke antwoorden op de vragen die je nu hebt.',
      items: [
        { q: faq('not-a-supplier').q.nl, a: faq('not-a-supplier').a.nl },
        { q: faq('independence').q.nl, a: 'June leeft van de abonnementen van haar klanten. We zijn geen leverancier en kiezen het contract op basis van jouw verbruik.', fn: 5 },
        { q: faq('exit-fee').q.nl, a: faq('exit-fee').a.nl },
        { q: faq('no-interruption').q.nl, a: faq('no-interruption').a.nl },
        { q: faq('approval').q.nl, a: faq('approval').a.nl },
      ],
    },
    summary: {
      h2: 'Kort samengevat.',
      points: [
        'June is geen leverancier. Jij betaalt ons, niet de leverancier.',
        `We vergelijken ${facts.suppliers.count.display.nl}, minstens elke maand, voor jouw verbruik.`,
        'We wisselen automatisch, of pas na jouw akkoord.',
        `Winstgarantie (Switch Plus): ${m(g.amount)} terug als je niet meer bespaart dan je abonnement kost.`,
      ],
    },
    footer: {
      tagline: 'Jij de power, wij het werk.',
      about: 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.',
      mission: facts.brand.mission.nl,
      navTitle: 'June', notesTitle: 'Voetnoten en bronnen',
      legal: '© 2026 June Energy · KBO-nummer volgt',
      legalLinks: 'Algemene voorwaarden · Privacy · Cookies',
    },
    sticky: { strong: '4,3/5 op Google', sub: `${facts.socialProof.customers.display.nl} · geen leverancier` },
  };

  return {
    ...common,
    meta: {
      title: 'June : passez automatiquement à un contrat d’énergie plus avantageux',
      description: `June n’est pas un fournisseur. C’est vous qui nous payez : nous suivons pour vous ${facts.suppliers.count.display.fr}, au moins une fois par mois. En moyenne 326 € d’économie par an.`,
    },
    ui: { skip: 'Aller au contenu', menu: 'Menu', login: 'Se connecter', cta: 'Calculez votre économie', langOther: 'NL', langOtherLabel: 'Lees in het Nederlands', navLabel: 'Menu principal' },
    nav: [['Comment ça marche', '#hoe-werkt-het'], ['Prix', '#prijzen'], ['Avis', '#reviews'], ['FAQ', '#faq']],
    form: { label: 'Votre code postal', placeholder: 'ex. 1000', help: 'Votre code postal nous indique votre gestionnaire de réseau. Deux minutes suffisent.', error: 'Indiquez un code postal belge à 4 chiffres, par ex. 1000.' },
    trust: { rating: facts.socialProof.googleRating.display.fr, customers: facts.socialProof.customers.display.fr, same: 'Même compteur, aucune coupure' },
    hero: {
      kicker: 'Indépendant · pas un fournisseur d’énergie',
      h1a: 'Les fournisseurs comptent sur votre fidélité.', h1b: 'Pas nous.',
      lead: 'June n’est pas un fournisseur. C’est vous qui nous payez, donc nous travaillons pour vous : au moins une fois par mois, nous cherchons un contrat plus avantageux pour votre consommation, et nous gérons le changement.',
      saving: ['Nos clients économisent ', facts.saving.averagePerYear.display.fr, '.'],
    },
    ledger: [
      { q: 'June, c’est quoi ?', a: 'Pas un fournisseur.', d: 'Un service indépendant. Votre électricité et votre gaz continuent d’arriver, seul celui qui vous facture change.' },
      { q: 'Combien ça coûte ?', a: `${m(sw.priceYearly)} par an.`, d: `Avec Switch : ${sw.priceDisplay.fr.main}, facturé annuellement. Switch Plus ${m(swp.priceYearly)}, Premium ${m(prem.priceYearly)} par an.`, fn: 6 },
      { q: 'Et si ça ne rapporte pas ?', a: `${m(g.amount)} remboursés.`, d: `Garantie de gain avec Switch Plus : si vous n’économisez pas plus que le prix de votre abonnement sur une année, vous récupérez ${m(g.amount)}.`, fn: 4 },
    ],
    chart: {
      title: 'Comment un contrat devient plus cher quand on ne fait rien',
      tag: 'Illustratif',
      desc: 'Graphique linéaire illustratif sur quatre ans. La ligne « Sans rien faire » commence bas grâce à une remise de bienvenue, puis monte par paliers chaque année. La ligne « Avec June » reste proche du niveau de départ, car June compare et change à nouveau chaque année. L’écart entre les deux lignes est entouré : « le prix de la fidélité ». Aucune donnée réelle du marché.',
      y: 'Ce que vous payez', x: ['Année 1', 'Année 2', 'Année 3', 'Année 4'],
      stay: ['Sans rien', 'faire'], june: ['Avec June'], step: ['Fin de la remise', 'de bienvenue'], gap: ['Le prix de', 'la fidélité'],
      legend: 'June compare à nouveau et change : automatiquement, ou après votre accord.',
      method: 'Illustratif, sans prix réels du marché. Méthode : évolution simplifiée d’un contrat dont la remise de bienvenue expire après un an, face à un contrat comparé à nouveau au moins une fois par mois. À remplacer avant la mise en ligne par un graphique basé sur les données tarifaires de la CREG, de la CWaPE et de Brugel.',
    },
    market: {
      n: '01', kicker: 'Comment fonctionne le marché',
      h2: 'Trois faits simples sur le marché de l’énergie.',
      intro: 'Personne ne devrait devoir comprendre le marché de l’énergie pour être traité équitablement. Mais savoir comment il fonctionne, ça aide.',
      facts: [
        { h: 'Les prix bougent, même quand vous ne bougez pas.', p: 'Les fournisseurs adaptent régulièrement leurs tarifs. Le contrat le plus avantageux change donc lui aussi. Un bon choix l’an dernier ne l’est plus forcément aujourd’hui.' },
        { h: 'Ne rien faire coûte souvent plus cher.', p: 'Celui qui ne suit pas le marché reste souvent sur un contrat plus cher. Non pas parce qu’il a mal fait, mais parce que personne ne regarde. C’est ce que nous appelons le prix de la fidélité.' },
        { h: 'Changer est plus simple qu’on ne le croit.', p: 'En Belgique, un particulier change de fournisseur sans indemnité de rupture, moyennant un mois de préavis. Votre compteur, votre raccordement et votre gestionnaire de réseau restent les mêmes.' },
      ],
      quote: 'Comparer une fois, c’est une photo. Le marché, c’est un film.',
      quoteNote: 'Pourquoi June continue de regarder, même après votre changement.',
    },
    how: {
      n: '02', kicker: 'Ce que fait June',
      h2: 'Nous surveillons. Au moins une fois par mois. Pour votre consommation.',
      emph: 'Automatiquement ou seulement après votre accord : c’est vous qui choisissez.',
      limit: '<strong>Ce que nous ne promettons pas :</strong> de changer souvent. Si le marché ne bouge pas, nous ne changeons pas. Vous êtes alors déjà sur le contrat le plus avantageux parmi ceux que nous comparons, pour votre consommation.',
    },
    model: {
      n: '03', kicker: 'Notre modèle',
      h2: 'Qui paie June ? Vous. Et c’est voulu.',
      body: ['June vit des abonnements de ses clients.', ' Nous ne sommes pas fournisseur d’énergie et choisissons votre contrat sur la base de votre consommation.', 'Vous nous payez un prix fixe par an. Votre énergie, vous continuez à la payer à votre fournisseur.'],
      flow: { you: 'Vous', june: 'June', sup: 'Fournisseur', pay: 'abonnement, prix annuel fixe', work: `compare ${facts.suppliers.count.display.fr}, gère le changement`, bill: 'Votre facture d’énergie, vous la payez comme aujourd’hui au fournisseur' },
      caption: 'Ce que vous payez à June', cols: ['Abonnement', 'Par an', 'Par mois'], badge: 'Avec garantie de gain', billed: 'facturé annuellement', dongle: 'dongle inclus',
    },
    vs: {
      n: '04', kicker: 'La différence',
      h2: 'Comparer une fois, ou suivre en continu ?',
      intro: 'Comparer, vous pouvez aussi le faire vous-même, et c’est utile. La différence, c’est ce qui se passe ensuite.',
      cols: [['Comparer soi-même', 'une fois, en ligne'], ['Achat groupé', 'une campagne à la fois'], ['June', 'abonnement']],
      rows: [
        ['À quelle fréquence regarde-t-on ?', 'Quand vous y pensez', 'Une fois par campagne', 'Au moins une fois par mois'],
        ['Qui gère le changement ?', 'Vous', 'Vous acceptez l’offre', 'Nous, automatiquement ou après votre accord'],
        ['Et après le changement ?', 'Personne ne suit', 'Jusqu’à la prochaine campagne', 'Nous continuons à regarder'],
        ['Combien ça coûte ?', 'Pas d’abonnement, mais votre temps', 'Pas d’abonnement', `De ${m(sw.priceYearly)} à ${m(prem.priceYearly)} par an`],
        ['Une garantie sur le résultat ?', null, null, 'Garantie de gain avec Switch Plus et Premium'],
      ],
      none: 'non prévu',
      caption: 'Une comparaison de méthodes, pas d’acteurs précis. Les comparateurs et les achats groupés diffèrent entre eux.',
    },
    promise: {
      n: '05', kicker: 'La promesse',
      h2: 'Une promesse avec des conditions que vous pouvez simplement lire.',
      outcomes: [
        { label: 'Vous choisissez Switch Plus', big: m(swp.priceYearly), p: `par an, facturé annuellement (${swp.priceDisplay.fr.main}). Après chaque année d’abonnement, nous calculons ce que vous avez économisé.` },
        { label: `Plus de ${m(swp.priceYearly)} économisés`, big: `> ${m(swp.priceYearly)}`, p: 'June est rentabilisée, et c’est <strong>vous</strong> qui gardez la différence.' },
        { label: `${m(swp.priceYearly)} ou moins économisés`, big: `${m(g.amount)} rendus`, accent: true, p: `Vous récupérez <strong>${m(g.amount)}</strong>.` },
      ],
      terms: 'Lire les conditions',
    },
    reviews: {
      n: '06', kicker: 'Ce que disent nos clients',
      basis: 'sur Google, sur la base de plus de 1 200 avis'.replace(/1 200/, `1${NNBSP}200`),
      label: 'Extraits de nos avis Google',
      ph: 'Ici viendra un vrai avis Google : mot pour mot, avec prénom, commune et date. Portrait uniquement avec accord.',
    },
    faq: {
      n: '07', kicker: 'Questions de sceptiques',
      h2: 'Des réponses franches aux questions que vous vous posez.',
      items: [
        { q: faq('not-a-supplier').q.fr, a: faq('not-a-supplier').a.fr },
        { q: faq('independence').q.fr, a: 'June vit des abonnements de ses clients. Nous ne sommes pas fournisseur et choisissons le contrat sur la base de votre consommation.', fn: 5 },
        { q: faq('exit-fee').q.fr, a: faq('exit-fee').a.fr },
        { q: faq('no-interruption').q.fr, a: faq('no-interruption').a.fr },
        { q: faq('approval').q.fr, a: faq('approval').a.fr },
      ],
    },
    summary: {
      h2: 'En bref.',
      points: [
        'June n’est pas un fournisseur. C’est vous qui nous payez, pas le fournisseur.',
        `Nous comparons ${facts.suppliers.count.display.fr}, au moins une fois par mois, pour votre consommation.`,
        'Nous changeons automatiquement, ou seulement après votre accord.',
        `Garantie de gain (Switch Plus) : ${m(g.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement.`,
      ],
    },
    footer: {
      tagline: 'À vous le pouvoir, à nous le travail.',
      about: 'June suit le marché de l’énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.',
      mission: facts.brand.mission.fr,
      navTitle: 'June', notesTitle: 'Notes et sources',
      legal: '© 2026 June Energy · numéro BCE à venir',
      legalLinks: 'Conditions générales · Confidentialité · Cookies',
    },
    sticky: { strong: '4,3/5 sur Google', sub: `${facts.socialProof.customers.display.fr} · pas un fournisseur` },
  };
}

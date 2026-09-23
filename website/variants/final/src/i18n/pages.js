// Final site — copy for Abonnementen, Switch Plus, Hoe werkt het, FAQ (NL + FR) + the Premium product band.
// Facts (prices, guarantee, FAQ answers, steps) come from facts.json; headlines/microcopy are the site's voice.
// Rule: nothing unconfirmed is shown as a placeholder or "to be confirmed" tag. Where facts.json still has a
// [placeholder] or a BLOCKING item, we use the interim safe wording from the claims register (content-freeze §4),
// which only states what is already true, or we leave the item out.
import { facts, SW, SWP, PREM, G, faqById, money, localise as localiseSite, siteCopy } from './site.js';

// Same as site.js localise(), but amounts never break across lines ("€ 99", "99 €" with a no-break space).
const localise = (build) => localiseSite((L, m) => build(L, (n) => m(n).replace(/ /g, '\u00a0')));

const interim = {
  // BLOCKING in facts.json (renewal/cancellation terms). Only confirmed facts: 14-day withdrawal, terms before payment,
  // the energy contract itself can always be ended (law of 25 Aug 2012, already used in the exit-fee answer).
  cancel: {
    nl: 'Ja. Na je aanmelding heb je 14 dagen bedenktijd. Hoe je opzegt en wanneer je abonnement verlengt, lees je in onze algemene voorwaarden: je ziet ze altijd vóór je betaalt. Je energiecontract zelf kan je als particulier altijd opzeggen, met een maand opzeg en zonder verbrekingsvergoeding.',
    fr: 'Oui. Après votre inscription, vous disposez de 14 jours de rétractation. La manière de résilier et la reconduction de votre abonnement figurent dans nos conditions générales : vous les voyez toujours avant de payer. Votre contrat d’énergie lui-même, en tant que particulier, vous pouvez toujours le résilier avec un mois de préavis, sans indemnité de rupture.',
  },
  // BLOCKING (regional coverage): the postcode check is the honest, verifiable answer.
  regions: {
    nl: 'Vul bij het aanmelden je postcode in: dan zie je meteen of June bij jou werkt, en welke netbeheerder je hebt.',
    fr: 'Indiquez votre code postal lors de l’inscription : vous voyez tout de suite si June est disponible chez vous, et quel est votre gestionnaire de réseau.',
  },
  // BLOCKING (supplier commissions): claims register C9 safe phrasing, no statement about commissions either way.
  independence: {
    nl: `June is geen energieleverancier en kiest je contract op basis van jouw verbruik. Jij betaalt June een vaste jaarprijs voor die dienst: ${[SW, SWP].map((p) => money(p.priceYearly, 'nl')).join(', ')} of ${money(PREM.priceYearly, 'nl')}, incl. btw. Je energie zelf betaal je aan je leverancier.`,
    fr: `June n’est pas fournisseur d’énergie et choisit votre contrat sur la base de votre consommation. Vous payez à June un prix annuel fixe pour ce service : ${[SW, SWP].map((p) => money(p.priceYearly, 'fr')).join(', ')} ou ${money(PREM.priceYearly, 'fr')}, TVA comprise. Votre énergie, vous la payez à votre fournisseur.`,
  },
};
/** FAQ item from facts.json with interim wording where needed. Never returns bracket placeholders. */
export const faqItem = (id, L) => {
  const f = faqById(id);
  const a = interim[id] ? interim[id][L] : f.a[L];
  if (/\[[^\]]+\]/.test(a)) throw new Error(`FAQ "${id}" still contains a placeholder`);
  return { id, q: f.q[L], a, fn: id === 'guarantee' ? 4 : undefined };
};

/** Rating + one risk reducer, shown within ~40px of every primary CTA on these pages. */
const proofCopy = (L) => (L === 'nl'
  ? { rating: '4,3/5 op Google', risk: '14 dagen bedenktijd', riskAlt: 'Starten is vrijblijvend' }
  : { rating: '4,3/5 sur Google', risk: '14 jours de rétractation', riskAlt: 'Démarrer est sans engagement' });

/* ── Premium product band (plans + home) ─────────────────────── */
const band = localise((L, m) => {
  const nl = L === 'nl';
  return nl ? {
    kicker: 'Premium · met de June Dongle',
    h2: 'Zie wat je huis verbruikt. June zorgt voor de prijs.',
    intro: 'Wisselen zit in elk abonnement. Met Premium en de June Dongle zie je ook live wat je huis verbruikt en wat je zonnepanelen opleveren.',
    price: m(PREM.priceYearly), per: 'per jaar',
    sub: `${PREM.priceDisplay.nl.main}, jaarlijks gefactureerd · June Dongle inbegrepen`,
    guarantee: `Alles uit Switch Plus, ook de winstgarantie: ${m(G.amount)} terug als je niet meer bespaart dan je abonnement kost`,
    req: facts.dongle.requirements.nl,
    cta: 'Kies Premium', alt: 'Analoge meter? Kies Switch Plus',
    tag: 'Echte June-app',
    stageAlt: 'De June Dongle, wit met een groene kabel in de vorm van een blad, naast een smartphone met het verbruiksscherm van de June-app in het Nederlands.',
    steps: [
      { icon: 'plug', h: 'Steek de dongle in je meter', p: facts.dongle.description.nl },
      { icon: 'clock', h: 'Live verbruik, historiek per kwartier', p: 'In de app zie je live wat je huis verbruikt, en per kwartier hoe je dag, week of maand verliep.' },
      { icon: 'sun', h: 'Zonnepanelen: zelfverbruik en injectie', p: 'Zie hoeveel zonnestroom je zelf gebruikt en hoeveel je op het net zet. Dat profiel is ook de basis van onze vergelijking.' },
    ],
  } : {
    kicker: 'Premium · avec le June Dongle',
    h2: 'Voyez ce que consomme votre maison. June s’occupe du prix.',
    intro: 'Le changement de fournisseur est compris dans chaque abonnement. Avec Premium et le June Dongle, vous voyez aussi en direct ce que consomme votre maison et ce que produisent vos panneaux solaires.',
    price: m(PREM.priceYearly), per: 'par an',
    sub: `${PREM.priceDisplay.fr.main}, facturé annuellement · June Dongle inclus`,
    guarantee: `Tout ce qu’offre Switch Plus, garantie de gain comprise : ${m(G.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement`,
    req: facts.dongle.requirements.fr,
    cta: 'Choisir Premium', alt: 'Compteur analogique ? Choisissez Switch Plus',
    tag: 'Vraie app June',
    stageAlt: 'Le June Dongle, blanc avec un câble vert en forme de feuille, à côté d’un smartphone affichant l’écran Consommation de l’app June en français.',
    steps: [
      { icon: 'plug', h: 'Branchez le dongle sur votre compteur', p: facts.dongle.description.fr },
      { icon: 'clock', h: 'En direct, historique par quart d’heure', p: 'Dans l’app, vous voyez en direct ce que consomme votre maison, et par quart d’heure comment s’est passé votre jour, votre semaine ou votre mois.' },
      { icon: 'sun', h: 'Panneaux solaires : autoconsommation et injection', p: 'Voyez combien d’électricité solaire vous utilisez vous-même et combien vous injectez sur le réseau. Ce profil sert aussi de base à notre comparaison.' },
    ],
  };
});
export const productBandCopy = (locale) => nb({ ...siteCopy(locale), band: band(locale), proof: proofCopy(locale === 'fr-be' ? 'fr' : 'nl') });

/* ── Abonnementen / Abonnements ─────────────────────────────── */
const plans = localise((L, m) => {
  const nl = L === 'nl';
  return {
    meta: nl
      ? { title: 'Abonnementen en prijzen | June', description: `Switch ${m(69)}, Switch Plus ${m(99)} of Premium ${m(198)} per jaar, incl. btw. Welk abonnement past bij jou, en wat hou je over?` }
      : { title: 'Abonnements et prix | June', description: `Switch ${m(69)}, Switch Plus ${m(99)} ou Premium ${m(198)} par an, TVA comprise. Quel abonnement vous convient, et que vous reste-t-il ?` },
    hero: nl
      ? { kicker: 'Abonnementen en prijzen', h1: 'Eén vaste prijs per jaar. Voor het werk dat wij doen.', mark: 'vaste', lead: 'Met elk abonnement volgt June de markt voor je op en regelt ze je overstap. Je energie zelf betaal je, zoals nu, aan je leverancier.',
          facts: [['euro', 'Eén jaarprijs, incl. btw, één keer per jaar gefactureerd'], ['check-circle', 'Jij kiest: automatisch wisselen, of elke overstap eerst zelf goedkeuren'], ['shield', `Winstgarantie bij Switch Plus en Premium: ${m(G.amount)} terug als je niet meer bespaart dan je abonnement kost`]] }
      : { kicker: 'Abonnements et prix', h1: 'Un prix fixe par an. Pour le travail que nous faisons.', mark: 'fixe', lead: 'Avec chaque abonnement, June suit le marché pour vous et gère votre changement. Votre énergie, vous continuez à la payer à votre fournisseur.',
          facts: [['euro', 'Un prix annuel, TVA comprise, facturé une fois par an'], ['check-circle', 'Vous choisissez : changement automatique, ou vous validez d’abord chaque changement'], ['shield', `Garantie de gain avec Switch Plus et Premium : ${m(G.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement`]] },
    card: nl
      ? { perYear: 'per jaar', perMonth: 'per maand', billed: 'jaarlijks gefactureerd', badge: 'Aanbevolen · met winstgarantie', noGuarantee: 'Zonder winstgarantie', guarantee: `Winstgarantie: ${m(G.amount)} terug als je niet meer bespaart dan je abonnement kost`, needs: 'Vereist: digitale meter met geactiveerde P1-poort', choose: 'Kies', features: 'Wat je krijgt', fit: 'Past bij jou', notFit: 'Niet met een analoge meter', cancel: 'Opzeggen en verlengen' }
      : { perYear: 'par an', perMonth: 'par mois', billed: 'facturé annuellement', badge: 'Recommandé · avec garantie de gain', noGuarantee: 'Sans garantie de gain', guarantee: `Garantie de gain : ${m(G.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement`, needs: 'Requis : compteur numérique avec port P1 activé', choose: 'Choisir', features: 'Ce que vous recevez', fit: 'Vous convient', notFit: 'Pas avec un compteur analogique', cancel: 'Résiliation et reconduction' },
    proof: proofCopy(L),
    helper: nl ? {
      h2: 'Welk abonnement past bij jou?', sub: 'Twee vragen. We markeren het abonnement dat past.',
      q1: 'Heb je een digitale meter?', q1help: 'Herkenbaar aan een schermpje en knoppen.', q2: 'Heb je zonnepanelen?',
      yes: 'Ja', no: 'Nee', dk: 'Weet ik niet',
      r0: 'Twijfel je? Switch Plus werkt met elke meter en heeft winstgarantie.',
      out: {
        analog: { plan: 'switch-plus', h: 'Switch Plus past bij jou.', p: 'Premium werkt alleen met een digitale meter: de June Dongle leest de P1-poort uit, en die heeft een analoge meter niet. Met Switch Plus geef je je meterstanden zelf in, en krijg je dezelfde opvolging en de winstgarantie.' },
        dk: { plan: 'switch-plus', h: 'Switch Plus past bij jou.', p: 'Switch Plus werkt met analoge én digitale meters, dus je hoeft het nu niet te weten. Een digitale meter herken je aan een schermpje en knoppen.' },
        digitalSolar: { plan: 'premium', h: 'Premium haalt het meeste uit je meter.', p: `Met de June Dongle zie je live wat je zonnepanelen opleveren, wat je zelf verbruikt en wat je injecteert. Wil je vooral besparen? Dan volstaat Switch Plus, ${m(PREM.priceYearly - SWP.priceYearly)} per jaar goedkoper.` },
        digital: { plan: 'switch-plus', h: 'Switch Plus past bij jou.', p: 'Besparen, met winstgarantie. Wil je je verbruik ook live volgen? Kijk dan naar Premium, met de June Dongle.' },
      },
      go: 'Naar', meterLink: 'Welke meter heb ik?',
    } : {
      h2: 'Quel abonnement vous convient ?', sub: 'Deux questions. Nous mettons en évidence l’abonnement qui vous convient.',
      q1: 'Avez-vous un compteur numérique ?', q1help: 'Reconnaissable à son petit écran et ses boutons.', q2: 'Avez-vous des panneaux solaires ?',
      yes: 'Oui', no: 'Non', dk: 'Je ne sais pas',
      r0: 'Vous hésitez ? Switch Plus fonctionne avec tous les compteurs et offre la garantie de gain.',
      out: {
        analog: { plan: 'switch-plus', h: 'Switch Plus vous convient.', p: 'Premium ne fonctionne qu’avec un compteur numérique : le June Dongle lit le port P1, qu’un compteur analogique n’a pas. Avec Switch Plus, vous encodez vous-même vos index, avec le même suivi et la garantie de gain.' },
        dk: { plan: 'switch-plus', h: 'Switch Plus vous convient.', p: 'Switch Plus fonctionne avec les compteurs analogiques et numériques : inutile de le savoir maintenant. Un compteur numérique se reconnaît à son petit écran et ses boutons.' },
        digitalSolar: { plan: 'premium', h: 'Premium tire le meilleur de votre compteur.', p: `Avec le June Dongle, vous voyez en direct ce que produisent vos panneaux, ce que vous consommez vous-même et ce que vous injectez. Vous voulez surtout économiser ? Switch Plus suffit, ${m(PREM.priceYearly - SWP.priceYearly)} de moins par an.` },
        digital: { plan: 'switch-plus', h: 'Switch Plus vous convient.', p: 'Des économies, avec garantie de gain. Vous voulez aussi suivre votre consommation en direct ? Regardez Premium, avec le June Dongle.' },
      },
      go: 'Voir', meterLink: 'Quel compteur ai-je ?',
    },
    method: nl ? {
      h: 'Wat hou jij over?', eq: ['Jouw besparing', 'je abonnement', 'wat jij overhoudt'],
      p: 'Je besparing schatten we met vier vragen over je woning, zonder persoonsgegevens. Daarna zie je hier per abonnement wat je overhoudt.',
      cta: 'Bereken wat je overhoudt',
    } : {
      h: 'Que vous reste-t-il ?', eq: ['Votre économie', 'votre abonnement', 'ce qui vous reste'],
      p: 'Nous estimons votre économie avec quatre questions sur votre logement, sans données personnelles. Ensuite, vous voyez ici ce qui vous reste pour chaque abonnement.',
      cta: 'Calculez ce qui vous reste',
    },
    ledger: nl ? {
      title: 'Wat jij overhoudt · indicatief', save: 'Besparing', fee: 'Abonnement', you: 'Voor jou', per: 'per jaar',
      advice: 'Ons advies', guard: 'Bespaar je niet meer dan je abonnement kost? Dan geldt de winstgarantie.', cap: 'Indicatief, op basis van je antwoorden in de aanmelding.', edit: 'Schatting aanpassen',
    } : {
      title: 'Ce qui vous reste · indicatif', save: 'Économie', fee: 'Abonnement', you: 'Pour vous', per: 'par an',
      advice: 'Notre conseil', guard: 'Vous n’économisez pas plus que le prix de votre abonnement ? La garantie de gain s’applique.', cap: 'Indicatif, sur la base de vos réponses à l’inscription.', edit: 'Modifier l’estimation',
    },
    table: nl ? {
      kicker: 'Alles naast elkaar', h2: 'Wat zit in welk abonnement?', caption: 'Vergelijking van de drie abonnementen',
      rows: [
        ['Analyse van 17+ leveranciers, minstens elke maand', 1, 1, 1],
        ['Wij regelen de volledige overstap', 1, 1, 1],
        ['Automatisch, of na jouw akkoord', 1, 1, 1],
        ['Analoge en digitale meters', 1, 1, 'Enkel digitaal'],
        ['Optie 100% groene energie', 1, 1, 1],
        [`Winstgarantie (${m(G.amount)} terug)`, 0, 1, 1],
        ['Jaarlijks besparingsrapport', 0, 1, 1],
        ['June Dongle (P1) inbegrepen', 0, 0, 1],
        ['Live verbruik, historiek per kwartier', 0, 0, 1],
        ['Zonnepanelen: zelfverbruik en injectie', 0, 0, 1],
      ],
    } : {
      kicker: 'Tout côte à côte', h2: 'Que contient chaque abonnement ?', caption: 'Comparaison des trois abonnements',
      rows: [
        ['Analyse de plus de 17 fournisseurs, au moins une fois par mois', 1, 1, 1],
        ['Nous gérons tout le changement', 1, 1, 1],
        ['Automatiquement, ou après votre accord', 1, 1, 1],
        ['Compteurs analogiques et numériques', 1, 1, 'Numérique uniquement'],
        ['Option 100 % énergie verte', 1, 1, 1],
        [`Garantie de gain (${m(G.amount)} remboursés)`, 0, 1, 1],
        ['Rapport d’économies annuel', 0, 1, 1],
        ['June Dongle (P1) inclus', 0, 0, 1],
        ['Consommation en direct, historique par quart d’heure', 0, 0, 1],
        ['Panneaux solaires : autoconsommation et injection', 0, 0, 1],
      ],
    },
    vs: nl ? {
      kicker: 'June of zelf doen?', h2: 'Eén keer vergelijken, of blijven opvolgen?',
      intro: 'Zelf vergelijken kan ook, en dat is nuttig. Het verschil zit in wat er daarna gebeurt.',
      cols: [['Zelf vergelijken', 'eenmalig, online'], ['Groepsaankoop', 'één ronde per keer'], ['June', 'abonnement']],
      rows: [
        ['Hoe vaak wordt er gekeken?', 'Wanneer jij eraan denkt', 'Eén keer per ronde', 'Minstens elke maand'],
        ['Wie regelt de overstap?', 'Jij', 'Jij aanvaardt het aanbod', 'Wij, automatisch of na jouw akkoord'],
        ['En na de overstap?', 'Niemand volgt op', 'Tot de volgende ronde', 'We blijven kijken'],
        ['Wat kost het?', 'Geen abonnement, wel je tijd', 'Geen abonnement', `${m(SW.priceYearly)} tot ${m(PREM.priceYearly)} per jaar`],
        ['Garantie op het resultaat?', null, null, 'Winstgarantie bij Switch Plus en Premium'],
      ],
      none: 'niet voorzien',
      caption: 'Een vergelijking van werkwijzen, niet van specifieke aanbieders. Vergelijkingssites en groepsaankopen verschillen onderling.',
    } : {
      kicker: 'June ou vous-même ?', h2: 'Comparer une fois, ou suivre en continu ?',
      intro: 'Comparer, vous pouvez aussi le faire vous-même, et c’est utile. La différence, c’est ce qui se passe ensuite.',
      cols: [['Comparer soi-même', 'une fois, en ligne'], ['Achat groupé', 'une campagne à la fois'], ['June', 'abonnement']],
      rows: [
        ['À quelle fréquence regarde-t-on ?', 'Quand vous y pensez', 'Une fois par campagne', 'Au moins une fois par mois'],
        ['Qui gère le changement ?', 'Vous', 'Vous acceptez l’offre', 'Nous, automatiquement ou après votre accord'],
        ['Et après le changement ?', 'Personne ne suit', 'Jusqu’à la prochaine campagne', 'Nous continuons à regarder'],
        ['Combien ça coûte ?', 'Pas d’abonnement, mais votre temps', 'Pas d’abonnement', `De ${m(SW.priceYearly)} à ${m(PREM.priceYearly)} par an`],
        ['Une garantie sur le résultat ?', null, null, 'Garantie de gain avec Switch Plus et Premium'],
      ],
      none: 'non prévu',
      caption: 'Une comparaison de méthodes, pas d’acteurs précis. Les comparateurs et les achats groupés diffèrent entre eux.',
    },
    // Interim safe wording (C9): what you pay June and what you don't; no statement about supplier commissions.
    earn: nl ? {
      kicker: 'Hoe June geld verdient', h2: 'Wat je June betaalt, en wat niet.',
      body: ['Jij betaalt June een vaste jaarprijs: je abonnement.', 'June is geen energieleverancier: we leveren geen stroom of gas, en je energiefactuur blijft bij je leverancier. We kiezen je contract op basis van jouw verbruik, uit de contracten van 17+ leveranciers die we vergelijken.'],
      flow: [
        { who: 'Jij', what: 'kiest je abonnement en of je elke overstap goedkeurt' },
        { who: 'June', what: 'vergelijkt minstens elke maand en regelt de overstap', june: true },
        { who: 'Leverancier', what: 'levert je stroom en gas, en stuurt je de factuur' },
      ],
      edges: [`betaalt ${m(SW.priceYearly)}–${m(PREM.priceYearly)} per jaar`, 'sluit je contract af'],
      fn: 'Of June naast je abonnement ook vergoedingen van leveranciers ontvangt, is nog niet bevestigd. Is dat zo, dan vermelden we het hier.',
      back: 'Je energiefactuur betaal je, zoals nu, rechtstreeks aan je leverancier',
      aria: `Jij betaalt June een abonnement van ${m(SW.priceYearly)} tot ${m(PREM.priceYearly)} per jaar. June vergelijkt en sluit je contract af bij de leverancier. Je energiefactuur betaal je rechtstreeks aan je leverancier.`,
    } : {
      kicker: 'Comment June gagne sa vie', h2: 'Ce que vous payez à June, et ce que vous ne payez pas.',
      body: ['Vous payez à June un prix annuel fixe : votre abonnement.', 'June n’est pas fournisseur d’énergie : nous ne livrons ni électricité ni gaz, et votre facture d’énergie reste chez votre fournisseur. Nous choisissons votre contrat sur la base de votre consommation, parmi les contrats de plus de 17 fournisseurs que nous comparons.'],
      flow: [
        { who: 'Vous', what: 'choisissez votre abonnement et si vous validez chaque changement' },
        { who: 'June', what: 'compare au moins une fois par mois et gère le changement', june: true },
        { who: 'Fournisseur', what: 'livre votre électricité et votre gaz, et vous envoie la facture' },
      ],
      edges: [`paie ${m(SW.priceYearly)} à ${m(PREM.priceYearly)} par an`, 'souscrit votre contrat'],
      fn: 'Que June perçoive aussi des rémunérations de fournisseurs, en plus de votre abonnement, n’est pas encore confirmé. Si c’est le cas, nous l’indiquerons ici.',
      back: 'Votre facture d’énergie, vous la payez comme aujourd’hui directement à votre fournisseur',
      aria: `Vous payez à June un abonnement de ${m(SW.priceYearly)} à ${m(PREM.priceYearly)} par an. June compare et souscrit votre contrat chez le fournisseur. Votre facture d’énergie, vous la payez directement à votre fournisseur.`,
    },
    faq: nl ? { kicker: 'Over de prijs', h2: 'Vragen over betalen en opzeggen', all: 'Alle eerlijke antwoorden' } : { kicker: 'À propos du prix', h2: 'Questions sur le paiement et la résiliation', all: 'Toutes les réponses franches' },
    faqItems: ['cost', 'guarantee', 'cancel', 'meters', 'independence'].map((id) => faqItem(id, L)),
  };
});

/* ── Switch Plus ───────────────────────────────────────────── */
const switchPlus = localise((L, m) => {
  const nl = L === 'nl';
  const fee = SWP.priceYearly;
  // Worked guarantee examples (illustrative amounts, not a promise). Condition: saving ≤ subscription → € 99 back.
  const ex = [
    { saved: 240, refund: false },
    { saved: 99, refund: true },
    { saved: 40, refund: true },
  ];
  return {
    meta: nl
      ? { title: 'Switch Plus: besparen, met winstgarantie | June', description: `Bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je ${m(G.amount)} terug. Switch Plus: ${m(fee)} per jaar, jaarlijks gefactureerd.` }
      : { title: 'Switch Plus : économisez, avec garantie de gain | June', description: `Vous n’économisez pas plus que le prix de votre abonnement sur un an ? Vous récupérez ${m(G.amount)}. Switch Plus : ${m(fee)} par an, facturé une fois.` },
    hero: nl ? {
      kicker: 'June Switch Plus · winstgarantie', h1: 'Besparen, met winstgarantie.', mark: 'winstgarantie',
      lead: `Alles uit Switch, plus een belofte met een duidelijke voorwaarde: bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je ${m(G.amount)} terug.`,
      priceNote: 'per jaar, jaarlijks gefactureerd', monthly: SWP.priceDisplay.nl.main,
      cta: 'Kies Switch Plus', secondary: 'Vergelijk met Switch en Premium',
      facts: [['Wat het kost', `${m(fee)} per jaar, incl. btw`], ['Wat je terugkrijgt', `${m(G.amount)}, als je niet meer bespaart dan je abonnement kost`], ['Wanneer we rekenen', 'Na elk abonnementsjaar'], ['Welke meter', 'Analoog of digitaal'], ['Elke overstap', 'Automatisch, of eerst jouw akkoord']],
    } : {
      kicker: 'June Switch Plus · garantie de gain', h1: 'Économisez, avec garantie de gain.', mark: 'garantie',
      lead: `Tout ce qu’offre Switch, plus une promesse à la condition claire : si vous n’économisez pas plus que le prix de votre abonnement sur une année d’abonnement, vous récupérez ${m(G.amount)}.`,
      priceNote: 'par an, facturé annuellement', monthly: SWP.priceDisplay.fr.main,
      cta: 'Choisir Switch Plus', secondary: 'Comparer avec Switch et Premium',
      facts: [['Ce que ça coûte', `${m(fee)} par an, TVA comprise`], ['Ce que vous récupérez', `${m(G.amount)}, si vous n’économisez pas plus que le prix de votre abonnement`], ['Quand nous calculons', 'Après chaque année d’abonnement'], ['Quel compteur', 'Analogique ou numérique'], ['Chaque changement', 'Automatique, ou d’abord votre accord']],
    },
    proof: proofCopy(L),
    examples: nl ? {
      kicker: 'Rekenvoorbeelden', h2: 'Drie jaren, drie uitkomsten.',
      intro: `De voorwaarde is altijd dezelfde: je besparing over een abonnementsjaar, naast wat je abonnement kost (${m(fee)}). De bedragen hieronder zijn voorbeelden, geen belofte van besparing.`,
      threshold: `Je abonnement: ${m(fee)} per jaar`,
      items: ex.map((e) => ({
        saved: e.saved, refund: e.refund, label: `Je bespaart ${m(e.saved)}`,
        cond: e.saved > fee ? `Meer dan ${m(fee)}` : e.saved === fee ? `Niet meer dan ${m(fee)}: precies evenveel` : `Niet meer dan ${m(fee)}`,
        out: e.refund ? `Je krijgt ${m(G.amount)} terug.` : 'Geen terugbetaling nodig: June heeft zichzelf terugverdiend.',
        net: e.refund ? `Je abonnement kost je netto ${m(0)}, en je besparing van ${m(e.saved)} hou je.` : `Na je abonnement hou je ${m(e.saved - fee)} over.`,
      })),
      note: 'Hoe we je besparing meten en hoe je het bedrag terugkrijgt, staat in de voorwaarden van de winstgarantie.',
    } : {
      kicker: 'Exemples chiffrés', h2: 'Trois années, trois résultats.',
      intro: `La condition est toujours la même : votre économie sur une année d’abonnement, comparée au prix de votre abonnement (${m(fee)}). Les montants ci-dessous sont des exemples, pas une promesse d’économie.`,
      threshold: `Votre abonnement : ${m(fee)} par an`,
      items: ex.map((e) => ({
        saved: e.saved, refund: e.refund, label: `Vous économisez ${m(e.saved)}`,
        cond: e.saved > fee ? `Plus de ${m(fee)}` : e.saved === fee ? `Pas plus de ${m(fee)} : exactement autant` : `Pas plus de ${m(fee)}`,
        out: e.refund ? `Vous récupérez ${m(G.amount)}.` : 'Pas de remboursement nécessaire : June est rentabilisée.',
        net: e.refund ? `Votre abonnement vous coûte net ${m(0)}, et vous gardez votre économie de ${m(e.saved)}.` : `Après votre abonnement, il vous reste ${m(e.saved - fee)}.`,
      })),
      note: 'La manière dont votre économie est mesurée et dont le montant vous est versé figure dans les conditions de la garantie de gain.',
    },
    steps: nl ? {
      kicker: 'De winstgarantie, stap voor stap', h2: 'Zo werkt de winstgarantie',
      items: [
        ['Je abonnementsjaar start.', 'June volgt je contract op en zet je over wanneer het voordeliger kan: automatisch, of pas na jouw akkoord.'],
        ['Na een jaar maken we de rekening.', 'In je besparingsrapport zie je hoeveel je bespaard hebt, tegenover je contract vóór June.'],
        ['Niet meer bespaard dan je abonnement? Geld terug.', `Dan krijg je ${m(G.amount)} terug. De voorwaarden staan in onze algemene voorwaarden.`],
      ],
    } : {
      kicker: 'La garantie de gain, étape par étape', h2: 'Comment fonctionne la garantie de gain',
      items: [
        ['Votre année d’abonnement commence.', 'June suit votre contrat et vous fait changer quand c’est plus avantageux : automatiquement, ou seulement après votre accord.'],
        ['Après un an, nous faisons le compte.', 'Votre rapport d’économies montre combien vous avez économisé, par rapport à votre contrat d’avant June.'],
        ['Pas plus économisé que votre abonnement ? Remboursé.', `Vous récupérez ${m(G.amount)}. Les conditions figurent dans nos conditions générales.`],
      ],
    },
    report: nl ? {
      kicker: 'Inbegrepen', h2: 'Je jaarlijks besparingsrapport',
      body: 'Eén helder overzicht per jaar: wat je verbruikt hebt, bij welke leveranciers je zat, en wat dat opbracht. Het is ook de basis voor je winstgarantie: je ziet dus zelf of je er recht op hebt.',
      alt: 'Voorbeeld uit de June-app: een besparingsrapport met het bedrag dat deze maand bespaard werd, de automatische wissel van leverancier en tips voor slim verbruik',
      sample: 'Voorbeeldscherm uit de huidige June-app. Bedragen zijn een voorbeeld.',
    } : {
      kicker: 'Inclus', h2: 'Votre rapport d’économies annuel',
      body: 'Un aperçu clair chaque année : ce que vous avez consommé, chez quels fournisseurs vous étiez, et ce que cela vous a rapporté. C’est aussi la base de votre garantie de gain : vous voyez donc vous-même si vous y avez droit.',
      alt: '', sample: 'Illustration reconstituée d’après l’app June. Les montants sont un exemple.',
      card: { title: 'Rapport d’économies', amount: '45,78 €', amountLabel: 'Économisé ce mois-ci', row1: 'Changement automatique', row1b: 'Fournisseur X → Fournisseur Y', row2: 'Consommation maîtrisée', row2b: 'Pics évités : 12' },
    },
    included: nl ? { kicker: 'Ook inbegrepen', h2: 'Alles uit Switch, en meer' } : { kicker: 'Également inclus', h2: 'Tout ce qu’offre Switch, et plus' },
    choose: nl ? {
      kicker: 'Is het iets voor jou?', h2: 'Switch, Switch Plus of Premium?',
      body: 'Kies Switch als je gewoon wil besparen. Kies Switch Plus als je zeker wil zijn dat June zichzelf terugverdient, ook met een analoge meter. Heb je een digitale meter en wil je live inzicht? Bekijk dan Premium.',
      rows: [['Prijs per jaar', m(69), m(99), m(198)], ['Winstgarantie', 0, 1, 1], ['Besparingsrapport', 0, 1, 1], ['Analoge meter', 1, 1, 0], ['June Dongle, live verbruik', 0, 0, 1]],
      caption: 'Switch Plus naast Switch en Premium',
    } : {
      kicker: 'Est-ce pour vous ?', h2: 'Switch, Switch Plus ou Premium ?',
      body: 'Choisissez Switch si vous voulez simplement économiser. Choisissez Switch Plus si vous voulez être sûr que June se rembourse, même avec un compteur analogique. Vous avez un compteur numérique et voulez un suivi en direct ? Découvrez Premium.',
      rows: [['Prix par an', m(69), m(99), m(198)], ['Garantie de gain', 0, 1, 1], ['Rapport d’économies', 0, 1, 1], ['Compteur analogique', 1, 1, 0], ['June Dongle, suivi en direct', 0, 0, 1]],
      caption: 'Switch Plus à côté de Switch et Premium',
    },
    faq: nl ? { kicker: 'Over de garantie', h2: 'Vragen over de winstgarantie' } : { kicker: 'À propos de la garantie', h2: 'Questions sur la garantie de gain' },
    faqItems: ['guarantee', 'approval', 'meters', 'cancel'].map((id) => faqItem(id, L)),
    close: nl ? 'Klaar om te besparen, met winstgarantie?' : 'Prêt à économiser, avec garantie de gain ?',
  };
});

/* ── Hoe werkt het / Comment ça marche ─────────────────────── */
const how = localise((L, m) => {
  const nl = L === 'nl';
  const d = facts.howItWorks.detailed.map((s) => ({ n: s.n, title: s.title[L], body: s.body[L] }));
  return {
    meta: nl
      ? { title: 'Hoe werkt June? Automatisch van leverancier wisselen', description: 'June vergelijkt 17+ leveranciers voor jouw verbruik en regelt de overstap: automatisch of na jouw akkoord. Welke gegevens we gebruiken en wat blijft.' }
      : { title: 'Comment fonctionne June ? Changer automatiquement', description: 'June compare plus de 17 fournisseurs pour votre consommation et gère le changement : automatiquement ou après votre accord. Vos données, ce qui reste.' },
    hero: nl ? {
      kicker: 'Hoe werkt het', h1: facts.howItWorks.detailTitle.nl, mark: 'voordelig',
      lead: 'Energieprijzen veranderen voortdurend. June volgt ze voor je op, zodat jij dat niet hoeft te doen.',
      tldr: 'In 20 seconden',
      summary: ['Je meldt je aan en vertelt ons iets over je woning. Twee minuten.', `Minstens elke maand leggen we jouw verbruik naast de contracten van ${facts.suppliers.count.display.nl}.`, 'Is er een voordeliger contract, dan regelen wij de overstap: automatisch, of pas na jouw akkoord.', 'Je meter, je aansluiting en je stroom blijven zoals ze zijn. Alleen je factuur verandert.'],
    } : {
      kicker: 'Comment ça marche', h1: facts.howItWorks.detailTitle.fr, mark: 'avantageux',
      lead: 'Les prix de l’énergie changent sans cesse. June les suit pour vous, pour que vous n’ayez pas à le faire.',
      tldr: 'En 20 secondes',
      summary: ['Vous vous inscrivez et nous parlez de votre logement. Deux minutes.', `Au moins une fois par mois, nous comparons votre consommation aux contrats de ${facts.suppliers.count.display.fr}.`, 'S’il existe un contrat plus avantageux, nous gérons le changement : automatiquement, ou seulement après votre accord.', 'Votre compteur, votre raccordement et votre électricité restent tels quels. Seule votre facture change.'],
    },
    who: nl ? {
      kicker: 'Wie doet wat', h2: 'Vier partijen. Bij een overstap verandert er maar één.',
      intro: 'Een energiefactuur lijkt één ding, maar er zitten vier partijen achter. June is er één van, en niet de partij die stroom levert.',
      cols: ['Wat doet het?', 'Verandert het bij een overstap?'],
      nodes: [
        { name: 'Jij', role: 'Je kiest je abonnement en of je elke overstap zelf goedkeurt. Analoge meter? Dan geef je af en toe je meterstanden in.', change: 'Je krijgt een factuur van een andere leverancier.', changes: false },
        { name: 'June', role: 'Volgt de markt op voor jouw verbruik, kiest het voordeligste contract uit onze vergelijking, sluit het af en zegt je oude contract op.', change: 'Blijft hetzelfde. Wij blijven kijken.', changes: false, june: true },
        { name: 'Leverancier', role: 'Verkoopt je stroom en gas en stuurt je de factuur. Er zijn er 17+ in onze vergelijking.', change: 'Ja: dit is de enige partij die wisselt.', changes: true },
        { name: 'Netbeheerder', role: 'Beheert de kabels, leidingen en je meter. Fluvius in Vlaanderen, Sibelga in Brussel, ORES of RESA in Wallonië.', change: 'Nee. Je meter en je aansluiting blijven dezelfde.', changes: false },
      ],
      legend: ['Verandert', 'Blijft hetzelfde'],
      edges: ['betaalt een jaarprijs', 'kiest en regelt je contract', 'levert via het net van'],
      back: 'Je energiefactuur: van je leverancier, rechtstreeks naar jou. Zoals nu.',
      changesTag: 'Wisselt',
    } : {
      kicker: 'Qui fait quoi', h2: 'Quatre acteurs. Quand vous changez, un seul est remplacé.',
      intro: 'Une facture d’énergie semble être une seule chose, mais quatre acteurs se cachent derrière. June en fait partie, et ce n’est pas celui qui livre l’électricité.',
      cols: ['Que fait-il ?', 'Change-t-il lors d’un changement ?'],
      nodes: [
        { name: 'Vous', role: 'Vous choisissez votre abonnement et si vous validez chaque changement. Compteur analogique ? Vous encodez vos index de temps en temps.', change: 'Vous recevez la facture d’un autre fournisseur.', changes: false },
        { name: 'June', role: 'Suit le marché pour votre consommation, choisit le contrat le plus avantageux parmi ceux que nous comparons, le souscrit et résilie votre ancien contrat.', change: 'Reste le même. Nous continuons à regarder.', changes: false, june: true },
        { name: 'Fournisseur', role: 'Vend votre électricité et votre gaz et vous envoie la facture. Plus de 17 dans notre comparaison.', change: 'Oui : c’est le seul acteur qui change.', changes: true },
        { name: 'Gestionnaire de réseau', role: 'Gère les câbles, les conduites et votre compteur. Sibelga à Bruxelles, ORES ou RESA en Wallonie, Fluvius en Flandre.', change: 'Non. Votre compteur et votre raccordement restent les mêmes.', changes: false },
      ],
      legend: ['Change', 'Reste pareil'],
      edges: ['paie un prix annuel', 'choisit et gère votre contrat', 'livre via le réseau de'],
      back: 'Votre facture d’énergie : du fournisseur, directement à vous. Comme aujourd’hui.',
      changesTag: 'Change',
    },
    market: nl ? {
      kicker: 'Waarom blijven opvolgen', h2: 'Drie gewone feiten over de energiemarkt.',
      facts: [
        { h: 'Prijzen bewegen, ook als jij stilzit.', p: 'Leveranciers passen hun tarieven regelmatig aan. Welk contract voordelig is, verandert dus mee. Wat vorig jaar een goede keuze was, is dat vandaag niet per se nog.' },
        { h: 'Wie niets doet, betaalt vaak meer.', p: 'Wie niet opvolgt, blijft vaak op een duurder contract zitten. Niet omdat je iets fout doet, maar omdat niemand kijkt. Dat noemen wij de prijs van trouw.' },
        { h: 'Overstappen is makkelijker dan het lijkt.', p: 'Als particulier wissel je in België zonder verbrekingsvergoeding, met een maand opzeg. Je meter, je aansluiting en je netbeheerder blijven dezelfde.' },
      ],
      quote: 'Eén keer vergelijken is een foto. De markt is een film.',
      quoteNote: 'Waarom June blijft kijken, ook na je overstap.',
    } : {
      kicker: 'Pourquoi suivre en continu', h2: 'Trois faits simples sur le marché de l’énergie.',
      facts: [
        { h: 'Les prix bougent, même quand vous ne bougez pas.', p: 'Les fournisseurs adaptent régulièrement leurs tarifs. Le contrat le plus avantageux change donc lui aussi. Un bon choix l’an dernier ne l’est plus forcément aujourd’hui.' },
        { h: 'Ne rien faire coûte souvent plus cher.', p: 'Celui qui ne suit pas le marché reste souvent sur un contrat plus cher. Non pas parce qu’il a mal fait, mais parce que personne ne regarde. C’est ce que nous appelons le prix de la fidélité.' },
        { h: 'Changer est plus simple qu’on ne le croit.', p: 'En Belgique, un particulier change de fournisseur sans indemnité de rupture, moyennant un mois de préavis. Votre compteur, votre raccordement et votre gestionnaire de réseau restent les mêmes.' },
      ],
      quote: 'Comparer une fois, c’est une photo. Le marché, c’est un film.',
      quoteNote: 'Pourquoi June continue de regarder, même après votre changement.',
    },
    steps: nl ? { kicker: 'De stappen', h2: 'Wat er gebeurt, van aanmelding tot opvolging.' } : { kicker: 'Les étapes', h2: 'Ce qui se passe, de l’inscription au suivi.' },
    detailed: d,
    stepNotes: nl ? [
      { h: 'Wat jij hiervoor doet', list: ['Digitale meter: niets. We lezen automatisch uit.', 'Analoge meter: af en toe je meterstanden ingeven.', 'Premium: de June Dongle in de P1-poort van je meter steken.'] },
      { h: 'Wat we vergelijken', list: ['De prijs voor jouw verbruik, niet voor een gemiddeld gezin.', 'Enkel groene contracten, als je dat aangeeft (100% groen volgens de leverancier).', `De contracten van ${facts.suppliers.count.display.nl} in België.`], limit: '<strong>Wat we niet beloven:</strong> dat je vaak wisselt. Beweegt de markt niet, dan wisselen we niet. Dan zit je al op het voordeligste contract uit onze vergelijking, voor jouw verbruik.' },
      { h: 'Wat je merkt van de overstap', list: ['Een bericht: naar welk contract je overstapt en waarom.', 'Automatisch, of pas na jouw akkoord: jij kiest, en je kan dat altijd wijzigen.', 'Geen verbrekingsvergoeding, geen onderbreking.'] },
      { h: 'Wat je daarna ziet', list: ['Je verbruik in de June-app.', 'Met Switch Plus en Premium: elk jaar een besparingsrapport.', 'Met Premium: live verbruik en injectie via de June Dongle.'] },
    ] : [
      { h: 'Ce que vous faites', list: ['Compteur numérique : rien. Nous relevons automatiquement.', 'Compteur analogique : encoder vos index de temps en temps.', 'Premium : brancher le June Dongle sur le port P1 de votre compteur.'] },
      { h: 'Ce que nous comparons', list: ['Le prix pour votre consommation, pas pour un ménage moyen.', 'Uniquement des contrats verts si vous le souhaitez (100 % verts selon le fournisseur).', `Les contrats de ${facts.suppliers.count.display.fr} en Belgique.`], limit: '<strong>Ce que nous ne promettons pas :</strong> de changer souvent. Si le marché ne bouge pas, nous ne changeons pas. Vous êtes alors déjà sur le contrat le plus avantageux parmi ceux que nous comparons, pour votre consommation.' },
      { h: 'Ce que vous remarquez', list: ['Un message : vers quel contrat vous passez, et pourquoi.', 'Automatiquement ou seulement après votre accord : c’est vous qui choisissez, et vous pouvez changer d’avis.', 'Pas d’indemnité de rupture, aucune coupure.'] },
      { h: 'Ce que vous voyez ensuite', list: ['Votre consommation dans l’app June.', 'Avec Switch Plus et Premium : un rapport d’économies chaque année.', 'Avec Premium : consommation et injection en direct via le June Dongle.'] },
    ],
    app: nl
      ? { alt: 'Verbruiksscherm van de June-app: staafgrafiek per dag met dag- en nachtverbruik, tegels voor afname en injectie', cap: 'De huidige June-app: je verbruik per dag.' }
      : { alt: 'Écran Consommation de l’app June : graphique en barres par jour, jour et nuit, tuiles pour le prélèvement et l’injection', cap: 'L’app June actuelle : votre consommation par jour.' },
    data: nl ? {
      kicker: 'Je gegevens', h2: 'Welke gegevens we gebruiken, en waarvoor.',
      intro: 'We vragen enkel wat we nodig hebben, op het moment dat we het nodig hebben. Hieronder staat per gegeven waarom.',
      cols: ['Gegeven', 'Waarvoor', 'Wanneer we het vragen'],
      rows: [
        ['Postcode', 'Je regio en netbeheerder bepalen mee je nettarieven.', 'Stap 1 van je aanmelding'],
        ['Gezinsgrootte of jaarverbruik', 'Een eerste schatting, tot we je echte verbruik kennen.', 'Stap 1'],
        ['E-mailadres', 'Je aanmelding bewaren en je schatting sturen.', 'Stap 2'],
        ['Adres, EAN-code, huidige leverancier', 'Je contract overzetten. De EAN-code staat op je factuur.', 'Na je e-mail, pas als je verder wil'],
        ['Verbruiksgegevens van je meter', 'Je contract vergelijken en je inzichten tonen.', 'Na je aanmelding, met jouw toestemming'],
      ],
      never: [facts.faq.find((f) => f.id === 'data').a.nl.replace(' Meer in onze privacyverklaring.', ''), 'We vragen geen gegevens die we niet nodig hebben om je contract te vergelijken of over te zetten.'],
      neverH: 'Wat we er nooit mee doen',
    } : {
      kicker: 'Vos données', h2: 'Quelles données nous utilisons, et pourquoi.',
      intro: 'Nous ne demandons que ce dont nous avons besoin, au moment où nous en avons besoin. Voici, pour chaque donnée, la raison.',
      cols: ['Donnée', 'Pour quoi faire', 'Quand nous la demandons'],
      rows: [
        ['Code postal', 'Votre région et votre gestionnaire de réseau influencent vos tarifs de réseau.', 'Étape 1 de votre inscription'],
        ['Taille du ménage ou consommation annuelle', 'Une première estimation, en attendant votre consommation réelle.', 'Étape 1'],
        ['Adresse e-mail', 'Sauvegarder votre inscription et vous envoyer votre estimation.', 'Étape 2'],
        ['Adresse, code EAN, fournisseur actuel', 'Transférer votre contrat. Le code EAN figure sur votre facture.', 'Après votre e-mail, seulement si vous continuez'],
        ['Données de consommation de votre compteur', 'Comparer votre contrat et vous montrer vos analyses.', 'Après votre inscription, avec votre accord'],
      ],
      never: [facts.faq.find((f) => f.id === 'data').a.fr.replace(' Plus d’infos dans notre déclaration de confidentialité.', '').replace(" Plus d'infos dans notre déclaration de confidentialité.", ''), 'Nous ne demandons aucune donnée dont nous n’avons pas besoin pour comparer ou transférer votre contrat.'],
      neverH: 'Ce que nous n’en ferons jamais',
    },
    same: nl ? {
      kicker: 'Wat hetzelfde blijft', h2: 'Een overstap, zonder dat er thuis iets verandert.',
      items: [
        ['meter', 'Je meter', 'Dezelfde meter, niemand komt langs.'],
        ['plug', 'Je aansluiting', 'Dezelfde kabels, leidingen en netbeheerder.'],
        ['bolt', 'Je stroom en gas', 'Geen onderbreking, geen dag zonder.'],
        ['euro', 'Geen opzegvergoeding', 'Als particulier verander je in België vrij van leverancier.'],
      ],
    } : {
      kicker: 'Ce qui ne change pas', h2: 'Un changement, sans que rien ne bouge chez vous.',
      items: [
        ['meter', 'Votre compteur', 'Le même compteur, personne ne passe chez vous.'],
        ['plug', 'Votre raccordement', 'Les mêmes câbles, conduites et gestionnaire de réseau.'],
        ['bolt', 'Votre électricité et votre gaz', 'Aucune coupure, pas un jour sans.'],
        ['euro', 'Pas d’indemnité de rupture', 'En Belgique, un particulier change librement de fournisseur.'],
      ],
    },
    meters: nl ? {
      kicker: 'Je meter', h2: 'Welke meter heb je?',
      items: [
        ['Digitale meter', 'We lezen je verbruik automatisch uit. Met de June Dongle (Premium) zie je het zelfs live. Herkenbaar aan een schermpje en knoppen, en meestal een P1-poort.'],
        ['Analoge meter', 'Geen probleem. Je geeft je meterstanden zelf in, wij doen de rest. Switch en Switch Plus werken ermee, Premium niet.'],
      ],
    } : {
      kicker: 'Votre compteur', h2: 'Quel compteur avez-vous ?',
      items: [
        ['Compteur numérique', 'Nous relevons votre consommation automatiquement. Avec le June Dongle (Premium), vous la voyez même en direct. Reconnaissable à son petit écran, ses boutons et généralement un port P1.'],
        ['Compteur analogique', 'Pas de problème. Vous encodez vos index, nous faisons le reste. Switch et Switch Plus fonctionnent avec, Premium non.'],
      ],
    },
    regions: nl ? {
      kicker: 'Per regio', h2: 'Wat anders is in Vlaanderen, Brussel en Wallonië.',
      intro: 'De energiemarkt is Belgisch, maar de netten zijn regionaal. Dat heeft een paar gevolgen.',
      items: [
        { h: 'Vlaanderen', net: 'Netbeheerder: Fluvius', p: 'Sinds 2023 betaal je in Vlaanderen een capaciteitstarief: een deel van je nettarief hangt af van je hoogste kwartierpiek. Met Premium en de June Dongle zie je die pieken, zodat je ze kan vermijden.' },
        { h: 'Brussel', net: 'Netbeheerder: Sibelga', p: 'Geen capaciteitstarief. Je nettarieven verschillen van die in Vlaanderen en Wallonië; daarom vragen we je postcode.' },
        { h: 'Wallonië', net: 'Netbeheerder: ORES of RESA', p: 'Geen capaciteitstarief. Nettarieven verschillen per netbeheerder; je postcode vertelt ons welke bij jou geldt.' },
      ],
      note: 'Je postcode in stap 1 van je aanmelding vertelt je meteen of June bij jou werkt en welke netbeheerder je hebt.',
    } : {
      kicker: 'Par région', h2: 'Ce qui diffère à Bruxelles, en Wallonie et en Flandre.',
      intro: 'Le marché de l’énergie est belge, mais les réseaux sont régionaux. Cela a quelques conséquences.',
      items: [
        { h: 'Bruxelles', net: 'Gestionnaire de réseau : Sibelga', p: 'Pas de tarif capacitaire. Vos tarifs de réseau diffèrent de ceux de Wallonie et de Flandre ; c’est pourquoi nous vous demandons votre code postal.' },
        { h: 'Wallonie', net: 'Gestionnaire de réseau : ORES ou RESA', p: 'Pas de tarif capacitaire. Les tarifs de réseau varient selon le gestionnaire ; votre code postal nous indique lequel s’applique chez vous.' },
        { h: 'Flandre uniquement', net: 'Gestionnaire de réseau : Fluvius', p: 'Depuis 2023, la Flandre applique un tarif capacitaire : une partie du tarif de réseau dépend de votre pic de puissance le plus élevé par quart d’heure. Avec Premium et le June Dongle, vous voyez ces pics. Si vous habitez à Bruxelles ou en Wallonie, ceci ne vous concerne pas.' },
      ],
      note: 'Votre code postal, à l’étape 1 de l’inscription, vous dit tout de suite si June est disponible chez vous et quel est votre gestionnaire de réseau.',
    },
    faq: nl ? { kicker: 'Nog vragen?', h2: 'Vragen over de overstap' } : { kicker: 'D’autres questions ?', h2: 'Questions sur le changement' },
    faqItems: ['approval', 'meters', 'data'].map((id) => faqItem(id, L)),
    faqAll: nl ? 'Alle eerlijke antwoorden' : 'Toutes les réponses franches',
    plansLink: nl ? 'Bekijk de abonnementen' : 'Voir les abonnements',
  };
});


/* ── FAQ ────────────────────────────────────────────────────── */
const faqPage = localise((L) => {
  const nl = L === 'nl';
  const cats = nl ? [
    { id: 'over-june', name: 'Over June', items: ['not-a-supplier', 'independence', 'how-so-much', 'which-suppliers'] },
    { id: 'prijs', name: 'Prijs, garantie en opzeggen', items: ['cost', 'guarantee', 'cancel'] },
    { id: 'overstap', name: 'De overstap', items: ['approval', 'exit-fee', 'no-interruption', 'green'] },
    { id: 'meter-gegevens', name: 'Je meter en je gegevens', items: ['meters', 'regions', 'data'] },
  ] : [
    { id: 'a-propos', name: 'À propos de June', items: ['not-a-supplier', 'independence', 'how-so-much', 'which-suppliers'] },
    { id: 'prix', name: 'Prix, garantie et résiliation', items: ['cost', 'guarantee', 'cancel'] },
    { id: 'changement', name: 'Le changement', items: ['approval', 'exit-fee', 'no-interruption', 'green'] },
    { id: 'compteur-donnees', name: 'Votre compteur et vos données', items: ['meters', 'regions', 'data'] },
  ];
  // Flanders-only topic: in NL a plain answer, in FR explicitly qualified.
  const capacity = nl
    ? { id: 'capacity', q: 'Wat is het capaciteitstarief, en helpt June daarbij?', a: 'In Vlaanderen hangt een deel van je nettarief af van je hoogste kwartierpiek: het capaciteitstarief. Met Premium en de June Dongle volg je je piekvermogen op, zodat je pieken kan vermijden. In Brussel en Wallonië bestaat het capaciteitstarief niet.' }
    : { id: 'capacity', q: 'Le tarif capacitaire me concerne-t-il ?', a: 'Seulement si vous habitez en Flandre. Là-bas, une partie du tarif de réseau dépend de votre pic de puissance le plus élevé par quart d’heure. À Bruxelles et en Wallonie, il n’existe pas de tarif capacitaire.' };
  return {
    meta: nl
      ? { title: 'Veelgestelde vragen: eerlijke antwoorden | June', description: 'Is June een energieleverancier? Wat kost het, hoe werkt de winstgarantie en kan je opzeggen? Eerlijke antwoorden over de overstap, je meter en je gegevens.' }
      : { title: 'Questions fréquentes : des réponses franches | June', description: 'June est-elle un fournisseur ? Prix, garantie de gain, résiliation, compteur et données : des réponses franches à vos questions sur June.' },
    hero: nl
      ? { kicker: 'Veelgestelde vragen', h1: 'Eerlijke antwoorden.', mark: 'Eerlijke', lead: 'Ook op de vragen die we liever niet krijgen: wat June kost, wat als het tegenvalt, en hoe je opzegt.', jump: 'Spring naar' }
      : { kicker: 'Questions fréquentes', h1: 'Des réponses franches.', mark: 'franches', lead: 'Y compris aux questions qu’on préférerait ne pas recevoir : ce que coûte June, ce qui se passe si ça ne rapporte pas assez, et comment résilier.', jump: 'Aller à' },
    cats: cats.map((c) => ({ ...c, items: [...c.items.map((id) => faqItem(id, L)), ...(c.id === 'meter-gegevens' || c.id === 'compteur-donnees' ? [capacity] : [])] })),
    notFound: nl
      ? { h2: 'Staat je vraag er niet bij?', client: 'Al klant?', clientP: 'Stel je vraag via je account. Zo zien we meteen over welk contract het gaat.', account: 'Naar je account', other: 'Nog geen klant?', otherP: 'Lees hoe June werkt, of begin gewoon: je postcode en vier vragen, en je ziet wat June voor je kan doen. Je betaalt niets tot je een abonnement afsluit.', how: 'Zo werkt June', plans: 'Bekijk de abonnementen', ext: 'opent een andere website' }
      : { h2: 'Votre question n’y figure pas ?', client: 'Déjà client ?', clientP: 'Posez votre question via votre compte. Nous voyons ainsi tout de suite de quel contrat il s’agit.', account: 'Vers votre compte', other: 'Pas encore client ?', otherP: 'Découvrez comment fonctionne June, ou commencez simplement : votre code postal et quatre questions, et vous voyez ce que June peut faire pour vous. Vous ne payez rien avant de souscrire un abonnement.', how: 'Comment fonctionne June', plans: 'Voir les abonnements', ext: 'ouvre un autre site' },
  };
});

// Amounts and percentages never break across lines (FR "99 €", "100 %", NL "€ 99"); applied to the whole page copy.
const nb = (v) => typeof v === 'string' ? v.replace(/(\d) (€|%)/g, '$1\u00a0$2').replace(/€ (\d)/g, '€\u00a0$1')
  : Array.isArray(v) ? v.map(nb)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nb(x)])) : v;
export const plansCopy = (locale) => nb({ ...siteCopy(locale), ...plans(locale) });
export const switchPlusCopy = (locale) => nb({ ...siteCopy(locale), ...switchPlus(locale) });
export const howCopy = (locale) => nb({ ...siteCopy(locale), ...how(locale), proof: proofCopy(locale === 'fr-be' ? 'fr' : 'nl') });
export const faqCopy = (locale) => nb({ ...siteCopy(locale), ...faqPage(locale) });
export { SWP };

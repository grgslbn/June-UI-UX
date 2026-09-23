// Variant A copy layer. Frozen facts (numbers, prices, plan features, FAQ answers, guarantee terms)
// are read from @shared/content/facts.json; this file only holds variant headlines/microcopy.
import facts from '@shared/content/facts.json';
import { href as routeHref } from '@shared/routes.mjs';

export type Locale = 'nl-be' | 'fr-be';
export const L = (loc: Locale) => (loc === 'nl-be' ? 'nl' : 'fr') as 'nl' | 'fr';

const NB = ' '; // no-break space
const NNB = ' '; // narrow no-break space (FR thousands)
/** € amount in Belgian format: NL "€ 5,75", FR "5,75 €". */
export const eur = (v: number, loc: Locale) => {
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',');
  return loc === 'nl-be' ? `€${NB}${s}` : `${s}${NB}€`;
};
export const thousands = (v: number, loc: Locale) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, loc === 'nl-be' ? '.' : NNB);

export const F = facts;
export type NavItem = { label: string; key: string; hash?: string };
/** Internal link inside this build (respects BASE), with optional query + fragment. */
export const to = (key: string, locale: Locale, opts: { hash?: string; query?: string } = {}) =>
  routeHref(key, locale, import.meta.env.BASE_URL) + (opts.query ? `?${opts.query}` : '') + (opts.hash ? `#${opts.hash}` : '');
export const signupHref = (locale: Locale, query = '') => to('signup', locale, { query });
const plans = facts.plans;
export const planBySlug = (slug: string) => plans.find((p: any) => p.slug === slug)!;
export const faqById = (id: string) => (facts.faq as any[]).find(f => f.id === id)!;

const rating = String(facts.socialProof.googleRating.value).replace('.', ',');

export const copy = {
  'nl-be': {
    meta: {
      title: 'June: automatisch naar een voordeliger energiecontract',
      description: `June vergelijkt de contracten van 17+ energieleveranciers voor jouw verbruik en regelt de overstap. Gemiddeld ${eur(326, 'nl-be')} per jaar besparing.`,
    },
    skip: 'Naar de inhoud',
    nav: [
      { label: 'Hoe werkt het', key: 'howItWorks' },
      { label: 'Prijzen', key: 'plans' },
      { label: 'Reviews', key: 'home', hash: 'reviews' },
      { label: 'FAQ', key: 'faq' },
    ] as NavItem[],
    navLabel: 'Hoofdmenu',
    langOther: { label: 'FR', aria: 'Lire en français' },
    langCurrent: 'NL',
    login: 'Inloggen',
    cta: 'Bereken je besparing',
    home: 'June, naar de startpagina',
    hero: {
      kicker: 'Geen energieleverancier. Wij werken voor jou.',
      h1a: 'Altijd het juiste energiecontract.',
      h1b: 'Zonder er nog aan te denken.',
      sub: 'June legt jouw verbruik minstens elke maand naast de contracten van 17+ leveranciers. Kan het voordeliger, dan regelen wij de overstap: automatisch, of pas na jouw akkoord.',
      postcodeLabel: 'Je postcode',
      postcodeHelp: 'Voor de netkosten in jouw regio. Vrijblijvend.',
      postcodeError: 'Vul een Belgische postcode van 4 cijfers in, bv. 9000.',
      placeholder: 'bv. 9000',
      assure: ['Je stroom blijft gewoon komen', 'Zelfde meter', 'Geen verbrekingsvergoeding'],
    },
    trust: { rating: `${rating}/5 op Google`, reviews: '1.200+ reviews', customers: `${thousands(20000, 'nl-be')}+ klanten`, stars: `${rating} van 5 sterren` },
    tile: {
      label: 'Voorbeeld van je maandelijkse controle',
      example: 'Voorbeeld',
      checking: 'Bezig met vergelijken…',
      checked: 'Gecontroleerd deze maand',
      sentence: 'June heeft de markt voor je nagekeken. Jij hoeft niets te doen.',
      months: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
      monthsLabel: 'Maandelijkse controles dit jaar, tot en met september',
      avgLabel: 'Klanten besparen gemiddeld',
      perYear: 'per jaar',
      planName: 'Switch Plus',
      planMain: `${eur(99, 'nl-be')} per jaar`,
      planSub: `${eur(8.25, 'nl-be')} per maand, jaarlijks gefactureerd`,
      guarName: 'Winstgarantie',
      guarMain: `${eur(99, 'nl-be')} terug`,
      guarSub: 'als je in een abonnementsjaar niet meer bespaart dan je abonnement kost',
    },
    proof: {
      title: 'June in cijfers',
      items: [
        { n: `${thousands(20000, 'nl-be')}+`, t: 'klanten gingen je voor', fn: 3 },
        { n: `${rating}/5`, t: 'op Google · 1.200+ reviews', fn: 2, stars: true },
        { n: eur(326, 'nl-be'), t: 'gemiddelde besparing per jaar', fn: 1 },
        { n: '17+', t: 'leveranciers, minstens elke maand vergeleken' },
      ],
    },
    how: {
      eyebrow: 'Hoe werkt het',
      title: 'Drie stappen. Daarna doet June het werk.',
      intro: 'Je doet het één keer. Wij blijven kijken, elke maand opnieuw.',
      after: 'Daarna: elke maand een nieuwe controle',
      link: 'Zo werkt June, stap voor stap',
    },
    same: {
      eyebrow: 'Wat verandert er?',
      title: 'Alleen de naam op je factuur.',
      intro: 'Een overstap regelen wij op de achtergrond. Thuis merk je er niets van.',
      items: [
        { t: 'Je stroom en gas blijven komen', d: faqById('no-interruption').a.nl },
        { t: 'Geen verbrekingsvergoeding', d: faqById('exit-fee').a.nl },
        { t: 'Jij houdt de controle', d: faqById('approval').a.nl },
      ],
      photoAlt: '[placeholder-photo] Rustige woonkamer in een Belgische rijwoning, avondlicht. Echte foto volgt.',
      photoTag: 'Placeholder foto',
    },
    plans: {
      eyebrow: 'Prijzen',
      title: 'Kies hoeveel June voor je doet',
      intro: 'Drie abonnementen, één jaarprijs. Geen verrassingen.',
      badge: 'Aanbevolen · met winstgarantie',
      perYear: 'per jaar',
      billed: 'per maand · jaarlijks gefactureerd',
      short: {
        switch: ['Maandelijkse analyse van 17+ leveranciers', 'Automatisch wisselen, of na jouw akkoord', 'Analoge en digitale meters'],
        'switch-plus': ['Alles uit Switch', `Winstgarantie: ${eur(99, 'nl-be')} terug als je niet meer bespaart dan je abonnement kost`, 'Jaarlijks besparingsrapport'],
        premium: ['Alles uit Switch Plus, inclusief winstgarantie', 'June Dongle inbegrepen: live data via de P1-poort', 'Je verbruik per kwartier, zonnepanelen inbegrepen'],
      } as Record<string, string[]>,
      whoFor: { switch: 'Gewoon minder betalen', 'switch-plus': 'Voor wie zekerheid wil', premium: 'Digitale meter of zonnepanelen' } as Record<string, string>,
      note: 'Je kiest je abonnement pas na je berekening.',
      all: 'Vergelijk alle abonnementen',
      footnote: 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
    },
    guar: {
      eyebrow: 'Winstgarantie bij Switch Plus',
      title: `Bespaar je niet meer dan je abonnement kost? Dan krijg je ${eur(99, 'nl-be')} terug.`,
      body: facts.guarantees.winstgarantie.summary.nl,
      terms: [facts.guarantees.winstgarantie.terms.period.nl, facts.guarantees.winstgarantie.terms.measurement.nl, facts.guarantees.winstgarantie.terms.payout.nl],
      conditions: 'Voorwaarden in onze algemene voorwaarden',
      link: 'Meer over Switch Plus en de winstgarantie',
      exTitle: 'Rekenvoorbeeld',
      exTag: 'Illustratief',
      exA: { saved: 250, label: 'Je bespaart', out: 'Je houdt je besparing.' },
      exB: { saved: 60, label: 'Je bespaart', out: `Je krijgt ${eur(99, 'nl-be')} terug.` },
      threshold: `abonnement ${eur(99, 'nl-be')}`,
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'Wat klanten zeggen',
      label: 'Uit onze Google-reviews',
      rating: `${rating} op 5`,
      count: '1.200+ reviews op Google',
      link: 'Alle reviews op Google',
      placeholder: '[placeholder] Hier komen drie echte Google-reviews: letterlijk, met voornaam en datum. We verzinnen geen citaten.',
    },
    faq: { eyebrow: 'FAQ', title: 'Veelgestelde vragen', ids: ['not-a-supplier', 'independence', 'exit-fee', 'meters', 'approval'], all: 'Alle vragen' },
    final: {
      title: 'Laat je energiecontract voortaan aan June over.',
      sub: 'Vul je postcode in. In een paar vragen weet je wat June voor jou kan doen.',
    },
    sticky: `${rating}/5 Google · ${thousands(20000, 'nl-be')}+ klanten`,
    footer: {
      tagline: 'Jij de power, wij het werk.',
      about: 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.',
      mission: facts.brand.mission.nl,
      cols: [
        { title: 'June', links: [
          { label: 'Hoe werkt het', key: 'howItWorks' }, { label: 'Abonnementen en prijzen', key: 'plans' },
          { label: 'Switch Plus', key: 'switchPlus' }, { label: 'Premium en June Dongle', key: 'plans', hash: 'premium' },
          { label: 'Reviews', key: 'home', hash: 'reviews' } ] },
        { title: 'Hulp', links: [
          { label: 'Veelgestelde vragen', key: 'faq' }, { label: 'Contact', todo: 'contact page + phone/hours' },
          { label: 'Voorwaarden winstgarantie', todo: 'T&C article' }, { label: 'Inloggen', todo: 'customer portal URL' } ] },
        { title: 'Over June', links: [
          { label: 'Hoe verdient June geld?', key: 'faq', hash: 'independence' }, { label: 'Onze missie', todo: 'visie page' },
          { label: 'Algemene voorwaarden', todo: 'T&C' }, { label: 'Privacy', todo: 'privacy' }, { label: 'Cookies', todo: 'cookies' } ] },
      ] as { title: string; links: (NavItem | { label: string; todo: string })[] }[],
      legal: '© 2026 June Energy · [KBO-nummer] · [adres]',
      notes: [
        facts.saving.averagePerYear.footnote.nl,
        'Google-score en aantal reviews op maart 2026.',
        'Aantal klanten op maart 2026.',
        'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.',
        'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
      ],
      footnotesLabel: 'Voetnoten',
      regulators: 'June is geen energieleverancier. Toezicht op de energiemarkt: VREG (Vlaanderen), CWaPE (Wallonië), Brugel (Brussel) en CREG (federaal). Zij keuren June niet goed of af; vergelijk ook zelf via hun tools.',
    },
  },
  'fr-be': {
    meta: {
      title: "June : passez automatiquement à un contrat d'énergie plus avantageux",
      description: `June compare les contrats de plus de 17 fournisseurs pour votre consommation et gère le changement. En moyenne ${eur(326, 'fr-be')} d'économie par an.`,
    },
    skip: 'Aller au contenu',
    nav: [
      { label: 'Comment ça marche', key: 'howItWorks' },
      { label: 'Prix', key: 'plans' },
      { label: 'Avis', key: 'home', hash: 'avis' },
      { label: 'FAQ', key: 'faq' },
    ] as NavItem[],
    navLabel: 'Menu principal',
    langOther: { label: 'NL', aria: 'Lees in het Nederlands' },
    langCurrent: 'FR',
    login: 'Se connecter',
    cta: 'Calculez votre économie',
    home: "June, vers la page d'accueil",
    hero: {
      kicker: "Pas un fournisseur d'énergie. Nous travaillons pour vous.",
      h1a: "Toujours le bon contrat d'énergie.",
      h1b: 'Sans même y penser.',
      sub: "Au moins une fois par mois, June compare votre consommation aux contrats de plus de 17 fournisseurs. Si c'est plus avantageux, nous gérons le changement : automatiquement, ou seulement après votre accord.",
      postcodeLabel: 'Votre code postal',
      postcodeHelp: 'Pour les frais de réseau de votre région. Sans engagement.',
      postcodeError: 'Indiquez un code postal belge à 4 chiffres, par ex. 1000.',
      placeholder: 'ex. 1000',
      assure: ["Votre électricité continue d'arriver", 'Même compteur', "Pas d'indemnité de rupture"],
    },
    trust: { rating: `${rating}/5 sur Google`, reviews: `plus de 1${NNB}200 avis`, customers: `plus de ${thousands(20000, 'fr-be')} clients`, stars: `${rating} étoiles sur 5` },
    tile: {
      label: 'Exemple de votre contrôle mensuel',
      example: 'Exemple',
      checking: 'Comparaison en cours…',
      checked: 'Vérifié ce mois-ci',
      sentence: "June a vérifié le marché pour vous. Vous n'avez rien à faire.",
      months: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
      monthsLabel: "Contrôles mensuels cette année, jusqu'en septembre",
      avgLabel: 'Nos clients économisent en moyenne',
      perYear: 'par an',
      planName: 'Switch Plus',
      planMain: `${eur(99, 'fr-be')} par an`,
      planSub: `${eur(8.25, 'fr-be')} par mois, facturé annuellement`,
      guarName: 'Garantie de gain',
      guarMain: `${eur(99, 'fr-be')} remboursés`,
      guarSub: "si vous n'économisez pas plus que le prix de votre abonnement sur une année",
    },
    proof: {
      title: 'June en chiffres',
      items: [
        { n: `${thousands(20000, 'fr-be')}+`, t: 'clients nous font déjà confiance', fn: 3 },
        { n: `${rating}/5`, t: `sur Google · plus de 1${NNB}200 avis`, fn: 2, stars: true },
        { n: eur(326, 'fr-be'), t: "d'économie moyenne par an", fn: 1 },
        { n: '17+', t: 'fournisseurs comparés, au moins chaque mois' },
      ],
    },
    how: {
      eyebrow: 'Comment ça marche',
      title: 'Trois étapes. Ensuite, June fait le travail.',
      intro: 'Vous le faites une fois. Nous restons attentifs, chaque mois.',
      after: 'Ensuite : un nouveau contrôle chaque mois',
      link: 'Comment fonctionne June, étape par étape',
    },
    same: {
      eyebrow: "Qu'est-ce qui change ?",
      title: 'Seulement le nom sur votre facture.',
      intro: "Nous gérons le changement en coulisses. Chez vous, rien ne bouge.",
      items: [
        { t: "L'électricité et le gaz continuent d'arriver", d: faqById('no-interruption').a.fr },
        { t: "Pas d'indemnité de rupture", d: faqById('exit-fee').a.fr },
        { t: 'Vous gardez le contrôle', d: faqById('approval').a.fr },
      ],
      photoAlt: "[placeholder-photo] Salon calme dans une maison belge, lumière du soir. Vraie photo à venir.",
      photoTag: 'Photo placeholder',
    },
    plans: {
      eyebrow: 'Prix',
      title: 'Choisissez ce que June fait pour vous',
      intro: 'Trois abonnements, un prix annuel. Pas de surprise.',
      badge: 'Recommandé · avec garantie de gain',
      perYear: 'par an',
      billed: 'par mois · facturé annuellement',
      short: {
        switch: ['Analyse mensuelle de plus de 17 fournisseurs', 'Changement automatique, ou après votre accord', 'Compteurs analogiques et numériques'],
        'switch-plus': ["Tout ce qu'offre Switch", `Garantie de gain : ${eur(99, 'fr-be')} remboursés si vous n'économisez pas plus que le prix de votre abonnement`, "Rapport d'économies annuel"],
        premium: ["Tout ce qu'offre Switch Plus, garantie de gain comprise", 'June Dongle inclus : données en direct via le port P1', 'Consommation par quart d’heure, panneaux solaires compris'],
      } as Record<string, string[]>,
      whoFor: { switch: 'Simplement payer moins', 'switch-plus': 'Pour ceux qui veulent une certitude', premium: 'Compteur numérique ou panneaux solaires' } as Record<string, string>,
      note: 'Vous choisissez votre abonnement après le calcul.',
      all: 'Comparer tous les abonnements',
      footnote: 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
    },
    guar: {
      eyebrow: 'Garantie de gain avec Switch Plus',
      title: `Vous n'économisez pas plus que le prix de votre abonnement ? Vous récupérez ${eur(99, 'fr-be')}.`,
      body: facts.guarantees.winstgarantie.summary.fr,
      terms: [facts.guarantees.winstgarantie.terms.period.fr, facts.guarantees.winstgarantie.terms.measurement.fr, facts.guarantees.winstgarantie.terms.payout.fr],
      conditions: 'Conditions dans nos conditions générales',
      link: 'En savoir plus sur Switch Plus et la garantie',
      exTitle: 'Exemple de calcul',
      exTag: 'Illustratif',
      exA: { saved: 250, label: 'Vous économisez', out: 'Vous gardez votre économie.' },
      exB: { saved: 60, label: 'Vous économisez', out: `Vous récupérez ${eur(99, 'fr-be')}.` },
      threshold: `abonnement ${eur(99, 'fr-be')}`,
    },
    reviews: {
      eyebrow: 'Avis',
      title: 'Ce que disent nos clients',
      label: 'Extraits de nos avis Google',
      rating: `${rating} sur 5`,
      count: `plus de 1${NNB}200 avis sur Google`,
      link: 'Tous les avis sur Google',
      placeholder: "[placeholder] Ici viendront trois vrais avis Google en français : mot pour mot, avec prénom et date. Nous n'inventons aucune citation.",
    },
    faq: { eyebrow: 'FAQ', title: 'Questions fréquentes', ids: ['not-a-supplier', 'independence', 'exit-fee', 'meters', 'approval'], all: 'Toutes les questions' },
    final: {
      title: 'Confiez désormais votre contrat d’énergie à June.',
      sub: 'Indiquez votre code postal. En quelques questions, vous savez ce que June peut faire pour vous.',
    },
    sticky: `${rating}/5 Google · ${thousands(20000, 'fr-be')}+ clients`,
    footer: {
      tagline: 'À vous le pouvoir, à nous le travail.',
      about: "June suit le marché de l'énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.",
      mission: facts.brand.mission.fr,
      cols: [
        { title: 'June', links: [
          { label: 'Comment ça marche', key: 'howItWorks' }, { label: 'Abonnements et prix', key: 'plans' },
          { label: 'Switch Plus', key: 'switchPlus' }, { label: 'Premium et June Dongle', key: 'plans', hash: 'premium' },
          { label: 'Avis', key: 'home', hash: 'avis' } ] },
        { title: 'Aide', links: [
          { label: 'Questions fréquentes', key: 'faq' }, { label: 'Contact', todo: 'contact page + phone/hours' },
          { label: 'Conditions de la garantie de gain', todo: 'T&C article' }, { label: 'Se connecter', todo: 'customer portal URL' } ] },
        { title: 'À propos', links: [
          { label: 'Comment June gagne-t-elle sa vie ?', key: 'faq', hash: 'independence' }, { label: 'Notre mission', todo: 'vision page' },
          { label: 'Conditions générales', todo: 'T&C' }, { label: 'Confidentialité', todo: 'privacy' }, { label: 'Cookies', todo: 'cookies' } ] },
      ] as { title: string; links: (NavItem | { label: string; todo: string })[] }[],
      legal: '© 2026 June Energy · [numéro BCE] · [adresse]',
      notes: [
        facts.saving.averagePerYear.footnote.fr,
        'Note Google et nombre d’avis en mars 2026.',
        'Nombre de clients en mars 2026.',
        'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.',
        'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
      ],
      footnotesLabel: 'Notes',
      regulators: "June n'est pas un fournisseur d'énergie. Le marché de l'énergie est contrôlé par la CWaPE (Wallonie), Brugel (Bruxelles), la VREG (Flandre) et la CREG (fédéral). Ils n'approuvent ni ne désapprouvent June ; vous pouvez aussi comparer via leurs outils.",
    },
  },
};
export type Copy = (typeof copy)['nl-be'];

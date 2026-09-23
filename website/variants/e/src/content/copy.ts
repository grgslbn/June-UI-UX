// Variant E copy (NL + FR). Numbers, prices, plan features and FAQ answers come from facts.json.
// Headlines/microcopy are variant-owned within the claims register (content-freeze.md §3–4).
import facts from '@shared/content/facts.json';

export type Locale = 'nl-be' | 'fr-be';
export const lang = (l: Locale) => (l === 'nl-be' ? 'nl' : 'fr') as 'nl' | 'fr';

const NBSP = ' ';
const NNBSP = ' ';
/** € 5,75 (NL) · 5,75 € (FR). Non-breaking so a price never wraps. */
export const money = (n: number, l: Locale) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return l === 'nl-be' ? `€${NBSP}${s}` : `${s}${NBSP}€`;
};

const f = facts as any;
export const plans = f.plans as any[];
export const faqById = (id: string) => f.faq.find((q: any) => q.id === id);
export const steps = f.howItWorks.short as any[];

const saving = money(f.saving.averagePerYear.value, 'nl-be');
const savingFr = money(f.saving.averagePerYear.value, 'fr-be');
const g = f.guarantees.winstgarantie;

export const copy = {
  'nl-be': {
    meta: {
      title: 'June: automatisch naar een voordeliger energiecontract',
      description: `June vergelijkt de contracten van 17+ energieleveranciers voor jouw verbruik en regelt de overstap. Gemiddeld ${saving} per jaar besparing.`,
    },
    skip: 'Naar de inhoud',
    nav: { how: 'Hoe werkt het', prices: 'Prijzen', reviews: 'Reviews', faq: 'FAQ', menu: 'Menu', login: 'Inloggen', langLabel: 'Lees in het Frans', langShort: 'FR', langCurrent: 'NL', navLabel: 'Hoofdmenu' },
    cta: 'Bereken je besparing',
    hero: {
      eyebrow: 'Onafhankelijk · geen leverancier',
      h1a: 'Je had energie.',
      h1b: 'Nu heb je',
      power: 'power',
      h1end: '.',
      sub: `June is geen leverancier. Elke maand vergelijken we 17+ leveranciers voor jouw verbruik en wisselen we voor je: automatisch, of pas na jouw akkoord. Klanten besparen gemiddeld ${saving} per jaar.`,
      postcode: 'Je postcode',
      postcodeHelp: 'Zo weten we welke aanbiedingen bij jou gelden.',
      reassure: 'Geen onderbreking van je stroom of gas · Jij houdt de controle',
      rating: '4,3/5 op Google',
      ratingAria: 'Beoordeling 4,3 op 5 op Google, op basis van 1.200+ reviews',
      customers: '20.000+ klanten',
      price: `Abonnement: ${money(69, 'nl-be')}, ${money(99, 'nl-be')} of ${money(198, 'nl-be')} per jaar`,
      guarantee: 'Winstgarantie bij Switch Plus',
      photoAlt: '[placeholder] Foto: iemand thuis, ontspannen, bij avondlicht. Echte fotografie volgt.',
      photoTag: 'Placeholder foto',
    },
    steps: {
      eyebrow: 'Hoe werkt het?',
      h2a: 'Jij de power,',
      h2b: 'wij het werk.',
      intro: 'Drie stappen. Eén keer aanmelden. Daarna houden wij je contract scherp.',
      switchNote: 'Switch gebeurd',
    },
    plans: {
      eyebrow: 'Prijzen',
      h2: 'Kies hoeveel June voor je doet',
      intro: 'Drie abonnementen, één jaarprijs. Geen verrassingen.',
      perYear: 'per jaar',
      perMonth: 'per maand',
      billed: 'jaarlijks gefactureerd',
      recommended: 'Aanbevolen · met winstgarantie',
      choose: 'Kies',
      footnote: 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
      dongle: 'dongle inbegrepen',
    },
    guarantee: {
      eyebrow: `${g.name.nl} · bij Switch Plus en Premium`,
      h2: `Bespaar je niet meer dan je abonnement kost? Dan krijg je ${money(g.amount, 'nl-be')} terug.`,
      body: 'Na elk abonnementsjaar maken we de rekening in je besparingsrapport. Zo verdient je abonnement zichzelf terug, of je krijgt je geld terug.',
      exampleLabel: 'Rekenvoorbeeld · illustratief',
      rows: [
        ['Je kiest Switch Plus', `${money(99, 'nl-be')} per jaar`],
        ['Je besparing na een jaar is lager dan je abonnement', `bv. ${money(80, 'nl-be')}`],
        ['Wij betalen je terug', money(99, 'nl-be')],
      ],
      terms: 'Voorwaarden',
    },
    reviews: {
      eyebrow: 'Reviews',
      h2: 'Wat klanten zeggen',
      label: 'Uit onze Google-reviews',
      of: 'op 5',
      count: '1.200+ reviews op Google',
      customers: '20.000+ klanten gingen je voor',
      placeholder: 'Placeholder: hier komt een echte Google-review, woordelijk, met voornaam en datum.',
      all: 'Alle reviews op Google',
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Nog vragen?',
      ids: ['not-a-supplier', 'approval', 'no-interruption', 'cost'],
    },
    closing: {
      h2: 'Klaar om minder te betalen voor je energie?',
      body: 'Aanmelden duurt twee minuten. Je postcode en je e-mailadres volstaan om te starten.',
    },
    footer: {
      tagline: 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.',
      lockup: ['Jij de power,', 'wij het werk.'],
      heritage: 'Je had energie, nu heb je power.',
      links: ['Algemene voorwaarden', 'Privacy', 'Cookies', 'Contact'],
      legal: '© 2026 June Energy · [KBO-nummer]',
      notes: 'Voetnoten',
    },
    sticky: { proof: '4,3/5 Google · 20.000+ klanten' },
    fn: {
      saving: f.saving.averagePerYear.footnote.nl,
      reviews: 'Google-score en aantal reviews op maart 2026.',
      customers: 'Aantal klanten op maart 2026.',
      guarantee: 'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.',
    },
  },
  'fr-be': {
    meta: {
      title: "June : passez automatiquement à un contrat d'énergie plus avantageux",
      description: `June compare les contrats de plus de 17 fournisseurs pour votre consommation et gère le changement. En moyenne ${savingFr} d'économie par an.`,
    },
    skip: 'Aller au contenu',
    nav: { how: 'Comment ça marche', prices: 'Prix', reviews: 'Avis', faq: 'FAQ', menu: 'Menu', login: 'Se connecter', langLabel: 'Lees in het Nederlands', langShort: 'NL', langCurrent: 'FR', navLabel: 'Menu principal' },
    cta: 'Calculez votre économie',
    hero: {
      eyebrow: 'Indépendant · pas un fournisseur',
      h1a: 'Vous aviez de l’énergie.',
      h1b: 'Maintenant, vous avez le',
      power: 'pouvoir',
      h1end: '.',
      sub: `June n’est pas un fournisseur. Chaque mois, nous comparons plus de 17${NNBSP}fournisseurs selon votre consommation et changeons pour vous : automatiquement, ou seulement après votre accord. Nos clients économisent en moyenne ${savingFr} par an.`,
      postcode: 'Votre code postal',
      postcodeHelp: 'Pour savoir quelles offres s’appliquent chez vous.',
      reassure: "Aucune interruption d'électricité ni de gaz · Vous gardez le contrôle",
      rating: '4,3/5 sur Google',
      ratingAria: 'Note de 4,3 sur 5 sur Google, sur la base de plus de 1 200 avis',
      customers: `Plus de 20${NNBSP}000 clients`,
      price: `Abonnement : ${money(69, 'fr-be')}, ${money(99, 'fr-be')} ou ${money(198, 'fr-be')} par an`,
      guarantee: 'Garantie de gain avec Switch Plus',
      photoAlt: "[placeholder] Photo : une personne détendue chez elle, lumière du soir. Photographie réelle à venir.",
      photoTag: 'Photo placeholder',
    },
    steps: {
      eyebrow: 'Comment ça marche ?',
      h2a: 'À vous le pouvoir,',
      h2b: 'à nous le travail.',
      intro: 'Trois étapes. Une seule inscription. Ensuite, nous gardons votre contrat au meilleur niveau.',
      switchNote: 'Changement effectué',
    },
    plans: {
      eyebrow: 'Prix',
      h2: 'Choisissez ce que June fait pour vous',
      intro: 'Trois abonnements, un prix annuel. Pas de surprise.',
      perYear: 'par an',
      perMonth: 'par mois',
      billed: 'facturé annuellement',
      recommended: 'Recommandé · avec garantie de gain',
      choose: 'Choisir',
      footnote: 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
      dongle: 'dongle inclus',
    },
    guarantee: {
      eyebrow: `${g.name.fr} · avec Switch Plus et Premium`,
      h2: `Vous n'économisez pas plus que le prix de votre abonnement ? Vous récupérez ${money(g.amount, 'fr-be')}.`,
      body: "Après chaque année d'abonnement, nous faisons le compte dans votre rapport d'économies. Votre abonnement se rembourse, ou vous êtes remboursé.",
      exampleLabel: 'Exemple de calcul · illustratif',
      rows: [
        ['Vous choisissez Switch Plus', `${money(99, 'fr-be')} par an`],
        ['Votre économie après un an est inférieure à votre abonnement', `p. ex. ${money(80, 'fr-be')}`],
        ['Nous vous remboursons', money(99, 'fr-be')],
      ],
      terms: 'Conditions',
    },
    reviews: {
      eyebrow: 'Avis',
      h2: 'Ce que disent nos clients',
      label: 'Extraits de nos avis Google',
      of: 'sur 5',
      count: `Plus de 1${NNBSP}200 avis sur Google`,
      customers: `Plus de 20${NNBSP}000 clients nous font déjà confiance`,
      placeholder: 'Placeholder : ici, un véritable avis Google, mot pour mot, avec prénom et date.',
      all: 'Tous les avis sur Google',
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Encore des questions ?',
      ids: ['not-a-supplier', 'approval', 'no-interruption', 'cost'],
    },
    closing: {
      h2: 'Prêt à payer moins pour votre énergie ?',
      body: "L'inscription prend deux minutes. Votre code postal et votre adresse e-mail suffisent pour commencer.",
    },
    footer: {
      tagline: "June suit le marché de l'énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.",
      lockup: ['À vous le pouvoir,', 'à nous le travail.'],
      heritage: "Vous aviez de l'énergie. Maintenant, vous avez le pouvoir.",
      links: ['Conditions générales', 'Confidentialité', 'Cookies', 'Contact'],
      legal: '© 2026 June Energy · [numéro BCE]',
      notes: 'Notes',
    },
    sticky: { proof: `4,3/5 Google · 20${NNBSP}000+ clients` },
    fn: {
      saving: f.saving.averagePerYear.footnote.fr,
      reviews: 'Note Google et nombre d’avis au mois de mars 2026.',
      customers: 'Nombre de clients au mois de mars 2026.',
      guarantee: 'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.',
    },
  },
} as const;

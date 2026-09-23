// Variant E · shared site copy (NL + FR) and helpers.
// Numbers, prices, plan features and FAQ answers come from facts.json (never retyped).
// Headlines/microcopy are variant-owned within the claims register (content-freeze.md §3–4).
import facts from '@shared/content/facts.json';

export type Locale = 'nl-be' | 'fr-be';
export const lang = (l: Locale) => (l === 'nl-be' ? 'nl' : 'fr') as 'nl' | 'fr';
export const other = (l: Locale): Locale => (l === 'nl-be' ? 'fr-be' : 'nl-be');

export const NBSP = ' ';
export const NNBSP = ' ';
/** € 5,75 (NL) · 5,75 € (FR). Non-breaking so a price never wraps. */
export const money = (n: number, l: Locale) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return l === 'nl-be' ? `€${NBSP}${s}` : `${s}${NBSP}€`;
};

/** French typography: narrow no-break space before : ; ? ! » so punctuation never starts a line. */
export const tp = (s: string, l: Locale) =>
  l === 'fr-be' ? s.replace(/'/g, '’').replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ').replace(/(\d) %/g, '$1 %') : s;
export const deep = (o: any, l: Locale): any =>
  typeof o === 'string' ? tp(o, l) : Array.isArray(o) ? o.map(x => deep(x, l)) : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deep(v, l)])) : o;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Escape + render frozen "[to be confirmed]" placeholders as a visible TBC mark (they must never ship silently). */
export const rich = (s: string) => esc(s).replace(/\[([^\]]+)\]/g, '<mark class="tbc" title="Placeholder">$1</mark>');

export const f = facts as any;
export const plans = f.plans as any[];
export const plan = (slug: string) => plans.find(p => p.slug === slug);
export const faqById = (id: string) => f.faq.find((q: any) => q.id === id);
export const stepsShort = f.howItWorks.short as any[];
export const stepsDetailed = f.howItWorks.detailed as any[];
/** Premium features marked `derived` stay behind a flag until the owner confirms them (content-freeze §2.2). */
export const confirmedFeatures = (p: any) => p.features.filter((x: any) => x.source !== 'derived');

const g = f.guarantees.winstgarantie;

const raw = {
  'nl-be': {
    skip: 'Naar de inhoud',
    nav: {
      label: 'Hoofdmenu', how: 'Hoe werkt het', prices: 'Prijzen', reviews: 'Reviews', faq: 'FAQ',
      menu: 'Menu', close: 'Sluiten', login: 'Inloggen', langLabel: 'Lees deze pagina in het Frans', langShort: 'FR', langCurrent: 'NL', home: 'June, naar de homepage',
    },
    reviewsId: 'reviews',
    cta: 'Bereken je besparing',
    ctaShort: 'Bereken besparing',
    postcode: {
      label: 'Je postcode', placeholder: 'bv. 9000', help: 'Netkosten en aanbiedingen verschillen per regio.',
    },
    reassure: 'Gratis schatting · Geen verplichtingen · Geen onderbreking van je stroom of gas',
    trust: {
      rating: '4,3/5 op Google', ratingAria: 'Beoordeling 4,3 op 5 op Google, op basis van 1.200+ reviews',
      reviews: '1.200+ reviews', customers: '20.000+ klanten', notSupplier: 'Geen leverancier', guarantee: `Winstgarantie of ${money(g.amount, 'nl-be')} terug`,
    },
    fnLabel: (n: number) => `voetnoot ${n}`,
    crumbs: 'Kruimelpad',
    home: 'Home',
    sticky: { proof: '4,3/5 Google · 20.000+ klanten' },
    closing: {
      h2: 'Klaar om minder te betalen voor je energie?',
      body: 'Je schatting staat klaar in een minuut. Je postcode is genoeg om te starten.',
    },
    footer: {
      tagline: 'June is geen energieleverancier. We volgen de markt voor jou op en laten je overstappen naar een voordeliger contract: automatisch, of na jouw akkoord.',
      lockup: ['Jij de power,', 'wij het werk.'],
      heritage: 'Je had energie, nu heb je power.',
      cols: { june: 'June', help: 'Hulp', legal: 'Juridisch' },
      plans: 'Abonnementen', switch: 'Switch', switchPlus: 'Switch Plus', premium: 'Premium', how: 'Hoe werkt het', reviews: 'Reviews',
      faq: 'Veelgestelde vragen', guarantee: 'Winstgarantie', signup: 'Aanmelden', login: 'Inloggen',
      legalLinks: ['Algemene voorwaarden', 'Privacy', 'Cookies', 'Contact'],
      legal: '© 2026 June Energy · [KBO-nummer en adres]',
      notes: 'Voetnoten',
      pending: '(pagina volgt)',
    },
    fn: {
      saving: f.saving.averagePerYear.footnote.nl,
      reviews: 'Google-score en aantal reviews op maart 2026.',
      customers: 'Aantal klanten op maart 2026.',
      guarantee: 'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.',
      prices: 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
    },
    perYear: 'per jaar', perMonth: 'per maand', billed: 'jaarlijks gefactureerd', vat: 'incl. btw',
    recommended: 'Aanbevolen · met winstgarantie',
    choose: 'Kies',
    allFaq: 'Alle vragen',
    tbcNote: 'Gemarkeerde tekst wacht op bevestiging door June.',
  },
  'fr-be': {
    skip: 'Aller au contenu',
    nav: {
      label: 'Menu principal', how: 'Comment ça marche', prices: 'Prix', reviews: 'Avis', faq: 'FAQ',
      menu: 'Menu', close: 'Fermer', login: 'Se connecter', langLabel: 'Deze pagina in het Nederlands lezen', langShort: 'NL', langCurrent: 'FR', home: 'June, retour à l’accueil',
    },
    reviewsId: 'avis',
    cta: 'Calculez votre économie',
    ctaShort: 'Calculez votre économie',
    postcode: {
      label: 'Votre code postal', placeholder: 'p. ex. 4000', help: 'Les frais de réseau et les offres varient selon la région.',
    },
    reassure: 'Estimation gratuite · Sans engagement · Aucune coupure d’électricité ni de gaz',
    trust: {
      rating: '4,3/5 sur Google', ratingAria: 'Note de 4,3 sur 5 sur Google, sur la base de plus de 1 200 avis',
      reviews: `Plus de 1${NNBSP}200 avis`, customers: `Plus de 20${NNBSP}000 clients`, notSupplier: 'Pas un fournisseur', guarantee: `Garantie de gain ou ${money(g.amount, 'fr-be')} remboursés`,
    },
    fnLabel: (n: number) => `note ${n}`,
    crumbs: 'Fil d’Ariane',
    home: 'Accueil',
    sticky: { proof: `4,3/5 Google · 20${NNBSP}000+ clients` },
    closing: {
      h2: 'Prêt à payer moins pour votre énergie ?',
      body: 'Votre estimation est prête en une minute. Votre code postal suffit pour commencer.',
    },
    footer: {
      tagline: 'June n’est pas un fournisseur d’énergie. Nous suivons le marché pour vous et vous faisons passer à un contrat plus avantageux : automatiquement, ou après votre accord.',
      lockup: ['À vous le pouvoir,', 'à nous le travail.'],
      heritage: 'Vous aviez de l’énergie. Maintenant, vous avez le pouvoir.',
      cols: { june: 'June', help: 'Aide', legal: 'Informations légales' },
      plans: 'Abonnements', switch: 'Switch', switchPlus: 'Switch Plus', premium: 'Premium', how: 'Comment ça marche', reviews: 'Avis',
      faq: 'Questions fréquentes', guarantee: 'Garantie de gain', signup: 'Inscription', login: 'Se connecter',
      legalLinks: ['Conditions générales', 'Confidentialité', 'Cookies', 'Contact'],
      legal: '© 2026 June Energy · [numéro BCE et adresse]',
      notes: 'Notes',
      pending: '(page à venir)',
    },
    fn: {
      saving: f.saving.averagePerYear.footnote.fr,
      reviews: 'Note Google et nombre d’avis au mois de mars 2026.',
      customers: 'Nombre de clients au mois de mars 2026.',
      guarantee: 'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.',
      prices: 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
    },
    perYear: 'par an', perMonth: 'par mois', billed: 'facturé annuellement', vat: 'TVA comprise',
    recommended: 'Recommandé · avec garantie de gain',
    choose: 'Choisir',
    allFaq: 'Toutes les questions',
    tbcNote: 'Le texte surligné attend une confirmation de June.',
  },
};
export const copy = { 'nl-be': raw['nl-be'], 'fr-be': deep(raw['fr-be'], 'fr-be') as typeof raw['nl-be'] };

/** Deep-link slugs for FAQ answers (FAQ page ids + in-context links). */
export const faqSlug: Record<Locale, Record<string, string>> = {
  'nl-be': { 'not-a-supplier': 'leverancier', 'how-so-much': 'besparen', 'which-suppliers': 'leveranciers', cost: 'kosten', 'exit-fee': 'opzegvergoeding', 'no-interruption': 'onderbreking', approval: 'akkoord', meters: 'meters', guarantee: 'winstgarantie', cancel: 'opzeggen', regions: 'regio', independence: 'onafhankelijk', data: 'gegevens', green: 'groene-stroom' },
  'fr-be': { 'not-a-supplier': 'fournisseur', 'how-so-much': 'economies', 'which-suppliers': 'fournisseurs', cost: 'cout', 'exit-fee': 'indemnite', 'no-interruption': 'coupure', approval: 'accord', meters: 'compteurs', guarantee: 'garantie-de-gain', cancel: 'resiliation', regions: 'regions', independence: 'independance', data: 'donnees', green: 'electricite-verte' },
};

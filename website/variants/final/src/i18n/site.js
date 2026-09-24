// Variant C "Honest Market" — site-wide copy + helpers (header, footer, footnotes, trust, forms).
// Every number, price and guarantee is read from facts.json (content freeze). FR is written natively (vous).
import facts from '@shared/content/facts.json';

export { facts };
export const [SW, SWP, PREM] = facts.plans;
export const G = facts.guarantees.winstgarantie;
export const faqById = (id) => facts.faq.find((f) => f.id === id);
export const NNBSP = ' ';

export const NBSP = '\u00A0';
export const money = (n, L) => {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  const grouped = s.replace(/\B(?=(\d{3})+(?!\d))/g, L === 'nl' ? '.' : NNBSP);
  return L === 'nl' ? `€${NBSP}${grouped}` : `${grouped}${NBSP}€`;
};

/** Shared typography helper: keeps amounts and units on one line — "€ 326", "326 €", "21 %", "3.800 kWh" get a
 *  no-break space. Works on strings, arrays and objects (deep). Applied automatically by localise(); import it for
 *  any string that does not go through localise(). */
export const nbsp = (v) => typeof v === 'string'
  ? v.replace(/€ (?=\d)/g, `€${NBSP}`).replace(/(\d) (?=€|%|kWh\b|m³)/g, `$1${NBSP}`)
  : Array.isArray(v) ? v.map(nbsp)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nbsp(x)])) : v;

// FR typography: narrow no-break space before ? ! : ; — applied to every FR string (not to URLs/HTML attributes).
export const frPunct = (v) => typeof v === 'string' ? v.replace(/ ([?!:;])(?=\s|$|<)/g, ' $1')
  : Array.isArray(v) ? v.map(frPunct)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, frPunct(x)])) : v;

/** Wrap a page-copy builder: no-break spaces around amounts/units (both locales) + French punctuation spacing (FR). */
export const localise = (build) => (locale) => {
  const L = locale === 'fr-be' ? 'fr' : 'nl';
  const out = nbsp(build(L, (n) => money(n, L)));
  return L === 'fr' ? frPunct(out) : out;
};

const month = { nl: 'maart 2026', fr: 'mars 2026' }; // socialProof.asOf = 2026-03

export const LOGIN_URL = 'https://www.june.energy/'; // interim until facts.brand.login.url is confirmed

export const siteCopy = localise((L, m) => {
  const nl = L === 'nl';
  return {
    L,
    rating: facts.socialProof.googleRating.value,
    plans: [SW, SWP, PREM].map((p) => ({
      slug: p.slug, name: p.shortName, full: p.name,
      yearly: m(p.priceYearly), yearlyN: p.priceYearly, monthly: p.priceDisplay[L].main, monthlyShort: m(p.priceMonthly),
      value: p.valueProposition[L], whoFor: p.whoFor[L],
      features: p.features.filter((f) => f.source !== 'derived').map((f) => f[L]),
    })),
    footnotes: [
      // fn-1: the facts.json footnote still has [periode]/[aantal] placeholders; show the basis without brackets until June fills them.
      { id: 'fn-1', text: nl ? 'Gemiddelde besparing per klant per jaar, berekend door June tegenover het contract vóór de overstap. Je persoonlijke besparing hangt af van je verbruik en de marktprijzen.' : 'Économie moyenne par client et par an, calculée par June par rapport au contrat d’avant le changement. Votre économie personnelle dépend de votre consommation et des prix du marché.' },
      { id: 'fn-2', text: nl ? `Google-score en aantal reviews op ${month.nl}.` : `Note Google et nombre d’avis en ${month.fr}.` },
      { id: 'fn-3', text: nl ? `Aantal klanten op ${month.nl}.` : `Nombre de clients en ${month.fr}.` },
      { id: 'fn-4', text: nl ? 'Winstgarantie bij Switch Plus en Premium, per abonnementsjaar. Voorwaarden in onze algemene voorwaarden.' : 'Garantie de gain avec Switch Plus et Premium, par année d’abonnement. Conditions dans nos conditions générales.' },
      { id: 'fn-5', text: nl
        ? 'June leeft van de abonnementen van haar klanten en kiest je contract op basis van jouw verbruik. Of June daarnaast vergoedingen van leveranciers ontvangt, vermelden we hier zodra dat bevestigd is.'
        : 'June vit des abonnements de ses clients et choisit votre contrat sur la base de votre consommation. Si June perçoit en plus des rémunérations de fournisseurs, nous l’indiquerons ici dès que ce sera confirmé.' },
      { id: 'fn-6', text: nl ? 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.' : 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.' },
    ],
    ui: nl
      ? { skip: 'Naar de inhoud', menu: 'Menu', close: 'Sluiten', login: 'Inloggen', cta: 'Bereken je besparing', langOther: 'FR', langOtherLabel: 'Lire en français', langOtherName: 'Français', navLabel: 'Hoofdmenu', help: 'Hulp nodig?', helpLabel: 'Hulp nodig? Naar de veelgestelde vragen', reducer: 'Vrijblijvend', loginShort: 'Inloggen', home: 'Home', crumbs: 'Kruimelpad', homeLabel: 'June, naar de startpagina', fnLabel: 'voetnoot', notIncluded: 'Niet inbegrepen', included: 'Inbegrepen' }
      : { skip: 'Aller au contenu', menu: 'Menu', close: 'Fermer', login: 'Se connecter', cta: 'Calculez votre économie', langOther: 'NL', langOtherLabel: 'Lees in het Nederlands', langOtherName: 'Nederlands', navLabel: 'Menu principal', help: 'Besoin d’aide ?', helpLabel: 'Besoin d’aide ? Vers les questions fréquentes', reducer: 'Sans engagement', loginShort: 'Connexion', home: 'Accueil', crumbs: 'Fil d’Ariane', homeLabel: 'June, vers la page d’accueil', fnLabel: 'note', notIncluded: 'Non inclus', included: 'Inclus' },
    nav: nl
      ? { howItWorks: 'Hoe werkt het', plans: 'Prijzen', switchPlus: 'Winstgarantie', reviews: 'Reviews', faq: 'FAQ' }
      : { howItWorks: 'Comment ça marche', plans: 'Prix', switchPlus: 'Garantie de gain', reviews: 'Avis', faq: 'FAQ' },
    pageNames: nl
      ? { home: 'Home', plans: 'Abonnementen', switchPlus: 'Switch Plus', howItWorks: 'Hoe werkt het', faq: 'Veelgestelde vragen', signup: 'Aanmelden' }
      : { home: 'Accueil', plans: 'Abonnements', switchPlus: 'Switch Plus', howItWorks: 'Comment ça marche', faq: 'Questions fréquentes', signup: 'Inscription' },
    form: nl
      ? { label: 'Je postcode', placeholder: 'bv. 9000', help: 'Vrijblijvend · geen persoonsgegevens', error: 'Vul een Belgische postcode in van 4 cijfers, bv. 9000.' }
      : { label: 'Votre code postal', placeholder: 'ex. 1000', help: 'Sans engagement · aucune donnée personnelle', error: 'Indiquez un code postal belge à 4 chiffres, par ex. 1000.' },
    trust: {
      rating: facts.socialProof.googleRating.display[L],
      customers: facts.socialProof.customers.display[L],
      same: nl ? 'Zelfde meter, geen onderbreking' : 'Même compteur, aucune coupure',
    },
    footer: nl ? {
      tagline: 'Jij de power, wij het werk.',
      about: 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.',
      mission: facts.brand.mission.nl,
      colJune: 'June', colHelp: 'Hulp', notesTitle: 'Voetnoten en bronnen',
      links: { switch: 'Switch', premium: 'Premium', dongle: 'June Dongle', earn: 'Hoe June geld verdient', data: 'Je gegevens' },
      legal: '© 2026 June Energy',
      legalLinks: ['Algemene voorwaarden', 'Privacy', 'Cookies'],
      legalNote: 'Algemene voorwaarden, privacyverklaring en contactgegevens worden vóór livegang gekoppeld.',
    } : {
      tagline: 'À vous le pouvoir, à nous le travail.',
      about: 'June suit le marché de l’énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.',
      mission: facts.brand.mission.fr,
      colJune: 'June', colHelp: 'Aide', notesTitle: 'Notes et sources',
      links: { switch: 'Switch', premium: 'Premium', dongle: 'June Dongle', earn: 'Comment June gagne sa vie', data: 'Vos données' },
      legal: '© 2026 June Energy',
      legalLinks: ['Conditions générales', 'Confidentialité', 'Cookies'],
      legalNote: 'Conditions générales, déclaration de confidentialité et coordonnées seront liées avant la mise en ligne.',
    },
    flow: nl
      ? { you: 'Jij', june: 'June', sup: 'Leverancier', pay: 'abonnement, vaste jaarprijs', work: `vergelijkt ${facts.suppliers.count.display.nl}, regelt de overstap`, bill: 'Je energiefactuur betaal je, zoals nu, aan de leverancier' }
      : { you: 'Vous', june: 'June', sup: 'Fournisseur', pay: 'abonnement, prix annuel fixe', work: `compare ${facts.suppliers.count.display.fr}, gère le changement`, bill: 'Votre facture d’énergie, vous la payez comme aujourd’hui au fournisseur' },
    promise: nl ? {
      kicker: 'De belofte',
      h2: 'Een belofte met voorwaarden die je gewoon kunt lezen.',
      summary: G.summary.nl,
      outcomes: [
        { label: 'Je kiest Switch Plus', big: m(SWP.priceYearly), p: `per jaar, jaarlijks gefactureerd (${SWP.priceDisplay.nl.main}). Na elk abonnementsjaar kijken we hoeveel je bespaard hebt.` },
        { label: `Meer dan ${m(SWP.priceYearly)} bespaard`, big: `> ${m(SWP.priceYearly)}`, p: 'Dan heeft June zichzelf terugverdiend, en hou <strong>jij</strong> het verschil.' },
        { label: `${m(SWP.priceYearly)} of minder bespaard`, big: `${m(G.amount)} terug`, accent: true, p: `Dan krijg je <strong>${m(G.amount)}</strong> terug.` },
      ],
      terms: 'Lees de voorwaarden', more: 'Zo werkt de winstgarantie',
    } : {
      kicker: 'La promesse',
      h2: 'Une promesse avec des conditions que vous pouvez simplement lire.',
      summary: G.summary.fr,
      outcomes: [
        { label: 'Vous choisissez Switch Plus', big: m(SWP.priceYearly), p: `par an, facturé annuellement (${SWP.priceDisplay.fr.main}). Après chaque année d’abonnement, nous calculons ce que vous avez économisé.` },
        { label: `Plus de ${m(SWP.priceYearly)} économisés`, big: `> ${m(SWP.priceYearly)}`, p: 'June est rentabilisée, et c’est <strong>vous</strong> qui gardez la différence.' },
        { label: `${m(SWP.priceYearly)} ou moins économisés`, big: `${m(G.amount)} rendus`, accent: true, p: `Vous récupérez <strong>${m(G.amount)}</strong>.` },
      ],
      terms: 'Lire les conditions', more: 'Comment fonctionne la garantie de gain',
    },
    sticky: nl
      ? { strong: '4,3/5 op Google', sub: `${facts.socialProof.customers.display.nl} · vrijblijvend` }
      : { strong: '4,3/5 sur Google', sub: `${facts.socialProof.customers.display.fr} · sans engagement` },
    finalCta: nl
      ? { h2: 'Kort samengevat.', points: [
          'June is geen leverancier en kiest je contract op basis van jouw verbruik.',
          `We vergelijken ${facts.suppliers.count.display.nl}, minstens elke maand, voor jouw verbruik.`,
          'We wisselen automatisch, of pas na jouw akkoord.',
          `Winstgarantie (Switch Plus): ${m(G.amount)} terug als je niet meer bespaart dan je abonnement kost.`,
        ] }
      : { h2: 'En bref.', points: [
          'June n’est pas un fournisseur et choisit votre contrat sur la base de votre consommation.',
          `Nous comparons ${facts.suppliers.count.display.fr}, au moins une fois par mois, pour votre consommation.`,
          'Nous changeons automatiquement, ou seulement après votre accord.',
          `Garantie de gain (Switch Plus) : ${m(G.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement.`,
        ] },
  };
});

// Home copy for concept B (NL je-form, FR vous-form, FR written natively).
// Every number, price, plan feature and FAQ answer is bound from shared/content/facts.json.
import facts from '@shared/content/facts.json';
import type { Locale } from '../lib/estimate';

const L = (l: Locale) => (l === 'fr-be' ? 'fr' : 'nl') as 'nl' | 'fr';
const NNBSP = ' ';
const plan = (slug: string) => facts.plans.find(p => p.slug === slug)!;
const faq = (id: string) => facts.faq.find(f => f.id === id)!;

export function copy(locale: Locale) {
  const k = L(locale);
  const fr = k === 'fr';
  const sw = plan('switch'), sp = plan('switch-plus'), pr = plan('premium');
  const g = facts.guarantees.winstgarantie;
  const hiw = facts.howItWorks.short;

  return {
    meta: fr
      ? { title: 'June : calculez votre économie d’énergie en 30 secondes', description: 'Calculez en 30 secondes ce que vous pourriez économiser. June compare chaque mois plus de 17 fournisseurs pour votre consommation et gère le changement.' }
      : { title: 'June: bereken je energiebesparing in 30 seconden', description: 'Bereken in 30 seconden wat je kan besparen. June vergelijkt elke maand 17+ energieleveranciers voor jouw verbruik en regelt de volledige overstap.' },

    nav: fr
      ? { how: 'Comment ça marche', prices: 'Prix', reviews: 'Avis', faq: 'FAQ', login: 'Se connecter', cta: 'Calculez votre économie', menu: 'Menu', close: 'Fermer', main: 'Navigation principale', lang: 'Langue', other: { label: 'NL', aria: 'Lees in het Nederlands', lang: 'nl-BE' }, here: { label: 'FR' } }
      : { how: 'Hoe werkt het', prices: 'Prijzen', reviews: 'Reviews', faq: 'FAQ', login: 'Inloggen', cta: 'Bereken je besparing', menu: 'Menu', close: 'Sluiten', main: 'Hoofdnavigatie', lang: 'Taal', other: { label: 'FR', aria: 'Lire en français', lang: 'fr-BE' }, here: { label: 'NL' } },

    hero: {
      proof: fr ? `4,3/5 sur Google · plus de 20${NNBSP}000 clients` : '4,3/5 op Google · 20.000+ klanten',
      starsLabel: fr ? '4,3 sur 5 étoiles' : '4,3 op 5 sterren',
      h1a: fr ? `Combien payez-vous en trop${NNBSP}?` : 'Hoeveel betaal jij te veel?',
      h1b: fr ? 'Calculez-le en 30 secondes.' : 'Reken het uit in 30 seconden.',
      sub: fr
        ? 'June n’est pas un fournisseur. Chaque mois, nous comparons les contrats de plus de 17 fournisseurs selon votre consommation, et nous gérons le changement. Votre électricité et votre gaz continuent d’arriver normalement.'
        : 'June is geen leverancier. We vergelijken elke maand de contracten van 17+ leveranciers voor jouw verbruik en regelen de overstap. Je stroom en gas blijven gewoon lopen.',
      trust: fr
        ? [
            { icon: 'shield', text: 'Garantie de gain : 99 € remboursés si vous n’économisez pas plus que votre abonnement', fn: 4 },
            { icon: 'plug', text: 'Aucune coupure, même compteur' },
            { icon: 'check', text: 'Pas d’indemnité de rupture chez votre fournisseur' },
            { icon: 'hand', text: 'Automatiquement, ou après votre accord' },
          ]
        : [
            { icon: 'shield', text: 'Winstgarantie: € 99 terug als je niet meer bespaart dan je abonnement', fn: 4 },
            { icon: 'plug', text: 'Geen onderbreking, zelfde meter' },
            { icon: 'check', text: 'Geen verbrekingsvergoeding bij je leverancier' },
            { icon: 'hand', text: 'Automatisch, of na jouw akkoord' },
          ],
    },

    calc: fr
      ? {
          legend: 'Calculez votre économie',
          step: ['Code postal', 'Type de logement', 'Que voulez-vous comparer ?'],
          postcodeHelp: 'Les frais de réseau varient selon la région.',
          postcodeError: 'Encodez un code postal belge (4 chiffres).',
          regions: { vl: 'Flandre', wa: 'Wallonie', bxl: 'Bruxelles' },
          housing: { apartment: 'Appartement', terraced: 'Mitoyenne', semi: '3 façades', detached: '4 façades' },
          energy: { elec: 'Électricité', both: 'Électricité + gaz' },
          know: 'Je connais ma consommation',
          knowHelp: 'Vous la trouvez sur votre facture de régularisation.',
          elecKwh: 'Électricité', gasKwh: 'Gaz', unit: 'kWh par an',
          submit: 'Calculez votre économie',
          micro: 'Gratuit et sans engagement · Aucune donnée personnelle',
          noscript: 'Votre estimation personnelle s’affiche à l’étape suivante.',
        }
      : {
          legend: 'Bereken je besparing',
          step: ['Postcode', 'Type woning', 'Wat wil je vergelijken?'],
          postcodeHelp: 'Netkosten verschillen per regio.',
          postcodeError: 'Vul een Belgische postcode in (4 cijfers).',
          regions: { vl: 'Vlaanderen', wa: 'Wallonië', bxl: 'Brussel' },
          housing: { apartment: 'Appartement', terraced: 'Rijwoning', semi: 'Halfopen', detached: 'Open bebouwing' },
          energy: { elec: 'Elektriciteit', both: 'Elektriciteit + gas' },
          know: 'Ik ken mijn verbruik',
          knowHelp: 'Je vindt het op je jaarafrekening.',
          elecKwh: 'Elektriciteit', gasKwh: 'Gas', unit: 'kWh per jaar',
          submit: 'Bereken je besparing',
          micro: 'Gratis en vrijblijvend · Geen persoonsgegevens nodig',
          noscript: 'Je persoonlijke schatting zie je in de volgende stap.',
        },

    result: fr
      ? {
          label: 'Votre économie estimée',
          example: 'Exemple',
          illustrative: 'Indicatif · illustratif',
          per: 'par an, après votre abonnement',
          elec: 'Électricité', gas: 'Gaz', fee: 'Abonnement Switch Plus',
          barFee: 'Abonnement', barYou: 'Pour vous',
          lowTitle: 'Vous êtes déjà bien placé.',
          lowBody: 'June veille à ce que ça dure. Nous comparons chaque mois, et avec la garantie de gain, vous récupérez 99 € si vous n’économisez pas plus que votre abonnement.',
          recommended: 'Recommandé pour vous',
          planPrice: '99 € par an · 8,25 € par mois, facturé annuellement',
          planNote: 'Avec garantie de gain',
          cta: 'Commencer avec June',
          after: 'Après votre inscription, nous calculons votre économie personnelle.',
          method: 'Comment calculons-nous ?',
          methodTitle: 'Notre calcul, en clair',
          methodItems: [
            'Consommation : une moyenne pour votre type de logement, ou vos propres chiffres.',
            'Écart de prix : entre un contrat jamais changé et le contrat le plus avantageux parmi ceux que nous comparons. Nous calculons avec une marge (0,03 à 0,06 € par kWh d’électricité, 0,008 à 0,016 € par kWh de gaz), d’où une fourchette.',
            'Moins votre abonnement : Switch Plus (99 € par an) est déjà déduit.',
            'Votre économie personnelle est calculée après l’inscription, sur la base de votre consommation et de votre contrat réels.',
          ],
          methodNote: 'Modèle illustratif, pas encore validé par June.',
          methodLink: 'En savoir plus sur la méthode',
          live: (range: string, housing: string, energy: string) => `Économie estimée : ${range} par an après l’abonnement, pour ${housing}, ${energy}.`,
          liveLow: 'Vous êtes déjà bien placé. Économie estimée faible après l’abonnement.',
          sticky: 'par an, estimation',
        }
      : {
          label: 'Jouw geschatte besparing',
          example: 'Voorbeeld',
          illustrative: 'Indicatief · illustratief',
          per: 'per jaar, na je abonnement',
          elec: 'Elektriciteit', gas: 'Gas', fee: 'Abonnement Switch Plus',
          barFee: 'Abonnement', barYou: 'Voor jou',
          lowTitle: 'Je zit al goed.',
          lowBody: 'June houdt het zo. We blijven elke maand vergelijken, en met de Winstgarantie krijg je € 99 terug als je niet meer bespaart dan je abonnement.',
          recommended: 'Aanbevolen voor jou',
          planPrice: '€ 99 per jaar · € 8,25 per maand, jaarlijks gefactureerd',
          planNote: 'Met Winstgarantie',
          cta: 'Start met June',
          after: 'Na je aanmelding berekenen we je persoonlijke besparing.',
          method: 'Hoe berekenen we dit?',
          methodTitle: 'Zo rekenen we',
          methodItems: [
            'Verbruik: een gemiddelde voor je type woning, of je eigen cijfers.',
            'Prijsverschil: tussen een contract waar je nooit van wisselde en het voordeligste contract uit onze vergelijking. We rekenen met een marge (€ 0,03 tot 0,06 per kWh stroom, € 0,008 tot 0,016 per kWh gas), daarom een bereik.',
            'Min je abonnement: Switch Plus (€ 99 per jaar) is er al af.',
            'Je persoonlijke besparing berekenen we na je aanmelding, op basis van je echte verbruik en contract.',
          ],
          methodNote: 'Illustratief model, nog niet gevalideerd door June.',
          methodLink: 'Meer over de methode',
          live: (range: string, housing: string, energy: string) => `Geschatte besparing: ${range} per jaar na je abonnement, voor ${housing}, ${energy}.`,
          liveLow: 'Je zit al goed. Geschatte besparing na je abonnement is klein.',
          sticky: 'per jaar, schatting',
        },

    proof: [
      { value: fr ? `20${NNBSP}000+` : '20.000+', label: fr ? 'clients' : 'klanten', fn: 3 },
      { value: '4,3/5', label: fr ? 'sur Google, plus de 1 200 avis' : 'op Google, 1.200+ reviews', fn: 2, stars: true },
      { value: fr ? '326 €' : '€ 326', label: fr ? 'd’économie en moyenne par an' : 'gemiddelde besparing per jaar', fn: 1 },
      { value: '17+', label: fr ? 'fournisseurs comparés chaque mois' : 'leveranciers, elke maand vergeleken' },
    ],

    method: fr
      ? {
          eyebrow: 'D’où vient votre chiffre', h2: 'Pas de tour de magie. Juste un calcul.',
          intro: 'Votre économie, c’est l’écart entre votre contrat actuel et le contrat le plus avantageux parmi ceux que nous comparons, moins ce que coûte June. Nous vous le montrons tel quel.',
          terms: [
            { k: 'Votre consommation', v: 'Via votre compteur ou votre facture' },
            { k: 'L’écart de prix', v: 'Votre contrat face à plus de 17 fournisseurs' },
            { k: 'Votre abonnement', v: '99 € par an avec Switch Plus' },
            { k: 'Ce qui vous reste', v: 'Revérifié chaque mois' },
          ],
          stepsTitle: 'Ensuite, June s’occupe de tout',
          suppliers: facts.suppliers.headline.fr + ' Dont Aspiravi, Antargaz, Octa+, DATS 24 et Wase Wind.',
          more: 'En savoir plus sur le fonctionnement de June',
        }
      : {
          eyebrow: 'Hoe we aan jouw getal komen', h2: 'Geen trucs. Gewoon rekenen.',
          intro: 'Je besparing is het verschil tussen je huidige contract en het voordeligste contract uit onze vergelijking, min wat June kost. Zo rekenen we, en zo tonen we het ook.',
          terms: [
            { k: 'Jouw verbruik', v: 'Uit je meter of je afrekening' },
            { k: 'Het prijsverschil', v: 'Jouw contract naast 17+ leveranciers' },
            { k: 'Je abonnement', v: '€ 99 per jaar met Switch Plus' },
            { k: 'Wat jij overhoudt', v: 'Elke maand opnieuw bekeken' },
          ],
          stepsTitle: 'Daarna doet June het werk',
          suppliers: facts.suppliers.headline.nl + ' Waaronder Aspiravi, Antargaz, Octa+, DATS 24 en Wase Wind.',
          more: 'Meer over hoe June werkt',
        },
    steps: hiw.map(s => ({ n: s.n, title: s.title[k], body: s.body[k] })),

    plans: {
      eyebrow: fr ? 'Ce que coûte June' : 'Wat June kost',
      h2: fr ? 'Un prix annuel. Pas de surprise.' : 'Eén jaarprijs. Geen verrassingen.',
      intro: fr ? 'Vous payez June une fois par an. Votre énergie, vous la payez normalement à votre fournisseur.' : 'Je betaalt June één keer per jaar. Je energie betaal je gewoon aan je leverancier.',
      perYear: fr ? 'par an' : 'per jaar',
      badge: fr ? 'Recommandé · avec garantie de gain' : 'Aanbevolen · met Winstgarantie',
      example: fr
        ? { t: 'Exemple', b: 'Vous économisez 80 € sur votre année d’abonnement. Ce n’est pas plus que 99 € : vous récupérez 99 €.' }
        : { t: 'Voorbeeld', b: 'Je bespaart € 80 in je abonnementsjaar. Dat is niet meer dan € 99, dus je krijgt € 99 terug.' },
      conditions: fr ? 'Conditions de la garantie' : 'Voorwaarden winstgarantie',
      requirement: pr.requirements[k],
      footnote: fr ? 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.' : 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
      compare: fr ? 'Comparer les abonnements' : 'Vergelijk de abonnementen',
      cards: [
        { slug: sw.slug, name: sw.shortName, yearly: sw.priceYearly, sub: sw.priceDisplay[k].main + ', ' + (fr ? 'facturé annuellement' : 'jaarlijks gefactureerd'), who: sw.whoFor[k], features: [sw.features[0], sw.features[1], sw.features[2]].map(f => f[k]), cta: fr ? 'Choisir Switch' : 'Kies Switch', rec: false },
        { slug: sp.slug, name: sp.shortName, yearly: sp.priceYearly, sub: sp.priceDisplay[k].main + ', ' + (fr ? 'facturé annuellement' : 'jaarlijks gefactureerd'), who: sp.whoFor[k], features: sp.features.map(f => f[k]), cta: fr ? 'Choisir Switch Plus' : 'Kies Switch Plus', rec: true },
        { slug: pr.slug, name: pr.shortName, yearly: pr.priceYearly, sub: pr.priceDisplay[k].main + ', ' + (fr ? 'facturé annuellement, dongle inclus' : 'jaarlijks gefactureerd, dongle inbegrepen'), who: pr.whoFor[k], features: [pr.features[0], pr.features[1], pr.features[2], pr.features[3]].map(f => f[k]), cta: fr ? 'Choisir Premium' : 'Kies Premium', rec: false },
      ],
    },

    trust: fr
      ? {
          eyebrow: 'Avis et transparence', h2: 'De votre côté. Pas de celui du fournisseur.',
          ratingLine: 'sur Google · plus de 1 200 avis',
          reviewsLabel: 'Extraits de nos avis Google',
          reviewSlot: 'Avis Google réel à venir : texte verbatim, prénom et date.',
          points: [
            { t: 'Pas un fournisseur', b: 'June ne fournit ni électricité ni gaz. Nous choisissons votre contrat sur la base de votre consommation.' },
            { t: 'Comment nous gagnons notre vie', b: 'June vit des abonnements de ses clients. Vous payez un prix annuel fixe, affiché ci-dessus.', flag: 'à confirmer' },
            { t: 'Vous gardez le contrôle', b: 'Changement automatique, ou après votre accord. C’est vous qui choisissez.' },
          ],
          photoAlt: 'Placeholder : photo d’une maison belge (à venir)',
        }
      : {
          eyebrow: 'Reviews en transparantie', h2: 'Aan jouw kant. Niet aan die van de leverancier.',
          ratingLine: 'op Google · 1.200+ reviews',
          reviewsLabel: 'Uit onze Google-reviews',
          reviewSlot: 'Echte Google-review volgt: tekst letterlijk, voornaam en datum.',
          points: [
            { t: 'Geen leverancier', b: 'June levert zelf geen stroom of gas. We kiezen je contract op basis van jouw verbruik.' },
            { t: 'Hoe we geld verdienen', b: 'June leeft van de abonnementen van haar klanten. Je betaalt een vaste jaarprijs, die je hierboven ziet.', flag: 'te bevestigen' },
            { t: 'Jij houdt de controle', b: 'Automatisch wisselen, of na jouw akkoord. Jij kiest.' },
          ],
          photoAlt: 'Placeholder: foto van een Belgische woning (volgt)',
        },

    faq: {
      eyebrow: fr ? 'Questions fréquentes' : 'Veelgestelde vragen',
      h2: fr ? 'Ce que vous vous demandez peut-être' : 'Wat je je nu misschien afvraagt',
      items: ['not-a-supplier', 'no-interruption', 'exit-fee', 'approval', 'meters'].map(id => ({ id, q: faq(id).q[k], a: faq(id).a[k] })),
      more: fr ? 'Toutes les questions' : 'Alle vragen',
    },

    final: fr
      ? { h2: 'Trente secondes, et vous savez.', body: 'Code postal, type de logement, énergie. C’est tout.', cta: 'Calculez votre économie' }
      : { h2: 'Dertig seconden, en je weet het.', body: 'Postcode, type woning, energie. Meer hoeft niet.', cta: 'Bereken je besparing' },

    footer: fr
      ? {
          tagline: 'June suit le marché de l’énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.',
          mission: facts.brand.mission.fr, sign: 'À vous le pouvoir, à nous le travail.',
          colJune: 'June', colStart: 'Commencer', signup: 'Commencer mon inscription',
          notes: [
            facts.saving.averagePerYear.footnote.fr,
            'Note Google et nombre d’avis en mars 2026.',
            'Nombre de clients en mars 2026.',
            'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.',
            'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
            'Estimation indicative et illustrative, calculée dans votre navigateur à partir de moyennes (type de logement ou kWh encodés) et d’un écart de prix supposé. Ce n’est pas une offre. Votre économie réelle, nous la calculons après l’inscription, avec vos propres données de consommation et votre contrat actuel. Modèle à valider par June.',
          ],
          legal: '© 2026 June Energy', kbo: 'numéro BCE à venir',
          colHelp: 'Aide', colAbout: 'À propos de June', guaranteeTerms: 'Conditions de la garantie de gain', earn: 'Comment June gagne sa vie', premium: 'Premium et June Dongle', reviews: 'Avis Google', contact: 'Contact (à venir)', rating: '4,3/5 sur Google · plus de 1 200 avis',
          regulators: 'Le marché de l’énergie est contrôlé par la CWaPE (Wallonie), Brugel (Bruxelles), la VREG (Flandre) et la CREG (fédéral). Cette mention n’implique aucune approbation de June.',
        }
      : {
          tagline: 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.',
          mission: facts.brand.mission.nl, sign: 'Jij de power, wij het werk.',
          colJune: 'June', colStart: 'Starten', signup: 'Start je aanmelding',
          notes: [
            facts.saving.averagePerYear.footnote.nl,
            'Google-score en aantal reviews op maart 2026.',
            'Aantal klanten op maart 2026.',
            'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.',
            'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.',
            'Indicatieve, illustratieve schatting, berekend in je browser op basis van gemiddelden (type woning of je ingevulde kWh) en een verondersteld prijsverschil. Dit is geen aanbod. Je echte besparing berekenen we na je aanmelding, met je eigen verbruiksgegevens en je huidige contract. Model nog te valideren door June.',
          ],
          legal: '© 2026 June Energy', kbo: 'KBO-nummer volgt',
          colHelp: 'Hulp', colAbout: 'Over June', guaranteeTerms: 'Voorwaarden Winstgarantie', earn: 'Hoe June geld verdient', premium: 'Premium en June Dongle', reviews: 'Google-reviews', contact: 'Contact (volgt)', rating: '4,3/5 op Google · 1.200+ reviews',
          regulators: 'De energiemarkt staat onder toezicht van de VREG (Vlaanderen), CWaPE (Wallonië), Brugel (Brussel) en CREG (federaal). Dat is geen goedkeuring van June.',
        },
    sticky: { proof: fr ? `4,3 · plus de 20${NNBSP}000 clients` : '4,3 · 20.000+ klanten' },
    guarantee: g.name[k],
  };
}
export type Copy = ReturnType<typeof copy>;

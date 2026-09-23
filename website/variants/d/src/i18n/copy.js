// Variant D copy. Every number, price, guarantee and FAQ answer is bound to
// @shared/content/facts.json; only headlines, eyebrows and microcopy are variant-specific.
import facts from '@shared/content/facts.json';

const L = { 'nl-be': 'nl', 'fr-be': 'fr' };
const pick = (o, loc) => o?.[L[loc]];
const faqById = id => facts.faq.find(f => f.id === id);
const plan = slug => facts.plans.find(p => p.slug === slug);

/** Money: NL "€ 69" / "€ 5,75", FR "69 €" / "5,75 €" (freeze §1). */
export const money = (v, loc) => {
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',');
  return loc === 'fr-be' ? `${s} €` : `€ ${s}`;
};

export function copy(loc) {
  const nl = loc === 'nl-be';
  const g = facts.guarantees.winstgarantie;
  const plans = ['switch', 'switch-plus', 'premium'].map(slug => {
    const p = plan(slug);
    return {
      slug, name: p.shortName,
      tagline: pick(p.valueProposition, loc),
      whoFor: pick(p.whoFor, loc),
      yearly: money(p.priceYearly, loc),
      monthly: money(p.priceMonthly, loc),
      features: p.features.map(f => pick(f, loc)),
    };
  });
  // Premium on the home page: confirmed features only (peak/budget/advice stay behind a flag, freeze §2.2).
  plans[2].features = plans[2].features.slice(0, 4);

  return {
    loc, nl,
    skip: nl ? 'Naar de inhoud' : 'Aller au contenu',
    meta: {
      title: nl ? 'June: zie wat je huis verbruikt, wij zorgen voor een voordelig contract' : 'June : voyez ce que consomme votre maison, nous veillons à un contrat avantageux',
      description: nl
        ? 'June vergelijkt elke maand de contracten van 17+ energieleveranciers voor jouw verbruik en regelt de overstap. Met Premium en de June Dongle zie je je verbruik live.'
        : 'Chaque mois, June compare les contrats de plus de 17 fournisseurs pour votre consommation et gère le changement. Avec Premium et le June Dongle, suivez votre consommation en direct.',
    },
    nav: {
      label: nl ? 'Hoofdmenu' : 'Menu principal',
      items: nl
        ? [['#hoe-werkt-het', 'Hoe werkt het'], ['#prijzen', 'Prijzen'], ['#reviews', 'Reviews'], ['#faq', 'FAQ']]
        : [['#hoe-werkt-het', 'Comment ça marche'], ['#prijzen', 'Prix'], ['#reviews', 'Avis'], ['#faq', 'FAQ']],
      menu: 'Menu',
      login: pick(facts.brand.login.label, loc),
      loginNote: nl ? '(opent klantenportaal)' : '(ouvre l’espace client)',
      langLabel: nl ? 'FR' : 'NL',
      langAria: nl ? 'Lire en français' : 'Lees in het Nederlands',
      langHtml: nl ? 'fr-BE' : 'nl-BE',
      cta: nl ? 'Bereken je besparing' : 'Calculez votre économie',
    },
    hero: {
      chip: nl ? 'Live via de June Dongle · per kwartier' : 'En direct via le June Dongle · par quart d’heure',
      h1a: nl ? 'Zie wat je huis verbruikt.' : 'Voyez ce que consomme votre maison.',
      h1b: nl ? 'June zorgt voor de beste prijs.' : 'June s’occupe du meilleur prix.',
      sub: nl
        ? 'June is geen energieleverancier. Elke maand vergelijken we de contracten van 17+ leveranciers voor jouw verbruik en wisselen we automatisch, of pas na jouw akkoord. Klanten besparen gemiddeld € 326 per jaar.'
        : 'June n’est pas un fournisseur d’énergie. Chaque mois, nous comparons les contrats de plus de 17 fournisseurs selon votre consommation et changeons automatiquement, ou seulement après votre accord. Nos clients économisent en moyenne 326\u00a0€ par an.',
      micro: nl
        ? [`Vanaf ${money(69, loc)} per jaar (${money(5.75, loc)}/maand)`, 'Je stroom en gas blijven gewoon lopen']
        : [`À partir de ${money(69, loc)} par an (${money(5.75, loc)}/mois)`, 'Votre électricité et votre gaz continuent d’arriver'],
      premium: nl ? 'Bekijk Premium' : 'Voir Premium',
      analog: nl ? 'Analoge meter? Start met Switch Plus' : 'Compteur analogique ? Commencez avec Switch Plus',
    },
    form: {
      label: nl ? 'Je postcode' : 'Votre code postal',
      hint: nl ? 'Zo kennen we je netbeheerder.' : 'Pour connaître votre gestionnaire de réseau.',
      placeholder: nl ? 'bv. 9000' : 'ex. 1300',
      error: nl ? 'Vul een Belgische postcode in (4 cijfers).' : 'Indiquez un code postal belge (4 chiffres).',
      cta: nl ? 'Bereken je besparing' : 'Calculez votre économie',
    },
    trust: {
      rating: pick(facts.socialProof.googleRating.display, loc),
      ratingAria: nl ? '4,3 van 5 sterren op Google' : '4,3 étoiles sur 5 sur Google',
      customers: pick(facts.socialProof.customers.display, loc),
      guarantee: pick(g.name, loc),
      notSupplier: nl ? 'Geen leverancier' : 'Pas un fournisseur',
    },
    stage: {
      caption: nl
        ? 'Voorbeeldscherm met illustratieve gegevens. Dongle: placeholder-illustratie.'
        : 'Écran d’exemple avec données illustratives. Dongle : illustration provisoire (placeholder).',
      alt: nl
        ? 'Illustratie: de June Insights-app op een laptop en een gsm. Ze toont het verbruik van een woning per kwartier, wat de zonnepanelen vandaag opwekten en de status van het energiecontract. Ernaast de June Dongle, die op de P1-poort van de digitale meter aansluit.'
        : 'Illustration : l’app June Insights sur un ordinateur portable et un GSM. Elle montre la consommation d’un logement par quart d’heure, la production solaire du jour et le statut du contrat d’énergie. À côté, le June Dongle, qui se branche sur le port P1 du compteur numérique.',
      pause: nl ? 'Pauzeer animatie' : 'Mettre l’animation en pause',
      play: nl ? 'Speel animatie af' : 'Relancer l’animation',
    },
    app: nl ? {
      product: 'Inzichten', updated: 'Bijgewerkt 20:00', tabs: ['Overzicht', 'Zon', 'Contract'],
      tabsWide: ['Overzicht', 'Vergelijk', 'Zon', 'Verdeling', 'Contract'],
      today: 'Vandaag · elektriciteit', used: 'Verbruik tot nu', perQ: 'kWh per kwartier', now: 'Nu',
      live: 'Live', lastQ: 'Laatste kwartier', lastQv: '0,95 kWh', lastQt: '14:30–14:45',
      solarTitle: 'Zon vandaag', made: 'Opgewekt', exported: 'Geïnjecteerd', self: 'zelf verbruikt',
      home: 'Huis', grid: 'Net', panels: 'Panelen', imported: 'Afgenomen',
      contract: 'Mijn contract', active: 'Actief', compared: '17+ leveranciers vergeleken', monthly: 'Elke maand', mode: 'Wisselen', auto: 'Automatisch', ask: 'Na mijn akkoord',
      status: 'Je contract is gecontroleerd', next: 'Volgende vergelijking: volgende maand', example: 'Voorbeeld',
      guarantee: 'Winstgarantie', guaranteeV: '€ 99 terug',
    } : {
      product: 'Insights', updated: 'Mis à jour 20:00', tabs: ['Aperçu', 'Solaire', 'Contrat'],
      tabsWide: ['Aperçu', 'Comparer', 'Solaire', 'Répartition', 'Contrat'],
      today: 'Aujourd’hui · électricité', used: 'Consommation jusqu’ici', perQ: 'kWh par quart d’heure', now: 'Maintenant',
      live: 'Direct', lastQ: 'Dernier quart d’heure', lastQv: '0,95 kWh', lastQt: '14:30–14:45',
      solarTitle: 'Solaire aujourd’hui', made: 'Produit', exported: 'Injecté', self: 'autoconsommé',
      home: 'Maison', grid: 'Réseau', panels: 'Panneaux', imported: 'Prélevé',
      contract: 'Mon contrat', active: 'Actif', compared: '17+ fournisseurs comparés', monthly: 'Chaque mois', mode: 'Changement', auto: 'Automatique', ask: 'Après mon accord',
      status: 'Votre contrat a été vérifié', next: 'Prochaine comparaison : le mois prochain', example: 'Exemple',
      guarantee: 'Garantie de gain', guaranteeV: '99 € remboursés',
    },
    features: {
      eyebrow: nl ? 'Hoe werkt het?' : 'Comment ça marche ?',
      h2: nl ? 'June doet het werk. Jij ziet wat er gebeurt.' : 'June fait le travail. Vous voyez ce qui se passe.',
      intro: nl
        ? 'Wisselen zit in elk abonnement. Met Premium en de June Dongle zie je ook live wat je huis verbruikt en wat je zonnepanelen opleveren.'
        : 'Le changement de fournisseur est compris dans chaque abonnement. Avec Premium et le June Dongle, vous voyez aussi en direct ce que consomme votre maison et ce que produisent vos panneaux.',
      rows: [
        {
          id: 'wisselen', tag: nl ? 'Alle abonnementen' : 'Tous les abonnements', n: '01',
          h3: nl ? 'Elke maand de markt gecheckt. Wij regelen de overstap.' : 'Le marché vérifié chaque mois. Nous gérons le changement.',
          steps: facts.howItWorks.short.map(s => ({ t: pick(s.title, loc), b: pick(s.body, loc) })),
          chips: nl ? ['Zelfde meter', 'Geen onderbreking', 'Geen opzegvergoeding'] : ['Même compteur', 'Aucune interruption', 'Pas d’indemnité de rupture'],
        },
        {
          id: 'live', tag: 'Premium', n: '02',
          h3: nl ? 'Live verbruik, je historiek per kwartier.' : 'Votre consommation en direct, votre historique par quart d’heure.',
          body: nl
            ? 'De June Dongle steek je in de P1-poort van je digitale meter. Hij stuurt je verbruik en injectie live door. In de app zie je per kwartier wanneer je huis het meest verbruikt.'
            : 'Le June Dongle se branche sur le port P1 de votre compteur numérique. Il transmet en direct votre consommation et votre injection. Dans l’app, vous voyez par quart d’heure quand votre maison consomme le plus.',
          note: nl
            ? 'June Dongle inbegrepen in je Premium-abonnement. Nodig: een digitale meter met geactiveerde P1-poort en wifi bij je meter.'
            : 'June Dongle compris dans votre abonnement Premium. Requis : un compteur numérique avec port P1 activé et du Wi-Fi à proximité du compteur.',
        },
        {
          id: 'zon', tag: 'Premium', n: '03',
          h3: nl ? 'Zie wat je zelf verbruikt en wat je injecteert.' : 'Voyez ce que vous autoconsommez et ce que vous injectez.',
          body: nl
            ? 'Of je zonnepanelen hebt, hoort bij je echte verbruiksprofiel: de basis van elke vergelijking. Met Premium volg je ook dag per dag hoeveel zonnestroom je zelf gebruikt.'
            : 'Vos panneaux solaires font partie de votre vrai profil de consommation : la base de chaque comparaison. Avec Premium, vous suivez aussi jour après jour la part d’électricité solaire que vous utilisez vous-même.',
        },
      ],
    },
    plans: {
      eyebrow: nl ? 'Prijzen' : 'Prix',
      h2: nl ? 'Kies hoeveel June voor je doet' : 'Choisissez ce que June fait pour vous',
      intro: nl ? 'Drie abonnementen, één jaarprijs. Wisselen doet June in elk abonnement.' : 'Trois abonnements, un prix annuel. Le changement de fournisseur est compris dans chacun.',
      legend: nl ? 'Welke meter heb je?' : 'Quel compteur avez-vous ?',
      meters: nl
        ? [['unknown', 'Weet ik niet'], ['analog', 'Analoog'], ['digital', 'Digitaal'], ['solar', 'Digitaal + zonnepanelen']]
        : [['unknown', 'Je ne sais pas'], ['analog', 'Analogique'], ['digital', 'Numérique'], ['solar', 'Numérique + panneaux solaires']],
      meterHelp: nl ? 'We tonen welk abonnement het best past. Je kiest altijd zelf.' : 'Nous indiquons l’abonnement le plus adapté. Vous choisissez toujours vous-même.',
      recommended: nl ? 'Aanbevolen · met Winstgarantie' : 'Recommandé · avec garantie de gain',
      premiumFit: nl ? 'Past bij je zonnepanelen' : 'Idéal avec des panneaux solaires',
      premiumDigital: nl ? 'Kan met je digitale meter' : 'Possible avec votre compteur numérique',
      premiumAnalog: nl ? 'Premium vraagt een digitale meter. Switch en Switch Plus werken ook met een analoge meter.' : 'Premium nécessite un compteur numérique. Switch et Switch Plus fonctionnent aussi avec un compteur analogique.',
      perYear: nl ? 'per jaar' : 'par an',
      perMonth: m => nl ? `= ${m} per maand, jaarlijks gefactureerd` : `soit ${m} par mois, facturé annuellement`,
      dongle: nl ? 'June Dongle inbegrepen' : 'June Dongle inclus',
      choose: n => nl ? `Kies ${n}` : `Choisir ${n}`,
      guaranteeLine: pick(g.summary, loc),
      terms: pick(g.terms.conditions, loc),
      vat: nl ? 'Alle prijzen incl. 21% btw. Je energieverbruik betaal je aan je leverancier.' : 'Tous les prix TVA 21 % comprise. Votre consommation d’énergie est facturée par votre fournisseur.',
      list: plans,
    },
    proof: {
      eyebrow: nl ? 'Reviews en zekerheid' : 'Avis et garanties',
      h2: pick(facts.socialProof.customers.long, loc),
      ratingBig: '4,3',
      ratingOf: nl ? 'op 5 · Google' : 'sur 5 · Google',
      ratingSub: nl ? '1.200+ reviews' : 'plus de 1 200 avis',
      reviewsPlaceholder: nl
        ? 'Hier komen echte Google-reviews, letterlijk, met voornaam en datum.'
        : 'Ici, de vrais avis Google, mot pour mot, avec prénom et date.',
      reviewsLabel: nl ? 'Uit onze Google-reviews' : 'Extraits de nos avis Google',
      cards: [
        { icon: 'building', t: nl ? 'Geen leverancier' : 'Pas un fournisseur', b: nl ? 'June is geen energieleverancier en kiest je contract op basis van jouw verbruik.' : 'June n’est pas fournisseur d’énergie et choisit votre contrat sur la base de votre consommation.' },
        { icon: 'shield', t: pick(g.name, loc), b: pick(g.summary, loc) },
        { icon: 'plug', t: nl ? 'Niets verandert aan je aansluiting' : 'Rien ne change à votre raccordement', b: pick(faqById('no-interruption').a, loc).replace(/^(Nee|Non)\.\s*/, '') },
        { icon: 'lock', t: nl ? 'Jouw gegevens' : 'Vos données', b: pick(faqById('data').a, loc) },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      h2: nl ? 'Veelgestelde vragen' : 'Questions fréquentes',
      items: ['not-a-supplier', 'meters', 'approval', 'exit-fee', 'cost'].map(id => ({ id, q: pick(faqById(id).q, loc), a: pick(faqById(id).a, loc) })),
    },
    closing: {
      h2: nl ? 'Klaar om minder te betalen voor je energie?' : 'Prêt à payer moins pour votre énergie ?',
      body: nl ? 'Aanmelden duurt twee minuten. Je postcode en je e-mailadres volstaan om te starten.' : 'L’inscription prend deux minutes. Votre code postal et votre adresse e-mail suffisent pour commencer.',
    },
    sticky: { proof: nl ? '4,3/5 Google · 20.000+ klanten' : '4,3/5 Google · 20\u202f000+ clients' },
    footer: {
      tagline: nl ? 'Jij de power, wij het werk.' : 'À vous le pouvoir, à nous le travail.',
      about: nl ? 'June volgt de energiemarkt voor jou op en laat je automatisch overstappen naar een voordeliger contract.' : 'June suit le marché de l’énergie pour vous et vous fait passer automatiquement à un contrat plus avantageux.',
      mission: pick(facts.brand.mission, loc),
      navLabel: nl ? 'Voettekst' : 'Pied de page',
      legal: nl ? ['Algemene voorwaarden', 'Privacy', 'Cookies', 'Contact'] : ['Conditions générales', 'Confidentialité', 'Cookies', 'Contact'],
      legalNote: nl ? '(pagina’s volgen in de volgende fase)' : '(pages prévues à la phase suivante)',
      copyright: nl ? '© 2026 June Energy · [KBO-nummer]' : '© 2026 June Energy · [numéro BCE]',
      notesTitle: nl ? 'Voetnoten' : 'Notes',
      notes: [
        pick(facts.saving.averagePerYear.footnote, loc),
        nl ? 'Google-score en aantal reviews op maart 2026.' : 'Note Google et nombre d’avis au mois de mars 2026.',
        nl ? 'Aantal klanten op maart 2026.' : 'Nombre de clients au mois de mars 2026.',
        nl ? 'Winstgarantie bij Switch Plus en Premium. Voorwaarden in onze algemene voorwaarden.' : 'Garantie de gain avec Switch Plus et Premium. Conditions dans nos conditions générales.',
      ],
    },
  };
}

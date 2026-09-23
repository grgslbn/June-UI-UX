// Variant C "Honest Market" — copy for Abonnementen, Switch Plus, Hoe werkt het, FAQ (NL + FR).
// Facts (prices, guarantee, FAQ answers, steps) come from facts.json; headlines/microcopy are variant C's voice.
import { facts, SW, SWP, PREM, G, faqById, localise, siteCopy } from './site.js';

// FAQ answers that still contain [placeholders] in facts.json get honest interim wording + a "to be confirmed" tag.
const interim = {
  cancel: {
    nl: 'Ja. De precieze opzeg- en verlengingsregels van je June-abonnement bevestigen we vóór livegang en zetten we dan hier. Wat al vaststaat: je hebt 14 dagen bedenktijd na je aanmelding. En je energiecontract zelf kan je als particulier altijd opzeggen met een maand opzeg, zonder verbrekingsvergoeding.',
    fr: 'Oui. Les règles précises de résiliation et de reconduction de votre abonnement June seront confirmées avant la mise en ligne et publiées ici. Ce qui est déjà acquis : vous disposez de 14 jours de rétractation après votre inscription. Et votre contrat d’énergie, en tant que particulier, vous pouvez toujours le résilier avec un mois de préavis, sans indemnité de rupture.',
  },
  regions: {
    nl: 'Vul bij het aanmelden je postcode in: dan zie je meteen of June bij jou werkt. In welke regio’s June actief is (Vlaanderen, Brussel, Wallonië), bevestigen we vóór livegang.',
    fr: 'Indiquez votre code postal lors de l’inscription : vous saurez tout de suite si June est disponible chez vous. Les régions desservies (Flandre, Bruxelles, Wallonie) seront confirmées avant la mise en ligne.',
  },
  independence: {
    nl: 'June leeft van de abonnementen van haar klanten. We zijn geen leverancier en kiezen het contract op basis van jouw verbruik. Of June daarnaast vergoedingen van leveranciers ontvangt, bevestigen we vóór livegang en vermelden we hier, met hoe we dan onze neutraliteit bewaken.',
    fr: 'June vit des abonnements de ses clients. Nous ne sommes pas fournisseur et choisissons le contrat sur la base de votre consommation. Si June perçoit en plus des rémunérations de fournisseurs, nous le confirmerons avant la mise en ligne et l’indiquerons ici, avec la manière dont nous préservons notre neutralité.',
  },
};
export const faqItem = (id, L) => {
  const f = faqById(id);
  const pending = interim[id];
  return { id, q: f.q[L], a: pending ? pending[L] : f.a[L], pending: !!pending, fn: id === 'independence' ? 5 : id === 'guarantee' ? 4 : undefined };
};

/* ── Abonnementen / Abonnements ─────────────────────────────── */
const plans = localise((L, m) => {
  const nl = L === 'nl';
  return {
    meta: nl
      ? { title: 'Abonnementen en prijzen | June', description: `Switch ${m(69)}, Switch Plus ${m(99)} of Premium ${m(198)} per jaar, incl. btw. Vergelijk wat June voor je doet, en hoe June haar geld verdient.` }
      : { title: 'Abonnements et prix | June', description: `Switch ${m(69)}, Switch Plus ${m(99)} ou Premium ${m(198)} par an, TVA comprise. Comparez ce que June fait pour vous, et comment June gagne sa vie.` },
    hero: nl
      ? { kicker: 'Abonnementen en prijzen', h1: 'Eén vaste prijs per jaar. Voor het werk dat wij doen.', lead: 'Met elk abonnement volgt June de markt voor je op en regelt ze je overstap. Je betaalt één keer per jaar, incl. btw. Je energie zelf betaal je, zoals nu, aan je leverancier.' }
      : { kicker: 'Abonnements et prix', h1: 'Un prix fixe par an. Pour le travail que nous faisons.', lead: 'Avec chaque abonnement, June suit le marché pour vous et gère votre changement. Vous payez une fois par an, TVA comprise. Votre énergie, vous continuez à la payer à votre fournisseur.' },
    card: nl
      ? { perYear: 'per jaar', perMonth: 'per maand', billed: 'jaarlijks gefactureerd', badge: 'Aanbevolen · met winstgarantie', noGuarantee: 'Zonder winstgarantie', guarantee: `Winstgarantie: ${m(G.amount)} terug als je niet meer bespaart dan je abonnement kost`, needs: 'Vereist: digitale meter met geactiveerde P1-poort', choose: 'Kies', features: 'Wat je krijgt' }
      : { perYear: 'par an', perMonth: 'par mois', billed: 'facturé annuellement', badge: 'Recommandé · avec garantie de gain', noGuarantee: 'Sans garantie de gain', guarantee: `Garantie de gain : ${m(G.amount)} remboursés si vous n’économisez pas plus que le prix de votre abonnement`, needs: 'Requis : compteur numérique avec port P1 activé', choose: 'Choisir', features: 'Ce que vous recevez' },
    helper: nl ? {
      kicker: 'Welk abonnement past bij jou?', h2: 'Drie vragen, drie eerlijke antwoorden.',
      rows: [
        { q: 'Wil je gewoon minder betalen, en neem je zelf het risico dat het een jaar weinig oplevert?', a: 'Switch', slug: 'switch' },
        { q: 'Wil je zeker zijn dat June zichzelf terugverdient? Analoge meter, of weet je het niet?', a: 'Switch Plus', slug: 'switch-plus' },
        { q: 'Heb je een digitale meter en zonnepanelen, en wil je live zien wat je verbruikt en injecteert?', a: 'Premium', slug: 'premium' },
      ],
    } : {
      kicker: 'Quel abonnement vous convient ?', h2: 'Trois questions, trois réponses franches.',
      rows: [
        { q: 'Vous voulez simplement payer moins, et vous acceptez le risque d’une année qui rapporte peu ?', a: 'Switch', slug: 'switch' },
        { q: 'Vous voulez être sûr que June se rembourse ? Compteur analogique, ou vous ne savez pas ?', a: 'Switch Plus', slug: 'switch-plus' },
        { q: 'Vous avez un compteur numérique et des panneaux solaires, et vous voulez voir en direct ce que vous consommez et injectez ?', a: 'Premium', slug: 'premium' },
      ],
    },
    table: nl ? {
      kicker: 'Alles naast elkaar', h2: 'Wat zit in welk abonnement?', caption: 'Vergelijking van de drie abonnementen',
      rows: [
        ['Analyse van 17+ leveranciers, minstens elke maand', 1, 1, 1],
        ['Wij regelen de volledige overstap', 1, 1, 1],
        ['Automatisch of na jouw akkoord', 1, 1, 1],
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
        ['Automatiquement ou après votre accord', 1, 1, 1],
        ['Compteurs analogiques et numériques', 1, 1, 'Numérique uniquement'],
        ['Option 100 % énergie verte', 1, 1, 1],
        [`Garantie de gain (${m(G.amount)} remboursés)`, 0, 1, 1],
        ['Rapport d’économies annuel', 0, 1, 1],
        ['June Dongle (P1) inclus', 0, 0, 1],
        ['Consommation en direct, historique par quart d’heure', 0, 0, 1],
        ['Panneaux solaires : autoconsommation et injection', 0, 0, 1],
      ],
    },
    dongle: nl ? {
      kicker: 'Premium', h2: 'De June Dongle: je meter, eindelijk leesbaar.',
      body: facts.dongle.description.nl + ' Inbegrepen in je Premium-abonnement.',
      req: facts.dongle.requirements.nl,
      app: 'Zo ziet het eruit in de June-app: je verbruik en injectie per dag, dag- en nachttarief apart.',
      alt: { dongle: 'De June Dongle: een wit toestel met een groene kabel in de vorm van een blad', phone: 'Verbruiksscherm van de June-app met een staafgrafiek per dag en tegels voor afname en injectie' },
    } : {
      kicker: 'Premium', h2: 'Le June Dongle : votre compteur, enfin lisible.',
      body: facts.dongle.description.fr + ' Inclus dans votre abonnement Premium.',
      req: facts.dongle.requirements.fr,
      app: 'Voici ce que vous voyez dans l’app June : votre consommation et votre injection par jour, jour et nuit séparés.',
      alt: { dongle: 'Le June Dongle : un boîtier blanc avec un câble vert en forme de feuille', phone: 'Écran Consommation de l’app June avec un graphique en barres par jour et des tuiles pour le prélèvement et l’injection' },
    },
    vs: nl ? {
      kicker: 'Het verschil', h2: 'Eén keer vergelijken, of blijven opvolgen?',
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
      kicker: 'La différence', h2: 'Comparer une fois, ou suivre en continu ?',
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
    earn: nl ? {
      kicker: 'Hoe June geld verdient', h2: 'Jouw abonnement is ons verdienmodel. Daarom kiezen we voor jou.',
      body: ['June leeft van de abonnementen van haar klanten.', 'We zijn geen energieleverancier: we leveren geen stroom of gas en verdienen niets aan je verbruik. Dus hebben we er alle belang bij dat jij op een voordelig contract zit, en blijft zitten.', 'Wat we nog bevestigen: of June daarnaast vergoedingen van leveranciers ontvangt. Zo ja, dan staat het hier, met hoe we dan onze neutraliteit bewaken.'],
    } : {
      kicker: 'Comment June gagne sa vie', h2: 'Votre abonnement est notre modèle économique. C’est pour ça que nous choisissons pour vous.',
      body: ['June vit des abonnements de ses clients.', 'Nous ne sommes pas fournisseur d’énergie : nous ne livrons ni électricité ni gaz, et ne gagnons rien sur votre consommation. Nous avons donc tout intérêt à ce que vous soyez, et restiez, sur un contrat avantageux.', 'Ce que nous devons encore confirmer : si June perçoit en plus des rémunérations de fournisseurs. Si c’est le cas, ce sera indiqué ici, avec la manière dont nous préservons notre neutralité.'],
    },
    faq: nl ? { kicker: 'Over de prijs', h2: 'Vragen over betalen en opzeggen', all: 'Alle eerlijke antwoorden' } : { kicker: 'À propos du prix', h2: 'Questions sur le paiement et la résiliation', all: 'Toutes les réponses franches' },
    faqItems: ['cost', 'guarantee', 'cancel', 'meters'].map((id) => faqItem(id, L)),
  };
});

/* ── Switch Plus ───────────────────────────────────────────── */
const switchPlus = localise((L, m) => {
  const nl = L === 'nl';
  return {
    meta: nl
      ? { title: 'Switch Plus: besparen met winstgarantie | June', description: `Bespaar je niet meer dan je abonnement kost, dan krijg je ${m(G.amount)} terug. Switch Plus: € 8,25 per maand, € 99 per jaar, jaarlijks gefactureerd.` }
      : { title: 'Switch Plus : économisez avec garantie de gain | June', description: `Si vous n’économisez pas plus que le prix de votre abonnement, vous récupérez ${m(G.amount)}. Switch Plus : 8,25 € par mois, 99 € par an, facturé annuellement.` },
    hero: nl ? {
      kicker: 'June Switch Plus · winstgarantie', h1: 'Besparen met gegarandeerd resultaat.',
      lead: `Alles uit Switch, plus de zekerheid dat je abonnement zichzelf terugverdient. Doet het dat niet, dan krijg je ${m(G.amount)} terug.`,
      priceNote: 'per jaar, jaarlijks gefactureerd', monthly: SWP.priceDisplay.nl.main,
      cta: 'Kies Switch Plus', secondary: 'Vergelijk met Switch en Premium',
      facts: [['Wat het kost', `${m(SWP.priceYearly)} per jaar`], ['Wat je terugkrijgt', `${m(G.amount)}, als je niet meer bespaart dan dat`], ['Wanneer we rekenen', 'Na elk abonnementsjaar']],
    } : {
      kicker: 'June Switch Plus · garantie de gain', h1: 'Économisez, avec un résultat garanti.',
      lead: `Tout ce qu’offre Switch, plus la certitude que votre abonnement se rembourse. Sinon, vous récupérez ${m(G.amount)}.`,
      priceNote: 'par an, facturé annuellement', monthly: SWP.priceDisplay.fr.main,
      cta: 'Choisir Switch Plus', secondary: 'Comparer avec Switch et Premium',
      facts: [['Ce que ça coûte', `${m(SWP.priceYearly)} par an`], ['Ce que vous récupérez', `${m(G.amount)}, si vous n’économisez pas plus`], ['Quand nous calculons', 'Après chaque année d’abonnement']],
    },
    steps: nl ? {
      kicker: 'De winstgarantie, stap voor stap', h2: 'Zo werkt de winstgarantie',
      items: [
        ['Je abonnementsjaar start.', 'June volgt je contract op en zet je over wanneer het voordeliger kan.'],
        ['Na een jaar maken we de rekening.', 'In je besparingsrapport zie je hoeveel je bespaard hebt, tegenover je contract vóór June.'],
        ['Te weinig bespaard? Geld terug.', `Bespaar je niet meer dan je abonnement kost, dan krijg je ${m(G.amount)} terug.`],
      ],
      pending: 'Nog te bevestigen in de voorwaarden: hoe we de besparing precies meten en hoe je het geld terugkrijgt. Tot dan beloven we niets extra.',
    } : {
      kicker: 'La garantie de gain, étape par étape', h2: 'Comment fonctionne la garantie de gain',
      items: [
        ['Votre année d’abonnement commence.', 'June suit votre contrat et vous fait changer quand c’est plus avantageux.'],
        ['Après un an, nous faisons le compte.', 'Votre rapport d’économies montre combien vous avez économisé, par rapport à votre contrat d’avant June.'],
        ['Pas assez économisé ? Remboursé.', `Si vous n’économisez pas plus que le prix de votre abonnement, vous récupérez ${m(G.amount)}.`],
      ],
      pending: 'Encore à confirmer dans les conditions : comment l’économie est mesurée précisément et comment le remboursement vous parvient. D’ici là, nous ne promettons rien de plus.',
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
      body: 'Kies Switch als je gewoon wil besparen. Kies Switch Plus als je zeker wil zijn dat June zichzelf terugbetaalt. Heb je een digitale meter en wil je live inzicht? Bekijk dan Premium.',
      rows: [['Prijs per jaar', m(69), m(99), m(198)], ['Winstgarantie', 0, 1, 1], ['Besparingsrapport', 0, 1, 1], ['June Dongle, live verbruik', 0, 0, 1]],
      caption: 'Switch Plus naast Switch en Premium',
    } : {
      kicker: 'Est-ce pour vous ?', h2: 'Switch, Switch Plus ou Premium ?',
      body: 'Choisissez Switch si vous voulez simplement économiser. Choisissez Switch Plus si vous voulez être sûr que June se rembourse. Vous avez un compteur numérique et voulez un suivi en direct ? Découvrez Premium.',
      rows: [['Prix par an', m(69), m(99), m(198)], ['Garantie de gain', 0, 1, 1], ['Rapport d’économies', 0, 1, 1], ['June Dongle, suivi en direct', 0, 0, 1]],
      caption: 'Switch Plus à côté de Switch et Premium',
    },
    faq: nl ? { kicker: 'Over de garantie', h2: 'Vragen over de winstgarantie' } : { kicker: 'À propos de la garantie', h2: 'Questions sur la garantie de gain' },
    faqItems: ['guarantee', 'approval', 'cancel'].map((id) => faqItem(id, L)),
    close: nl ? 'Klaar voor een jaar zonder risico op verlies?' : 'Prêt pour une année sans risque de perte ?',
  };
});

/* ── Hoe werkt het / Comment ça marche ─────────────────────── */
const how = localise((L, m) => {
  const nl = L === 'nl';
  const d = facts.howItWorks.detailed.map((s) => ({ n: s.n, title: s.title[L], body: s.body[L] }));
  return {
    meta: nl
      ? { title: 'Hoe werkt June? Automatisch overstappen van energieleverancier', description: 'Koppel je meter, June vergelijkt 17+ leveranciers voor jouw verbruik en regelt de overstap: automatisch of na jouw akkoord. Welke gegevens we gebruiken en wat hetzelfde blijft.' }
      : { title: 'Comment fonctionne June ? Changer de fournisseur automatiquement', description: 'Connectez votre compteur, June compare plus de 17 fournisseurs pour votre consommation et gère le changement : automatiquement ou après votre accord. Vos données, ce qui ne change pas.' },
    hero: nl ? {
      kicker: 'Hoe werkt het', h1: facts.howItWorks.detailTitle.nl,
      lead: 'Energieprijzen veranderen voortdurend. June volgt ze voor je op, zodat jij dat niet hoeft te doen.',
      tldr: 'In 20 seconden',
      summary: ['Je meldt je aan en vertelt ons iets over je woning. Twee minuten.', `Minstens elke maand leggen we jouw verbruik naast de contracten van ${facts.suppliers.count.display.nl}.`, 'Is er een voordeliger contract, dan regelen wij de overstap: automatisch, of pas na jouw akkoord.', 'Je meter, je aansluiting en je stroom blijven zoals ze zijn. Alleen je factuur verandert.'],
    } : {
      kicker: 'Comment ça marche', h1: facts.howItWorks.detailTitle.fr,
      lead: 'Les prix de l’énergie changent sans cesse. June les suit pour vous, pour que vous n’ayez pas à le faire.',
      tldr: 'En 20 secondes',
      summary: ['Vous vous inscrivez et nous parlez de votre logement. Deux minutes.', `Au moins une fois par mois, nous comparons votre consommation aux contrats de ${facts.suppliers.count.display.fr}.`, 'S’il existe un contrat plus avantageux, nous gérons le changement : automatiquement, ou seulement après votre accord.', 'Votre compteur, votre raccordement et votre électricité restent tels quels. Seule votre facture change.'],
    },
    who: nl ? {
      kicker: 'Wie doet wat', h2: 'Vier partijen. Na de overstap verandert er er maar één.',
      intro: 'Een energiefactuur lijkt één ding, maar er zitten vier partijen achter. June is er één van, en niet de partij die stroom levert.',
      cols: ['Wat doet het?', 'Verandert het bij een overstap?'],
      nodes: [
        { name: 'Jij', role: 'Je kiest je abonnement en of je elke overstap zelf goedkeurt. Analoge meter? Dan geef je af en toe je meterstanden in.', change: 'Je krijgt een factuur van een andere leverancier.', changes: false },
        { name: 'June', role: 'Volgt de markt op voor jouw verbruik, kiest het voordeligste contract uit onze vergelijking, sluit het af en zegt je oude contract op.', change: 'Blijft hetzelfde. Wij blijven kijken.', changes: false, june: true },
        { name: 'Leverancier', role: 'Verkoopt je stroom en gas en stuurt je de factuur. Er zijn er 17+ in onze vergelijking.', change: 'Ja: dit is de enige partij die wisselt.', changes: true },
        { name: 'Netbeheerder', role: 'Beheert de kabels, leidingen en je meter. Fluvius in Vlaanderen, Sibelga in Brussel, ORES of RESA in Wallonië.', change: 'Nee. Je meter en je aansluiting blijven dezelfde.', changes: false },
      ],
      legend: ['Verandert', 'Blijft hetzelfde'],
    } : {
      kicker: 'Qui fait quoi', h2: 'Quatre acteurs. Après le changement, un seul est différent.',
      intro: 'Une facture d’énergie semble être une seule chose, mais quatre acteurs se cachent derrière. June en fait partie, et ce n’est pas celui qui livre l’électricité.',
      cols: ['Que fait-il ?', 'Change-t-il lors d’un changement ?'],
      nodes: [
        { name: 'Vous', role: 'Vous choisissez votre abonnement et si vous validez chaque changement. Compteur analogique ? Vous encodez vos index de temps en temps.', change: 'Vous recevez la facture d’un autre fournisseur.', changes: false },
        { name: 'June', role: 'Suit le marché pour votre consommation, choisit le contrat le plus avantageux parmi ceux que nous comparons, le souscrit et résilie votre ancien contrat.', change: 'Reste le même. Nous continuons à regarder.', changes: false, june: true },
        { name: 'Fournisseur', role: 'Vend votre électricité et votre gaz et vous envoie la facture. Plus de 17 dans notre comparaison.', change: 'Oui : c’est le seul acteur qui change.', changes: true },
        { name: 'Gestionnaire de réseau', role: 'Gère les câbles, les conduites et votre compteur. Sibelga à Bruxelles, ORES ou RESA en Wallonie, Fluvius en Flandre.', change: 'Non. Votre compteur et votre raccordement restent les mêmes.', changes: false },
      ],
      legend: ['Change', 'Reste pareil'],
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
      note: 'In welke regio’s June actief is, bevestigen we vóór livegang. Je postcode in stap 1 vertelt het je meteen.',
    } : {
      kicker: 'Par région', h2: 'Ce qui diffère à Bruxelles, en Wallonie et en Flandre.',
      intro: 'Le marché de l’énergie est belge, mais les réseaux sont régionaux. Cela a quelques conséquences.',
      items: [
        { h: 'Bruxelles', net: 'Gestionnaire de réseau : Sibelga', p: 'Pas de tarif capacitaire. Vos tarifs de réseau diffèrent de ceux de Wallonie et de Flandre ; c’est pourquoi nous vous demandons votre code postal.' },
        { h: 'Wallonie', net: 'Gestionnaire de réseau : ORES ou RESA', p: 'Pas de tarif capacitaire. Les tarifs de réseau varient selon le gestionnaire ; votre code postal nous indique lequel s’applique chez vous.' },
        { h: 'Flandre uniquement', net: 'Gestionnaire de réseau : Fluvius', p: 'Depuis 2023, la Flandre applique un tarif capacitaire : une partie du tarif de réseau dépend de votre pic de puissance le plus élevé par quart d’heure. Avec Premium et le June Dongle, vous voyez ces pics. Si vous habitez à Bruxelles ou en Wallonie, ceci ne vous concerne pas.' },
      ],
      note: 'Les régions desservies par June seront confirmées avant la mise en ligne. Votre code postal, à l’étape 1, vous le dira tout de suite.',
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
    { id: 'prijs', name: 'Prijs en garantie', items: ['cost', 'guarantee', 'cancel'] },
    { id: 'overstap', name: 'De overstap', items: ['approval', 'exit-fee', 'no-interruption', 'green'] },
    { id: 'meter-gegevens', name: 'Je meter en je gegevens', items: ['meters', 'regions', 'data'] },
  ] : [
    { id: 'a-propos', name: 'À propos de June', items: ['not-a-supplier', 'independence', 'how-so-much', 'which-suppliers'] },
    { id: 'prix', name: 'Prix et garantie', items: ['cost', 'guarantee', 'cancel'] },
    { id: 'changement', name: 'Le changement', items: ['approval', 'exit-fee', 'no-interruption', 'green'] },
    { id: 'compteur-donnees', name: 'Votre compteur et vos données', items: ['meters', 'regions', 'data'] },
  ];
  // Flanders-only topic: in NL a plain answer, in FR explicitly qualified.
  const capacity = nl
    ? { id: 'capacity', q: 'Wat is het capaciteitstarief, en helpt June daarbij?', a: 'In Vlaanderen hangt een deel van je nettarief af van je hoogste kwartierpiek: het capaciteitstarief. Met Premium en de June Dongle volg je je piekvermogen op, zodat je pieken kan vermijden. In Brussel en Wallonië bestaat het capaciteitstarief niet.', pending: false }
    : { id: 'capacity', q: 'Le tarif capacitaire me concerne-t-il ?', a: 'Seulement si vous habitez en Flandre. Là-bas, une partie du tarif de réseau dépend de votre pic de puissance le plus élevé par quart d’heure. À Bruxelles et en Wallonie, il n’existe pas de tarif capacitaire.', pending: false };
  return {
    meta: nl
      ? { title: 'Veelgestelde vragen: eerlijke antwoorden | June', description: 'Is June een energieleverancier? Hoe verdient June geld? Wat met opzeggen, je meter en je gegevens? Eerlijke antwoorden, ook als iets nog bevestigd moet worden.' }
      : { title: 'Questions fréquentes : des réponses franches | June', description: 'June est-elle un fournisseur ? Comment June gagne-t-elle sa vie ? Résiliation, compteur, données : des réponses franches, même quand un point doit encore être confirmé.' },
    hero: nl
      ? { kicker: 'Veelgestelde vragen', h1: 'Eerlijke antwoorden.', lead: 'Ook op de vragen die we liever niet krijgen. En als iets nog niet vaststaat, zeggen we dat ook: die antwoorden krijgen het label “Wordt bevestigd”.', jump: 'Spring naar' }
      : { kicker: 'Questions fréquentes', h1: 'Des réponses franches.', lead: 'Y compris aux questions qu’on préférerait ne pas recevoir. Et quand un point n’est pas encore fixé, nous le disons : ces réponses portent l’étiquette « À confirmer ».', jump: 'Aller à' },
    cats: cats.map((c) => ({ ...c, items: [...c.items.map((id) => faqItem(id, L)), ...(c.id === 'meter-gegevens' || c.id === 'compteur-donnees' ? [capacity] : [])] })),
    notFound: nl
      ? { h2: 'Staat je vraag er niet bij?', p: 'Lees hoe June werkt, van aanmelding tot opvolging. Of begin gewoon: je postcode en vier vragen, en je ziet wat June voor je kan doen. Je betaalt niets tot je een abonnement afsluit.', how: 'Zo werkt June', plans: 'Bekijk de abonnementen' }
      : { h2: 'Votre question n’y figure pas ?', p: 'Découvrez comment fonctionne June, de l’inscription au suivi. Ou commencez simplement : votre code postal et quatre questions, et vous voyez ce que June peut faire pour vous. Vous ne payez rien avant de souscrire un abonnement.', how: 'Comment fonctionne June', plans: 'Voir les abonnements' },
  };
});

export const plansCopy = (locale) => ({ ...siteCopy(locale), ...plans(locale) });
export const switchPlusCopy = (locale) => ({ ...siteCopy(locale), ...switchPlus(locale) });
export const howCopy = (locale) => ({ ...siteCopy(locale), ...how(locale) });
export const faqCopy = (locale) => ({ ...siteCopy(locale), ...faqPage(locale) });
export { SWP };

// Variant C "Honest Market" — sign-up funnel copy (NL + FR). Transparent about what happens next and what data is used.
import { facts, SW, SWP, PREM, G, localise, siteCopy } from './site.js';
import { PRESETS, GAP, CAP, EXTRA } from '../lib/estimate.js';

const fmtN = (n, L) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, L === 'nl' ? '.' : ' ');

const signup = localise((L, m) => {
  const nl = L === 'nl';
  const plan = (p) => ({ slug: p.slug, name: p.shortName, yearly: m(p.priceYearly), fee: p.priceYearly, monthly: p.priceDisplay[L].main, value: p.valueProposition[L] });
  const presets = Object.entries(PRESETS).map(([k, v]) => `${k === '5+' ? (nl ? '5 of meer' : '5 ou plus') : k.replace('-', '–')}${nl ? ':' : ' :'} ${fmtN(v.elec, L)} / ${fmtN(v.gas, L)} kWh`).join(' · ');
  const gap = nl
    ? 'elektriciteit € 0,03–0,06 per kWh, gas € 0,008–0,016 per kWh'
    : `électricité 0,03–0,06 € par kWh, gaz 0,008–0,016 € par kWh`;
  return {
    meta: nl
      ? { title: 'Aanmelden | June', description: 'Bereken je besparing en meld je aan bij June in twee minuten. Je postcode en vier vragen volstaan voor een eerste schatting.' }
      : { title: 'Inscription | June', description: 'Calculez votre économie et inscrivez-vous chez June en deux minutes. Votre code postal et quatre questions suffisent pour une première estimation.' },
    h1: nl ? 'Bereken je besparing' : 'Calculez votre économie',
    intro: nl ? 'Vier vragen over je woning, geen persoonsgegevens. Daarna zie je een eerste schatting, en beslis je pas of je verdergaat.' : 'Quatre questions sur votre logement, sans données personnelles. Vous voyez ensuite une première estimation, et c’est seulement là que vous décidez de continuer.',
    progress: nl
      ? { label: 'Voortgang', steps: ['Je woning', 'Je schatting', 'Je abonnement'], meta: ['Stap 1 van 2 · ongeveer 1 minuut', 'Stap 1 van 2 · je schatting', 'Stap 2 van 2 · bijna klaar', 'Klaar'] }
      : { label: 'Progression', steps: ['Votre logement', 'Votre estimation', 'Votre abonnement'], meta: ['Étape 1 sur 2 · environ 1 minute', 'Étape 1 sur 2 · votre estimation', 'Étape 2 sur 2 · presque terminé', 'Terminé'] },
    planChip: nl ? { label: 'Gekozen abonnement', change: 'Wijzigen kan in stap 2' } : { label: 'Abonnement choisi', change: 'Modifiable à l’étape 2' },
    s1: nl ? {
      h2: 'Je woning',
      postcode: { label: 'Postcode', why: 'Voor je netbeheerder en regionale nettarieven.', ph: 'bv. 9000' },
      energy: { legend: 'Wat wil je laten vergelijken?', opts: [['elec', 'Elektriciteit'], ['both', 'Elektriciteit en gas']] },
      household: { legend: 'Met hoeveel personen woon je?', why: 'Zo schatten we je verbruik, tot we het echte kennen.', opts: [['1', '1'], ['2', '2'], ['3-4', '3–4'], ['5+', '5+']], unit: ['persoon', 'personen'] },
      kwh: { summary: 'Ik ken mijn jaarverbruik', optional: '(optioneel, staat op je jaarafrekening)', elec: 'Elektriciteit (kWh per jaar)', gas: 'Gas (kWh per jaar)', note: 'Vul je dit in, dan gebruiken we jouw cijfers in plaats van een schatting op basis van je gezin.' },
      meter: { legend: 'Welke meter heb je?', why: 'Bepaalt of we automatisch kunnen uitlezen.', opts: [['digital', 'Digitale meter'], ['analog', 'Analoge meter'], ['unknown', 'Weet ik niet']], help: 'Een digitale meter heeft een schermpje en knoppen, en meestal een P1-poort.' },
      extras: { legend: 'Heb je een van deze?', optional: '(optioneel)', opts: [['solar', 'Zonnepanelen'], ['ev', 'Elektrische wagen'], ['heatpump', 'Warmtepomp']] },
      next: 'Toon mijn schatting',
      reassure: 'Gratis schatting · geen verplichtingen · nog geen e-mail nodig',
    } : {
      h2: 'Votre logement',
      postcode: { label: 'Code postal', why: 'Pour votre gestionnaire de réseau et vos tarifs de réseau.', ph: 'ex. 1000' },
      energy: { legend: 'Que voulez-vous faire comparer ?', opts: [['elec', 'Électricité'], ['both', 'Électricité et gaz']] },
      household: { legend: 'Combien de personnes vivent chez vous ?', why: 'Pour estimer votre consommation, en attendant la vraie.', opts: [['1', '1'], ['2', '2'], ['3-4', '3–4'], ['5+', '5+']], unit: ['personne', 'personnes'] },
      kwh: { summary: 'Je connais ma consommation annuelle', optional: '(facultatif, sur votre facture de régularisation)', elec: 'Électricité (kWh par an)', gas: 'Gaz (kWh par an)', note: 'Si vous la complétez, nous utilisons vos chiffres plutôt qu’une estimation basée sur votre ménage.' },
      meter: { legend: 'Quel compteur avez-vous ?', why: 'Pour savoir si nous pouvons relever automatiquement.', opts: [['digital', 'Compteur numérique'], ['analog', 'Compteur analogique'], ['unknown', 'Je ne sais pas']], help: 'Un compteur numérique a un petit écran et des boutons, et généralement un port P1.' },
      extras: { legend: 'Avez-vous l’un de ces équipements ?', optional: '(facultatif)', opts: [['solar', 'Panneaux solaires'], ['ev', 'Voiture électrique'], ['heatpump', 'Pompe à chaleur']] },
      next: 'Voir mon estimation',
      reassure: 'Estimation gratuite · sans engagement · pas encore d’e-mail',
    },
    regions: nl
      ? { vl: 'Vlaanderen · netbeheerder Fluvius', bxl: 'Brussel · netbeheerder Sibelga', wal: 'Wallonië · netbeheerder ORES of RESA' }
      : { vl: 'Flandre · gestionnaire de réseau Fluvius', bxl: 'Bruxelles · gestionnaire de réseau Sibelga', wal: 'Wallonie · gestionnaire de réseau ORES ou RESA' },
    errors: nl ? {
      postcodeEmpty: 'Vul je postcode in.', postcode: 'Een Belgische postcode heeft 4 cijfers, bv. 9000.', choice: 'Maak een keuze.',
      household: 'Kies je gezinsgrootte, of vul je jaarverbruik in.', kwh: 'Dat lijkt ons veel. Kijk je het even na? (tussen 100 en 100.000 kWh)',
      email: 'Dit e-mailadres lijkt niet te kloppen. Bv. naam@voorbeeld.be', emailEmpty: 'Vul je e-mailadres in.', terms: 'Vink dit aan om verder te gaan.',
      summary: ['Nog 1 ding om aan te vullen: {list}.', 'Nog {n} dingen om aan te vullen: {list}.'],
    } : {
      postcodeEmpty: 'Indiquez votre code postal.', postcode: 'Un code postal belge compte 4 chiffres, par ex. 1000.', choice: 'Faites un choix.',
      household: 'Choisissez la taille de votre ménage, ou indiquez votre consommation annuelle.', kwh: 'Cela nous semble beaucoup. Pouvez-vous vérifier ? (entre 100 et 100 000 kWh)',
      email: 'Cette adresse e-mail ne semble pas correcte. Par ex. nom@exemple.be', emailEmpty: 'Indiquez votre adresse e-mail.', terms: 'Cochez cette case pour continuer.',
      summary: ['Encore 1 point à compléter : {list}.', 'Encore {n} points à compléter : {list}.'],
    },
    est: nl ? {
      h2: 'Je indicatieve schatting',
      tag: 'Indicatief',
      grossLabel: 'Wat je naar schatting bespaart per jaar, vóór je abonnement',
      netLabel: 'Na je {name}-abonnement ({fee} per jaar)',
      perYear: 'per jaar',
      basis: 'Gebaseerd op {e} kWh elektriciteit per jaar ({src}).', basisGas: 'Gebaseerd op {e} kWh elektriciteit en {g} kWh gas per jaar ({src}).',
      own: 'jouw cijfers', preset: 'geschat op basis van je gezin',
      methodH: 'Hoe we dit berekenden',
      method: [
        `Verbruik: jouw cijfers, of een schatting per gezinsgrootte (${presets}; elektriciteit / gas per jaar). Elektrische wagen +${fmtN(EXTRA.ev, L)} kWh, warmtepomp +${fmtN(EXTRA.heatpump, L)} kWh en geen gas, zonnepanelen −30% afname.`,
        `Prijsverschil tussen een contract dat niemand opvolgt en het voordeligere contract uit onze vergelijking: ${gap}, incl. btw. Een marge erin, dus een bereik eruit.`,
        `Maximaal ${m(CAP)} per jaar. Je postcode gebruiken we hier enkel voor je regio, niet in de berekening.`,
        'Dit is geen offerte en geen belofte. Je persoonlijke besparing berekenen we na je aanmelding, met je echte verbruik en de contracten van dat moment.',
      ],
      low: 'Eerlijk gezegd: volgens deze ruwe schatting is er voor jou weinig te winnen. Misschien zit je al op een goed contract. Met Switch Plus loop je geen risico: bespaar je niet meer dan je abonnement, dan krijg je € 99 terug.',
      recH: 'Ons advies',
      recSp: 'Switch Plus: je bespaart met winstgarantie. Bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je € 99 terug.',
      recPrem: 'Premium: met een digitale meter en zonnepanelen zie je via de June Dongle live wat je verbruikt en injecteert. Winstgarantie inbegrepen.',
      recPlan: 'Je koos {name}. Dat houden we zo; wijzigen kan in de volgende stap.',
      next: 'Verder met {name}',
      back: 'Gegevens aanpassen',
    } : {
      h2: 'Votre estimation indicative',
      tag: 'Indicatif',
      grossLabel: 'Ce que vous économisez selon notre estimation, par an, avant votre abonnement',
      netLabel: 'Après votre abonnement {name} ({fee} par an)',
      perYear: 'par an',
      basis: 'Sur la base de {e} kWh d’électricité par an ({src}).', basisGas: 'Sur la base de {e} kWh d’électricité et {g} kWh de gaz par an ({src}).',
      own: 'vos chiffres', preset: 'estimé d’après votre ménage',
      methodH: 'Comment nous l’avons calculé',
      method: [
        `Consommation : vos chiffres, ou une estimation par taille de ménage (${presets} ; électricité / gaz par an). Voiture électrique +${fmtN(EXTRA.ev, L)} kWh, pompe à chaleur +${fmtN(EXTRA.heatpump, L)} kWh et pas de gaz, panneaux solaires −30 % de prélèvement.`,
        `Écart de prix entre un contrat que personne ne suit et le contrat plus avantageux de notre comparaison : ${gap}, TVA comprise. Une fourchette en entrée, donc une fourchette en sortie.`,
        `Maximum ${m(CAP)} par an. Votre code postal ne sert ici qu’à identifier votre région, pas au calcul.`,
        'Ceci n’est ni une offre ni une promesse. Nous calculons votre économie personnelle après votre inscription, avec votre consommation réelle et les contrats du moment.',
      ],
      low: 'Pour être francs : selon cette estimation approximative, il y a peu à gagner pour vous. Vous êtes peut-être déjà sur un bon contrat. Avec Switch Plus, vous ne prenez aucun risque : si vous n’économisez pas plus que votre abonnement, vous récupérez 99 €.',
      recH: 'Notre conseil',
      recSp: 'Switch Plus : vous économisez avec la garantie de gain. Si vous n’économisez pas plus que le prix de votre abonnement sur une année, vous récupérez 99 €.',
      recPrem: 'Premium : avec un compteur numérique et des panneaux solaires, le June Dongle vous montre en direct ce que vous consommez et injectez. Garantie de gain comprise.',
      recPlan: 'Vous avez choisi {name}. Nous le gardons ; vous pourrez le modifier à l’étape suivante.',
      next: 'Continuer avec {name}',
      back: 'Modifier mes réponses',
    },
    s2: nl ? {
      h2: 'Je abonnement',
      plan: { legend: 'Kies je abonnement', rec: 'Aanbevolen · met winstgarantie', recPrem: 'Past bij je digitale meter en zonnepanelen', billed: 'jaarlijks gefactureerd', guarantee: 'Winstgarantie', noGuarantee: 'Zonder winstgarantie', dongle: 'June Dongle inbegrepen' },
      premAnalog: 'Premium werkt enkel met een digitale meter. Kies Switch of Switch Plus, of ga toch verder als je binnenkort een digitale meter krijgt.',
      pref: { legend: 'Hoe wil je wisselen?', opts: [['auto', 'Automatisch', 'We wisselen zodra een contract voordeliger is, en laten je weten waarom.'], ['ask', 'Vraag het me eerst', 'We sturen je het voorstel. Jij keurt elke overstap goed.']] },
      green: 'Vergelijk enkel contracten met 100% groene stroom (volgens de leverancier)',
      email: { label: 'E-mailadres', why: 'Om je aanmelding te bewaren en je schatting te sturen. Niet voor reclame, tenzij je dat hieronder aanvinkt.', ph: 'naam@voorbeeld.be' },
      terms: 'Ik ga akkoord met de algemene voorwaarden en heb de privacyverklaring gelezen.',
      marketing: 'Stuur me af en toe tips en nieuws van June. (optioneel, altijd uit te schrijven)',
      nextH: 'Wat er hierna gebeurt',
      nextSteps: [
        'Je krijgt een e-mail met een link om je aanmelding af te ronden.',
        'Daar vragen we je adres, je EAN-code en je huidige leverancier. Hou je energiefactuur bij de hand.',
        'Pas daarna sluit je je abonnement af. Je hebt 14 dagen bedenktijd.',
      ],
      submit: 'Aanmelding starten',
      under: 'Je betaalt nog niets. Je energie blijft gewoon lopen.',
      back: 'Terug naar je schatting',
    } : {
      h2: 'Votre abonnement',
      plan: { legend: 'Choisissez votre abonnement', rec: 'Recommandé · avec garantie de gain', recPrem: 'Adapté à votre compteur numérique et vos panneaux solaires', billed: 'facturé annuellement', guarantee: 'Garantie de gain', noGuarantee: 'Sans garantie de gain', dongle: 'June Dongle inclus' },
      premAnalog: 'Premium fonctionne uniquement avec un compteur numérique. Choisissez Switch ou Switch Plus, ou continuez si vous recevez bientôt un compteur numérique.',
      pref: { legend: 'Comment voulez-vous changer ?', opts: [['auto', 'Automatiquement', 'Nous changeons dès qu’un contrat est plus avantageux, et vous expliquons pourquoi.'], ['ask', 'Demandez-moi d’abord', 'Nous vous envoyons la proposition. Vous validez chaque changement.']] },
      green: 'Ne comparer que des contrats 100 % électricité verte (selon le fournisseur)',
      email: { label: 'Adresse e-mail', why: 'Pour sauvegarder votre inscription et vous envoyer votre estimation. Pas de publicité, sauf si vous cochez la case ci-dessous.', ph: 'nom@exemple.be' },
      terms: 'J’accepte les conditions générales et j’ai lu la déclaration de confidentialité.',
      marketing: 'Envoyez-moi de temps en temps des conseils et des nouvelles de June. (facultatif, désinscription à tout moment)',
      nextH: 'Ce qui se passe ensuite',
      nextSteps: [
        'Vous recevez un e-mail avec un lien pour finaliser votre inscription.',
        'Nous vous y demandons votre adresse, votre code EAN et votre fournisseur actuel. Gardez votre facture d’énergie à portée de main.',
        'Ce n’est qu’ensuite que vous souscrivez votre abonnement. Vous disposez de 14 jours de rétractation.',
      ],
      submit: 'Démarrer mon inscription',
      under: 'Vous ne payez rien pour l’instant. Votre énergie continue d’arriver normalement.',
      back: 'Retour à votre estimation',
    },
    done: nl ? {
      h2: 'Check je mailbox',
      body: 'We stuurden een e-mail naar {email}. Klik op de link om je aanmelding af te ronden.',
      recap: 'Je keuzes', planL: 'Abonnement', prefL: 'Wisselen', greenL: 'Enkel groene stroom', yes: 'Ja', no: 'Nee',
      notReceived: 'Niets ontvangen? Kijk in je spam, of controleer je e-mailadres hierboven.',
      proto: 'Prototype: er werd geen e-mail verstuurd en niets opgeslagen.',
      home: 'Terug naar de startpagina', how: 'Lees intussen hoe June werkt',
    } : {
      h2: 'Consultez votre boîte mail',
      body: 'Nous avons envoyé un e-mail à {email}. Cliquez sur le lien pour finaliser votre inscription.',
      recap: 'Vos choix', planL: 'Abonnement', prefL: 'Changement', greenL: 'Uniquement de l’électricité verte', yes: 'Oui', no: 'Non',
      notReceived: 'Rien reçu ? Vérifiez vos spams, ou l’adresse e-mail ci-dessus.',
      proto: 'Prototype : aucun e-mail n’a été envoyé et rien n’a été enregistré.',
      home: 'Retour à l’accueil', how: 'En attendant, découvrez comment fonctionne June',
    },
    side: nl ? {
      h2: 'Wat we van je weten',
      intro: 'Alles wat je invult, zie je hier. Niets anders.',
      rows: { postcode: 'Postcode', region: 'Regio', energy: 'Energie', usage: 'Verbruik', meter: 'Meter', extras: 'Extra', email: 'E-mailadres' },
      empty: 'nog niet ingevuld', notAsked: 'nog niet gevraagd',
      never: 'Naam, adres, EAN-code en rekeningnummer vragen we pas later, als je verder wil.',
      trust: 'Geen leverancier · je energie blijft lopen · 14 dagen bedenktijd',
    } : {
      h2: 'Ce que nous savons de vous',
      intro: 'Tout ce que vous indiquez apparaît ici. Rien d’autre.',
      rows: { postcode: 'Code postal', region: 'Région', energy: 'Énergie', usage: 'Consommation', meter: 'Compteur', extras: 'Équipements', email: 'Adresse e-mail' },
      empty: 'pas encore indiqué', notAsked: 'pas encore demandée',
      never: 'Nom, adresse, code EAN et numéro de compte ne sont demandés que plus tard, si vous continuez.',
      trust: 'Pas un fournisseur · votre énergie continue · 14 jours de rétractation',
    },
    noscript: nl
      ? 'Je schatting berekenen we met een klein script in je browser. Het staat uit, dus je ziet alle vragen onder elkaar. Je kan ze nog steeds invullen en versturen.'
      : 'Votre estimation est calculée par un petit script dans votre navigateur. Il est désactivé : toutes les questions s’affichent donc à la suite. Vous pouvez tout de même les remplir et les envoyer.',
    plans: [SW, SWP, PREM].map(plan),
    fmtNl: L,
    guaranteeAmount: m(G.amount),
    kwhUnit: 'kWh',
  };
});

export const signupCopy = (locale) => ({ ...siteCopy(locale), ...signup(locale) });

// Final site — sign-up funnel copy (NL + FR). Honest Market voice: transparent about the maths, the data we ask
// and what happens next. Prices, guarantee amount and presets come from facts.json / src/lib/estimate.js.
import { SW, SWP, PREM, G, localise, siteCopy } from './site.js';
import { PRESETS, GAP, CAP, EXTRA, LOW_THRESHOLD, FEES } from '../lib/estimate.js';

// Build-time guard: the fees inlined in the client estimate must equal the frozen prices in facts.json.
for (const p of [SW, SWP, PREM]) if (FEES[p.slug] !== p.priceYearly) throw new Error(`estimate.js FEES.${p.slug} (${FEES[p.slug]}) ≠ facts.json (${p.priceYearly})`);

const fmtN = (n, L) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, L === 'nl' ? '.' : ' ');
const dec = (n, L) => String(n).replace('.', ',') + (L === 'fr' ? ' €' : '');

const signup = localise((L, m) => {
  const nl = L === 'nl';
  const plan = (p) => ({ slug: p.slug, name: p.shortName, yearly: m(p.priceYearly), fee: p.priceYearly, monthly: p.priceDisplay[L].main, value: p.valueProposition[L] });
  const presets = Object.entries(PRESETS).map(([k, v]) => `${k === '5+' ? (nl ? '5 of meer' : '5 ou plus') : k.replace('-', '–')}${nl ? ':' : ' :'} ${fmtN(v.elec, L)} / ${fmtN(v.gas, L)} kWh`).join(' · ');
  const gap = nl
    ? `elektriciteit € ${dec(GAP.elec[0], L)}–${dec(GAP.elec[1], L)} per kWh, gas € ${dec(GAP.gas[0], L)}–${dec(GAP.gas[1], L)} per kWh`
    : `électricité ${dec(GAP.elec[0], 'nl')}–${dec(GAP.elec[1], L)} par kWh, gaz ${dec(GAP.gas[0], 'nl')}–${dec(GAP.gas[1], L)} par kWh`;
  const g = m(G.amount);
  // Guarantee: always amount + condition + period + where the conditions are (content freeze C7).
  const guarantee = nl
    ? `Winstgarantie bij Switch Plus en Premium: bespaar je in een abonnementsjaar niet meer dan je abonnement kost, dan krijg je ${g} terug. Voorwaarden in onze algemene voorwaarden.`
    : `Garantie de gain avec Switch Plus et Premium : si vous n’économisez pas plus que le prix de votre abonnement sur une année d’abonnement, vous récupérez ${g}. Conditions dans nos conditions générales.`;
  return {
    meta: nl
      ? { title: 'Aanmelden | June', description: 'Bereken je besparing en meld je aan bij June. Je postcode en vier vragen volstaan voor een eerste, indicatieve schatting.' }
      : { title: 'Inscription | June', description: 'Calculez votre économie et inscrivez-vous chez June. Votre code postal et quatre questions suffisent pour une première estimation indicative.' },
    h1: nl ? 'Bereken je besparing' : 'Calculez votre économie',
    intro: nl ? 'Vier vragen over je woning, geen persoonsgegevens. Daarna zie je wat je naar schatting overhoudt, en beslis je pas of je verdergaat.' : 'Quatre questions sur votre logement, sans données personnelles. Vous voyez ensuite ce qu’il vous resterait selon notre estimation, et c’est seulement là que vous décidez de continuer.',
    help: nl ? { label: 'Hulp nodig?', more: 'Veelgestelde vragen' } : { label: 'Besoin d’aide ?', more: 'Questions fréquentes' },
    progress: nl
      ? { label: 'Voortgang', steps: ['Je woning', 'Je schatting', 'Je abonnement'], meta: ['Stap 1 van 3 · ongeveer 1 minuut', 'Stap 2 van 3 · je schatting', 'Stap 3 van 3 · bijna klaar', 'Klaar · je aanmelding is gestart'], done: 'klaar', current: 'huidige stap' }
      : { label: 'Progression', steps: ['Votre logement', 'Votre estimation', 'Votre abonnement'], meta: ['Étape 1 sur 3 · environ 1 minute', 'Étape 2 sur 3 · votre estimation', 'Étape 3 sur 3 · presque terminé', 'Terminé · votre inscription a commencé'], done: 'terminé', current: 'étape en cours' },
    planChip: nl ? { label: 'Gekozen abonnement', change: 'Wijzigen kan in stap 3' } : { label: 'Abonnement choisi', change: 'Modifiable à l’étape 3' },
    s1: nl ? {
      h2: 'Je woning',
      postcode: { label: 'Postcode', why: 'Voor je netbeheerder en regionale nettarieven.', ph: 'bv. 9000' },
      pcLine: { town: '{pc} {town} · {region} · netbeheerder {dso}', noTown: '{pc} · {prov}, {region} · netbeheerder {dso}' },
      energy: { legend: 'Wat wil je laten vergelijken?', opts: [['elec', 'Elektriciteit'], ['both', 'Elektriciteit en gas']] },
      household: { legend: 'Met hoeveel personen woon je?', why: 'Zo schatten we je verbruik, tot we het echte kennen.', opts: [['1', '1'], ['2', '2'], ['3-4', '3–4'], ['5+', '5+']], unit: ['persoon', 'personen'] },
      kwh: { summary: 'Ik ken mijn jaarverbruik', optional: '(optioneel, staat op je jaarafrekening)', elec: 'Elektriciteit (kWh per jaar)', gas: 'Gas (kWh per jaar)', note: 'Vul je dit in, dan gebruiken we jouw cijfers in plaats van een schatting op basis van je gezin.' },
      meter: { legend: 'Welke meter heb je?', why: 'Bepaalt of we automatisch kunnen uitlezen.', opts: [['digital', 'Digitale meter'], ['analog', 'Analoge meter'], ['unknown', 'Weet ik niet']], help: 'Een digitale meter heeft een schermpje en knoppen, en meestal een P1-poort.' },
      extras: { legend: 'Heb je een van deze?', optional: '(optioneel)', opts: [['solar', 'Zonnepanelen'], ['ev', 'Elektrische wagen'], ['heatpump', 'Warmtepomp']] },
      next: 'Toon mijn schatting',
      reassure: 'Gratis schatting · nog geen e-mail nodig · je betaalt niets',
    } : {
      h2: 'Votre logement',
      postcode: { label: 'Code postal', why: 'Pour votre gestionnaire de réseau et vos tarifs de réseau.', ph: 'ex. 1000' },
      pcLine: { town: '{pc} {town} · {region} · gestionnaire de réseau {dso}', noTown: '{pc} · {prov}, {region} · gestionnaire de réseau {dso}' },
      energy: { legend: 'Que voulez-vous faire comparer ?', opts: [['elec', 'Électricité'], ['both', 'Électricité et gaz']] },
      household: { legend: 'Combien de personnes vivent chez vous ?', why: 'Pour estimer votre consommation, en attendant la vraie.', opts: [['1', '1'], ['2', '2'], ['3-4', '3–4'], ['5+', '5+']], unit: ['personne', 'personnes'] },
      kwh: { summary: 'Je connais ma consommation annuelle', optional: '(facultatif, sur votre facture de régularisation)', elec: 'Électricité (kWh par an)', gas: 'Gaz (kWh par an)', note: 'Si vous la complétez, nous utilisons vos chiffres plutôt qu’une estimation basée sur votre ménage.' },
      meter: { legend: 'Quel compteur avez-vous ?', why: 'Pour savoir si nous pouvons relever automatiquement.', opts: [['digital', 'Compteur numérique'], ['analog', 'Compteur analogique'], ['unknown', 'Je ne sais pas']], help: 'Un compteur numérique a un petit écran et des boutons, et généralement un port P1.' },
      extras: { legend: 'Avez-vous l’un de ces équipements ?', optional: '(facultatif)', opts: [['solar', 'Panneaux solaires'], ['ev', 'Voiture électrique'], ['heatpump', 'Pompe à chaleur']] },
      next: 'Voir mon estimation',
      reassure: 'Estimation gratuite · pas encore d’e-mail · vous ne payez rien',
    },
    errors: nl ? {
      summary: ['Nog 1 ding om aan te vullen', 'Nog {n} dingen om aan te vullen'],
      postcodeEmpty: 'Vul je postcode in.', postcode: 'Een Belgische postcode heeft 4 cijfers, bv. 9000.',
      household: 'Kies met hoeveel personen je woont, of vul je jaarverbruik in.',
      kwh: 'Dat lijkt ons niet te kloppen. Kijk je het even na? (tussen 100 en 100.000 kWh)',
      meter: 'Kies je type meter (of ‘Weet ik niet’).',
      plan: 'Kies een abonnement.',
      pref: 'Kies hoe je wil wisselen: automatisch, of pas na jouw akkoord.',
      email: 'Dit e-mailadres lijkt niet te kloppen. Bv. naam@voorbeeld.be', emailEmpty: 'Vul je e-mailadres in.',
      terms: 'Vink aan dat je akkoord gaat met de algemene voorwaarden.',
    } : {
      summary: ['Encore 1 point à compléter', 'Encore {n} points à compléter'],
      postcodeEmpty: 'Indiquez votre code postal.', postcode: 'Un code postal belge compte 4 chiffres, par ex. 1000.',
      household: 'Indiquez combien de personnes vivent chez vous, ou votre consommation annuelle.',
      kwh: 'Cela ne nous semble pas correct. Pouvez-vous vérifier ? (entre 100 et 100 000 kWh)',
      meter: 'Choisissez votre type de compteur (ou « Je ne sais pas »).',
      plan: 'Choisissez un abonnement.',
      pref: 'Choisissez comment changer : automatiquement, ou seulement avec votre accord.',
      email: 'Cette adresse e-mail ne semble pas correcte. Par ex. nom@exemple.be', emailEmpty: 'Indiquez votre adresse e-mail.',
      terms: 'Cochez la case pour accepter les conditions générales.',
    },
    est: nl ? {
      h2: 'Je indicatieve schatting',
      tag: 'Indicatief',
      loading: 'We berekenen je schatting…',
      netLabel: 'Wat je naar schatting overhoudt per jaar, na je {name}-abonnement',
      perYear: 'per jaar',
      ledger: { gross: 'Besparing vóór abonnement', fee: '{name}-abonnement', net: 'Wat je overhoudt' },
      alt: 'Met {name} ({fee} per jaar) hou je naar schatting {range} over.',
      basis: 'Gebaseerd op {e} kWh elektriciteit per jaar ({src}).', basisGas: 'Gebaseerd op {e} kWh elektriciteit en {g} kWh gas per jaar ({src}).',
      own: 'jouw cijfers', preset: 'geschat op basis van je gezin',
      footnote: 'Indicatief: berekend in je browser met de aannames hieronder. Geen offerte en geen belofte. Na je aanmelding berekenen we je persoonlijke besparing, met je echte verbruik.',
      methodH: 'Hoe we dit berekenden',
      method: [
        `Verbruik: jouw cijfers, of een schatting per gezinsgrootte (${presets}; elektriciteit / gas per jaar). Elektrische wagen +${fmtN(EXTRA.ev, L)} kWh, warmtepomp +${fmtN(EXTRA.heatpump, L)} kWh en geen gas, zonnepanelen −30% afname.`,
        `Prijsverschil tussen een contract dat niemand opvolgt en het voordeligere contract uit onze vergelijking: ${gap}, incl. btw. Een marge erin, dus een bereik eruit.`,
        `Besparing maximaal ${m(CAP)} per jaar. Daarna trekken we de prijs van je abonnement af: dat is wat je overhoudt.`,
        'Je postcode gebruiken we enkel voor je regio en netbeheerder, niet in de berekening.',
        'Dit is geen offerte en geen belofte. Je persoonlijke besparing berekenen we na je aanmelding, met je echte verbruik en de contracten van dat moment.',
      ],
      low: { h: 'Eerlijk gezegd: je zit al goed', body: `Volgens deze ruwe schatting hou je na een abonnement minder dan ${m(LOW_THRESHOLD)} per jaar over. Misschien zit je al op een scherp contract. Wil je het toch zeker weten? ${guarantee}` },
      notice: {
        'premium-analog': 'Premium werkt enkel met een digitale meter: de June Dongle gaat in de P1-poort. Met je analoge meter raden we Switch Plus aan, met dezelfde winstgarantie.',
        'premium-eats-chosen': `Premium kost ${m(PREM.priceYearly)} per jaar. Volgens deze schatting zou dat een groot deel van je besparing opeten. Met Switch Plus hou je meer over, met dezelfde winstgarantie.`,
        'premium-eats': `Premium (met de June Dongle) past bij je digitale meter en zonnepanelen, maar kost ${m(PREM.priceYearly)} per jaar. Volgens deze schatting zou dat een groot deel van je besparing opeten. Daarom raden we Switch Plus aan.`,
        'premium-unknown': 'Premium werkt enkel met een digitale meter. Weet je niet zeker welke meter je hebt? Dat kijken we na je aanmelding samen na. Heb je een analoge meter, dan kies je in stap 3 beter Switch Plus.',
      },
      recH: 'Ons advies',
      rec: {
        default: 'Switch Plus: we zoeken elke maand het voordeligste contract uit onze vergelijking voor je, met winstgarantie.',
        'premium-fit': `Premium: met een digitale meter en zonnepanelen zie je via de June Dongle live wat je verbruikt en injecteert. Gaat het je enkel om de besparing, dan hou je met Switch Plus ${m(SWP.priceYearly)} meer over per jaar.`,
        'premium-eats': 'Switch Plus. Wil je toch live inzicht via de June Dongle, dan kan je Premium in stap 3 nog kiezen.',
        'premium-analog': 'Switch Plus. Krijg je binnenkort een digitale meter, dan kan je later nog naar Premium.',
        'premium-eats-chosen': 'Switch Plus. Wil je Premium omwille van het live inzicht, dan kan dat nog altijd.',
        'premium-unknown': 'Je koos Premium. Dat houden we zo; wijzigen kan in stap 3.',
        chosen: 'Je koos {name}. Dat houden we zo; wijzigen kan in stap 3.',
      },
      next: 'Verder met {name}',
      nextLow: 'Toch verder met {name}',
      keep: 'Toch Premium',
      guaranteeLink: 'Meer over de winstgarantie',
      share: { label: 'Stuur deze schatting door', subject: 'Mijn schatting bij June', body: 'Volgens de indicatieve schatting van June hou ik na het {name}-abonnement {range} per jaar over. Zelf berekenen: {url}' },
      back: 'Gegevens aanpassen',
    } : {
      h2: 'Votre estimation indicative',
      tag: 'Indicatif',
      loading: 'Nous calculons votre estimation…',
      netLabel: 'Ce qu’il vous resterait par an selon notre estimation, après votre abonnement {name}',
      perYear: 'par an',
      ledger: { gross: 'Économie avant abonnement', fee: 'Abonnement {name}', net: 'Ce qu’il vous reste' },
      alt: 'Avec {name} ({fee} par an), il vous resterait environ {range}.',
      basis: 'Sur la base de {e} kWh d’électricité par an ({src}).', basisGas: 'Sur la base de {e} kWh d’électricité et {g} kWh de gaz par an ({src}).',
      own: 'vos chiffres', preset: 'estimé d’après votre ménage',
      footnote: 'Indicatif : calculé dans votre navigateur avec les hypothèses ci-dessous. Ni une offre ni une promesse. Après votre inscription, nous calculons votre économie personnelle, avec votre consommation réelle.',
      methodH: 'Comment nous l’avons calculé',
      method: [
        `Consommation : vos chiffres, ou une estimation par taille de ménage (${presets} ; électricité / gaz par an). Voiture électrique +${fmtN(EXTRA.ev, L)} kWh, pompe à chaleur +${fmtN(EXTRA.heatpump, L)} kWh et pas de gaz, panneaux solaires −30 % de prélèvement.`,
        `Écart de prix entre un contrat que personne ne suit et le contrat plus avantageux de notre comparaison : ${gap}, TVA comprise. Une fourchette en entrée, donc une fourchette en sortie.`,
        `Économie plafonnée à ${m(CAP)} par an. Nous en déduisons ensuite le prix de votre abonnement : c’est ce qu’il vous reste.`,
        'Votre code postal ne sert qu’à identifier votre région et votre gestionnaire de réseau, pas au calcul.',
        'Ceci n’est ni une offre ni une promesse. Nous calculons votre économie personnelle après votre inscription, avec votre consommation réelle et les contrats du moment.',
      ],
      low: { h: 'Pour être francs : vous êtes déjà bien servi', body: `Selon cette estimation approximative, il vous resterait moins de ${m(LOW_THRESHOLD)} par an après un abonnement. Vous êtes peut-être déjà sur un bon contrat. Vous voulez en avoir le cœur net ? ${guarantee}` },
      notice: {
        'premium-analog': 'Premium fonctionne uniquement avec un compteur numérique : le June Dongle se branche sur le port P1. Avec votre compteur analogique, nous vous conseillons Switch Plus, avec la même garantie de gain.',
        'premium-eats-chosen': `Premium coûte ${m(PREM.priceYearly)} par an. Selon cette estimation, cela absorberait une grande partie de votre économie. Avec Switch Plus, il vous reste davantage, avec la même garantie de gain.`,
        'premium-eats': `Premium (avec le June Dongle) convient à votre compteur numérique et à vos panneaux solaires, mais coûte ${m(PREM.priceYearly)} par an. Selon cette estimation, cela absorberait une grande partie de votre économie. C’est pourquoi nous vous conseillons Switch Plus.`,
        'premium-unknown': 'Premium fonctionne uniquement avec un compteur numérique. Vous ne savez pas quel compteur vous avez ? Nous le vérifions ensemble après votre inscription. Avec un compteur analogique, choisissez plutôt Switch Plus à l’étape 3.',
      },
      recH: 'Notre conseil',
      rec: {
        default: 'Switch Plus : nous cherchons chaque mois pour vous le contrat le plus avantageux parmi ceux que nous comparons, avec la garantie de gain.',
        'premium-fit': `Premium : avec un compteur numérique et des panneaux solaires, le June Dongle vous montre en direct ce que vous consommez et injectez. Si seule l’économie compte pour vous, il vous reste ${m(SWP.priceYearly)} de plus par an avec Switch Plus.`,
        'premium-eats': 'Switch Plus. Vous tenez au suivi en direct avec le June Dongle ? Vous pouvez encore choisir Premium à l’étape 3.',
        'premium-analog': 'Switch Plus. Vous recevez bientôt un compteur numérique ? Vous pourrez passer à Premium plus tard.',
        'premium-eats-chosen': 'Switch Plus. Vous tenez au suivi en direct ? Premium reste possible.',
        'premium-unknown': 'Vous avez choisi Premium. Nous le gardons ; vous pourrez le modifier à l’étape 3.',
        chosen: 'Vous avez choisi {name}. Nous le gardons ; vous pourrez le modifier à l’étape 3.',
      },
      next: 'Continuer avec {name}',
      nextLow: 'Continuer quand même avec {name}',
      keep: 'Garder Premium',
      guaranteeLink: 'En savoir plus sur la garantie de gain',
      share: { label: 'Envoyer cette estimation à un proche', subject: 'Mon estimation chez June', body: 'Selon l’estimation indicative de June, il me resterait {range} par an après l’abonnement {name}. Faire le calcul : {url}' },
      back: 'Modifier mes réponses',
    },
    s2: nl ? {
      h2: 'Je abonnement',
      plan: { legend: 'Kies je abonnement', rec: 'Ons advies voor jou', billed: 'jaarlijks gefactureerd', guarantee: 'Winstgarantie', noGuarantee: 'Zonder winstgarantie', dongle: 'June Dongle inbegrepen', digital: 'Vraagt een digitale meter', net: 'Jij houdt naar schatting over', perYear: 'per jaar' },
      guaranteeNote: guarantee,
      premAnalog: 'Premium werkt enkel met een digitale meter. Kies Switch of Switch Plus, of ga toch verder als je binnenkort een digitale meter krijgt.',
      pref: { legend: 'Hoe wil je wisselen?', why: 'Beide kan, bij elk abonnement. Kies wat bij je past.', opts: [['ask', 'Vraag het me voor elke overstap', 'We sturen je elk voorstel. Jij keurt de overstap goed, of niet.'], ['auto', 'Wissel automatisch', 'We wisselen zodra een contract voordeliger is, en laten je weten waarom.']] },
      green: 'Vergelijk enkel contracten met 100% groene stroom (volgens de leverancier)',
      email: { label: 'E-mailadres', why: 'Om je aanmelding te bewaren en je schatting te sturen. Niet voor reclame, tenzij je dat hieronder apart aanvinkt.', ph: 'naam@voorbeeld.be' },
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
      plan: { legend: 'Choisissez votre abonnement', rec: 'Notre conseil pour vous', billed: 'facturé annuellement', guarantee: 'Garantie de gain', noGuarantee: 'Sans garantie de gain', dongle: 'June Dongle inclus', digital: 'Nécessite un compteur numérique', net: 'Il vous resterait environ', perYear: 'par an' },
      guaranteeNote: guarantee,
      premAnalog: 'Premium fonctionne uniquement avec un compteur numérique. Choisissez Switch ou Switch Plus, ou continuez si vous recevez bientôt un compteur numérique.',
      pref: { legend: 'Comment voulez-vous changer ?', why: 'Les deux sont possibles, avec chaque abonnement. Choisissez ce qui vous convient.', opts: [['ask', 'Demandez-moi avant chaque changement', 'Nous vous envoyons chaque proposition. Vous validez le changement, ou pas.'], ['auto', 'Changez automatiquement', 'Nous changeons dès qu’un contrat est plus avantageux, et vous expliquons pourquoi.']] },
      green: 'Ne comparer que des contrats 100 % électricité verte (selon le fournisseur)',
      email: { label: 'Adresse e-mail', why: 'Pour sauvegarder votre inscription et vous envoyer votre estimation. Pas de publicité, sauf si vous cochez la case prévue ci-dessous.', ph: 'nom@exemple.be' },
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
      h2: 'Top, check je mailbox',
      body: 'We stuurden een e-mail naar {email}. Klik op de link om je aanmelding af te ronden.',
      recap: 'Je keuzes', planL: 'Abonnement', prefL: 'Wisselen', greenL: 'Enkel groene stroom', yes: 'Ja', no: 'Nee',
      notReceived: 'Niets ontvangen? Kijk in je spam, of controleer je e-mailadres hierboven.',
      proto: 'Prototype: er werd geen e-mail verstuurd en niets opgeslagen.',
      home: 'Terug naar de startpagina', how: 'Lees intussen hoe June werkt',
    } : {
      h2: 'C’est parti, consultez votre boîte mail',
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
      empty: 'nog niet ingevuld', notAsked: 'nog niet gevraagd', none: 'geen',
      never: 'Naam, adres, EAN-code en rekeningnummer vragen we pas later, als je verder wil.',
      trust: 'Geen leverancier · je energie blijft lopen · 14 dagen bedenktijd',
    } : {
      h2: 'Ce que nous savons de vous',
      intro: 'Tout ce que vous indiquez apparaît ici. Rien d’autre.',
      rows: { postcode: 'Code postal', region: 'Région', energy: 'Énergie', usage: 'Consommation', meter: 'Compteur', extras: 'Équipements', email: 'Adresse e-mail' },
      empty: 'pas encore indiqué', notAsked: 'pas encore demandée', none: 'aucun',
      never: 'Nom, adresse, code EAN et numéro de compte ne sont demandés que plus tard, si vous continuez.',
      trust: 'Pas un fournisseur · votre énergie continue · 14 jours de rétractation',
    },
    noscript: nl
      ? 'Je schatting berekenen we met een klein script in je browser. Het staat uit, dus je ziet alle vragen onder elkaar. Je kan ze nog steeds invullen en versturen.'
      : 'Votre estimation est calculée par un petit script dans votre navigateur. Il est désactivé : toutes les questions s’affichent donc à la suite. Vous pouvez tout de même les remplir et les envoyer.',
    plans: [SW, SWP, PREM].map(plan),
    guaranteeAmount: g,
  };
});

export const signupCopy = (locale) => ({ ...siteCopy(locale), ...signup(locale) });

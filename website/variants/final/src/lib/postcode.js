/* Postcode → town, province, region and grid operator (distribution system operator, DSO).
   Ranges follow the Belgian postcode system; the town list covers the main postcodes and is not
   exhaustive (unknown codes show "province, region" instead of a town). Used for the confirmation
   line and the "Wat we van je weten" panel only, never in the maths.
   Grid operators: Flanders = Fluvius, Brussels = Sibelga. Wallonia has several (ORES serves most
   municipalities, RESA most of the province of Liège, a few towns have a local operator), so the
   label says "meestal / généralement" there rather than claiming one name. */

export const PC_RE = /^[1-9]\d{3}$/;

const RANGES = [
  [1000, 1299, 'BXL', 'Brussel', 'Bruxelles'], [1300, 1499, 'WA', 'Waals-Brabant', 'Brabant wallon'], [1500, 1999, 'VL', 'Vlaams-Brabant', 'Brabant flamand'],
  [2000, 2999, 'VL', 'Antwerpen', 'Anvers'], [3000, 3499, 'VL', 'Vlaams-Brabant', 'Brabant flamand'], [3500, 3999, 'VL', 'Limburg', 'Limbourg'],
  [4000, 4999, 'WA', 'Luik', 'Liège'], [5000, 5999, 'WA', 'Namen', 'Namur'], [6000, 6599, 'WA', 'Henegouwen', 'Hainaut'],
  [6600, 6999, 'WA', 'Luxemburg', 'Luxembourg'], [7000, 7999, 'WA', 'Henegouwen', 'Hainaut'], [8000, 8999, 'VL', 'West-Vlaanderen', 'Flandre-Occidentale'],
  [9000, 9999, 'VL', 'Oost-Vlaanderen', 'Flandre-Orientale'],
];
const REGIONS = { VL: ['Vlaanderen', 'Flandre'], BXL: ['Brussel', 'Bruxelles'], WA: ['Wallonië', 'Wallonie'] };

// [nl, fr] (same name when identical)
const TOWNS = {
  1000: ['Brussel', 'Bruxelles'], 1020: ['Laken', 'Laeken'], 1030: ['Schaarbeek', 'Schaerbeek'], 1040: ['Etterbeek'], 1050: ['Elsene', 'Ixelles'],
  1060: ['Sint-Gillis', 'Saint-Gilles'], 1070: ['Anderlecht'], 1080: ['Sint-Jans-Molenbeek', 'Molenbeek-Saint-Jean'], 1081: ['Koekelberg'],
  1082: ['Sint-Agatha-Berchem', 'Berchem-Sainte-Agathe'], 1083: ['Ganshoren'], 1090: ['Jette'], 1120: ['Neder-Over-Heembeek'], 1140: ['Evere'],
  1150: ['Sint-Pieters-Woluwe', 'Woluwe-Saint-Pierre'], 1160: ['Oudergem', 'Auderghem'], 1170: ['Watermaal-Bosvoorde', 'Watermael-Boitsfort'],
  1180: ['Ukkel', 'Uccle'], 1190: ['Vorst', 'Forest'], 1200: ['Sint-Lambrechts-Woluwe', 'Woluwe-Saint-Lambert'], 1210: ['Sint-Joost-ten-Node', 'Saint-Josse-ten-Noode'],
  1300: ['Waver', 'Wavre'], 1340: ['Ottignies'], 1348: ['Louvain-la-Neuve'], 1400: ['Nijvel', 'Nivelles'], 1410: ['Waterloo'], 1420: ['Eigenbrakel', 'Braine-l’Alleud'],
  1500: ['Halle', 'Hal'], 1600: ['Sint-Pieters-Leeuw', 'Leeuw-Saint-Pierre'], 1700: ['Dilbeek'], 1780: ['Wemmel'], 1800: ['Vilvoorde', 'Vilvorde'],
  1830: ['Machelen'], 1850: ['Grimbergen'], 1930: ['Zaventem'], 1970: ['Wezembeek-Oppem'],
  2000: ['Antwerpen', 'Anvers'], 2018: ['Antwerpen', 'Anvers'], 2020: ['Antwerpen', 'Anvers'], 2060: ['Antwerpen', 'Anvers'], 2100: ['Deurne'],
  2140: ['Borgerhout'], 2150: ['Borsbeek'], 2170: ['Merksem'], 2200: ['Herentals'], 2300: ['Turnhout'], 2400: ['Mol'], 2440: ['Geel'],
  2500: ['Lier', 'Lierre'], 2530: ['Boechout'], 2550: ['Kontich'], 2600: ['Berchem'], 2610: ['Wilrijk'], 2640: ['Mortsel'], 2800: ['Mechelen', 'Malines'],
  2830: ['Willebroek'], 2900: ['Schoten'], 2930: ['Brasschaat'], 2950: ['Kapellen'],
  3000: ['Leuven', 'Louvain'], 3001: ['Heverlee'], 3010: ['Kessel-Lo'], 3080: ['Tervuren'], 3200: ['Aarschot'], 3290: ['Diest'], 3300: ['Tienen', 'Tirlemont'],
  3500: ['Hasselt'], 3600: ['Genk'], 3700: ['Tongeren', 'Tongres'], 3800: ['Sint-Truiden', 'Saint-Trond'], 3900: ['Pelt'], 3920: ['Lommel'],
  4000: ['Luik', 'Liège'], 4020: ['Luik', 'Liège'], 4030: ['Grivegnée'], 4100: ['Seraing'], 4300: ['Borgworm', 'Waremme'], 4500: ['Hoei', 'Huy'],
  4600: ['Wezet', 'Visé'], 4700: ['Eupen'], 4800: ['Verviers'], 4900: ['Spa'], 4960: ['Malmedy'],
  5000: ['Namen', 'Namur'], 5100: ['Jambes'], 5300: ['Andenne'], 5500: ['Dinant'], 5600: ['Philippeville'],
  6000: ['Charleroi'], 6040: ['Jumet'], 6200: ['Châtelet'], 6700: ['Aarlen', 'Arlon'], 6800: ['Libramont'], 6900: ['Marche-en-Famenne'],
  7000: ['Bergen', 'Mons'], 7100: ['La Louvière'], 7300: ['Boussu'], 7500: ['Doornik', 'Tournai'], 7700: ['Moeskroen', 'Mouscron'], 7800: ['Aat', 'Ath'],
  8000: ['Brugge', 'Bruges'], 8300: ['Knokke-Heist'], 8400: ['Oostende', 'Ostende'], 8500: ['Kortrijk', 'Courtrai'], 8620: ['Nieuwpoort', 'Nieuport'],
  8800: ['Roeselare', 'Roulers'], 8900: ['Ieper', 'Ypres'], 8930: ['Menen', 'Menin'],
  9000: ['Gent', 'Gand'], 9030: ['Mariakerke'], 9040: ['Sint-Amandsberg'], 9050: ['Gentbrugge'], 9100: ['Sint-Niklaas', 'Saint-Nicolas'],
  9120: ['Beveren'], 9200: ['Dendermonde', 'Termonde'], 9300: ['Aalst', 'Alost'], 9400: ['Ninove'], 9500: ['Geraardsbergen', 'Grammont'],
  9600: ['Ronse', 'Renaix'], 9700: ['Oudenaarde', 'Audenarde'], 9800: ['Deinze'], 9900: ['Eeklo'],
};

/**
 * @param {string} pc four-digit Belgian postcode
 * @param {'nl'|'fr'} L
 * @returns {null | { code: 'VL'|'BXL'|'WA', region: string, province: string, town: string|null, dso: string }}
 */
export function lookupPostcode(pc, L = 'nl') {
  const s = String(pc || '').trim();
  if (!PC_RE.test(s)) return null;
  const n = Number(s);
  const r = RANGES.find((x) => n >= x[0] && n <= x[1]);
  if (!r) return null;
  const fr = L === 'fr';
  const code = r[2];
  const t = TOWNS[n];
  const dso = code === 'VL' ? 'Fluvius' : code === 'BXL' ? 'Sibelga'
    : n >= 4000 && n <= 4999 ? (fr ? 'généralement RESA' : 'meestal RESA') : (fr ? 'généralement ORES' : 'meestal ORES');
  return { code, region: REGIONS[code][fr ? 1 : 0], province: fr ? r[4] : r[3], town: t ? t[fr && t[1] ? 1 : 0] : null, dso };
}

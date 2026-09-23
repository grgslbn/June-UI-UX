/* ==========================================================================
   Indicative savings estimate — THE ONE PLACE where the maths and the plan advice live.
   ILLUSTRATIVE MODEL, not June's pricing engine. Product-owner decision (final brief): keep the
   in-browser indicative range, net of the plan fee first, with the full method shown, labelled
   "Indicatief" + footnote, until June's engine replaces it. To go live, swap the body of
   `getEstimate()` for a call to the pricing API and keep the returned shape (`Estimate` below).
   Callers (sign-up funnel, later plan ledgers) only depend on that shape.

   1. Annual use: the visitor's own kWh if given, otherwise a household preset (round figures in the
      range of Belgian reference households; to be replaced by VREG/CREG/CWaPE/Brugel profiles):
        people      1      2      3–4    5+
        elec kWh  1.800  2.800  3.800  5.000
        gas  kWh  8.000 12.000 16.000 20.000
      EV +2.000 kWh elec · heat pump +3.500 kWh elec (and no gas assumed) · solar: offtake −30 %.
   2. Gross saving = use × an assumed price gap between a contract nobody follows up and the more
      advantageous contract in our comparison: elec € 0,03–0,06/kWh · gas € 0,008–0,016/kWh (incl. VAT).
      A band in, a range out: never one number.
   3. Gross capped at € 700/year. Low end rounded down, high end rounded to the nearest € 10.
   4. Net = gross − the plan's yearly price. NOT floored at 0: when the fee exceeds the saving the formatter
      says so in words ("minder dan je abonnement kost") instead of a misleading "€ 0". The NET figure is the headline.
   5. Advice (never recommend a plan whose fee eats the saving):
      - Premium only fits a digital meter; it is suggested for digital meter + solar panels, and only
        when you keep something even at the low end of the range (net low end > 0).
      - A visitor who came in with ?plan=premium and an analogue meter gets Switch Plus, with the reason.
      - A visitor who came in with ?plan=premium where Premium's fee eats the saving gets Switch Plus,
        with the reason and the option to keep Premium anyway.
      - If even the advised plan leaves less than € 50 at the high end, the verdict is "low": the page
        says honestly "Je zit al goed" and explains the guarantee instead of pushing.
   The postcode only sets the region label; it is not used in the maths.
   ========================================================================== */

export const PRESETS = {
  '1': { elec: 1800, gas: 8000 },
  '2': { elec: 2800, gas: 12000 },
  '3-4': { elec: 3800, gas: 16000 },
  '5+': { elec: 5000, gas: 20000 },
};
export const GAP = { elec: [0.03, 0.06], gas: [0.008, 0.016] };
export const CAP = 700;
export const EXTRA = { ev: 2000, heatpump: 3500, solarFactor: 0.7 };
export const LOW_THRESHOLD = 50;
export const KWH_RANGE = [100, 100000];
export const PLAN_SLUGS = ['switch', 'switch-plus', 'premium'];
/** Yearly fees (frozen prices). Inlined so the client bundle does not carry facts.json; src/i18n/signup.js
 *  asserts at build time that they still equal facts.json plans[].priceYearly. */
export const FEES = { switch: 69, 'switch-plus': 99, premium: 198 };

const down10 = (v) => Math.max(0, Math.floor(v / 10) * 10);
const near10 = (v) => Math.max(0, Math.round(v / 10) * 10);
const sdown10 = (v) => Math.floor(v / 10) * 10 || 0; // signed (net may be below zero)
const snear10 = (v) => Math.round(v / 10) * 10 || 0;
const kwh = (v) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : 0; };

/** Usage + gross range (pure, synchronous). */
export function usageAndGross(i) {
  const p = PRESETS[i.household] || PRESETS['2'];
  const ownE = kwh(i.kwhElec) > 0, ownG = kwh(i.kwhGas) > 0 && i.energy === 'both';
  let elec = ownE ? kwh(i.kwhElec) : p.elec + (i.ev ? EXTRA.ev : 0) + (i.heatpump ? EXTRA.heatpump : 0);
  if (!ownE && i.solar) elec = Math.round(elec * EXTRA.solarFactor);
  const wantGas = i.energy === 'both' && !(i.heatpump && !ownG);
  const gas = !wantGas ? 0 : ownG ? kwh(i.kwhGas) : p.gas;
  const lo = Math.min(CAP, elec * GAP.elec[0] + gas * GAP.gas[0]);
  const hi = Math.min(CAP, elec * GAP.elec[1] + gas * GAP.gas[1]);
  return { elec, gas, own: ownE || ownG, gross: [down10(lo), near10(hi)] };
}

/** Net range for a gross range and a yearly fee (signed: can be below zero). */
export const net = (gross, fee) => [sdown10(gross[0] - fee), snear10(gross[1] - fee)];

/**
 * Plan advice. Returns { recommended, reason, alt }.
 * reason: 'default' | 'premium-fit' | 'premium-eats' | 'premium-analog' | 'premium-eats-chosen' | 'premium-unknown' | 'chosen'
 */
export function advise(i, nets) {
  const chosen = PLAN_SLUGS.includes(i.plan) ? i.plan : null;
  const fits = i.meter === 'digital' && !!i.solar;
  const premKeeps = nets.premium[0] > 0;
  if (chosen === 'premium') {
    if (i.meter === 'analog') return { recommended: 'switch-plus', reason: 'premium-analog', alt: null };
    if (!premKeeps) return { recommended: 'switch-plus', reason: 'premium-eats-chosen', alt: 'premium' };
    if (i.meter === 'unknown') return { recommended: 'premium', reason: 'premium-unknown', alt: 'switch-plus' };
    return { recommended: 'premium', reason: 'chosen', alt: 'switch-plus' };
  }
  if (chosen) return { recommended: chosen, reason: 'chosen', alt: null };
  if (fits && premKeeps) return { recommended: 'premium', reason: 'premium-fit', alt: 'switch-plus' };
  if (fits) return { recommended: 'switch-plus', reason: 'premium-eats', alt: 'premium' };
  return { recommended: 'switch-plus', reason: 'default', alt: null };
}

/**
 * @typedef {{ source: 'illustrative'|'api', elec: number, gas: number, own: boolean,
 *   gross: [number, number], fees: Record<string, number>, nets: Record<string, [number, number]>,
 *   recommended: string, reason: string, alt: string|null, verdict: 'save'|'low', chosen: string|null }} Estimate
 */

/**
 * THE seam for June's engine. Async so a fetch() can replace the body without touching callers.
 * @param {{ energy:'elec'|'both', household?:string, kwhElec?:number|string, kwhGas?:number|string,
 *   meter?:'digital'|'analog'|'unknown', solar?:boolean, ev?:boolean, heatpump?:boolean, plan?:string }} input
 * @returns {Promise<Estimate>}
 */
export async function getEstimate(input) {
  // Future: const r = await fetch('/api/estimate', { method: 'POST', body: JSON.stringify(input) }); return r.json();
  const u = usageAndGross(input);
  const nets = Object.fromEntries(PLAN_SLUGS.map((s) => [s, net(u.gross, FEES[s])]));
  const a = advise(input, nets);
  const verdict = nets[a.recommended][1] < LOW_THRESHOLD ? 'low' : 'save';
  return { source: 'illustrative', ...u, fees: FEES, nets, ...a, verdict, chosen: PLAN_SLUGS.includes(input.plan) ? input.plan : null };
}

/* ── Belgian money formatting (content freeze §1): NL "€ 1.234", FR "1 234 €" ── */
const NBSP = ' ', NNBSP = ' ';
export const fmtNum = (n, L) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, L === 'fr' ? NNBSP : '.');
export const fmtEur = (n, L) => (L === 'fr' ? `${fmtNum(n, L)}${NBSP}€` : `€${NBSP}${fmtNum(n, L)}`);
const BELOW = { nl: 'minder dan je abonnement kost', fr: 'moins que le prix de votre abonnement' };
/** Range formatter. A (net) range that dips below zero is said in words, never shown as "€ 0" or a clipped range. */
export const fmtRange = (r, L) => {
  const l = L === 'fr' ? 'fr' : 'nl';
  if (r[1] <= 0) return BELOW[l];
  if (r[0] < 0) return l === 'fr' ? `jusqu’à ${fmtEur(r[1], L)}, ou ${BELOW.fr}` : `tot ${fmtEur(r[1], L)}, of ${BELOW.nl}`;
  return `${fmtEur(r[0], L)} – ${fmtEur(r[1], L)}`;
};
/** True when a range needs words instead of two amounts (for styling). */
export const isBelowZero = (r) => r[0] < 0;

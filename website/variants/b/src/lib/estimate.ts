/* ==========================================================================
   Savings estimate: ILLUSTRATIVE MODEL (variant B · Savings First)
   --------------------------------------------------------------------------
   THE ONE PLACE where the in-browser estimate is computed. Every page (home
   calculator, plans equation, sign-up estimate step) imports from here.
   To go live, replace `estimate()` with June's real model, or wire
   `getEstimate()` to the pricing API. Callers only depend on the
   `Estimate` shape below.

   Status: NOT June's pricing engine. Needs pricing + legal sign-off before
   go-live (claims register C1 / C17, price rule 2). On every surface it is
   labelled "indicatief / illustratif", shown as a RANGE, explained in a
   method popover, and footnoted: the real estimate uses your own
   consumption data (fn-6).

   What it does, in plain words:
   1. Annual use (kWh) comes from the housing type, unless the visitor enters
      their own numbers ("ik ken mijn verbruik").
        appartement 2.000 kWh elec · 8.000 kWh gas
        rijwoning   3.000 · 13.000
        halfopen    3.500 · 17.000
        open        4.500 · 23.000
      (Round assumptions in the range of commonly cited Belgian reference
      households. To be replaced by VREG/CREG/CWaPE/Brugel profiles:
      facts.json signup.householdPresets needsConfirmation.)
   2. Solar panels (sign-up step only): offtake from the grid is taken as
      70% of the electricity use, and an extra injection-tariff gap of
      € 0,01 – 0,03 per kWh on an assumed 2.500 kWh injected per year.
   3. Gross saving = use × an assumed price gap between a typical "never
      switched" contract and the more advantageous contract in our comparison:
        electricity € 0,03 – 0,06 per kWh · gas € 0,008 – 0,016 per kWh (incl. VAT)
      The gap is a band, so the result is always a RANGE, never one number.
   4. Gross is capped at € 700 per year (no runaway numbers for big inputs).
   5. Net = gross − the yearly subscription of the chosen plan (default
      Switch Plus € 99), floored at 0. Low end rounded down, high end
      rounded to the nearest € 10.
   6. If the high end of the net range is below € 50, surfaces do not push a
      number: they show the honest fallback "Je zit al goed. June houdt het zo."
   7. Meter type does not change the maths; it only drives the plan
      recommendation (Premium needs a digital meter; digital + solar →
      Premium is recommended, everything else → Switch Plus).
   The postcode only confirms the region here; it is not used in the maths.
   ========================================================================== */
import facts from '@shared/content/facts.json';

export type Housing = 'apartment' | 'terraced' | 'semi' | 'detached';
export type Energy = 'elec' | 'both';
export type Meter = 'digital' | 'analogue' | 'unknown';
export type PlanSlug = 'switch' | 'switch-plus' | 'premium';
export type Locale = 'nl-be' | 'fr-be';

export const HOUSINGS: Housing[] = ['apartment', 'terraced', 'semi', 'detached'];
export const PLAN_SLUGS: PlanSlug[] = ['switch', 'switch-plus', 'premium'];

export const PROFILES: Record<Housing, { elec: number; gas: number }> = {
  apartment: { elec: 2000, gas: 8000 },
  terraced: { elec: 3000, gas: 13000 },
  semi: { elec: 3500, gas: 17000 },
  detached: { elec: 4500, gas: 23000 },
};
export const GAP = { elec: [0.03, 0.06], gas: [0.008, 0.016], injection: [0.01, 0.03] } as const;
export const SOLAR = { offtakeShare: 0.7, injectedKwh: 2500 } as const;
export const CAP = 700;
export const LOW_THRESHOLD = 50;
/** Yearly fees straight from facts.json (frozen prices). */
export const FEES: Record<PlanSlug, number> = Object.fromEntries(
  facts.plans.map(p => [p.slug, p.priceYearly]),
) as Record<PlanSlug, number>;
export const FEE = FEES['switch-plus'];

export interface Input {
  housing: Housing; energy: Energy;
  elecKwh?: number | null; gasKwh?: number | null;
  solar?: boolean; plan?: PlanSlug;
}
export interface Estimate {
  elecKwh: number; gasKwh: number;
  elec: [number, number]; gas: [number, number];
  gross: [number, number]; net: [number, number];
  fee: number; plan: PlanSlug; low: boolean; custom: boolean;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const down10 = (v: number) => Math.max(0, Math.floor(v / 10) * 10);
const near10 = (v: number) => Math.max(0, Math.round(v / 10) * 10);

export function estimate(i: Input): Estimate {
  const p = PROFILES[i.housing] ?? PROFILES.terraced;
  const plan: PlanSlug = i.plan && FEES[i.plan] ? i.plan : 'switch-plus';
  const fee = FEES[plan];
  const customE = Number.isFinite(i.elecKwh) && (i.elecKwh as number) > 0;
  const customG = Number.isFinite(i.gasKwh) && (i.gasKwh as number) > 0;
  const elecKwh = customE ? clamp(i.elecKwh as number, 300, 15000) : p.elec;
  const gasKwh = i.energy === 'both' ? (customG ? clamp(i.gasKwh as number, 1000, 60000) : p.gas) : 0;
  const offtake = i.solar ? elecKwh * SOLAR.offtakeShare : elecKwh;
  const inj = i.solar ? SOLAR.injectedKwh : 0;
  const elec: [number, number] = [offtake * GAP.elec[0] + inj * GAP.injection[0], offtake * GAP.elec[1] + inj * GAP.injection[1]];
  const gas: [number, number] = [gasKwh * GAP.gas[0], gasKwh * GAP.gas[1]];
  const gross: [number, number] = [Math.min(CAP, elec[0] + gas[0]), Math.min(CAP, elec[1] + gas[1])];
  const net: [number, number] = [down10(gross[0] - fee), near10(gross[1] - fee)];
  return {
    elecKwh, gasKwh,
    elec: [down10(elec[0]), near10(elec[1])], gas: [down10(gas[0]), near10(gas[1])],
    gross: [down10(gross[0]), near10(gross[1])], net, fee, plan,
    low: net[1] < LOW_THRESHOLD, custom: customE || customG,
  };
}

/** Net range for a given gross range and plan (plans page equation). */
export const netFor = (gross: [number, number], plan: PlanSlug): [number, number] =>
  [down10(gross[0] - FEES[plan]), near10(gross[1] - FEES[plan])];

/** Plan recommendation (conversion-strategy §2.4). */
export function recommendPlan(meter: Meter | null | undefined, solar: boolean | null | undefined): PlanSlug {
  return meter === 'digital' && solar ? 'premium' : 'switch-plus';
}

/** Async seam for the real pricing API. Swap the body; keep the signature. */
export async function getEstimate(i: Input): Promise<Estimate & { source: 'illustrative' | 'api' }> {
  return { ...estimate(i), source: 'illustrative' };
}

/* ── Query / storage contract shared by home calculator → sign-up → plans ── */
export const QUERY = { postcode: 'postcode', housing: 'woning', energy: 'energie', elec: 'kwh_elek', gas: 'kwh_gas', plan: 'plan' } as const;
export const STORE_KEY = 'june_b_calc';
export function fromParams(sp: URLSearchParams): Partial<Input> & { postcode?: string } {
  const n = (v: string | null) => (v && /^\d+$/.test(v) ? Number(v) : null);
  const h = sp.get(QUERY.housing) as Housing | null;
  const e = sp.get(QUERY.energy) as Energy | null;
  const pl = sp.get(QUERY.plan) as PlanSlug | null;
  const pc = (sp.get(QUERY.postcode) || '').replace(/\D/g, '').slice(0, 4);
  return {
    postcode: pc || undefined,
    housing: h && HOUSINGS.includes(h) ? h : undefined,
    energy: e === 'elec' || e === 'both' ? e : undefined,
    elecKwh: n(sp.get(QUERY.elec)), gasKwh: n(sp.get(QUERY.gas)),
    plan: pl && PLAN_SLUGS.includes(pl) ? pl : undefined,
  };
}

/* ── Belgian money formatting (content-freeze §1) ─────────────────────── */
const NBSP = ' ', NNBSP = ' ';
export const num = (n: number, l: Locale) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, l === 'fr-be' ? NNBSP : '.');
export const eur = (n: number, l: Locale) => (l === 'fr-be' ? `${num(n, l)}${NBSP}€` : `€${NBSP}${num(n, l)}`);
export const eurDec = (n: number, l: Locale) => {
  const s = n.toFixed(2).replace('.', ',');
  return l === 'fr-be' ? `${s}${NBSP}€` : `€${NBSP}${s}`;
};
export const eurRange = (a: number, b: number, l: Locale) =>
  l === 'fr-be' ? `${num(a, l)}${NBSP}–${NBSP}${num(b, l)}${NBSP}€` : `€${NBSP}${num(a, l)}${NBSP}–${NBSP}${num(b, l)}`;

/* ── Postcode → region (confirmation only) ───────────────────────────── */
export type Region = 'vl' | 'wa' | 'bxl';
export function region(pc: string): Region | null {
  if (!/^[1-9]\d{3}$/.test(pc)) return null;
  const n = +pc;
  if (n < 1300) return 'bxl';
  if (n < 1500) return 'wa';
  if (n < 4000) return 'vl';
  if (n < 8000) return 'wa';
  return 'vl';
}

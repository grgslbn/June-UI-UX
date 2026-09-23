/* ==========================================================================
   Savings estimate — ILLUSTRATIVE MODEL (concept B · Savings First)
   --------------------------------------------------------------------------
   Status: concept only. Needs pricing + legal sign-off before go-live
   (claims register C1 / C17, price rule 2). It is NOT June's pricing engine.

   What it does, in plain words:
   1. Annual use (kWh) comes from the housing type, unless the visitor enters
      their own numbers ("ik ken mijn verbruik").
        appartement 2.000 kWh elec · 8.000 kWh gas
        rijwoning   3.000 · 13.000
        halfopen    3.500 · 17.000
        open        4.500 · 23.000
      (Round assumptions in the range of commonly cited Belgian reference
      households. To be replaced by VREG/CREG/CWaPE/Brugel profiles — facts.json
      signup.householdPresets needsConfirmation.)
   2. Gross saving = use × an assumed price gap between a typical "never
      switched" contract and the more advantageous contract in our comparison:
        electricity € 0,03 – 0,06 per kWh · gas € 0,008 – 0,016 per kWh (incl. VAT)
      The gap is a band, so the result is always a RANGE, never one number.
   3. Gross is capped at € 700 per year (no runaway numbers for big inputs).
   4. Net = gross − the Switch Plus subscription (€ 99 per year), floored at 0.
      Low end rounded down, high end rounded to the nearest € 10.
   5. If the high end of the net range is below € 50, the page does not push a
      number: it shows the honest fallback "Je zit al goed. June houdt het zo."
   The postcode only confirms the region here; it is not used in the maths.
   ========================================================================== */

export type Housing = 'apartment' | 'terraced' | 'semi' | 'detached';
export type Energy = 'elec' | 'both';
export type Locale = 'nl-be' | 'fr-be';

export const PROFILES: Record<Housing, { elec: number; gas: number }> = {
  apartment: { elec: 2000, gas: 8000 },
  terraced: { elec: 3000, gas: 13000 },
  semi: { elec: 3500, gas: 17000 },
  detached: { elec: 4500, gas: 23000 },
};
export const GAP = { elec: [0.03, 0.06], gas: [0.008, 0.016] } as const;
export const CAP = 700;
export const FEE = 99; // Switch Plus, € per year (facts.json plans[1].priceYearly)
export const LOW_THRESHOLD = 50;

export interface Input { housing: Housing; energy: Energy; elecKwh?: number | null; gasKwh?: number | null; }
export interface Estimate {
  elecKwh: number; gasKwh: number;
  elec: [number, number]; gas: [number, number];
  gross: [number, number]; net: [number, number];
  fee: number; low: boolean; custom: boolean;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const down10 = (v: number) => Math.max(0, Math.floor(v / 10) * 10);
const near10 = (v: number) => Math.max(0, Math.round(v / 10) * 10);

export function estimate(i: Input): Estimate {
  const p = PROFILES[i.housing] ?? PROFILES.terraced;
  const customE = Number.isFinite(i.elecKwh) && (i.elecKwh as number) > 0;
  const customG = Number.isFinite(i.gasKwh) && (i.gasKwh as number) > 0;
  const elecKwh = customE ? clamp(i.elecKwh as number, 300, 15000) : p.elec;
  const gasKwh = i.energy === 'both' ? (customG ? clamp(i.gasKwh as number, 1000, 60000) : p.gas) : 0;
  const elec: [number, number] = [elecKwh * GAP.elec[0], elecKwh * GAP.elec[1]];
  const gas: [number, number] = [gasKwh * GAP.gas[0], gasKwh * GAP.gas[1]];
  const gross: [number, number] = [Math.min(CAP, elec[0] + gas[0]), Math.min(CAP, elec[1] + gas[1])];
  const net: [number, number] = [down10(gross[0] - FEE), near10(gross[1] - FEE)];
  return {
    elecKwh, gasKwh,
    elec: [down10(elec[0]), near10(elec[1])], gas: [down10(gas[0]), near10(gas[1])],
    gross: [down10(gross[0]), near10(gross[1])], net, fee: FEE,
    low: net[1] < LOW_THRESHOLD, custom: customE || customG,
  };
}

/* ── Belgian money formatting (content-freeze §1) ─────────────────────── */
const NBSP = ' ', NNBSP = ' ';
export const num = (n: number, l: Locale) =>
  Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, l === 'fr-be' ? NNBSP : '.');
export const eur = (n: number, l: Locale) => (l === 'fr-be' ? `${num(n, l)}${NBSP}€` : `€${NBSP}${num(n, l)}`);
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

/* ==========================================================================
   Indicative savings range — ILLUSTRATIVE MODEL (variant C · Honest Market)
   Not June's pricing engine. Needs pricing + legal sign-off before go-live (claims register C1/C17,
   content-issues #20). The page shows every assumption below to the visitor, in plain words.

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
   4. Net = gross − the plan price per year (floored at 0).
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

const down10 = (v) => Math.max(0, Math.floor(v / 10) * 10);
const near10 = (v) => Math.max(0, Math.round(v / 10) * 10);

/** @param {{energy:'elec'|'both', household?:string, kwhElec?:number, kwhGas?:number, solar?:boolean, ev?:boolean, heatpump?:boolean}} i */
export function estimate(i) {
  const p = PRESETS[i.household] || PRESETS['2'];
  const ownE = Number(i.kwhElec) > 0, ownG = Number(i.kwhGas) > 0;
  let elec = ownE ? Number(i.kwhElec) : p.elec + (i.ev ? EXTRA.ev : 0) + (i.heatpump ? EXTRA.heatpump : 0);
  if (!ownE && i.solar) elec = Math.round(elec * EXTRA.solarFactor);
  const wantGas = i.energy === 'both' && !(i.heatpump && !ownG);
  const gas = !wantGas ? 0 : ownG ? Number(i.kwhGas) : p.gas;
  const lo = Math.min(CAP, elec * GAP.elec[0] + gas * GAP.gas[0]);
  const hi = Math.min(CAP, elec * GAP.elec[1] + gas * GAP.gas[1]);
  return { elec, gas, own: ownE || ownG, gross: [down10(lo), near10(hi)] };
}

export const net = (gross, fee) => [Math.max(0, down10(gross[0] - fee)), Math.max(0, near10(gross[1] - fee))];

/** Region + grid operator from a Belgian postcode (range-based, for the label only). */
export function region(pc) {
  const n = Number(pc);
  if (!/^[1-9]\d{3}$/.test(String(pc))) return null;
  if (n < 1300) return 'bxl';
  if (n < 1500 || (n >= 4000 && n < 8000)) return 'wal';
  return 'vl';
}

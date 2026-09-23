// Illustrative product data for the recreated app tiles. NOT customer data.
// Totals are the Insights app's own demo values (shots/final solar + peak panels):
// home used 9.6 kWh, panels made 8.4 kWh, 3.2 kWh exported, 62 % used at home,
// highest quarter 3.8 kW (= 0.95 kWh) at 14:30–14:45, "now" = 20:00.
const g = (x, mu, s) => Math.exp(-((x - mu) ** 2) / (2 * s * s));

/** Consumption per quarter-hour for quarters 0..79 (00:00–20:00). */
export const consumption = (() => {
  const q = Array.from({ length: 80 }, (_, i) => {
    const h = i / 4;
    return 0.07 + 0.22 * g(h, 7.5, 0.6) + 0.18 * g(h, 12.5, 0.5) + 0.12 * g(h, 17, 1.2) + 0.42 * g(h, 18.8, 0.7)
      + 0.05 * Math.sin(i * 1.7) ** 2;
  });
  q[58] = 0.95; // 14:30–14:45: washing machine + oven (the app demo's highest quarter)
  q[59] = 0.62;
  // Scale so 00:00–20:00 = 9,6 kWh (app demo: "Home used 9.6 kWh", until 20:00).
  const k = (9.6 - 0.95 - 0.62) / q.reduce((a, b, i) => a + (i === 58 || i === 59 ? 0 : b), 0);
  return q.map((v, i) => (i === 58 || i === 59 ? v : +(v * k).toFixed(3)));
})();

/** Solar production per quarter (kWh), bell 06:30–19:30, total ≈ 8.4 kWh. */
export const solar = (() => {
  const raw = Array.from({ length: 80 }, (_, i) => Math.max(0, g(i / 4, 13.2, 2.6) - 0.06));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map(v => +(v * (8.4 / sum)).toFixed(3));
})();

export const totals = { used: '9,6', made: '8,4', exported: '3,2', self: '5,2', imported: '4,4', selfPct: 62, peak: '0,95' };

/* Sign-up answers: one shape, one storage key, one query contract.
   - Any page can prefill the funnel with a GET link or form:
       /nl-be/aanmelden/?postcode=9000&plan=premium&energy=both&household=3-4&meter=digital&solar=1
     Keys: postcode · energy (elec|both) · household (1|2|3-4|5+) · kwh_elec · kwh_gas ·
           meter (digital|analog|unknown) · solar|ev|heatpump (1) · plan (switch|switch-plus|premium) ·
           pref (auto|ask) · green (1) · entry (CTA id, analytics only)
   - Answers live in sessionStorage (same origin for NL and FR), so back, reload and the language
     switch keep them. The e-mail address is kept in sessionStorage only, never in a URL or an event.
   - `estSeen: true` is set once the estimate step has actually been shown (read by the plans page ledger).
   - Per-step URLs are hash states, localised: NL #schatting #abonnement #bevestigd, FR #estimation
     #abonnement #confirmation (both spellings are accepted on either locale). */

export const STORE_KEY = 'june-signup';
export const STARTED_KEY = 'june-signup-started';

export const STEPS = ['home', 'est', 'plan', 'done'];
export const HASH = {
  nl: { est: 'schatting', plan: 'abonnement', done: 'bevestigd' },
  fr: { est: 'estimation', plan: 'abonnement', done: 'confirmation' },
};
export function stepFromHash(h) {
  const v = String(h || '').replace(/^#/, '');
  for (const L of ['nl', 'fr']) for (const [k, s] of Object.entries(HASH[L])) if (s === v) return k;
  return 'home';
}
export const hashFor = (step, L) => (step === 'home' ? '' : `#${HASH[L][step]}`);

const ENUM = {
  energy: ['elec', 'both'], household: ['1', '2', '3-4', '5+'], meter: ['digital', 'analog', 'unknown'],
  plan: ['switch', 'switch-plus', 'premium'], pref: ['auto', 'ask'],
};
const FLAGS = ['solar', 'ev', 'heatpump', 'green'];
const ALIAS = { analogue: 'analog', analoog: 'analog', analogique: 'analog', digitaal: 'digital', numerique: 'digital', 'switchplus': 'switch-plus' };

/** Parse the non-PII query contract (unknown or invalid values are ignored). */
export function fromQuery(search) {
  const q = new URLSearchParams(search);
  const out = {};
  const pc = (q.get('postcode') || '').replace(/\D/g, '').slice(0, 4);
  if (pc) out.postcode = pc;
  for (const [k, allowed] of Object.entries(ENUM)) {
    let v = (q.get(k) || '').toLowerCase().trim();
    v = ALIAS[v] || v;
    if (allowed.includes(v)) out[k] = v;
  }
  for (const f of FLAGS) if (q.has(f)) out[f] = ['1', 'true', 'on', 'yes', 'ja', 'oui'].includes((q.get(f) || '').toLowerCase());
  for (const [k, n] of [['kwh_elec', 'kwhElec'], ['kwh_gas', 'kwhGas']]) {
    const v = (q.get(k) || '').replace(/\D/g, '');
    if (v) out[n] = v;
  }
  return out;
}

/** The query for the language switch / sharing: non-PII answers only. */
export function toQuery(a) {
  const q = new URLSearchParams();
  if (a.postcode) q.set('postcode', a.postcode);
  for (const k of Object.keys(ENUM)) if (a[k]) q.set(k, a[k]);
  if (a.kwhElec) q.set('kwh_elec', a.kwhElec);
  if (a.kwhGas) q.set('kwh_gas', a.kwhGas);
  for (const f of FLAGS) if (a[f]) q.set(f, '1');
  const s = q.toString();
  return s ? `?${s}` : '';
}

export function load() {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || '{}') || {}; } catch { return {}; }
}
export function save(a) {
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(a)); } catch { /* private mode: answers live in the page only */ }
}
export function onceStarted() {
  try { if (sessionStorage.getItem(STARTED_KEY) === '1') return false; sessionStorage.setItem(STARTED_KEY, '1'); } catch { /* fire anyway */ }
  return true;
}

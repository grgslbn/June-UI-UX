// Sign-up island (variant E). Vanilla TS, no framework. Screens: s1 → est → s2 → done.
// - Accepts ?postcode=&plan= · fires `signup_started` once per session on the first valid postcode.
// - Accessible errors: inline message + aria-invalid + a polite status summary, focus to the first invalid field.
// - Back never loses data (screens are hidden, never reset) and the browser Back button follows the screens.
// - Estimate = ILLUSTRATIVE range (claims register C17 → labelled "indicatief", method note shown, no net figure).

type Screen = 's1' | 'est' | 's2' | 'done';
const I = JSON.parse(document.getElementById('su-i18n')?.textContent || '{}');
const nl = I.locale === 'nl-be';
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll(s)] as T[];

/* ── analytics (no PII: never the postcode, email or raw kWh) ── */
const track = (event: string, props: Record<string, unknown> = {}) => {
  try {
    const w = window as any;
    (w.dataLayer = w.dataLayer || []).push({ event, variant: 'e', locale: I.locale, ...props });
    document.dispatchEvent(new CustomEvent('june:track', { detail: { event, ...props } }));
  } catch { /* analytics must never break the flow */ }
};
const once = (key: string) => { try { if (sessionStorage.getItem(key)) return false; sessionStorage.setItem(key, '1'); } catch { /* private mode */ } return true; };

/* ── formatting ── */
const NB = ' ', NNB = ' ';
const num = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, nl ? '.' : NNB);
const eur = (n: number) => (nl ? `€${NB}${num(n)}` : `${num(n)}${NB}€`);
const range = (a: number, b: number) => (nl ? `€${NB}${num(a)} – ${num(b)}` : `${num(a)} – ${num(b)}${NB}€`);

/* ── postcode → region (confirmation only) ── */
type Region = 'bxl' | 'vl' | 'wa';
const region = (pc: string): Region | null => {
  if (!/^[1-9]\d{3}$/.test(pc)) return null;
  const n = +pc;
  if (n > 9992) return null;
  if (n < 1300) return 'bxl';
  if (n < 1500) return 'wa';
  if (n < 4000) return 'vl';
  if (n < 8000) return 'wa';
  return 'vl';
};

/* ── illustrative estimate model (to be replaced by June's engine) ──
   Usage presets per household (kWh/year, indicative — facts.signup.householdPresets needsConfirmation):
   1 p: 1.600 elec · 9.000 gas | 2 p: 2.500 · 12.000 | 3–4 p: 3.500 · 17.000 | 5+: 4.500 · 22.000
   Price gap between a never-adjusted contract and a better one in the comparison (incl. VAT):
   elec € 0,03–0,06/kWh · gas € 0,008–0,016/kWh. Gross only, capped at € 700, rounded to € 10. */
const PRESET: Record<string, [number, number]> = { '1': [1600, 9000], '2': [2500, 12000], '3-4': [3500, 17000], '5+': [4500, 22000] };
const estimate = (hh: string | null, energy: string, kwh: number | null, gas: number | null) => {
  const p = PRESET[hh || '2'] || PRESET['2'];
  const e = kwh ?? p[0];
  const g = energy === 'both' ? (gas ?? p[1]) : 0;
  const lo = Math.min(700, e * 0.03 + g * 0.008), hi = Math.min(700, e * 0.06 + g * 0.016);
  return { lo: Math.max(0, Math.floor(lo / 10) * 10), hi: Math.max(10, Math.round(hi / 10) * 10) };
};

/* ── screens + history ── */
const screens = $$<HTMLElement>('[data-screen]');
let current: Screen = 's1';
const progLabel = $('[data-prog-label]');
const show = (id: Screen, push = true, focus = true) => {
  screens.forEach(s => (s.hidden = s.dataset.screen !== id));
  current = id;
  const step = id === 's1' || id === 'est' ? 1 : 2;
  $$<HTMLElement>('[data-prog-step]').forEach(li => {
    const n = Number(li.dataset.progStep);
    li.classList.toggle('is-cur', n === step && id !== 'done');
    li.classList.toggle('is-done', n < step || id === 'done');
    if (n === step && id !== 'done') li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  if (progLabel) progLabel.textContent = id === 'done' ? `✓ ${I.steps[1]}` : `${I.stepOf[step - 1]} · ${I.steps[step - 1]}`;
  if (push) history.pushState({ su: id }, '');
  if (focus) { const h = $<HTMLElement>(`[data-screen="${id}"] h2`); h?.focus({ preventScroll: true }); }
  window.scrollTo({ top: 0, behavior: 'auto' });
  track('signup_step_viewed', { step: id });
};
history.replaceState({ su: 's1' }, '');
addEventListener('popstate', e => { const s = e.state?.su as Screen | undefined; if (s && s !== 'done') show(s, false); });

/* ── errors ── */
const setErr = (field: HTMLElement | null, input: HTMLElement | null, msg: string) => {
  const p = field ? $<HTMLElement>('[data-err]', field) : null;
  if (input && input.id) {
    const own = document.getElementById(`${input.id === 'gaskwh' ? 'gas' : input.id}-err`);
    if (own) own.textContent = msg;
  } else if (p) p.textContent = msg;
  if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  field?.classList.toggle('has-err', !!msg);
};
const summary = (form: HTMLFormElement, n: number) => {
  const s = $<HTMLElement>('[data-status]', form);
  if (s) s.textContent = n ? (n === 1 ? I.err.summary1 : I.err.summaryN.replace('{n}', String(n))) : '';
};

/* ── step 1 ── */
const f1 = $<HTMLFormElement>('#f1')!;
const pc = $<HTMLInputElement>('#pc')!;
const pcOk = $<HTMLElement>('[data-pc-ok]')!;
const pcField = pc.closest<HTMLElement>('.fld');
const params = new URLSearchParams(location.search);
const planParam = ['switch', 'switch-plus', 'premium'].includes(params.get('plan') || '') ? params.get('plan')! : null;

const started = () => { if (once('june_signup_started')) track('signup_started', { plan: planParam || 'none', entry: params.has('postcode') ? 'inline' : 'page', region: region(pc.value) }); };
const checkPc = (announceErr: boolean) => {
  const v = pc.value.replace(/\D/g, '').slice(0, 4);
  if (v !== pc.value) pc.value = v;
  const r = region(v);
  pcOk.textContent = r ? `${v} · ${I.region[r]} ✓` : '';
  if (r) { setErr(pcField, pc, ''); started(); return true; }
  if (announceErr) setErr(pcField, pc, v.length === 4 ? I.err.pcUnknown : I.err.pc);
  return false;
};
if (params.get('postcode')) { pc.value = params.get('postcode')!; checkPc(true); }
pc.addEventListener('input', () => { if (pc.value.replace(/\D/g, '').length === 4) checkPc(true); else { pcOk.textContent = ''; if (pc.getAttribute('aria-invalid') === 'true') setErr(pcField, pc, ''); } });
pc.addEventListener('blur', () => { if (pc.value) checkPc(true); });

const knowBtn = $<HTMLButtonElement>('[data-know]')!;
const knowPanel = $<HTMLElement>('[data-know-panel]')!;
const hhChips = $<HTMLElement>('[data-hh-chips]')!;
const knowLabel = knowBtn.textContent || '';
knowBtn.addEventListener('click', () => {
  const open = knowPanel.hidden;
  knowPanel.hidden = !open;
  hhChips.hidden = open;
  knowBtn.setAttribute('aria-expanded', String(open));
  knowBtn.textContent = open ? knowBtn.dataset.alt || '' : knowLabel;
  if (open) $<HTMLInputElement>('#kwh')?.focus();
});
const syncGas = () => { const both = (f1.elements.namedItem('energy') as RadioNodeList).value === 'both'; const g = $<HTMLElement>('[data-gas-field]'); if (g) g.hidden = !both; };
f1.addEventListener('change', e => { if ((e.target as HTMLInputElement).name === 'energy') syncGas(); if ((e.target as HTMLInputElement).name === 'household') setErr($('[data-field="household"]'), null, ''); });
syncGas();

const val = (name: string) => { const el = f1.elements.namedItem(name) as RadioNodeList | HTMLInputElement | null; return el ? el.value : ''; };
const parseKwh = (s: string) => { const n = Number(s.replace(/[.\s ]/g, '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : null; };

let data: { hh: string | null; energy: string; kwh: number | null; gas: number | null; meter: string; extras: string[] } | null = null;
let rec: 'switch-plus' | 'premium' = 'switch-plus';

f1.addEventListener('submit', e => {
  e.preventDefault();
  const invalid: HTMLElement[] = [];
  if (!checkPc(true)) { invalid.push(pc); track('signup_error', { step: 1, field: 'postcode', error_type: pc.value ? 'invalid' : 'missing' }); }
  const energy = val('energy') || 'both';
  const knows = !knowPanel.hidden;
  let kwh: number | null = null, gas: number | null = null;
  const hhField = $<HTMLElement>('[data-field="household"]');
  if (knows) {
    const k = $<HTMLInputElement>('#kwh')!, g = $<HTMLInputElement>('#gaskwh')!;
    kwh = parseKwh(k.value);
    if (!kwh || kwh < 300 || kwh > 20000) { setErr(hhField, k, I.err.kwh); invalid.push(k); track('signup_error', { step: 1, field: 'kwh', error_type: 'range' }); } else setErr(hhField, k, '');
    if (energy === 'both') {
      gas = parseKwh(g.value);
      if (!gas || gas < 1000 || gas > 60000) { setErr(hhField, g, I.err.gas); invalid.push(g); track('signup_error', { step: 1, field: 'gas', error_type: 'range' }); } else setErr(hhField, g, '');
    }
  } else if (!val('household')) {
    const first = $<HTMLInputElement>('input[name="household"]', f1)!;
    const p = document.getElementById('hh-err'); if (p) p.textContent = I.err.hh;
    hhField?.classList.add('has-err');
    invalid.push(first); track('signup_error', { step: 1, field: 'household', error_type: 'missing' });
  } else { const p = document.getElementById('hh-err'); if (p) p.textContent = ''; hhField?.classList.remove('has-err'); }
  summary(f1, invalid.length);
  if (invalid.length) { invalid[0].focus(); return; }

  const extras = $$<HTMLInputElement>('input[name="extras"]:checked', f1).map(x => x.value);
  data = { hh: knows ? null : val('household'), energy, kwh, gas, meter: val('meter') || 'dk', extras };
  const est = estimate(data.hh, energy, kwh, gas);
  rec = data.meter === 'digital' && extras.includes('solar') ? 'premium' : 'switch-plus';
  $('[data-est-range]')!.innerHTML = `${range(est.lo, est.hi)} <span>${I.est.per}</span>`;
  ($('[data-est-low]') as HTMLElement).hidden = est.hi >= 99;
  $('[data-est-rech]')!.textContent = rec === 'premium' ? I.est.recPrem : I.est.recPlus;
  $('[data-est-recb]')!.textContent = rec === 'premium' ? I.est.recPremWhy : I.est.recPlusWhy;
  const goBtn = $<HTMLButtonElement>('[data-go="s2"]');
  const chosen = planParam || rec;
  if (goBtn?.firstChild) goBtn.firstChild.textContent = `${I.est.cta} ${nl ? 'met' : 'avec'} ${I.planNames[chosen]} `;
  // preselect plan in step 2 (explicit ?plan wins over the recommendation)
  const radio = $<HTMLInputElement>(`#f2 input[name="plan"][value="${chosen}"]`); if (radio) radio.checked = true;
  $$<HTMLElement>('[data-pcard]').forEach(c => { const b = $<HTMLElement>('[data-rec-badge]', c); if (b) b.hidden = c.dataset.pcard !== rec; });
  syncAnalog();
  track('signup_step_completed', { step: 1 });
  track('estimate_viewed', { band: est.hi < 100 ? '0-100' : est.hi < 300 ? '100-300' : '300+', rec });
  show('est');
});

$$<HTMLButtonElement>('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go as Screen)));

/* ── step 2 ── */
const f2 = $<HTMLFormElement>('#f2')!;
const warn = $<HTMLElement>('[data-analog-warn]')!;
const syncAnalog = () => { warn.hidden = !((f2.elements.namedItem('plan') as RadioNodeList).value === 'premium' && data?.meter === 'analog'); };
f2.addEventListener('change', e => {
  const t = e.target as HTMLInputElement;
  if (t.name === 'plan') { syncAnalog(); track('plan_selected', { plan: t.value }); }
  if (t.name === 'terms' && t.checked) setErr(t.closest('.fld'), t, '');
});
const email = $<HTMLInputElement>('#email')!;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
email.addEventListener('blur', () => { if (email.value && !emailOk(email.value)) setErr(email.closest('.fld'), email, I.err.email); else if (emailOk(email.value)) setErr(email.closest('.fld'), email, ''); });

f2.addEventListener('submit', e => {
  e.preventDefault();
  const invalid: HTMLElement[] = [];
  if (!emailOk(email.value)) { setErr(email.closest('.fld'), email, I.err.email); invalid.push(email); track('signup_error', { step: 2, field: 'email', error_type: email.value ? 'invalid' : 'missing' }); }
  else setErr(email.closest('.fld'), email, '');
  const terms = $<HTMLInputElement>('#terms')!;
  if (!terms.checked) { setErr(terms.closest('.fld'), terms, I.err.terms); invalid.push(terms); track('signup_error', { step: 2, field: 'terms', error_type: 'missing' }); }
  else setErr(terms.closest('.fld'), terms, '');
  summary(f2, invalid.length);
  if (invalid.length) { invalid[0].focus(); return; }
  const planV = (f2.elements.namedItem('plan') as RadioNodeList).value;
  const pref = (f2.elements.namedItem('pref') as RadioNodeList).value;
  $('[data-done-email]')!.textContent = email.value.trim();
  $('[data-done-sum]')!.textContent = `${I.planNames[planV]} · ${pref === 'auto' ? (nl ? 'automatisch wisselen' : 'changement automatique') : (nl ? 'eerst jouw akkoord' : 'd’abord votre accord')}`;
  track('signup_step_completed', { step: 2 });
  track('signup_submitted', { plan: planV, pref, marketing: !!$<HTMLInputElement>('input[name="marketing"]:checked', f2) });
  show('done');
});

export {};

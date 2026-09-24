// Sign-up island (variant A). Step 1 → estimate → step 2 → confirmation. No backend: step 2 shows a
// confirmation only. Answers persist in sessionStorage so "back", "edit" and the language switch never lose data.
// Events (no PII): signup_started (first valid postcode, once per session), estimate_viewed, plan_selected, lead_submitted.
type Dict = Record<string, any>;
const D: Dict = JSON.parse(document.getElementById('signup-data')!.textContent!);
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const fill = (tpl: string, o: Dict) => tpl.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');
const money = (v: number) => fill(D.eur, { v: String(v) });
const fr = D.lang === 'fr';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const KEY = 'june-a-signup';
const store = {
  get(): Dict { try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { return {}; } },
  set(v: Dict) { try { sessionStorage.setItem(KEY, JSON.stringify({ ...store.get(), ...v })); } catch { /* private mode */ } },
};
const dl = (event: string, props: Dict = {}) => {
  const w = window as any; w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, variant: 'a', lang: D.lang, device: innerWidth < 720 ? 'mobile' : 'desktop', ...props });
};

const s1 = $<HTMLFormElement>('#s1');
const s2 = $<HTMLFormElement>('#s2');
const sections: Record<string, HTMLElement> = { '1': s1, est: $('#s-est'), '2': s2, done: $('#s-done') };
const order = ['1', 'est', '2', 'done'];
s1.noValidate = true; s2.noValidate = true;

// ── Postcode → region / town ─────────────────────────────────────────
const RE = /^[1-9]\d{3}$/;
function lookup(pc: string) {
  const n = +pc;
  const r = D.pc.ranges.find((x: any[]) => n >= x[0] && n <= x[1]);
  if (!r) return null;
  const [name, nameFr, dso] = D.pc.regions[r[2]];
  const town = D.pc.towns[n];
  const dsoTxt = dso.includes('|') ? dso.split('|')[fr ? 1 : 0] : dso;
  return { code: r[2], region: fr ? nameFr : name, prov: fr ? r[4] : r[3], town: town ? town[fr ? 1 : 0] : null, dso: dsoTxt };
}
const pcIn = $<HTMLInputElement>('#f-pc');
const pcOk = $('#f-pc-town');
const regionNote = $('[data-region-note]');
function showTown() {
  const v = pcIn.value;
  const L = RE.test(v) ? lookup(v) : null;
  pcOk.textContent = L ? '✓ ' + (L.town ? fill(D.town, { pc: v, town: L.town, region: L.region, dso: L.dso }) : fill(D.regionOnly, { pc: v, prov: L.prov, region: L.region, dso: L.dso })) : '';
  regionNote.hidden = !(L && L.code === 'VL');
  if (L && L.code === 'VL') regionNote.querySelector('span')!.textContent = D.regionVL;
  return L;
}
function started(source: string) {
  const L = lookup(pcIn.value);
  try { if (sessionStorage.getItem('june-a-started')) return; sessionStorage.setItem('june-a-started', '1'); } catch { /* ignore */ }
  const q = new URLSearchParams(location.search);
  dl('signup_started', { entry_page: document.referrer ? new URL(document.referrer).pathname : '(direct)', entry_cta_id: q.get('entry') || source, postcode_region: L?.code });
}
pcIn.addEventListener('input', () => {
  pcIn.value = pcIn.value.replace(/\D/g, '').slice(0, 4);
  if (RE.test(pcIn.value)) { setErr('postcode', ''); showTown(); started('signup-field'); store.set({ postcode: pcIn.value }); }
  else { pcOk.textContent = ''; regionNote.hidden = true; }
});
pcIn.addEventListener('blur', e => { if ((e.relatedTarget as HTMLButtonElement | null)?.type === 'submit') return; if (pcIn.value && !RE.test(pcIn.value)) setErr('postcode', D.err.pcBad); });

// ── Errors ───────────────────────────────────────────────────────────
const errIds: Record<string, string> = { postcode: 'f-pc-e', energy: 'f-energy-e', household: 'f-hh-e', meter: 'f-meter-e', solar: 'f-solar-e', kwh: 'f-kwh-e', gas: 'f-gas-e', email: 'f-email-e', terms: 'f-terms-e' };
const focusTarget: Record<string, string> = { postcode: '#f-pc', energy: 'input[name=energy]', household: 'input[name=household]', meter: 'input[name=meter]', solar: 'input[name=solar]', kwh: '#f-kwh', gas: '#f-gas', email: '#f-email', terms: 'input[name=terms]' };
function setErr(name: string, msg: string) {
  const e = document.getElementById(errIds[name]); if (e) e.textContent = msg;
  const wrap = document.querySelector(`[data-field="${name}"]`);
  wrap?.classList.toggle('has-err', !!msg);
  const inp = document.querySelector<HTMLInputElement>(focusTarget[name]);
  if (inp && inp.type !== 'radio') inp.setAttribute('aria-invalid', msg ? 'true' : 'false');
}
function summary(form: HTMLFormElement, errs: [string, string][]) {
  const box = $('[data-errsum]', form);
  const ul = box.querySelector('ul')!;
  ul.innerHTML = '';
  errs.forEach(([name, msg]) => {
    const li = document.createElement('li'); const a = document.createElement('a');
    a.href = '#'; a.textContent = msg;
    a.addEventListener('click', ev => { ev.preventDefault(); form.querySelector<HTMLElement>(focusTarget[name])?.focus(); });
    li.append(a); ul.append(li);
  });
  box.hidden = !errs.length;
  if (errs.length) { box.setAttribute('role', 'alert'); box.focus(); }
}

// ── Step navigation (history-aware) ─────────────────────────────────
function progress(step: string) {
  const idx = step === '1' ? 0 : step === 'est' ? 1 : 2;
  $$('.progress__item').forEach((li, i) => {
    li.classList.toggle('is-current', i === idx); li.classList.toggle('is-done', i < idx || step === 'done');
    if (i === idx && step !== 'done') li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  $('[data-step-of]').textContent = D.stepOf[idx];
  $('[data-progress]').hidden = step === 'done';
  if (step === 'done') $('[data-planchip]').hidden = true;
}
function show(step: string, push = true) {
  order.forEach(k => { sections[k].hidden = k !== step; });
  progress(step);
  if (push) history.pushState({ step }, '', location.pathname + location.search);
  const h = sections[step].querySelector<HTMLElement>('h2');
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  h?.focus({ preventScroll: true });
  store.set({ step });
}
addEventListener('popstate', e => { const st = (e.state && e.state.step) || '1'; if (st === 'done') return; show(st === '2' && !store.get().estimate ? '1' : st, false); });
$$<HTMLButtonElement>('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go!)));

// ── Restore answers (URL params first, then session) ─────────────────
const q = new URLSearchParams(location.search);
const saved = store.get();
const setRadio = (form: HTMLFormElement, name: string, v?: string | null) => { if (!v) return; const r = form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${v}"]`); if (r) r.checked = true; };
const pcQ = (q.get('postcode') || '').replace(/\D/g, '');
pcIn.value = RE.test(pcQ) ? pcQ : (saved.postcode || '');
['energy', 'household', 'meter', 'solar'].forEach(n => setRadio(s1, n, saved[n]));
setRadio(s1, 'meter', q.get('meter')); setRadio(s1, 'solar', q.get('solar'));
if (saved.kwh) { ($('#f-kwh') as HTMLInputElement).value = saved.kwh; ($('[data-usage]') as HTMLDetailsElement).open = true; }
if (saved.gas) ($('#f-gas') as HTMLInputElement).value = saved.gas;
(saved.extras || []).forEach((v: string) => { const c = s1.querySelector<HTMLInputElement>(`input[name=extras][value="${v}"]`); if (c) c.checked = true; });
const planQ = q.get('plan');
const chosenPlan: string | null = ['switch', 'switch-plus', 'premium'].includes(planQ || '') ? planQ : saved.plan || null;
if (chosenPlan) { $('[data-planchip-name]').textContent = D.names[chosenPlan]; $('[data-planchip]').hidden = false; }
if (RE.test(pcIn.value)) { showTown(); if (RE.test(pcQ)) started(q.get('entry') || 'url'); }
const gasField = $('[data-gas-field]');
const syncGas = () => { gasField.hidden = (s1.querySelector<HTMLInputElement>('input[name=energy]:checked')?.value) === 'elec'; };
s1.addEventListener('change', e => {
  syncGas();
  const t = e.target as HTMLInputElement;
  if (t.type === 'radio') setErr(t.name, '');
});
syncGas();

// ── Step 1 submit → estimate ─────────────────────────────────────────
const num = (s: string) => +String(s || '').replace(/[^\d]/g, '');
s1.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(s1);
  const v = (k: string) => (fd.get(k) as string) || '';
  const errs: [string, string][] = [];
  const pc = v('postcode').replace(/\D/g, '');
  if (!RE.test(pc)) errs.push(['postcode', pc ? D.err.pcBad : D.err.pcEmpty]);
  const kwh = num(v('kwh')), gas = num(v('gas'));
  if (!v('household') && !kwh) errs.push(['household', D.err.household]);
  if (kwh > 60000) errs.push(['kwh', D.err.usage]);
  if (gas > 150000) errs.push(['gas', D.err.usage]);
  if (!v('meter')) errs.push(['meter', D.err.choice]);
  if (!v('solar')) errs.push(['solar', D.err.choice]);
  Object.keys(errIds).forEach(k => setErr(k, ''));
  errs.forEach(([k, m]) => setErr(k, m));
  summary(s1, errs);
  if (errs.length) return;
  started('signup-step1');
  const data = { postcode: pc, energy: v('energy'), household: v('household'), kwh: v('kwh'), gas: v('gas'), meter: v('meter'), solar: v('solar'), extras: fd.getAll('extras') };
  store.set(data);
  estimate(data);
  show('est');
});

// ── Estimate (indicative range; placeholder bands, see content/signup.ts) ─────
function estimate(a: Dict) {
  const M = D.model;
  let [lo, hi]: number[] = [0, 0];
  const kwh = num(a.kwh), gas = num(a.gas);
  if (kwh) {
    lo = kwh * M.perKwh.elec[0]; hi = kwh * M.perKwh.elec[1];
    if (a.energy === 'both') { const g = gas || ({ '1': 7000, '2': 11000, '3-4': 15000, '5+': 19000 } as Dict)[a.household] || 15000; lo += g * M.perKwh.gas[0]; hi += g * M.perKwh.gas[1]; }
  } else { [lo, hi] = M.bands[a.energy][a.household]; }
  (a.extras || []).forEach((x: string) => { lo *= M.extras[x] || 1; hi *= M.extras[x] || 1; });
  const r10 = (x: number) => Math.round(x / 10) * 10;
  lo = r10(lo); hi = r10(hi);
  const rec = a.meter === 'digital' && a.solar === 'yes' ? 'premium' : 'switch-plus';
  const plan = chosenPlan || rec;
  const L = lookup(a.postcode);
  $('[data-est-for]').textContent = fill(D.estFor, { hh: D.hhWord[kwh ? 'usage' : a.household], place: L?.town || `${a.postcode}${L ? ' (' + L.region + ')' : ''}`, energy: D.energyWord[a.energy] });
  $('[data-est-range]').textContent = `${money(lo)} – ${money(hi)}`;
  const price = M.prices[plan];
  $('[data-est-after]').textContent = fill(D.after, { plan: D.names[plan], price: money(price) });
  $('[data-est-net]').textContent = `± ${money(Math.max(0, lo - price))} – ${money(Math.max(0, hi - price))}`;
  $('[data-est-rec]').textContent = rec === 'premium' ? D.recPremium : D.recPlus;
  $('[data-est-solar]').hidden = a.solar !== 'yes';
  $('[data-est-cta]').textContent = fill(D.cta, { plan: D.names[plan] });
  // Step 2 preselection: plan from the page the visitor came from wins; otherwise the recommendation.
  setRadio(s2, 'plan', store.get().plan || plan);
  $$('[data-fit]').forEach(f => { f.hidden = f.dataset.fit !== rec; });
  syncPremium();
  store.set({ estimate: [lo, hi], rec });
  dl('estimate_viewed', { postcode_region: L?.code, recommended_plan: rec });
}

// ── Step 2 ───────────────────────────────────────────────────────────
function syncPremium() {
  const p = s2.querySelector<HTMLInputElement>('input[name=plan]:checked')?.value;
  $('[data-premium-analog]').hidden = !(p === 'premium' && store.get().meter === 'analog');
}
s2.addEventListener('change', e => {
  const t = e.target as HTMLInputElement;
  if (t.name === 'plan') { syncPremium(); store.set({ plan: t.value }); dl('plan_selected', { plan: t.value }); }
  if (t.name === 'terms' && t.checked) setErr('terms', '');
  if (t.name === 'mode' || t.name === 'green') store.set({ [t.name]: t.type === 'checkbox' ? t.checked : t.value });
});
setRadio(s2, 'mode', saved.mode);
if (saved.green) ($('input[name=green]', s2) as HTMLInputElement).checked = true;
const email = $<HTMLInputElement>('#f-email');
// Skip blur validation when focus goes to a submit button (avoids the button jumping under the pointer).
email.addEventListener('blur', e => { if ((e.relatedTarget as HTMLButtonElement | null)?.type === 'submit') return; if (email.value && !email.checkValidity()) setErr('email', D.err.email); });
email.addEventListener('input', () => { if (email.checkValidity()) setErr('email', ''); });
s2.addEventListener('submit', e => {
  e.preventDefault();
  const errs: [string, string][] = [];
  const ev = email.value.trim();
  if (!ev) errs.push(['email', D.err.emailEmpty]);
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ev)) errs.push(['email', D.err.email]);
  const terms = $<HTMLInputElement>('input[name=terms]', s2);
  if (!terms.checked) errs.push(['terms', D.err.terms]);
  ['email', 'terms'].forEach(k => setErr(k, ''));
  errs.forEach(([k, m]) => setErr(k, m));
  summary(s2, errs);
  if (errs.length) return;
  const fd = new FormData(s2);
  const plan = fd.get('plan') as string;
  $('[data-done-body]').textContent = fill(D.doneBody, { email: ev });
  const labelOf = (form: HTMLFormElement, name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.closest('label')?.querySelector('strong')?.textContent?.trim() || '';
  const sum = $('[data-done-sum]'); sum.innerHTML = '';
  [D.names[plan] + ' · ' + money(D.model.prices[plan]) + (fr ? ' par an' : ' per jaar'), labelOf(s2, 'mode'), pcOk.textContent?.replace('✓ ', '') || ''].filter(Boolean)
    .forEach(t => { const li = document.createElement('li'); li.textContent = t; sum.append(li); });
  dl('lead_submitted', { plan, mode: fd.get('mode'), green: !!fd.get('green'), marketing_optin: !!fd.get('marketing') });
  store.set({ plan, step: 'done' });
  show('done');
});

// ── Language switch keeps the funnel state (same sessionStorage key) + query ──
$$<HTMLAnchorElement>('[data-keep-query]').forEach(a => { a.href = a.href.split('?')[0] + location.search; });

// ── Resume where the visitor was (e.g. after the language switch or a reload) ──
const resume = saved.step;
if ((resume === 'est' || resume === '2') && saved.estimate && !pcQ) {
  estimate(store.get());
  order.forEach(k => { sections[k].hidden = k !== resume; }); progress(resume);
}
history.replaceState({ step: sections['1'].hidden ? resume : '1' }, '', location.pathname + location.search);

addEventListener('load', () => setTimeout(() => document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(i => { if (reduce) i.loading = 'eager'; }), 400));

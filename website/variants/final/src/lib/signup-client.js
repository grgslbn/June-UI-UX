// Sign-up funnel island. One form, three steps + confirmation, each with its own URL (hash state).
// Answers persist in sessionStorage (funnel-state.js) so back, reload and the NL↔FR switch keep them.
// Analytics (dataLayer, no PII — never the postcode, e-mail or usage): signup_started (once per session, first valid
// postcode submitted), signup_step_viewed, signup_error, estimate_viewed, plan_selected, signup_submitted, help_click.
import { getEstimate, fmtRange, fmtEur, fmtNum, KWH_RANGE } from './estimate.js';
import { lookupPostcode, PC_RE } from './postcode.js';
import { fromQuery, toQuery, load, save, onceStarted, stepFromHash, hashFor, STEPS } from './funnel-state.js';

export function initSignup() {
  const C = JSON.parse(document.getElementById('su-copy').textContent);
  const L = C.L;
  const other = L === 'nl' ? 'fr' : 'nl';
  const form = document.getElementById('su');
  form.noValidate = true; // JS validates with its own summary; without JS the browser's native validation applies.
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fill = (t, v) => String(t).replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dl = (window.dataLayer ||= []);
  const push = (event, props = {}) => dl.push({ event, lang: L, device: innerWidth < 720 ? 'mobile' : 'desktop', ...props });
  const plansBy = Object.fromEntries(C.plans.map((p) => [p.slug, p]));
  const IDX = { home: 0, est: 1, plan: 2, done: 3 };
  const live = $('#su-live');
  const sum = $('#err-sum');

  // ── State: storage ← query (query wins), then the URL is cleaned (answers now live in storage) ──
  const qp = new URLSearchParams(location.search);
  const q = fromQuery(location.search);
  let A = { ...load() };
  if (q.plan) { A.intent = q.plan; delete q.plan; }
  Object.assign(A, q);
  const entry = qp.get('entry') || (A.entry ?? null);
  if (entry) A.entry = entry.slice(0, 40);
  save(A);

  // ── Form ↔ state ─────────────────────────────────────────
  const el = (name) => form.elements.namedItem(name);
  const radio = (name) => (el(name) && el(name).value) || '';
  const isOn = (id) => !!document.getElementById(id)?.checked;
  function writeForm() {
    if (A.postcode) $('#su-pc').value = A.postcode;
    for (const k of ['energy', 'household', 'meter', 'plan', 'pref']) if (A[k]) { const r = form.querySelector(`input[name="${k}"][value="${A[k]}"]`); if (r) r.checked = true; }
    for (const k of ['solar', 'ev', 'heatpump', 'green', 'marketing', 'terms']) { const c = form.querySelector(`input[name="${k}"]`); if (c && k in A) c.checked = !!A[k]; }
    if (A.kwhElec) $('#su-kwh-e').value = A.kwhElec;
    if (A.kwhGas) $('#su-kwh-g').value = A.kwhGas;
    if (A.kwhElec || A.kwhGas) $('#kwh').open = true;
    if (A.email) $('#su-email').value = A.email;
  }
  function readForm() {
    A.postcode = $('#su-pc').value.trim();
    for (const k of ['energy', 'household', 'meter', 'plan', 'pref']) A[k] = radio(k) || undefined;
    for (const k of ['solar', 'ev', 'heatpump', 'green', 'marketing', 'terms']) A[k] = !!form.querySelector(`input[name="${k}"]`)?.checked;
    A.kwhElec = $('#su-kwh-e').value.replace(/\D/g, '') || undefined;
    A.kwhGas = $('#su-kwh-g').value.replace(/\D/g, '') || undefined;
    A.email = $('#su-email').value.trim() || undefined;
    save(A);
  }

  // ── Header: "Hulp nodig?" + language switch that carries the answers and the step ──
  const langLink = $('[data-lang-link]');
  let current = 'home';
  function syncLang() {
    if (langLink) langLink.href = C.langBase + toQuery({ ...A, plan: A.intent }) + hashFor(current, other);
  }
  $('[data-help]')?.addEventListener('click', () => push('help_click', { step: IDX[current] + 1 }));

  // ── Postcode → town · region · grid operator ─────────────
  const pc = $('#su-pc');
  const pcLine = $('#su-pc-region');
  function onPostcode() {
    const v = pc.value.replace(/\D/g, '').slice(0, 4);
    if (v !== pc.value) pc.value = v;
    const r = lookupPostcode(v, L);
    pcLine.textContent = '';
    if (r) {
      pcLine.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>');
      pcLine.append(fill(r.town ? C.s1.pcLine.town : C.s1.pcLine.noTown, { pc: v, town: r.town, region: r.region, prov: r.province, dso: r.dso }));
      clearField('su-pc-err', pc);
    }
    pcLine.classList.toggle('is-on', !!r);
    return r;
  }
  pc.addEventListener('input', () => { onPostcode(); readForm(); side(); syncLang(); });

  let started = false;
  function fireStarted(source) {
    const r = lookupPostcode(A.postcode, L);
    if (!r || started) return;
    started = true;
    if (!onceStarted()) return;
    let entryPage = '(direct)';
    try { if (document.referrer) { const u = new URL(document.referrer); entryPage = u.origin === location.origin ? u.pathname : '(external)'; } } catch { /* keep direct */ }
    push('signup_started', { postcode_region: r.code, entry_page: entryPage, entry_cta_id: A.entry || source, plan_intent: A.intent || 'none' });
  }

  // ── Plan chip (plan chosen on another page) ──────────────
  function chip() {
    const ch = $('#plan-chip');
    ch.hidden = !A.intent || current === 'done';
    if (A.intent) $('[data-chip-name]', ch).textContent = plansBy[A.intent].name;
  }

  // ── Energy: gas usage field only when gas is compared ───
  const syncEnergy = () => { $('#kwh-gas-field').hidden = radio('energy') === 'elec'; };

  // ── Side panel "Wat we van je weten" ─────────────────────
  function side() {
    const set = (k, v) => { const dd = $(`[data-row="${k}"] dd`); dd.textContent = v || (k === 'email' ? C.side.notAsked : C.side.empty); dd.classList.toggle('is-empty', !v); };
    const r = lookupPostcode(A.postcode, L);
    set('postcode', r ? `${A.postcode}${r.town ? ` ${r.town}` : ''}` : '');
    set('region', r ? `${r.region} · ${r.dso}` : '');
    set('energy', (C.energy.find((o) => o[0] === A.energy) || [])[1] || '');
    const e = Number(A.kwhElec) || 0, g = Number(A.kwhGas) || 0, hh = A.household;
    set('usage', e > 0 ? `${fmtNum(e, L)} kWh${g > 0 && A.energy === 'both' ? ` · ${fmtNum(g, L)} kWh` : ''}` : hh ? `${hh.replace('-', '–')} ${hh === '1' ? C.household.unit[0] : C.household.unit[1]}` : '');
    set('meter', (C.meter.find((o) => o[0] === A.meter) || [])[1] || '');
    const ex = C.extras.filter((o) => A[o[0]]).map((o) => o[1]).join(', ');
    set('extras', ex || (IDX[current] > 0 ? C.side.none : ''));
    set('email', IDX[current] >= 2 ? A.email || '' : '');
  }

  // ── Errors: inline + one summary that receives focus; cleared whenever the step changes ──
  function setErr(id, msg, input) {
    const e = document.getElementById(id); if (!e) return;
    e.hidden = !msg; e.textContent = msg || '';
    e.closest('.q')?.classList.toggle('is-invalid', !!msg);
    if (input) msg ? input.setAttribute('aria-invalid', 'true') : input.removeAttribute('aria-invalid');
  }
  function clearField(id, input) {
    setErr(id, null, input);
    const li = sum.querySelector(`li[data-err="${id}"]`);
    if (li) { li.remove(); if (!sum.querySelector('li')) { sum.hidden = true; live.textContent = ''; } }
  }
  function clearErrors() {
    sum.hidden = true; $('ul', sum).textContent = ''; live.textContent = '';
    $$('.err', form).forEach((e) => { e.hidden = true; e.textContent = ''; });
    $$('.is-invalid', form).forEach((e) => e.classList.remove('is-invalid'));
    $$('[aria-invalid]', form).forEach((e) => e.removeAttribute('aria-invalid'));
  }
  /** @param {{id:string,msg:string,target:HTMLElement,input?:boolean,field:string}[]} errs */
  function report(errs) {
    clearErrors();
    if (!errs.length) return true;
    const ul = $('ul', sum);
    for (const x of errs) {
      setErr(x.id, x.msg, x.input ? x.target : null);
      const li = document.createElement('li'); li.dataset.err = x.id;
      const a = document.createElement('a'); a.href = `#${x.target.id}`; a.textContent = x.msg;
      a.addEventListener('click', (ev) => { ev.preventDefault(); x.target.focus({ preventScroll: true }); x.target.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); });
      li.append(a); ul.append(li);
      push('signup_error', { step: IDX[current] + 1, field: x.field });
    }
    const h = fill(C.errors.summary[errs.length === 1 ? 0 : 1], { n: errs.length });
    $('#err-sum-h').textContent = h;
    sum.hidden = false;
    sum.scrollIntoView({ block: 'start', behavior: 'auto' });
    sum.focus({ preventScroll: true });
    live.textContent = `${h}: ${errs.map((x) => x.msg).join(' ')}`;
    return false;
  }

  // ── Validation ───────────────────────────────────────────
  function errors1() {
    const errs = [];
    const v = A.postcode || '';
    if (!v) errs.push({ id: 'su-pc-err', msg: C.errors.postcodeEmpty, target: pc, input: true, field: 'postcode' });
    else if (!PC_RE.test(v) || !lookupPostcode(v, L)) errs.push({ id: 'su-pc-err', msg: C.errors.postcode, target: pc, input: true, field: 'postcode' });
    const e = $('#su-kwh-e'), g = $('#su-kwh-g');
    const bad = (i) => i.value.trim() !== '' && !(Number(i.value) >= KWH_RANGE[0] && Number(i.value) <= KWH_RANGE[1]);
    const badE = bad(e), badG = A.energy === 'both' && bad(g);
    if (badE || badG) { $('#kwh').open = true; errs.push({ id: 'kwh-err', msg: C.errors.kwh, target: badE ? e : g, input: true, field: 'kwh' }); }
    else if (!A.household && !(Number(A.kwhElec) > 0)) errs.push({ id: 'household-err', msg: C.errors.household, target: $('#su-hh-1'), field: 'household' });
    if (!A.meter) errs.push({ id: 'meter-err', msg: C.errors.meter, target: $('#su-meter-digital'), field: 'meter' });
    return errs;
  }
  function errors3() {
    const errs = [];
    if (!A.plan) errs.push({ id: 'plan-err', msg: C.errors.plan, target: $('#su-plan-switch-plus'), field: 'plan' });
    if (!A.pref) errs.push({ id: 'pref-err', msg: C.errors.pref, target: $(`#su-pref-${C.pref[0][0]}`), field: 'pref' });
    const em = $('#su-email'); const v = em.value.trim();
    if (!v) errs.push({ id: 'su-email-err', msg: C.errors.emailEmpty, target: em, input: true, field: 'email' });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) errs.push({ id: 'su-email-err', msg: C.errors.email, target: em, input: true, field: 'email' });
    const t = $('#su-terms');
    if (!t.checked) errs.push({ id: 'su-terms-err', msg: C.errors.terms, target: t, input: true, field: 'terms' });
    return errs;
  }

  // ── Estimate (all maths + advice in estimate.js → getEstimate) ──
  let est = null;
  const estPanel = $('[data-panel="est"]');
  async function runEstimate() {
    estPanel.setAttribute('aria-busy', 'true');
    est = await getEstimate({ energy: A.energy || 'both', household: A.household, kwhElec: A.kwhElec, kwhGas: A.kwhGas, meter: A.meter, solar: !!A.solar, ev: !!A.ev, heatpump: !!A.heatpump, plan: A.intent });
    renderEstimate(est);
    estPanel.removeAttribute('aria-busy');
    return est;
  }
  function renderEstimate(r) {
    const rec = r.recommended, p = plansBy[rec];
    const text = (s, v) => { $(s).textContent = v; };
    text('[data-est-label]', fill(C.est.netLabel, { name: p.name }));
    text('[data-est-net]', fmtRange(r.nets[rec], L));
    text('[data-est-gross]', fmtRange(r.gross, L));
    text('[data-est-fee-label]', fill(C.est.ledger.fee, { name: p.name }));
    text('[data-est-fee]', `− ${fmtEur(r.fees[rec], L)}`);
    text('[data-est-net2]', fmtRange(r.nets[rec], L));
    const alt = $('[data-est-alt]');
    alt.hidden = !r.alt || r.reason === 'premium-analog';
    if (!alt.hidden) alt.textContent = fill(C.est.alt, { name: plansBy[r.alt].name, fee: plansBy[r.alt].yearly, range: fmtRange(r.nets[r.alt], L) });
    text('[data-est-basis]', fill(r.gas ? C.est.basisGas : C.est.basis, { e: fmtNum(r.elec, L), g: fmtNum(r.gas, L), src: r.own ? C.est.own : C.est.preset }));
    // Notice: honest "you're already fine" beats any plan advice; otherwise explain an overridden or conditional plan.
    const low = r.verdict === 'low';
    const nt = low ? C.est.low.body : C.est.notice[r.reason] || '';
    $('[data-est-notice]').hidden = !nt;
    $('[data-est-notice]').classList.toggle('is-low', low);
    $('[data-est-notice-h]').hidden = !low;
    text('[data-est-notice-h]', low ? C.est.low.h : '');
    text('[data-est-notice-p]', nt);
    $('[data-est-g-link]').hidden = !low;
    $('[data-est-rec-box]').hidden = low;
    text('[data-est-rec]', fill(C.est.rec[r.reason] || C.est.rec.default, { name: p.name }));
    $('[data-est-g]').hidden = rec === 'switch' || low;
    text('[data-est-next]', fill(low ? C.est.nextLow : C.est.next, { name: p.name }));
    $('[data-keep-prem]').hidden = !(r.reason === 'premium-analog' || r.reason === 'premium-eats-chosen');
    // Step 3: net per plan ("wat jij overhoudt") + badge on the advised plan.
    for (const s of Object.keys(plansBy)) {
      const n = $(`[data-net-for="${s}"]`); n.hidden = false; n.textContent = '';
      const lab = document.createElement('span'); lab.textContent = C.s2.plan.net;
      const val = document.createElement('strong'); val.textContent = fmtRange(r.nets[s], L);
      n.append(lab, val, ` ${C.s2.plan.perYear}`);
      const b = $(`[data-rec-badge="${s}"]`); b.hidden = s !== rec;
    }
    const share = $('[data-share]');
    share.href = `mailto:?subject=${encodeURIComponent(C.est.share.subject)}&body=${encodeURIComponent(fill(C.est.share.body, { name: p.name, range: fmtRange(r.nets[rec], L).replace(/[  ]/g, ' '), url: C.signupUrl }))}`;
    const hi = r.nets[rec][1];
    push('estimate_viewed', { recommended_plan: rec, reason: r.reason, verdict: r.verdict, net_band: hi < 50 ? '0-50' : hi < 150 ? '50-150' : hi < 300 ? '150-300' : '300+', source: r.source });
  }
  // The method note is open on wider screens, a one-line summary on phones (keeps "Gebaseerd op … kWh" visible).
  $('#est-method').open = matchMedia('(min-width: 700px)').matches;

  function premWarn() {
    const w = $('#plan-warn'); const on = A.plan === 'premium' && A.meter === 'analog';
    w.hidden = !on; w.textContent = on ? C.s2.premAnalog : '';
  }

  // ── Steps + per-step URLs ────────────────────────────────
  const panels = Object.fromEntries($$('[data-panel]').map((p) => [p.dataset.panel, p]));
  Object.values(panels).forEach((p) => p.removeAttribute('hidden'));
  const heads = { home: '#s1-h', est: '#est-h', plan: '#s2-h', done: '#done-h' };
  function paint(step) {
    current = step;
    clearErrors();
    for (const [k, p] of Object.entries(panels)) p.classList.toggle('is-active', k === step);
    const idx = IDX[step];
    $$('.progress li').forEach((li, i) => {
      li.classList.toggle('is-done', i < idx);
      if (i === idx && step !== 'done') li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    $('#progress-meta').textContent = C.progress.meta[idx];
    document.body.dataset.step = step;
    if (step === 'est' && !A.estSeen) { A.estSeen = true; save(A); } // plans page shows its ledger only after a real estimate
    chip(); side(); premWarn(); syncLang();
  }
  function go(step, { push: doPush = true, focus = true } = {}) {
    paint(step);
    const url = location.pathname + hashFor(step, L);
    const state = { su: step, idx: (history.state?.idx ?? 0) + (doPush ? 1 : 0) };
    if (doPush) history.pushState(state, '', url); else history.replaceState(state, '', url);
    if (focus) {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      $(heads[step])?.focus({ preventScroll: true });
    }
    push('signup_step_viewed', { step: IDX[step] + 1, step_name: step });
  }
  const step1Valid = () => errors1().length === 0;
  /** Resolve a requested step to one the answers allow (never show an estimate without valid answers). */
  async function allowed(step) {
    if (step === 'home') return 'home';
    if (!step1Valid()) return 'home';
    await runEstimate();
    if (step === 'done' && !A.submitted) return 'plan';
    return step;
  }
  function back(target) {
    if ((history.state?.idx ?? 0) > 0) history.back(); else go(target, { push: false });
  }
  addEventListener('popstate', async () => {
    const want = stepFromHash(location.hash);
    const step = await allowed(want);
    if (step !== want) history.replaceState({ su: step, idx: history.state?.idx ?? 0 }, '', location.pathname + hashFor(step, L));
    paint(step);
    window.scrollTo({ top: 0 });
    $(heads[step])?.focus({ preventScroll: true });
    push('signup_step_viewed', { step: IDX[step] + 1, step_name: step });
  });

  // ── Events ───────────────────────────────────────────────
  form.addEventListener('change', (e) => {
    const t = e.target;
    readForm();
    if (t.name === 'energy') syncEnergy();
    if (t.name === 'household') { clearField('household-err'); }
    if (t.name === 'meter') clearField('meter-err');
    if (t.name === 'pref') clearField('pref-err');
    if (t.name === 'plan') { clearField('plan-err'); push('plan_selected', { plan: t.value, recommended: est?.recommended || null }); }
    if (t.name === 'terms' && t.checked) clearField('su-terms-err', t);
    premWarn(); side(); syncLang();
  });
  form.addEventListener('input', (e) => {
    const t = e.target;
    if (t.name === 'kwh_elec' || t.name === 'kwh_gas') { t.value = t.value.replace(/\D/g, ''); clearField('kwh-err', t); clearField('household-err'); }
    if (t.name === 'email' && t.getAttribute('aria-invalid')) clearField('su-email-err', t);
    readForm(); side();
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    readForm();
    if (current === 'home') {
      if (lookupPostcode(A.postcode, L)) fireStarted('signup-form');
      if (!report(errors1())) return;
      await runEstimate();
      go('est');
    } else if (current === 'plan') {
      if (!report(errors3())) return;
      renderDone();
      A.submitted = true; save(A);
      push('signup_submitted', { plan: A.plan, pref: A.pref, green: !!A.green, marketing_optin: !!A.marketing, recommended: est?.recommended || null });
      go('done');
    }
  });
  $('[data-go-plan]').addEventListener('click', () => {
    A.plan = est.recommended; save(A); writeForm(); premWarn();
    push('plan_selected', { plan: A.plan, recommended: est.recommended, source: 'estimate' });
    go('plan');
  });
  $('[data-keep-prem]').addEventListener('click', () => {
    A.plan = 'premium'; save(A); writeForm(); premWarn();
    push('plan_selected', { plan: 'premium', recommended: est.recommended, source: 'estimate-keep' });
    go('plan');
  });
  $$('[data-back]').forEach((b) => b.addEventListener('click', () => back(b.dataset.back)));

  function renderDone() {
    const body = $('[data-done-body]'); body.textContent = '';
    const [a, b] = C.done.body.split('{email}'); const strong = document.createElement('strong'); strong.textContent = A.email || '';
    body.append(a, strong, b);
    const p = plansBy[A.plan];
    $('[data-done-plan]').textContent = p ? `${p.name} · ${p.yearly}` : '';
    $('[data-done-pref]').textContent = (C.pref.find((o) => o[0] === A.pref) || [])[1] || '';
    $('[data-done-green]').textContent = A.green ? C.done.yes : C.done.no;
  }

  // ── Boot ─────────────────────────────────────────────────
  writeForm();
  syncEnergy();
  readForm();
  onPostcode();
  // Arriving with a postcode submitted on another page counts as the start (conversion-strategy §2.2).
  if (q.postcode && lookupPostcode(q.postcode, L)) fireStarted('url');
  (async () => {
    const want = STEPS.includes(stepFromHash(location.hash)) ? stepFromHash(location.hash) : 'home';
    const step = await allowed(want);
    if (step === 'done') renderDone();
    go(step, { push: false, focus: false });
    document.documentElement.classList.remove('su-restoring');
  })();
}

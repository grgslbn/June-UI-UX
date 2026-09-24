// Variant D — the only page script (≈2 KB gz). Everything works without it:
// forms submit natively, anchors jump, the phone shows its first tile, charts render final state.
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduce.matches) root.classList.add('motion');

// ── Postcode forms: Belgian postcode (1000–9999), fix-it message, no submit when invalid ──
const RE = /^[1-9]\d{3}$/;
for (const form of document.querySelectorAll('[data-pc-form]')) {
  const input = form.querySelector('input[name="postcode"]');
  const err = form.querySelector('.pc-err');
  const show = bad => {
    input.setAttribute('aria-invalid', bad ? 'true' : 'false');
    err.textContent = bad ? err.dataset.msg : '';
  };
  input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, '').slice(0, 4); if (RE.test(input.value)) show(false); });
  input.addEventListener('blur', () => { if (input.value) show(!RE.test(input.value)); });
  form.addEventListener('submit', e => {
    if (!RE.test(input.value.trim())) { e.preventDefault(); show(true); input.focus(); }
  });
}

// ── CTAs (header, plan cards, sticky bar): go to the nearest postcode field and focus it ──
const heroForm = document.getElementById('bereken');
for (const a of document.querySelectorAll('[data-cta]')) {
  a.addEventListener('click', e => {
    if (!heroForm) return;
    e.preventDefault();
    const plan = a.dataset.plan || '';
    if (plan) document.querySelectorAll('[data-plan-field]').forEach(f => { f.value = plan; });
    const input = heroForm.querySelector('input[name="postcode"]');
    heroForm.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
    a.closest('details')?.removeAttribute('open');
  });
}

// ── Mobile menu: close after choosing a section ──
for (const l of document.querySelectorAll('.nav-mobile a')) l.addEventListener('click', () => l.closest('details').removeAttribute('open'));

// ── Sticky mobile CTA: visible once the hero form is scrolled past, hidden while a form is on screen ──
const sticky = document.querySelector('[data-sticky]');
const forms = [...document.querySelectorAll('[data-pc-form]')];
if (sticky && 'IntersectionObserver' in window) {
  const vis = new Map();
  const update = () => {
    const anyVisible = [...vis.values()].some(Boolean);
    const past = heroForm ? heroForm.getBoundingClientRect().bottom < 0 : true;
    sticky.hidden = anyVisible || !past;
  };
  const io = new IntersectionObserver(es => { for (const en of es) vis.set(en.target, en.isIntersecting); update(); });
  forms.forEach(f => io.observe(f));
  addEventListener('scroll', update, { passive: true });
}

// ── Charts below the fold: bars grow once when they enter the viewport ──
if (!reduce.matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => {
    for (const en of es) if (en.isIntersecting) { en.target.classList.add('is-live'); io.unobserve(en.target); }
  }, { threshold: 0.35 });
  document.querySelectorAll('.qc--reveal').forEach(el => io.observe(el));
}

// ── Hero phone: auto-cycle Overzicht → Zon → Contract every 4 s; pausable; off under reduced motion ──
const stage = document.querySelector('[data-stage]');
const phone = stage?.querySelector('[data-phone]');
const toggle = stage?.querySelector('[data-stage-toggle]');
if (phone && toggle && !reduce.matches) {
  const screens = [...phone.querySelectorAll('.ph-screen')];
  let i = 0, timer = 0, userPaused = false, hover = false, onScreen = true;
  const go = n => {
    i = n % screens.length;
    screens.forEach((s, k) => s.classList.toggle('is-active', k === i));
    phone.dataset.screen = String(i);
  };
  const run = () => {
    clearInterval(timer);
    if (!userPaused && !hover && onScreen && !document.hidden) timer = setInterval(() => go(i + 1), 4000);
  };
  const label = () => {
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.querySelector('span').textContent = userPaused ? toggle.dataset.labelPlay : toggle.dataset.labelPause;
    toggle.querySelector('use').setAttribute('href', userPaused ? '#i-play' : '#i-pause');
  };
  toggle.hidden = false;
  toggle.addEventListener('click', () => { userPaused = !userPaused; label(); run(); });
  const art = stage.querySelector('.stage-art');
  art.addEventListener('pointerenter', () => { hover = true; run(); });
  art.addEventListener('pointerleave', () => { hover = false; run(); });
  document.addEventListener('visibilitychange', run);
  new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; run(); }).observe(stage);
  reduce.addEventListener?.('change', () => { if (reduce.matches) { userPaused = true; label(); run(); } });
  run();
}

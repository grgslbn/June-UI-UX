// Variant A — the one shared page script (content pages). Everything works without it:
// forms submit natively, anchors jump, the hero tile renders its final state.
const d = document;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lang = d.documentElement.lang.startsWith('fr') ? 'fr' : 'nl';
const MSG = {
  nl: { empty: 'Vul je postcode in.', bad: 'Een Belgische postcode heeft 4 cijfers, bv. 9000.' },
  fr: { empty: 'Indiquez votre code postal.', bad: 'Un code postal belge compte 4 chiffres, par ex. 1000.' },
}[lang];
const RE = /^[1-9]\d{3}$/;

// ── Postcode forms: Belgian postcode 1000–9999, friendly fix-it message, no submit when invalid ──
d.querySelectorAll<HTMLFormElement>('[data-postcode]').forEach(f => {
  const i = f.querySelector<HTMLInputElement>('input[name=postcode]')!;
  const err = f.querySelector<HTMLElement>('.pc__err')!;
  const show = (m: string) => { err.textContent = m; i.setAttribute('aria-invalid', m ? 'true' : 'false'); };
  i.addEventListener('input', () => { i.value = i.value.replace(/\D/g, '').slice(0, 4); if (RE.test(i.value)) show(''); });
  i.addEventListener('blur', e => { if ((e.relatedTarget as HTMLButtonElement | null)?.type === 'submit') return; if (i.value && !RE.test(i.value)) show(MSG.bad); });
  f.addEventListener('submit', e => {
    const v = i.value.replace(/\D/g, '');
    if (!RE.test(v)) { e.preventDefault(); show(v ? MSG.bad : MSG.empty); i.focus(); return; }
    (window as any).dataLayer?.push({ event: 'cta_click', entry_cta_id: (f.querySelector('input[name=entry]') as HTMLInputElement)?.value });
  });
});

// ── In-page CTAs that point at a postcode form: focus the field after the jump ──
d.querySelectorAll<HTMLAnchorElement>('a[data-focus]').forEach(a => a.addEventListener('click', e => {
  const t = d.getElementById(a.dataset.focus!);
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  t.focus({ preventScroll: true });
}));

// ── Sticky mobile CTA: after the page's first CTA block scrolls away; hidden while any CTA block or the footer is in view ──
const bar = d.querySelector<HTMLElement>('[data-sticky]');
const sentinels = [...d.querySelectorAll<HTMLElement>('[data-sticky-sentinel]')];
const footer = d.querySelector('footer');
if (bar && sentinels.length && 'IntersectionObserver' in window) {
  const vis = new Map<Element, { in: boolean; above: boolean }>();
  const io = new IntersectionObserver(es => {
    es.forEach(e => vis.set(e.target, { in: e.isIntersecting, above: e.boundingClientRect.top < 0 }));
    const first = vis.get(sentinels[0]);
    const show = !!first && !first.in && first.above && ![...vis.values()].some(v => v.in);
    bar.classList.toggle('is-on', show);
    bar.toggleAttribute('inert', !show);
  });
  [...sentinels, ...(footer ? [footer] : [])].forEach(s => io.observe(s));
}

// ── Signature motion (home hero tile): "the monthly check" — chip ticks, numeral counts up once ──
const chip = d.querySelector('[data-check-chip]');
const num = d.querySelector<HTMLElement>('[data-count]');
if (!reduce && chip && num) {
  chip.classList.add('is-checking');
  const target = +num.dataset.count!;
  setTimeout(() => {
    chip.classList.remove('is-checking'); chip.classList.add('is-checked');
    const t0 = performance.now();
    const step = (t: number) => { const p = Math.min((t - t0) / 700, 1); num.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
    num.textContent = '0'; requestAnimationFrame(step);
  }, 1100);
}

// ── Mobile menu: close on Escape / after choosing a link ──
d.querySelectorAll<HTMLDetailsElement>('details.menu').forEach(m => {
  m.addEventListener('keydown', e => { if (e.key === 'Escape') { m.open = false; m.querySelector('summary')?.focus(); } });
  m.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { m.open = false; }));
});

// ── After load: fetch the remaining lazy product images while idle (keeps LCP untouched, pages feel complete).
// Animated icons stay lazy unless reduced motion is on (then only the tiny static frame is fetched).
addEventListener('load', () => {
  const go = () => d.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(i => { if (reduce || !i.closest('.aicon')) i.loading = 'eager'; });
  ('requestIdleCallback' in window ? (window as any).requestIdleCallback : setTimeout)(go, { timeout: 1500 });
});

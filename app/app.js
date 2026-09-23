/* ==========================================================================
   June Insights — shared behaviour (Phase 4 · Soft Native foundation)
   Loaded in <head> (not deferred) so window.JuneCharts exists before fragment
   scripts run. All DOM wiring waits for DOMContentLoaded. No per-tab code here.
     1  Helpers
     2  window.JuneCharts — bars · line · hbars · meter (+ declarative data-chart)
     3  Panels, product tab bar, hash deep-links, reviewer picker, theme
     4  Segmented controls · disclosures · popovers · readiness · count-up
   Everything respects prefers-reduced-motion (fades only; no count-up/grow).
   ========================================================================== */
(function () {
  'use strict';

  /* ── 1 · Helpers ──────────────────────────────────────────────────────── */
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionOK = () => !reduceMQ.matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let measureCtx;
  function textW(str, weight = 400) {
    measureCtx = measureCtx || document.createElement('canvas').getContext('2d');
    measureCtx.font = `${weight} 12px Inter, ui-sans-serif, system-ui, sans-serif`;
    return measureCtx.measureText(String(str)).width;
  }
  /* 1-D label de-collision: items {c (desired centre), size}; returns resolved centres within [lo, hi] */
  function resolve1D(items, gap, lo, hi) {
    const idx = items.map((it, i) => i).sort((a, b) => items[a].c - items[b].c);
    const pos = items.map(it => it.c);
    for (let k = 1; k < idx.length; k++) {
      const a = idx[k - 1], b = idx[k];
      const min = pos[a] + items[a].size / 2 + gap + items[b].size / 2;
      if (pos[b] < min) pos[b] = min;
    }
    // re-centre the group around the desired positions, then clamp to bounds
    const off = idx.reduce((s, i) => s + (items[i].c - pos[i]), 0) / (idx.length || 1);
    idx.forEach(i => pos[i] += off);
    const first = idx[0], last = idx[idx.length - 1];
    if (idx.length) {
      if (pos[first] - items[first].size / 2 < lo) { const d = lo - (pos[first] - items[first].size / 2); idx.forEach(i => pos[i] += d); }
      if (pos[last] + items[last].size / 2 > hi) { const d = pos[last] + items[last].size / 2 - hi; idx.forEach(i => pos[i] -= d); }
    }
    for (let k = 1; k < idx.length; k++) { // final forward pass so nothing overlaps
      const a = idx[k - 1], b = idx[k];
      const min = pos[a] + items[a].size / 2 + gap + items[b].size / 2;
      if (pos[b] < min) pos[b] = min;
    }
    return pos;
  }
  function niceStep(range, maxTicks) {
    const raw = range / Math.max(1, maxTicks);
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= raw) return m * p;
    return 10 * p;
  }
  function niceScale(maxV, minV = 0, maxTicks = 4) {
    const step = niceStep((maxV - minV) || 1, maxTicks);
    const max = Math.ceil(maxV / step - 1e-9) * step;
    const min = Math.floor(minV / step + 1e-9) * step;
    const ticks = []; for (let v = min; v <= max + 1e-9; v += step) ticks.push(+v.toFixed(6));
    return { min, max, ticks };
  }
  const decOf = arr => arr.some(v => v != null && Math.round(v) !== v) ? 1 : 0;
  const fmtN = (v, d) => (v == null ? '—' : Number(v).toFixed(d));
  function panelOf(el) { return el.closest('.panel'); }

  /* ── 2 · JuneCharts ────────────────────────────────────────────────────── */
  const JuneCharts = (() => {
    const hosts = new Set();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(es => es.forEach(e => draw(e.target))) : null;

    function mount(host, type, opts) {
      if (typeof host === 'string') host = document.querySelector(host);
      if (!host) return null;
      host.classList.add('jc');
      host._jc = { type, opts: opts || {} };
      host._w = null;
      if (type !== 'hbars') {
        host.setAttribute('role', 'img');
        if (opts.ariaLabel) host.setAttribute('aria-label', opts.ariaLabel);
        if (opts.interactive !== false && type !== 'meter') {
          host.tabIndex = 0;
          if (!host._live) { // announce keyboard tooltips (role=img hides its children)
            host._live = document.createElement('span');
            host._live.className = 'sr-only'; host._live.setAttribute('aria-live', 'polite');
            host.after(host._live);
          }
        }
      }
      hosts.add(host);
      if (ro) ro.observe(host);
      draw(host);
      return { el: host, update(o) { host._jc.opts = Object.assign({}, host._jc.opts, o); host._w = null; draw(host); } };
    }

    function draw(host, force) {
      if (!host._jc) return;
      const W = Math.floor(host.clientWidth);
      if (!W) return;
      if (host._w === W && !force) return;
      host._w = W;
      const first = !host._drawn; host._drawn = true;
      const anim = first && motionOK() && !!panelOf(host)?.classList.contains('active');
      host.classList.toggle('animate', anim);
      if (anim) setTimeout(() => host.classList.remove('animate'), 1400);
      const r = renderers[host._jc.type];
      if (r) r(host, host._jc.opts, W);
    }

    /* Shared: threshold/series labels, either in a right gutter (wide) or as a key row (narrow) */
    function keyHTML(entries) {
      if (!entries.length) return '';
      return '<div class="jc-key" aria-hidden="true">' + entries.map(e => `<span>${e.swatch}${esc(e.name)}${e.val ? ` <b>${esc(e.val)}</b>` : ''}</span>`).join('') + '</div>';
    }
    const toneVar = t => ({ accent: 'var(--accent-strong)', alert: 'var(--alert-graphic)', ink: 'var(--ink-400)', elec: 'var(--elec-strong)', gas: 'var(--gas)', 'accent-strong': 'var(--accent-strong)' }[t] || 'var(--ink-400)');
    const fillVar = t => (t && t.startsWith('cat-')) ? `var(--${t})` : ({ accent: 'var(--accent)', alert: 'var(--alert-graphic)', ink: 'var(--chart-rolloff)', muted: 'var(--chart-muted)', compare: 'var(--chart-compare)', elec: 'var(--elec)', gas: 'var(--gas)' }[t] || 'var(--accent)');

    /* Tooltip + keyboard exploration shared by bars and line */
    function wireTips(host, svg, n, has, place, text, onActive) {
      const tip = host.querySelector('.jc-tip');
      let cur = -1;
      const set = i => {
        cur = i;
        if (i < 0 || !has(i)) { tip.classList.remove('show'); svg.classList.remove('hovering'); onActive(-1); return; }
        const [x, y] = place(i); svg.classList.add('hovering'); onActive(i);
        tip.textContent = text(i); tip.style.left = x + 'px'; tip.style.top = y + 'px'; tip.classList.add('show');
      };
      host._setTip = set;
      svg.addEventListener('mousemove', e => {
        const r = svg.getBoundingClientRect(); const hit = e.target.closest('[data-i]');
        if (hit) set(+hit.dataset.i); else if (host._xToIndex) set(host._xToIndex(e.clientX - r.left)); else set(-1);
      });
      svg.addEventListener('mouseleave', () => set(-1));
      host.onkeydown = e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(e.key)) return;
        e.preventDefault();
        if (e.key === 'Escape') return set(-1);
        const valid = [...Array(n).keys()].filter(has); if (!valid.length) return;
        let k = valid.indexOf(cur);
        if (e.key === 'Home') k = 0; else if (e.key === 'End') k = valid.length - 1;
        else k = k < 0 ? (e.key === 'ArrowRight' ? 0 : valid.length - 1) : Math.max(0, Math.min(valid.length - 1, k + (e.key === 'ArrowRight' ? 1 : -1)));
        set(valid[k]); if (host._live) host._live.textContent = text(valid[k]);
      };
      host.onblur = () => set(-1);
    }

    function gutterLabels(items, plotRight, lo, hi) {
      // items: {y, name, val, cls, valCls}; two-line label blocks (30px) with leaders to their line
      const pos = resolve1D(items.map(it => ({ c: it.y, size: 30 })), 4, lo, hi);
      let s = '';
      items.forEach((it, i) => {
        const c = pos[i], x = plotRight + 14;
        if (Math.abs(c - it.y) > 1) s += `<path class="jc-leader jc-late" d="M${plotRight + 4} ${it.y.toFixed(1)} L${x - 4} ${c.toFixed(1)}"/>`;
        s += `<text class="jc-thr-name jc-late" x="${x}" y="${(c - 3).toFixed(1)}">${esc(it.name)}</text>`;
        if (it.val) s += `<text class="jc-thr-val jc-late ${it.valCls || ''}" x="${x}" y="${(c + 12).toFixed(1)}">${esc(it.val)}</text>`;
      });
      return s;
    }
    const gutterWidth = items => items.length ? Math.ceil(Math.max(...items.map(t => Math.max(textW(t.name), textW(t.val || '', 600))))) + 22 : 0;

    /* x tick selection */
    function pickTicks(o, n, labels, pw) {
      if (o.xTicks) return o.xTicks;
      const maxW = Math.max(...labels.map(l => textW(l))) + 14;
      const fit = Math.max(1, Math.floor(pw / maxW));
      const step = Math.ceil(n / fit);
      const out = []; for (let i = 0; i < n; i += step) out.push(i); return out;
    }

    /* ── bars ─────────────────────────────────────────────────────────────
       opts: values | series[{name, values, tone}] (stacked), slots, labels, tipLabels,
       xTicks (0-based), now {index,label}, highlight (index | [{index,tone}]), muteOthers,
       tone, thresholds[{value,label,tone,emphasis,valueText}], annotation {index,text,tone},
       futureLabel, yMax, yTicks, yLabel, unit, decimals, height, compact, tooltip(i,v)→str,
       ariaLabel, thresholdLabels ('auto'|'key'|'gutter')                                 */
    function bars(host, o, W) {
      const series = o.series || [{ name: o.name || '', values: o.values || [], tone: o.tone || 'accent' }];
      const stacked = series.length > 1;
      const nData = Math.max(...series.map(s => s.values.length));
      const n = Math.max(o.slots || 0, nData);
      const tot = [...Array(nData).keys()].map(i => { const vs = series.map(s => s.values[i]); return vs.every(v => v == null) ? null : vs.reduce((a, v) => a + (v || 0), 0); });
      const dec = o.decimals ?? decOf(tot);
      const unit = o.unit ? ' ' + o.unit : '';
      const compact = !!o.compact;
      const narrow = W < 480;
      const thr = (o.thresholds || []).map(t => ({ ...t, valueText: t.valueText || fmtN(t.value, dec) + unit }));
      const mode = compact ? 'none' : (o.thresholdLabels === 'key' || (o.thresholdLabels !== 'gutter' && narrow)) ? 'key' : 'gutter';
      const labels = o.labels || [...Array(n).keys()].map(i => String(i + 1));
      const hl = new Map();
      [].concat(o.highlight ?? []).forEach(h => typeof h === 'number' ? hl.set(h, 'alert') : hl.set(h.index, h.tone || 'alert'));
      const maxV = Math.max(0, ...tot.filter(v => v != null), ...thr.map(t => t.value));
      const sc = o.yMax ? { max: o.yMax, ticks: o.yTicks || niceScale(o.yMax, 0, 4).ticks } : niceScale(maxV * 1.08, 0, narrow ? 3 : 4);
      if (o.yTicks) sc.ticks = o.yTicks;
      const yMax = sc.max;
      const tickW = compact ? 0 : Math.max(...sc.ticks.map(t => textW(fmtN(t, decOf(sc.ticks)))));
      const gItems = thr.map(t => ({ name: t.label, val: t.valueText }));
      const gut = mode === 'gutter' ? Math.max(gutterWidth(gItems), 8) : (compact ? 0 : 8);
      const capH = o.yLabel && !compact ? 24 : 0;
      const H = o.height || (compact ? 56 : narrow ? 210 : 240);
      const m = { l: compact ? 0 : tickW + 12, r: gut, t: capH + (compact ? 2 : (o.annotation ? 22 : 12)), b: compact ? (o.xTicks ? 20 : 2) : 26 };
      const pw = W - m.l - m.r, ph = H - m.t - m.b;
      const y = v => m.t + ph - (v / yMax) * ph;
      const slot = pw / n, bw = Math.max(2, Math.min(slot * (compact ? 0.72 : 0.62), o.maxBar || 18)), rad = Math.min(4, bw / 3);
      const cx = i => m.l + (i + 0.5) * slot;
      const base = y(0);
      const barPath = (x0, top, bottom, round) => {
        const x1 = x0 + bw, r = round ? Math.min(rad, (bottom - top) / 2) : 0;
        return `M${x0.toFixed(1)} ${bottom.toFixed(1)}V${(top + r).toFixed(1)}Q${x0.toFixed(1)} ${top.toFixed(1)} ${(x0 + r).toFixed(1)} ${top.toFixed(1)}H${(x1 - r).toFixed(1)}Q${x1.toFixed(1)} ${top.toFixed(1)} ${x1.toFixed(1)} ${(top + r).toFixed(1)}V${bottom.toFixed(1)}Z`;
      };
      let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">`;
      if (capH) s += `<text class="jc-caption" x="0" y="12">${esc(o.yLabel)}</text>`;
      if (!compact) {
        sc.ticks.forEach(t => {
          if (t > 0) s += `<line class="jc-grid" x1="${m.l}" x2="${W - m.r}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/>`;
          s += `<text class="jc-tick" x="${m.l - 10}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end">${fmtN(t, decOf(sc.ticks))}</text>`;
        });
      }
      s += `<line class="jc-axis" x1="${m.l}" x2="${W - m.r}" y1="${base}" y2="${base}"/>`;
      // bars
      for (let i = 0; i < nData; i++) {
        if (tot[i] == null) continue;
        const delay = Math.min(i * 16, 300);
        let acc = 0;
        series.forEach((sr, k) => {
          const v = sr.values[i]; if (!v) return;
          const bottom = y(acc), top = y(acc + v); acc += v;
          const isTop = k === series.length - 1 || series.slice(k + 1).every(s2 => !s2.values[i]);
          let tone = sr.tone || 'accent';
          if (!stacked && hl.has(i)) tone = hl.get(i); else if (!stacked && hl.size && o.muteOthers) tone = 'muted';
          const gapPx = stacked && k > 0 ? 2 : 0;
          const style = (tone && tone.startsWith('cat-')) ? ` style="fill:var(--${tone});animation-delay:${delay}ms"` : ` style="animation-delay:${delay}ms"`;
          s += `<path class="jc-bar t-${tone}" data-i="${i}" d="${barPath(cx(i) - bw / 2, top, bottom - gapPx, isTop)}"${style}/>`;
        });
      }
      // future slots: faint baseline dots + optional label
      for (let i = nData; i < n; i++) s += `<circle class="jc-future jc-late" cx="${cx(i).toFixed(1)}" cy="${(base - 3).toFixed(1)}" r="1.5"/>`;
      if (o.futureLabel && n > nData) {
        const fx0 = m.l + nData * slot, fw = (n - nData) * slot, tw = textW(o.futureLabel);
        if (fw > tw + 16) s += `<text class="jc-future-label jc-late" x="${(fx0 + fw / 2).toFixed(1)}" y="${(m.t + ph * 0.72).toFixed(1)}" text-anchor="middle">${esc(o.futureLabel)}</text>`;
      }
      // thresholds (to scale) + labels
      thr.forEach(t => {
        const cls = `jc-thr jc-late t-${t.tone || 'ink'}${t.emphasis ? ' em' : ''}`;
        s += `<line class="${cls}" x1="${m.l}" x2="${(W - m.r + (mode === 'gutter' ? 4 : 0)).toFixed(1)}" y1="${y(t.value).toFixed(1)}" y2="${y(t.value).toFixed(1)}"/>`;
      });
      if (mode === 'gutter' && thr.length) s += gutterLabels(thr.map(t => ({ y: y(t.value), name: t.label, val: t.valueText, valCls: t.tone === 'accent' ? 't-accent' : '' })), W - m.r, 4, H - 4);
      // annotation
      if (o.annotation && tot[o.annotation.index] != null && !compact) {
        const a = o.annotation, tw = textW(a.text, 600);
        const ax = Math.max(m.l + tw / 2, Math.min(W - m.r - tw / 2 - 2, cx(a.index)));
        s += `<text class="jc-annot jc-late t-${a.tone || 'alert'}" x="${ax.toFixed(1)}" y="${(y(tot[a.index]) - 10).toFixed(1)}" text-anchor="middle">${esc(a.text)}</text>`;
      }
      // x ticks (+ "now" label)
      const ticks = pickTicks(o, n, labels, pw).filter(i => !o.now || Math.abs(cx(i) - cx(o.now.index)) > (textW(o.now.label, 600) / 2 + textW(labels[i]) / 2 + 6));
      if (!compact || o.xTicks) {
        ticks.forEach(i => s += `<text class="jc-tick" x="${cx(i).toFixed(1)}" y="${H - 6}" text-anchor="${compact && i === 0 ? 'start' : compact && i === n - 1 ? 'end' : 'middle'}">${esc(labels[i])}</text>`);
        if (o.now) s += `<text class="jc-tick strong" x="${Math.max(m.l + textW(o.now.label, 600) / 2, Math.min(W - m.r - textW(o.now.label, 600) / 2, cx(o.now.index))).toFixed(1)}" y="${H - 6}" text-anchor="middle">${esc(o.now.label)}</text>`;
      }
      // hit areas
      for (let i = 0; i < nData; i++) if (tot[i] != null) s += `<rect class="jc-hit" data-i="${i}" x="${(cx(i) - slot / 2).toFixed(1)}" y="${m.t}" width="${slot.toFixed(1)}" height="${ph}"/>`;
      s += `</svg><div class="jc-tip" aria-hidden="true"></div>`;
      const keyEntries = [];
      if (stacked) series.forEach(sr => keyEntries.push({ swatch: `<i class="dot" style="background:${fillVar(sr.tone)}"></i>`, name: sr.name }));
      if (mode === 'key') thr.forEach(t => keyEntries.push({ swatch: `<i class="ln${t.emphasis ? '' : ' thin'}" style="border-color:${toneVar(t.tone)}"></i>`, name: t.label, val: t.valueText }));
      host.innerHTML = keyHTML(keyEntries) + s;
      const svg = host.querySelector('svg'), barsEls = $$('.jc-bar', svg);
      const tipLabels = o.tipLabels || labels;
      const text = i => typeof o.tooltip === 'function' ? o.tooltip(i, tot[i]) : stacked
        ? `${tipLabels[i]} · ${series.map(sr => `${sr.name} ${fmtN(sr.values[i], dec)}`).join(' · ')}${unit}`
        : `${tipLabels[i]} · ${fmtN(tot[i], dec)}${unit}`;
      if (o.interactive !== false && !compact) {
        host._xToIndex = null;
        wireTips(host, svg, nData, i => tot[i] != null, i => [cx(i), y(tot[i]) - 8 - (o.annotation && o.annotation.index === i ? 22 : 0) + (host.querySelector('.jc-key')?.offsetHeight || 0)], text,
          i => barsEls.forEach(b => b.classList.toggle('on', +b.dataset.i === i)));
      }
    }

    /* ── line ─────────────────────────────────────────────────────────────
       opts: series[{name, values, tone ('accent'|'ink'|'elec'|'gas'), forecastFrom, band{lo,hi}, dots}],
       labels, tipLabels, xTicks, now {index,label}, yMin, yMax, yTicks, yLabel, unit, decimals,
       thresholds (as bars), height, endLabels (default true), tooltip(i)→str, ariaLabel     */
    function line(host, o, W) {
      const series = o.series || [];
      const n = Math.max(...series.map(s => s.values.length), (o.labels || []).length);
      const all = series.flatMap(s => s.values.concat(s.band ? s.band.hi : []).filter(v => v != null));
      const dec = o.decimals ?? decOf(all);
      const unit = o.unit ? ' ' + o.unit : '';
      const narrow = W < 480;
      const thr = (o.thresholds || []).map(t => ({ ...t, valueText: t.valueText || fmtN(t.value, dec) + unit }));
      const mode = (o.thresholdLabels === 'key' || (o.thresholdLabels !== 'gutter' && narrow)) ? 'key' : 'gutter';
      const labels = o.labels || [...Array(n).keys()].map(i => String(i + 1));
      const lastIdx = s => { for (let i = s.values.length - 1; i >= 0; i--) if (s.values[i] != null) return i; return -1; };
      const ends = o.endLabels === false ? [] : series.filter(s => s.name).map(s => ({ s, i: lastIdx(s) })).filter(e => e.i >= 0);
      const gItems = mode === 'gutter' ? ends.map(e => ({ name: e.s.name, val: fmtN(e.s.values[e.i], dec) + unit })).concat(thr.map(t => ({ name: t.label, val: t.valueText }))) : [];
      const sc = o.yMax != null ? { min: o.yMin || 0, max: o.yMax, ticks: o.yTicks || niceScale(o.yMax, o.yMin || 0, 4).ticks } : niceScale(Math.max(...all, ...thr.map(t => t.value)) * 1.05, o.yMin || 0, narrow ? 3 : 4);
      if (o.yTicks) sc.ticks = o.yTicks;
      const tickW = Math.max(...sc.ticks.map(t => textW(fmtN(t, decOf(sc.ticks)))));
      const gut = mode === 'gutter' ? Math.max(gutterWidth(gItems), 12) : 12;
      const capH = o.yLabel ? 24 : 0;
      const H = o.height || (narrow ? 210 : 240);
      const m = { l: tickW + 12, r: gut, t: capH + (o.now ? 22 : 12), b: 26 };
      const pw = W - m.l - m.r, ph = H - m.t - m.b;
      const x = i => m.l + (n <= 1 ? pw / 2 : (i / (n - 1)) * pw);
      const y = v => m.t + ph - ((v - sc.min) / (sc.max - sc.min)) * ph;
      const pathOf = (vals, from, to) => {
        let d = '', pen = false;
        for (let i = from; i <= to && i < vals.length; i++) {
          if (vals[i] == null) { pen = false; continue; }
          d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)} ${y(vals[i]).toFixed(1)}`; pen = true;
        }
        return d;
      };
      let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">`;
      if (capH) s += `<text class="jc-caption" x="0" y="12">${esc(o.yLabel)}</text>`;
      sc.ticks.forEach(t => {
        s += `<line class="${t === sc.min ? 'jc-axis' : 'jc-grid'}" x1="${m.l}" x2="${W - m.r}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/>`;
        s += `<text class="jc-tick" x="${m.l - 10}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end">${fmtN(t, decOf(sc.ticks))}</text>`;
      });
      series.forEach(sr => {
        if (!sr.band) return;
        const idx = [...Array(n).keys()].filter(i => sr.band.lo[i] != null && sr.band.hi[i] != null);
        if (!idx.length) return;
        const d = idx.map((i, k) => `${k ? 'L' : 'M'}${x(i).toFixed(1)} ${y(sr.band.hi[i]).toFixed(1)}`).join('') + idx.slice().reverse().map(i => `L${x(i).toFixed(1)} ${y(sr.band.lo[i]).toFixed(1)}`).join('') + 'Z';
        s += `<path class="jc-band jc-late" d="${d}"/>`;
      });
      thr.forEach(t => s += `<line class="jc-thr jc-late t-${t.tone || 'ink'}${t.emphasis ? ' em' : ''}" x1="${m.l}" x2="${W - m.r + (mode === 'gutter' ? 4 : 0)}" y1="${y(t.value).toFixed(1)}" y2="${y(t.value).toFixed(1)}"/>`);
      if (o.now) {
        const nx = x(o.now.index);
        s += `<line class="jc-now" x1="${nx.toFixed(1)}" x2="${nx.toFixed(1)}" y1="${m.t - 4}" y2="${y(sc.min)}"/>`;
        const lw = textW(o.now.label || 'Now', 600);
        s += `<text class="jc-now-label" x="${Math.max(m.l + lw / 2, Math.min(W - m.r - lw / 2, nx)).toFixed(1)}" y="${m.t - 10}" text-anchor="middle">${esc(o.now.label || 'Now')}</text>`;
      }
      series.forEach(sr => {
        const tone = sr.tone || 'accent', li = lastIdx(sr);
        const ff = sr.forecastFrom ?? Infinity;
        const solid = pathOf(sr.values, 0, Math.min(ff, sr.values.length - 1));
        if (solid) s += `<path class="jc-line jc-draw t-${tone}" d="${solid}" pathLength="1" style="--len:1;stroke-dasharray:${motionOK() ? 1 : 'none'}"/>`;
        if (ff < sr.values.length) { const dsh = pathOf(sr.values, ff, sr.values.length - 1); if (dsh) s += `<path class="jc-line dash jc-late t-${tone}" d="${dsh}"/>`; }
        if (sr.dots) sr.values.forEach((v, i) => { if (v != null) s += `<circle class="jc-dot jc-late t-${tone}" cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3"/>`; });
        else if (li >= 0) s += `<circle class="jc-dot jc-late t-${tone}" cx="${x(li).toFixed(1)}" cy="${y(sr.values[li]).toFixed(1)}" r="4"/>`;
      });
      if (mode === 'gutter' && gItems.length) {
        const items = ends.map(e => ({ y: y(e.s.values[e.i]), name: e.s.name, val: fmtN(e.s.values[e.i], dec) + unit, valCls: (e.s.tone || 'accent') === 'accent' ? 't-accent' : '' }))
          .concat(thr.map(t => ({ y: y(t.value), name: t.label, val: t.valueText, valCls: t.tone === 'accent' ? 't-accent' : '' })));
        s += gutterLabels(items, W - m.r, 4, H - 4);
      }
      pickTicks(o, n, labels, pw).forEach(i => s += `<text class="jc-tick" x="${x(i).toFixed(1)}" y="${H - 6}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}">${esc(labels[i])}</text>`);
      s += `<line class="jc-cross" x1="0" x2="0" y1="${m.t}" y2="${y(sc.min)}" style="opacity:0"/>`;
      s += `</svg><div class="jc-tip" aria-hidden="true"></div>`;
      const keyEntries = [];
      if (series.length > 1 || mode === 'key') series.forEach(sr => keyEntries.push({ swatch: `<i class="ln${sr.forecastFrom != null ? '' : ''}" style="border-color:${toneVar(sr.tone || 'accent')}"></i>`, name: sr.name }));
      if (series.some(sr => sr.forecastFrom != null)) keyEntries.push({ swatch: `<i class="ln dash" style="border-color:var(--ink-400)"></i>`, name: o.forecastName || 'Forecast' });
      if (series.some(sr => sr.band)) keyEntries.push({ swatch: `<i class="dot" style="background:var(--chart-band);width:14px;border-radius:3px"></i>`, name: o.bandName || 'Likely range' });
      if (mode === 'key') thr.forEach(t => keyEntries.push({ swatch: `<i class="ln${t.emphasis ? '' : ' thin'}" style="border-color:${toneVar(t.tone)}"></i>`, name: t.label, val: t.valueText }));
      host.innerHTML = keyHTML(keyEntries.filter(e => e.name)) + s;
      const svg = host.querySelector('svg'), cross = svg.querySelector('.jc-cross');
      const keyH = () => host.querySelector('.jc-key')?.offsetHeight || 0;
      host._xToIndex = px => Math.max(0, Math.min(n - 1, Math.round(((px - m.l) / pw) * (n - 1))));
      const has = i => series.some(sr => sr.values[i] != null);
      const tipLabels = o.tipLabels || labels;
      const text = i => typeof o.tooltip === 'function' ? o.tooltip(i) : `${tipLabels[i]} · ` + series.filter(sr => sr.values[i] != null).map(sr => `${sr.name ? sr.name + ' ' : ''}${fmtN(sr.values[i], dec)}`).join(' · ') + unit;
      if (o.interactive !== false) wireTips(host, svg, n, has, i => {
        const top = Math.min(...series.filter(sr => sr.values[i] != null).map(sr => y(sr.values[i])));
        return [x(i), top - 10 + keyH()];
      }, text, i => { if (i < 0) cross.style.opacity = 0; else { cross.setAttribute('x1', x(i)); cross.setAttribute('x2', x(i)); cross.style.opacity = 1; } });
    }

    /* ── hbars (ranked horizontal bars, HTML list — readable, reflows) ─────
       opts: items[{label, value, valueText, tone ('cat-1'…'cat-5','cat-other','accent','muted'), note}],
       max, swatch (bool), highlight (index), muteOthers                               */
    function hbars(host, o) {
      const items = o.items || [];
      const max = o.max || Math.max(...items.map(i => i.value)) || 1;
      host.innerHTML = '<ul class="jc-hbars">' + items.map((it, i) => {
        const muted = o.muteOthers && o.highlight != null && i !== o.highlight;
        const bg = fillVar(it.tone || (o.swatch ? `cat-${Math.min(i + 1, 5)}` : 'accent'));
        return `<li class="jc-hbar${muted ? ' muted' : ''}"><div class="jc-hbar__head"><span class="jc-hbar__name">${o.swatch ? `<i class="jc-hbar__sw" style="background:${bg}" aria-hidden="true"></i>` : ''}${esc(it.label)}${it.note ? ` ${it.note}` : ''}</span><span class="jc-hbar__val">${it.valueText || esc(it.value)}</span></div>` +
          `<div class="jc-hbar__track" aria-hidden="true"><span class="jc-hbar__fill" style="width:${(it.value / max * 100).toFixed(1)}%;${muted ? '' : `background:${bg};`}animation-delay:${Math.min(i * 40, 240)}ms"></span></div></li>`;
      }).join('') + '</ul>';
    }

    /* ── meter (honest number line: bullet fill + labelled markers + zones) ─
       opts: min, max, ticks, unit, decimals, fill {to, provisional}, zones[{from,to,label}],
       markers[{value, label, valueText, kind ('you'|'ref'|'muted'), side ('above'|'below'), hollow}], ariaLabel */
    function meter(host, o, W) {
      const min = o.min ?? 0, max = o.max, dec = o.decimals ?? 1, unit = o.unit ? ' ' + o.unit : '';
      const pad = 6, x = v => pad + ((v - min) / (max - min)) * (W - pad * 2);
      const mk = (o.markers || []).map(m => ({ ...m, valueText: m.valueText || fmtN(m.value, dec) + unit, side: m.side || (m.kind === 'you' ? 'above' : 'below') }));
      const zones = o.zones || [];
      const above = mk.filter(m => m.side === 'above'), below = mk.filter(m => m.side === 'below');
      const hasBelow = below.length || zones.some(z => z.label);
      const trackY = above.length ? 44 : 14, th = 10, tb = trackY + th;
      const tickY = tb + 20, belowTop = tickY + 12;
      const H = hasBelow ? belowTop + 34 : tickY + 6;
      const place = (arr, extra) => {
        const items = arr.map(m => { const w = Math.max(textW(m.label), textW(m.valueText, 600)); return { c: m.center ?? x(m.value), size: w }; });
        return resolve1D(items, 12, 0, W);
      };
      let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">`;
      s += `<rect class="jc-track" x="${pad}" y="${trackY}" width="${W - pad * 2}" height="${th}" rx="${th / 2}"/>`;
      if (o.fill) s += `<rect class="jc-fill${o.fill.provisional ? ' provisional' : ''}" x="${pad}" y="${trackY}" width="${(x(o.fill.to) - pad).toFixed(1)}" height="${th}" rx="${th / 2}"/>`;
      // zones: a bracket just under the track (fills would hide them)
      zones.forEach(z => s += `<path class="jc-zone" d="M${x(z.from).toFixed(1)} ${tb + 3}v4H${x(z.to).toFixed(1)}v-4"/>`);
      // labels: above
      const ap = place(above);
      above.forEach((m, i) => {
        const cx = ap[i], mx = x(m.value);
        if (Math.abs(cx - mx) > 2) s += `<path class="jc-leader" d="M${mx.toFixed(1)} ${trackY - 8} L${cx.toFixed(1)} ${trackY - 14}"/>`;
        s += `<text class="jc-thr-name" x="${cx.toFixed(1)}" y="14" text-anchor="middle">${esc(m.label)}</text>`;
        s += `<text class="jc-thr-val${m.kind === 'you' ? ' t-accent' : ''}" x="${cx.toFixed(1)}" y="30" text-anchor="middle">${esc(m.valueText)}</text>`;
      });
      // labels: below (markers + zone labels share one row)
      const belowItems = below.map(m => ({ ...m, isZone: false })).concat(zones.filter(z => z.label).map(z => ({ label: z.label, valueText: z.valueText || '', value: (z.from + z.to) / 2, isZone: true })));
      const bp = place(belowItems);
      const leaderXs = [];
      belowItems.forEach((m, i) => {
        const cx = bp[i];
        if (!m.isZone) { const mx = x(m.value); leaderXs.push(mx, cx); s += `<path class="jc-leader" d="M${mx.toFixed(1)} ${tb + 8} L${mx.toFixed(1)} ${tickY - 2} L${cx.toFixed(1)} ${belowTop - 2}"/>`; }
        s += `<text class="jc-thr-name" x="${cx.toFixed(1)}" y="${belowTop + 12}" text-anchor="middle">${esc(m.label)}</text>`;
        if (m.valueText) s += `<text class="jc-thr-val" x="${cx.toFixed(1)}" y="${belowTop + 28}" text-anchor="middle">${esc(m.valueText)}</text>`;
      });
      // ticks (skipped where a leader passes)
      (o.ticks || []).forEach((t, k, arr) => {
        const tx = x(t), lab = k === arr.length - 1 ? fmtN(t, 0) + unit : fmtN(t, 0), w = textW(lab);
        if (leaderXs.some(lx => Math.abs(lx - tx) < w / 2 + 6)) return;
        const anchor = k === 0 ? 'start' : k === arr.length - 1 ? 'end' : 'middle';
        s += `<text class="jc-tick" x="${(k === 0 ? Math.max(0, tx - 3) : k === arr.length - 1 ? Math.min(W, tx + 3) : tx).toFixed(1)}" y="${tickY}" text-anchor="${anchor}">${esc(lab)}</text>`;
      });
      // markers on top
      mk.forEach(m => {
        const mx = x(m.value).toFixed(1);
        if (m.kind === 'you') s += `<circle class="jc-mk-you${m.hollow ? ' hollow' : ''} jc-late" cx="${mx}" cy="${trackY + th / 2}" r="8"/>`;
        else s += `<line class="${m.kind === 'muted' ? 'jc-mk-muted' : 'jc-mk-ref'}" x1="${mx}" x2="${mx}" y1="${trackY - 6}" y2="${tb + 6}"/>`;
      });
      s += '</svg>';
      host.innerHTML = s;
    }

    const renderers = { bars, line, hbars, meter };

    /* Declarative: <div data-chart="bars"><script type="application/json">{…}</script></div> */
    function render(root = document) {
      $$('[data-chart]', root).forEach(el => {
        if (el._jc) return;
        const src = el.querySelector('script[type="application/json"]');
        let opts = {};
        try { opts = JSON.parse(src ? src.textContent : (el.dataset.config || '{}')); } catch (e) { console.warn('JuneCharts: bad JSON in', el, e); }
        mount(el, el.dataset.chart, opts);
      });
    }
    function refresh() { hosts.forEach(h => { h._w = null; draw(h); }); }

    return {
      bars: (el, o) => mount(el, 'bars', o), line: (el, o) => mount(el, 'line', o),
      hbars: (el, o) => mount(el, 'hbars', o), meter: (el, o) => mount(el, 'meter', o),
      render, refresh, _draw: draw
    };
  })();
  window.JuneCharts = JuneCharts;

  /* ── 3 · Panels, tab bar, reviewer picker, theme ───────────────────────── */
  function init() {
    JuneCharts.render();
    // Popovers live in fragments; move them to <body> so fixed positioning isn't
    // trapped by transformed ancestors (tiles lift on hover, panels animate in).
    $$('.popover').forEach(p => { p.hidden = true; p.setAttribute('role', p.getAttribute('role') || 'dialog'); document.body.appendChild(p); });

    const panels = $$('.panel');
    const tabs = $$('.tabs .tab');
    const tabName = key => (tabs.find(t => t.dataset.tab === key)?.textContent || key).trim();
    const thumb = $('.tabs .thumb');
    const firstOfTab = key => document.getElementById('panel-' + key) || panels.find(p => p.dataset.tab === key);
    tabs.forEach(t => { if (!firstOfTab(t.dataset.tab)) { t.setAttribute('aria-disabled', 'true'); t.tabIndex = -1; t.removeAttribute('href'); } });

    function moveThumb(instant) {
      const active = tabs.find(t => t.getAttribute('aria-current') === 'page');
      if (!active || !thumb) { if (thumb) thumb.style.width = '0'; return; }
      if (instant) thumb.style.transition = 'none';
      thumb.style.width = active.offsetWidth + 'px';
      thumb.style.transform = `translateX(${active.offsetLeft - 4}px)`;
      if (instant) requestAnimationFrame(() => requestAnimationFrame(() => (thumb.style.transition = '')));
      const sc = thumb.closest('.tabs-scroll'); if (!sc) return;
      const l = active.offsetLeft, r = l + active.offsetWidth;
      if (l < sc.scrollLeft + 16 || r > sc.scrollLeft + sc.clientWidth - 16) sc.scrollLeft = Math.max(0, l - (sc.clientWidth - active.offsetWidth) / 2);
    }

    // Reviewer picker: grouped by tab, generated from data-tab / data-label
    const picker = $('#panel-picker');
    if (picker) {
      const groups = new Map();
      panels.forEach(p => { const k = p.dataset.tab || 'other'; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(p); });
      picker.innerHTML = [...groups].map(([k, ps]) => `<optgroup label="${esc(tabName(k))}">` + ps.map(p => `<option value="${p.id}">${esc(p.dataset.label || p.id)}</option>`).join('') + '</optgroup>').join('');
      picker.addEventListener('change', () => show(picker.value, { top: true }));
    }
    const step = d => { const i = panels.findIndex(p => p.classList.contains('active')); const n = panels[(i + d + panels.length) % panels.length]; if (n) show(n.id, { top: true }); };
    $('#panel-prev')?.addEventListener('click', () => step(-1));
    $('#panel-next')?.addEventListener('click', () => step(1));

    const entered = new Set();
    function syncChrome(panel) {
      const key = panel?.dataset.tab;
      tabs.forEach(t => t.dataset.tab === key ? t.setAttribute('aria-current', 'page') : t.removeAttribute('aria-current'));
      if (picker && panel) picker.value = panel.id;
      moveThumb();
    }
    function show(id, opt = {}) {
      const panel = document.getElementById(id);
      if (!panel || !panel.classList.contains('panel')) return false;
      panels.forEach(p => { p.classList.toggle('active', p === panel); p.style.display = ''; });
      syncChrome(panel);
      closePop();
      enterPanel(panel);
      if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
      if (opt.top) window.scrollTo({ top: 0, behavior: 'auto' });
      return true;
    }
    window.JuneApp = { show };

    function enterPanel(panel) {
      if (entered.has(panel.id)) return;
      entered.add(panel.id);
      if (!motionOK()) return;
      panel.classList.add('anim');
      setTimeout(() => panel.classList.remove('anim'), 1500);
      $$('[data-count]', panel).forEach(countUp);
    }

    // Links anywhere: href="#panel-…" routes; href="#" is an inert placeholder
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const h = a.getAttribute('href');
      if (h === '#') { e.preventDefault(); return; }
      if (h.startsWith('#panel-')) { e.preventDefault(); if (!show(h.slice(1), { top: true })) return; if (a.classList.contains('tab')) a.focus(); }
    });
    window.addEventListener('hashchange', () => show(location.hash.slice(1)));

    // Keep chrome in sync if something else toggles .active (e.g. screenshot tools)
    const mo = new MutationObserver(() => { const act = panels.find(p => p.classList.contains('active')); if (act) { syncChrome(act); moveThumb(true); } });
    panels.forEach(p => mo.observe(p, { attributes: true, attributeFilter: ['class'] }));

    // Theme (reviewer control): auto / light / dark
    const themeBtns = $$('[data-theme-set]');
    const applyTheme = v => {
      if (v === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', v);
      themeBtns.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.themeSet === v)));
    };
    themeBtns.forEach(b => b.addEventListener('click', () => { applyTheme(b.dataset.themeSet); try { localStorage.setItem('june-theme', b.dataset.themeSet); } catch (e) { /* storage blocked */ } }));
    try { const saved = localStorage.getItem('june-theme'); if (saved) applyTheme(saved); } catch (e) { /* ignore */ }

    /* ── 4 · Segmented controls ─────────────────────────────────────────── */
    $$('.seg').forEach(seg => {
      const btns = $$(':scope > button', seg);
      seg.style.setProperty('--n', btns.length);
      const target = seg.dataset.segTarget ? $(seg.dataset.segTarget) : null;
      const enabled = b => b.getAttribute('aria-disabled') !== 'true';
      const select = (i, fire) => {
        btns.forEach((b, j) => { b.setAttribute('aria-checked', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
        seg.style.setProperty('--i', i);
        const val = btns[i].dataset.value || btns[i].textContent.trim().toLowerCase();
        if (target) $$('[data-when]', target).forEach(v => { v.hidden = !v.dataset.when.split(/\s+/).includes(val); });
        if (fire) seg.dispatchEvent(new CustomEvent('seg-change', { bubbles: true, detail: { value: val, index: i } }));
      };
      let cur = Math.max(0, btns.findIndex(b => b.getAttribute('aria-checked') === 'true'));
      select(cur, false);
      btns.forEach((b, i) => {
        b.setAttribute('role', 'radio'); b.type = 'button';
        b.addEventListener('click', () => { if (enabled(b)) { cur = i; select(i, true); } });
        b.addEventListener('keydown', e => {
          if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
          e.preventDefault();
          const d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
          let n = i; do { n = (n + d + btns.length) % btns.length; } while (!enabled(btns[n]) && n !== i);
          cur = n; select(n, true); btns[n].focus();
        });
      });
      if (!seg.getAttribute('role')) seg.setAttribute('role', 'radiogroup');
    });

    /* ── Disclosures ────────────────────────────────────────────────────── */
    $$('.disc-btn').forEach(b => {
      const body = document.getElementById(b.getAttribute('aria-controls'));
      if (!b.hasAttribute('aria-expanded')) b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', () => {
        const open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        body?.classList.toggle('open', open);
        if (open && body) setTimeout(() => $$('.jc', body).forEach(h => JuneCharts._draw(h, true)), 20);
      });
    });

    /* ── Popovers: open on click/Enter; close on Esc, outside click, or toggle.
          Never on scroll — they follow their trigger instead. ─────────────── */
    let openPop = null, openBtn = null;
    function closePop(restore) {
      if (!openPop) return;
      const p = openPop, b = openBtn;
      p.classList.remove('open'); b.setAttribute('aria-expanded', 'false');
      setTimeout(() => { if (!p.classList.contains('open')) p.hidden = true; }, motionOK() ? 160 : 0);
      openPop = openBtn = null;
      if (restore) b.focus();
    }
    function place(p, b) {
      const vw = document.documentElement.clientWidth;
      // Phones: a bottom sheet, so the popover never covers the value it explains
      const sheet = vw < 600; p.classList.toggle('sheet', sheet);
      if (sheet) { p.style.left = ''; p.style.top = ''; return; }
      const r = b.getBoundingClientRect(), pw = p.offsetWidth, ph = p.offsetHeight;
      const left = Math.min(Math.max(16, r.left + r.width / 2 - pw / 2), vw - pw - 16);
      let top = r.bottom + 10, above = false;
      if (top + ph > window.innerHeight - 8 && r.top - ph - 10 > 8) { top = r.top - ph - 10; above = true; }
      p.style.left = left + 'px'; p.style.top = top + 'px';
      p.classList.toggle('above', above);
      let caret = p.querySelector(':scope > .caret');
      if (!caret) { caret = document.createElement('span'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true'); p.prepend(caret); }
      caret.style.left = Math.max(12, Math.min(pw - 24, r.left + r.width / 2 - left - 6)) + 'px';
    }
    $$('[data-pop]').forEach(b => {
      b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', b.dataset.pop); b.setAttribute('aria-haspopup', 'dialog');
      b.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const p = document.getElementById(b.dataset.pop); if (!p) return;
        if (openBtn === b) return closePop();
        closePop();
        p.hidden = false; place(p, b);
        requestAnimationFrame(() => p.classList.add('open'));
        b.setAttribute('aria-expanded', 'true'); openPop = p; openBtn = b;
      });
    });
    document.addEventListener('click', e => { if (openPop && !openPop.contains(e.target)) closePop(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && openPop) closePop(true); });
    window.addEventListener('scroll', () => openPop && place(openPop, openBtn), { passive: true });
    window.addEventListener('resize', () => { moveThumb(true); if (openPop) place(openPop, openBtn); });

    /* ── Readiness meters (discrete counts) ─────────────────────────────── */
    $$('.readiness[data-total]').forEach(el => {
      const total = +el.dataset.total, done = +el.dataset.done || 0;
      const labels = (el.dataset.labels || '').split(',').map(s => s.trim()).filter(Boolean);
      el.style.setProperty('--total', total);
      if (!el.hasAttribute('role')) el.setAttribute('role', 'img');
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', `${done} of ${total} collected`);
      let h = '<div class="readiness__segs" aria-hidden="true">';
      for (let i = 0; i < total; i++) h += `<span class="readiness__seg grow-x${i < done ? ' on' : ''}" style="animation-delay:${i * 30}ms"></span>`;
      h += '</div>';
      if (labels.length === total) h += '<div class="readiness__labels" aria-hidden="true">' + labels.map((l, i) => `<span class="${i < done ? 'on' : i === total - 1 ? 'off end' : 'off'}">${esc(l)}</span>`).join('') + '</div>';
      el.insertAdjacentHTML('afterbegin', h);
    });

    /* ── Count-up (first view of a panel only; skipped under reduced motion) */
    function countUp(el) {
      const final = el.textContent;
      const to = parseFloat(el.dataset.count); if (isNaN(to)) return;
      const dec = el.dataset.dec != null ? +el.dataset.dec : (final.split('.')[1] || '').replace(/\D/g, '').length;
      const dur = 700, t0 = performance.now(), ease = t => 1 - Math.pow(1 - t, 3);
      const stepF = now => { const t = Math.min(1, (now - t0) / dur); el.textContent = t < 1 ? (to * ease(t)).toFixed(dec) : final; if (t < 1) requestAnimationFrame(stepF); };
      el.textContent = (0).toFixed(dec); requestAnimationFrame(stepF);
    }

    /* ── Start: hash deep-link → that panel, else the first panel ───────── */
    const startId = location.hash.slice(1);
    if (!show(startId)) show(panels[0]?.id);
    moveThumb(true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { moveThumb(true); JuneCharts.refresh(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

// Hand-drawn squiggle (one word per page, variant E). Raw string so it can sit inside set:html headlines.
export const squiggleSvg = '<svg class="squiggle power__squiggle" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="100" d="M6 24 C 26 8, 42 34, 64 20 S 102 8, 124 22 S 162 34, 186 20 S 224 8, 248 22 S 282 30, 294 14" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg>';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
/** Wrap `word` inside `text` with the squiggle underline. */
export const markWord = (text: string, word?: string) => {
  const e = esc(text);
  if (!word) return e;
  const w = esc(word);
  // keep trailing punctuation glued to the squiggled word (no orphan comma on narrow screens);
  // the squiggle sits under the word only, the punctuation hangs outside the underline.
  const re = new RegExp(`${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([.,;:!?\u202f]*)`);
  return e.replace(re, (_m, punct) => `<span class="power-wrap"><span class="power">${w}${squiggleSvg}</span>${punct}</span>`);
};

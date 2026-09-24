// Shared route map: every page key → NL and FR path. Single source of truth for
// navigation, the language switcher, canonical and hreflang. Paths have no leading slash.
export const SITE = 'https://www.june.energy/';
export const LOCALES = { 'nl-be': { html: 'nl-BE', label: 'NL' }, 'fr-be': { html: 'fr-BE', label: 'FR' } };
export const ROUTES = {
  home:       { 'nl-be': 'nl-be/',                     'fr-be': 'fr-be/' },
  plans:      { 'nl-be': 'nl-be/abonnementen/',        'fr-be': 'fr-be/abonnements/' },
  switchPlus: { 'nl-be': 'nl-be/switch-plus/',         'fr-be': 'fr-be/switch-plus/' },
  howItWorks: { 'nl-be': 'nl-be/hoe-werkt-het/',       'fr-be': 'fr-be/comment-ca-marche/' },
  faq:        { 'nl-be': 'nl-be/veelgestelde-vragen/', 'fr-be': 'fr-be/questions-frequentes/' },
  signup:     { 'nl-be': 'nl-be/aanmelden/',           'fr-be': 'fr-be/inscription/' },
};
export const NOINDEX = new Set(['signup']);
/** Link within the current build (respects BASE for the review hub). */
export const href = (key, locale, base = '/') => base.replace(/\/?$/, '/') + ROUTES[key][locale];
/** Absolute production URL (canonical / hreflang ignore BASE). */
export const abs = (key, locale) => SITE + ROUTES[key][locale];
/** <link rel=alternate> set for a page. */
export const alternates = key => [
  { hreflang: 'nl-BE', href: abs(key, 'nl-be') },
  { hreflang: 'fr-BE', href: abs(key, 'fr-be') },
  { hreflang: 'x-default', href: abs(key, 'nl-be') },
];

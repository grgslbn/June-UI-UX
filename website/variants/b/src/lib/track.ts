/* Analytics seam (seo-tech-strategy §6.3). No PII ever: field names, plan, region — never values.
   Pushes to window.dataLayer if a (consented / cookieless) collector is present; also keeps an
   in-memory log (window.__juneEvents) for QA. Every call is wrapped so blocked analytics never breaks UX. */
import { region } from './estimate';

type Props = Record<string, string | number | boolean | undefined>;
export function track(event: string, props: Props = {}) {
  try {
    const w = window as any;
    const payload = { event, variant: 'b', ...props };
    (w.__juneEvents ||= []).push(payload);
    w.dataLayer?.push(payload);
  } catch { /* ignore */ }
}

const STARTED = 'june_b_signup_started';
/** `signup_started` = first valid Belgian postcode submitted (home calculator or sign-up step 1). Once per session. */
export function signupStarted(postcode: string, props: Props) {
  let already = false;
  try { already = sessionStorage.getItem(STARTED) === '1'; } catch { /* private mode */ }
  if (already) return false;
  try { sessionStorage.setItem(STARTED, '1'); } catch { /* ignore */ }
  track('signup_started', { postcode_region: region(postcode) ?? undefined, ...props });
  return true;
}

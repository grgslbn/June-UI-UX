# Final site brief — C + borrowings (round 2 build)

**Decision (product owner, after round 1):** converge on **C · Honest Market** as the base (weighted 4.24, best UX/conversion/tech), borrow the best of A, B, E, fix every round-1 defect, then run round 2 on this one site. Project: `website/variants/final/` (copy of C). C, A, B, E stay untouched as references.

Read: `website/evaluations/round1-scorecard.md` + the five round-1 reports (`round1-design.md`, `-ux.md`, `-conversion.md`, `-technical.md`, `-personas.md`), `website/brief/strategy-brief.md` §2 + §6, `website/shared/assets/README.md`, `website/brief/content-freeze.md`.

## Product-owner decisions
- **Estimate:** keep the in-browser indicative range, **net of the plan fee first** (gross secondary), C's full method note, **no preset example numbers** before input, never recommend a plan whose fee eats the saving (recommend Switch Plus or say "Je zit al goed" honestly). All logic stays in `src/lib/estimate.js` behind one function so June's engine can replace it. Legal sign-off pending → keep "Indicatief" label + footnote.
- **Unconfirmed facts** (phone, cancellation, guarantee terms, supplier commissions, KBO): keep safe interim wording; **never show "TBC"/bracket placeholders** — hide the item or use a neutral line ("Neem contact op via [kanaal]" → "Contact via je account" etc. per claims register). Login: link to `https://www.june.energy/` "Inloggen" is acceptable interim, not `#`.
- Brand green `#1CA498` (fills/logo/large), `#127A71` buttons/small text; real current app UI; real assets.

## Borrow list
- **From A:** hero value/status tile (C's hero keeps the manifesto H1 but gains a compact tile with price + guarantee + "gecontroleerd elke maand"), **Premium product band** (real leaf dongle + NL/FR phone mockup) on home and plans, **postcode → town + grid operator** confirmation, error summary that receives focus.
- **From B:** "wat jij overhoudt" ledger per plan card (only after the visitor has an estimate; otherwise show the method, no preset numbers), **funnel answers survive the NL↔FR switch**, **per-step URLs** (back/reload safe), two-question plan helper.
- **From E:** one hand-drawn squiggle under a single word per page, CTA hover, **June character (cheering) on the sign-up confirmation**, pointing character in FAQ "niet gevonden?" block — at most once per page.
- **Keep from C:** three-question hero panel (move directly under H1 on < 700px), "Wat we van je weten" funnel panel, footnotes column, four-party strip, editorial type; build the missing signature motion (chart lines draw 700ms, then the red "prijs van trouw" circle).

## Defect list (all must be fixed)
1. Sticky mobile CTA hides focused elements → `scroll-padding-bottom` = bar height; sticky CTA on **every** content page incl. plans, Switch Plus, FAQ; plan-specific on plans/Switch Plus.
2. Rating/count + one risk reducer within ~40px of every primary CTA.
3. Guarantee always with its condition; rephrase "zonder risico op verlies"; don't use "Besparen met gegarandeerd resultaat" unqualified (use e.g. "Besparen, met winstgarantie").
4. "Approve each switch yourself" visible early (hero panel / how it works / plans) and a real choice in the funnel (no silent default — ask, or default to "vraag mij eerst" for FR/60+? → present both equally, no preselection).
5. Cancellation question in FAQ (interim safe wording from claims register, no placeholder).
6. Funnel: "Hulp nodig?" in funnel header; stale error summary cleared on back; step label matches progress; language switch keeps answers; Premium + analogue meter → recommend Switch Plus with explanation.
7. Tech: `sitemap-index.xml` (hand-written endpoint is fine), `robots.txt` (allow all, sitemap URL, don't block sign-up), `404.astro` (NL/FR), `og:image` (1200×630 PNG per locale) + favicon files, Organization logo as PNG; optimise static icon PNGs (WebP/AVIF via astro:assets), 320px overflow fixed everywhere, CLS ≈ 0 on all routes, LCP < 2.5 s on all 12 routes.
8. Typos ("verandert er er"), four-party diagram empty space, no avatar silhouettes on reviews (use rating card + "Echte reviews volgen" hidden → just rating + source link), "Jij → June → Leverancier" diagram redesign.

## Ownership (parallel builders — only edit your files)
| Owner | Files (under `website/variants/final/`) |
|---|---|
| **Lead — shell, brand, home, tech** | `src/layouts/**`, `src/components/{Logo,Header,Footer,Crumbs,FinalCta,Reviews,Guarantee,MoneyFlow,SectionHead,Check,Sticky*,HeroTile*,Squiggle*,Character*}.astro`, `src/styles/global.css`, `src/styles/home.css`, `src/i18n/site.js`, `src/i18n/home.js`, route files `src/pages/**` (thin wrappers), `src/pages/404.astro`, sitemap/robots, `public/**` |
| **Pages — plans, Switch Plus, how it works, FAQ** | `src/components/pages/{Plans,SwitchPlus,HowItWorks,Faq}.astro`, `src/components/{ProductBand,PlanLedger,PlanHelper,FaqList,AnimIcon}.astro` (create/own), `src/styles/{plans,how}.css`, `src/i18n/pages.js` |
| **Funnel — sign-up** | `src/components/pages/Signup.astro`, `src/lib/**`, `src/styles/funnel.css`, `src/i18n/signup.js` |
Need something in another owner's file → message the coordinator, don't edit it. Build in parallel with `OUT=./dist-<role> npx astro build` and check with `node tools/check-site.mjs variants/final --dist=variants/final/dist-<role> …`.

## Definition of done
`node tools/check-site.mjs variants/final --narrow --site-files --lighthouse-all --shots` → **0 failures**, plus own visual review (desktop/mobile/320, NL/FR) and, for the funnel, the end-to-end script.

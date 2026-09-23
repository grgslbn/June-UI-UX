# Round 1 — Design evaluation (design critic)

Scope: the six **Design** criteria of `brief/scoring-rubric.md` only (weights 7/5/5/5/5/3 = 30). Scores go from 1 to 5 in half points, and 5 means genuinely best-in-class. I am not the author of any variant.

**Evidence used**
- All 12 routes at 1280 from `report/shots/`, for every variant.
- Home, plans and sign-up at 390, NL, for every variant. FR home at both widths.
- Live runs of each `dist/` in Playwright with motion **not** reduced. They covered:
  - hero animation frames at 150 ms, 1 s and 3.5 s
  - CTA hover, focus ring and scroll reveals
  - the mobile sticky CTA and menu
  - the FAQ open state and search
  - sign-up step 1 → estimate, at 1280 and 390
  - `prefers-color-scheme: dark`
  - a mobile overflow sweep
- Scratch captures are in `evaluations/scratch/design/` (`slices/`, `live/`, `probe.mjs`, `signup.mjs`).

**Caveat on the gate screenshots.** They were taken with reduced motion and do not trigger lazy loading. Because of that, B's home Premium section and E's plans Premium section *look* empty in `report/shots/`. Live, the phone and dongle image loads correctly. I did not penalise this. I do note that the image pops in without a placeholder.

## Summary

| Criterion (weight) | A · Calm Confidence | B · Savings First | C · Honest Market | E · Bold June |
|---|---|---|---|---|
| Visual hierarchy (7) | 4.0 | 4.0 | 4.0 | 4.0 |
| Typography (5) | 4.5 | 4.0 | 4.5 | 4.0 |
| Colour & imagery (5) | 3.5 | 3.0 | 3.5 | 4.0 |
| Brand distinctiveness (5) | 3.0 | 3.0 | 3.5 | 4.5 |
| Craft & motion (5) | 4.0 | 3.5 | 4.0 | 3.5 |
| Consistency (3) | 4.5 | 3.5 | 4.5 | 3.5 |
| **Design subtotal (/5)** | **3.88** | **3.53** | **3.97** | **3.95** |

- **Ranking:** C ≈ E ≈ A > B.
- **No variant reaches 4.0 on design yet.** Each misses for a different reason:
  - A is premium but anonymous.
  - C is the most intelligent, but visually the least June.
  - E is the most June, but the least polished.
  - B is a competent tool page that looks like a comparison site, which is exactly the risk the brief warned about.

---

## A · Calm Confidence — 3.88

**Top 3 strengths**
1. **The hero tile is the best single component in the round.** The chip ticks from "Bezig met vergelijken…" to "✓ Gecontroleerd deze maand". A 12-month check strip marks the current month. The numeral counts up once. This is the brief's signature motion done literally and meaningfully: it *shows* "keeps working for you".
2. **Product imagery is used best here.**
   - A real leaf-dongle and phone composite sits on a halftone field.
   - Three product cards follow: dongle, app, solar flow.
   - The "Echte June-app" label adds honesty.
   - The Premium section feels like an Apple-grade product band.
3. **Craft and system discipline.**
   - One radius set, white tiles on a mint canvas, and one CTA colour everywhere.
   - The hover lift (−1 px plus a deeper soft shadow) and the pill language switch match the app.
   - A full dark mode uses the app's dark tokens; the product shots sit on surface cards.
   - FR strings never break the layout.

**Issues (ranked) → fix**
1. **Brand distinctiveness is low.** With the logo removed, this could be Bunq, Qonto or any fintech. There is no red spark, the character is absent from the home page, and the only motif is an ambient blob.
   → Home, "Alleen de naam op je factuur": replace the flat placeholder living-room illustration with the photo frame from brand §3.5 (one blob plus one halftone corner) and a small **red accent blob ≤ 64 px**. Put the pointing character on the FAQ "Staat je vraag er niet bij?" card (already done), and on the home final CTA as its once-per-page moment.
2. **Proof is repeated three times above the second section.** The hero tile, the trust row under the postcode field and the 4-up stats band all say €326 / 4,3 / 20.000+. This dilutes the one-focus-per-section hierarchy.
   → Home: remove the stats band under the hero, or change it to *new* proof (the "17+ leveranciers" logos plus "elke maand"). Leave €326 in the tile only.
3. **Count-up flash.** The server-rendered €326 is visible at first paint. JavaScript then resets it and counts from a low value (116 at 1 s), so the number visibly drops and climbs back.
   → Hero tile: render the start value server-side, or start the count at `data-final × 0.6`. Only animate if the tile is not yet painted, or keep €326 static and animate only the chip and strip.
4. **Mobile final-CTA card has asymmetric padding.** The left inset is 32 px, the right is about 2 px. The postcode field and button touch the card's right edge (NL home at 390, "Laat je energiecontract voortaan aan June over.").
   → Give `.cta-card` symmetric `padding-inline` and `min-width: 0` on its form row. Check the same component on the plans and how-it-works pages.
5. **Placeholders read as unfinished.** The "Placeholder foto" illustration and the dashed "[placeholder] Hier komen drie echte Google-reviews" box are the weakest moments on the page.
   → Home reviews: use the C pattern (a large 4,3/5 plus 2–3 skeleton cards with an avatar silhouette and a single "placeholder" chip). The illustration should also be on-brand flat geometry (§3.5), not a stock-style room.
6. **The grey second line of the H1 ("Zonder er nog aan te denken.") weakens the headline** on mint. It is also mid-grey on a tinted canvas at display size.
   → Keep the H1 one colour (ink). Put the emphasis on *one* word with a 2 px accent squiggle, as allowed in §3.6.

**Verdict.** This is the most premium-feeling variant, and the closest to "the app scaled up". It fully honours the real assets: official logo, leaf dongle, real app screens and the animated icons. But it is too quiet to be *June*. It feels like a great fintech template wearing June's logo. Borrow the hero tile and the Premium band; add the brand spark.

---

## B · Savings First — 3.53

**Top 3 strengths**
1. **The hero is the tool.** A numbered 1-2-3 form sits beside an **ink result card**: a big ≈ range, an elec/gas breakdown with the energy colours used correctly, a net-of-fee line and the recommended plan. The card has the clearest single focal point of any hero in the round.
2. **"Wat jij overhoudt" mini-ledgers inside each plan card.** Net savings are made visual per plan, and on the Switch Plus card the ledger turns ink. This is a strong pricing-UI idea that others should borrow.
3. **"Geen trucs. Gewoon rekenen."** An equation row (verbruik × prijsverschil − abonnement = wat jij overhoudt) explains the model graphically in one glance.

**Issues (ranked) → fix**
1. **It looks like a comparison site.** It uses white canvas, grey form chrome and generic line icons, and the only brand element is the logo. This is exactly the risk named in brand §4-B.
   → Hero: set the form on a mint `--canvas` tile, add the animated `icon-calculator` beside step 1, and put a mint blob behind the result numeral (the only motif). Use the June Green fill (`#1CA498`) for the "met June" segment of the bar.
2. **Two CTA styles compete.** The dark card's "Start met June" is a light-teal fill with ink text. Everywhere else the CTA is dark teal with white text. The hero therefore has two primary buttons ("Bereken je besparing" and "Start met June").
   → Show "Start met June" only *after* the visitor has calculated (before that, the card shows the example state with no button). Use the standard `--accent-strong` button in the card.
3. **Visible "te bevestigen" / "placeholder" chips are scattered through the page:**
   - "Hoe we geld verdienen"
   - the Winstgarantie terms (×3)
   - the KBO number in the footer
   - "link naar Google-profiel volgt"
   - the FAQ

   They make the page look like a wireframe.
   → Move open items into footnotes, or use a single quiet `†` marker. Keep a chip only where the claim itself is conditional.
4. **The dark "Aan jouw kant" band shows three skeleton review cards on ink.** Grey bars on dark read as a loading state, not as trust.
   → Replace them with one large 4,3 plus a single honest line ("Echte reviews volgen, letterlijk overgenomen"), or move the placeholders to a light surface.
5. **The sign-up funnel carries a full dark footer with 6 footnotes.** That is heavy chrome for a funnel page (§2.3 asks for minimal chrome). "Welke meter heb je?" on how-it-works sits in a half-width column beside an empty right half.
   → On `/aanmelden`, use a one-line light footer with footnotes behind a disclosure. On how-it-works, put the meter cards in a two-column grid, or pair them with the leaf-dongle image.
6. **No dark mode, and no motion until interaction.** Per the brief, B only animates the result. Live, the result card does not animate on first view (it has no animations), so the page feels static.
   → Run the "number resolves" count-up (≤ 700 ms) once when the example card enters view, and support `prefers-color-scheme` using A's token set.

**Verdict.** This is functional and clear, but the least premium and the least distinctive variant. It would sit comfortably on Mijnenergie. The calculator card and the per-plan "wat jij overhoudt" ledger are best-in-class *components*. The page around them is not.

---

## C · Honest Market — 3.97

**Top 3 strengths**
1. **The most ownable idea, drawn well.** In the annotated chart, "Welkomstkorting stopt" leads into "De prijs van trouw", circled in red with the gap shaded, against a flat "Met June" line. Red is used exactly once, as the brand book prescribes. This is the only hero that *explains* the business in a picture.
2. **Editorial typography and rules.**
   - Montserrat display with a narrow Inter reading column.
   - Numbered section kickers ("01 WAT JUNE DOET") and hairline rules.
   - The "Wat is June? / Wat kost het? / Wat als het tegenvalt?" spec table.
   - Footnotes set as a real sources column.

   It feels like Stripe Press or the FT. FR is set natively and never breaks.
3. **Consistency and restraint.** Every page follows the same paper/mint alternation, the ink promise band and the "Kort samengevat" summary box with an inline postcode field. Dark mode is complete. The character appears once per page, in the right places ("Wat we niet beloven").

**Issues (ranked) → fix**
1. **The home page has no product imagery at all.** There is no dongle, no app and no June Green field, so the page is mostly ink on paper, and the brand feeling depends on the logo and one character.
   → Home, after "03 De belofte": add a compact "Wat je daarna ziet" band with the real NL/FR phone mockup and the leaf dongle, reusing the plans-page composite.
2. **The signature motion is missing above the fold.** Live, the hero chart is fully drawn at first paint and no animation runs. The brief's "chart draws itself, then the squiggle circles the gap" is the concept's one piece of motion.
   → Draw the two lines with `stroke-dashoffset` (700 ms, ease-out), then the red ellipse (240 ms). Final state stays static for reduced motion. The chart is not the LCP element, so it costs nothing.
3. **The "Jij → June → Leverancier" flow diagram on home and plans is under-designed.** It is three small boxes, left-aligned in a full-width row, with the right 60 % empty. It is the weakest graphic on the site.
   → Lay it out horizontally across the 12 columns with the money arrow labelled, or replace it with the four-party strip from how-it-works, which is excellent.
4. **The right column of the hero is crowded.** The spec table and the chart are stacked, both with rules and small type, so the eye splits between them.
   → Move the spec table under the H1/CTA as a 3-up strip, and give the chart the full right column at a larger size (labels ≥ 14 px).
5. **Copy and craft slips.**
   - "Na de overstap verandert er **er** maar één" (how-it-works H2).
   - Reviews use generic avatar silhouettes (these read as stock).
   - The "WORDT BEVESTIGD" amber pill competes with the red annotation colour.

   → Fix the typo. Remove the silhouettes (name, town and date only). Make the pill ink-outline to keep amber for elec.
6. **Weak mobile chart.** At 390 the chart labels drop to about 11–12 px and the red ellipse crowds the lines.
   → Use a mobile variant of the SVG with a taller aspect ratio, and put the direct labels below the plot.

**Verdict.** This is the most intelligent and trustworthy design, and it is premium in the editorial sense. It is also the most consistent across pages and languages. It is recognisably June only through the idea, the character and the logo, not through colour or imagery. With the chart animation and one product band it would pass 4.0.

---

## E · Bold June — 3.95

**Top 3 strengths**
1. **Unmistakably June.** It has:
   - a June Green field
   - giant Montserrat 800 "Je had energie. Nu heb je power." with a hand-drawn yellow squiggle that **draws on load**
   - the teal character on a red blob that **pops in** and a blob that slowly **breathes**
   - the official white logo

   No Belgian energy brand could wear this. It is the only variant that uses the real brand system at campaign volume.
2. **Brand vocabulary carried into the UI.**
   - Giant numerals 1-2-3 with offset shadow, paired with the animated icons.
   - The Switch Plus card as a green slab with a yellow "Aanbevolen" pill.
   - The Winstgarantie "Uitkomst A / B" cards (ink with a red offset shadow).
   - The pink "Goed om te weten" band with the character.
   - The CTA hover "charges" (it shifts −2 px with a red 4 px offset shadow). This is playful and meaningful.
3. **Good product integration despite the volume.** The how-it-works hero uses the real phone mockup on green. The home Premium band uses the phone and dongle on a teal disc. The plans page uses the laptop dashboard composite on mobile.

**Issues (ranked) → fix**
1. **"TBC ·" yellow highlighter marks in live body copy.** They appear on:
   - plans, "Hoe verdient June geld?"
   - how-it-works, "Waar werkt June?"
   - the FAQ contact line
   - every footer

   On the loudest variant these read as errors, not as editorial honesty.
   → Replace them with footnoted interim phrasing (as A and C do). Keep the highlight only in a `?review=1` build.
2. **The mobile comparison table scrolls horizontally, so the recommended Switch Plus column is off-screen** at 390 (plans, "Alles naast elkaar"; switch-plus, mini table).
   → Below 600 px, turn the table into three stacked plan columns with the Switch Plus first, or use A's compact three-column table (plan names in two lines, ticks only).
3. **The character has poor figure-ground.** A teal mascot on a teal field with a red blob behind it shows the flood-fill halo (see asset README), and the bottom of the body is cut by the hero edge.
   → Put the character on a **white or mint** circle (brand §3.8 says "on a light background"), keep the red as a ≤ 64 px spark, and let it sit fully inside the hero. Ask for the transparent original.
4. **Display weight everywhere flattens the hierarchy.** Every H2, including "Nog vragen?", "Vragen over prijzen" and "Leveranciers die we vergelijken", is 800 weight at 56–72 px, so utility sections shout as loudly as the hero.
   → Keep 800 plus the giant size for the hero and one "brand moment" per page. Set utility H2s (FAQ, suppliers, reviews) at 700 / 40 px.
5. **The neo-brutal offset shadows are applied inconsistently and clash in places.**
   - On the final CTA, the input's ink shadow and the ink button merge into one blob (worst on mobile).
   - The oversized, soft `icon-compare` binoculars (240 px source blown up) on plans look pixelated.
   - CTAs are white on green, ink on white and ink in the funnel.

   → Use one rule: white button on green, `--accent-strong` on white (as the brief says), and an offset shadow only on cards, never on inputs. Never render the 240 px icons above 120 px.
6. **The funnel's progress label is not updated.** The estimate screen still says "Stap 1 van 2 · Je woning". There is also no dark mode.
   → Update the stepper and heading on the estimate view. Dark mode is optional for E, but green fields need a dark-surface variant if it is added.

**Verdict.** This has the strongest brand distinctiveness by far, and it feels like June and its real assets. The premium feel is not there yet: TBC marks, the halo'd character, uniform shouting headings and ad-hoc shadows make it feel like a very good campaign microsite rather than a premium service. Polish could lift it to 4.3 or more. It is the variant most likely to be remembered.

---

## Cross-variant notes — best-in-class elements to borrow

| Element | Best in | Borrow into |
|---|---|---|
| Hero status tile with monthly check strip plus chip "Bezig met vergelijken… → Gecontroleerd" | **A** | E (as a white card on green), C (as the "Met June" line's annotation) |
| Premium band: leaf dongle plus phone composite on halftone, with 3 product cards | **A** | C home, B home |
| "Wat jij overhoudt" ledger inside each plan card; ink ledger on the recommended plan | **B** | A and C plans, and the pricing section on every home page |
| Ink result card with elec/gas breakdown and ≈ marker | **B** | The A and E funnel estimate step (currently a plain range) |
| Annotated "prijs van trouw" chart | **C** | A "Waarom blijven kijken", E how-it-works (on white) |
| Four-party strip (Jij / June / Leverancier / Netbeheerder, with "verandert het?" row and red "enige partij die wisselt") | **C** (how-it-works) | All variants, replacing the simple 4-card grids |
| "Wat we van je weten" live-summary side panel in sign-up, plus postcode → region/netbeheerder echo | **C** | All funnels |
| Footnotes as a real "Voetnoten en bronnen" column | **C** | All |
| Mobile plan order (Switch Plus first) and compact 3-column table | **A / C** | E |
| Squiggle that draws under one key word, and the CTA "charge" hover | **E** | A (one word in the H1), C (the chart circle) |
| Dark mode with app tokens | **A, C** | B, E |
| Character use | C (once, small, "Wat we niet beloven") is disciplined; E is expressive but needs a light backing | All |

**System-level recommendation.** The winning design is not any single variant. It is **C's structure and editorial type, plus A's product bands and hero tile, plus E's brand spark** (green field for the hero and the final CTA, a squiggle on one word, the character on a light disc). B contributes components (the result card and the ledger), not a look.

**Common gaps across all four**
- Placeholder reviews are unresolved everywhere.
- No lifestyle photography: expected, but A's flat room illustration and C's silhouettes are worse than simply omitting it.
- The animated brand icons are used only as small step glyphs. Nobody used `icon-relax` as the "then you relax" moment at hero scale, or `icon-celebrate` on the estimate result.

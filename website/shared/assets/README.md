# June asset library (from the product owner's images.zip)

Processed for web: cropped, backgrounds removed where they were baked in, capped at 900–1600px. Astro variants should
import these through `astro:assets` (`<Image>` / `<Picture>`) so they ship as AVIF/WebP at the right size. Originals: `reference/images-original/`.

## Brand colours measured from the files
| Source | Hex | Note |
|---|---|---|
| Logo green | `#1CA498` | slightly deeper than the 2018 book's `#3BADA8` |
| Logo pink / June Red | `#F15859` | |
| Mascot teal | `#58AFA0` | |
| Dongle leaf cable | ≈ `#22544E` | dark green |

## Logo — `logo/`
Vector trace of the official script logo. `june-logo.svg` uses `currentColor` (inline it and set `color`); fixed-colour
files: `-green`, `-ink`, `-pink`, `-white`. Min width 72px. Keep clear space ≈ height of the "j" dot. White on `#1CA498` only at large sizes (it's a logo, exempt from text contrast, but keep it ≥ 96px wide).

## June character (mascot) — `character/`
Teal 3D-style creature (not the red 2018 blob). Backgrounds removed by flood fill — edges may show a faint halo on dark
backgrounds; ask for transparent originals before launch.
- `june-character-pointing.png` — pointing up (tips, "did you know", empty states)
- `june-character-cheering.png` — cheering (success, confirmation, guarantee paid)
Use at most once per page, never next to prices or legal text.

## Dongle (new "leaf" design) — `dongle/`
- `dongle-leaf.png`, `dongle-leaf-closeup.png`, `dongle-leaf-alt.png` — product alone, transparent
- `dongle-with-phone.png`, `dongle-phone-front.png`, `dongle-phone-angle.png` — dongle + app on phone (NL UI)
- `dongle-phone-laptop.png` — dongle + phone + laptop dashboard
- `dongle-classic-photo.png` — older white dongle on dark cable (photo; don't mix with the leaf design)

## App mockups — `app/`
Current June app UI (not the redesigned Insights look).
- `app-phone-nl.png` / `app-phone-fr.png` — same consumption screen in NL and FR ✔ honest localisation
- `app-laptop-dashboard.png` — web dashboard with isometric house illustration (NL)
- `app-phone-in-hands.png` — photo-style mockup, phone held in hands
- `app-usage-screen-old.png`, `app-graph-screen-old.png` — older app screens (avoid)

## Feature cards — `feature/` (NL UI only)
`solar-flow` · `dynamic-tariffs` · `categories` · `notifications` · `peak-usage` · `savings-report` — UI cards ideal for
Premium feature grids. For FR pages, rebuild the card in HTML/CSS or use without text-heavy crops.

## Animated icons — `icons/`
Seven 4-second brand icons (blob + line icon + teal accent), converted from MP4 to looping transparent animated WebP
(240px, ~120–200 KB) + a `-static.png` frame for `prefers-reduced-motion` and as poster.
`icon-compare` (binoculars) · `icon-calculator` · `icon-home-analysis` (house + magnifier) · `icon-home-automatic` (house + gears)
· `icon-home-switch` (house + refresh) · `icon-celebrate` · `icon-relax` (beach).
Suggested mapping — How it works: 1 analysis → 2 compare → 3 switch → then relax. Calculator for the estimator, celebrate for sign-up done.
Load lazily below the fold; use `<picture>` with the static PNG for reduced motion.

## Photos — `photo/`
- `dongle-campaign-poster-nl.png` — existing ad ("Maak je digitale meter écht slim met de June DONGLE") — reference only
- `phone-in-hand-cafe.png`, `laptop-dashboard-photo.png` — only 172px thumbnails, **not usable** at web size

## Still missing (placeholders stay until supplied)
Lifestyle / home / family photography at web resolution · explainer video · FR versions of feature cards and laptop
dashboard · transparent/vector originals of the character · Lottie/After-Effects sources of the animated icons (for crisp SVG animation).

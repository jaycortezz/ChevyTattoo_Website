# Cortez's Tattoos

An award-winning, interactive one-page website for **Cortez's Tattoos** — a
studio specializing in Chicano-style fine line, black & grey tattoo artistry.

Built as a zero-dependency static site so it deploys straight to GitHub Pages
(or any static host) with no build step.

## Sections

- **Landing / Hero** — animated intro, parallax rose, scrolling marquee of styles.
- **About** — the artist's story, specialties, and animated stat counters.
- **Work** — filterable, asymmetric gallery with a keyboard-navigable lightbox.
  Artwork is rendered procedurally as SVG (swap in real photos when ready —
  see below).
- **Process** — the four-step journey from consultation to aftercare.
- **Booking** — validated request form with inline errors and a success state.

## Interactive features

- Custom blend-mode cursor (desktop) with hover/text states
- Preloader, scroll progress bar, sticky condensing nav
- Scroll-reveal animations & parallax via `IntersectionObserver` / `requestAnimationFrame`
- Filterable gallery + lightbox (arrow keys / Esc supported)
- Fully responsive with a mobile slide-in menu
- Respects `prefers-reduced-motion`

## Run locally

It's plain HTML/CSS/JS — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html        # markup + content
css/styles.css    # design system + all styling
js/main.js        # cursor, reveals, gallery, lightbox, form
assets/           # SVG art (rose, portrait, praying hands, favicon)
```

## Swapping in real tattoo photos

The gallery currently generates SVG placeholders in `js/main.js` (the `pieces`
array + `artSVG()`). To use real images, drop photos in `assets/` and replace
the `art` value for each piece with the image path. The hero rose, about
portrait, and booking artwork are referenced in `css/styles.css`.

## Deploy to GitHub Pages

Push to the repo, then enable **Settings → Pages → Deploy from branch** and
pick this branch with the root (`/`) folder.

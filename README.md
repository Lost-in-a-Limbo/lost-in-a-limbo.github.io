# Utkarsh Tuteja — Portfolio

Personal portfolio website. Built from scratch with **plain HTML + CSS + vanilla JavaScript (ES modules)** — no frameworks, no build step. Deploys as-is to GitHub Pages.

## Design
- True cold-black base (`#050506`) with a single ice-cyan accent (`#22d3ee`).
- Type: Space Grotesk (display) + Inter (body).
- Morphing WebGL shader-mesh background, interactive force-directed hero graph, and a bespoke animated SVG diagram for every project.
- Full accessibility: `prefers-reduced-motion`, focus-visible, semantic HTML, skip link.

See [`DECISIONS.md`](./DECISIONS.md) for the full design spec and every approved choice.

## Structure
```
index.html
css/
  variables.css   design tokens
  base.css        reset + typography + reveal system
  layout.css      nav, hero, sections, footer
  components.css  buttons, cards, diagrams, modal
  responsive.css  1024 / 768 / 480 breakpoints
js/
  data.js         ALL content lives here (edit this to update the site)
  render.js       builds the DOM from data.js
  diagrams.js     per-project animated SVG schematics
  background.js   WebGL shader-mesh background
  hero.js         force-directed skill graph
  scroll.js       reveals, diagram draw-in, nav state
  nav.js          mobile menu
  modal.js        project case-study modal
  main.js         entry point
assets/
  favicon.svg, og-image.svg, Utkarsh_Tuteja_resume.pdf
```

## Editing content
All text, projects, skills and links live in [`js/data.js`](./js/data.js). No markup edits needed.

## Local preview
Because the site uses ES modules, open it via a local server (not `file://`):
```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy to GitHub Pages
1. Push this repo to GitHub (e.g. a repo named `portfolio` or `<username>.github.io`).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. `.nojekyll` is already included so the `js/`/`css/` folders are served untouched.
4. **Custom domain (optional):** add a `CNAME` file at the repo root containing just your domain (e.g. `utkarshtuteja.com`), then set the same domain under Settings → Pages, and point a DNS `CNAME`/`A` record at GitHub Pages.
```

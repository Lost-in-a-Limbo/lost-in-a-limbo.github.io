# AGENT PROMPT — Build My Personal Portfolio Website

## Your Role

You are a senior frontend engineer + designer building a personal portfolio website for me from scratch. You will work in phases, and **you must not write a single line of production code until Phase 1 (Discovery) is complete and I have explicitly approved your design proposal.** Throughout this project, if you are less than 99% sure about ANY decision — content, styling, structure, tone, a project detail, anything — you STOP and ask me. Never assume. Never fill gaps with invented facts about me. Asking a "dumb" question is always correct; guessing is always wrong.

---

## Context: The Reference Site (Inspiration ONLY — Do NOT Copy)

I am showing you a reference portfolio (https://pranaykapoor.me/) purely as a **quality benchmark**. It demonstrates the *level of polish* I want: custom CSS design system, cinematic entrance animations, scroll-triggered reveals, an animated canvas background, and — most importantly — **every project is explained with its own custom animated diagram/schematic**, not just screenshots and text.

**CRITICAL CONSTRAINT: My site must NOT look like the reference. At all.** If someone saw both sites side by side, they should never guess one inspired the other. Match its *craft*, not its *appearance*.

To make this concrete, here is exactly what the reference does — and therefore what you are **FORBIDDEN** from doing:

| Reference site does | You must do instead |
|---|---|
| Warm near-black background (#0e0c0a, brownish) | **True cold black** (#050505–#0a0a0a range) |
| Burnt-orange / amber accent (#e8884a, #f5c278) | **NO orange, amber, or any warm accent.** Use the cold accent we agree on in Discovery (default proposal: ice-cyan #22d3ee; alternatives: violet #a78bfa or acid-lime #a3e635 — you MUST ask me to pick) |
| Fraunces (serif) + JetBrains Mono + DM Sans font trio | Different type system entirely. No Fraunces. Propose 2–3 pairings (e.g., a modern grotesque like Space Grotesk / General Sans / Clash Display for headings). Ask me to choose. |
| Canvas background: floating particle constellation with connecting lines + drifting warm radial-gradient orbs | Background MUST still have movement, but a **completely different technique**. Propose 2–3 options such as: WebGL/shader gradient mesh that slowly morphs, animated grid/wireframe that responds to scroll, flowing noise field lines, subtle starfield-depth parallax, or generative geometric patterns. NO particle-constellation-with-connecting-lines. Ask me to choose. |
| Hero: giant serif name on left + a fake "system monitor" terminal card floating on the right | Different hero concept entirely. The terminal card is a passive looping animation — I want something BETTER: an **interactive** hero element that responds to the cursor (e.g., a live force-directed graph, a 3D wireframe object that rotates toward the pointer, an interactive shader surface, or a typing-driven element). Propose 2–3 concepts, ask me to choose. |
| Rounded 12–14px cards, soft warm glows | Different card/surface language — could be sharp-edged, bordered, glass, elevated, brutalist-clean — propose and ask. |
| Section labels styled as code comments ("// 01 — About") | Different section-labeling motif. |

The ONE thing you must replicate in *function* (never in visual style):

### ★ Per-Project Diagram Feature (NON-NEGOTIABLE)
Every project on the reference site has its own **custom animated SVG diagram/schematic** that visually explains what the project does (e.g., an architecture flow, an algorithm's process, a data pipeline, a training curve). This is the single most important feature of my site too. Requirements:
- Each project gets a bespoke diagram explaining its core mechanism — architecture, data flow, algorithm, or system design.
- Diagrams are animated (draw-in on scroll, subtle continuous motion, or interactive hover states).
- Diagrams must be built in OUR visual language (cold black + chosen accent), not the reference's dashed-orange-line style.
- You will design each diagram AFTER studying my actual repos (see Phase 2) so the diagrams are technically accurate, not decorative fluff. If you don't understand what a project does well enough to diagram it, ASK ME.

---

## Hard Technical Requirements

- **Stack:** Plain HTML + CSS + vanilla JS (ES modules). No React, no frameworks, no build step, no bundler. Must deploy as-is to **GitHub Pages** with a custom domain (include `.nojekyll` and `CNAME` handling).
- **Structure:** Clean separation — `index.html`, `css/`, `js/` (modular files: e.g., background canvas, scroll observers, nav, modal, render, data), `assets/`.
- **Content as data:** All portfolio content (projects, skills, links) lives in a single `data.js` so I can update content without touching markup.
- **Performance:** 60fps animations (transform/opacity only, GPU-composited, `will-change` where appropriate), pause background animation when tab is hidden, reduce particle/element counts on mobile, debounced resize handlers.
- **Responsive:** Flawless at 1440px, 1024px, 768px, 480px. Decide deliberately what to hide/simplify on mobile.
- **Accessibility:** `prefers-reduced-motion` support (disable/simplify all animation), focus-visible styles, semantic HTML, sufficient contrast (test accent-on-black), alt text.
- **Quality of animation:** Custom cubic-bezier easing curves defined as CSS variables and used consistently; staggered entrance choreography; IntersectionObserver scroll reveals; smooth modal transitions. Cheap default `ease` everywhere = failure.
- **SEO/meta:** Full OG/Twitter meta, favicon (design me a simple SVG monogram — ask me for initials/preferences), meta description.

---

## Phase 1 — DISCOVERY (Do this FIRST. No code.)

Interview me. Ask these questions ONE GROUP AT A TIME (do not dump all at once), wait for my answers, and ask follow-ups until you are 99% sure:

**A. Identity & Content**
1. Full name, title/tagline (e.g., "CS Engineer & ML Researcher" — mine will differ), and a 1–2 sentence positioning statement.
2. Education / current role / notable achievements or scholarships worth highlighting.
3. What do I want visitors to DO? (Hire me? Collaborate? Read my work?) — this shapes CTAs.
4. Contact channels to display (email, GitHub, LinkedIn, X, etc.) and which is primary.
5. Do I have a resume PDF to link? Blog? Any other pages?
6. Tone of the writing: serious/academic, confident/punchy, playful, minimal?

**B. Design Decisions (present options visually described, ask me to pick)**
7. Accent color: ice-cyan vs. violet vs. acid-lime vs. my own suggestion. (Theme base is locked: true black.)
8. Typography pairing: present 2–3 concrete options with the vibe of each.
9. Background movement style: present your 2–3 proposed techniques with a one-line description of how each feels.
10. Hero interactive element: present your 2–3 concepts.
11. Overall personality on a spectrum: ultra-minimal/Swiss ←→ expressive/maximal. Where do I sit?

**C. Sections & Structure**
12. Confirm sections: Hero, About, Skills, Projects, Contact — anything to add (Experience? Publications? Blog?) or remove?
13. How many projects to feature, and should there be a "featured vs. all" split?

**Do not proceed to Phase 2 until I have answered everything and you have zero open questions. Summarize all my decisions back to me in a single spec document and get my explicit "approved."**

## Phase 2 — PROJECT DEEP-DIVE (Repo Access)

I will give you access to my GitHub repos. For EACH project I want featured:
1. Read the repo (README, code structure, main modules) and write back to me a 3–4 sentence summary of what you understand the project to be and what's technically impressive about it.
2. **Ask me to confirm or correct your understanding.** Do not write project copy from a wrong mental model.
3. Propose the diagram concept for that project (one sentence: "an animated flow showing X → Y → Z with the bottleneck highlighted"). Get my sign-off per diagram.
4. Ask me for anything a repo can't tell you: metrics, outcomes, live demo URLs, what I'm proudest of, war stories worth a line of copy.

## Phase 3 — DESIGN PROPOSAL (Still no full build)

Deliver a short written design spec: final palette (all hex values), type scale, spacing system, easing curves, background technique, hero concept, card/surface language, and one section mocked as real HTML/CSS (the Hero) so I can see the direction live. **Wait for my approval or change requests. Iterate until I approve.**

## Phase 4 — BUILD

Build the full site per approved spec. Deliver in reviewable chunks (Hero+nav+background → About+Skills → Projects+diagrams+modals → Contact+footer+polish). After each chunk, pause for my feedback before continuing.

## Phase 5 — QA & SHIP

- Cross-check every hard requirement above and report compliance item by item.
- Test at all four breakpoints and with reduced-motion enabled; report results.
- Verify NO visual resemblance to the reference: run through the forbidden-list table and confirm each row.
- Prepare the repo for GitHub Pages deployment (`.nojekyll`, `CNAME` instructions) and give me step-by-step deploy instructions.

---

## Standing Rules (apply to every phase)

1. **99% rule:** Uncertain about anything → ask. Multiple valid options → present them and ask. Never silently choose for me on anything user-visible.
2. **No invented facts.** Every claim about me, my projects, or my skills must come from my answers or my repos. Placeholder text is only acceptable if clearly marked `[NEEDS INPUT: …]` and flagged to me.
3. **No orange. No warm tones. True black base.** If a color decision ever feels ambiguous, ask.
4. **Differentiation check:** before proposing ANY visual element, ask yourself "does the reference site do something similar?" If yes, change your approach or explicitly flag it to me and ask.
5. **Craft bar:** every animation choreographed, every easing intentional, every breakpoint deliberate. The reference's level of polish is the floor, not the ceiling.
6. Keep a running `DECISIONS.md` recording every choice I approve, so nothing gets lost or re-litigated.

Begin now with Phase 1, Group A questions only.

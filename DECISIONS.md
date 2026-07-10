# DECISIONS.md — Utkarsh Tuteja Portfolio

A running record of every approved decision. Nothing here gets re-litigated without an explicit change.

## Identity
- **Name:** Utkarsh Tuteja
- **Tagline:** AI Systems Engineer · Full-Stack Developer · Building Production-Ready AI
- **Positioning:** CS (AI) undergrad who builds end-to-end AI systems — from ML/RAG pipelines to scalable backends and full-stack apps, with a focus on real-world impact.
- **Education:** B.Tech CSE (Artificial Intelligence), Manipal Institute of Technology — Expected June 2027. CGPA 8.41. A+ in NLP & AI coursework.
- **Cert:** Machine Learning Specialization — Stanford Online & DeepLearning.AI (Coursera), Mar 2026.
- **Experience:** AI Systems Intern @ Wellversed (Jun–Jul 2026, Gurugram). Independently led "Influencer OS", the company's largest internal technical build, concept → production.
- **Goal of site:** recruiter-facing — get hired for AI/ML/SWE roles + collaboration/internships.
- **Tone:** confident, professional, minimal. Engineering ability & impact over buzzwords.

## Contact
- **Primary:** Email — utkarsh.proac0101@gmail.com
- Phone: +91 9311261301
- GitHub: https://github.com/Lost-in-a-Limbo
- LinkedIn: https://www.linkedin.com/in/utkarsh-tuteja-530a7b294/
- LeetCode: https://leetcode.com/u/lost_in_a_limbo/ (150+ problems solved)
- Resume: `assets/Utkarsh_Tuteja_resume.pdf`

## Design system (LOCKED)
- **Base:** true cold black (`#050506` → `#0a0b0d`). No warm tones. No orange/amber ever.
- **Accent:** ice-cyan `#22d3ee` (+ tints). Single accent, used with restraint.
- **Type:** Space Grotesk (headings) + Inter (body). No serif.
- **Personality:** Balanced — minimal base, confident choreographed motion.
- **Cards/surfaces:** sharp-edged, hairline-bordered "blueprint" panels; faint accent glow on hover.
- **Background:** WebGL fragment-shader gradient mesh, slowly morphing flow (NOT particles-with-lines). Static gradient fallback if WebGL unavailable / reduced-motion.
- **Hero:** interactive force-directed graph of skills + projects; nodes repel from cursor. Canvas 2D.
- **Section labels:** bracketed index motif `[ 01 / about ]` (NOT code-comment `// 01`).
- **Easing:** custom cubic-beziers as CSS vars (`--ease-out-expo`, `--ease-in-out-quint`, `--ease-spring`).

## Sections
Hero · About · Skills · Experience · Projects (+ per-project animated diagrams & modals) · Contact/Footer.

## Projects — order by impressiveness (approved)
1. **NexaCred Enhanced** — RAG (IBM Granite + Sentence Transformers) + LightGBM credit-risk + Solidity smart contracts via FastAPI. **Live:** https://nexacred-metamask-enhanced.vercel.app/ · Repo: https://github.com/Lost-in-a-Limbo/-nexacred-metamask-enhanced
2. **Full-Stack Time-Series Anomaly Detection** — LSTM forecasting + GMM + KNN multi-model detection, Flask API + React. Repo: https://github.com/Lost-in-a-Limbo/Annomaly-Detection-in-UCI-dataset
3. **Brokemate** — full-stack AI expense manager, React + FastAPI + MongoDB + JWT + Recharts. Repo: https://github.com/Lost-in-a-Limbo/Brokemate

### Diagram concepts (approved, cold-black + ice-cyan, scroll draw-in)
- **NexaCred:** data → LightGBM risk model + RAG chatbot → score → hash committed to blockchain (immutable block highlighted).
- **Anomaly Detection:** time-series with LSTM forecast overlay; anomaly points branch into 3 detectors (Threshold / GMM / KNN) that vote.
- **Brokemate:** categorized expenses → analytics engine → charts + AI advisor loop (advisor node pulses).

## Tech stack (site)
Plain HTML + CSS + vanilla JS (ES modules). No frameworks/build step. GitHub Pages + `.nojekyll` + optional `CNAME`.

## Deployment
- Default: `lost-in-a-limbo.github.io` project page. Custom domain via `CNAME`: `[NEEDS INPUT: domain or "none"]`.

## Open items (NEEDS INPUT)
- Custom domain (or confirm github.io).
- Live URLs for Anomaly Detection & Brokemate when deployed.
- Optional metrics (accuracy/F1/AUC, latency) to strengthen project copy.

---

# v2 — Improvement Pass (portfolio-improvement-prompt.md)

Reference for craft/motion only: `pranaykapoor.me` (do NOT adopt its warm palette/serif/particles). Keep cyan-on-black identity, `FIG.N` / `P0X` motifs.

## Approved design decisions (v2)
- **Hero H1:** massive stacked "Utkarsh / Tuteja", tight tracking, one word (Tuteja) in cyan; fixed so it NEVER clips at any width.
- **Subtitle:** single-line monospace, uppercase, cyan, letter-spaced — `[ AI SYSTEMS ENGINEER ]`. Must never wrap on desktop.
- **Skill↔project highlight:** slim sticky skill rail / mini-graph beside the projects; as each project enters view its skills light up (cyan) while others dim. Tasteful, not gimmicky.
- **Dynamic diagrams:** every project diagram becomes animated — scroll draw-in choreography (edge stroke-dashoffset draw + node fade/scale stagger) + continuous life (flowing dashes, traveling data packets, key-node pulse) + optional hover reveal. `prefers-reduced-motion` → static fallback. Built as animated SVG + JS (IntersectionObserver), no heavy libs.
- **Proposal review:** standalone demo HTML in repo (`proposals/`) before touching the live site.

## Projects — v2 (order + verified facts from repos)
Order: **Influencer OS → NexaCred → MedScan AI → Anomaly Detection → Brokemate**

1. **Wellversed Influencer OS** (FLAGSHIP) — internal multi-brand influencer operations platform (discovery, onboarding, campaigns, contracts, analytics, sales attribution, finance workflows, reporting) with RBAC. **Node.js/Express** API + **web** (Vite) frontend + **MongoDB Atlas** (17 collections) + **AWS** (S3/EC2/ALB/CloudFront/WAF). Shipped to production; **100 live users** (Wellversed staff/agents); Utkarsh solo-managed deployment, infrastructure & operations. Status: **internal-only in production, no public URL yet** — leave a marked placeholder link slot for a future live URL. Repo: https://github.com/Lost-in-a-Limbo/Wellversed-Influencer-OS
2. **NexaCred** — fraud-resistant credit scoring. Confirmed real (all): **RAG chatbot (IBM Granite + Sentence Transformers)**, **LightGBM** + **scikit-learn LogisticRegression** risk models, **Flask + FastAPI**, **MongoDB**, **Solidity** on-chain score, **MetaMask** wallet integration. Live: https://nexacred-metamask-enhanced.vercel.app/ · Repo: https://github.com/Lost-in-a-Limbo/-nexacred-metamask-enhanced
3. **MedScan AI** (repo "Pneumonia-Detection") — multi-disease diagnostic platform: Chest X-ray Pneumonia + 4-class Brain MRI Tumor. Ensemble majority voting (5 pneumonia + 3 brain models, MobileNet fallback), Grad-CAM explainability, OOD guardrails (+ <85% confidence flagging). Flask inference API + React/Vite/Tailwind. Metrics: pneumonia MobileNetV2 90.06% acc / 0.91 F1 (624 scans); brain-tumor MobileNetV2 88.63% (1,600 scans). Repo: https://github.com/Lost-in-a-Limbo/Pneumonia-Detection
4. **Time-Series Anomaly Detection** — LSTM forecast + threshold/GMM/KNN detectors, Flask + React, TensorFlow/sklearn, UCI Electricity Load. (Facts verified accurate.) Repo: https://github.com/Lost-in-a-Limbo/Annomaly-Detection-in-UCI-dataset
5. **Brokemate** — full-stack AI expense manager. React + Vite + Recharts + Lucide; FastAPI + JWT + bcrypt + Pydantic + Uvicorn; **MongoDB**; AI analyze + chat powered by a **local / Hugging Face model**. Repo: https://github.com/Lost-in-a-Limbo/Brokemate

## v2 Open items (NEEDS INPUT)
- Influencer OS: live URL (placeholder for now); any standout engineering highlights to feature; live media/screenshots.
- MedScan AI / Anomaly / Brokemate: live URLs (if/when deployed).
- Résumé PDF still needs manual upload to `assets/` on GitHub.

---

## v2 Implementation — Built (2026-07-10)

### Hero (Chunk a) ✅
- Existing hero H1 rise animation already implemented via `reveal-line`/`[data-reveal-text]` CSS + `hero__title.is-visible` toggle on load.
- `Tuteja` in cyan gradient (already done in prior pass).
- Subtitle: `flex; white-space: nowrap` — guaranteed single-line at all desktop widths.
- Contact heading `<br>` removed — now reads naturally as one line.

### Dynamic Diagrams — all 5 projects (Chunk b + c) ✅
- **Template approach (from proposals/demo.html):** edges draw via `stroke-dashoffset`, nodes stagger in with `opacity`+`scale`, flowing dashes via `animation: flowDash`, data packet travels the main path via SMIL `<animateMotion>`, key node pulses via `animation: keypulse`.
- `initDiagrams()` in scroll.js now also calls `.beginElement()` on all `<animate>`/`<animateMotion>` to kick off SMIL when `.draw` is added.
- `prefers-reduced-motion`: skips the IO observer and adds `.draw` immediately (fully static).
- **Hover node detail:** each `dgm-nodeg` group has `data-detail`; on hover, updates the figcaption detail span. Resets to "hover a node ↑" on mouseleave.
- All 5 diagrams: Influencer OS, NexaCred, MedScan AI, Anomaly Detection, Brokemate.

### Skill Rail (Chunk d) ✅
- Slim 200px sticky rail rendered by `renderProjects()` inside `projects-rail-wrap` grid.
- Each project card has `data-skills` (JSON array of skill names).
- `initSkillRail()` uses IO (threshold 0.2/0.5) to detect which project is most in view → highlights its skills in cyan, dims the rest.
- Resets to neutral when #work section leaves viewport.
- On ≤1024px: rail collapses to horizontal scrollable row above the cards.

### Projects updated ✅
- 5 projects in order: Influencer OS (rank 1) → NexaCred (2) → MedScan AI (3) → Anomaly (4) → Brokemate (5).
- Each has `railSkills` array mapping to `allRailSkills` master list in data.js.

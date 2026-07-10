// ============================================================================
// render.js — renders content from data.js into the DOM.
// ============================================================================
import { profile, about, experience, skills, projects, contact, allRailSkills } from "./data.js";
import { getDiagram } from "./diagrams.js";

const $ = (sel) => document.querySelector(sel);

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function renderHero() {
  $("#hero-availability").textContent = profile.availability;
  $("#hero-positioning").textContent = profile.positioning;
  const sub = $("#hero-subtitle");
  if (sub) sub.textContent = profile.tagline;
}

function renderAbout() {
  const body = $("#about-body");
  const left = el("div", "about__main");
  const lead = el("p", "about__lead");
  lead.innerHTML = about.lead.replace("production systems", '<span class="em">production systems</span>');
  left.appendChild(lead);
  const text = el("div", "about__text");
  about.paragraphs.forEach((p) => text.appendChild(el("p", null, p)));
  left.appendChild(text);

  const facts = el("dl", "about__facts");
  about.facts.forEach((f) => {
    const row = el("div", "about__fact");
    row.appendChild(el("dt", null, f.label));
    row.appendChild(el("dd", null, f.value));
    facts.appendChild(row);
  });

  left.setAttribute("data-reveal", "");
  facts.setAttribute("data-reveal", "");
  facts.style.setProperty("--reveal-delay", "0.12s");
  body.append(left, facts);
}

function renderSkills() {
  const body = $("#skills-body");
  skills.groups.forEach((g, i) => {
    const group = el("div", "skill-group");
    group.setAttribute("data-reveal", "");
    group.style.setProperty("--reveal-delay", `${i * 0.06}s`);
    group.appendChild(el("h3", "skill-group__name", g.name));
    const list = el("div", "skill-group__list");
    g.items.forEach((s) => list.appendChild(el("span", "chip", s)));
    group.appendChild(list);
    body.appendChild(group);
  });
}

function renderExperience() {
  const body = $("#experience-body");
  experience.forEach((e, i) => {
    const item = el("article", "exp-item");
    item.setAttribute("data-reveal", "");
    item.style.setProperty("--reveal-delay", `${i * 0.08}s`);
    const meta = el("div", "exp-item__meta");
    meta.appendChild(el("div", "exp-item__period", e.period));
    meta.appendChild(el("div", "exp-item__loc", e.location));
    const main = el("div", "exp-item__main");
    main.appendChild(el("h3", "exp-item__role", `${e.role} <span class="exp-item__company">· ${e.company}</span>`));
    main.appendChild(el("p", "exp-item__summary", e.summary));
    const ul = el("ul", "exp-item__points");
    e.points.forEach((p) => ul.appendChild(el("li", null, p)));
    main.appendChild(ul);
    item.append(meta, main);
    body.appendChild(item);
  });
}

function projectLinks(p) {
  const parts = [];
  if (p.links.live) {
    parts.push(
      `<a class="project__link" href="${p.links.live}" target="_blank" rel="noopener"><span class="live-dot"></span>Live demo</a>`
    );
  }
  if (p.links.code) {
    parts.push(`<a class="project__link" href="${p.links.code}" target="_blank" rel="noopener">↗ Source</a>`);
  }
  return parts.join("");
}

function renderProjects() {
  const body = $("#projects-body");

  // --- Build skill rail ---
  const rail = el("aside", "skill-rail");
  rail.id = "skill-rail";
  rail.setAttribute("aria-label", "Project skills");
  const railHead = el("div", "skill-rail__head", "Toolkit");
  rail.appendChild(railHead);
  const chipWrap = el("div", "skill-rail__chips");
  chipWrap.id = "skill-rail-chips";
  allRailSkills.forEach((s) => {
    const chip = el("div", "skill-rail__chip");
    chip.dataset.skill = s;
    const led = el("span", "skill-rail__led");
    chip.appendChild(led);
    chip.appendChild(document.createTextNode(s));
    chipWrap.appendChild(chip);
  });
  rail.appendChild(chipWrap);

  // --- Wrapper for rail + cards ---
  const projectsWrap = el("div", "projects-rail-wrap");
  projectsWrap.appendChild(rail);

  const cardsCol = el("div", "projects-cards");
  cardsCol.id = "projects-cards";

  projects.forEach((p) => {
    const card = el("article", "project");
    card.setAttribute("data-reveal", "");
    card.dataset.project = p.id;
    card.dataset.skills = JSON.stringify(p.railSkills);

    const bodyCol = el("div", "project__body");
    bodyCol.innerHTML = `
      <span class="project__index">P${String(p.rank).padStart(2, "0")}</span>
      <span class="project__year">${p.year}</span>
      <h3 class="project__name">${p.name}</h3>
      <p class="project__tagline">${p.tagline}</p>
      <p class="project__blurb">${p.blurb}</p>
      <div class="project__stack">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      <div class="project__actions">
        <button class="btn btn--ghost" data-open-modal="${p.id}">Case study →</button>
        ${projectLinks(p)}
      </div>`;

    const figure = el("figure", "project__figure");
    const diagramHTML = getDiagram(p.diagram);
    figure.innerHTML = diagramHTML + `<figcaption class="project__figure-label"><span>fig.${p.rank} — ${p.id}</span><span class="project__figure-detail" id="detail-${p.id}">hover a node ↑</span></figcaption>`;

    // Wire hover reveal on diagram nodes
    figure.querySelectorAll(".dgm-nodeg").forEach((g) => {
      const detailEl = figure.querySelector(`#detail-${p.id}`);
      if (!detailEl) return;
      g.addEventListener("mouseenter", () => {
        if (g.dataset.detail) detailEl.textContent = g.dataset.detail;
      });
      g.addEventListener("mouseleave", () => {
        detailEl.textContent = "hover a node ↑";
      });
    });

    card.append(bodyCol, figure);
    cardsCol.appendChild(card);
  });

  projectsWrap.appendChild(cardsCol);
  body.appendChild(projectsWrap);
}

function renderContact() {
  $("#contact-lead").textContent =
    "The fastest way to reach me is email. I'm actively looking for AI / ML / SWE roles, internships and collaborations.";
  const body = $("#contact-body");
  contact.channels.forEach((c, i) => {
    const a = el("a", "contact__card" + (c.primary ? " is-primary" : ""));
    a.href = c.href;
    if (c.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    a.setAttribute("data-reveal", "");
    a.style.setProperty("--reveal-delay", `${i * 0.05}s`);
    a.innerHTML = `
      <span class="label">${c.label}</span>
      <span class="value">${c.value}</span>
      ${c.needsInput ? '<span class="needs-input">link pending</span>' : ""}
      <span class="arrow">↗</span>`;
    body.appendChild(a);
  });

  $("#footer-note").textContent = `© ${new Date().getFullYear()} ${profile.name}. Built from scratch — HTML · CSS · vanilla JS.`;
}

export function renderAll() {
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderContact();
}

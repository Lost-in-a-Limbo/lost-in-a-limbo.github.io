// ============================================================================
// modal.js — project case-study modal with focus management.
// ============================================================================
import { projects } from "./data.js";

export function initModal() {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  let lastFocused = null;

  function render(p) {
    const live = p.links.live
      ? `<a class="btn btn--solid" href="${p.links.live}" target="_blank" rel="noopener">Live demo ↗</a>`
      : "";
    const code = p.links.code
      ? `<a class="btn btn--ghost" href="${p.links.code}" target="_blank" rel="noopener">Source ↗</a>`
      : "";
    content.innerHTML = `
      <span class="modal__year">${p.year} · P${String(p.rank).padStart(2, "0")}</span>
      <h3 class="modal__title" id="modal-title">${p.name}</h3>
      <p class="modal__section p">${p.tagline}</p>

      <div class="modal__section">
        <h4>Problem</h4>
        <p>${p.problem}</p>
      </div>
      <div class="modal__section">
        <h4>Solution</h4>
        <p>${p.solution}</p>
      </div>
      <div class="modal__section">
        <h4>Engineering highlights</h4>
        <ul class="modal__list">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
      </div>
      <div class="modal__section">
        <h4>Evaluation</h4>
        <p>${p.evaluation}</p>
      </div>
      <div class="modal__section">
        <h4>Stack</h4>
        <div class="project__stack">${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
      </div>
      <div class="modal__actions">${live}${code}</div>`;
  }

  function open(id) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastFocused = document.activeElement;
    render(p);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal__close").focus();
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open-modal]");
    if (opener) { open(opener.dataset.openModal); return; }
    if (e.target.closest("[data-modal-close]")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    // simple focus trap
    if (e.key === "Tab" && modal.classList.contains("is-open")) {
      const focusables = modal.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

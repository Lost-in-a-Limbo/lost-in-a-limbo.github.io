// ============================================================================
// main.js — entry point. Renders content then wires up all behavior.
// ============================================================================
import { renderAll } from "./render.js";
import { initBackground } from "./background.js";
import { initHero } from "./hero.js";
import { initReveals, initDiagrams, initNav, initSkillRail } from "./scroll.js";
import { initMobileNav } from "./nav.js";
import { initModal } from "./modal.js";

function boot() {
  renderAll();
  initBackground();
  initHero();
  initReveals();
  initDiagrams();
  initNav();
  initMobileNav();
  initModal();
  initSkillRail();

  // Trigger hero title reveal on load
  requestAnimationFrame(() => {
    document.querySelector(".hero__title")?.classList.add("is-visible");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

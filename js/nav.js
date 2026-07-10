// ============================================================================
// nav.js — mobile menu toggle + close-on-navigate.
// ============================================================================
export function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelector(".nav__links");
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", () => {
    setOpen(!links.classList.contains("is-open"));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

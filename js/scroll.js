// ============================================================================
// scroll.js — IntersectionObserver reveals, diagram draw-in, nav state,
// scroll-progress bar, active-section link highlighting, and skill rail.
// ============================================================================

export function initReveals() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((n) => io.observe(n));

  // Hero title has its own class hook
  const title = document.querySelector(".hero__title");
  if (title) io.observe(title);
}

export function initDiagrams() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const figs = document.querySelectorAll(".project__figure");

  if (!("IntersectionObserver" in window) || reduce) {
    figs.forEach((f) => f.classList.add("draw"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("draw");
          // Kick off SMIL packet + flow animations
          try {
            e.target.querySelectorAll("animate, animateMotion").forEach((a) => a.beginElement());
          } catch (_) {}
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  figs.forEach((f) => io.observe(f));
}

export function initNav() {
  const nav = document.getElementById("nav");
  const progress = document.getElementById("nav-progress");
  const links = Array.from(document.querySelectorAll(".nav__links a"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 40);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (y / docH) * 100 : 0;
      if (progress) progress.style.width = pct + "%";

      // active link
      const mid = y + window.innerHeight * 0.35;
      let activeId = null;
      for (const s of sections) {
        if (s.offsetTop <= mid) activeId = s.id;
      }
      links.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + activeId)
      );

      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------------------------------------------------------------------------
// Skill rail: as each project scrolls into view, light its skills in the rail
// ---------------------------------------------------------------------------
export function initSkillRail() {
  const chipsEl = document.getElementById("skill-rail-chips");
  const cards = document.querySelectorAll(".project[data-skills]");
  if (!chipsEl || !cards.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function highlight(skillSet) {
    chipsEl.querySelectorAll(".skill-rail__chip").forEach((chip) => {
      const on = skillSet.has(chip.dataset.skill);
      chip.classList.toggle("skill-rail__chip--on", on);
      chip.classList.toggle("skill-rail__chip--dim", !on);
    });
  }

  // Default: all neutral
  function clearHighlight() {
    chipsEl.querySelectorAll(".skill-rail__chip").forEach((chip) => {
      chip.classList.remove("skill-rail__chip--on", "skill-rail__chip--dim");
    });
  }

  if (!("IntersectionObserver" in window)) {
    clearHighlight();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      // Find the entry most in view
      let best = null, bestRatio = 0;
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > bestRatio) {
          bestRatio = e.intersectionRatio;
          best = e.target;
        }
      });
      if (best) {
        try {
          const set = new Set(JSON.parse(best.dataset.skills || "[]"));
          highlight(set);
        } catch (_) {}
      }
    },
    { threshold: [0.2, 0.5], rootMargin: "0px 0px -20% 0px" }
  );

  cards.forEach((c) => io.observe(c));

  // Reset when scrolled away from all projects
  const workSection = document.getElementById("work");
  if (workSection) {
    const sectionIO = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) clearHighlight();
      },
      { threshold: 0 }
    );
    sectionIO.observe(workSection);
  }
}

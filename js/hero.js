// ============================================================================
// hero.js — interactive force-directed graph of skills/projects.
// Nodes drift with a gentle spring layout and repel from the cursor.
// - Fewer nodes on mobile.
// - Static (no animation loop) under prefers-reduced-motion.
// - Pauses when the hero scrolls out of view or the tab is hidden.
// ============================================================================
import { skills } from "./data.js";

export function initHero() {
  const canvas = document.getElementById("hero-graph");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile = () => window.innerWidth <= 768;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  // Build node set (drop non-core nodes on mobile for performance/clarity)
  function buildNodes() {
    const src = isMobile() ? skills.hero.filter((n, i) => n.core || i % 2 === 0) : skills.hero;
    return src.map((n, i) => ({
      id: n.id,
      core: !!n.core,
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0, vy: 0,
      r: n.core ? 6 : 3.5,
    }));
  }

  let nodes = [];
  // edges connect each node to the next 2 (ring-ish) + cross-links from core
  function buildEdges() {
    const e = [];
    const n = nodes.length;
    for (let i = 0; i < n; i++) {
      e.push([i, (i + 1) % n]);
      if (nodes[i].core) e.push([i, (i + 3) % n]);
    }
    return e;
  }
  let edges = [];

  const pointer = { x: -9999, y: -9999, active: false };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!nodes.length) { nodes = buildNodes(); edges = buildEdges(); center(); }
  }
  function center() {
    nodes.forEach((nd, i) => {
      const a = (i / nodes.length) * Math.PI * 2;
      const rad = Math.min(W, H) * (nd.core ? 0.16 : 0.30);
      nd.x = W / 2 + Math.cos(a) * rad + (Math.random() - 0.5) * 40;
      nd.y = H / 2 + Math.sin(a) * rad + (Math.random() - 0.5) * 40;
    });
  }

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  }, { passive: true });
  canvas.addEventListener("pointerleave", () => { pointer.active = false; pointer.x = pointer.y = -9999; });

  function step() {
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      // gentle pull to center
      a.vx += (cx - a.x) * 0.0008;
      a.vy += (cy - a.y) * 0.0008;
      // repel between nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx * dx + dy * dy || 0.001;
        if (d2 < 14000) {
          const f = 60 / d2;
          const d = Math.sqrt(d2);
          const ux = dx / d, uy = dy / d;
          a.vx += ux * f; a.vy += uy * f;
          b.vx -= ux * f; b.vy -= uy * f;
        }
      }
      // cursor repulsion
      if (pointer.active) {
        let dx = a.x - pointer.x, dy = a.y - pointer.y;
        let d2 = dx * dx + dy * dy || 0.001;
        if (d2 < 26000) {
          const d = Math.sqrt(d2);
          const f = 900 / d2;
          a.vx += (dx / d) * f; a.vy += (dy / d) * f;
        }
      }
      a.vx *= 0.9; a.vy *= 0.9;
      a.x += a.vx; a.y += a.vy;
      // soft bounds
      const m = 30;
      if (a.x < m) a.vx += 0.5; if (a.x > W - m) a.vx -= 0.5;
      if (a.y < m) a.vy += 0.5; if (a.y > H - m) a.vy -= 0.5;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // edges
    ctx.lineWidth = 1;
    for (const [i, j] of edges) {
      const a = nodes[i], b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const alpha = Math.max(0, 0.22 - dist / 2600);
      ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    // nodes
    for (const nd of nodes) {
      const near = pointer.active && Math.hypot(nd.x - pointer.x, nd.y - pointer.y) < 120;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
      ctx.fillStyle = nd.core ? "#22d3ee" : (near ? "#67e8f9" : "#0e7490");
      ctx.shadowColor = "rgba(34,211,238,0.6)";
      ctx.shadowBlur = nd.core || near ? 14 : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
      if (nd.core || near) {
        ctx.font = "500 11px 'Space Grotesk', sans-serif";
        ctx.fillStyle = near ? "#e7ecef" : "rgba(170,180,187,0.8)";
        ctx.fillText(nd.id, nd.x + nd.r + 5, nd.y + 3);
      }
    }
  }

  let raf, running = true, visible = true;
  function loop() {
    if (!running || !visible) return;
    step(); draw();
    raf = requestAnimationFrame(loop);
  }

  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => { nodes = []; resize(); if (reduce) draw(); }, 160);
  });

  resize();
  if (reduce) { draw(); return; }

  // Pause when hero is off-screen
  const hero = document.getElementById("hero");
  if ("IntersectionObserver" in window && hero) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    }, { threshold: 0 }).observe(hero);
  }
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
  });

  raf = requestAnimationFrame(loop);
}

// ============================================================================
// diagrams.js — bespoke animated SVG schematics per project.
// Built in the site's visual language (cold black + ice-cyan).
// Animation triggered by adding `.draw` to the parent figure.
// Hover any node → figcaption detail line updates.
// prefers-reduced-motion → static fallback (edges drawn, no motion).
// ============================================================================

// Helper: node group with hover data-detail
function nodeGroup(x, y, w, h, label, sub = "", accent = false, detail = "", pulse = false) {
  const cls = accent
    ? "dgm-node dgm-node--accent" + (pulse ? " dgm-keypulse" : "")
    : "dgm-node" + (pulse ? " dgm-keypulse" : "");
  const subLine = sub
    ? `<text x="${x + w / 2}" y="${y + h / 2 + 13}" text-anchor="middle" class="dgm-sub">${sub}</text>`
    : "";
  const dy = sub ? -3 : 4;
  return `<g class="dgm-nodeg" data-detail="${detail}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" class="${cls}"/>
    <text x="${x + w / 2}" y="${y + h / 2 + dy}" text-anchor="middle" class="dgm-lbl dgm-lbl--bold">${label}</text>
    ${subLine}
  </g>`;
}

// Edge that draws in + also shows flowing dashes once drawn
// The flowing overlay is a second path with dgm-flow class on the same d
function edgeFull(d, len = 200) {
  return `<path d="${d}" class="dgm-edge" style="--len:${len}"/>
<path d="${d}" class="dgm-flow"/>`;
}

// Packet that travels a named path defined in <defs>
function packet(href, dur = "3.4s") {
  return `<circle r="3.6" class="dgm-packet" style="opacity:0">
  <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="${dur}" repeatCount="indefinite"/>
  <animateMotion begin="indefinite" dur="${dur}" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="${href}"/></animateMotion>
</circle>`;
}

// ---------------------------------------------------------------------------
// 1. Wellversed Influencer OS
// ---------------------------------------------------------------------------
function influencer() {
  // Main path: React → Express (top) → AWS → 100 users
  const mainPath = "M86 160 C118 160 120 90 152 90 L300 90 C328 90 330 160 342 160 L384 160 L440 160";
  return `<svg viewBox="0 0 480 305" role="img" aria-label="Influencer OS: React frontend → Node.js/Express API → MongoDB Atlas → AWS → 100 live users.">
  <defs><path id="if-pkt" d="${mainPath}"/></defs>

  ${edgeFull("M86 160 C118 160 120 90 152 90", 130)}
  ${edgeFull("M86 160 C118 160 120 230 152 230", 130)}
  ${edgeFull("M300 90  C328 90  330 160 342 160", 130)}
  ${edgeFull("M300 230 C328 230 330 160 342 160", 130)}
  ${edgeFull("M384 160 L440 160", 60)}

  ${packet("#if-pkt", "3.2s")}

  ${nodeGroup(16,  135, 70,  50, "React",           "Vite / frontend",  false, "React + Vite frontend with full RBAC UI across all modules.")}
  ${nodeGroup(152,  64, 148, 52, "Node.js / Express","REST API · RBAC",  true,  "Node.js + Express REST API with role-based access control.")}
  ${nodeGroup(152, 193, 148, 52, "MongoDB Atlas",   "17 collections",   true,  "MongoDB Atlas — 17-collection schema for every ops domain.")}
  ${nodeGroup(342, 135, 80,  50, "AWS",             "EC2 · S3 · WAF",   false, "AWS: EC2 compute, ALB load balancing, S3 assets, CloudFront CDN, WAF.")}
  ${nodeGroup(422, 135, 50,  50, "100",             "live users",       true,  "100 live users (Wellversed staff & agents) in production.", true)}

  <text x="240" y="295" text-anchor="middle" class="dgm-caption">React → Express · MongoDB Atlas → AWS — 100 live users</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 2. NexaCred — Data → Risk Models + RAG → Credit Score → On-chain proof
// ---------------------------------------------------------------------------
function nexacred() {
  // Packet travels the main "top" path: Data → Risk Models → Credit Score → On-chain
  const mainPath = "M104 165 C148 165 150 96 182 96 L312 96 C348 96 350 165 366 165 L413 165 L413 248";
  return `<svg viewBox="0 0 480 318" role="img" aria-label="NexaCred: financial data flows into risk models and a RAG assistant, produces a credit score, committed on-chain.">
  <defs><path id="nc-pkt" d="${mainPath}"/></defs>

  ${edgeFull("M104 165 C148 165 150 96  182 96",  150)}
  ${edgeFull("M104 165 C148 165 150 236 182 236", 150)}
  ${edgeFull("M312 96  C348 96  350 165 366 165", 140)}
  ${edgeFull("M312 236 C348 236 350 165 366 165", 140)}
  ${edgeFull("M413 190 L413 248", 60)}

  ${packet("#nc-pkt", "3.4s")}

  ${nodeGroup(18,  140,  86, 50, "Data",         "MongoDB · SQL",    false, "Source data: users, financial history & scores in MongoDB.")}
  ${nodeGroup(182,  70, 130, 52, "Risk Models",  "LightGBM · LogReg",true,  "LightGBM + scikit-learn LogisticRegression on 20 features.")}
  ${nodeGroup(182, 210, 130, 52, "RAG Assistant","Granite · STS",    true,  "IBM Granite + Sentence-Transformers for explainable credit Q&A.")}
  ${nodeGroup(366, 140,  94, 50, "Credit Score", "Flask · FastAPI",  false, "REST credit score served by Flask + FastAPI.")}
  ${nodeGroup(352, 248, 122, 58, "On-chain proof","Solidity · MetaMask",true,"Immutable proof written on-chain via Solidity, signed with MetaMask.", true)}

  <text x="240" y="310" text-anchor="middle" class="dgm-caption">data → risk models + RAG → score → on-chain proof</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 3. MedScan AI — Image → Ensemble → Grad-CAM → OOD → Output
// ---------------------------------------------------------------------------
function medscan() {
  // Packet follows: Image → Pneumonia row → OOD → Output
  const mainPath = "M66 150 L140 150 L182 92 L308 92 L342 150 L394 150 L442 150";
  return `<svg viewBox="0 0 480 295" role="img" aria-label="MedScan AI: medical image feeds ensemble models, Grad-CAM overlays added, OOD checked, diagnosis output.">
  <defs><path id="ms-pkt" d="${mainPath}"/></defs>

  ${edgeFull("M66 150 L140 150", 76)}
  ${edgeFull("M140 150 L182 92",  88)}
  ${edgeFull("M140 150 L182 150", 44)}
  ${edgeFull("M140 150 L182 210", 88)}
  ${edgeFull("M308 92  L342 150", 88)}
  ${edgeFull("M308 150 L342 150", 44)}
  ${edgeFull("M308 210 L342 150", 88)}
  ${edgeFull("M342 150 L394 150", 56)}
  ${edgeFull("M394 150 L442 150", 50)}

  ${packet("#ms-pkt", "3.6s")}

  ${nodeGroup(10,  126, 58, 50, "Image",      "X-ray / MRI",     false, "Chest X-ray (pneumonia) or Brain MRI (4-class tumor).")}
  ${nodeGroup(156,  66, 152, 46, "Pneumonia", "5 models · vote", true,  "5-model ensemble majority vote — MobileNetV2 90.06% acc / 0.91 F1.")}
  ${nodeGroup(156, 126, 152, 46, "Grad-CAM", "heat-map overlay", false, "Grad-CAM visual explanations overlaid on every prediction.")}
  ${nodeGroup(156, 187, 152, 46, "Brain Tumor","3 models · vote",true,  "3-model ensemble — 4-class MRI classification, 88.63% accuracy.")}
  ${nodeGroup(342, 126,  54, 50, "OOD",       "< 85% flag",      false, "Confidence < 85% triggers an out-of-distribution low-confidence flag.")}
  ${nodeGroup(394, 126,  52, 50, "Output",    "Flask API",       true,  "Diagnosis + Grad-CAM + confidence score via Flask REST API.", true)}

  <text x="240" y="285" text-anchor="middle" class="dgm-caption">ensemble voting · Grad-CAM · OOD guardrails · Flask API</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 4. Anomaly Detection — signal + LSTM forecast → 3 detectors vote
// ---------------------------------------------------------------------------
function anomaly() {
  // Packet: from anomaly spike point → down to detectors
  const mainPath = "M160 110 L160 202 L65 202";
  return `<svg viewBox="0 0 480 290" role="img" aria-label="Anomaly detection: LSTM forecasts a time series, anomalies branch to threshold, GMM and KNN detectors that vote.">
  <defs><path id="ad-pkt" d="${mainPath}"/></defs>

  <!-- chart axes -->
  <line x1="20" y1="150" x2="300" y2="150" stroke="var(--hairline-strong)" stroke-width="1"/>
  <line x1="20" y1="42"  x2="20"  y2="150" stroke="var(--hairline-strong)" stroke-width="1"/>

  <!-- real signal (draws in) -->
  <path d="M20 118 L45 98 L70 128 L95 86 L120 138 L145 66 L170 146 L195 90 L220 110 L245 118 L265 92 L290 126"
    class="dgm-edge" style="--len:430;stroke:var(--text-soft)"/>

  <!-- LSTM forecast overlay (flowing dashes) -->
  <path d="M220 110 L245 118 L265 92 L290 126" class="dgm-flow"/>

  <!-- anomaly markers -->
  <circle cx="145" cy="66"  r="4" class="dgm-pulse-dot"/>
  <circle cx="170" cy="146" r="4" class="dgm-pulse-dot"/>
  <text x="250" y="54" class="dgm-lbl dgm-lbl--sm">LSTM forecast</text>

  <!-- branching edges to detectors — all with flow -->
  ${edgeFull("M160 138 V202 H65",  148)}
  ${edgeFull("M160 138 V202 H200",  76)}
  ${edgeFull("M160 138 V202 H338", 196)}

  ${packet("#ad-pkt", "2.8s")}

  ${nodeGroup(25,  208, 82, 36, "Threshold", "statistical", false, "Threshold detector: flags forecast errors beyond a statistical threshold.")}
  ${nodeGroup(160, 208, 82, 36, "GMM",       "density",     true,  "Gaussian Mixture Model: flags low-probability density regions.")}
  ${nodeGroup(298, 208, 82, 36, "KNN",       "distance",    false, "K-Nearest Neighbours: flags points far from their neighbours.")}

  <text x="240" y="282" text-anchor="middle" class="dgm-caption">forecast error → 3 detectors vote → anomaly</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 5. Brokemate — expenses → analytics → charts + AI advisor loop
// ---------------------------------------------------------------------------
function brokemate() {
  // Clean layout: Expenses → Analytics (center) → Charts (top-right) + AI Advisor (bottom-right)
  // AI Advisor loops back to Expenses via a bottom arc
  // Packet: Expenses → Analytics → AI Advisor (feedback highlight)
  const mainPath = "M102 148 L196 148 L280 200";
  return `<svg viewBox="0 0 480 275" role="img" aria-label="Brokemate: expenses feed an analytics engine, producing charts and an AI advisor that loops guidance back to the user.">
  <defs><path id="bm-pkt" d="${mainPath}"/></defs>

  <!-- Expenses → Analytics -->
  ${edgeFull("M102 148 L196 148", 100)}

  <!-- Analytics → Charts -->
  ${edgeFull("M280 125 L340 90",  88)}

  <!-- Analytics → AI Advisor -->
  ${edgeFull("M280 170 L340 200", 88)}

  <!-- AI Advisor → feedback loop back to Expenses -->
  ${edgeFull("M380 215 C430 215 430 248 240 248 C130 248 80 248 60 195", 340)}

  <!-- Charts → (no further node, arrow indicator) -->
  ${edgeFull("M340 90 L400 90", 62)}

  ${packet("#bm-pkt", "3.6s")}

  ${nodeGroup(20,  122, 82, 52, "Expenses",   "CRUD · JWT",      false, "JWT-secured CRUD expense tracking with category + good/bad flagging.")}
  ${nodeGroup(196, 100, 84, 48, "Analytics",  "FastAPI engine",  true,  "FastAPI analytics engine aggregates spend by category and date.")}
  ${nodeGroup(280,  66, 84, 46, "Charts",     "Recharts",        false, "Recharts visualizations: spending trends, category breakdown.")}
  ${nodeGroup(280, 178, 100, 46,"AI Advisor", "HF model",        true,  "Local / Hugging Face model for personalized budgeting & investment tips.", true)}
  ${nodeGroup(400,  66,  62, 46,"Dashboard",  "React · Vite",    false, "React + Vite frontend with protected routes.")}

  <text x="240" y="268" text-anchor="middle" class="dgm-caption">JWT auth · categorized spend → AI insight → guidance loop</text>
</svg>`;
}

const registry = { influencer, nexacred, medscan, anomaly, brokemate };

export function getDiagram(id) {
  const fn = registry[id];
  return fn ? fn() : "";
}

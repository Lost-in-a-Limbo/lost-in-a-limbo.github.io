// ============================================================================
// diagrams.js — bespoke animated SVG schematics per project.
// Built in the site's visual language (cold black + ice-cyan).
// Animation triggered by adding `.draw` to the parent figure.
// Hover any node → figcaption detail line updates.
// prefers-reduced-motion → static fallback (edges drawn, no motion).
// ============================================================================

// Helper: node group with hover data-detail
function nodeGroup(x, y, w, h, label, sub = "", accent = false, detail = "", pulse = false) {
  const cls = accent ? "dgm-node dgm-node--accent" + (pulse ? " dgm-keypulse" : "") : "dgm-node" + (pulse ? " dgm-keypulse" : "");
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

function edge(d, len = 200) {
  return `<path d="${d}" class="dgm-edge" style="--len:${len}"/>`;
}

function flow(d) {
  return `<path d="${d}" class="dgm-flow"/>`;
}

// ---------------------------------------------------------------------------
// 1. Wellversed Influencer OS
// ---------------------------------------------------------------------------
function influencer() {
  const mainPath = "M85 160 C120 160 122 90 152 90 L300 90 C326 90 328 160 340 160 L380 160";
  return `<svg viewBox="0 0 480 310" role="img" aria-label="Influencer OS architecture: React frontend talks to Node.js/Express REST API, backed by MongoDB Atlas, with AWS infra and RBAC.">
    <defs>
      <path id="if-flow" d="${mainPath}"/>
    </defs>

    ${edge("M85 160 C120 160 122 90 152 90", 130)}
    ${edge("M85 160 C120 160 122 230 152 230", 130)}
    ${edge("M300 90 C326 90 328 160 340 160", 130)}
    ${edge("M300 230 C326 230 328 160 340 160", 130)}
    ${edge("M380 160 L440 160", 70)}

    <use href="#if-flow" class="dgm-flow"/>

    <circle r="3.4" class="dgm-packet" style="opacity:0">
      <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="3.2s" repeatCount="indefinite"/>
      <animateMotion begin="indefinite" dur="3.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#if-flow"/></animateMotion>
    </circle>

    ${nodeGroup(16, 135, 70, 50, "React", "Vite / frontend", false, "React + Vite frontend with full RBAC UI across all modules.")}
    ${nodeGroup(152, 64, 148, 52, "Node.js / Express", "REST API · RBAC", true, "Node.js + Express REST API with role-based access control.")}
    ${nodeGroup(152, 194, 148, 52, "MongoDB Atlas", "17 collections", true, "MongoDB Atlas — 17-collection schema for every ops domain.")}
    ${nodeGroup(340, 135, 80, 50, "AWS", "EC2 · ALB · S3", false, "AWS: EC2 compute, ALB load balancing, S3 assets, CloudFront CDN, WAF.")}
    ${nodeGroup(420, 135, 50, 50, "100", "live users", true, "100 live users (Wellversed staff & agents) in production.", true)}

    <text x="240" y="298" text-anchor="middle" class="dgm-caption">React → Express API · MongoDB Atlas → AWS — 100 live users</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// 2. NexaCred — Data → Risk Models + RAG → Credit Score → On-chain proof
// ---------------------------------------------------------------------------
function nexacred() {
  const mainPath = "M104 165 C150 165 152 96 182 96 L312 96 C348 96 350 165 366 165 L413 165 L413 246";
  return `<svg viewBox="0 0 480 320" role="img" aria-label="NexaCred architecture: financial data flows into risk models and a RAG assistant, produces a credit score, and commits an immutable proof on-chain.">
    <defs>
      <path id="nc-flow" d="${mainPath}"/>
    </defs>

    ${edge("M104 165 C150 165 152 96 182 96", 150)}
    ${edge("M104 165 C150 165 152 236 182 236", 150)}
    ${edge("M312 96 C348 96 350 165 366 165", 140)}
    ${edge("M312 236 C348 236 350 165 366 165", 140)}
    ${edge("M413 190 L413 246", 90)}

    <use href="#nc-flow" class="dgm-flow"/>

    <circle r="3.4" class="dgm-packet" style="opacity:0">
      <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="3.4s" repeatCount="indefinite"/>
      <animateMotion begin="indefinite" dur="3.4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#nc-flow"/></animateMotion>
    </circle>

    ${nodeGroup(18, 140, 86, 50, "Data", "MongoDB · SQL", false, "Source data: users, financial history & scores in MongoDB.")}
    ${nodeGroup(182, 70, 130, 52, "Risk Models", "LightGBM · LogReg", true, "LightGBM + scikit-learn LogisticRegression on 20 features.")}
    ${nodeGroup(182, 210, 130, 52, "RAG Assistant", "Granite · STS", true, "IBM Granite + Sentence-Transformers for explainable credit Q&A.")}
    ${nodeGroup(366, 140, 94, 50, "Credit Score", "Flask · FastAPI", false, "REST credit score served by Flask + FastAPI.")}
    ${nodeGroup(351, 246, 124, 60, "On-chain proof", "Solidity · MetaMask", true, "Immutable proof written on-chain via Solidity, signed with MetaMask.", true)}

    <text x="240" y="312" text-anchor="middle" class="dgm-caption">data → risk models + RAG → score → on-chain proof</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// 3. MedScan AI — X-ray/MRI → Ensemble → Grad-CAM → OOD Guard → Output
// ---------------------------------------------------------------------------
function medscan() {
  const mainPath = "M65 155 L140 155 L180 95 L305 95 L340 155 L390 155";
  return `<svg viewBox="0 0 480 300" role="img" aria-label="MedScan AI: medical image input feeds an ensemble of models, Grad-CAM overlays are generated, OOD confidence is checked, and a diagnosis is output.">
    <defs>
      <path id="ms-flow" d="${mainPath}"/>
    </defs>

    ${edge("M65 155 L140 155", 80)}
    ${edge("M140 155 L180 95", 90)}
    ${edge("M140 155 L180 155", 60)}
    ${edge("M140 155 L180 215", 90)}
    ${edge("M305 95 L340 155", 90)}
    ${edge("M305 155 L340 155", 60)}
    ${edge("M305 215 L340 155", 90)}
    ${edge("M340 155 L390 155", 60)}
    ${edge("M390 155 L440 155", 60)}

    <use href="#ms-flow" class="dgm-flow"/>

    <circle r="3.4" class="dgm-packet" style="opacity:0">
      <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="3.6s" repeatCount="indefinite"/>
      <animateMotion begin="indefinite" dur="3.6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#ms-flow"/></animateMotion>
    </circle>

    ${nodeGroup(10, 130, 56, 50, "Image", "X-ray / MRI", false, "Chest X-ray (pneumonia) or Brain MRI (4-class tumor).")}
    ${nodeGroup(155, 68, 150, 46, "Pneumonia", "5 models · vote", true, "5-model ensemble majority vote — MobileNetV2 90.06% acc / 0.91 F1.")}
    ${nodeGroup(155, 131, 150, 46, "Grad-CAM", "heat-map overlay", false, "Grad-CAM visual explanations overlaid on every prediction.")}
    ${nodeGroup(155, 194, 150, 46, "Brain Tumor", "3 models · vote", true, "3-model ensemble — 4-class MRI classification, 88.63% accuracy.")}
    ${nodeGroup(340, 130, 54, 50, "OOD", "< 85% flag", false, "Confidence < 85% triggers an out-of-distribution low-confidence flag.")}
    ${nodeGroup(414, 130, 56, 50, "Output", "Flask API", true, "Diagnosis + Grad-CAM + confidence score via Flask REST API.", true)}

    <text x="240" y="290" text-anchor="middle" class="dgm-caption">ensemble voting · Grad-CAM · OOD guardrails · Flask API</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// 4. Anomaly Detection — time-series + LSTM → 3 detectors vote
// ---------------------------------------------------------------------------
function anomaly() {
  const mainPath = "M215 100 L290 160 L330 200";
  return `<svg viewBox="0 0 480 295" role="img" aria-label="Anomaly detection: an LSTM forecasts a time series and anomalies branch to threshold, GMM and KNN detectors that vote.">
    <defs>
      <path id="ad-flow" d="${mainPath}"/>
    </defs>

    <!-- axes -->
    <line x1="20" y1="155" x2="295" y2="155" stroke="var(--hairline-strong)" stroke-width="1"/>
    <line x1="20" y1="40" x2="20" y2="155" stroke="var(--hairline-strong)" stroke-width="1"/>

    <!-- real signal -->
    <path d="M20 120 L45 100 L70 130 L95 88 L120 140 L145 68 L170 148 L195 93 L215 100"
      class="dgm-edge" style="--len:420;stroke:var(--text-soft)"/>
    <!-- LSTM forecast (dashed flow) -->
    <path d="M215 100 L240 118 L265 94 L290 128"
      class="dgm-flow"/>

    <!-- anomaly markers -->
    <circle cx="145" cy="68" r="4" class="dgm-pulse-dot"/>
    <circle cx="170" cy="148" r="4" class="dgm-pulse-dot"/>
    <text x="240" y="56" class="dgm-lbl dgm-lbl--sm">LSTM forecast</text>

    ${edge("M160 145 V205 H65", 145)}
    ${edge("M160 145 V205 H200", 70)}
    ${edge("M160 145 V205 H335", 190)}

    <use href="#ad-flow" class="dgm-flow"/>

    <circle r="3.4" class="dgm-packet" style="opacity:0">
      <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="3.0s" repeatCount="indefinite"/>
      <animateMotion begin="indefinite" dur="3.0s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#ad-flow"/></animateMotion>
    </circle>

    ${nodeGroup(25, 208, 80, 36, "Threshold", "statistical", false, "Threshold detector: flags forecast errors beyond a statistical threshold.")}
    ${nodeGroup(160, 208, 80, 36, "GMM", "density", true, "Gaussian Mixture Model: flags low-probability density regions.")}
    ${nodeGroup(295, 208, 80, 36, "KNN", "distance", false, "K-Nearest Neighbours: flags points far from their neighbours in error space.")}

    <text x="240" y="285" text-anchor="middle" class="dgm-caption">forecast error → 3 detectors vote → anomaly</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// 5. Brokemate — expenses → analytics → charts + AI advisor loop
// ---------------------------------------------------------------------------
function brokemate() {
  const mainPath = "M90 90 L185 90 L280 48 L350 48";
  return `<svg viewBox="0 0 480 290" role="img" aria-label="Brokemate: categorized expenses feed an analytics engine producing charts and an AI advisor that loops guidance back to the user.">
    <defs>
      <path id="bm-flow" d="${mainPath}"/>
    </defs>

    ${edge("M90 90 L185 90", 100)}
    ${edge("M185 90 L280 48", 110)}
    ${edge("M185 90 L280 140", 110)}
    ${edge("M280 48 L350 48", 80)}
    ${edge("M280 140 L350 140", 80)}
    <!-- feedback loop -->
    ${edge("M390 165 V230 H85 V115", 520)}

    <use href="#bm-flow" class="dgm-flow"/>

    <circle r="3.4" class="dgm-packet" style="opacity:0">
      <animate attributeName="opacity" begin="indefinite" from="1" to="1" dur="3.8s" repeatCount="indefinite"/>
      <animateMotion begin="indefinite" dur="3.8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#bm-flow"/></animateMotion>
    </circle>

    ${nodeGroup(16, 65, 75, 50, "Expenses", "CRUD · JWT", false, "JWT-secured CRUD expense tracking with category + good/bad flagging.")}
    ${nodeGroup(185, 64, 95, 52, "Analytics", "FastAPI engine", true, "FastAPI analytics engine aggregates spend by category and date.")}
    ${nodeGroup(280, 24, 70, 48, "Charts", "Recharts", false, "Recharts visualizations: spending trends, category breakdown.")}
    ${nodeGroup(280, 116, 70, 48, "AI Advisor", "HF model", true, "Local / Hugging Face model for personalized budgeting & investment tips.", true)}
    ${nodeGroup(350, 24, 82, 48, "View Work", "React · Vite", false, "React + Vite frontend with protected routes and responsive Recharts dashboards.")}

    <text x="240" y="282" text-anchor="middle" class="dgm-caption">JWT auth · categorized spend → AI insight loop</text>
  </svg>`;
}

const registry = { influencer, nexacred, medscan, anomaly, brokemate };

export function getDiagram(id) {
  const fn = registry[id];
  return fn ? fn() : "";
}

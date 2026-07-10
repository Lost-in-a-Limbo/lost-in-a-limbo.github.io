// ============================================================================
// data.js — single source of truth for all portfolio content.
// Edit this file to update the site. No markup changes required.
// Items marked NEEDS INPUT should be replaced with real values.
// ============================================================================

export const profile = {
  name: "Utkarsh Tuteja",
  initials: "UT",
  tagline: "AI Systems Engineer",
  roles: ["AI Systems Engineer", "Full-Stack AI Builder", "Machine Learning Engineer"],
  positioning:
    "I build end-to-end AI systems — from ML & RAG pipelines to scalable backends and production apps — turning complex ideas into software that ships and runs with real users.",
  location: "Bengaluru, India",
  availability: "Open to AI / ML / SWE roles, internships & collaborations",
};

export const about = {
  lead:
    "Computer Science (AI) undergraduate who ships production systems, not just prototypes.",
  paragraphs: [
    "I specialize in taking AI from notebook to production — designing ML and Retrieval-Augmented Generation pipelines, wiring them into FastAPI backends, and deploying full-stack applications that people actually use.",
    "As a short-term AI Systems Intern at Wellversed, I independently led the company's largest internal technical build end-to-end, collaborating directly with stakeholders through live production cycles.",
    "I care about the engineering that makes AI trustworthy: clean data pipelines, measurable model evaluation, and systems designed for scale and clarity.",
  ],
  facts: [
    { label: "Degree", value: "B.Tech CSE (Artificial Intelligence)" },
    { label: "University", value: "Manipal Institute of Technology" },
    { label: "Graduation", value: "Expected June 2027" },
    { label: "CGPA", value: "8.41" },
    { label: "Coursework", value: "A+ in NLP & Artificial Intelligence" },
    { label: "Certification", value: "ML Specialization — Stanford / DeepLearning.AI" },
  ],
};

export const experience = [
  {
    role: "AI Systems Intern",
    company: "Wellversed",
    location: "Gurugram, India",
    period: "Jun 2026 – Jul 2026",
    summary:
      "Independently spearheaded Influencer OS — the company's largest internal technical build — from concept to production as a short-term intern.",
    points: [
      "Designed and shipped a fully working production web platform end-to-end using AI-assisted development (Cursor IDE) and prompt engineering, working directly with stakeholders.",
      "Automated influencer operations end-to-end — termsheet generation, Google Docs/PDF creation, email workflows and campaign management — integrating Google Service Account auth, Apps Script, Sheets, Gmail & REST APIs.",
      "Built and debugged backend services on MongoDB Atlas with scalable schemas, resolving live issues through iterative production deployment cycles.",
    ],
  },
];

// Skill graph — used by the hero force-directed visualization and the skills grid.
// `core: true` nodes render larger in the hero graph.
export const skills = {
  groups: [
    {
      name: "Languages",
      items: ["Python", "JavaScript (ES6+)", "C++", "Java", "Solidity", "C"],
    },
    {
      name: "AI / ML",
      items: [
        "TensorFlow",
        "Scikit-learn",
        "LightGBM",
        "Sentence Transformers",
        "IBM Granite RAG",
        "Grad-CAM",
        "Pandas",
        "NumPy",
      ],
    },
    {
      name: "Backend / Web",
      items: ["FastAPI", "Flask", "Node.js", "Express.js", "REST APIs", "Web3.js"],
    },
    {
      name: "Frontend",
      items: ["React", "Vite", "Recharts", "Tailwind CSS"],
    },
    {
      name: "Data & Infra",
      items: ["MongoDB", "MongoDB Atlas", "Vector Search", "AWS", "Docker", "Git"],
    },
    {
      name: "Craft",
      items: ["Prompt Engineering", "AI-Assisted Dev (Cursor)", "Production Debugging", "150+ LeetCode"],
    },
  ],
  // Prominent nodes for the hero graph (kept small for 60fps).
  hero: [
    { id: "AI", core: true },
    { id: "RAG", core: true },
    { id: "Python", core: true },
    { id: "FastAPI", core: true },
    { id: "LightGBM" },
    { id: "LSTM" },
    { id: "React" },
    { id: "MongoDB" },
    { id: "Solidity" },
    { id: "Docker" },
    { id: "NLP" },
    { id: "REST" },
  ],
};

// All skills used across all projects — drives the skill rail
export const allRailSkills = [
  "Node.js", "Express.js", "MongoDB", "AWS", "React", "JWT",
  "IBM Granite RAG", "LightGBM", "Flask", "FastAPI", "Solidity", "Web3.js", "Sentence Transformers",
  "TensorFlow", "Grad-CAM", "Scikit-learn",
  "Recharts", "Hugging Face",
];

export const projects = [
  {
    id: "influencer-os",
    rank: 1,
    name: "Wellversed Influencer OS",
    year: "2026",
    tagline: "Full-stack influencer ops platform — 100 live users in production.",
    blurb:
      "The company's flagship internal platform for end-to-end influencer operations — discovery, onboarding, campaigns, contracts, analytics, sales attribution, finance workflows and reporting — with RBAC. Shipped to 100 live users and managed in production solo.",
    problem:
      "Wellversed needed to centralize influencer operations across discovery, contracting, campaign management and finance — all managed manually across spreadsheets and email.",
    solution:
      "Built a multi-brand internal platform end-to-end: Node.js/Express REST API, React/Vite frontend, MongoDB Atlas (17 collections), AWS (S3/EC2/ALB/CloudFront/WAF), and full RBAC. Independently led design, development, deployment and operations.",
    evaluation:
      "Shipped to production with 100 live users (Wellversed staff & agents). Sole engineer responsible for infrastructure, deployment pipelines and live issue resolution.",
    highlights: [
      "17-collection MongoDB Atlas schema covering every ops domain",
      "AWS-hosted: S3 assets, EC2 compute, ALB load balancing, CloudFront CDN, WAF protection",
      "Full RBAC — multi-role access control across all modules",
      "100 live users in production; solo-managed infrastructure & operations",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "AWS", "React", "JWT"],
    railSkills: ["Node.js", "Express.js", "MongoDB", "AWS", "React", "JWT"],
    diagram: "influencer",
    links: {
      live: null, // internal — no public URL yet
      code: "https://github.com/Lost-in-a-Limbo/Wellversed-Influencer-OS",
    },
  },
  {
    id: "nexacred",
    rank: 2,
    name: "NexaCred Enhanced",
    year: "2025",
    tagline: "RAG-powered, fraud-resistant credit scoring on-chain.",
    blurb:
      "A credit-evaluation platform that fuses AI-driven insight with decentralized finance — a Retrieval-Augmented Generation chatbot for context-aware analysis, LightGBM risk models, and immutable score verification via Solidity smart contracts.",
    problem:
      "Traditional credit evaluation lacks context-aware analysis and never integrates AI-driven insight with decentralized finance.",
    solution:
      "Built a RAG-powered conversational AI (IBM Granite + Sentence Transformers) over SQL-preprocessed financial data, paired with LightGBM risk models and Solidity smart contracts wired through a FastAPI backend.",
    evaluation:
      "Compared multiple credit-risk models on precision, recall, F1 and AUC, then tuned classification thresholds for the best operating point.",
    highlights: [
      "RAG chatbot (IBM Granite + Sentence Transformers) for explainable, context-aware credit insight",
      "LightGBM + scikit-learn LogisticRegression risk models evaluated with precision / recall / F1 / AUC",
      "Solidity smart contracts for tamper-proof, auditable score storage",
      "Flask + FastAPI backend orchestrating ML, RAG and blockchain layers",
    ],
    stack: ["Python", "FastAPI", "Flask", "LightGBM", "Sentence Transformers", "IBM Granite RAG", "Solidity", "MongoDB", "Web3.js"],
    railSkills: ["IBM Granite RAG", "LightGBM", "Flask", "FastAPI", "MongoDB", "Solidity", "Web3.js", "Sentence Transformers"],
    diagram: "nexacred",
    links: {
      live: "https://nexacred-metamask-enhanced.vercel.app/",
      code: "https://github.com/Lost-in-a-Limbo/-nexacred-metamask-enhanced",
    },
  },
  {
    id: "medscan",
    rank: 3,
    name: "MedScan AI",
    year: "2026",
    tagline: "Multi-disease diagnostics with ensemble voting + Grad-CAM explainability.",
    blurb:
      "A clinical-grade diagnostic platform supporting Chest X-ray pneumonia detection and 4-class Brain MRI tumor classification. Ensemble majority voting across 5+3 models with MobileNet fallback, Grad-CAM visual explanations, and OOD confidence guardrails.",
    problem:
      "Medical imaging AI requires high reliability — single-model predictions are brittle, and clinicians need visual explanations to trust AI-assisted diagnoses.",
    solution:
      "Built an ensemble-voting inference pipeline (5 pneumonia + 3 brain models, majority vote, MobileNetV2 fallback), Grad-CAM heat-map overlays, OOD guardrails (<85% confidence flagging), Flask REST inference API, and a React/Vite/Tailwind frontend.",
    evaluation:
      "Pneumonia: MobileNetV2 90.06% accuracy / 0.91 F1 (624 test scans). Brain tumor: MobileNetV2 88.63% accuracy (1,600 test scans).",
    highlights: [
      "Ensemble voting across 5 pneumonia + 3 brain-tumor models with MobileNetV2 fallback",
      "Grad-CAM heat-map overlays for every prediction — clinician-readable explainability",
      "OOD guardrails: <85% confidence triggers a low-confidence flag",
      "90.06% pneumonia accuracy / 88.63% brain-tumor accuracy on real test sets",
    ],
    stack: ["Python", "TensorFlow", "Flask", "React", "Vite", "Grad-CAM", "Scikit-learn"],
    railSkills: ["TensorFlow", "Grad-CAM", "Flask", "React", "Scikit-learn"],
    diagram: "medscan",
    links: {
      live: null,
      code: "https://github.com/Lost-in-a-Limbo/Pneumonia-Detection",
    },
  },
  {
    id: "anomaly",
    rank: 4,
    name: "Time-Series Anomaly Detection",
    year: "2026",
    tagline: "Multi-model, real-time anomaly detection for critical systems.",
    blurb:
      "A full-stack ML system that forecasts time-series data with an LSTM and flags anomalies three independent ways — statistical threshold, GMM probability density, and KNN distance — behind a Flask API with a live React dashboard.",
    problem:
      "Energy grids, servers and IoT devices emit continuous time-series data where undetected anomalies cause failures.",
    solution:
      "An LSTM learns temporal dependencies to forecast future values; forecast errors are then screened by three detectors (statistical threshold, GMM, KNN) and compared in a unified dashboard with simulated real-time streaming.",
    evaluation:
      "Trained and evaluated on the UCI Electricity Load dataset (real hourly consumption), comparing detector behavior on the same signal.",
    highlights: [
      "LSTM forecasting core capturing temporal structure",
      "Three complementary detectors: threshold vs. GMM vs. KNN",
      "Flask REST API + React dashboard with real-time streaming simulation",
      "Industry-style monitoring architecture end-to-end",
    ],
    stack: ["Python", "TensorFlow", "Scikit-learn", "Flask", "React", "NumPy", "Pandas"],
    railSkills: ["TensorFlow", "Flask", "React", "Scikit-learn"],
    diagram: "anomaly",
    links: {
      live: null,
      code: "https://github.com/Lost-in-a-Limbo/Annomaly-Detection-in-UCI-dataset",
    },
  },
  {
    id: "brokemate",
    rank: 5,
    name: "Brokemate",
    year: "2025",
    tagline: "Full-stack AI expense manager with a financial advisor.",
    blurb:
      "A personal-finance app with JWT-secured auth, full CRUD expense management, visual analytics (Recharts), and an AI insights + chat layer powered by a local / Hugging Face model that turns raw spending into personalized budgeting and investment guidance.",
    problem:
      "Manual expense tracking gives no real-time insight into where money actually goes.",
    solution:
      "A full-stack app — React + Vite + Recharts frontend, FastAPI + MongoDB backend with JWT auth & bcrypt — with categorized CRUD expenses, good/bad flagging, and AI-powered analysis + chat endpoints for personalized advice.",
    evaluation:
      "Production-style patterns: token auth, protected routes, and an AI advisory layer over live spending data.",
    highlights: [
      "JWT-based authentication with bcrypt + protected API routes",
      "Categorized CRUD expenses with visual analytics (Recharts + Lucide)",
      "AI insights + chat powered by a local / Hugging Face model",
      "React + Vite + FastAPI + MongoDB full-stack architecture",
    ],
    stack: ["React", "Vite", "FastAPI", "MongoDB", "JWT", "Recharts", "Hugging Face"],
    railSkills: ["React", "FastAPI", "MongoDB", "JWT", "Recharts", "Hugging Face"],
    diagram: "brokemate",
    links: {
      live: null,
      code: "https://github.com/Lost-in-a-Limbo/Brokemate",
    },
  },
];

export const contact = {
  primaryEmail: "utkarsh.proac0101@gmail.com",
  phone: "+91 9311261301",
  channels: [
    { label: "Email", value: "utkarsh.proac0101@gmail.com", href: "mailto:utkarsh.proac0101@gmail.com", primary: true },
    { label: "GitHub", value: "Lost-in-a-Limbo", href: "https://github.com/Lost-in-a-Limbo" },
    { label: "LinkedIn", value: "Utkarsh Tuteja", href: "https://www.linkedin.com/in/utkarsh-tuteja-530a7b294/" },
    { label: "LeetCode", value: "lost_in_a_limbo · 150+ solved", href: "https://leetcode.com/u/lost_in_a_limbo/" },
    { label: "Phone", value: "+91 9311261301", href: "tel:+919311261301" },
  ],
  resume: "assets/Utkarsh_Tuteja_resume.pdf",
};

export const meta = {
  title: "Utkarsh Tuteja — AI Systems Engineer",
  description:
    "AI Systems Engineer & Full-Stack Developer building production-ready AI — RAG pipelines, ML systems and scalable backends.",
  url: "https://lost-in-a-limbo.github.io/", // update if using a custom domain
  themeColor: "#050506",
};

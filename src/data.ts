export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  tags: string[];
  liveDetail: string;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
}

export interface Partner {
  name: string;
  workedOn: string;
  year: string;
  metric: string;
}

export const PARTNERS_DATA: Partner[] = [
  { name: "zantic", workedOn: "Interactive Dashboard & Brand Identity", year: "2025", metric: "240% Speedup" },
  { name: "BookStore", workedOn: "Next-gen E-commerce Mobile Framework", year: "2026", metric: "1.2M Installs" },
  { name: "Wager", workedOn: "Decentralized Sports UI & Analytics Engine", year: "2025", metric: "$40M TVL" },
  { name: "Crona", workedOn: "SaaS Workspace & Collaboration Suite", year: "2024", metric: "80k Daily Users" },
  { name: "Mercury", workedOn: "AI-powered Productivity Platform Interface", year: "2026", metric: "Series B funded" }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-strategy",
    num: "01",
    title: "Brand Strategy & Positioning",
    headline: "We design brands with deep narrative depth & memorable visual energy.",
    description: "Our discovery framework defines your core ethos and maps it to a bespoke, high-end identity designed to stand out in competitive markets.",
    deliverables: ["Visual Identity Systems", "Strategic Narrative Blueprint", "Logomark Design", "Design Guidelines System"]
  },
  {
    id: "product-design",
    num: "02",
    title: "Digital Product Design",
    headline: "Tactile, responsive web & mobile product interfaces crafted with luxury precision.",
    description: "We design premium interfaces with smooth micro-interactions, flawless responsive states, and intuitive, accessible user maps.",
    deliverables: ["UX/UI Interface Systems", "Interactive Design Prototypes", "Design Tokens & Figma Library", "Accessibility Auditing"]
  },
  {
    id: "creative-development",
    num: "03",
    title: "Creative Web & App Dev",
    headline: "Award-winning dynamic frontends and high-performance full-stack engineering.",
    description: "We bundle top-tier interactive layouts, WebGL animations, and blistering-fast custom infrastructure with strict attention to performance.",
    deliverables: ["Blistering Custom React Apps", "Sleek Motion Choreography", "Micro-interaction Tuning", "API Architectures"]
  },
  {
    id: "creative-direction",
    num: "04",
    title: "Creative Direction & Spatial OS",
    headline: "Pioneering visual themes, interactive audio loops, and spatial user maps.",
    description: "From spatial interfaces to unique concept art direction, we shape cinematic visual environments that tell immersive stories.",
    deliverables: ["Immersive Storyboards", "Spatial Interface Wireframes", "Interactive Ambient Assets", "Creative Brand Direction"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "aether",
    title: "Aether Platform",
    category: "Financial Technology",
    description: "A premium wealth platform featuring fluid visualizations and instant cross-border settlement capabilities, wrapped in a jet-black terminal.",
    metricLabel: "User Retention",
    metricValue: "98.4%",
    tags: ["Product System", "Interactive Charts", "UX Framework"],
    liveDetail: "Simulate metric growth above to view real-time projections."
  },
  {
    id: "vesper",
    title: "Vesper Spatial OS",
    category: "Spatial VR Interface",
    description: "Next-generation workspace interface for VR & spatial displays, optimized with high contrast vectors and zero-latency responsive controls.",
    metricLabel: "Render Latency",
    metricValue: "< 2.4ms",
    tags: ["Spatial UI", "Motion System", "3D Coordinates"],
    liveDetail: "Drag cursor across Vesper above to manipulate interactive angle."
  },
  {
    id: "nova-wearable",
    title: "Nova Ecosystem",
    category: "Brand & E-commerce System",
    description: "Premium biometric device brand system, digital storefront, and responsive web app featuring dynamic custom mockups.",
    metricLabel: "Conversion Grew",
    metricValue: "+32.5%",
    tags: ["Brand Narrative", "Custom Checkout", "WebGL Showcase"],
    liveDetail: "Click the mock toggle of Nova inside to preview alternate interfaces."
  }
];

import type { Industry } from "./types";

export const industriesPage = {
  meta: {
    title: "Industries | Daberau",
    description: "IT solutions for retail, education, healthcare, logistics, and the public sector.",
  },
  h1: "IT solutions shaped around your industry",
  sub: "Every industry runs differently. Pick yours to see the problems we solve most often.",
  labels: {
    challenges: "Challenges we hear about most",
    challengesSub: "If these sound familiar, you're not alone.",
    solutions: "How we can help",
    solutionsSub: "The services that solve these problems fastest.",
    caseStudies: "Results in your industry",
    caseStudiesSub: "Projects we've delivered for teams like yours.",
    noCases: "No case studies in this category yet. Try another filter or ask us about our experience directly.",
    explore: "Explore",
  },
};

// Challenges are sample copy. Heroes follow the spec pattern "IT solutions for [Industry]";
// Healthcare uses the spec's example H1.
export const industries: Industry[] = [
  {
    slug: "retail-smes",
    name: "Retail & SMEs",
    icon: "store",
    h1: "IT solutions for Retail & SMEs",
    sub: "Websites, online stores, and simple systems that help small teams sell more and work less.",
    challenges: [
      { title: "Online sales stay small", body: "Customers can't find you on Google, and your website doesn't turn visitors into orders." },
      { title: "Stock lives in spreadsheets", body: "Branches don't share one view of inventory, so items run out or pile up." },
      { title: "No one to call for IT", body: "When the cashier system or Wi-Fi breaks, there's no in-house team to fix it." },
    ],
    services: ["web-development", "app-development", "it-support"],
    meta: { title: "IT Solutions for Retail & SMEs | Daberau", description: "Websites, online stores, and simple systems that help small teams sell more and work less." },
  },
  {
    slug: "education",
    name: "Education",
    icon: "graduation",
    h1: "IT solutions for Education",
    sub: "Portals and systems that make admissions, learning, and administration easier for schools and training centers.",
    challenges: [
      { title: "Admissions on paper", body: "Registration, payments, and documents are handled manually every intake." },
      { title: "Scattered learning tools", body: "Teachers and students juggle too many apps and logins." },
      { title: "Limited IT budget", body: "You need reliable systems without hiring a full IT department." },
    ],
    services: ["web-development", "app-development", "it-consulting"],
    meta: { title: "IT Solutions for Education | Daberau", description: "Portals and systems that make admissions, learning, and administration easier for schools and training centers." },
  },
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    icon: "stethoscope",
    h1: "Digital systems for clinics that want to serve patients faster",
    sub: "Online booking, patient records, and secure infrastructure for clinics and healthcare providers.",
    challenges: [
      { title: "Long queues at the front desk", body: "Phone bookings and walk-ins pile up at peak hours." },
      { title: "Sensitive data at risk", body: "Patient records need proper access control and reliable backups." },
      { title: "Branches out of sync", body: "Each branch keeps its own schedule and records." },
    ],
    services: ["app-development", "ui-ux-design", "cloud-infrastructure"],
    meta: { title: "Digital Systems for Clinics | Daberau", description: "Online booking, patient records, and secure infrastructure for clinics and healthcare providers." },
  },
  {
    slug: "logistics-distribution",
    name: "Logistics & Distribution",
    icon: "truck",
    h1: "IT solutions for Logistics & Distribution",
    sub: "Dashboards, tracking, and automation that give you one live view of orders, stock, and deliveries.",
    challenges: [
      { title: "Reports take days", body: "Data from branches and drivers is merged by hand before anyone can act on it." },
      { title: "No live view of deliveries", body: "Customers call to ask where their order is, and you have to check manually." },
      { title: "Systems that don't talk", body: "Accounting, warehouse, and sales tools all hold different numbers." },
    ],
    services: ["app-development", "cloud-infrastructure", "it-consulting"],
    meta: { title: "IT Solutions for Logistics & Distribution | Daberau", description: "Dashboards, tracking, and automation that give you one live view of orders, stock, and deliveries." },
  },
  {
    slug: "government-public-sector",
    name: "Government & Public Sector",
    icon: "landmark",
    h1: "IT solutions for Government & Public Sector",
    sub: "Accessible public websites, service portals, and secure infrastructure for institutions.",
    challenges: [
      { title: "Services still require a visit", body: "Citizens queue in person for services that could be handled online." },
      { title: "Strict security requirements", body: "Systems must meet data protection rules and pass audits." },
      { title: "Outdated public websites", body: "Information is hard to find and doesn't work well on phones." },
    ],
    services: ["web-development", "cloud-infrastructure", "it-consulting"],
    meta: { title: "IT Solutions for Government & Public Sector | Daberau", description: "Accessible public websites, service portals, and secure infrastructure for institutions." },
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

import type { Industry, PageMeta } from "./types";

export const industriesPage = {
  meta: {
    title: "Industries We Serve | Daberau",
    description:
      "IT solutions for retail and SMEs, manufacturing, logistics, healthcare, education, and the public sector.",
  } satisfies PageMeta,
  h1: "IT solutions shaped around *your industry*",
  sub: "Every industry runs differently. Here's what we see most often in yours, and how we help.",
  labels: {
    challenges: "What we hear most",
    services: "How we help",
    cta: "Talk to us about [industry]",
  },
  closing: {
    title: "Don't see your industry?",
    body: "These are the sectors we work with most, not the only ones. Tell us how your business runs and we'll show you where technology can help.",
  },
  /** Home page section */
  home: {
    title: "Built for the way *your industry* works",
    sub: "From shop floors to clinics, we've seen the same IT headaches in many forms.",
    link: "See all industries",
  },
};

export const industries: Industry[] = [
  {
    slug: "retail-smes",
    name: "Retail & SMEs",
    icon: "store",
    title: "Sell more, *work less*",
    body: "Websites, online stores, and simple systems that help small teams reach more customers and spend less time on admin.",
    challenges: [
      { title: "Online sales stay small", body: "Customers can't find you on Google, and the website doesn't turn visitors into orders." },
      { title: "Stock lives in spreadsheets", body: "Branches don't share one view of inventory, so items run out or pile up." },
      { title: "No one to call for IT", body: "When the cashier system or Wi-Fi breaks, there's no in-house team to fix it." },
    ],
    services: ["web-development", "app-development", "it-support"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    title: "One live view of *the factory floor*",
    body: "Production tracking, inventory systems, and dashboards that replace paper forms and end-of-month surprises.",
    challenges: [
      { title: "Output tracked on paper", body: "Shift reports are written by hand and typed in days later, if at all." },
      { title: "Raw material guesswork", body: "Purchasing relies on estimates because stock levels aren't up to date." },
      { title: "Downtime nobody sees coming", body: "Servers and machines fail without warning, and production stops with them." },
    ],
    services: ["app-development", "cloud-infrastructure", "it-support"],
  },
  {
    slug: "logistics-distribution",
    name: "Logistics & Distribution",
    icon: "truck",
    title: "Know where *every order* is",
    body: "Dashboards, tracking, and automation that give you one live view of orders, stock, and deliveries.",
    challenges: [
      { title: "Reports take days", body: "Data from branches and drivers is merged by hand before anyone can act on it." },
      { title: "No live view of deliveries", body: "Customers call to ask where their order is, and you have to check manually." },
      { title: "Systems that don't talk", body: "Accounting, warehouse, and sales tools all hold different numbers." },
    ],
    services: ["app-development", "cloud-infrastructure", "it-consulting"],
  },
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    icon: "stethoscope",
    title: "Serve patients *faster*",
    body: "Online booking, patient records, and secure infrastructure for clinics and healthcare providers.",
    challenges: [
      { title: "Long queues at the front desk", body: "Phone bookings and walk-ins pile up at peak hours." },
      { title: "Sensitive data at risk", body: "Patient records need proper access control and reliable backups." },
      { title: "Branches out of sync", body: "Each branch keeps its own schedule and records." },
    ],
    services: ["app-development", "ui-ux-design", "cloud-infrastructure"],
  },
  {
    slug: "education",
    name: "Education",
    icon: "graduation",
    title: "Less admin, *more teaching*",
    body: "Portals and systems that make admissions, learning, and administration easier for schools and training centers.",
    challenges: [
      { title: "Admissions on paper", body: "Registration, payments, and documents are handled manually every intake." },
      { title: "Scattered learning tools", body: "Teachers and students juggle too many apps and logins." },
      { title: "Limited IT budget", body: "You need reliable systems without hiring a full IT department." },
    ],
    services: ["web-development", "app-development", "it-consulting"],
  },
  {
    slug: "government-public-sector",
    name: "Government & Public Sector",
    icon: "landmark",
    title: "Public services, *online and secure*",
    body: "Accessible public websites, service portals, and secure infrastructure for institutions.",
    challenges: [
      { title: "Services still require a visit", body: "Citizens queue in person for services that could be handled online." },
      { title: "Strict security requirements", body: "Systems must meet data protection rules and pass audits." },
      { title: "Outdated public websites", body: "Information is hard to find and doesn't work well on phones." },
    ],
    services: ["web-development", "cloud-infrastructure", "it-consulting"],
  },
];

import type { CaseCategory, CaseStudy } from "./types";
import { testimonials } from "./testimonials";

export const caseStudiesPage = {
  meta: {
    title: "Case Studies | Daberau",
    description: "Every project starts with a real business problem. See how we solved it.",
  },
  h1: "Work we're proud of",
  sub: "Every project starts with a real business problem. See how we solved it.",
  filters: ["All", "Websites", "Apps", "UI/UX", "Infrastructure"] as ("All" | CaseCategory)[],
  industryLabel: "Industry",
  allIndustries: "All industries",
  empty: "No case studies in this category yet. Try another filter or ask us about our experience directly.",
  emptyCta: { label: "Get a Free Consultation", href: "/consultation" },
  detail: {
    glance: "At a *glance*",
    glanceLabels: { client: "Client", industry: "Industry", services: "Services", duration: "Duration" },
    challenge: "What our client was facing",
    solution: "What we built",
    process: "How we *got there*",
    processSub: "The key phases and decisions along the way.",
    results: "The *difference* it made",
    resultsSub: "Before and after, in numbers.",
    resultsCols: { before: "Before", after: "After" },
    gallery: "A *closer look*",
    gallerySub: "Screens from the finished product.",
    cta: "Facing a similar challenge? Let's talk.",
    ctaSub: "Tell us what's going on. We'll show you how we'd approach it, free of charge.",
  },
};

// Three sample entries. Client names are anonymized descriptors and all copy is sample copy.
export const caseStudies: CaseStudy[] = [
  {
    slug: "sales-reporting-automation",
    client: "Regional FMCG distributor",
    industry: "Logistics & Distribution",
    industrySlug: "logistics-distribution",
    title: "Report preparation cut from 3 days to 10 minutes",
    metric: { value: "3 days → 10 min", label: "Monthly report preparation" },
    categories: ["Apps"],
    services: ["app-development", "cloud-infrastructure"],
    imageLabel: "Sales reporting dashboard",
    glance: {
      duration: "[X] weeks",
      metrics: [
        { value: "10 min", label: "Report preparation, down from 3 days" },
        { value: "[X]%", label: "Fewer data-entry errors" },
        { value: "[X]", label: "Branches on one system" },
      ],
    },
    challenge: [
      "Sales data from every branch arrived as separate spreadsheets over chat. The finance team spent three days each month merging files before anyone could read the numbers.",
      "Errors repeated every month, and managers made decisions on figures that were already a week old.",
    ],
    solution: [
      "We built a web app where each branch enters sales once. The data flows into a single database and a dashboard that updates as orders come in.",
      "Monthly reports are generated in one click and exported in the format the finance team already used.",
    ],
    process: [
      { title: "Discovery", body: "Two workshops with finance and branch staff to map the current reporting flow." },
      { title: "Prototype", body: "A clickable prototype tested with three branch admins before development started." },
      { title: "Build in sprints", body: "Two-week sprints with a demo at the end of each one." },
      { title: "Rollout", body: "One pilot branch first, then all branches with on-site training." },
    ],
    results: [
      { label: "Monthly report preparation", before: "3 days", after: "10 minutes" },
      { label: "Data-entry errors per month", before: "[X]", after: "[X]" },
      { label: "Time to see branch sales", before: "~1 week", after: "Same day" },
    ],
    testimonial: testimonials[0],
    gallery: ["Dashboard overview", "Branch data-entry form", "Monthly report export"],
  },
  {
    slug: "clinic-online-booking",
    client: "Multi-branch clinic group",
    industry: "Healthcare & Clinics",
    industrySlug: "healthcare-clinics",
    title: "Online booking that shortened front-desk queues by [X]%",
    metric: { value: "[X]%", label: "Shorter front-desk queues" },
    categories: ["UI/UX", "Apps"],
    services: ["ui-ux-design", "app-development"],
    imageLabel: "Patient booking app",
    glance: {
      duration: "[X] months",
      metrics: [
        { value: "[X]%", label: "Shorter front-desk queues" },
        { value: "[X]%", label: "Bookings made online" },
        { value: "[X]", label: "Clinic branches connected" },
      ],
    },
    challenge: [
      "Every appointment was booked by phone. Lines were busy at peak hours, and patients often arrived to find their slot double-booked.",
    ],
    solution: [
      "We designed and built a mobile-friendly booking flow that shows real-time availability per doctor and branch, with WhatsApp reminders the day before.",
      "Front-desk staff manage the schedule from one simple admin screen.",
    ],
    process: [
      { title: "Patient interviews", body: "We spoke with patients and front-desk staff to find where booking broke down." },
      { title: "UX design", body: "Wireframes and a prototype, tested with patients of different ages." },
      { title: "Build & integrate", body: "Booking app, admin screen, and WhatsApp reminder integration." },
      { title: "Launch & support", body: "Phased launch per branch and a monthly maintenance plan." },
    ],
    results: [
      { label: "Average front-desk queue", before: "[X] min", after: "[X] min" },
      { label: "Double bookings per month", before: "[X]", after: "[X]" },
      { label: "Bookings made online", before: "0%", after: "[X]%" },
    ],
    testimonial: testimonials[1],
    gallery: ["Booking flow on mobile", "Doctor schedule view", "Admin dashboard"],
  },
  {
    slug: "retail-website-redesign",
    client: "Home-goods retailer",
    industry: "Retail & SMEs",
    industrySlug: "retail-smes",
    title: "[X]% more online inquiries from a faster, easier-to-find website",
    metric: { value: "[X]%", label: "More online inquiries" },
    categories: ["Websites"],
    services: ["web-development"],
    imageLabel: "Retail website homepage",
    glance: {
      duration: "[X] weeks",
      metrics: [
        { value: "[X]%", label: "More online inquiries" },
        { value: "[X] s", label: "Average page load time" },
        { value: "[X]", label: "Keywords on Google's first page" },
      ],
    },
    challenge: [
      "The old website took more than 8 seconds to load on mobile and did not appear on Google for the products the store actually sells.",
      "Updating a product meant waiting days for a freelancer.",
    ],
    solution: [
      "We rebuilt the site with a fast, SEO-ready structure, a product catalog the team updates through a CMS, and WhatsApp buttons on every product page.",
    ],
    process: [
      { title: "Audit", body: "Speed, SEO, and analytics review of the existing website." },
      { title: "Structure & design", body: "New sitemap and page designs built around top-selling categories." },
      { title: "Build & migrate", body: "Development, content migration, and redirects from old URLs." },
      { title: "Launch & train", body: "Go-live, Google Search Console setup, and CMS training." },
    ],
    results: [
      { label: "Mobile page load time", before: "8+ s", after: "[X] s" },
      { label: "Monthly online inquiries", before: "[X]", after: "[X]" },
      { label: "Time to update a product", before: "Days", after: "Minutes" },
    ],
    testimonial: testimonials[2],
    gallery: ["New homepage", "Product category page", "CMS editor"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

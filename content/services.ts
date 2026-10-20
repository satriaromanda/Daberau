import type { Faq, NeedFilter, Service, ServiceSlug } from "./types";

const placeholderBody = (name: string) => ({
  problem: {
    title: "Does this sound like you?",
    points: ["[Pain point 1]", "[Pain point 2]", "[Pain point 3]"],
  },
  deliver: {
    title: "What we deliver",
    items: ["[Sub-service 1]", "[Sub-service 2]", "[Sub-service 3]", "[Sub-service 4]"],
  },
  benefits: [
    { title: "[Benefit 1]", body: "[One measurable outcome]" },
    { title: "[Benefit 2]", body: "[One measurable outcome]" },
    { title: "[Benefit 3]", body: "[One measurable outcome]" },
  ],
  process: {
    steps: [
      { title: "[Step 1]", body: "[What happens in this step]" },
      { title: "[Step 2]", body: "[What happens in this step]" },
      { title: "[Step 3]", body: "[What happens in this step]" },
      { title: "[Step 4]", body: "[What happens in this step]" },
    ],
    sample: false,
  },
  packages: { startingFrom: "Starting from IDR [X]" },
  techStack: { items: ["[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]"], sample: false },
  faqs: [1, 2, 3, 4, 5].map((n) => ({ q: `[${name} question ${n}]`, a: "[Answer]" })),
});

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    short: "Company websites, online stores, and landing pages that load fast and rank on Google.",
    icon: "globe",
    keyword: "web development services",
    needs: ["found-online"],
    scope: ["Company websites", "Campaign landing pages", "Online stores"],
    scopeIsSample: false,
    isPlaceholder: false,
    meta: {
      title: "Web Development Services | Daberau",
      description: "Fast, easy to find on Google, and designed to turn visitors into leads.",
    },
    hero: {
      h1: "Websites that bring in customers, not just look good",
      sub: "Fast, easy to find on Google, and designed to turn visitors into leads.",
      cta: { label: "Get a Free Website Consultation", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does your website look like this?",
      points: [
        "It takes more than 5 seconds to load, and visitors leave before it opens",
        "It doesn't show up on Google's first page for your own services",
        "You can't update it without calling a developer",
      ],
    },
    deliver: {
      title: "What we deliver",
      items: [
        "Company websites",
        "Campaign landing pages",
        "Online stores",
        "Website redesigns",
        "Technical & on-page SEO",
        "WhatsApp, payment gateway, and analytics integration",
      ],
    },
    benefits: [
      { title: "Get found faster.", body: "SEO structure built in from day one." },
      { title: "Get more inquiries.", body: "Every page has a clear CTA and form." },
      { title: "Manage it yourself.", body: "A CMS you can update without code." },
    ],
    process: {
      sample: true,
      steps: [
        { title: "Discovery call", body: "We agree on your goals, your audience, and the pages you need." },
        { title: "Sitemap & wireframes", body: "You approve the structure before any design work starts." },
        { title: "Design & build", body: "We design key pages, then build them responsive and fast." },
        { title: "SEO & testing", body: "We set up on-page SEO and test speed, forms, and every device." },
        { title: "Launch & handover", body: "We go live and show your team how to update the CMS." },
      ],
    },
    packages: {
      rows: [
        { name: "Starter", bestFor: "New businesses, landing pages", included: "1–3 pages, responsive, contact form", price: "From IDR [X]" },
        { name: "Business", bestFor: "Company websites", included: "Up to 10 pages, CMS, basic SEO, blog", price: "From IDR [X]" },
        { name: "Custom", bestFor: "E-commerce & custom features", included: "Scoped to your needs, system integrations", price: "Let's talk" },
      ],
      note: "All packages include a domain and hosting for the first year, SSL, and a [X]-day bug-fix warranty.",
    },
    techStack: {
      items: ["Next.js", "WordPress", "Laravel", "Tailwind CSS", "Google Analytics", "Cloudflare"],
      sample: true,
    },
    faqs: [
      {
        q: "How long does it take to build a website?",
        a: "Starter sites usually take [X]–[X] weeks and Business sites [X]–[X] weeks. We confirm the exact timeline in your written quote.",
        sample: true,
      },
      {
        q: "Can I edit the content myself?",
        a: "Yes. Business and Custom packages include a CMS, and we walk your team through it at handover.",
        sample: true,
      },
      {
        q: "Are domain and hosting included?",
        a: "Yes. All packages include a domain and hosting for the first year, plus SSL.",
        sample: true,
      },
      {
        q: "What if I already have a website?",
        a: "We can redesign it, move your existing content across, and keep your domain so you don't start from zero.",
        sample: true,
      },
      {
        q: "Can you guarantee a first-page ranking on Google?",
        a: "No one can honestly guarantee rankings. We build the SEO foundations that give your pages the best chance, and show you how to track progress.",
        sample: true,
      },
    ],
    related: ["ui-ux-design", "app-development", "it-support"],
  },
  {
    slug: "app-development",
    name: "Web & Mobile Apps",
    short: "Custom apps for your operations, your customers, or your next digital product.",
    icon: "smartphone",
    keyword: "custom app development",
    needs: ["automate"],
    scope: ["Internal operations apps", "Customer-facing mobile apps", "Integrations with your existing tools"],
    scopeIsSample: true,
    isPlaceholder: true,
    meta: {
      title: "Custom App Development | Daberau",
      description: "Custom apps for your operations, your customers, or your next digital product.",
    },
    hero: {
      h1: "Custom apps built around the way your business works",
      sub: "Custom apps for your operations, your customers, or your next digital product.",
      cta: { label: "Talk to Us About Web & Mobile Apps", href: "/consultation" },
    },
    ...placeholderBody("App"),
    related: ["ui-ux-design", "cloud-infrastructure", "it-consulting"],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    short: "Interfaces people find easy to use, validated before a single line of code.",
    icon: "pen",
    keyword: "UI/UX design services",
    needs: ["found-online"],
    scope: ["User research & interviews", "Wireframes & clickable prototypes", "Usability testing"],
    scopeIsSample: true,
    isPlaceholder: true,
    meta: {
      title: "UI/UX Design Services | Daberau",
      description: "Interfaces people find easy to use, validated before a single line of code.",
    },
    hero: {
      h1: "Digital products people find easy to use from version one",
      sub: "Interfaces people find easy to use, validated before a single line of code.",
      cta: { label: "Talk to Us About UI/UX Design", href: "/consultation" },
    },
    ...placeholderBody("UI/UX"),
    related: ["web-development", "app-development", "it-consulting"],
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud & Infrastructure",
    short: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
    icon: "cloud",
    keyword: "cloud migration / managed servers",
    needs: ["stable"],
    scope: ["Cloud migration & hosting", "Server setup & hardening", "Automated backups & monitoring"],
    scopeIsSample: true,
    isPlaceholder: true,
    meta: {
      title: "Cloud Migration & Managed Servers | Daberau",
      description: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
    },
    hero: {
      h1: "Infrastructure that stays stable, secure, and ready to scale",
      sub: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
      cta: { label: "Talk to Us About Cloud & Infrastructure", href: "/consultation" },
    },
    ...placeholderBody("Cloud"),
    related: ["it-support", "it-consulting", "app-development"],
  },
  {
    slug: "it-support",
    name: "IT Support & Maintenance",
    short: "A team on standby for fixes, updates, and system monitoring.",
    icon: "wrench",
    keyword: "managed IT support",
    needs: ["stable"],
    scope: ["Helpdesk & on-call fixes", "Updates & security patches", "System monitoring & monthly reports"],
    scopeIsSample: true,
    isPlaceholder: true,
    meta: {
      title: "Managed IT Support & Maintenance | Daberau",
      description: "A team on standby for fixes, updates, and system monitoring.",
    },
    hero: {
      h1: "Your IT team, without the hiring",
      sub: "A team on standby for fixes, updates, and system monitoring.",
      cta: { label: "Talk to Us About IT Support & Maintenance", href: "/consultation" },
    },
    ...placeholderBody("IT support"),
    related: ["cloud-infrastructure", "web-development", "it-consulting"],
  },
  {
    slug: "it-consulting",
    name: "IT Consulting & Digital Transformation",
    short: "A clear digital roadmap before you commit a big budget.",
    icon: "compass",
    keyword: "IT consulting services",
    needs: ["automate"],
    scope: ["IT audit & assessment", "Digital roadmap & budgeting", "Vendor & technology selection"],
    scopeIsSample: true,
    isPlaceholder: true,
    meta: {
      title: "IT Consulting Services | Daberau",
      description: "A clear digital roadmap before you commit a big budget.",
    },
    hero: {
      h1: "A clear digital roadmap before you invest",
      sub: "A clear digital roadmap before you commit a big budget.",
      cta: { label: "Talk to Us About IT Consulting & Digital Transformation", href: "/consultation" },
    },
    ...placeholderBody("Consulting"),
    related: ["app-development", "cloud-infrastructure", "ui-ux-design"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceBySlug = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;

/** Section labels for the 11-section service detail template */
export const serviceTemplate = {
  benefitsTitle: "What you get",
  processTitle: "How we work on it",
  caseStudiesTitle: "Related case studies",
  packagesTitle: "Packages",
  techTitle: "Technologies we use",
  faqTitle: "Frequently asked questions",
  relatedTitle: "Related services",
  closing: {
    headline: "Ready to get your IT sorted?",
    sub: "Tell us what you need. We'll send a recommendation and an initial estimate, free of charge.",
  },
};

export const servicesOverview = {
  hero: {
    h1: "End-to-end IT services, delivered by one team",
    sub: "Start with a single need or build a complete digital ecosystem. We tailor everything to your stage and budget.",
  },
  filters: [
    { id: "found-online", label: "I want to be found online" },
    { id: "automate", label: "I want to automate operations" },
    { id: "stable", label: "I want more stable systems" },
    { id: "not-sure", label: "I'm not sure yet" },
  ] as { id: NeedFilter; label: string }[],
  bundled: {
    title: "Need more than one service?",
    sub: "Combine services under one contract and one project manager. Less coordination, faster delivery.",
  },
  tech: {
    title: "Technologies we use",
    sub: "We choose tools based on your needs, not trends.",
    items: ["React", "Next.js", "Laravel", "Flutter", "WordPress", "Figma", "AWS", "Google Cloud", "Docker", "PostgreSQL", "MySQL", "Cloudflare"],
  },
  faqs: [
    {
      q: "Can I start with just one service?",
      a: "Yes. Many clients start with a website or a support plan and add services later, with the same team.",
      sample: true,
    },
    {
      q: "Do you work with businesses that don't have an IT team?",
      a: "That's who we work with most. We explain options in plain language and handle the technical side for you.",
      sample: true,
    },
    {
      q: "How do you price your services?",
      a: "Every quote is itemized by phase, so you see exactly what you pay for before work starts.",
      sample: true,
    },
    {
      q: "What happens after my project launches?",
      a: "You get a [X]-day bug-fix warranty, and you can move on to a monthly maintenance plan.",
      sample: true,
    },
    {
      q: "Can you work with our existing systems or vendor?",
      a: "Yes. We start with a short review of what you already have and build on it where it makes sense.",
      sample: true,
    },
  ] as Faq[],
};

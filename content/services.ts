import type { Faq, NeedFilter, Service, ServiceSlug } from "./types";

// Prices, timelines and warranty terms below are typical market values used as a starting point.
// Confirm them against Daberau's real rate card before launch.

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    short: "Company websites, online stores, and landing pages that load fast and rank on Google.",
    icon: "globe",
    image: { src: "/images/services/web-development.webp", alt: "Developer writing website code on a laptop" },
    keyword: "web development services",
    needs: ["found-online"],
    scope: ["Company websites", "Campaign landing pages", "Online stores"],
    startingFrom: "IDR 3.5M",
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
      title: "Does your website *look like this?*",
      points: [
        "It takes more than 5 seconds to load, and visitors leave before it opens",
        "It doesn't show up on Google's first page for your own services",
        "You can't update it without calling a developer",
      ],
    },
    deliver: [
      "Company websites",
      "Campaign landing pages",
      "Online stores",
      "Website redesigns",
      "Technical & on-page SEO",
      "WhatsApp, payment gateway, and analytics integration",
    ],
    benefits: [
      { title: "Get found faster.", body: "SEO structure built in from day one." },
      { title: "Get more inquiries.", body: "Every page has a clear CTA and form." },
      { title: "Manage it yourself.", body: "A CMS you can update without code." },
    ],
    process: [
      { title: "Discovery call", body: "We agree on your goals, your audience, and the pages you need." },
      { title: "Sitemap & wireframes", body: "You approve the structure before any design work starts." },
      { title: "Design & build", body: "We design key pages, then build them responsive and fast." },
      { title: "SEO & testing", body: "We set up on-page SEO and test speed, forms, and every device." },
      { title: "Launch & handover", body: "We go live and show your team how to update the CMS." },
    ],
    packages: {
      rows: [
        { name: "Starter", bestFor: "New businesses, landing pages", included: "1–3 pages, responsive, contact form", price: "From IDR 3.5M" },
        { name: "Business", bestFor: "Company websites", included: "Up to 10 pages, CMS, basic SEO, blog", price: "From IDR 8.5M" },
        { name: "Custom", bestFor: "E-commerce & custom features", included: "Scoped to your needs, system integrations", price: "Let's talk" },
      ],
      note: "All packages include a domain and hosting for the first year, SSL, and a 30-day bug-fix warranty.",
    },
    techStack: ["Next.js", "WordPress", "Laravel", "Tailwind CSS", "Google Analytics", "Cloudflare"],
    faqs: [
      {
        q: "How long does it take to build a website?",
        a: "Starter sites usually take 2–3 weeks and Business sites 4–6 weeks. We confirm the exact timeline in your written quote.",
      },
      { q: "Can I edit the content myself?", a: "Yes. Business and Custom packages include a CMS, and we walk your team through it at handover." },
      { q: "Are domain and hosting included?", a: "Yes. All packages include a domain and hosting for the first year, plus SSL." },
      {
        q: "What if I already have a website?",
        a: "We can redesign it, move your existing content across, and keep your domain so you don't start from zero.",
      },
      {
        q: "Can you guarantee a first-page ranking on Google?",
        a: "No one can honestly guarantee rankings. We build the SEO foundations that give your pages the best chance, and show you how to track progress.",
      },
    ],
    related: ["ui-ux-design", "app-development", "it-support"],
  },
  {
    slug: "app-development",
    name: "Web & Mobile Apps",
    short: "Custom apps for your operations, your customers, or your next digital product.",
    icon: "smartphone",
    image: { src: "/images/services/app-development.webp", alt: "Mobile app dashboard on a smartphone" },
    keyword: "custom app development",
    needs: ["automate"],
    scope: ["Internal operations apps", "Customer-facing mobile apps", "Integrations with your existing tools"],
    startingFrom: "IDR 25M",
    meta: {
      title: "Custom App Development | Daberau",
      description: "Custom apps for your operations, your customers, or your next digital product.",
    },
    hero: {
      h1: "Custom apps built around the way your business works",
      sub: "Custom apps for your operations, your customers, or your next digital product.",
      cta: { label: "Talk to Us About Web & Mobile Apps", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does this *sound like you?*",
      points: [
        "Your team re-types the same data into spreadsheets, chat, and accounting every day",
        "Off-the-shelf software forces you to change how you work, or costs more each month",
        "Customers can't order, book, or check status without calling you",
      ],
    },
    deliver: [
      "Internal operations apps (inventory, sales, HR)",
      "Customer-facing iOS & Android apps",
      "Web portals & dashboards",
      "Booking, ordering & payment systems",
      "Integrations with accounting, ERP & WhatsApp",
      "Rebuilds of legacy systems",
    ],
    benefits: [
      { title: "Hours back every week.", body: "Repetitive data entry and manual reports are automated." },
      { title: "One source of truth.", body: "Every branch and team works from the same live data." },
      { title: "Built to grow with you.", body: "Start with the features that matter now and add more later." },
    ],
    process: [
      { title: "Discovery workshop", body: "We map your current workflow and agree on what the first version must do." },
      { title: "Clickable prototype", body: "You test the screens with your team before development starts." },
      { title: "Build in sprints", body: "Two-week sprints with a working demo at the end of each one." },
      { title: "Test & roll out", body: "User testing, data migration, and training for your team." },
      { title: "Support & improve", body: "Monitoring, fixes, and new features as your needs change." },
    ],
    packages: {
      rows: [
        { name: "MVP", bestFor: "Testing a new product idea", included: "Core features, one platform, admin panel", price: "From IDR 25M" },
        { name: "Business App", bestFor: "Internal operations or customer apps", included: "Web + mobile, roles & permissions, integrations", price: "From IDR 60M" },
        { name: "Enterprise", bestFor: "Complex, multi-branch systems", included: "Scoped to your needs, ERP integration, SLA", price: "Let's talk" },
      ],
      note: "All packages include source code ownership after full payment and a 30-day bug-fix warranty.",
    },
    techStack: ["React", "Next.js", "Flutter", "Laravel", "Node.js", "PostgreSQL"],
    faqs: [
      {
        q: "How long does it take to build an app?",
        a: "An MVP usually takes 6–10 weeks. Larger business apps take 3–6 months, delivered in stages so you can start using parts of it early.",
      },
      {
        q: "Do I need both a web app and a mobile app?",
        a: "Not always. For internal tools, a mobile-friendly web app is often enough. We'll recommend the simplest option that fits how your team works.",
      },
      { q: "Will I own the source code?", a: "Yes. Ownership of the source code transfers to you once all payments are complete." },
      {
        q: "Can the app connect to the software we already use?",
        a: "Usually, yes. We regularly integrate with accounting software, ERPs, payment gateways, and WhatsApp.",
      },
      {
        q: "What happens after the app launches?",
        a: "You get a 30-day bug-fix warranty. After that, a monthly maintenance plan covers updates, monitoring, and small changes.",
      },
    ],
    related: ["ui-ux-design", "cloud-infrastructure", "it-consulting"],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    short: "Interfaces people find easy to use, validated before a single line of code.",
    icon: "pen",
    image: { src: "/images/services/ui-ux-design.webp", alt: "Website wireframes and UI sketches in a notebook" },
    keyword: "UI/UX design services",
    needs: ["found-online"],
    scope: ["User research & interviews", "Wireframes & clickable prototypes", "Usability testing"],
    startingFrom: "IDR 7.5M",
    meta: {
      title: "UI/UX Design Services | Daberau",
      description: "Interfaces people find easy to use, validated before a single line of code.",
    },
    hero: {
      h1: "Digital products people find easy to use from version one",
      sub: "Interfaces people find easy to use, validated before a single line of code.",
      cta: { label: "Talk to Us About UI/UX Design", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does this *sound like you?*",
      points: [
        "Users sign up, get confused, and never come back",
        "Your team argues about the design, and every change means rework",
        "Developers are building screens nobody has tested with real users",
      ],
    },
    deliver: [
      "User research & interviews",
      "UX audits of existing products",
      "Wireframes & user flows",
      "Clickable prototypes",
      "Visual UI design & design systems",
      "Usability testing",
    ],
    benefits: [
      { title: "Fewer costly rebuilds.", body: "Problems are found in a prototype, not after launch." },
      { title: "Higher conversion.", body: "Clear flows help more visitors finish signing up or buying." },
      { title: "Faster development.", body: "Developers get ready-to-build screens and a design system." },
    ],
    process: [
      { title: "Research", body: "Interviews and data review to understand your users and goals." },
      { title: "Wireframes", body: "Low-fidelity layouts of the key screens and flows." },
      { title: "Prototype", body: "A clickable prototype that looks and feels like the real product." },
      { title: "Test & refine", body: "Usability tests with real users, then improvements." },
      { title: "Handoff", body: "Final designs, a design system, and specs for your developers." },
    ],
    packages: {
      rows: [
        { name: "UX Audit", bestFor: "Existing websites or apps", included: "Expert review, usability issues, prioritized fixes", price: "From IDR 7.5M" },
        { name: "Design Sprint", bestFor: "Validating a new idea fast", included: "Research, prototype, and user testing in 1–2 weeks", price: "From IDR 15M" },
        { name: "Full Product Design", bestFor: "New apps and platforms", included: "Research to final UI, design system, dev handoff", price: "Let's talk" },
      ],
      note: "All packages include editable Figma files and two rounds of revisions per phase.",
    },
    techStack: ["Figma", "FigJam", "Maze", "Hotjar", "Google Analytics", "Miro"],
    faqs: [
      {
        q: "What's the difference between UI and UX?",
        a: "UX is how the product works: the flows, structure, and ease of use. UI is how it looks: layout, colors, and typography. We design both together.",
      },
      {
        q: "Do you test designs with real users?",
        a: "Yes. We test prototypes with people who match your target users before anything goes to development.",
      },
      { q: "Can you work with our in-house developers?", a: "Of course. We hand over Figma files, a design system, and specs, and stay available for questions during the build." },
      { q: "Will we get the design files?", a: "Yes. You receive the editable Figma files once the project is paid in full." },
      { q: "How long does a design project take?", a: "A UX audit takes about 1 week. Full product design usually takes 4–8 weeks, depending on the number of screens." },
    ],
    related: ["web-development", "app-development", "it-consulting"],
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud & Infrastructure",
    short: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
    icon: "cloud",
    image: { src: "/images/services/cloud-infrastructure.webp", alt: "Connected cloud network illustration" },
    keyword: "cloud migration / managed servers",
    needs: ["stable"],
    scope: ["Cloud migration & hosting", "Server setup & hardening", "Automated backups & monitoring"],
    startingFrom: "IDR 1.5M/month",
    meta: {
      title: "Cloud Migration & Managed Servers | Daberau",
      description: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
    },
    hero: {
      h1: "Infrastructure that stays stable, secure, and ready to scale",
      sub: "Servers, hosting, cloud migration, and backups that stay secure and monitored.",
      cta: { label: "Talk to Us About Cloud & Infrastructure", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does this *sound like you?*",
      points: [
        "Your website or system goes down, and you find out from customers",
        "Backups are manual, and no one has ever tested restoring them",
        "Server costs keep rising, but nobody knows what you're paying for",
      ],
    },
    deliver: [
      "Cloud migration (AWS, Google Cloud, local providers)",
      "Server setup & security hardening",
      "Managed hosting",
      "Automated backups & disaster recovery",
      "24/7 uptime monitoring & alerts",
      "Cost review & optimization",
    ],
    benefits: [
      { title: "Fewer outages.", body: "Monitoring alerts us before your customers notice." },
      { title: "Data you can recover.", body: "Daily automated backups, with restores tested regularly." },
      { title: "Predictable costs.", body: "A right-sized setup and a clear monthly bill." },
    ],
    process: [
      { title: "Assessment", body: "We review your current servers, costs, and risks." },
      { title: "Architecture plan", body: "A recommended setup with costs, timeline, and migration steps." },
      { title: "Setup & migration", body: "We build the new environment and move your data with minimal downtime." },
      { title: "Monitor & maintain", body: "Ongoing monitoring, updates, backups, and monthly reports." },
    ],
    packages: {
      rows: [
        { name: "Managed Server", bestFor: "Websites and small systems", included: "Hosting, monitoring, daily backups, updates", price: "From IDR 1.5M/month" },
        { name: "Cloud Setup", bestFor: "New projects", included: "Architecture, setup, security hardening, documentation", price: "From IDR 5M" },
        { name: "Migration Project", bestFor: "Moving existing systems", included: "Assessment, migration plan, cutover, and support", price: "Let's talk" },
      ],
      note: "Cloud provider fees are billed at cost and shown separately in your quote.",
    },
    techStack: ["AWS", "Google Cloud", "Docker", "Linux", "Cloudflare", "Grafana"],
    faqs: [
      {
        q: "Will my website go down during the migration?",
        a: "We plan migrations to keep downtime minimal, usually a few minutes, and schedule the switch outside your business hours.",
      },
      {
        q: "Where will my data be stored?",
        a: "You choose. We work with global providers and providers with data centers in Indonesia, depending on your needs and regulations.",
      },
      { q: "How often are backups made?", a: "Daily by default, kept for at least 30 days. We can set a more frequent schedule for critical systems." },
      { q: "Do we get access to our own servers?", a: "Yes. Accounts are created in your company's name, and you keep full access at all times." },
      {
        q: "What if something goes wrong at night?",
        a: "Monitoring runs 24/7 and alerts our on-call engineer. Response times depend on your plan and are written into your agreement.",
      },
    ],
    related: ["it-support", "it-consulting", "app-development"],
  },
  {
    slug: "it-support",
    name: "IT Support & Maintenance",
    short: "A team on standby for fixes, updates, and system monitoring.",
    icon: "wrench",
    image: { src: "/images/services/it-support.webp", alt: "IT engineer monitoring systems in a server room" },
    keyword: "managed IT support",
    needs: ["stable"],
    scope: ["Helpdesk & on-call fixes", "Updates & security patches", "System monitoring & monthly reports"],
    startingFrom: "IDR 1.5M/month",
    meta: {
      title: "Managed IT Support & Maintenance | Daberau",
      description: "A team on standby for fixes, updates, and system monitoring.",
    },
    hero: {
      h1: "Your IT team, without the hiring",
      sub: "A team on standby for fixes, updates, and system monitoring.",
      cta: { label: "Talk to Us About IT Support & Maintenance", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does this *sound like you?*",
      points: [
        "When something breaks, you don't know who to call",
        "Your website and systems haven't been updated in months",
        "A freelancer built your system, and now they're hard to reach",
      ],
    },
    deliver: [
      "Helpdesk via WhatsApp, email & phone",
      "Website & application maintenance",
      "Security updates & patching",
      "Uptime & performance monitoring",
      "Small changes & content updates",
      "Monthly health reports",
    ],
    benefits: [
      { title: "Fast answers.", body: "One support channel and a team that knows your systems." },
      { title: "Fewer surprises.", body: "Regular updates and monitoring catch issues early." },
      { title: "Lower cost than hiring.", body: "A whole team for less than one full-time IT employee." },
    ],
    process: [
      { title: "System check", body: "We audit your websites, apps, and servers and document everything." },
      { title: "Plan & onboarding", body: "We agree on response times and set up your support channel." },
      { title: "Ongoing support", body: "Fixes, updates, and small changes, handled as they come in." },
      { title: "Monthly review", body: "A report on uptime, issues fixed, and what to improve next." },
    ],
    packages: {
      rows: [
        { name: "Basic", bestFor: "One website or small system", included: "Updates, backups, monitoring, 4 support hours/month", price: "From IDR 1.5M/month" },
        { name: "Business", bestFor: "Multiple systems", included: "Priority response, 12 support hours/month, monthly report", price: "From IDR 4M/month" },
        { name: "Dedicated", bestFor: "Critical operations", included: "Agreed SLA, on-site visits, dedicated engineer", price: "Let's talk" },
      ],
      note: "Unused support hours don't roll over. Extra hours are billed at the rate in your agreement.",
    },
    techStack: ["WordPress", "Laravel", "Linux", "Cloudflare", "UptimeRobot", "Google Workspace"],
    faqs: [
      {
        q: "Can you support a system another vendor built?",
        a: "Yes. We start with a system check to understand the code and setup, then take it over safely.",
      },
      {
        q: "How fast do you respond?",
        a: "During business hours, Business plan clients get a first response within 4 business hours. Exact response times are written into your plan.",
      },
      { q: "Do you offer on-site support?", a: "Yes, in Jakarta and surrounding areas, on the Dedicated plan or as an add-on." },
      { q: "Is there a minimum contract?", a: "Monthly plans start with a 3-month minimum, then continue month to month." },
      { q: "What counts as a support hour?", a: "Any time spent fixing, updating, or changing your systems. Monitoring and backups don't use your hours." },
    ],
    related: ["cloud-infrastructure", "web-development", "it-consulting"],
  },
  {
    slug: "it-consulting",
    name: "IT Consulting & Digital Transformation",
    short: "A clear digital roadmap before you commit a big budget.",
    icon: "compass",
    image: { src: "/images/services/it-consulting.webp", alt: "Team reviewing business charts in a meeting" },
    keyword: "IT consulting services",
    needs: ["automate"],
    scope: ["IT audit & assessment", "Digital roadmap & budgeting", "Vendor & technology selection"],
    startingFrom: "IDR 5M",
    meta: {
      title: "IT Consulting Services | Daberau",
      description: "A clear digital roadmap before you commit a big budget.",
    },
    hero: {
      h1: "A clear digital roadmap before you invest",
      sub: "A clear digital roadmap before you commit a big budget.",
      cta: { label: "Talk to Us About IT Consulting & Digital Transformation", href: "/consultation" },
      micro: "We'll send a cost estimate within one business day.",
    },
    problem: {
      title: "Does this *sound like you?*",
      points: [
        "You know you need to go digital, but not where to start",
        "Every vendor recommends something different, and all of them sound expensive",
        "You've paid for software your team doesn't actually use",
      ],
    },
    deliver: [
      "IT audit & assessment",
      "Digital transformation roadmap",
      "Budget & ROI planning",
      "Vendor & software selection",
      "Requirements & tender documents",
      "Project oversight on your side",
    ],
    benefits: [
      { title: "Spend on what matters.", body: "A prioritized plan stops money going to the wrong tools." },
      { title: "Decide with confidence.", body: "Clear options, costs, and trade-offs in plain language." },
      { title: "An advisor on your side.", body: "Independent advice, even when another vendor builds it." },
    ],
    process: [
      { title: "Interviews", body: "We talk to owners and key staff about goals and daily problems." },
      { title: "Assessment", body: "We review your current systems, data, and costs." },
      { title: "Roadmap", body: "A step-by-step plan with priorities, budget, and timeline." },
      { title: "Support delivery", body: "Optional help choosing vendors and overseeing the work." },
    ],
    packages: {
      rows: [
        { name: "IT Health Check", bestFor: "Small businesses", included: "Assessment of current systems, risks, and quick wins", price: "From IDR 5M" },
        { name: "Digital Roadmap", bestFor: "Growing companies", included: "Interviews, assessment, 12-month roadmap and budget", price: "From IDR 15M" },
        { name: "Ongoing Advisory", bestFor: "Companies without a CTO", included: "Monthly strategy sessions and vendor oversight", price: "From IDR 7.5M/month" },
      ],
      note: "Consulting fees can be credited toward a build project with Daberau within 3 months.",
    },
    techStack: ["Google Workspace", "Microsoft 365", "Odoo", "Jurnal", "Power BI", "Notion"],
    faqs: [
      {
        q: "Do we have to build with Daberau after the roadmap?",
        a: "No. The roadmap is yours to use with any vendor. If you do build with us, part of the fee can be credited.",
      },
      { q: "How long does a roadmap take?", a: "Usually 2–4 weeks, depending on the size of your company and the number of people we interview." },
      {
        q: "Can you help us choose between vendors?",
        a: "Yes. We help you write requirements, compare proposals, and ask the right questions before you sign.",
      },
      {
        q: "Is this only for big companies?",
        a: "No. Most of our consulting clients are small and mid-sized businesses without an in-house IT team.",
      },
      { q: "What do we receive at the end?", a: "A written report and roadmap, plus a presentation session with your leadership team." },
    ],
    related: ["app-development", "cloud-infrastructure", "ui-ux-design"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceBySlug = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;

/** Section headings for the 11-section service detail template (shared by all services) */
export const serviceTemplate = {
  problemSub: "If any of these hit close to home, you're in the right place.",
  deliver: { title: "Everything we can *take off your plate*", sub: "Pick what you need now. Add more as your business grows." },
  benefits: { title: "What changes for *your business*", sub: "The results our clients care about most." },
  process: { title: "How we'll *get it done*", sub: "A clear path from kickoff to launch, with your review at every stage." },
  packages: { title: "Pick a package *that fits*", sub: "Transparent starting prices. Your final quote is itemized and always free." },
  tech: { title: "Built with *tools that last*", sub: "Proven, well-supported technology your team won't outgrow." },
  faq: { title: "Still have *questions?*", sub: "Here are the ones we hear most." },
  related: { title: "Often *paired with*", sub: "Services clients commonly combine with this one." },
  closing: {
    headline: "Ready to get *your IT sorted?*",
    sub: "Tell us what's slowing you down. We'll reply within one business day with a recommendation and a free estimate.",
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
  grid: {
    title: "What do you need *help with?*",
    sub: "Pick what fits your situation, and we'll show you where to start.",
  },
  bundled: {
    title: "Need more than one thing fixed?",
    sub: "Bundle services under one contract and one project manager. Less back-and-forth, faster results.",
  },
  tech: {
    title: "The *right tools,* not the trendy ones",
    sub: "We pick technology based on what your business needs and what your team can maintain.",
    items: ["React", "Next.js", "Laravel", "Flutter", "WordPress", "Figma", "AWS", "Google Cloud", "Docker", "PostgreSQL", "MySQL", "Cloudflare"],
  },
  faqTitle: "Questions we *hear a lot*",
  faqSub: "Short answers to what most clients ask before getting started.",
  faqs: [
    {
      q: "Can I start with just one service?",
      a: "Yes. Many clients start with a website or a support plan and add services later, with the same team.",
    },
    {
      q: "Do you work with businesses that don't have an IT team?",
      a: "That's who we work with most. We explain options in plain language and handle the technical side for you.",
    },
    {
      q: "How do you price your services?",
      a: "Every quote is itemized by phase, so you see exactly what you pay for before work starts.",
    },
    {
      q: "What happens after my project launches?",
      a: "You get a 30-day bug-fix warranty, and you can move on to a monthly maintenance plan.",
    },
    {
      q: "Can you work with our existing systems or vendor?",
      a: "Yes. We start with a short review of what you already have and build on it where it makes sense.",
    },
  ] as Faq[],
};

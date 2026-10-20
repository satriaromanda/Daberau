import type { IconName } from "./types";

export const home = {
  hero: {
    eyebrow: "IT services for businesses ready to grow",
    h1: "One partner for every IT need your business has",
    sub: "From websites and apps to servers and day-to-day support, we design, build, and maintain your digital systems with one dedicated team.",
    primary: { label: "Get a Free Consultation", href: "/consultation" },
    secondary: { label: "See Our Work", href: "/case-studies" },
    micro: "Free and no commitment. We reply within one business day.",
    visualLabel: "Client dashboard mockup",
  },
  trust: {
    label: "Trusted by businesses and institutions across industries",
    logoCount: 8,
  },
  pain: {
    title: "Does any of this sound like your business?",
    sub: "Most of our clients came to us with at least one of these.",
    cards: [
      {
        icon: "search-x",
        title: "Your website looks good, but nobody calls.",
        body: "Visitors can't find you on Google, and the few who do leave before getting in touch.",
      },
      {
        icon: "spreadsheet",
        title: "Your team still does it by hand.",
        body: "Numbers live in spreadsheets and chat threads, so reports run late and the same mistakes return.",
      },
      {
        icon: "server-crash",
        title: "Something breaks, and nobody answers.",
        body: "The server goes down or data disappears, right when you need it most.",
      },
      {
        icon: "signpost",
        title: "You're not sure where to begin.",
        body: "Every vendor speaks a different jargon, and your budget can't afford a wrong guess.",
      },
    ] as { icon: IconName; title: string; body: string }[],
    closing: "The good news? Every one of these can be fixed, one step at a time.",
  },
  services: {
    title: "What we do",
    sub: "Pick one service or combine several. The same team handles everything.",
    cta: { label: "Explore All Services", href: "/services" },
  },
  why: {
    title: "Why businesses choose to work with us",
    points: [
      { title: "One team, one point of contact.", body: "No juggling vendors. A single project manager owns your project from kickoff to launch." },
      { title: "Clear pricing from day one.", body: "Itemized quotes for every phase, with no hidden fees." },
      { title: "Progress you can see.", body: "Weekly updates and access to the project board." },
      { title: "We don't disappear after launch.", body: "A [X]-day bug-fix warranty and monthly maintenance plans." },
    ],
  },
  featured: {
    title: "Real results for real clients",
    cta: { label: "View All Case Studies", href: "/case-studies" },
  },
  process: {
    title: "From idea to launch in 5 steps",
    link: { label: "See how we work →", href: "/how-we-work" },
  },
  testimonials: { title: "What our clients say" },
  insights: {
    title: "Insights for smarter IT decisions",
    cta: { label: "Read All Insights", href: "/insights" },
  },
  closing: {
    headline: "Ready to get your IT sorted?",
    sub: "Tell us what you need. We'll send a recommendation and an initial estimate, free of charge.",
  },
};

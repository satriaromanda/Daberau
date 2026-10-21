import type { Cta, Stat } from "./types";

export const microcopy = {
  ctaPrimary: "Get a Free Consultation",
  exploreServices: "Explore Services",
  emailUs: "Email Us",
  serviceCta: "Talk to Us About [Service]",
  sendRequest: "Send Request",
  reassurance: "Free and no commitment. We reply within one business day.",
  companyProfile: "Download Company Profile (PDF, 3 MB)",
  learnMore: "Learn more →",
  budgetTooltip: "A rough range is fine. It helps us suggest the right solution.",
  errorSummary: "A few fields need your attention. Please check the highlighted fields.",
  notFound: {
    title: "We can't find that page.",
    body: "It may have moved.",
    primary: { label: "Back to Home", href: "/" },
    secondary: { label: "Explore Services", href: "/services" },
  },
  loading: "Loading…",
} as const;

/**
 * WhatsApp is switched off: the mockup shows no WhatsApp buttons. The WordPress theme keeps an optional
 * "Show WhatsApp buttons" setting (Customizer → Daberau, off by default) that uses this copy.
 */
export const whatsapp = {
  enabled: false,
  label: "Chat on WhatsApp",
  tooltip: "Questions? Chat with our team.",
  prefill: "Hi Daberau, I'd like to discuss a project.",
  contactOption: { title: "Quick question?", body: "Chat with our team during business hours." },
  infoLabel: "WhatsApp",
};

const address = "Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840";

export const site = {
  brand: "Daberau",
  legalName: "PT Daberau Mikro Elit",
  domain: "daberau-me.com",
  email: "cs@daberau-me.com",
  phone: "+62 21 5431 6725",
  phoneHref: "tel:+622154316725",
  address,
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
  hours: "Mon–Fri, 9 AM–5 PM WIB",
  hoursLong: "Mon–Fri, 9 AM–5 PM (WIB, GMT+7)",
  // Spec asks for a footer tagline without giving one; the homepage H1 is reused.
  tagline: "One partner for every IT need your business has.",
  copyright: "© 2026 Daberau. All rights reserved.",
  // Add each profile URL to show its icon in the footer; empty entries are hidden.
  socials: [
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "Instagram", href: "", icon: "instagram" },
    { label: "Facebook", href: "", icon: "facebook" },
    { label: "YouTube", href: "", icon: "youtube" },
  ] as const,
};

export const primaryCta: Cta = { label: microcopy.ctaPrimary, href: "/contact#contact-form" };

export const nav = {
  links: [
    { label: "Industries", href: "/industries" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],
  servicesLabel: "Services",
  allServices: { label: "Explore All Services", href: "/services" },
  megaPromo: {
    title: "Not sure what you need?",
    body: "Tell us the problem. We'll map out the right solution. Free, 30 minutes.",
    cta: { label: "Book a Consultation →", href: "/contact#contact-form" },
  },
  stickyCta: { label: "Free Consultation", href: "/contact#contact-form" },
};

export const footer = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "How We Work", href: "/how-we-work" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

export const preFooter = {
  title: "Have an IT project you want to get moving?",
  body: "Your first consultation is free. We reply within one business day.",
};

export const cookies = {
  banner: "We use cookies to understand how our site is used and to improve your experience.",
  acceptAll: "Accept All",
  manage: "Manage Preferences",
  modalTitle: "Cookie preferences",
  categories: [
    { id: "essential", label: "Essential", locked: true, lockedLabel: "(always on)" },
    { id: "analytics", label: "Analytics", locked: false },
    { id: "marketing", label: "Marketing", locked: false },
  ],
  save: "Save Preferences",
};

/** Shared by the homepage and About Us ("use the same statistics as the homepage"). */
export const stats: Stat[] = [
  { value: "100+", label: "Projects delivered" },
  { value: "30+", label: "Active clients" },
  { value: "8+ years", label: "Team experience" },
  { value: "85%", label: "Clients who come back" },
];

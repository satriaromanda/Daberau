import type { Cta, Stat } from "./types";

/** Set once the business WhatsApp number is confirmed, digits only with country code, e.g. "6281234567890". */
export const WHATSAPP_NUMBER = "";

export const microcopy = {
  ctaPrimary: "Get a Free Consultation",
  exploreServices: "Explore Services",
  chatWhatsApp: "Chat on WhatsApp",
  serviceCta: "Talk to Us About [Service]",
  sendRequest: "Send Request",
  bookConsultation: "Book My Consultation",
  reassurance: "Free and no commitment. We reply within one business day.",
  companyProfile: "Download Company Profile (PDF, 3 MB)",
  learnMore: "Learn more →",
  whatsappPrefill: "Hi Daberau, I'm [name] from [company]. I'd like to discuss…",
  budgetTooltip: "A rough range is fine. It helps us suggest the right solution.",
  errorSummary: "A few fields need your attention. Please check the highlighted fields.",
  notFound: {
    title: "We can't find that page.",
    body: "It may have moved.",
    primary: { label: "Back to Home", href: "/" },
    secondary: { label: "Explore Services", href: "/services" },
  },
  newsletterSuccess: "You're in! Check your inbox to confirm your subscription.",
  whatsappTooltip: "Questions? Chat with our team.",
  loading: "Loading…",
} as const;

export const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(microcopy.whatsappPrefill)}`
  : `https://wa.me/?text=${encodeURIComponent(microcopy.whatsappPrefill)}`;

const address = "Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840";

export const site = {
  brand: "Daberau",
  legalName: "PT Daberau Mikro Elit",
  domain: "daberau-me.com",
  email: "cs@daberau-me.com",
  phone: "+62 21 5431 6725",
  phoneHref: "tel:+622154316725",
  whatsappDisplay: "[WhatsApp number]",
  whatsappHref,
  address,
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  // Business hours are still TBD with the client: rendered with the placeholder highlight.
  hours: "Mon–Fri, 9 AM–5 PM WIB",
  hoursLong: "Mon–Fri, 9 AM–5 PM (WIB, GMT+7)",
  hoursPending: true,
  // Spec asks for a footer tagline without giving one; the homepage H1 is reused.
  tagline: "One partner for every IT need your business has.",
  copyright: "© 2026 Daberau. All rights reserved.",
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ] as const,
};

export const primaryCta: Cta = { label: microcopy.ctaPrimary, href: "/consultation" };
export const whatsappCta: Cta = { label: microcopy.chatWhatsApp, href: whatsappHref, external: true };

export const nav = {
  links: [
    { label: "About Us", href: "/about-us" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Contact", href: "/contact" },
  ],
  servicesLabel: "Services",
  allServices: { label: "Explore All Services", href: "/services" },
  megaPromo: {
    title: "Not sure what you need?",
    body: "Tell us the problem. We'll map out the right solution. Free, 30 minutes.",
    cta: { label: "Book a Consultation →", href: "/consultation" },
  },
  stickyCta: { label: "Free Consultation", href: "/consultation" },
};

export const footer = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Pricing", href: "/pricing" },
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
  newsletter: {
    title: "Newsletter",
    body: "IT tips for growing businesses, once a month. No spam.",
    placeholder: "name@company.com",
    button: "Subscribe",
    consent: "I'd like to receive occasional emails from Daberau. Unsubscribe anytime.",
    emailError: "Please enter a valid email, e.g. name@company.com",
  },
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
  { value: "[X]+", label: "Projects delivered" },
  { value: "[X]+", label: "Active clients" },
  { value: "[X] years", label: "Team experience" },
  { value: "[X]%", label: "Clients who come back" },
];

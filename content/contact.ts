import type { FormFieldOption } from "./types";
import { services } from "./services";

export const contactPage = {
  meta: {
    title: "Contact Daberau — Free IT Consultation",
    description: "Fill in the form below or reach us however suits you best. We reply within one business day.",
  },
  hero: {
    h1: "Let's talk about your IT needs",
    sub: "Fill in the form below or reach us however suits you best. We reply within one business day.",
  },
  options: [
    {
      title: "Have a project?",
      body: "Fill in the form and we'll send a recommendation and initial estimate.",
      cta: { label: "Fill in the Form ↓", href: "#contact-form" },
      kind: "form",
    },
    {
      title: "Quick question?",
      body: "Chat with our team during business hours.",
      cta: { label: "Chat on WhatsApp", href: "whatsapp" },
      kind: "whatsapp",
    },
    {
      title: "Need urgent support?",
      body: "For active maintenance clients.",
      cta: { label: "Contact Support", href: "tel:+622154316725" },
      kind: "support",
    },
  ],
  formTitle: "Tell us about your project",
  info: {
    title: "Contact info",
    labels: { address: "Address", email: "Email", phone: "Phone", whatsapp: "WhatsApp", hours: "Business hours" },
    mapsLink: "Open in Google Maps",
    micro: "Messages sent outside business hours will be answered the next business day.",
  },
  map: { title: "Our office", label: "Map: Citi Business Park, Kalideres" },
  faq: {
    title: "Quick FAQ",
    items: [
      {
        q: "Is the consultation really free?",
        a: "Yes. The first consultation is free and comes with no obligation to buy.",
        sample: true,
      },
      {
        q: "How soon will I get a quote?",
        a: "We reply within one business day. For most projects, we send an initial estimate right after the consultation.",
        sample: true,
      },
      {
        q: "Can we meet in person?",
        a: "Of course. You're welcome at our office in Kalideres, West Jakarta, or we can meet online.",
        sample: true,
      },
    ],
  },
};

const opt = (label: string): FormFieldOption => ({ value: label, label });

export const leadForm = {
  helper: "Fields marked * are required. Your data is safe and never shared with third parties.",
  selectPlaceholder: "Select an option",
  fields: {
    name: { label: "Full name", placeholder: "e.g. John Smith", error: "Please enter your name." },
    company: { label: "Company name", placeholder: "e.g. Acme Corp (leave blank if individual)" },
    email: { label: "Work email", placeholder: "name@company.com", error: "Please enter a valid email, e.g. name@company.com" },
    whatsapp: { label: "WhatsApp number", placeholder: "+62 812 xxxx xxxx", error: "Please enter an active number with at least 10 digits." },
    service: {
      label: "What do you need help with?",
      error: "Please choose a service.",
      options: [...services.map((s) => opt(s.name)), opt("Not sure yet, I need advice")],
    },
    budget: {
      label: "Estimated budget",
      options: ["Under IDR 10M", "IDR 10–50M", "IDR 50–150M", "Over IDR 150M", "Not sure yet"].map(opt),
    },
    timeline: {
      label: "When would you like to start?",
      options: ["ASAP", "In 1–3 months", "In 3+ months"].map(opt),
    },
    message: {
      label: "Tell us about your project",
      placeholder: "e.g. We need an inventory app for our 3 store branches…",
      error: "Tell us a bit about your needs so we can prepare the right advice.",
    },
    attachment: {
      label: "Attachment (optional)",
      hint: "PDF, DOCX, or images. Max 10 MB",
      error: "This file is too large. The maximum size is 10 MB.",
      button: "Choose file",
      remove: "Remove",
    },
    consent: {
      // Rendered with links on "Privacy Policy" and "Terms & Conditions"
      before: "I agree to the ",
      privacy: "Privacy Policy",
      and: " and ",
      terms: "Terms & Conditions",
      after: ", and consent to being contacted about this inquiry.",
      error: "Please accept the Privacy Policy to continue.",
    },
  },
  submit: "Send Request",
  loading: "Sending…",
  success: {
    title: "Thanks, [Name]! We've received your request.",
    body: "Our team will reach out via WhatsApp or email within one business day. In the meantime, take a look at some of our recent work.",
    primary: { label: "View Case Studies", href: "/case-studies" },
    secondary: { label: "Back to Home", href: "/" },
  },
  failure: {
    title: "Sorry, your message didn't go through.",
    body: "Something went wrong on our end. Your answers are still here, so try again or reach us directly on WhatsApp.",
    retry: "Try Again",
  },
};

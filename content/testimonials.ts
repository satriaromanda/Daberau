import type { Testimonial } from "./types";

// Testimonials stay hidden until real, approved quotes are added (spec: at least 3, with specific results).
// Replace the drafts below with real quotes, names and roles, then set this to true.
export const testimonialsPublished = false;

export const testimonials: Testimonial[] = [
  {
    quote: "Our monthly sales report used to take three days. Now it's ready in ten minutes, and the numbers finally match.",
    name: "[Client name]",
    role: "Operations Manager",
    company: "Regional FMCG distributor",
  },
  {
    quote: "Patients book online now, so the front desk spends less time on the phone. Daberau stayed with us well after launch.",
    name: "[Client name]",
    role: "Clinic Director",
    company: "Multi-branch clinic group",
  },
  {
    quote: "One project manager, weekly updates, and an itemized quote. We always knew where the project stood.",
    name: "[Client name]",
    role: "Owner",
    company: "Home-goods retailer",
  },
];

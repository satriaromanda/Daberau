import type { Faq } from "./types";

export const faqPage = {
  meta: {
    title: "FAQ | Daberau",
    description: "Answers about pricing, payment, project process, technical questions, and support from the Daberau team.",
  },
  h1: "Your questions, answered",
  sub: "Pricing, process, ownership, and support: everything clients usually ask before getting started.",
  bottom: "Can't find your answer? Ask our team directly.",
  // Spec example questions are verbatim; answers and extra questions are sample copy.
  categories: [
    {
      id: "general",
      title: "General",
      items: [
        { q: "Do you work with clients outside your city or country?", a: "Yes. We work with clients across Indonesia and abroad, mostly online, with in-person meetings in Jakarta when needed.", sample: true },
        { q: "What size of business do you usually work with?", a: "Mostly small and mid-sized businesses with 10–200 employees, plus corporate teams, institutions, and startups.", sample: true },
      ],
    },
    {
      id: "pricing",
      title: "Pricing & Payment",
      items: [
        { q: "How much does a website or app cost?", a: "It depends on scope. Websites start from IDR [X] and apps from IDR [X]. Consultations and quotes are always free.", sample: true },
        { q: "How does payment work? (e.g. 50% upfront, 50% on handover)", a: "Unless agreed otherwise, we ask for a [X]% down payment before work starts, and the rest follows the milestones in your proposal.", sample: true },
      ],
    },
    {
      id: "process",
      title: "Project Process",
      items: [
        { q: "Can you take over a project from another vendor?", a: "Yes. We start with a code and infrastructure review, then propose how to continue or fix what's there.", sample: true },
        { q: "How will I know how my project is going?", a: "You get weekly updates and access to the project board from day one.", sample: true },
      ],
    },
    {
      id: "technical",
      title: "Technical",
      items: [
        { q: "Do we own the source code?", a: "Yes. Ownership of the final deliverables, including source code, transfers to you once all payments are complete.", sample: true },
        { q: "Which technologies do you use?", a: "We choose tools based on your needs, not trends. Common choices include Next.js, Laravel, Flutter, and AWS or Google Cloud.", sample: true },
      ],
    },
    {
      id: "support",
      title: "Support & Warranty",
      items: [
        { q: "What happens if we find a bug after launch?", a: "We fix bugs reported within [X] days of launch at no extra cost. After that, a maintenance plan covers fixes and updates.", sample: true },
        { q: "Do you offer ongoing maintenance?", a: "Yes. Monthly maintenance plans cover monitoring, updates, and a set number of support hours.", sample: true },
      ],
    },
  ] as { id: string; title: string; items: Faq[] }[],
};

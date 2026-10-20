import type { LegalDoc } from "./types";

// Structure and opening sentences follow the IA/UX spec. The full text is a plain-English draft based on
// Indonesia's Personal Data Protection Law (UU No. 27 Tahun 2022) and common IT-services terms.
// Have it reviewed by legal counsel before launch, and confirm the commercial terms (down payment,
// quote validity, revisions, warranty) against Daberau's real contracts.

export const legalUi = {
  inShort: "In short",
  contents: "Contents",
  backToTop: "Back to top",
  lastUpdated: "Last updated:",
  effective: "Effective date:",
  contactTitle: "Legal contact",
  managePrefs: "Manage Preferences",
};

export const privacy: LegalDoc & { meta: { title: string; description: string } } = {
  meta: {
    title: "Privacy Policy | Daberau",
    description: "How PT Daberau Mikro Elit collects, uses, and protects your personal data when you visit our website or use our services.",
  },
  h1: "Privacy Policy",
  intro:
    'This Privacy Policy explains how PT Daberau Mikro Elit ("Daberau", "we", "us") collects, uses, and protects your personal data when you visit our website or use our services.',
  lastUpdated: "October 20, 2026",
  effective: "October 20, 2026",
  inShort: [
    "We only collect data you give us or that's needed to run this website.",
    "We use it to respond to you, deliver our services, and improve our site.",
    "We never sell your data.",
    "You can ask us to access, correct, or delete your data at any time.",
  ],
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "PT Daberau Mikro Elit is the data controller responsible for your personal data.",
        "We are a limited liability company registered in Indonesia, with our office at Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840. You can reach us about anything in this policy at cs@daberau-me.com or +62 21 5431 6725.",
        "This policy applies to daberau-me.com, our forms, our WhatsApp and email channels, and the services we provide to clients.",
      ],
    },
    {
      id: "data-we-collect",
      title: "Data we collect",
      body: [
        "We collect information you provide directly and information collected automatically when you use our site.",
        "Information you give us:",
        {
          list: [
            "Contact details: your name, company, work email, and WhatsApp or phone number.",
            "Project details: the service you're interested in, your budget range, timeline, message, and any files you attach.",
          ],
        },
        "Information collected automatically:",
        {
          list: [
            "Technical data such as your IP address, browser type, device, and the pages you visit.",
            "Cookie data, depending on the preferences you choose (see Cookies & analytics).",
          ],
        },
        "If you become a client, we also keep records of our agreement, invoices, and project communication.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use your data",
      body: [
        "We use your data only for the purposes listed below.",
        {
          list: [
            "To reply to your inquiry and send recommendations or quotes.",
            "To plan, deliver, and support the projects you engage us for.",
            "To send invoices and manage payments.",
            "To understand how visitors use our site and improve it, if you've allowed analytics cookies.",
            "To meet our legal, tax, and accounting obligations.",
          ],
        },
        "We don't use your data for automated decision-making that has legal or similarly significant effects on you.",
      ],
    },
    {
      id: "legal-basis",
      title: "Legal basis for processing",
      body: [
        "We process your data only when we have a valid legal basis to do so.",
        "Under the Personal Data Protection Law (UU PDP), we rely on:",
        {
          list: [
            "Your consent, for example when you submit a form or accept analytics cookies.",
            "The performance of a contract, when we prepare a proposal or deliver services you've requested.",
            "A legal obligation, such as keeping financial records.",
            "Our legitimate interests, such as keeping our website secure, as long as these don't override your rights.",
          ],
        },
        "Where we rely on consent, you can withdraw it at any time. This doesn't affect processing that happened before you withdrew it.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & analytics",
      body: [
        "We use cookies to understand how visitors use our website. You can change your preferences at any time.",
        {
          list: [
            "Essential cookies keep the site working, for example by remembering your cookie choices. They're always on.",
            "Analytics cookies (such as Google Analytics) tell us which pages are visited and how people find us. They're only set if you allow them.",
            "Marketing cookies help us measure our advertising. They're only set if you allow them.",
          ],
        },
        "You can also block or delete cookies in your browser settings. Blocking essential cookies may affect how the site works.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing your data",
      body: [
        "We share data only with trusted providers who help us run our business, and never sell it.",
        "These providers include:",
        {
          list: [
            "Hosting and cloud providers that store our website and systems.",
            "Email, messaging, and customer relationship (CRM) tools we use to reply to you.",
            "Analytics tools, if you've allowed analytics cookies.",
            "Payment and accounting providers, for clients.",
          ],
        },
        "Each provider may only use your data to deliver their service to us, under a written agreement. We may also share data when the law requires it, for example at the request of a competent authority.",
      ],
    },
    {
      id: "international-transfers",
      title: "International transfers",
      body: [
        "Some of our providers may store data outside Indonesia. When this happens, we make sure appropriate safeguards are in place.",
        "We only transfer data to countries or providers that offer a level of protection equal to or higher than the PDP Law, or under contractual safeguards that meet its requirements.",
      ],
    },
    {
      id: "retention",
      title: "Data retention",
      body: [
        "We keep your data only as long as needed for the purposes described here.",
        {
          list: [
            "Inquiries that don't become projects: up to 2 years after our last contact.",
            "Client and contract records: for the duration of the project and as long as tax and accounting laws require afterwards.",
            "Analytics data: up to 14 months.",
          ],
        },
        "When data is no longer needed, we delete it or make it anonymous.",
      ],
    },
    {
      id: "security",
      title: "Data security",
      body: [
        "We use technical and organizational measures to protect your data.",
        "These include encrypted connections (HTTPS), access controls so only staff who need data can see it, regular software updates, and backups. If a data breach could put your rights at risk, we'll notify you and the relevant authority as required by law.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        "You have the right to access, correct, or delete your personal data. To make a request, email us at cs@daberau-me.com.",
        "Under the PDP Law, you can also:",
        {
          list: [
            "Withdraw your consent at any time.",
            "Object to or ask us to restrict certain processing.",
            "Ask for a copy of your data in a commonly used format.",
            "Complain to the relevant data protection authority.",
          ],
        },
        "We may ask you to confirm your identity before acting on a request. We'll respond within the time required by law, and in any case within 14 days.",
      ],
    },
    {
      id: "client-project-data",
      title: "Client project data",
      body: [
        "When we work on your systems, we handle any data we access according to our agreement with you.",
        "In those cases you remain the data controller and we act as a data processor. We only access data needed for the work, keep it confidential, and return or delete it when the engagement ends, unless the law requires us to keep it.",
      ],
    },
    {
      id: "childrens-privacy",
      title: "Children's privacy",
      body: [
        "Our services are not intended for children, and we don't knowingly collect their data.",
        "If you believe a child has sent us personal data, please contact us and we'll delete it.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If we make significant changes, we'll update the date above and notify you where appropriate.",
        "We keep previous versions of this policy and can share them on request.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        "Questions about this policy? Contact us at cs@daberau-me.com.",
        "You can also write to us at PT Daberau Mikro Elit, Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840, or call +62 21 5431 6725.",
      ],
    },
  ],
};

export const terms: LegalDoc & { meta: { title: string; description: string } } = {
  meta: {
    title: "Terms & Conditions | Daberau",
    description: "The terms that govern your use of the Daberau website and the services we provide.",
  },
  h1: "Terms & Conditions",
  intro:
    "These Terms govern your use of the Daberau website and the services we provide. By using our website or engaging our services, you agree to these Terms.",
  lastUpdated: "October 20, 2026",
  effective: "October 20, 2026",
  inShort: [
    "Project scope, price, and timeline are set in a written proposal or contract.",
    "Payment follows the agreed schedule (for example, a down payment before work starts).",
    "You own the final deliverables once paid in full.",
    "We offer a bug-fix warranty for a set period after launch.",
  ],
  sections: [
    {
      id: "definitions",
      title: "Definitions",
      body: [
        "In these Terms, the following words have the meanings below.",
        {
          list: [
            '"Daberau", "we", "us": PT Daberau Mikro Elit.',
            '"Client", "you": the person or company that uses our website or engages our services.',
            '"Services": the IT services we provide, such as web and app development, design, cloud, support, and consulting.',
            '"Deliverables": the designs, code, documents, and other work we produce for you.',
            '"Proposal": our written offer describing scope, price, and timeline.',
            '"Agreement": the signed proposal or contract for a specific project, together with these Terms.',
          ],
        },
      ],
    },
    {
      id: "use-of-website",
      title: "Use of the website",
      body: [
        "You may use this website for lawful purposes only.",
        "You agree not to try to break, overload, or gain unauthorized access to the site, and not to copy its content for commercial use without our permission. Information on the site is general and may change; it isn't a binding offer until confirmed in a Proposal.",
      ],
    },
    {
      id: "our-services",
      title: "Our services",
      body: [
        "The specific scope of each project is defined in a written proposal or agreement.",
        "These Terms apply to every engagement. If the Agreement for a project says something different, the Agreement takes priority for that project.",
      ],
    },
    {
      id: "quotes",
      title: "Quotes & proposals",
      body: [
        "Quotes are valid for 14 days unless stated otherwise.",
        "Your price depends on the agreed scope and is set out in your Proposal. Any estimate shared before a Proposal is indicative only.",
      ],
    },
    {
      id: "payment",
      title: "Payment terms",
      body: [
        "Unless agreed otherwise, a 50% down payment is required before work begins.",
        "The remaining balance is paid according to the milestones in your Agreement, usually on handover or launch. Invoices are due within 14 days. Prices exclude VAT (PPN) and other taxes unless stated otherwise.",
        "If a payment is more than 30 days late, we may pause work until it's settled, and the timeline will shift accordingly.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "Client responsibilities",
      body: [
        "To keep your project on schedule, we rely on you to provide content, access, and feedback on time.",
        "This includes texts, images, logins, and access to third-party accounts, as well as a contact person who can make decisions. You confirm that you have the right to use any material you give us.",
      ],
    },
    {
      id: "revisions",
      title: "Revisions & change requests",
      body: [
        "Each phase includes 2 rounds of revisions. Additional changes are quoted separately.",
        "A change request is anything outside the agreed scope. We'll tell you its cost and impact on the timeline before doing the work, and only start once you approve it in writing.",
      ],
    },
    {
      id: "timelines",
      title: "Timelines & delays",
      body: [
        "Timelines are estimates and may shift if inputs from your side are delayed.",
        "We'll keep you updated weekly and tell you as soon as we see a risk to the schedule. Neither party is responsible for delays caused by events beyond reasonable control, such as natural disasters or major service outages.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      body: [
        "Ownership of final deliverables transfers to you once all payments are complete.",
        "Third-party components, such as open-source libraries, fonts, plugins, and stock images, remain subject to their own licenses. We keep ownership of our general tools and know-how, and may show the finished work in our portfolio unless you ask us not to in writing.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: [
        "We keep your business information confidential.",
        "Both parties agree not to share confidential information received from the other, except with people who need it to deliver the project, or where the law requires it. We're happy to sign a separate non-disclosure agreement (NDA).",
      ],
    },
    {
      id: "warranty",
      title: "Warranty & support",
      body: [
        "We fix bugs reported within 30 days of launch at no extra cost.",
        "A bug is something that doesn't work as agreed in the scope. The warranty doesn't cover new features, changes made by others, or problems caused by third-party services. After the warranty period, support is available through a monthly maintenance plan.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      body: [
        "Some services rely on third-party providers whose terms also apply.",
        "This includes domains, hosting, cloud platforms, app stores, payment gateways, and APIs. Their fees are billed separately or at cost, and we're not responsible for their outages or changes to their terms.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: [
        "Our total liability is limited to the amount paid for the relevant service.",
        "We're not liable for indirect losses, such as lost profits or lost data, except where the law doesn't allow this to be limited. You remain responsible for keeping your own backups unless backups are part of the agreed service.",
      ],
    },
    {
      id: "termination",
      title: "Cancellation & termination",
      body: [
        "Either party may end an engagement with written notice, as set out in the agreement.",
        "If you cancel, you pay for the work completed up to the cancellation date, and the down payment is non-refundable unless agreed otherwise. If we end an engagement for reasons not caused by you, we'll refund payments for work not yet delivered.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing law & disputes",
      body: [
        "These Terms are governed by the laws of the Republic of Indonesia.",
        "We'll first try to resolve any dispute through good-faith discussion. If that fails within 30 days, the dispute will be settled at the West Jakarta District Court (Pengadilan Negeri Jakarta Barat), unless the Agreement names another forum.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these Terms",
      body: [
        "We may update these Terms from time to time. The latest version is always on this page.",
        "Changes don't affect projects already under an Agreement, unless both parties agree in writing.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [
        "Questions about these Terms? Contact us at cs@daberau-me.com.",
        "PT Daberau Mikro Elit, Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840.",
      ],
    },
  ],
};

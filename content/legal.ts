import type { LegalDoc } from "./types";

// Structure and opening sentences are from the spec. Full legal text must be drafted and
// reviewed by legal counsel (UU No. 27/2022 on Personal Data Protection), so each section
// shows a placeholder describing what it must cover.

export const legalUi = {
  inShort: "In short",
  contents: "Contents",
  backToTop: "Back to top",
  lastUpdated: "Last updated:",
  effective: "Effective date:",
  placeholderLabel: "Full legal text to be drafted and reviewed by legal counsel. Covers:",
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
  lastUpdated: "[Month DD, YYYY]",
  effective: "[Month DD, YYYY]",
  inShort: [
    "We only collect data you give us or that's needed to run this website.",
    "We use it to respond to you, deliver our services, and improve our site.",
    "We never sell your data.",
    "You can ask us to access, correct, or delete your data at any time.",
  ],
  sections: [
    { id: "who-we-are", title: "Who we are", opening: "PT Daberau Mikro Elit is the data controller responsible for your personal data.", covers: "Legal entity name, address, and data controller contact details." },
    { id: "data-we-collect", title: "Data we collect", opening: "We collect information you provide directly and information collected automatically when you use our site.", covers: "Form data (name, email, WhatsApp, company, message, attachments), technical data (IP address, browser, cookies), and client data during projects." },
    { id: "how-we-use", title: "How we use your data", opening: "We use your data only for the purposes listed below.", covers: "Replying to inquiries, preparing quotes, delivering projects, newsletters, analytics, and legal obligations." },
    { id: "legal-basis", title: "Legal basis for processing", opening: "We process your data only when we have a valid legal basis to do so.", covers: "Consent, performance of a contract, legal obligation, and legitimate interest (under the PDP Law)." },
    { id: "cookies", title: "Cookies & analytics", opening: "We use cookies to understand how visitors use our website. You can change your preferences at any time.", covers: "Types of cookies, tools used (e.g. Google Analytics), and how to manage them." },
    { id: "sharing", title: "Sharing your data", opening: "We share data only with trusted providers who help us run our business, and never sell it.", covers: "Hosting, email, CRM, and payment providers. No sale of personal data." },
    { id: "international-transfers", title: "International transfers", opening: "Some of our providers may store data outside Indonesia. When this happens, we make sure appropriate safeguards are in place.", covers: "Providers that store data on servers outside Indonesia and the safeguards applied." },
    { id: "retention", title: "Data retention", opening: "We keep your data only as long as needed for the purposes described here.", covers: "Retention period for each type of data." },
    { id: "security", title: "Data security", opening: "We use technical and organizational measures to protect your data.", covers: "Encryption, access control, and incident response procedures." },
    { id: "your-rights", title: "Your rights", opening: "You have the right to access, correct, or delete your personal data. To make a request, email us at cs@daberau-me.com.", covers: "Access, correction, deletion, withdrawal of consent, objection, and portability; how to submit a request and response times." },
    { id: "client-project-data", title: "Client project data", opening: "When we work on your systems, we handle any data we access according to our agreement with you.", covers: "Data the team accesses while working on client systems, governed by contract or NDA." },
    { id: "childrens-privacy", title: "Children's privacy", opening: "Our services are not intended for children, and we don't knowingly collect their data.", covers: "Services are not directed at children." },
    { id: "changes", title: "Changes to this policy", opening: "If we make significant changes, we'll update the date above and notify you where appropriate.", covers: "How changes are announced." },
    { id: "contact", title: "Contact us", opening: "Questions about this policy? Contact us at cs@daberau-me.com.", covers: "Privacy email, address, and phone number." },
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
  lastUpdated: "[Month DD, YYYY]",
  effective: "[Month DD, YYYY]",
  inShort: [
    "Project scope, price, and timeline are set in a written proposal or contract.",
    "Payment follows the agreed schedule (for example, a down payment before work starts).",
    "You own the final deliverables once paid in full.",
    "We offer a bug-fix warranty for a set period after launch.",
  ],
  sections: [
    { id: "definitions", title: "Definitions", opening: "In these Terms, the following words have the meanings below.", covers: "Client, Services, Deliverables, Proposal, Agreement." },
    { id: "use-of-website", title: "Use of the website", opening: "You may use this website for lawful purposes only.", covers: "Permitted and prohibited uses." },
    { id: "our-services", title: "Our services", opening: "The specific scope of each project is defined in a written proposal or agreement.", covers: "Services are described in the proposal or contract; these Terms apply generally." },
    { id: "quotes", title: "Quotes & proposals", opening: "Quotes are valid for [X] days unless stated otherwise.", covers: "Quote validity, and estimates versus final prices." },
    { id: "payment", title: "Payment terms", opening: "Unless agreed otherwise, a [X]% down payment is required before work begins.", covers: "Down payment, installments, due dates, late payment, and taxes." },
    { id: "client-responsibilities", title: "Client responsibilities", opening: "To keep your project on schedule, we rely on you to provide content, access, and feedback on time.", covers: "Providing content, access, and timely feedback." },
    { id: "revisions", title: "Revisions & change requests", opening: "Each phase includes [X] rounds of revisions. Additional changes are quoted separately.", covers: "Included revisions and out-of-scope changes." },
    { id: "timelines", title: "Timelines & delays", opening: "Timelines are estimates and may shift if inputs from your side are delayed.", covers: "Estimated timelines and delays caused by the client." },
    { id: "intellectual-property", title: "Intellectual property", opening: "Ownership of final deliverables transfers to you once all payments are complete.", covers: "Ownership of source code and designs after full payment, third-party licenses, and portfolio rights." },
    { id: "confidentiality", title: "Confidentiality", opening: "We keep your business information confidential.", covers: "Confidentiality obligations for both parties and NDAs." },
    { id: "warranty", title: "Warranty & support", opening: "We fix bugs reported within [X] days of launch at no extra cost.", covers: "Bug-fix warranty period, its limits, and maintenance plans." },
    { id: "third-party", title: "Third-party services", opening: "Some services rely on third-party providers whose terms also apply.", covers: "Hosting, domains, plugins, and third-party APIs." },
    { id: "liability", title: "Limitation of liability", opening: "Our total liability is limited to the amount paid for the relevant service.", covers: "Limits of liability." },
    { id: "termination", title: "Cancellation & termination", opening: "Either party may end an engagement with written notice, as set out in the agreement.", covers: "Cancellation by either party and refunds." },
    { id: "governing-law", title: "Governing law & disputes", opening: "These Terms are governed by the laws of the Republic of Indonesia.", covers: "Indonesian law, amicable settlement first, then the chosen court or arbitration." },
    { id: "changes", title: "Changes to these Terms", opening: "We may update these Terms from time to time. The latest version is always on this page.", covers: "How changes are announced." },
    { id: "contact", title: "Contact us", opening: "Questions about these Terms? Contact us at cs@daberau-me.com.", covers: "Legal email and address." },
  ],
};

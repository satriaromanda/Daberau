// Exports the typed content in /content to JSON for the WordPress theme (wordpress/daberau/inc/defaults.json).
// The theme uses it as default copy and to seed services, FAQs and legal pages on activation.
import { writeFileSync } from "node:fs";
import { site, nav, footer, preFooter, cookies, stats, microcopy } from "../content/site";
import { home } from "../content/home";
import { services, serviceTemplate, servicesOverview } from "../content/services";
import { about } from "../content/about";
import { contactPage, leadForm } from "../content/contact";
import { howWeWork } from "../content/howWeWork";
import { processSteps } from "../content/process";
import { faqPage } from "../content/faq";
import { privacy, terms, legalUi } from "../content/legal";
import { eyebrows } from "../content/eyebrows";
import { meta } from "../content/meta";
import { industries, industriesPage } from "../content/industries";

const data = {
  site,
  nav,
  footer,
  preFooter,
  cookies,
  stats,
  microcopy,
  home,
  services,
  serviceTemplate,
  servicesOverview,
  about,
  contactPage,
  leadForm,
  howWeWork,
  processSteps,
  faqPage,
  privacy,
  terms,
  legalUi,
  eyebrows,
  meta,
  industries,
  industriesPage,
};

const out = "wordpress/daberau/inc/defaults.json";
writeFileSync(out, JSON.stringify(data, null, 2) + "\n");
console.log(`Wrote ${out}`);

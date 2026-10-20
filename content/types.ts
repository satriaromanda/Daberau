// Shared content types. All copy lives in /content so it can be edited in one place.
// Strings may contain bracketed placeholder tokens such as [X] or [year]; the <Text>
// component renders those with a dashed highlight so they are easy to find.

export type Cta = { label: string; href: string; external?: boolean };

export type IconName =
  | "globe"
  | "smartphone"
  | "pen"
  | "cloud"
  | "wrench"
  | "compass"
  | "search-x"
  | "spreadsheet"
  | "server-crash"
  | "signpost";

export type TitledText = { title: string; body: string };

export type Faq = { q: string; a: string; sample?: boolean };

export type Step = { title: string; body: string };

export type Stat = { value: string; label: string };

export type PageMeta = { title: string; description: string };

export type ServiceSlug =
  | "web-development"
  | "app-development"
  | "ui-ux-design"
  | "cloud-infrastructure"
  | "it-support"
  | "it-consulting";

export type NeedFilter = "found-online" | "automate" | "stable" | "not-sure";

export type PackageRow = { name: string; bestFor: string; included: string; price: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Mega menu + service card microcopy (spec, verbatim) */
  short: string;
  icon: IconName;
  /** Card photo in /public/images/services. Without `src`, a labeled placeholder shows `alt`. */
  image: { src?: string; alt: string };
  keyword: string;
  needs: NeedFilter[];
  /** 3 scope bullets for the /services grid */
  scope: string[];
  scopeIsSample: boolean;
  /** true when the detail body is a placeholder (only Web Development is fully written) */
  isPlaceholder: boolean;
  meta: PageMeta;
  hero: { h1: string; sub: string; cta: Cta; micro?: string };
  problem: { title: string; points: string[] };
  deliver: { title: string; items: string[] };
  benefits: TitledText[];
  process: { steps: Step[]; sample: boolean };
  packages: { rows?: PackageRow[]; startingFrom?: string; note?: string };
  techStack: { items: string[]; sample: boolean };
  faqs: Faq[];
  related: ServiceSlug[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  sample?: boolean;
};

export type LegalSection = {
  id: string;
  title: string;
  opening: string;
  covers: string;
};

export type LegalDoc = {
  h1: string;
  intro: string;
  lastUpdated: string;
  effective: string;
  inShort: string[];
  sections: LegalSection[];
};

export type FormFieldOption = { value: string; label: string };

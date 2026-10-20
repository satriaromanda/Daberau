// Shared content types. All copy lives in /content so it can be edited in one place.
// Any bracketed token such as [X] in a string is rendered by <Text> with a dashed highlight,
// so unfinished values stay easy to spot.

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
  | "signpost"
  | "messages"
  | "file-text"
  | "code"
  | "rocket"
  | "life-buoy"
  | "users"
  | "receipt"
  | "chart"
  | "shield";

export type TitledText = { title: string; body: string };

export type Faq = { q: string; a: string };

export type Step = { title: string; body: string; icon?: IconName };

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
  /** Card and hero photo in /public/images/services */
  image: { src: string; alt: string };
  keyword: string;
  needs: NeedFilter[];
  /** 3 scope bullets for the /services grid */
  scope: string[];
  /** Lowest price, shown on /pricing (e.g. "IDR 3.5M") */
  startingFrom: string;
  meta: PageMeta;
  hero: { h1: string; sub: string; cta: Cta; micro?: string };
  problem: { title: string; points: string[] };
  deliver: string[];
  benefits: TitledText[];
  process: Step[];
  packages: { rows: PackageRow[]; note: string };
  techStack: string[];
  faqs: Faq[];
  related: ServiceSlug[];
};

/** A paragraph, or a bulleted list */
export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  id: string;
  title: string;
  /** The first block is the spec's opening sentence */
  body: LegalBlock[];
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

import type { PageMeta } from "./types";

// Page meta that isn't stored alongside a page's own content file.
export const meta: Record<"home" | "services" | "notFound", PageMeta> = {
  home: {
    title: "IT Services & Software Development for Growing Businesses | Daberau",
    description:
      "Web development, custom apps, UI/UX, cloud, and IT support under one roof. Free consultation, transparent process, and support after launch.",
  },
  services: {
    title: "IT Services for Businesses: Web, Apps, Cloud & Support | Daberau",
    description:
      "Start with a single need or build a complete digital ecosystem. We tailor everything to your stage and budget.",
  },
  notFound: {
    title: "Page not found | Daberau",
    description: "We can't find that page. It may have moved.",
  },
};

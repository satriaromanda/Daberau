import type { Article } from "./types";

export const insightsPage = {
  meta: {
    title: "Insights | Daberau",
    description: "Technology insights for business owners and managers. Practical guides, minus the jargon.",
  },
  h1: "Technology insights for business owners and managers",
  sub: "Practical guides, minus the jargon.",
  categories: ["Web & SEO", "Apps", "Security & Infrastructure", "Digital Business"],
  allLabel: "All",
  searchLabel: "Search articles",
  searchPlaceholder: "Search articles",
  empty: 'No articles found for "[keyword]". Try another term or browse our latest posts.',
  browseLatest: "Browse latest posts",
  articleCta: "Need help putting this into practice? Book a free consultation with our team.",
  related: "Keep reading",
  readMore: "Read article →",
};

// Three sample articles (sample copy).
export const articles: Article[] = [
  {
    slug: "how-fast-should-your-website-load",
    title: "How fast should your business website load?",
    excerpt: "Visitors leave slow websites before they even see your offer. Here's what “fast enough” means and how to get there.",
    category: "Web & SEO",
    date: "October 6, 2026",
    readTime: "5 min read",
    author: "Daberau Team",
    imageLabel: "Page speed report illustration",
    body: [
      { type: "p", text: "If your website takes more than a few seconds to open on a phone, many visitors will leave before they see what you offer. Speed also affects how Google ranks your pages." },
      { type: "h2", text: "What “fast enough” looks like" },
      { type: "p", text: "Aim for your main content to appear in under 2.5 seconds on a typical mobile connection. Google's free PageSpeed Insights tool shows you where you stand." },
      { type: "h2", text: "Three quick wins" },
      { type: "ul", items: ["Compress and resize images before uploading them.", "Remove plugins and scripts you no longer use.", "Use hosting located close to your customers."] },
      { type: "p", text: "If those don't move the needle, the problem is usually in how the site was built. That's when a rebuild on a modern, lightweight setup pays for itself." },
    ],
  },
  {
    slug: "spreadsheet-or-custom-app",
    title: "Spreadsheet or custom app: when is it time to switch?",
    excerpt: "Spreadsheets are a great start. These five signs tell you your team has outgrown them.",
    category: "Apps",
    date: "September 22, 2026",
    readTime: "6 min read",
    author: "Daberau Team",
    imageLabel: "Spreadsheet vs. app comparison",
    body: [
      { type: "p", text: "Most businesses run on spreadsheets at first, and that's fine. The trouble starts when several people edit the same files and reports take days to prepare." },
      { type: "h2", text: "Five signs you've outgrown spreadsheets" },
      { type: "ul", items: ["Reports take more than a day to compile.", "The same mistakes appear every month.", "Only one person understands how the file works.", "Branches send data over chat.", "You can't see today's numbers until next week."] },
      { type: "h2", text: "Start small" },
      { type: "p", text: "You don't need a huge system. A simple app that replaces your most painful spreadsheet is often enough to save hours every week." },
    ],
  },
  {
    slug: "choosing-an-it-partner",
    title: "Five questions to ask before choosing an IT partner",
    excerpt: "Price matters, but these questions reveal whether a vendor will still be there after launch.",
    category: "Digital Business",
    date: "September 8, 2026",
    readTime: "4 min read",
    author: "Daberau Team",
    imageLabel: "Team meeting illustration",
    body: [
      { type: "p", text: "Choosing an IT vendor is a long-term decision. The cheapest quote can become the most expensive one if the project stalls or the vendor disappears." },
      { type: "h2", text: "Ask these before you sign" },
      { type: "ul", items: ["Is the quote itemized by phase?", "Who is my single point of contact?", "How will I see progress each week?", "Who owns the source code?", "What happens if we find a bug after launch?"] },
      { type: "p", text: "A good partner answers all five clearly and in writing." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

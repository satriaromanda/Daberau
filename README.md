# Daberau website mockup

High-fidelity, clickable, static mockup of the Daberau (PT Daberau Mikro Elit) IT-services website.
The source of truth for structure and copy is [`docs/ia-ux-writing.md`](docs/ia-ux-writing.md).

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, exported as static HTML (`output: "export"`)
- No backend: forms, filters, search and the cookie banner are mocked client-side

## WordPress theme

The production site is the classic WordPress theme in [`wordpress/daberau/`](wordpress/daberau/README.md): same design, with every
text editable in WordPress and a working contact form. Install and editing instructions are in its README.

```bash
npm run export:theme   # copy content/*.ts defaults and icons into the theme
npm run build:theme    # compile the theme's Tailwind CSS
```

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npx serve out      # preview the static export
```

## Where things live

| Path | What |
| --- | --- |
| `content/*.ts` | **All copy**, typed (`content/types.ts`). Edit copy here, not in JSX. |
| `content/site.ts` | Contact data, nav, footer, microcopy library, cookie copy, stats, `WHATSAPP_NUMBER` |
| `components/layout` | Header + Services mega menu, mobile menu, sticky mobile CTA, WhatsApp button, pre-footer CTA, footer |
| `components/ui` | Buttons, cards (service, stat), process steps, FAQ accordion, breadcrumb, placeholders |
| `components/forms/LeadForm.tsx` | Contact form (validation, loading, success, system error) |
| `components/cookies` | Cookie banner + Manage Preferences modal |
| `components/legal` | Legal page layout (sticky TOC with scroll-spy, "In short" box, Back to top) |
| `app/(site)` | All pages (full header/footer) |

## Section headlines

Section headlines are centered. Wrap key words in `*asterisks*` in the content string to show them in brand red,
e.g. `title: "Does any of this sound like *your business?*"`.

## Content status

All copy is filled in. A few values are realistic defaults that must be confirmed before launch:

- Numbers in `content/site.ts` (`stats`) and `content/about.ts` (founded 2019, 50+ clients, 8 industries)
- Timelines and support terms per service in `content/services.ts`
- Warranty (30 days), down payment (50%), quote validity (14 days), revisions (2 rounds), response time (4 business hours)
  in `content/services.ts`, `content/howWeWork.ts`, `content/faq.ts` and `content/legal.ts`
- The Privacy Policy and Terms in `content/legal.ts` are a full draft: have them reviewed by legal counsel

Still needed from the client:

- **WhatsApp number:** set `WHATSAPP_NUMBER` in `content/site.ts` (links work without it, but open WhatsApp with no recipient)
- **Testimonials:** none on the site yet; add a section once real, approved quotes exist
- **Team names and photos** (team cards currently show roles only), **client logos**, and **social media URLs**
  (footer icons appear once a URL is set in `content/site.ts`)

## Photos

Service photos live in `public/images/services/{slug}.webp` (800×800 WebP). The About page reuses one of them until a real
team photo arrives. Suggested Freepik searches for replacements (save as WebP, about 1200×900):

| Slot | File to replace / set | Search |
| --- | --- | --- |
| About hero | `content/about.ts` → `heroImage` | https://www.freepik.com/search?format=search&query=asian%20it%20team%20office%20meeting |

Real team photos and client logos should come from the client, not stock sites.

See [`docs/ux-audit.md`](docs/ux-audit.md) for the UX audit and what changed.

## Industry photos

`/industries` and the home page show 6 industries (`content/industries.ts`). Until an industry has a photo,
it shows a red tile with its icon. To add one, put a 4:3 landscape photo (about 1200×900, WebP) in
`public/images/industries/<slug>.webp` and add `image: { src: "/images/industries/<slug>.webp", alt: "…" }`
to that industry. In WordPress, set the photo on **Industries → (industry) → Industry photo**.

## Dev-only preview toggles

| URL / action | Shows |
| --- | --- |
| `/contact?formError=1` | System-error state after submitting a valid form |
| Clear `localStorage` key `daberau-cookie-consent` | Cookie banner again |

## Routes

`/` · `/services` · `/services/{web-development, app-development, ui-ux-design, cloud-infrastructure, it-support, it-consulting}` ·
`/about-us` · `/contact` · `/privacy-policy` · `/terms-and-conditions` · `/how-we-work` · `/faq` · 404

Case Studies, Industries, Insights, Careers, Pricing and the Consultation landing page from the spec were removed at
the client's request. Every "Get a Free Consultation" button links to the form on `/contact`.

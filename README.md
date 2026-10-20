# Daberau website mockup

High-fidelity, clickable, static mockup of the Daberau (PT Daberau Mikro Elit) IT-services website.
The source of truth for structure and copy is [`docs/ia-ux-writing.md`](docs/ia-ux-writing.md).

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, exported as static HTML (`output: "export"`)
- No backend: forms, filters, search and the cookie banner are mocked client-side

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
| `components/ui` | Buttons, cards (service, testimonial, stat), process steps, FAQ accordion, breadcrumb, placeholders |
| `components/forms/LeadForm.tsx` | Contact / consultation form (validation, loading, success, system error) |
| `components/cookies` | Cookie banner + Manage Preferences modal |
| `components/legal` | Legal page layout (sticky TOC with scroll-spy, "In short" box, Back to top) |
| `app/(site)` | Pages with the full header/footer |
| `app/(minimal)/consultation` | Logo-only landing page |

## Section headlines

Section headlines are centered. Wrap key words in `*asterisks*` in the content string to show them in brand red,
e.g. `title: "Does any of this sound like *your business?*"`.

## Content status

All copy is filled in. A few values are realistic defaults that must be confirmed before launch:

- Numbers in `content/site.ts` (`stats`) and `content/about.ts` (founded 2019, 50+ clients, 8 industries)
- Prices, timelines and package contents per service in `content/services.ts`
- Warranty (30 days), down payment (50%), quote validity (14 days), revisions (2 rounds), response time (4 business hours)
  in `content/services.ts`, `content/howWeWork.ts`, `content/faq.ts` and `content/legal.ts`
- Careers benefits and the roles list in `content/careers.ts`
- The Privacy Policy and Terms in `content/legal.ts` are a full draft: have them reviewed by legal counsel

Still needed from the client:

- **WhatsApp number:** set `WHATSAPP_NUMBER` in `content/site.ts` (links work without it, but open WhatsApp with no recipient)
- **Testimonials:** add real quotes in `content/testimonials.ts` and set `testimonialsPublished = true`
- **Team names and photos** (team cards currently show roles only), **client logos**, **social media URLs**, and a
  **company profile PDF**

## Photos

Service photos live in `public/images/services/{slug}.webp` (800×800 WebP). The About and Careers pages reuse two of them
until real photos arrive. Suggested Freepik searches for replacements (save as WebP, about 1200×900):

| Slot | File to replace / set | Search |
| --- | --- | --- |
| About hero | `content/about.ts` → `heroImage` | https://www.freepik.com/search?format=search&query=asian%20it%20team%20office%20meeting |
| Careers hero | `content/careers.ts` → `images.hero` | https://www.freepik.com/search?format=search&query=software%20developer%20working%20office%20asia |
| Careers "How we work together" | `content/careers.ts` → `images.together` | https://www.freepik.com/search?format=search&query=team%20collaboration%20laptop%20startup%20office |

Real team photos and client logos should come from the client, not stock sites.

## Dev-only preview toggles

| URL / action | Shows |
| --- | --- |
| `/contact?formError=1`, `/consultation?formError=1` | System-error state after submitting a valid form |
| `/careers?roles=0` | "No open roles" empty state |
| Clear `localStorage` key `daberau-cookie-consent` | Cookie banner again |

## Routes

`/` · `/services` · `/services/{web-development, app-development, ui-ux-design, cloud-infrastructure, it-support, it-consulting}` ·
`/about-us` · `/contact` · `/privacy-policy` · `/terms-and-conditions` · `/consultation` · `/how-we-work` · `/faq` · `/careers` ·
`/pricing` · 404

Case Studies, Industries and Insights from the spec were removed at the client's request.

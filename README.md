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
| `components/layout` | Header + Services mega menu + Industries dropdown, mobile menu, sticky mobile CTA, WhatsApp button, pre-footer CTA, footer |
| `components/ui` | Buttons, cards (service, case study, testimonial, stat, article), process steps, FAQ accordion, breadcrumb, placeholders |
| `components/forms/LeadForm.tsx` | Contact / consultation form (validation, loading, success, system error) |
| `components/cookies` | Cookie banner + Manage Preferences modal |
| `components/legal` | Legal page layout (sticky TOC with scroll-spy, "In short" box, Back to top) |
| `app/(site)` | Pages with the full header/footer |
| `app/(minimal)/consultation` | Logo-only landing page |

## Section headlines

Section headlines are centered. Wrap key words in `*asterisks*` in the content string to show them in brand red,
e.g. `title: "Does any of this sound like *your business?*"`. Service card photos live in
`public/images/services/{slug}.webp` and are set per service in `content/services.ts` (`image.src`); a service without
`src` shows a labeled placeholder.

## Placeholders

- Bracketed tokens in content strings (`[X]`, `[year]`, `[WhatsApp number]`, `[Month DD, YYYY]`, `[Client name]`…) render
  with a dashed amber highlight via `<Text>` so they are easy to find. Search `content/` for `[` to list them.
- Business hours are rendered with the same highlight until confirmed (`site.hoursPending`).
- Copy that is **not** in the spec (sample case studies, articles, testimonials, FAQ answers, etc.) carries a
  dashed "Sample copy" badge.
- Apart from the service card photos, images, client logos, team photos and the map are neutral labeled placeholder
  blocks. No external image URLs.
- Set `WHATSAPP_NUMBER` in `content/site.ts` to point every WhatsApp link at the business number.

## Dev-only preview toggles

| URL / action | Shows |
| --- | --- |
| `/contact?formError=1`, `/consultation?formError=1` | System-error state after submitting a valid form |
| `/careers?roles=0` | "No open roles" empty state |
| Case studies → "Infrastructure" filter | Case study filter empty state |
| Insights → search for an unmatched term | Search empty state |
| Clear `localStorage` key `daberau-cookie-consent` | Cookie banner again |

## Routes

`/` · `/services` · `/services/{web-development, app-development, ui-ux-design, cloud-infrastructure, it-support, it-consulting}` ·
`/about-us` · `/contact` · `/privacy-policy` · `/terms-and-conditions` · `/case-studies` ·
`/case-studies/{sales-reporting-automation, clinic-online-booking, retail-website-redesign}` · `/consultation` · `/how-we-work` ·
`/faq` · `/industries` · `/industries/{retail-smes, education, healthcare-clinics, logistics-distribution, government-public-sector}` ·
`/insights` · `/insights/{how-fast-should-your-website-load, spreadsheet-or-custom-app, choosing-an-it-partner}` · `/careers` ·
`/pricing` · 404

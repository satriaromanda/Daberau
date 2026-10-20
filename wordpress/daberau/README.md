# Daberau WordPress theme

A classic WordPress theme for daberau-me.com. It matches the approved mockup, and all text is editable in WordPress.

## Install (Hostinger or any WordPress host)

1. In WordPress, go to **Appearance → Themes → Add New → Upload Theme** and upload `daberau-theme.zip`.
2. Click **Activate**. On activation the theme:
   - creates the pages (Home, Services, About Us, How We Work, FAQ, Contact, Privacy Policy, Terms & Conditions) and sets Home as the front page;
   - creates the 6 services with their photos, the FAQs and the header and footer menus;
   - switches permalinks to "Post name" if they were still on "Plain".
   It only adds what is missing and never overwrites edited content. To re-run it, go to **Appearance → Daberau setup**.
3. Go to **Appearance → Customize → Daberau → Contact details & WhatsApp** and enter the **WhatsApp number**. Until it is set, WhatsApp buttons open WhatsApp without a recipient.
4. Send a test inquiry from the Contact page and check that the email arrives. On Hostinger, outgoing mail from WordPress usually needs an SMTP plugin (for example WP Mail SMTP) set up with the domain's mailbox. Inquiries are also saved under **Inquiries** even if the email fails.

Requirements: WordPress 6.2+ and PHP 7.4+. No plugins are needed.

## Where to edit what

| What | Where |
|---|---|
| Page text (headlines, cards, steps, stats…) | **Pages → (page) → "Page content (Daberau)"** box below the editor |
| Service pages and service cards | **Services → (service)**. Order: "Post Attributes → Order". Photo: "Featured image" |
| Shared service-page headings | **Customize → Daberau → Service page headings** |
| FAQs | **FAQs**. Each FAQ Group becomes a section on the FAQ page. Groups "Contact page" and "Services page" show on those pages |
| Phone, email, address, hours, WhatsApp | **Customize → Daberau → Contact details & WhatsApp** |
| Header button, pre-footer CTA | **Customize → Daberau → Header & calls to action** |
| Footer tagline, copyright, social links | **Customize → Daberau → Footer & social links**. Social icons appear only when a URL is set |
| Header and footer links | **Appearance → Menus** (locations: Header, Footer: Company, Footer: Help, Footer: Legal) |
| Logo | **Customize → Site Identity → Logo** (optional; the bundled logo is used otherwise) |
| Privacy Policy and Terms | Edit the page content. Each **Heading 2** becomes a numbered section in the table of contents. Dates and the "In short" box are in the "Page content (Daberau)" box |
| Contact form requests | **Inquiries** (attachments are linked there and attached to the email) |

### Field conventions

- **Empty fields use the default text.** Clear a field to restore the original copy.
- **Brand-red words:** wrap words in asterisks in a headline, e.g. `Does this sound like *your business?*`.
- **List fields** take one item per line. When a field has several columns, separate them with `|`, e.g.
  `search-x | Your website looks good, but nobody calls. | Visitors can't find you on Google…`
- **Icons** use these names: globe, smartphone, pen, cloud, wrench, compass, search-x, spreadsheet, server-crash, signpost, messages, file-text, code, rocket, life-buoy, users, receipt, chart, shield.
- **Tech stack** names show the real brand logo when known (e.g. Next.js, WordPress, Laravel, AWS, Docker, Figma).

## SEO

Each page has **SEO title** and **SEO description** fields. The theme outputs the meta description, canonical, Open Graph tags and structured data (Organization/LocalBusiness, BreadcrumbList, Service, FAQPage). If Yoast SEO, Rank Math or All in One SEO is active, the theme leaves titles and meta tags to the plugin.

## Contact form

- Validated in the browser and again on the server, with the same messages.
- Spam protection: a hidden honeypot field and a limit of 5 submissions per 10 minutes per IP. There is no nonce, so the form keeps working with page caching (LiteSpeed Cache etc.).
- Without JavaScript the form still submits and shows the success or error message.
- Attachments: PDF, DOCX or images, max 10 MB. They are stored in `wp-content/uploads/daberau-inquiries/` with random file names.
- To preview the error state, add `?formError=1` to the Contact page URL.

## Development

The theme lives in `wordpress/daberau/` of the mockup repository. Styles are Tailwind CSS v4, compiled ahead of time:

```bash
npm install
npm run build:theme     # src/theme.css → assets/css/main.css (scans the theme's PHP and JS for classes)
npm run export:theme    # content/*.ts → inc/defaults.json, icons → inc/icons.php
```

Run `build:theme` after adding Tailwind classes to a template. Run `export:theme` after changing the default copy in `content/*.ts`.

Main files:

- `inc/fields.php`: page and service fields (the "Page content" box)
- `inc/customizer.php`: site-wide settings
- `inc/post-types.php`: Services, FAQs, Inquiries
- `inc/contact-form.php`: form endpoint `POST /wp-json/daberau/v1/contact`
- `inc/seed.php`: first-run setup
- `page-templates/`, `template-parts/`, `front-page.php`, `single-daberau_service.php`: markup
- `assets/js/main.js`: menus, FAQ, filter, cookie banner, form (no dependencies)

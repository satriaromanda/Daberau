# Daberau WordPress theme

A classic WordPress theme for daberau-me.com. It matches the approved mockup, and all text is editable in WordPress.

## Install (Hostinger or any WordPress host)

No plugins are needed. Page builders such as Elementor aren't used by the Daberau pages.

1. In WordPress, go to **Appearance → Themes → Add New → Upload Theme** and upload `daberau-theme.zip`.
   If an older Daberau version is installed, choose **Replace current with uploaded**, then open **Appearance → Daberau setup** and click **Create missing content** and **Use Daberau menus** to add pages and menu links that are new in the update (1.2 adds Industries).
2. Click **Activate**. The theme then:
   - reuses pages that already exist with a matching URL (`/services/`, `/about-us/`, `/contact/`…), and creates the missing ones (How We Work, FAQ, Privacy Policy, Terms & Conditions);
   - creates the 6 services with their photos, the FAQs and, if none are set, the header and footer menus;
   - switches permalinks to "Post name" if they were still on "Plain".
   It never deletes or overwrites content.
3. Open **Appearance → Daberau setup** (a notice links to it). It shows which page is used for each part of the site and has three buttons:
   - **Create missing content**: run the setup again.
   - **Use Daberau menus**: replace menus carried over from the previous theme.
   - **Send test email**: check that contact form emails arrive.
4. Check **Appearance → Customize → Daberau → Contact details** (phone, email, address, hours).
5. If the test email doesn't arrive, open **Customize → Daberau → Email delivery** and enter the mailbox from your hosting panel. For Hostinger: server `smtp.hostinger.com`, port `465`, encryption SSL, your mailbox address and its password. Inquiries are also saved under **Inquiries**, so none are lost while email is being set up.

Requirements: WordPress 6.2+ and PHP 7.4+.

### Pages from a previous theme

A page is used as a Daberau page when its template is a Daberau template **or** its URL matches one of these:
services, about-us / about, how-we-work, faq, contact / contact-us, privacy-policy, terms-and-conditions / terms
(and the Indonesian slugs layanan, tentang-kami, cara-kerja, kontak, hubungi-kami, kebijakan-privasi, syarat-dan-ketentuan).
The old page content (e.g. from Elementor) stays in the database but isn't shown. To use a page with a different URL,
open it and pick the template under **Page Attributes → Template**.

## Where to edit what

| What | Where |
|---|---|
| Page text (headlines, cards, steps, stats…) | **Pages → (page) → "Page content (Daberau)"** box below the editor |
| Industries (Industries page and home section) | **Industries → (industry)**. Photo: "Industry photo" (featured image, 4:3 landscape works best). Until a photo is set, a red tile with the industry icon is shown. Order: "Page Attributes → Order" |
| Service pages and service cards | **Services → (service)**. Order: "Post Attributes → Order". Photo: "Featured image" |
| Shared service-page headings | **Customize → Daberau → Service page headings** |
| FAQs | **FAQs**. Each FAQ Group becomes a section on the FAQ page. Groups "Contact page" and "Services page" show on those pages |
| Phone, email, address, hours | **Customize → Daberau → Contact details** |
| Hide a section on one page | Open the page (or service) → **"Show sections"** at the top of the "Page content (Daberau)" box → untick it |
| Remove a single card | Delete its line in the list field (e.g. "Cards", "Values", "Stats") |
| Pre-footer CTA, sticky phone button, cookie banner on/off | **Customize → Daberau → Show / hide** |
| WhatsApp buttons (off by default) | **Customize → Daberau → WhatsApp (optional)**: tick "Show WhatsApp buttons" and enter the number |
| Header button, pre-footer CTA text and background image | **Customize → Daberau → Header & calls to action** |
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

- Emails come from the company address (when it is on the site's domain) or the SMTP mailbox, which keeps them out of spam.
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

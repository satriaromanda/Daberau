# UX audit — Daberau website

Audit of the live mockup (https://satriaromanda.github.io/Daberau/) at 375, 768 and 1280 px, October 2026.
Each finding lists what was wrong, why it matters, and what changed.

## Fixed in this round

| # | Area | Finding | Why it matters | Fix |
|---|---|---|---|---|
| 1 | Interaction | Almost every card lifted, glowed and changed icon color on hover, including cards that aren't clickable. | Hover feedback signals "you can click this". On static cards it misleads and makes the page feel busy. | Hover is kept only on clickable elements: service cards, FAQ questions, buttons, menu links. Information cards are static. |
| 2 | Interaction | Buttons moved up on hover, the arrow on service cards rotated, footer links shifted sideways. | Motion on small elements adds noise without adding meaning. | Buttons and links change color only. Service cards keep one lift + arrow fill. |
| 3 | Attention | The WhatsApp button pulsed continuously. | Constant motion pulls attention from the content and the primary CTA. | Pulse removed; the button stays fixed and visible. |
| 4 | Conversion flow | Home, Services and service pages ended with two stacked CTAs ("Ready to get your IT sorted?" then "Have an IT project…"). | Two consecutive CTAs with different copy dilute the ask. | One closing CTA per page (the site-wide pre-footer). |
| 5 | Content | Pricing packages and a /pricing page competed with the main CTA. | The client's sales process is consultation-led; published prices invite comparison before a conversation. | All pricing removed. Visitors get an itemized quote after a free consultation; FAQ answers updated. |
| 6 | Trust | About page showed "Available on request" for NIB and documents. | An empty proof section reads as missing information, not as proof. | "Registered and verified" section removed until real documents can be shown. |
| 7 | Dead ends | Footer social icons linked to `#`. Newsletter form had no backend. | Dead links and fake forms erode trust. | Social icons render only when a URL is set; newsletter removed (Privacy Policy updated to match). |
| 8 | Readability | Card body text used neutral-500 (about 4.7:1 contrast). | Passes AA but is tiring to read at 15–17 px on light backgrounds. | Body text is now neutral-600 (about 7.6:1). |
| 9 | Perceived speed | Scroll fade-in moved 18 px over 0.6 s. | Fast scrollers briefly saw empty areas. | 10 px over 0.45 s; disabled entirely for "reduce motion" users; never hides content without JavaScript. |

## Carried into the WordPress theme

All fixes above apply to the WordPress theme too. The theme adds:

- The contact form works without JavaScript (it submits and returns with a success or error message) and is validated again on the server with the same messages.
- FAQ answers are in the page HTML and readable without JavaScript; they collapse once scripts load.
- Empty content fields fall back to the default copy, so an editor can't accidentally leave a section blank.
- Spam protection that doesn't break behind page caching (honeypot + rate limit instead of a nonce).

## Kept (already working well)

- Clear page hierarchy: eyebrow → headline (key words in brand red) → one-line subheadline → content.
- Single primary action site-wide ("Get a Free Consultation" → contact form), with WhatsApp as the secondary path.
- Short contact form: 6 required fields, inline error messages with icon + text (not color alone), loading and success states.
- Breadcrumbs on inner pages; keyboard-operable menu, mega menu and FAQ; visible focus rings; one H1 per page.
- Process shown as a connected 5-step flow on desktop and a numbered timeline on mobile.

## Still needs content from Daberau

- WhatsApp business number (buttons currently open WhatsApp without a recipient).
- Real testimonials, team names/photos, client logos, social profile URLs.
- About page team photo (currently a reused service photo).
- Confirmation of the default figures (stats, warranty, timelines) listed in the README.

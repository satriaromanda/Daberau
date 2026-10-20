# IA & UX Writing — Website Daberau

Oct 20, 2026 · @Satria Romanda Pratama

## Identitas Brand

Website ini untuk **Daberau** (PT Daberau Mikro Elit), penyedia IT Services yang berkantor di Kalideres, Jakarta Barat. Semua placeholder brand, badan hukum, dan kontak di dokumen ini sudah diisi dengan data berikut.

&#91;image: Logo Daberau\]

| Item | Data |
| --- | --- |
| Nama brand (di UI) | Daberau |
| Badan hukum | PT Daberau Mikro Elit |
| Bidang | IT Services |
| Domain & email | daberau-me.com · cs@daberau-me.com |
| Telepon | (021) 5431 6725 · format internasional: +62 21 5431 6725 |
| Alamat | Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, Jakarta Barat 11840 |
| Warna utama logo | Merah #BF1E2E di atas putih |

Catatan desain dari logo:

- Merah #BF1E2E dipakai untuk tombol CTA primer, link aktif, dan aksen; latar dominan putih agar logo tetap menonjol.
- Karena merah juga dipakai untuk error, bedakan state error dengan ikon + teks penjelas, bukan warna saja.
- Logo berbentuk lencana (badge) dengan monogram; siapkan versi monogram saja untuk favicon dan header mobile.

## Ringkasan

Website ini punya satu tugas utama: mengubah pengunjung yang punya masalah IT menjadi lead yang mengisi form konsultasi. Konversi utama **Free Consultation**, konversi sekunder **WhatsApp**.

Seluruh UX writing (label, headline, tombol, microcopy) ditulis dalam **bahasa Inggris**. Penjelasan desain di dokumen ini tetap berbahasa Indonesia. Nama brand di UI: **Daberau**.

| Aspek | Keputusan |
| --- | --- |
| Target audiens utama | Pemilik UMKM dan bisnis menengah (10–200 karyawan) yang belum punya tim IT internal |
| Target audiens sekunder | Manajer operasional/IT di korporat, instansi, startup, dan klien luar negeri |
| Positioning | One-stop IT partner: dari website, aplikasi, sampai infrastruktur dan support |
| Pembeda yang dijual | Satu kontak untuk semua kebutuhan IT, proses transparan, support setelah proyek selesai |
| Konversi utama | Form Free Consultation / Request a Quote |
| Konversi sekunder | Klik WhatsApp, unduh company profile |
| Bahasa | English (utama). Versi Indonesia opsional di /id dengan struktur yang sama |
| Halaman wajib | Home, Services, About Us, Contact, Privacy Policy, Terms & Conditions |

### Prinsip IA

1. **Organisasi berbasis masalah, bukan teknologi.** Nama layanan memakai bahasa hasil ("Web Development", bukan "Laravel Development").
2. **Maksimal 2 klik ke halaman layanan mana pun** dari halaman mana pun, lewat mega menu.
3. **Setiap halaman berakhir dengan CTA.** Tidak ada halaman buntu.
4. **Bukti ditempatkan dekat klaim.** Setiap halaman layanan menautkan case study yang relevan.
5. **Dua jalur pengunjung:** yang sudah tahu butuh apa (langsung ke Services) dan yang belum (lewat Industries atau Consultation).
6. **Halaman legal selalu terjangkau** dari footer dan dari checkbox persetujuan di setiap form.

## Sitemap

Total 14 halaman: 6 wajib dan 8 tambahan. Enam halaman masuk header; sisanya, termasuk Privacy Policy dan Terms & Conditions, diakses lewat footer, CTA, dan checkbox form.

&#91;embedded content: Sitemap · 6 halaman wajib + 8 halaman tambahan\]

Semua URL memakai bahasa Inggris, huruf kecil, dan tanda hubung. Daftar slug layanan lengkap ada di bagian Services (tabel D). Versi Indonesia, jika dibuat, memakai prefix /id dengan struktur yang sama.

## Navigasi Global

Header memuat 6 item plus 1 tombol CTA. Careers, FAQ, Privacy Policy, dan Terms & Conditions ada di footer agar header tetap ringkas.

### Header (desktop)

| Urutan | Label menu | Tipe | Tujuan |
| --- | --- | --- | --- |
| 1 | Services ▾ | Mega menu | /services + 6 layanan |
| 2 | Industries ▾ | Dropdown | /industries + 5 industri |
| 3 | Case Studies | Link | /case-studies |
| 4 | About Us | Link | /about-us |
| 5 | Insights | Link | /insights |
| 6 | Contact | Link | /contact |
| CTA | **Get a Free Consultation** | Tombol primer | /consultation |

Pada mobile: logo, ikon WhatsApp, dan hamburger. Tombol "Free Consultation" menempel di bawah layar (sticky bar) setelah pengguna scroll 30%.

### Mega menu Services

Tiga kolom: daftar layanan, deskripsi singkat, dan panel promosi.

| Layanan | Microcopy di mega menu |
| --- | --- |
| Web Development | Company websites, online stores, and landing pages that load fast and rank on Google. |
| Web & Mobile Apps | Custom apps for your operations, your customers, or your next digital product. |
| UI/UX Design | Interfaces people find easy to use, validated before a single line of code. |
| Cloud & Infrastructure | Servers, hosting, cloud migration, and backups that stay secure and monitored. |
| IT Support & Maintenance | A team on standby for fixes, updates, and system monitoring. |
| IT Consulting & Digital Transformation | A clear digital roadmap before you commit a big budget. |

Panel promosi (kolom 3):

> **Not sure what you need?** Tell us the problem. We'll map out the right solution. Free, 30 minutes. \[Book a Consultation →\]

### Footer

| Kolom | Isi |
| --- | --- |
| Brand | Logo, tagline, office address, business hours (Mon–Fri, 9 AM–5 PM WIB), social icons |
| Services | 6 link layanan |
| Company | About Us, Case Studies, Careers, Insights, Contact |
| Help | FAQ, How We Work |
| Legal | Privacy Policy, Terms & Conditions |
| Newsletter (opsional) | "IT tips for growing businesses, once a month. No spam." + field email + tombol "Subscribe" |

Baris bawah: "© 2026 Daberau. All rights reserved." · PT Daberau Mikro Elit · link Privacy Policy dan Terms & Conditions diulang di sini.

Pre-footer CTA (semua halaman kecuali Contact, Consultation, dan halaman legal):

> **Have an IT project you want to get moving?** Your first consultation is free. We reply within one business day. \[Get a Free Consultation\] \[Chat on WhatsApp\]

## Homepage — /

Homepage terdiri dari 11 section dengan alur: masalah → solusi → bukti → proses → aksi. Pengunjung harus paham "apa yang Anda kerjakan dan untuk siapa" dalam 5 detik pertama.

**Meta title:** IT Services & Software Development for Growing Businesses | Daberau **Meta description:** Web development, custom apps, UI/UX, cloud, and IT support under one roof. Free consultation, transparent process, and support after launch.

### 1. Hero

- **Eyebrow:** IT services for businesses ready to grow
- **Headline (H1):** One partner for every IT need your business has
- **Alternatif headline:** Technology that just works, so you can focus on growing your business
- **Subheadline:** From websites and apps to servers and day-to-day support, we design, build, and maintain your digital systems with one dedicated team.
- **CTA primer:** Get a Free Consultation
- **CTA sekunder:** See Our Work
- **Microcopy di bawah CTA:** Free and no commitment. We reply within one business day.
- **Visual:** mockup produk nyata (dashboard/website klien), bukan ilustrasi stok.

### 2. Trust bar

- **Label:** Trusted by businesses and institutions across industries
- **Isi:** 6–10 logo klien, grayscale, slider otomatis di mobile.

### 3. Pain points

- **Judul:** Sound familiar?
- **Kartu (4):**
  - **Your website exists, but it doesn't sell.** It's slow, hard to find on Google, and rarely brings in customers.
  - **Work is still manual.** Data lives in spreadsheets and chat threads, reports run late, and mistakes repeat.
  - **Your systems keep breaking.** Servers go down, data gets lost, and no one picks up when it matters.
  - **You don't know where to start.** Too many vendors, too much jargon, and a limited budget.
- **Penutup:** The good news: all of this can be fixed in the right order.

### 4. Services

- **Judul:** What we do
- **Subjudul:** Pick one service or combine several. The same team handles everything.
- **Isi:** 6 kartu layanan (ikon, nama, 1 kalimat manfaat, link "Learn more →"). Copy kartu sama dengan microcopy mega menu.
- **CTA bawah:** Explore All Services

### 5. Why Daberau

- **Judul:** Why businesses choose to work with us
- **Poin (4):**
  - **One team, one point of contact.** No juggling vendors. A single project manager owns your project from kickoff to launch.
  - **Clear pricing from day one.** Itemized quotes for every phase, with no hidden fees.
  - **Progress you can see.** Weekly updates and access to the project board.
  - **We don't disappear after launch.** A \[X\]-day bug-fix warranty and monthly maintenance plans.

### 6. Stats

| Angka | Label |
| --- | --- |
| \[X\]+ | Projects delivered |
| \[X\]+ | Active clients |
| \[X\] years | Team experience |
| \[X\]% | Clients who come back |

Gunakan angka nyata saja. Jika belum cukup besar, ganti dengan "Average support response: under 2 hours" atau metrik kualitas lain.

### 7. Featured case studies

- **Judul:** Real results for real clients
- **Isi:** 3 kartu: logo/nama klien, industri, judul hasil, 1 metrik.
- **Contoh judul kartu:** "Report preparation cut from 3 days to 10 minutes"
- **CTA:** View All Case Studies

### 8. How we work

- **Judul:** From idea to launch in 5 steps
- **Langkah:**
  1. **Consult** — We listen to your problems and goals.
  2. **Scope & Quote** — Scope, timeline, and cost, all in writing.
  3. **Design & Build** — Delivered in sprints, with your review at every stage.
  4. **Test & Launch** — Thorough testing before go-live.
  5. **Support** — Monitoring and fixes after launch.
- **Link:** See how we work →

### 9. Testimonials

- **Judul:** What our clients say
- **Format:** kutipan, nama, jabatan, perusahaan, foto. Minimal 3. Prioritaskan testimoni yang menyebut hasil spesifik.

### 10. Latest insights

- **Judul:** Insights for smarter IT decisions
- **Isi:** 3 artikel terbaru. **CTA:** Read All Insights

### 11. Closing CTA

- **Headline:** Ready to get your IT sorted?
- **Subheadline:** Tell us what you need. We'll send a recommendation and an initial estimate, free of charge.
- **CTA primer:** Get a Free Consultation
- **CTA sekunder:** Chat on WhatsApp

## Services

Layanan dibagi dua level: satu halaman overview (/services) dan 6 halaman detail dengan template yang sama. Halaman detail adalah aset SEO utama, jadi masing-masing menargetkan satu kata kunci utama.

### A. Overview — /services

**Meta title:** IT Services for Businesses: Web, Apps, Cloud & Support | Daberau

1. **Hero**
   - H1: End-to-end IT services, delivered by one team
   - Sub: Start with a single need or build a complete digital ecosystem. We tailor everything to your stage and budget.
   - CTA: Get a Free Consultation
2. **Filter berdasarkan kebutuhan** (chip yang bisa diklik): I want to be found online · I want to automate operations · I want more stable systems · I'm not sure yet
3. **Grid 6 layanan** — tiap kartu: ikon, nama, 1 kalimat manfaat, 3 poin cakupan, "Learn more →"
4. **Bundled services** — Judul: "Need more than one service?" Sub: "Combine services under one contract and one project manager. Less coordination, faster delivery."
5. **Tech stack** — Judul: "Technologies we use". Sub: "We choose tools based on your needs, not trends."
6. **FAQ umum layanan** (5 pertanyaan)
7. **Closing CTA**

### B. Template halaman detail — /services/\[slug\]

| Urutan | Section | Tujuan | Pola copy |
| --- | --- | --- | --- |
| 1 | Hero | Menjawab "apakah ini untuk saya?" | H1 = kata kunci + manfaat. CTA "Talk to Us About \[Service\]" |
| 2 | Problem | Membangun relevansi | "Does this sound like you?" + 3 poin |
| 3 | Solution & scope | Menjelaskan apa yang didapat | "What we deliver" + 4–6 sub-layanan |
| 4 | Benefits | Menerjemahkan fitur ke hasil | 3 manfaat terukur |
| 5 | Process | Mengurangi ketidakpastian | 4–5 langkah khusus layanan ini |
| 6 | Related case studies | Bukti | 1–2 kasus dari layanan yang sama |
| 7 | Packages / pricing | Menyaring lead | "Starting from IDR \[X\]" atau tier paket |
| 8 | Tech stack | Kredibilitas teknis | Logo stack |
| 9 | Service FAQ | Menjawab keberatan + SEO | 5–7 pertanyaan |
| 10 | Related services | Cross-sell | 2–3 kartu layanan lain |
| 11 | Closing CTA | Konversi | Form singkat inline atau tombol |

### C. Contoh lengkap: Web Development

Slug: /services/web-development · Kata kunci: web development services

- **H1:** Websites that bring in customers, not just look good
- **Sub:** Fast, easy to find on Google, and designed to turn visitors into leads.
- **CTA:** Get a Free Website Consultation · **Microcopy:** We'll send a cost estimate within one business day.
- **Problem — "Does your website look like this?"**
  - It takes more than 5 seconds to load, and visitors leave before it opens
  - It doesn't show up on Google's first page for your own services
  - You can't update it without calling a developer
- **What we deliver:** Company websites · Campaign landing pages · Online stores · Website redesigns · Technical & on-page SEO · WhatsApp, payment gateway, and analytics integration
- **Benefits:**
  - **Get found faster.** SEO structure built in from day one.
  - **Get more inquiries.** Every page has a clear CTA and form.
  - **Manage it yourself.** A CMS you can update without code.
- **Packages (contoh):**

| Package | Best for | What's included | Price |
| --- | --- | --- | --- |
| Starter | New businesses, landing pages | 1–3 pages, responsive, contact form | From IDR \[X\] |
| Business | Company websites | Up to 10 pages, CMS, basic SEO, blog | From IDR \[X\] |
| Custom | E-commerce & custom features | Scoped to your needs, system integrations | Let's talk |

- **Catatan di bawah tabel:** All packages include a domain and hosting for the first year, SSL, and a \[X\]-day bug-fix warranty.
- **FAQ contoh:** How long does it take to build a website? · Can I edit the content myself? · Are domain and hosting included? · What if I already have a website? · Can you guarantee a first-page ranking on Google?

### D. Slug dan kata kunci untuk 6 layanan

| Layanan | Slug | Kata kunci utama | H1 |
| --- | --- | --- | --- |
| Web Development | /services/web-development | web development services | Websites that bring in customers, not just look good |
| Web & Mobile Apps | /services/app-development | custom app development | Custom apps built around the way your business works |
| UI/UX Design | /services/ui-ux-design | UI/UX design services | Digital products people find easy to use from version one |
| Cloud & Infrastructure | /services/cloud-infrastructure | cloud migration / managed servers | Infrastructure that stays stable, secure, and ready to scale |
| IT Support & Maintenance | /services/it-support | managed IT support | Your IT team, without the hiring |
| IT Consulting & Digital Transformation | /services/it-consulting | IT consulting services | A clear digital roadmap before you invest |

Catatan SEO: jika target utama klien lokal Indonesia, kata kunci bahasa Indonesia (mis. "jasa pembuatan website") tetap bervolume lebih tinggi. Tangani lewat versi /id, bukan dengan mencampur bahasa di satu halaman.

## About Us — /about-us

Halaman About menjawab satu pertanyaan calon klien: "Bisakah saya mempercayakan sistem bisnis saya ke tim ini?" Fokusnya pada orang, cara kerja, dan legalitas, bukan sejarah panjang.

**Meta title:** About Daberau — The IT Team Behind Growing Businesses

1. **Hero**
   - H1: We build technology people actually use
   - Sub: Daberau is a team of designers, developers, and engineers helping businesses work faster with the right technology.
2. **Our story** (2–3 paragraf)
   - Pembuka: "We started Daberau in \[year\] after noticing a pattern: many businesses were paying a lot for technology without seeing the results."
   - Isi: apa yang dipelajari, bagaimana pendekatan dibentuk.
   - Penutup: "Today, we've helped \[X\]+ clients across \[X\] industries, guided by the same principles we started with."
3. **Vision & Mission**
   - Vision: To be the technology partner businesses trust most.
   - Mission (3): Make technology easy for business owners to understand · Build systems that last, not throwaway projects · Stay with our clients long after launch
4. **Values** — Judul: "How we work"
   - **Honest about what you need.** If you don't need an app, we'll tell you.
   - **Transparent.** Costs, timelines, and progress are always visible to you.
   - **Accountable.** What we build, we maintain.
   - **Always learning.** We keep up with technology so your solution stays relevant.
5. **Team** — Judul: "The people behind your project" · kartu: foto, nama, jabatan, LinkedIn. Tampilkan founder dan lead minimal.
6. **Numbers & milestones** — gunakan statistik yang sama dengan homepage.
7. **Legal & certifications** — Judul: "Registered and verified" · Sub: "We're a legally registered company in Indonesia." · isi: PT Daberau Mikro Elit, NIB, sertifikasi (ISO, cloud partner, dll.) jika ada. Penting untuk klien korporat dan instansi.
8. **Clients & partners** — logo grid. Judul: "Who we work with"
9. **Dual CTA**
   - Untuk klien: "Want to work with us?" → Get a Free Consultation
   - Untuk talenta: "Want to join the team?" → View Open Roles

## Contact — /contact

Halaman Contact memberi tiga jalur sesuai urgensi: form (proyek baru), WhatsApp (pertanyaan cepat), dan email/telepon (formal). Form dibuat pendek, maksimal 6 field wajib.

**Meta title:** Contact Daberau — Free IT Consultation

### Struktur

1. **Hero**
   - H1: Let's talk about your IT needs
   - Sub: Fill in the form below or reach us however suits you best. We reply within one business day.
2. **Contact options** (3 kolom)
   - **Have a project?** Fill in the form and we'll send a recommendation and initial estimate. \[Fill in the Form ↓\]
   - **Quick question?** Chat with our team during business hours. \[Chat on WhatsApp\]
   - **Need urgent support?** For active maintenance clients. \[Contact Support\]
3. **Form + contact info** (2 kolom: form kiri, info kanan)
4. **Map & office address**
5. **Quick FAQ** (3 pertanyaan): Is the consultation really free? · How soon will I get a quote? · Can we meet in person?

### Form fields

| Field | Label | Placeholder / opsi | Wajib | Pesan error |
| --- | --- | --- | --- | --- |
| Name | Full name | e.g. John Smith | Ya | Please enter your name. |
| Company | Company name | e.g. Acme Corp (leave blank if individual) | Tidak | — |
| Email | Work email | name@company.com | Ya | Please enter a valid email, e.g. name@company.com |
| WhatsApp | WhatsApp number | +62 812 xxxx xxxx | Ya | Please enter an active number with at least 10 digits. |
| Service | What do you need help with? | Dropdown: 6 services + "Not sure yet, I need advice" | Ya | Please choose a service. |
| Budget | Estimated budget | Under IDR 10M · IDR 10–50M · IDR 50–150M · Over IDR 150M · Not sure yet | Tidak | — |
| Timeline | When would you like to start? | ASAP · In 1–3 months · In 3+ months | Tidak | — |
| Message | Tell us about your project | e.g. We need an inventory app for our 3 store branches… | Ya | Tell us a bit about your needs so we can prepare the right advice. |
| Attachment | Attachment (optional) | PDF, DOCX, or images. Max 10 MB | Tidak | This file is too large. The maximum size is 10 MB. |
| Consent | Checkbox | I agree to the \[Privacy Policy\] and \[Terms & Conditions\], and consent to being contacted about this inquiry. | Ya | Please accept the Privacy Policy to continue. |

- **Helper text di atas form:** Fields marked \* are required. Your data is safe and never shared with third parties.
- **Tombol:** Send Request
- **State loading:** Sending…

### State setelah submit

- **Sukses:**
  - Judul: Thanks, \[Name\]! We've received your request.
  - Isi: Our team will reach out via WhatsApp or email within one business day. In the meantime, take a look at some of our recent work.
  - CTA: View Case Studies · Back to Home
- **Gagal (error sistem):**
  - Judul: Sorry, your message didn't go through.
  - Isi: Something went wrong on our end. Your answers are still here, so try again or reach us directly on WhatsApp.
  - CTA: Try Again · Chat on WhatsApp

### Contact info (kolom kanan)

- Address: Jl. Peta Selatan, Citi Business Park Blok A No. 31, Kalideres, West Jakarta 11840 + Google Maps link
- Email: cs@daberau-me.com
- Phone: +62 21 5431 6725 · WhatsApp: \[WhatsApp number\]
- Business hours: Mon–Fri, 9 AM–5 PM (WIB, GMT+7)
- Microcopy: "Messages sent outside business hours will be answered the next business day."

## Privacy Policy & Terms and Conditions (wajib)

Kedua halaman wajib karena website mengumpulkan data pribadi lewat form, WhatsApp, newsletter, dan analytics. Struktur di bawah adalah kerangka IA dan copy pengantar; teks hukum final harus ditinjau konsultan hukum agar sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan praktik bisnis Anda.

### Pola halaman legal (berlaku untuk keduanya)

| Elemen | Ketentuan |
| --- | --- |
| Layout | Satu kolom teks (maks. ±720 px), daftar isi sticky di kiri pada desktop, accordion di mobile |
| Header | H1 + "Last updated: \[Month DD, YYYY\]" + "Effective date: \[Month DD, YYYY\]" |
| Ringkasan | Kotak "In short" berisi 3–4 poin bahasa sederhana di atas teks lengkap |
| Navigasi | Anchor link per bagian, tombol "Back to top" |
| Tanpa distraksi | Tidak ada pre-footer CTA; cukup kontak legal di akhir |
| Versi | Simpan arsip versi lama; tautkan "Previous versions" jika ada perubahan besar |
| Akses | Footer (kolom Legal + baris bawah), checkbox form, cookie banner |

### Privacy Policy — /privacy-policy

**Meta title:** Privacy Policy | Daberau

- **H1:** Privacy Policy
- **Intro:** This Privacy Policy explains how PT Daberau Mikro Elit ("Daberau", "we", "us") collects, uses, and protects your personal data when you visit our website or use our services.
- **In short:**
  - We only collect data you give us or that's needed to run this website.
  - We use it to respond to you, deliver our services, and improve our site.
  - We never sell your data.
  - You can ask us to access, correct, or delete your data at any time.

| No. | Bagian (heading) | Isi yang perlu dicakup | Contoh kalimat pembuka |
| --- | --- | --- | --- |
| 1 | Who we are | Nama badan hukum, alamat, kontak pengendali data | \[Legal Entity Name\] is the data controller responsible for your personal data. |
| 2 | Data we collect | Data form (nama, email, WhatsApp, perusahaan, pesan, lampiran), data teknis (IP, browser, cookie), data klien selama proyek | We collect information you provide directly and information collected automatically when you use our site. |
| 3 | How we use your data | Membalas inquiry, menyusun penawaran, menjalankan proyek, newsletter, analytics, kewajiban hukum | We use your data only for the purposes listed below. |
| 4 | Legal basis for processing | Persetujuan, pelaksanaan kontrak, kewajiban hukum, kepentingan sah (sesuai UU PDP) | We process your data only when we have a valid legal basis to do so. |
| 5 | Cookies & analytics | Jenis cookie, tool yang dipakai (mis. Google Analytics), cara mengatur | We use cookies to understand how visitors use our website. You can change your preferences at any time. |
| 6 | Sharing your data | Penyedia hosting, email, CRM, pembayaran; tidak menjual data | We share data only with trusted providers who help us run our business, and never sell it. |
| 7 | International transfers | Jika data disimpan di server luar Indonesia | Some of our providers may store data outside Indonesia. When this happens, we make sure appropriate safeguards are in place. |
| 8 | Data retention | Lama penyimpanan per jenis data | We keep your data only as long as needed for the purposes described here. |
| 9 | Data security | Enkripsi, kontrol akses, prosedur insiden | We use technical and organizational measures to protect your data. |
| 10 | Your rights | Akses, koreksi, penghapusan, penarikan persetujuan, keberatan, portabilitas; cara mengajukan dan waktu respons | You have the right to access, correct, or delete your personal data. To make a request, email us at cs@daberau-me.com. |
| 11 | Client project data | Data yang diakses tim saat mengerjakan sistem klien (diatur kontrak/NDA) | When we work on your systems, we handle any data we access according to our agreement with you. |
| 12 | Children's privacy | Layanan tidak ditujukan untuk anak | Our services are not intended for children, and we don't knowingly collect their data. |
| 13 | Changes to this policy | Cara pemberitahuan perubahan | If we make significant changes, we'll update the date above and notify you where appropriate. |
| 14 | Contact us | Email privasi, alamat, telepon | Questions about this policy? Contact us at cs@daberau-me.com. |

### Terms & Conditions — /terms-and-conditions

**Meta title:** Terms & Conditions | Daberau

- **H1:** Terms & Conditions
- **Intro:** These Terms govern your use of the Daberau website and the services we provide. By using our website or engaging our services, you agree to these Terms.
- **In short:**
  - Project scope, price, and timeline are set in a written proposal or contract.
  - Payment follows the agreed schedule (for example, a down payment before work starts).
  - You own the final deliverables once paid in full.
  - We offer a bug-fix warranty for a set period after launch.

| No. | Bagian (heading) | Isi yang perlu dicakup | Contoh kalimat pembuka |
| --- | --- | --- | --- |
| 1 | Definitions | Client, Services, Deliverables, Proposal, Agreement | In these Terms, the following words have the meanings below. |
| 2 | Use of the website | Penggunaan yang diizinkan dan dilarang | You may use this website for lawful purposes only. |
| 3 | Our services | Layanan dijelaskan di proposal/kontrak; T&C ini berlaku umum | The specific scope of each project is defined in a written proposal or agreement. |
| 4 | Quotes & proposals | Masa berlaku penawaran, estimasi vs harga final | Quotes are valid for \[X\] days unless stated otherwise. |
| 5 | Payment terms | DP, termin, jatuh tempo, keterlambatan, pajak | Unless agreed otherwise, a \[X\]% down payment is required before work begins. |
| 6 | Client responsibilities | Menyediakan konten, akses, feedback tepat waktu | To keep your project on schedule, we rely on you to provide content, access, and feedback on time. |
| 7 | Revisions & change requests | Jumlah revisi termasuk, perubahan di luar scope | Each phase includes \[X\] rounds of revisions. Additional changes are quoted separately. |
| 8 | Timelines & delays | Estimasi waktu, keterlambatan karena pihak klien | Timelines are estimates and may shift if inputs from your side are delayed. |
| 9 | Intellectual property | Kepemilikan source code dan desain setelah lunas, lisensi pihak ketiga, hak portofolio | Ownership of final deliverables transfers to you once all payments are complete. |
| 10 | Confidentiality | Kerahasiaan informasi kedua pihak, NDA | We keep your business information confidential. |
| 11 | Warranty & support | Masa garansi bug, batasannya, paket maintenance | We fix bugs reported within \[X\] days of launch at no extra cost. |
| 12 | Third-party services | Hosting, domain, plugin, API pihak ketiga | Some services rely on third-party providers whose terms also apply. |
| 13 | Limitation of liability | Batas tanggung jawab | Our total liability is limited to the amount paid for the relevant service. |
| 14 | Cancellation & termination | Pembatalan oleh klien atau kami, pengembalian dana | Either party may end an engagement with written notice, as set out in the agreement. |
| 15 | Governing law & disputes | Hukum Indonesia, musyawarah, lalu pengadilan/arbitrase yang dipilih | These Terms are governed by the laws of the Republic of Indonesia. |
| 16 | Changes to these Terms | Cara pemberitahuan | We may update these Terms from time to time. The latest version is always on this page. |
| 17 | Contact us | Email legal, alamat | Questions about these Terms? Contact us at cs@daberau-me.com. |

### Microcopy terkait legal

| Konteks | Copy |
| --- | --- |
| Checkbox form | I agree to the Privacy Policy and Terms & Conditions, and consent to being contacted about this inquiry. |
| Checkbox newsletter | I'd like to receive occasional emails from Daberau. Unsubscribe anytime. |
| Cookie banner | We use cookies to understand how our site is used and to improve your experience. \[Accept All\] \[Manage Preferences\] |
| Cookie preferences | Essential (always on) · Analytics · Marketing — \[Save Preferences\] |
| Footer | Privacy Policy · Terms & Conditions |
| Permintaan hak data (confirmation) | We've received your request. We'll respond within \[X\] business days. |

## Halaman Tambahan yang Disarankan

Saya sarankan 8 halaman tambahan dalam dua fase. Fase 1 langsung berdampak ke konversi dan kepercayaan; Fase 2 untuk SEO dan skala.

| Halaman | URL | Fase | Alasan |
| --- | --- | --- | --- |
| Case Studies | /case-studies | 1 | Bukti adalah faktor terbesar dalam memilih vendor IT |
| Free Consultation (landing) | /consultation | 1 | Halaman konversi khusus untuk iklan dan CTA, tanpa distraksi navigasi |
| How We Work | /how-we-work | 1 | Mengurangi kekhawatiran "proyek molor / vendor hilang" |
| FAQ | /faq | 1 | Menjawab keberatan sebelum sales call, dan rich snippet di Google |
| Industries | /industries/\[slug\] | 2 | Menangkap pengunjung yang belum tahu butuh layanan apa |
| Insights (Blog) | /insights | 2 | Mesin SEO jangka panjang |
| Careers | /careers | 2 | Employer branding, menunjukkan tim yang tumbuh |
| Pricing | /pricing | 2 (opsional) | Menyaring lead. Pakai hanya jika harga bisa distandarkan |

### Case Studies — /case-studies

- **H1:** Work we're proud of
- **Sub:** Every project starts with a real business problem. See how we solved it.
- **Filter:** All · Websites · Apps · UI/UX · Infrastructure · by industry
- **Kartu:** gambar, nama klien, industri, judul hasil, tag layanan
- **Empty state filter:** "No case studies in this category yet. Try another filter or ask us about our experience directly."

**Template detail — /case-studies/\[slug\]**

1. At a glance (client, industry, services, duration, 3 result metrics)
2. The challenge — "What our client was facing"
3. The solution — "What we built"
4. The process — key phases and decisions
5. The results — before/after numbers
6. Client testimonial
7. Gallery / screenshots
8. CTA: "Facing a similar challenge? Let's talk."

### Free Consultation — /consultation

Landing page tanpa menu navigasi (hanya logo dan link legal di footer), dipakai untuk iklan dan semua CTA "Free Consultation".

- **H1:** A free 30-minute IT consultation with our team
- **Sub:** Tell us the problem and leave with a recommended solution and an initial estimate. No obligation to buy.
- **What you'll get:** A quick assessment of your needs · Recommended solutions and technologies · An initial cost and timeline estimate
- **Form:** sama dengan form Contact + pilihan jadwal (atau embed Calendly/Google Calendar)
- **Bukti di samping form:** 3 logo klien + 1 testimoni
- **Tombol:** Book My Consultation

### How We Work — /how-we-work

- **H1:** A clear process, from day one to long after launch
- **Isi:** 5 tahap (sama dengan homepage), masing-masing diperluas: What happens · What you get · How long it takes · Your role.
- **Section tambahan:** "Engagement models" (Fixed Price · Time & Materials · Monthly Retainer), "Warranty & SLA", "Tools we collaborate with".

### FAQ — /faq

Dikelompokkan per kategori: General · Pricing & Payment · Project Process · Technical · Support & Warranty.

Contoh pertanyaan:

- How much does a website or app cost?
- How does payment work? (e.g. 50% upfront, 50% on handover)
- Do we own the source code?
- Can you take over a project from another vendor?
- What happens if we find a bug after launch?
- Do you work with clients outside your city or country?

Microcopy bawah: "Can't find your answer? Ask our team directly." \[Chat on WhatsApp\]

### Industries — /industries/\[slug\]

Usulan industri awal: Retail & SMEs · Education · Healthcare & Clinics · Logistics & Distribution · Government & Public Sector. Pilih berdasarkan portofolio terkuat.

Struktur per halaman: Hero ("IT solutions for \[Industry\]") → Industry challenges → Relevant solutions (link ke layanan) → Industry case studies → CTA.

Contoh H1: "Digital systems for clinics that want to serve patients faster"

### Insights — /insights

- **H1:** Technology insights for business owners and managers
- **Sub:** Practical guides, minus the jargon.
- **Kategori:** Web & SEO · Apps · Security & Infrastructure · Digital Business
- **CTA dalam artikel:** "Need help putting this into practice? Book a free consultation with our team."
- **Empty state pencarian:** "No articles found for "\[keyword\]". Try another term or browse our latest posts."

### Careers — /careers

- **H1:** Build digital products people rely on
- **Sub:** Join a team that values learning, collaboration, and real results.
- **Isi:** Why join us (benefits), how we work together, open roles, hiring process
- **Empty state lowongan:** "No open roles right now. Send us your CV and we'll reach out when there's a good fit." \[Send Your CV\]

### Pricing — /pricing (opsional)

Jika dibuat, tampilkan harga "starting from" per layanan, bukan harga final. Microcopy wajib: "Final pricing depends on your requirements. Consultations and quotes are always free."

## Voice, Tone & Microcopy

Suara brand: **an expert who's easy to talk to.** Paham teknis, tapi menjelaskan dengan bahasa bisnis yang sederhana, dalam bahasa Inggris yang ramah untuk pembaca non-native.

| Prinsip | Lakukan | Hindari |
| --- | --- | --- |
| Outcomes, not features | "Reports ready in 10 minutes" | "Real-time React-based dashboard" |
| Konsisten menyapa | "you" dan "we" | "the client", "users", "one" |
| Spesifik | "We reply within one business day" | "Fast response" |
| Jujur | "Starting from IDR \[X\]" | "The cheapest in Indonesia" |
| Plain English | "Keep your systems running" | "Leverage robust, scalable, end-to-end synergies" |
| Kalimat pendek | Maks. ±20 kata per kalimat, active voice | Kalimat pasif panjang |
| Kontraksi | "we'll", "you're", "don't" untuk nada hangat | Nada kaku seperti dokumen hukum (kecuali halaman legal) |

### Microcopy library

| Konteks | Copy |
| --- | --- |
| CTA primer | Get a Free Consultation |
| CTA sekunder | See Our Work · Explore Services · Chat on WhatsApp |
| CTA layanan spesifik | Talk to Us About \[Service\] |
| Tombol form | Send Request · Book My Consultation |
| Reassurance di bawah CTA | Free and no commitment. We reply within one business day. |
| Download company profile | Download Company Profile (PDF, 3 MB) |
| Link kartu | Learn more → · Read the case study → |
| WhatsApp prefilled message | Hi Daberau, I'm \[name\] from \[company\]. I'd like to discuss… |
| Tooltip anggaran | A rough range is fine. It helps us suggest the right solution. |
| Error umum | A few fields need your attention. Please check the highlighted fields. |
| 404 page | We can't find that page. It may have moved. \[Back to Home\] \[Explore Services\] |
| Newsletter sukses | You're in! Check your inbox to confirm your subscription. |
| Floating WhatsApp tooltip | Questions? Chat with our team. |
| Loading umum | Loading… |

### Aturan penulisan

- Ejaan: pilih satu standar (saran: US English, mis. "optimize", "color") dan konsisten.
- Heading section: sentence case ("What we do"). Label tombol dan menu: Title Case ("Get a Free Consultation").
- Angka: digit untuk ukuran/waktu (5 steps, 10 MB); "one business day" ditulis dengan kata untuk keterbacaan.
- Mata uang: IDR 10M / IDR 10,000,000 (koma sebagai pemisah ribuan).
- Waktu: 9 AM–5 PM WIB (GMT+7).
- Hindari klaim absolut ("best", "#1", "guaranteed first page on Google") tanpa bukti.

## SEO, Konten & Langkah Selanjutnya

Halaman detail layanan dan case study adalah prioritas SEO; homepage menargetkan kata kunci brand + "IT services". Karena copy berbahasa Inggris, kata kunci utama juga berbahasa Inggris; kata kunci lokal Indonesia ditangani lewat versi /id di Fase 2.

### Checklist SEO & teknis

- [ ] Satu H1 per halaman, berisi kata kunci utama
- [ ] URL bahasa Inggris, huruf kecil, tanda hubung
- [ ] Atribut `lang="en"` dan hreflang (en / id) jika versi Indonesia dibuat
- [ ] Schema: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article
- [ ] Breadcrumb di semua halaman level 2 ke bawah
- [ ] Internal link: services ↔ case studies ↔ insights
- [ ] Google Business Profile terhubung ke alamat di halaman Contact
- [ ] Event tracking: klik CTA, submit form, klik WhatsApp, unduh company profile
- [ ] Cookie banner aktif sebelum analytics berjalan, terhubung ke Privacy Policy

### Konten yang perlu disiapkan klien

- [ ] NIB dan dokumen legalitas perusahaan
- [ ] Minimal 3 case study lengkap dengan angka hasil
- [ ] Minimal 3 testimoni (dalam bahasa Inggris atau diterjemahkan dengan izin)
- [ ] Logo klien (dengan izin)
- [ ] Foto tim asli
- [ ] Statistik perusahaan (proyek, klien, tahun)
- [ ] Kisaran harga "starting from" per layanan
- [ ] Ketentuan garansi, SLA, skema pembayaran, dan kebijakan revisi (dipakai di Terms & Conditions)
- [ ] Daftar tool pihak ketiga yang memproses data (hosting, CRM, analytics, email) untuk Privacy Policy
- [ ] Nomor WhatsApp bisnis dan jam kerja (email, telepon, alamat sudah ada)
- [ ] Review teks legal oleh konsultan hukum

### Pertanyaan terbuka

- Apakah 6 layanan di atas sesuai dengan layanan yang benar-benar dijual, atau ada yang perlu digabung/dihapus?
- Apakah target pasar mayoritas lokal Indonesia atau internasional? Ini menentukan apakah versi /id perlu ada sejak peluncuran.
- Apakah harga akan ditampilkan secara publik?
- US English atau UK English?

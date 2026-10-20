import type { Metadata } from "next";
import { faqPage as f } from "@/content/faq";
import { whatsappCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: f.meta.title, description: f.meta.description };

export default function FaqPage() {
  const all = f.categories.flatMap((c) => c.items);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
        }}
      />
      <PageHero crumbs={[{ label: "FAQ" }]} title={f.h1}>
        <nav aria-label="FAQ categories">
          <ul className="flex flex-wrap gap-2">
            {f.categories.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="inline-flex rounded-full border border-neutral-300 bg-white px-4 py-2 text-[15px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-ink">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {f.categories.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`}>
              <h2 id={`${c.id}-h`} className="mb-4 text-[24px] font-bold text-ink">
                {c.title}
              </h2>
              <FaqAccordion items={c.items} />
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 rounded-card border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-ink">{f.bottom}</p>
            <LinkButton href={whatsappCta.href} external variant="secondary">
              <WhatsAppIcon className="h-5 w-5 text-[#128C7E]" />
              {whatsappCta.label}
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}

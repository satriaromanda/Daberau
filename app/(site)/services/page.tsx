import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { meta } from "@/content/meta";
import { eyebrows } from "@/content/eyebrows";
import { servicesOverview as o } from "@/content/services";
import { primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TechChip } from "@/components/ui/Placeholders";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesFilter } from "@/components/sections/ServicesFilter";

export const metadata: Metadata = { title: meta.services.title, description: meta.services.description };

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Services" }]} title={o.hero.h1} sub={o.hero.sub}>
        <LinkButton href={primaryCta.href} size="lg">
          {primaryCta.label}
        </LinkButton>
      </PageHero>

      <Section labelledBy="grid-title">
        <SectionHeading id="grid-title" eyebrow={eyebrows.servicesOverview.grid} title={o.grid.title} sub={o.grid.sub} />
        <ServicesFilter />
      </Section>

      <Section tone="muted" labelledBy="bundled-title">
        <div data-reveal className="flex flex-col gap-6 rounded-card border border-neutral-200 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex gap-5">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300 sm:inline-flex">
              <Layers className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="bundled-title" className="text-[24px] font-bold text-ink md:text-[28px]">
                {o.bundled.title}
              </h2>
              <p className="mt-2 max-w-xl text-lg text-neutral-600">{o.bundled.sub}</p>
            </div>
          </div>
          <LinkButton href={primaryCta.href} size="lg" className="shrink-0">
            {primaryCta.label}
          </LinkButton>
        </div>
      </Section>

      <Section labelledBy="tech-title">
        <SectionHeading id="tech-title" eyebrow={eyebrows.servicesOverview.tech} title={o.tech.title} sub={o.tech.sub} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {o.tech.items.map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="faq-title">
        <SectionHeading id="faq-title" eyebrow={eyebrows.servicesOverview.faq} title={o.faqTitle} sub={o.faqSub} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={o.faqs} />
        </div>
      </Section>
    </>
  );
}

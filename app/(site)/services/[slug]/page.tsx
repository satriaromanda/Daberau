import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CircleAlert } from "lucide-react";
import { getService, serviceBySlug, services, serviceTemplate as t } from "@/content/services";
import { eyebrows } from "@/content/eyebrows";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ServiceCard, TitledTextCard } from "@/components/ui/Cards";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { IconTile } from "@/components/ui/Icons";
import { TechChip } from "@/components/ui/Placeholders";
import { Photo } from "@/components/ui/Photo";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.meta.title, description: s.meta.description } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.keyword, provider: { "@type": "Organization", name: "Daberau" } }} />

      {/* 1. Hero */}
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        eyebrow={
          <span className="inline-flex items-center gap-3 normal-case tracking-normal">
            <IconTile name={s.icon} size="sm" />
            <span className="text-[15px] text-ink">{s.name}</span>
          </span>
        }
        title={s.hero.h1}
        sub={s.hero.sub}
        aside={<Photo src={s.image.src} alt={s.image.alt} aspect="aspect-[16/9] lg:aspect-[4/3]" priority />}
      >
        <LinkButton href={s.hero.cta.href} size="lg">
          {s.hero.cta.label}
        </LinkButton>
        {s.hero.micro && <p className="mt-3 text-sm text-neutral-600">{s.hero.micro}</p>}
      </PageHero>

      {/* 2. Problem */}
      <Section labelledBy="problem-title">
        <SectionHeading id="problem-title" eyebrow={eyebrows.serviceDetail.problem} title={s.problem.title} sub={t.problemSub} />
        <ul className="grid gap-4 lg:grid-cols-3">
          {s.problem.points.map((p, i) => (
            <li
              key={p}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="flex gap-4 rounded-card border border-neutral-200 bg-white p-6"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                <CircleAlert className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="pt-1.5 text-[17px] leading-relaxed text-ink">
                <Text>{p}</Text>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Solution & scope */}
      <Section tone="muted" labelledBy="deliver-title">
        <SectionHeading id="deliver-title" eyebrow={eyebrows.serviceDetail.deliver} title={t.deliver.title} sub={t.deliver.sub} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.deliver.map((d, i) => (
            <li
              key={i}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
              className="flex items-center gap-3 rounded-card border border-neutral-200 bg-white px-5 py-4 font-semibold text-ink"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <Text>{d}</Text>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Benefits */}
      <Section labelledBy="benefits-title">
        <SectionHeading id="benefits-title" eyebrow={eyebrows.serviceDetail.benefits} title={t.benefits.title} sub={t.benefits.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {s.benefits.map((b, i) => (
            <TitledTextCard key={i} title={b.title} body={b.body} index={i + 1} delay={i * 90} />
          ))}
        </div>
      </Section>

      {/* 5. Process */}
      <Section tone="muted" labelledBy="process-title">
        <SectionHeading id="process-title" eyebrow={eyebrows.serviceDetail.process} title={t.process.title} sub={t.process.sub} />
        <ProcessSteps steps={s.process} />
      </Section>

      {/* 6. Tech stack */}
      <Section labelledBy="tech-title">
        <SectionHeading id="tech-title" eyebrow={eyebrows.serviceDetail.tech} title={t.tech.title} sub={t.tech.sub} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {s.techStack.map((x, i) => (
            <li key={i}>
              <TechChip name={x} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Service FAQ */}
      <Section tone="muted" labelledBy="faq-title">
        <SectionHeading id="faq-title" eyebrow={eyebrows.serviceDetail.faq} title={t.faq.title} sub={t.faq.sub} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={s.faqs} />
        </div>
      </Section>

      {/* 8. Related services */}
      <Section labelledBy="related-title">
        <SectionHeading id="related-title" eyebrow={eyebrows.serviceDetail.related} title={t.related.title} sub={t.related.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {s.related.map((r, i) => (
            <ServiceCard key={r} service={serviceBySlug(r)} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}

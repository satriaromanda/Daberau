import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { getService, serviceBySlug, services, serviceTemplate as t } from "@/content/services";
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
import { ClosingCta } from "@/components/sections/ClosingCta";
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
        <SectionHeading id="problem-title" title={s.problem.title} sub={t.problemSub} />
        <ul className="grid gap-4 lg:grid-cols-3">
          {s.problem.points.map((p) => (
            <li key={p} className="flex gap-3 rounded-card border border-neutral-200 bg-white p-6">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
              <span className="text-[17px] leading-relaxed text-ink">
                <Text>{p}</Text>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Solution & scope */}
      <Section tone="muted" labelledBy="deliver-title">
        <SectionHeading id="deliver-title" title={t.deliver.title} sub={t.deliver.sub} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.deliver.map((d, i) => (
            <li key={i} className="flex items-center gap-3 rounded-card border border-neutral-200 bg-white px-5 py-4 font-semibold text-ink">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <Text>{d}</Text>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Benefits */}
      <Section labelledBy="benefits-title">
        <SectionHeading id="benefits-title" title={t.benefits.title} sub={t.benefits.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {s.benefits.map((b, i) => (
            <TitledTextCard key={i} title={b.title} body={b.body} index={i + 1} />
          ))}
        </div>
      </Section>

      {/* 5. Process */}
      <Section tone="muted" labelledBy="process-title">
        <SectionHeading id="process-title" title={t.process.title} sub={t.process.sub} />
        <ProcessSteps steps={s.process} />
      </Section>

      {/* 6. Packages / pricing */}
      <Section tone="muted" labelledBy="packages-title">
        <SectionHeading id="packages-title" title={t.packages.title} sub={t.packages.sub} />
        <div className="hidden overflow-hidden rounded-card border border-neutral-200 bg-white md:block">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-sm uppercase tracking-wider text-neutral-600">
              <tr>
                {["Package", "Best for", "What's included", "Price"].map((h) => (
                  <th key={h} scope="col" className="px-6 py-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {s.packages.rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className="px-6 py-5 text-lg font-bold text-ink">
                    {r.name}
                  </th>
                  <td className="px-6 py-5 text-neutral-700">{r.bestFor}</td>
                  <td className="px-6 py-5 text-neutral-700">{r.included}</td>
                  <td className="px-6 py-5 font-semibold text-ink">
                    <Text>{r.price}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="grid gap-4 md:hidden">
          {s.packages.rows.map((r) => (
            <li key={r.name} className="rounded-card border border-neutral-200 bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold text-ink">{r.name}</h3>
                <p className="font-semibold text-ink">
                  <Text>{r.price}</Text>
                </p>
              </div>
              <dl className="mt-3 space-y-2 text-[15px]">
                <div>
                  <dt className="text-neutral-500">Best for</dt>
                  <dd className="text-neutral-700">{r.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">What&apos;s included</dt>
                  <dd className="text-neutral-700">{r.included}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-[15px] text-neutral-600">{s.packages.note}</p>
      </Section>

      {/* 7. Tech stack */}
      <Section labelledBy="tech-title">
        <SectionHeading id="tech-title" title={t.tech.title} sub={t.tech.sub} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {s.techStack.map((x, i) => (
            <li key={i}>
              <TechChip name={x} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Service FAQ */}
      <Section tone="muted" labelledBy="faq-title">
        <SectionHeading id="faq-title" title={t.faq.title} sub={t.faq.sub} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={s.faqs} />
        </div>
      </Section>

      {/* 9. Related services */}
      <Section labelledBy="related-title">
        <SectionHeading id="related-title" title={t.related.title} sub={t.related.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {s.related.map((r) => (
            <ServiceCard key={r} service={serviceBySlug(r)} />
          ))}
        </div>
      </Section>

      {/* 10. Closing CTA */}
      <ClosingCta headline={t.closing.headline} sub={t.closing.sub} primary={s.hero.cta} />
    </>
  );
}

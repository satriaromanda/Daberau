import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { caseStudies, caseStudiesPage as p, getCaseStudy } from "@/content/caseStudies";
import { serviceBySlug } from "@/content/services";
import { primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/ui/Cards";
import { ImagePlaceholder } from "@/components/ui/Placeholders";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SampleTag, Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import Link from "next/link";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  return c ? { title: `${c.title.replace(/\[X\]/g, "X")} | Daberau Case Study`, description: `${c.client} · ${c.industry}. ${c.challenge[0]}` } : {};
}

export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const d = p.detail;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: c.client }]}
        eyebrow={`${c.client} · ${c.industry}`}
        title={c.title}
        aside={<ImagePlaceholder label={c.imageLabel} aspect="aspect-[16/9] lg:aspect-[4/3]" />}
      >
        <SampleTag label="Sample case study" />
      </PageHero>

      {/* 1. At a glance */}
      <Section labelledBy="glance-title">
        <SectionHeading id="glance-title" title={d.glance} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <dl className="divide-y divide-neutral-200 rounded-card border border-neutral-200">
            {[
              [d.glanceLabels.client, c.client],
              [d.glanceLabels.industry, c.industry],
              [d.glanceLabels.duration, c.glance.duration],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-5 py-3.5">
                <dt className="text-neutral-600">{k}</dt>
                <dd className="text-right font-semibold text-ink">
                  <Text>{v}</Text>
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 px-5 py-3.5">
              <dt className="text-neutral-600">{d.glanceLabels.services}</dt>
              <dd className="flex flex-col items-end gap-1 text-right font-semibold">
                {c.services.map((s) => (
                  <Link key={s} href={`/services/${s}`} className="text-brand hover:text-brand-700 hover:underline">
                    {serviceBySlug(s).name}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
          <dl className="grid gap-4 sm:grid-cols-3">
            {c.glance.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse justify-end rounded-card border border-neutral-200 bg-neutral-50 p-5">
                <dt className="mt-2 text-[15px] text-neutral-600">{m.label}</dt>
                <dd className="text-[32px] font-extrabold leading-none text-brand">
                  <Text>{m.value}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 2–3. Challenge & solution */}
      <Section tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { id: "challenge", title: d.challenge, paras: c.challenge, label: "The challenge" },
            { id: "solution", title: d.solution, paras: c.solution, label: "The solution" },
          ].map((b) => (
            <section key={b.id} aria-labelledby={b.id} className="rounded-card border border-neutral-200 bg-white p-7 md:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-brand">{b.label}</p>
              <h2 id={b.id} className="mt-2 text-[24px] font-bold text-ink">
                {b.title}
              </h2>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-neutral-700">
                {b.paras.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>

      {/* 4. Process */}
      <Section labelledBy="process-title">
        <SectionHeading id="process-title" title={d.process} sub={d.processSub} />
        <ProcessSteps steps={c.process} />
      </Section>

      {/* 5. Results */}
      <Section tone="muted" labelledBy="results-title">
        <SectionHeading id="results-title" title={d.results} sub={d.resultsSub} />
        <div className="overflow-x-auto rounded-card border border-neutral-200 bg-white">
          <table className="w-full min-w-[480px] text-left">
            <thead className="bg-neutral-50 text-sm uppercase tracking-wider text-neutral-600">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  <span className="sr-only">Metric</span>
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  {d.resultsCols.before}
                </th>
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  {d.resultsCols.after}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {c.results.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">
                    {r.label}
                  </th>
                  <td className="px-5 py-4 text-neutral-600">
                    <Text>{r.before}</Text>
                  </td>
                  <td className="px-5 py-4 font-bold text-brand">
                    <Text>{r.after}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 6. Testimonial */}
      <Section labelledBy="quote-title">
        <h2 id="quote-title" className="sr-only">
          Client testimonial
        </h2>
        <div className="mx-auto max-w-3xl">
          <TestimonialCard t={c.testimonial} />
        </div>
      </Section>

      {/* 7. Gallery */}
      <Section tone="muted" labelledBy="gallery-title">
        <SectionHeading id="gallery-title" title={d.gallery} sub={d.gallerySub} />
        <div className="grid gap-4 md:grid-cols-3">
          {c.gallery.map((g) => (
            <ImagePlaceholder key={g} label={g} aspect="aspect-[16/9] lg:aspect-[4/3]" />
          ))}
        </div>
      </Section>

      {/* 8. CTA */}
      <section aria-labelledby="cs-cta" className="bg-white py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 id="cs-cta" className="text-[28px] font-bold leading-tight text-ink md:text-[36px]">
              {d.cta}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-neutral-600">{d.ctaSub}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href={primaryCta.href} size="lg">
              {primaryCta.label}
            </LinkButton>
            <LinkButton href="/case-studies" variant="secondary" size="lg">
              View All Case Studies <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

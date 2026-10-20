import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry, industries, industriesPage as p } from "@/content/industries";
import { caseStudies } from "@/content/caseStudies";
import { serviceBySlug } from "@/content/services";
import { primaryCta } from "@/content/site";
import { home } from "@/content/home";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { CaseStudyCard, ServiceCard, TitledTextCard } from "@/components/ui/Cards";
import { IconTile } from "@/components/ui/Icons";
import { SampleTag } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  return i ? { title: i.meta.title, description: i.meta.description } : {};
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const cases = caseStudies.filter((c) => c.industrySlug === ind.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        eyebrow={
          <span className="inline-flex items-center gap-3 normal-case tracking-normal">
            <IconTile name={ind.icon} size="sm" />
            <span className="text-[15px] text-ink">{ind.name}</span>
          </span>
        }
        title={ind.h1}
        sub={ind.sub}
      >
        <div className="flex flex-col items-start gap-4">
          <LinkButton href={primaryCta.href} size="lg">
            {primaryCta.label}
          </LinkButton>
          <SampleTag label="Subheadline is sample copy" />
        </div>
      </PageHero>

      <Section labelledBy="challenges-title">
        <SectionHeading id="challenges-title" title={p.labels.challenges} sub={p.labels.challengesSub} extra={<SampleTag />} />
        <div className="grid gap-4 md:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <TitledTextCard key={c.title} title={c.title} body={c.body} index={i + 1} />
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="solutions-title">
        <SectionHeading id="solutions-title" title={p.labels.solutions} sub={p.labels.solutionsSub} />
        <div className="grid gap-4 md:grid-cols-3">
          {ind.services.map((s) => (
            <ServiceCard key={s} service={serviceBySlug(s)} />
          ))}
        </div>
      </Section>

      <Section labelledBy="cases-title">
        <SectionHeading id="cases-title" title={p.labels.caseStudies} sub={p.labels.caseStudiesSub} />
        {cases.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <CaseStudyCard key={c.slug} cs={c} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
            <p className="mx-auto max-w-lg text-neutral-600">{p.labels.noCases}</p>
            <LinkButton href={primaryCta.href} variant="secondary" className="mt-5">
              {primaryCta.label}
            </LinkButton>
          </div>
        )}
      </Section>

      <ClosingCta headline={home.closing.headline} sub={home.closing.sub} />
    </>
  );
}

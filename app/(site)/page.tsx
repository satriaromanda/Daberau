import { CheckCircle2 } from "lucide-react";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { caseStudies } from "@/content/caseStudies";
import { processSteps } from "@/content/process";
import { testimonials } from "@/content/testimonials";
import { articles } from "@/content/insights";
import { stats } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ArticleCard, CaseStudyCard, ServiceCard, StatsGrid, TestimonialCard, TextLink } from "@/components/ui/Cards";
import { IconTile } from "@/components/ui/Icons";
import { DashboardMockup } from "@/components/ui/Placeholders";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SampleTag, Text } from "@/components/ui/Text";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default function HomePage() {
  const { hero } = home;
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-semibold text-neutral-700">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 text-[36px] font-extrabold leading-[1.08] tracking-tight text-ink md:text-[56px]">{hero.h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl">{hero.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={hero.primary.href} size="lg">
                {hero.primary.label}
              </LinkButton>
              <LinkButton href={hero.secondary.href} variant="secondary" size="lg">
                {hero.secondary.label}
              </LinkButton>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
              {hero.micro}
            </p>
          </div>
          <DashboardMockup label={hero.visualLabel} />
        </div>
      </section>

      {/* 2. Trust bar */}
      <section aria-labelledby="trust-label" className="border-b border-neutral-200/70 bg-white py-10">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="trust-label" className="mb-6 text-center text-sm font-semibold text-neutral-600">
            {home.trust.label}
          </h2>
          <LogoStrip count={home.trust.logoCount} />
        </div>
      </section>

      {/* 3. Pain points */}
      <Section labelledBy="pain-title">
        <SectionHeading id="pain-title" title={home.pain.title} sub={home.pain.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.pain.cards.map((c) => (
            <div key={c.title} className="rounded-card border border-neutral-200 bg-white p-6">
              <IconTile name={c.icon} size="sm" />
              <h3 className="mt-4 text-[17px] font-bold leading-snug text-pretty text-ink">{c.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 flex items-start gap-3 rounded-card border border-neutral-200 bg-neutral-50 px-5 py-4 text-lg font-semibold text-ink">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          {home.pain.closing}
        </p>
      </Section>

      {/* 4. Services */}
      <Section tone="muted" labelledBy="services-title">
        <SectionHeading id="services-title" title={home.services.title} sub={home.services.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href={home.services.cta.href} variant="secondary">
            {home.services.cta.label}
          </LinkButton>
        </div>
      </Section>

      {/* 5. Why Daberau */}
      <Section labelledBy="why-title">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading id="why-title" title={home.why.title} className="mb-0" />
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {home.why.points.map((p) => (
              <li key={p.title} className="border-t-2 border-brand pt-5">
                <h3 className="text-[17px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  <Text>{p.body}</Text>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 6. Stats */}
      <section aria-label="Company numbers" className="border-y border-neutral-200/70 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* 7. Featured case studies */}
      <Section labelledBy="cases-title">
        <SectionHeading id="cases-title" title={home.featured.title} extra={<SampleTag label="Sample case studies" />} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} />
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href={home.featured.cta.href} variant="secondary">
            {home.featured.cta.label}
          </LinkButton>
        </div>
      </Section>

      {/* 8. How we work */}
      <Section tone="muted" labelledBy="process-title">
        <SectionHeading id="process-title" title={home.process.title} />
        <ProcessSteps steps={processSteps} />
        <div className="mt-10">
          <TextLink href={home.process.link.href}>{home.process.link.label}</TextLink>
        </div>
      </Section>

      {/* 9. Testimonials */}
      <Section labelledBy="testimonials-title">
        <SectionHeading id="testimonials-title" title={home.testimonials.title} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </Section>

      {/* 10. Latest insights */}
      <Section tone="muted" labelledBy="insights-title">
        <SectionHeading id="insights-title" title={home.insights.title} extra={<SampleTag label="Sample articles" />} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href={home.insights.cta.href} variant="secondary">
            {home.insights.cta.label}
          </LinkButton>
        </div>
      </Section>

      {/* 11. Closing CTA */}
      <ClosingCta headline={home.closing.headline} sub={home.closing.sub} />
    </>
  );
}

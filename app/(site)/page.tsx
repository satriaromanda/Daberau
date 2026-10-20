import { CheckCircle2 } from "lucide-react";
import { home } from "@/content/home";
import { eyebrows } from "@/content/eyebrows";
import { services } from "@/content/services";
import { industries, industriesPage } from "@/content/industries";
import { IndustryVisual } from "@/components/ui/IndustryVisual";
import { Icon } from "@/components/ui/Icons";
import Link from "next/link";
import { processSteps } from "@/content/process";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { ServiceCard, TextLink } from "@/components/ui/Cards";
import { IconTile } from "@/components/ui/Icons";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Text } from "@/components/ui/Text";

export default function HomePage() {
  const { hero } = home;
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8 lg:pt-20">
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
          <div className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_48px_-20px_rgba(191,30,46,0.25)]">
            <Image
              src={asset(hero.image.src)}
              alt={hero.image.alt}
              width={1600}
              height={852}
              priority
              sizes="(min-width: 1024px) 620px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* 2. Pain points */}
      <Section labelledBy="pain-title">
        <SectionHeading id="pain-title" eyebrow={eyebrows.home.pain} title={home.pain.title} sub={home.pain.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.pain.cards.map((c, i) => (
            <div
              key={c.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="rounded-card border border-neutral-200 bg-white p-6 md:p-7"
            >
              <IconTile name={c.icon} />
              <h3 className="mt-6 text-[19px] font-bold leading-snug text-pretty text-ink">{c.title}</h3>
              <p className="mt-2.5 leading-relaxed text-neutral-600 md:text-[17px]">{c.body}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-8 flex items-start gap-3 rounded-card border border-brand/15 bg-brand-50/60 px-5 py-4 text-lg font-semibold text-ink">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          {home.pain.closing}
        </p>
      </Section>

      {/* 3. Services */}
      <Section tone="muted" labelledBy="services-title">
        <SectionHeading id="services-title" eyebrow={eyebrows.home.services} title={home.services.title} sub={home.services.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <LinkButton href={home.services.cta.href} variant="secondary">
            {home.services.cta.label}
          </LinkButton>
        </div>
      </Section>

      {/* 4. Industries */}
      <Section labelledBy="industries-title">
        <SectionHeading id="industries-title" eyebrow={eyebrows.home.industries} title={industriesPage.home.title} sub={industriesPage.home.sub} />
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <li key={ind.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <Link
                href={`/industries#${ind.slug}`}
                className="card-interactive group relative block aspect-[4/3] overflow-hidden rounded-card border border-neutral-200"
              >
                <IndustryVisual industry={ind} sizes="(min-width: 1024px) 380px, 50vw" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4 text-[15px] font-bold leading-snug text-white md:p-5 md:text-[17px]">
                  <Icon name={ind.icon} className="h-5 w-5 shrink-0" />
                  {ind.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <TextLink href="/industries">{industriesPage.home.link}</TextLink>
        </div>
      </Section>

      {/* 5. Why Daberau */}
      <Section tone="muted" labelledBy="why-title">
        <SectionHeading id="why-title" eyebrow={eyebrows.home.why} title={home.why.title} sub={home.why.sub} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.why.points.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="relative overflow-hidden rounded-card border border-neutral-200 bg-white p-6 md:p-7"
            >
              <IconTile name={p.icon} />
              <h3 className="mt-6 text-[19px] font-bold leading-snug text-pretty text-ink">{p.title}</h3>
              <p className="mt-2.5 leading-relaxed text-neutral-600 md:text-[17px]">
                <Text>{p.body}</Text>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. How we work */}
      <Section labelledBy="process-title">
        <SectionHeading id="process-title" eyebrow={eyebrows.home.process} title={home.process.title} sub={home.process.sub} />
        <ProcessSteps steps={processSteps} />
        <div className="mt-10 flex justify-center">
          <TextLink href={home.process.link.href}>{home.process.link.label}</TextLink>
        </div>
      </Section>
    </>
  );
}

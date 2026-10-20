import type { Metadata } from "next";
import { BadgeCheck, Download, Eye, Linkedin, Target, UserRound } from "lucide-react";
import { about } from "@/content/about";
import { microcopy, stats } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { StatsGrid, TitledTextCard } from "@/components/ui/Cards";
import { ImagePlaceholder, LogoPlaceholder } from "@/components/ui/Placeholders";
import { SampleTag, Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: about.meta.title, description: about.meta.description };

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        title={about.hero.h1}
        sub={about.hero.sub}
        aside={<ImagePlaceholder label="Team photo at the Kalideres office" aspect="aspect-[16/9] lg:aspect-[4/3]" />}
      />

      {/* Our story */}
      <Section labelledBy="story-title">
        <SectionHeading id="story-title" title={about.story.title} sub={about.story.sub} />
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-neutral-700">
          <p>
            <Text>{about.story.opening}</Text>
          </p>
          <div>
            <p>{about.story.middle}</p>
            <SampleTag className="mt-2" />
          </div>
          <p>
            <Text>{about.story.closing}</Text>
          </p>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section tone="muted" labelledBy="vm-title">
        <SectionHeading id="vm-title" title={about.visionMission.title} sub={about.visionMission.sub} />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-card border border-neutral-200 bg-white p-8">
            <Eye className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-neutral-600">{about.vision.title}</h3>
            <p className="mt-3 text-[24px] font-bold leading-snug text-ink md:text-[28px]">{about.vision.body}</p>
          </div>
          <div className="rounded-card border border-neutral-200 bg-white p-8">
            <Target className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-neutral-600">{about.mission.title}</h3>
            <ol className="mt-3 space-y-3">
              {about.mission.items.map((m, i) => (
                <li key={m} className="flex gap-3 text-lg font-semibold text-ink">
                  <span className="text-brand">{i + 1}.</span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title">
        <SectionHeading id="values-title" title={about.values.title} sub={about.values.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.items.map((v) => (
            <TitledTextCard key={v.title} title={v.title} body={v.body} />
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section tone="muted" labelledBy="team-title">
        <SectionHeading id="team-title" title={about.team.title} sub={about.team.sub} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.team.members.map((m, i) => (
            <li key={i} className="overflow-hidden rounded-card border border-neutral-200 bg-white">
              <div role="img" aria-label="Team photo placeholder" className="img-ph flex aspect-square items-center justify-center border-b border-neutral-200 text-neutral-400">
                <UserRound className="h-12 w-12" aria-hidden="true" />
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <p className="font-bold text-ink">
                    <Text>{m.name}</Text>
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{m.role}</p>
                </div>
                <a
                  href="#"
                  aria-label={`LinkedIn profile (link to be added)`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn border border-neutral-200 text-neutral-600 hover:text-brand"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Numbers */}
      <Section labelledBy="numbers-title">
        <SectionHeading id="numbers-title" title={about.numbers.title} sub={about.numbers.sub} />
        <StatsGrid stats={stats} />
      </Section>

      {/* Legal & certifications */}
      <Section tone="muted" labelledBy="legal-title">
        <SectionHeading id="legal-title" title={about.legal.title} sub={about.legal.sub} />
        <div className="mx-auto max-w-3xl">
          <div>
            <dl className="divide-y divide-neutral-200 rounded-card border border-neutral-200 bg-white">
              {about.legal.items.map((it) => (
                <div key={it.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <dt className="flex w-40 shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-600">
                    <BadgeCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                    {it.label}
                  </dt>
                  <dd className="font-semibold text-ink">
                    <Text>{it.value}</Text>
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href="#"
              aria-disabled="true"
              title="PDF to be added"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-700"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {microcopy.companyProfile}
            </a>
          </div>
        </div>
      </Section>

      {/* Clients & partners */}
      <Section labelledBy="clients-title">
        <SectionHeading id="clients-title" title={about.clients.title} sub={about.clients.sub} />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: about.clients.logoCount }, (_, i) => (
            <li key={i}>
              <LogoPlaceholder index={i + 1} className="h-16" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Dual CTA */}
      <section aria-label="Work with us or join us" className="bg-white pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-[1200px] gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[about.dual.clients, about.dual.talent].map((d, i) => (
            <div key={d.title} className="flex flex-col items-start rounded-card border border-neutral-200 bg-neutral-50 p-8">
              <h2 className="text-[24px] font-bold text-ink">{d.title}</h2>
              <p className="mt-2 text-lg leading-relaxed text-neutral-600">{d.sub}</p>
              <LinkButton href={d.cta.href} variant={i === 0 ? "primary" : "secondary"} size="lg" className="mt-6">
                {d.cta.label}
              </LinkButton>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

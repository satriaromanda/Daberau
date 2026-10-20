import type { Metadata } from "next";
import { BadgeCheck, ClipboardList, Code2, Eye, Lightbulb, PenTool, Target } from "lucide-react";
import { about } from "@/content/about";
import { stats } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Container";
import { StatsGrid, TitledTextCard } from "@/components/ui/Cards";
import { Photo } from "@/components/ui/Photo";
import { Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: about.meta.title, description: about.meta.description };

const roleIcons = [Lightbulb, Code2, PenTool, ClipboardList];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        title={about.hero.h1}
        sub={about.hero.sub}
        aside={<Photo src={about.heroImage.src} alt={about.heroImage.alt} aspect="aspect-[16/9] lg:aspect-[4/3]" priority />}
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
          {about.team.members.map((m, i) => {
            const RoleIcon = roleIcons[i % roleIcons.length];
            return (
              <li key={m.role} className="rounded-card border border-neutral-200 bg-white p-6 md:p-7">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <RoleIcon className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[19px] font-bold leading-snug text-ink">{m.role}</h3>
                <p className="mt-2.5 leading-relaxed text-neutral-500 md:text-[17px]">{m.focus}</p>
              </li>
            );
          })}
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
          </div>
        </div>
      </Section>
    </>
  );
}

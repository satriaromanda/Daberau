import type { Metadata } from "next";
import { careers as c } from "@/content/careers";
import { Section, SectionHeading } from "@/components/ui/Container";
import { TitledTextCard } from "@/components/ui/Cards";
import { Photo } from "@/components/ui/Photo";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { PageHero } from "@/components/sections/PageHero";
import { OpenRoles } from "@/components/sections/OpenRoles";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description };

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        title={c.h1}
        sub={c.sub}
        aside={<Photo src={c.images.hero.src} alt={c.images.hero.alt} aspect="aspect-[16/9] lg:aspect-[4/3]" priority />}
      />

      <Section labelledBy="why-title">
        <SectionHeading id="why-title" title={c.why.title} sub={c.why.sub} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.why.items.map((w) => (
            <TitledTextCard key={w.title} title={w.title} body={w.body} />
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="together-title">
        <SectionHeading id="together-title" title={c.together.title} />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-neutral-700">{c.together.body}</p>
          </div>
          <Photo src={c.images.together.src} alt={c.images.together.alt} aspect="aspect-[16/10]" />
        </div>
      </Section>

      <Section labelledBy="roles-title" id="open-roles">
        <SectionHeading
          id="roles-title"
          title={c.roles.title}
          sub={c.roles.sub}
        />
        <OpenRoles />
      </Section>

      <Section tone="muted" labelledBy="hiring-title">
        <SectionHeading id="hiring-title" title={c.hiring.title} sub={c.hiring.sub} />
        <ProcessSteps steps={c.hiring.steps} />
      </Section>
    </>
  );
}

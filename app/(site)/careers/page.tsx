import type { Metadata } from "next";
import { careers as c } from "@/content/careers";
import { Section, SectionHeading } from "@/components/ui/Container";
import { TitledTextCard } from "@/components/ui/Cards";
import { ImagePlaceholder } from "@/components/ui/Placeholders";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SampleTag } from "@/components/ui/Text";
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
        aside={<ImagePlaceholder label="Team at work in the office" aspect="aspect-[16/9] lg:aspect-[4/3]" />}
      />

      <Section labelledBy="why-title">
        <SectionHeading id="why-title" title={c.why.title} extra={<SampleTag />} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.why.items.map((w) => (
            <TitledTextCard key={w.title} title={w.title} body={w.body} />
          ))}
        </div>
      </Section>

      <Section tone="muted" labelledBy="together-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading id="together-title" title={c.together.title} className="mb-0" />
            <p className="mt-5 text-lg leading-relaxed text-neutral-700">{c.together.body}</p>
            <SampleTag className="mt-3" />
          </div>
          <ImagePlaceholder label="Weekly demo with the project team" aspect="aspect-[16/10]" />
        </div>
      </Section>

      <Section labelledBy="roles-title" id="open-roles">
        <SectionHeading
          id="roles-title"
          title={c.roles.title}
          extra={
            <p className="text-sm text-neutral-600">
              <SampleTag label="Sample roles" /> <span className="ml-2">Add <code className="rounded bg-neutral-100 px-1">?roles=0</code> to preview the empty state.</span>
            </p>
          }
        />
        <OpenRoles />
      </Section>

      <Section tone="muted" labelledBy="hiring-title">
        <SectionHeading id="hiring-title" title={c.hiring.title} extra={<SampleTag />} />
        <ProcessSteps steps={c.hiring.steps} />
      </Section>
    </>
  );
}

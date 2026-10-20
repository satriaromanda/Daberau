import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { howWeWork as h } from "@/content/howWeWork";
import { processSteps } from "@/content/process";
import { primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { TitledTextCard } from "@/components/ui/Cards";
import { TechChip } from "@/components/ui/Placeholders";
import { SampleTag, Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: h.meta.title, description: h.meta.description };

export default function HowWeWorkPage() {
  const labels = [h.labels.happens, h.labels.get, h.labels.time, h.labels.role];
  return (
    <>
      <PageHero crumbs={[{ label: "How We Work" }]} title={h.h1}>
        <LinkButton href={primaryCta.href} size="lg">
          {primaryCta.label}
        </LinkButton>
      </PageHero>

      <Section labelledBy="stages-title">
        <h2 id="stages-title" className="sr-only">
          The 5 stages
        </h2>
        <div className="mb-6">
          <SampleTag label="Stage details are sample copy" />
        </div>
        <ol className="space-y-6">
          {processSteps.map((step, i) => {
            const st = h.stages[i];
            const vals = [st.happens, st.get, st.time, st.role];
            return (
              <li key={step.title} className="grid gap-6 rounded-card border border-neutral-200 bg-white p-6 md:p-8 lg:grid-cols-[280px_1fr]">
                <div className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-[22px] font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-neutral-600">{step.body}</p>
                  </div>
                </div>
                <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {labels.map((l, j) => (
                    <div key={l}>
                      <dt className="text-sm font-bold uppercase tracking-wider text-neutral-500">{l}</dt>
                      <dd className="mt-1.5 leading-relaxed text-ink">
                        <Text>{vals[j]}</Text>
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="muted" labelledBy="models-title">
        <SectionHeading id="models-title" title={h.engagement.title} extra={<SampleTag />} />
        <div className="grid gap-4 md:grid-cols-3">
          {h.engagement.items.map((m) => (
            <TitledTextCard key={m.title} title={m.title} body={m.body} />
          ))}
        </div>
      </Section>

      <Section labelledBy="warranty-title">
        <SectionHeading id="warranty-title" title={h.warranty.title} extra={<SampleTag />} />
        <ul className="grid gap-4 md:grid-cols-3">
          {h.warranty.items.map((w) => (
            <li key={w.title} className="flex gap-4 rounded-card border border-neutral-200 p-6">
              <ShieldCheck className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-ink">{w.title}</h3>
                <p className="mt-1.5 leading-relaxed text-neutral-600">
                  <Text>{w.body}</Text>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="tools-title">
        <SectionHeading id="tools-title" title={h.tools.title} extra={<SampleTag label="Sample tools" />} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {h.tools.items.map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { howWeWork as h } from "@/content/howWeWork";
import { eyebrows } from "@/content/eyebrows";
import { IconTile } from "@/components/ui/Icons";
import { processSteps } from "@/content/process";
import { primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { TitledTextCard } from "@/components/ui/Cards";
import { TechChip } from "@/components/ui/Placeholders";
import { Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: h.meta.title, description: h.meta.description };

export default function HowWeWorkPage() {
  const labels = [h.labels.happens, h.labels.get, h.labels.time, h.labels.role];
  return (
    <>
      <PageHero crumbs={[{ label: "How We Work" }]} title={h.h1} sub={h.sub}>
        <LinkButton href={primaryCta.href} size="lg">
          {primaryCta.label}
        </LinkButton>
      </PageHero>

      <Section labelledBy="stages-title">
        <SectionHeading id="stages-title" eyebrow={eyebrows.howWeWork.stages} title={h.stagesTitle} />
        <ol className="space-y-6">
          {processSteps.map((step, i) => {
            const st = h.stages[i];
            const vals = [st.happens, st.get, st.time, st.role];
            return (
              <li
                key={step.title}
                data-reveal
                className="relative grid gap-6 overflow-hidden rounded-card border border-neutral-200 bg-white p-6 md:p-8 lg:grid-cols-[300px_1fr]"
              >
                <div className="flex gap-4">
                  {step.icon && <IconTile name={step.icon} />}
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-wider text-brand">Step {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-[22px] font-bold text-ink">{step.title}</h3>
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
        <SectionHeading id="models-title" eyebrow={eyebrows.howWeWork.models} title={h.engagement.title} sub={h.engagement.sub} />
        <div className="grid gap-4 md:grid-cols-3">
          {h.engagement.items.map((m, i) => (
            <TitledTextCard key={m.title} title={m.title} body={m.body} delay={i * 90} />
          ))}
        </div>
      </Section>

      <Section labelledBy="warranty-title">
        <SectionHeading id="warranty-title" eyebrow={eyebrows.howWeWork.warranty} title={h.warranty.title} sub={h.warranty.sub} />
        <ul className="grid gap-4 md:grid-cols-3">
          {h.warranty.items.map((w, i) => (
            <li key={w.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="flex gap-4 rounded-card border border-neutral-200 bg-white p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
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
        <SectionHeading id="tools-title" eyebrow={eyebrows.howWeWork.tools} title={h.tools.title} sub={h.tools.sub} />
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

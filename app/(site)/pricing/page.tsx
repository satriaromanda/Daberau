import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { pricing as p } from "@/content/pricing";
import { serviceBySlug, services } from "@/content/services";
import { microcopy, primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icons";
import { Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

export default function PricingPage() {
  const web = serviceBySlug("web-development");
  return (
    <>
      <PageHero crumbs={[{ label: "Pricing" }]} title={p.h1}>
        <p className="flex items-start gap-3 rounded-card border border-neutral-200 bg-white px-5 py-4 text-lg text-ink">
          <Info className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          {p.micro}
        </p>
      </PageHero>

      <Section labelledBy="per-service">
        <h2 id="per-service" className="sr-only">
          Starting prices per service
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="flex flex-col rounded-card border border-neutral-200 bg-white p-6">
              <IconTile name={s.icon} />
              <h3 className="mt-5 text-lg font-bold text-ink">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{s.short}</p>
              <p className="mt-5 border-t border-neutral-100 pt-4 text-xl font-bold text-ink">
                <Text>{p.startingFrom}</Text>
              </p>
              <Link href={`/services/${s.slug}`} className="mt-4 text-sm font-semibold text-brand hover:text-brand-700">
                {microcopy.learnMore}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" labelledBy="web-packages">
        <SectionHeading id="web-packages" title={p.webPackagesTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {web.packages.rows!.map((r, i) => (
            <div key={r.name} className={`flex flex-col rounded-card bg-white p-6 ${i === 1 ? "border-2 border-brand" : "border border-neutral-200"}`}>
              <h3 className="text-xl font-bold text-ink">{r.name}</h3>
              <p className="mt-1 text-[15px] text-neutral-600">{r.bestFor}</p>
              <p className="mt-5 text-2xl font-extrabold text-ink">
                <Text>{r.price}</Text>
              </p>
              <p className="mt-4 flex-1 border-t border-neutral-100 pt-4 leading-relaxed text-neutral-700">{r.included}</p>
              <LinkButton href={primaryCta.href} variant={i === 1 ? "primary" : "secondary"} className="mt-6">
                {primaryCta.label}
              </LinkButton>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] text-neutral-600">
          <Text>{web.packages.note!}</Text>
        </p>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries, industriesPage as p } from "@/content/industries";
import { Section } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

export default function IndustriesIndex() {
  return (
    <>
      <PageHero crumbs={[{ label: "Industries" }]} title={p.h1} sub={p.sub} />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <li key={i.slug} className="group relative flex h-full flex-col rounded-card border border-neutral-200 bg-white p-6 hover:border-neutral-300">
              <IconTile name={i.icon} />
              <h2 className="mt-5 text-lg font-bold text-ink">
                <Link href={`/industries/${i.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
                  {i.name}
                </Link>
              </h2>
              {/* z-10 lifts the text above the card-wide link so it can be selected and copied */}
              <p className="relative z-10 mt-2 flex-1 leading-relaxed text-neutral-600">{i.sub}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                {p.labels.explore} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2" />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

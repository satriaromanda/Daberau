import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { industries, industriesPage as p } from "@/content/industries";
import { serviceBySlug } from "@/content/services";
import { primaryCta } from "@/content/site";
import { Accent } from "@/components/ui/Container";
import { Icon, IconTile } from "@/components/ui/Icons";
import { IndustryVisual } from "@/components/ui/IndustryVisual";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Industries" }]} title={p.h1} sub={p.sub}>
        <nav aria-label="Industries">
          <ul className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i.slug}>
                <a
                  href={`#${i.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-[15px] font-medium text-neutral-700 hover:border-neutral-400 hover:text-ink"
                >
                  <Icon name={i.icon} className="h-4 w-4 text-brand" />
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {industries.map((ind, idx) => {
        const flip = idx % 2 === 1;
        return (
          <section
            key={ind.slug}
            id={ind.slug}
            aria-labelledby={`${ind.slug}-title`}
            className={`py-16 md:py-24 ${flip ? "border-y border-neutral-200/70 bg-neutral-50" : "bg-white"}`}
          >
            <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div data-reveal className={`aspect-[4/3] overflow-hidden rounded-card border border-neutral-200 ${flip ? "lg:order-2" : ""}`}>
                <IndustryVisual industry={ind} />
              </div>
              <div data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
                <p className="inline-flex items-center gap-3">
                  <IconTile name={ind.icon} size="sm" />
                  <span className="text-[15px] font-semibold uppercase tracking-wider text-brand">{ind.name}</span>
                </p>
                <h2 id={`${ind.slug}-title`} className="mt-4 text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[40px]">
                  <Accent>{ind.title}</Accent>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-neutral-600">{ind.body}</p>

                <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-500">{p.labels.challenges}</h3>
                <ul className="mt-3 space-y-3">
                  {ind.challenges.map((c) => (
                    <li key={c.title} className="flex gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                      <p className="leading-relaxed text-neutral-600">
                        <span className="font-semibold text-ink">{c.title}.</span> {c.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-500">{p.labels.services}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ind.services.map((slug) => {
                    const s = serviceBySlug(slug);
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-[15px] font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
                        >
                          <Icon name={s.icon} className="h-4 w-4 text-brand" />
                          {s.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link href={primaryCta.href} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-700">
                  {p.labels.cta.replace("[industry]", ind.name)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="other-title" className="bg-white pb-6 pt-16 md:pt-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <h2 id="other-title" className="text-[26px] font-extrabold tracking-tight text-ink md:text-[32px]">
              {p.closing.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-neutral-600">{p.closing.body}</p>
          </div>
        </div>
      </section>
    </>
  );
}

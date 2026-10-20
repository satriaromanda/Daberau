import Link from "next/link";
import { ArrowRight, Check, Quote, UserRound } from "lucide-react";
import type { CaseStudy, Service, Stat, Testimonial } from "@/content/types";
import { microcopy } from "@/content/site";
import { IconTile } from "./Icons";
import { ImagePlaceholder } from "./Placeholders";
import { SampleTag, Text } from "./Text";

const cardBase = "rounded-card border border-neutral-200 bg-white transition-colors duration-150";

export function ServiceCard({ service, showScope = false }: { service: Service; showScope?: boolean }) {
  return (
    <article className={`${cardBase} group relative flex h-full flex-col p-6 hover:border-neutral-300`}>
      <IconTile name={service.icon} />
      <h3 className="mt-5 text-lg font-bold text-ink">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{service.short}</p>
      {showScope && (
        <div className="mt-4">
          <ul className="space-y-2">
            {service.scope.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-neutral-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          {service.scopeIsSample && <SampleTag className="mt-3" />}
        </div>
      )}
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand group-hover:text-brand-700">
        {microcopy.learnMore}
      </span>
      {/* Visible focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}

export function CaseStudyCard({ cs, headingLevel = "h3" }: { cs: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={`${cardBase} group relative flex h-full flex-col overflow-hidden hover:border-neutral-300`}>
      <ImagePlaceholder label={cs.imageLabel} rounded="rounded-none" className="border-0 border-b" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-neutral-600">
          <span className="font-semibold text-ink">{cs.client}</span> · {cs.industry}
        </p>
        <H className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={`/case-studies/${cs.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            <Text>{cs.title}</Text>
          </Link>
        </H>
        <div className="mt-4 rounded-lg bg-neutral-50 px-4 py-3">
          <p className="text-xl font-bold text-brand">
            <Text>{cs.metric.value}</Text>
          </p>
          <p className="text-sm text-neutral-600">{cs.metric.label}</p>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Services">
          {cs.categories.map((c) => (
            <li key={c} className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
              {c}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand">
          {microcopy.readCaseStudy}
        </span>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className={`${cardBase} flex h-full flex-col p-6`}>
      <Quote className="h-7 w-7 text-brand/80" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <span
          role="img"
          aria-label="Photo placeholder"
          className="img-ph flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-400"
        >
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink">
            <Text>{t.name}</Text>
          </span>
          <span className="block text-sm text-neutral-600">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
      {t.sample && <SampleTag className="mt-4 self-start" />}
    </figure>
  );
}

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col-reverse justify-end rounded-card border border-neutral-200 bg-white p-6">
      <dt className="mt-3 text-[15px] text-neutral-600">{stat.label}</dt>
      <dd className="text-[34px] font-extrabold leading-none tracking-tight text-ink md:text-[40px]">
        <Text>{stat.value}</Text>
      </dd>
    </div>
  );
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </dl>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-700 hover:underline underline-offset-4">
      {children}
      {typeof children === "string" && !children.includes("→") && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </Link>
  );
}

export function TitledTextCard({ title, body, index }: { title: string; body: string; index?: number }) {
  return (
    <div className="rounded-card border border-neutral-200 bg-white p-6">
      {index !== undefined && (
        <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand">
          {index}
        </span>
      )}
      <h3 className="text-[17px] font-bold text-ink">
        <Text>{title}</Text>
      </h3>
      <p className="mt-2 leading-relaxed text-neutral-600">
        <Text>{body}</Text>
      </p>
    </div>
  );
}

export function ArticleCard({ a, headingLevel = "h3" }: { a: import("@/content/types").Article; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={`${cardBase} group relative flex h-full flex-col overflow-hidden hover:border-neutral-300`}>
      <ImagePlaceholder label={a.imageLabel} rounded="rounded-none" aspect="aspect-[16/9]" className="border-0 border-b" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-brand">{a.category}</p>
        <H className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {a.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-neutral-600">{a.excerpt}</p>
        <p className="mt-auto pt-5 text-sm text-neutral-500">
          <time>{a.date}</time> · {a.readTime}
        </p>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}

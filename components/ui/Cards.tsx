import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service, Stat } from "@/content/types";
import { microcopy } from "@/content/site";
import { asset } from "@/lib/asset";
import { IconTile } from "./Icons";
import { Text } from "./Text";

const cardBase = "rounded-card border border-neutral-200 bg-white transition-colors duration-150";

// Service cards use a stretched title link (after:absolute after:inset-0) so the whole card is clickable.
// Readable text is lifted above that overlay with `relative z-10` so visitors can still select and copy it.

export function ServiceCard({ service, showScope = false }: { service: Service; showScope?: boolean }) {
  return (
    <article className={`${cardBase} group relative flex h-full flex-col overflow-hidden hover:border-neutral-300`}>
      <div className="aspect-[16/10] overflow-hidden border-b border-neutral-200 bg-neutral-100">
        <Image
          src={asset(service.image.src)}
          alt={service.image.alt}
          width={800}
          height={800}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {/* Icon tile overlaps the photo edge */}
        <span className="relative -mt-[52px] mb-1 inline-flex w-fit rounded-xl bg-white ring-4 ring-white md:-mt-14">
          <IconTile name={service.icon} />
        </span>
        <h3 className="mt-4 text-[19px] font-bold leading-snug text-ink md:text-[21px]">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none">
            {service.name}
          </Link>
        </h3>
        <p className="relative z-10 mt-2.5 leading-relaxed text-neutral-500 md:text-[17px]">{service.short}</p>
        {showScope && (
          <div className="relative z-10 mt-4">
            <ul className="space-y-2">
              {service.scope.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[15px] text-neutral-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[15px] font-semibold text-brand group-hover:text-brand-700">
          {microcopy.learnMore}
        </span>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-card ring-brand group-has-[a:focus-visible]:ring-2" />
    </article>
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
    <div className="rounded-card border border-neutral-200 bg-white p-6 md:p-7">
      {index !== undefined && (
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-lg font-extrabold text-brand">
          {index}
        </span>
      )}
      <h3 className="text-[19px] font-bold leading-snug text-pretty text-ink md:text-[21px]">
        <Text>{title}</Text>
      </h3>
      <p className="mt-2.5 leading-relaxed text-neutral-500 md:text-[17px]">
        <Text>{body}</Text>
      </p>
    </div>
  );
}

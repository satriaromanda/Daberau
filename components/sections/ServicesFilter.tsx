"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { NeedFilter } from "@/content/types";
import { services, servicesOverview } from "@/content/services";
import { nav } from "@/content/site";
import { ServiceCard } from "@/components/ui/Cards";

/** Clickable "need" chips that narrow the service grid. "I'm not sure yet" shows everything plus a consultation prompt. */
export function ServicesFilter() {
  const [need, setNeed] = useState<NeedFilter | null>(null);
  const visible = need && need !== "not-sure" ? services.filter((s) => s.needs.includes(need)) : services;

  return (
    <div>
      <div role="group" aria-label="Filter services by what you need" className="flex flex-wrap gap-2">
        {servicesOverview.filters.map((f) => {
          const active = need === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setNeed(active ? null : f.id)}
              className={`rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
                active ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} services shown
      </p>

      {need === "not-sure" && (
        <div className="mt-6 flex flex-col gap-3 rounded-card border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-ink">
            <span className="font-bold">{nav.megaPromo.title}</span> {nav.megaPromo.body}
          </p>
          <Link href={nav.megaPromo.cta.href} className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand hover:text-brand-700">
            {nav.megaPromo.cta.label.replace(" →", "")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <ServiceCard key={s.slug} service={s} showScope />
        ))}
      </div>
    </div>
  );
}

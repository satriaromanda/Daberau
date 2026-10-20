"use client";

import { useState } from "react";
import { ChevronDown, SearchX } from "lucide-react";
import type { CaseCategory } from "@/content/types";
import { caseStudies, caseStudiesPage as p } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { CaseStudyCard } from "@/components/ui/Cards";
import { LinkButton } from "@/components/ui/Button";

export function CaseStudyBrowser() {
  const [cat, setCat] = useState<"All" | CaseCategory>("All");
  const [industry, setIndustry] = useState("");

  const results = caseStudies.filter(
    (c) => (cat === "All" || c.categories.includes(cat)) && (!industry || c.industrySlug === industry),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by service" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
          {p.filters.map((f) => {
            const active = cat === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setCat(f)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
                  active ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-ink"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="industry-filter" className="text-[15px] font-semibold text-ink">
            {p.industryLabel}
          </label>
          <div className="relative flex-1 md:w-64 md:flex-none">
            <select
              id="industry-filter"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="h-11 w-full appearance-none rounded-btn border border-neutral-300 bg-white pl-3.5 pr-10 text-[15px] text-ink hover:border-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
            >
              <option value="">{p.allIndustries}</option>
              {industries.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} case studies shown
      </p>

      {results.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <CaseStudyCard key={c.slug} cs={c} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
          <SearchX className="mx-auto h-8 w-8 text-neutral-400" aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-md text-lg text-ink">{p.empty}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href={p.emptyCta.href}>{p.emptyCta.label}</LinkButton>
            <button
              type="button"
              onClick={() => {
                setCat("All");
                setIndustry("");
              }}
              className="text-[15px] font-semibold text-brand hover:text-brand-700"
            >
              Show all case studies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { articles, insightsPage as p } from "@/content/insights";
import { ArticleCard } from "@/components/ui/Cards";

export function InsightsBrowser() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const results = articles.filter(
    (a) =>
      (!cat || a.category === cat) &&
      (!q || [a.title, a.excerpt, a.category].some((t) => t.toLowerCase().includes(q))),
  );
  const keyword = query.trim() || cat || "";

  const reset = () => {
    setQuery("");
    setCat(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
          {[null, ...p.categories].map((c) => {
            const active = cat === c;
            return (
              <button
                key={c ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
                  active ? "border-brand bg-brand text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:text-ink"
                }`}
              >
                {c ?? p.allLabel}
              </button>
            );
          })}
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative lg:w-80">
          <label htmlFor="insights-search" className="sr-only">
            {p.searchLabel}
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          <input
            id="insights-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={p.searchPlaceholder}
            className="h-11 w-full rounded-btn border border-neutral-300 bg-white pl-11 pr-10 text-[16px] placeholder:text-neutral-500 hover:border-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </form>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} articles found
      </p>

      {results.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.slug} a={a} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 text-center">
          <SearchX className="mx-auto h-8 w-8 text-neutral-400" aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-md text-lg text-ink">{p.empty.replace("[keyword]", keyword)}</p>
          <button type="button" onClick={reset} className="mt-5 text-[15px] font-semibold text-brand hover:text-brand-700">
            {p.browseLatest} →
          </button>
        </div>
      )}
    </div>
  );
}

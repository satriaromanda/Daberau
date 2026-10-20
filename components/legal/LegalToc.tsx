"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { id: string; title: string };

/** Sticky, anchor-linked table of contents with scroll-spy on desktop; collapsible on mobile. */
export function LegalToc({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-0.5 text-[14px]">
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === it.id ? "location" : undefined}
            className={`flex gap-2 rounded-md border-l-2 py-1.5 pl-3 pr-2 leading-snug transition-colors ${
              active === it.id ? "border-brand bg-brand-50/60 font-semibold text-brand" : "border-transparent text-neutral-600 hover:text-ink"
            }`}
          >
            <span className="w-5 shrink-0 tabular-nums">{i + 1}.</span>
            {it.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <p className="mb-3 pl-3 text-xs font-bold uppercase tracking-wider text-neutral-500">{label}</p>
        {list}
      </nav>
      <nav aria-label={label} className="rounded-card border border-neutral-200 bg-white lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="toc-mobile"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-4 py-3.5 text-left font-semibold text-ink"
        >
          {label}
          <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <div id="toc-mobile" hidden={!open} className="border-t border-neutral-200 p-2">
          {list}
        </div>
      </nav>
    </>
  );
}

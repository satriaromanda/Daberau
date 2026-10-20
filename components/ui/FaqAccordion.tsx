"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";
import { Text } from "./Text";

/** Accessible accordion: native buttons with aria-expanded/aria-controls, keyboard-operable by default. */
export function FaqAccordion({ items, headingLevel = "h3" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  const H = headingLevel;

  return (
    <div data-reveal className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <div
            key={i}
            className={`rounded-card border bg-white transition-[border-color,box-shadow] duration-300 ${
              isOpen ? "border-brand/30 shadow-[0_16px_36px_-20px_rgba(191,30,46,0.35)]" : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 rounded-card px-5 py-4 text-left text-[16px] font-semibold text-ink focus-visible:-outline-offset-2 md:px-6 md:py-5 md:text-[17px]"
              >
                <span className={`transition-colors ${isOpen ? "text-brand" : "group-hover:text-brand"}`}>
                  <Text>{item.q}</Text>
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-brand text-white" : "bg-neutral-100 text-ink group-hover:bg-brand-50 group-hover:text-brand"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </H>
            {/* grid-rows trick animates height; invisible keeps closed answers out of the accessibility tree */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out ${isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-neutral-600 md:px-6">
                  <Text linkEmail>{item.a}</Text>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

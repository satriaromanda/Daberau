"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/types";
import { Text } from "./Text";

/** Accessible accordion: native buttons with aria-expanded/aria-controls, keyboard-operable by default. */
export function FaqAccordion({ items, headingLevel = "h3" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  const H = headingLevel;

  return (
    <div>
      <div className="divide-y divide-neutral-200 rounded-card border border-neutral-200 bg-white">
        {items.map((item, i) => {
          const isOpen = open === i;
          const btnId = `${uid}-btn-${i}`;
          const panelId = `${uid}-panel-${i}`;
          return (
            <div key={i}>
              <H className="m-0">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-semibold text-ink hover:bg-neutral-50 focus-visible:-outline-offset-2 md:px-6 md:py-5 md:text-[17px]"
                >
                  <span>
                    <Text>{item.q}</Text>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand" : ""}`}
                  />
                </button>
              </H>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className="px-5 pb-5 leading-relaxed text-neutral-600 md:px-6"
              >
                <Text linkEmail>{item.a}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

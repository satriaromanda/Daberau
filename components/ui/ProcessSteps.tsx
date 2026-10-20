import { ArrowRight } from "lucide-react";
import type { Step } from "@/content/types";
import { IconTile } from "./Icons";
import { Text } from "./Text";

/**
 * Connected step cards. Desktop: one row with arrow connectors between cards.
 * Mobile: a vertical timeline with a rail on the left.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ol className={`relative grid gap-4 lg:gap-5 ${cols}`}>
      {/* mobile/tablet rail */}
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-brand/40 via-brand/20 to-transparent lg:hidden" />
      {steps.map((s, i) => (
        <li
          key={i}
          data-reveal
          style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          className="relative pl-16 lg:pl-0"
        >
          {/* mobile timeline marker */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-5 inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand text-[15px] font-extrabold text-white shadow-sm lg:hidden"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="flex h-full flex-col rounded-card border border-neutral-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-brand">Step {String(i + 1).padStart(2, "0")}</span>
              {s.icon ? (
                <IconTile name={s.icon} size="sm" />
              ) : (
                <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-extrabold text-brand transition-colors duration-300 lg:inline-flex">
                  {i + 1}
                </span>
              )}
            </div>
            <h3 className="mt-5 text-[18px] font-bold leading-snug text-ink">
              <Text>{s.title}</Text>
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
              <Text>{s.body}</Text>
            </p>
          </div>

          {/* desktop connector to the next step */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-[26px] top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-brand shadow-sm lg:inline-flex"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

import type { Step } from "@/content/types";
import { Text } from "./Text";

/** Numbered steps: horizontal timeline on desktop, vertical on mobile. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const cols = steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ol className={`relative grid gap-6 lg:gap-5 ${cols}`}>
      {steps.map((s, i) => (
        <li key={i} className="relative flex gap-4 lg:flex-col lg:gap-0">
          {/* connector line */}
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-5 top-11 h-[calc(100%-8px)] w-px bg-neutral-200 lg:left-11 lg:right-0 lg:top-5 lg:h-px lg:w-auto" />
          )}
          <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand bg-white text-[15px] font-bold text-brand">
            {i + 1}
          </span>
          <div className="pb-2 lg:mt-5 lg:pr-4">
            <h3 className="text-[17px] font-bold text-ink">
              <Text>{s.title}</Text>
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600">
              <Text>{s.body}</Text>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

import { Fragment } from "react";

const SPLIT = /(\[[^\]]+\]|cs@daberau-me\.com)/g;
const TOKEN = /^\[[^\]]+\]$/;

/**
 * Renders a content string. Bracketed placeholder tokens ([X], [year], [WhatsApp number]…)
 * get the dashed highlight so they are easy to find and replace. Optionally links the email.
 */
export function Text({ children, linkEmail = false }: { children: string; linkEmail?: boolean }) {
  const parts = children.split(SPLIT).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (TOKEN.test(part)) {
          return (
            <span key={i} className="ph" title="Placeholder: replace before launch">
              {part}
            </span>
          );
        }
        if (linkEmail && part === "cs@daberau-me.com") {
          return (
            <a key={i} href={`mailto:${part}`} className="font-medium text-brand underline underline-offset-2 hover:text-brand-700">
              {part}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Marks a real value that is still pending confirmation (e.g. business hours). */
export function Pending({ children, note = "To be confirmed" }: { children: React.ReactNode; note?: string }) {
  return (
    <span className="ph" title={`Placeholder: ${note}`}>
      {children}
    </span>
  );
}

/** Small badge marking drafted copy that isn't in the IA/UX spec yet. */
export function SampleTag({ label = "Sample copy", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-dashed border-neutral-400 bg-white px-2 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-wide text-neutral-600 ${className}`}
    >
      {label}
    </span>
  );
}

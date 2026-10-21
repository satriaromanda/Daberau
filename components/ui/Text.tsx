import { Fragment } from "react";

const SPLIT = /(\[[^\]]+\]|cs@daberau-me\.com)/g;
const TOKEN = /^\[[^\]]+\]$/;

/**
 * Renders a content string. Bracketed placeholder tokens ([X], [year], [phone number]…)
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

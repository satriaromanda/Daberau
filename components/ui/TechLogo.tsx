import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { Code2 } from "lucide-react";

// Brand logos come from Simple Icons (CC0). Rendered on the server only, so the icon set never ships to the browser.
const all = Object.values(icons).filter((v): v is SimpleIcon => typeof v === "object" && v !== null && "path" in v);
const byTitle = new Map(all.map((i) => [i.title.toLowerCase(), i]));
const aliases: Record<string, string> = { aws: "amazon web services" };

function find(name: string) {
  const key = name.toLowerCase();
  return byTitle.get(aliases[key] ?? key);
}

/** Official brand logo in its brand color; falls back to a generic code icon. */
export function TechLogo({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const icon = find(name);
  if (!icon) return <Code2 className={`${className} text-neutral-500`} aria-hidden="true" />;
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill={`#${icon.hex}`} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

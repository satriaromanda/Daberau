"use client";

import { useEffect, useState } from "react";
import { Briefcase, MapPin, Send } from "lucide-react";
import { careers } from "@/content/careers";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

/** Open roles list. Add ?roles=0 to the URL to preview the spec's empty state. */
export function OpenRoles() {
  const r = careers.roles;
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    setEmpty(new URLSearchParams(window.location.search).get("roles") === "0");
  }, []);

  const cvHref = `mailto:${site.email}?subject=${encodeURIComponent("CV submission")}`;

  if (empty) {
    return (
      <div className="rounded-card border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center">
        <Briefcase className="mx-auto h-8 w-8 text-neutral-400" aria-hidden="true" />
        <p className="mx-auto mt-4 max-w-md text-lg text-ink">{r.empty}</p>
        <LinkButton href={cvHref} className="mt-6">
          <Send className="h-4 w-4" aria-hidden="true" />
          {r.emptyCta}
        </LinkButton>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200 rounded-card border border-neutral-200 bg-white">
      {r.items.map((role) => (
        <li key={role.title} className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">{role.title}</h3>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-neutral-600">
              <span>{role.team}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {role.location}
              </span>
              <span>{role.type}</span>
            </p>
          </div>
          <LinkButton
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
            variant="secondary"
            aria-label={`${r.apply}: ${role.title}`}
          >
            {r.apply}
          </LinkButton>
        </li>
      ))}
    </ul>
  );
}

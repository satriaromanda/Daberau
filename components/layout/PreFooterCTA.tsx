"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { preFooter, primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

// Spec: shown on every page except Contact and the legal pages.
const EXCLUDED = ["/contact", "/privacy-policy", "/terms-and-conditions"];

export function PreFooterCTA() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  if (EXCLUDED.includes(pathname)) return null;
  return (
    <section aria-labelledby="prefooter-title" className="bg-white pb-16 pt-4 md:pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-card bg-ink px-6 py-12 text-white md:px-12 md:py-16">
          <Image src={asset("/images/cta-bg.webp")} alt="" fill sizes="(min-width: 1200px) 1136px, 100vw" className="-z-10 object-cover" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/35 via-black/10 to-black/20" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="prefooter-title" className="text-[26px] font-bold leading-tight md:text-[32px]">
                {preFooter.title}
              </h2>
              <p className="mt-3 text-lg text-neutral-300">{preFooter.body}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <LinkButton href={primaryCta.href} size="lg">
                {primaryCta.label}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

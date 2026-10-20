"use client";

import { usePathname } from "next/navigation";
import { preFooter, primaryCta, whatsappCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

// Spec: shown on every page except Contact and the legal pages.
const EXCLUDED = ["/contact", "/privacy-policy", "/terms-and-conditions"];

export function PreFooterCTA() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  if (EXCLUDED.includes(pathname)) return null;
  return (
    <section aria-labelledby="prefooter-title" className="bg-white pb-16 pt-4 md:pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-card bg-ink px-6 py-10 text-white md:px-12 md:py-14">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
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
              <LinkButton href={whatsappCta.href} external variant="inverse" size="lg">
                <WhatsAppIcon className="h-5 w-5" />
                {whatsappCta.label}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

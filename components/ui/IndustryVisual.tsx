import Image from "next/image";
import type { Industry } from "@/content/types";
import { asset } from "@/lib/asset";
import { Icon } from "./Icons";

/**
 * Industry photo. Until a photo is set in content/industries.ts, shows a branded tile
 * (the red network background with the industry icon) so the layout never looks empty.
 */
export function IndustryVisual({ industry, className = "", sizes = "(min-width: 1024px) 560px, 100vw" }: { industry: Industry; className?: string; sizes?: string }) {
  if (industry.image) {
    return (
      <Image
        src={asset(industry.image.src)}
        alt={industry.image.alt}
        width={1200}
        height={900}
        sizes={sizes}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div className={`relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-ink ${className}`}>
      <Image src={asset("/images/cta-bg.webp")} alt="" fill sizes={sizes} className="-z-10 object-cover object-[25%_center]" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-black/10 via-black/30 to-black/60" />
      <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm md:h-28 md:w-28">
        <Icon name={industry.icon} className="h-11 w-11 md:h-12 md:w-12" strokeWidth={1.6} />
      </span>
    </div>
  );
}

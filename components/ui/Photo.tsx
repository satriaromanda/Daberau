import Image from "next/image";
import { asset } from "@/lib/asset";

/** Real photo from /public, cropped to the given aspect ratio. */
export function Photo({
  src,
  alt,
  aspect = "aspect-[16/10]",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-card border border-neutral-200 bg-neutral-100 ${aspect} ${className}`}>
      <Image
        src={asset(src)}
        alt={alt}
        width={1200}
        height={1200}
        sizes="(min-width: 1024px) 520px, 100vw"
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

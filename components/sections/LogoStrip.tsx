import { LogoPlaceholder } from "@/components/ui/Placeholders";

/** Grayscale client logos: static grid on desktop, auto-scrolling strip on mobile. */
export function LogoStrip({ count }: { count: number }) {
  const items = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <>
      <div className="relative overflow-hidden md:hidden" aria-label="Client logos" role="group">
        <div className="flex w-max animate-marquee gap-4">
          {[...items, ...items].map((n, i) => (
            <div key={i} className="w-32 shrink-0" aria-hidden={i >= count ? true : undefined}>
              <LogoPlaceholder index={n} />
            </div>
          ))}
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white" />
      </div>
      <ul className="hidden grid-cols-4 gap-4 md:grid lg:grid-cols-8" aria-label="Client logos">
        {items.map((n) => (
          <li key={n}>
            <LogoPlaceholder index={n} />
          </li>
        ))}
      </ul>
    </>
  );
}

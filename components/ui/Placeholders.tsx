import { ImageIcon } from "lucide-react";

/** Neutral, labeled placeholder for imagery (no stock photos, no external URLs). */
export function ImagePlaceholder({
  label,
  className = "",
  aspect = "aspect-[16/10]",
  rounded = "rounded-card",
}: {
  label: string;
  className?: string;
  aspect?: string;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={`img-ph relative flex items-center justify-center overflow-hidden border border-neutral-200 ${aspect} ${rounded} ${className}`}
    >
      <span className="inline-flex max-w-[85%] items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-center text-xs font-medium text-neutral-600">
        <ImageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

/** Gray rectangle standing in for a client or partner logo. */
export function LogoPlaceholder({ index, className = "" }: { index?: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Client logo placeholder${index ? ` ${index}` : ""}`}
      className={`flex h-12 w-full items-center justify-center rounded-lg bg-neutral-200/80 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 ${className}`}
    >
      Client logo
    </div>
  );
}

/** Tech/tool name chip standing in for a logo. */
export function TechChip({ name }: { name: string }) {
  return (
    <div className="flex h-14 items-center justify-center gap-2 rounded-card border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700">
      <span aria-hidden="true" className="h-5 w-5 rounded-md bg-neutral-200" />
      {name.startsWith("[") ? <span className="ph">{name}</span> : name}
    </div>
  );
}

/** Stylized, neutral product mockup for the homepage hero ("Client dashboard mockup"). */
export function DashboardMockup({ label }: { label: string }) {
  return (
    <div role="img" aria-label={`Image placeholder: ${label}`} className="relative">
      <div className="overflow-hidden rounded-card border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white ring-1 ring-neutral-200" />
        </div>
        <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr]">
          <div className="space-y-3 border-r border-neutral-200 bg-neutral-50/60 p-3 sm:p-4">
            <span className="block h-6 w-10 rounded-md bg-brand/90 sm:w-14" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`block h-2.5 rounded-full ${i === 1 ? "bg-neutral-400" : "bg-neutral-200"}`} />
            ))}
          </div>
          <div className="space-y-4 p-3 sm:p-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-neutral-200 p-2 sm:p-3">
                  <span className="block h-2 w-10 rounded-full bg-neutral-200" />
                  <span className={`mt-2 block h-4 w-14 rounded ${i === 0 ? "bg-ink/80" : "bg-neutral-300"}`} />
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-neutral-200 p-3 sm:p-4">
              <span className="block h-2 w-20 rounded-full bg-neutral-200" />
              <div className="mt-4 flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2">
                {[40, 62, 48, 75, 58, 86, 70, 95, 66, 80].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t ${i === 7 ? "bg-brand" : "bg-neutral-200"}`} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-neutral-200" />
                  <span className="h-2 flex-1 rounded-full bg-neutral-200" />
                  <span className="h-2 w-10 rounded-full bg-neutral-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="absolute -bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
        <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

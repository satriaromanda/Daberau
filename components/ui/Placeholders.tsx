import { TechLogo } from "./TechLogo";

/** Technology or tool shown with its real logo. */
export function TechChip({ name }: { name: string }) {
  return (
    <div className="card-interactive group flex h-16 items-center justify-center gap-2.5 rounded-card border border-neutral-200 bg-white px-3 text-[15px] font-semibold text-neutral-800">
      <span className="transition-transform duration-300 group-hover:scale-110">
        <TechLogo name={name} className="h-6 w-6 shrink-0" />
      </span>
      {name}
    </div>
  );
}

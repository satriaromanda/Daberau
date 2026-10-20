import {
  Cloud,
  Compass,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Landmark,
  PenTool,
  SearchX,
  ServerCrash,
  Signpost,
  Smartphone,
  Stethoscope,
  Store,
  Truck,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  globe: Globe,
  smartphone: Smartphone,
  pen: PenTool,
  cloud: Cloud,
  wrench: Wrench,
  compass: Compass,
  store: Store,
  graduation: GraduationCap,
  stethoscope: Stethoscope,
  truck: Truck,
  landmark: Landmark,
  "search-x": SearchX,
  spreadsheet: FileSpreadsheet,
  "server-crash": ServerCrash,
  signpost: Signpost,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden="true" {...props} />;
}

/** Icon tile used on cards: light brand tint with a brand-colored glyph. */
export function IconTile({ name, size = "md" }: { name: IconName; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 rounded-[10px]" : "h-14 w-14 rounded-xl";
  return (
    <span className={`inline-flex ${box} shrink-0 items-center justify-center bg-brand-50 text-brand`}>
      <Icon name={name} className={size === "sm" ? "h-[18px] w-[18px]" : "h-7 w-7"} strokeWidth={size === "sm" ? 1.8 : 2.2} />
    </span>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.3 11.3 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04" />
    </svg>
  );
}

import {
  BarChart3,
  Cloud,
  Code2,
  FileText,
  LifeBuoy,
  MessagesSquare,
  Rocket,
  Compass,
  FileSpreadsheet,
  Globe,
  PenTool,
  Receipt,
  SearchX,
  ServerCrash,
  ShieldCheck,
  Signpost,
  Smartphone,
  Users,
  Wrench,
  Store,
  Factory,
  Truck,
  Stethoscope,
  GraduationCap,
  Landmark,
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
  "search-x": SearchX,
  spreadsheet: FileSpreadsheet,
  "server-crash": ServerCrash,
  signpost: Signpost,
  messages: MessagesSquare,
  "file-text": FileText,
  code: Code2,
  rocket: Rocket,
  "life-buoy": LifeBuoy,
  users: Users,
  receipt: Receipt,
  chart: BarChart3,
  shield: ShieldCheck,
  store: Store,
  factory: Factory,
  truck: Truck,
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  landmark: Landmark,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden="true" {...props} />;
}

/**
 * Round icon badge: light brand tint with a brand-colored glyph.
 * Inside an element with the `group` class it fills solid brand red on hover.
 */
export function IconTile({ name, size = "md" }: { name: IconName; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9" : "h-14 w-14";
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white`}
    >
      <Icon name={name} className={size === "sm" ? "h-[18px] w-[18px]" : "h-7 w-7"} strokeWidth={size === "sm" ? 1.8 : 2.2} />
    </span>
  );
}

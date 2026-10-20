import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { Text } from "@/components/ui/Text";

/** Standard inner-page hero: breadcrumb, optional eyebrow, the page's single H1, sub, and actions. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  sub,
  children,
  aside,
  tone = "muted",
}: {
  crumbs?: Crumb[];
  eyebrow?: React.ReactNode;
  title: string;
  sub?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: "muted" | "white";
}) {
  return (
    <section className={`${tone === "muted" ? "border-b border-neutral-200/70 bg-neutral-50" : "bg-white"} pb-14 pt-8 md:pb-20 md:pt-10`}>
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className={aside ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""}>
          <div className={aside ? "" : "max-w-3xl"}>
            {eyebrow && <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</div>}
            <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[52px]">
              <Text>{title}</Text>
            </h1>
            {sub && (
              <p className="mt-5 text-lg leading-relaxed text-neutral-600 md:text-xl">
                <Text>{sub}</Text>
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

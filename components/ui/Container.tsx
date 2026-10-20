export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "white",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "muted";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 md:py-24 ${tone === "muted" ? "bg-neutral-50 border-y border-neutral-200/70" : "bg-white"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  sub,
  eyebrow,
  align = "left",
  extra,
  className = "",
}: {
  id?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  eyebrow?: string;
  align?: "left" | "center";
  extra?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-10 max-w-2xl md:mb-12 ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>}
      <h2 id={id} className="text-[28px] font-bold leading-tight tracking-tight text-ink md:text-[36px]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-neutral-600">{sub}</p>}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  );
}

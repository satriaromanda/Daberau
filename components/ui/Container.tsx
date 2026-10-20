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

/** Renders *marked words* in a heading string in brand red, e.g. "Does this sound like *your business?*" */
export function Accent({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\*[^*]+\*)/).filter(Boolean).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-brand">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Section headline + subheadline. Centered by default; wrap key words in *asterisks* to color them brand red. */
export function SectionHeading({
  id,
  title,
  sub,
  eyebrow,
  align = "center",
  extra,
  className = "",
}: {
  id?: string;
  title: string;
  sub?: React.ReactNode;
  eyebrow?: string;
  align?: "left" | "center";
  extra?: React.ReactNode;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={`mb-10 max-w-3xl md:mb-14 ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-50 px-3.5 py-1 text-[13px] font-semibold uppercase tracking-wider text-brand">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[44px] lg:text-[48px]">
        <Accent>{title}</Accent>
      </h2>
      {sub && <p className="mt-4 text-lg leading-relaxed text-neutral-600 md:text-xl">{sub}</p>}
      {extra && <div className={`mt-4 flex flex-wrap items-center gap-2 ${centered ? "justify-center" : ""}`}>{extra}</div>}
    </div>
  );
}

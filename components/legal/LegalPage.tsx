import { ArrowUp, Lightbulb } from "lucide-react";
import type { LegalDoc } from "@/content/types";
import { legalUi as ui } from "@/content/legal";
import { site } from "@/content/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Text } from "@/components/ui/Text";
import { LegalToc } from "./LegalToc";

export function LegalPage({ doc, sectionExtras = {} }: { doc: LegalDoc; sectionExtras?: Record<string, React.ReactNode> }) {
  return (
    <div id="top" className="scroll-mt-40 bg-white">
      <div className="border-b border-neutral-200/70 bg-neutral-50">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-10 lg:px-8">
          <Breadcrumb items={[{ label: doc.h1 }]} />
          <h1 className="text-[34px] font-extrabold leading-tight tracking-tight text-ink md:text-[52px]">{doc.h1}</h1>
          <dl className="mt-4 flex flex-col gap-1 text-[15px] text-neutral-600 sm:flex-row sm:gap-6">
            <div className="flex gap-1.5">
              <dt>{ui.lastUpdated}</dt>
              <dd className="font-medium text-ink">
                <Text>{doc.lastUpdated}</Text>
              </dd>
            </div>
            <div className="flex gap-1.5">
              <dt>{ui.effective}</dt>
              <dd className="font-medium text-ink">
                <Text>{doc.effective}</Text>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[260px_minmax(0,720px)] lg:gap-14 lg:px-8">
        <aside>
          <LegalToc items={doc.sections.map((s) => ({ id: s.id, title: s.title }))} label={ui.contents} />
        </aside>

        <article className="min-w-0">
          <p className="text-lg leading-relaxed text-neutral-700">{doc.intro}</p>

          <section aria-labelledby="in-short" className="mt-8 rounded-card border border-neutral-200 bg-neutral-50 p-6">
            <h2 id="in-short" className="flex items-center gap-2 text-lg font-bold text-ink">
              <Lightbulb className="h-5 w-5 text-brand" aria-hidden="true" />
              {ui.inShort}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {doc.inShort.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 space-y-12">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="text-[22px] font-bold leading-snug text-ink md:text-[26px]">
                  <span className="mr-2 text-neutral-400">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-neutral-800">
                  {s.body.map((block, k) =>
                    typeof block === "string" ? (
                      <p key={k}>
                        <Text linkEmail>{block}</Text>
                      </p>
                    ) : (
                      <ul key={k} className="list-disc space-y-2 pl-6 marker:text-brand">
                        {block.list.map((item) => (
                          <li key={item}>
                            <Text linkEmail>{item}</Text>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
                {sectionExtras[s.id] && <div className="mt-4">{sectionExtras[s.id]}</div>}
                <a href="#top" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-brand">
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                  {ui.backToTop}
                </a>
              </section>
            ))}
          </div>

          <section aria-labelledby="legal-contact" className="mt-14 rounded-card border border-neutral-200 p-6">
            <h2 id="legal-contact" className="text-lg font-bold text-ink">
              {ui.contactTitle}
            </h2>
            <address className="mt-3 space-y-1 text-[15px] not-italic leading-relaxed text-neutral-700">
              <p className="font-semibold text-ink">{site.legalName}</p>
              <p>{site.address}</p>
              <p>
                <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                  {site.email}
                </a>{" "}
                · <a href={site.phoneHref} className="hover:text-brand">{site.phone}</a>
              </p>
            </address>
          </section>
        </article>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle, insightsPage as p } from "@/content/insights";
import { primaryCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { ArticleCard } from "@/components/ui/Cards";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ImagePlaceholder } from "@/components/ui/Placeholders";
import { SampleTag } from "@/components/ui/Text";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: `${a.title} | Daberau Insights`, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title, datePublished: a.date, author: { "@type": "Organization", name: a.author } }} />
      <article>
        <header className="border-b border-neutral-200/70 bg-neutral-50">
          <div className="mx-auto w-full max-w-[800px] px-4 pb-10 pt-8 sm:px-6 md:pb-14 md:pt-10">
            <Breadcrumb items={[{ label: "Insights", href: "/insights" }, { label: a.title }]} />
            <p className="text-sm font-semibold text-brand">{a.category}</p>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.15] tracking-tight text-ink md:text-[48px]">{a.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">{a.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-600">
              <span className="font-semibold text-ink">{a.author}</span>
              <span aria-hidden="true">·</span>
              <time>{a.date}</time>
              <span aria-hidden="true">·</span>
              {a.readTime}
              <SampleTag label="Sample article" />
            </p>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[800px] px-4 py-10 sm:px-6 md:py-14">
          <ImagePlaceholder label={a.imageLabel} aspect="aspect-[16/9]" />
          <div className="mt-10 space-y-5 text-[18px] leading-[1.75] text-neutral-800">
            {a.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="pt-4 text-[26px] font-bold leading-snug text-ink">
                  {b.text}
                </h2>
              ) : b.type === "ul" ? (
                <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </div>

          <aside className="mt-12 rounded-card border border-neutral-200 bg-brand-50/60 p-6 md:p-8">
            <p className="text-lg font-semibold leading-relaxed text-ink">{p.articleCta}</p>
            <LinkButton href={primaryCta.href} className="mt-5">
              {primaryCta.label}
            </LinkButton>
          </aside>
        </div>
      </article>

      <section aria-labelledby="more-title" className="border-t border-neutral-200/70 bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="more-title" className="mb-8 text-[28px] font-bold text-ink">
            {p.related}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {more.map((m) => (
              <ArticleCard key={m.slug} a={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

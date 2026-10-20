import type { Metadata } from "next";
import { insightsPage as p } from "@/content/insights";
import { Section } from "@/components/ui/Container";
import { SampleTag } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import { InsightsBrowser } from "@/components/sections/InsightsBrowser";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

export default function InsightsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Insights" }]} title={p.h1} sub={p.sub}>
        <SampleTag label="3 sample articles" />
      </PageHero>
      <Section>
        <InsightsBrowser />
      </Section>
    </>
  );
}

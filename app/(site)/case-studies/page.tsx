import type { Metadata } from "next";
import { caseStudiesPage as p } from "@/content/caseStudies";
import { Section } from "@/components/ui/Container";
import { SampleTag } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudyBrowser } from "@/components/sections/CaseStudyBrowser";

export const metadata: Metadata = { title: p.meta.title, description: p.meta.description };

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Case Studies" }]} title={p.h1} sub={p.sub}>
        <SampleTag label="3 sample case studies" />
      </PageHero>
      <Section>
        <CaseStudyBrowser />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { terms } from "@/content/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: terms.meta.title, description: terms.meta.description };

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}

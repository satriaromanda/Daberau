import type { Metadata } from "next";
import { legalUi, privacy } from "@/content/legal";
import { LegalPage } from "@/components/legal/LegalPage";
import { ManagePreferencesButton } from "@/components/cookies/ManagePreferencesButton";

export const metadata: Metadata = { title: privacy.meta.title, description: privacy.meta.description };

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacy} sectionExtras={{ cookies: <ManagePreferencesButton label={legalUi.managePrefs} /> }} />;
}

"use client";

import { openCookiePreferences } from "./CookieBanner";
import { Button } from "@/components/ui/Button";

export function ManagePreferencesButton({ label }: { label: string }) {
  return (
    <Button variant="secondary" size="sm" onClick={openCookiePreferences}>
      {label}
    </Button>
  );
}

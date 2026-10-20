import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { meta } from "@/content/meta";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daberau-me.com"),
  title: meta.home.title,
  description: meta.home.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-white text-ink antialiased">
        {children}
        <CookieBanner />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}

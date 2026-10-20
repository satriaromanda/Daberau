import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <PreFooterCTA />
      <Footer />
      <WhatsAppFab />
      <StickyMobileCTA />
    </>
  );
}

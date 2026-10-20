import { MinimalFooter, MinimalHeader } from "@/components/layout/Minimal";

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinimalHeader />
      <main id="main">{children}</main>
      <MinimalFooter />
    </>
  );
}

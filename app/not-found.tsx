import type { Metadata } from "next";
import { meta } from "@/content/meta";
import { microcopy } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: meta.notFound.title, description: meta.notFound.description };

export default function NotFound() {
  const n = microcopy.notFound;
  return (
    <>
      <Header />
      <main id="main" className="bg-neutral-50">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-[1200px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-[72px] font-extrabold leading-none tracking-tight text-brand md:text-[112px]">404</p>
          <h1 className="mt-6 text-[32px] font-extrabold tracking-tight text-ink md:text-[48px]">{n.title}</h1>
          <p className="mt-3 text-lg text-neutral-600">{n.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={n.primary.href} size="lg">
              {n.primary.label}
            </LinkButton>
            <LinkButton href={n.secondary.href} variant="secondary" size="lg">
              {n.secondary.label}
            </LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

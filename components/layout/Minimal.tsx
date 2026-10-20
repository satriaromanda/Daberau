import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/content/site";

/** Logo-only header for the distraction-free /consultation landing page. */
export function MinimalHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <Link href="/" className="rounded-md" aria-label={`${site.brand} home`}>
          <Image src="/logo-daberau.png" alt={site.brand} width={720} height={502} className="h-11 w-auto lg:h-[54px]" priority />
        </Link>
      </div>
    </header>
  );
}

export function MinimalFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-4 py-6 text-sm text-neutral-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          {site.copyright} <span aria-hidden="true">·</span> {site.legalName}
        </p>
        <ul className="flex gap-4">
          {footer.legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-brand hover:underline underline-offset-4">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { footer, site } from "@/content/site";
import { services } from "@/content/services";
import { Pending } from "@/components/ui/Text";
import { Newsletter } from "./Newsletter";

const socialIcons = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook, youtube: Youtube };

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] text-neutral-600 hover:text-brand hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" className="inline-block rounded-md" aria-label={`${site.brand} home`}>
              <Image src="/logo-daberau.png" alt={site.brand} width={720} height={502} className="h-20 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] font-medium leading-relaxed text-ink">{site.tagline}</p>
            <ul className="mt-5 space-y-3 text-[15px] text-neutral-600">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                <span>
                  <span className="sr-only">Business hours: </span>
                  <Pending note="business hours to be confirmed">{site.hours}</Pending>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-brand">
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={`${s.label} (link to be added)`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-brand"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr]">
            <FooterCol title="Services" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
            <FooterCol title="Company" links={footer.company} />
            <FooterCol title="Help" links={footer.help} />
            <FooterCol title="Legal" links={footer.legal} />
            <div className="col-span-2 sm:col-span-4 lg:col-span-4">
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
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
      </div>
    </footer>
  );
}

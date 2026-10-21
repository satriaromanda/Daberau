"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Mail, Phone, X } from "lucide-react";
import { nav, primaryCta, site } from "@/content/site";
import { services } from "@/content/services";
import { LinkButton } from "@/components/ui/Button";

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [section, setSection] = useState<"services" | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const linkCls = (href: string) =>
    `flex items-center justify-between rounded-btn px-3 py-3 text-[17px] font-semibold ${
      pathname === href || pathname.startsWith(`${href}/`) ? "text-brand" : "text-ink"
    } hover:bg-neutral-50`;

  // Portal to <body>: the sticky header uses backdrop-filter, which would trap a fixed child.
  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
    >
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 sm:px-6">
        <Link href="/" onClick={onClose} aria-label={`${site.brand} home`} className="rounded-md">
          <Image src={asset("/logo-monogram.png")} alt="" width={40} height={40} className="h-9 w-9" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-btn hover:bg-neutral-50"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4 sm:px-4">
        <ul className="space-y-1">
          {(
            [
              { id: "services", label: nav.servicesLabel, items: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })), all: nav.allServices },
            ] as const
          ).map((group) => {
            const expanded = section === group.id;
            return (
              <li key={group.id}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`m-${group.id}`}
                  onClick={() => setSection(expanded ? null : group.id)}
                  className="flex w-full items-center justify-between rounded-btn px-3 py-3 text-left text-[17px] font-semibold text-ink hover:bg-neutral-50"
                >
                  {group.label}
                  <ChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform ${expanded ? "rotate-180 text-brand" : "text-neutral-500"}`} />
                </button>
                <ul id={`m-${group.id}`} hidden={!expanded} className="mb-2 ml-3 border-l border-neutral-200 pl-3">
                  {group.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={onClose}
                        aria-current={pathname === it.href ? "page" : undefined}
                        className="block rounded-btn px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50 aria-[current=page]:text-brand"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={group.all.href} onClick={onClose} className="block rounded-btn px-3 py-2.5 text-[15px] font-semibold text-brand hover:bg-neutral-50">
                      {group.all.label} →
                    </Link>
                  </li>
                </ul>
              </li>
            );
          })}
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onClose} className={linkCls(l.href)} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3 border-t border-neutral-200 px-3 pt-6">
          <a href={site.phoneHref} className="flex items-center gap-3 text-[15px] text-neutral-700 hover:text-ink">
            <Phone className="h-4 w-4 text-neutral-500" aria-hidden="true" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-[15px] text-neutral-700 hover:text-ink">
            <Mail className="h-4 w-4 text-neutral-500" aria-hidden="true" /> {site.email}
          </a>
        </div>
      </nav>

      <div className="border-t border-neutral-200 p-4 sm:px-6">
        <LinkButton href={primaryCta.href} size="lg" onClick={onClose} className="w-full">
          {primaryCta.label}
        </LinkButton>
      </div>
    </div>,
    document.body,
  );
}

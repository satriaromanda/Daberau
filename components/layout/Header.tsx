"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { nav, site, primaryCta } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { IconTile, WhatsAppIcon } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

type MenuId = "services" | "industries" | null;

const navLinkBase =
  "relative inline-flex h-10 items-center gap-1 rounded-btn px-3 text-[15px] font-medium transition-colors hover:text-ink hover:bg-neutral-50";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Moves focus between [data-menu-item] elements inside a menu panel with the arrow keys. */
function handleMenuKeys(e: React.KeyboardEvent<HTMLElement>, close: () => void) {
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[data-menu-item]"));
  const idx = items.indexOf(document.activeElement as HTMLElement);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    items[(idx + 1) % items.length]?.focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    items[(idx - 1 + items.length) % items.length]?.focus();
  } else if (e.key === "Home") {
    e.preventDefault();
    items[0]?.focus();
  } else if (e.key === "End") {
    e.preventDefault();
    items[items.length - 1]?.focus();
  } else if (e.key === "Escape") {
    e.preventDefault();
    close();
  }
}

export function Header() {
  // trailingSlash export: normalize "/about-us/" to "/about-us"
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState<MenuId>(null);
  const [activeService, setActiveService] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const servicesBtn = useRef<HTMLButtonElement>(null);
  const industriesBtn = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAndFocus = useCallback((id: Exclude<MenuId, null>) => {
    setOpen(null);
    (id === "services" ? servicesBtn : industriesBtn).current?.focus();
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openOnHover = (id: Exclude<MenuId, null>) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(id);
  };
  const closeOnLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), 150);
  };

  const onTriggerKey = (e: React.KeyboardEvent, id: Exclude<MenuId, null>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(id);
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`#${id}-menu [data-menu-item]`)?.focus();
      });
    } else if (e.key === "Escape") {
      setOpen(null);
    }
  };

  // Close a menu when keyboard focus leaves it entirely
  const onItemBlur = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
  };

  const servicesActive = isActive(pathname, "/services");
  const industriesActive = isActive(pathname, "/industries");
  const current = services[activeService];

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded-md" aria-label={`${site.brand} home`}>
          <Image src={asset("/logo-monogram.png")} alt="" width={40} height={40} className="h-9 w-9 lg:hidden" priority />
          <Image
            src={asset("/logo-daberau.png")}
            alt={site.brand}
            width={720}
            height={502}
            className="hidden h-[54px] w-auto lg:block"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            <li onMouseEnter={() => openOnHover("services")} onMouseLeave={closeOnLeave} onBlur={onItemBlur}>
              <button
                ref={servicesBtn}
                type="button"
                aria-expanded={open === "services"}
                aria-controls="services-menu"
                onClick={() => setOpen(open === "services" ? null : "services")}
                onKeyDown={(e) => onTriggerKey(e, "services")}
                className={`${navLinkBase} ${servicesActive || open === "services" ? "text-brand" : "text-neutral-700"}`}
              >
                {nav.servicesLabel}
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open === "services" ? "rotate-180" : ""}`} />
                {servicesActive && <ActiveBar />}
              </button>
              {/* Mega menu */}
              <div
                id="services-menu"
                hidden={open !== "services"}
                onKeyDown={(e) => handleMenuKeys(e, () => closeAndFocus("services"))}
                className="absolute inset-x-0 top-full border-b border-neutral-200 bg-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.12)]"
              >
                <div className="mx-auto grid max-w-[1200px] grid-cols-[1.15fr_1fr_0.95fr] gap-8 px-8 py-8">
                  <ul aria-label="Services" className="space-y-1">
                    {services.map((s, i) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          data-menu-item
                          onMouseEnter={() => setActiveService(i)}
                          onFocus={() => setActiveService(i)}
                          aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-btn px-3 py-2.5 text-[15px] font-semibold transition-colors ${
                            activeService === i ? "bg-neutral-50 text-ink" : "text-neutral-700"
                          } hover:bg-neutral-50 aria-[current=page]:text-brand`}
                        >
                          <IconTile name={s.icon} size="sm" />
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col border-l border-neutral-200 pl-8" aria-live="polite">
                    <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">{current.name}</p>
                    <p className="mt-3 text-lg leading-relaxed text-ink">{current.short}</p>
                    <Link
                      href={`/services/${current.slug}`}
                      tabIndex={-1}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-700"
                    >
                      Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href={nav.allServices.href}
                      data-menu-item
                      className="mt-auto inline-flex w-fit items-center gap-1 rounded-btn pt-6 text-[15px] font-semibold text-ink hover:text-brand"
                    >
                      {nav.allServices.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="rounded-card border border-neutral-200 bg-neutral-50 p-6">
                    <p className="text-lg font-bold text-ink">{nav.megaPromo.title}</p>
                    <p className="mt-2 leading-relaxed text-neutral-600">{nav.megaPromo.body}</p>
                    <LinkButton href={nav.megaPromo.cta.href} data-menu-item className="mt-5">
                      {nav.megaPromo.cta.label}
                    </LinkButton>
                  </div>
                </div>
              </div>
            </li>

            <li className="relative" onMouseEnter={() => openOnHover("industries")} onMouseLeave={closeOnLeave} onBlur={onItemBlur}>
              <button
                ref={industriesBtn}
                type="button"
                aria-expanded={open === "industries"}
                aria-controls="industries-menu"
                onClick={() => setOpen(open === "industries" ? null : "industries")}
                onKeyDown={(e) => onTriggerKey(e, "industries")}
                className={`${navLinkBase} ${industriesActive || open === "industries" ? "text-brand" : "text-neutral-700"}`}
              >
                {nav.industriesLabel}
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${open === "industries" ? "rotate-180" : ""}`} />
                {industriesActive && <ActiveBar />}
              </button>
              <div
                id="industries-menu"
                hidden={open !== "industries"}
                onKeyDown={(e) => handleMenuKeys(e, () => closeAndFocus("industries"))}
                className="absolute left-0 top-full w-72 pt-2"
              >
                <div className="rounded-card border border-neutral-200 bg-white p-2 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.16)]">
                  <ul aria-label="Industries">
                    {industries.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          href={`/industries/${ind.slug}`}
                          data-menu-item
                          aria-current={pathname === `/industries/${ind.slug}` ? "page" : undefined}
                          className="flex items-center gap-3 rounded-btn px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-ink aria-[current=page]:text-brand"
                        >
                          <IconTile name={ind.icon} size="sm" />
                          {ind.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={nav.allIndustries.href}
                    data-menu-item
                    className="mt-1 flex items-center gap-1 rounded-btn border-t border-neutral-100 px-3 py-2.5 text-sm font-semibold text-brand hover:bg-neutral-50"
                  >
                    {nav.allIndustries.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>

            {nav.links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`${navLinkBase} ${active ? "text-brand" : "text-neutral-700"}`}
                  >
                    {l.label}
                    {active && <ActiveBar />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <LinkButton href={primaryCta.href}>{primaryCta.label}</LinkButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-[#128C7E] hover:bg-neutral-50"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-ink hover:bg-neutral-50"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-brand" />;
}

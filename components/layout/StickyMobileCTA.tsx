"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

/** Mobile-only bottom bar that appears after the visitor scrolls 30% of the page. */
export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(max > 0 && window.scrollY / max >= 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lets the floating WhatsApp button move up while the bar is visible.
  useEffect(() => {
    document.documentElement.dataset.stickyCta = show ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.stickyCta;
    };
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <LinkButton href={nav.stickyCta.href} size="lg" className="w-full">
        {nav.stickyCta.label}
      </LinkButton>
    </div>
  );
}

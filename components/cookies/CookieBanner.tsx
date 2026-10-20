"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { cookies } from "@/content/site";
import { Button } from "@/components/ui/Button";

const KEY = "daberau-cookie-consent";
type Prefs = { essential: true; analytics: boolean; marketing: boolean };

function read(): Prefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}
function write(p: Prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: banner simply shows again next visit */
  }
}

/** Opens the preferences modal from anywhere (e.g. the Privacy Policy cookies section). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event("open-cookie-preferences"));
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ essential: true, analytics: false, marketing: false });

  useEffect(() => {
    const saved = read();
    if (saved) setPrefs(saved);
    else setShowBanner(true);
    const open = () => {
      const s = read();
      if (s) setPrefs(s);
      setShowModal(true);
    };
    window.addEventListener("open-cookie-preferences", open);
    return () => window.removeEventListener("open-cookie-preferences", open);
  }, []);

  const acceptAll = () => {
    const p: Prefs = { essential: true, analytics: true, marketing: true };
    write(p);
    setPrefs(p);
    setShowBanner(false);
    setShowModal(false);
  };
  const save = () => {
    write(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {showBanner && !showModal && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[45] rounded-card border border-neutral-200 bg-white p-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
        >
          <div className="flex gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
            <p className="text-[15px] leading-relaxed text-ink">
              {cookies.banner}{" "}
              <Link href="/privacy-policy#cookies" className="font-medium text-brand underline underline-offset-2 hover:text-brand-700">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button onClick={acceptAll} className="sm:flex-1">
              {cookies.acceptAll}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(true)} className="sm:flex-1">
              {cookies.manage}
            </Button>
          </div>
        </div>
      )}
      {showModal && (
        <PreferencesModal
          prefs={prefs}
          onChange={setPrefs}
          onSave={save}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function PreferencesModal({
  prefs,
  onChange,
  onSave,
  onClose,
}: {
  prefs: Prefs;
  onChange: (p: Prefs) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const trap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll<HTMLElement>("button, a[href], input");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    document.addEventListener("keydown", trap);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = prev;
      returnFocus.current?.focus?.();
    };
  }, [trap]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-3 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="cookie-title" className="w-full max-w-md rounded-card border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 id="cookie-title" className="text-lg font-bold text-ink">
            {cookies.modalTitle}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="inline-flex h-10 w-10 items-center justify-center rounded-btn hover:bg-neutral-100">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul className="mt-4 divide-y divide-neutral-200 rounded-card border border-neutral-200">
          {cookies.categories.map((c, i) => {
            const on = c.locked ? true : prefs[c.id as "analytics" | "marketing"];
            return (
              <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
                <span id={`ck-${c.id}`} className="font-medium text-ink">
                  {c.label} {c.locked && <span className="font-normal text-neutral-600">{c.lockedLabel}</span>}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-labelledby={`ck-${c.id}`}
                  disabled={c.locked}
                  data-autofocus={i === 1 ? true : undefined}
                  onClick={() => onChange({ ...prefs, [c.id]: !on } as Prefs)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed ${
                    on ? "bg-brand disabled:bg-brand/50" : "bg-neutral-300"
                  }`}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button onClick={onSave} className="sm:flex-1">
            {cookies.save}
          </Button>
        </div>
      </div>
    </div>
  );
}

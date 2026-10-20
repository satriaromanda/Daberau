"use client";

import { useId, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { footer, microcopy } from "@/content/site";
import { Button } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const n = footer.newsletter;
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  return (
    <div className="rounded-card border border-neutral-200 bg-white p-5 md:p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-ink">{n.title}</h2>
      <p className="mt-2 text-[15px] text-neutral-600">{n.body}</p>
      {done ? (
        <p role="status" className="mt-4 flex items-center gap-2 font-medium text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          {microcopy.newsletterSuccess}
        </p>
      ) : (
        <form noValidate onSubmit={submit} className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={`${id}-email`} className="sr-only">
              Email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={n.placeholder}
              aria-invalid={error}
              aria-describedby={error ? `${id}-err` : undefined}
              className={`h-11 flex-1 rounded-btn border bg-white px-3.5 text-[15px] placeholder:text-neutral-500 focus:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30 ${
                error ? "border-2 border-brand-700" : "border-neutral-300"
              }`}
            />
            <Button type="submit">{n.button}</Button>
          </div>
          {error && (
            <p id={`${id}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-700">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {n.emailError}
            </p>
          )}
          <label className="mt-3 flex items-start gap-2 text-sm text-neutral-600">
            <input type="checkbox" className="mt-0.5 h-4 w-4 rounded accent-brand" />
            {n.consent}
          </label>
        </form>
      )}
    </div>
  );
}

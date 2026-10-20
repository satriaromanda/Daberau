"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Info, Loader2, Paperclip, X, XCircle } from "lucide-react";
import { leadForm as f } from "@/content/contact";
import { microcopy, whatsappCta } from "@/content/site";
import { Button, LinkButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

type Values = {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
};
type FieldKey = keyof Values | "attachment";
type Errors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BYTES = 10 * 1024 * 1024;
const ORDER: FieldKey[] = ["name", "email", "whatsapp", "service", "message", "attachment", "consent"];

function validate(v: Values, file: File | null): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = f.fields.name.error;
  if (!EMAIL_RE.test(v.email.trim())) e.email = f.fields.email.error;
  if (v.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = f.fields.whatsapp.error;
  if (!v.service) e.service = f.fields.service.error;
  if (!v.message.trim()) e.message = f.fields.message.error;
  if (file && file.size > MAX_BYTES) e.attachment = f.fields.attachment.error;
  if (!v.consent) e.consent = f.fields.consent.error;
  return e;
}

const inputBase =
  "block w-full rounded-btn bg-white px-3.5 text-[16px] text-ink placeholder:text-neutral-500 transition-colors focus:outline-none focus-visible:outline-none";
const inputOk = "border border-neutral-300 hover:border-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/25";
const inputErr = "border-2 border-brand-700 focus:ring-2 focus:ring-brand-700/25";

export function LeadForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    consent: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [forceError, setForceError] = useState(false);

  // Dev-only preview of the system-error state: add ?formError=1 to the URL.
  useEffect(() => {
    setForceError(new URLSearchParams(window.location.search).get("formError") === "1");
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (attempted) setErrors(validate(next, file));
  };

  const onFile = (fl: File | null) => {
    setFile(fl);
    if (attempted || (fl && fl.size > MAX_BYTES)) {
      setErrors((prev) => {
        const e = { ...prev };
        if (fl && fl.size > MAX_BYTES) e.attachment = f.fields.attachment.error;
        else delete e.attachment;
        return e;
      });
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validate(values, file);
    setErrors(errs);
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      requestAnimationFrame(() => document.getElementById(id(first))?.focus());
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus(forceError ? "error" : "success"), 1200);
  };

  const hasErrors = attempted && Object.keys(errors).length > 0;

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-card border border-neutral-200 bg-white p-8 text-center focus:outline-none md:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-[24px] font-bold leading-tight text-ink md:text-[28px]">
          {f.success.title.replace("[Name]", values.name.trim())}
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-neutral-600">{f.success.body}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href={f.success.primary.href}>{f.success.primary.label}</LinkButton>
          <LinkButton href={f.success.secondary.href} variant="secondary">
            {f.success.secondary.label}
          </LinkButton>
        </div>
      </div>
    );
  }

  const describedBy = (k: FieldKey, hint?: boolean) =>
    [hint ? id(`${k}-hint`) : null, errors[k] ? id(`${k}-error`) : null].filter(Boolean).join(" ") || undefined;

  const ErrorText = ({ k }: { k: FieldKey }) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-brand-700">
        <AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden="true" />
        {errors[k]}
      </p>
    ) : null;

  const Label = ({ k, children, required }: { k: FieldKey; children: React.ReactNode; required?: boolean }) => (
    <label htmlFor={id(k)} className="mb-1.5 block text-[15px] font-semibold text-ink">
      {children}
      {required && (
        <span className="text-brand-700" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="rounded-card border border-neutral-200 bg-white p-6 md:p-8" aria-busy={status === "loading"}>
      {status === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mb-6 rounded-card border-2 border-brand-700 bg-brand-50 p-5 focus:outline-none">
          <div className="flex gap-3">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
            <div>
              <p className="font-bold text-ink">{f.failure.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-700">{f.failure.body}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button type="submit" size="sm">
                  {f.failure.retry}
                </Button>
                <LinkButton href={whatsappCta.href} external variant="secondary" size="sm">
                  <WhatsAppIcon className="h-4 w-4 text-[#128C7E]" />
                  {whatsappCta.label}
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasErrors && status !== "error" && (
        <div role="alert" className="mb-6 flex gap-3 rounded-card border-2 border-brand-700 bg-brand-50 p-4 text-[15px] font-medium text-ink">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          {microcopy.errorSummary}
        </div>
      )}

      <p className="mb-6 text-sm text-neutral-600">{f.helper}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label k="name" required>
            {f.fields.name.label}
          </Label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder={f.fields.name.placeholder}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={`${inputBase} h-12 ${errors.name ? inputErr : inputOk}`}
          />
          <ErrorText k="name" />
        </div>
        <div>
          <Label k="company">{f.fields.company.label}</Label>
          <input
            id={id("company")}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder={f.fields.company.placeholder}
            className={`${inputBase} h-12 ${inputOk}`}
          />
        </div>
        <div>
          <Label k="email" required>
            {f.fields.email.label}
          </Label>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder={f.fields.email.placeholder}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={`${inputBase} h-12 ${errors.email ? inputErr : inputOk}`}
          />
          <ErrorText k="email" />
        </div>
        <div>
          <Label k="whatsapp" required>
            {f.fields.whatsapp.label}
          </Label>
          <input
            id={id("whatsapp")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder={f.fields.whatsapp.placeholder}
            aria-required="true"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={describedBy("whatsapp")}
            className={`${inputBase} h-12 ${errors.whatsapp ? inputErr : inputOk}`}
          />
          <ErrorText k="whatsapp" />
        </div>

        <div className="sm:col-span-2">
          <Label k="service" required>
            {f.fields.service.label}
          </Label>
          <Select
            id={id("service")}
            value={values.service}
            onChange={(v) => set("service", v)}
            options={f.fields.service.options}
            invalid={!!errors.service}
            describedBy={describedBy("service")}
            required
          />
          <ErrorText k="service" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <label htmlFor={id("budget")} className="text-[15px] font-semibold text-ink">
              {f.fields.budget.label}
            </label>
            <span className="group relative inline-flex">
              <button
                type="button"
                aria-label="About the budget field"
                aria-describedby={id("budget-tip")}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:text-ink"
              >
                <Info className="h-4 w-4" aria-hidden="true" />
              </button>
              <span
                id={id("budget-tip")}
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-btn bg-ink px-3 py-2 text-sm font-normal leading-snug text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {microcopy.budgetTooltip}
              </span>
            </span>
          </div>
          <Select id={id("budget")} value={values.budget} onChange={(v) => set("budget", v)} options={f.fields.budget.options} />
        </div>
        <div>
          <Label k="timeline">{f.fields.timeline.label}</Label>
          <Select id={id("timeline")} value={values.timeline} onChange={(v) => set("timeline", v)} options={f.fields.timeline.options} />
        </div>

        <div className="sm:col-span-2">
          <Label k="message" required>
            {f.fields.message.label}
          </Label>
          <textarea
            id={id("message")}
            rows={5}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={f.fields.message.placeholder}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={`${inputBase} resize-y py-3 ${errors.message ? inputErr : inputOk}`}
          />
          <ErrorText k="message" />
        </div>

        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-[15px] font-semibold text-ink" id={id("attachment-label")}>
            {f.fields.attachment.label}
          </span>
          <div
            className={`flex flex-col gap-3 rounded-btn border border-dashed p-4 sm:flex-row sm:items-center ${
              errors.attachment ? "border-2 border-solid border-brand-700" : "border-neutral-300"
            }`}
          >
            <label
              htmlFor={id("attachment")}
              className="inline-flex min-h-10 w-fit cursor-pointer items-center gap-2 rounded-btn border border-neutral-300 bg-white px-4 text-sm font-semibold text-ink hover:bg-neutral-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand"
            >
              <Paperclip className="h-4 w-4" aria-hidden="true" />
              {f.fields.attachment.button}
              <input
                id={id("attachment")}
                type="file"
                accept=".pdf,.docx,image/*"
                className="sr-only"
                aria-labelledby={id("attachment-label")}
                aria-invalid={!!errors.attachment}
                aria-describedby={describedBy("attachment", true)}
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {file ? (
              <span className="flex min-w-0 items-center gap-2 text-sm text-ink">
                <span className="truncate font-medium">{file.name}</span>
                <span className="shrink-0 text-neutral-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                <button
                  type="button"
                  onClick={() => {
                    onFile(null);
                    const input = document.getElementById(id("attachment")) as HTMLInputElement | null;
                    if (input) input.value = "";
                  }}
                  aria-label={f.fields.attachment.remove}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-ink"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            ) : (
              <span id={id("attachment-hint")} className="text-sm text-neutral-600">
                {f.fields.attachment.hint}
              </span>
            )}
          </div>
          <ErrorText k="attachment" />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent")}
              className={`mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-brand ${errors.consent ? "outline-2 outline-offset-2 outline-brand-700" : ""}`}
            />
            <label htmlFor={id("consent")} className="text-[15px] leading-relaxed text-neutral-700">
              {f.fields.consent.before}
              <Link href="/privacy-policy" target="_blank" className="font-medium text-brand underline underline-offset-2 hover:text-brand-700">
                {f.fields.consent.privacy}
              </Link>
              {f.fields.consent.and}
              <Link href="/terms-and-conditions" target="_blank" className="font-medium text-brand underline underline-offset-2 hover:text-brand-700">
                {f.fields.consent.terms}
              </Link>
              {f.fields.consent.after}
              <span className="text-brand-700" aria-hidden="true">
                {" "}
                *
              </span>
            </label>
          </div>
          <ErrorText k="consent" />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "loading"} className="sm:min-w-52">
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {f.loading}
            </>
          ) : (
            f.submit
          )}
        </Button>
        <p className="text-sm text-neutral-600">{microcopy.reassurance}</p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "loading" ? f.loading : ""}
      </p>
      {forceError && (
        <p className="mt-4 rounded-btn border border-dashed border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
          Dev preview: <code>?formError=1</code> is on, so submitting shows the system-error state.
        </p>
      )}
    </form>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  invalid,
  describedBy,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`${inputBase} h-12 appearance-none pr-10 ${value ? "" : "text-neutral-500"} ${invalid ? inputErr : inputOk}`}
      >
        <option value="">{f.selectPlaceholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
    </div>
  );
}

import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { consultation as c } from "@/content/consultation";
import { stats } from "@/content/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description };

export default function ConsultationPage() {
  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-[1fr_1.25fr] lg:gap-14 lg:px-8">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[48px]">{c.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">{c.sub}</p>

          <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-600">{c.getTitle}</h2>
          <ul className="mt-4 space-y-3">
            {c.get.map((g) => (
              <li key={g} className="flex items-start gap-3 text-[17px] font-medium text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>

          {/* Proof beside the form: 3 client logos + 1 testimonial */}
          <div className="mt-10 hidden lg:block">
            <Proof />
          </div>
        </div>

        <div>
          <LeadForm variant="consultation" />
          <div className="mt-10 lg:hidden">
            <Proof />
          </div>
        </div>
      </div>
    </div>
  );
}

function Proof() {
  return (
    <section aria-label="Why businesses choose Daberau">
      <dl className="grid grid-cols-2 gap-3">
        {stats.map((st) => (
          <div key={st.label} className="flex flex-col-reverse justify-end rounded-card border border-neutral-200 bg-white p-4">
            <dt className="mt-1.5 text-sm text-neutral-600">{st.label}</dt>
            <dd className="text-[26px] font-extrabold leading-none tracking-tight text-ink">{st.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

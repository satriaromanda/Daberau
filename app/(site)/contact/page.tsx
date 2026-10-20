import type { Metadata } from "next";
import { Clock, FileText, Headset, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactPage as c } from "@/content/contact";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ImagePlaceholder } from "@/components/ui/Placeholders";
import { Pending, Text } from "@/components/ui/Text";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = { title: c.meta.title, description: c.meta.description };

const optionIcons = { form: FileText, whatsapp: MessageCircle, support: Headset };

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} title={c.hero.h1} sub={c.hero.sub} />

      {/* Contact options */}
      <section aria-labelledby="options-title" className="bg-white pt-12 md:pt-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeading id="options-title" title={c.optionsHeading.title} sub={c.optionsHeading.sub} />
        </div>
        <div className="mx-auto grid w-full max-w-[1200px] gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {c.options.map((o) => {
            const Icon = optionIcons[o.kind as keyof typeof optionIcons];
            const isWa = o.kind === "whatsapp";
            return (
              <div key={o.title} className="flex flex-col rounded-card border border-neutral-200 bg-white p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-brand-50 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{o.title}</h3>
                <p className="mt-1.5 flex-1 leading-relaxed text-neutral-600">{o.body}</p>
                <LinkButton
                  href={isWa ? site.whatsappHref : o.cta.href}
                  external={isWa}
                  variant={o.kind === "form" ? "primary" : "secondary"}
                  className="mt-5 self-start"
                >
                  {isWa && <WhatsAppIcon className="h-4 w-4 text-[#128C7E]" />}
                  {o.cta.label}
                </LinkButton>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + info */}
      <Section labelledBy="form-title" id="contact-form">
        <SectionHeading id="form-title" title={c.formTitle} sub={c.formSub} />
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div>
            <LeadForm />
          </div>
          <aside aria-labelledby="info-title">
            <div className="rounded-card border border-neutral-200 bg-neutral-50 p-6 md:p-8 lg:sticky lg:top-28">
              <h2 id="info-title" className="text-lg font-bold text-ink">
                {c.info.title}
              </h2>
              <dl className="mt-5 space-y-5 text-[15px]">
                <InfoRow icon={MapPin} label={c.info.labels.address}>
                  {site.address}
                  <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-brand hover:text-brand-700">
                    {c.info.mapsLink} →
                  </a>
                </InfoRow>
                <InfoRow icon={Mail} label={c.info.labels.email}>
                  <a href={`mailto:${site.email}`} className="hover:text-brand">
                    {site.email}
                  </a>
                </InfoRow>
                <InfoRow icon={Phone} label={`${c.info.labels.phone} · ${c.info.labels.whatsapp}`}>
                  <a href={site.phoneHref} className="hover:text-brand">
                    {site.phone}
                  </a>{" "}
                  · <Text>{site.whatsappDisplay}</Text>
                </InfoRow>
                <InfoRow icon={Clock} label={c.info.labels.hours}>
                  <Pending note="business hours to be confirmed">{site.hoursLong}</Pending>
                </InfoRow>
              </dl>
              <p className="mt-6 border-t border-neutral-200 pt-5 text-sm text-neutral-600">{c.info.micro}</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Map & office */}
      <Section tone="muted" labelledBy="map-title">
        <SectionHeading id="map-title" title={c.map.title} sub={site.address} />
        <ImagePlaceholder label={c.map.label} aspect="aspect-[16/9] md:aspect-[21/8]" />
      </Section>

      {/* Quick FAQ */}
      <Section labelledBy="faq-title">
        <SectionHeading id="faq-title" title={c.faq.title} sub={c.faq.sub} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={c.faq.items} />
        </div>
      </Section>
    </>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
      <div>
        <dt className="text-sm font-semibold text-neutral-600">{label}</dt>
        <dd className="mt-0.5 text-ink">{children}</dd>
      </div>
    </div>
  );
}

import { primaryCta, whatsappCta } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Accent } from "@/components/ui/Container";

/** In-page closing CTA (light). The dark pre-footer CTA is rendered by the layout. */
export function ClosingCta({
  headline,
  sub,
  primary = primaryCta,
  showWhatsApp = true,
}: {
  headline: string;
  sub?: string;
  primary?: { label: string; href: string };
  showWhatsApp?: boolean;
}) {
  return (
    <section aria-labelledby="closing-cta" className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-card border border-neutral-200 bg-brand-50/60 px-6 py-12 text-center md:px-12 md:py-16">
          <h2 id="closing-cta" className="mx-auto max-w-3xl text-[30px] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[44px] lg:text-[48px]">
            <Accent>{headline}</Accent>
          </h2>
          {sub && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">{sub}</p>}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href={primary.href} size="lg">
              {primary.label}
            </LinkButton>
            {showWhatsApp && (
              <LinkButton href={whatsappCta.href} external variant="secondary" size="lg">
                <WhatsAppIcon className="h-5 w-5 text-[#128C7E]" />
                {whatsappCta.label}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { microcopy, site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function WhatsAppFab() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${microcopy.chatWhatsApp}. ${microcopy.whatsappTooltip}`}
      className="group fixed bottom-5 right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-[bottom,background-color] duration-300 hover:bg-[#0e7368] in-data-[sticky-cta=on]:bottom-24 sm:right-6 lg:bottom-6 lg:in-data-[sticky-cta=on]:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-btn bg-ink px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        {microcopy.whatsappTooltip}
      </span>
    </a>
  );
}

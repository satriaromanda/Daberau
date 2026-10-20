import { site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        name: site.brand,
        legalName: site.legalName,
        url: `https://${site.domain}`,
        email: site.email,
        telephone: site.phone,
        logo: `https://${site.domain}/logo-daberau.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Peta Selatan, Citi Business Park Blok A No. 31",
          addressLocality: "Kalideres, West Jakarta",
          postalCode: "11840",
          addressCountry: "ID",
        },
      }}
    />
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/marketing/contact-form";
import { company } from "@/config/company";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Une question sur DigiStock, l'offre Premium ou l'installation ? Contactez l'équipe DigiStudio, éditeur de DigiStock.",
  path: "/contact",
});

function formatPhone(phone: string) {
  return phone.replace(/^\+212/, "+212 ").replace(/(\d)(?=(\d{2})+$)/g, "$1 ");
}

export default function ContactPage() {
  const channels = [
    company.email && { icon: Mail, label: "E-mail", value: company.email, href: `mailto:${company.email}` },
    company.phone && { icon: Phone, label: "Téléphone", value: formatPhone(company.phone), href: `tel:${company.phone}` },
    company.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: formatPhone(`+${company.whatsapp}`),
      href: `https://wa.me/${company.whatsapp}`,
    },
    { icon: Globe, label: "Site de l'éditeur", value: company.websiteLabel, href: company.website },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Parlons de votre activité."
        intro="Une question sur DigiStock, l'offre Premium ou l'installation ? L'équipe DigiStudio vous répond."
      />
      <section className="container-wide grid grid-cols-[minmax(0,1fr)] gap-14 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">Nous joindre</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="group flex items-center gap-4 py-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink-700">
                    <Icon className="size-[18px]" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[0.8125rem] text-ink-500">{label}</span>
                    <span className="block text-[0.9375rem] font-medium text-ink-950 group-hover:text-brand-700">{value}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-ink-300 group-hover:text-brand-600" aria-hidden />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink-700">
                <MapPin className="size-[18px]" strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <span className="block text-[0.8125rem] text-ink-500">Basé au</span>
                <span className="block text-[0.9375rem] font-medium text-ink-950">{company.location}</span>
              </span>
            </li>
          </ul>
          <div className="mt-8 rounded-xl border border-line bg-surface p-5">
            <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink-950">
              <BookOpen className="size-4 text-brand-600" aria-hidden />
              Avant d&apos;écrire
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
              La réponse se trouve peut-être déjà dans la{" "}
              <Link href="/docs" className="font-medium text-brand-700 hover:text-brand-800">
                documentation
              </Link>{" "}
              ou la{" "}
              <Link href="/faq" className="font-medium text-brand-700 hover:text-brand-800">
                FAQ
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line p-6 sm:p-8">
          <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink-950">Envoyer un message</h2>
          {company.email ? (
            <div className="mt-6">
              <ContactForm email={company.email} />
            </div>
          ) : (
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">
              Rendez-vous sur{" "}
              <a href={company.website} className="font-medium text-brand-700 hover:text-brand-800">
                {company.websiteLabel}
              </a>{" "}
              pour contacter l&apos;équipe DigiStudio.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

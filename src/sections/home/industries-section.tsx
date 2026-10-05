import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { industries } from "@/data/solutions";

export function IndustriesSection() {
  return (
    <Section tone="subtle" bordered labelledBy="industries-title">
      <Container wide>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="industries-title"
            eyebrow="Solutions"
            title="Pensé pour votre métier."
            description="Du minimarket au grossiste, de la boutique à l'atelier : DigiStock s'adapte à la façon dont vous vendez et stockez."
          />
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1 self-start text-[0.875rem] font-medium text-brand-700 hover:text-brand-800 md:self-auto"
          >
            Toutes les solutions
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="reveal mt-12 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {industries.map(({ name, text, icon: Icon, href }) => (
            <li key={name} className="flex">
              <Link
                href={href}
                className="group flex w-full flex-col rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-5 text-ink-700 transition-colors group-hover:text-brand-600" strokeWidth={1.6} aria-hidden />
                  <ArrowUpRight className="size-4 text-ink-300 transition-colors group-hover:text-brand-600" aria-hidden />
                </div>
                <h3 className="mt-8 text-[0.9375rem] font-semibold text-ink-950">{name}</h3>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink-500">{text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

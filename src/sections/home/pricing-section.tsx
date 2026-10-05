import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { plans } from "@/config/pricing";

export function PricingSection() {
  return (
    <Section id="tarifs" tone="subtle" bordered labelledBy="pricing-title">
      <Container>
        <SectionHeader
          id="pricing-title"
          align="center"
          eyebrow="Tarifs"
          title="Commencez gratuitement. Passez à Premium quand vous en avez besoin."
          description="La version Free n'est pas une démo : aucune limite de produits, aucune limite de ventes."
          className="max-w-3xl"
        />
        <div className="reveal mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} location="home-pricing" />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/tarifs" className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-brand-700 hover:text-brand-800">
            Comparer Free et Premium en détail
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </Container>
    </Section>
  );
}

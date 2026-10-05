import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { features, homeFeatureSlugs } from "@/data/features";
import { ButtonLink } from "@/components/ui/button";

export function FeaturesOverview() {
  const items = homeFeatureSlugs.map((slug) => features.find((f) => f.slug === slug)!);
  return (
    <Section id="fonctionnalites" labelledBy="features-title">
      <Container wide>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="features-title"
            eyebrow="Fonctionnalités"
            title="Tout ce qu'il faut pour gérer votre activité."
            description="DigiStock rassemble les outils essentiels de votre entreprise dans une seule application simple à utiliser."
          />
          <ButtonLink href="/fonctionnalites" variant="ghost" size="sm" className="self-start md:self-auto">
            Toutes les fonctionnalités
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <div className="reveal mt-12 md:mt-14">
          <FeatureGrid items={items} />
        </div>
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/sections/home/hero";
import { ValueStrip } from "@/sections/home/value-strip";
import { FeaturesOverview } from "@/sections/home/features-overview";
import { ShowcaseSection } from "@/sections/home/showcase-section";
import { PosSection } from "@/sections/home/pos-section";
import { StockSection } from "@/sections/home/stock-section";
import { BarcodeSection } from "@/sections/home/barcode-section";
import { CreditSection } from "@/sections/home/credit-section";
import { WhatsAppSection } from "@/sections/home/whatsapp-section";
import { IndustriesSection } from "@/sections/home/industries-section";
import { WhySection } from "@/sections/home/why-section";
import { PricingSection } from "@/sections/home/pricing-section";
import { DocsTeaser } from "@/sections/home/docs-teaser";
import { FaqSection } from "@/sections/home/faq-section";
import { FinalCTA } from "@/components/marketing/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { softwareApplicationSchema } from "@/lib/schema";
import { seo } from "@/config/seo";

export const metadata: Metadata = buildMetadata({
  absoluteTitle: seo.defaultTitle,
  description: seo.defaultDescription,
  path: "/",
  keywords: seo.keywords,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <FeaturesOverview />
      <ShowcaseSection />
      <PosSection />
      <StockSection />
      <BarcodeSection />
      <CreditSection />
      <WhatsAppSection />
      <IndustriesSection />
      <WhySection />
      <PricingSection />
      <DocsTeaser />
      <FaqSection />
      <FinalCTA location="home-final" />
      <JsonLd data={softwareApplicationSchema()} />
    </>
  );
}

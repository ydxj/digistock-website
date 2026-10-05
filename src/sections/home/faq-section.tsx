import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { FAQList } from "@/components/ui/faq-list";
import { homeFaq } from "@/data/faq";

export function FaqSection() {
  return (
    <Section tone="subtle" bordered labelledBy="faq-title">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions fréquentes" />
            <p className="mt-5 text-[1rem] leading-relaxed text-ink-500">
              Vous ne trouvez pas votre réponse ?{" "}
              <Link href="/contact" className="font-medium whitespace-nowrap text-brand-700 hover:text-brand-800">
                Contactez-nous
              </Link>
              .
            </p>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-ink-900 hover:text-brand-700">
              Toutes les questions
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <FAQList items={homeFaq} />
        </div>
      </Container>
    </Section>
  );
}

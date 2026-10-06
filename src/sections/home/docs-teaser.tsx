import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { popularDocs } from "@/config/docs";
import { getDoc } from "@/lib/content";

export function DocsTeaser() {
  const docs = popularDocs.map((slug) => getDoc(slug)).filter((d) => d !== undefined);
  return (
    <Section labelledBy="docs-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <SectionHeader
              id="docs-title"
              eyebrow="Documentation"
              title="Une documentation claire, en français."
              description="De l'installation à la première vente, chaque étape est expliquée simplement. Vous trouvez la réponse sans attendre."
            />
            <ButtonLink href="/docs" variant="secondary" className="mt-8">
              <BookOpen className="size-4" aria-hidden />
              Ouvrir la documentation
            </ButtonLink>
          </div>
          <ul className="reveal grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {docs.map((doc) => (
              <li key={doc.slug} className="flex">
                <Link href={`/docs/${doc.slug}`} className="group flex w-full flex-col bg-white p-5 transition-colors hover:bg-surface-2">
                  <span className="font-mono text-[0.6875rem] tracking-wider text-ink-500 uppercase">{doc.section}</span>
                  <span className="mt-2 flex items-center justify-between gap-3 text-[0.9375rem] font-semibold text-ink-950">
                    {doc.title}
                    <ArrowRight className="size-4 shrink-0 text-ink-300 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
                  </span>
                  <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-500">{doc.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

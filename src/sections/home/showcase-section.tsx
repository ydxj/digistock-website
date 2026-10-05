import { SectionHeader } from "@/components/ui/section";
import { AppShowcase } from "./app-showcase";

export function ShowcaseSection() {
  return (
    <section id="apercu" aria-labelledby="showcase-title" className="relative overflow-hidden bg-navy-900 py-20 text-white md:py-28">
      <div
        aria-hidden
        className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_80%)]"
      />
      <div className="container-wide relative">
        <SectionHeader
          id="showcase-title"
          tone="dark"
          eyebrow="Aperçu de l'application"
          title="Une interface pensée pour travailler vite."
          description={
            <>
              Pas de menus compliqués. Pas de logiciel vieillissant.
              <br className="hidden sm:block" /> DigiStock vous permet d&apos;accéder rapidement aux informations importantes.
            </>
          }
        />
        <div className="mt-12">
          <AppShowcase />
        </div>
      </div>
    </section>
  );
}

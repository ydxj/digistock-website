import { Check, ArrowRight } from "lucide-react";
import { DownloadButton } from "@/components/marketing/download-button";
import { ButtonLink } from "@/components/ui/button";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { heroScreens } from "@/data/screens";

const reassurance = ["Windows 10 & 11", "Fonctionne hors ligne", "Installation rapide"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Fond : grille fine qui s'estompe */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_100%)]"
      />

      <div className="container-wide relative pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-[46rem] animate-enter">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pr-3 pl-1 text-[0.8125rem] text-ink-600 shadow-xs">
            <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">Windows</span>
            <span className="sm:hidden">Gestion de stock et caisse</span>
            <span className="hidden sm:inline">Logiciel de gestion de stock et de caisse</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-balance text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.04em] text-ink-950 sm:text-[3.25rem] lg:text-[4rem]"
          >
            Tout votre stock.
            <br />
            <span className="text-[#7c8597]">Une seule application.</span>
          </h1>

          <p className="mt-6 max-w-[38rem] text-pretty text-[1.0625rem] leading-relaxed text-ink-600 sm:text-[1.1875rem]">
            DigiStock est un logiciel Windows qui réunit votre stock, vos ventes, vos achats, vos fournisseurs, vos
            clients, leurs crédits et vos rapports. Pensé pour les entreprises marocaines, il fonctionne même sans
            connexion Internet.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DownloadButton location="hero" size="lg" />
            <ButtonLink href="/#fonctionnalites" variant="secondary" size="lg">
              Découvrir DigiStock
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
            </ButtonLink>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-ink-600">
            {reassurance.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand-600" strokeWidth={2.25} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Composition : capture claire devant, capture sombre derrière */}
        <div className="relative mt-14 pb-16 sm:mt-16 lg:mt-20 lg:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[10%] left-1/2 h-[70%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_118_242/0.22),transparent)] blur-2xl"
          />
          <div className="relative [perspective:2400px]">
            <div className="relative origin-top animate-enter [animation-delay:120ms] lg:[transform:rotateX(4deg)]">
              <div className="ml-auto w-[86%] sm:w-[80%]">
                <ScreenshotFrame
                  image={heroScreens.back}
                  alt="Tableau de bord DigiStock en mode sombre"
                  sizes="(min-width: 1320px) 1010px, 80vw"
                  tone="dark"
                  quality={75}
                  eager
                  className="bg-navy-900"
                />
              </div>
              <div className="relative -mt-[38%] w-[90%] sm:-mt-[34%] sm:w-[84%]">
                <ScreenshotFrame
                  image={heroScreens.front}
                  alt="Écran Nouvelle vente de DigiStock en mode clair, avec panier et modes de paiement"
                  sizes="(min-width: 1320px) 1060px, 84vw"
                  preload
                />
                <Annotation className="top-[30%] -right-3 translate-x-full" label="Ventes en quelques secondes" />
              </div>
              <Annotation className="top-[4%] right-[3%]" label="Mode clair & sombre" dark />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Annotation({ label, className, dark = false }: { label: string; className?: string; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute hidden items-center gap-2 rounded-full px-3 py-1.5 text-[0.75rem] font-medium shadow-md xl:inline-flex ${
        dark ? "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur" : "bg-white text-ink-800 ring-1 ring-ink-950/10"
      } ${className ?? ""}`}
    >
      <span className={`size-1.5 rounded-full ${dark ? "bg-brand-300" : "bg-brand-600"}`} />
      {label}
    </span>
  );
}

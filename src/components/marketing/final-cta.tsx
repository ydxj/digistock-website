import Image from "next/image";
import { DownloadButton } from "./download-button";
import { ButtonLink } from "@/components/ui/button";
import { product } from "@/config/product";
import { formatDate } from "@/lib/utils";

type FinalCTAProps = {
  title?: string;
  description?: string;
  location?: string;
};

/** Bloc de conversion final, réutilisé sur la plupart des pages. */
export function FinalCTA({
  title = "Prêt à simplifier votre gestion ?",
  description = "Téléchargez DigiStock, installez-le en quelques minutes et enregistrez votre première vente aujourd'hui.",
  location = "final-cta",
}: FinalCTAProps) {
  return (
    <section aria-labelledby={`${location}-title`} className="bg-white py-20 md:py-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-6 py-14 text-white sm:px-12 md:py-16 lg:px-16">
          <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_0%,#000,transparent)]" />
          <div
            aria-hidden
            className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(59_118_242/0.35),transparent)]"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-2xl">
              <h2
                id={`${location}-title`}
                className="text-balance text-[1.875rem] leading-[1.12] font-semibold tracking-[-0.03em] sm:text-[2.5rem]"
              >
                {title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-300">{description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DownloadButton location={location} variant="inverse" size="lg" label="Télécharger DigiStock pour Windows" />
                <ButtonLink href="/contact" variant="inverse-outline" size="lg">
                  Parler à l&apos;équipe
                </ButtonLink>
              </div>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.8125rem]">
                <div>
                  <dt className="text-ink-400">Systèmes</dt>
                  <dd className="mt-0.5 font-medium text-white">{product.operatingSystems.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="text-ink-400">Architecture</dt>
                  <dd className="mt-0.5 font-medium text-white">{product.architecture}</dd>
                </div>
                {product.currentVersion && (
                  <div>
                    <dt className="text-ink-400">Version actuelle</dt>
                    <dd className="mt-0.5 font-mono font-medium text-white">
                      v{product.currentVersion}
                      {product.releaseDate && <span className="ml-2 font-sans text-ink-400">{formatDate(product.releaseDate)}</span>}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <Image
              src="/images/brand/digistock-icon.png"
              alt=""
              width={512}
              height={512}
              sizes="176px"
              className="hidden size-44 drop-shadow-[0_24px_48px_rgb(0_0_0/0.45)] lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

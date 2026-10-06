import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Cpu, HardDrive, Monitor, ScanBarcode, Printer, WifiOff } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { DownloadButton } from "@/components/marketing/download-button";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { ButtonLink } from "@/components/ui/button";
import { WindowsIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { hasDownload, product } from "@/config/product";
import { screens } from "@/data/screens";
import { buildMetadata } from "@/lib/metadata";
import { howToSchema, softwareApplicationSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  absoluteTitle: "Télécharger DigiStock pour Windows",
  description:
    "Téléchargez DigiStock, le logiciel de gestion de stock et de caisse pour Windows 10 et 11 (x64). Version gratuite sans limite de produits ni de ventes.",
  path: "/telecharger",
  keywords: ["télécharger logiciel gestion de stock", "application stock Windows", "logiciel caisse Windows gratuit"],
});

const requirements = [
  { icon: Monitor, label: "Système", value: product.operatingSystems.join(" ou ") },
  { icon: Cpu, label: "Architecture", value: `64 bits (${product.architecture})` },
  { icon: WifiOff, label: "Internet", value: "Non requis au quotidien" },
  { icon: HardDrive, label: "Données", value: "Enregistrées sur votre ordinateur" },
];

const steps = [
  { name: "Télécharger l'installateur", text: "Cliquez sur le bouton de téléchargement pour récupérer l'installateur Windows." },
  { name: "Lancer l'installation", text: "Ouvrez le fichier téléchargé et suivez les étapes de l'assistant." },
  { name: "Ouvrir DigiStock", text: "Lancez DigiStock depuis le menu Démarrer et renseignez votre entreprise." },
  { name: "Ajouter vos produits", text: "Créez vos produits ou importez-les depuis un fichier CSV, puis faites votre première vente." },
];

export default function DownloadPage() {
  const available = hasDownload();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Télécharger", path: "/telecharger" }]}
        eyebrow="Télécharger"
        title="Télécharger DigiStock pour Windows"
        intro={
          available
            ? "Installez DigiStock en quelques minutes. La version Free est gratuite, sans limite de produits ni de ventes."
            : "L'installateur Windows de DigiStock sera bientôt disponible au téléchargement sur cette page. En attendant, contactez-nous pour être informé de sa sortie."
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            {available ? (
              <DownloadButton location="download-page" size="lg" label="Télécharger DigiStock pour Windows" />
            ) : (
              <span className="inline-flex h-12 items-center gap-2 rounded-lg border border-line bg-surface px-6 text-[1rem] font-medium text-ink-600">
                <WindowsIcon className="size-[15px]" />
                {product.downloadFallback.label}
              </span>
            )}
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {available ? "Besoin d'aide ?" : "Être informé de la sortie"}
            </ButtonLink>
          </div>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem] text-ink-500">
            {product.currentVersion && <span className="font-mono">Version {product.currentVersion}</span>}
            {product.releaseDate && <span>Publiée le {formatDate(product.releaseDate)}</span>}
            <span>{product.operatingSystems.join(" · ")}</span>
            <span>{product.architecture}</span>
            {product.installerSize && <span>{product.installerSize}</span>}
            {available && product.installerFileName && <span className="font-mono">{product.installerFileName}</span>}
          </p>
        </div>
      </PageHero>

      <section aria-labelledby="req-title" className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 id="req-title" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
              Configuration requise
            </h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {requirements.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 py-4">
                  <Icon className="size-5 text-ink-500" strokeWidth={1.6} aria-hidden />
                  <dt className="w-32 text-[0.875rem] text-ink-500">{label}</dt>
                  <dd className="text-[0.9375rem] font-medium text-ink-900">{value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-10 text-[0.9375rem] font-semibold text-ink-950">Matériel conseillé (optionnel)</h3>
            <ul className="mt-4 space-y-3 text-[0.9375rem] text-ink-600">
              <li className="flex gap-3">
                <ScanBarcode className="mt-0.5 size-5 shrink-0 text-ink-500" strokeWidth={1.6} aria-hidden />
                Un lecteur code-barres USB pour encaisser plus vite
              </li>
              <li className="flex gap-3">
                <Printer className="mt-0.5 size-5 shrink-0 text-ink-500" strokeWidth={1.6} aria-hidden />
                Une imprimante de tickets pour vos reçus
              </li>
            </ul>
          </div>
          <ScreenshotFrame
            image={screens[1].light!}
            alt={screens[1].alt}
            sizes="(min-width: 1320px) 700px, (min-width: 1024px) 55vw, 100vw"
            className="self-start"
          />
        </div>
      </section>

      <section aria-labelledby="install-title" className="border-y border-line bg-surface py-16 md:py-20">
        <div className="container-wide">
          <h2 id="install-title" className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.75rem]">
            Installation en quatre étapes
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.name} className="bg-white p-6">
                <span className="font-mono text-[0.75rem] text-brand-700">Étape {i + 1}</span>
                <h3 className="mt-2 text-[0.9375rem] font-semibold text-ink-950">{s.name}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/docs/installation" className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-brand-700 hover:text-brand-800">
              Guide d&apos;installation détaillé <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/docs/premier-demarrage" className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-brand-700 hover:text-brand-800">
              Premier démarrage <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="free-title" className="container-wide py-16 md:py-24">
        <div className="grid items-center gap-8 rounded-2xl border border-line p-8 md:grid-cols-[minmax(0,1fr)_auto] md:p-10">
          <div>
            <h2 id="free-title" className="text-[1.375rem] font-semibold tracking-[-0.02em] text-ink-950">
              Inclus dans la version gratuite
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[0.9375rem] text-ink-700 sm:grid-cols-2 lg:grid-cols-3">
              {["Caisse et tickets", "Stock et inventaire", "Codes-barres", "Achats et fournisseurs", "Clients et crédits", "Rapports de base"].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="size-4 text-brand-600" strokeWidth={2.25} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink href="/tarifs" variant="secondary">
            Comparer les offres
          </ButtonLink>
        </div>
      </section>

      <JsonLd
        data={[
          softwareApplicationSchema(),
          howToSchema({ name: "Installer DigiStock sur Windows", description: "Étapes d'installation de DigiStock.", steps }),
        ]}
      />
    </>
  );
}

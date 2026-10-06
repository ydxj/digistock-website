import { ArrowRight, ScanBarcode, Zap, PackagePlus, Tags, Printer, Usb } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { BarcodeLabel } from "@/components/marketing/barcode-label";

const points = [
  { icon: ScanBarcode, title: "EAN-13 et Code128", text: "Les formats des produits du commerce et de vos références internes." },
  { icon: Usb, title: "Lecteurs USB", text: "Branchez un lecteur code-barres USB standard et scannez." },
  { icon: Zap, title: "Détection rapide", text: "Le scan est reconnu instantanément sur l'écran de vente." },
  { icon: PackagePlus, title: "Code inconnu ?", text: "DigiStock propose de créer le produit avec ce code." },
  { icon: Tags, title: "Génération d'étiquettes", text: "Un code-barres pour chaque article qui n'en a pas." },
  { icon: Printer, title: "Impression multiple", text: "Imprimez plusieurs étiquettes en une seule fois." },
];

export function BarcodeSection() {
  return (
    <Section labelledBy="barcode-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-[26rem] py-6">
              <div aria-hidden className="absolute inset-0 rounded-[28px] bg-surface-2" />
              <div aria-hidden className="bg-grid absolute inset-0 rounded-[28px] [mask-image:radial-gradient(closest-side,#000,transparent)]" />
              <div className="relative px-6 py-10 sm:px-10">
                {/* Pile d'étiquettes imprimées : seules les en-têtes des étiquettes arrière dépassent */}
                <div className="relative mx-auto w-[86%] pt-16">
                  <BarcodeLabel
                    name="Huile d'olive 1 L"
                    price="89,00 DH"
                    digits12="611100120458"
                    className="absolute inset-x-0 top-0 origin-top scale-[0.9] opacity-60"
                  />
                  <BarcodeLabel
                    name="Thé vert 200 g"
                    price="24,50 DH"
                    digits12="611100308171"
                    className="absolute inset-x-0 top-8 origin-top scale-[0.95] opacity-85"
                  />
                  <BarcodeLabel
                    name="Savon artisanal 120 g"
                    price="18,00 DH"
                    digits12="611100512346"
                    className="relative shadow-lg"
                    scanning
                  />
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {["EAN-13", "Code128"].map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-line bg-white px-2.5 py-1 font-mono text-[0.75rem] text-ink-700 shadow-xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              id="barcode-title"
              eyebrow="Code-barres"
              title="Scannez. Vendez. Continuez."
              description="DigiStock fonctionne avec les lecteurs code-barres USB. Le produit scanné s'ajoute à la vente, à l'achat ou à l'inventaire. Pour vos articles sans code, générez et imprimez vos propres étiquettes."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3.5">
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-600" strokeWidth={1.75} aria-hidden />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-ink-950">{title}</h3>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-500">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href="/features/code-barres" variant="secondary" className="mt-10">
              Code-barres et étiquettes
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

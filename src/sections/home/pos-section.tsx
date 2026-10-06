import { ArrowRight, Banknote, CreditCard, Landmark, Wallet, Ellipsis } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ScreenCrop } from "@/components/marketing/screen-crop";
import { screens } from "@/data/screens";

const steps = [
  { title: "Scanner", text: "Le produit apparaît immédiatement dans le panier. Un second scan augmente la quantité." },
  { title: "Ajouter au panier", text: "Ajustez la quantité avec + et −, appliquez une remise si besoin." },
  { title: "Encaisser", text: "Choisissez le mode de paiement et validez avec F9. Le ticket est prêt." },
  { title: "Stock mis à jour", text: "Les quantités vendues sortent du stock, la vente est enregistrée." },
];

const payments = [
  { label: "Espèces", icon: Banknote, key: "F6" },
  { label: "Carte", icon: CreditCard, key: "F7" },
  { label: "Virement", icon: Landmark },
  { label: "Crédit client", icon: Wallet, key: "F8" },
  { label: "Autre", icon: Ellipsis },
];

export function PosSection() {
  const pos = screens.find((s) => s.id === "nouvelle-vente")!.light!;
  return (
    <Section labelledBy="pos-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16">
          <div>
            <SectionHeader
              id="pos-title"
              eyebrow="Ventes & caisse"
              title="Une caisse conçue pour aller vite."
              description="Scannez, encaissez, passez au client suivant. L'écran de vente fonctionne au clavier comme à la souris, et le stock suit chaque vente."
            />

            <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {steps.map((step, i) => (
                <li key={step.title} className="bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-ink-950 font-mono text-[0.6875rem] text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-[0.9375rem] font-semibold text-ink-950">{step.title}</h3>
                    {i < steps.length - 1 && <ArrowRight className="ml-auto hidden size-4 text-ink-300 sm:block" aria-hidden />}
                  </div>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-500">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <h3 className="text-[0.8125rem] font-semibold text-ink-950">Modes de paiement</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {payments.map(({ label, icon: Icon, key }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-white py-2 pr-2.5 pl-3 text-[0.875rem] text-ink-800 shadow-xs"
                  >
                    <Icon className="size-4 text-brand-600" strokeWidth={1.75} aria-hidden />
                    {label}
                    {key && (
                      <kbd className="rounded border border-line-strong bg-surface px-1.5 font-mono text-[0.6875rem] text-ink-500">
                        {key}
                      </kbd>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <ButtonLink href="/features/caisse" variant="secondary" className="mt-10">
              Découvrir la caisse
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgb(59_118_242/0.14),transparent)]"
            />
            <figure className="relative">
              <figcaption className="mb-2.5 flex items-center gap-2 text-[0.75rem] font-medium text-ink-500">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink-950 font-mono text-[0.625rem] text-white">1</span>
                Scan, recherche et grille de produits
              </figcaption>
              <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-ink-950/10">
                <ScreenCrop
                  image={pos}
                  region={{ x: 290, y: 92, width: 1056, height: 324 }}
                  displayWidth={544}
                  alt="Champ de scan code-barres et grille de produits avec prix et quantités en stock, dans DigiStock"
                />
              </div>
            </figure>
            <figure className="relative mt-6 ml-auto w-[78%]">
              <figcaption className="mb-2.5 flex items-center gap-2 text-[0.75rem] font-medium text-ink-500">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink-950 font-mono text-[0.625rem] text-white">2</span>
                Total et modes de paiement
              </figcaption>
              <div className="overflow-hidden rounded-xl bg-white shadow-screen ring-1 ring-ink-950/10">
                <ScreenCrop
                  image={pos}
                  region={{ x: 1347, y: 712, width: 572, height: 306 }}
                  displayWidth={424}
                  alt="Récapitulatif de la vente dans DigiStock : sous-total, remise, TVA incluse, total, modes de paiement et bouton Valider la vente"
                />
              </div>
            </figure>
            <p className="relative mt-5 text-[0.8125rem] text-ink-500">
              Détails de l&apos;écran <span className="font-medium text-ink-700">Nouvelle vente</span> (captures réelles).
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

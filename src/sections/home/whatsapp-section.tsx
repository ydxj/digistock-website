import { ArrowRight, Check, FileText, ReceiptText, BellRing, Truck, ClipboardList, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

const actions = [
  { icon: FileText, label: "Envoyer une facture" },
  { icon: ReceiptText, label: "Envoyer un ticket" },
  { icon: BellRing, label: "Rappel de paiement" },
  { icon: Truck, label: "Contacter un fournisseur" },
  { icon: ClipboardList, label: "Commande fournisseur" },
];

export function WhatsAppSection() {
  return (
    <Section labelledBy="whatsapp-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeader
              id="whatsapp-title"
              eyebrow="WhatsApp · Premium"
              title="WhatsApp directement depuis DigiStock."
              description="Vos clients et vos fournisseurs sont déjà sur WhatsApp. DigiStock prépare le message avec les bonnes informations ; vous le relisez et vous l'envoyez."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {actions.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[0.875rem] text-ink-800 shadow-xs"
                >
                  <Icon className="size-4 text-whatsapp" strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3.5 rounded-xl border border-line bg-surface p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ink-700" strokeWidth={1.75} aria-hidden />
              <p className="text-[0.9375rem] leading-relaxed text-ink-600">
                <span className="font-medium text-ink-900">Vous gardez la main.</span> WhatsApp est connecté via WhatsApp
                Web, depuis votre ordinateur. Aucun message n&apos;est envoyé automatiquement : vous validez toujours avant l&apos;envoi.
              </p>
            </div>
            <ButtonLink href="/features/whatsapp" variant="secondary" className="mt-10">
              DigiStock et WhatsApp
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          {/* Illustration : aperçu d'un message avant envoi */}
          <figure className="reveal relative mx-auto w-full max-w-[26rem]">
            <div aria-hidden className="absolute -inset-6 rounded-[28px] bg-[#eef7f1]" />
            <div className="relative rounded-xl border border-line bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="text-[0.875rem] font-semibold text-ink-950">Rappel de paiement</p>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[0.6875rem] font-medium text-amber-800 ring-1 ring-amber-200">
                  En attente de validation
                </span>
              </div>
              <div className="px-5 pt-4 text-[0.8125rem] text-ink-500">
                À : <span className="font-medium text-ink-800">Mohammed Benali</span>
              </div>
              <div className="p-5">
                <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#e7f7ec] px-4 py-3 text-[0.875rem] leading-relaxed text-ink-900">
                  Bonjour M. Benali, nous espérons que vous allez bien. Votre solde chez nous est de{" "}
                  <span className="font-semibold">1 280 DH</span>. Vous pouvez passer le régler quand cela vous arrange.
                  Merci pour votre confiance.
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-3.5">
                <span className="inline-flex h-9 items-center rounded-md border border-line-strong px-3 text-[0.8125rem] font-medium text-ink-700">
                  Modifier
                </span>
                <span className="inline-flex h-9 items-center gap-1.5 rounded-md bg-whatsapp px-3 text-[0.8125rem] font-medium text-white">
                  <Check className="size-3.5" aria-hidden />
                  Valider et envoyer
                </span>
              </div>
            </div>
            <figcaption className="relative mt-8 text-center text-[0.8125rem] text-ink-500">
              Illustration du principe : le message est relu avant chaque envoi.
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { formatDH } from "@/lib/utils";

const transactions = [
  { amount: 500, label: "Vente", ref: "V-2026-000187", date: "02/10" },
  { amount: -200, label: "Paiement", ref: "PAY-2026-000041", date: "03/10" },
  { amount: 980, label: "Vente", ref: "V-2026-000203", date: "05/10" },
];

const features = [
  "Vente à crédit depuis la caisse",
  "Historique complet par client",
  "Paiements complets ou partiels",
  "Solde restant toujours à jour",
  "Reçu de paiement numéroté",
  "Rappel WhatsApp (Premium)",
];

export function CreditSection() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  return (
    <Section tone="subtle" bordered labelledBy="credit-title">
      <Container wide>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              id="credit-title"
              eyebrow="Crédits clients"
              title="Gardez le contrôle sur les crédits clients."
              description="Vendre à crédit fait partie du quotidien. DigiStock remplace le carnet : chaque vente, chaque paiement et chaque solde est enregistré, daté et retrouvable."
            />
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.25} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href="/features/credits-clients" variant="secondary" className="mt-10">
              Gestion des crédits clients
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <figure className="reveal mx-auto w-full max-w-[30rem] rounded-xl border border-line bg-white shadow-md">
            <div className="flex items-center gap-4 border-b border-line p-5 sm:p-6">
              <span
                aria-hidden
                className="inline-flex size-11 items-center justify-center rounded-full bg-brand-50 text-[0.875rem] font-semibold text-brand-700"
              >
                MB
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1rem] font-semibold text-ink-950">Mohammed Benali</p>
                <p className="text-[0.8125rem] text-ink-500">Client · 3 opérations</p>
              </div>
              <div className="text-right">
                <p className="text-[0.75rem] text-ink-500">Solde</p>
                <p className="text-[1.375rem] leading-tight font-semibold tracking-tight text-ink-950 tabular">
                  {formatDH(balance)}
                </p>
              </div>
            </div>
            <ol className="divide-y divide-line">
              {transactions.map((t) => (
                <li key={t.ref} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                  <span
                    aria-hidden
                    className={`size-2 shrink-0 rounded-full ${t.amount > 0 ? "bg-negative" : "bg-positive"}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem] font-medium text-ink-900">{t.label}</span>
                    <span className="block font-mono text-[0.75rem] text-ink-500">
                      {t.ref} · {t.date}
                    </span>
                  </span>
                  <span
                    className={`text-[0.9375rem] font-semibold tabular ${t.amount > 0 ? "text-ink-900" : "text-positive"}`}
                  >
                    {formatDH(t.amount, { sign: true })}
                  </span>
                </li>
              ))}
            </ol>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line bg-surface px-5 py-3 text-[0.75rem] text-ink-500 sm:px-6">
              <span>Exemple de fiche client</span>
              <span className="font-medium text-ink-700">Solde restant : {formatDH(balance)}</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

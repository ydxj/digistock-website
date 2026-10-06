import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeader, Eyebrow } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

const movements = [
  { qty: +50, label: "Achat", ref: "ACH-2026-000103", time: "Lun. 09:12" },
  { qty: -3, label: "Vente", ref: "V-2026-000208", time: "Lun. 11:47" },
  { qty: -2, label: "Produits endommagés", ref: "Casse constatée en réserve", time: "Mar. 08:30" },
  { qty: +5, label: "Ajustement", ref: "Inventaire tournant", time: "Mar. 18:05" },
];

const points = [
  "Quantités en temps réel",
  "Achats et ventes",
  "Ajustements et produits endommagés",
  "Transferts entre entrepôts",
  "Sessions d'inventaire",
  "Alertes de stock minimum",
];

export function StockSection() {
  const start = 12;
  const end = movements.reduce((acc, m) => acc + m.qty, start);
  return (
    <Section tone="subtle" bordered labelledBy="stock-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              id="stock-title"
              eyebrow="Gestion de stock"
              title="Votre stock, toujours sous contrôle."
              description="Chaque entrée et chaque sortie crée un mouvement de stock, avec sa date, son motif et son document. Vous savez toujours pourquoi une quantité a changé."
            />
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.25} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/features/gestion-stock" variant="secondary">
                Gestion de stock
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/features/inventaire" variant="ghost">
                Inventaire
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>

          {/* Illustration : historique des mouvements (exemple) */}
          <figure className="reveal rounded-xl border border-line bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.75rem] text-ink-500">Mouvements de stock</p>
                <p className="mt-0.5 text-[0.9375rem] font-semibold text-ink-950">Câble électrique 2,5 mm² · rouleau</p>
              </div>
              <div className="text-right">
                <p className="text-[0.75rem] text-ink-500">Stock actuel</p>
                <p className="mt-0.5 text-[0.9375rem] font-semibold text-ink-950 tabular">{end} pcs</p>
              </div>
            </div>
            <ol className="divide-y divide-line">
              {movements.map((m) => (
                <li key={m.ref} className="grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-6">
                  <span
                    className={`inline-flex h-7 items-center justify-center rounded-md font-mono text-[0.8125rem] font-semibold tabular ${
                      m.qty > 0 ? "bg-emerald-50 text-positive" : "bg-orange-50 text-negative"
                    }`}
                  >
                    {m.qty > 0 ? `+${m.qty}` : `−${Math.abs(m.qty)}`}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-medium text-ink-900">{m.label}</span>
                    <span className="block truncate font-mono text-[0.75rem] text-ink-500">{m.ref}</span>
                  </span>
                  <span className="hidden text-[0.75rem] text-ink-500 tabular min-[400px]:inline">{m.time}</span>
                </li>
              ))}
            </ol>
            <figcaption className="border-t border-line bg-surface px-5 py-3 text-[0.75rem] text-ink-500 sm:px-6">
              Exemple d&apos;historique : stock de départ {start} pcs. Chaque ligne est liée à son document.
            </figcaption>
          </figure>
        </div>

        <ReorderBlock />
      </Container>
    </Section>
  );
}

function ReorderBlock() {
  return (
    <div className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-10 rounded-2xl border border-line bg-white p-5 sm:p-10 lg:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
      <div>
        <Eyebrow>Premium</Eyebrow>
        <h3 className="mt-4 text-[1.5rem] leading-tight font-semibold tracking-[-0.025em] text-ink-950 sm:text-[1.75rem]">
          Réapprovisionnez au bon moment.
        </h3>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-500">
          La <strong className="font-medium text-ink-800">suggestion de réapprovisionnement</strong> calcule une quantité à
          commander à partir de vos ventes réelles. Un calcul simple et transparent, que vous pouvez toujours ajuster.
        </p>
        <ButtonLink href="/features/achats" variant="ghost" size="sm" className="mt-6 -ml-3">
          Achats et réapprovisionnement
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>

      <figure aria-label="Exemple de calcul du seuil de commande">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-1.5 sm:gap-3">
          <Term value="4" unit="/ jour" label="Ventes moyennes" short="Ventes" />
          <Operator>×</Operator>
          <Term value="7" unit="jours" label="Délai fournisseur" short="Délai" />
          <Operator>+</Operator>
          <Term value="10" unit="pcs" label="Stock de sécurité" short="Sécurité" />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-ink-950 px-5 py-4 text-white">
          <span className="text-[0.875rem] text-ink-300">Seuil de commande</span>
          <span className="text-[1.25rem] font-semibold tabular">
            38 <span className="text-[0.875rem] font-normal text-ink-300">pcs</span>
          </span>
        </div>
        <figcaption className="mt-3 text-[0.8125rem] text-ink-500">
          Quand le stock passe sous ce niveau, DigiStock suggère de commander.
        </figcaption>
      </figure>
    </div>
  );
}

function Term({ value, unit, label, short }: { value: string; unit: string; label: string; short: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-surface px-1.5 py-4 text-center sm:px-4">
      <p className="text-[1.5rem] font-semibold tracking-tight text-ink-950 tabular sm:text-[1.75rem]">{value}</p>
      <p className="text-[0.75rem] text-ink-500">{unit}</p>
      <p className="mt-2 text-[0.75rem] leading-tight font-medium text-ink-700">
        <span className="sm:hidden">{short}</span>
        <span className="hidden sm:inline">{label}</span>
      </p>
    </div>
  );
}

function Operator({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="flex items-center justify-center text-[1.25rem] text-ink-400">
      {children}
    </span>
  );
}

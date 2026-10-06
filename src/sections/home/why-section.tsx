import { Check, Minus } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/section";

type Cell = boolean | string;

const rows: { label: string; manual: Cell; digistock: Cell }[] = [
  { label: "Stock mis à jour à chaque vente", manual: false, digistock: true },
  { label: "Fonctionne sans connexion Internet", manual: true, digistock: true },
  { label: "Données enregistrées localement", manual: true, digistock: true },
  { label: "Lecteur code-barres et étiquettes", manual: false, digistock: true },
  { label: "Crédits clients et soldes calculés", manual: "À la main", digistock: true },
  { label: "Alertes de stock minimum", manual: false, digistock: true },
  { label: "Montants en dirhams (MAD / DH)", manual: true, digistock: true },
  { label: "Tickets, factures et rapports", manual: "À la main", digistock: true },
  { label: "Envoi WhatsApp depuis le logiciel", manual: false, digistock: "Premium" },
  { label: "Interface moderne, clair et sombre", manual: false, digistock: true },
];

const pillars = [
  { title: "Application Windows", text: "Installée sur votre PC, rapide, sans navigateur." },
  { title: "Sans dépendre d'Internet", text: "Une coupure réseau n'arrête pas la caisse." },
  { title: "Conçu pour le Maroc", text: "Français, DH, ventes à crédit, WhatsApp." },
];

function CellValue({ value, highlight = false }: { value: Cell; highlight?: boolean }) {
  if (value === true)
    return (
      <span className={`inline-flex size-6 items-center justify-center rounded-full ${highlight ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-700"}`}>
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Oui</span>
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex size-6 items-center justify-center text-ink-300">
        <Minus className="size-4" aria-hidden />
        <span className="sr-only">Non</span>
      </span>
    );
  return <span className={`text-[0.8125rem] font-medium ${highlight ? "text-brand-700" : "text-ink-500"}`}>{value}</span>;
}

export function WhySection() {
  return (
    <Section labelledBy="why-title">
      <Container wide>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <SectionHeader
              id="why-title"
              eyebrow="Pourquoi DigiStock"
              title="Pourquoi DigiStock ?"
              description="Beaucoup de commerces gèrent encore leur stock avec un cahier ou un fichier Excel. Ça fonctionne, jusqu'au jour où les chiffres ne correspondent plus. DigiStock garde la simplicité, sans les angles morts."
            />
            <ul className="mt-10 space-y-5 border-l border-line pl-6">
              {pillars.map((p) => (
                <li key={p.title}>
                  <h3 className="text-[0.9375rem] font-semibold text-ink-950">{p.title}</h3>
                  <p className="mt-1 text-[0.875rem] text-ink-500">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal overflow-x-auto rounded-xl border border-line">
            <table className="w-full table-fixed border-collapse sm:table-auto text-left">
              <caption className="sr-only">Comparaison entre la gestion manuelle et DigiStock</caption>
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-5 py-4 text-[0.8125rem] font-medium text-ink-500">
                    Critère
                  </th>
                  <th scope="col" className="w-[5rem] px-2 py-4 text-center text-[0.75rem] font-medium text-ink-500 sm:w-32 sm:px-4 sm:text-[0.8125rem]">
                    Cahier / Excel
                  </th>
                  <th scope="col" className="w-[5.5rem] bg-brand-50/60 px-2 py-4 text-center text-[0.75rem] font-semibold text-brand-800 sm:w-32 sm:px-4 sm:text-[0.8125rem]">
                    DigiStock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-4 py-3.5 text-[0.875rem] font-normal text-ink-800 sm:px-5 sm:text-[0.9rem]">
                      {row.label}
                    </th>
                    <td className="px-2 py-3.5 text-center sm:px-4">
                      <CellValue value={row.manual} />
                    </td>
                    <td className="bg-brand-50/40 px-2 py-3.5 text-center sm:px-4">
                      <CellValue value={row.digistock} highlight />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const values = [
  { value: "100 %", label: "Hors ligne", text: "Travaillez sans connexion Internet." },
  { value: "Rapide", label: "Pensé pour la caisse", text: "Scan, raccourcis clavier, F9 pour valider." },
  { value: "Local", label: "Vos données chez vous", text: "Enregistrées sur votre ordinateur." },
  { value: "Tout‑en‑un", label: "Une seule application", text: "Stock, ventes, achats, clients." },
  { value: "MAD · DH", label: "Conçu pour le Maroc", text: "Crédits clients, WhatsApp, français." },
];

export function ValueStrip() {
  return (
    <section aria-label="Points forts de DigiStock" className="border-y border-line bg-white">
      <ul className="container-wide grid grid-cols-2 gap-px bg-line px-0! lg:grid-cols-5">
        {values.map((v, i) => (
          <li
            key={v.label}
            className={`bg-white px-4 py-6 sm:px-8 sm:py-7 lg:px-7 lg:py-9 ${i === values.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <p className="text-[1.25rem] font-semibold tracking-[-0.03em] text-ink-950 tabular sm:text-[1.5rem]">{v.value}</p>
            <p className="mt-1 text-[0.875rem] font-medium text-ink-800">{v.label}</p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-ink-500">{v.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

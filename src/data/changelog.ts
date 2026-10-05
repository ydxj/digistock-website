/**
 * Notes de version publiées sur /changelog.
 * Ajoutez une entrée par version publiée, la plus récente en premier.
 * Tant que la liste est vide, la page n'est pas indexée et n'apparaît pas dans le sitemap.
 */
export type Release = {
  version: string;
  date: string; // ISO "2026-10-01"
  title: string;
  changes: { type: "nouveau" | "amélioré" | "corrigé"; text: string }[];
};

export const releases: Release[] = [
  {
    version: "1.0.0",
    date: "2026-10-05",
    title: "Première version publique",
    changes: [{ type: "nouveau", text: "Première version de DigiStock pour Windows 10 et 11 (x64), disponible au téléchargement." }],
  },
];

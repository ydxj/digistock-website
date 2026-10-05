/**
 * Offres DigiStock.
 * - `price: null` affiche le libellé `priceLabel` et un bouton « Nous contacter ».
 * - Pour publier un prix, renseignez `price` (en DH) et `period`.
 */
export type Plan = {
  id: "free" | "premium";
  name: string;
  description: string;
  price: number | null;
  priceLabel: string;
  period?: string;
  highlights: string[];
  features: string[];
  inheritsFrom?: string;
  cta: { label: string; href: string; kind: "download" | "link" };
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "L'essentiel pour gérer un commerce au quotidien, sans limite.",
    price: 0,
    priceLabel: "Gratuit",
    highlights: ["Aucune limite de produits", "Aucune limite de ventes"],
    features: [
      "Produits et catégories",
      "Codes-barres EAN-13 et Code128",
      "Inventaire",
      "Ventes et reçus",
      "Fournisseurs et achats",
      "Clients et crédits clients",
      "Rapports de base",
      "Alertes de stock",
      "Tableau de bord",
      "Import / export CSV",
      "Sauvegarde manuelle",
    ],
    cta: { label: "Télécharger gratuitement", href: "/telecharger", kind: "download" },
  },
  {
    id: "premium",
    name: "Premium",
    description: "Pour les équipes, plusieurs dépôts et une gestion plus poussée.",
    price: null,
    priceLabel: "Sur demande",
    inheritsFrom: "Tout ce qui est inclus dans Free, plus :",
    highlights: ["Plusieurs utilisateurs", "Multi-entrepôts"],
    features: [
      "WhatsApp clients et fournisseurs",
      "Rappels de paiement clients",
      "Rapports avancés et PDF avancés",
      "Utilisateurs, rôles et permissions",
      "Journal d'activité",
      "Sauvegardes automatiques",
      "Analyses de stock avancées",
      "Suggestions de réapprovisionnement",
      "Gestion avancée des expirations",
      "Multi-entrepôts et transferts",
      "Widgets premium",
    ],
    cta: { label: "Nous contacter", href: "/contact", kind: "link" },
    featured: true,
  },
];

export function formatPrice(plan: Plan): string {
  if (plan.price === null) return plan.priceLabel;
  if (plan.price === 0) return plan.priceLabel;
  return `${new Intl.NumberFormat("fr-FR").format(plan.price).replace(/ /g, " ")} DH`;
}

/** Comparatif détaillé affiché sur /tarifs. */
export const comparison: { group: string; rows: { label: string; free: boolean | string; premium: boolean | string }[] }[] = [
  {
    group: "Stock et produits",
    rows: [
      { label: "Produits et catégories", free: "Illimité", premium: "Illimité" },
      { label: "Codes-barres EAN-13 / Code128", free: true, premium: true },
      { label: "Inventaire et mouvements de stock", free: true, premium: true },
      { label: "Alertes de stock minimum", free: true, premium: true },
      { label: "Import / export CSV", free: true, premium: true },
      { label: "Suggestions de réapprovisionnement", free: false, premium: true },
      { label: "Gestion avancée des expirations", free: false, premium: true },
      { label: "Analyses de stock avancées", free: false, premium: true },
    ],
  },
  {
    group: "Ventes et clients",
    rows: [
      { label: "Ventes et caisse", free: "Illimité", premium: "Illimité" },
      { label: "Reçus et tickets", free: true, premium: true },
      { label: "Clients et crédits clients", free: true, premium: true },
      { label: "Envoi WhatsApp (factures, tickets)", free: false, premium: true },
      { label: "Rappels de paiement WhatsApp", free: false, premium: true },
    ],
  },
  {
    group: "Achats",
    rows: [
      { label: "Fournisseurs et achats", free: true, premium: true },
      { label: "Commandes fournisseurs via WhatsApp", free: false, premium: true },
    ],
  },
  {
    group: "Rapports",
    rows: [
      { label: "Tableau de bord", free: true, premium: true },
      { label: "Rapports de base", free: true, premium: true },
      { label: "Rapports avancés et PDF avancés", free: false, premium: true },
      { label: "Widgets premium", free: false, premium: true },
    ],
  },
  {
    group: "Organisation",
    rows: [
      { label: "Multi-entrepôts et transferts", free: false, premium: true },
      { label: "Utilisateurs multiples", free: false, premium: true },
      { label: "Rôles et permissions", free: false, premium: true },
      { label: "Journal d'activité", free: false, premium: true },
    ],
  },
  {
    group: "Sauvegarde",
    rows: [
      { label: "Sauvegarde manuelle", free: true, premium: true },
      { label: "Sauvegardes automatiques", free: false, premium: true },
    ],
  },
];

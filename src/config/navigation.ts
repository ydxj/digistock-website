import { company } from "./company";

export type NavItem = { label: string; href: string; external?: boolean };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Aperçu", href: "/#apercu" },
  { label: "Solutions", href: "/solutions" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Documentation", href: "/docs" },
  { label: "FAQ", href: "/faq" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Produit",
    items: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Aperçu", href: "/#apercu" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Télécharger", href: "/telecharger" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Magasins", href: "/solutions/magasin" },
      { label: "Grossistes", href: "/solutions/grossiste" },
      { label: "Entrepôts", href: "/solutions/entrepot" },
      { label: "Boutiques", href: "/solutions/boutique" },
      { label: "Distribution", href: "/solutions/distribution" },
      { label: "Petites usines", href: "/solutions/petite-usine" },
    ],
  },
  {
    title: "Ressources",
    items: [
      { label: "Documentation", href: "/docs" },
      { label: "Centre d'aide", href: "/docs/introduction" },
      { label: "Guides", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Entreprise",
    items: [
      { label: "DigiStudio", href: company.website, external: true },
      { label: company.websiteLabel, href: company.website, external: true },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

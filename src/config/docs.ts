/**
 * Structure de la documentation (/docs).
 * L'ordre des sections et des pages est défini ici ; le titre et la
 * description de chaque page proviennent du frontmatter du fichier
 * content/docs/<slug>.mdx.
 */
export const docsNav: { title: string; slugs: string[] }[] = [
  { title: "Commencer", slugs: ["introduction", "installation", "premier-demarrage", "configuration-entreprise"] },
  { title: "Produits", slugs: ["ajouter-un-produit", "categories", "code-barres", "import-csv"] },
  { title: "Stock", slugs: ["mouvements-de-stock", "inventaire", "stock-minimum", "reapprovisionnement"] },
  { title: "Ventes", slugs: ["nouvelle-vente", "paiement", "ticket-et-facture", "annuler-une-vente"] },
  { title: "Clients", slugs: ["ajouter-un-client", "credit-client", "paiement-client"] },
  { title: "Fournisseurs", slugs: ["ajouter-un-fournisseur", "achats", "commandes-fournisseurs"] },
  {
    title: "WhatsApp",
    slugs: ["whatsapp-connexion", "whatsapp-envoyer-facture", "whatsapp-rappels", "whatsapp-fournisseurs"],
  },
  { title: "Premium", slugs: ["activation-premium", "utilisateurs-et-roles", "multi-entrepots", "sauvegardes-automatiques"] },
  { title: "Sauvegarde", slugs: ["creer-une-sauvegarde", "restaurer-une-sauvegarde"] },
  { title: "Paramètres", slugs: ["parametres-entreprise", "apparence", "tickets-et-impression", "facturation"] },
];

/** Pages mises en avant (accueil de la documentation, page d'accueil du site). */
export const popularDocs = ["installation", "nouvelle-vente", "code-barres", "credit-client", "import-csv", "creer-une-sauvegarde"];

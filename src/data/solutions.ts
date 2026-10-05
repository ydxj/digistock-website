import type { LucideIcon } from "lucide-react";
import { Store, Boxes, Warehouse, Shirt, Truck, Factory, Cpu, Car, SprayCan, ShoppingBasket } from "lucide-react";
import type { ContentSection, FAQItem, Highlight } from "@/types/content";
import type { FeatureSlug } from "./features";

export type SolutionSlug = "magasin" | "grossiste" | "entrepot" | "boutique" | "distribution" | "petite-usine";

export type Solution = {
  slug: SolutionSlug;
  name: string;
  plural: string;
  short: string;
  icon: LucideIcon;
  meta: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; title: string; intro: string };
  challenges: Highlight[];
  sections: ContentSection[];
  features: FeatureSlug[];
  recommendedPlan: { plan: "Free" | "Premium"; reason: string };
  faq: FAQItem[];
};

export const solutions: Solution[] = [
  {
    slug: "magasin",
    name: "Magasin",
    plural: "Magasins",
    short: "Caisse rapide, stock à jour et crédits clients pour le commerce de proximité.",
    icon: Store,
    meta: {
      title: "Logiciel pour magasin au Maroc : stock et caisse",
      description:
        "Minimarket, droguerie, quincaillerie, magasin d'électronique : DigiStock réunit caisse, code-barres, stock et crédits clients dans un logiciel Windows qui fonctionne hors ligne.",
      keywords: ["logiciel pour magasin Maroc", "logiciel gestion magasin", "gestion stock magasin", "logiciel caisse magasin"],
    },
    hero: {
      eyebrow: "Solutions · Magasins",
      title: "Le logiciel de gestion pour votre magasin.",
      intro:
        "Une caisse rapide au comptoir, un stock qui se met à jour tout seul et un suivi clair des crédits clients. DigiStock est conçu pour les magasins qui veulent quitter le cahier sans se compliquer la vie.",
    },
    challenges: [
      { title: "File d'attente à la caisse", text: "Saisir les prix à la main ralentit chaque vente et crée des erreurs." },
      { title: "Ruptures imprévues", text: "On découvre qu'un produit manque quand le client le demande." },
      { title: "Carnet de crédit", text: "Les montants dus sont éparpillés et difficiles à relancer." },
      { title: "Chiffres flous", text: "Difficile de savoir ce que le magasin a vraiment gagné ce mois-ci." },
    ],
    sections: [
      {
        title: "Une caisse pensée pour le comptoir",
        paragraphs: [
          "Dans un magasin, la caisse est l'outil le plus utilisé de la journée. Avec DigiStock, vous scannez le code-barres, le produit s'ajoute au panier, un second scan augmente la quantité. Vous encaissez en espèces, par carte, par virement ou à crédit, puis vous validez avec F9. Voir la [caisse](/features/caisse).",
          "Les articles sans code-barres (vrac, produits locaux) peuvent recevoir une étiquette générée par DigiStock. Tout le magasin devient scannable. Voir [code-barres](/features/code-barres).",
        ],
      },
      {
        title: "Un stock qui suit les ventes",
        paragraphs: [
          "Chaque vente retire les quantités du stock. Chaque livraison fournisseur les ajoute. Les produits sous leur stock minimum apparaissent sur le tableau de bord avant qu'il ne soit trop tard. Voir la [gestion de stock](/features/gestion-stock).",
        ],
      },
      {
        title: "Les crédits clients, sans carnet",
        paragraphs: [
          "Vendre à crédit aux clients du quartier est une habitude. DigiStock l'organise : vente à crédit liée à la fiche du client, paiements partiels, reçus et solde toujours à jour. Voir les [crédits clients](/features/credits-clients).",
        ],
      },
      {
        title: "Adapté à votre type de magasin",
        paragraphs: [
          "DigiStock s'adapte aux minimarkets et magasins d'alimentation, aux drogueries, aux quincailleries, aux magasins d'électronique et de téléphonie, ou encore aux magasins de pièces détachées. Les catégories, les codes-barres et le stock minimum se configurent selon vos produits.",
        ],
        bullets: [
          "Alimentation et minimarkets : suivi des dates d'expiration (avancé avec Premium)",
          "Électronique et téléphonie : références précises et codes-barres fabricants",
          "Pièces automobiles : catalogue de références et recherche rapide",
          "Quincaillerie et droguerie : étiquettes pour les articles sans code",
        ],
      },
    ],
    features: ["caisse", "code-barres", "gestion-stock", "credits-clients", "rapports"],
    recommendedPlan: {
      plan: "Free",
      reason: "La version gratuite couvre la caisse, le stock, les codes-barres et les crédits clients, sans limite de produits ni de ventes.",
    },
    faq: [
      {
        question: "DigiStock convient-il à un petit magasin de quartier ?",
        answer: "Oui. La version Free inclut la caisse, le stock, les codes-barres et les crédits clients, sans limite de produits ni de ventes.",
      },
      {
        question: "Ai-je besoin d'Internet dans le magasin ?",
        answer: "Non. DigiStock fonctionne hors ligne. Les ventes sont enregistrées sur l'ordinateur du magasin.",
      },
      {
        question: "Quel matériel faut-il ?",
        answer: "Un ordinateur Windows 10 ou 11. Un lecteur code-barres USB et une imprimante de tickets sont recommandés mais pas obligatoires.",
      },
    ],
  },
  {
    slug: "grossiste",
    name: "Grossiste",
    plural: "Grossistes",
    short: "Gros volumes, clients professionnels et crédits suivis au dirham près.",
    icon: Boxes,
    meta: {
      title: "Logiciel de gestion pour grossiste au Maroc",
      description:
        "Grossistes et demi-grossistes : gérez gros volumes, clients revendeurs, crédits, achats fournisseurs et dépôts avec DigiStock, logiciel Windows hors ligne.",
      keywords: ["logiciel gestion grossiste", "logiciel grossiste Maroc", "gestion stock grossiste", "crédit client grossiste"],
    },
    hero: {
      eyebrow: "Solutions · Grossistes",
      title: "Gérez de gros volumes sans perdre le fil.",
      intro:
        "Beaucoup de références, des clients revendeurs qui paient en plusieurs fois, des achats fréquents chez vos fournisseurs : DigiStock garde tout cela cohérent, du dépôt à la facture.",
    },
    challenges: [
      { title: "Crédits importants", text: "Les revendeurs achètent à crédit et les montants s'accumulent vite." },
      { title: "Réapprovisionnement", text: "Commander trop tard coûte des ventes, trop tôt immobilise la trésorerie." },
      { title: "Plusieurs dépôts", text: "Le stock est réparti entre showroom, dépôt et réserve." },
      { title: "Facturation", text: "Les clients professionnels ont besoin de factures claires." },
    ],
    sections: [
      {
        title: "Des clients revendeurs suivis de près",
        paragraphs: [
          "Un grossiste travaille souvent avec des clients réguliers qui achètent en volume et paient en plusieurs fois. Dans DigiStock, chaque client a sa fiche, son historique d'achats et son solde. Les paiements partiels sont enregistrés avec un reçu numéroté. Voir [crédits clients](/features/credits-clients).",
          "Le total des crédits clients apparaît sur le tableau de bord : vous savez à tout moment combien d'argent est dehors.",
        ],
      },
      {
        title: "Des achats maîtrisés",
        paragraphs: [
          "Les [achats fournisseurs](/features/achats) alimentent le stock à la réception et conservent vos prix d'achat, ce qui permet de suivre la marge réelle. Avec Premium, la suggestion de réapprovisionnement propose une quantité à commander selon vos ventes moyennes, le délai du fournisseur et un stock de sécurité.",
        ],
      },
      {
        title: "Dépôt, showroom, réserve",
        paragraphs: [
          "Avec Premium, le [multi-entrepôts](/features/multi-entrepots) suit le stock de chaque lieu et trace les transferts. Vous savez si la marchandise est au dépôt ou au showroom avant de promettre une livraison.",
        ],
      },
      {
        title: "Factures et WhatsApp",
        paragraphs: [
          "Générez une facture pour chaque vente. Avec Premium, envoyez-la par [WhatsApp](/features/whatsapp) au client, ou envoyez un rappel de paiement préparé par DigiStock, toujours après votre validation.",
        ],
      },
    ],
    features: ["credits-clients", "achats", "multi-entrepots", "rapports", "whatsapp"],
    recommendedPlan: {
      plan: "Premium",
      reason: "Pour plusieurs dépôts, plusieurs utilisateurs et les rappels WhatsApp, Premium est le plus adapté. Free reste suffisant pour démarrer.",
    },
    faq: [
      {
        question: "DigiStock gère-t-il les ventes en gros volume ?",
        answer: "Oui. Les quantités se saisissent directement dans le panier, et un scan précédé d'un multiplicateur (par exemple 3*) ajoute plusieurs unités d'un coup.",
      },
      {
        question: "Puis-je suivre les crédits de mes clients revendeurs ?",
        answer: "Oui. Chaque client a un solde, un historique et des reçus de paiement. Les paiements partiels sont pris en charge.",
      },
      {
        question: "Puis-je gérer un dépôt et un magasin séparément ?",
        answer: "Oui, avec la gestion multi-entrepôts de DigiStock Premium.",
      },
    ],
  },
  {
    slug: "entrepot",
    name: "Entrepôt",
    plural: "Entrepôts",
    short: "Mouvements tracés, inventaires réguliers et transferts entre dépôts.",
    icon: Warehouse,
    meta: {
      title: "Logiciel de gestion d'entrepôt et de dépôt",
      description:
        "Suivez les entrées, sorties, transferts et inventaires de vos entrepôts avec DigiStock. Traçabilité complète des mouvements de stock, hors ligne, sur Windows.",
      keywords: ["logiciel gestion entrepôt", "gestion de dépôt", "mouvements de stock", "inventaire entrepôt"],
    },
    hero: {
      eyebrow: "Solutions · Entrepôts",
      title: "Chaque mouvement de votre entrepôt, tracé.",
      intro:
        "Réceptions, sorties, transferts, casse, inventaires : DigiStock enregistre chaque mouvement avec sa raison et son document. Votre stock théorique reste proche de la réalité.",
    },
    challenges: [
      { title: "Écarts de stock", text: "Le stock réel ne correspond plus aux chiffres." },
      { title: "Mouvements non justifiés", text: "Impossible de savoir pourquoi une quantité a changé." },
      { title: "Plusieurs lieux", text: "La marchandise circule entre dépôts sans trace." },
      { title: "Produits endommagés", text: "La casse n'est pas déclarée et fausse les inventaires." },
    ],
    sections: [
      {
        title: "Un journal de mouvements fiable",
        paragraphs: [
          "Dans un entrepôt, le stock change sans cesse. DigiStock enregistre chaque mouvement : achat réceptionné, vente, ajustement, produit endommagé, transfert. Chaque ligne indique la quantité, la date, le motif et le document lié. Voir la [gestion de stock](/features/gestion-stock).",
        ],
      },
      {
        title: "Des inventaires réguliers et rapides",
        paragraphs: [
          "Les sessions d'[inventaire](/features/inventaire) comparent les quantités comptées au stock attendu. Le comptage peut se faire au [lecteur code-barres](/features/code-barres) pour aller plus vite. Les écarts validés deviennent des ajustements tracés.",
          "Un inventaire tournant (une zone ou une catégorie à la fois) évite de bloquer l'entrepôt pendant une journée entière.",
        ],
      },
      {
        title: "Plusieurs dépôts, une vue d'ensemble",
        paragraphs: [
          "Avec Premium, chaque entrepôt a son propre stock. Les transferts créent une sortie dans un lieu et une entrée dans l'autre. Voir [multi-entrepôts](/features/multi-entrepots).",
        ],
      },
      {
        title: "Déclarer la casse",
        paragraphs: [
          "Un produit abîmé ne doit pas rester dans le stock vendable. Déclarez-le comme endommagé : la quantité sort du stock avec un motif clair, et vos inventaires suivants ne présentent plus d'écart inexpliqué.",
        ],
      },
    ],
    features: ["gestion-stock", "inventaire", "multi-entrepots", "code-barres", "achats"],
    recommendedPlan: {
      plan: "Premium",
      reason: "Le multi-entrepôts, les transferts et les rôles utilisateurs sont inclus dans Premium.",
    },
    faq: [
      {
        question: "Puis-je savoir qui a modifié le stock ?",
        answer: "Avec Premium, les utilisateurs, les rôles et le journal d'activité permettent de savoir qui a fait quoi.",
      },
      {
        question: "Les transferts entre dépôts sont-ils possibles ?",
        answer: "Oui, avec la gestion multi-entrepôts de Premium. Chaque transfert est tracé dans les mouvements de stock.",
      },
    ],
  },
  {
    slug: "boutique",
    name: "Boutique",
    plural: "Boutiques",
    short: "Vêtements, cosmétiques, accessoires : un catalogue clair et une caisse simple.",
    icon: Shirt,
    meta: {
      title: "Logiciel de caisse et stock pour boutique",
      description:
        "Boutique de vêtements, cosmétiques ou accessoires : DigiStock gère votre catalogue, vos étiquettes code-barres, votre caisse et vos clients fidèles. Simple, moderne, hors ligne.",
      keywords: ["logiciel boutique vêtements", "logiciel caisse boutique", "gestion stock boutique", "logiciel cosmétiques"],
    },
    hero: {
      eyebrow: "Solutions · Boutiques",
      title: "Une gestion aussi soignée que votre boutique.",
      intro:
        "Un catalogue organisé par catégories, des étiquettes code-barres pour chaque article, une caisse rapide et le suivi de vos clientes et clients fidèles. DigiStock reste simple, même avec beaucoup de références.",
    },
    challenges: [
      { title: "Beaucoup de références", text: "Modèles, tailles et couleurs multiplient les articles." },
      { title: "Articles sans code", text: "Une partie des produits n'a pas de code-barres fabricant." },
      { title: "Clients fidèles", text: "Retrouver ce qu'une cliente a acheté la dernière fois." },
      { title: "Produits qui dorment", text: "Savoir quoi solder et quoi recommander." },
    ],
    sections: [
      {
        title: "Un catalogue organisé",
        paragraphs: [
          "Classez vos articles par catégories (robes, chemises, soins, parfums, accessoires…) et retrouvez-les instantanément à la caisse. Pour gérer tailles et couleurs, créez une référence par déclinaison que vous voulez suivre en stock.",
        ],
      },
      {
        title: "Des étiquettes pour chaque article",
        paragraphs: [
          "Générez un code-barres pour chaque article et imprimez les étiquettes en une seule fois à la réception de la collection. À la caisse, un scan suffit. Voir [code-barres](/features/code-barres).",
        ],
      },
      {
        title: "Vos clients fidèles",
        paragraphs: [
          "Une fiche client garde l'historique des achats. Utile pour conseiller, pour un échange ou pour prévenir d'un nouvel arrivage. Voir [clients](/features/clients).",
        ],
      },
      {
        title: "Savoir ce qui se vend",
        paragraphs: [
          "Les [rapports](/features/rapports) montrent vos produits les plus vendus et votre chiffre d'affaires sur 7 jours, 30 jours ou 12 mois. Vous savez quoi recommander et quoi mettre en promotion.",
        ],
      },
      {
        title: "Cosmétiques : dates d'expiration",
        paragraphs: [
          "Pour les produits cosmétiques, le tableau de bord signale les expirations à venir. La gestion avancée des expirations est disponible avec Premium.",
        ],
      },
    ],
    features: ["caisse", "code-barres", "clients", "rapports", "gestion-stock"],
    recommendedPlan: {
      plan: "Free",
      reason: "Free couvre le catalogue, les étiquettes, la caisse et les clients. Premium ajoute WhatsApp et la gestion avancée des expirations.",
    },
    faq: [
      {
        question: "Puis-je gérer les tailles et les couleurs ?",
        answer: "Créez une référence par déclinaison que vous souhaitez suivre en stock (par exemple « Chemise lin – M – Bleu »). Chaque référence peut avoir son propre code-barres.",
      },
      {
        question: "Puis-je imprimer des étiquettes pour toute une collection ?",
        answer: "Oui. DigiStock génère les codes-barres et permet d'imprimer plusieurs étiquettes à la fois.",
      },
    ],
  },
  {
    slug: "distribution",
    name: "Distribution",
    plural: "Distributeurs",
    short: "Clients nombreux, commandes fréquentes et suivi des encaissements.",
    icon: Truck,
    meta: {
      title: "Logiciel pour distributeurs : stock, clients, crédits",
      description:
        "Distributeurs et sociétés de distribution : suivez stock, ventes, crédits clients, fournisseurs et dépôts avec DigiStock. Rappels de paiement WhatsApp avec Premium.",
      keywords: ["logiciel distribution Maroc", "logiciel distributeur", "gestion crédits distribution", "logiciel pour PME Maroc"],
    },
    hero: {
      eyebrow: "Solutions · Distribution",
      title: "Distribuez plus, relancez moins.",
      intro:
        "Un distributeur vit de ses clients réguliers et de ses encaissements. DigiStock relie stock, ventes, crédits et fournisseurs pour que chaque livraison et chaque paiement soient suivis.",
    },
    challenges: [
      { title: "Encaissements", text: "Beaucoup de clients paient plus tard, en plusieurs fois." },
      { title: "Stock en mouvement", text: "Les quantités changent vite entre dépôt et livraisons." },
      { title: "Commandes fournisseurs", text: "Les réassorts doivent arriver avant la rupture." },
      { title: "Équipe", text: "Plusieurs personnes saisissent des ventes et des paiements." },
    ],
    sections: [
      {
        title: "Suivre chaque client et chaque encaissement",
        paragraphs: [
          "Chaque vente à crédit s'ajoute au solde du client, chaque paiement le réduit, avec un reçu numéroté. Le total des crédits est visible sur le tableau de bord. Avec Premium, DigiStock prépare des rappels de paiement que vous envoyez par [WhatsApp](/features/whatsapp) après validation. Voir [crédits clients](/features/credits-clients).",
        ],
      },
      {
        title: "Un stock fiable pour livrer à temps",
        paragraphs: [
          "Les quantités sont mises à jour à chaque vente et à chaque réception. Les alertes de stock minimum et, avec Premium, les suggestions de réapprovisionnement vous aident à commander avant la rupture. Voir [achats](/features/achats).",
        ],
      },
      {
        title: "Une équipe, des rôles",
        paragraphs: [
          "Avec Premium, chaque membre de l'équipe a son compte utilisateur et un rôle adapté : caisse, stock, administration. Le journal d'activité garde la trace des actions importantes.",
        ],
      },
    ],
    features: ["credits-clients", "whatsapp", "achats", "multi-entrepots", "rapports"],
    recommendedPlan: {
      plan: "Premium",
      reason: "Utilisateurs multiples, rôles, rappels WhatsApp et multi-entrepôts sont inclus dans Premium.",
    },
    faq: [
      {
        question: "Plusieurs employés peuvent-ils utiliser DigiStock ?",
        answer: "Oui, avec Premium : utilisateurs multiples, rôles et permissions, et journal d'activité.",
      },
      {
        question: "Puis-je relancer mes clients par WhatsApp ?",
        answer: "Oui, avec Premium. Le message est préparé par DigiStock, puis relu et validé par vous avant l'envoi.",
      },
    ],
  },
  {
    slug: "petite-usine",
    name: "Petite usine",
    plural: "Petites usines",
    short: "Matières premières, produits finis et ventes aux professionnels.",
    icon: Factory,
    meta: {
      title: "Logiciel de stock pour petite usine et atelier",
      description:
        "Ateliers et petites unités de fabrication : suivez vos matières premières, produits finis, achats, ventes et crédits clients avec DigiStock, sur Windows et hors ligne.",
      keywords: ["logiciel stock usine", "gestion stock matières premières", "logiciel atelier fabrication", "logiciel PME Maroc"],
    },
    hero: {
      eyebrow: "Solutions · Petites usines",
      title: "Du stock de matières aux ventes de produits finis.",
      intro:
        "Une petite unité de fabrication doit suivre ce qu'elle achète, ce qu'elle produit et ce qu'elle vend. DigiStock garde ces flux lisibles, sans la complexité d'un ERP.",
    },
    challenges: [
      { title: "Matières premières", text: "Savoir quand recommander avant d'arrêter la production." },
      { title: "Produits finis", text: "Connaître le stock disponible avant de promettre une livraison." },
      { title: "Clients professionnels", text: "Factures, crédits et paiements différés." },
      { title: "Outils trop lourds", text: "Les ERP sont coûteux et longs à mettre en place." },
    ],
    sections: [
      {
        title: "Suivre matières premières et produits finis",
        paragraphs: [
          "Créez des catégories distinctes pour vos matières premières et vos produits finis. Les achats de matières entrent en stock à la réception. Les ajustements permettent d'enregistrer la consommation de matières et l'entrée des produits fabriqués, avec un motif pour chaque mouvement. Voir la [gestion de stock](/features/gestion-stock).",
        ],
      },
      {
        title: "Ne jamais manquer de matière",
        paragraphs: [
          "Fixez un stock minimum pour chaque matière critique : DigiStock vous alerte dès que le seuil est atteint. Avec Premium, la suggestion de réapprovisionnement tient compte de votre consommation moyenne et du délai du fournisseur. Voir [achats](/features/achats).",
        ],
      },
      {
        title: "Vendre aux professionnels",
        paragraphs: [
          "Vos clients professionnels reçoivent des factures, peuvent acheter à crédit et payer en plusieurs fois. Chaque solde est suivi. Voir [crédits clients](/features/credits-clients).",
        ],
      },
      {
        title: "Simple à mettre en place",
        paragraphs: [
          "DigiStock n'est pas un ERP de production : il ne gère pas de nomenclatures ni d'ordres de fabrication. C'est justement ce qui le rend rapide à adopter pour un atelier qui veut d'abord maîtriser ses stocks, ses achats et ses ventes.",
        ],
      },
    ],
    features: ["gestion-stock", "achats", "fournisseurs", "credits-clients", "rapports"],
    recommendedPlan: {
      plan: "Free",
      reason: "Free suffit pour suivre matières, produits finis, achats et ventes. Premium ajoute utilisateurs multiples et réapprovisionnement suggéré.",
    },
    faq: [
      {
        question: "DigiStock gère-t-il les nomenclatures et ordres de fabrication ?",
        answer: "Non. DigiStock suit le stock, les achats et les ventes. La consommation de matières et l'entrée des produits finis s'enregistrent par des mouvements de stock.",
      },
      {
        question: "Puis-je être alerté avant de manquer d'une matière première ?",
        answer: "Oui. Définissez un stock minimum : le produit apparaît dans les alertes dès que la quantité passe sous ce seuil.",
      },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Métiers affichés sur la page d'accueil (dont certains sans page dédiée). */
export const industries: { name: string; text: string; icon: LucideIcon; href: string }[] = [
  { name: "Magasins", text: "Caisse, stock et crédits au comptoir", icon: Store, href: "/solutions/magasin" },
  { name: "Grossistes", text: "Gros volumes et clients revendeurs", icon: Boxes, href: "/solutions/grossiste" },
  { name: "Entrepôts", text: "Mouvements et inventaires tracés", icon: Warehouse, href: "/solutions/entrepot" },
  { name: "Boutiques", text: "Catalogue, étiquettes et clients fidèles", icon: Shirt, href: "/solutions/boutique" },
  { name: "Électronique", text: "Références précises et codes fabricants", icon: Cpu, href: "/solutions/magasin" },
  { name: "Pièces automobiles", text: "Grand catalogue, recherche rapide", icon: Car, href: "/solutions/magasin" },
  { name: "Cosmétiques", text: "Expirations et produits à rotation", icon: SprayCan, href: "/solutions/boutique" },
  { name: "Alimentation", text: "Minimarkets, épiceries, dates limites", icon: ShoppingBasket, href: "/solutions/magasin" },
  { name: "Distribution", text: "Encaissements et réassorts", icon: Truck, href: "/solutions/distribution" },
  { name: "Petites usines", text: "Matières premières et produits finis", icon: Factory, href: "/solutions/petite-usine" },
];

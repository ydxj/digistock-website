import type { FAQItem } from "@/types/content";

export type FAQGroup = { title: string; items: (FAQItem & { home?: boolean })[] };

/** FAQ principale (page /faq, données structurées FAQPage). */
export const faqGroups: FAQGroup[] = [
  {
    title: "Fonctionnement",
    items: [
      {
        question: "DigiStock fonctionne-t-il sans Internet ?",
        answer:
          "Oui. DigiStock est une application Windows qui fonctionne hors ligne. Vous pouvez vendre, gérer votre stock et consulter vos rapports sans connexion. Internet n'est utile que pour certaines fonctions comme WhatsApp ou le téléchargement des mises à jour.",
        home: true,
      },
      {
        question: "Est-ce que mes données restent sur mon ordinateur ?",
        answer:
          "Oui. Vos données sont enregistrées localement, sur l'ordinateur où DigiStock est installé. Pensez à faire des sauvegardes régulières sur une clé USB ou un disque externe ; avec Premium, les sauvegardes peuvent être automatiques.",
        home: true,
      },
      {
        question: "DigiStock fonctionne-t-il sur Windows 10 ?",
        answer: "Oui. DigiStock est compatible avec Windows 10 en version 64 bits (x64).",
      },
      {
        question: "DigiStock fonctionne-t-il sur Windows 11 ?",
        answer: "Oui. DigiStock est compatible avec Windows 11.",
      },
      {
        question: "Est-ce que DigiStock est adapté aux magasins marocains ?",
        answer:
          "Oui. DigiStock est conçu pour les entreprises marocaines : interface en français, montants en dirhams (DH), ventes à crédit et suivi des crédits clients, envoi de documents par WhatsApp et fonctionnement hors ligne.",
        home: true,
      },
    ],
  },
  {
    title: "Fonctionnalités",
    items: [
      {
        question: "DigiStock fonctionne-t-il avec un lecteur code-barres ?",
        answer:
          "Oui. DigiStock fonctionne avec les lecteurs code-barres USB standards. Il lit et génère les codes EAN-13 et Code128, et permet d'imprimer des étiquettes.",
        home: true,
      },
      {
        question: "Puis-je gérer les crédits clients ?",
        answer:
          "Oui. Vous pouvez vendre à crédit, enregistrer les paiements complets ou partiels, remettre un reçu de paiement et consulter le solde de chaque client. Cette fonction est incluse dans la version gratuite.",
        home: true,
      },
      {
        question: "Puis-je utiliser DigiStock dans plusieurs entrepôts ?",
        answer:
          "Oui, avec DigiStock Premium. Vous suivez le stock de chaque entrepôt et transférez la marchandise entre eux, avec des mouvements tracés.",
      },
      {
        question: "Puis-je générer des factures PDF ?",
        answer:
          "Oui. DigiStock génère des tickets et des factures pour vos ventes. Les rapports PDF avancés font partie de Premium.",
      },
      {
        question: "Puis-je connecter WhatsApp ?",
        answer:
          "Oui, avec DigiStock Premium. WhatsApp est connecté localement depuis DigiStock. Vous pouvez envoyer factures, tickets, rappels de paiement et commandes fournisseurs. Aucun message n'est envoyé sans votre validation.",
      },
      {
        question: "Puis-je importer mes produits depuis Excel ou CSV ?",
        answer:
          "Oui. DigiStock permet l'import et l'export au format CSV. Depuis Excel, enregistrez votre fichier au format CSV puis importez-le dans DigiStock.",
        home: true,
      },
      {
        question: "Comment sauvegarder mes données ?",
        answer:
          "Créez une sauvegarde depuis DigiStock et copiez-la sur un support externe (clé USB, disque dur). Avec Premium, les sauvegardes automatiques sont disponibles. La documentation détaille la création et la restauration d'une sauvegarde.",
      },
    ],
  },
  {
    title: "Offres",
    items: [
      {
        question: "Existe-t-il une version gratuite ?",
        answer:
          "Oui. DigiStock Free est gratuit et sans limite de produits ni de ventes. Il inclut la caisse, le stock, les codes-barres, l'inventaire, les achats, les fournisseurs, les clients, les crédits clients, les rapports de base et le tableau de bord.",
        home: true,
      },
      {
        question: "Quelle est la différence entre Free et Premium ?",
        answer:
          "Free couvre la gestion quotidienne d'un commerce. Premium ajoute WhatsApp, les rappels clients, les rapports avancés, les utilisateurs multiples avec rôles et permissions, le journal d'activité, les sauvegardes automatiques, les suggestions de réapprovisionnement, la gestion avancée des expirations et le multi-entrepôts.",
        home: true,
      },
    ],
  },
];

export const allFaq: FAQItem[] = faqGroups.flatMap((g) => g.items.map(({ question, answer }) => ({ question, answer })));

export const homeFaq: FAQItem[] = faqGroups.flatMap((g) => g.items.filter((i) => i.home));

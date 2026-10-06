import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ShoppingCart,
  ScanBarcode,
  ClipboardCheck,
  Users,
  Wallet,
  Truck,
  PackagePlus,
  ChartColumn,
  MessageCircle,
  Warehouse,
} from "lucide-react";
import type { ContentSection, FAQItem, Highlight, LinkRef, Step } from "@/types/content";

export type FeatureSlug =
  | "gestion-stock"
  | "caisse"
  | "code-barres"
  | "inventaire"
  | "clients"
  | "credits-clients"
  | "fournisseurs"
  | "achats"
  | "rapports"
  | "whatsapp"
  | "multi-entrepots";

export type Feature = {
  slug: FeatureSlug;
  name: string;
  short: string;
  icon: LucideIcon;
  /** "premium" = fonctionnalité réservée à Premium ; "partial" = base gratuite + options Premium */
  plan: "free" | "premium" | "partial";
  meta: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; title: string; intro: string };
  screen?: "pos" | "dashboard";
  highlights: Highlight[];
  sections: ContentSection[];
  steps?: { title: string; items: Step[] };
  faq: FAQItem[];
  related: FeatureSlug[];
  docs: LinkRef[];
};

export const features: Feature[] = [
  {
    slug: "gestion-stock",
    name: "Gestion de stock",
    short: "Suivez vos quantités, mouvements, alertes et inventaires en temps réel.",
    icon: Boxes,
    plan: "free",
    meta: {
      title: "Gestion de stock simple et moderne",
      description:
        "Suivez vos quantités en temps réel, chaque entrée et sortie, les alertes de stock minimum et vos inventaires. Logiciel de gestion de stock Windows, hors ligne, en DH.",
      keywords: ["logiciel gestion de stock", "gestion stock magasin", "logiciel stock Maroc", "gestion stock DH"],
    },
    hero: {
      eyebrow: "Gestion de stock",
      title: "Sachez à tout moment ce que vous avez en stock.",
      intro:
        "DigiStock met à jour vos quantités à chaque vente, achat, ajustement ou transfert. Vous voyez ce qui entre, ce qui sort, et ce qu'il faut racheter, sans tenir de cahier ni recompter vos rayons chaque soir.",
    },
    screen: "dashboard",
    highlights: [
      { title: "Quantités en temps réel", text: "Le stock baisse dès qu'une vente est validée et remonte à la réception d'un achat." },
      { title: "Traçabilité complète", text: "Chaque mouvement garde sa date, son motif et le document qui l'a créé." },
      { title: "Alertes de stock minimum", text: "Les produits sous leur seuil apparaissent sur le tableau de bord." },
      { title: "Valeur du stock", text: "Visualisez la valeur de votre marchandise en dirhams, à tout moment." },
    ],
    sections: [
      {
        title: "Qu'est-ce que la gestion de stock ?",
        paragraphs: [
          "Gérer son stock, c'est savoir précisément quels produits vous possédez, en quelle quantité, où ils se trouvent et combien ils valent. C'est aussi comprendre pourquoi une quantité change : une vente, une livraison fournisseur, une casse ou une erreur de comptage.",
          "Dans beaucoup de commerces, ces informations sont réparties entre un cahier, un fichier Excel et la mémoire du gérant. Le résultat est connu : ruptures sur les produits qui se vendent bien, surstock sur ceux qui dorment, et des écarts impossibles à expliquer en fin de mois.",
        ],
      },
      {
        title: "Comment DigiStock suit votre stock",
        paragraphs: [
          "Chaque produit possède une quantité, un prix d'achat, un prix de vente et un stock minimum. DigiStock ne vous demande pas de modifier ces quantités à la main : elles évoluent automatiquement avec votre activité.",
          "Quand vous encaissez une vente depuis la [caisse](/features/caisse), les quantités vendues sont retirées du stock. Quand vous enregistrez un [achat fournisseur](/features/achats), les quantités reçues sont ajoutées. Le stock affiché reflète donc ce qui se passe réellement dans votre magasin.",
        ],
        bullets: [
          "Ventes : sortie automatique des quantités vendues",
          "Achats : entrée automatique des quantités reçues",
          "Ajustements : correction justifiée d'une quantité",
          "Produits endommagés : sortie avec motif",
          "Transferts : déplacement entre entrepôts (Premium)",
        ],
      },
      {
        title: "Des mouvements de stock traçables",
        paragraphs: [
          "Chaque variation de quantité crée un mouvement de stock. Un mouvement indique la quantité, le sens (entrée ou sortie), la date, le motif et le document lié, par exemple un achat ACH-2026-000103 ou une vente V-2026-000208.",
          "Cet historique répond aux questions du quotidien : pourquoi ce produit est-il à zéro ? Quand a-t-il été réapprovisionné pour la dernière fois ? Combien de pièces ont été déclarées endommagées ce mois-ci ?",
        ],
      },
      {
        title: "Inventaire et stock minimum",
        paragraphs: [
          "Même avec un suivi rigoureux, un comptage physique reste nécessaire. Le module [inventaire](/features/inventaire) vous permet de compter vos produits, de comparer avec le stock théorique et de corriger les écarts en gardant une trace.",
          "Pour chaque produit, vous définissez un stock minimum. Dès que la quantité passe sous ce seuil, le produit apparaît dans les alertes de stock faible. Avec Premium, DigiStock peut aussi proposer une quantité à commander à partir de vos ventes moyennes et du délai de votre fournisseur.",
        ],
      },
      {
        title: "Ce que vous y gagnez",
        paragraphs: [
          "Moins de ruptures, moins d'argent immobilisé dans du stock qui ne tourne pas, et des décisions d'achat basées sur des chiffres plutôt que sur des impressions. Surtout, vous gagnez du temps : plus besoin de recompter ou de recopier des quantités d'un cahier à un autre.",
        ],
      },
    ],
    steps: {
      title: "Mettre en place le suivi de stock",
      items: [
        { title: "Créez ou importez vos produits", text: "Ajoutez vos produits un par un ou importez-les depuis un fichier CSV." },
        { title: "Saisissez les quantités de départ", text: "Indiquez le stock actuel de chaque produit, idéalement après un comptage." },
        { title: "Définissez les stocks minimum", text: "Fixez un seuil d'alerte pour les produits que vous ne voulez jamais manquer." },
        { title: "Travaillez normalement", text: "Ventes et achats mettent le stock à jour automatiquement." },
      ],
    },
    faq: [
      {
        question: "Le stock est-il mis à jour automatiquement après une vente ?",
        answer: "Oui. Dès qu'une vente est validée, les quantités vendues sont retirées du stock et un mouvement de stock est enregistré avec le numéro de la vente.",
      },
      {
        question: "Puis-je corriger une quantité manuellement ?",
        answer: "Oui, par un ajustement de stock. L'ajustement est enregistré comme un mouvement avec son motif, ce qui permet de garder une trace de chaque correction.",
      },
      {
        question: "La gestion de stock fonctionne-t-elle sans Internet ?",
        answer: "Oui. DigiStock est une application Windows qui fonctionne hors ligne : vos données sont enregistrées sur votre ordinateur.",
      },
      {
        question: "Y a-t-il une limite de produits dans la version gratuite ?",
        answer: "Non. La version Free ne limite ni le nombre de produits ni le nombre de ventes.",
      },
    ],
    related: ["inventaire", "code-barres", "achats", "multi-entrepots"],
    docs: [
      { label: "Mouvements de stock", href: "/docs/mouvements-de-stock" },
      { label: "Stock minimum", href: "/docs/stock-minimum" },
      { label: "Ajouter un produit", href: "/docs/ajouter-un-produit" },
    ],
  },
  {
    slug: "caisse",
    name: "Ventes & caisse",
    short: "Encaissez rapidement vos ventes, scannez les produits et générez tickets et factures.",
    icon: ShoppingCart,
    plan: "free",
    meta: {
      title: "Logiciel de caisse pour magasin au Maroc",
      description:
        "Une caisse rapide pour Windows : scan code-barres, panier, remise, paiement en espèces, carte, virement ou crédit client, ticket et facture. Stock mis à jour à chaque vente.",
      keywords: ["logiciel caisse Maroc", "application caisse magasin", "logiciel de caisse gratuit", "logiciel ventes magasin"],
    },
    hero: {
      eyebrow: "Ventes & caisse",
      title: "Une caisse conçue pour aller vite.",
      intro:
        "Scannez, encaissez, passez au client suivant. L'écran Nouvelle vente de DigiStock est pensé pour le comptoir : peu de clics, des raccourcis clavier, et un stock mis à jour automatiquement à chaque vente.",
    },
    screen: "pos",
    highlights: [
      { title: "Scan instantané", text: "Le produit scanné s'ajoute au panier ; un second scan augmente la quantité." },
      { title: "Raccourcis clavier", text: "F9 pour valider, F6 espèces, F7 carte, F8 crédit, + et − pour la quantité." },
      { title: "Cinq modes de paiement", text: "Espèces, carte, virement, crédit client ou autre." },
      { title: "Ticket ou facture", text: "Imprimez un ticket ou générez une facture après chaque vente." },
    ],
    sections: [
      {
        title: "Une vente en quelques secondes",
        paragraphs: [
          "Au comptoir, chaque seconde compte. Dans DigiStock, la vente commence dès que vous scannez un article : le produit apparaît dans le panier avec son prix. Scannez-le une seconde fois et la quantité passe à deux. Pour une grande quantité, tapez par exemple 3* avant le scan pour ajouter trois unités d'un coup.",
          "Pas de lecteur sous la main ? Recherchez le produit par son nom dans la barre de recherche, ou touchez sa vignette dans la grille de produits. Les quantités en stock sont affichées sur chaque vignette.",
        ],
      },
      {
        title: "Encaisser comme vous le souhaitez",
        paragraphs: [
          "Choisissez le mode de paiement en un clic ou au clavier : Espèces, Carte, Virement, Crédit ou Autre. Le paiement à crédit est lié à la fiche du client et alimente directement le suivi des [crédits clients](/features/credits-clients).",
          "Vous pouvez appliquer une remise sur la vente. Le récapitulatif affiche le sous-total, la remise, la TVA incluse et le total à payer en dirhams, avant validation.",
        ],
        bullets: ["Espèces", "Carte", "Virement", "Crédit client", "Autre"],
      },
      {
        title: "Ticket, facture et historique",
        paragraphs: [
          "Chaque vente reçoit un numéro unique, par exemple V-2026-000208. Vous pouvez imprimer un ticket de caisse ou générer une facture. Toutes les ventes sont retrouvables dans l'historique, avec leur détail, leur mode de paiement et le client associé.",
          "Avec Premium, le ticket ou la facture peut être envoyé au client par [WhatsApp](/features/whatsapp), après votre validation.",
        ],
      },
      {
        title: "Le stock suit chaque vente",
        paragraphs: [
          "La caisse n'est pas isolée du reste de votre gestion. Dès que la vente est validée, les quantités sont retirées du stock et un mouvement de stock est créé. Le chiffre d'affaires, le bénéfice et le panier moyen du tableau de bord se mettent à jour. C'est ce qui distingue un logiciel de gestion d'une simple caisse enregistreuse.",
        ],
      },
      {
        title: "Pensée pour le comptoir",
        paragraphs: [
          "L'écran de vente fonctionne au clavier comme à la souris. Les raccourcis sont rappelés en bas de l'écran pour que chaque employé les apprenne rapidement. La vente se fait sans connexion Internet : une coupure réseau n'arrête pas votre caisse.",
        ],
        bullets: [
          "Entrée : ajouter le produit ou valider",
          "F9 : valider la vente",
          "F6 / F7 / F8 : espèces, carte, crédit",
          "+ / − : modifier la quantité",
          "Suppr : retirer la ligne du panier",
          "F2 : ouvrir une nouvelle vente depuis n'importe quel écran",
        ],
      },
    ],
    steps: {
      title: "Comment se déroule une vente",
      items: [
        { title: "Scanner", text: "Scannez le code-barres ou recherchez le produit." },
        { title: "Ajouter au panier", text: "Le produit s'ajoute ; un nouveau scan augmente la quantité." },
        { title: "Encaisser", text: "Choisissez le mode de paiement et validez avec F9." },
        { title: "Stock mis à jour", text: "Le stock baisse, le ticket est prêt, la vente est enregistrée." },
      ],
    },
    faq: [
      {
        question: "Puis-je utiliser la caisse sans lecteur code-barres ?",
        answer: "Oui. Vous pouvez rechercher un produit par son nom ou le sélectionner dans la grille. Le lecteur code-barres accélère simplement la saisie.",
      },
      {
        question: "Quels modes de paiement sont disponibles ?",
        answer: "Espèces, carte, virement, crédit client et autre. Le paiement à crédit est rattaché à la fiche du client.",
      },
      {
        question: "Est-ce que la caisse fonctionne hors ligne ?",
        answer: "Oui. DigiStock fonctionne sans connexion Internet. Vos ventes sont enregistrées localement sur votre ordinateur.",
      },
      {
        question: "Puis-je vendre à un client sans créer de fiche ?",
        answer: "Oui. Par défaut, la vente est faite au « Client de passage ». Une fiche client n'est nécessaire que pour une vente à crédit ou pour suivre l'historique d'un client.",
      },
    ],
    related: ["code-barres", "credits-clients", "gestion-stock", "whatsapp"],
    docs: [
      { label: "Nouvelle vente", href: "/docs/nouvelle-vente" },
      { label: "Paiement", href: "/docs/paiement" },
      { label: "Ticket et facture", href: "/docs/ticket-et-facture" },
    ],
  },
  {
    slug: "code-barres",
    name: "Code-barres",
    short: "Scannez et générez des codes EAN-13 et Code128, et imprimez vos étiquettes.",
    icon: ScanBarcode,
    plan: "free",
    meta: {
      title: "Logiciel code-barres pour magasin",
      description:
        "Utilisez un lecteur code-barres USB avec DigiStock : scan EAN-13 et Code128, création de produit si le code est inconnu, génération et impression d'étiquettes.",
      keywords: ["logiciel code barre magasin", "lecteur code-barres caisse", "étiquettes code-barres", "EAN-13"],
    },
    hero: {
      eyebrow: "Code-barres",
      title: "Scannez. Vendez. Continuez.",
      intro:
        "Branchez un lecteur code-barres USB et DigiStock le reconnaît comme un clavier. Le produit scanné s'ajoute à la vente, à l'achat ou à l'inventaire. Pour vos articles sans code, DigiStock génère et imprime les étiquettes.",
    },
    screen: "pos",
    highlights: [
      { title: "EAN-13 et Code128", text: "Les deux formats les plus courants en magasin sont pris en charge." },
      { title: "Lecteurs USB", text: "Compatible avec les lecteurs code-barres USB standards." },
      { title: "Code inconnu ?", text: "DigiStock propose de créer le produit à partir du code scanné." },
      { title: "Étiquettes", text: "Générez et imprimez plusieurs étiquettes en une seule fois." },
    ],
    sections: [
      {
        title: "Pourquoi utiliser des codes-barres ?",
        paragraphs: [
          "Taper un prix à la main, c'est lent et source d'erreurs. Un code-barres identifie le produit sans ambiguïté : le bon article, le bon prix, la bonne quantité retirée du stock. Pour un commerce qui vend des centaines de références, c'est le moyen le plus sûr de garder un stock juste.",
        ],
      },
      {
        title: "Fonctionne avec un lecteur USB",
        paragraphs: [
          "La plupart des lecteurs code-barres USB se comportent comme un clavier : ils « tapent » le code puis valident. DigiStock détecte cette saisie rapide et l'interprète comme un scan, que vous soyez sur l'écran de [caisse](/features/caisse), dans un achat ou pendant un [inventaire](/features/inventaire).",
          "Aucun pilote spécifique n'est nécessaire pour un lecteur de ce type : branchez-le, ouvrez l'écran de vente et scannez.",
        ],
      },
      {
        title: "EAN-13 et Code128",
        paragraphs: [
          "Les produits industriels portent généralement un code EAN-13, celui que vous voyez sous la plupart des emballages. Le Code128 est pratique pour vos propres références, car il accepte aussi les lettres. DigiStock lit les deux et peut générer les deux.",
        ],
        bullets: ["EAN-13 : produits du commerce, 13 chiffres", "Code128 : références internes, chiffres et lettres"],
      },
      {
        title: "Un code inconnu ne bloque pas la vente",
        paragraphs: [
          "Si vous scannez un code qui n'existe pas encore dans votre catalogue, DigiStock vous propose de créer le produit avec ce code déjà renseigné. Vous saisissez le nom et le prix, et l'article est prêt à être vendu. C'est la manière la plus rapide de constituer votre catalogue au fil des ventes ou des réceptions.",
        ],
      },
      {
        title: "Générer et imprimer vos étiquettes",
        paragraphs: [
          "Pour les articles vendus en vrac, fabriqués sur place ou sans code fournisseur, DigiStock génère un code-barres et prépare des étiquettes avec le nom et le prix du produit. Vous pouvez imprimer plusieurs étiquettes à la fois, par exemple après la réception d'une commande.",
        ],
      },
    ],
    steps: {
      title: "Démarrer avec un lecteur code-barres",
      items: [
        { title: "Branchez le lecteur", text: "Un lecteur USB standard fonctionne comme un clavier." },
        { title: "Ouvrez Nouvelle vente", text: "Le champ de scan est actif dès l'ouverture de l'écran." },
        { title: "Scannez un produit", text: "Le produit connu s'ajoute ; un code inconnu propose une création." },
        { title: "Étiquetez le reste", text: "Générez des codes pour vos articles sans code-barres." },
      ],
    },
    faq: [
      {
        question: "Quel lecteur code-barres acheter ?",
        answer: "Un lecteur USB qui fonctionne en mode « émulation clavier » convient. C'est le mode par défaut de la plupart des lecteurs du marché.",
      },
      {
        question: "Quels formats de code-barres sont pris en charge ?",
        answer: "DigiStock lit et génère les codes EAN-13 et Code128.",
      },
      {
        question: "Que se passe-t-il si je scanne un produit qui n'existe pas ?",
        answer: "DigiStock vous propose de créer le produit avec le code scanné déjà renseigné.",
      },
      {
        question: "Puis-je imprimer des étiquettes pour mes produits ?",
        answer: "Oui. Vous pouvez générer des codes-barres et imprimer plusieurs étiquettes en une seule fois.",
      },
    ],
    related: ["caisse", "inventaire", "gestion-stock", "achats"],
    docs: [
      { label: "Code-barres", href: "/docs/code-barres" },
      { label: "Ajouter un produit", href: "/docs/ajouter-un-produit" },
      { label: "Nouvelle vente", href: "/docs/nouvelle-vente" },
    ],
  },
  {
    slug: "inventaire",
    name: "Inventaire",
    short: "Comptez vos produits, comparez avec le stock théorique et corrigez les écarts.",
    icon: ClipboardCheck,
    plan: "free",
    meta: {
      title: "Logiciel d'inventaire et suivi de stock",
      description:
        "Réalisez vos inventaires avec DigiStock : comptage par scan, comparaison avec le stock théorique, ajustements tracés. Logiciel d'inventaire pour magasins et entrepôts au Maroc.",
      keywords: ["logiciel inventaire Maroc", "inventaire de stock", "logiciel inventaire magasin", "comptage stock"],
    },
    hero: {
      eyebrow: "Inventaire",
      title: "Un inventaire juste, sans y passer le week-end.",
      intro:
        "Comptez vos produits, scannez-les si vous le souhaitez, et laissez DigiStock comparer avec le stock attendu. Les écarts sont visibles produit par produit et chaque correction est enregistrée.",
    },
    highlights: [
      { title: "Sessions d'inventaire", text: "Ouvrez une session, comptez, validez quand vous êtes prêt." },
      { title: "Comptage par scan", text: "Scannez les articles pour accélérer le comptage." },
      { title: "Écarts visibles", text: "Stock théorique, quantité comptée et différence côte à côte." },
      { title: "Ajustements tracés", text: "Les corrections deviennent des mouvements de stock." },
    ],
    sections: [
      {
        title: "Pourquoi faire un inventaire ?",
        paragraphs: [
          "Même si toutes vos ventes et tous vos achats sont enregistrés, le stock réel finit toujours par s'écarter du stock théorique : casse, erreurs de saisie, vol, produits mal rangés. L'inventaire consiste à compter physiquement vos produits pour remettre les chiffres en accord avec la réalité.",
          "Un inventaire régulier permet aussi de repérer les produits qui ne se vendent plus, de connaître la valeur exacte de votre stock et de préparer votre bilan.",
        ],
      },
      {
        title: "Comment se passe un inventaire dans DigiStock",
        paragraphs: [
          "Vous ouvrez une session d'inventaire depuis le menu Inventaire. Pour chaque produit, vous saisissez la quantité comptée, à la main ou en scannant les articles avec un [lecteur code-barres](/features/code-barres). DigiStock affiche la quantité attendue et l'écart.",
          "Quand le comptage est terminé, vous validez la session. Les écarts sont transformés en ajustements de stock : chaque correction apparaît dans les [mouvements de stock](/features/gestion-stock) avec la référence de l'inventaire.",
        ],
      },
      {
        title: "Inventaire complet ou tournant",
        paragraphs: [
          "Vous n'êtes pas obligé de tout compter d'un coup. Beaucoup de commerces préfèrent un inventaire tournant : une catégorie ou un rayon par semaine. Les produits à forte valeur ou à forte rotation peuvent être comptés plus souvent que les autres.",
        ],
        bullets: [
          "Inventaire complet : tout le stock, une à deux fois par an",
          "Inventaire tournant : une partie du stock à intervalle régulier",
          "Contrôle ciblé : un produit ou une catégorie après un doute",
        ],
      },
      {
        title: "Des écarts que vous pouvez expliquer",
        paragraphs: [
          "Un écart n'est utile que si vous pouvez le comprendre. En consultant les mouvements d'un produit, vous retrouvez les ventes, les achats, les produits déclarés endommagés et les ajustements précédents. Vous savez si l'écart vient d'une erreur de réception, d'une casse non déclarée ou d'un autre problème.",
        ],
      },
    ],
    steps: {
      title: "Réaliser un inventaire",
      items: [
        { title: "Ouvrez une session", text: "Depuis le menu Inventaire, démarrez un nouveau comptage." },
        { title: "Comptez", text: "Saisissez ou scannez les quantités réellement présentes." },
        { title: "Contrôlez les écarts", text: "Vérifiez les différences importantes avant de valider." },
        { title: "Validez", text: "Les écarts deviennent des ajustements de stock tracés." },
      ],
    },
    faq: [
      {
        question: "Puis-je faire l'inventaire d'une seule catégorie ?",
        answer: "Oui. Vous pouvez compter uniquement une partie de vos produits, ce qui permet de pratiquer un inventaire tournant.",
      },
      {
        question: "Les ajustements d'inventaire sont-ils enregistrés ?",
        answer: "Oui. Chaque écart validé crée un ajustement de stock visible dans les mouvements du produit.",
      },
      {
        question: "Puis-je utiliser un lecteur code-barres pour l'inventaire ?",
        answer: "Oui. Scanner les articles accélère le comptage et limite les erreurs de saisie.",
      },
    ],
    related: ["gestion-stock", "code-barres", "multi-entrepots", "rapports"],
    docs: [
      { label: "Inventaire", href: "/docs/inventaire" },
      { label: "Mouvements de stock", href: "/docs/mouvements-de-stock" },
    ],
  },
  {
    slug: "clients",
    name: "Clients",
    short: "Retrouvez vos clients, leur historique d'achats et leurs coordonnées.",
    icon: Users,
    plan: "free",
    meta: {
      title: "Logiciel de gestion client pour commerce",
      description:
        "Fichier clients, historique d'achats, crédits et paiements : DigiStock centralise la relation avec vos clients professionnels et particuliers. Logiciel de gestion client au Maroc.",
      keywords: ["logiciel gestion client", "fichier client magasin", "historique client", "logiciel gestion clients Maroc"],
    },
    hero: {
      eyebrow: "Clients",
      title: "Connaissez vos clients, pas seulement vos ventes.",
      intro:
        "Chaque client a sa fiche : coordonnées, achats, crédits et paiements. Vous savez ce qu'il achète, combien il vous doit et quand il a payé pour la dernière fois.",
    },
    highlights: [
      { title: "Fiche client", text: "Nom, téléphone, adresse et informations utiles." },
      { title: "Historique d'achats", text: "Toutes les ventes du client, avec leur détail." },
      { title: "Crédit et solde", text: "Le montant dû par le client, toujours à jour." },
      { title: "Client de passage", text: "Vendez sans créer de fiche quand ce n'est pas utile." },
    ],
    sections: [
      {
        title: "Un fichier client utile au quotidien",
        paragraphs: [
          "Pour un grossiste, un distributeur ou un magasin de quartier, les clients réguliers représentent souvent l'essentiel du chiffre d'affaires. Les connaître, c'est pouvoir leur proposer les bons produits, leur faire confiance pour un paiement différé et les relancer au bon moment.",
          "Dans DigiStock, une fiche client se crée en quelques secondes depuis le menu Clients ou au moment d'une vente. Elle rassemble les coordonnées du client et tout l'historique de votre relation commerciale.",
        ],
      },
      {
        title: "L'historique de chaque client",
        paragraphs: [
          "Depuis la fiche, vous retrouvez les ventes du client avec leur numéro, leur date, leur montant et leur mode de paiement. Utile pour répondre à une question (« Quel modèle avais-je pris la dernière fois ? »), réimprimer un document ou comprendre l'évolution d'un compte.",
        ],
      },
      {
        title: "Crédits et paiements au même endroit",
        paragraphs: [
          "Si vous vendez à crédit, la fiche client affiche le solde restant et chaque opération : ventes à crédit, paiements reçus, reçus de paiement. Tout le détail est présenté sur la page [crédits clients](/features/credits-clients).",
          "Avec Premium, vous pouvez envoyer un rappel de paiement par [WhatsApp](/features/whatsapp) depuis la fiche, après avoir relu le message.",
        ],
      },
      {
        title: "Vendre sans fiche quand c'est plus simple",
        paragraphs: [
          "Tous les clients n'ont pas besoin d'une fiche. Par défaut, l'écran de [caisse](/features/caisse) vend au « Client de passage ». Vous ne créez de fiche que lorsque c'est utile : vente à crédit, client professionnel, facture nominative.",
        ],
      },
    ],
    faq: [
      {
        question: "Dois-je créer une fiche pour chaque client ?",
        answer: "Non. Les ventes au comptoir peuvent être faites au « Client de passage ». La fiche est utile pour les ventes à crédit et les clients réguliers.",
      },
      {
        question: "Puis-je voir tout ce qu'un client a acheté ?",
        answer: "Oui. La fiche client regroupe l'historique de ses ventes, de ses crédits et de ses paiements.",
      },
      {
        question: "Puis-je importer ma liste de clients ?",
        answer: "DigiStock propose l'import et l'export CSV. Consultez la documentation pour connaître les données prises en charge par votre version.",
      },
    ],
    related: ["credits-clients", "caisse", "whatsapp", "rapports"],
    docs: [
      { label: "Ajouter un client", href: "/docs/ajouter-un-client" },
      { label: "Crédit client", href: "/docs/credit-client" },
    ],
  },
  {
    slug: "credits-clients",
    name: "Clients & crédits",
    short: "Suivez vos clients, leurs achats et leurs crédits sans carnet papier.",
    icon: Wallet,
    plan: "partial",
    meta: {
      title: "Gestion des crédits clients",
      description:
        "Fini le carnet de crédit : suivez les ventes à crédit, les paiements et le solde de chaque client. Reçus de paiement et rappels WhatsApp. Logiciel crédit client pour commerces marocains.",
      keywords: ["logiciel crédit client", "gestion crédit client magasin", "carnet de crédit", "suivi des dettes clients"],
    },
    hero: {
      eyebrow: "Crédits clients",
      title: "Gardez le contrôle sur les crédits clients.",
      intro:
        "Vendre à crédit fait partie du commerce au Maroc. DigiStock remplace le carnet : chaque vente à crédit, chaque paiement et chaque solde est enregistré, daté et retrouvable en quelques secondes.",
    },
    highlights: [
      { title: "Vente à crédit", text: "Choisissez « Crédit » à la caisse et le montant s'ajoute au solde du client." },
      { title: "Paiements partiels", text: "Encaissez un acompte ou un règlement complet." },
      { title: "Reçu de paiement", text: "Chaque paiement reçoit un numéro, par exemple PAY-2026-000001." },
      { title: "Rappel WhatsApp", text: "Envoyez un rappel poli, relu et validé par vous (Premium)." },
    ],
    sections: [
      {
        title: "Le problème du carnet de crédit",
        paragraphs: [
          "Dans de nombreux commerces, les crédits clients sont notés dans un carnet. Ça fonctionne jusqu'au jour où une page est illisible, où le carnet disparaît, ou quand un client conteste un montant. Le total dû n'est jamais calculé, et il est difficile de savoir quels clients n'ont pas payé depuis longtemps.",
        ],
      },
      {
        title: "Comment DigiStock gère les crédits",
        paragraphs: [
          "À la [caisse](/features/caisse), choisissez le mode de paiement Crédit et sélectionnez le client. Le montant de la vente s'ajoute à son solde. Quand le client paie, enregistrez le paiement depuis le menu Crédits clients : le solde diminue et un reçu de paiement est généré.",
          "Le solde de chaque client est toujours à jour. Le tableau de bord affiche le total des crédits clients pour que vous sachiez combien d'argent est dehors.",
        ],
        bullets: [
          "Ventes à crédit liées à la fiche client",
          "Paiements complets ou partiels",
          "Solde restant calculé automatiquement",
          "Historique daté de chaque opération",
          "Reçu de paiement numéroté",
        ],
      },
      {
        title: "Un historique clair en cas de question",
        paragraphs: [
          "Quand un client demande le détail de ce qu'il doit, vous lui montrez la liste des ventes et des paiements avec leurs dates et leurs numéros. Plus de discussion sur un montant noté à la va-vite : chaque ligne correspond à une vente ou à un paiement enregistré.",
        ],
      },
      {
        title: "Relancer sans gêne",
        paragraphs: [
          "Avec Premium, DigiStock prépare un message de rappel contenant le solde du client. Vous relisez, modifiez si besoin, puis envoyez par [WhatsApp](/features/whatsapp). Aucun message n'est envoyé sans votre validation.",
        ],
      },
    ],
    steps: {
      title: "Suivre un crédit client",
      items: [
        { title: "Vendez à crédit", text: "Choisissez « Crédit » à la caisse et sélectionnez le client." },
        { title: "Suivez le solde", text: "Le montant dû apparaît sur la fiche et sur le tableau de bord." },
        { title: "Encaissez les paiements", text: "Enregistrez chaque paiement, complet ou partiel." },
        { title: "Remettez un reçu", text: "Imprimez ou envoyez le reçu de paiement." },
      ],
    },
    faq: [
      {
        question: "La gestion des crédits clients est-elle incluse dans la version gratuite ?",
        answer: "Oui. Les ventes à crédit, les paiements et le suivi des soldes sont inclus dans Free. Les rappels WhatsApp font partie de Premium.",
      },
      {
        question: "Un client peut-il payer en plusieurs fois ?",
        answer: "Oui. Vous pouvez enregistrer autant de paiements partiels que nécessaire ; le solde est recalculé à chaque fois.",
      },
      {
        question: "Les rappels WhatsApp sont-ils envoyés automatiquement ?",
        answer: "Non. DigiStock prépare le message, mais c'est vous qui le relisez et validez l'envoi.",
      },
    ],
    related: ["clients", "caisse", "whatsapp", "rapports"],
    docs: [
      { label: "Crédit client", href: "/docs/credit-client" },
      { label: "Paiement client", href: "/docs/paiement-client" },
      { label: "Rappels WhatsApp", href: "/docs/whatsapp-rappels" },
    ],
  },
  {
    slug: "fournisseurs",
    name: "Fournisseurs",
    short: "Centralisez vos fournisseurs, leurs produits et vos échanges.",
    icon: Truck,
    plan: "partial",
    meta: {
      title: "Logiciel de gestion fournisseurs",
      description:
        "Gérez vos fournisseurs avec DigiStock : coordonnées, historique d'achats, délais de livraison et commandes via WhatsApp. Pour commerces, grossistes et distributeurs au Maroc.",
      keywords: ["logiciel gestion fournisseur", "fichier fournisseurs", "gestion fournisseurs magasin", "commande fournisseur"],
    },
    hero: {
      eyebrow: "Fournisseurs",
      title: "Vos fournisseurs, organisés au même endroit.",
      intro:
        "Coordonnées, historique d'achats, délais de livraison : DigiStock garde la mémoire de vos relations fournisseurs pour que vous commandiez au bon moment, au bon prix.",
    },
    highlights: [
      { title: "Fiche fournisseur", text: "Contact, téléphone et informations commerciales." },
      { title: "Historique d'achats", text: "Tous les achats passés chez ce fournisseur." },
      { title: "Délai de livraison", text: "Utilisé pour calculer les suggestions de réapprovisionnement." },
      { title: "Commande WhatsApp", text: "Envoyez une commande préparée dans DigiStock (Premium)." },
    ],
    sections: [
      {
        title: "Pourquoi suivre ses fournisseurs",
        paragraphs: [
          "Savoir qui vous livre quoi, à quel prix et en combien de temps, c'est la base d'un réapprovisionnement serein. Quand ces informations sont dans votre téléphone ou sur des bons papier, il est difficile de comparer ou de prévoir.",
        ],
      },
      {
        title: "La fiche fournisseur",
        paragraphs: [
          "Depuis le menu Fournisseurs, créez une fiche par fournisseur avec ses coordonnées. Chaque [achat](/features/achats) enregistré est rattaché au fournisseur : vous retrouvez l'historique des réceptions, les montants et les produits commandés.",
          "Le délai de livraison habituel du fournisseur est l'un des éléments utilisés pour proposer des quantités de réapprovisionnement avec Premium.",
        ],
      },
      {
        title: "Commander par WhatsApp",
        paragraphs: [
          "Beaucoup de commandes fournisseurs se font déjà par WhatsApp. Avec Premium, DigiStock prépare le message de commande à partir des produits à réapprovisionner. Vous le relisez et l'envoyez depuis l'application. Plus besoin de recopier la liste à la main. Voir la page [WhatsApp](/features/whatsapp).",
        ],
      },
    ],
    faq: [
      {
        question: "Puis-je voir tous les achats faits chez un fournisseur ?",
        answer: "Oui. Les achats sont rattachés au fournisseur et consultables depuis sa fiche ou depuis le menu Achats.",
      },
      {
        question: "La gestion des fournisseurs est-elle gratuite ?",
        answer: "Oui. Fournisseurs et achats sont inclus dans Free. L'envoi de commandes par WhatsApp fait partie de Premium.",
      },
    ],
    related: ["achats", "gestion-stock", "whatsapp", "rapports"],
    docs: [
      { label: "Ajouter un fournisseur", href: "/docs/ajouter-un-fournisseur" },
      { label: "Commandes fournisseurs", href: "/docs/commandes-fournisseurs" },
    ],
  },
  {
    slug: "achats",
    name: "Achats & fournisseurs",
    short: "Gérez vos commandes, fournisseurs et réapprovisionnements.",
    icon: PackagePlus,
    plan: "free",
    meta: {
      title: "Gestion des achats et réapprovisionnement",
      description:
        "Enregistrez vos achats fournisseurs, réceptionnez la marchandise et mettez le stock à jour automatiquement. Suggestions de réapprovisionnement selon vos ventes et délais.",
      keywords: ["gestion des achats", "réapprovisionnement stock", "bon de commande fournisseur", "logiciel achats magasin"],
    },
    hero: {
      eyebrow: "Achats",
      title: "Réapprovisionnez au bon moment.",
      intro:
        "Enregistrez vos achats fournisseurs et le stock se met à jour à la réception. Avec Premium, DigiStock vous suggère quoi commander et en quelle quantité, à partir de vos ventes réelles.",
    },
    highlights: [
      { title: "Achats numérotés", text: "Chaque achat a sa référence, par exemple ACH-2026-000103." },
      { title: "Stock mis à jour", text: "Les quantités reçues entrent automatiquement en stock." },
      { title: "Prix d'achat", text: "Les coûts servent au calcul de votre bénéfice." },
      { title: "Suggestion de réapprovisionnement", text: "Une quantité proposée selon vos ventes (Premium)." },
    ],
    sections: [
      {
        title: "Enregistrer un achat",
        paragraphs: [
          "Depuis Nouvel achat, choisissez le [fournisseur](/features/fournisseurs), ajoutez les produits (par recherche ou par scan) avec leurs quantités et leurs prix d'achat. À l'enregistrement, les quantités sont ajoutées au stock et un mouvement d'entrée est créé avec la référence de l'achat.",
          "Les prix d'achat enregistrés permettent à DigiStock de calculer votre bénéfice et la valeur de votre stock.",
        ],
      },
      {
        title: "Suggestion de réapprovisionnement",
        paragraphs: [
          "Commander trop tôt immobilise votre trésorerie. Commander trop tard, c'est la rupture. Avec Premium, DigiStock calcule une quantité suggérée à partir de trois éléments simples :",
        ],
        bullets: [
          "vos ventes moyennes par jour pour le produit",
          "le délai de livraison du fournisseur",
          "un stock de sécurité pour absorber les imprévus",
        ],
      },
      {
        title: "Un exemple concret",
        paragraphs: [
          "Vous vendez en moyenne 4 unités par jour d'un produit. Votre fournisseur livre en 7 jours et vous voulez garder 10 unités de sécurité. Il vous faut donc environ 4 × 7 + 10 = 38 unités disponibles au moment de commander. Si votre stock passe sous ce niveau, il est temps de passer commande.",
          "Il ne s'agit pas d'une prédiction magique : c'est un calcul transparent, basé sur votre historique, que vous pouvez toujours ajuster.",
        ],
      },
      {
        title: "Des achats liés au reste de votre gestion",
        paragraphs: [
          "Les achats alimentent les [mouvements de stock](/features/gestion-stock), les [rapports](/features/rapports) et l'historique de chaque fournisseur. Vous savez ce que vous avez acheté, à qui, à quel prix et quand.",
        ],
      },
    ],
    steps: {
      title: "Enregistrer un achat",
      items: [
        { title: "Choisissez le fournisseur", text: "Sélectionnez ou créez le fournisseur." },
        { title: "Ajoutez les produits", text: "Recherchez ou scannez, puis indiquez quantités et prix." },
        { title: "Enregistrez l'achat", text: "L'achat reçoit sa référence ACH-…" },
        { title: "Le stock est à jour", text: "Les quantités reçues sont ajoutées automatiquement." },
      ],
    },
    faq: [
      {
        question: "Comment est calculée la suggestion de réapprovisionnement ?",
        answer: "À partir des ventes moyennes par jour, du délai de livraison du fournisseur et d'un stock de sécurité. Le calcul est transparent et la quantité reste modifiable.",
      },
      {
        question: "La gestion des achats est-elle incluse dans Free ?",
        answer: "Oui. Les achats et les fournisseurs sont inclus dans Free. Les suggestions de réapprovisionnement font partie de Premium.",
      },
      {
        question: "Le prix d'achat est-il utilisé pour le calcul du bénéfice ?",
        answer: "Oui. Les prix d'achat permettent de calculer le bénéfice et la valeur du stock.",
      },
    ],
    related: ["fournisseurs", "gestion-stock", "rapports", "multi-entrepots"],
    docs: [
      { label: "Achats", href: "/docs/achats" },
      { label: "Réapprovisionnement", href: "/docs/reapprovisionnement" },
    ],
  },
  {
    slug: "rapports",
    name: "Rapports",
    short: "Analysez votre chiffre d'affaires, vos bénéfices et vos produits les plus vendus.",
    icon: ChartColumn,
    plan: "partial",
    meta: {
      title: "Rapports de ventes, bénéfices et stock",
      description:
        "Chiffre d'affaires, bénéfice, panier moyen, top produits, valeur du stock : les rapports DigiStock vous donnent une vision claire de votre activité, en DH. Exports PDF avec Premium.",
      keywords: ["rapport de ventes", "logiciel statistiques magasin", "rapport bénéfice", "tableau de bord commerce"],
    },
    hero: {
      eyebrow: "Rapports",
      title: "Vos chiffres, enfin lisibles.",
      intro:
        "Combien avez-vous vendu cette semaine ? Quel produit rapporte le plus ? Combien vaut votre stock ? DigiStock répond en un coup d'œil, à partir de vos ventes et achats réels.",
    },
    screen: "dashboard",
    highlights: [
      { title: "Tableau de bord", text: "Chiffre d'affaires, bénéfice, ventes et panier moyen du jour." },
      { title: "Évolution", text: "Courbe du chiffre d'affaires sur 7 jours, 30 jours ou 12 mois." },
      { title: "Top produits", text: "Les produits qui rapportent le plus sur la période." },
      { title: "Rapports PDF", text: "Rapports avancés exportables en PDF (Premium)." },
    ],
    sections: [
      {
        title: "Le tableau de bord, chaque matin",
        paragraphs: [
          "En ouvrant DigiStock, vous voyez le chiffre d'affaires, le bénéfice, le nombre de ventes et le panier moyen de la journée, comparés à la veille. Juste en dessous : produits en stock faible, ruptures, valeur du stock, crédits clients, commandes fournisseurs et expirations proches.",
          "Le graphique du chiffre d'affaires montre l'évolution sur 7 jours, 30 jours ou 12 mois, à côté du classement de vos produits les plus vendus.",
        ],
      },
      {
        title: "Les rapports inclus dans Free",
        paragraphs: [
          "La version gratuite inclut le tableau de bord et les rapports de base : ventes, chiffre d'affaires, bénéfice et produits les plus vendus. De quoi piloter un commerce au quotidien sans tableur.",
        ],
      },
      {
        title: "Aller plus loin avec Premium",
        paragraphs: [
          "Premium ajoute des rapports avancés, des analyses de stock plus fines, des widgets supplémentaires et des rapports PDF avancés à partager avec un associé ou un comptable. Le journal d'activité vous permet aussi de savoir qui a fait quoi lorsque plusieurs [utilisateurs](/tarifs) travaillent sur DigiStock.",
        ],
      },
      {
        title: "Des chiffres fiables parce que tout est lié",
        paragraphs: [
          "Les rapports ne sont utiles que si les données sont justes. Comme la [caisse](/features/caisse), les [achats](/features/achats) et le [stock](/features/gestion-stock) sont dans la même application, le bénéfice tient compte de vos prix d'achat réels et la valeur du stock reflète vos quantités réelles.",
        ],
      },
    ],
    faq: [
      {
        question: "Les rapports sont-ils inclus dans la version gratuite ?",
        answer: "Oui, le tableau de bord et les rapports de base sont inclus. Les rapports avancés et les exports PDF avancés font partie de Premium.",
      },
      {
        question: "Comment le bénéfice est-il calculé ?",
        answer: "À partir des prix de vente encaissés et des prix d'achat enregistrés pour les produits vendus.",
      },
      {
        question: "Les montants sont-ils affichés en dirhams ?",
        answer: "Oui. DigiStock est conçu pour le Maroc et affiche les montants en DH.",
      },
    ],
    related: ["caisse", "gestion-stock", "achats", "credits-clients"],
    docs: [{ label: "Introduction", href: "/docs/introduction" }],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    short: "Envoyez reçus, factures et rappels directement depuis DigiStock.",
    icon: MessageCircle,
    plan: "premium",
    meta: {
      title: "Envoyer factures et rappels par WhatsApp",
      description:
        "Avec DigiStock Premium, envoyez tickets, factures, rappels de paiement et commandes fournisseurs par WhatsApp. Messages préparés par DigiStock, toujours validés par vous.",
      keywords: ["facture WhatsApp", "rappel paiement WhatsApp", "logiciel caisse WhatsApp", "commande fournisseur WhatsApp"],
    },
    hero: {
      eyebrow: "WhatsApp · Premium",
      title: "WhatsApp directement depuis DigiStock.",
      intro:
        "Vos clients et fournisseurs sont déjà sur WhatsApp. DigiStock prépare le message (facture, ticket, rappel ou commande) et vous l'envoyez après l'avoir relu. Rien n'est envoyé sans votre validation.",
    },
    highlights: [
      { title: "Facture et ticket", text: "Envoyez le document de vente au client après l'achat." },
      { title: "Rappel de paiement", text: "Un message clair avec le solde à régler." },
      { title: "Commande fournisseur", text: "La liste des produits à commander, prête à envoyer." },
      { title: "Vous validez", text: "Chaque message est relu et confirmé avant l'envoi." },
    ],
    sections: [
      {
        title: "Pourquoi WhatsApp",
        paragraphs: [
          "Au Maroc, WhatsApp est souvent le premier canal entre un commerce et ses clients ou fournisseurs. Plutôt que de photographier un ticket ou de recopier une liste, DigiStock prépare directement le bon message avec les bonnes informations.",
        ],
      },
      {
        title: "Ce que vous pouvez envoyer",
        paragraphs: ["Depuis DigiStock Premium, vous pouvez envoyer :"],
        bullets: [
          "une facture ou un ticket après une vente",
          "un rappel de paiement à un client qui a un solde",
          "un message à un fournisseur",
          "une commande fournisseur préparée à partir de vos besoins",
        ],
      },
      {
        title: "Connecté via WhatsApp Web, sous votre contrôle",
        paragraphs: [
          "DigiStock se connecte à WhatsApp via WhatsApp Web, depuis votre ordinateur, comme lorsque vous liez un appareil à votre compte. DigiStock ne publie rien et n'envoie aucun message automatiquement : il prépare le contenu, vous le relisez, vous pouvez le modifier, et c'est vous qui validez l'envoi.",
          "Cette approche évite les mauvaises surprises : pas de relance envoyée par erreur à un bon client, pas de message parti au mauvais moment.",
        ],
      },
      {
        title: "Lié à vos crédits clients",
        paragraphs: [
          "Le rappel de paiement reprend le solde calculé dans les [crédits clients](/features/credits-clients). Vous n'avez rien à recalculer : ouvrez la fiche, préparez le rappel, relisez, envoyez.",
        ],
      },
    ],
    faq: [
      {
        question: "Les messages WhatsApp sont-ils envoyés automatiquement ?",
        answer: "Non. DigiStock prépare le message, mais vous le relisez et validez toujours l'envoi.",
      },
      {
        question: "WhatsApp est-il inclus dans la version gratuite ?",
        answer: "Non. Les fonctions WhatsApp font partie de DigiStock Premium.",
      },
      {
        question: "Comment WhatsApp est-il connecté ?",
        answer: "DigiStock utilise WhatsApp Web : vous liez votre compte WhatsApp depuis votre ordinateur, comme un appareil connecté. La documentation détaille la procédure.",
      },
    ],
    related: ["credits-clients", "caisse", "fournisseurs", "clients"],
    docs: [
      { label: "Connexion WhatsApp", href: "/docs/whatsapp-connexion" },
      { label: "Envoyer une facture", href: "/docs/whatsapp-envoyer-facture" },
      { label: "Rappels de paiement", href: "/docs/whatsapp-rappels" },
    ],
  },
  {
    slug: "multi-entrepots",
    name: "Multi-entrepôts",
    short: "Gérez plusieurs lieux de stockage et transférez vos marchandises.",
    icon: Warehouse,
    plan: "premium",
    meta: {
      title: "Gestion multi-entrepôts et transferts de stock",
      description:
        "Magasin, dépôt, réserve : suivez le stock de chaque lieu et transférez la marchandise entre entrepôts avec traçabilité. Fonction Premium de DigiStock.",
      keywords: ["logiciel gestion entrepôt", "multi-dépôts", "transfert de stock", "gestion stock plusieurs magasins"],
    },
    hero: {
      eyebrow: "Multi-entrepôts · Premium",
      title: "Un stock par lieu, une seule vue d'ensemble.",
      intro:
        "Magasin, dépôt, réserve ou second point de vente : DigiStock suit les quantités de chaque entrepôt et trace chaque transfert entre eux.",
    },
    highlights: [
      { title: "Stock par entrepôt", text: "Les quantités de chaque lieu, séparément." },
      { title: "Transferts", text: "Déplacez de la marchandise avec un mouvement tracé." },
      { title: "Vue globale", text: "Le stock total, tous lieux confondus." },
      { title: "Traçabilité", text: "Chaque transfert apparaît dans les mouvements." },
    ],
    sections: [
      {
        title: "Quand faut-il plusieurs entrepôts ?",
        paragraphs: [
          "Dès que votre marchandise est stockée à plusieurs endroits, un stock global ne suffit plus. Un grossiste avec un dépôt et un showroom, un commerçant avec une réserve au sous-sol, une entreprise avec deux points de vente : chacun a besoin de savoir où se trouve physiquement chaque produit.",
        ],
      },
      {
        title: "Suivre le stock de chaque lieu",
        paragraphs: [
          "Avec Premium, vous créez vos entrepôts depuis le menu Entrepôts. Les achats sont réceptionnés dans un entrepôt, les ventes sortent d'un entrepôt, et vous consultez les quantités par lieu ou au total.",
        ],
      },
      {
        title: "Transférer la marchandise",
        paragraphs: [
          "Un transfert déplace des quantités d'un entrepôt à un autre. Il crée une sortie dans l'entrepôt d'origine et une entrée dans l'entrepôt de destination, visibles dans les [mouvements de stock](/features/gestion-stock). Vous savez quand la marchandise a bougé et pourquoi.",
        ],
      },
      {
        title: "Inventaire par entrepôt",
        paragraphs: [
          "Comptez un entrepôt à la fois : l'[inventaire](/features/inventaire) compare les quantités comptées au stock attendu de ce lieu précis. Les écarts ne se mélangent pas entre magasin et dépôt.",
        ],
      },
    ],
    faq: [
      {
        question: "La gestion multi-entrepôts est-elle incluse dans Free ?",
        answer: "Non. Le multi-entrepôts et les transferts font partie de DigiStock Premium.",
      },
      {
        question: "Les transferts sont-ils tracés ?",
        answer: "Oui. Chaque transfert crée des mouvements de stock dans l'entrepôt d'origine et dans l'entrepôt de destination.",
      },
    ],
    related: ["gestion-stock", "inventaire", "achats", "rapports"],
    docs: [{ label: "Multi-entrepôts", href: "/docs/multi-entrepots" }],
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug);
}

/** Les 8 fonctionnalités présentées sur la page d'accueil, dans l'ordre. */
export const homeFeatureSlugs: FeatureSlug[] = [
  "caisse",
  "gestion-stock",
  "achats",
  "credits-clients",
  "code-barres",
  "rapports",
  "whatsapp",
  "multi-entrepots",
];

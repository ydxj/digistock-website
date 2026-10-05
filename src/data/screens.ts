/**
 * Captures d'écran réelles de l'application DigiStock.
 * Ajoutez une variante `light` ou `dark` dès qu'une nouvelle capture est
 * disponible dans public/images/app/ : la vitrine et le sélecteur de thème
 * s'adaptent automatiquement.
 */
export type ScreenImage = { src: string; width: number; height: number };

export type Screen = {
  id: string;
  label: string;
  alt: string;
  light?: ScreenImage;
  dark?: ScreenImage;
  notes: { title: string; text: string }[];
};

export const screens: Screen[] = [
  {
    id: "tableau-de-bord",
    label: "Tableau de bord",
    alt: "Tableau de bord DigiStock : chiffre d'affaires, bénéfice, nombre de ventes, alertes de stock et top produits",
    dark: { src: "/images/app/dashboard-dark.webp", width: 1919, height: 1024 },
    notes: [
      { title: "L'essentiel du jour", text: "Chiffre d'affaires, bénéfice, ventes et panier moyen dès l'ouverture." },
      { title: "Alertes stock", text: "Stock faible, ruptures, crédits clients et expirations en un coup d'œil." },
      { title: "Activité récente", text: "Chaque vente et chaque encaissement est tracé avec son numéro." },
    ],
  },
  {
    id: "nouvelle-vente",
    label: "Nouvelle vente",
    alt: "Écran de caisse DigiStock : recherche par code-barres, produits, panier et modes de paiement",
    light: { src: "/images/app/pos-light.webp", width: 1919, height: 1022 },
    notes: [
      { title: "Scan ou recherche", text: "Scannez un code-barres ou tapez un nom : le produit s'ajoute au panier." },
      { title: "Raccourcis clavier", text: "F9 pour valider, F6 espèces, F7 carte, F8 crédit." },
      { title: "Paiement au choix", text: "Espèces, carte, virement, crédit client ou autre." },
    ],
  },
];

export const heroScreens = {
  front: screens[1].light!,
  back: screens[0].dark!,
};

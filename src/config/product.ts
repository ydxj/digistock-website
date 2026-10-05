/**
 * Informations produit DigiStock.
 * Modifiez ce fichier (ou les variables d'environnement) pour mettre à jour
 * la version, le lien de téléchargement et la configuration système.
 */
export const product = {
  name: "DigiStock",
  company: "DigiStudio",
  tagline: "La gestion de stock pensée pour votre entreprise.",
  /** Version affichée sur le site. Laisser vide pour la masquer. */
  currentVersion: "1.0.0",
  /** Date de publication de la version (ISO, ex. "2026-10-01"). Laisser vide pour la masquer. */
  releaseDate: "2026-10-05",
  /**
   * URL de l'installateur Windows (GitHub Releases). NEXT_PUBLIC_DOWNLOAD_URL
   * la remplace si elle est définie. Si l'URL est vide, les boutons affichent
   * `downloadFallback`.
   */
  downloadUrl:
    process.env.NEXT_PUBLIC_DOWNLOAD_URL ||
    "https://github.com/digistudio-dev/digistock/releases/download/DigiStock_1.0.0/DigiStock_1.0.0_x64-setup.exe",
  /** Nom du fichier téléchargé (affiché sur /telecharger). */
  installerFileName: "DigiStock_1.0.0_x64-setup.exe",
  /** Taille de l'installateur (ex. "92 Mo"). Laisser vide pour la masquer. */
  installerSize: "27,5 Mo",
  downloadFallback: {
    label: "Bientôt disponible",
    href: "/telecharger",
  },
  operatingSystems: ["Windows 10", "Windows 11"],
  architecture: "x64",
  /** Plateformes prévues pour plus tard (ex. macOS) : ajoutez-les ici. */
  platforms: [{ id: "windows", label: "Windows", available: true }],
  locale: "fr-MA",
  currency: { code: "MAD", symbol: "DH" },
} as const;

export function hasDownload(): boolean {
  return product.downloadUrl.trim().length > 0;
}

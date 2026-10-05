import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "DigiStock — La gestion de stock pensée pour votre entreprise";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "La gestion de stock pensée pour votre entreprise.",
    subtitle: "Stock, caisse, achats, clients et crédits. Windows, hors ligne, en DH.",
  });
}

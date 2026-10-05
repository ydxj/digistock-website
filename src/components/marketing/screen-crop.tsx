import Image from "next/image";
import type { ScreenImage } from "@/data/screens";
import { cn } from "@/lib/utils";

type ScreenCropProps = {
  image: ScreenImage;
  alt: string;
  /** Zone à afficher, en pixels de l'image source. */
  region: { x: number; y: number; width: number; height: number };
  /** Largeur d'affichage maximale (px), pour calculer `sizes`. */
  displayWidth: number;
  className?: string;
};

/**
 * Affiche un détail d'une capture réelle (zoom), sans retoucher l'image.
 * La capture complète reste visible ailleurs sur la page.
 */
export function ScreenCrop({ image, alt, region, displayWidth, className }: ScreenCropProps) {
  const scale = image.width / region.width;
  const renderedHeightRatio = (image.height / image.width) * scale; // hauteur image / largeur conteneur
  const containerHeightRatio = region.height / region.width;
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${region.width} / ${region.height}` }}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        quality={90}
        sizes={`${Math.round(displayWidth * scale)}px`}
        className="absolute max-w-none"
        style={{
          width: `${scale * 100}%`,
          height: `${(renderedHeightRatio / containerHeightRatio) * 100}%`,
          left: `${-(region.x / region.width) * 100}%`,
          top: `${-(region.y / region.height) * 100}%`,
        }}
      />
    </div>
  );
}

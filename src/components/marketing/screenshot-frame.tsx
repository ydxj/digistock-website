import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ScreenImage } from "@/data/screens";

type ScreenshotFrameProps = {
  image: ScreenImage;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  tone?: "light" | "dark";
  quality?: 75 | 90;
  eager?: boolean;
};

/**
 * Cadre sobre pour une capture réelle de l'application Windows.
 * Pas de faux navigateur : la capture inclut déjà la barre de titre Windows.
 */
export function ScreenshotFrame({ image, alt, sizes, preload = false, className, tone = "light", quality = 90, eager = false }: ScreenshotFrameProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[10px] bg-white p-0 shadow-screen ring-1",
        tone === "light" ? "ring-ink-950/10" : "ring-white/10",
        className,
      )}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload ? undefined : eager ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : undefined}
        className="block h-auto w-full"
      />
    </figure>
  );
}

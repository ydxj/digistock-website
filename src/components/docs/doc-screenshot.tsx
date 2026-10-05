import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { screens } from "@/data/screens";

const map = {
  pos: { id: "nouvelle-vente", theme: "light" },
  dashboard: { id: "tableau-de-bord", theme: "dark" },
} as const;

/** Capture d'écran réelle dans la documentation : <Screenshot name="pos" caption="…" /> */
export function DocScreenshot({ name, caption }: { name: keyof typeof map; caption?: string }) {
  const { id, theme } = map[name];
  const screen = screens.find((s) => s.id === id);
  const image = screen?.[theme];
  if (!screen || !image) return null;
  return (
    <figure className="not-prose my-8">
      <ScreenshotFrame
        image={image}
        alt={screen.alt}
        sizes="(min-width: 1280px) 760px, (min-width: 768px) 70vw, 100vw"
        tone={theme}
        quality={90}
        eager
        className="shadow-md"
      />
      {caption && <figcaption className="mt-3 text-center text-[0.8125rem] text-ink-500">{caption}</figcaption>}
    </figure>
  );
}

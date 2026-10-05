import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

async function dataUri(file: string, mime: string): Promise<string> {
  const buf = await readFile(path.join(process.cwd(), "assets", "og", file));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/**
 * Image Open Graph aux couleurs de DigiStock, avec une vraie capture de l'application.
 */
export async function renderOgImage({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  const [logo, screen] = await Promise.all([dataUri("logo.png", "image/png"), dataUri("pos-light.jpg", "image/jpeg")]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, rgba(7,17,38,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,17,38,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 64px 72px", width: 600, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={190} height={37} alt="" />
            <div style={{ display: "flex", fontSize: 18, color: "#5b6475", borderLeft: "1px solid #d7dce5", paddingLeft: 16 }}>
              par DigiStudio
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            {eyebrow && (
              <div style={{ display: "flex", fontSize: 20, color: "#1d4fd7", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>
                {eyebrow}
              </div>
            )}
            <div style={{ display: "flex", fontSize: title.length > 60 ? 44 : 54, fontWeight: 700, color: "#071126", lineHeight: 1.08, letterSpacing: -1.5 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ display: "flex", fontSize: 24, color: "#5b6475", marginTop: 22, lineHeight: 1.35 }}>{subtitle}</div>
            )}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 640,
            top: 96,
            width: 1000,
            height: 533,
            display: "flex",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(7,17,38,0.12)",
            boxShadow: "0 40px 80px -20px rgba(7,17,38,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screen} width={1000} height={533} alt="" />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, display: "flex", background: "#2563eb" }} />
      </div>
    ),
    ogSize,
  );
}

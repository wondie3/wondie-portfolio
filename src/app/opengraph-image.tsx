import { ImageResponse } from "next/og";
import { personal } from "../data/personal";

export const alt = `${personal.name} | ${personal.brand}: ${personal.roles.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Loads the pixel font for this image. If the download fails, a default font is used instead.
async function loadPixelFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!m) return null;
    const res = await fetch(m[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await loadPixelFont(personal.firstName + personal.lastName + personal.brand);
  const family = font ? "Pixelify" : "sans-serif";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#030d07" }}>
        <div style={{ position: "absolute", left: -200, top: -260, width: 1000, height: 1000, display: "flex", background: "radial-gradient(circle, rgba(18,184,102,0.35) 0%, rgba(18,184,102,0) 60%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", backgroundImage: "radial-gradient(circle, rgba(70,255,148,0.55) 2.2px, transparent 2.8px)", backgroundSize: "30px 30px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", background: "radial-gradient(circle at 25% 45%, rgba(3,13,7,0) 0%, rgba(3,13,7,0.94) 80%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", height: "100%" }}>
          <div style={{ display: "flex", fontFamily: family, fontSize: 32, color: "#46ff94", letterSpacing: 6 }}>{personal.brand}</div>
          <div style={{ display: "flex", fontFamily: family, fontSize: 150, lineHeight: 1, color: "#f2fff7", marginTop: 18 }}>{personal.firstName}</div>
          <div style={{ display: "flex", alignItems: "center", fontFamily: family, fontSize: 150, lineHeight: 1, color: "#46ff94" }}>
            {personal.lastName}
            <div style={{ display: "flex", width: 18, height: 92, background: "#46ff94", marginLeft: 16 }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#d9ffe8", marginTop: 34 }}>{personal.roles.join(" | ")}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Pixelify", data: font, weight: 700 as const, style: "normal" as const }] : undefined,
    }
  );
}

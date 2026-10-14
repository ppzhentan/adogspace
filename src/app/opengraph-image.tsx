import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = "adog.space personal portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#ffffff", color: "#202124", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 24, letterSpacing: "-0.04em", color: "#202124", fontWeight: 700 }}>{site.mark}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}><div style={{ fontSize: 76, lineHeight: 1.15, letterSpacing: "-0.055em", fontWeight: 600 }}>Personal portfolio</div><div style={{ fontSize: 30, color: "#777b7d" }}>About · Work · Contact</div></div>
      <div style={{ display: "flex", fontSize: 20, color: "#85898d" }}>adog.space</div>
    </div>, size,
  );
}

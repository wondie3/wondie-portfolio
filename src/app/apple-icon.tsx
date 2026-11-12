import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Pixel "W": [column, row] cells on a 5x5 grid
const CELLS = [[0, 0], [4, 0], [0, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [2, 3], [4, 3], [1, 4], [3, 4]];

export default function AppleIcon() {
  const cell = 24;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#05180e" }}>
        <div style={{ position: "relative", display: "flex", width: cell * 5, height: cell * 5 }}>
          {CELLS.map(([c, r]) => (
            <div key={c + "-" + r} style={{ position: "absolute", left: c * cell, top: r * cell, width: cell - 3, height: cell - 3, background: "#46ff94" }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

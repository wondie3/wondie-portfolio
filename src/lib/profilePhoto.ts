import fs from "node:fs";
import path from "node:path";

const EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/** Uses the configured photo if it exists; otherwise any public/images/profile.* file. */
export function resolveProfilePhoto(configured?: string): string | undefined {
  const pub = path.join(process.cwd(), "public");
  const exists = (u: string) => fs.existsSync(path.join(pub, decodeURIComponent(u).replace(/^\//, "")));
  if (configured && exists(configured)) return configured;
  try {
    const hit = fs
      .readdirSync(path.join(pub, "images"))
      .find((f) => /^profile\./i.test(f) && EXT.includes(path.extname(f).toLowerCase()));
    if (hit) return "/images/" + encodeURIComponent(hit);
  } catch {
    /* folder missing */
  }
  return undefined;
}

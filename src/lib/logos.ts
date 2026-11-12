import fs from "node:fs";
import path from "node:path";

const EXT = [".svg", ".png", ".webp", ".jpg", ".jpeg", ".avif"];

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Uses `logo` if it exists; otherwise /images/logos/<slug of the organization>.<ext>. */
export function resolveLogo(org: string, logo?: string): string | undefined {
  const pub = path.join(process.cwd(), "public");
  const on = (u: string) => fs.existsSync(path.join(pub, u.replace(/^\//, "")));
  if (logo && on(logo)) return logo;
  const base = "/images/logos/" + slugify(org);
  for (const e of EXT) if (on(base + e)) return base + e;
  return undefined;
}

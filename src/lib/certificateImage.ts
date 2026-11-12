import fs from "node:fs";
import path from "node:path";

const EXT = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

/** Uses `image` if it exists; otherwise a file with the same name as the image/PDF and any common image extension. */
export function resolvePreview(image?: string, file?: string): string | undefined {
  const pub = path.join(process.cwd(), "public");
  const onDisk = (u: string) => fs.existsSync(path.join(pub, decodeURIComponent(u).replace(/^\//, "")));
  if (image && onDisk(image)) return image;
  const base = (image ?? file)?.replace(/\.[^./]+$/, "");
  if (!base) return undefined;
  for (const e of EXT) if (onDisk(base + e)) return base + e;
  return undefined;
}

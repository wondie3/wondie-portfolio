import fs from "node:fs";
import path from "node:path";

const EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Returns the image URLs for a project, in filename order.
 * Reads public/images/projects/<slug>/ automatically.
 * Falls back to a single `fallback` image if the folder is empty or missing.
 */
export function getProjectImages(slug: string, fallback?: string): string[] {
  const dir = path.join(process.cwd(), "public", "images", "projects", slug);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (files.length) {
      return files.map((f) => `/images/projects/${slug}/${encodeURIComponent(f)}`);
    }
  } catch {
    /* folder missing: fall through */
  }
  return fallback ? [fallback] : [];
}

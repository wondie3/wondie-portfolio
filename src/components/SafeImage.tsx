"use client";

import Image from "next/image";
import { useState } from "react";

/** Renders nothing (so the placeholder underneath shows) if src is empty or fails to load. */
export default function SafeImage({
  src,
  alt,
  sizes,
  className,
  priority,
  unoptimized,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

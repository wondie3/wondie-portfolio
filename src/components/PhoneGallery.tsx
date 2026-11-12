"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function PhoneGallery({
  images,
  captions,
  title,
}: {
  images: string[];
  captions?: string[];
  title: string;
}) {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const n = images.length;
  if (n === 0) return null;
  const go = (d: number) => setI((c) => (c + d + n) % n);

  return (
    <div
      className="pg"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div
        className="pg-stage"
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null || n < 2) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="pg-phone">
          {images.map((src, k) => (
            <Image
              key={src}
              src={src}
              alt={`${title}: ${captions?.[k] ?? "screenshot " + (k + 1)}`}
              fill
              sizes="280px"
              className={k === i ? "pg-img on" : "pg-img"}
              priority={k === 0}
            />
          ))}
        </div>
        {n > 1 && (
          <>
            <button type="button" className="pg-arrow prev" aria-label="Previous screenshot" onClick={() => go(-1)}>
              &#8249;
            </button>
            <button type="button" className="pg-arrow next" aria-label="Next screenshot" onClick={() => go(1)}>
              &#8250;
            </button>
          </>
        )}
      </div>
      <p className="pg-cap" aria-live="polite">
        {captions?.[i]}
        <span>
          {i + 1} / {n}
        </span>
      </p>
      {n > 1 && (
        <div className="pg-thumbs">
          {images.map((src, k) => (
            <button
              key={src}
              type="button"
              className={k === i ? "pg-thumb on" : "pg-thumb"}
              aria-label={`Show screenshot ${k + 1} of ${n}${captions?.[k] ? ": " + captions[k] : ""}`}
              aria-current={k === i}
              onClick={() => setI(k)}
            >
              <Image src={src} alt="" fill sizes="40px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

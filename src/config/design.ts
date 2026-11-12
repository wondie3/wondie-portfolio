// Design + animation settings. Tweak numbers here; no component edits needed.
export const dots = {
  gap: 24,          // distance between dots (desktop)
  gapMobile: 30,    // distance between dots (< 700px wide)
  baseRadius: 1.1,
  maxRadius: 3.3,
  waveSpeed: 0.00168, // travelling pulse speed
  pointerRadius: 150, // cursor glow radius
  color: "70,255,148",     // r,g,b of the dots
  highlight: "120,255,176", // r,g,b of dots near the cursor
} as const;

export const motionConfig = {
  revealDistance: 24,
  revealDuration: 0.7,
  stagger: 0.06,
} as const;

// Contact form. Leave endpoint empty to open the visitor's email app instead.
export const contactForm = {
  endpoint: "https://formspree.io/f/abcd1234",
};

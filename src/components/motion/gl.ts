import * as THREE from "three";

/**
 * WebGL renderer configured to treat hex colors as-is (no sRGB ⇄ linear
 * conversion), so shader colors match the site's CSS palette exactly.
 */
export function createRenderer(canvas: HTMLCanvasElement, alpha = false) {
  THREE.ColorManagement.enabled = false;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

/** Resolved font-family list for a next/font CSS variable, e.g. "--font-fraunces". */
export function fontFamily(cssVar: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return v || fallback;
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const PALETTE = {
  deep: "#2E1C1C",
  primary: "#472D2D",
  secondary: "#553939",
  light: "#704F4F",
  lightest: "#A77979",
  accent: "#7FB7BE",
  cream: "#F4E7DF",
} as const;

/** GLSL value noise + fbm, shared by the shaders. */
export const GLSL_NOISE = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; } return v; }
`;

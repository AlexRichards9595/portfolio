"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createRenderer, fontFamily, GLSL_NOISE, PALETTE, prefersReducedMotion } from "@/components/motion/gl";

const TARGET_PARTICLES = 8000;

/**
 * Domain-warped "ink" shader with teal contour lines, plus the name rendered as
 * ~8k spring-physics particles that scatter around the cursor. Fills its parent.
 */
export default function InkCanvas({
  text = "Alex Richards",
  layout = "hero",
  count,
  scatter = false,
}: {
  text?: string;
  /** "hero": the name, centered high. "glyph": one large character, morphing when `text` changes. */
  layout?: "hero" | "glyph" | "quote";
  /** Fixed particle count (needed for morphing). Omit to size from the text's area. */
  count?: number;
  /** When true the particles fizzle out (drift away and fade); false gathers them back. */
  scatter?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef(text);
  textRef.current = text;
  const morphRef = useRef<(t: string) => void>(() => undefined);
  const scatterRef = useRef(scatter);
  scatterRef.current = scatter;
  const fizzleRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reduce = prefersReducedMotion();
    const renderer = createRenderer(canvas);
    const DPR = renderer.getPixelRatio();
    let W = host.clientWidth, H = host.clientHeight;
    renderer.setSize(W, H, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -10, 10);
    const color = (h: string) => new THREE.Color(h);

    // ── Background shader ──
    const bgU = {
      uTime: { value: 0 }, uRes: { value: new THREE.Vector2(W, H) }, uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPulse: { value: 0 }, uPulsePos: { value: new THREE.Vector2(0.5, 0.5) },
      cDeep: { value: color(PALETTE.deep) }, cPrim: { value: color(PALETTE.primary) }, cSec: { value: color(PALETTE.secondary) },
      cLight: { value: color(PALETTE.light) }, cAcc: { value: color(PALETTE.accent) }, cCream: { value: color(PALETTE.cream) },
    };
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgU, depthWrite: false, depthTest: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uTime, uPulse; uniform vec2 uRes, uMouse, uPulsePos;
        uniform vec3 cDeep, cPrim, cSec, cLight, cAcc, cCream;
        varying vec2 vUv;
        ${GLSL_NOISE}
        void main(){
          vec2 asp = vec2(uRes.x / uRes.y, 1.0);
          vec2 p = (vUv - 0.5) * asp * 2.4;
          vec2 m = (uMouse - 0.5) * asp * 2.4;
          vec2 pp = (uPulsePos - 0.5) * asp * 2.4;
          float d = length(p - m);
          float t = uTime * 0.05;
          float pd = length(p - pp);
          float ring = sin(pd * 18.0 - uPulse * 14.0) * exp(-pd * 2.5) * (1.0 - smoothstep(0.0, 1.0, uPulse * 0.6)) * step(0.001, uPulse);
          p += normalize(p - pp + 1e-4) * ring * 0.06;
          vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
          vec2 lens = (p - m) * exp(-d * 2.2) * 0.9;
          vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7, 9.2) + t*1.4 + lens), fbm(p + 3.0*q + vec2(8.3, 2.8) - t + lens));
          float f = fbm(p + 2.6 * r);
          vec3 col = mix(cDeep, cPrim, smoothstep(0.15, 0.62, f));
          col = mix(col, cSec, smoothstep(0.5, 0.95, length(q)) * 0.9);
          col = mix(col, cLight, smoothstep(0.62, 1.0, r.x) * 0.6);
          float c = abs(fract(f * 10.0) - 0.5);
          float line = smoothstep(0.44, 0.5, c) * smoothstep(0.3, 0.7, f);
          float glow = exp(-d * 1.5);
          col += cAcc * line * (0.06 + 0.5 * glow);
          col += cAcc * glow * 0.05 + cCream * pow(glow, 6.0) * 0.04;
          col += cAcc * abs(ring) * 0.35;
          float v = smoothstep(1.6, 0.25, length((vUv - 0.5) * asp));
          col *= mix(0.5, 1.0, v);
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMat);
    bg.frustumCulled = false;
    bg.renderOrder = -1;
    scene.add(bg);

    // ── Particle name ──
    const pMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, depthTest: false,
      uniforms: { uPR: { value: DPR }, uTime: { value: 0 }, uFade: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float size; attribute vec3 color; attribute float speed;
        uniform float uPR, uTime; varying vec3 vC; varying float vA;
        void main(){
          vC = color + vec3(0.25, 0.35, 0.35) * clamp(speed * 0.08, 0.0, 1.0);
          vA = 0.85 + 0.15 * sin(uTime * 2.0 + position.x * 0.05);
          gl_PointSize = size * uPR * (1.0 + clamp(speed * 0.05, 0.0, 0.8));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uFade; varying vec3 vC; varying float vA;
        void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA * uFade; if (a < 0.01) discard; gl_FragColor = vec4(vC, a); }`,
    });
    let points: THREE.Points | null = null;
    let geo: THREE.BufferGeometry | null = null;
    let N = 0;
    let home = new Float32Array(0), pos = new Float32Array(0), vel = new Float32Array(0), seed = new Float32Array(0);
    let startT = performance.now();
    const serif = fontFamily("--font-fraunces", "Georgia, serif");

    // Where the glyph sits. "quote": centered near the top. "glyph": left column on desktop, a corner badge on phones.
    const glyphBox = () => layout === "quote"
      ? { x: W * 0.5, y: H * 0.27, size: Math.min(H * 0.28, W * 0.42, 260) }
      : W >= 900
        ? { x: W * 0.23, y: H * 0.5, size: Math.min(H * 0.5, W * 0.3) }
        : { x: W * 0.8, y: H * 0.14, size: Math.min(W * 0.3, 130) };
    let scattered = false, fade = 1;

    /** Rasterise `str` for the current layout and return candidate particle homes. */
    function sample(str: string) {
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return { pts: [] as number[], step: 3 };
      ctx.fillStyle = "#fff";
      if (layout === "hero") {
        const narrow = W < 760;
        const fs = narrow ? Math.min(W * 0.22, 120) : Math.min(W * 0.13, 190);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = `600 ${fs}px ${serif}`;
        const cy = H * (narrow ? 0.3 : 0.38);
        const [first, ...rest] = str.split(" ");
        if (narrow && rest.length) { ctx.fillText(first, W / 2, cy - fs * 0.5); ctx.fillText(rest.join(" "), W / 2, cy + fs * 0.5); }
        else ctx.fillText(str, W / 2, cy);
      } else {
        // Fit the glyph's ink (not its em box) into the box — quote marks sit high in the em.
        const box = glyphBox();
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        ctx.font = `600 100px ${serif}`;
        let m = ctx.measureText(str);
        const gw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight, gh = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        const fs = Math.min(box.size / Math.max(gh, 1), (box.size * 0.9) / Math.max(gw, 1)) * 100;
        ctx.font = `600 ${fs}px ${serif}`;
        m = ctx.measureText(str);
        const w2 = m.actualBoundingBoxLeft + m.actualBoundingBoxRight, h2 = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
        ctx.fillText(str, box.x - w2 / 2 + m.actualBoundingBoxLeft, box.y - h2 / 2 + m.actualBoundingBoxAscent);
      }
      const data = ctx.getImageData(0, 0, W, H).data;
      let filled = 0;
      for (let i = 3; i < data.length; i += 16) if (data[i] > 128) filled++;
      const target = (count ?? TARGET_PARTICLES) * (count ? 1.3 : 1);
      const step = Math.max(2, Math.round(Math.sqrt((filled * 4) / target)));
      const pts: number[] = [];
      for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) pts.push(x + (Math.random() - 0.5) * step * 0.6 - W / 2, H / 2 - y + (Math.random() - 0.5) * step * 0.6);
      }
      return { pts, step };
    }

    /** Assign each of the N particles a home among the sampled points (shuffled, so morphs scatter). */
    function setHomes(pts: number[]) {
      const M = pts.length / 2;
      if (!count) { home = new Float32Array(pts); return; }
      home = new Float32Array(N * 2);
      if (!M) return;
      const idx = Array.from({ length: M }, (_, i) => i);
      for (let i = 0; i < N; i++) {
        const k = i % M;
        if (k === 0) for (let j = M - 1; j > 0; j--) { const r = Math.floor(Math.random() * (j + 1)); [idx[j], idx[r]] = [idx[r], idx[j]]; }
        home[i * 2] = pts[idx[k] * 2]; home[i * 2 + 1] = pts[idx[k] * 2 + 1];
      }
    }

    function build() {
      const { pts, step } = sample(textRef.current);
      N = count ?? pts.length / 2;
      setHomes(pts);
      pos = new Float32Array(N * 3); vel = new Float32Array(N * 2); seed = new Float32Array(N);
      const col = new Float32Array(N * 3), size = new Float32Array(N), speed = new Float32Array(N);
      const cream = color(PALETTE.cream), teal = color(PALETTE.accent), rose = color(PALETTE.lightest);
      for (let i = 0; i < N; i++) {
        if (reduce) { pos[i * 3] = home[i * 2]; pos[i * 3 + 1] = home[i * 2 + 1]; }
        else {
          const a = Math.random() * Math.PI * 2, rad = Math.max(W, H) * (0.35 + Math.random() * 0.6);
          pos[i * 3] = Math.cos(a) * rad; pos[i * 3 + 1] = Math.sin(a) * rad * 0.6;
          vel[i * 2] = -Math.sin(a) * 6; vel[i * 2 + 1] = Math.cos(a) * 6;
        }
        seed[i] = Math.random();
        const r = Math.random(), cc = r < 0.08 ? teal : r < 0.18 ? rose : cream;
        col.set([cc.r, cc.g, cc.b], i * 3);
        size[i] = step * (0.7 + Math.random() * 0.75);
      }
      if (points && geo) { scene.remove(points); geo.dispose(); }
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(size, 1));
      geo.setAttribute("speed", new THREE.BufferAttribute(speed, 1));
      points = new THREE.Points(geo, pMat);
      points.frustumCulled = false;
      scene.add(points);
      startT = performance.now();
    }

    /** Re-target the existing particles at a new string, with a little burst. */
    function morph(str: string, burst = true) {
      if (!count || !N) { build(); return; }
      setHomes(sample(str).pts);
      if (reduce) { for (let i = 0; i < N; i++) { pos[i * 3] = home[i * 2]; pos[i * 3 + 1] = home[i * 2 + 1]; } return; }
      if (burst) for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2, f = 4 + Math.random() * 10;
        vel[i * 2] += Math.cos(a) * f; vel[i * 2 + 1] += Math.sin(a) * f;
      }
    }

    // ── Interaction (window-level, so content layered over the canvas doesn't block it) ──
    const mouse = { x: -9999, y: -9999, sx: 0.5, sy: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { mouse.x = mouse.y = -9999; return; }
      const nx = e.clientX - r.left - W / 2, ny = H / 2 - (e.clientY - r.top);
      mouse.vx = nx - mouse.x; mouse.vy = ny - mouse.y;
      mouse.x = nx; mouse.y = ny;
      mouse.tx = (e.clientX - r.left) / W; mouse.ty = 1 - (e.clientY - r.top) / H;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    let pulse = 0;
    const onDown = (e: PointerEvent) => {
      if (e.target !== canvas) return;
      const r = host.getBoundingClientRect();
      const cx = e.clientX - r.left - W / 2, cy = H / 2 - (e.clientY - r.top);
      bgU.uPulsePos.value.set((e.clientX - r.left) / W, 1 - (e.clientY - r.top) / H);
      pulse = 0.0001;
      for (let i = 0; i < N; i++) {
        const dx = pos[i * 3] - cx, dy = pos[i * 3 + 1] - cy, d = Math.hypot(dx, dy) + 1;
        const f = 2400 / (d + 60);
        vel[i * 2] += (dx / d) * f * (0.6 + seed[i]); vel[i * 2 + 1] += (dy / d) * f * (0.6 + seed[i]);
      }
    };
    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
    }

    // ── Loop (paused while off-screen) ──
    let raf = 0, visible = true, last = performance.now();
    const step = (now: number) => {
      // Physics runs in ~60fps units; slow frames are split into sub-steps so the
      // name still settles on low-end devices.
      // rAF timestamps can precede the start time, so never step backwards.
      const frameDt = Math.min(Math.max((now - last) / 16.67, 0), 6); last = Math.max(last, now);
      const subs = Math.max(1, Math.ceil(frameDt / 1.5)), dt = frameDt / subs;
      const t = (now - startT) / 1000;
      mouse.sx += (mouse.tx - mouse.sx) * 0.06; mouse.sy += (mouse.ty - mouse.sy) * 0.06;
      bgU.uMouse.value.set(mouse.sx, mouse.sy);
      bgU.uTime.value = now / 1000;
      if (pulse > 0) { pulse += 0.016 * frameDt; if (pulse > 2) pulse = 0; }
      bgU.uPulse.value = pulse;
      pMat.uniforms.uTime.value = now / 1000;
      // Fizzle: release the springs, let the particles drift up and away, and fade them.
      if (scatterRef.current !== scattered) {
        scattered = scatterRef.current;
        if (scattered) for (let i = 0; i < N; i++) {
          const a = Math.random() * Math.PI * 2, f = 2 + Math.random() * 7;
          vel[i * 2] += Math.cos(a) * f; vel[i * 2 + 1] += Math.sin(a) * f + 2;
        }
      }
      fade += ((scattered ? 0 : 1) - fade) * Math.min(1, 0.06 * frameDt);
      pMat.uniforms.uFade.value = fade;
      for (let sub = 0; sub < subs && N && geo; sub++) {
        const k = scattered ? 0 : 0.012 + 0.03 * Math.min(1, Math.max(0, (t - 0.3) / 2.2));
        const damp = Math.pow(scattered ? 0.985 : 0.86, dt);
        const R = Math.min(W, H) * 0.14, R2 = R * R;
        const mv = Math.min(Math.hypot(mouse.vx, mouse.vy), 60);
        const speedA = geo!.attributes.speed.array as Float32Array;
        for (let i = 0; i < N; i++) {
          const i2 = i * 2, i3 = i * 3, s = seed[i];
          const x = pos[i3], y = pos[i3 + 1];
          const hx = home[i2] + Math.sin(t * 1.3 + s * 40) * 0.8, hy = home[i2 + 1] + Math.cos(t * 1.1 + s * 30) * 0.8;
          let ax = (hx - x) * k * (0.7 + s * 0.6), ay = (hy - y) * k * (0.7 + s * 0.6);
          const dx = x - mouse.x, dy = y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) + 0.001, f = 1 - d / R, push = f * f * (5 + mv * 0.25);
            ax += (dx / d) * push - (dy / d) * push * 0.6;
            ay += (dy / d) * push + (dx / d) * push * 0.6;
          }
          if (scattered) { ax += Math.sin(t * 2 + s * 50) * 0.06; ay += 0.05 + Math.cos(t * 1.7 + s * 30) * 0.04; }
          const vx = (vel[i2] + ax * dt) * damp, vy = (vel[i2 + 1] + ay * dt) * damp;
          vel[i2] = vx; vel[i2 + 1] = vy;
          pos[i3] = x + vx * dt; pos[i3 + 1] = y + vy * dt;
          speedA[i] = Math.abs(vx) + Math.abs(vy);
        }
      }
      if (geo) { geo.attributes.position.needsUpdate = true; geo.attributes.speed.needsUpdate = true; }
      mouse.vx *= 0.8; mouse.vy *= 0.8;
      renderer.render(scene, camera);
      if (visible && !reduce) raf = requestAnimationFrame(step);
    };
    const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(step); };

    // Reduced motion: no drifting, just show or hide the particles.
    fizzleRef.current = () => {
      if (!reduce) return;
      pMat.uniforms.uFade.value = scatterRef.current ? 0 : 1;
      renderer.render(scene, camera);
    };
    let ready = false; // nothing to morph until the font has loaded and the first build ran
    morphRef.current = (str: string) => { if (!ready) return; morph(str); if (reduce) start(); };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else cancelAnimationFrame(raf);
    });

    const resize = () => {
      const nw = host.clientWidth, nh = host.clientHeight;
      if (!nw || !nh || (nw === W && nh === H)) return;
      W = nw; H = nh;
      renderer.setSize(W, H, false);
      camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
      camera.updateProjectionMatrix();
      bgU.uRes.value.set(W, H);
      if (count && N) morph(textRef.current, false); else build();
      if (reduce) start();
    };
    let rt = 0;
    const ro = new ResizeObserver(() => { window.clearTimeout(rt); rt = window.setTimeout(resize, 150); });

    let cancelled = false;
    document.fonts.load(`600 120px ${serif}`).catch(() => undefined).then(() => {
      if (cancelled) return;
      ready = true;
      build();
      start();
      io.observe(host);
      ro.observe(host);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      geo?.dispose(); bg.geometry.dispose(); bgMat.dispose(); pMat.dispose();
      renderer.dispose();
    };
    // Mount once per layout; text changes go through morphRef below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, count]);

  useEffect(() => { morphRef.current(text); }, [text]);
  useEffect(() => { fizzleRef.current(); }, [scatter]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

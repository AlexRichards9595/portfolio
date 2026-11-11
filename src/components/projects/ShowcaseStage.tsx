"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createRenderer, fontFamily, prefersReducedMotion } from "@/components/motion/gl";
import type { ShowcaseItem } from "./showcase";

const TW = 1600, TH = 1100, PW = 4.36, PH = 3;

type Ctx = CanvasRenderingContext2D;
const rr = (ctx: Ctx, x: number, y: number, w: number, h: number, r: number) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const mkCanvas = () => { const c = document.createElement("canvas"); c.width = TW; c.height = TH; return c; };
const load = (src: string) => new Promise<HTMLImageElement | null>((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });

/** Browser window with the site screenshot inside. */
function webTex(item: ShowcaseItem, img: HTMLImageElement | null, mono: string) {
  const c = mkCanvas(), ctx = c.getContext("2d")!, t = item.theme;
  const x = 70, y = 80, w = TW - 140, h = TH - 160, bar = 56;
  ctx.save(); ctx.shadowColor = "rgba(0,0,0,.45)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 30;
  rr(ctx, x, y, w, h, 26); ctx.fillStyle = t.panel; ctx.fill(); ctx.restore();
  ctx.save(); rr(ctx, x, y, w, h, 26); ctx.clip();
  ctx.fillStyle = t.panel; ctx.fillRect(x, y, w, bar);
  ["#E5786D", "#E8B85C", "#7CC37A"].forEach((cc, i) => { ctx.beginPath(); ctx.arc(x + 36 + i * 28, y + bar / 2, 8, 0, 7); ctx.fillStyle = cc; ctx.fill(); });
  rr(ctx, x + w / 2 - 260, y + 12, 520, bar - 24, 16); ctx.fillStyle = "rgba(127,127,127,.18)"; ctx.fill();
  ctx.fillStyle = t.muted; ctx.font = `500 20px ${mono}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  if (item.visual.kind === "web") ctx.fillText(item.visual.url, x + w / 2, y + bar / 2 + 1);
  if (img) {
    const dw = w, dh = h - bar, s = Math.max(dw / img.width, dh / img.height);
    ctx.drawImage(img, 0, 0, Math.min(img.width, dw / s), Math.min(img.height, dh / s), x, y + bar, dw, dh);
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.lineWidth = 2; rr(ctx, x, y, w, h, 26); ctx.stroke();
  return c;
}

/** A fan of three phones with real app screens, center one in front. */
function phonesTex(imgs: (HTMLImageElement | null)[], icon: HTMLImageElement | null) {
  const c = mkCanvas(), ctx = c.getContext("2d")!;
  const ph = 860, ratio = imgs[0] ? imgs[0].width / imgs[0].height : 0.46, pw = Math.round((ph - 28) * ratio) + 28;
  const phone = (img: HTMLImageElement | null, cx: number, cy: number, rot: number, scale: number) => {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(scale, scale);
    ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 70; ctx.shadowOffsetY = 34;
    rr(ctx, -pw / 2, -ph / 2, pw, ph, 66); ctx.fillStyle = "#11161f"; ctx.fill(); ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 3; rr(ctx, -pw / 2, -ph / 2, pw, ph, 66); ctx.stroke();
    ctx.save(); rr(ctx, -pw / 2 + 14, -ph / 2 + 14, pw - 28, ph - 28, 54); ctx.clip();
    if (img) ctx.drawImage(img, -pw / 2 + 14, -ph / 2 + 14, pw - 28, ph - 28);
    ctx.restore(); ctx.restore();
  };
  phone(imgs[0], TW / 2 - 330, TH / 2 + 50, -0.11, 0.86);
  phone(imgs[2], TW / 2 + 330, TH / 2 + 50, 0.11, 0.86);
  phone(imgs[1], TW / 2, TH / 2 + 10, 0, 1);
  if (icon) { ctx.save(); ctx.shadowColor = "rgba(0,0,0,.4)"; ctx.shadowBlur = 30; rr(ctx, TW / 2 + 150, 40, 130, 130, 30); ctx.clip(); ctx.drawImage(icon, TW / 2 + 150, 40, 130, 130); ctx.restore(); }
  return c;
}

/** Notebook page sketch for ideas with nothing to show yet. */
function sketchTex(item: ShowcaseItem, serif: string, sans: string, mono: string) {
  const c = mkCanvas(), ctx = c.getContext("2d")!, t = item.theme;
  const x = 140, y = 110, w = TW - 280, h = TH - 220;
  const lines = item.visual.kind === "sketch" ? item.visual : { title: item.key, note: "", caption: "", nodes: [] as string[] };
  ctx.save(); ctx.translate(TW / 2, TH / 2); ctx.rotate(-0.025); ctx.translate(-TW / 2, -TH / 2);
  ctx.shadowColor = "rgba(40,30,20,.3)"; ctx.shadowBlur = 50; ctx.shadowOffsetY = 24;
  rr(ctx, x, y, w, h, 10); ctx.fillStyle = "#FBF7EC"; ctx.fill(); ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(94,136,190,.25)"; ctx.lineWidth = 2;
  for (let ly = y + 110; ly < y + h - 20; ly += 44) { ctx.beginPath(); ctx.moveTo(x + 20, ly); ctx.lineTo(x + w - 20, ly); ctx.stroke(); }
  ctx.strokeStyle = "rgba(192,82,46,.4)"; ctx.beginPath(); ctx.moveTo(x + 110, y); ctx.lineTo(x + 110, y + h); ctx.stroke();
  ctx.fillStyle = t.fg; ctx.font = `italic 400 110px ${serif}`; ctx.textBaseline = "alphabetic"; ctx.fillText(lines.title, x + 150, y + 170);
  ctx.font = `500 24px ${mono}`; ctx.fillStyle = t.acc; ctx.fillText(lines.note, x + 156, y + 225);
  const node = (nx: number, ny: number, r: number, label: string) => {
    ctx.beginPath(); ctx.arc(nx, ny, r, 0, 7); ctx.strokeStyle = t.fg; ctx.lineWidth = 4; ctx.stroke();
    ctx.font = `400 26px ${sans}`; ctx.fillStyle = t.muted; ctx.textAlign = "center"; ctx.fillText(label, nx, ny + r + 38); ctx.textAlign = "left";
  };
  const link = (ax: number, ay: number, bx: number, by: number) => {
    ctx.beginPath(); ctx.setLineDash([12, 10]); ctx.moveTo(ax, ay); ctx.quadraticCurveTo((ax + bx) / 2, Math.min(ay, by) - 60, bx, by);
    ctx.strokeStyle = t.acc; ctx.lineWidth = 4; ctx.stroke(); ctx.setLineDash([]);
  };
  const [a = "", b = "", d = ""] = lines.nodes;
  link(470, 640, 800, 600); link(800, 600, 1130, 640);
  node(470, 640, 60, a); node(800, 600, 80, b); node(1130, 640, 60, d);
  ctx.font = `400 30px ${serif}`; ctx.fillStyle = t.fg; ctx.fillText(lines.caption, x + 150, y + h - 70);
  ctx.restore();
  return c;
}

/** The tab's projects fanned out like a hand of cards. */
function idleTex(canvases: HTMLCanvasElement[]) {
  const c = mkCanvas(), ctx = c.getContext("2d")!, n = canvases.length;
  canvases.forEach((cv, i) => {
    const k = i - (n - 1) / 2;
    ctx.save(); ctx.translate(TW / 2 + k * 170, TH / 2 + Math.abs(k) * 40 + 30); ctx.rotate(k * 0.09);
    ctx.globalAlpha = 0.95; ctx.drawImage(cv, -TW * 0.32, -TH * 0.32, TW * 0.64, TH * 0.64);
    ctx.restore();
  });
  return c;
}

/**
 * Tilting WebGL "showcase" that dissolves between project visuals (screenshots,
 * phones, sketches). `selected` is a project key, or null for the tab's idle fan.
 */
export default function ShowcaseStage({
  items,
  tab,
  selected,
  defaultAccent,
}: {
  items: ShowcaseItem[];
  tab: "wild" | "works";
  selected: string | null;
  defaultAccent: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ show: (key: string, acc: string) => void; leave: () => void } | null>(null);
  const want = useRef<{ key: string; acc: string }>({ key: `idle:${tab}`, acc: defaultAccent });

  useEffect(() => {
    const canvas = canvasRef.current, host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reduce = prefersReducedMotion();
    const renderer = createRenderer(canvas, true);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const uniforms = {
      tA: { value: null as THREE.Texture | null }, tB: { value: null as THREE.Texture | null },
      p: { value: 1 }, uAcc: { value: new THREE.Color(defaultAccent) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tA, tB; uniform float p; uniform vec3 uAcc; varying vec2 vUv;
        float hash(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 q){ vec2 i = floor(q), f = fract(q); vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y); }
        float fbm(vec2 q){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(q); q *= 2.1; a *= 0.5; } return v; }
        void main(){
          float n = fbm(vUv * 3.5 + 2.0) * 0.8 + vUv.x * 0.2;
          float edge = p * 1.3 - 0.15;
          vec2 dir = vec2(n - 0.5, n * 0.4 - 0.2) * 0.22;
          vec4 a = texture2D(tA, vUv + dir * p);
          vec4 b = texture2D(tB, vUv - dir * (1.0 - p));
          vec4 col = mix(a, b, 1.0 - smoothstep(edge - 0.05, edge + 0.05, n));
          float rim = smoothstep(0.045, 0.0, abs(n - edge)) * step(0.001, p) * step(p, 0.999);
          col.rgb = mix(col.rgb, uAcc, rim * 0.9);
          col.a = max(col.a, rim * 0.85);
          gl_FragColor = col;
        }`,
    });
    const geo = new THREE.PlaneGeometry(PW, PH);
    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    const textures = new Map<string, THREE.Texture>();
    let shown: THREE.Texture | null = null, kick = 0;
    const show = (key: string, acc: string) => {
      const tex = textures.get(key);
      if (!tex || tex === shown) return;
      uniforms.tA.value = shown ?? tex;
      uniforms.tB.value = tex;
      uniforms.p.value = reduce ? 1 : 0;
      uniforms.uAcc.value.set(acc);
      shown = tex;
      kick = 1;
    };

    const size = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const t = Math.tan(THREE.MathUtils.degToRad(15)) * 2;
      camera.position.z = Math.max(PH / 0.9 / t, PW / (0.94 * t * camera.aspect));
    };
    const ro = new ResizeObserver(size);
    ro.observe(host);
    size();

    const mouse = { x: 0, y: 0 }, rot = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
    if (!reduce) window.addEventListener("pointermove", onMove);

    let raf = 0, last = performance.now(), visible = true;
    const frame = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05); last = Math.max(last, now);
      if (uniforms.p.value < 1) uniforms.p.value = Math.min(1, uniforms.p.value + dt / 0.85);
      rot.y += (mouse.x * 0.32 - rot.y) * 0.06; rot.x += (mouse.y * 0.2 - rot.x) * 0.06;
      kick *= 0.92;
      plane.rotation.set(rot.x, rot.y + kick * 0.18, -kick * 0.03);
      plane.position.y = reduce ? 0 : Math.sin(now / 1400) * 0.04;
      plane.scale.setScalar(1 - kick * 0.04);
      renderer.render(scene, camera);
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });

    let cancelled = false;
    (async () => {
      await document.fonts.ready;
      const mono = fontFamily("--font-mono", "monospace"), serif = fontFamily("--font-fraunces", "Georgia, serif"), sans = fontFamily("--font-inter", "sans-serif");
      const canvases = new Map<string, HTMLCanvasElement>();
      await Promise.all(items.map(async (it) => {
        const v = it.visual;
        let cv: HTMLCanvasElement;
        if (v.kind === "web") cv = webTex(it, await load(v.src), mono);
        else if (v.kind === "phones") cv = phonesTex(await Promise.all(v.srcs.map(load)), v.icon ? await load(v.icon) : null);
        else cv = sketchTex(it, serif, sans, mono);
        canvases.set(it.key, cv);
      }));
      if (cancelled) return;
      const toTex = (cv: HTMLCanvasElement) => {
        const t = new THREE.CanvasTexture(cv);
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return t;
      };
      canvases.forEach((cv, key) => textures.set(key, toTex(cv)));
      (["wild", "works"] as const).forEach((tb) =>
        textures.set(`idle:${tb}`, toTex(idleTex(items.filter((i) => i.tab === tb).map((i) => canvases.get(i.key)!)))),
      );
      api.current = { show, leave: () => undefined };
      show(want.current.key, want.current.acc);
      uniforms.p.value = 1;
      io.observe(host);
    })();

    return () => {
      cancelled = true;
      api.current = null;
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      textures.forEach((t) => t.dispose());
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
    // Textures are built once per item list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    const item = selected ? items.find((i) => i.key === selected) : null;
    want.current = item ? { key: item.key, acc: item.theme.acc } : { key: `idle:${tab}`, acc: defaultAccent };
    api.current?.show(want.current.key, want.current.acc);
  }, [selected, tab, items, defaultAccent]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

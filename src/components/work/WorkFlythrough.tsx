"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Company } from "@/ExperienceData";
import { createRenderer, PALETTE } from "@/components/motion/gl";
import Magnetic from "@/components/motion/Magnetic";

const U_MAX = 0.97;
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const hex = (h: string) => parseInt(h.slice(1), 16);

/**
 * Scroll-snapped camera flight along a 3D path, one gate per job (oldest first).
 * Each wheel gesture / swipe / arrow key moves exactly one stop:
 * intro → each job → outro.
 */
export default function WorkFlythrough({ jobs }: { jobs: Company[] }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const goRef = useRef<(i: number) => void>(() => undefined);
  const [active, setActive] = useState(-1); // job index currently framed, -1 = none
  const [shown, setShown] = useState(-1); // job index rendered in the panel (lags for the swap animation)
  const [panelIn, setPanelIn] = useState(false);
  const [phase, setPhase] = useState<"intro" | "jobs" | "outro">("intro");
  const [year, setYear] = useState(jobs[0]?.startYear ?? 2018);
  const [progress, setProgress] = useState(0);
  const N = jobs.length;
  const stationU = jobs.map((_, i) => 0.12 + i * (0.76 / Math.max(1, N - 1)));

  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return;
    const renderer = createRenderer(canvas);
    let W = host.clientWidth, H = host.clientHeight;
    renderer.setSize(W, H, false);
    renderer.setClearColor(hex(PALETTE.deep));
    const C = { deep: hex(PALETTE.deep), prim: hex(PALETTE.primary), light: hex(PALETTE.light), rose: hex(PALETTE.lightest), teal: hex(PALETTE.accent), cream: hex(PALETTE.cream) };
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(C.deep, 0.022);
    const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 400);
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);

    // Gradient dome
    const domeMat = track(new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { a: { value: new THREE.Color(C.deep) }, b: { value: new THREE.Color(C.prim) } },
      vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 a, b; varying vec3 vP; void main(){ gl_FragColor = vec4(mix(a, b, smoothstep(-0.4, 0.8, vP.y) * 0.8), 1.0); }`,
    }));
    scene.add(new THREE.Mesh(track(new THREE.SphereGeometry(300, 32, 16)), domeMat));

    // Flight path
    const ctrl: THREE.Vector3[] = [];
    for (let i = 0; i <= 9; i++) ctrl.push(new THREE.Vector3(Math.sin(i * 0.9) * 7, Math.cos(i * 0.7) * 3.2, -i * 22));
    const curve = new THREE.CatmullRomCurve3(ctrl, false, "catmullrom", 0.5);

    // Rail of glowing dots below the camera
    const railGeo = track(new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(1800).map((v) => v.clone().add(new THREE.Vector3(0, -1.2, 0)))));
    scene.add(new THREE.Points(railGeo, track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { c: { value: new THREE.Color(C.teal) }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `uniform float uPR; varying float vF; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = clamp(60.0 / -mv.z, 1.0, 5.0) * uPR; vF = exp(-0.02 * -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 c; varying float vF; void main(){ float d = length(gl_PointCoord - 0.5); gl_FragColor = vec4(c, smoothstep(0.5, 0.0, d) * vF); }`,
    }))));
    const sideA: THREE.Vector3[] = [], sideB: THREE.Vector3[] = [];
    for (let i = 0; i <= 600; i++) {
      const u = i / 600, p = curve.getPointAt(u), tng = curve.getTangentAt(u);
      const side = new THREE.Vector3().crossVectors(tng, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(1.6);
      sideA.push(p.clone().add(side).add(new THREE.Vector3(0, -1.2, 0)));
      sideB.push(p.clone().sub(side).add(new THREE.Vector3(0, -1.2, 0)));
    }
    const lineMat = track(new THREE.LineBasicMaterial({ color: C.rose, transparent: true, opacity: 0.35 }));
    scene.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(sideA)), lineMat));
    scene.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(sideB)), lineMat));

    // Dust
    const dust = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      const p = curve.getPointAt(Math.random());
      dust.set([p.x + (Math.random() - 0.5) * 60, p.y + (Math.random() - 0.5) * 40, p.z + (Math.random() - 0.5) * 30], i * 3);
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustPts = new THREE.Points(dustGeo, track(new THREE.PointsMaterial({ color: C.rose, size: 0.12, transparent: true, opacity: 0.55 })));
    scene.add(dustPts);

    // Gates
    const shapes = [
      () => new THREE.IcosahedronGeometry(1.6, 1), () => new THREE.OctahedronGeometry(1.8, 0), () => new THREE.TorusKnotGeometry(1.1, 0.32, 90, 10),
      () => new THREE.DodecahedronGeometry(1.6, 0), () => new THREE.IcosahedronGeometry(1.7, 0),
    ];
    const gates = stationU.map((u, i) => {
      const g = new THREE.Group();
      const p = curve.getPointAt(u), tng = curve.getTangentAt(u);
      g.position.copy(p);
      g.lookAt(p.clone().add(tng));
      const ringMat = track(new THREE.MeshBasicMaterial({ color: C.cream, transparent: true, opacity: 0.55 }));
      g.add(new THREE.Mesh(track(new THREE.TorusGeometry(3.4, 0.025, 8, 160)), ringMat));
      const seg = new THREE.Group();
      const segMat = track(new THREE.MeshBasicMaterial({ color: C.light, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
      for (let s = 0; s < 24; s++) seg.add(new THREE.Mesh(track(new THREE.RingGeometry(3.75, 3.95, 8, 1, (s / 24) * Math.PI * 2, ((Math.PI * 2) / 24) * 0.55)), segMat));
      g.add(seg);
      g.add(new THREE.Mesh(track(new THREE.RingGeometry(4.3, 4.32, 128)), track(new THREE.MeshBasicMaterial({ color: C.rose, transparent: true, opacity: 0.4, side: THREE.DoubleSide }))));
      const poly = new THREE.LineSegments(track(new THREE.EdgesGeometry(track(shapes[i % shapes.length]()))), track(new THREE.LineBasicMaterial({ color: i % 2 ? C.teal : C.rose, transparent: true, opacity: 0.8 })));
      poly.position.set(i % 2 ? -6.5 : 6.5, 1.6, 0);
      g.add(poly);
      scene.add(g);
      return { g, ringMat, seg, segMat, poly };
    });

    // ── Snap stepping ──
    const stops = [0, ...stationU.map((su) => su - 0.03), U_MAX];
    let stop = 0, cur = 0, from = 0, to = 0, t0 = 0, dur = 1;
    const flying = () => performance.now() - t0 < dur * 1000;
    const go = (i: number) => {
      i = Math.max(0, Math.min(stops.length - 1, i));
      if (i === stop && !flying()) return;
      from = cur; to = stops[i]; stop = i; t0 = performance.now();
      dur = 1.1 + Math.min(1.2, Math.abs(to - from) * 2.2);
    };
    goRef.current = (job) => go(job + 1);

    let acc: number | null = 0, lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now(), quiet = now - lastWheel > 220;
      lastWheel = now;
      if (flying() || (!quiet && acc === null)) return;
      if (acc === null) acc = 0;
      acc += e.deltaY;
      if (Math.abs(acc) > 40) { go(stop + Math.sign(acc)); acc = null; }
    };
    const quietTimer = window.setInterval(() => { if (acc === null && !flying() && performance.now() - lastWheel > 220) acc = 0; }, 60);
    let ty: number | null = null;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => { if (!(e.target as Element).closest("a,button")) e.preventDefault(); };
    const onTouchEnd = (e: TouchEvent) => {
      if (ty === null) return;
      const dy = ty - e.changedTouches[0].clientY; ty = null;
      if (Math.abs(dy) > 40 && !flying()) go(stop + Math.sign(dy));
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element).closest?.("input,textarea")) return;
      if (["ArrowDown", "PageDown", " ", "ArrowRight"].includes(e.key)) { e.preventDefault(); go(stop + 1); }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(stop - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(stops.length - 1);
    };
    host.addEventListener("wheel", onWheel, { passive: false });
    host.addEventListener("touchstart", onTouchStart, { passive: true });
    host.addEventListener("touchmove", onTouchMove, { passive: false });
    host.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("pointermove", onMove);

    // ── Loop ──
    let raf = 0, last = performance.now(), lastNear = -2, lastYear = 0, lastPhase = "", lastProg = -1;
    const look = new THREE.Vector3();
    const frame = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05); last = Math.max(last, now);
      const k = Math.min(1, (now - t0) / (dur * 1000));
      cur = from + (to - from) * ease(k);
      const u = Math.max(0.0001, cur);
      camera.position.copy(curve.getPointAt(u));
      camera.position.x += mouse.x * 1.2; camera.position.y += -mouse.y * 0.8 + 0.4;
      look.copy(curve.getPointAt(Math.min(u + 0.03, 1)));
      camera.lookAt(look);
      const tA = curve.getTangentAt(u), tB = curve.getTangentAt(Math.min(u + 0.02, 1));
      camera.rotateZ((tB.x - tA.x) * -6);

      let near = -1;
      stationU.forEach((su, i) => { if (u > su - 0.075 && u < su + 0.035) near = i; });
      if (near !== lastNear) { lastNear = near; setActive(near); }
      const y = near >= 0 ? jobs[near].startYear : u < stationU[0] ? jobs[0].startYear : u > stationU[N - 1] + 0.035 ? new Date().getFullYear() : 0;
      if (y && y !== lastYear) { lastYear = y; setYear(y); }
      const ph = u < 0.03 ? "intro" : u > 0.93 ? "outro" : "jobs";
      if (ph !== lastPhase) { lastPhase = ph; setPhase(ph); }
      const pr = Math.round((u / U_MAX) * 1000) / 1000;
      if (pr !== lastProg) { lastProg = pr; setProgress(pr); }

      gates.forEach((gt, i) => {
        const on = i === near;
        const d = camera.position.distanceTo(gt.g.position);
        gt.seg.rotation.z += dt * (on ? 0.6 : 0.12) * (i % 2 ? 1 : -1);
        gt.poly.rotation.x += dt * 0.3; gt.poly.rotation.y += dt * 0.45;
        gt.poly.position.y = 1.6 + Math.sin(now / 900 + i) * 0.4;
        const s = on ? 1 + Math.max(0, 1 - d / 12) * 0.15 : 1;
        gt.g.scale.setScalar(THREE.MathUtils.lerp(gt.g.scale.x, s, 0.1));
        gt.ringMat.opacity = THREE.MathUtils.lerp(gt.ringMat.opacity, on ? 0.95 : 0.35, 0.08);
        gt.segMat.color.setHex(on ? C.teal : C.light);
      });
      dustPts.rotation.z = Math.sin(now / 8000) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      W = host.clientWidth; H = host.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H, false);
      camera.aspect = W / H; camera.updateProjectionMatrix();
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(quietTimer);
      ro.disconnect();
      host.removeEventListener("wheel", onWheel);
      host.removeEventListener("touchstart", onTouchStart);
      host.removeEventListener("touchmove", onTouchMove);
      host.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
    // stationU is derived from jobs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs]);

  // Panel swap: fade out, change content, fade back in.
  useEffect(() => {
    setPanelIn(false);
    if (active < 0) return;
    const id = window.setTimeout(() => { setShown(active); setPanelIn(true); }, 250);
    return () => window.clearTimeout(id);
  }, [active]);

  const go = useCallback((i: number) => goRef.current(i), []);
  const job = shown >= 0 ? jobs[shown] : null;

  return (
    <div ref={hostRef} className="relative h-[100svh] min-h-[560px] touch-none select-none overflow-hidden bg-deep lg:h-screen">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className="absolute left-0 top-0 z-20 h-0.5 bg-accent shadow-[0_0_10px_#7FB7BE]" style={{ width: `${progress * 100}%` }} />

      {/* Intro — a soft dark scrim keeps the copy readable over the gates and rail */}
      <div className={`pointer-events-none absolute inset-0 z-10 grid place-items-center px-6 text-center transition-all duration-700 ${phase === "intro" ? "opacity-100" : "scale-95 opacity-0"}`}>
        <div className="relative">
          <div aria-hidden className="absolute -inset-x-16 -inset-y-14 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(46,28,28,0.92),rgba(46,28,28,0.6)_55%,transparent)] blur-md" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{`// experience · ${jobs[0]?.startYear} → now`}</p>
          <p aria-hidden className="mt-3 font-display text-5xl leading-none text-cream lg:text-7xl">Where I&rsquo;ve worked</p>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-cream/90 [text-shadow:0_1px_12px_rgba(46,28,28,0.9)]">
            From private jets to connected cars — fly through eight years of building things for real people.
          </p>
        </div>
      </div>
      <button
        onClick={() => go(0)}
        aria-label="Go to the first job"
        className={`absolute bottom-[calc(1.75rem+env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-lightest transition-opacity duration-500 ${phase === "intro" ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        SCROLL
        <span className="h-11 w-px origin-top bg-gradient-to-b from-accent to-transparent [animation:scroll-drip_2.2s_cubic-bezier(0.22,1,0.36,1)_infinite]" />
      </button>

      {/* Rolling year */}
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-20 right-4 z-[5] font-display text-[26vw] font-semibold leading-[0.8] tracking-tight text-transparent transition-opacity duration-500 [-webkit-text-stroke:1px_rgba(167,121,121,0.55)] lg:bottom-auto lg:right-[5%] lg:top-1/2 lg:-translate-y-1/2 lg:text-[15vw] ${phase === "intro" ? "opacity-0" : "opacity-100"}`}
      >
        {String(year).split("").map((d, i) => (
          <span key={i} className="inline-block h-[0.8em] overflow-hidden align-top">
            <span className="block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateY(${-Number(d) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k} className="block h-[0.8em]">{k}</span>
              ))}
            </span>
          </span>
        ))}
      </div>

      {/* Job panel */}
      <article
        className={`absolute bottom-24 left-4 right-4 z-10 rounded-[22px] border border-lightest/35 bg-gradient-to-br from-secondary/75 to-deep/80 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:bottom-auto lg:left-[5%] lg:right-auto lg:top-1/2 lg:w-[440px] lg:-translate-y-1/2 lg:p-7 ${panelIn && job ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        {job && (
          <>
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span className="tracking-[0.2em] text-accent">{String(shown + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
              <span className="text-lightest">{job.time.replace("-", " – ").replace("present", "Present")}</span>
            </div>
            <h2 className="mt-2 font-display text-3xl leading-tight text-cream lg:text-4xl">{job.name}</h2>
            <p className="mt-1 text-sm text-cream/70">{job.role}</p>
            <div className="mt-4 border-y border-lightest/25 py-4">
              <p className="font-display text-3xl leading-none text-accent lg:text-4xl">{job.stat.value}</p>
              <p className="mt-2 text-[13px] leading-snug text-cream/75">{job.stat.label}</p>
            </div>
            <ul className="mt-3 hidden space-y-2 sm:block">
              {job.highlights.map((b, i) => (
                <li
                  key={b}
                  className="relative pl-[18px] text-sm leading-relaxed text-cream/90 transition-all duration-500 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2 before:bg-accent"
                  style={{ transitionDelay: `${200 + i * 110}ms`, opacity: panelIn ? 1 : 0, transform: panelIn ? "none" : "translateX(-8px)" }}
                >
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.technologies.slice(0, 6).map((t) => (
                <span key={t} className="rounded-full border border-light/60 bg-deep/60 px-2.5 py-1 font-mono text-[11px] text-lightest">{t}</span>
              ))}
            </div>
          </>
        )}
      </article>

      {/* Rail */}
      <nav aria-label="Jump to a job" className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-[18px] lg:flex">
        <span className="absolute bottom-0 right-1 top-0 w-px bg-lightest/30" />
        {jobs.map((j, i) => (
          <button
            key={j.name}
            onClick={() => go(i)}
            className={`group relative flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${active === i ? "text-lightest" : "text-transparent hover:text-lightest"}`}
          >
            {j.name}
            <i className={`block h-[9px] w-[9px] rounded-full border transition-all ${active === i ? "border-accent bg-accent shadow-[0_0_12px_#7FB7BE]" : "border-lightest bg-deep"}`} />
          </button>
        ))}
      </nav>

      {/* Outro */}
      <div className={`absolute inset-0 z-10 grid place-items-center px-6 text-center transition-all duration-700 ${phase === "outro" ? "opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{"// next stop"}</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-cream lg:text-7xl">Your team?</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/70">I&rsquo;m open to senior front-end and full-stack roles. Let&rsquo;s build something good.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href="/Alexander_Richards_Resume.pdf" download="Alexander_Richards_Resume.pdf" className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-deep">
                Download résumé ↓
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="/projects" className="inline-flex rounded-full border border-cream/25 bg-white/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur">
                See projects →
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

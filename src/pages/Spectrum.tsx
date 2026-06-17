import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShowpieceOverlay from "../components/ShowpieceOverlay";

gsap.registerPlugin(useGSAP);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BLOBS = [
  { color: "#7c5cff", size: 520, top: "6%", left: "4%" },
  { color: "#ff5fb0", size: 440, top: "52%", left: "16%" },
  { color: "#46e0d0", size: 480, top: "24%", left: "58%" },
  { color: "#ffd27a", size: 360, top: "62%", left: "68%" },
  { color: "#4e85bf", size: 420, top: "2%", left: "44%" },
];

const PALETTE = ["#7c5cff", "#ff5fb0", "#46e0d0", "#ffd27a", "#9bd0ff"];

export default function Spectrum() {
  const root = useRef<HTMLDivElement>(null);
  const blobLayer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // GSAP: overlay reveal + drifting colour fields + slow hue rotation.
  useGSAP(
    () => {
      gsap.from(".sp-reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });

      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".blob").forEach((el, i) => {
        gsap.to(el, {
          x: "random(-200, 200)",
          y: "random(-150, 150)",
          scale: "random(0.85, 1.5)",
          duration: gsap.utils.random(8, 14),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      gsap.to(blobLayer.current, {
        filter: "hue-rotate(360deg)",
        duration: 32,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );

  // Canvas: interactive particle constellation that reacts to the cursor.
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    const count = window.innerWidth < 768 ? 45 : 92;
    const points: { x: number; y: number; vx: number; vy: number; c: string }[] =
      [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      points.length = 0;
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          c: PALETTE[i % PALETTE.length],
        });
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      if (pointer.active) {
        const g = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          190
        );
        g.addColorStop(0, "rgba(255,255,255,0.10)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of points) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const d = Math.sqrt(d2) || 1;
            const f = ((150 - d) / 150) * 0.06;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 124) {
            ctx.strokeStyle = `rgba(185,185,215,${(1 - d / 124) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    frame();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={root} className="relative h-[100dvh] w-full overflow-hidden bg-bg">
      {/* Drifting colour fields */}
      <div ref={blobLayer} className="pointer-events-none absolute inset-0 z-0">
        {BLOBS.map((b) => (
          <div
            key={b.color + b.left}
            className="blob absolute rounded-full opacity-45 blur-[100px] mix-blend-screen"
            style={{
              background: b.color,
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
            }}
          />
        ))}
      </div>

      {/* Interactive constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />

      {/* Grain + vignette */}
      <div className="grain pointer-events-none absolute inset-0 z-[2] opacity-[0.06] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-bg via-transparent to-bg/30" />

      <ShowpieceOverlay
        eyebrow="Featured project · Live"
        title="Spectrum"
        description="No video, no 3D — pure code. Colour fields drift on endless GSAP timelines beneath a living constellation that bends around your cursor."
        stack={["GSAP", "Canvas", "Generative", "React"]}
        hint="Move your cursor"
      />
    </div>
  );
}

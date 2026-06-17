import { Suspense, lazy, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AuroraScene = lazy(() => import("../components/three/AuroraScene"));

gsap.registerPlugin(useGSAP);

const STACK = ["React Three Fiber", "Three.js", "GLSL", "Postprocessing", "GSAP"];

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Aurora() {
  const { webgl, reduced, isMobile } = useMemo(
    () => ({
      webgl: hasWebGL(),
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    }),
    []
  );

  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".aurora-reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="relative h-[100dvh] w-full overflow-hidden bg-bg"
    >
      {/* 3D canvas (or fallback) */}
      <div className="absolute inset-0 z-0">
        {webgl ? (
          <Suspense fallback={<div className="h-full w-full bg-bg" />}>
            <AuroraScene reduced={reduced} isMobile={isMobile} />
          </Suspense>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="accent-gradient h-64 w-64 rounded-full opacity-60 blur-2xl" />
          </div>
        )}
      </div>

      {/* Vignette so text stays readable over the scene */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg via-transparent to-bg/40" />

      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 pt-24 md:p-10 md:pt-28">
        {/* Back link */}
        <Link
          to="/works"
          className="aurora-reveal pointer-events-auto self-start text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text-primary"
        >
          ← Works
        </Link>

        {/* Title block */}
        <div className="max-w-xl">
          <p className="aurora-reveal text-xs uppercase tracking-[0.3em] text-muted">
            Featured project · Live
          </p>
          <h1 className="aurora-reveal mt-3 font-display text-6xl italic leading-[0.9] text-text-primary md:text-8xl">
            Aurora
          </h1>
          <p className="aurora-reveal mt-5 max-w-md text-sm text-muted md:text-base">
            An interactive 3D study — a morphing, light-reflecting orb built
            with real-time shaders and bloom. Drag to orbit; it drifts on its
            own when you let go.
          </p>

          <div className="aurora-reveal mt-6 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="pointer-events-auto rounded-full border border-stroke bg-surface/40 px-3 py-1 text-xs text-text-primary backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="aurora-reveal mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group pointer-events-auto relative rounded-full transition-transform hover:scale-105"
            >
              <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative block rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary">
                View source ↗
              </span>
            </a>
            <span className="hidden items-center gap-2 text-xs text-muted sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Drag to explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

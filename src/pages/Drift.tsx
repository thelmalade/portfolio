import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShowpieceOverlay from "../components/ShowpieceOverlay";
import MediaControls from "../components/MediaControls";
import { useInspectGuard } from "../lib/useInspectGuard";

gsap.registerPlugin(useGSAP);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Drift() {
  const root = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useInspectGuard();

  useGSAP(
    (_context, contextSafe) => {
      gsap.fromTo(
        panelRef.current,
        { clipPath: "inset(48% 48% 48% 48% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          duration: 1.3,
          ease: "power4.inOut",
        }
      );

      gsap.from(".sp-reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.6,
      });

      if (reduced || !panelRef.current || !contextSafe) return;

      const rotX = gsap.quickTo(panelRef.current, "rotationX", {
        duration: 0.7,
        ease: "power3",
      });
      const rotY = gsap.quickTo(panelRef.current, "rotationY", {
        duration: 0.7,
        ease: "power3",
      });

      const onMove = contextSafe((e: PointerEvent) => {
        rotY((e.clientX / window.innerWidth - 0.5) * 16);
        rotX((e.clientY / window.innerHeight - 0.5) * -16);
      });

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      onContextMenu={(e) => e.preventDefault()}
      className="relative flex h-[100dvh] w-full select-none items-center justify-center overflow-hidden bg-bg"
      style={{ perspective: "1200px" }}
    >
      <div className="spectrum-bg pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]" />

      <div
        ref={panelRef}
        className="relative aspect-video w-[88vw] max-w-4xl overflow-hidden rounded-[28px] border border-stroke shadow-2xl shadow-black/40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <video
          ref={videoRef}
          src="/videos/drift.mp4"
          poster="/posters/drift.jpg"
          autoPlay
          muted
          loop
          playsInline
          draggable={false}
          disablePictureInPicture
          controlsList="nodownload noremoteplayback nofullscreen"
          className="pointer-events-none h-full w-full select-none object-cover"
        />
        <span className="halftone pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply" />
        {/* Shield over the framed video */}
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 z-[2]"
        />
      </div>

      <ShowpieceOverlay
        eyebrow="Featured project · Live"
        title="Drift"
        description="A framed motion piece — it opens through a clip-path mask, then tilts in 3D toward wherever you point."
        stack={["GSAP", "Clip-path", "3D tilt", "Motion"]}
        hint="Move your cursor"
      />

      <MediaControls videoRef={videoRef} fullscreenRef={root} />
    </div>
  );
}

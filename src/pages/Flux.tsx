import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShowpieceOverlay from "../components/ShowpieceOverlay";
import MediaControls from "../components/MediaControls";
import { useInspectGuard } from "../lib/useInspectGuard";

gsap.registerPlugin(useGSAP);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Flux() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useInspectGuard();

  useGSAP(
    (_context, contextSafe) => {
      gsap.from(".sp-reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });

      if (reduced || !videoRef.current || !contextSafe) return;

      gsap.set(videoRef.current, { scale: 1.12 });
      const xTo = gsap.quickTo(videoRef.current, "x", {
        duration: 0.8,
        ease: "power3",
      });
      const yTo = gsap.quickTo(videoRef.current, "y", {
        duration: 0.8,
        ease: "power3",
      });

      const onMove = contextSafe((e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * -40);
        yTo((e.clientY / window.innerHeight - 0.5) * -40);
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
      className="relative h-[100dvh] w-full select-none overflow-hidden bg-bg"
    >
      <video
        ref={videoRef}
        src="/videos/flux.mp4"
        poster="/posters/flux.jpg"
        autoPlay
        muted
        loop
        playsInline
        draggable={false}
        disablePictureInPicture
        controlsList="nodownload noremoteplayback nofullscreen"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />

      {/* Transparent shield so the video can't be directly right-clicked/saved */}
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 z-[2]"
      />

      <div className="pointer-events-none absolute inset-0 z-[3] bg-black/40" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-bg via-transparent to-bg/40" />

      <ShowpieceOverlay
        eyebrow="Featured project · Live"
        title="Flux"
        description="A cinematic title study — full-bleed motion layered with kinetic type. The frame drifts gently against your cursor for depth."
        stack={["GSAP", "Motion", "Parallax", "React"]}
        hint="Move your cursor"
      />

      <MediaControls videoRef={videoRef} fullscreenRef={root} />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "/explorations/bg-2026-04-18-4.jpg",
  "/explorations/bg-motion-50.jpg",
  "/explorations/bg_new2.jpg",
  "/explorations/motion-31.png",
  "/explorations/motion-30.png",
  "/explorations/bg_5.jpg",
];

const COL_A = IMAGES.filter((_, i) => i % 2 === 0);
const COL_B = IMAGES.filter((_, i) => i % 2 === 1);

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the centred heading without reserving extra space.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Scroll-driven parallax on the two columns (opposite directions).
      gsap.to(colARef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(colBRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Layer 1: pinned center */}
      <div
        ref={contentRef}
        className="pointer-events-none relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Explorations
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-4xl tracking-tight text-text-primary md:text-6xl lg:text-7xl">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">
          Experiments, side quests, and unfinished ideas worth keeping around.
        </p>
        <a
          href="#"
          className="group pointer-events-auto relative mt-8 rounded-full"
        >
          <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative block rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary">
            View on Dribbble ↗
          </span>
        </a>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="absolute inset-0 z-20 flex items-start justify-center px-6 pt-[40vh]">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 md:gap-40">
          <div ref={colARef} className="flex flex-col gap-12 md:gap-24">
            {COL_A.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                style={{ rotate: `${i % 2 === 0 ? -3 : 3}deg` }}
                className="ml-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03] hover:rotate-0"
              >
                <img
                  src={src}
                  alt="Exploration"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div ref={colBRef} className="flex flex-col gap-12 pt-[20vh] md:gap-24">
            {COL_B.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                style={{ rotate: `${i % 2 === 0 ? 3 : -3}deg` }}
                className="mr-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface transition-transform duration-500 hover:scale-[1.03] hover:rotate-0"
              >
                <img
                  src={src}
                  alt="Exploration"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
        >
          <img
            src={lightbox}
            alt="Exploration"
            className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}

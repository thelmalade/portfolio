import { useEffect, useRef } from "react";
import gsap from "gsap";
import HlsVideo from "./HlsVideo";
import { useContact } from "./ContactProvider";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const { open: openContact } = useContact();

  // Infinite marquee.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const phrase = "BUILDING THE FUTURE • ";

  return (
    <footer
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      {/* Background video, flipped */}
      <HlsVideo className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 -scale-y-100 object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden py-6">
          <div className="marquee-track flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 font-display text-5xl italic text-text-primary/90 md:text-7xl"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i}>{phrase}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 text-center md:py-24">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
            Let's work together
          </p>
          <button
            onClick={openContact}
            className="group relative rounded-full transition-transform hover:scale-105"
          >
            <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative block rounded-full bg-text-primary px-8 py-4 font-display text-2xl italic text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary md:text-3xl">
              afolatemi010@gmail.com
            </span>
          </button>
        </div>

        {/* Footer bar */}
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="text-sm text-muted">Available for projects</span>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          © {new Date().getFullYear()} Abdulazeez Afolabi
        </p>
      </div>
    </footer>
  );
}

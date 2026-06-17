import { Link } from "react-router-dom";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  stack: string[];
  hint?: string;
  sourceHref?: string;
};

/**
 * Shared chrome for the interactive showpiece pages: back link, title block,
 * stack chips and a source CTA. Elements carry `.sp-reveal` so each page's
 * GSAP timeline can stagger them in.
 */
export default function ShowpieceOverlay({
  eyebrow,
  title,
  description,
  stack,
  hint = "Live",
  sourceHref = "https://github.com/",
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 pt-24 md:p-10 md:pt-28">
      <Link
        to="/works"
        className="sp-reveal pointer-events-auto self-start text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text-primary"
      >
        ← Works
      </Link>

      <div className="max-w-xl">
        <p className="sp-reveal text-xs uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </p>
        <h1 className="sp-reveal mt-3 font-display text-6xl italic leading-[0.9] text-text-primary md:text-8xl">
          {title}
        </h1>
        <p className="sp-reveal mt-5 max-w-md text-sm text-muted md:text-base">
          {description}
        </p>

        <div className="sp-reveal mt-6 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="pointer-events-auto rounded-full border border-stroke bg-surface/40 px-3 py-1 text-xs text-text-primary backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="sp-reveal mt-8 flex flex-wrap items-center gap-4">
          <a
            href={sourceHref}
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
            {hint}
          </span>
        </div>
      </div>
    </div>
  );
}

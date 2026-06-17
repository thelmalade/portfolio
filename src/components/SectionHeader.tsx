import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Props = {
  eyebrow: string;
  headingPre: string;
  headingItalic: string;
  subtext: string;
  buttonLabel: string;
  /** Router path for the "view all" button. Falls back to an anchor when omitted. */
  to?: string;
};

export default function SectionHeader({
  eyebrow,
  headingPre,
  headingItalic,
  subtext,
  buttonLabel,
  to,
}: Props) {
  const buttonInner = (
    <>
      <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-bg px-5 py-2.5 text-sm text-text-primary">
        {buttonLabel}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </>
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {headingPre}{" "}
          <span className="font-display italic">{headingItalic}</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">
          {subtext}
        </p>
      </div>

      {to ? (
        <Link
          to={to}
          className="group relative hidden self-start rounded-full md:inline-flex"
        >
          {buttonInner}
        </Link>
      ) : (
        <a
          href="#work"
          className="group relative hidden self-start rounded-full md:inline-flex"
        >
          {buttonInner}
        </a>
      )}
    </motion.div>
  );
}

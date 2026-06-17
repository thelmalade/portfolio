import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { JOURNAL_POSTS } from "../data/journal";

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          headingPre="Recent"
          headingItalic="thoughts"
          subtext="Notes on design, engineering, and the space in between."
          buttonLabel="View all"
          to="/journal"
        />

        <div className="flex flex-col gap-4">
          {JOURNAL_POSTS.map((entry, i) => (
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.06,
              }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                to={`/journal/${entry.slug}`}
                className="group flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:rounded-full"
              >
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-xl italic text-text-primary md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {entry.readTime} · {entry.date}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mr-2 hidden text-muted transition-transform group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { JOURNAL_POSTS } from "../data/journal";

export default function JournalIndex() {
  return (
    <>
      <main className="min-h-screen bg-bg px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-14 md:mb-20"
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text-primary"
            >
              ← Back home
            </Link>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Journal
              </span>
            </div>
            <h1 className="text-5xl tracking-tight text-text-primary md:text-7xl">
              Recent <span className="font-display italic">thoughts</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm text-muted md:text-base">
              Notes on design, engineering, and the space in between — written
              between projects, mostly late at night.
            </p>
          </motion.header>

          {/* List */}
          <div className="flex flex-col">
            {JOURNAL_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: (i % 2) * 0.06,
                }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <Link
                  to={`/journal/${post.slug}`}
                  className="group flex flex-col gap-5 border-t border-stroke py-8 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl border border-stroke bg-surface sm:aspect-square sm:w-40">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {post.readTime} · {post.date}
                    </p>
                    <h2 className="mt-2 font-display text-2xl italic text-text-primary md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="hidden text-muted transition-transform group-hover:translate-x-1 sm:block"
                  >
                    →
                  </span>
                </Link>
              </motion.article>
            ))}
            <div className="border-t border-stroke" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

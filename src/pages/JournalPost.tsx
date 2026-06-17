import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { JOURNAL_POSTS, getPost } from "../data/journal";

export default function JournalPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
        <h1 className="font-display text-5xl italic text-text-primary">
          Not found
        </h1>
        <p className="mt-4 text-sm text-muted">
          That entry doesn't exist — it may have been moved or never written.
        </p>
        <Link
          to="/journal"
          className="mt-8 rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary transition-colors hover:bg-surface"
        >
          ← Back to journal
        </Link>
      </main>
    );
  }

  const index = JOURNAL_POSTS.findIndex((p) => p.slug === post.slug);
  const next = JOURNAL_POSTS[(index + 1) % JOURNAL_POSTS.length];

  return (
    <>
      <main className="min-h-screen bg-bg px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:px-16">
        <article className="mx-auto max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              to="/journal"
              className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text-primary"
            >
              ← Journal
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted">
              {post.readTime} · {post.date}
            </p>
            <h1 className="mt-3 font-display text-4xl italic leading-tight text-text-primary md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-base text-muted md:text-lg">
              {post.excerpt}
            </p>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-stroke bg-surface">
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
            </div>
          </motion.div>

          {/* Body */}
          <div className="mt-12 flex flex-col gap-6">
            {post.content.map((block, i) =>
              block.startsWith("## ") ? (
                <h2
                  key={i}
                  className="mt-4 font-display text-2xl italic text-text-primary md:text-3xl"
                >
                  {block.replace(/^##\s/, "")}
                </h2>
              ) : (
                <p
                  key={i}
                  className="text-base leading-relaxed text-text-primary/80 md:text-lg"
                >
                  {block}
                </p>
              )
            )}
          </div>

          {/* Signature */}
          <p className="mt-12 font-display text-xl italic text-muted">
            — Abdulazeez
          </p>

          {/* Next post */}
          <div className="mt-16 border-t border-stroke pt-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Read next
            </p>
            <Link
              to={`/journal/${next.slug}`}
              className="group mt-4 flex items-center gap-6 rounded-3xl border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface"
            >
              <img
                src={next.image}
                alt=""
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-xl italic text-text-primary md:text-2xl">
                  {next.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {next.readTime} · {next.date}
                </p>
              </div>
              <span
                aria-hidden
                className="mr-2 hidden text-muted transition-transform group-hover:translate-x-1 sm:block"
              >
                →
              </span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

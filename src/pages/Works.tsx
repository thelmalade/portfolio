import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProjectMedia from "../components/ProjectMedia";
import { PROJECTS } from "../data/projects";

export default function Works() {
  return (
    <>
      <main className="min-h-screen bg-bg px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
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
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Selected <span className="font-display italic">works</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm text-muted md:text-base">
              A closer look at projects spanning interactive 3D, motion, and
              brand sites — from concept to launch.
            </p>
          </motion.header>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: (i % 2) * 0.08,
                }}
                viewport={{ once: true, margin: "-80px" }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stroke bg-surface">
                  <ProjectMedia media={project.media} alt={project.title} />
                  <span className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
                  <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs text-text-primary backdrop-blur-md">
                    {project.year}
                  </span>
                  {project.badge && (
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs text-text-primary backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      {project.badge}
                    </span>
                  )}
                  {project.to && (
                    <Link
                      to={project.to}
                      aria-label={`Open ${project.title}`}
                      className="absolute inset-0"
                    />
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {project.category}
                  </p>
                  {project.to ? (
                    <Link to={project.to}>
                      <h2 className="mt-2 font-display text-3xl italic text-text-primary transition-colors hover:text-muted md:text-4xl">
                        {project.title}
                      </h2>
                    </Link>
                  ) : (
                    <h2 className="mt-2 font-display text-3xl italic text-text-primary md:text-4xl">
                      {project.title}
                    </h2>
                  )}
                  <p className="mt-3 max-w-md text-sm text-muted">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-stroke px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

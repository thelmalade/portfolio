import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import ProjectMedia from "./ProjectMedia";
import { PROJECTS } from "../data/projects";

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          headingPre="Featured"
          headingItalic="projects"
          subtext="A selection of projects I've worked on, from concept to launch."
          buttonLabel="View all work"
          to="/works"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
                delay: (i % 2) * 0.1,
              }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative aspect-[16/11] overflow-hidden rounded-3xl border border-stroke bg-surface ${project.span}`}
            >
              <ProjectMedia media={project.media} alt={project.title} />

              {/* Halftone overlay */}
              <span className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />

              {/* Live badge */}
              {project.badge && (
                <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs text-text-primary backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  {project.badge}
                </span>
              )}

              {/* Hover wash */}
              <span className="absolute inset-0 bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="accent-gradient-animated relative animate-gradient-shift rounded-full p-[2px]">
                  <span className="block rounded-full bg-white px-5 py-2.5 text-sm text-black">
                    {project.label ?? "View"} —{" "}
                    <span className="font-display italic">{project.title}</span>
                  </span>
                </span>
              </div>

              {/* Clickable overlay for linked projects */}
              {project.to && (
                <Link
                  to={project.to}
                  aria-label={`Open ${project.title}`}
                  className="absolute inset-0 z-20"
                />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

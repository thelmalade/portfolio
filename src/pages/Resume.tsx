import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useContact } from "../components/ContactProvider";

type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

const EXPERIENCE: Experience[] = [
  {
    role: "Front End Developer",
    company: "Freelance / Independent",
    period: "2024 — Present",
    points: [
      "Design and build responsive, accessible interfaces for startups and small studios.",
      "Ship motion-led landing pages using React, Tailwind, GSAP and Framer Motion.",
      "Collaborate directly with clients from concept through launch and iteration.",
    ],
  },
  {
    role: "Junior Front End Developer",
    company: "Studio / Agency",
    period: "2023 — 2024",
    points: [
      "Built and maintained component libraries with React and TypeScript.",
      "Translated Figma designs into pixel-accurate, performant UI.",
      "Contributed to 15+ client projects across web and marketing sites.",
    ],
  },
];

const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    group: "Motion & Design",
    items: ["GSAP", "Framer Motion", "Figma", "Responsive UI"],
  },
  {
    group: "Tooling",
    items: ["Git", "Vercel", "Storybook", "Accessibility"],
  },
];

const EDUCATION = [
  {
    title: "Self-directed & Project-based Learning",
    detail: "Front End Development",
    period: "2023 — Present",
  },
];

export default function Resume() {
  const { open: openContact } = useContact();

  return (
    <>
      <main className="min-h-screen bg-bg px-6 pb-24 pt-32 md:px-10 md:pt-40 lg:px-16">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 md:mb-20"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Resume
              </span>
            </div>
            <h1 className="text-5xl tracking-tight text-text-primary md:text-7xl">
              Abdulazeez <span className="font-display italic">Afolabi</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
              Creative Front End developer based in Cumbria — 2+ years building
              fast, accessible, motion-led interfaces for the web.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                download
                className="group relative rounded-full transition-transform hover:scale-105"
              >
                <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
                  Download CV
                </span>
              </a>
              <button
                onClick={openContact}
                className="group relative rounded-full transition-transform hover:scale-105"
              >
                <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-colors duration-300 group-hover:border-transparent">
                  Get in touch
                </span>
              </button>
            </div>
          </motion.header>

          {/* Experience */}
          <Section title="Experience">
            <div className="flex flex-col gap-10">
              {EXPERIENCE.map((exp) => (
                <div
                  key={exp.role + exp.company}
                  className="relative border-l border-stroke pl-6 md:pl-8"
                >
                  <span className="accent-gradient absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full" />
                  <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                    <h3 className="font-display text-2xl italic text-text-primary md:text-3xl">
                      {exp.role}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{exp.company}</p>
                  <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-muted">
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SKILLS.map((skill) => (
                <div
                  key={skill.group}
                  className="rounded-2xl border border-stroke bg-surface/40 p-6"
                >
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
                    {skill.group}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-stroke px-3 py-1 text-sm text-text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="flex flex-col gap-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.title}
                  className="flex flex-col justify-between gap-1 border-l border-stroke pl-6 md:flex-row md:items-baseline md:pl-8"
                >
                  <div>
                    <h3 className="font-display text-2xl italic text-text-primary">
                      {edu.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{edu.detail}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16 md:mb-20"
    >
      <h2 className="mb-8 text-2xl tracking-tight text-text-primary md:text-3xl">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

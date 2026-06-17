export type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "gradient" };

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  media: ProjectMedia;
  /** Route for the live project page, if it has one. */
  to?: string;
  /** Corner badge, e.g. "Live · 3D". */
  badge?: string;
  /** Hover verb on the home bento. Defaults to "View". */
  label?: string;
  /** Column span on the 12-col home bento grid. */
  span: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Aurora",
    category: "Interactive 3D",
    year: "2026",
    description:
      "A real-time 3D study — a morphing, light-reflecting orb with shaders, a colour-shifting environment and bloom.",
    tags: ["React Three Fiber", "Three.js", "GLSL", "GSAP"],
    media: { type: "image", src: "/explorations/motion-31.png" },
    to: "/works/aurora",
    badge: "Live · 3D",
    label: "Explore",
    span: "md:col-span-7",
  },
  {
    title: "Flux",
    category: "Motion / Film",
    year: "2026",
    description:
      "A cinematic title study — full-bleed motion with kinetic type and cursor parallax, plus sound and fullscreen controls.",
    tags: ["GSAP", "Motion", "Parallax"],
    media: { type: "video", src: "/videos/flux.mp4", poster: "/posters/flux.jpg" },
    to: "/works/flux",
    badge: "Live",
    label: "Watch",
    span: "md:col-span-5",
  },
  {
    title: "Drift",
    category: "Motion / Art Direction",
    year: "2026",
    description:
      "A framed motion piece that opens through a clip-path mask and tilts in 3D toward the cursor.",
    tags: ["GSAP", "Clip-path", "Motion"],
    media: { type: "video", src: "/videos/drift.mp4", poster: "/posters/drift.jpg" },
    to: "/works/drift",
    badge: "Live",
    label: "Watch",
    span: "md:col-span-5",
  },
  {
    title: "Spectrum",
    category: "Generative / Motion",
    year: "2026",
    description:
      "A purely generative piece — colour fields that drift on looping GSAP timelines and follow your cursor.",
    tags: ["GSAP", "Generative", "CSS"],
    media: { type: "gradient" },
    to: "/works/spectrum",
    badge: "Live",
    label: "Enter",
    span: "md:col-span-7",
  },
  {
    title: "Urban Architecture",
    category: "Studio Site",
    year: "2025",
    description:
      "Editorial portfolio for an architecture practice with a focus on typography and grid.",
    tags: ["Next.js", "Tailwind", "Framer"],
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1000&q=80",
    },
    span: "md:col-span-6",
  },
  {
    title: "Brand Identity",
    category: "Design System",
    year: "2024",
    description:
      "Component library and design tokens powering a fast-moving startup's marketing site.",
    tags: ["TypeScript", "Storybook", "Tailwind"],
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&q=80",
    },
    span: "md:col-span-6",
  },
];

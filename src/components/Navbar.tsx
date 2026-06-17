import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContact } from "./ContactProvider";

const LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/works" },
  { label: "Resume", to: "/resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { open: openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <button
          aria-label="Home"
          onClick={() => navigate("/")}
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          className="relative h-9 w-9 shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
        >
          <span
            className={`accent-gradient absolute inset-0 rounded-full ${
              logoHover ? "rotate-180" : "rotate-0"
            } transition-transform duration-500`}
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg">
            <span className="font-display text-[13px] italic text-text-primary">
              AA
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        <div className="flex items-center">
          {LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-stroke/50 text-text-primary"
                    : "text-muted hover:bg-stroke/50 hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Say hi */}
        <button onClick={openContact} className="group relative rounded-full">
          <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi
            <span aria-hidden className="text-[0.85em]">
              ↗
            </span>
          </span>
        </button>
      </div>
    </nav>
  );
}

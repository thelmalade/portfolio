import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

// Web3Forms access key. This is a public, client-side key by design (it is
// sent from the browser on submit), so it's safe to ship in the bundle.
// An env override is still supported for local/other setups.
const ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
  "0e16b5d7-c608-4285-8d8c-6c7df0c2ecc4";

const EMAIL = "afolatemi010@gmail.com";

type ContactCtx = { open: () => void };
const Ctx = createContext<ContactCtx>({ open: () => {} });
export const useContact = () => useContext(Ctx);

type Status = "idle" | "sending" | "ok" | "error";

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  // Esc to close + lock scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset state shortly after closing.
  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setStatus("idle"), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New message from your portfolio");
    data.append("from_name", "Portfolio Contact");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-stroke bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-muted/70 outline-none transition-colors focus:border-white/25";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Contact"
            className="relative z-10 w-full max-w-md rounded-3xl border border-stroke bg-surface p-7 shadow-2xl shadow-black/40 md:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted transition-colors hover:text-text-primary"
            >
              ✕
            </button>

            {status === "ok" ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full accent-gradient text-bg">
                  ✓
                </div>
                <h3 className="font-display text-3xl italic text-text-primary">
                  Message sent
                </h3>
                <p className="mt-3 text-sm text-muted">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full border border-stroke bg-bg px-6 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Get in touch
                </p>
                <h3 className="mt-2 font-display text-3xl italic text-text-primary md:text-4xl">
                  Let's talk
                </h3>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  {/* Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    className="hidden"
                    aria-hidden
                  />
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className={field}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    className={field}
                  />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message"
                    className={`${field} resize-none`}
                  />

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Something went wrong. You can email me directly at{" "}
                      <a
                        href={`mailto:${EMAIL}`}
                        className="underline hover:text-text-primary"
                      >
                        {EMAIL}
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-2 rounded-full transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative block rounded-full bg-text-primary px-6 py-3.5 text-sm text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
                      {status === "sending" ? "Sending…" : "Send message"}
                    </span>
                  </button>

                  <p className="mt-1 text-center text-xs text-muted">
                    or email{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      className="underline hover:text-text-primary"
                    >
                      {EMAIL}
                    </a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

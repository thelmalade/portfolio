import { useEffect } from "react";

/**
 * Deterrent against casual inspection while a showpiece page is mounted:
 * blocks the right-click menu and the usual devtools / view-source shortcuts.
 *
 * Note: this is deterrence only — it cannot truly prevent a determined user
 * from reading network requests. It just stops the page (and its video) from
 * being trivially right-click → inspect / save.
 */
export function useInspectGuard() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => e.preventDefault();

    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const mod = e.ctrlKey || e.metaKey;
      if (key === "F12") e.preventDefault();
      if (mod && e.shiftKey && (key === "I" || key === "J" || key === "C")) {
        e.preventDefault();
      }
      if (mod && key === "U") e.preventDefault();
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
}

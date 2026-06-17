import { useState } from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
  fullscreenRef: React.RefObject<HTMLElement>;
};

/** Sound + fullscreen controls for a background video showpiece. */
export default function MediaControls({ videoRef, fullscreenRef }: Props) {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  const toggleFullscreen = () => {
    const el = fullscreenRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const btn =
    "pointer-events-auto rounded-full border border-white/10 bg-bg/60 px-4 py-2 text-xs text-text-primary backdrop-blur-md transition-colors hover:bg-surface";

  return (
    <div className="pointer-events-none absolute bottom-6 right-6 z-40 flex gap-2 md:bottom-10 md:right-10">
      <button onClick={toggleMute} className={btn}>
        {muted ? "🔇 Sound" : "🔊 Sound"}
      </button>
      <button onClick={toggleFullscreen} className={btn}>
        ⤢ Fullscreen
      </button>
    </div>
  );
}

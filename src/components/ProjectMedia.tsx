import { useRef } from "react";
import type { ProjectMedia as Media } from "../data/projects";

const IMG_CLASS =
  "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105";

function HoverVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={ref}
      src={`${src}#t=0.5`}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      draggable={false}
      disablePictureInPicture
      controlsList="nodownload noremoteplayback nofullscreen"
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => ref.current?.pause()}
      className={`${IMG_CLASS} select-none`}
    />
  );
}

export default function ProjectMedia({
  media,
  alt,
}: {
  media: Media;
  alt: string;
}) {
  if (media.type === "video")
    return <HoverVideo src={media.src} poster={media.poster} />;

  if (media.type === "gradient") {
    return (
      <div className="spectrum-bg h-full w-full animate-gradient-shift transition-transform duration-700 group-hover:scale-105" />
    );
  }

  return <img src={media.src} alt={alt} loading="lazy" className={IMG_CLASS} />;
}

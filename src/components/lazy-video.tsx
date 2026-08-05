"use client";

import { useEffect, useRef } from "react";

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
}

// The project cards sit well below the fold, but an autoplaying <video src>
// starts downloading immediately and competes with the hero for bandwidth. The
// source is attached only once the card is near the viewport, and playback is
// paused again when it leaves so offscreen cards stop decoding frames.
export function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src;
          void el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      preload="none"
      loop
      muted
      playsInline
      className={className}
    />
  );
}

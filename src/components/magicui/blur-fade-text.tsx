import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
}

// Server component, same reasoning as BlurFade: the hero heading rendered here
// is the LCP candidate, so it must be paintable without JavaScript.
const BlurFadeText = ({
  text,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
}: BlurFadeTextProps) => {
  return (
    <div className="flex">
      <span
        className={cn("blur-fade inline-block", className)}
        style={
          {
            "--blur-fade-y": `${-yOffset}px`,
            "--blur-fade-blur": "8px",
            "--blur-fade-duration": `${duration}s`,
            "--blur-fade-delay": `${delay}s`,
          } as CSSProperties
        }
      >
        {text}
      </span>
    </div>
  );
};

export default BlurFadeText;

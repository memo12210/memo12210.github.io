import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}

// Server component: the animation is driven by the `.blur-fade` keyframes in
// globals.css, so nothing here ships to the client or waits on hydration.
const BlurFade = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) => {
  return (
    <div
      className={cn("blur-fade", className)}
      style={
        {
          "--blur-fade-y": `${-yOffset}px`,
          "--blur-fade-blur": blur,
          "--blur-fade-duration": `${duration}s`,
          "--blur-fade-delay": `${0.04 + delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default BlurFade;

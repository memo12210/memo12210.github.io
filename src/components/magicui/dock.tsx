"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;

// Icon sizes are written straight to the DOM from a pointer listener and smoothed
// by a CSS transition, rather than by a JS animation library driving a spring per
// icon per frame. The springs this replaced were overdamped (mass 0.1 / stiffness
// 150 / damping 12), so they never overshot and a plain ease-out reads the same.
const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let icons: { outer: HTMLElement; inner: HTMLElement; center: number }[] = [];
    let pointerX = Infinity;
    let frame = 0;

    // Centres are measured while the dock is at rest, so the magnification maths
    // has a stable frame of reference and never reads layout mid-animation —
    // which is what made the previous implementation reflow on every frame.
    const measure = () => {
      icons = Array.from(
        container.querySelectorAll<HTMLElement>("[data-dock-icon]")
      ).map((outer) => {
        const bounds = outer.getBoundingClientRect();
        return {
          outer,
          inner: outer.firstElementChild as HTMLElement,
          center: bounds.x + bounds.width / 2,
        };
      });
    };

    const apply = () => {
      frame = 0;
      for (const { outer, inner, center } of icons) {
        // Linear falloff clamped at `distance`, matching the previous transform.
        const proximity =
          pointerX === Infinity
            ? 0
            : Math.max(0, 1 - Math.abs(pointerX - center) / distance);

        const size = BASE_SIZE + (magnification - BASE_SIZE) * proximity;
        const iconSize =
          BASE_ICON_SIZE +
          (magnification * ICON_SIZE_RATIO - BASE_ICON_SIZE) * proximity;

        outer.style.width = outer.style.height = `${size}px`;
        inner.style.width = inner.style.height = `${iconSize}px`;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      schedule();
    };

    const onPointerLeave = () => {
      pointerX = Infinity;
      schedule();
    };

    measure();
    container.addEventListener("pointerenter", measure);
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("pointerenter", measure);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", measure);
    };
  }, [distance, magnification]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border",
        className
      )}
    >
      {children}
    </div>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  return (
    <div
      data-dock-icon
      style={{ width: BASE_SIZE, height: BASE_SIZE }}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full shrink-0 [transition:width_180ms_ease-out,height_180ms_ease-out]",
        className
      )}
    >
      <div
        style={{ width: BASE_ICON_SIZE, height: BASE_ICON_SIZE }}
        className="flex items-center justify-center [transition:width_180ms_ease-out,height_180ms_ease-out]"
      >
        {children}
      </div>
    </div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };

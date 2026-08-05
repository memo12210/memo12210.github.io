"use client"

import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

// Repainting every cell each frame is wasted work: at the default flicker chance
// only ~0.5% of cells change per frame. So the canvas is treated as persistent and
// only the cells that actually changed get cleared and refilled. Opacity is applied
// with globalAlpha instead of building an `rgba(...)` string per cell, which avoids
// thousands of string allocations and colour parses every frame.
export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let animationFrameId = 0
    let isInView = false
    let rows = 0
    let squares = new Float32Array(0)
    let cellSize = 0
    let drawSize = 0
    let lastWidth = -1
    let lastHeight = -1

    // Falls back to the inherited text colour, so the grid tracks the theme
    // without needing an off-DOM probe element to resolve `var(--foreground)`.
    const resolveColor = () =>
      color && !color.startsWith("var(") ? color : getComputedStyle(container).color

    const paintCell = (index: number) => {
      const x = Math.floor(index / rows) * cellSize
      const y = (index % rows) * cellSize
      ctx.clearRect(x, y, cellSize, cellSize)
      ctx.globalAlpha = squares[index]
      ctx.fillRect(x, y, drawSize, drawSize)
    }

    const paintAll = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < squares.length; i++) paintCell(i)
    }

    const setupCanvas = () => {
      const w = width || container.clientWidth
      const h = height || container.clientHeight
      if (w === lastWidth && h === lastHeight) return false
      lastWidth = w
      lastHeight = h

      // Capping DPR keeps the per-frame cost flat on 3x phones; at a 2px square
      // the difference is not visible.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      cellSize = (squareSize + gridGap) * dpr
      drawSize = squareSize * dpr
      const cols = Math.floor(w / (squareSize + gridGap))
      rows = Math.floor(h / (squareSize + gridGap))

      squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      // Resizing the backing store resets context state, so re-apply the colour.
      ctx.fillStyle = resolveColor()
      paintAll()
      return true
    }

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return
      const deltaTime = lastTime ? (time - lastTime) / 1000 : 0
      lastTime = time

      const chance = flickerChance * deltaTime
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < chance) {
          squares[i] = Math.random() * maxOpacity
          paintCell(i)
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    const start = () => {
      if (animationFrameId || reduceMotion) return
      lastTime = 0
      animationFrameId = requestAnimationFrame(animate)
    }

    const stop = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0
    }

    setupCanvas()

    const resizeObserver = new ResizeObserver(() => {
      if (!setupCanvas()) return
      stop()
      if (isInView) start()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
        if (isInView) start()
        else stop()
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(canvas)

    // The theme toggle swaps a class on <html>; re-resolve the colour and repaint.
    const themeObserver = new MutationObserver(() => {
      ctx.fillStyle = resolveColor()
      paintAll()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
    }
  }, [color, squareSize, gridGap, flickerChance, maxOpacity, width, height])

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  )
}

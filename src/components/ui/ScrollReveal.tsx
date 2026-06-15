"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "scale"
  once?: boolean
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const dirClass =
      direction === "left"
        ? "reveal-left"
        : direction === "right"
        ? "reveal-right"
        : direction === "scale"
        ? "reveal-scale"
        : ""

    el.classList.add("reveal")
    if (dirClass) el.classList.add(dirClass)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("revealed"), delay)
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove("revealed")
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, once, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

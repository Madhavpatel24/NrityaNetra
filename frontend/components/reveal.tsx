"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// Fades and lifts its content in once, the first time it scrolls into view.
// Content stays fully visible if JavaScript or IntersectionObserver is unavailable.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={armed ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        armed && "transition-[opacity,transform] duration-700 ease-out",
        armed && !shown && "translate-y-5 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Sticky row of anchor pills that highlights the chapter currently on screen.
export function SectionNav({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 160) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [sections])

  return (
    <nav aria-label="Page sections" className="sticky top-16 z-30 border-y border-border/70 bg-background/85 backdrop-blur">
      <ul className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2.5 md:justify-center">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                "block whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition",
                active === s.id ? "bg-muted text-accent" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

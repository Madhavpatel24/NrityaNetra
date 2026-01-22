
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/predict", label: "AI" },
  { href: "/explore", label: "Explore" },
]

export function Navbar() {
  // This hook is client-only — fine because this is a client component.
  const pathname = usePathname()

  // mounted guards any UI that might differ between SSR and client
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-sm text-foreground border-b border-border shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🕉️
            </span>
            <span className="font-serif text-lg font-bold tracking-tight">NrityaNetra</span>
          </Link>
        </div>

        {/* Primary links - rendered the same on server; interactive highlighting applied only after mount */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex items-center gap-4">
            {links.map((l) => {
              // compute active ONLY after mount to avoid SSR/client mismatch
              const base = l.href.split("?")[0]
              const active = mounted ? (base === "/" ? pathname === "/" : pathname?.startsWith(base)) : false

              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-full transition-all",
                      active
                        ? "bg-primary/10 text-primary ring-1 ring-primary/10 shadow-sm"
                        : "text-foreground hover:text-primary hover:bg-foreground/5"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Mobile + CTA */}
        <div className="flex items-center gap-3">
          {/* small CTA for desktop */}
          <Link
            href="/learn"
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95 transition"
          >
            Explore Mudras
          </Link>

          {/* hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center md:hidden p-2 rounded-md hover:bg-foreground/5 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel - it's fine to conditionally show this, it's hidden on server but only becomes visible after interaction */}
      <div
        className={cn(
          "md:hidden transition-[max-height,opacity] duration-200 ease-out overflow-hidden border-t border-border bg-background/95",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-3">
          <ul className="flex flex-col gap-2">
            {links.map((l) => {
              const base = l.href.split("?")[0]
              // again compute active only after mount
              const active = mounted ? (base === "/" ? pathname === "/" : pathname?.startsWith(base)) : false
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition",
                      active ? "bg-primary/10 text-primary" : "hover:bg-foreground/5"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-3">
            <Link
              href="/predict"
              className="block text-center w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold"
              onClick={() => setOpen(false)}
            >
              Try Mudra AI
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

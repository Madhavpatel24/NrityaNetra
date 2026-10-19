"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/predict", label: "AI studio" },
  { href: "/explore", label: "Explore" },
  { href: "/learn", label: "Learn" },
]

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="NrityaNetra home">
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/30 transition group-hover:ring-primary/60">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground font-deva text-[15px] leading-none pb-0.5">
          ॐ
        </span>
      </span>
      <span className="font-serif text-xl tracking-tight text-foreground">
        Nritya<span className="text-accent">Netra</span>
      </span>
    </Link>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full text-accent transition hover:bg-primary/15"
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  )
}

export function Navbar() {
  const pathname = usePathname()
  // active-link highlighting is applied after mount so server and client markup match
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    mounted ? (href === "/" ? pathname === "/" : pathname?.startsWith(href)) : false

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive(l.href)
                    ? "bg-muted font-medium text-accent"
                    : "text-foreground/75 hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/about"
            className="hidden rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium transition hover:border-accent/50 hover:text-accent md:inline-flex"
          >
            About
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted/70 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background/95 transition-[max-height,opacity] duration-200 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {[...links, { href: "/about", label: "About" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm transition",
                  isActive(l.href) ? "bg-muted font-medium text-accent" : "hover:bg-muted/60"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

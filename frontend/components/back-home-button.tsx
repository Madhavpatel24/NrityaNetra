"use client"

import Link from "next/link"

export function BackHomeButton({ label = "Back to Home" }: { label?: string }) {
  return (
    <Link
      href="/"
      aria-label="Go back to homepage"
      className="inline-flex items-center gap-2 rounded-full bg-primary text-foreground px-4 py-2 text-sm shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <span aria-hidden>{"←"}</span>
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export default BackHomeButton

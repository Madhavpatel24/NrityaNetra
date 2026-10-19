"use client"

import { useMemo, useState } from "react"
import { Search, Hand } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { MUDRAS, TIERS, type GuideMudra, type Tier } from "@/lib/mudra/guide"
import { TierBadge } from "@/components/mudra/tier-badge"

type Filter = "all" | Tier
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "reliable", label: "Reliable" },
  { value: "good", label: "Good" },
  { value: "experimental", label: "Experimental" },
]

function Photo({ mudra, className }: { mudra: GuideMudra; className?: string }) {
  if (mudra.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mudra.image} alt={`The ${mudra.name} mudra (${mudra.gloss})`} className={cn("h-full w-full object-cover", className)} />
    )
  }
  return (
    <div className={cn("grid h-full w-full place-items-center bg-muted text-muted-foreground", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Hand className="h-8 w-8 opacity-50" aria-hidden />
        <span className="text-xs">Photo coming soon</span>
      </div>
    </div>
  )
}

export function MudraGuide({ onTry }: { onTry?: () => void }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [selected, setSelected] = useState<GuideMudra | null>(null)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MUDRAS.filter(
      (m) =>
        (filter === "all" || m.tier === filter) &&
        (!q || m.name.toLowerCase().includes(q) || m.gloss.toLowerCase().includes(q))
    )
  }, [query, filter])

  return (
    <section id="guide" aria-labelledby="guide-title" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">A visual vocabulary</p>
          <h2 id="guide-title" className="font-serif text-4xl text-foreground md:text-5xl">
            Mudra guide
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Only single-hand mudras are supported for now. Tap a card to see its meaning and how reliably the AI
            recognises it.
          </p>
        </div>

        <label className="relative block w-full md:w-80">
          <span className="sr-only">Search mudras</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mudras"
            className="w-full rounded-full border border-border bg-muted/60 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by reliability">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              filter === f.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background/60 text-foreground/80 hover:border-accent/50 hover:text-accent"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No mudra matches &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {shown.map((m) => (
            <li key={m.name}>
              <button
                type="button"
                onClick={() => setSelected(m)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgba(74,44,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#0a0807]">
                  <Photo mudra={m} className="transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4 md:p-5">
                  <h3 className="font-serif text-xl text-foreground">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.gloss}</p>
                  <div className="mt-3">
                    <TierBadge tier={m.tier} />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-3xl border-border bg-card p-0">
          {selected && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/5] w-full bg-[#0a0807] md:aspect-auto md:min-h-[420px]">
                <Photo mudra={selected} />
              </div>
              <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
                <div>
                  <p className="eyebrow mb-2">Single-hand mudra</p>
                  <DialogTitle className="font-serif text-4xl font-normal text-foreground">{selected.name}</DialogTitle>
                  <DialogDescription className="mt-2 text-base text-muted-foreground">
                    {selected.gloss}
                  </DialogDescription>
                </div>

                <div className="space-y-3 rounded-2xl border border-border bg-background/60 p-4">
                  <TierBadge tier={selected.tier} />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selected.accuracy !== null
                      ? `On independent test photos the AI named this mudra correctly about ${selected.accuracy}% of the time. `
                      : "This mudra is supported but has not been measured on independent photos yet. "}
                    {TIERS[selected.tier].summary}
                  </p>
                </div>

                {onTry && (
                  <Button
                    onClick={() => {
                      setSelected(null)
                      onTry()
                    }}
                    className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Try this mudra
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

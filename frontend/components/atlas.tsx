"use client"

import { memo, useCallback, useRef, useState } from "react"
import Link from "next/link"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { ArrowUpRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DANCE_ROUTES,
  getDanceForState,
  getDanceImage,
  normalizeName,
} from "@/components/india-dance-map"

const GEOJSON = "/data/states_india.geojson"

type Focus = { state: string; dance: string }

// The eight-ish recognised classical traditions that appear in the map data.
const CLASSICAL = new Set([
  "Bharatanatyam",
  "Kathak",
  "Kuchipudi",
  "Odissi",
  "Manipuri",
  "Sattriya",
])

const CLASSICAL_CHIPS: Focus[] = [
  { dance: "Bharatanatyam", state: "Tamil Nadu" },
  { dance: "Kathak", state: "Delhi" },
  { dance: "Kuchipudi", state: "Andhra Pradesh" },
  { dance: "Odissi", state: "Odisha" },
  { dance: "Manipuri", state: "Manipur" },
  { dance: "Sattriya", state: "Assam" },
]

function stateNameOf(geo: { properties?: Record<string, string> }) {
  const p = geo.properties || {}
  return normalizeName(p.NAME_1 || p.NAME_0 || p.st_nm || p.NAME || p.name || "")
}

type ShapesProps = {
  activeDance: string | null
  onEnter: (f: Focus) => void
  onLeave: () => void
  onPick: (f: Focus) => void
}

// Kept separate and memoised so moving the pointer doesn't redraw every state.
const Shapes = memo(function Shapes({ activeDance, onEnter, onLeave, onPick }: ShapesProps) {
  return (
    <Geographies geography={GEOJSON}>
      {({ geographies }: { geographies: any[] }) =>
        geographies.map((geo: any) => {
          const state = stateNameOf(geo)
          const dance = getDanceForState(state)
          const classical = CLASSICAL.has(dance)
          const active = activeDance !== null && dance === activeDance
          const focus: Focus = { state, dance: dance || "" }

          const resting = {
            fill: active ? "var(--atlas-hover)" : classical ? "var(--atlas-classical)" : "var(--atlas-land)",
            stroke: active ? "var(--atlas-stroke-strong)" : "var(--atlas-stroke)",
            strokeWidth: active ? 1.1 : 0.6,
            outline: "none",
            transition: "fill 180ms ease, stroke 180ms ease",
          }
          const hover = { ...resting, fill: "var(--atlas-hover)", stroke: "var(--atlas-stroke-strong)", strokeWidth: 1.1, cursor: "pointer" }

          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              tabIndex={0}
              role="button"
              aria-label={dance ? `${state}: ${dance}` : state}
              onMouseEnter={() => onEnter(focus)}
              onMouseLeave={onLeave}
              onFocus={() => onEnter(focus)}
              onBlur={onLeave}
              onClick={() => onPick(focus)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onPick(focus)
                }
              }}
              style={{ default: resting, hover, pressed: hover }}
            />
          )
        })
      }
    </Geographies>
  )
})

function Panel({ focus, onPick }: { focus: Focus | null; onPick: (f: Focus) => void }) {
  if (!focus || !focus.state) {
    return (
      <div className="rounded-3xl border border-border bg-card/70 p-7 md:p-8">
        <p className="eyebrow mb-3 flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" aria-hidden /> Start anywhere
        </p>
        <p className="font-serif text-2xl leading-snug text-foreground">
          Hover over a state, or tap one, to meet the dance that belongs to it.
        </p>
        <p className="mt-5 text-sm text-muted-foreground">Or begin with a classical tradition:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CLASSICAL_CHIPS.map((c) => (
            <button
              key={c.dance}
              type="button"
              onClick={() => onPick(c)}
              className="rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-sm text-foreground/85 transition hover:border-accent/60 hover:text-accent"
            >
              {c.dance}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const { state, dance } = focus
  const hasDance = dance !== ""
  const route = hasDance ? DANCE_ROUTES[dance] : undefined
  const classical = CLASSICAL.has(dance)
  const href = route ?? `/explore?state=${encodeURIComponent(state)}`

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/70" key={`${state}-${dance}`}>
      {hasDance && (
        <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getDanceImage(dance)}
            alt={`${dance}`}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = "/images/dances/placeholder.jpg"
            }}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="space-y-3 p-6 md:p-7">
        <p className="eyebrow flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" aria-hidden /> {state}
        </p>
        <h3 className="font-serif text-3xl text-foreground md:text-4xl">{hasDance ? dance : "Dances of this region"}</h3>
        {hasDance && (
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-medium",
              classical ? "bg-primary/25 text-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {classical ? "Classical tradition" : "Regional tradition"}
          </span>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {classical
            ? `${dance} is one of India's classical dance traditions, closely tied to ${state}.`
            : hasDance
              ? `${dance} is a regional dance tradition of ${state}.`
              : `Browse the dance traditions we have gathered for ${state}.`}
        </p>
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {route ? `Read about ${dance}` : "Explore this region"}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}

export default function Atlas() {
  const [hover, setHover] = useState<Focus | null>(null)
  const [pinned, setPinned] = useState<Focus | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const onEnter = useCallback((f: Focus) => setHover(f), [])
  const onLeave = useCallback(() => setHover(null), [])
  const onPick = useCallback((f: Focus) => setPinned(f), [])

  // The name tag follows the pointer by moving the element directly, so the
  // map is not redrawn on every mouse move.
  const onMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current
    const tag = labelRef.current
    if (!wrap || !tag) return
    const r = wrap.getBoundingClientRect()
    tag.style.transform = `translate(${e.clientX - r.left + 14}px, ${e.clientY - r.top + 14}px)`
  }

  const active = hover ?? pinned
  const activeDance = active && active.dance ? active.dance : null

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="order-2 space-y-6 lg:order-1 lg:col-span-5 lg:sticky lg:top-28">
        <Panel focus={active} onPick={onPick} />
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-[var(--atlas-stroke)] bg-[var(--atlas-classical)]" aria-hidden />
            Classical tradition
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-[var(--atlas-stroke)] bg-[var(--atlas-land)]" aria-hidden />
            Regional tradition
          </li>
          <li>Tap a state to pin it</li>
        </ul>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <div ref={wrapRef} onMouseMove={onMove} className="relative ml-auto max-w-[640px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1000, center: [85, 20.7] }}
            width={700}
            height={680}
            style={{ width: "100%", height: "auto" }}
            aria-label="Map of India with its dance traditions"
          >
            <Shapes activeDance={activeDance} onEnter={onEnter} onLeave={onLeave} onPick={onPick} />
          </ComposableMap>

          <div
            ref={labelRef}
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-10 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-opacity duration-150",
              hover && hover.state ? "opacity-100" : "opacity-0"
            )}
          >
            {hover?.state}
            {hover?.dance ? <span className="text-muted-foreground"> · {hover.dance}</span> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

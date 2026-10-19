"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { SectionNav } from "@/components/section-nav"
import { cn } from "@/lib/utils"
import { DANCES, type Dance } from "@/lib/dances/data"

const SECTIONS = [
  { id: "origins", title: "Origins" },
  { id: "philosophy", title: "Philosophy" },
  { id: "technique", title: "Technique" },
  { id: "importance", title: "Importance" },
]

// Some photographs referenced by the content are not in the project yet.
// Fall back to the dance's cover image, then to a quiet tinted block.
function Photo({ src, alt, slug, className }: { src: string; alt: string; slug: string; className?: string }) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  const fallback = `/images/dances/${slug}.jpg`

  const fail = () => {
    if (current !== fallback) setCurrent(fallback)
    else setFailed(true)
  }

  // An image can fail before React attaches onError, so check once mounted.
  useEffect(() => {
    const el = ref.current
    if (el && el.complete && el.naturalWidth === 0) fail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  if (failed) return <div className={cn("bg-muted", className)} aria-hidden />
  // vary the crop so a reused cover photo does not look identical every time
  const pos = current === fallback && src !== fallback ? ["30% 20%", "70% 40%", "50% 80%", "20% 60%"][src.length % 4] : undefined
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={current}
      alt={alt}
      className={cn("object-cover", className)}
      style={pos ? { objectPosition: pos } : undefined}
      onError={fail}
    />
  )
}

function Chapter({ n, id, title, children }: { n: string; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-32 px-4 py-20 md:px-6 md:py-28">
      <Reveal className="mb-12 flex items-baseline gap-5">
        <span className="font-serif text-5xl text-border md:text-6xl">{n}</span>
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  )
}

export function DancePage({ dance }: { dance: Dance }) {
  const others = Object.values(DANCES).filter((d) => d.slug !== dance.slug)
  const idx = Object.keys(DANCES).indexOf(dance.slug)
  const keys = Object.keys(DANCES)
  const next = DANCES[keys[(idx + 1) % keys.length]]
  const { philosophy: ph } = dance

  return (
    <div className="paper-grain min-h-screen bg-background overflow-x-clip">
      <Navbar />

      {/* Hero */}
      <header className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 md:px-6 md:pb-24 md:pt-40 lg:grid-cols-12 lg:px-8">
        <div className="rise-in lg:col-span-7">
          <Link
            href="/history"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to history
          </Link>
          <p className="eyebrow mb-4">
            {dance.kind} dance · {dance.state}
          </p>
          <h1 className="font-serif text-6xl leading-none text-foreground md:text-7xl lg:text-8xl">{dance.name}</h1>
          <p className="mt-5 font-serif text-2xl italic text-accent">{dance.tagline}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{dance.intro}</p>

          <figure className="mt-10 max-w-xl border-l-2 border-accent/60 pl-6">
            <blockquote lang={undefined} className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
              {dance.native.text}
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {dance.native.gloss} <span className="text-border">·</span> in {dance.native.lang}
            </figcaption>
          </figure>
        </div>

        <div className="rise-in mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" style={{ animationDelay: "120ms" }}>
          <div className="arch-mask mx-auto aspect-[4/5] w-full max-w-md border border-border bg-muted shadow-[0_30px_60px_-35px_rgba(74,44,0,0.55)]">
            <Photo src={dance.hero} alt={`${dance.name} performance`} slug={dance.slug} className="h-full w-full" />
          </div>
        </div>
      </header>

      <SectionNav sections={SECTIONS} />

      {/* 01 Origins */}
      <Chapter n="01" id="origins" title="Origins & history">
        <div className="space-y-20 md:space-y-28">
          {dance.history.map((b, i) => (
            <Reveal key={b.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className={cn("overflow-hidden rounded-3xl border border-border bg-muted", i % 2 === 1 && "md:order-2")}>
                <Photo src={b.image} alt={b.title} slug={dance.slug} className="aspect-[4/3] w-full" />
              </div>
              <div>
                <h3 className="font-serif text-3xl text-foreground">{b.title}</h3>
                <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                  {b.paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Chapter>

      {/* 02 Philosophy */}
      <div className="border-y border-border/70 bg-card/40">
        <Chapter n="02" id="philosophy" title="Philosophy & meaning">
          <Reveal>
            <h3 className="max-w-3xl font-serif text-3xl leading-snug text-foreground md:text-4xl">{ph.main.title}</h3>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{ph.main.body}</p>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="eyebrow mb-5">{ph.coreTitle}</p>
              <ul className="divide-y divide-border border-y border-border">
                {ph.core.map(([label, text]) => (
                  <li key={label} className="py-4">
                    <span className="font-serif text-lg text-foreground">{label.replace(/:$/, "")}</span>
                    <span className="block text-sm text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow mb-5">{ph.third.title}</p>
              <p className="font-serif text-xl leading-relaxed text-foreground/90">{ph.third.body}</p>
            </Reveal>
          </div>
        </Chapter>
      </div>

      {/* 03 Technique */}
      <Chapter n="03" id="technique" title="Technique & movement">
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">{dance.techIntro}</p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {dance.techniques.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={(i % 2) * 90} className="group h-full overflow-hidden rounded-3xl border border-border bg-card">
                <div className="overflow-hidden bg-muted">
                  <Photo
                    src={t.image}
                    alt={t.name}
                    slug={dance.slug}
                    className="aspect-[16/11] w-full transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-2xl text-foreground">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {t.examples.map((e) => (
                      <li key={e} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground/80">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-14 rounded-3xl border border-accent/30 bg-primary/10 p-8 md:p-10">
          <h3 className="font-serif text-2xl text-foreground">{dance.techNote.title}</h3>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{dance.techNote.body}</p>
        </Reveal>
      </Chapter>

      {/* 04 Importance */}
      <div className="border-t border-border/70">
        <Chapter n="04" id="importance" title="Why it matters">
          <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            {dance.importance.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={(i % 2) * 90}>
                  <p className="eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Chapter>
      </div>

      {/* Closing */}
      <section className="border-t border-border/70 bg-card/40 py-24 text-center md:py-28">
        <Reveal className="mx-auto max-w-3xl px-4">
          <p className="font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl">{dance.closing}</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <Link href="/history" className="text-muted-foreground underline underline-offset-8 decoration-border transition hover:text-accent hover:decoration-accent">
              Back to history
            </Link>
            <Link
              href={`/dancesofIndia/${next.slug}`}
              className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
            >
              Next: {next.name} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <p className="mt-10 text-xs text-muted-foreground">
            {others.length} other dance forms on NrityaNetra. See them on the{" "}
            <Link href="/#atlas" className="underline underline-offset-4 hover:text-accent">
              map
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </div>
  )
}

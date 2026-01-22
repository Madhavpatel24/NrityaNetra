
"use client"

import React, { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { ArrowRight } from "lucide-react"

// dynamic import of map (client only)
const IndiaDanceMap = dynamic(() => import("@/components/india-dance-map"), { ssr: false })

// small decorative temple divider (to echo your history page vibe)
function TempleDivider() {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
      <span className="mx-3 text-amber-800 text-xl">🛕</span>
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
    </div>
  )
}

export default function HomeClient() {
  const [hover, setHover] = useState<{ state?: string; dance?: string } | null>(null)

  const handleMapHover = useCallback((stateName: string, dance: string) => {
    setHover({ state: stateName, dance })
  }, [])

  const handleMapLeave = useCallback(() => {
    setHover(null)
  }, [])

  return (
    <>
      <Navbar />

      {/* HERO SECTION WITH VIDEO */}
<section
  aria-label="Welcome"
  className="relative min-h-[70vh] md:min-h-[90vh] overflow-hidden bg-black"
>
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    style={{ filter: "brightness(0.5) saturate(0.85)" }}
  >
    <source src="/videos/natarajpose2.mp4" type="video/mp4" />
  </video>

  {/* Overlay */}
  <div
    aria-hidden
    className="absolute inset-0"
    style={{
      background: "color-mix(in oklab, var(--color-foreground), transparent 75%)",
    }}
  />

  {/* HERO TEXT */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 min-h-[70vh] md:min-h-[80vh]">
    <div className="max-w-3xl mx-auto">
      <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/80 mb-2">
        NrityaNetra
      </p>

      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground drop-shadow-xl mb-4">
        Discover the Mudras of India
      </h1>

      <p className="text-lg md:text-xl text-primary-foreground/95 leading-relaxed drop-shadow">
        Learn classical Indian dance forms, decode mudras with AI, and explore the rich
        heritage of Indian dance through stories, movement, and maps.
      </p>
    </div>

    {/* CTA Buttons */}
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a
        href="#explore-learn"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        Start Exploring
        <ArrowRight className="w-4 h-4" />
      </a>

      <a
        href="/predict"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/70 bg-black/40 text-primary-foreground font-semibold hover:bg-primary/10 transition-all"
      >
        Try Mudra AI
      </a>
    </div>
  </div>
</section>


      {/* HISTORY + MAP GRID (unchanged core content as requested) */}
      <section className="px-4 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* HISTORY COLUMN */}
          <div className="rounded-2xl glass-panel p-8 space-y-5 bg-background/80 border border-border">
            <h2 className="font-serif text-3xl text-foreground">History of Classical Dance</h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Indian classical dance has its roots in rituals, temple traditions, and storytelling.
              Originating thousands of years ago, these art forms evolved through devotional
              movements, royal courts, and cultural exchange across regions. They were shaped by
              spiritual philosophy, poetic expression, and the ancient desire to convey emotion
              through movement.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              The <strong>Natyashastra</strong>, attributed to the sage Bharata, stands as the
              foundational text, detailing the grammar of performance—mudras, rhythm, rasa,
              expression, stagecraft, and narrative. It unified movement, music, theatre, and
              spirituality into a single aesthetic system that still influences Indian arts today.
            </p>

            <a
              href="/history"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Know More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* MAP COLUMN */}
          <div className="rounded-2xl p-4 bg-card shadow-sm border border-border">
            <div className="w-full h-[550px] md:h-[640px]">
              <IndiaDanceMap onHover={handleMapHover} onLeave={handleMapLeave} />
            </div>

            {/* Small info box reacting to hover */}
            <div className="mt-4 rounded-xl border border-dashed border-amber-300/60 bg-amber-50/70 px-4 py-3 text-sm">
              {hover ? (
                <>
                  <div className="font-semibold text-amber-900 mb-1">
                    {hover.dance} in {hover.state}
                  </div>
                  <p className="text-amber-900/80">
                    Hovering over <strong>{hover.state}</strong>. Click the highlighted region in the
                    map (if interactive in your implementation) or explore the dance page directly
                    from the menu.
                  </p>
                </>
              ) : (
                <p className="text-amber-900/80">
                  Hover over different states on the map to see which classical or folk forms are
                  associated with them.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE & LEARN FLEXBOX SECTION (improved) */}
      <section
        id="explore-learn"
        className="px-4 py-16 md:py-20 max-w-7xl mx-auto bg-gradient-to-b from-background via-amber-50/40 to-background rounded-3xl mb-12"
      >
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl">Explore & Learn</h2>
          <TempleDivider />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a dancer, a learner, or just curious, MudraMap helps you discover
            forms, decode gestures, and experiment with AI-powered mudra recognition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <a
            href="/explore"
            className="group rounded-2xl p-8 border border-border/60 bg-card/90 backdrop-blur-sm
                      hover:border-amber-500/60 hover:shadow-xl transition-all duration-300
                      flex flex-col justify-between"
          >
            <div>
              <div className="h-px w-12 bg-amber-600/70 mb-6" />

              <h3 className="font-serif text-2xl mb-3 tracking-tight group-hover:text-amber-800 transition-colors">
                Dance Forms
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Study classical and regional Indian dance traditions through their historical
                context, stylistic grammar, and defining mudras.
              </p>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              Explore forms
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* CARD 2 */}
          <a
            href="/learn"
            className="group rounded-2xl p-8 border border-border/60 bg-card/90 backdrop-blur-sm
                      hover:border-amber-500/60 hover:shadow-xl transition-all duration-300
                      flex flex-col justify-between"
          >
            <div>
              <div className="h-px w-12 bg-amber-600/70 mb-6" />

              <h3 className="font-serif text-2xl mb-3 tracking-tight group-hover:text-amber-800 transition-colors">
                Mudra Lexicon
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Learn hand gestures as a visual language—names, meanings, narrative usage,
                and stylistic variations across traditions.
              </p>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              Learn mudras
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          {/* CARD 3 */}
          <a
            href="/predict"
            className="group rounded-2xl p-8 border border-border/60 bg-card/90 backdrop-blur-sm
                      hover:border-amber-500/60 hover:shadow-xl transition-all duration-300
                      flex flex-col justify-between"
          >
            <div>
              <div className="h-px w-12 bg-amber-600/70 mb-6" />

              <h3 className="font-serif text-2xl mb-3 tracking-tight group-hover:text-amber-800 transition-colors">
                Mudra AI
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Use computer vision to analyze mudras from images or live video and
                receive confidence-based recognition feedback.
              </p>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              Try recognition
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

      </section>

      {/* EXTRA SECTION: JOURNEY / HOW IT WORKS */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl">Your Mudra Journey</h2>
          <TempleDivider />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow a simple path—from discovering forms, to practicing gestures, to using AI as
            your companion in learning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center font-semibold mb-3">
              1
            </div>
            <h3 className="font-serif text-xl mb-2">Discover</h3>
            <p className="text-sm text-muted-foreground">
              Start with the map and history pages to understand where each dance comes from and
              how it evolved.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center font-semibold mb-3">
              2
            </div>
            <h3 className="font-serif text-xl mb-2">Learn</h3>
            <p className="text-sm text-muted-foreground">
              Dive deeper into mudras, rasas, and movement vocabulary with examples and practical
              guidance.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center font-semibold mb-3">
              3
            </div>
            <h3 className="font-serif text-xl mb-2">Experiment</h3>
            <p className="text-sm text-muted-foreground">
              Use Mudra AI to test your poses, refine accuracy, and make learning interactive and
              fun.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-4 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NrityaNetra · Celebrating India&apos;s dance heritage
      </footer>
    </>
  )
}

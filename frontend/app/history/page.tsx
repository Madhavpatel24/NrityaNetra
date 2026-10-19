"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { SectionNav } from "@/components/section-nav"
import { DANCES } from "@/lib/dances/data"

const Atlas = dynamic(() => import("@/components/atlas"), {
  ssr: false,
  loading: () => <div className="h-[520px] animate-pulse rounded-3xl bg-muted/60" aria-hidden />,
})

const SECTIONS = [
  { id: "origins", title: "Origins" },
  { id: "temples-courts", title: "Temples & courts" },
  { id: "explore-india", title: "Explore India" },
  { id: "mudras-abhinaya", title: "Mudras" },
  { id: "significance", title: "Significance" },
]

const FORMS = [
  { slug: "bharatanatyam", desc: "Geometry, precision and expressive abhinaya." },
  { slug: "kathak", desc: "Fast spins, storytelling and intricate footwork." },
  { slug: "kathakali", desc: "Highly stylised makeup, costumes and gestures." },
  { slug: "garba", desc: "A circular dance of Navratri, with claps and spins." },
  { slug: "bhangra", desc: "Energetic harvest dance with powerful rhythms." },
  { slug: "lavani", desc: "Rhythm-driven dance known for strong storytelling." },
]

const LANGUAGE = [
  {
    title: "Hasta mudras",
    img: "/indian-classical-dance-hand-mudra-gestures.jpg",
    desc: "Hand gestures that form a symbolic storytelling language.",
  },
  {
    title: "Nava rasas",
    img: "/indian-dancer-expressing-emotions-rasas-classical-.jpg",
    desc: "Nine emotional expressions portrayed with depth and nuance.",
  },
  {
    title: "Rhythm & tala",
    img: "/indian-classical-music-instruments-tabla-rhythm-ta.jpg",
    desc: "Rhythmic cycles that structure movement and expression.",
  },
]

const SIGNIFICANCE = [
  {
    title: "Living spiritual heritage",
    body: "Classical Indian dance preserves centuries of devotional practice, mythology and philosophical thought. Every performance carries echoes of temple rituals, royal courts and the guru–shishya parampara (teacher–student lineage).",
  },
  {
    title: "Artistic & emotional literacy",
    body: "Training refines rhythm, balance and body awareness, while abhinaya cultivates empathy and emotional depth. Dancers learn to embody a wide spectrum of human experience with sensitivity and precision.",
  },
  {
    title: "Cultural identity & continuity",
    body: "For communities in India and the diaspora, these forms are anchors of identity. Festivals, arangetrams and recitals become spaces where tradition is reinterpreted for new generations without losing its core.",
  },
  {
    title: "Global dialogue",
    body: "Today, classical Indian dance collaborates with contemporary styles, theatre and digital media, creating a dialogue between past and present, local and global.",
  },
]

function Chapter({
  n,
  id,
  title,
  lede,
  children,
}: {
  n: string
  id: string
  title: string
  lede?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-32 px-4 py-20 md:px-6 md:py-28">
      <Reveal className="mb-12">
        <div className="flex items-baseline gap-5">
          <span className="font-serif text-5xl text-border md:text-6xl">{n}</span>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">{title}</h2>
        </div>
        {lede && <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground md:ml-[5.5rem]">{lede}</p>}
      </Reveal>
      {children}
    </section>
  )
}

export default function HistoryPage() {
  return (
    <main className="paper-grain min-h-screen overflow-x-clip">
      <Navbar />

      {/* Hero */}
      <header className="mx-auto max-w-5xl px-4 pb-16 pt-32 text-center md:px-6 md:pb-20 md:pt-40">
        <div className="rise-in">
          <p className="eyebrow mb-5">A history in outline</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">
            Classical <em className="text-accent">Indian</em> dance
          </h1>
          <p className="font-deva mt-6 text-2xl text-accent/90">भारतीय शास्त्रीय नृत्य</p>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A profound artistic tradition spanning millennia, carried through texts, temples, courts and teachers.
          </p>
        </div>
        <div
          className="rise-in mt-14 overflow-hidden rounded-[2rem] border border-border bg-muted shadow-[0_30px_60px_-35px_rgba(74,44,0,0.55)]"
          style={{ animationDelay: "140ms" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/historypageimage.jpg"
            alt="Classical Indian dance performance"
            className="aspect-[16/8] w-full object-cover"
          />
        </div>
      </header>

      <SectionNav sections={SECTIONS} />

      {/* 01 Origins */}
      <Chapter n="01" id="origins" title="Origins and the Natyashastra">
        <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Attributed to Sage Bharata, the Natyashastra is a foundational text codifying technique, aesthetics,
              dramaturgy and rasa theory.
            </p>
            <p>
              This ancient treatise remains the philosophical and technical bedrock for all classical Indian dance
              forms, unifying movement, music and emotion.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ancient-sanskrit-text-natyashastra-manuscript-indi.jpg"
              alt="Natyashastra manuscript"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </Chapter>

      {/* 02 Temples & courts */}
      <div className="border-y border-border/70 bg-card/40">
        <Chapter n="02" id="temples-courts" title="From temples to courts">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {[
              {
                title: "Temple traditions",
                img: "/temple-architecture-indian-classical-dance-ritual-.jpg",
                body: "Dancers performed sacred rituals, storytelling and spiritual embodiment through mudras and abhinaya, offering their art as devotion within temple spaces.",
              },
              {
                title: "Royal patronage",
                img: "/royal-palace-court-indian-classical-dancers-musici.jpg",
                body: "In royal courts, technique flourished with refined repertoire, musical innovation, and cross-pollination with poetry, literature and theatre.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="overflow-hidden rounded-3xl border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} className="aspect-[4/3] w-full object-cover" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-foreground">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </Chapter>
      </div>

      {/* 03 Explore India */}
      <section id="explore-india" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:px-6 md:py-28 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-5xl">
          <div className="flex items-baseline gap-5">
            <span className="font-serif text-5xl text-border md:text-6xl">03</span>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Explore India</h2>
          </div>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground md:ml-[5.5rem]">
            See where each tradition belongs, then open its page to read the story in full.
          </p>
        </Reveal>
        <Atlas />

        <ul className="mx-auto mt-20 grid max-w-5xl divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0 md:gap-x-14">
          {FORMS.map((f) => {
            const d = DANCES[f.slug]
            return (
              <li key={f.slug} className="md:border-b md:border-border md:last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                <Link href={`/dancesofIndia/${f.slug}`} className="group flex items-center justify-between gap-4 py-6">
                  <span>
                    <span className="font-serif text-2xl text-foreground transition group-hover:text-accent">{d.name}</span>
                    <span className="ml-3 text-xs uppercase tracking-widest text-muted-foreground">{d.state}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{f.desc}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* 04 Mudras & abhinaya */}
      <div className="border-y border-border/70 bg-card/40">
        <Chapter n="04" id="mudras-abhinaya" title="Mudras and abhinaya">
          <ul className="grid gap-8 md:grid-cols-3">
            {LANGUAGE.map((l, i) => (
              <li key={l.title}>
                <Reveal delay={i * 90}>
                  <div className="overflow-hidden rounded-3xl border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.img} alt={l.title} className="aspect-[4/5] w-full object-cover" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-foreground">{l.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-12">
            <Link href="/predict" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">
              Try a mudra with the AI studio <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </Chapter>
      </div>

      {/* 05 Significance */}
      <Chapter n="05" id="significance" title="Significance & cultural importance">
        <ol className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {SIGNIFICANCE.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={(i % 2) * 90}>
                <p className="eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-2xl text-foreground">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Chapter>
    </main>
  )
}

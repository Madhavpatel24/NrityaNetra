"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Navbar } from "@/components/navbar"

const Atlas = dynamic(() => import("@/components/atlas"), {
  ssr: false,
  loading: () => <div className="h-[520px] animate-pulse rounded-3xl bg-muted/60" aria-hidden />,
})

const CHAIN = [
  { deva: "हस्त", word: "Hasta", meaning: "the hand" },
  { deva: "दृष्टि", word: "Drishti", meaning: "the gaze" },
  { deva: "मनः", word: "Manah", meaning: "the mind" },
  { deva: "भाव", word: "Bhava", meaning: "the feeling" },
  { deva: "रस", word: "Rasa", meaning: "the essence" },
]

const INDEX = [
  {
    n: "01",
    title: "Explore",
    text: "Walk through India's dance traditions, state by state, with the stories and costumes that shaped them.",
    href: "/explore",
  },
  {
    n: "02",
    title: "Learn",
    text: "Start with the hand. A gentle introduction to mudras, their names and what they stand for.",
    href: "/learn",
  },
  {
    n: "03",
    title: "Practise with AI",
    text: "Show a mudra to your camera and see whether it is recognised, with an honest note on how sure we are.",
    href: "/predict",
  },
]

const STRIP = [
  { name: "Kartarimukha", gloss: "Scissors face", img: "kartarimukha" },
  { name: "Mayura", gloss: "Peacock", img: "mayura" },
  { name: "Trishula", gloss: "Trident", img: "trishula" },
  { name: "Mukula", gloss: "Bud", img: "mukula" },
]

export default function HomeClient() {
  return (
    <main className="paper-grain overflow-x-clip">
      <Navbar />
      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="rise-in lg:col-span-7">
          <p className="eyebrow mb-6">Indian classical dance · mudras</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Where the hand goes,
            <br />
            <em className="text-accent">the eye follows.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            NrityaNetra is a quiet place to learn the language of the hands in Indian classical dance, and to check
            your own mudras with the help of a camera.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
            >
              Try a mudra <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="#atlas"
              className="text-sm font-medium text-foreground underline decoration-border underline-offset-8 transition hover:decoration-accent"
            >
              Find a dance on the map
            </Link>
          </div>
        </div>

        <div className="rise-in relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" style={{ animationDelay: "120ms" }}>
          <div className="arch-mask relative mx-auto aspect-[4/5] w-full max-w-md border border-border bg-muted shadow-[0_30px_60px_-35px_rgba(74,44,0,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/indian-classical-dance-hand-mudra-gestures.jpg"
              alt="A dancer's hand held in a classical mudra"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-2 hidden w-40 overflow-hidden rounded-2xl border-4 border-background shadow-lg sm:block md:-left-6 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bharatanatyam.jpg" alt="Bharatanatyam dancer" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Chain */}
      <section className="border-y border-border/70 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <Reveal>
            <p className="mx-auto max-w-2xl text-center font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
              Yato hasta stato drishti, yato drishti stato manah&hellip;
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              A line from the classical dance treatises: the hand leads the eye, the eye leads the mind, and so on
              until the feeling becomes rasa.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-5">
              {CHAIN.map((c, i) => (
                <li key={c.word} className="relative text-center">
                  <span className="font-deva text-4xl text-accent md:text-5xl">{c.deva}</span>
                  <span className="mt-2 block font-serif text-lg text-foreground">{c.word}</span>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">{c.meaning}</span>
                  {i < CHAIN.length - 1 && (
                    <span className="absolute right-0 top-5 hidden translate-x-1/2 text-border sm:block" aria-hidden>
                      &rarr;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Atlas */}
      <section id="atlas" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 md:px-6 md:py-32 lg:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">An atlas of movement</p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">Every region has a dance of its own.</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Move across the map to see which tradition belongs where. Pick a state to read more.
          </p>
        </Reveal>
        <Atlas />
      </section>

      {/* Index */}
      <section className="border-t border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-24 md:px-6 md:py-28 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4">Where to next</p>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">Three ways in.</h2>
          </Reveal>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {INDEX.map((row) => (
              <li key={row.n}>
                <Link
                  href={row.href}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-8 transition md:grid-cols-[5rem_14rem_1fr_auto] md:gap-8"
                >
                  <span className="font-serif text-lg text-muted-foreground md:text-2xl">{row.n}</span>
                  <span className="font-serif text-2xl text-foreground transition group-hover:text-accent md:text-3xl">
                    {row.title}
                  </span>
                  <span className="col-span-2 col-start-2 row-start-2 text-sm leading-relaxed text-muted-foreground md:col-span-1 md:col-start-3 md:row-start-1 md:text-base">
                    {row.text}
                  </span>
                  <ArrowUpRight
                    className="h-6 w-6 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mudra strip */}
      <section className="bg-card/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 md:px-6 md:py-28 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-4">A first look</p>
            <h2 className="font-serif text-4xl text-foreground">Names for the hands.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Each mudra has a name and a meaning. These four are the ones the AI recognises most reliably.
            </p>
            <Link
              href="/predict#guide"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              See the full guide <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STRIP.map((m, i) => (
                <li key={m.name} className={i % 2 === 1 ? "sm:translate-y-6" : ""}>
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-[#0a0807]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/mudra-guide/${m.img}.jpg`}
                      alt={`The ${m.name} mudra`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-3 font-serif text-lg text-foreground">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.gloss}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* History */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ancient-sanskrit-text-natyashastra-manuscript-indi.jpg"
              alt="A Sanskrit manuscript on dance and drama"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow mb-4">Roots</p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">An art older than the stage.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Indian classical dance grew out of temples, courts and village gatherings, and was set down in Sanskrit
            texts that describe gestures, expressions and the feelings they carry.
          </p>
          <Link
            href="/history"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Read the history <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="border-t border-border/70 py-24 text-center md:py-32">
        <Reveal className="mx-auto max-w-2xl px-4">
          <p className="font-deva text-5xl text-accent">नृत्य नेत्र</p>
          <h2 className="mt-6 font-serif text-3xl text-foreground md:text-4xl">Begin with a single gesture.</h2>
          <Link
            href="/predict"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
          >
            Open the AI studio <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}

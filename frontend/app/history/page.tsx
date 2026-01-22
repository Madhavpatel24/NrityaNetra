"use client"

import { useState, useEffect } from "react"
import BackHomeButton from "@/components/back-home-button"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"

const IndiaDanceMap = dynamic(() => import("@/components/india-dance-map"), {
  ssr: false,
})

const HISTORY_SECTIONS = [
  { id: "natyashastra", title: "Origins", emoji: "📖" },
  { id: "temples-courts", title: "Temples & Courts", emoji: "🏛️" },
  { id: "explore-india", title: "Explore India", emoji: "🗺️" },
  { id: "mudras-abhinaya", title: "Mudras", emoji: "🤲" },
  { id: "significance", title: "Significance", emoji: "✨" },
]

// small decorative temple divider
function TempleDivider() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
      <span className="mx-3 text-amber-700 text-xl">🛕</span>
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
    </div>
  )
}

export default function HistoryPage() {
  const [activeSection, setActiveSection] = useState<string>("natyashastra")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]")
      let current = "natyashastra"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 140
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("data-section") || current
        }
      })

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="w-full">
      <Navbar />
      <div className="px-4 py-28 md:py-32">
        <section className="max-w-5xl mx-auto">
          {/* HERO */}
          <div className="mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-border">
              <img
                src="/historypageimage.jpg"
                alt="Classical Indian dance performance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-pretty mb-2 text-center">
              Classical Indian Dance
            </h1>
            <p className="text-muted-foreground text-lg text-center">
              A profound artistic tradition spanning millennia
            </p>
          </div>

          {/* HORIZONTAL NAV FOR HISTORY SECTIONS */}
          <div className="mb-10 border-b border-border pb-3">
            <div className="flex gap-2 overflow-x-auto py-1 justify-center">
              {HISTORY_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base whitespace-nowrap transition-colors border ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  <span>{section.emoji}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ORIGINS */}
          <div
            data-section="natyashastra"
            className="rounded-2xl glass-panel p-8 border border-border mb-12 bg-amber-50/80"
          >
            <h2 className="font-serif text-3xl mb-2 text-center">Origins and the Natyashastra</h2>
            <TempleDivider />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Attributed to Sage Bharata, the Natyashastra is a foundational text
                  codifying technique, aesthetics, dramaturgy, and rasa theory.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This ancient treatise remains the philosophical and technical bedrock
                  for all classical Indian dance forms, unifying movement, music, and emotion.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-border h-80">
                <img
                  src="/ancient-sanskrit-text-natyashastra-manuscript-indi.jpg"
                  alt="Natyashastra manuscript"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* TEMPLES & COURTS */}
          <div
            data-section="temples-courts"
            className="rounded-2xl glass-panel p-8 border border-border mb-12 bg-orange-50/80"
          >
            <h2 className="font-serif text-3xl mb-2 text-center">From Temples to Courts</h2>
            <TempleDivider />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border p-6 bg-card overflow-hidden">
                <div className="w-full h-60 rounded-lg mb-4 overflow-hidden border border-border">
                  <img
                    src="/temple-architecture-indian-classical-dance-ritual-.jpg"
                    alt="Temple traditions"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-center">Temple Traditions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dancers performed sacred rituals, storytelling, and spiritual embodiment
                  through mudras and abhinaya, offering their art as devotion within temple spaces.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6 bg-card overflow-hidden">
                <div className="w-full h-60 rounded-lg mb-4 overflow-hidden border border-border">
                  <img
                    src="/royal-palace-court-indian-classical-dancers-musici.jpg"
                    alt="Royal patronage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3 text-center">Royal Patronage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In royal courts, technique flourished with refined repertoire, musical innovation,
                  and cross-pollination with poetry, literature, and theatre.
                </p>
              </div>
            </div>
          </div>

          {/* EXPLORE INDIA: MAP + REGIONAL FORMS MERGED */}
          <div
            data-section="explore-india"
            className="rounded-2xl glass-panel p-8 border border-border mb-12 bg-rose-50/80"
          >
            <h2 className="font-serif text-3xl mb-2 text-center">Explore India</h2>
            <TempleDivider />
            <p className="text-muted-foreground mb-6 leading-relaxed text-center">
              Use the interactive map to see where classical forms originated across India, then
              explore each dance style connected to its home region.
            </p>

            {/* Map */}
            <div className="w-full h-[550px] md:h-[665px] rounded-xl overflow-hidden mb-8 border border-border bg-card">
              <IndiaDanceMap />
            </div>

            {/* Regional forms below map */}
            <h3 className="font-serif text-2xl mb-2 text-center">Regional Forms at a Glance</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed text-center">
              Here are some of the major classical forms and the states they are most closely
              associated with. Tap a card to explore that style in more detail.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "Bharatanatyam (Tamil Nadu)",
                  desc: "Geometry, precision, and expressive abhinaya.",
                  link: "/dancesofIndia/bharatanatyam",
                },
                {
                  name: "Garba (Gujarat)",
                  desc: "Vibrant circular dance celebrated during Navratri with claps and spins.",
                  link: "/dancesofIndia/garba",
                },
                {
                  name: "Kathak (North India)",
                  desc: "Fast spins, storytelling, and intricate footwork.",
                  link: "/dancesofIndia/kathak",
                },
                {
                  name: "Bhangra (Punjab)",
                  desc: "Energetic harvest and festival dance with powerful rhythms.",
                  link: "/dancesofIndia/bhangra",
                },
                {
                  name: "Kathakali (Kerala)",
                  desc: "Highly stylized makeup, costumes, and gestures.",
                  link: "/dancesofIndia/kathakali",
                },
                {
                  name: "Lavani (Maharashtra)",
                  desc: "Expressive, rhythm-driven dance known for strong storytelling.",
                  link: "/dancesofIndia/lavani",
                },
              ].map((form, idx) => (
                <Link
                  key={idx}
                  href={form.link}
                  className="rounded-lg border border-border p-4 bg-card hover:border-primary transition-colors block"
                >
                  <h4 className="font-serif font-semibold text-lg text-center">{form.name}</h4>
                  <p className="text-sm text-muted-foreground mt-2 text-center">{form.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* MUDRAS & ABHINAYA */}
          <div
            data-section="mudras-abhinaya"
            className="rounded-2xl glass-panel p-8 border border-border mb-12 bg-yellow-50/80"
          >
            <h2 className="font-serif text-3xl mb-2 text-center">Mudras and Abhinaya</h2>
            <TempleDivider />

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Hasta Mudras",
                  img: "/indian-classical-dance-hand-mudra-gestures.jpg",
                  desc: "Hand gestures that form a symbolic storytelling language.",
                },
                {
                  title: "Nava Rasas",
                  img: "/indian-dancer-expressing-emotions-rasas-classical-.jpg",
                  desc: "Nine emotional expressions portrayed with depth and nuance.",
                },
                {
                  title: "Rhythm & Tala",
                  img: "/indian-classical-music-instruments-tabla-rhythm-ta.jpg",
                  desc: "Complex rhythmic cycles that structure movement and expression.",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-lg border border-border p-6 bg-card">
                  <div className="w-full h-60 rounded-lg mb-4 overflow-hidden border border-border">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold mb-2 text-center">{item.title}</h4>
                  <p className="text-sm text-muted-foreground text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SIGNIFICANCE & IMPORTANCE */}
          <div
            data-section="significance"
            className="rounded-2xl glass-panel p-8 border border-border mb-12 bg-slate-50/80"
          >
            <h2 className="font-serif text-3xl mb-2 text-center">Significance & Cultural Importance</h2>
            <TempleDivider />

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-center">
                  Living Spiritual Heritage
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Classical Indian dance preserves centuries of devotional practice, mythology,
                  and philosophical thought. Every performance carries echoes of temple rituals,
                  royal courts, and guru–shishya parampara (teacher–student lineage).
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-center">
                  Artistic & Emotional Literacy
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Training in classical dance refines rhythm, balance, and body awareness, while
                  abhinaya cultivates empathy and emotional depth. Dancers learn to embody a wide
                  spectrum of human experience with sensitivity and precision.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-center">
                  Cultural Identity & Continuity
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  For communities in India and the diaspora, these forms serve as anchors of
                  identity. Festivals, arangetrams, and recitals become spaces where tradition is
                  reinterpreted for new generations without losing its core.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-center">
                  Global Dialogue
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Today, classical Indian dance collaborates with contemporary styles, theatre,
                  and digital media, creating a dialogue between past and present, local and
                  global. It stands as a testament to how heritage can evolve while remaining
                  deeply rooted.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

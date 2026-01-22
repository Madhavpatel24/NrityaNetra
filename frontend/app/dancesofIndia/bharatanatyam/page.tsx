"use client"

import { useState, useEffect } from "react"
import { BookOpen, Landmark, Music, Hand, Heart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const SECTIONS = [
  { id: "introduction", title: "Introduction", emoji: "📖" },
  { id: "history", title: "History", emoji: "🏛️" },
  { id: "philosophy", title: "Philosophy", emoji: "❤️" },
  { id: "mudras", title: "Mudras", emoji: "🤲" },
  { id: "importance", title: "Importance", emoji: "🎵" },
]

export default function BharatnatyamPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const mudras = [
    {
      name: "Asamyuta Hastas",
      description: "Single-hand gestures used to depict objects, actions, and emotions",
      image: "/bharatnatyam-single-hand-mudra-gesture.jpg",
      examples: ["Pataka (Flag)", "Tripataka (Three-fold)", "Mushti (Fist)"],
    },
    {
      name: "Samyuta Hastas",
      description: "Two-hand gestures that create combined meanings and deeper expressions",
      image: "/bharatnatyam-two-hand-mudra-gesture.jpg",
      examples: ["Anjali (Prayer)", "Kapota (Dove)", "Makara (Crocodile)"],
    },
    {
      name: "Nrittas",
      description: "Pure dance movements without specific meaning, focused on rhythm and grace",
      image: "/bharatnatyam-dance-movement-rhythm.jpg",
      examples: ["Jatis", "Korvais", "Tirmanas"],
    },
    {
      name: "Rasas",
      description: "Nine emotional states expressed through facial expressions and body language",
      image: "/bharatnatyam-emotional-expression-rasa.jpg",
      examples: ["Sringara (Love)", "Hasya (Joy)", "Raudra (Anger)"],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollProgress(scrolled)

      // update active section
      let current = "introduction"
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop - 140 // offset for navbar
          if (scrollTop >= top) current = section.id
        }
      })
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Top scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-40">
        <div
          className="h-1 bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className=" pb-12">
        {/* HERO */}
        <section
          id="introduction"
          data-section="introduction"
          className="relative w-full h-[80vh] min-h-[420px] mb-0"
        >
          <img
            src="/Bharatanatyam-A-Deep-Dive-History-Meaning-and-Evolution.jpeg.jpg"
            alt="Bharatanatyam dancer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
                Bharatanatyam
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">
                The Dance of Divine Expression
              </p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                An ancient classical dance form from Tamil Nadu that weaves
                together storytelling, rhythm, devotion, and intricate mudras
                into a complete language of movement.
              </p>
            </div>
          </div>
        </section>

        {/* HORIZONTAL SECTION NAV */}
        <nav className="border-b border-border bg-background/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto  pt-10 pb-10 px-4 flex gap-2 overflow-x-auto py-3">
            {SECTIONS.map((section) => (
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
        </nav>

        {/* CONTENT SECTIONS */}
        {/* History */}
        <section
          id="history"
          data-section="history"
          className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/40"
        >
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                Origins & History
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">
                  Temple Traditions
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bharatanatyam emerged in the temples of Tamil Nadu during the
                  Chola period. Devadasis, the temple dancers, offered their art
                  as worship, blending devotion with technical mastery.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Their performances formed an essential part of temple rituals,
                  festivals, and storytelling traditions, preserving mythological
                  narratives through movement.
                </p>
              </div>
              <img
                src="/ancient-indian-temple-architecture-bharatnatyam.jpg"
                alt="Ancient Indian Temple Architecture"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/bharatnatyam-classical-dance-evolution-history.jpg"
                alt="Dance Evolution"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">
                  Revival & Modern Era
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Colonial attitudes led to the decline of temple dance.
                  Visionaries like Rukmini Devi Arundale and Balasaraswati
                  revived Bharatanatyam in the 20th century, bringing it to the
                  proscenium stage.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Bharatanatyam is a global art form, taught and
                  performed across the world while still rooted in its sacred
                  origins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section
          id="philosophy"
          data-section="philosophy"
          className="px-4 sm:px-6 lg:px-8 py-16 bg-background"
        >
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                Philosophy & Meaning
              </h2>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3">
                  Natyashastra Foundation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bharatanatyam is deeply rooted in the Natyashastra, the
                  ancient Sanskrit text by Bharata Muni that outlines the theory
                  of drama, dance, and music. It emphasizes the union of body,
                  mind, and spirit and the communication of rasa—emotional
                  flavor—to the audience.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">
                    Three Core Elements
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Angika:</strong> Physical movement and posture
                    </li>
                    <li>
                      <strong>Vachika:</strong> Expression and spoken / sung
                      word
                    </li>
                    <li>
                      <strong>Satvika:</strong> Inner emotional experience
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">
                    Spiritual Practice
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Beyond performance, Bharatanatyam can be a meditative and
                    devotional practice. Through abhinaya (expression), the
                    dancer channels stories of love, longing, heroism, and
                    surrender to the divine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mudras */}
        <section
          id="mudras"
          data-section="mudras"
          className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Hand className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                Mudras: Hand Gestures
              </h2>
            </div>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Mudras form the core vocabulary of Bharatanatyam. With a rich
              system of single-hand and double-hand gestures, dancers can
              depict everything from deities and nature to emotions and daily
              life.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {mudras.map((mudra, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:border-primary/60 transition-colors"
                >
                  <img
                    src={mudra.image || "/placeholder.svg"}
                    alt={mudra.name}
                    className="w-full h-80 object-cover border-b border-border"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-semibold mb-2">
                      {mudra.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {mudra.description}
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm font-semibold mb-2">
                        Examples:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {mudra.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl glass-panel border border-primary/30 p-8">
              <h3 className="text-2xl font-serif font-semibold mb-3">
                The Language of Dance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Through mudras, the dancer can narrate epics, portray gods and
                goddesses, and express subtle inner states without speaking a
                single word. Bharatanatyam transforms gesture into poetry in
                motion.
              </p>
            </div>
          </div>
        </section>

        {/* Importance */}
        <section
          id="importance"
          data-section="importance"
          className="px-4 sm:px-6 lg:px-8 py-16 bg-background"
        >
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                Cultural Significance & Importance
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  Spiritual Heritage
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bharatanatyam preserves ancient philosophical ideas and
                  devotional practices, keeping alive stories and values passed
                  down through generations.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  Social & Cultural Empowerment
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The 20th-century revival opened doors for women and artists
                  from diverse backgrounds, making Bharatanatyam a symbol of
                  cultural pride and self-expression.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  Global Reach
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  From Chennai to New York, Bharatanatyam is now performed on
                  global stages, acting as a cultural bridge and introducing
                  audiences worldwide to Indian aesthetics and philosophy.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  Holistic Development
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Training in Bharatanatyam builds stamina, coordination,
                  musicality, memory, and emotional awareness—nurturing both
                  artistic excellence and personal growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing + Back Link */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Bharatanatyam is more than dance—it is a living tradition that
              celebrates the beauty of Indian heritage and the infinite
              possibilities of human expression.
            </p>
            <Link
              href="/history"
              className="inline-block px-6 py-2 rounded-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
            >
              ← Back to Classical Dance History
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Landmark, Music, Hand, Heart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const SECTIONS = [
  { id: "introduction", title: "Introduction", emoji: "📖" },
  { id: "history", title: "History", emoji: "🏛️" },
  { id: "philosophy", title: "Philosophy", emoji: "❤️" },
  { id: "mudras", title: "Techniques", emoji: "🤲" },
  { id: "importance", title: "Importance", emoji: "🎵" },
]

export default function BhangraPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Bhangra Step (Gidda)",
      description: "The signature high-energy stepping pattern with bending knees and springy movements",
      image: "/bhangra-energetic-dance-performance-punjab.jpg",
      examples: ["High knees", "Springy bounce", "Rhythmic jumps"],
    },
    {
      name: "Dhol Rhythm",
      description: "Dancers move to the powerful beat of the dhol drum, the heartbeat of Bhangra",
      image: "/bhangra-traditional-dhol-drum-rhythm.jpg",
      examples: ["Drum synchronization", "Beat following", "Rhythmic timing"],
    },
    {
      name: "Shoulder Shaking",
      description: "Characteristic shoulder and upper body movements that add vibrancy and energy",
      image: "/bhangra-joy-celebration-movement.jpg",
      examples: ["Shoulder rolls", "Upper body sway", "Dynamic movement"],
    },
    {
      name: "Festive Expression",
      description: "Joyful facial expressions and body language conveying celebration and victory",
      image: "/bhangra-colorful-folk-costume-tradition.jpg",
      examples: ["Enthusiastic energy", "Celebratory mood", "Victory expressions"],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollProgress(scrolled)

      let current = "introduction"
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop - 140
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

      <div className="fixed top-0 left-0 h-1 bg-primary/20 w-full z-40">
        <div className="h-1 bg-primary transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      <main className="pb-12">
        <section id="introduction" data-section="introduction" className="relative w-full h-[80vh] min-h-[420px] mb-0">
          <img
            src="/bhangra-energetic-dance-performance-punjab.jpg"
            alt="Bhangra dancers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Bhangra</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Harvest & Celebration</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A vibrant folk dance from Punjab that celebrates the harvest season with explosive energy, rhythmic
                footwork, and joyful expressions of thanksgiving and collective celebration.
              </p>
            </div>
          </div>
        </section>

        <nav className="border-b border-border bg-background/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto pt-10 pb-10 px-4 flex gap-2 overflow-x-auto py-3">
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

        <section id="history" data-section="history" className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/40">
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">Origins & History</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Harvest Festival Traditions</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Bhangra originated in Punjab as a celebration of the Baisakhi harvest festival. Farmers would dance
                  with joy and thanksgiving after completing the successful harvest, expressing gratitude to the land
                  and the sky.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The word "Bhangra" comes from the oil seeds harvested during this season. What began as spontaneous
                  celebrations in fields evolved into organized performances and a distinct cultural art form.
                </p>
              </div>
              <img
                src="/bhangra-harvest-celebration-festival.jpg"
                alt="Bhangra Harvest Festival"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/bhangra-modern-fusion-contemporary.jpg"
                alt="Modern Bhangra"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Global Evolution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From village celebrations to international stages, Bhangra has undergone remarkable transformation. In
                  the 1970s and 80s, diaspora communities blended Bhangra with Western music, creating fusion forms that
                  captivated global audiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Bhangra is performed at weddings, concerts, and festivals worldwide, maintaining its
                  celebratory spirit while embracing contemporary musical influences and choreography.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="philosophy" data-section="philosophy" className="px-4 sm:px-6 lg:px-8 py-16 bg-background">
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">Philosophy & Meaning</h2>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-2xl font-serif font-semibold mb-3">Joy & Gratitude</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bhangra embodies the philosophy of celebrating life's victories and expressing gratitude for
                  abundance. It's a dance that celebrates hard work, successful harvests, and the resilience of
                  agricultural communities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Philosophies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Harvest Victory:</strong> Celebration of successful agriculture
                    </li>
                    <li>
                      <strong>Communal Joy:</strong> Sharing success with the community
                    </li>
                    <li>
                      <strong>Vitality:</strong> Exuberant celebration of life force
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Energetic Expression</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Bhangra is uninhibited and exuberant—a physical manifestation of joy and freedom. It celebrates the
                    body's power to express emotion and the spirit's capacity to find happiness in simple moments of
                    togetherness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mudras" data-section="mudras" className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Hand className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">Techniques & Movements</h2>
            </div>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Bhangra is characterized by its explosive energy and powerful movements. The dance combines high-energy
              footwork, vigorous upper body movements, and the distinctive shoulder shimmy that defines the form.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {techniques.map((technique, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:border-primary/60 transition-colors"
                >
                  <img
                    src={technique.image || "/placeholder.svg"}
                    alt={technique.name}
                    className="w-full h-80 object-cover border-b border-border"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-semibold mb-2">{technique.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{technique.description}</p>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm font-semibold mb-2">Key Aspects:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {technique.examples.map((example, idx) => (
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
              <h3 className="text-2xl font-serif font-semibold mb-3">Pure Exuberance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bhangra's defining characteristic is its uninhibited energy and pure exuberance. Unlike forms requiring
                technical precision, Bhangra celebrates the liberation of movement, the joy of the body in motion, and
                the spirit's triumph.
              </p>
            </div>
          </div>
        </section>

        <section id="importance" data-section="importance" className="px-4 sm:px-6 lg:px-8 py-16 bg-background">
          <div className="max-w-4xl mx-auto rounded-2xl glass-panel p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-7 h-7 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">Cultural Significance & Importance</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border-l-4 border-primary">
                <h3 className="text-2xl font-serif font-semibold mb-2">Punjabi Heritage & Pride</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bhangra is the heartbeat of Punjabi culture, representing the spirit, resilience, and vibrant identity
                  of Punjab. It serves as a symbol of Punjabi pride and cultural continuity across generations.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Agricultural Celebration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bhangra honors agricultural communities and celebrates the connection between humans and the land. It
                  acknowledges the hard work of farmers and the cyclical nature of harvest and renewal.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Global Cultural Bridge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through fusion and contemporary adaptations, Bhangra has become a bridge between traditional and
                  modern, East and West, serving as a vehicle for cultural exchange and artistic innovation.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Celebration of Life</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bhangra's primary importance lies in its universal message—that life is worth celebrating, that joy is
                  worth sharing, and that community is where strength and happiness truly reside.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Bhangra is where the heart explodes into movement—a dance of victory, gratitude, and the unstoppable joy
              of being alive and free.
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

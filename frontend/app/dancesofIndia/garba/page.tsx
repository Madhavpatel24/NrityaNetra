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

export default function GarbaPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Circular Formation",
      description: "Dancers move in concentric circles, creating a sense of community and collective joy",
      image: "/garba-traditional-circular-dance-group.jpg",
      examples: ["Spinning circles", "Group harmony", "Unified movement"],
    },
    {
      name: "Hand Clapping (Tal)",
      description: "Rhythmic hand clapping synchronized with footwork, creating the pulse and energy",
      image: "/garba-hand-gestures-mudra-choreography.jpg",
      examples: ["Synchronized claps", "Rhythmic patterns", "Musical coordination"],
    },
    {
      name: "Footwork & Hip Movements",
      description: "Quick, energetic footsteps combined with graceful hip and body movements",
      image: "/garba-folk-festival-raas-dance.jpg",
      examples: ["Quick steps", "Swaying hips", "Joyful movements"],
    },
    {
      name: "Costume & Expression",
      description: "Colorful traditional attire with expressive facial expressions conveying joy and celebration",
      image: "/garba-colorful-chaniya-choli-costume.jpg",
      examples: ["Chaniya choli", "Bright colors", "Festive energy"],
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
            src="/garba-traditional-circular-dance-group.jpg"
            alt="Garba dancers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Garba</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Community & Joy</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A vibrant folk dance form from Gujarat that celebrates the beauty of community, the joy of celebration,
                and the spirit of togetherness through circular formations and rhythmic hand movements.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Ancient Devotional Dance</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Garba originated in Gujarat as a devotional dance performed during Navratri (nine nights) festival
                  celebrations honoring the Divine Mother, Durga. The word "Garba" means womb, symbolizing the nurturing
                  power of the goddess.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Traditionally performed around a lit lamp (diya) in circular formations, Garba became a community
                  celebration that brought people together through joyful movement and collective festivity.
                </p>
              </div>
              <img
                src="/garba-folk-festival-raas-dance.jpg"
                alt="Garba Festival"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/garba-modern-contemporary-stage.jpg"
                alt="Modern Garba"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Contemporary Evolution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  From village squares to concert stages, Garba has evolved dramatically while maintaining its festive
                  spirit. Modern choreographers blend traditional steps with contemporary music and staging.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Garba is celebrated not just in Gujarat but globally, with Navratri celebrations featuring
                  Garba competitions and performances in major cities worldwide.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Celebration of Unity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garba embodies the philosophy of collective joy and unity. The circular formation has no beginning or
                  end, symbolizing the eternal cycle of life, the continuity of tradition, and the interconnectedness of
                  community.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Meanings</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Durga Worship:</strong> Devotion to the Divine Mother
                    </li>
                    <li>
                      <strong>Collective Joy:</strong> Happiness multiplied through community
                    </li>
                    <li>
                      <strong>Cyclical Time:</strong> The eternal dance of creation and renewal
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Festival Spirit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Garba celebrates life itself—fertility, abundance, and the triumph of good over evil. It's a dance
                    of celebration that invites everyone, regardless of age or background, to participate in collective
                    joy.
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
              Garba's technique combines rhythmic footwork, synchronized hand movements, and expressive body language.
              The dance is characterized by quick steps, swaying hips, and hand clapping that creates the musical pulse.
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
                      <p className="text-sm font-semibold mb-2">Key Elements:</p>
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
              <h3 className="text-2xl font-serif font-semibold mb-3">Infectious Energy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Garba is characterized by its infectious energy and participatory nature. Unlike some classical forms
                that emphasize perfection, Garba celebrates the joy of dancing together, making it accessible and
                welcoming to all.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Feminine Divine Celebration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garba honors the Divine Mother in her many forms, serving as a powerful celebration of feminine
                  energy, strength, and nurturing power central to Hindu philosophy.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Social Cohesion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garba's circular formation and participatory nature strengthen community bonds, bringing together
                  people of all ages, genders, and backgrounds in celebration of shared cultural heritage.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Cultural Pride</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garba represents the vibrant cultural identity of Gujarat, serving as a symbol of Gujarati traditions
                  and celebrating the region's artistic heritage on national and international stages.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Accessibility & Inclusivity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike classical forms requiring years of training, Garba welcomes everyone to participate, making
                  dance a shared cultural expression accessible to entire communities regardless of skill level.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Garba is where tradition becomes celebration—a dance of joy that reminds us of the power of community, the
              beauty of togetherness, and the eternal cycle of life.
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

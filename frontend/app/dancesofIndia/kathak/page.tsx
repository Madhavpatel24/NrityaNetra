"use client"

import { useState, useEffect } from "react"
import { Landmark, Music, Hand, Heart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const SECTIONS = [
  { id: "introduction", title: "Introduction", emoji: "📖" },
  { id: "history", title: "History", emoji: "🏛️" },
  { id: "philosophy", title: "Philosophy", emoji: "❤️" },
  { id: "mudras", title: "Technique", emoji: "🤲" },
  { id: "importance", title: "Importance", emoji: "🎵" },
]

export default function KathakPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Taal (Rhythm)",
      description: "Complex rhythmic cycles that form the foundation of Kathak's temporal structure",
      image: "/kathak-rhythm-taal-tabla.jpg",
      examples: ["Teental (16 beats)", "Jhaptal (10 beats)", "Rupak (7 beats)"],
    },
    {
      name: "Bol (Verbal Syllables)",
      description: "Mnemonic syllables recited to create rhythm patterns and storytelling sequences",
      image: "/kathak-bol-recitation-dancer.jpg",
      examples: ["Ta-jha-nu", "Dha-ge-na", "Tat-tai-jha-nu"],
    },
    {
      name: "Chakri & Paran",
      description: "Intricate footwork patterns combined with rhythmic syllables and spins",
      image: "/kathak-footwork-chakri-spin.jpg",
      examples: ["Gaida-paran", "Chakradar", "Ladi"],
    },
    {
      name: "Hastas & Mudras",
      description: "Hand gestures that narrate stories and express emotional states with precision",
      image: "/kathak-hastas-hand-gestures.jpg",
      examples: ["Tribhanga", "Aramandi", "Samapada-sthana"],
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
            src="/kathak-classical-dancer-performing.jpg"
            alt="Kathak dancer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Kathak</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Stories and Rhythm</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A vibrant classical dance form from North India that blends rapid footwork, intricate rhythmic patterns,
                and expressive storytelling into a dynamic performance art.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Court Tradition</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Kathak originated in North India as a court performance art in the royal courts of Mughal emperors.
                  The word "Kathak" comes from "Katha," meaning story.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dancers called Kathaks would narrate tales of mythology, romance, and valor through a combination of
                  rhythmic footwork, gestures, and facial expressions, entertaining nobility and nobility alike.
                </p>
              </div>
              <img
                src="/kathak-mughal-court-architecture.jpg"
                alt="Mughal Court Architecture"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/kathak-dance-evolution-history.jpg"
                alt="Kathak Evolution"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Transformation & Modernity</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  After the decline of court patronage, Kathak transitioned from palaces to concert stages. Maestros
                  like PT. Lachhu Maharaj and Pt. Birju Maharaj revolutionized the form.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Kathak thrives as a concert form, maintaining its unique blend of rhythmic virtuosity and
                  narrative depth while continuing to evolve with contemporary interpretations.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">The Art of Storytelling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathak is fundamentally a narrative art form. Through a sophisticated language of movement, rhythm,
                  and expression, the dancer weaves stories that captivate audiences, transforming abstract emotion into
                  tangible movement.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Key Philosophies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Laya:</strong> Rhythmic flow and temporal progression
                    </li>
                    <li>
                      <strong>Abhinaya:</strong> Expressive storytelling through gesture
                    </li>
                    <li>
                      <strong>Nritta:</strong> Pure rhythmic dance patterns
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">The Performer's Spirit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A Kathak dancer must master both the mathematical precision of rhythm and the emotional nuance of
                    expression, embodying both the scientist and the poet.
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
              Kathak is renowned for its intricate rhythmic vocabulary and expressive techniques. The combination of
              rapid footwork, hand gestures, and facial expressions creates a unique movement language.
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
                      <p className="text-sm font-semibold mb-2">Examples:</p>
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
              <h3 className="text-2xl font-serif font-semibold mb-3">The Rhythm Revolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kathak's hallmark is its breathtaking footwork and rhythmic complexity. Dancers execute intricate
                patterns at remarkable speeds, all while maintaining emotional expression—a balance that defines Kathak
                excellence.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Musical & Rhythmic Legacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathak has deeply influenced North Indian classical music and is a laboratory for rhythmic innovation,
                  with its complex taals and improvisational frameworks inspiring musicians across generations.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Courtly Elegance & Refinement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rooted in court traditions, Kathak represents a refined aesthetic that blends intellectual rigor with
                  sensual grace, making it a symbol of artistic sophistication and cultural excellence.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Living Narrative Tradition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By preserving storytelling traditions and mythological narratives, Kathak keeps alive the oral
                  heritage and philosophical wisdom of Indian civilization in a dynamic, ever-evolving form.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Contemporary Relevance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Modern Kathak continues to inspire collaborations, contemporary choreography, and fusion projects,
                  proving that tradition and innovation can coexist beautifully in artistic expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Kathak is a living art form where rhythm and story dance together, creating moments of pure enchantment
              and intellectual brilliance.
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

"use client"

import { useState, useEffect } from "react"
import { Landmark, Music, Hand, Heart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const SECTIONS = [
  { id: "introduction", title: "Introduction", emoji: "📖" },
  { id: "history", title: "History", emoji: "🏛️" },
  { id: "philosophy", title: "Philosophy", emoji: "❤️" },
  { id: "mudras", title: "Mudras", emoji: "🤲" },
  { id: "importance", title: "Importance", emoji: "🎵" },
]

export default function KathakailiPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const mudras = [
    {
      name: "Makara",
      description: "Represents crocodile, used to depict water creatures and specific emotions",
      image: "/kathakali-makara-mudra.jpg",
      examples: ["Crocodile attack", "Swimming", "Water creatures"],
    },
    {
      name: "Vardhana",
      description: "Depicts growth and expansion, used in narratives of abundance",
      image: "/kathakali-vardhana-mudra.jpg",
      examples: ["Growing flowers", "Prosperity", "Abundance"],
    },
    {
      name: "Katakamukha",
      description: "Represents gaping mouth of a tiger or lion, expressing danger and power",
      image: "/kathakali-tiger-mouth-mudra.jpg",
      examples: ["Tiger roar", "Threat", "Power"],
    },
    {
      name: "Eye Movements (Drishtis)",
      description: "Complex eye expressions that convey emotions and direct narrative focus",
      image: "/kathakali-eye-expressions.jpg",
      examples: ["Love gaze", "Anger", "Wonder"],
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
            src="/kathakali-performer-makeup-costume.jpg"
            alt="Kathakali performer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Kathakali</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Gods and Legends</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A grand theatrical dance form from Kerala that combines elaborate costumes, intricate makeup, powerful
                movements, and mythological narratives into an immersive visual spectacle.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Kerala's Treasure</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Kathakali emerged in Kerala during the 16th century as a performance art deeply rooted in temple
                  rituals and royal patronage. The name means "story-play" in Malayalam.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Performers would train for decades to master the elaborate makeup, costumes, precise movements, and
                  complex emotional expressions required to bring mythological characters to life.
                </p>
              </div>
              <img
                src="/kathakali-kerala-temple-architecture.jpg"
                alt="Kerala Temple Architecture"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/kathakali-traditional-performance-stage.jpg"
                alt="Traditional Kathakali Performance"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Evolution & Global Recognition</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once performed exclusively in temples and courts, Kathakali transitioned to concert stages in the 20th
                  century while retaining its ceremonial grandeur and spiritual depth.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Kathakali is recognized as one of the world's most distinctive theatrical forms, captivating
                  international audiences with its unparalleled visual richness and narrative power.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Total Theater Experience</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathakali is a complete sensory experience where every element—from the green and red face paint to
                  the golden headpiece, from the powerful leg movements to the subtle hand gestures—combines to create a
                  unified artistic statement.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Character Archetypes</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Pacha:</strong> Green face (divine, virtuous characters)
                    </li>
                    <li>
                      <strong>Kathi:</strong> Red face (fierce, warrior characters)
                    </li>
                    <li>
                      <strong>Minukku:</strong> Yellow face (noble, feminine characters)
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Spiritual Transformation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The performer undergoes a profound transformation, both physically and spiritually. Through rigorous
                    preparation, the dancer becomes the mythological character, channeling divine energy onto the stage.
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
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">Mudras & Expression</h2>
            </div>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              Kathakali uses a sophisticated vocabulary of hand gestures and facial expressions to narrate complex
              stories. Each mudra and eye movement carries specific meaning and emotional weight.
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
                    <h3 className="text-2xl font-serif font-semibold mb-2">{mudra.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{mudra.description}</p>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm font-semibold mb-2">Depicts:</p>
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
              <h3 className="text-2xl font-serif font-semibold mb-3">The Language of Makeup & Movement</h3>
              <p className="text-muted-foreground leading-relaxed">
                In Kathakali, makeup is not mere decoration—it is a visual language. Combined with powerful leg
                movements and intricate hand patterns, the makeup tells you instantly which character you're watching
                and what emotions they're experiencing.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Visual Storytelling Mastery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathakali demonstrates how movement, costume, and makeup can communicate complex narratives without
                  spoken dialogue, proving that theater transcends language barriers.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Cultural Icon of Kerala</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathakali is the pride of Kerala's cultural heritage, representing centuries of artistic refinement,
                  technical excellence, and the state's unique aesthetic sensibilities.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Physical & Mental Discipline</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Training in Kathakali requires extraordinary physical stamina, mental concentration, and years of
                  dedication. It builds strength, flexibility, and profound emotional awareness.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">International Artistic Bridge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kathakali's grandeur and uniqueness have made it a cultural ambassador, introducing millions worldwide
                  to Indian theatrical traditions and inspiring contemporary performers across genres.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Kathakali is a testament to human creativity—a breathtaking fusion of art, discipline, and spiritual
              expression that has captivated audiences for centuries.
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

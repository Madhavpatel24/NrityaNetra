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

export default function KuchipudiPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Aramandi (Horse Stance)",
      description:
        "The fundamental stance with knees bent and weight distributed, creating a strong foundation for all movements",
      image: "/kuchipudiaralmandi.jpeg",
      examples: ["Ground connection", "Power base", "Grounded elegance"],
    },
    {
      name: "Chari (Rhythmic Footwork)",
      description: "Complex footwork patterns synchronized with musical rhythms, creating the pulse of movement",
      image: "/kuchipudichari.jpeg",
      examples: ["Jati patterns", "Rhythmic sequences", "Musical synchronization"],
    },
    {
      name: "Natya (Dramatic Expression)",
      description:
        "Theatrical storytelling combined with pure dance, creating a unique blend of drama and technical mastery",
      image: "/kuchinatya.jpeg",
      examples: ["Character portrayal", "Emotional depth", "Narrative flow"],
    },
    {
      name: "Mudra & Hasta (Gestures)",
      description: "Hand gestures combined with facial expressions to communicate complex narratives and emotions",
      image: "/bharatnatyam-single-hand-mudra-gesture.jpg",
      examples: ["Samyuta hastas", "Abhinaya", "Expression work"],
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
          <img src="/kuchipudihero.jpg" alt="Kuchipudi dancer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Kuchipudi</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Andhra Pradesh</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A classical dance form from Andhra Pradesh that harmoniously blends the vigor of South Indian dance, the
                dramatic elements of storytelling, and the technical refinement of classical tradition.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Village Performance Tradition</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Kuchipudi originated in the village of Kuchipudi in Andhra Pradesh, emerging as a community-based
                  performance art where entire groups would perform Hindu religious stories and epics.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Originally performed by the Brahmin community as an offering to Lord Krishna, Kuchipudi evolved from
                  ritual performances to a sophisticated classical form suitable for concert stages.
                </p>
              </div>
              <img
                src="/kuchipudivillage.jpeg"
                alt="Kuchipudi Village Tradition"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/kuchipuditradition.jpeg"
                alt="Kuchipudi Contemporary Stage"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Classical Recognition</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  During the 20th century, dancers like Yakshagana practitioners and later dedicated Kuchipudi artists
                  standardized and refined the form, gaining recognition as one of India's eight classical dances.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Kuchipudi performs on prestigious concert stages worldwide, showcasing the remarkable evolution
                  from a village tradition to an internationally celebrated classical art form.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Unity of Dance Forms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kuchipudi is unique in synthesizing elements from various South Indian and North Indian classical
                  traditions. It combines the rhythmic sophistication of Bharatanatyam with the dramatic narrative of
                  Yakshagana.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Elements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Natya:</strong> Dramatic storytelling and characterization
                    </li>
                    <li>
                      <strong>Nritta:</strong> Pure rhythmic dance patterns
                    </li>
                    <li>
                      <strong>Nritya:</strong> Expressive gesture work with emotion
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Versatile Expression</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Kuchipudi dancers are trained as complete performers—equally adept at pure technical virtuosity and
                    emotional dramatic expression, making them versatile artists capable of profound storytelling.
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
              Kuchipudi technique combines strong rhythmic foundations with expressive artistry. Dancers master
              intricate footwork, complex hand gestures, and the ability to switch seamlessly between technical and
              dramatic sequences.
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
              <h3 className="text-2xl font-serif font-semibold mb-3">The Bridge Form</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kuchipudi's unique blend of technical precision and theatrical drama makes it a bridge between pure
                abstract dance and narrative performance, offering audiences the best of both worlds.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Community & Tradition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kuchipudi's origins as a community performance art make it a symbol of collaborative creativity and
                  cultural cohesion, where art serves both spiritual and social functions.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Andhra Pradesh Pride</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kuchipudi represents the artistic brilliance and cultural sophistication of Andhra Pradesh,
                  contributing significantly to India's reputation as a cradle of classical performing arts.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">All-Round Artistry</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Training in Kuchipudi develops complete performers who can handle complex technical sequences and
                  nuanced dramatic roles, creating versatile artists of exceptional caliber.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Contemporary Adaptability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kuchipudi's blend of classical rigor and theatrical expressiveness makes it adaptable to contemporary
                  compositions and experimental forms, keeping it relevant to modern audiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Kuchipudi is where tradition meets innovation—a classical form that honors the past while embracing the
              possibilities of contemporary artistic expression.
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

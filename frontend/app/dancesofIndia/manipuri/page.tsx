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

export default function ManipuriPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Ras Lila (Circle of Love)",
      description: "The signature Manipuri form depicting Krishna's divine play and romantic pastimes with the gopis",
      image: "/manipuri-ras-lila-circle.jpg",
      examples: ["Krishna's play", "Gopi devotion", "Divine love"],
    },
    {
      name: "Chari (Rhythmic Footwork)",
      description: "Soft, grounded footwork that connects the dancer to the earth and creates rhythmic patterns",
      image: "/manipuri-footwork-chari.jpg",
      examples: ["Ground movement", "Rhythmic patterns", "Connected dance"],
    },
    {
      name: "Soft Movements",
      description: "Gentle, undulating movements characterized by flowing arms and a lyrical quality",
      image: "/manipuri-soft-movements-lyrical.jpg",
      examples: ["Arm waves", "Graceful flow", "Lyrical expression"],
    },
    {
      name: "Facial Expressions (Rasa)",
      description: "Subtle yet profound facial expressions that convey deep emotions and spiritual states",
      image: "/manipuri-facial-expressions-rasa.jpg",
      examples: ["Divine love", "Longing", "Devotion"],
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
            src="/manipuri-dancer-classical-performance.jpg"
            alt="Manipuri dancer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Manipuri</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Divine Love</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A classical dance form from Manipur that expresses the divine love between Krishna and the gopis through
                soft, lyrical movements and profound spiritual devotion.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">The Valley of Dance</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Manipuri originated in the Manipur Valley in Northeast India, evolving as a devotional art form
                  expressing the love of Krishna and the gopis (cowherd girls) through graceful, spiritual movements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The dance was performed during temple festivals and royal occasions, serving as a sacred offering and
                  a medium for expressing divine love and spiritual surrender.
                </p>
              </div>
              <img
                src="/manipuri-manipur-valley-temple.jpg"
                alt="Manipur Valley Temple"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/manipuri-classical-tradition.jpg"
                alt="Manipuri Classical Tradition"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Cultural Continuity</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unlike some classical forms, Manipuri maintained continuity through family traditions and community
                  performances. In the 20th century, it was formally recognized as one of India's eight classical
                  dances.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Manipuri dancers preserve the spirituality and lyrical grace of the form while bringing it to
                  national and international concert stages, maintaining its sacred essence.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">The Language of the Heart</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manipuri is fundamentally a spiritual dance form expressing the longing of the soul for divine union.
                  Through soft, lyrical movements, dancers channel the emotional intensity of bhakti—pure devotional
                  love.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Philosophies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Bhakti:</strong> Devotional surrender and love
                    </li>
                    <li>
                      <strong>Laya:</strong> Internal rhythm and spiritual flow
                    </li>
                    <li>
                      <strong>Rasa:</strong> Emotional and spiritual essence
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Spiritual Intimacy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike other forms, Manipuri celebrates intimate moments of Krishna's life—the tender, personal
                    moments between Krishna and the gopis—expressing spirituality through emotional connection and
                    tenderness.
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
              Manipuri is distinguished by its soft, undulating movements and intimate emotional expression. The form
              emphasizes grace, fluidity, and the ability to convey subtle spiritual states through gentle articulation.
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
                      <p className="text-sm font-semibold mb-2">Expresses:</p>
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
              <h3 className="text-2xl font-serif font-semibold mb-3">Grace in Motion</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manipuri's hallmark is its gentleness—a profound softness that doesn't diminish the intensity of
                spiritual expression. Every movement flows naturally, creating an impression of effortless grace and
                divine beauty.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Spiritual Heritage of Northeast India</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manipuri is a living expression of Northeast India's spiritual traditions, preserving Krishna devotion
                  and showcasing the region's unique artistic identity within India's classical dance heritage.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Aesthetic Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With its emphasis on softness and lyrical quality, Manipuri introduced a different aesthetic to Indian
                  classical dance, proving that grace and power are not mutually exclusive.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Female Empowerment & Performance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manipuri has given women performers a platform to express spirituality and artistry, with female
                  dancers playing central roles in both traditional and contemporary performances.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Living Spiritual Practice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike some classical forms that became purely secular, Manipuri retains its spiritual dimension,
                  allowing dancers to experience it as both artistic practice and devotional meditation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Manipuri is where the soul finds expression—a gentle, profound art form that celebrates divine love
              through the poetry of movement and the grace of the human spirit.
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

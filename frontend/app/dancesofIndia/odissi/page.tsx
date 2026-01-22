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

export default function OdissiPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Tribhanga (Three Bends)",
      description: "The signature Odissi posture with three bends in the body, creating fluidity and grace",
      image: "/odissi-tribhanga-posture.jpg",
      examples: ["Head bend", "Chest bend", "Hip bend"],
    },
    {
      name: "Chari (Footwork)",
      description: "Rhythmic footwork patterns that ground the dancer and create the pulse of movement",
      image: "/odissi-footwork-chari.jpg",
      examples: ["Aramandi (horse stance)", "Walking patterns", "Rhythmic sequences"],
    },
    {
      name: "Hasta (Hand Gestures)",
      description: "Graceful hand movements that complement the flowing body movements and express narratives",
      image: "/odissi-hand-gestures.jpg",
      examples: ["Single mudras", "Combined gestures", "Storytelling movements"],
    },
    {
      name: "Bhanga (Soft Curves)",
      description: "Fluid, curved movements that define Odissi's lyrical and sensuous character",
      image: "/odissi-fluid-movements.jpg",
      examples: ["Wave-like motion", "Graceful transitions", "Feminine elegance"],
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
          <img src="/odissi-dancer-classical-pose.jpg" alt="Odissi dancer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Odissi</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of the Jagannatha Temple</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A lyrical classical dance form from Odisha that combines fluid body movements, graceful arm gestures,
                and sensuous curves into an enchanting celebration of love and devotion.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Sacred Temple Tradition</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Odissi originated in the 2nd century as a sacred temple dance in the Jagannatha Temple of Puri,
                  Odisha. The "Maharis"—temple dancers—performed elaborate rituals and devotional dances.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The dance form was designed to express the love and longing between Radha and Krishna, capturing the
                  essence of bhakti—devotional surrender—through every movement.
                </p>
              </div>
              <img
                src="/odissi-jagannatha-temple.jpg"
                alt="Jagannatha Temple"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/odissi-classical-revival.jpg"
                alt="Odissi Classical Revival"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Modern Renaissance</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  After periods of decline, visionary artists like Kelucharan Mohapatra revived Odissi in the 20th
                  century, standardizing techniques and bringing it to concert stages worldwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Odissi is celebrated globally as a major classical dance form, with both male and female
                  dancers mastering its unique blend of spiritual depth and sensuous beauty.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">The Poetry of Movement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Odissi is fundamentally lyrical—it flows like poetry in motion. The rounded, curved movements create
                  an undulating rhythm that mirrors natural phenomena like waves, swaying trees, and the gentle motion
                  of celestial bodies.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Philosophies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Rasanirman:</strong> Creation of emotional essence
                    </li>
                    <li>
                      <strong>Bhakti:</strong> Devotional love and surrender
                    </li>
                    <li>
                      <strong>Lyra:</strong> Lyrical, flowing expression
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Sensuous Grace</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike angular forms, Odissi celebrates curves and softness. The tribhanga stance—with its three
                    bends—creates a natural, organic beauty that expresses femininity and grace.
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
              Odissi's technique combines lyrical grace with rhythmic precision. Key elements include the tribhanga
              posture, fluid hand movements, and expressive facial expressions that convey complex emotions.
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
                      <p className="text-sm font-semibold mb-2">Components:</p>
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
              <h3 className="text-2xl font-serif font-semibold mb-3">The Language of Curves</h3>
              <p className="text-muted-foreground leading-relaxed">
                In Odissi, straight lines are rare. Instead, dancers move in curves, waves, and arcs—creating a visual
                poetry that celebrates the beauty of organic forms and the sensuality of classical tradition.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Sacred Devotional Art</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Odissi preserves thousands of years of temple worship, channeling divine love through the movements of
                  Radha and Krishna, keeping alive spiritual traditions and sacred narratives.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Feminine Empowerment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The revival of Odissi in the modern era gave women artists a platform for self-expression and cultural
                  participation, making it a symbol of female empowerment and artistic independence.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Aesthetic Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Odissi's unique movement vocabulary has influenced contemporary dance, proving that classical
                  traditions can remain relevant and inspiring for modern artists and audiences.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Cultural Pride of Odisha</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Odissi is intrinsically connected to Odisha's identity, representing the state's rich spiritual
                  heritage, artistic sophistication, and contribution to India's classical traditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Odissi is a celebration of beauty, grace, and devotion—where the soul speaks through the poetry of
              movement and the curves of classical elegance.
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

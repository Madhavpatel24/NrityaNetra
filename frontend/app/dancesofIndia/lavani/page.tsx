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

export default function LavaniPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [scrollProgress, setScrollProgress] = useState(0)

  const techniques = [
    {
      name: "Rhythmic Hip Movement",
      description: "The signature undulating hip and waist movements that create the sensuous character of Lavani",
      image: "/lavani-rhythmic-hip-movement-dance.jpg",
      examples: ["Hip sways", "Waist articulation", "Rhythmic pulses"],
    },
    {
      name: "Dramatic Expressions",
      description:
        "Intense facial expressions and emotional depth conveying stories of love, loss, and social commentary",
      image: "/lavaniexpression.jpg",
      examples: ["Emotional intensity", "Storytelling", "Character portrayal"],
    },
    {
      name: "Hand Gestures & Mudras",
      description: "Graceful hand movements combined with precise finger work to enhance narrative and expression",
      image: "/lavanigestures.jpg",
      examples: ["Mudra combinations", "Hand articulation", "Gesture precision"],
    },
    {
      name: "Social Commentary",
      description: "The use of movement and song to address social issues and convey powerful messages",
      image: "/Lavanisocial.jpg",
      examples: ["Satirical expression", "Social critique", "Powerful messaging"],
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
            src="/modernlavani.jpg"
            alt="Lavani dancer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">Lavani</h1>
              <p className="text-lg sm:text-xl text-white/80 font-serif mb-4">The Dance of Rhythm & Social Voice</p>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A powerful folk dance form from Maharashtra known for its sensuous movements, dramatic intensity, and
                fearless social commentary expressed through rhythmic movement and evocative song.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">Folk Tradition & Social Commentary</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Lavani originated in Maharashtra as a folk dance performed primarily by lower-caste communities at
                  festivals and celebrations. The form emerged as a powerful voice for the marginalized, expressing
                  social issues through song and dance.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Traditionally performed in groups, Lavani dancers used rhythmic movements and clever lyrics to comment
                  on social injustice, political oppression, and romantic themes in a way that bypassed censorship.
                </p>
              </div>
              <img
                src="/lavanifestival.jpeg"
                alt="Lavani Festival"
                className="rounded-xl w-full object-cover border border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="/modernlavani.jpg"
                alt="Modern Lavani"
                className="rounded-xl w-full object-cover border border-border"
              />
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-3">Contemporary Revival</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  After periods of suppression and marginalization, Lavani experienced a revival in the 20th century as
                  artists recognized its power as a tool for social activism and cultural expression.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Lavani continues to be performed in theaters and on concert stages, maintaining its role as a
                  voice for the voiceless while gaining recognition as an important part of Indian folk culture.
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
                <h3 className="text-2xl font-serif font-semibold mb-3">The Voice of the Voiceless</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lavani embodies the philosophy of using art as social commentary and political resistance. It
                  celebrates the power of marginalized communities to express their realities, their struggles, and
                  their defiance through movement and song.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Core Philosophies</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <strong>Social Resistance:</strong> Art as tool for change
                    </li>
                    <li>
                      <strong>Sensual Power:</strong> Embodied expression of autonomy
                    </li>
                    <li>
                      <strong>Truth Telling:</strong> Fearless speech through movement
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">Fearless Expression</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Lavani celebrates sensuality without apology and expresses dissent without restraint. It affirms the
                    right of performers to own their bodies, their voices, and their stories—a profound political act.
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
              Lavani's technique combines rhythmic hip movements, expressive hand gestures, and dramatic facial
              expressions. The form emphasizes the power of the female body as an instrument of artistic expression and
              social commentary.
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
              <h3 className="text-2xl font-serif font-semibold mb-3">Uninhibited Power</h3>
              <p className="text-muted-foreground leading-relaxed">
                Lavani's defining characteristic is its uninhibited power and fearless sensuality. The dance celebrates
                the body as a site of agency, resistance, and artistic expression, making each movement a statement of
                autonomy and power.
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
                <h3 className="text-2xl font-serif font-semibold mb-2">Voice of Social Justice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lavani stands as a powerful tool for social activism and political commentary, giving voice to
                  marginalized communities and addressing issues of caste, class, and gender discrimination through
                  artistic expression.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/70">
                <h3 className="text-2xl font-serif font-semibold mb-2">Female Empowerment & Autonomy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lavani celebrates female performers and their right to control their narratives. It affirms women's
                  agency, sensuality, and intellectual power—making it a symbol of feminist resistance and
                  self-determination.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/60">
                <h3 className="text-2xl font-serif font-semibold mb-2">Maharashtra Cultural Pride</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lavani represents the artistic and cultural identity of Maharashtra, showcasing the region's tradition
                  of bold artistic expression and social consciousness within Indian classical and folk traditions.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border-l-4 border-primary/50">
                <h3 className="text-2xl font-serif font-semibold mb-2">Art as Resistance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lavani demonstrates the power of artistic expression to challenge oppression, speak truth to power,
                  and inspire social change—making it a significant form of cultural and political resistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/40">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-serif mb-4 text-muted-foreground">
              Lavani is where the body becomes a voice—a fearless, sensual, powerful expression of resistance, truth,
              and the indomitable spirit of communities claiming their right to be heard.
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

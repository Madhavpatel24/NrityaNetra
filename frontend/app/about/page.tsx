import { Navbar } from "@/components/navbar"
import { BackHomeButton } from "@/components/back-home-button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="pt-16">
      <Navbar />

      <section className="relative min-h-96 bg-gradient-to-b from-primary/10 to-background py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <BackHomeButton />
          <h1 className="font-serif text-4xl text-foreground mt-6 mb-4">About MudraNet</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Bridging ancient tradition with modern AI to preserve and celebrate the language of Indian classical dance.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-5xl mx-auto space-y-12">
        {/* Mission */}
        <Card className="p-8 bg-muted/30 border-primary/30">
          <h2 className="font-serif text-3xl text-foreground mb-4">Our Mission</h2>
          <p className="text-foreground leading-relaxed">
            MudraNet is dedicated to democratizing access to Indian classical dance knowledge through cutting-edge
            artificial intelligence and cultural preservation. We believe that mudras—the sacred hand and body
            gestures—are the universal language of dance, and every person should have the opportunity to understand and
            appreciate their deep meanings.
          </p>
        </Card>

        {/* How AI Works */}
        <Card className="p-8 bg-muted/30 border-accent/30">
          <h2 className="font-serif text-3xl text-foreground mb-4">How Our AI Recognition Works</h2>
          <div className="space-y-4 text-foreground">
            <p>
              Our mudra recognition system uses advanced deep learning models trained on thousands of authentic mudra
              poses from Bharatanatyam, Odissi, Kuchipudi, Manipuri, and Kathak traditions.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-accent mb-1">Image Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  The system analyzes hand position, finger arrangement, hand angles, and any accompanying body
                  movements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-1">Pattern Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Compares input against trained patterns to identify the mudra and determine confidence level.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-1">Contextual Results</h3>
                <p className="text-sm text-muted-foreground">
                  Provides the mudra name, meaning, cultural significance, and related mudras to learn about next.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dance Forms */}
        <div>
          <h2 className="font-serif text-3xl text-foreground mb-6">Classical Dance Forms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {["Bharatanatyam", "Odissi", "Kuchipudi", "Manipuri", "Kathak"].map((dance) => (
              <Card key={dance} className="p-4 bg-muted/50 text-center hover-glow">
                <p className="font-serif text-lg text-foreground">{dance}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {dance === "Bharatanatyam" && "Tamil Nadu"}
                  {dance === "Odissi" && "Odisha"}
                  {dance === "Kuchipudi" && "Andhra Pradesh"}
                  {dance === "Manipuri" && "Manipur"}
                  {dance === "Kathak" && "Uttar Pradesh"}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Cultural Credits */}
        <Card className="p-8 bg-accent/10 border-accent/50">
          <h2 className="font-serif text-3xl text-foreground mb-4">Cultural Credits</h2>
          <p className="text-foreground leading-relaxed mb-4">
            MudraNet honors the countless gurus, dancers, and scholars who have preserved these traditions through
            generations. We acknowledge the spiritual and cultural significance of every mudra and dance form.
          </p>
          <p className="text-sm text-muted-foreground">
            All mudra definitions and classifications are based on the Abhinaya Darpana (Mirror of Gesture),
            Hastalakshana Deepika, and validated by leading classical dance experts and institutions across India.
          </p>
        </Card>

        {/* Team */}
        <Card className="p-8 bg-muted/30">
          <h2 className="font-serif text-3xl text-foreground mb-4">About Our Team</h2>
          <p className="text-foreground leading-relaxed">
            We are a diverse team of computer scientists, classical dancers, cultural researchers, and heritage
            enthusiasts committed to making Indian classical arts accessible to the world. Our goal is to create
            technology that respects tradition while embracing innovation.
          </p>
        </Card>
      </section>

      <footer className="mt-16 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MudraNet — Preserving the Language of Dance
      </footer>
    </main>
  )
}

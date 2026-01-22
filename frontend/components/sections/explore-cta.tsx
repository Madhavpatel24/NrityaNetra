import Link from "next/link"

export function ExploreCta() {
  return (
    <section aria-labelledby="explore-title" className="max-w-5xl mx-auto">
      <div className="rounded-2xl p-6 md:p-8 glass-panel text-center hover-glow">
        <h2 id="explore-title" className="font-serif text-2xl md:text-3xl">
          Explore India’s Classical Dance Heritage
        </h2>
        <p className="mt-2 text-muted-foreground">Discover where each form originates across India’s states.</p>
        <Link
          href="/explore"
          className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 bg-accent text-foreground hover:opacity-90"
        >
          🌏 Explore India’s Classical Dance Heritage
        </Link>
      </div>
    </section>
  )
}

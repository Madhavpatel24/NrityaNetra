import Link from "next/link"

export function HistoryCard() {
  return (
    <section aria-labelledby="history-title" className="max-w-5xl mx-auto">
      <Link href="/history" className="block rounded-2xl glass-panel hover-glow p-6 md:p-8">
        <h2 id="history-title" className="font-serif text-2xl md:text-3xl">
          History of Indian Classical Dance
        </h2>
        <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
          Indian classical dance is a sacred language of movement and expression, rooted in centuries of devotion and
          storytelling.
        </p>
        <p className="mt-4 inline-flex items-center text-sm text-foreground">Learn more →</p>
      </Link>
    </section>
  )
}

import Link from "next/link"

export function MudraAiCta() {
  return (
    <section aria-labelledby="ai-title" className="max-w-5xl mx-auto">
      <div className="rounded-2xl p-6 md:p-8 glass-panel hover-glow text-center">
        <h2 id="ai-title" className="font-serif text-2xl md:text-3xl">
          Try Mudra Recognition
        </h2>
        <p className="mt-2 text-muted-foreground">
          Upload an image or use your webcam to recognize mudras in real time.
        </p>
        <Link
          href="/predict"
          className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-foreground hover:opacity-90"
        >
          🪷 Try Mudra Recognition
        </Link>
      </div>
    </section>
  )
}

export function MudrasInfo() {
  const items = [
    {
      title: "What are Mudras?",
      body: "Symbolic hand gestures conveying meaning, emotion, and narrative in dance.",
    },
    {
      title: "Why are they significant?",
      body: "They hold spiritual and cultural depth, connecting performer and tradition.",
    },
    {
      title: "Mudras and Emotions",
      body: "Each gesture channels a specific rasa, enriching expression and storytelling.",
    },
  ]
  return (
    <section id="mudras" aria-labelledby="mudras-title" className="max-w-6xl mx-auto">
      <h2 id="mudras-title" className="sr-only">
        Mudras
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl p-6 md:p-7 glass-panel hover-glow"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--color-muted), var(--color-primary) 10%), color-mix(in oklab, var(--color-muted), var(--color-accent) 8%))",
            }}
          >
            <h3 className="font-serif text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

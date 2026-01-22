"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const dances = [
  { name: "Bharatanatyam", image: "/bharatanatyam-dance-tamil-nadu.jpg" },
  { name: "Odissi", image: "/odissi-dance-odisha-classical.jpg" },
  { name: "Kuchipudi", image: "/kuchipudi-dance-andhra-pradesh.jpg" },
  { name: "Manipuri", image: "/manipuri-dance-manipur-classical.jpg" },
  { name: "Kathak", image: "/kathak-dance-hindi-classical.jpg" },
]

export function DanceCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current - 1 + dances.length) % dances.length)
  const next = () => setCurrent((current + 1) % dances.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="font-serif text-3xl text-center text-foreground mb-8">Classical Dance Forms of India</h2>
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={dances[current].image || "/placeholder.svg"}
          alt={dances[current].name}
          className="w-full h-96 object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="font-serif text-3xl">{dances[current].name}</p>
        </div>

        <Button
          onClick={prev}
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={next}
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {dances.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${idx === current ? "bg-primary w-6" : "bg-white/50 w-2"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

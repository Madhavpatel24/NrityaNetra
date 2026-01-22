"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const mudrasByCategory = {
  asamyuta: [
    {
      name: "Pataka",
      meaning: "Flag / Banner",
      usage: "Represents flags, leaves, movement",
      image: "/images/mudras/pataka.jpg",
    },
    {
      name: "Tripataka",
      meaning: "Three Fingers",
      usage: "Mountains, trees, waves",
      image: "/images/mudras/tripataka.jpg",
    },
    {
      name: "Ardhapataka",
      meaning: "Half Flag",
      usage: "Canopy, defense posture",
      image: "/images/mudras/ardhapataka.jpg",
    },
    {
      name: "Kartarimukha",
      meaning: "Scissors Mouth",
      usage: "Cutting, separating actions",
      image: "/images/mudras/kartarimukha.jpg",
    },
    {
      name: "Mayura",
      meaning: "Peacock",
      usage: "Peacock, strut of pride",
      image: "/images/mudras/mayura.jpg",
    },
    {
      name: "Ardhachandra",
      meaning: "Half Moon",
      usage: "Crescent, blessing gestures",
      image: "/images/mudras/ardhachandra.jpg",
    },
  ],
  samyuta: [
    {
      name: "Anjali",
      meaning: "Offering / Prayer",
      usage: "Salutation, respect, prayer",
      image: "/images/mudras/anjali.jpg",
    },
    {
      name: "Kapota",
      meaning: "Pigeon",
      usage: "Pigeon, wings spreading",
      image: "/images/mudras/kapota.jpg",
    },
    {
      name: "Kartari",
      meaning: "Scissor",
      usage: "Cutting, opening motions",
      image: "/images/mudras/kartari.jpg",
    },
    {
      name: "Swastika",
      meaning: "Auspicious",
      usage: "Auspicious gestures, blessings",
      image: "/images/mudras/swastika.jpg",
    },
    {
      name: "Pushpaputa",
      meaning: "Flower Offering",
      usage: "Holding flowers, offerings",
      image: "/images/mudras/pushpaputa.jpg",
    },
    {
      name: "Utsanga",
      meaning: "Embrace",
      usage: "Embracing, holding someone",
      image: "/images/mudras/utsanga.jpg",
    },
  ],
  head: [
    {
      name: "Shiro Bhedas",
      meaning: "Head Movements",
      usage: "Expression through head tilts",
      image: "/images/mudras/shirobhedas.jpg",
    },
    {
      name: "Alpatala",
      meaning: "Slight Tilt",
      usage: "Acceptance, mild disagreement",
      image: "/images/mudras/shirobhedas.jpg",
    },
    {
      name: "Shirogati",
      meaning: "Head Path",
      usage: "Tracing paths through space",
      image: "/images/mudras/shirobhedas.jpg",
    },
  ],
  eye: [
    {
      name: "Bhrukuti",
      meaning: "Frown",
      usage: "Anger, sorrow, displeasure",
      image: "/images/mudras/shirobhedas.jpg",
    },
    {
      name: "Anga Rasa",
      meaning: "Emotional Eye",
      usage: "Deep emotional expression",
      image: "/images/mudras/angarasa.jpg",
    },
    {
      name: "Drishti",
      meaning: "Gaze Direction",
      usage: "Directing focus and attention",
      image: "/images/mudras/shirobhedas.jpg",
    },
  ],
}

export default function LearnMudrasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("asamyuta")

  const filteredMudras =
    mudrasByCategory[activeTab]?.filter((mudra) =>
      mudra.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  return (
    <main className="pt-16">
      <Navbar />

      {/* ================= WHAT ARE MUDRAS SECTION ================= */}
      <section className="py-14 px-4 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div>
            <h1 className="font-serif text-4xl mb-4">What are Mudras?</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Mudras are symbolic hand gestures used in classical Indian dance to
              communicate meaning, emotion, devotion, and narrative.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Rooted in the <strong>Natyashastra</strong>, mudras form a visual
              language—where each finger placement, movement, and stillness
              conveys ideas beyond words.
            </p>
          </div>

          {/* VIDEO */}
          <div className="rounded-2xl overflow-hidden border shadow-sm bg-black">
            <video
            src="/videos/learn_mudras.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover "
            style={{ objectPosition: "center 35%" }}
          />

          </div>
        </div>
      </section>

      {/* ================= LEARN MUDRAS (UNCHANGED) ================= */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search mudras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="asamyuta">Asamyuta Hasta</TabsTrigger>
            <TabsTrigger value="samyuta">Samyuta Hasta</TabsTrigger>
            <TabsTrigger value="head">Head</TabsTrigger>
            <TabsTrigger value="eye">Eye</TabsTrigger>
          </TabsList>

          {Object.keys(mudrasByCategory).map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMudras.map((mudra, idx) => (
                  <Card key={idx} className="overflow-hidden hover-glow">
                    <img
                      src={mudra.image || "/placeholder.svg"}
                      alt={mudra.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-serif text-lg mb-1">{mudra.name}</h3>
                      <p className="text-sm text-accent font-semibold mb-2">
                        {mudra.meaning}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mudra.usage}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredMudras.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No mudras found matching "{searchTerm}"
            </p>
          </div>
        )}
      </section>

      <footer className="mt-16 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MudraNet
      </footer>
    </main>
  )
}

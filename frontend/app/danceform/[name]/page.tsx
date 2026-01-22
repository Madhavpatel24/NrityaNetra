"use client"

import type React from "react"
import BackHomeButton from "@/components/back-home-button"
import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"

const CONTENT: Record<
  string,
  {
    title: string
    banner?: string
    history: string
    significance: string
    mudras: string
    costume: string
  }
> = {
  bharatanatyam: {
    title: "Bharatanatyam",
    banner: "/placeholder.jpg",
    history:
      "Originating in Tamil Nadu, Bharatanatyam is among the oldest classical dance traditions, evolving from temple practices.",
    significance:
      "Known for geometric precision and expressive abhinaya, it conveys devotion and narrative with profound clarity.",
    mudras:
      "Common hasta mudras include Pataka, Tripataka, Ardhapataka, and more, each symbolizing specific ideas and emotions.",
    costume:
      "Silk costumes with pleated fan, jewelry like odiyanam and temple ornaments, accompanied by Carnatic music and mridangam.",
  },
  odissi: {
    title: "Odissi",
    banner: "/placeholder.jpg",
    history: "Odissi flourished in Odisha’s temples, with characteristic tribhangi posture and lyrical movement.",
    significance: "Celebrated for its grace and curves, Odissi emphasizes bhakti and lyrical storytelling.",
    mudras: "Mudras such as Katakamukha, Hamsasya, and Shikhara are frequently used to express narrative detail.",
    costume: "Traditional saree with silver jewelry and ghungroo, set to Odissi music traditions.",
  },
  kathak: {
    title: "Kathak",
    banner: "/placeholder.jpg",
    history: "Kathak developed in North India through storytelling bards (kathakars), later evolving in courts.",
    significance: "Famed for intricate footwork, spins (chakkars), and expressive storytelling.",
    mudras: "Hand gestures serve narrative clarity, often combined with fast rhythmic patterns and abhinaya.",
    costume: "Angarkhas or lehenga-cholis for women, churidar-kurtas for men, performed to Hindustani classical music.",
  },
}

function SectionFade({ children, keyId }: { children: React.ReactNode; keyId: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default function DanceFormPage({
  params,
}: {
  params: { name: string }
}) {
  const key = params.name.toLowerCase()
  const data = useMemo(() => CONTENT[key] ?? CONTENT["bharatanatyam"], [key])
  const [tab, setTab] = useState<"history" | "significance" | "mudras" | "costume">("history")

  return (
    <main className="px-4 py-28 md:py-32">
      <section className="max-w-5xl mx-auto">
        <div className="mb-4">
          <BackHomeButton />
        </div>

        <div className="rounded-2xl overflow-hidden">
          <div className="relative h-56 md:h-72">
            <img
              src={data.banner ?? "/placeholder.jpg"}
              alt={`${data.title} banner`}
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--color-primary), transparent 40%), color-mix(in oklab, var(--color-background), transparent 40%))",
              }}
              aria-hidden
            />
            <div className="relative z-10 h-full grid place-items-center">
              <h1 className="font-serif text-3xl md:text-4xl">{data.title}</h1>
            </div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mt-6">
          <TabsList className="grid grid-cols-4 w-full glass-panel">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="significance">Significance</TabsTrigger>
            <TabsTrigger value="mudras">Mudras</TabsTrigger>
            <TabsTrigger value="costume">Costume & Music</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-4">
            <SectionFade keyId="history">
              <div className="rounded-2xl glass-panel p-6">
                <p className="leading-relaxed">{data.history}</p>
              </div>
            </SectionFade>
          </TabsContent>

          <TabsContent value="significance" className="mt-4">
            <SectionFade keyId="significance">
              <div className="rounded-2xl glass-panel p-6">
                <p className="leading-relaxed">{data.significance}</p>
              </div>
            </SectionFade>
          </TabsContent>

          <TabsContent value="mudras" className="mt-4">
            <SectionFade keyId="mudras">
              <div className="rounded-2xl glass-panel p-6">
                <p className="leading-relaxed">{data.mudras}</p>
              </div>
            </SectionFade>
          </TabsContent>

          <TabsContent value="costume" className="mt-4">
            <SectionFade keyId="costume">
              <div className="rounded-2xl glass-panel p-6">
                <p className="leading-relaxed">{data.costume}</p>
              </div>
            </SectionFade>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

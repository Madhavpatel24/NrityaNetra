"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

const stateData = {
  TN: { name: "Tamil Nadu", dance: "Bharatanatyam", image: "/bharatanatyam.jpg" },
  OD: { name: "Odisha", dance: "Odissi", image: "/odissi.jpg" },
  AP: { name: "Andhra Pradesh", dance: "Kuchipudi", image: "/kuchipudi.jpg" },
  MN: { name: "Manipur", dance: "Manipuri", image: "/manipuri.jpg" },
  UP: { name: "Uttar Pradesh", dance: "Kathak", image: "/kathak.jpg" },
}

export function InteractiveMap() {
  const [hoveredState, setHoveredState] = useState(null)
  const [selectedDance, setSelectedDance] = useState(null)

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="font-serif text-3xl text-center text-foreground mb-8">Explore Dance Forms by Region</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Map preview */}
        <div className="md:col-span-2">
          <Card className="p-8 bg-muted/50">
            <p className="text-center text-muted-foreground mb-6">
              Hover or click on a state region (interactive map coming soon)
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(stateData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDance(data)}
                  onMouseEnter={() => setHoveredState(data.name)}
                  onMouseLeave={() => setHoveredState(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    hoveredState === data.name || selectedDance?.name === data.name
                      ? "bg-primary text-primary-foreground scale-105"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Dance preview */}
        <div>
          {selectedDance ? (
            <Card className="p-4 hover-glow">
              <img
                src={selectedDance.image || "/placeholder.svg"}
                alt={selectedDance.dance}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-serif text-xl text-foreground mb-2">{selectedDance.dance}</h3>
              <p className="text-sm text-muted-foreground">{selectedDance.name}</p>
            </Card>
          ) : (
            <Card className="p-4 h-full flex items-center justify-center bg-muted/30">
              <p className="text-center text-muted-foreground">Select a state to view its dance form</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

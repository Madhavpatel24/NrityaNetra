"use client"

import React, { useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

// dynamic import of the client-only map
const IndiaDanceMap = dynamic(() => import("@/components/india-dance-map"), { ssr: false })

// Dance data — keep in sync with your map STATE_TO_DANCE / DANCE_ROUTES
// Replace your existing DANCES array with this (keeps routes/images consistent)
const DANCES = [
  { name: "Kuchipudi", desc: "Graceful drama with theatrical lineage.", link: "/dancesofIndia/kuchipudi", image: "/images/dances/kuchipudi.jpg" },
  { name: "Ponung", desc: "Folk dance of Arunachal Pradesh, lively and rhythmic.", link: "/dancesofIndia/ponung", image: "/images/dances/ponung.jpg" },
  { name: "Sattriya", desc: "Classical dance of Assam with devotional roots.", link: "/dancesofIndia/sattriya", image: "/images/dances/sattriya.jpg" },
  { name: "Bidesia", desc: "Bihar's expressive folk-theatre dance tradition.", link: "/dancesofIndia/bidesia", image: "/images/dances/bidesia.jpg" },
  { name: "Panthi", desc: "Energetic tribal dance from Chhattisgarh.", link: "/dancesofIndia/panthi", image: "/images/dances/panthi.jpg" },
  { name: "Fugdi", desc: "Goan women's folk dance performed during festivals.", link: "/dancesofIndia/fugdi", image: "/images/dances/fugdi.jpg" },
  { name: "Garba", desc: "Vibrant circular dance from Gujarat, popular at Navratri.", link: "/dancesofIndia/garba", image: "/images/dances/garba.jpg" },
  { name: "Phag Dance", desc: "Haryana's seasonal celebration dance.", link: "/dancesofIndia/phag-dance", image: "/images/dances/phag-dance.jpg" },
  { name: "Nati", desc: "Traditional Himachali dance with group formations.", link: "/dancesofIndia/nati", image: "/images/dances/nati.jpg" },
  { name: "Paika", desc: "Martial folk dance from Jharkhand/Odisha region.", link: "/dancesofIndia/paika", image: "/images/dances/paika.jpg" },
  { name: "Yakshagana", desc: "Dramatic dance-theatre tradition from Karnataka.", link: "/dancesofIndia/yakshagana", image: "/images/dances/yakshagana.jpg" },
  { name: "Theyyam", desc: "Kerala's ritual dance with elaborate makeup and costuming.", link: "/dancesofIndia/theyyam", image: "/images/dances/theyyam.jpg" },
  { name: "Matki Dance", desc: "Madhya Pradesh folk dance involving balancing pots.", link: "/dancesofIndia/matki-dance", image: "/images/dances/matki-dance.jpg" },
  { name: "Lavani", desc: "Rhythmic, powerful dance of Maharashtra known for storytelling.", link: "/dancesofIndia/lavani", image: "/images/dances/lavani.jpg" },
  { name: "Manipuri", desc: "Soft, devotional classical dance from Manipur.", link: "/dancesofIndia/manipuri", image: "/images/dances/manipuri.jpg" },
  { name: "Wangala", desc: "Harvest dance of Meghalaya with tribal drums.", link: "/dancesofIndia/wangala", image: "/images/dances/wangala.jpg" },
  { name: "Cheraw", desc: "Mizo bamboo dance with quick footwork and rhythm.", link: "/dancesofIndia/cheraw", image: "/images/dances/cheraw.jpg" },
  { name: "Chang Lo", desc: "Festive dance of Nagaland for celebrations.", link: "/dancesofIndia/chang-lo", image: "/images/dances/chang-lo.jpg" },
  { name: "Odissi", desc: "Lyrical Odia classical form with tribhangi posture.", link: "/dancesofIndia/odissi", image: "/images/dances/odissi.jpg" },
  { name: "Bhangra", desc: "High-energy Punjabi harvest dance with booming beats.", link: "/dancesofIndia/bhangra", image: "/images/dances/bhangra.jpg" },
  { name: "Ghoomar", desc: "Rajasthani graceful twirling folk dance.", link: "/dancesofIndia/ghoomar", image: "/images/dances/ghoomar.jpg" },
  { name: "Mask Dance", desc: "Sikkimese masked dance traditions.", link: "/dancesofIndia/mask-dance", image: "/images/dances/mask-dance.jpg" },
  { name: "Bharatanatyam", desc: "Classical dance of Tamil Nadu emphasizing geometry & abhinaya.", link: "/dancesofIndia/bharatanatyam", image: "/images/dances/bharatanatyam.jpg" },
  { name: "Perini Shivatandavam", desc: "Ancient warrior dance form from Telangana.", link: "/dancesofIndia/perini-shivatandavam", image: "/images/dances/perini-shivatandavam.jpg" },
  { name: "Hojagiri", desc: "Tripura's graceful balancing dance on earthen pitchers.", link: "/dancesofIndia/hojagiri", image: "/images/dances/hojagiri.jpg" },
  { name: "Charkula", desc: "Uttar Pradesh's balancing lamp dance tradition.", link: "/dancesofIndia/charkula", image: "/images/dances/charkula.jpg" },
  { name: "Chholiya", desc: "Uttarakhand martial dance with swords and shields.", link: "/dancesofIndia/chholiya", image: "/images/dances/chholiya.jpg" },
  { name: "Kathak", desc: "North Indian classical dance famous for spins and footwork.", link: "/dancesofIndia/kathak", image: "/images/dances/kathak.jpg" },
  { name: "Gaudiya Nritya", desc: "Bengali classical dance tradition.", link: "/dancesofIndia/gaudiya-nritya", image: "/images/dances/gaudiya-nritya.jpg" },
  { name: "Rouf", desc: "Kashmiri folk dance, often performed at weddings.", link: "/dancesofIndia/rouf", image: "/images/dances/rouf.jpg" },
  { name: "Lava", desc: "Dance tradition from Lakshadweep islands.", link: "/dancesofIndia/lava", image: "/images/dances/lava.jpg" },
  { name: "Nicobari", desc: "Traditional dances of the Andaman & Nicobar Islands.", link: "/dancesofIndia/nicobari", image: "/images/dances/nicobari.jpg" },
]


export default function ExplorePage() {
  const [tab, setTab] = useState<"map" | "list">("map")
  const [query, setQuery] = useState("")

  const dancesFiltered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DANCES
    return DANCES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <main className="min-h-screen pt-20 pb-16 bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        {/* Page header */}
        <header className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="font-serif text-4xl md:text-5xl">Explore Indian Dance</h1>
          <p className="text-muted-foreground mt-2">
            Browse by region on the interactive map, or search for a dance by name.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="text-sm text-muted-foreground">Choose view:</div>

            {/* Tab buttons */}
            <div className="inline-flex rounded-full bg-card p-1 border border-border">
              <button
                onClick={() => setTab("map")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  tab === "map"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-foreground/5"
                }`}
                aria-pressed={tab === "map"}
              >
                Explore India
              </button>

              <button
                onClick={() => setTab("list")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  tab === "list"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-foreground/5"
                }`}
                aria-pressed={tab === "list"}
              >
                Search by Dance
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <section>
          {tab === "map" ? (
            // MAP VIEW
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-4">
                <div className="max-w-prose mx-auto text-center">
                  <h2 className="font-serif text-2xl">Interactive Map</h2>
                  <p className="text-sm text-muted-foreground">
                    Hover or click states to learn about the dance forms from each region.
                  </p>
                </div>
              </div>

              <div className="w-full h-[770px] rounded-lg overflow-hidden border border-border">
                <IndiaDanceMap />
              </div>
            </div>
          ) : (
            // LIST / SEARCH VIEW
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <label htmlFor="dance-search" className="sr-only">Search dances</label>
                  <input
                    id="dance-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by dance name or keyword (e.g. 'spin', 'devotional')"
                    className="w-full md:w-80 rounded-lg border border-border px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/predict" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold">
                    Try Mudra AI
                  </Link>
                  <a href="#list" onClick={() => setQuery("")} className="text-sm text-muted-foreground hover:text-foreground">Reset</a>
                </div>
              </div>

              <div id="list" className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dancesFiltered.map((d) => (
                  <Link
                    key={d.name}
                    href={d.link}
                    className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition"
                  >
                    <div className="w-full h-80 overflow-hidden">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/dances/placeholder.jpg" }}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-serif text-lg mb-1">{d.name}</h3>
                      <p className="text-sm text-muted-foreground">{d.desc}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-amber-700 font-semibold">Explore</span>
                        <ArrowRight className="w-4 h-4 text-amber-700" />
                      </div>
                    </div>
                  </Link>
                ))}

                {dancesFiltered.length === 0 && (
                  <div className="col-span-full py-16 text-center text-muted-foreground">
                    No dances match “{query}”. Try a different keyword.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

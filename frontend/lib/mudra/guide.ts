// Reference data for the mudra guide and the reliability badges.
//
// Tiers come from the model's accuracy on an independent test set (photos from
// a different source than the training data). "accuracy" is that percentage;
// null means the mudra is supported but was never measured independently.

export type Tier = "reliable" | "good" | "experimental"

export type GuideMudra = {
  name: string
  gloss: string
  tier: Tier
  accuracy: number | null
  image: string | null
}

export const TIERS: Record<Tier, { label: string; summary: string }> = {
  reliable: {
    label: "Reliable",
    summary: "Recognised correctly in about 70% or more of independent test photos.",
  },
  good: {
    label: "Good",
    summary: "Recognised correctly in roughly half to two-thirds of independent test photos.",
  },
  experimental: {
    label: "Experimental",
    summary:
      "Often confused with similar mudras, or not yet measured independently. Treat the result as a suggestion.",
  },
}

const img = (n: string) => `/images/mudra-guide/${n.toLowerCase()}.jpg`

// Ordered best-recognised first.
export const MUDRAS: GuideMudra[] = [
  { name: "Kartarimukha", gloss: "Scissors face", tier: "reliable", accuracy: 87, image: img("Kartarimukha") },
  { name: "Mayura", gloss: "Peacock", tier: "reliable", accuracy: 80, image: img("Mayura") },
  { name: "Trishula", gloss: "Trident", tier: "reliable", accuracy: 79, image: img("Trishula") },
  { name: "Mukula", gloss: "Bud", tier: "reliable", accuracy: 77, image: img("Mukula") },
  { name: "Ardhachandra", gloss: "Half-moon", tier: "reliable", accuracy: 74, image: img("Ardhachandra") },
  { name: "Arala", gloss: "Bent, curved", tier: "reliable", accuracy: 73, image: img("Arala") },
  { name: "Shukatunda", gloss: "Parrot's beak", tier: "reliable", accuracy: 72, image: img("Shukatunda") },
  { name: "Simhamukha", gloss: "Lion face", tier: "reliable", accuracy: 70, image: img("Simhamukha") },
  { name: "Ardhapathaka", gloss: "Half flag", tier: "good", accuracy: 69, image: img("Ardhapathaka") },
  { name: "Shikhara", gloss: "Peak", tier: "good", accuracy: 66, image: img("Shikhara") },
  { name: "Mushti", gloss: "Fist", tier: "good", accuracy: 65, image: img("Mushti") },
  { name: "Kapittha", gloss: "Wood-apple", tier: "good", accuracy: 60, image: img("Kapittha") },
  { name: "Pathaka", gloss: "Flag", tier: "good", accuracy: 55, image: img("Pathaka") },
  { name: "Chandrakala", gloss: "Crescent moon", tier: "good", accuracy: 52, image: img("Chandrakala") },
  { name: "Suchi", gloss: "Needle", tier: "experimental", accuracy: 43, image: img("Suchi") },
  { name: "Tripathaka", gloss: "Three-part flag", tier: "experimental", accuracy: 42, image: img("Tripathaka") },
  { name: "Tamrachuda", gloss: "Rooster", tier: "experimental", accuracy: 39, image: img("Tamrachuda") },
  { name: "Hamsasya", gloss: "Swan face", tier: "experimental", accuracy: 38, image: img("Hamsasya") },
  { name: "Sarpashirsha", gloss: "Snake head", tier: "experimental", accuracy: 36, image: img("Sarpashirsha") },
  { name: "Alapadma", gloss: "Full-bloomed lotus", tier: "experimental", accuracy: null, image: img("Alapadma") },
  { name: "Samdamsha", gloss: "Pincers", tier: "experimental", accuracy: null, image: null },
]

export function tierOf(label: string | null | undefined): Tier | null {
  if (!label) return null
  return MUDRAS.find((m) => m.name === label)?.tier ?? null
}

export function mudraOf(label: string | null | undefined): GuideMudra | null {
  if (!label) return null
  return MUDRAS.find((m) => m.name === label) ?? null
}

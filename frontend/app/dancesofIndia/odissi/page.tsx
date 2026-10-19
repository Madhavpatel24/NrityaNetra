import { DancePage } from "@/components/dance/dance-page"
import { DANCES } from "@/lib/dances/data"

export const metadata = { title: "Odissi | NrityaNetra" }

export default function Page() {
  return <DancePage dance={DANCES["odissi"]} />
}

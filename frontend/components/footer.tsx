import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer
      style={{ backgroundColor: "var(--footer)", color: "var(--footer-foreground)" }}
      className="mt-16 border-t border-border text-sm"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-between">
          <div className="max-w-sm">
            <h2 className="font-serif text-xl">NrityaNetra</h2>
            <p className="mt-2 opacity-90 leading-relaxed">
              Discover the language of Indian Classical Dance—mudras, abhinaya, rhythm, and heritage—brought to life
              with thoughtful design and AI exploration.
            </p>
          </div>

          <nav className="grid grid-cols-2 md:grid-cols-3 gap-6 min-w-[260px]" aria-label="Footer navigation">
            <div>
              <h3 className="font-serif text-base">Explore</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/" className="underline-offset-4 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="underline-offset-4 hover:underline">
                    History
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="underline-offset-4 hover:underline">
                    Explore India
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-base">Experience</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/predict" className="underline-offset-4 hover:underline">
                    Mudra AI
                  </Link>
                </li>
                <li>
                  <Link href="/danceform/bharatanatyam" className="underline-offset-4 hover:underline">
                    Bharatanatyam
                  </Link>
                </li>
                <li>
                  <Link href="/danceform/kathak" className="underline-offset-4 hover:underline">
                    Kathak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-base">Project</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="underline-offset-4 hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="underline-offset-4 hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="underline-offset-4 hover:underline">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
          <p className="opacity-80">&copy; {new Date().getFullYear()} NrityaNetra. All rights reserved.</p>
          <a href="#" className="underline-offset-4 hover:underline">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

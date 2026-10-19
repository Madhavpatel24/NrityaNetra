import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins, Noto_Serif_Devanagari } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteFooter from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "NrityaNetra — Dance Vision",
  description: "Discover the language of Indian Classical Dance with AI.",
  generator: "v0.app",
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--font-deva",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${playfair.variable} ${devanagari.variable} antialiased`}
    >
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Suspense fallback={null}>{children}</Suspense>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteFooter from "@/components/footer"

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
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}

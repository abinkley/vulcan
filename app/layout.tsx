import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vulcan Cycling | Junior Cycling Team",
  description:
    "Official website of the Vulcan junior cycling team, developing the next generation of cycling champions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-black">
          {/* Background Image */}
          <div className="bg-image-container">
            <img
              src="/vulcan-bg.svg"
              alt="Vulcan Cycling Background"
              className="bg-image"
            />
          </div>

          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}



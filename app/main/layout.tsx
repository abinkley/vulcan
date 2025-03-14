import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20at%208.57.29%E2%80%AFPM-TYSoRXg4uWHJl0CEX2Z2k3GBgwvqNf.png"
          alt="Vulcan Cycling Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}


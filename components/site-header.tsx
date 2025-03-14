import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20at%208.57.29%E2%80%AFPM-TYSoRXg4uWHJl0CEX2Z2k3GBgwvqNf.png"
                alt="Vulcan Cycling Logo"
                width={50}
                height={50}
                className="mr-2"
              />
            </Link>
            <span className="text-white font-bold text-xl">VULCAN CYCLING</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link href="/results" className="text-white hover:text-pink-500 transition-colors">
              Results
            </Link>
            <Link href="/news" className="text-white hover:text-pink-500 transition-colors">
              News
            </Link>
            <Link href="/about" className="text-white hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>
          <Button
            variant="outline"
            className="hidden md:block border-pink-500 text-white hover:bg-pink-500 hover:text-white transition-colors"
          >
            Join the Team
          </Button>
          <Button variant="ghost" className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </nav>
      </div>
    </header>
  )
}


import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20at%208.57.29%E2%80%AFPM-TYSoRXg4uWHJl0CEX2Z2k3GBgwvqNf.png"
              alt="Vulcan Cycling Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-gray-400 mb-4">
              Developing the next generation of cycling champions through dedication, training, and passion.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-500">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-pink-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-400 hover:text-pink-500">
                  Results
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-pink-500">
                  News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-pink-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-pink-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500">
                  Join the Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500">
                  Training Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-pink-500">
                  Equipment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">123 Cycling Way</li>
              <li className="text-gray-400">San Francisco, CA 94103</li>
              <li className="text-gray-400">info@vulcancycling.com</li>
              <li className="text-gray-400">(555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-center">© {new Date().getFullYear()} Vulcan Cycling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Instagram, Facebook, Twitter } from "lucide-react"

export default function Home() {
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

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-13%20at%208.57.29%E2%80%AFPM-TYSoRXg4uWHJl0CEX2Z2k3GBgwvqNf.png"
                alt="Vulcan Cycling Logo"
                width={50}
                height={50}
                className="mr-2"
              />
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

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">FORGING CHAMPIONS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Developing the next generation of cycling talent with passion, dedication, and cutting-edge training.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Meet Our Team
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Race Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Riders */}
      <section className="relative z-10 bg-black/80 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">FEATURED RIDERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((rider) => (
              <div key={rider} className="bg-gray-900 rounded-lg overflow-hidden group">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={`/placeholder.svg?height=400&width=300`}
                    alt={`Rider ${rider}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">Rider Name</h3>
                  <p className="text-pink-500 mb-4">Junior Category</p>
                  <p className="text-gray-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.
                  </p>
                  <Link href="#" className="text-white hover:text-pink-500 inline-flex items-center">
                    View Profile <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              View All Riders
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">LATEST NEWS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((news) => (
              <div key={news} className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={`News ${news}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-pink-500 font-semibold">March 10, 2025</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">
                    Team Vulcan Dominates Regional Championships
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
                  </p>
                  <Link href="#" className="text-white hover:text-pink-500 inline-flex items-center">
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="relative z-10 bg-black/80 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">UPCOMING RACES</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3].map((race) => (
              <div
                key={race}
                className="bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div>
                  <span className="text-pink-500 font-semibold">March 20, 2025</span>
                  <h3 className="text-xl font-bold text-white mt-1">Junior Regional Cup - Stage {race}</h3>
                  <p className="text-gray-400">San Francisco, CA</p>
                </div>
                <Button className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white">Race Details</Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Full Race Calendar
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 bg-pink-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">JOIN OUR NEWSLETTER</h2>
            <p className="text-white/80 mb-8">
              Stay updated with the latest news, race results, and team announcements.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md focus:outline-none"
              />
              <Button className="bg-black hover:bg-gray-800 text-white">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <p className="text-gray-500 text-center">
              © {new Date().getFullYear()} Vulcan Cycling. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

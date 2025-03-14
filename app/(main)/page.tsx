import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <>
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
    </>
  )
}


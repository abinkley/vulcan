import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="TEAM NEWS"
        description="Stay updated with the latest news, events, and achievements from Team Vulcan"
      />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {/* Featured News */}
            <div className="bg-gray-900/70 rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Featured News"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-sm text-pink-500 font-semibold">March 15, 2025</span>
                  <h2 className="text-2xl font-bold text-white mt-2 mb-4">
                    Team Vulcan Secures Major Sponsorship for 2025 Season
                  </h2>
                  <p className="text-gray-400 mb-6">
                    We are thrilled to announce a major new partnership that will provide our junior riders with
                    state-of-the-art equipment and expanded racing opportunities throughout the upcoming season.
                  </p>
                  <Button className="self-start bg-pink-500 hover:bg-pink-600 text-white">Read Full Story</Button>
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((news) => (
                <div key={news} className="bg-gray-900/70 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={`/placeholder.svg?height=200&width=400`}
                      alt={`News ${news}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-pink-500 font-semibold">March ${10 - news}, 2025</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">Team Vulcan News Update</h3>
                    <p className="text-gray-400 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra
                      augue.
                    </p>
                    <Link href="#" className="text-white hover:text-pink-500 inline-flex items-center">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                  Previous
                </Button>
                <Button variant="outline" className="border-pink-500 bg-pink-500 text-white">
                  1
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                  2
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                  3
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


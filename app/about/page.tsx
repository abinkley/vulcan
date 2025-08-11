import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      <PageHeader title="ABOUT VULCAN CYCLING" description="Developing the next generation of cycling champions" />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mission" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-900">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="history">Our History</TabsTrigger>
                <TabsTrigger value="coaches">Our Coaches</TabsTrigger>
                <TabsTrigger value="sponsors">Our Sponsors</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="mission" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Developing Champions</h2>
                  <p className="text-gray-300 mb-4">
                    At Vulcan Cycling, our mission is to develop the next generation of cycling champions through a
                    comprehensive program that focuses on skill development, physical training, and mental preparation.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We believe that every young rider has the potential to excel in the sport of cycling, and we are
                    committed to providing the resources, guidance, and opportunities necessary for them to reach their
                    full potential.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our program is designed to nurture talent from the grassroots level, providing a clear pathway for
                    progression from beginner to elite junior cyclist. We emphasize not only competitive success but
                    also the development of character, sportsmanship, and a lifelong love for cycling.
                  </p>
                  <div className="mt-8">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">Join Our Team</Button>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Vulcan Cycling Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-gray-900/70 p-8 rounded-lg text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
                  <p className="text-gray-400">
                    We strive for excellence in everything we do, from training and competition to personal development
                    and team support.
                  </p>
                </div>
                <div className="bg-gray-900/70 p-8 rounded-lg text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                  <p className="text-gray-400">
                    We foster a supportive community where riders can grow, learn, and achieve their goals together as a
                    team.
                  </p>
                </div>
                <div className="bg-gray-900/70 p-8 rounded-lg text-center">
                  <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
                  <p className="text-gray-400">
                    We uphold the highest standards of sportsmanship, fair play, and ethical conduct in all aspects of
                    our program.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <div className="bg-gray-900/70 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-white mb-6">Our Journey</h2>
                <div className="space-y-12">
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className="text-3xl font-bold text-pink-500">2018</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold text-white mb-2">The Beginning</h3>
                      <p className="text-gray-300">
                        Vulcan Cycling was founded by a group of passionate cycling coaches and former professional
                        riders who saw the need for a dedicated junior development program in the region.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className="text-3xl font-bold text-pink-500">2020</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold text-white mb-2">First Major Success</h3>
                      <p className="text-gray-300">
                        Our team achieved its first major success with multiple podium finishes at the Regional
                        Championships, establishing Vulcan as a rising force in junior cycling.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className="text-3xl font-bold text-pink-500">2022</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold text-white mb-2">National Recognition</h3>
                      <p className="text-gray-300">
                        Vulcan Cycling gained national recognition when two of our riders were selected for the National
                        Junior Team, representing the country in international competitions.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className="text-3xl font-bold text-pink-500">2024</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold text-white mb-2">Expansion</h3>
                      <p className="text-gray-300">
                        With growing success and increased support, we expanded our program to include more riders and
                        added specialized coaching for different cycling disciplines.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div className="md:col-span-1">
                      <div className="text-3xl font-bold text-pink-500">Today</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold text-white mb-2">Looking Forward</h3>
                      <p className="text-gray-300">
                        Today, Vulcan Cycling stands as one of the premier junior cycling development programs, with a
                        proven track record of developing talented riders and preparing them for successful careers in
                        the sport.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="coaches" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((coach) => (
                  <div key={coach} className="bg-gray-900/70 rounded-lg overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={`/placeholder.svg?height=400&width=400`}
                        alt={`Coach ${coach}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">Coach Name</h3>
                      <p className="text-pink-500 mb-4">Head Coach / Technical Director</p>
                      <p className="text-gray-400 mb-4">
                        Former professional cyclist with over 15 years of racing experience and 10 years of coaching.
                        Specializes in developing young talent and race strategy.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sponsors" className="space-y-8">
              <div className="bg-gray-900/70 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Valued Sponsors</h2>
                <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                  We are grateful for the support of our sponsors who make it possible for us to provide our riders with
                  the resources they need to succeed.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
                    <div key={sponsor} className="bg-black/50 p-8 rounded-lg flex items-center justify-center">
                      <Image
                        src={`/placeholder.svg?height=80&width=160`}
                        alt={`Sponsor ${sponsor}`}
                        width={160}
                        height={80}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">Become a Sponsor</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}


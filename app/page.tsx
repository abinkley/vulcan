"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface Rider {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
}

export default function Home() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setRiders([
          { id: '1', name: 'Rider Name', category: 'Junior Category', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.', image: '/placeholder.svg' },
          { id: '2', name: 'Rider Name', category: 'Junior Category', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.', image: '/placeholder.svg' },
          { id: '3', name: 'Rider Name', category: 'Junior Category', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.', image: '/placeholder.svg' }
        ]);
        
        setNews([
          { id: '1', title: 'Team Vulcan Dominates Regional Championships', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.', date: 'March 10, 2025', image: '/placeholder.svg' },
          { id: '2', title: 'Team Vulcan Dominates Regional Championships', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.', date: 'March 10, 2025', image: '/placeholder.svg' },
          { id: '3', title: 'Team Vulcan Dominates Regional Championships', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.', date: 'March 10, 2025', image: '/placeholder.svg' }
        ]);
        
        setRaces([
          { id: '1', name: 'Junior Regional Cup - Stage 1', date: 'March 20, 2025', location: 'San Francisco, CA' },
          { id: '2', name: 'Junior Regional Cup - Stage 2', date: 'March 20, 2025', location: 'San Francisco, CA' },
          { id: '3', name: 'Junior Regional Cup - Stage 3', date: 'March 20, 2025', location: 'San Francisco, CA' }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">FORGING CHAMPIONS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Junior cycling in New Jersey and New York
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
          {loading ? (
            <div className="text-center text-white">Loading riders...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {riders.map((rider) => (
                <div key={rider.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={rider.image}
                      alt={rider.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{rider.name}</h3>
                    <p className="text-pink-500 mb-4">{rider.category}</p>
                    <p className="text-gray-400 mb-4">{rider.description}</p>
                    <Link href="#" className="text-white hover:text-pink-500 inline-flex items-center">
                      View Profile <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          {loading ? (
            <div className="text-center text-white">Loading news...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-pink-500 font-semibold">{item.date}</span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.content}</p>
                    <Link href="#" className="text-white hover:text-pink-500 inline-flex items-center">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          {loading ? (
            <div className="text-center text-white">Loading races...</div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {races.map((race) => (
                <div
                  key={race.id}
                  className="bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between"
                >
                  <div>
                    <span className="text-pink-500 font-semibold">{race.date}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{race.name}</h3>
                    <p className="text-gray-400">{race.location}</p>
                  </div>
                  <Button className="mt-4 md:mt-0 bg-pink-500 hover:bg-pink-600 text-white">
                    Race Details
                  </Button>
                </div>
              ))}
            </div>
          )}
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
  );
}
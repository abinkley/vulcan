import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        title="RACE RESULTS"
        description="Track our team's performance in competitions throughout the season"
      />

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2025" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-900">
                <TabsTrigger value="2025">2025 Season</TabsTrigger>
                <TabsTrigger value="2024">2024 Season</TabsTrigger>
                <TabsTrigger value="2023">2023 Season</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="2025" className="space-y-8">
              <div className="bg-gray-900/70 rounded-lg overflow-hidden">
                <div className="p-4 bg-pink-500 text-white font-bold">Junior Regional Cup - March 2025</div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-white">Rider</th>
                          <th className="text-left py-3 px-4 text-white">Category</th>
                          <th className="text-left py-3 px-4 text-white">Position</th>
                          <th className="text-left py-3 px-4 text-white">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Alex Johnson</td>
                          <td className="py-3 px-4 text-gray-400">Junior Men</td>
                          <td className="py-3 px-4 text-white">1st</td>
                          <td className="py-3 px-4 text-gray-400">2:34:15</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Sarah Miller</td>
                          <td className="py-3 px-4 text-gray-400">Junior Women</td>
                          <td className="py-3 px-4 text-white">2nd</td>
                          <td className="py-3 px-4 text-gray-400">2:36:42</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-white">James Wilson</td>
                          <td className="py-3 px-4 text-gray-400">Junior Men</td>
                          <td className="py-3 px-4 text-white">5th</td>
                          <td className="py-3 px-4 text-gray-400">2:38:19</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/70 rounded-lg overflow-hidden">
                <div className="p-4 bg-pink-500 text-white font-bold">State Championships - February 2025</div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-white">Rider</th>
                          <th className="text-left py-3 px-4 text-white">Category</th>
                          <th className="text-left py-3 px-4 text-white">Position</th>
                          <th className="text-left py-3 px-4 text-white">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Sarah Miller</td>
                          <td className="py-3 px-4 text-gray-400">Junior Women</td>
                          <td className="py-3 px-4 text-white">1st</td>
                          <td className="py-3 px-4 text-gray-400">3:12:05</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Alex Johnson</td>
                          <td className="py-3 px-4 text-gray-400">Junior Men</td>
                          <td className="py-3 px-4 text-white">3rd</td>
                          <td className="py-3 px-4 text-gray-400">3:05:22</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-white">Emma Davis</td>
                          <td className="py-3 px-4 text-gray-400">Junior Women</td>
                          <td className="py-3 px-4 text-white">4th</td>
                          <td className="py-3 px-4 text-gray-400">3:15:47</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="2024" className="space-y-8">
              <div className="bg-gray-900/70 rounded-lg overflow-hidden">
                <div className="p-4 bg-pink-500 text-white font-bold">National Championships - October 2024</div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-white">Rider</th>
                          <th className="text-left py-3 px-4 text-white">Category</th>
                          <th className="text-left py-3 px-4 text-white">Position</th>
                          <th className="text-left py-3 px-4 text-white">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Alex Johnson</td>
                          <td className="py-3 px-4 text-gray-400">Junior Men</td>
                          <td className="py-3 px-4 text-white">2nd</td>
                          <td className="py-3 px-4 text-gray-400">4:12:33</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-white">Sarah Miller</td>
                          <td className="py-3 px-4 text-gray-400">Junior Women</td>
                          <td className="py-3 px-4 text-white">3rd</td>
                          <td className="py-3 px-4 text-gray-400">4:25:18</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="2023" className="space-y-8">
              <div className="bg-gray-900/70 rounded-lg overflow-hidden">
                <div className="p-4 bg-pink-500 text-white font-bold">Regional Series - 2023 Season</div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-white">Rider</th>
                          <th className="text-left py-3 px-4 text-white">Category</th>
                          <th className="text-left py-3 px-4 text-white">Overall Position</th>
                          <th className="text-left py-3 px-4 text-white">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">James Wilson</td>
                          <td className="py-3 px-4 text-gray-400">Junior Men</td>
                          <td className="py-3 px-4 text-white">1st</td>
                          <td className="py-3 px-4 text-gray-400">245</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 px-4 text-white">Emma Davis</td>
                          <td className="py-3 px-4 text-gray-400">Junior Women</td>
                          <td className="py-3 px-4 text-white">2nd</td>
                          <td className="py-3 px-4 text-gray-400">232</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">Download Complete Results</Button>
          </div>
        </div>
      </section>
    </>
  )
}


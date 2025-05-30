"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Users, MessageSquare, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EmbedScript } from "@/components/embed-script"

// Mock data - in a real app this would come from your API
const mockData = {
  npsScore: 42,
  totalResponses: 1247,
  responseRate: 23.5,
  trend: "+5.2",
  recentResponses: [
    {
      id: 1,
      score: 9,
      feedback: "Great product, love the new features!",
      timestamp: "2024-01-15T10:30:00Z",
      url: "/dashboard",
    },
    {
      id: 2,
      score: 7,
      feedback: "Good overall, but could improve loading speed",
      timestamp: "2024-01-15T09:15:00Z",
      url: "/pricing",
    },
    {
      id: 3,
      score: 10,
      feedback: "Excellent customer service and easy to use",
      timestamp: "2024-01-15T08:45:00Z",
      url: "/",
    },
    {
      id: 4,
      score: 6,
      feedback: "It's okay, but missing some features I need",
      timestamp: "2024-01-14T16:20:00Z",
      url: "/features",
    },
    {
      id: 5,
      score: 8,
      feedback: "Pretty good, would recommend to others",
      timestamp: "2024-01-14T14:10:00Z",
      url: "/dashboard",
    },
  ],
  scoreDistribution: {
    promoters: 45, // 9-10
    passives: 32, // 7-8
    detractors: 23, // 0-6
  },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getScoreColor = (score: number) => {
    if (score <= 6) return "text-red-600 bg-red-50"
    if (score <= 8) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  const getScoreLabel = (score: number) => {
    if (score <= 6) return "Detractor"
    if (score <= 8) return "Passive"
    return "Promoter"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">NPSurvey</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">NPS Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor your customer satisfaction and feedback</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="responses">Responses</TabsTrigger>
              <TabsTrigger value="embed">Embed Code</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>NPS Score</CardDescription>
                    <CardTitle className="text-3xl font-bold text-blue-600">{mockData.npsScore}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {mockData.trend} from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Responses</CardDescription>
                    <CardTitle className="text-3xl font-bold">{mockData.totalResponses.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      This month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Response Rate</CardDescription>
                    <CardTitle className="text-3xl font-bold">{mockData.responseRate}%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={mockData.responseRate} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Feedback</CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      {mockData.recentResponses.filter((r) => r.feedback).length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      With comments
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Score Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Breakdown of promoters, passives, and detractors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Promoters (9-10)</span>
                      </div>
                      <span className="font-semibold">{mockData.scoreDistribution.promoters}%</span>
                    </div>
                    <Progress value={mockData.scoreDistribution.promoters} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span>Passives (7-8)</span>
                      </div>
                      <span className="font-semibold">{mockData.scoreDistribution.passives}%</span>
                    </div>
                    <Progress value={mockData.scoreDistribution.passives} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Detractors (0-6)</span>
                      </div>
                      <span className="font-semibold">{mockData.scoreDistribution.detractors}%</span>
                    </div>
                    <Progress value={mockData.scoreDistribution.detractors} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="responses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Responses</CardTitle>
                  <CardDescription>Latest NPS feedback from your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentResponses.map((response) => (
                      <div key={response.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className={getScoreColor(response.score)}>{response.score}</Badge>
                            <span className="text-sm font-medium">{getScoreLabel(response.score)}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(response.timestamp).toLocaleDateString()} at{" "}
                            {new Date(response.timestamp).toLocaleTimeString()}
                          </div>
                        </div>

                        {response.feedback && (
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">"{response.feedback}"</p>
                        )}

                        <div className="text-sm text-gray-500">
                          Page: <code className="bg-gray-100 px-1 rounded">{response.url}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="embed" className="space-y-6">
              <EmbedScript apiKey="sk_live_abc123def456ghi789" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

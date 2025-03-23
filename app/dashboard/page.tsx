"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Activity, Calendar, FileText, User } from "lucide-react"

const mockData = {
  predictions: [
    { date: "2024-01", count: 3 },
    { date: "2024-02", count: 5 },
    { date: "2024-03", count: 4 },
  ],
  recentPredictions: [
    {
      id: "1",
      date: "2024-03-15",
      disease: "Common Cold",
      risk: "low",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-03-10",
      disease: "Seasonal Allergies",
      risk: "moderate",
      status: "completed",
    },
  ],
}

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="font-medium">John Doe</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Total Predictions</h3>
            </div>
            <p className="text-3xl font-bold mt-2">12</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-medium">This Month</h3>
            </div>
            <p className="text-3xl font-bold mt-2">4</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Saved Reports</h3>
            </div>
            <p className="text-3xl font-bold mt-2">8</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Prediction Activity</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.predictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="predictions">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Predictions</h3>
              <div className="space-y-4">
                {mockData.recentPredictions.map((prediction) => (
                  <Card key={prediction.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{prediction.disease}</p>
                        <p className="text-sm text-muted-foreground">
                          {prediction.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            prediction.risk === "low"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {prediction.risk.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Saved Reports</h3>
              {/* Add saved reports content */}
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ASSETS } from '@/lib/constants'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  Share,
  Eye,
  Download,
  Filter
} from 'lucide-react'

// Mock analytics data
const overviewStats = [
  {
    title: 'Total Reach',
    value: 45678,
    change: '+12.5%',
    changeType: 'increase',
    icon: Eye
  },
  {
    title: 'Total Engagement',
    value: 3245,
    change: '+8.2%',
    changeType: 'increase',
    icon: Heart
  },
  {
    title: 'Total Shares',
    value: 892,
    change: '+15.3%',
    changeType: 'increase',
    icon: Share
  },
  {
    title: 'New Followers',
    value: 267,
    change: '+22.1%',
    changeType: 'increase',
    icon: Users
  }
]

const monthlyData = [
  { month: 'Jan', reach: 4000, engagement: 240, shares: 80 },
  { month: 'Feb', reach: 3000, engagement: 180, shares: 60 },
  { month: 'Mar', reach: 5000, engagement: 300, shares: 100 },
  { month: 'Apr', reach: 4500, engagement: 270, shares: 90 },
  { month: 'May', reach: 6000, engagement: 360, shares: 120 },
  { month: 'Jun', reach: 5500, engagement: 330, shares: 110 },
]

const platformData = [
  { name: 'Facebook', value: 45, color: '#1877F2' },
  { name: 'Instagram', value: 30, color: '#E4405F' },
  { name: 'LinkedIn', value: 25, color: '#0A66C2' }
]

const topPosts = [
  {
    id: 1,
    content: "Exciting updates coming to our platform! Stay tuned for major improvements to user experience.",
    platform: 'FACEBOOK',
    reach: 12500,
    engagement: 892,
    shares: 156,
    image: ASSETS.sampleImages[0]?.url,
    publishedAt: "2024-01-10T14:00:00Z"
  },
  {
    id: 2,
    content: "Team collaboration is the key to success in today's business environment.",
    platform: 'LINKEDIN',
    reach: 8900,
    engagement: 654,
    shares: 78,
    image: ASSETS.sampleImages[1]?.url,
    publishedAt: "2024-01-08T10:30:00Z"
  },
  {
    id: 3,
    content: "Behind the scenes of our latest project. Innovation never stops!",
    platform: 'INSTAGRAM',
    reach: 6700,
    engagement: 543,
    shares: 89,
    image: ASSETS.sampleImages[2]?.url,
    publishedAt: "2024-01-05T16:15:00Z"
  }
]

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'FACEBOOK': return 'bg-[#1877F2] text-white'
    case 'INSTAGRAM': return 'bg-[#E4405F] text-white'
    case 'LINKEDIN': return 'bg-[#0A66C2] text-white'
    default: return 'bg-gray-500 text-white'
  }
}

// Simple chart containers with loading states
const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="h-80 flex items-center justify-center">
    {children}
  </div>
)

const LineChartPlaceholder = () => (
  <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-500">Chart will be displayed here</p>
    </div>
  </div>
)

const PieChartPlaceholder = () => (
  <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
      <p className="text-sm text-gray-500">Chart will be displayed here</p>
    </div>
  </div>
)

export function AnalyticsContent() {
  const [dateRange, setDateRange] = useState('30')
  const [platform, setPlatform] = useState('all')

  const handleExportReport = () => {
    console.log('Exporting analytics report...')
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Track your social media performance and engagement
            </p>
          </div>
          <Button 
            onClick={handleExportReport}
            className="mt-4 sm:mt-0 bg-[#1A3C6E] hover:bg-[#1A3C6E]/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All platforms</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="card-shadow hover:card-shadow-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 animate-count-up">
                        {stat.value.toLocaleString()}
                      </p>
                      <p className={`text-sm mt-1 ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last period
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-[#1A3C6E]/10">
                      <Icon className="h-6 w-6 text-[#1A3C6E]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                Monthly Performance
              </CardTitle>
              <CardDescription>
                Track your reach, engagement, and shares over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <LineChartPlaceholder />
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                Platform Distribution
              </CardTitle>
              <CardDescription>
                Engagement distribution across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <PieChartPlaceholder />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Data Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Monthly Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {monthlyData.map((item) => (
                  <div key={item.month} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-blue-600">Reach: {item.reach.toLocaleString()}</span>
                      <span className="text-orange-600">Engagement: {item.engagement}</span>
                      <span className="text-green-600">Shares: {item.shares}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="w-6 h-6 relative mr-3">
                        <Image
                          src={ASSETS.logos[platform.name.toLowerCase() as keyof typeof ASSETS.logos]}
                          alt={platform.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <span className="font-bold text-lg">{platform.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Posts */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>
              Your best performing content from the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#1A3C6E] text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {post.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={post.image}
                        alt="Post image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlatformColor(post.platform)}`}>
                        {post.platform.toLowerCase()}
                      </span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-blue-600" />
                        <span className="font-medium">{post.reach.toLocaleString()}</span> reach
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-600" />
                        <span className="font-medium">{post.engagement.toLocaleString()}</span> engagement
                      </div>
                      <div className="flex items-center">
                        <Share className="h-4 w-4 mr-1 text-green-600" />
                        <span className="font-medium">{post.shares}</span> shares
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform-specific Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'Facebook', color: '#1877F2', followers: '2.4K', engagement: '4.2%', posts: 24 },
            { name: 'Instagram', color: '#E4405F', followers: '1.8K', engagement: '6.1%', posts: 18 },
            { name: 'LinkedIn', color: '#0A66C2', followers: '3.2K', engagement: '3.8%', posts: 15 }
          ].map((platform) => (
            <Card key={platform.name} className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-6 h-6 relative mr-2">
                    <Image
                      src={ASSETS.logos[platform.name.toLowerCase() as keyof typeof ASSETS.logos]}
                      alt={platform.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Followers</p>
                    <p className="text-2xl font-bold text-gray-900">{platform.followers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Engagement Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{platform.engagement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posts This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{platform.posts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

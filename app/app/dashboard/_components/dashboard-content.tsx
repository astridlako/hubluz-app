
'use client'

import { useSession } from 'next-auth/react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ASSETS } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import {
  PlusCircle,
  Calendar,
  BarChart3,
  Users,
  Heart,
  Share,
  Eye,
  TrendingUp,
  Clock
} from 'lucide-react'

// Mock data - in a real app, this would come from your API
const stats = [
  {
    title: 'Total Posts',
    value: 156,
    change: '+12%',
    icon: PlusCircle,
    color: 'text-blue-600'
  },
  {
    title: 'Scheduled',
    value: 24,
    change: '+8%',
    icon: Clock,
    color: 'text-orange-600'
  },
  {
    title: 'Total Reach',
    value: 12400,
    change: '+18%',
    icon: Eye,
    color: 'text-green-600'
  },
  {
    title: 'Engagement',
    value: 892,
    change: '+15%',
    icon: Heart,
    color: 'text-red-600'
  },
]

const recentPosts = [
  {
    id: 1,
    content: "Exciting updates coming to our platform! Stay tuned for major improvements to user experience.",
    platform: ['FACEBOOK', 'LINKEDIN'],
    scheduledAt: "2024-01-15T14:00:00Z",
    status: 'SCHEDULED',
    image: ASSETS.sampleImages[0]?.url
  },
  {
    id: 2,
    content: "Team collaboration is the key to success in today's business environment.",
    platform: ['INSTAGRAM', 'LINKEDIN'],
    scheduledAt: "2024-01-14T10:30:00Z",
    status: 'PUBLISHED',
    image: ASSETS.sampleImages[1]?.url
  },
  {
    id: 3,
    content: "Behind the scenes of our latest project. Innovation never stops!",
    platform: ['INSTAGRAM'],
    scheduledAt: "2024-01-13T16:15:00Z",
    status: 'PUBLISHED',
    image: ASSETS.sampleImages[2]?.url
  },
]

const quickActions = [
  {
    title: 'Create Post',
    description: 'Compose and schedule new content',
    href: '/composer',
    icon: PlusCircle,
    color: 'bg-[#1A3C6E] hover:bg-[#1A3C6E]/90'
  },
  {
    title: 'View Calendar',
    description: 'See your content schedule',
    href: '/calendar',
    icon: Calendar,
    color: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: 'Content Library',
    description: 'Browse saved content',
    href: '/library',
    icon: Users,
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    title: 'Analytics',
    description: 'View performance metrics',
    href: '/analytics',
    icon: BarChart3,
    color: 'bg-orange-600 hover:bg-orange-700'
  },
]

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'FACEBOOK': return 'bg-[#1877F2]'
    case 'INSTAGRAM': return 'bg-[#E4405F]'
    case 'LINKEDIN': return 'bg-[#0A66C2]'
    default: return 'bg-gray-500'
  }
}

export function DashboardContent() {
  const { data: session, status } = useSession() || {}

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A3C6E]"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your social media presence with powerful tools designed for growth.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
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
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-3 rounded-full ${action.color} text-white mb-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
            <Button variant="outline" asChild>
              <Link href="/calendar">View All</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
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
                      <p className="text-gray-900 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {post.platform.map((platform) => (
                            <span
                              key={platform}
                              className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getPlatformColor(platform)}`}
                            >
                              {platform.toLowerCase()}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.status === 'SCHEDULED' ? 'Scheduled' : 'Published'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Connections */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Platform Connections</CardTitle>
            <CardDescription>
              Connect your social media accounts to start publishing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Facebook', logo: ASSETS.logos.facebook, connected: true },
                { name: 'Instagram', logo: ASSETS.logos.instagram, connected: false },
                { name: 'LinkedIn', logo: ASSETS.logos.linkedin, connected: true },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 relative">
                      <Image
                        src={platform.logo}
                        alt={platform.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    platform.connected 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {platform.connected ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">Manage Connections</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

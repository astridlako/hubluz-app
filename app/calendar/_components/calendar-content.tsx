
'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ASSETS } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  Clock,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Filter
} from 'lucide-react'

// Mock scheduled posts data
const scheduledPosts = [
  {
    id: 1,
    title: "New Product Launch",
    content: "Exciting news! Our latest product is now available. Check it out and let us know what you think!",
    platforms: ['FACEBOOK', 'LINKEDIN'],
    scheduledAt: "2024-01-15T14:00:00Z",
    status: 'SCHEDULED',
    image: ASSETS.sampleImages[0]?.url
  },
  {
    id: 2,
    title: "Team Meeting Highlights",
    content: "Great insights from today's team meeting. Collaboration is key to our success!",
    platforms: ['INSTAGRAM', 'LINKEDIN'],
    scheduledAt: "2024-01-16T10:30:00Z", 
    status: 'SCHEDULED',
    image: ASSETS.sampleImages[1]?.url
  },
  {
    id: 3,
    title: "Weekly Update",
    content: "This week has been amazing! Here's what we've accomplished and what's coming next.",
    platforms: ['FACEBOOK', 'INSTAGRAM'],
    scheduledAt: "2024-01-17T16:15:00Z",
    status: 'SCHEDULED',
    image: ASSETS.sampleImages[2]?.url
  },
  {
    id: 4,
    title: "Industry Insights",
    content: "Sharing some valuable insights from the latest industry report. What are your thoughts?",
    platforms: ['LINKEDIN'],
    scheduledAt: "2024-01-18T09:00:00Z",
    status: 'SCHEDULED'
  },
  {
    id: 5,
    title: "Behind the Scenes",
    content: "Take a look behind the scenes of our latest project. Innovation in action!",
    platforms: ['INSTAGRAM'],
    scheduledAt: "2024-01-19T15:45:00Z",
    status: 'SCHEDULED',
    image: ASSETS.sampleImages[3]?.url
  },
]

function getPlatformColor(platform: string) {
  switch (platform) {
    case 'FACEBOOK': return 'bg-[#1877F2] text-white'
    case 'INSTAGRAM': return 'bg-[#E4405F] text-white'
    case 'LINKEDIN': return 'bg-[#0A66C2] text-white'
    default: return 'bg-gray-500 text-white'
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function CalendarContent() {
  const [viewType, setViewType] = useState('list')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const filteredPosts = scheduledPosts.filter(post => {
    if (filterPlatform === 'all') return true
    return post.platforms.includes(filterPlatform.toUpperCase())
  })

  const handleDeletePost = (postId: number) => {
    // TODO: Implement delete post API call
    console.log('Deleting post:', postId)
  }

  const handleEditPost = (postId: number) => {
    // TODO: Navigate to composer with post data
    console.log('Editing post:', postId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
            <p className="text-gray-600 mt-2">
              View and manage your scheduled social media posts
            </p>
          </div>
          <Button asChild className="mt-4 sm:mt-0 bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
            <Link href="/composer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={filterPlatform} onValueChange={setFilterPlatform}>
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
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewType === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewType('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewType === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewType('calendar')}
                >
                  Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewType === 'list' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Scheduled Posts ({filteredPosts.length})
              </h2>
            </div>
            
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="card-shadow hover:card-shadow-hover transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {post.image && (
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt="Post image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {post.title || 'Untitled Post'}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {post.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPost(post.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {formatDate(post.scheduledAt)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {post.platforms.map((platform) => (
                              <span
                                key={platform}
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getPlatformColor(platform)}`}
                              >
                                {platform.toLowerCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredPosts.length === 0 && (
                <Card className="card-shadow">
                  <CardContent className="p-12 text-center">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts scheduled</h3>
                    <p className="text-gray-600 mb-6">
                      {filterPlatform === 'all' 
                        ? "You don't have any posts scheduled yet." 
                        : `No posts scheduled for ${filterPlatform}.`
                      }
                    </p>
                    <Button asChild className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                      <Link href="/composer">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Your First Post
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Calendar View</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-base font-medium px-4">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Calendar view is coming soon. Use list view to manage your posts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're working on an interactive calendar view. For now, use the list view to manage your scheduled posts.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setViewType('list')}
              >
                Switch to List View
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

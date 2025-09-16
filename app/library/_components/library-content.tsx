
'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ASSETS } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import {
  FolderOpen,
  Search,
  Upload,
  Filter,
  Grid3X3,
  List,
  Heart,
  Download,
  Eye,
  Copy,
  FileText,
  Tag
} from 'lucide-react'

// Mock data for content library
const mediaItems = ASSETS.sampleImages.map((image, index) => ({
  id: index + 1,
  name: image.name,
  url: image.url,
  description: image.description,
  type: 'image',
  size: '2.4 MB',
  uploadDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  tags: ['business', 'professional', 'team'],
  usageCount: Math.floor(Math.random() * 50)
}))

const templates = [
  {
    id: 1,
    name: 'Product Announcement',
    content: '🎉 Exciting news! We\'re thrilled to announce our latest [PRODUCT NAME]. After months of development, we\'re ready to share this amazing innovation with you. What do you think? #ProductLaunch #Innovation',
    platforms: ['FACEBOOK', 'LINKEDIN'],
    tags: ['announcement', 'product', 'launch'],
    usageCount: 23,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    name: 'Team Appreciation',
    content: '👏 Huge shoutout to our amazing team! Their dedication and hard work continue to drive our success. We\'re grateful for each team member\'s unique contribution. #TeamWork #Appreciation #Success',
    platforms: ['LINKEDIN', 'INSTAGRAM'],
    tags: ['team', 'appreciation', 'culture'],
    usageCount: 18,
    createdAt: '2024-01-08T14:30:00Z'
  },
  {
    id: 3,
    name: 'Weekly Motivation',
    content: '💪 Monday motivation: "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill. Let\'s make this week count! #MondayMotivation #Success #Inspiration',
    platforms: ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN'],
    tags: ['motivation', 'quote', 'weekly'],
    usageCount: 31,
    createdAt: '2024-01-05T09:00:00Z'
  }
]

export function LibraryContent() {
  const [activeTab, setActiveTab] = useState<'media' | 'templates'>('media')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('all')

  const filteredMediaItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterTag === 'all' || item.tags.includes(filterTag)
    return matchesSearch && matchesFilter
  })

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterTag === 'all' || template.tags.includes(filterTag)
    return matchesSearch && matchesFilter
  })

  const handleUseTemplate = (templateId: number) => {
    // TODO: Navigate to composer with template data
    console.log('Using template:', templateId)
  }

  const handleDownloadMedia = (mediaId: number) => {
    // TODO: Implement media download
    console.log('Downloading media:', mediaId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
            <p className="text-gray-600 mt-2">
              Manage your media assets and reusable templates
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'media'
                ? 'bg-white text-[#1A3C6E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Media Assets
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'templates'
                ? 'bg-white text-[#1A3C6E] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Templates
          </button>
        </div>

        {/* Search and Filter */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterTag} onValueChange={setFilterTag}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All tags</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="motivation">Motivation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {activeTab === 'media' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Media Assets ({filteredMediaItems.length})
              </h2>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMediaItems.map((item) => (
                  <Card key={item.id} className="card-shadow hover:card-shadow-hover transition-all duration-200 group">
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <Image
                          src={item.url}
                          alt={item.description}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => handleDownloadMedia(item.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">
                          {item.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{item.size}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              +{item.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Used {item.usageCount} times</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMediaItems.map((item) => (
                  <Card key={item.id} className="card-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.url}
                            alt={item.description}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {item.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{item.size}</span>
                            <span>Used {item.usageCount} times</span>
                            <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadMedia(item.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredMediaItems.length === 0 && (
              <Card className="card-shadow">
                <CardContent className="p-12 text-center">
                  <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? 'No media matches your search.' : 'Upload your first media asset to get started.'}
                  </p>
                  <Button className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Media
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Templates ({filteredTemplates.length})
              </h2>
              <Button asChild className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                <Link href="/composer">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Template
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="card-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Used {template.usageCount} times • Created {new Date(template.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        onClick={() => handleUseTemplate(template.id)}
                        className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {template.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {template.platforms.map((platform) => (
                            <span
                              key={platform}
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                platform === 'FACEBOOK' ? 'bg-[#1877F2] text-white' :
                                platform === 'INSTAGRAM' ? 'bg-[#E4405F] text-white' :
                                platform === 'LINKEDIN' ? 'bg-[#0A66C2] text-white' :
                                'bg-gray-500 text-white'
                              }`}
                            >
                              {platform.toLowerCase()}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag) => (
                            <span key={tag} className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <Card className="card-shadow">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? 'No templates match your search.' : 'Create your first template to get started.'}
                  </p>
                  <Button asChild className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                    <Link href="/composer">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Template
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

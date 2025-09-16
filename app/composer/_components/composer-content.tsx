
'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PLATFORM_LIMITS, ASSETS } from '@/lib/constants'
import Image from 'next/image'
import {
  PlusCircle,
  Calendar,
  Image as ImageIcon,
  Hash,
  Send,
  Save,
  Clock,
  Zap
} from 'lucide-react'

type Platform = keyof typeof PLATFORM_LIMITS

export function ComposerContent() {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['FACEBOOK'])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return 0
    return Math.min(...selectedPlatforms.map(platform => PLATFORM_LIMITS[platform].maxLength))
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(selectedImage === imageUrl ? null : imageUrl)
  }

  const handleSaveAsDraft = async () => {
    // TODO: Implement save as draft API call
    console.log('Saving as draft...', {
      title,
      content,
      platforms: selectedPlatforms,
      scheduledDate,
      scheduledTime,
      hashtags: hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
      imageUrl: selectedImage
    })
  }

  const handleSchedulePost = async () => {
    // TODO: Implement schedule post API call
    console.log('Scheduling post...', {
      title,
      content,
      platforms: selectedPlatforms,
      scheduledDate,
      scheduledTime,
      hashtags: hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
      imageUrl: selectedImage
    })
  }

  const characterLimit = getCharacterLimit()
  const isOverLimit = content.length > characterLimit

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Post</h1>
          <p className="text-gray-600 mt-2">
            Compose and schedule content across your social media platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Composer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                  Select Platforms
                </CardTitle>
                <CardDescription>
                  Choose which platforms to post to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(PLATFORM_LIMITS).map(([platform, config]) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform as Platform)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPlatforms.includes(platform as Platform)
                          ? 'border-[#1A3C6E] bg-[#1A3C6E]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 relative">
                        <Image
                          src={ASSETS.logos[platform.toLowerCase() as keyof typeof ASSETS.logos]}
                          alt={config.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="font-medium text-sm">{config.name}</p>
                      <p className="text-xs text-gray-500">{config.maxLength} chars</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Input */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                  Post Content
                </CardTitle>
                <CardDescription>
                  {selectedPlatforms.length > 0 
                    ? `Character limit: ${characterLimit}`
                    : 'Select platforms to see character limit'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Post title (optional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                  />
                  <div className="relative">
                    <textarea
                      placeholder="What's happening?"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className={`w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1A3C6E] focus:border-transparent ${
                        isOverLimit ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <div className={`absolute bottom-3 right-3 text-sm ${
                      isOverLimit ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {content.length}{characterLimit > 0 && `/${characterLimit}`}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Hash className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Hashtags</span>
                  </div>
                  <Input
                    placeholder="hashtag1, hashtag2, hashtag3"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Selection */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                  Select Image
                </CardTitle>
                <CardDescription>
                  Choose an image from your library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {ASSETS.sampleImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(image.url)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === image.url
                          ? 'border-[#1A3C6E]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.description}
                        fill
                        className="object-cover"
                      />
                      {selectedImage === image.url && (
                        <div className="absolute inset-0 bg-[#1A3C6E]/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-[#1A3C6E] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                  Schedule Post
                </CardTitle>
                <CardDescription>
                  Set when to publish your post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time</label>
                    <Input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Post Preview */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How your post will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPlatforms.map(platform => (
                    <div key={platform} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 relative mr-2">
                          <Image
                            src={ASSETS.logos[platform.toLowerCase() as keyof typeof ASSETS.logos]}
                            alt={PLATFORM_LIMITS[platform].name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium text-sm">{PLATFORM_LIMITS[platform].name}</span>
                      </div>
                      
                      {selectedImage && (
                        <div className="relative aspect-video rounded mb-3 overflow-hidden bg-gray-100">
                          <Image
                            src={selectedImage}
                            alt="Post preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {title && (
                          <p className="font-semibold text-sm">{title}</p>
                        )}
                        <p className="text-sm">{content || 'Your post content will appear here...'}</p>
                        {hashtags && (
                          <p className="text-sm text-blue-600">
                            {hashtags.split(',').map(tag => `#${tag.trim()}`).join(' ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSaveAsDraft}
                variant="outline"
                className="w-full"
                disabled={!content.trim()}
              >
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              
              <Button
                onClick={handleSchedulePost}
                className="w-full bg-[#1A3C6E] hover:bg-[#1A3C6E]/90"
                disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
              >
                <Send className="mr-2 h-4 w-4" />
                {scheduledDate ? 'Schedule Post' : 'Post Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

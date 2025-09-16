
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ASSETS } from '@/lib/constants'
import Image from 'next/image'
import {
  Settings as SettingsIcon,
  User,
  Link as LinkIcon,
  Bell,
  Shield,
  CreditCard,
  Crown,
  Check,
  X
} from 'lucide-react'

export function SettingsContent() {
  const { data: session } = useSession() || {}
  const [activeTab, setActiveTab] = useState('profile')

  // Mock platform connection status
  const [platformConnections, setPlatformConnections] = useState([
    { name: 'Facebook', logo: ASSETS.logos.facebook, connected: true, lastSync: '2 hours ago' },
    { name: 'Instagram', logo: ASSETS.logos.instagram, connected: false, lastSync: 'Never' },
    { name: 'LinkedIn', logo: ASSETS.logos.linkedin, connected: true, lastSync: '1 hour ago' },
  ])

  const [profileData, setProfileData] = useState({
    firstName: session?.user?.firstName || '',
    lastName: session?.user?.lastName || '',
    email: session?.user?.email || '',
    companyName: (session?.user as any)?.companyName || ''
  })

  const toggleConnection = (platformName: string) => {
    setPlatformConnections(prev =>
      prev.map(platform =>
        platform.name === platformName
          ? { ...platform, connected: !platform.connected, lastSync: platform.connected ? 'Never' : 'Just now' }
          : platform
      )
    )
  }

  const handleSaveProfile = () => {
    console.log('Saving profile...', profileData)
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'connections', name: 'Connections', icon: LinkIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'subscription', name: 'Subscription', icon: Crown },
    { id: 'security', name: 'Security', icon: Shield },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account, connections, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-[#1A3C6E] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {tab.name}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Name</label>
                    <Input
                      value={profileData.companyName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'connections' && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LinkIcon className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                    Platform Connections
                  </CardTitle>
                  <CardDescription>
                    Manage your social media platform connections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformConnections.map((platform) => (
                      <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 relative">
                            <Image
                              src={platform.logo}
                              alt={platform.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{platform.name}</h3>
                            <p className="text-sm text-gray-600">
                              Last sync: {platform.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                            platform.connected 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {platform.connected ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Connected
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 mr-1" />
                                Disconnected
                              </>
                            )}
                          </div>
                          <Button
                            variant={platform.connected ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => toggleConnection(platform.name)}
                            className={platform.connected ? '' : 'bg-[#1A3C6E] hover:bg-[#1A3C6E]/90'}
                          >
                            {platform.connected ? 'Disconnect' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: 'Post Published', description: 'Get notified when your posts are published', enabled: true },
                      { name: 'Scheduling Reminders', description: 'Reminders about upcoming scheduled posts', enabled: true },
                      { name: 'Weekly Reports', description: 'Weekly analytics and performance reports', enabled: false },
                      { name: 'New Features', description: 'Updates about new features and improvements', enabled: true },
                    ].map((notification) => (
                      <div key={notification.name} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{notification.name}</h3>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <Button
                          variant={notification.enabled ? 'default' : 'outline'}
                          size="sm"
                          className={notification.enabled ? 'bg-[#1A3C6E] hover:bg-[#1A3C6E]/90' : ''}
                        >
                          {notification.enabled ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'subscription' && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                    Subscription & Billing
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription plan and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            {(session?.user as any)?.subscriptionTier === 'PAID' && (
                              <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                            )}
                            {(session?.user as any)?.subscriptionTier === 'PAID' ? 'Pro Plan' : 'Free Plan'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {(session?.user as any)?.subscriptionTier === 'PAID' 
                              ? 'All features unlocked • Unlimited posts'
                              : 'Limited to 1 platform • 10 posts per month'
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {(session?.user as any)?.subscriptionTier === 'PAID' ? '$29' : '$0'}
                          </p>
                          <p className="text-sm text-gray-600">per month</p>
                        </div>
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Free Plan</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            1 platform connection
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            10 posts per month
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Basic analytics
                          </li>
                          <li className="flex items-center">
                            <X className="h-4 w-4 text-red-600 mr-2" />
                            Advanced scheduling
                          </li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4 bg-[#1A3C6E]/5 border-[#1A3C6E]">
                        <h4 className="font-medium mb-3 flex items-center">
                          <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                          Pro Plan
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            All platform connections
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Unlimited posts
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Advanced analytics
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Priority support
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    {(session?.user as any)?.subscriptionTier === 'FREE' ? (
                      <Button className="w-full bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Pro - $29/month
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage Billing
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-[#1A3C6E]" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Current Password</label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button className="bg-[#1A3C6E] hover:bg-[#1A3C6E]/90">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-3">Account Activity</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Last login:</span>
                        <span className="text-gray-600">Today at 2:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account created:</span>
                        <span className="text-gray-600">January 1, 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ASSETS } from '@/lib/constants'
import {
  Home,
  PenTool,
  Calendar,
  FolderOpen,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Composer', href: '/composer', icon: PenTool },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Library', href: '/library', icon: FolderOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession() || {}

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center px-6 py-8">
        <div className="relative w-32 h-10">
          <Image
            src={ASSETS.logos.hubluz}
            alt="HUBLUZ"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-[#1A3C6E] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1A3C6E] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {session?.user?.firstName} {session?.user?.lastName}
              </p>
              <div className="flex items-center">
                {(session?.user as any)?.subscriptionTier === 'PAID' && (
                  <Crown className="h-3 w-3 text-yellow-500 mr-1" />
                )}
                <p className="text-xs text-gray-500">
                  {(session?.user as any)?.subscriptionTier === 'PAID' ? 'Pro Plan' : 'Free Plan'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:text-gray-900"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-40 flex',
          isMobileOpen ? 'block' : 'hidden'
        )}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <SidebarContent />
      </div>
    </>
  )
}

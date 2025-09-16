
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'HUBLUZ - Social Media Management Platform',
  description: 'Manage your Facebook, Instagram, and LinkedIn presence with HUBLUZ. Schedule posts, analyze performance, and grow your social media presence.',
  keywords: 'social media management, Facebook, Instagram, LinkedIn, post scheduling, analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} min-h-screen bg-gray-50 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

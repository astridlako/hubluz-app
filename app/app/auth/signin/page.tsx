
import { Metadata } from 'next'
import { SignInForm } from './_components/signin-form'
import Image from 'next/image'
import { ASSETS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign In - HUBLUZ',
  description: 'Sign in to your HUBLUZ social media management account',
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative w-48 h-16 mx-auto mb-8">
            <Image
              src={ASSETS.logos.hubluz}
              alt="HUBLUZ"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <SignInForm />
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/auth/signup" className="font-medium text-[#1A3C6E] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}


import { Metadata } from 'next'
import { SignUpForm } from './_components/signup-form'
import Image from 'next/image'
import { ASSETS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign Up - HUBLUZ',
  description: 'Create your HUBLUZ social media management account',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
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
          <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">Start managing your social media like a pro</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <SignUpForm />
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/auth/signin" className="font-medium text-[#1A3C6E] hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}

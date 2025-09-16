
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface User {
    id: string
    firstName: string
    lastName: string
    companyName?: string | null
    subscriptionTier: string
  }

  interface Session {
    user: {
      id: string
      email?: string | null
      firstName: string
      lastName: string
      companyName?: string | null
      subscriptionTier: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string
    lastName: string
    companyName?: string | null
    subscriptionTier: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          companyName: user.companyName,
          subscriptionTier: user.subscriptionTier,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.subscriptionTier = user.subscriptionTier
        token.companyName = user.companyName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.subscriptionTier = token.subscriptionTier
        session.user.companyName = token.companyName
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

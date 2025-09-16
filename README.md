
# HUBLUZ - Social Media Management Platform

A modern, full-stack social media management platform built with Next.js, designed for small businesses and entrepreneurs to manage their Facebook, Instagram, and LinkedIn presence.

## 🚀 Features

- **Multi-Platform Management**: Connect and manage Facebook, Instagram, and LinkedIn accounts
- **Post Scheduling**: Create and schedule posts across platforms
- **Analytics Dashboard**: Track performance with detailed analytics
- **Content Library**: Organize and manage your media assets
- **User Authentication**: Secure login system with NextAuth.js
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository
2. Navigate to the app directory: `cd app`
3. Install dependencies: `yarn install`
4. Set up environment variables (copy `.env.example` to `.env`)
5. Set up the database: `npx prisma migrate deploy`
6. Seed the database: `npx prisma db seed`
7. Run the development server: `yarn dev`

## 🔧 Environment Variables

Create a `.env` file in the `app` directory with the following variables:

```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## 🗄️ Database Setup

The app uses PostgreSQL with Prisma. Run these commands to set up your database:

```bash
cd app
npx prisma migrate deploy
npx prisma db seed
```

## 👤 Test Accounts

After seeding, you can use these test accounts:

- **Admin Account**: john@doe.com / johndoe123
- **Sample User**: sarah@example.com / password123

## 🚀 Deployment on Vercel

1. Connect your GitHub repository to Vercel
2. Set the build command to: `cd app && yarn install && npx prisma generate && yarn build`
3. Set the output directory to: `app/.next`
4. Add your environment variables in Vercel dashboard
5. Deploy!

## 📱 Usage

1. **Sign Up/Login**: Create an account or use test credentials
2. **Connect Platforms**: Link your social media accounts (placeholder integrations)
3. **Create Posts**: Use the composer to create engaging content
4. **Schedule Content**: Plan your posts using the calendar view
5. **Monitor Performance**: Track analytics and engagement

## 🎨 Design

Features a modern, professional design with:
- Dark blue theme (#1A3C6E)
- Clean, minimalist interface
- Mobile-first responsive design
- Intuitive navigation and user experience

## 📄 License

This project is licensed under the MIT License.

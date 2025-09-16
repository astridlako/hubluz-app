
# 🚀 HUBLUZ Vercel Deployment Guide

This guide will help you deploy your HUBLUZ social media management app to Vercel successfully.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **PostgreSQL Database**: Set up a database (Neon, Supabase, or Railway recommended)

## 🔧 Vercel Configuration

### Step 1: Project Settings

When importing your project to Vercel, use these settings:

**Framework Preset**: `Next.js`
**Root Directory**: `app` (Important!)
**Build Command**: `yarn install && npx prisma generate && yarn build`
**Output Directory**: `.next`
**Install Command**: `yarn install`

### Step 2: Environment Variables

Add these environment variables in your Vercel project dashboard:

```env
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-random-secret-key-here
```

**Important Notes:**
- Replace `DATABASE_URL` with your actual PostgreSQL connection string
- Replace `NEXTAUTH_URL` with your actual Vercel deployment URL
- Generate a strong `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)

### Step 3: Database Setup

After deployment, run these commands to set up your database:

1. **Apply Database Schema:**
   ```bash
   npx prisma db push
   ```

2. **Seed Test Data (Optional):**
   ```bash
   npx prisma db seed
   ```

## 🏗️ Build Configuration

The `vercel.json` file in the root directory contains:

```json
{
  "version": 2,
  "buildCommand": "cd app && yarn install && npx prisma generate && yarn build",
  "devCommand": "cd app && yarn dev",
  "installCommand": "cd app && yarn install",
  "framework": "nextjs",
  "outputDirectory": "app/.next"
}
```

## 🔍 Troubleshooting Common Issues

### Issue 1: "Prisma Client Not Found"
**Solution**: Ensure `npx prisma generate` is in your build command

### Issue 2: "Database Connection Failed"
**Solution**: 
- Verify your `DATABASE_URL` is correct
- Ensure your database allows connections from Vercel's IPs
- Check that SSL is properly configured

### Issue 3: "NextAuth Configuration Error"
**Solution**:
- Set `NEXTAUTH_URL` to your production URL
- Ensure `NEXTAUTH_SECRET` is set and secure
- Verify all callback URLs are whitelisted

### Issue 4: "Module Not Found"
**Solution**:
- Clear Vercel's build cache and redeploy
- Ensure all dependencies are in `package.json`

## 📱 Post-Deployment Checklist

- [ ] App loads successfully at your Vercel URL
- [ ] Database connection works (sign-up/sign-in functions)
- [ ] All pages are accessible
- [ ] Images and assets load correctly
- [ ] Authentication flow works properly
- [ ] Test both mobile and desktop layouts

## 🎯 Test Accounts

After seeding, use these accounts to test:
- **Admin**: john@doe.com / johndoe123
- **User**: sarah@example.com / password123

## 🔄 Redeployment

For future updates:
1. Push changes to your GitHub repository
2. Vercel will automatically redeploy
3. Database migrations will run automatically if configured

## 📞 Support

If you encounter issues:
1. Check Vercel's deployment logs
2. Verify all environment variables are set
3. Test the build locally first with `yarn build`
4. Check database connectivity

---

## 🚀 Quick Deploy Button

[![Deploy with Vercel](https://i.ytimg.com/vi/MCvCHWJ1uHk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDxDvBTKXIlRK07iMxniqRNvjNyeg)

---

**Remember**: Always test your deployment thoroughly before going live!

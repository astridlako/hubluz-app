
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Hash passwords
  const hashedPassword1 = await bcrypt.hash('johndoe123', 12)
  const hashedPassword2 = await bcrypt.hash('password123', 12)

  // Create test users
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword1,
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Doe Enterprises',
      subscriptionTier: 'pro',
      lastLoginAt: new Date(),
    },
  })

  const sampleUser = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      password: hashedPassword2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      companyName: 'Johnson Marketing',
      subscriptionTier: 'free',
    },
  })

  console.log('✓ Test user created/updated')
  console.log('✓ Sample user created/updated')

  // Create platform connections
  const platforms = ['facebook', 'instagram', 'linkedin'] as const

  for (const platform of platforms) {
    await prisma.platformConnection.upsert({
      where: {
        userId_platform: {
          userId: testUser.id,
          platform: platform,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        platform: platform,
        isActive: platform === 'instagram' ? false : true,
        accountName: `John's ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        accountImage: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`,
      },
    })

    await prisma.platformConnection.upsert({
      where: {
        userId_platform: {
          userId: sampleUser.id,
          platform: platform,
        },
      },
      update: {},
      create: {
        userId: sampleUser.id,
        platform: platform,
        isActive: true,
        accountName: `Sarah's ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        accountImage: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg`,
      },
    })
  }

  console.log('✓ Platform connections created')

  // Create media assets
  const sampleImages = [
    {
      fileName: "business_meeting_1.jpg",
      originalName: "Business Meeting Photo.jpg",
      mimeType: "image/jpeg",
      fileSize: 2048576,
      cloudStoragePath: "uploads/business_meeting_1.jpg",
      altText: "Professional business meeting",
      tags: ["business", "meeting", "professional"],
    },
    {
      fileName: "product_showcase_2.jpg",
      originalName: "Product Showcase.jpg", 
      mimeType: "image/jpeg",
      fileSize: 1536000,
      cloudStoragePath: "uploads/product_showcase_2.jpg",
      altText: "Product display showcase",
      tags: ["product", "showcase", "marketing"],
    },
  ]

  for (const image of sampleImages) {
    await prisma.mediaAsset.upsert({
      where: {
        userId_fileName: {
          userId: testUser.id,
          fileName: image.fileName,
        },
      },
      update: {},
      create: {
        ...image,
        userId: testUser.id,
      },
    })
  }

  console.log('✓ Media assets created')

  // Create templates
  const templates = [
    {
      name: "Product Launch",
      content: "🚀 Exciting news! We're launching our new {PRODUCT_NAME}! \n\nKey features:\n✅ {FEATURE_1}\n✅ {FEATURE_2}\n✅ {FEATURE_3}\n\nGet yours today! {LINK}",
      hashtags: ["newlaunch", "innovation", "product"],
      category: "product",
      platforms: ["facebook", "linkedin", "instagram"],
    },
    {
      name: "Behind the Scenes",
      content: "Take a peek behind the scenes at {COMPANY_NAME}! 👀\n\nOur team is working hard to {ACTIVITY}. We're passionate about {VALUES} and committed to {MISSION}.\n\n{CALL_TO_ACTION}",
      hashtags: ["behindthescenes", "team", "company"],
      category: "company",
      platforms: ["instagram", "facebook"],
    },
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: {
        userId_name: {
          userId: testUser.id,
          name: template.name,
        },
      },
      update: {},
      create: {
        ...template,
        userId: testUser.id,
      },
    })
  }

  console.log('✓ Templates created')

  // Get platform connections for posts
  const connections = await prisma.platformConnection.findMany({
    where: { userId: testUser.id },
  })

  // Create sample posts
  const posts = [
    {
      content: "Excited to share our latest company milestone! 🎉 Thanks to our amazing team and customers for making this possible.",
      status: "published",
      publishedAt: new Date(Date.now() - 86400000), // 1 day ago
      platforms: ["facebook", "linkedin"],
      hashtags: ["milestone", "grateful", "team"],
    },
    {
      content: "Monday motivation: Success is not final, failure is not fatal: it is the courage to continue that counts. 💪",
      status: "scheduled",
      scheduledFor: new Date(Date.now() + 86400000), // Tomorrow
      platforms: ["linkedin"],
      hashtags: ["mondaymotivation", "success", "inspiration"],
    },
    {
      content: "Behind the scenes at our office today! Our team is working on something amazing. Stay tuned! 👀",
      status: "draft",
      platforms: ["instagram"],
      hashtags: ["behindthescenes", "team", "comingsoon"],
    },
  ]

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        userId: testUser.id,
        connectionId: connections[0]?.id || testUser.id, // Use first connection or fallback
      },
    })
  }

  console.log('✓ Sample posts created')

  // Create analytics for published posts
  const publishedPosts = await prisma.post.findMany({
    where: { status: 'published', userId: testUser.id },
  })

  for (const post of publishedPosts) {
    for (const platform of post.platforms) {
      await prisma.postAnalytics.create({
        data: {
          postId: post.id,
          platform: platform,
          impressions: Math.floor(Math.random() * 5000) + 1000,
          reach: Math.floor(Math.random() * 3000) + 500,
          likes: Math.floor(Math.random() * 200) + 50,
          comments: Math.floor(Math.random() * 50) + 5,
          shares: Math.floor(Math.random() * 30) + 2,
          clicks: Math.floor(Math.random() * 100) + 10,
          saves: Math.floor(Math.random() * 25) + 1,
          engagement: Math.random() * 5 + 1, // 1-6% engagement rate
        },
      })
    }
  }

  console.log('✓ Analytics data created')

  // Create subscription history
  await prisma.subscriptionHistory.create({
    data: {
      userId: testUser.id,
      tier: 'pro',
      status: 'active',
      startDate: new Date(Date.now() - 2592000000), // 30 days ago
      amount: 20.00,
      currency: 'USD',
    },
  })

  console.log('✓ Subscription history created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('')
  console.log('Test accounts created:')
  console.log('👤 Admin User: john@doe.com / johndoe123 (Pro Plan)')
  console.log('👤 Sample User: sarah@example.com / password123 (Free Plan)')
  console.log('')
  console.log('Sample data includes:')
  console.log('📄 Templates for common post types')
  console.log('🖼️ Media assets with professional images')
  console.log('📝 Sample posts (scheduled, published, and drafts)')
  console.log('📊 Analytics data for published posts')
  console.log('🔗 Platform connection configurations')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
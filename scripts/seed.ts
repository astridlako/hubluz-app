
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ASSETS } from '../lib/constants'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create test user (required for testing)
  const testUserPassword = await bcrypt.hash('johndoe123', 12)
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: testUserPassword,
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Test Company',
      subscriptionTier: 'PAID', // Admin privileges
      subscriptionStatus: 'ACTIVE',
    },
  })
  console.log('✓ Test user created/updated')

  // Create sample user
  const sampleUserPassword = await bcrypt.hash('password123', 12)
  const sampleUser = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      email: 'sarah@example.com',
      password: sampleUserPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      companyName: 'Digital Marketing Pro',
      subscriptionTier: 'FREE',
      subscriptionStatus: 'ACTIVE',
    },
  })
  console.log('✓ Sample user created/updated')

  // Create platform connections for test user
  const platforms = ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN'] as const
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
        isConnected: platform === 'INSTAGRAM' ? false : true,
        lastSyncAt: new Date(),
      },
    })
  }
  console.log('✓ Platform connections created')

  // Create media assets
  const mediaAssets = []
  for (let i = 0; i < ASSETS.sampleImages.length; i++) {
    const image = ASSETS.sampleImages[i]
    const media = await prisma.media.create({
      data: {
        userId: testUser.id,
        fileName: `${image?.name}.jpg` || `image_${i + 1}.jpg`,
        originalName: `${image?.name}.jpg` || `image_${i + 1}.jpg`,
        fileSize: Math.floor(Math.random() * 5000000) + 1000000, // Random file size between 1-5MB
        mimeType: 'image/jpeg',
        cloudStoragePath: `uploads/${Date.now()}-${image?.name || `image_${i + 1}`}.jpg`,
        cdnUrl: image?.url || '',
        tags: ['business', 'professional', 'stock'],
      },
    })
    mediaAssets.push(media)
  }
  console.log('✓ Media assets created')

  // Create templates
  const templates = [
    {
      name: 'Product Announcement',
      content: '🎉 Exciting news! We\'re thrilled to announce our latest [PRODUCT NAME]. After months of development, we\'re ready to share this amazing innovation with you. What do you think? #ProductLaunch #Innovation',
      platforms: ['FACEBOOK', 'LINKEDIN'] as any[],
      tags: ['announcement', 'product', 'launch'] as any[],
    },
    {
      name: 'Team Appreciation',
      content: '👏 Huge shoutout to our amazing team! Their dedication and hard work continue to drive our success. We\'re grateful for each team member\'s unique contribution. #TeamWork #Appreciation #Success',
      platforms: ['LINKEDIN', 'INSTAGRAM'] as any[],
      tags: ['team', 'appreciation', 'culture'] as any[],
    },
    {
      name: 'Weekly Motivation',
      content: '💪 Monday motivation: "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill. Let\'s make this week count! #MondayMotivation #Success #Inspiration',
      platforms: ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN'] as any[],
      tags: ['motivation', 'quote', 'weekly'] as any[],
    },
    {
      name: 'Behind the Scenes',
      content: '🔍 Take a peek behind the scenes of our daily operations. It\'s amazing to see how our team collaborates to bring innovative solutions to life! #BehindTheScenes #TeamWork #Innovation',
      platforms: ['INSTAGRAM', 'FACEBOOK'] as any[],
      tags: ['behind-the-scenes', 'team', 'process'] as any[],
    },
  ]

  for (const template of templates) {
    await prisma.template.create({
      data: {
        userId: testUser.id,
        name: template.name,
        content: template.content,
        platforms: template.platforms,
        tags: template.tags,
        isPublic: true,
        usageCount: Math.floor(Math.random() * 50),
      },
    })
  }
  console.log('✓ Templates created')

  // Create sample posts
  const samplePosts = [
    {
      title: 'New Product Launch',
      content: 'Exciting updates coming to our platform! Stay tuned for major improvements to user experience and new features that will revolutionize how you manage social media.',
      platforms: ['FACEBOOK', 'LINKEDIN'] as any[],
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      imageUrls: [ASSETS.sampleImages[0]?.url || ''] as any[],
      hashtags: ['ProductLaunch', 'Innovation', 'SocialMedia'] as any[],
    },
    {
      title: 'Team Meeting Highlights',
      content: 'Great insights from today\'s team meeting. Collaboration is key to our success, and we\'re excited about the innovative projects ahead!',
      platforms: ['INSTAGRAM', 'LINKEDIN'] as any[],
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      imageUrls: [ASSETS.sampleImages[1]?.url || ''] as any[],
      hashtags: ['TeamWork', 'Collaboration', 'Innovation'] as any[],
    },
    {
      title: 'Weekly Update',
      content: 'This week has been incredible! We\'ve made significant progress on our key projects and are excited to share the results with our community.',
      platforms: ['FACEBOOK', 'INSTAGRAM'] as any[],
      status: 'PUBLISHED' as const,
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      imageUrls: [ASSETS.sampleImages[2]?.url || ''] as any[],
      hashtags: ['WeeklyUpdate', 'Progress', 'Community'] as any[],
    },
    {
      title: 'Industry Insights',
      content: 'Sharing some valuable insights from the latest industry report. The future of social media management is bright, and we\'re at the forefront of innovation.',
      platforms: ['LINKEDIN'] as any[],
      status: 'PUBLISHED' as const,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      hashtags: ['Industry', 'Insights', 'Future', 'SocialMedia'] as any[],
    },
    {
      title: 'Customer Success Story',
      content: 'We love hearing success stories from our customers! Here\'s how one small business increased their engagement by 300% using our platform.',
      platforms: ['FACEBOOK', 'LINKEDIN'] as any[],
      status: 'DRAFT' as const,
      imageUrls: [ASSETS.sampleImages[3]?.url || ''] as any[],
      hashtags: ['CustomerSuccess', 'Engagement', 'SmallBusiness'] as any[],
    },
  ]

  for (const post of samplePosts) {
    await prisma.post.create({
      data: {
        userId: testUser.id,
        title: post.title,
        content: post.content,
        platforms: post.platforms,
        status: post.status,
        scheduledAt: post.scheduledAt || null,
        publishedAt: post.publishedAt || null,
        imageUrls: post.imageUrls,
        hashtags: post.hashtags,
      },
    })
  }
  console.log('✓ Sample posts created')

  // Create analytics data
  const posts = await prisma.post.findMany({
    where: { userId: testUser.id, status: 'PUBLISHED' },
  })

  for (const post of posts) {
    for (const platform of post.platforms) {
      await prisma.analytics.create({
        data: {
          userId: testUser.id,
          postId: post.id,
          platform: platform as any,
          reach: Math.floor(Math.random() * 15000) + 1000,
          engagement: Math.floor(Math.random() * 1000) + 100,
          clicks: Math.floor(Math.random() * 500) + 50,
          likes: Math.floor(Math.random() * 800) + 100,
          shares: Math.floor(Math.random() * 200) + 10,
          comments: Math.floor(Math.random() * 150) + 5,
          recordedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        },
      })
    }
  }
  console.log('✓ Analytics data created')

  // Create subscription history
  await prisma.subscriptionHistory.create({
    data: {
      userId: testUser.id,
      tier: 'PAID',
      status: 'ACTIVE',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      amount: 29.0,
      currency: 'USD',
    },
  })

  await prisma.subscriptionHistory.create({
    data: {
      userId: sampleUser.id,
      tier: 'FREE',
      status: 'ACTIVE',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
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
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

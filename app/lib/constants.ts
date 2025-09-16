
export const PLATFORM_LIMITS = {
  FACEBOOK: { 
    maxLength: 63206, 
    color: '#1877F2',
    name: 'Facebook'
  },
  INSTAGRAM: { 
    maxLength: 2200, 
    color: '#E4405F',
    name: 'Instagram'
  },
  LINKEDIN: { 
    maxLength: 3000, 
    color: '#0A66C2',
    name: 'LinkedIn'
  },
} as const

export const SUBSCRIPTION_LIMITS = {
  FREE: {
    platforms: 1,
    postsPerMonth: 10,
    mediaStorage: 100, // MB
    templates: 3
  },
  PAID: {
    platforms: 3,
    postsPerMonth: -1, // unlimited
    mediaStorage: 5000, // MB
    templates: -1 // unlimited
  }
} as const

export const ASSETS = {
  logos: {
    hubluz: "/assets/logos/hubluz-logo-transparent.png",
    hubluzShort: "/assets/logos/hubluz-logo-short-transparent.png",
    facebook: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png",
    instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    linkedin: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png"
  },
  sampleImages: [
    {
      name: "business_meeting_1",
      url: "https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?cs=srgb&dl=pexels-rebrand-cities-581004-1367276.jpg&fm=jpg",
      description: "Professional business meeting with diverse team"
    },
    {
      name: "office_collaboration", 
      url: "https://images.pexels.com/photos/7691726/pexels-photo-7691726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Modern office teamwork and collaboration"
    },
    {
      name: "business_handshake",
      url: "https://images.pexels.com/photos/9488840/pexels-photo-9488840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      description: "Professional handshake between business partners"
    },
    {
      name: "corporate_workspace",
      url: "https://assets.entrepreneur.com/content/3x2/2000/1650877873-Untitleddesign-2022-04-25T130931010.png",
      description: "Modern corporate workspace environment"
    },
    {
      name: "business_meeting_2",
      url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?cs=srgb&dl=pexels-fauxels-3183150.jpg&fm=jpg",
      description: "Team discussion and strategy planning"
    },
    {
      name: "digital_analytics",
      url: "https://www.geckoboard.com/uploads/Digital-dashboard-example.png",
      description: "Digital marketing analytics dashboard"
    }
  ]
}

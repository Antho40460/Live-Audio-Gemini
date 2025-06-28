import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default plans
  const plans = [
    {
      code: 'free',
      name: 'Free',
      description: 'Perfect for trying out the platform',
      priceEur: 0,
      minutesIncluded: 50,
      maxBots: 1,
      features: [
        'Basic customization',
        'Community support',
        'Standard voice quality'
      ],
      isActive: true
    },
    {
      code: 'pro',
      name: 'Pro',
      description: 'Best for small to medium businesses',
      priceEur: 99,
      minutesIncluded: 200,
      maxBots: null, // unlimited
      features: [
        'Unlimited bots',
        'Advanced customization',
        'Priority support',
        'HD voice quality',
        'Analytics dashboard',
        'Custom branding'
      ],
      isActive: true
    },
    {
      code: 'growth',
      name: 'Growth',
      description: 'For growing teams and agencies',
      priceEur: 199,
      minutesIncluded: 500,
      maxBots: null,
      features: [
        'Everything in Pro',
        'Calendar integration',
        'SMS notifications',
        'Advanced analytics',
        'White-label options',
        'API access'
      ],
      isActive: true
    },
    {
      code: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      priceEur: 0, // Custom pricing
      minutesIncluded: 0,
      maxBots: null,
      features: [
        'Unlimited minutes',
        'Everything in Growth',
        'SLA guarantee',
        'SSO integration',
        'Dedicated support',
        'Custom integrations',
        'On-premise deployment'
      ],
      isActive: true
    }
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { code: plan.code },
      update: {},
      create: plan
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
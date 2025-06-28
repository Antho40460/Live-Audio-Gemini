import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSuccess(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailure(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Get user by Stripe customer ID
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Get plan code from price ID
  const priceId = subscription.items.data[0]?.price.id
  const plan = await prisma.plan.findFirst({
    where: { stripePriceId: priceId }
  })

  if (!plan) {
    console.error('Plan not found for price:', priceId)
    return
  }

  // Upsert subscription
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      planCode: plan.code,
      status: subscription.status.toUpperCase() as any,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    create: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      planCode: plan.code,
      status: subscription.status.toUpperCase() as any,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    }
  })

  console.log('Subscription updated for user:', user.id)
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: 'CANCELED' }
  })

  console.log('Subscription canceled:', subscription.id)
}

async function handlePaymentSuccess(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  // Reset usage for the new billing period
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    include: {
      subscriptions: {
        where: { status: 'ACTIVE' },
        include: { plan: true }
      }
    }
  })

  if (user && user.subscriptions[0]?.plan.minutesIncluded) {
    await prisma.user.update({
      where: { id: user.id },
      data: { creditsMinutes: user.subscriptions[0].plan.minutesIncluded }
    })
  }

  console.log('Payment succeeded for invoice:', invoice.id)
}

async function handlePaymentFailure(invoice: Stripe.Invoice) {
  // Handle failed payment - could send notification, update status, etc.
  console.log('Payment failed for invoice:', invoice.id)
}
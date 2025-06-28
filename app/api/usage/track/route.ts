import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId, minutesUsed } = await req.json()

    if (!sessionId || !minutesUsed) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get session details
    const botSession = await prisma.botSession.findUnique({
      where: { id: sessionId },
      include: { user: true }
    })

    if (!botSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Update session with usage
    await prisma.botSession.update({
      where: { id: sessionId },
      data: {
        minutesUsed,
        endedAt: new Date()
      }
    })

    // Deduct from user credits
    const newCredits = Math.max(0, botSession.user.creditsMinutes - minutesUsed)
    await prisma.user.update({
      where: { id: botSession.userId },
      data: { creditsMinutes: newCredits }
    })

    // Record usage for billing
    const now = new Date()
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    await prisma.usageRecord.create({
      data: {
        userId: botSession.userId,
        sessionId: sessionId,
        minutesUsed,
        billingPeriodStart: periodStart,
        billingPeriodEnd: periodEnd
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Usage tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(
  req: NextRequest,
  { params }: { params: { botSlug: string } }
) {
  try {
    const { botSlug } = params
    const token = req.nextUrl.searchParams.get('token')

    // Get bot details
    const bot = await prisma.bot.findUnique({
      where: { slug: botSlug },
      include: {
        user: true,
        files: {
          where: { status: 'READY' }
        }
      }
    })

    if (!bot) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 })
    }

    if (!bot.isActive) {
      return NextResponse.json({ error: 'Bot is inactive' }, { status: 403 })
    }

    // Verify domain if bot is not public
    if (!bot.isPublic) {
      const origin = req.headers.get('origin')
      if (!origin || !bot.allowedDomains.includes(origin)) {
        return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 })
      }
    }

    // Create session token for this bot interaction
    const sessionToken = jwt.sign(
      {
        botId: bot.id,
        userId: bot.userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
      },
      process.env.NEXTAUTH_SECRET!
    )

    // Create session record
    const session = await prisma.botSession.create({
      data: {
        botId: bot.id,
        userId: bot.userId,
        sessionToken,
        userIp: req.ip,
        userAgent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer')
      }
    })

    // Return bot configuration
    return NextResponse.json({
      bot: {
        id: bot.id,
        name: bot.name,
        systemPrompt: bot.systemPrompt,
        voiceConfig: bot.voiceConfig,
        themeConfig: bot.themeConfig
      },
      sessionToken: session.sessionToken,
      knowledgeBase: bot.files.map(file => ({
        id: file.id,
        filename: file.filename,
        mimeType: file.mimeType
      }))
    })
  } catch (error) {
    console.error('Embed API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
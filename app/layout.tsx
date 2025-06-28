import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Live Audio Gemini - AI Voice Chat Platform',
  description: 'Create and embed intelligent voice chat bots powered by Google Gemini AI. Perfect for customer support, education, and interactive experiences.',
  keywords: 'AI chatbot, voice chat, Gemini AI, customer support, live audio, conversational AI',
  authors: [{ name: 'Live Audio Gemini Team' }],
  openGraph: {
    title: 'Live Audio Gemini - AI Voice Chat Platform',
    description: 'Create and embed intelligent voice chat bots powered by Google Gemini AI.',
    url: 'https://liveaudiogemini.com',
    siteName: 'Live Audio Gemini',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Audio Gemini Platform'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Audio Gemini - AI Voice Chat Platform',
    description: 'Create and embed intelligent voice chat bots powered by Google Gemini AI.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
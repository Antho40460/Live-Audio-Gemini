'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mic, 
  Palette, 
  Code, 
  Shield, 
  Zap, 
  Globe,
  Brain,
  BarChart3,
  FileText
} from 'lucide-react'
import { motion } from 'framer-motion'

export function FeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: 'Live Voice Chat',
      description: 'Real-time voice conversations with natural speech recognition and synthesis powered by Google Gemini.',
    },
    {
      icon: Palette,
      title: 'Visual Customization',
      description: 'Drag-and-drop theme editor with colors, fonts, and chat bubble styles to match your brand.',
    },
    {
      icon: Brain,
      title: 'Smart Knowledge Base',
      description: 'Upload PDFs, CSVs, and documents. AI automatically creates contextual responses from your content.',
    },
    {
      icon: Code,
      title: 'Easy Embedding',
      description: 'One-line iframe embed or WordPress plugin. Works seamlessly on any website.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Row-level security, CORS protection, and secure token-based authentication.',
    },
    {
      icon: BarChart3,
      title: 'Usage Analytics',
      description: 'Detailed insights on conversations, user engagement, and bot performance metrics.',
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for 100+ languages with automatic detection and response generation.',
    },
    {
      icon: Zap,
      title: 'Real-time Streaming',
      description: 'Low-latency audio streaming with WebSocket connections for instant responses.',
    },
    {
      icon: FileText,
      title: 'System Prompts',
      description: 'AI-powered prompt assistant helps you create effective bot personalities and behaviors.',
    },
  ]

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Everything You Need to Build
            <span className="gradient-text"> Amazing Voice Bots</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From visual customization to advanced AI capabilities, 
            our platform provides all the tools you need.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
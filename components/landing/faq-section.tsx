'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does the voice AI technology work?',
      answer: 'Our platform uses Google Gemini AI for natural language processing and speech synthesis. The AI understands context, maintains conversation flow, and generates human-like responses in real-time.',
    },
    {
      question: 'Can I customize the voice and personality of my bot?',
      answer: 'Yes! You can customize the voice, personality, response style, and even upload your own knowledge base. Our AI-powered prompt assistant helps you create the perfect bot personality for your use case.',
    },
    {
      question: 'How do I embed the voice bot on my website?',
      answer: 'Simply copy and paste our iframe embed code, or use our WordPress plugin. The bot works on any website and is fully responsive across all devices.',
    },
    {
      question: 'What languages are supported?',
      answer: 'We support 100+ languages with automatic detection. The AI can understand and respond in the user\'s preferred language, making it perfect for global businesses.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use enterprise-grade security with row-level security, encrypted data transmission, and GDPR compliance. Your conversations and data are never shared with third parties.',
    },
    {
      question: 'How does the pricing work?',
      answer: 'Pricing is based on usage minutes. Each plan includes a monthly allowance, and you only pay for additional minutes if you exceed your limit. No hidden fees or surprise charges.',
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer: 'Yes! We offer integrations with popular tools like calendars, CRM systems, and notification services. Our API allows for custom integrations as well.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including documentation, video tutorials, community forums, and direct support. Pro and Enterprise plans include priority support with faster response times.',
    },
  ]

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about Live Audio Gemini. 
            Can't find what you're looking for? Contact our support team.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-border last:border-b-0"
            >
              <button
                className="w-full py-6 text-left flex items-center justify-between hover:text-primary transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
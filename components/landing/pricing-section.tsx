'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying out the platform',
      features: [
        '50 minutes/month',
        '1 voice bot',
        'Basic customization',
        'Community support',
        'Standard voice quality',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '99',
      description: 'Best for small to medium businesses',
      features: [
        '200 minutes/month',
        'Unlimited bots',
        'Advanced customization',
        'Priority support',
        'HD voice quality',
        'Analytics dashboard',
        'Custom branding',
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Growth',
      price: '199',
      description: 'For growing teams and agencies',
      features: [
        '500 minutes/month',
        'Everything in Pro',
        'Calendar integration',
        'SMS notifications',
        'Advanced analytics',
        'White-label options',
        'API access',
      ],
      cta: 'Start Growth Trial',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited minutes',
        'Everything in Growth',
        'SLA guarantee',
        'SSO integration',
        'Dedicated support',
        'Custom integrations',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the perfect plan for your needs. All plans include our core features 
            with no hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 'Custom' ? 'Custom' : `€${plan.price}`}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'gradient' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Usage-based pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">Fair Usage Pricing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Overage: €0.39 per additional minute • Extra integrations: €50/month per add-on
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
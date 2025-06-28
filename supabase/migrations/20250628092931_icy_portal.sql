/*
  # Seed Default Plans

  1. Insert default subscription plans
    - Free: 50 minutes, 1 bot
    - Pro: 200 minutes, unlimited bots
    - Growth: 500 minutes, unlimited bots + integrations
    - Enterprise: Custom pricing

  2. Features are stored as JSON arrays for flexibility
*/

INSERT INTO public.plans (code, name, description, price_eur, minutes_included, max_bots, features, is_active) VALUES
(
  'free',
  'Free',
  'Perfect for trying out the platform',
  0,
  50,
  1,
  '["Basic customization", "Community support", "Standard voice quality"]',
  true
),
(
  'pro',
  'Pro',
  'Best for small to medium businesses',
  99,
  200,
  NULL,
  '["Unlimited bots", "Advanced customization", "Priority support", "HD voice quality", "Analytics dashboard", "Custom branding"]',
  true
),
(
  'growth',
  'Growth',
  'For growing teams and agencies',
  199,
  500,
  NULL,
  '["Everything in Pro", "Calendar integration", "SMS notifications", "Advanced analytics", "White-label options", "API access"]',
  true
),
(
  'enterprise',
  'Enterprise',
  'For large organizations',
  0,
  0,
  NULL,
  '["Unlimited minutes", "Everything in Growth", "SLA guarantee", "SSO integration", "Dedicated support", "Custom integrations", "On-premise deployment"]',
  true
)
ON CONFLICT (code) DO NOTHING;
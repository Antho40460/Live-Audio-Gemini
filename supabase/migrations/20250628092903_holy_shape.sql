/*
  # Initial Schema for Live Audio Gemini SaaS

  1. New Tables
    - `users` - User accounts with authentication
    - `plans` - Subscription plans (Free, Pro, Growth, Enterprise)
    - `subscriptions` - User subscription records
    - `bots` - Voice bot configurations
    - `sessions` - Bot conversation sessions for usage tracking
    - `files` - Knowledge base files for bots
    - `usage_records` - Detailed usage tracking for billing

  2. Security
    - Enable RLS on all tables
    - Add policies for user data isolation
    - Secure bot access with proper permissions

  3. Indexes
    - Performance indexes for common queries
    - Unique constraints for business logic
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  stripe_customer_id text UNIQUE,
  credits_minutes integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Plans table
CREATE TABLE IF NOT EXISTS public.plans (
  code text PRIMARY KEY,
  name text NOT NULL,
  description text,
  price_eur numeric(10,2) NOT NULL DEFAULT 0,
  minutes_included integer NOT NULL DEFAULT 0,
  max_bots integer DEFAULT NULL, -- NULL means unlimited
  features jsonb DEFAULT '[]',
  stripe_price_id text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  plan_code text REFERENCES public.plans(code),
  stripe_subscription_id text UNIQUE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bots table
CREATE TABLE IF NOT EXISTS public.bots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  system_prompt text DEFAULT 'You are a helpful AI assistant.',
  voice_config jsonb DEFAULT '{"voice": "en-US-Standard-A", "speed": 1.0}',
  theme_config jsonb DEFAULT '{"primaryColor": "#3b82f6", "fontFamily": "Inter"}',
  is_active boolean DEFAULT true,
  is_public boolean DEFAULT false,
  allowed_domains text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sessions table for usage tracking
CREATE TABLE IF NOT EXISTS public.sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id uuid REFERENCES public.bots(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  minutes_used numeric(10,2) DEFAULT 0,
  message_count integer DEFAULT 0,
  user_ip inet,
  user_agent text,
  referrer text
);

-- Files table for knowledge base
CREATE TABLE IF NOT EXISTS public.files (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_id uuid REFERENCES public.bots(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  filename text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  status text DEFAULT 'processing' CHECK (status IN ('processing', 'ready', 'error')),
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Usage records for detailed billing
CREATE TABLE IF NOT EXISTS public.usage_records (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  session_id uuid REFERENCES public.sessions(id) ON DELETE CASCADE,
  minutes_used numeric(10,2) NOT NULL,
  recorded_at timestamptz DEFAULT now(),
  billing_period_start timestamptz NOT NULL,
  billing_period_end timestamptz NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read/update their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Plans: Everyone can read active plans
CREATE POLICY "Anyone can read active plans" ON public.plans
  FOR SELECT USING (is_active = true);

-- Subscriptions: Users can read their own subscriptions
CREATE POLICY "Users can read own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Bots: Users can CRUD their own bots
CREATE POLICY "Users can manage own bots" ON public.bots
  FOR ALL USING (auth.uid() = user_id);

-- Public bots can be read by anyone for embedding
CREATE POLICY "Public bots are readable" ON public.bots
  FOR SELECT USING (is_public = true);

-- Sessions: Users can read their own sessions
CREATE POLICY "Users can read own sessions" ON public.sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Sessions can be created for public bots
CREATE POLICY "Sessions can be created for public bots" ON public.sessions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bots 
      WHERE id = bot_id AND (is_public = true OR user_id = auth.uid())
    )
  );

-- Files: Users can manage their own files
CREATE POLICY "Users can manage own files" ON public.files
  FOR ALL USING (auth.uid() = user_id);

-- Usage records: Users can read their own usage
CREATE POLICY "Users can read own usage" ON public.usage_records
  FOR SELECT USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_bots_user_id ON public.bots(user_id);
CREATE INDEX IF NOT EXISTS idx_bots_slug ON public.bots(slug);
CREATE INDEX IF NOT EXISTS idx_bots_public ON public.bots(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_sessions_bot_id ON public.sessions(bot_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON public.sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_files_bot_id ON public.files(bot_id);
CREATE INDEX IF NOT EXISTS idx_usage_records_user_id ON public.usage_records(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_records_billing_period ON public.usage_records(billing_period_start, billing_period_end);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bots_updated_at BEFORE UPDATE ON public.bots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
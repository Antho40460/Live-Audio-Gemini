import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { sessionId, minutesUsed } = await req.json()

    if (!sessionId || !minutesUsed) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Get session details
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('user_id, bot_id, started_at')
      .eq('id', sessionId)
      .single()

    if (sessionError || !session) {
      return new Response('Session not found', { status: 404 })
    }

    // Update session with usage
    await supabase
      .from('sessions')
      .update({
        minutes_used: minutesUsed,
        ended_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    // Deduct from user credits
    const { data: user } = await supabase
      .from('users')
      .select('credits_minutes')
      .eq('id', session.user_id)
      .single()

    if (user) {
      const newCredits = Math.max(0, user.credits_minutes - minutesUsed)
      await supabase
        .from('users')
        .update({ credits_minutes: newCredits })
        .eq('id', session.user_id)
    }

    // Record usage for billing
    const now = new Date()
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    await supabase
      .from('usage_records')
      .insert({
        user_id: session.user_id,
        session_id: sessionId,
        minutes_used: minutesUsed,
        billing_period_start: periodStart.toISOString(),
        billing_period_end: periodEnd.toISOString()
      })

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Usage tracking error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          stripe_customer_id: string | null
          credits_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          stripe_customer_id?: string | null
          credits_minutes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          stripe_customer_id?: string | null
          credits_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
      plans: {
        Row: {
          code: string
          name: string
          description: string | null
          price_eur: number
          minutes_included: number
          max_bots: number | null
          features: Json
          stripe_price_id: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          code: string
          name: string
          description?: string | null
          price_eur?: number
          minutes_included?: number
          max_bots?: number | null
          features?: Json
          stripe_price_id?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          code?: string
          name?: string
          description?: string | null
          price_eur?: number
          minutes_included?: number
          max_bots?: number | null
          features?: Json
          stripe_price_id?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_code: string
          stripe_subscription_id: string | null
          status: string
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_code: string
          stripe_subscription_id?: string | null
          status?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_code?: string
          stripe_subscription_id?: string | null
          status?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bots: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          description: string | null
          system_prompt: string
          voice_config: Json
          theme_config: Json
          is_active: boolean
          is_public: boolean
          allowed_domains: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          description?: string | null
          system_prompt?: string
          voice_config?: Json
          theme_config?: Json
          is_active?: boolean
          is_public?: boolean
          allowed_domains?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          description?: string | null
          system_prompt?: string
          voice_config?: Json
          theme_config?: Json
          is_active?: boolean
          is_public?: boolean
          allowed_domains?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          bot_id: string
          user_id: string
          session_token: string
          started_at: string
          ended_at: string | null
          minutes_used: number
          message_count: number
          user_ip: string | null
          user_agent: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          bot_id: string
          user_id: string
          session_token: string
          started_at?: string
          ended_at?: string | null
          minutes_used?: number
          message_count?: number
          user_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          bot_id?: string
          user_id?: string
          session_token?: string
          started_at?: string
          ended_at?: string | null
          minutes_used?: number
          message_count?: number
          user_ip?: string | null
          user_agent?: string | null
          referrer?: string | null
        }
      }
      files: {
        Row: {
          id: string
          bot_id: string
          user_id: string
          filename: string
          file_path: string
          file_size: number | null
          mime_type: string | null
          status: string
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          bot_id: string
          user_id: string
          filename: string
          file_path: string
          file_size?: number | null
          mime_type?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          bot_id?: string
          user_id?: string
          filename?: string
          file_path?: string
          file_size?: number | null
          mime_type?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
        }
      }
      usage_records: {
        Row: {
          id: string
          user_id: string
          session_id: string
          minutes_used: number
          recorded_at: string
          billing_period_start: string
          billing_period_end: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          minutes_used: number
          recorded_at?: string
          billing_period_start: string
          billing_period_end: string
        }
        Update: {
          id?: string
          user_id?: string
          session_id?: string
          minutes_used?: number
          recorded_at?: string
          billing_period_start?: string
          billing_period_end?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
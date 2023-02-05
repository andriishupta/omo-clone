export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      active_fast: {
        Row: {
          created_at: string
          end: string | null
          id: number
          profile_id: string | null
          start: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end?: string | null
          id?: number
          profile_id?: string | null
          start?: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end?: string | null
          id?: number
          profile_id?: string | null
          start?: string
          type?: string
          updated_at?: string
        }
      }
      fasts: {
        Row: {
          created_at: string
          end: string
          id: number
          profile_id: string | null
          start: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end: string
          id?: number
          profile_id?: string | null
          start: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end?: string
          id?: number
          profile_id?: string | null
          start?: string
          type?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
          username?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          username?: string
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
  }
}

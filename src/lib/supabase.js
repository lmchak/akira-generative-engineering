import { createClient } from '@supabase/supabase-js'

const supabaseUrl = window.SUPABASE_URL
const supabaseAnonKey = window.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase system variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
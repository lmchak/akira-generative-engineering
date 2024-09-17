import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Ensure we're using a single instance
let instance = null;

export const getSupabase = () => {
  if (instance) return instance;
  instance = createClient(supabaseUrl, supabaseKey);
  return instance;
};

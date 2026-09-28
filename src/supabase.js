import { createClient } from '@supabase/supabase-js'

// -----------------------------------------------------------------------
// Paste your Supabase project's details here. Get them from:
// Supabase Dashboard -> Project Settings -> API
//
// Full walkthrough: see SUPABASE-SETUP.md in the project root.
//
// The "anon" key is safe to ship in the browser bundle — it's designed
// to be public. Access control is handled by the Row Level Security
// policies in supabase-setup.sql, not by hiding this key.
// -----------------------------------------------------------------------
const supabaseUrl = 'https://kjlhccdpdomrwvefclox.supabase.co'
const supabaseAnonKey = 'sb_publishable_59npdkCQGLQsQYnefbhiTA_1xgEEtA0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)



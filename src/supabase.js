import { createClient } from '@supabase/supabase-js'

// -----------------------------------------------------------------------
// Your Supabase project details.
//
// RECOMMENDED: put them in a file called .env in the project root (see
// .env.example), like this:
//
//   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key
//
// That way updating the website code never overwrites your keys.
// (You can still paste them into the two constants below instead.)
//
// Get them from: Supabase Dashboard -> Project Settings -> API
// Full walkthrough: see SUPABASE-SETUP.md.
//
// The "anon" key is safe to ship in the browser bundle — it's designed
// to be public. Access control is handled by the Row Level Security
// policies in supabase-setup.sql, not by hiding this key.
// -----------------------------------------------------------------------
const supabaseUrl = 'https://wzcrxoiqyfsziylpvlof.supabase.co'
const supabaseAnonKey = 'sb_publishable_dQKoBDQL6J7tx7Ehe6-eTw_U19gJ87y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
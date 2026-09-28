import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import LoginForm from '../admin/LoginForm.jsx'
import ProfileSetup from '../admin/ProfileSetup.jsx'
import Dashboard from '../admin/Dashboard.jsx'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [checkingProfile, setCheckingProfile] = useState(true)

  // Track the signed-in Supabase user (or null when signed out).
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setCheckingAuth(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Once signed in, fetch this person's staff profile row.
  useEffect(() => {
    if (!user) {
      setProfile(null)
      setCheckingProfile(false)
      return
    }

    let cancelled = false
    setCheckingProfile(true)

    supabase
      .from('staff')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setProfile(data || null)
          setCheckingProfile(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [user])

  function handleProfileUpdate(patch) {
    setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  if (checkingAuth) return null
  if (!user) return <LoginForm />
  if (checkingProfile) return null
  if (!profile) return <ProfileSetup user={user} onCreated={setProfile} />
  return <Dashboard user={user} profile={profile} onProfileUpdate={handleProfileUpdate} />
}

import { useState } from 'react'
import { supabase } from '../supabase.js'
import { IconShield } from '../components/Icons.jsx'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setNotice('')
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (signInError) {
      setError('That email and password combination was not recognized.')
    }
    // On success, the auth listener in Admin.jsx picks up the signed-in
    // session automatically.
    setLoading(false)
  }

  async function handleForgotPassword() {
    setError('')
    setNotice('')
    if (!email.trim()) {
      setError('Enter your email above first, then click "Forgot password?".')
      return
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim())
    if (resetError) {
      setError('Could not send a reset email for that address.')
    } else {
      setNotice('Password reset email sent — check your inbox.')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-mist px-6">
      <div className="w-full max-w-sm bg-ice border border-border rounded-sm p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <IconShield className="w-6 h-6 text-navy" />
          <p className="font-display font-semibold text-navy">Staff Portal</p>
        </div>
        <p className="text-steel text-sm mb-8">
          Sign in with your Little Sesame Foods staff account to view your profile, message
          colleagues, read the notice board, and reach the ERP/HRM system.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {notice && <p className="text-sm text-brandgreen">{notice}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3 disabled:opacity-60">
            {loading ? 'Signing In…' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="link-underline text-steel text-xs w-full text-center block"
          >
            Forgot password?
          </button>
        </form>

        <p className="mt-6 text-xs text-steel leading-relaxed">
          New staff member? Ask management to create your account (Supabase Dashboard →
          Authentication → Add user). Once created, sign in above with that email — you'll be asked
          to complete your profile the first time.
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { supabase } from '../supabase.js'
import { STAFF_DEPARTMENTS } from '../data/settings.js'
import { IconShield } from '../components/Icons.jsx'

export default function ProfileSetup({ user, onCreated }) {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState(STAFF_DEPARTMENTS[1])
  const [role, setRole] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !role.trim()) return
    setSaving(true)
    setError('')

    const { data, error: insertError } = await supabase
      .from('staff')
      .insert({
        id: user.id,
        name: name.trim(),
        email: user.email,
        department,
        role: role.trim(),
        photo_url: null,
        is_admin: false,
      })
      .select()
      .single()

    if (insertError) {
      setError('Could not save your profile. Please check your connection and try again.')
      setSaving(false)
      return
    }

    onCreated(data)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-mist px-6 py-12">
      <div className="w-full max-w-md bg-ice border border-border rounded-sm p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <IconShield className="w-6 h-6 text-navy" />
          <p className="font-display font-semibold text-navy">Welcome — let's set up your profile</p>
        </div>
        <p className="text-steel text-sm mb-8">
          This is your first time signing in. A few quick details, and you're in.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-navy mb-1.5">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none bg-ice"
            >
              {STAFF_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-navy mb-1.5">
              Job title
            </label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Warehouse Supervisor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary w-full justify-center !py-3 disabled:opacity-60">
            {saving ? 'Saving…' : 'Continue to Staff Portal'}
          </button>

          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="link-underline text-steel text-xs w-full text-center block"
          >
            Sign out instead
          </button>
        </form>
      </div>
    </div>
  )
}

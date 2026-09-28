import { useState } from 'react'
import { supabase } from '../supabase.js'
import { STAFF_DEPARTMENTS } from '../data/settings.js'
import StaffAvatar from './StaffAvatar.jsx'

const MAX_PHOTO_BYTES = 5 * 1024 * 1024 // 5MB

export default function ProfileTab({ user, profile, onUpdate }) {
  const [name, setName] = useState(profile.name)
  const [department, setDepartment] = useState(profile.department)
  const [role, setRole] = useState(profile.role)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSaveDetails(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    const patch = { name: name.trim(), department, role: role.trim() }
    const { error: updateError } = await supabase.from('staff').update(patch).eq('id', user.id)

    if (updateError) {
      setError('Could not save your changes. Please try again.')
    } else {
      onUpdate(patch)
      setMessage('Profile updated.')
      setTimeout(() => setMessage(''), 4000)
    }
    setSaving(false)
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError('That image is larger than 5MB — please choose a smaller one.')
      return
    }

    setUploading(true)

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(user.id, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setError('Could not upload that photo. Please try again.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('profile-photos').getPublicUrl(user.id)
    // Bust any cached copy of the previous photo at the same URL.
    const photoUrl = `${data.publicUrl}?t=${Date.now()}`

    const { error: updateError } = await supabase
      .from('staff')
      .update({ photo_url: photoUrl })
      .eq('id', user.id)

    if (updateError) {
      setError('Photo uploaded, but could not save it to your profile. Please try again.')
    } else {
      onUpdate({ photo_url: photoUrl })
      setMessage('Photo updated.')
      setTimeout(() => setMessage(''), 4000)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-6">My Profile</h2>

        <div className="flex items-center gap-5 mb-8">
          <StaffAvatar name={profile.name} photoURL={profile.photo_url} size={72} />
          <div>
            <label className="btn-outline-dark text-sm !py-2 !px-4 cursor-pointer inline-flex">
              {uploading ? 'Uploading…' : 'Change Photo'}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-xs text-steel mt-2">JPG or PNG, up to 5MB.</p>
          </div>
        </div>

        <form onSubmit={handleSaveDetails} className="space-y-5 max-w-md">
          <div>
            <label htmlFor="p-name" className="block text-sm font-medium text-navy mb-1.5">
              Full name
            </label>
            <input
              id="p-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="p-department" className="block text-sm font-medium text-navy mb-1.5">
              Department
            </label>
            <select
              id="p-department"
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
            <label htmlFor="p-role" className="block text-sm font-medium text-navy mb-1.5">
              Job title
            </label>
            <input
              id="p-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-brandgreen">{message}</p>}

          <button type="submit" disabled={saving} className="btn-primary !py-2.5 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </section>

      <section className="bg-mist border border-border rounded-sm p-6 md:p-8">
        <p className="text-steel text-sm leading-relaxed">
          <span className="font-medium text-navy">Signed in as </span>
          {user.email}
        </p>
      </section>
    </div>
  )
}

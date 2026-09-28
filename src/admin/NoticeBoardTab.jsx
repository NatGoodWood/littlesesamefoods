import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import { IconArrow } from '../components/Icons.jsx'

function formatDate(isoString) {
  if (!isoString) return 'Just now'
  return new Date(isoString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function NoticeBoardTab({ user, profile }) {
  const [notices, setNotices] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!cancelled) setNotices(data || [])
      })

    const channel = supabase
      .channel('notices-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notices' }, (payload) => {
        setNotices((prev) => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  async function handlePost(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setPosting(true)
    setError('')

    const { error: insertError } = await supabase.from('notices').insert({
      author_id: user.id,
      author_name: profile.name,
      title: title.trim(),
      body: body.trim(),
    })

    if (insertError) {
      setError('Could not post that notice. Please try again.')
    } else {
      setTitle('')
      setBody('')
    }
    setPosting(false)
  }

  return (
    <div className="space-y-6">
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">Post a Notice</h2>
        <p className="text-steel text-sm mb-6">
          Visible to every staff member on their Notice Board tab, as soon as you post it.
        </p>
        <form onSubmit={handlePost} className="space-y-4 max-w-xl">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notice title"
            className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
            required
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your notice…"
            rows={4}
            className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none resize-none"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={posting} className="btn-primary !py-2.5 disabled:opacity-60">
            {posting ? 'Posting…' : 'Post Notice'} <IconArrow />
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {notices.length === 0 ? (
          <div className="bg-mist border border-border rounded-sm p-8 text-center text-steel text-sm">
            No notices yet — be the first to post one.
          </div>
        ) : (
          notices.map((n) => (
            <div key={n.id} className="bg-ice border border-border rounded-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-display font-semibold text-navy">{n.title}</h3>
                <span className="text-xs text-steel shrink-0">{formatDate(n.created_at)}</span>
              </div>
              <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">{n.body}</p>
              <p className="text-xs text-gold-dark font-medium mt-3">— {n.author_name}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

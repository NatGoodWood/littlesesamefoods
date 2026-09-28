import { useEffect, useState, useRef } from 'react'
import { supabase } from '../supabase.js'
import StaffAvatar from './StaffAvatar.jsx'
import { IconArrow } from '../components/Icons.jsx'

function conversationId(idA, idB) {
  return [idA, idB].sort().join('_')
}

function formatTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function MessagesTab({ user, profile }) {
  const [colleagues, setColleagues] = useState([])
  const [activeColleague, setActiveColleague] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  // Colleague directory — initial fetch, then stay live as new staff join.
  useEffect(() => {
    let cancelled = false

    supabase
      .from('staff')
      .select('*')
      .order('name')
      .then(({ data }) => {
        if (!cancelled) setColleagues((data || []).filter((c) => c.id !== user.id))
      })

    const channel = supabase
      .channel('staff-directory')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'staff' }, (payload) => {
        setColleagues((prev) => {
          if (payload.eventType === 'DELETE') {
            return prev.filter((c) => c.id !== payload.old.id)
          }
          const row = payload.new
          if (row.id === user.id) return prev
          const withoutRow = prev.filter((c) => c.id !== row.id)
          return [...withoutRow, row].sort((a, b) => a.name.localeCompare(b.name))
        })
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [user.id])

  // Message thread with whichever colleague is selected — live-updating.
  useEffect(() => {
    if (!activeColleague) {
      setMessages([])
      return
    }
    let cancelled = false
    const cid = conversationId(user.id, activeColleague.id)

    supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', cid)
      .order('created_at')
      .then(({ data }) => {
        if (!cancelled) setMessages(data || [])
      })

    const channel = supabase
      .channel(`messages-${cid}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${cid}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [activeColleague, user.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    if (!text.trim() || !activeColleague) return
    setSending(true)

    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId(user.id, activeColleague.id),
      participants: [user.id, activeColleague.id],
      sender_id: user.id,
      sender_name: profile.name,
      text: text.trim(),
    })

    if (!error) setText('')
    setSending(false)
  }

  return (
    <div className="bg-ice border border-border rounded-sm overflow-hidden grid md:grid-cols-[260px_1fr] min-h-[560px]">
      {/* Colleague list */}
      <div className={`border-r border-border ${activeColleague ? 'hidden md:block' : ''}`}>
        <div className="p-4 border-b border-border">
          <p className="font-display font-semibold text-navy text-sm">Colleagues</p>
        </div>
        {colleagues.length === 0 ? (
          <p className="p-4 text-sm text-steel">
            No colleagues have signed in yet. Once teammates complete their profile, they'll appear
            here.
          </p>
        ) : (
          <ul>
            {colleagues.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveColleague(c)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-border hover:bg-mist transition-colors duration-150 ${
                    activeColleague?.id === c.id ? 'bg-mist' : ''
                  }`}
                >
                  <StaffAvatar name={c.name} photoURL={c.photo_url} size={36} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{c.name}</p>
                    <p className="text-xs text-steel truncate">{c.department}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Thread */}
      <div className={`flex flex-col ${activeColleague ? '' : 'hidden md:flex'}`}>
        {!activeColleague ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-steel text-sm">
            Choose a colleague from the list to start a conversation.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <button
                onClick={() => setActiveColleague(null)}
                className="md:hidden text-steel text-sm mr-1"
                aria-label="Back to colleagues"
              >
                ←
              </button>
              <StaffAvatar name={activeColleague.name} photoURL={activeColleague.photo_url} size={36} />
              <div>
                <p className="text-sm font-semibold text-navy">{activeColleague.name}</p>
                <p className="text-xs text-steel">{activeColleague.role}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <p className="text-sm text-steel text-center py-8">No messages yet — say hello.</p>
              ) : (
                messages.map((m) => {
                  const mine = m.sender_id === user.id
                  return (
                    <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] rounded-sm px-3.5 py-2.5 text-sm ${
                          mine ? 'bg-navy text-ice' : 'bg-mist text-ink'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        <p className={`text-[10px] mt-1 ${mine ? 'text-ice/50' : 'text-steel'}`}>
                          {formatTime(m.created_at)}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-3 p-4 border-t border-border">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Message ${activeColleague.name.split(' ')[0]}…`}
                className="flex-1 border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              />
              <button type="submit" disabled={sending || !text.trim()} className="btn-primary !py-2.5 shrink-0 disabled:opacity-60">
                Send <IconArrow />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

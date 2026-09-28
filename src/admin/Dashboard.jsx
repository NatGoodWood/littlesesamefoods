import { useState } from 'react'
import { supabase } from '../supabase.js'
import StaffAvatar from './StaffAvatar.jsx'
import ProfileTab from './ProfileTab.jsx'
import MessagesTab from './MessagesTab.jsx'
import NoticeBoardTab from './NoticeBoardTab.jsx'
import WebsiteAdminTab from './WebsiteAdminTab.jsx'
import ErpTab from './ErpTab.jsx'

export default function Dashboard({ user, profile, onProfileUpdate }) {
  const [tab, setTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'messages', label: 'Messages' },
    { id: 'notices', label: 'Notice Board' },
    ...(profile.is_admin ? [{ id: 'website', label: 'Website Admin' }] : []),
    { id: 'erp', label: 'ERP & HRM (Alerio)' },
  ]

  return (
    <div className="bg-mist min-h-screen">
      <header className="bg-navy">
        <div className="container-page py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Little Sesame Group" className="h-9 w-auto object-contain bg-ice rounded-sm p-1" />
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-ice leading-tight">Staff Portal</p>
              <p className="text-ice/50 text-xs">{profile.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <StaffAvatar name={profile.name} photoURL={profile.photo_url} size={32} />
              <span className="hidden sm:block text-ice text-sm font-medium">{profile.name}</span>
            </div>
            <button onClick={() => supabase.auth.signOut()} className="btn-outline text-sm !py-2 !px-4">
              Log Out
            </button>
          </div>
        </div>

        <div className="container-page flex gap-2 overflow-x-auto pb-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-display font-semibold border-b-2 whitespace-nowrap transition-colors duration-200 ${
                tab === t.id ? 'text-gold border-gold' : 'text-ice/60 border-transparent hover:text-ice'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="container-page py-12">
        {tab === 'profile' && <ProfileTab user={user} profile={profile} onUpdate={onProfileUpdate} />}
        {tab === 'messages' && <MessagesTab user={user} profile={profile} />}
        {tab === 'notices' && <NoticeBoardTab user={user} profile={profile} />}
        {tab === 'website' && profile.is_admin && <WebsiteAdminTab />}
        {tab === 'erp' && <ErpTab />}
      </div>
    </div>
  )
}

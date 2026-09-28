import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconArrow } from './Icons.jsx'

export function SectionHeading({ title, lede, align = 'left', dark = false }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className={`text-3xl md:text-[2.5rem] leading-[1.1] font-semibold ${dark ? 'text-ice' : 'text-navy'}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-ice/65' : 'text-steel'}`}>{lede}</p>
      )}
    </div>
  )
}

export function Stat({ value, label, dark = true }) {
  return (
    <div className="px-6 py-2 first:pl-0 last:pr-0">
      <p className={`font-display text-4xl md:text-5xl font-semibold ${dark ? 'text-ice' : 'text-navy'}`}>
        {value}
      </p>
      <p className={`mt-2 text-sm ${dark ? 'text-ice/60' : 'text-steel'}`}>{label}</p>
    </div>
  )
}

const avatarPalette = ['#D5B840', '#55645C', '#0B4433', '#B89A2E']

export function Avatar({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  const color = avatarPalette[Math.abs(hash) % avatarPalette.length]

  const dims = size === 'lg' ? 'w-28 h-28 text-2xl' : 'w-16 h-16 text-base'

  return (
    <div
      className={`${dims} rounded-full flex items-center justify-center font-display font-semibold text-ice shrink-0`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function PersonPhoto({ name, image, size = 'md' }) {
  const dims = size === 'lg' ? 'w-28 h-28 md:w-32 md:h-32' : 'w-16 h-16'
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return <Avatar name={name} size={size} />
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setFailed(true)}
      className={`${dims} rounded-full object-cover shrink-0 border-2 border-ice shadow-[0_4px_14px_-4px_rgba(6,42,32,0.35)]`}
    />
  )
}

export function IconBadge({ icon: Icon, className = '' }) {
  return (
    <div className={`w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center ${className}`}>
      <Icon className="w-5 h-5 text-navy" />
    </div>
  )
}

export function CTABanner() {
  return (
    <section className="bg-navy bg-frost">
      <div className="container-page py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-ice leading-tight">
            Ready to stock quality frozen products?
          </h2>
          <p className="mt-4 text-ice/65 leading-relaxed">
            Partner with Little Sesame Foods for consistent supply, verified cold-chain handling and
            competitive pricing across our full catalogue.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <NavLink to="/about" className="btn-primary">
            Talk to Our Team <IconArrow />
          </NavLink>
          <NavLink to="/gallery" className="btn-outline">
            View Our Gallery
          </NavLink>
        </div>
      </div>
    </section>
  )
}

const origins = [
  { code: 'EU', name: 'Europe', x: 14 },
  { code: 'AM', name: 'Americas', x: 45 },
  { code: 'OT', name: 'Other Regions', x: 76 },
]

export function OriginRoute() {
  return (
    <div className="relative">
      <svg viewBox="0 0 100 30" className="w-full h-auto overflow-visible" preserveAspectRatio="none" aria-hidden="true">
        <line x1="14" y1="8" x2="86" y2="8" stroke="#2E5A47" strokeWidth="0.4" strokeDasharray="1.6 2" />
        {origins.map((o) => (
          <circle key={o.code} cx={o.x} cy="8" r="1.4" fill="#D5B840" />
        ))}
        <circle cx="86" cy="8" r="1.9" fill="none" stroke="#D5B840" strokeWidth="0.5" />
        <circle cx="86" cy="8" r="0.9" fill="#D5B840" />
      </svg>
      <div className="flex justify-between mt-3 text-xs md:text-sm text-ice/70 font-body">
        <div className="text-left" style={{ marginLeft: '0%' }}>Europe</div>
        <div className="text-center">Americas</div>
        <div className="text-right">
          <span className="text-gold font-semibold">Ghana</span> &amp; West Africa
        </div>
      </div>
    </div>
  )
}

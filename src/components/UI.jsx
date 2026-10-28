import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconArrow, IconSnowflake } from './Icons.jsx'

export function SectionHeading({ title, lede, align = 'left', dark = false, kicker }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {kicker && <p className={`kicker mb-3 ${dark ? '!text-gold' : ''}`}>{kicker}</p>}
      <h2
        className={`text-3xl md:text-[2.6rem] leading-[1.08] font-semibold tracking-tight ${
          dark ? 'text-ice' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? 'text-ice/70' : 'text-steel'}`}>
          {lede}
        </p>
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
    <div
      className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/5 ring-1 ring-gold/30 flex items-center justify-center ${className}`}
    >
      <Icon className="w-6 h-6 text-navy" />
    </div>
  )
}

// Fades and rises its children into view as they scroll on screen.
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

// An <img> that quietly swaps to a tidy placeholder if the picture is
// missing or fails to load, so the page never shows a broken-image icon.
export function ImageWithFallback({ src, alt, className = '', placeholder = null, ...rest }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`img-placeholder flex items-center justify-center text-navy/25 ${className}`}
      >
        {placeholder || <IconSnowflake className="w-12 h-12" />}
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} {...rest} />
}

// Dark intro banner used at the top of inner pages.
export function PageHero({ title, lede, children }) {
  return (
    <section className="relative overflow-hidden bg-navy bg-frost text-ice">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brandgreen/30 blur-3xl" aria-hidden="true" />
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-ice">{title}</h1>
          {lede && <p className="mt-6 text-lg text-ice/70 leading-relaxed">{lede}</p>}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}

export function CTABanner() {
  return (
    <section className="bg-ice pb-20 md:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy bg-frost px-8 py-14 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-ice leading-tight tracking-tight">
              Ready to stock quality frozen products?
            </h2>
            <p className="mt-4 text-ice/65 leading-relaxed">
              Partner with Little Sesame Foods for consistent supply, verified cold-chain handling and
              competitive pricing across our full catalogue.
            </p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <NavLink to="/products" className="btn-primary">
              Browse Products <IconArrow />
            </NavLink>
            <NavLink to="/about" className="btn-outline">
              Talk to Our Team
            </NavLink>
          </div>
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

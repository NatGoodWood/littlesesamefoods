const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconSnowflake({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12" />
      <path d="M12 6.5 9.5 4M12 6.5 14.5 4M12 17.5 9.5 20M12 17.5 14.5 20" />
      <path d="M7 8 4 7.3M7 8 6.5 5M17 8l3-.7M17 8l.5-3M7 16l-3 .7M7 16l-.5 3M17 16l3 .7M17 16l.5 3" />
    </svg>
  )
}

export function IconGlobe({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 2.6 4.2 5.7 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.7-4.2-9S9.2 5.6 12 3Z" />
    </svg>
  )
}

export function IconTruck({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  )
}

export function IconShield({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconThermometer({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0Z" />
    </svg>
  )
}

export function IconLeaf({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 20c8-1 13-6 15-15-9 1-14 6-15 15Z" />
      <path d="M6 18c2.5-3 6-5.5 10-8" />
    </svg>
  )
}

export function IconScale({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3v18M8 21h8M12 3 5 7M12 3l7 4" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0L5 7ZM19 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
    </svg>
  )
}

export function IconEye({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconMenu({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconClose({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}

export function IconArrow({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconPin({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  )
}

export function IconMail({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6.5 8-6.5" />
    </svg>
  )
}

export function IconPhone({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

export function IconExternal({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
      <path d="M14 4h6v6M10 14 20 4" />
    </svg>
  )
}

export function IconLayers({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  )
}
export function IconLinkedIn({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.98c0-1.43-.03-3.26-1.99-3.26-2 0-2.3 1.56-2.3 3.16V20H9.4V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.43 0 4.06 2.26 4.06 5.2V20Z" />
    </svg>
  )
}
export function IconWhatsApp({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.1.55 4.15 1.6 5.95L0 24l6.36-1.67a11.83 11.83 0 0 0 5.7 1.46h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.23-6.15-3.43-8.43ZM12.07 21.76h-.01a9.84 9.84 0 0 1-5.01-1.37l-.36-.21-3.78.99 1.01-3.69-.23-.38a9.83 9.83 0 0 1-1.51-5.22c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.11 1.02 6.97 2.88a9.78 9.78 0 0 1 2.88 6.97c0 5.44-4.42 9.88-9.82 9.88Zm5.4-7.38c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.48-.87-.77-1.46-1.72-1.63-2.02-.17-.29-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.49-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.07-.11-.27-.18-.57-.33Z" />
    </svg>
  )
}

export function IconInstagram({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconFacebook({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.34C15.9 4.2 15 4.1 13.98 4.1c-2.4 0-4.05 1.46-4.05 4.15V10.4H7.3v3h2.63V21h3.57Z" />
    </svg>
  )
}

export function IconChevronLeft({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export function IconChevronRight({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function IconSearch({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function IconImage({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
    </svg>
  )
}

export function IconUpload({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

export function IconTrash({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  )
}

export function IconArrowUp({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  )
}

export function IconArrowDown({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

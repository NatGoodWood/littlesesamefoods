import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IconMenu, IconClose } from './Icons.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/team', label: 'Directors & Team' },
  { to: '/gallery', label: 'Gallery' },
]

function isCurrent(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-ice/85 shadow-[0_8px_30px_-18px_rgba(6,42,32,0.35)] border-b border-border/70'
          : 'bg-ice/70 border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between">
        <NavLink to="/" className="flex shrink-0 items-center gap-3">
          <img src="/logo.png" alt="Little Sesame Group" className="h-11 w-auto object-contain" />
          <span className="hidden sm:block font-display text-base font-semibold leading-tight text-navy">
            Little Sesame
            <span className="block text-xs font-medium tracking-wide text-steel">Foods</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {links.map((l) => {
            const current = isCurrent(pathname, l.to)
            return (
              <NavLink
                key={l.to}
                to={l.to}
                aria-current={current ? 'page' : undefined}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  current ? 'bg-navy text-ice' : 'text-ink/70 hover:bg-navy/5 hover:text-navy'
                }`}
              >
                {l.label}
              </NavLink>
            )
          })}
          <NavLink to="/contact" className="btn-primary ml-3 !px-5 !py-2.5 text-sm">
            Get in Touch
          </NavLink>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-full p-2 text-navy transition-colors hover:bg-navy/5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-ice md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {links.map((l) => {
              const current = isCurrent(pathname, l.to)
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={`rounded-xl px-4 py-3.5 font-body text-base font-medium transition-all duration-150 active:scale-[0.98] ${
                    current ? 'bg-navy text-ice' : 'text-ink/80 hover:bg-mist'
                  }`}
                >
                  {l.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

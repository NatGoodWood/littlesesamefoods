import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconMenu, IconClose } from './Icons.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/directors', label: 'Directors' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-ice/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Little Sesame Group" className="h-12 w-auto object-contain" />
          <span className="hidden sm:block font-display text-base font-semibold text-navy leading-tight">
            Little Sesame
            <span className="block text-xs font-medium text-steel tracking-wide">Foods</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `link-underline font-body text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-gold-dark is-active' : 'text-ink/70 hover:text-navy'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="btn-primary text-sm !py-2.5 !px-5">
            Get in Touch
          </NavLink>
        </nav>

        <button
          className="md:hidden text-navy p-2 -mr-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-ice">
          <nav className="container-page flex flex-col py-4 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-2 -mx-2 rounded-sm font-body text-base border-b border-border last:border-b-0 transition-all duration-150 active:scale-[0.97] active:bg-mist ${
                    isActive ? 'text-gold-dark' : 'text-ink/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

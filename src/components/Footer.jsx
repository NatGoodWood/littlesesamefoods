import { NavLink } from 'react-router-dom'
import { IconMail, IconPhone, IconPin, IconWhatsApp, IconInstagram, IconFacebook } from './Icons.jsx'
import { companyInfo } from '../data/content.js'
import { PRODUCT_CATEGORIES } from '../data/settings.js'

const socialClass =
  'flex h-10 w-10 items-center justify-center rounded-full border border-ice/20 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold active:scale-90'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-navy text-ice/80">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-block rounded-2xl bg-ice p-2.5">
            <img src="/logo.jpg" alt="Little Sesame Group" className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ice/65">
            A frozen food import and distribution company sourcing quality products from Europe, the
            Americas and beyond proudly part of the Little Sesame Group.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://wa.me/233538910899" aria-label="WhatsApp" className={socialClass}>
              <IconWhatsApp />
            </a>
            <a href="https://www.instagram.com/littlesesamefoods/" aria-label="Instagram" className={socialClass}>
              <IconInstagram />
            </a>
            <a href="https://www.facebook.com/littlesesamefoods/" aria-label="Facebook" className={socialClass}>
              <IconFacebook />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 font-display text-sm font-semibold text-ice">Navigate</p>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/" className="link-underline transition-colors hover:text-gold">Home</NavLink></li>
            <li><NavLink to="/about" className="link-underline transition-colors hover:text-gold">About</NavLink></li>
            <li><NavLink to="/products" className="link-underline transition-colors hover:text-gold">Products</NavLink></li>
            <li><NavLink to="/team" className="link-underline transition-colors hover:text-gold">Directors &amp; Team</NavLink></li>
            <li><NavLink to="/gallery" className="link-underline transition-colors hover:text-gold">Gallery</NavLink></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="mb-4 font-display text-sm font-semibold text-ice">Products</p>
          <ul className="space-y-3 text-sm">
            {PRODUCT_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <NavLink to={`/products/${c.slug}`} className="link-underline transition-colors hover:text-gold">
                  {c.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 font-display text-sm font-semibold text-ice">Contact</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{companyInfo.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-gold" />
              <span>{companyInfo.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 shrink-0 text-gold" />
              <span>{companyInfo.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ice/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ice/50 sm:flex-row">
          <p>&copy; {year} Little Sesame Foods. A subsidiary of Little Sesame Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Cold chain integrity, from origin to doorstep.</p>
            <span className="text-ice/20">|</span>
            <NavLink to="/admin" className="link-underline transition-colors hover:text-gold">Staff Login</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

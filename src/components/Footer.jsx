import { NavLink } from 'react-router-dom'
import { IconMail, IconPhone, IconPin, IconLinkedIn, IconInstagram, IconFacebook } from './Icons.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-ice/80">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="bg-ice inline-block p-2 rounded-md">
            <img src="/logo.jpg" alt="Little Sesame Group" className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm text-ice/65">
            A frozen food import and distribution company sourcing quality products from Europe, the
            Americas and beyond, proudly part of the Little Sesame Group.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="https://www.instagram.com/littlesesamefoods/" aria-label="Instagram" className="w-9 h-9 rounded-full border border-ice/20 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 active:scale-90 transition-all duration-200">
              <IconInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-ice/20 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 active:scale-90 transition-all duration-200">
              <IconFacebook />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ice mb-4">Navigate</p>
          <ul className="space-y-3 text-sm">
            <li><NavLink to="/" className="link-underline hover:text-gold transition-colors">Home</NavLink></li>
            <li><NavLink to="/about" className="link-underline hover:text-gold transition-colors">About</NavLink></li>
            <li><NavLink to="/team" className="link-underline hover:text-gold transition-colors">Team</NavLink></li>
            <li><NavLink to="/contact" className="link-underline hover:text-gold transition-colors">Contact</NavLink></li>
            <li><NavLink to="/gallery" className="link-underline hover:text-gold transition-colors">Gallery</NavLink></li>
            <li><NavLink to="/directors" className="link-underline hover:text-gold transition-colors">Directors</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-ice mb-4">Contact</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <IconPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span>Tema Fishing Harbor, Tema, Ghana</span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="w-4 h-4 text-gold shrink-0" />
              <span>+233 (0) 24 222 9096 </span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="w-4 h-4 text-gold shrink-0" />
              <span>info@littlesesamefoods.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ice/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ice/50">
          <p>&copy; {year} Little Sesame Foods. A subsidiary of Little Sesame Group. All rights reserved.| Developed by Pacawood Services </p>
          <div className="flex items-center gap-4">
            <p>Cold chain integrity, from origin to doorstep.</p>
            <span className="text-ice/20">|</span>
            <NavLink to="/admin" className="link-underline hover:text-gold transition-colors">Staff Login</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

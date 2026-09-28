import { NavLink } from 'react-router-dom'
import { IconArrow, IconPhone, IconFacebook, IconMail, IconShield, IconThermometer, IconLeaf } from '../components/Icons.jsx'



export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy bg-frost relative overflow-hidden">
        <div className="container-page py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-semibold text-ice">
              Contact Us 
            </h1>
            <p className="mt-6 text-ice/70 text-lg leading-relaxed max-w-lg">
              Have questions or want to learn more about our products and services? Get in touch with us today!
            </p>
          
            <div className="mt-9 flex flex-wrap gap-4">
              <div className="flex items-center gap-4 mt-6">
                <a href="mailto:info@littlesesamefoods.com" aria-label="Email" className="w-9 h-9 rounded-full border border-ice/100 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 active:scale-90 transition-all duration-200">
                  <IconMail className="w-10 h-7 text-gold shrink-0" />
                </a>
                <a href="tel:+233242229096" aria-label="Phone" className="w-9 h-9 rounded-full border border-ice/100 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 active:scale-90 transition-all duration-200">
                  <IconPhone className="w-10 h-7 text-gold shrink-0" />
                </a>
                
                </div>
            </div>
          </div>
          
        </div>

        </section>

      {/* Group affiliation strip */}
      <section className="bg-ice border-t border-border">
        <div className="container-page py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <IconLeaf className="w-8 h-8 text-gold-dark shrink-0" />
            <p className="text-navy text-base md:text-lg">
              Little Sesame Foods is a proud subsidiary of{' '}
              <span className="font-display font-semibold">Little Sesame Group</span>.
            </p>
          </div>
          <NavLink to="/about" className="btn-outline-dark">
            Learn about our group <IconArrow />
          </NavLink>
        </div>
      </section>

    </div>
  )
}

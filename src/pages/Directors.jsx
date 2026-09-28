import { SectionHeading, Avatar } from '../components/UI.jsx'
import { IconLinkedIn, IconMail } from '../components/Icons.jsx'
import { directors } from '../data/content.js'

export default function Directors() {
  return (
    <div>
      <section className="bg-navy bg-frost">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-ice leading-[1.1]">
              Meet Our Directors
            </h1>
            <p className="mt-6 text-ice/70 text-lg leading-relaxed">
              A leadership team and a wider group focused on one goal: getting quality frozen products
              to market, reliably.
            </p>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="section bg-ice">
        <div className="container-page">
          <SectionHeading
            title="Directors' Profile"
            lede="Little Sesame Foods is led by a small, hands-on board drawn from across the Little Sesame Group."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
            {directors.map((d) => (
              <div key={d.name} className="border-t border-border pt-8">
                {/* ✅ Avatar now uses image */}
                <Avatar name={d.name} size="lg" image={d.image} />
                <h3 className="mt-6 text-xl font-semibold text-navy">{d.name}</h3>
                <p className="text-gold-dark text-sm font-display font-semibold mt-1">{d.role}</p>
                <p className="mt-4 text-steel text-sm leading-relaxed">{d.bio}</p>
                <div className="flex items-center gap-3 mt-5">
                  <a
                    href="#"
                    aria-label={`${d.name} on LinkedIn`}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-steel hover:text-gold-dark hover:border-gold transition-colors"
                  >
                    <IconLinkedIn />
                  </a>
                  <a
                    href="#"
                    aria-label={`Email ${d.name}`}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-steel hover:text-gold-dark hover:border-gold transition-colors"
                  >
                    <IconMail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
} 
    
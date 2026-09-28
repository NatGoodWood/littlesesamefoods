import { SectionHeading, Avatar, CTABanner } from '../components/UI.jsx'
import { IconLinkedIn, IconMail } from '../components/Icons.jsx'
import { departments } from '../data/content.js'

export default function Team() {
  return (
    <div>
      <section className="bg-navy bg-frost">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-ice leading-[1.1]">
              The Team behind Little Sesame Foods
            </h1>
            <p className="mt-6 text-ice/70 text-lg leading-relaxed">
              Meet our frontline team from the  Administration, Sales & Operation departments at Little Sesame Foods.
            </p>
          </div>
        </div>
      </section>

      

      {/* Team */}
      <section className="section bg-mist">
        <div className="container-page">
          <SectionHeading
            title="Our Team"
            lede="Departments working together to keep sourcing, cold-chain handling and distribution running smoothly."
          />

          <div className="mt-14 space-y-14">
            {departments.map((dept) => (
              <div key={dept.name}>
                <h3 className="text-lg font-display font-semibold text-navy pb-4 border-b border-border">
                  {dept.name}
                </h3>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dept.members.map((m) => (
                    <div key={m.name} className="flex items-center gap-4">
                      {/* ✅ Avatar now uses image */}
                      <Avatar name={m.name} image={m.image} />
                      <div>
                        <p className="font-semibold text-navy">{m.name}</p>
                        <p className="text-steel text-sm">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

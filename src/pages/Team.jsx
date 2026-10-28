import { SectionHeading, PersonPhoto, CTABanner, PageHero, Reveal } from '../components/UI.jsx'
import { IconLinkedIn, IconMail } from '../components/Icons.jsx'
import { directors, departments } from '../data/content.js'

export default function Team() {
  return (
    <div>
      <PageHero
        title="The people behind every shipment."
        lede="A leadership team and a wider group focused on one goal: getting quality frozen products to market, reliably."
      />

      {/* Directors */}
      <section className="section bg-ice">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Directors' Profile"
              lede="Little Sesame Foods is led by a small, hands-on board drawn from across the Little Sesame Group."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {directors.map((d, i) => (
              <Reveal key={d.name} delay={i * 100}>
                <div className="h-full rounded-3xl border border-border bg-ice p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <PersonPhoto name={d.name} image={d.image} size="lg" />
                  <h3 className="mt-6 text-xl font-semibold text-navy">{d.name}</h3>
                  <p className="mt-1 font-display text-sm font-semibold text-gold-dark">{d.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-steel">{d.bio}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href="#"
                      aria-label={`${d.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-steel transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <IconLinkedIn />
                    </a>
                    <a
                      href="#"
                      aria-label={`Email ${d.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-steel transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      <IconMail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Our Team"
              lede="Departments working together to keep sourcing, cold-chain handling and distribution running smoothly."
            />
          </Reveal>

          <div className="mt-14 space-y-14">
            {departments.map((dept) => (
              <div key={dept.name}>
                <h3 className="border-b border-border pb-4 font-display text-lg font-semibold text-navy">
                  {dept.name}
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {dept.members.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-ice p-4 shadow-soft"
                    >
                      <PersonPhoto name={m.name} image={m.image} />
                      <div>
                        <p className="font-semibold text-navy">{m.name}</p>
                        <p className="text-sm text-steel">{m.role}</p>
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

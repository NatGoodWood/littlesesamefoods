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

    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {directors.map((d, i) => (
        <Reveal key={d.name} delay={i * 100}>
          <article className="overflow-hidden rounded-3xl border border-border bg-ice shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            
            {/* Director Photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-semibold text-white">
                  {d.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-white/80">
                  {d.role}
                </p>
              </div>
            </div>

            {/* Director Info */}
            <div className="p-6">
              <p className="text-sm leading-relaxed text-steel">
                {d.bio}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={`mailto:${d.email}`}
                  aria-label={`Email ${d.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-steel transition-colors hover:border-gold hover:text-gold-dark"
                >
                  <IconMail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
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

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dept.members.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 70}>
                <article className="group overflow-hidden rounded-3xl border border-border bg-ice shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  
                  {/* IMAGE */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-mist">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h4 className="text-lg font-semibold text-white">
                        {m.name}
                      </h4>
                      <p className="text-sm text-white/80">
                        {m.role}
                      </p>
                    </div>
                  </div>

                </article>
              </Reveal>
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



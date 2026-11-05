import { NavLink } from 'react-router-dom'
import { SectionHeading, CTABanner, IconBadge, PersonPhoto, Reveal, ImageWithFallback } from '../components/UI.jsx'
import { IconGlobe, IconThermometer, IconShield, IconTruck, IconArrow } from '../components/Icons.jsx'
import { directors } from '../data/content.js'
import { SLOT_ABOUT } from '../data/settings.js'
import { useSiteImages, firstImageUrl } from '../data/siteHooks.js'

// Used until a photo is uploaded from the Staff Portal (Site Images -> About page).
const DEFAULT_ABOUT_IMAGE =
  'https://images.pexels.com/photos/4487382/pexels-photo-4487382.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop'

const process = [
  {
    n: '01',
    title: 'Sourcing',
    desc: 'We work directly with vetted processors and exporters across Europe, the Americas and other regions to select products that meet our quality benchmarks.',
  },
  {
    n: '02',
    title: 'Cold-chain logistics',
    desc: 'Every shipment moves in temperature-controlled containers, with handling monitored from vessel to our warehouse facilities.',
  },
  {
    n: '03',
    title: 'Quality control',
    desc: 'Incoming stock is inspected against food safety and documentation standards before it clears for distribution.',
  },
  {
    n: '04',
    title: 'Distribution',
    desc: 'Products reach retailers, food service partners and distributors while cold-chain integrity is maintained end to end.',
  },
]

const values = [
  { icon: IconThermometer, title: 'Reliability', desc: 'Consistent supply and predictable delivery schedules our partners can plan around.' },
  { icon: IconShield, title: 'Integrity', desc: 'Transparent sourcing and honest handling of every product we bring in.' },
  { icon: IconGlobe, title: 'Global standard', desc: 'Products sourced and handled to standards recognised across international markets.' },
  { icon: IconTruck, title: 'Efficiency', desc: 'Lean logistics that keep costs competitive without cutting corners on quality.' },
]

export function AboutView({ heroImage }) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ice">
        <div className="container-page pb-12 pt-16 md:pt-24">
          <p className="kicker">How It Started</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-navy md:text-6xl">
            Our dream is to power reliable cold-chain import.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            Little Sesame Foods was founded to bring dependable, quality frozen food products into the
            market sourced responsibly, handled correctly, and delivered on time, every time.
          </p>
        </div>

        <div className="container-page pb-16 md:pb-24">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <ImageWithFallback
              src="./izako.jpeg"
              alt="Little Sesame Foods warehouse operations"
              className="h-[280px] w-full object-cover md:h-[460px]"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-mist">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <SectionHeading
              align="center"
              title="Our Mission"
              lede="We strive to bring dependable, quality frozen food to the Ghanaian market driving consistency and trust for every business we supply."
            />
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section bg-ice">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" title="Our Core Values" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-border bg-ice p-7 text-center shadow-soft">
                  <div className="flex justify-center">
                    <IconBadge icon={v.icon} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Group affiliation */}
      <section className="section bg-mist">
        <div className="container-page grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="kicker">Our story</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-navy">
              From a single warehouse to a trusted import partner
            </h2>
            <p className="mt-5 leading-relaxed text-steel">
              Little Sesame Foods began with a simple observation: businesses across the region needed
              a dependable source of quality frozen products, backed by proper cold-chain handling
              rather than guesswork. What started as a modest import operation has grown into a
              distribution business trusted by retailers and food service partners.
            </p>
            <p className="mt-4 leading-relaxed text-steel">
              Today, we import a wide range of frozen goods from poultry, beef, fish and mutton
              sourced from processors across Europe, the Americas and other regions, and
              distributed through a network built on consistency and trust.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-border bg-ice p-8 shadow-soft md:p-10">
              <p className="kicker">Part of a larger group</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-navy">Little Sesame Group</h3>
              <p className="mt-4 leading-relaxed text-steel">
                Little Sesame Foods operates as a subsidiary of Little Sesame Group, drawing on the
                group's wider resources, governance and industry relationships. This affiliation
                strengthens our sourcing capability while keeping day-to-day operations focused
                specifically on frozen food import and distribution.
              </p>
              <p className="mt-4 leading-relaxed text-steel">
                The relationship gives our partners added confidence: behind every shipment is not just
                a single company, but the standards and stability of an established group.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-navy bg-frost">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              dark
              title="How a shipment reaches you"
              lede="Four stages stand between an order placed with an overseas processor and a pallet arriving at your door."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="h-full rounded-3xl border border-ice/10 bg-ice/5 p-7 backdrop-blur">
                  <span className="font-display text-sm text-gold">{p.n}</span>
                  <h3 className="mt-3 text-lg font-semibold text-ice">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ice/65">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="section bg-ice">
        <div className="container-page">
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title="Team" lede="The leadership guiding Little Sesame Foods day to day." />
            <NavLink
              to="/team"
              className="link-underline inline-flex shrink-0 items-center gap-2 font-display text-sm font-semibold text-navy"
            >
              Meet the full team <IconArrow className="h-4 w-4" />
            </NavLink>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
            {directors.map((d) => (
              <div key={d.name} className="flex flex-col items-center text-center">
                <PersonPhoto name={d.name} image={d.image} size="lg" />
                <h3 className="mt-5 text-base font-semibold leading-snug text-navy">{d.name}</h3>
                <p className="mt-1 text-sm font-medium text-gold-dark">{d.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default function About() {
  const { images } = useSiteImages([SLOT_ABOUT])
  return <AboutView heroImage={firstImageUrl(images, SLOT_ABOUT) || DEFAULT_ABOUT_IMAGE} />
}

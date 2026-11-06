import { NavLink } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import { SectionHeading, CTABanner, IconBadge, Reveal, ImageWithFallback } from '../components/UI.jsx'
import {
  IconArrow,
  IconGlobe,
  IconTruck,
  IconShield,
  IconThermometer,
  IconLeaf,
} from '../components/Icons.jsx'
import { PRODUCT_CATEGORIES, SLOT_BANNER, categorySlot } from '../data/settings.js'
import { useSiteImages, useStockItems, coverFor } from '../data/siteHooks.js'

// Shown until banner pictures are uploaded from the Staff Portal
// (Site Images -> Home banner). Once at least one picture is uploaded,
// the uploaded slides replace these.
const DEFAULT_SLIDES = [
  {
    id: 'default-welcome',
    image: './izako.jpeg',
    title: 'Welcome to Little Sesame Foods ®',
    subtitle:
      'Importation, cold storage and nationwide distribution of frozen food products in Ghana.',
  },
  {
    id: 'default-range',
    image: './lamb.jpg',
    title: 'Poultry, beef and fish you can rely on',
    subtitle: 'Handled through a structured cold chain from point of importation to final delivery.',
  },
  {
    id: 'default-clients',
    image: './cowleg.jpg',
    title: 'Supplying wholesalers, retailers and institutions',
    subtitle: 'Supporting food availability and supply chain efficiency within Ghana.',
  },
]

const values = [
  { icon: IconThermometer, title: 'Importation of frozen food products', desc: '' },
  { icon: IconShield, title: 'Cold storage and temperature-controlled warehousing', desc: '' },
  { icon: IconGlobe, title: 'Quality assurance and food safety management', desc: '' },
  { icon: IconTruck, title: 'Frozen food distribution and logistics', desc: '' },
]

const reasons = [
  {
    icon: IconThermometer,
    title: 'Unbroken cold chain',
    desc: 'Temperature controlled handling monitored from port of origin to final delivery.',
  },
  {
    icon: IconGlobe,
    title: 'Global sourcing network',
    desc: 'Direct relationships with processors across Europe, the Americas and beyond.',
  },
  {
    icon: IconShield,
    title: 'Quality you can trust',
    desc: 'Every shipment is inspected and documented against international food safety standards.',
  },
]

export function HomeView({ slides, images, counts }) {
  return (
    <div>
      <HeroSlider slides={slides} />

      {/* Welcome */}
      <section className="bg-ice">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-7">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-navy md:text-5xl">
              Welcome to Little Sesame Foods <sup className="text-[0.5em] align-super">®</sup>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-steel">
              Little Sesame Foods is a Ghana-based company engaged in the importation, cold storage, and
              nationwide distribution of frozen food products. The company operates a structured cold chain
              system that ensures product safety, quality, and freshness from point of importation through to
              final delivery.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-steel">
              The company serves wholesalers, retailers, and institutional clients, supporting food
              availability and supply chain efficiency within Ghana.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <NavLink to="/about" className="btn-primary">
                Discover Our Story <IconArrow />
              </NavLink>
              <NavLink to="/team" className="btn-outline-dark">
                Meet the Team
              </NavLink>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={120}>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-brandgreen/20 blur-xl" aria-hidden="true" />
              <div className="relative rounded-[2rem] border border-border bg-ice p-8 shadow-lift">
                <img src="/logo.jpg" alt="Little Sesame Foods logo" className="h-auto w-full object-contain" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-mist">
        <div className="container-page py-16 md:py-24">
          <Reveal>
            <SectionHeading
              align="center"
              kicker="Our purpose"
              title="Our Mission"
              lede="To provide a reliable supply of frozen food products to the Ghanaian market, ensuring that our customers have access to safe, high-quality, and diverse food options. We are dedicated to maintaining the integrity of our cold chain logistics, fostering strong relationships with our suppliers and customers, and contributing positively to the communities we serve."
            />
          </Reveal>
        </div>
      </section>

      {/* Core activities */}
      <section className="section bg-ice">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" title="Our Core Activities" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-border bg-ice p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <IconBadge icon={v.icon} />
                  <h3 className="mt-6 text-lg font-semibold leading-snug text-navy">{v.title}</h3>
                  {v.desc ? <p className="mt-2 text-sm leading-relaxed text-steel">{v.desc}</p> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="section bg-mist">
        <div className="container-page">
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              kicker="Products"
              title="What we bring in"
              lede="A growing catalogue of frozen products chosen for consistent quality and steady supply."
            />
            <NavLink to="/products" className="btn-outline-dark shrink-0 self-start md:self-auto">
              View all products <IconArrow />
            </NavLink>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((c, i) => {
              const count = counts[c.slug] || 0
              return (
                <Reveal key={c.slug} delay={i * 100}>
                  <NavLink
                    to={`/products/${c.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-navy shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <ImageWithFallback
                      src={coverFor(c.slug, images)}
                      alt={c.label}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <h3 className="text-2xl font-semibold text-ice">{c.label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ice/75">{c.desc}</p>
                      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-ice/15 px-4 py-2 text-sm font-medium text-ice backdrop-blur transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                        {count > 0 ? `${count} item${count === 1 ? '' : 's'} in stock` : 'Browse products'}
                        <IconArrow className="h-4 w-4" />
                      </span>
                    </div>
                  </NavLink>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-ice">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              kicker="Why us"
              title="Why businesses stock with us"
              lede="Cold-chain logistics is unforgiving. We built our operation around getting it right, every shipment."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <div className="h-full rounded-3xl bg-mist p-8">
                  <r.icon className="mb-6 h-8 w-8 text-brandgreen" />
                  <h3 className="text-lg font-semibold text-navy">{r.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Group affiliation strip */}
      <section className="bg-ice">
        <div className="container-page pb-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border bg-mist/60 px-8 py-8 md:flex-row">
            <div className="flex items-center gap-4">
              <IconLeaf className="h-8 w-8 shrink-0 text-gold-dark" />
              <p className="text-base text-navy md:text-lg">
                Little Sesame Foods is a proud subsidiary of{' '}
                <span className="font-display font-semibold">Little Sesame Group</span>.
              </p>
            </div>
            <NavLink to="/about" className="btn-outline-dark shrink-0">
              Learn about our group <IconArrow />
            </NavLink>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default function Home() {
  const slots = [SLOT_BANNER, ...PRODUCT_CATEGORIES.map((c) => categorySlot(c.slug))]
  const { images } = useSiteImages(slots)
  const { items } = useStockItems()

  const uploaded = images
    .filter((img) => img.slot === SLOT_BANNER)
    .map((img) => ({ id: img.id, image: img.image_url, title: img.title, subtitle: img.subtitle }))

  // Uploaded slides replace the defaults. A slide with no headline of its own
  // shows the welcome headline so the banner always says something.
  const slides =
    uploaded.length > 0
      ? uploaded.map((s) => ({
          ...s,
          title: s.title || DEFAULT_SLIDES[0].title,
          subtitle: s.title ? s.subtitle : s.subtitle || DEFAULT_SLIDES[0].subtitle,
        }))
      : DEFAULT_SLIDES

  const counts = {}
  for (const item of items) counts[item.category] = (counts[item.category] || 0) + 1

  return <HomeView slides={slides} images={images} counts={counts} />
}

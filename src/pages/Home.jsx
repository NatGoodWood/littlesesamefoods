import { NavLink } from 'react-router-dom'
import { SectionHeading, Stat, CTABanner, IconBadge } from '../components/UI.jsx'
import HeroArt from '../components/HeroArt.jsx'
import { IconArrow, IconSnowflake, IconGlobe, IconTruck, IconShield, IconThermometer, IconLeaf } from '../components/Icons.jsx'

const categories = [
  {
    name: 'Poultry',
    desc: 'Browse through our variety of poultry products.',
     link: "/products/poultry",
    image: '/wings.jpg',
  },
  {
    name: 'Beef',
    desc: 'Browse through our variety of beef products',
    link: "/products/beef",
    image: '/beef.jpg',
  },
  {
    name: 'Fish',
    desc: 'Browse through our variety of Fish products',
    link: "/products/Fish",
    image: '/mackerel.jpg',
  },
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
const values = [
  { icon: IconThermometer, title: 'Importation of frozen food products', desc: '' },
  { icon: IconShield, title: 'Cold storage and temperature-controlled warehousing', desc: '' },
  { icon: IconGlobe, title: 'Quality assurance and food safety management', desc: '' },
  { icon: IconTruck, title: 'Frozen food distribution and logistics', desc: '' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy bg-frost relative overflow-hidden">
  <div className="container-page py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-semibold text-ice">
        Welcome to Little Sesame Foods &reg;
      </h1>
      <p className="mt-6 text-ice/70 text-lg leading-relaxed max-w-lg">
        Little Sesame Foods is a Ghana-based company engaged in the importation, cold storage, and nationwide distribution of frozen food products. The company operates a structured cold chain system that ensures product safety, quality, and freshness from point of importation through to final delivery.
        The company serves wholesalers, retailers, and institutional clients, supporting food availability and supply chain efficiency within Ghana.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <NavLink to="/about" className="btn-primary">
          Discover Our Story <IconArrow />
        </NavLink>
        <NavLink to="/team" className="btn-outline">
          Meet the Team
        </NavLink>
      </div>
    </div>

    {/* ✅ Logo image instead of HeroArt */}
    <div className="max-w-md mx-auto md:max-w-none flex justify-center">
      <img 
        src="/logo.jpg" 
        alt="Little Sesame Foods Logo" 
        className="w-100 h-auto object-contain rounded-lg" 
      />
    </div>
  </div>
</section>

      {/* Mission */}
            <section className="bg-mist">
              <div className="container-page py-16 md:py-20">
                <SectionHeading
                  align="center"
                  title="Our Mission"
                  lede=" To provide a reliable supply of frozen food products to the Ghanaian market, ensuring that our customers have access to safe, high-quality, and diverse food options. We are dedicated to maintaining the integrity of our cold chain logistics, fostering strong relationships with our suppliers and customers, and contributing positively to the communities we serve."
                />
              </div>
            </section>
      
            {/* Core values — clean icon-badge grid */}
            <section className="section bg-ice">
              <div className="container-page">
                <SectionHeading align="center" title="Our Core Activities" />
      
                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {values.map((v) => (
                    <div key={v.title} className="text-center flex flex-col items-center">
                      <IconBadge icon={v.icon} className="bg-gold/10" />
                      <h3 className="mt-5 text-lg font-semibold text-navy">{v.title}</h3>
                      <p className="mt-2 text-steel text-sm leading-relaxed max-w-[220px]">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

      {/*

      {/* Product categories */}
      <section className="section bg-ice">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading
              title="What we bring in"
              lede="A growing catalogue of frozen products chosen for consistent quality and steady supply."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
  {categories.map((c) => (
    <NavLink 
      to={c.link} 
      key={c.name} 
      className="group card-hover rounded-sm overflow-hidden bg-ice border border-border"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={c.image}
          alt={c.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <IconSnowflake className="w-5 h-5 text-gold-dark mb-3" />
        <h3 className="text-xl font-semibold text-navy">{c.name}</h3>
        <p className="mt-2 text-steel text-sm leading-relaxed">{c.desc}</p>
      </div>
    </NavLink>
  ))}
</div>

        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-mist">
        <div className="container-page">
          <SectionHeading
            title="Why businesses stock with us"
            lede="Cold-chain logistics is unforgiving. We built our operation around getting it right, every shipment."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {reasons.map((r) => (
              <div key={r.title} className="pt-6 border-t-2 border-navy/10">
                <r.icon className="w-7 h-7 text-navy mb-5" />
                <h3 className="text-lg font-semibold text-navy">{r.title}</h3>
                <p className="mt-2.5 text-steel text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
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
          <NavLink to="/directors" className="btn-outline-dark">
            Learn about our group <IconArrow />
          </NavLink>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

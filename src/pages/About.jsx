// import { SectionHeading, CTABanner } from '../components/UI.jsx'
// import { IconGlobe, IconThermometer, IconShield, IconTruck } from '../components/Icons.jsx'

// const process = [
//   {
//     n: '01',
//     title: 'Sourcing',
//     desc: 'We work directly with vetted processors and exporters across Europe, the Americas and other regions to select products that meet our quality benchmarks.',
//   },
//   {
//     n: '02',
//     title: 'Cold-chain logistics',
//     desc: 'Every shipment moves in temperature-controlled containers, with handling monitored from vessel to our coldstore facilities.',
//   },
//   {
//     n: '03',
//     title: 'Quality control',
//     desc: 'Incoming stock is inspected against food safety and documentation standards before it clears for distribution.',
//   },
//   {
//     n: '04',
//     title: 'Distribution',
//     desc: 'Products reach retailers, food service partners and distributors while cold-chain integrity is maintained end to end.',
//   },
// ]

// const values = [
//   { icon: IconThermometer, title: 'Reliability', desc: 'Consistent supply and predictable delivery schedules our partners can plan around.' },
//   { icon: IconShield, title: 'Integrity', desc: 'Transparent sourcing and honest handling of every product we bring in.' },
//   { icon: IconGlobe, title: 'Global standard', desc: 'Products sourced and handled to standards recognised across international markets.' },
//   { icon: IconTruck, title: 'Efficiency', desc: 'Lean logistics that keep costs competitive without cutting corners on quality.' },
// ]

// export default function About() {
//   return (
//     <div>
//       <section className="bg-navy bg-frost">
//         <div className="container-page py-20 md:py-24">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-5xl font-semibold text-ice leading-[1.1]">
//               Built on cold-chain discipline and global relationships.
//             </h1>
//             <p className="mt-6 text-ice/70 text-lg leading-relaxed">
//               As the foundational Company of the Little Sesame Group, Little Sesame Foods is the expert in cold chain logistics and frozen food distribution. We are the crucial link that guarantees quality and freshness from source to destination, ensuring tha customers receive products in perfect condition. Our deep-rooted belief that food nourishes people and builds communities drives our commitment to reliability. We dont just move goods; we protect reputatons and sustain trust. Throug disciplined management and a focus on operatonal execellence, we have become the trusted backbone for distribution in Ghana, weathering marlet challenges to provide unwavering service. Our mission is to be the most dependable partner in the frozen food supply chain, ensuring that every product we deliver meets the highest standards of safety and quality.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="section bg-ice">
//         <div className="container-page grid md:grid-cols-2 gap-16 items-start">
//           <div>
//             <p className="kicker">Our story</p>
//             <h2 className="mt-3 text-3xl font-semibold text-navy leading-tight">
//               The Humble beginning
//             </h2>
//             <p className="mt-5 text-steel leading-relaxed">
//               In the year 2020, Little Sesame Foods was established with a clear mission: to provide Ghana with a reliable source of premium frozen foods. Recognizing the growing demand for high-quality frozen products, we set out to create a company that would not only meet this need but also set new standards in cold-chain logistics and food safety.
//             </p>
//             <p className="mt-4 text-steel leading-relaxed">
//               Today, we import a wide range of frozen goods poultry, meat, seafood
//               sourced from processors across Europe, the Americas and other regions, and
//               distributed through a network built on consistency and trust.
//             </p>
//           </div>

//           <div className="bg-mist p-8 md:p-10 rounded-sm">
//             <p className="kicker">Part of a larger group</p>
//             <h3 className="mt-3 text-2xl font-semibold text-navy leading-tight">Little Sesame Group</h3>
//             <p className="mt-4 text-steel leading-relaxed">
//               Little Sesamе Group is more than a collecton of companies; we are a strategically connected ecosystem powering commerce and enriching communities across Ghana. From humble beginnings, our vision has grown into a dynamic network that feeds, moves and inspires. Our strenght lies in synergy. By mastering critical links in the supply chain, from importation and production to logistics and distribution, we ensure quality, reliability and value from source to destination. But our ambition extends beyond business.We are commited to building future leaders, investing in our communities, and creating a seamlessly connected future for Ghana.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="section bg-navy">
//         <div className="container-page">
//           <SectionHeading
//             dark
//             title="How a shipment reaches you"
//             lede="Four stages stand between an order placed with an overseas processor and a pallet arriving at your door."
//           />

//           <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//             {process.map((p) => (
//               <div key={p.n} className="border-t border-ice/15 pt-6">
//                 <span className="font-display text-sm text-gold">{p.n}</span>
//                 <h3 className="mt-3 text-lg font-semibold text-ice">{p.title}</h3>
//                 <p className="mt-2.5 text-ice/60 text-sm leading-relaxed">{p.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="section bg-ice">
//         <div className="container-page">
//           <SectionHeading title="What guides us" lede="The principles behind how we source, handle and deliver." />

//           <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//             {values.map((v) => (
//               <div key={v.title} className="pt-6 border-t-2 border-navy/10">
//                 <v.icon className="w-7 h-7 text-navy mb-5" />
//                 <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
//                 <p className="mt-2.5 text-steel text-sm leading-relaxed">{v.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <CTABanner />
//     </div>
//   )
// }
import { NavLink } from 'react-router-dom'
import { SectionHeading, CTABanner, IconBadge, PersonPhoto } from '../components/UI.jsx'
import { IconGlobe, IconThermometer, IconShield, IconTruck, IconArrow } from '../components/Icons.jsx'
import { directors } from '../data/content.js'

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
  { icon: IconThermometer, title: 'Importation of frozen food products', desc: '' },
  { icon: IconShield, title: 'Cold storage and temperature-controlled warehousing', desc: '' },
  { icon: IconGlobe, title: 'Quality assurance and food safety management', desc: '' },
  { icon: IconTruck, title: 'Frozen food distribution and logistics', desc: '' },
]

 

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ice">
        <div className="container-page pt-16 md:pt-24 pb-12">
          <p className="kicker">How It Started</p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-navy leading-[1.1] max-w-3xl">
            Built on cold-chain discipline and global relationships.
          </h1>
          <p className="mt-6 text-steel text-lg leading-relaxed max-w-xl">
             As the foundational Company of the Little Sesame Group, Little Sesame Foods is the expert in cold chain logistics and frozen food distribution. We are the crucial link that guarantees quality and freshness from source to destination, ensuring tha customers receive products in perfect condition. Our deep-rooted belief that food nourishes people and builds communities drives our commitment to reliability. We dont just move goods; we protect reputatons and sustain trust. Through disciplined management and a focus on operatonal execellence, we have become the trusted backbone for distribution in Ghana, weathering marlet challenges to provide unwavering service. Our mission is to be the most dependable partner in the frozen food supply chain, ensuring that every product we deliver meets the highest standards of safety and quality.
          </p>
        </div>

        {/* Full-width feature image */}
        <div className="container-page pb-16 md:pb-20">
          <div className="rounded-sm overflow-hidden">
            <img
              src=""
              alt="[Coldstore Image]"
              className="w-full h-[280px] md:h-[440px] object-cover"
              loading="lazy"
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
            lede="To provide a reliable supply of frozen food products to the Ghanaian market, ensuring that our customers have access to safe, high-quality, and diverse food options. We are dedicated to maintaining the integrity of our cold chain logistics, fostering strong relationships with our suppliers and customers, and contributing positively to the communities we serve."
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

      {/* Story + Group affiliation */}
      <section className="section bg-mist">
        <div className="container-page grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="kicker">Our story</p>
            <h2 className="mt-3 text-3xl font-semibold text-navy leading-tight">
              The Humble beginning
            </h2>
            <p className="mt-5 text-steel leading-relaxed">
              In the year 2020, Little Sesame Foods was established with a clear mission: to provide Ghana with a reliable source of premium frozen foods. Recognizing the growing demand for high-quality frozen products, we set out to create a company that would not only meet this need but also set new standards in cold-chain logistics and food safety.
            </p>
            <p className="mt-4 text-steel leading-relaxed">
              Today, we import a wide range of frozen goods poultry, meat, seafood, vegetables and
              more sourced from processors across Europe, the Americas and other regions, and
              distributed through a network built on consistency and trust.
            </p>
          </div>

          <div className="bg-ice p-8 md:p-10 rounded-sm border border-border">
            <p className="kicker">Part of a larger group</p>
            <h3 className="mt-3 text-2xl font-semibold text-navy leading-tight">Little Sesame Group</h3>
            <p className="mt-4 text-steel leading-relaxed">
              Little Sesamе Group is more than a collecton of companies; we are a strategically connected ecosystem powering commerce and enriching communities across Ghana. From humble beginnings, our vision has grown into a dynamic network that feeds, moves and inspires. Our strenght lies in synergy. By mastering critical links in the supply chain, from importation and production to logistics and distribution, we ensure quality, reliability and value from source to destination. But our ambition extends beyond business.We are commited to building future leaders, investing in our communities, and creating a seamlessly connected future for Ghana.
            </p>
            <p className="mt-4 text-steel leading-relaxed">
              The relationship gives our partners added confidence: behind every shipment is not just
              a single company, but the standards and stability of an established group.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-navy">
        <div className="container-page">
          <SectionHeading
            dark
            title="How our products reach you"
            lede="Four key stages to ensure quality and freshness from source to destination."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {process.map((p) => (
              <div key={p.n} className="border-t border-ice/15 pt-6">
                <span className="font-display text-sm text-gold">{p.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-ice">{p.title}</h3>
                <p className="mt-2.5 text-ice/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
<section className="section bg-ice">
  <div className="container-page">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
      <SectionHeading 
        title="Founder's Message" 
        lede="Collaboration is key; together we can acheive more than we ever could alone, Let your passion drive you, and your purpose will. Every Successful person was once an amateur who refused to give up, You are not just part of a company you are part of a movement. - Mrs Patience Enyonam Wonder Scott-Obu " 
      />
      <NavLink 
        to="/team" 
        className="link-underline text-navy font-display font-semibold text-sm inline-flex items-center gap-2 shrink-0"
      >
        Meet the full team <IconArrow className="w-4 h-4" />
      </NavLink>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8 gap-y-12">
      {/* Only show the first director */}
      <div className="text-center flex flex-col items-center">
        <PersonPhoto 
          name={directors[0].name} 
          image={directors[0].image} 
          size="lg" 
        />
        <h3 className="mt-5 text-base font-semibold text-navy leading-snug">
          {directors[0].name}
        </h3>
        <p className="mt-1 text-gold-dark text-sm font-medium">
          {directors[0].role}
        </p>
      </div>
    </div>
  </div>
</section>


      <CTABanner />
    </div>
  )
}

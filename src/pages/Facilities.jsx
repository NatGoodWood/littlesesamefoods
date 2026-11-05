import { useState } from 'react'
import { PageHero, CTABanner, ImageWithFallback, Reveal, SectionHeading } from '../components/UI.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { IconPin, IconPhone, IconClock, IconArrow, IconExternal, IconImage } from '../components/Icons.jsx'
import {
  FACILITIES,
  facilitySlot,
  safeHttpUrl,
  telHref,
  mapsSearchUrl,
  mapsEmbedUrl,
} from '../data/settings.js'
import { useSiteImages, useFacilityDetails } from '../data/siteHooks.js'

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-navy">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-steel">{label}</p>
        <div className="mt-0.5 text-base leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  )
}

export function FacilitySection({ facility, details, photos, index, onOpenPhoto }) {
  const d = details || {}
  const address = String(d.address || '').trim()
  const directions = String(d.directions || '').trim()
  const phone = String(d.phone || '').trim()
  const hours = String(d.hours || '').trim()
  const mapUrl = safeHttpUrl(d.map_url)
  const hasLocation = Boolean(address || directions || phone || hours || mapUrl)
  const directionsHref = mapUrl || (address ? mapsSearchUrl(`${facility.name} ${address}`) : '')
  const flip = index % 2 === 1

  return (
    <section id={facility.slug} className={`section ${index % 2 === 0 ? 'bg-ice' : 'bg-mist'}`}>
      <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Photos */}
        <Reveal className={flip ? 'lg:order-2' : ''}>
          {photos.length > 0 ? (
            <div>
              <button
                type="button"
                onClick={() => onOpenPhoto(facility.slug, 0)}
                aria-label={`Open photos of ${facility.name}`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-[2rem] shadow-lift"
              >
                <ImageWithFallback
                  src={photos[0].image_url}
                  alt={`${facility.name} cold store`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              {photos.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {photos.slice(1, 5).map((photo, i) => {
                    const realIndex = i + 1
                    const hidden = photos.length - 5
                    const isLast = i === 3 && hidden > 0
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => onOpenPhoto(facility.slug, realIndex)}
                        aria-label={`Open ${facility.name} photo ${realIndex + 1}`}
                        className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-mist"
                      >
                        <ImageWithFallback
                          src={photo.image_url}
                          alt={`${facility.name} photo ${realIndex + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {isLast ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-navy/70 text-lg font-semibold text-ice">
                            +{hidden}
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-border bg-ice/70 text-steel">
              <IconImage className="h-10 w-10 text-gold-dark" />
              <p className="text-sm">Photos of {facility.name} coming soon</p>
            </div>
          )}
        </Reveal>

        {/* Details */}
        <Reveal delay={100} className={flip ? 'lg:order-1' : ''}>
          <p className="kicker">Cold store {index + 1} of {FACILITIES.length}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{facility.name}</h2>
          <p className="mt-4 text-lg leading-relaxed text-steel">
            {String(d.description || '').trim() || facility.blurb}
          </p>

          <div className="mt-8 space-y-5">
            {address ? (
              <DetailRow icon={IconPin} label="Location">
                <span className="whitespace-pre-line">{address}</span>
              </DetailRow>
            ) : null}
            {directions ? (
              <DetailRow icon={IconArrow} label="How to find us">
                <span className="whitespace-pre-line">{directions}</span>
              </DetailRow>
            ) : null}
            {phone ? (
              <DetailRow icon={IconPhone} label="Phone">
                {telHref(phone) ? (
                  <a href={telHref(phone)} className="link-underline font-medium text-navy">
                    {phone}
                  </a>
                ) : (
                  phone
                )}
              </DetailRow>
            ) : null}
            {hours ? (
              <DetailRow icon={IconClock} label="Opening hours">
                <span className="whitespace-pre-line">{hours}</span>
              </DetailRow>
            ) : null}
            {!hasLocation ? (
              <p className="rounded-2xl border border-border bg-ice/70 p-5 text-sm text-steel">
                Detailed location information for {facility.name} will be added soon.
              </p>
            ) : null}
          </div>

          {directionsHref ? (
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              Get directions <IconExternal className="h-4 w-4" />
            </a>
          ) : null}

          {address ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-mist">
              <iframe
                src={mapsEmbedUrl(`${facility.name} ${address}`)}
                title={`Map of ${facility.name}`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

export function FacilitiesView({ details, images, onOpenPhoto }) {
  return (
    <div>
      <PageHero
        title="Our Cold Store Facilities"
        lede="Four cold store facilities keep our frozen food products safe, from arrival through to dispatch."
      >
        <div className="flex flex-wrap gap-3">
          {FACILITIES.map((f) => (
            <a
              key={f.slug}
              href={`#${f.slug}`}
              className="rounded-full border border-ice/30 bg-ice/10 px-5 py-2.5 text-sm font-medium text-ice backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-navy"
            >
              {f.name}
            </a>
          ))}
        </div>
      </PageHero>

      {FACILITIES.map((facility, index) => (
        <FacilitySection
          key={facility.slug}
          facility={facility}
          index={index}
          details={details[facility.slug]}
          photos={images.filter((img) => img.slot === facilitySlot(facility.slug))}
          onOpenPhoto={onOpenPhoto}
        />
      ))}

      <section className="bg-ice py-16">
        <div className="container-page">
          <SectionHeading
            align="center"
            title="Temperature-controlled, from arrival to dispatch"
            lede="Every facility supports the same cold chain standards that protect product safety, quality and freshness."
          />
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default function Facilities() {
  const { images } = useSiteImages(FACILITIES.map((f) => facilitySlot(f.slug)))
  const { details } = useFacilityDetails()
  const [open, setOpen] = useState(null) // { slug, index }

  const openPhotos = open ? images.filter((img) => img.slot === facilitySlot(open.slug)) : []
  const openFacility = open ? FACILITIES.find((f) => f.slug === open.slug) : null
  const items = openPhotos.map((img, i) => ({
    src: img.image_url,
    alt: `${openFacility ? openFacility.name : 'Facility'} photo ${i + 1}`,
    caption: openFacility ? openFacility.name : '',
  }))

  return (
    <>
      <FacilitiesView details={details} images={images} onOpenPhoto={(slug, index) => setOpen({ slug, index })} />
      {open && items[open.index] ? (
        <Lightbox
          items={items}
          index={open.index}
          onClose={() => setOpen(null)}
          onIndexChange={(i) => setOpen({ slug: open.slug, index: i })}
        />
      ) : null}
    </>
  )
}

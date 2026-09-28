import { useEffect, useState } from 'react'
import { SectionHeading, CTABanner } from '../components/UI.jsx'
import { IconArrow, IconGlobe } from '../components/Icons.jsx'
import { GALLERY_URL_KEY, DEFAULT_GALLERY_URL } from '../data/settings.js'

export default function Gallery() {
  // The gallery link can be updated from /admin (management only) without
  // touching code. It falls back to the default link below if none is saved.
  const [galleryUrl, setGalleryUrl] = useState(DEFAULT_GALLERY_URL)

  useEffect(() => {
    const saved = window.localStorage.getItem(GALLERY_URL_KEY)
    if (saved) setGalleryUrl(saved)
  }, [])

  return (
    <div>
      <section className="bg-navy bg-frost">
        <div className="container-page py-20 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-ice leading-[1.1]">Gallery</h1>
            <p className="mt-6 text-ice/70 text-lg leading-relaxed">
              A look inside our warehouse, cold storage facilities and the products we bring in — from
              arrival to distribution.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-ice">
        <div className="container-page">
          <SectionHeading
            title="Browse our photo album"
            lede="Our full gallery is hosted on Google Photos. Preview it below, or open it directly for the best experience."
          />

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-mist p-6 md:p-8 rounded-sm">
            <div className="flex items-center gap-4">
              <IconGlobe className="w-8 h-8 text-gold-dark shrink-0" />
              <p className="text-navy text-sm md:text-base leading-relaxed">
                For the fastest, full-resolution browsing experience, view the album directly on
                Google Photos.
              </p>
            </div>
            <a
              href={galleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shrink-0"
            >
              Open Full Gallery <IconArrow />
            </a>
          </div>

          <div className="mt-10 rounded-sm overflow-hidden border border-border bg-navy">
            <div className="aspect-video w-full">
              <iframe
                src={galleryUrl}
                title="Little Sesame Foods photo gallery"
                className="w-full h-full"
                loading="lazy"
                allow="fullscreen"
              />
            </div>
          </div>
          <p className="mt-4 text-xs text-steel">
            If the preview above doesn't display, use the "Open Full Gallery" button — this is a
            restriction Google Photos applies to embedded pages, not a broken link.
          </p>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

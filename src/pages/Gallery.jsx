import { useEffect, useState } from 'react'
import { PageHero, CTABanner, ImageWithFallback, SectionHeading } from '../components/UI.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { IconArrow, IconGlobe, IconImage } from '../components/Icons.jsx'
import { GALLERY_URL_KEY, DEFAULT_GALLERY_URL, SLOT_GALLERY } from '../data/settings.js'
import { useSiteImages } from '../data/siteHooks.js'

export function GalleryView({ photos, loaded, albumUrl, onOpen }) {
  const hasAlbum = !String(albumUrl).includes('REPLACE-WITH-YOUR-ALBUM-LINK')

  return (
    <div>
      <PageHero
        title="Gallery"
        lede="A look inside our warehouse, cold storage facilities and the products we bring in from arrival to distribution."
      />

      <section className="section bg-ice">
        <div className="container-page">
          <SectionHeading title="Photos from Little Sesame Foods" />

          {!loaded && (
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-mist" />
              ))}
            </div>
          )}

          {loaded && photos.length === 0 && (
            <div className="mt-12 rounded-3xl border border-border bg-mist/60 p-12 text-center">
              <IconImage className="mx-auto h-10 w-10 text-gold-dark" />
              <p className="mt-4 text-lg font-semibold text-navy">Photos coming soon</p>
              <p className="mt-2 text-steel">We're adding pictures of our facilities and products.</p>
            </div>
          )}

          {loaded && photos.length > 0 && (
            <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => onOpen(i)}
                  aria-label={`Open photo ${i + 1}`}
                  className="group mb-5 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-mist break-inside-avoid shadow-soft"
                >
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.alt}
                    className="h-auto w-full min-h-[120px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {hasAlbum && (
        <section className="bg-mist py-16">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-ice p-8 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <IconGlobe className="h-8 w-8 shrink-0 text-gold-dark" />
                <p className="text-sm leading-relaxed text-navy md:text-base">
                  Want to see more? Our complete photo album is on Google Photos.
                </p>
              </div>
              <a href={albumUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                Open Full Album <IconArrow />
              </a>
            </div>

            <details className="mt-6 overflow-hidden rounded-3xl border border-border bg-ice">
              <summary className="cursor-pointer px-8 py-5 text-sm font-medium text-navy">
                Preview the album on this page
              </summary>
              <div className="aspect-video w-full bg-navy">
                <iframe
                  src={albumUrl}
                  title="Little Sesame Foods photo album"
                  className="h-full w-full"
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>
              <p className="px-8 py-4 text-xs text-steel">
                If the preview stays blank, use "Open Full Album" — Google Photos doesn't allow some of its
                pages to be shown inside other websites.
              </p>
            </details>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  )
}

export default function Gallery() {
  // The Google Photos link can be updated from the Staff Portal (Website
  // Admin tab) without touching code.
  const [albumUrl, setAlbumUrl] = useState(DEFAULT_GALLERY_URL)
  const [openIndex, setOpenIndex] = useState(null)
  const { images, loaded } = useSiteImages([SLOT_GALLERY])

  useEffect(() => {
    const saved = window.localStorage.getItem(GALLERY_URL_KEY)
    if (saved) setAlbumUrl(saved)
  }, [])

  const photos = images.map((img, i) => ({
    id: img.id,
    src: img.image_url,
    alt: img.title || `Little Sesame Foods photo ${i + 1}`,
  }))

  return (
    <>
      <GalleryView photos={photos} loaded={loaded} albumUrl={albumUrl} onOpen={setOpenIndex} />
      {openIndex !== null && photos[openIndex] ? (
        <Lightbox items={photos} index={openIndex} onClose={() => setOpenIndex(null)} onIndexChange={setOpenIndex} />
      ) : null}
    </>
  )
}

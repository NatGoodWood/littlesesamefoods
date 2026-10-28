import { useEffect } from 'react'
import { IconClose, IconChevronLeft, IconChevronRight } from './Icons.jsx'

// Full-screen image viewer. items: [{ src, alt, caption }]
// Closes on Esc / backdrop click; arrow keys move between images.
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const total = items.length

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') onClose()
      if (total > 1 && event.key === 'ArrowRight') onIndexChange((index + 1) % total)
      if (total > 1 && event.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [index, total, onClose, onIndexChange])

  const item = items[index]
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Image preview'}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice transition-colors hover:bg-gold hover:text-navy"
      >
        <IconClose className="h-5 w-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onIndexChange((index - 1 + total) % total)
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice transition-colors hover:bg-gold hover:text-navy md:left-6"
          >
            <IconChevronLeft />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onIndexChange((index + 1) % total)
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice transition-colors hover:bg-gold hover:text-navy md:right-6"
          >
            <IconChevronRight />
          </button>
        </>
      )}

      <figure className="max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt || ''}
          className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />
        {(item.caption || total > 1) && (
          <figcaption className="mt-4 text-center text-sm text-ice/80">
            {item.caption}
            {total > 1 ? <span className="ml-2 text-ice/50">{index + 1} / {total}</span> : null}
          </figcaption>
        )}
      </figure>
    </div>
  )
}

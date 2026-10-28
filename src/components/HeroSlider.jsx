import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconArrow, IconChevronLeft, IconChevronRight } from './Icons.jsx'

// Full-width home-page banner. Slides come from the Staff Portal's
// "Site Images" tab (or the built-in defaults until some are uploaded).
//
// Each slide: { id, image, title, subtitle }
// - Autoplays; the thin progress bars drive the timing (so they never drift).
// - Pauses on hover/focus, supports swipe on phones and the arrow buttons.
// - Autoplay is switched off for visitors who prefer reduced motion.
export default function HeroSlider({ slides, interval = 6500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const touchX = useRef(null)

  const count = slides.length
  const autoplay = count > 1 && !reduceMotion

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const onChange = (event) => setReduceMotion(event.matches)
    if (query.addEventListener) query.addEventListener('change', onChange)
    else query.addListener(onChange)
    return () => {
      if (query.removeEventListener) query.removeEventListener('change', onChange)
      else query.removeListener(onChange)
    }
  }, [])

  // If slides are added/removed while the page is open, never point past the end.
  useEffect(() => {
    setIndex((i) => (i >= count ? 0 : i))
  }, [count])

  if (count === 0) return null

  const active = slides[Math.min(index, count - 1)]

  function goTo(i) {
    setIndex(((i % count) + count) % count)
  }
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  function onTouchStart(event) {
    touchX.current = event.touches[0].clientX
  }
  function onTouchEnd(event) {
    if (touchX.current == null) return
    const delta = event.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(delta) > 50) {
      if (delta < 0) next()
      else prev()
    }
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-navy text-ice h-[78vh] min-h-[540px] max-h-[780px]"
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide backgrounds (cross-fade) */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.image ? (
            <img
              src={slide.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover ${i === index ? 'kenburns' : ''}`}
            />
          ) : (
            <div className="absolute inset-0 slide-fallback" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-navy/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
        </div>
      ))}

      {/* Slide text */}
      <div className="relative z-20 h-full container-page flex items-end pb-28 md:pb-32">
        <div key={active.id} className="max-w-2xl hero-rise">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-ice">
            {active.title}
          </h1>
          {active.subtitle ? (
            <p className="mt-5 text-lg text-ice/80 max-w-xl leading-relaxed">{active.subtitle}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <NavLink to="/products" className="btn-primary">
              Browse Products <IconArrow />
            </NavLink>
            <NavLink to="/about" className="btn-outline">
              Our Story
            </NavLink>
          </div>
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-30">
          <div className="container-page flex items-center justify-between gap-6">
            <div className="flex flex-1 max-w-md items-center gap-2" role="tablist" aria-label="Choose slide">
              {slides.map((slide, i) => {
                const isActive = i === index
                let fill = 'scale-x-0'
                if (i < index) fill = 'scale-x-100'
                if (isActive) fill = autoplay ? 'slide-progress' : 'scale-x-100'
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="relative flex h-6 flex-1 items-center"
                  >
                    <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-ice/25">
                      <span
                        key={isActive ? `active-${index}` : `idle-${i}-${i < index ? 'done' : 'todo'}`}
                        className={`absolute inset-0 origin-left rounded-full bg-gold ${fill}`}
                        style={
                          isActive && autoplay
                            ? { animationDuration: `${interval}ms`, animationPlayState: paused ? 'paused' : 'running' }
                            : undefined
                        }
                        onAnimationEnd={isActive && autoplay ? next : undefined}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-navy"
              >
                <IconChevronLeft />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ice/30 bg-ice/10 text-ice backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-navy"
              >
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

import { useState } from 'react'
import { NavLink, Navigate, useParams } from 'react-router-dom'
import { PageHero, CTABanner, ImageWithFallback, Reveal } from '../components/UI.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { IconSearch } from '../components/Icons.jsx'
import { PRODUCT_CATEGORIES, getCategory } from '../data/settings.js'
import { useStockItems } from '../data/siteHooks.js'

export function ProductCard({ item, categoryLabel, onPreview }) {
  const alt = `${item.brand} ${item.weight}`
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-ice shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        {item.image_url ? (
          <button
            type="button"
            onClick={() => onPreview({ src: item.image_url, alt, caption: `${item.brand} · ${item.weight}` })}
            className="block h-full w-full cursor-zoom-in"
            aria-label={`View photo of ${item.brand}`}
          >
            <ImageWithFallback
              src={item.image_url}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ) : (
          <ImageWithFallback src={null} alt={item.brand} className="h-full w-full" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ice/90 px-3 py-1 text-xs font-medium text-navy backdrop-blur">
          {categoryLabel}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug text-navy">{item.brand}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-navy">
            {item.weight}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brandgreen">
            <span className="h-2 w-2 rounded-full bg-brandgreen" />
            In stock
          </span>
        </div>
      </div>
    </article>
  )
}

function FilterChip({ to, active, label, count }) {
  return (
    <NavLink
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
        active ? 'bg-navy text-ice shadow-soft' : 'bg-mist text-ink/70 hover:bg-navy/10 hover:text-navy'
      }`}
    >
      {label}
      <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-ice/20 text-ice' : 'bg-ice text-steel'}`}>
        {count}
      </span>
    </NavLink>
  )
}

export function ProductsView({ activeSlug, items, loaded, failed, query, onQueryChange, onPreview }) {
  const activeCat = activeSlug === 'all' ? null : getCategory(activeSlug)
  const q = query.trim().toLowerCase()

  const matches = (item) =>
    !q ||
    [item.brand, item.weight, getCategory(item.category)?.label].some((value) =>
      String(value || '').toLowerCase().includes(q)
    )

  const visibleCategories = activeCat ? [activeCat] : PRODUCT_CATEGORIES
  const groups = visibleCategories.map((cat) => ({
    cat,
    items: items.filter((item) => item.category === cat.slug && matches(item)),
  }))
  const total = groups.reduce((sum, g) => sum + g.items.length, 0)

  const countFor = (slug) => items.filter((item) => item.category === slug).length

  return (
    <div>
      <PageHero
        title={activeCat ? `${activeCat.label} products` : 'Our Products'}
        lede={
          activeCat
            ? activeCat.desc
            : 'Frozen poultry, beef and fish see what we currently have in stock, by brand and pack weight.'
        }
      >
        <label className="relative block max-w-xl">
          <span className="sr-only">Search products</span>
          <IconSearch className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-steel" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by brand or weight…"
            className="w-full rounded-full border border-transparent bg-ice py-4 pl-14 pr-5 text-ink shadow-lift outline-none transition-colors focus:border-gold"
          />
        </label>
      </PageHero>

      {/* Category filter */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-ice/90 backdrop-blur-xl">
        <div className="container-page flex gap-3 overflow-x-auto py-4">
          <FilterChip to="/products" active={!activeCat} label="All" count={items.length} />
          {PRODUCT_CATEGORIES.map((c) => (
            <FilterChip
              key={c.slug}
              to={`/products/${c.slug}`}
              active={activeCat?.slug === c.slug}
              label={c.label}
              count={countFor(c.slug)}
            />
          ))}
        </div>
      </div>

      <section className="section bg-ice">
        <div className="container-page">
          {!loaded && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-mist" />
              ))}
            </div>
          )}

          {loaded && failed && (
            <div className="mx-auto max-w-xl rounded-3xl border border-border bg-mist/60 p-10 text-center">
              <h2 className="text-xl font-semibold text-navy">Our product list is temporarily unavailable</h2>
              <p className="mt-3 text-steel">
                Please check back shortly, or get in touch with our team for current stock and availability.
              </p>
              <NavLink to="/about" className="btn-primary mt-6">
                Contact our team
              </NavLink>
            </div>
          )}

          {loaded && !failed && total === 0 && (
            <div className="mx-auto max-w-xl rounded-3xl border border-border bg-mist/60 p-10 text-center">
              <h2 className="text-xl font-semibold text-navy">
                {q ? 'No products match your search' : 'No products listed here yet'}
              </h2>
              <p className="mt-3 text-steel">
                {q
                  ? 'Try a different brand name or weight, or clear the search to see everything.'
                  : 'New stock is added regularly — check back soon, or contact our team for availability.'}
              </p>
              {q ? (
                <button type="button" onClick={() => onQueryChange('')} className="btn-outline-dark mt-6">
                  Clear search
                </button>
              ) : null}
            </div>
          )}

          {loaded && !failed && total > 0 && (
            <div className="space-y-16">
              {groups
                .filter((g) => g.items.length > 0)
                .map(({ cat, items: catItems }) => (
                  <div key={cat.slug}>
                    {!activeCat && (
                      <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-navy">{cat.label}</h2>
                          <p className="mt-1 text-sm text-steel">{cat.desc}</p>
                        </div>
                        <NavLink
                          to={`/products/${cat.slug}`}
                          className="link-underline shrink-0 text-sm font-medium text-navy"
                        >
                          View all {cat.label.toLowerCase()}
                        </NavLink>
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {catItems.map((item, i) => (
                        <Reveal key={item.id} delay={(i % 4) * 70}>
                          <ProductCard item={item} categoryLabel={cat.label} onPreview={onPreview} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  )
}

export default function Products() {
  const { category } = useParams()
  const { items, loaded, failed } = useStockItems()
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState(null)

  // Unknown category in the address bar -> show the full catalogue instead.
  if (category && !getCategory(category)) return <Navigate to="/products" replace />

  const activeSlug = category ? String(category).toLowerCase() : 'all'

  return (
    <>
      <ProductsView
        activeSlug={activeSlug}
        items={items}
        loaded={loaded}
        failed={failed}
        query={query}
        onQueryChange={setQuery}
        onPreview={setPreview}
      />
      {preview ? (
        <Lightbox items={[preview]} index={0} onClose={() => setPreview(null)} onIndexChange={() => {}} />
      ) : null}
    </>
  )
}

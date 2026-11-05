import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import { getCategory, categorySlot, normalizeCategory } from './settings.js'

// Loads uploaded site images (banner slides, category photos, gallery, ...)
// for the given slots. If Supabase isn't set up yet, or the request fails,
// it simply returns an empty list so pages fall back to their defaults.
export function useSiteImages(slots) {
  const key = slots.join('|')
  const [state, setState] = useState({ images: [], loaded: false })

  useEffect(() => {
    let cancelled = false

    Promise.resolve(
      supabase
        .from('site_images')
        .select('*')
        .in('slot', key.split('|'))
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
    )
      .then(({ data, error }) => {
        if (cancelled) return
        setState({ images: error || !data ? [] : data, loaded: true })
      })
      .catch(() => {
        if (!cancelled) setState({ images: [], loaded: true })
      })

    return () => {
      cancelled = true
    }
  }, [key])

  return state
}

// Loads the live stock list that staff manage from the Staff Portal.
export function useStockItems() {
  const [state, setState] = useState({ items: [], loaded: false, failed: false })

  useEffect(() => {
    let cancelled = false

    Promise.resolve(supabase.from('stock_items').select('*').order('brand', { ascending: true }))
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data) {
          setState({ items: [], loaded: true, failed: true })
        } else {
          const items = data.map((row) => ({ ...row, category: normalizeCategory(row.category) }))
          setState({ items, loaded: true, failed: false })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ items: [], loaded: true, failed: true })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

// The photo to show for a category: the uploaded one if there is one,
// otherwise the built-in default from settings.js.
export function coverFor(slug, images) {
  const uploaded = (images || []).find((img) => img.slot === categorySlot(slug))
  return uploaded?.image_url || getCategory(slug)?.defaultImage || null
}

export function firstImageUrl(images, slot) {
  const found = (images || []).find((img) => img.slot === slot)
  return found?.image_url || null
}

// Loads the location details staff enter for each cold store facility
// (address, directions, phone, hours, map link), keyed by facility slug.
export function useFacilityDetails() {
  const [state, setState] = useState({ details: {}, loaded: false })

  useEffect(() => {
    let cancelled = false

    Promise.resolve(supabase.from('facility_details').select('*'))
      .then(({ data, error }) => {
        if (cancelled) return
        const details = {}
        if (!error && data) for (const row of data) details[row.slug] = row
        setState({ details, loaded: true })
      })
      .catch(() => {
        if (!cancelled) setState({ details: {}, loaded: true })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

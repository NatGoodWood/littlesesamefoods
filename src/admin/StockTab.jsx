import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import { PRODUCT_CATEGORIES, getCategory, normalizeCategory } from '../data/settings.js'
import { uploadSiteImage, removeSiteImageFile } from './imageUtils.js'
import { ImageWithFallback } from '../components/UI.jsx'
import { IconArrow, IconImage } from '../components/Icons.jsx'

function sortItems(a, b) {
  return a.category.localeCompare(b.category) || a.brand.localeCompare(b.brand)
}

function withCategory(row) {
  return { ...row, category: normalizeCategory(row.category) }
}

const inputClass =
  'w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none bg-ice'

export function StockList({ groups, busyId, onDelete, onReplaceImage }) {
  return (
    <div className="space-y-6">
      {groups.map(({ category, items }) => (
        <section key={category.slug} className="bg-ice border border-border rounded-xl p-6 md:p-8">
          <h3 className="font-display font-semibold text-navy mb-4">
            {category.label}{' '}
            <span className="text-sm font-normal text-steel">({items.length})</span>
          </h3>
          {items.length === 0 ? (
            <p className="text-sm text-steel">No items listed yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <ImageWithFallback
                      src={item.image_url}
                      alt={item.brand}
                      className="h-full w-full object-cover"
                      placeholder={<IconImage className="h-6 w-6" />}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy truncate">{item.brand}</p>
                    <p className="text-xs text-steel">
                      {item.weight}
                      {item.created_by_name ? ` • added by ${item.created_by_name}` : ''}
                    </p>
                  </div>
                  <label className="cursor-pointer text-xs font-medium text-navy hover:underline shrink-0">
                    {item.image_url ? 'Change photo' : 'Add photo'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={busyId === item.id}
                      onChange={(event) => {
                        const file = event.target.files && event.target.files[0]
                        event.target.value = ''
                        if (file) onReplaceImage(item, file)
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    disabled={busyId === item.id}
                    className="text-xs text-red-600 hover:underline shrink-0 disabled:opacity-50"
                  >
                    {busyId === item.id ? 'Working…' : 'Remove'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}

export default function StockTab({ user, profile }) {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0].slug)
  const [brand, setBrand] = useState('')
  const [weight, setWeight] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [fileKey, setFileKey] = useState(0)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    Promise.resolve(supabase.from('stock_items').select('*')).then(({ data }) => {
      if (!cancelled) setItems((data || []).map(withCategory).sort(sortItems))
    })

    const channel = supabase
      .channel('stock-items-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stock_items' }, (payload) => {
        setItems((prev) => {
          if (payload.eventType === 'DELETE') {
            return prev.filter((i) => i.id !== payload.old.id)
          }
          const row = withCategory(payload.new)
          if (payload.eventType === 'INSERT') {
            if (prev.some((i) => i.id === row.id)) return prev
            return [...prev, row].sort(sortItems)
          }
          if (payload.eventType === 'UPDATE') {
            return prev.map((i) => (i.id === row.id ? row : i)).sort(sortItems)
          }
          return prev
        })
      })
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  // Local preview of the photo picked in the form.
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl('')
      return undefined
    }
    const url = URL.createObjectURL(imageFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  async function handleAdd(e) {
    e.preventDefault()
    if (!brand.trim() || !weight.trim()) return
    setSaving(true)
    setError('')

    let uploaded = null
    try {
      if (imageFile) uploaded = await uploadSiteImage(imageFile, 'products')

      const { error: insertError } = await supabase.from('stock_items').insert({
        category,
        brand: brand.trim(),
        weight: weight.trim(),
        image_url: uploaded ? uploaded.url : null,
        image_path: uploaded ? uploaded.path : null,
        created_by: user.id,
        created_by_name: profile.name,
      })

      if (insertError) {
        if (uploaded) await removeSiteImageFile(uploaded.path)
        throw new Error('Could not add that item. Please try again.')
      }

      setBrand('')
      setWeight('')
      setImageFile(null)
      setFileKey((k) => k + 1)
    } catch (err) {
      setError(err.message || 'Could not add that item. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Remove ${item.brand} (${item.weight}) from the stock list?`)) return
    setBusyId(item.id)
    setError('')
    const { error: deleteError } = await supabase.from('stock_items').delete().eq('id', item.id)
    if (deleteError) {
      setError('Could not remove that item. Please try again.')
    } else if (item.image_path) {
      await removeSiteImageFile(item.image_path)
    }
    setBusyId(null)
  }

  async function handleReplaceImage(item, file) {
    setBusyId(item.id)
    setError('')
    try {
      const uploaded = await uploadSiteImage(file, 'products')
      const { error: updateError } = await supabase
        .from('stock_items')
        .update({ image_url: uploaded.url, image_path: uploaded.path })
        .eq('id', item.id)
      if (updateError) {
        await removeSiteImageFile(uploaded.path)
        throw new Error('Could not save the new photo. Please try again.')
      }
      if (item.image_path) await removeSiteImageFile(item.image_path)
    } catch (err) {
      setError(err.message || 'Could not update that photo.')
    } finally {
      setBusyId(null)
    }
  }

  const groups = PRODUCT_CATEGORIES.map((cat) => ({
    category: cat,
    items: items.filter((i) => i.category === cat.slug),
  }))
  const unlisted = items.filter((i) => !getCategory(i.category))
  if (unlisted.length > 0) {
    groups.push({
      category: { slug: 'other', label: 'Other (not shown on the website)' },
      items: unlisted,
    })
  }

  return (
    <div className="space-y-8">
      <section className="bg-ice border border-border rounded-xl p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">List a Stock Item</h2>
        <p className="text-steel text-sm mb-6">
          New items appear immediately on the public Products page and in the matching category. A
          photo is optional but helps customers recognise the pack.
        </p>
        <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr_auto] lg:items-end">
          <div>
            <label htmlFor="s-category" className="block text-sm font-medium text-navy mb-1.5">
              Category
            </label>
            <select
              id="s-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="s-brand" className="block text-sm font-medium text-navy mb-1.5">
              Brand name
            </label>
            <input
              id="s-brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Kievico"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="s-weight" className="block text-sm font-medium text-navy mb-1.5">
              Weight
            </label>
            <input
              id="s-weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 10kg"
              className={inputClass}
              required
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary !py-2.5 disabled:opacity-60 justify-center">
            {saving ? 'Adding…' : 'Add'} <IconArrow />
          </button>

          <div className="md:col-span-2 lg:col-span-4 flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist flex items-center justify-center text-steel">
              {previewUrl ? (
                <img src={previewUrl} alt="Selected product" className="h-full w-full object-cover" />
              ) : (
                <IconImage className="h-6 w-6" />
              )}
            </div>
            <div>
              <label className="btn-outline-dark !py-2 !px-4 text-sm cursor-pointer">
                {imageFile ? 'Change photo' : 'Add product photo (optional)'}
                <input
                  key={fileKey}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile((e.target.files && e.target.files[0]) || null)}
                />
              </label>
              {imageFile ? (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null)
                    setFileKey((k) => k + 1)
                  }}
                  className="ml-3 text-xs text-steel hover:underline"
                >
                  Remove photo
                </button>
              ) : null}
            </div>
          </div>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </section>

      <StockList groups={groups} busyId={busyId} onDelete={handleDelete} onReplaceImage={handleReplaceImage} />
    </div>
  )
}

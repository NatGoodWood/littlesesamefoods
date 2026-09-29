import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import { PRODUCT_CATEGORIES } from '../data/settings.js'
import { IconArrow } from '../components/Icons.jsx'

function sortItems(a, b) {
  return a.category.localeCompare(b.category) || a.brand.localeCompare(b.brand)
}

export default function StockTab({ user, profile }) {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0])
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [weight, setWeight] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    supabase
      .from('stock_items')
      .select('*')
      .then(({ data }) => {
        if (!cancelled) setItems((data || []).slice().sort(sortItems))
      })

    const channel = supabase
      .channel('stock-items-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stock_items' }, (payload) => {
        setItems((prev) => {
          if (payload.eventType === 'DELETE') {
            return prev.filter((i) => i.id !== payload.old.id)
          }
          if (payload.eventType === 'INSERT') {
            if (prev.some((i) => i.id === payload.new.id)) return prev
            return [...prev, payload.new].sort(sortItems)
          }
          if (payload.eventType === 'UPDATE') {
            return prev.map((i) => (i.id === payload.new.id ? payload.new : i)).sort(sortItems)
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

  async function handleAdd(e) {
    e.preventDefault()
    if (!brand.trim() || !weight.trim()) return
    setSaving(true)
    setError('')

    const { error: insertError } = await supabase.from('stock_items').insert({
      category,
      brand: brand.trim(),
      weight: weight.trim(),
      created_by: user.id,
      created_by_name: profile.name,
    })

    if (insertError) {
      setError('Could not add that item. Please try again.')
    } else {
      setBrand('')
      setWeight('')
    }
    setSaving(false)
  }

  async function handleDelete(id) {
    await supabase.from('stock_items').delete().eq('id', id)
  }

  const grouped = PRODUCT_CATEGORIES.map((cat) => ({
    category: cat,
    items: items.filter((i) => i.category === cat),
  }))

  return (
    <div className="space-y-8">
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">List a Stock Item</h2>
        <p className="text-steel text-sm mb-6">
          New items appear immediately on the public Home page, under "What we bring in".
        </p>
        <form onSubmit={handleAdd} className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 sm:items-end">
          <div>
            <label htmlFor="s-category" className="block text-sm font-medium text-navy mb-1.5">
              Category
            </label>
            <select
              id="s-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none bg-ice"
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
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
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="s-brand" className="block text-sm font-medium text-navy mb-1.5">
              Type
            </label>
            <input
              id="s-brand"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. wings"
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
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
              className="w-full border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
              required
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary !py-2.5 disabled:opacity-60 justify-center">
            {saving ? 'Adding…' : 'Add'} <IconArrow />
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>

      <div className="space-y-6">
        {grouped.map(({ category: cat, items: catItems }) => (
          <section key={cat} className="bg-ice border border-border rounded-sm p-6 md:p-8">
            <h3 className="font-display font-semibold text-navy mb-4">{cat}</h3>
            {catItems.length === 0 ? (
              <p className="text-sm text-steel">No items listed yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {catItems.map((item) => (
                  <li key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-navy">{item.brand}</p>
                      <p className="text-xs text-steel">
                        {item.weight}
                        {item.created_by_name ? ` • added by ${item.created_by_name}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-red-600 hover:underline shrink-0"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

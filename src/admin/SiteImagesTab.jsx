import { useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
import {
  PRODUCT_CATEGORIES,
  SLOT_BANNER,
  SLOT_GALLERY,
  SLOT_ABOUT,
  FACILITIES,
  categorySlot,
  facilitySlot,
} from '../data/settings.js'
import { uploadSiteImage, removeSiteImageFile } from './imageUtils.js'
import { ImageWithFallback } from '../components/UI.jsx'
import { IconUpload, IconTrash, IconArrowUp, IconArrowDown, IconImage } from '../components/Icons.jsx'

const SECTIONS = [
  { id: 'banner', label: 'Home banner' },
  { id: 'categories', label: 'Category photos' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'about', label: 'About page' },
]

const inputClass =
  'w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none bg-ice'

function byOrder(a, b) {
  return (a.sort_order || 0) - (b.sort_order || 0) || String(a.created_at).localeCompare(String(b.created_at))
}

export function UploadButton({ label, multiple = false, disabled = false, onFiles }) {
  return (
    <label
      className={`btn-primary !py-2.5 !px-5 text-sm cursor-pointer ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <IconUpload className="h-4 w-4" />
      {label}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files || [])
          event.target.value = ''
          if (files.length > 0) onFiles(files)
        }}
      />
    </label>
  )
}

export function SlideEditor({ slide, index, total, busy, onSave, onMove, onDelete }) {
  const [title, setTitle] = useState(slide.title || '')
  const [subtitle, setSubtitle] = useState(slide.subtitle || '')
  const dirty = title.trim() !== (slide.title || '') || subtitle.trim() !== (slide.subtitle || '')

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-border bg-ice p-4 md:flex-row">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-mist md:w-56">
        <ImageWithFallback
          src={slide.image_url}
          alt={`Banner slide ${index + 1}`}
          className="h-full w-full object-cover"
          placeholder={<IconImage className="h-8 w-8" />}
        />
        <span className="absolute left-2 top-2 rounded-full bg-navy/80 px-2.5 py-0.5 text-xs font-medium text-ice">
          {index + 1}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy" htmlFor={`slide-title-${slide.id}`}>
            Headline (optional)
          </label>
          <input
            id={`slide-title-${slide.id}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Shown over the picture"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy" htmlFor={`slide-sub-${slide.id}`}>
            Short text (optional)
          </label>
          <input
            id={`slide-sub-${slide.id}`}
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="One line under the headline"
            className={inputClass}
          />
        </div>
        <button
          type="button"
          disabled={!dirty || busy}
          onClick={() => onSave(slide, { title, subtitle })}
          className="btn-outline-dark !py-2 !px-4 text-sm disabled:opacity-50"
        >
          Save text
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-stretch">
        <button
          type="button"
          onClick={() => onMove(slide, -1)}
          disabled={busy || index === 0}
          aria-label="Move slide earlier"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy hover:bg-mist disabled:opacity-40"
        >
          <IconArrowUp />
        </button>
        <button
          type="button"
          onClick={() => onMove(slide, 1)}
          disabled={busy || index === total - 1}
          aria-label="Move slide later"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy hover:bg-mist disabled:opacity-40"
        >
          <IconArrowDown />
        </button>
        <button
          type="button"
          onClick={() => onDelete(slide)}
          disabled={busy}
          aria-label="Remove slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40"
        >
          <IconTrash />
        </button>
      </div>
    </li>
  )
}

export function SingleImage({ title, hint, src, isCustom, busy, onUpload, onReset }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-ice">
      <div className="aspect-[4/3] bg-mist">
        <ImageWithFallback
          src={src}
          alt={title}
          className="h-full w-full object-cover"
          placeholder={<IconImage className="h-10 w-10" />}
        />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-sm font-semibold text-navy">{title}</p>
          <p className="text-xs text-steel">{isCustom ? 'Custom photo in use' : hint}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <UploadButton
            label={busy ? 'Uploading…' : isCustom ? 'Replace photo' : 'Upload photo'}
            disabled={busy}
            onFiles={(files) => onUpload(files[0])}
          />
          {isCustom ? (
            <button type="button" onClick={onReset} disabled={busy} className="text-xs text-steel hover:underline">
              Use default
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function PhotoGrid({ photos, busyId, onDelete }) {
  if (photos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-mist/50 p-10 text-center text-sm text-steel">
        No gallery photos yet. Upload some and they'll appear on the public Gallery page.
      </div>
    )
  }
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {photos.map((photo, i) => (
        <li key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl bg-mist">
          <ImageWithFallback
            src={photo.image_url}
            alt={`Gallery photo ${i + 1}`}
            className="h-full w-full object-cover"
            placeholder={<IconImage className="h-8 w-8" />}
          />
          <button
            type="button"
            onClick={() => onDelete(photo)}
            disabled={busyId === photo.id}
            aria-label={`Remove gallery photo ${i + 1}`}
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-navy/80 text-ice opacity-100 transition-colors hover:bg-red-600 disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100"
          >
            <IconTrash />
          </button>
        </li>
      ))}
    </ul>
  )
}

const FACILITY_FIELDS = ['address', 'directions', 'description', 'phone', 'hours', 'map_url']

export function FacilityEditor({ facility, details, photos, busy, onSaveDetails, onAddPhotos, onDeletePhoto }) {
  const saved = details || {}
  const [form, setForm] = useState(() =>
    Object.fromEntries(FACILITY_FIELDS.map((k) => [k, saved[k] || '']))
  )
  const dirty = FACILITY_FIELDS.some((k) => form[k].trim() !== (saved[k] || ''))
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const id = (key) => `fac-${facility.slug}-${key}`

  return (
    <div className="space-y-6 rounded-xl border border-border bg-ice p-6 md:p-8">
      <div>
        <h3 className="font-display text-lg font-semibold text-navy">{facility.name}</h3>
        <p className="mt-1 text-sm text-steel">Shown on the public Facilities page.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor={id('address')} className="mb-1 block text-xs font-medium text-navy">
            Location / address
          </label>
          <textarea
            id={id('address')}
            rows={2}
            value={form.address}
            onChange={set('address')}
            placeholder="Street, area, town — this is also used for the map"
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={id('directions')} className="mb-1 block text-xs font-medium text-navy">
            How to find it (landmarks, entrance, gate)
          </label>
          <textarea
            id={id('directions')}
            rows={2}
            value={form.directions}
            onChange={set('directions')}
            placeholder="e.g. Opposite the ... , enter through Gate 2"
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={id('description')} className="mb-1 block text-xs font-medium text-navy">
            Description (optional — a default is shown if empty)
          </label>
          <textarea
            id={id('description')}
            rows={3}
            value={form.description}
            onChange={set('description')}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label htmlFor={id('phone')} className="mb-1 block text-xs font-medium text-navy">
            Phone
          </label>
          <input id={id('phone')} type="text" value={form.phone} onChange={set('phone')} className={inputClass} />
        </div>
        <div>
          <label htmlFor={id('hours')} className="mb-1 block text-xs font-medium text-navy">
            Opening hours
          </label>
          <input
            id={id('hours')}
            type="text"
            value={form.hours}
            onChange={set('hours')}
            placeholder="e.g. Mon–Sat, 7am – 6pm"
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={id('map_url')} className="mb-1 block text-xs font-medium text-navy">
            Google Maps link (optional — used for the "Get directions" button)
          </label>
          <input
            id={id('map_url')}
            type="url"
            value={form.map_url}
            onChange={set('map_url')}
            placeholder="https://maps.app.goo.gl/..."
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="button"
        disabled={!dirty || busy}
        onClick={() => onSaveDetails(facility.slug, form)}
        className="btn-primary !py-2.5 !px-5 text-sm disabled:opacity-50"
      >
        Save details
      </button>

      <div className="space-y-4 border-t border-border pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-navy">Photos ({photos.length})</p>
          <UploadButton
            label={busy ? 'Working…' : 'Upload photos'}
            multiple
            disabled={busy}
            onFiles={(files) => onAddPhotos(facility.slug, files)}
          />
        </div>
        <PhotoGrid photos={photos} busyId="" onDelete={onDeletePhoto} />
      </div>
    </div>
  )
}

export default function SiteImagesTab({ user }) {
  const [rows, setRows] = useState([])
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState('banner')
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function fetchRows() {
    const { data, error: loadError } = await supabase
      .from('site_images')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (loadError) {
      setError('Could not load images. Make sure supabase-setup.sql has been run (see SUPABASE-SETUP.md).')
    } else {
      setRows(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    let cancelled = false
    Promise.resolve(
      supabase
        .from('site_images')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true })
    ).then(({ data, error: loadError }) => {
      if (cancelled) return
      if (loadError) {
        setError('Could not load images. Make sure supabase-setup.sql has been run (see SUPABASE-SETUP.md).')
      } else {
        setRows(data || [])
      }
      setLoading(false)
    })
    Promise.resolve(supabase.from('facility_details').select('*')).then(({ data }) => {
      if (cancelled || !data) return
      const map = {}
      for (const row of data) map[row.slug] = row
      setDetails(map)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const rowsFor = (slot) => rows.filter((r) => r.slot === slot).sort(byOrder)

  function fail(err, fallback) {
    setError(err && err.message ? err.message : fallback)
  }

  // Add one or more pictures to a multi-picture slot (banner, gallery).
  async function addImages(slot, folder, files) {
    setError('')
    setMessage('')
    setBusy(`add-${slot}`)
    let added = 0
    try {
      let order = rowsFor(slot).reduce((max, r) => Math.max(max, r.sort_order || 0), 0)
      for (const file of files) {
        const uploaded = await uploadSiteImage(file, folder)
        order += 1
        const { error: insertError } = await supabase.from('site_images').insert({
          slot,
          image_url: uploaded.url,
          image_path: uploaded.path,
          sort_order: order,
          created_by: user.id,
        })
        if (insertError) {
          await removeSiteImageFile(uploaded.path)
          throw new Error('Could not save that image. Please try again.')
        }
        added += 1
      }
      setMessage(`${added} image${added === 1 ? '' : 's'} added.`)
    } catch (err) {
      fail(err, 'Upload failed. Please try again.')
      if (added > 0) setMessage(`${added} image${added === 1 ? '' : 's'} added before the problem occurred.`)
    } finally {
      setBusy('')
      await fetchRows()
    }
  }

  // Set (or replace) the single picture for a slot (a category cover, the About photo).
  async function replaceSingle(slot, folder, file) {
    setError('')
    setMessage('')
    setBusy(`single-${slot}`)
    try {
      const previous = rowsFor(slot)
      const uploaded = await uploadSiteImage(file, folder)
      const { error: insertError } = await supabase.from('site_images').insert({
        slot,
        image_url: uploaded.url,
        image_path: uploaded.path,
        sort_order: 1,
        created_by: user.id,
      })
      if (insertError) {
        await removeSiteImageFile(uploaded.path)
        throw new Error('Could not save that image. Please try again.')
      }
      for (const row of previous) {
        await supabase.from('site_images').delete().eq('id', row.id)
        await removeSiteImageFile(row.image_path)
      }
      setMessage('Photo updated.')
    } catch (err) {
      fail(err, 'Upload failed. Please try again.')
    } finally {
      setBusy('')
      await fetchRows()
    }
  }

  async function resetSingle(slot) {
    if (!window.confirm('Go back to the default photo?')) return
    setError('')
    setMessage('')
    setBusy(`single-${slot}`)
    for (const row of rowsFor(slot)) {
      await supabase.from('site_images').delete().eq('id', row.id)
      await removeSiteImageFile(row.image_path)
    }
    setMessage('Back to the default photo.')
    setBusy('')
    await fetchRows()
  }

  async function deleteRow(row, what) {
    if (!window.confirm(`Remove this ${what}?`)) return
    setError('')
    setMessage('')
    setBusy(row.id)
    const { error: deleteError } = await supabase.from('site_images').delete().eq('id', row.id)
    if (deleteError) {
      setError('Could not remove that image. Please try again.')
    } else {
      await removeSiteImageFile(row.image_path)
      setMessage('Removed.')
    }
    setBusy('')
    await fetchRows()
  }

  async function saveSlideText(slide, values) {
    setError('')
    setMessage('')
    setBusy(slide.id)
    const { error: updateError } = await supabase
      .from('site_images')
      .update({ title: values.title.trim() || null, subtitle: values.subtitle.trim() || null })
      .eq('id', slide.id)
    if (updateError) setError('Could not save that text. Please try again.')
    else setMessage('Slide text saved.')
    setBusy('')
    await fetchRows()
  }

  async function moveSlide(slide, direction) {
    const list = rowsFor(SLOT_BANNER)
    const from = list.findIndex((r) => r.id === slide.id)
    const to = from + direction
    if (from < 0 || to < 0 || to >= list.length) return
    const reordered = list.slice()
    const moved = reordered[from]
    reordered[from] = reordered[to]
    reordered[to] = moved
    setError('')
    setMessage('')
    setBusy(slide.id)
    for (let k = 0; k < reordered.length; k++) {
      if (reordered[k].sort_order !== k + 1) {
        await supabase.from('site_images').update({ sort_order: k + 1 }).eq('id', reordered[k].id)
      }
    }
    setBusy('')
    await fetchRows()
  }

  async function saveFacility(slug, form) {
    setError('')
    setMessage('')
    setBusy(`facility-${slug}`)
    const clean = {}
    for (const key of FACILITY_FIELDS) clean[key] = form[key].trim() || null
    const payload = { slug, ...clean, updated_at: new Date().toISOString() }
    const { error: saveError } = await supabase.from('facility_details').upsert(payload, { onConflict: 'slug' })
    if (saveError) {
      setError('Could not save those details. Make sure supabase-setup.sql has been run, then try again.')
    } else {
      setDetails((prev) => ({ ...prev, [slug]: { ...(prev[slug] || {}), ...payload } }))
      setMessage('Facility details saved.')
    }
    setBusy('')
  }

  const slides = rowsFor(SLOT_BANNER)
  const galleryPhotos = rowsFor(SLOT_GALLERY)
  const aboutRow = rowsFor(SLOT_ABOUT)[0]
  const working = busy !== ''

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-navy">Site images</h2>
        <p className="mt-1 text-sm text-steel">
          Upload the pictures used across the public website. Big phone photos are shrunk automatically
          before upload. Changes appear on the website straight away — no redeploy needed.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-border">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSection(s.id)
              setError('')
              setMessage('')
            }}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 font-display text-sm font-semibold transition-colors duration-200 -mb-px ${
              section === s.id ? 'border-gold text-navy' : 'border-transparent text-steel hover:text-navy'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
      {message ? <p className="text-sm text-brandgreen">{message}</p> : null}

      {loading ? (
        <p className="text-sm text-steel">Loading…</p>
      ) : (
        <>
          {section === 'banner' && (
            <section className="space-y-6 rounded-xl border border-border bg-ice p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display font-semibold text-navy">Home banner slides</h3>
                  <p className="mt-1 max-w-xl text-sm text-steel">
                    Best size: wide landscape, around 1920 × 900 px. Slides play in the order shown. Until
                    you upload at least one, the website shows its built-in slides.
                  </p>
                </div>
                <UploadButton
                  label={busy === 'add-banner' ? 'Uploading…' : 'Upload slide photos'}
                  multiple
                  disabled={working}
                  onFiles={(files) => addImages(SLOT_BANNER, 'banner', files)}
                />
              </div>

              {slides.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-mist/50 p-10 text-center text-sm text-steel">
                  No slides uploaded yet — the website is showing its built-in slides.
                </div>
              ) : (
                <ul className="space-y-4">
                  {slides.map((slide, i) => (
                    <SlideEditor
                      key={slide.id}
                      slide={slide}
                      index={i}
                      total={slides.length}
                      busy={busy === slide.id || (working && busy.startsWith('add-'))}
                      onSave={saveSlideText}
                      onMove={moveSlide}
                      onDelete={(s) => deleteRow(s, 'slide')}
                    />
                  ))}
                </ul>
              )}
            </section>
          )}

          {section === 'categories' && (
            <section className="space-y-6 rounded-xl border border-border bg-ice p-6 md:p-8">
              <div>
                <h3 className="font-display font-semibold text-navy">Category photos</h3>
                <p className="mt-1 max-w-xl text-sm text-steel">
                  The picture on each "What we bring in" card on the Home page. Portrait or square photos
                  work best.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCT_CATEGORIES.map((c) => {
                  const slot = categorySlot(c.slug)
                  const row = rowsFor(slot)[0]
                  return (
                    <SingleImage
                      key={c.slug}
                      title={c.label}
                      hint="Using the built-in default photo"
                      src={row ? row.image_url : c.defaultImage}
                      isCustom={Boolean(row)}
                      busy={busy === `single-${slot}`}
                      onUpload={(file) => replaceSingle(slot, 'categories', file)}
                      onReset={() => resetSingle(slot)}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {section === 'gallery' && (
            <section className="space-y-6 rounded-xl border border-border bg-ice p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display font-semibold text-navy">Gallery photos</h3>
                  <p className="mt-1 max-w-xl text-sm text-steel">
                    Shown in a grid on the public Gallery page. Any shape works.
                  </p>
                </div>
                <UploadButton
                  label={busy === 'add-gallery' ? 'Uploading…' : 'Upload photos'}
                  multiple
                  disabled={working}
                  onFiles={(files) => addImages(SLOT_GALLERY, 'gallery', files)}
                />
              </div>
              <PhotoGrid photos={galleryPhotos} busyId={busy} onDelete={(p) => deleteRow(p, 'photo')} />
            </section>
          )}

          {section === 'facilities' && (
            <div className="space-y-8">
              <p className="max-w-2xl text-sm text-steel">
                For each cold store, add its address and contact details and upload photos. The first
                photo is the large picture on the Facilities page. Leave a field empty to hide it.
              </p>
              {FACILITIES.map((facility) => {
                const slot = facilitySlot(facility.slug)
                return (
                  <FacilityEditor
                    key={facility.slug}
                    facility={facility}
                    details={details[facility.slug]}
                    photos={rowsFor(slot)}
                    busy={busy === `facility-${facility.slug}` || busy === `add-${slot}`}
                    onSaveDetails={saveFacility}
                    onAddPhotos={(slug, files) => addImages(facilitySlot(slug), 'facilities', files)}
                    onDeletePhoto={(photo) => deleteRow(photo, 'photo')}
                  />
                )
              })}
            </div>
          )}

          {section === 'about' && (
            <section className="space-y-6 rounded-xl border border-border bg-ice p-6 md:p-8">
              <div>
                <h3 className="font-display font-semibold text-navy">About page photo</h3>
                <p className="mt-1 max-w-xl text-sm text-steel">
                  The large picture at the top of the About page. Wide landscape works best.
                </p>
              </div>
              <div className="max-w-md">
                <SingleImage
                  title="About page photo"
                  hint="Using the built-in photo"
                  src={aboutRow ? aboutRow.image_url : null}
                  isCustom={Boolean(aboutRow)}
                  busy={busy === `single-${SLOT_ABOUT}`}
                  onUpload={(file) => replaceSingle(SLOT_ABOUT, 'about', file)}
                  onReset={() => resetSingle(SLOT_ABOUT)}
                />
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

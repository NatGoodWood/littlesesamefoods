import { useEffect, useState } from 'react'
import { directors, departments, companyInfo } from '../data/content.js'
import { GALLERY_URL_KEY, DEFAULT_GALLERY_URL } from '../data/settings.js'
import { PersonPhoto } from '../components/UI.jsx'
import { IconGlobe, IconArrow } from '../components/Icons.jsx'

export default function WebsiteAdminTab() {
  const [urlInput, setUrlInput] = useState('')
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem(GALLERY_URL_KEY) || DEFAULT_GALLERY_URL
    setUrlInput(saved)
  }, [])

  function handleSaveGallery(e) {
    e.preventDefault()
    window.localStorage.setItem(GALLERY_URL_KEY, urlInput.trim())
    setSavedMessage('Gallery link updated. The public Gallery page will use this link.')
    setTimeout(() => setSavedMessage(''), 4000)
  }

  return (
    <div className="space-y-12">
      {/* Gallery settings */}
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-1">
          <IconGlobe className="w-5 h-5 text-gold-dark" />
          <h2 className="font-display text-lg font-semibold text-navy">Gallery link</h2>
        </div>
        <p className="text-steel text-sm mb-6">
          Update the Google Photos album link used on the public Gallery page. Changes apply
          immediately, without a redeploy.
        </p>
        <form onSubmit={handleSaveGallery} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://photos.app.goo.gl/..."
            className="flex-1 border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
            required
          />
          <button type="submit" className="btn-primary !py-2.5 shrink-0">
            Save Link <IconArrow />
          </button>
        </form>
        {savedMessage && <p className="mt-3 text-sm text-brandgreen">{savedMessage}</p>}
      </section>

      {/* Directors */}
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">Directors</h2>
        <p className="text-steel text-sm mb-6">
          Shown on the Directors &amp; Team page. To change names, roles or bios, update{' '}
          <code className="bg-mist px-1.5 py-0.5 rounded text-xs">src/data/content.js</code> and
          redeploy.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((d) => (
            <div key={d.name} className="flex items-start gap-3 border-t border-border pt-4">
              <PersonPhoto name={d.name} image={d.image} />
              <div>
                <p className="font-semibold text-navy text-sm">{d.name}</p>
                <p className="text-gold-dark text-xs font-medium">{d.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">Team</h2>
        <p className="text-steel text-sm mb-6">Grouped by department, as shown publicly.</p>
        <div className="space-y-8">
          {departments.map((dept) => (
            <div key={dept.name}>
              <p className="text-sm font-display font-semibold text-navy border-b border-border pb-2 mb-4">
                {dept.name}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dept.members.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <PersonPhoto name={m.name} image={m.image} />
                    <div>
                      <p className="text-sm font-medium text-navy">{m.name}</p>
                      <p className="text-xs text-steel">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company info */}
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">Company info</h2>
        <p className="text-steel text-sm mb-6">Shown in the site footer.</p>
        <dl className="grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <dt className="text-steel text-xs mb-1">Address</dt>
            <dd className="text-navy font-medium">{companyInfo.address}</dd>
          </div>
          <div>
            <dt className="text-steel text-xs mb-1">Phone</dt>
            <dd className="text-navy font-medium">{companyInfo.phone}</dd>
          </div>
          <div>
            <dt className="text-steel text-xs mb-1">Email</dt>
            <dd className="text-navy font-medium">{companyInfo.email}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

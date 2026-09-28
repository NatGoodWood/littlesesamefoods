import { useEffect, useState } from 'react'
import {
  ALERIO_ERP_URL_KEY,
  DEFAULT_ALERIO_ERP_URL,
  ALERIO_HRM_URL_KEY,
  DEFAULT_ALERIO_HRM_URL,
} from '../data/settings.js'
import { IconArrow, IconExternal, IconLayers } from '../components/Icons.jsx'

function AlerioSignIn({ label, urlKey, defaultUrl }) {
  const [urlInput, setUrlInput] = useState('')
  const [activeUrl, setActiveUrl] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    const saved = window.localStorage.getItem(urlKey) || defaultUrl
    setUrlInput(saved)
    setActiveUrl(saved)
  }, [])

  function handleSaveUrl(e) {
    e.preventDefault()
    const trimmed = urlInput.trim()
    window.localStorage.setItem(urlKey, trimmed)
    setActiveUrl(trimmed)
    setIframeKey((k) => k + 1)
    setSavedMessage('Link updated.')
    setTimeout(() => setSavedMessage(''), 4000)
  }

  return (
    <div className="space-y-6">
      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-1">
          <IconLayers className="w-5 h-5 text-gold-dark" />
          <h2 className="font-display text-lg font-semibold text-navy">{label} link</h2>
        </div>
        <p className="text-steel text-sm mb-6">
          Update the {label} login address if it ever changes. Saved instantly, no redeploy needed.
        </p>
        <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 border border-border rounded-sm px-3.5 py-2.5 text-sm text-ink focus:border-gold outline-none"
            required
          />
          <button type="submit" className="btn-primary !py-2.5 shrink-0">
            Save Link <IconArrow />
          </button>
        </form>
        {savedMessage && <p className="mt-3 text-sm text-brandgreen">{savedMessage}</p>}
      </section>

      <section className="bg-ice border border-border rounded-sm p-6 md:p-8">
        <h2 className="font-display text-lg font-semibold text-navy mb-1">Sign in to {label}</h2>
        <p className="text-steel text-sm mb-6">
          Use your regular {label} username and password below — this form belongs to Alerio, not
          to this website. Little Sesame Foods' site never sees or stores that password.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-mist p-4 rounded-sm mb-4">
          <p className="text-navy text-sm">
            If the embedded form below doesn't load, open {label} directly instead:
          </p>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark text-sm !py-2 !px-4 shrink-0"
          >
            Open in New Tab <IconExternal />
          </a>
        </div>

        <div className="rounded-sm overflow-hidden border border-border bg-navy">
          <div className="aspect-[16/10] w-full">
            <iframe
              key={iframeKey}
              src={activeUrl}
              title={`${label} sign-in`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-steel">
          Some systems block being shown inside another page for security reasons. If the box above
          stays blank, that's Alerio's own setting, not a broken link — use "Open in New Tab"
          instead.
        </p>
      </section>
    </div>
  )
}

export default function ErpTab() {
  const [system, setSystem] = useState('erp')

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setSystem('erp')}
          className={`px-4 py-2.5 text-sm font-display font-semibold border-b-2 -mb-px transition-colors duration-200 ${
            system === 'erp' ? 'text-navy border-gold' : 'text-steel border-transparent hover:text-navy'
          }`}
        >
          ERP
        </button>
        <button
          onClick={() => setSystem('hrm')}
          className={`px-4 py-2.5 text-sm font-display font-semibold border-b-2 -mb-px transition-colors duration-200 ${
            system === 'hrm' ? 'text-navy border-gold' : 'text-steel border-transparent hover:text-navy'
          }`}
        >
          HRM / Payroll
        </button>
      </div>

      {system === 'erp' ? (
        <AlerioSignIn key="erp" label="Alerio ERP" urlKey={ALERIO_ERP_URL_KEY} defaultUrl={DEFAULT_ALERIO_ERP_URL} />
      ) : (
        <AlerioSignIn key="hrm" label="Alerio HRM" urlKey={ALERIO_HRM_URL_KEY} defaultUrl={DEFAULT_ALERIO_HRM_URL} />
      )}
    </div>
  )
}

// Key used to persist the Google Photos link in the browser's localStorage
// so it can be updated from /admin without a code change or redeploy.
export const GALLERY_URL_KEY = 'lsf_gallery_url'

// Replace with your real Google Photos shared album link, or update it
// any time from the Staff Portal's Website Admin tab.
// In Google Photos: open the album -> Share -> "Create link" -> copy it.
export const DEFAULT_GALLERY_URL = 'https://photos.app.goo.gl/REPLACE-WITH-YOUR-ALBUM-LINK'

// -----------------------------------------------------------------------
// Departments staff can select when setting up their profile. Keep these
// in sync with the department names in src/data/content.js if you want
// the public Team page and the Staff Portal to read the same way.
// -----------------------------------------------------------------------
export const STAFF_DEPARTMENTS = [
  'Directors',
  'Administration & HR',
  'Accounts & Sales',
  'Facility Supervisors',
]

// -----------------------------------------------------------------------
// Product categories ("What we bring in" + the Products page)
// -----------------------------------------------------------------------
// To add a category later, add one more entry here — it automatically
// appears on the Home page, the Products page, the Stock Listings form and
// the Site Images "Categories" section. `slug` is what's stored in the
// database and used in the web address (/products/<slug>), so keep it
// lowercase with no spaces. `defaultImage` is only used until a photo is
// uploaded for that category from the Staff Portal.
export const PRODUCT_CATEGORIES = [
  {
    slug: 'poultry',
    label: 'Poultry',
    desc: 'Browse through our variety of poultry products.',
    defaultImage: '/wings.jpg',
  },
  {
    slug: 'beef',
    label: 'Beef',
    desc: 'Browse through our variety of beef products.',
    defaultImage: '/beef.jpg',
  },
  {
    slug: 'fish',
    label: 'Fish',
    desc: 'Browse through our variety of fish products.',
    defaultImage: '/mackerel.jpg',
  },
  {
    slug: 'lamb',
    label: 'Lamb',
    desc: 'Browse through our variety of lamb products.',
    defaultImage: '/lamb.jpg',
  },
]

export function getCategory(slug) {
  const key = String(slug || '').trim().toLowerCase()
  return PRODUCT_CATEGORIES.find((c) => c.slug === key)
}

// Older stock rows were saved with display names ("Beef & Meat", "Seafood").
// This maps those onto the current slugs so nothing disappears.
const LEGACY_CATEGORY_NAMES = {
  poultry: 'poultry',
  beef: 'beef',
  'beef & meat': 'beef',
  fish: 'fish',
  seafood: 'fish',
}

export function normalizeCategory(value) {
  const key = String(value || '').trim().toLowerCase()
  return LEGACY_CATEGORY_NAMES[key] || key
}

// -----------------------------------------------------------------------
// Who can do what in the Staff Portal
// -----------------------------------------------------------------------
// Only staff in one of these departments (or anyone with is_admin) can
// add, edit or remove stock listings — per management's request, that's
// Admin & HR / Accounts and Sales. Directors and Operations do not get
// this tab unless they're separately marked as admin.
export const STOCK_MANAGER_DEPARTMENTS = ['Administration & Accounts', 'Sales & Distribution']

export function canManageStock(profile) {
  return Boolean(profile?.is_admin) || STOCK_MANAGER_DEPARTMENTS.includes(profile?.department)
}

// Banner, category photos, gallery and About-page photos change how the
// whole public site looks, so only staff marked is_admin can manage them.
export function canManageSiteImages(profile) {
  return Boolean(profile?.is_admin)
}

// -----------------------------------------------------------------------
// Site images (uploaded from the Staff Portal, stored in Supabase Storage)
// -----------------------------------------------------------------------
export const SITE_IMAGES_BUCKET = 'site-images'
export const SLOT_BANNER = 'banner'
export const SLOT_GALLERY = 'gallery'
export const SLOT_ABOUT = 'about'
export function categorySlot(slug) {
  return `category:${slug}`
}
// Largest photo a staff member can pick (it's shrunk automatically before
// upload, so phone photos are fine).
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024

// -----------------------------------------------------------------------
// Alerio ERP / HRM portal links
// -----------------------------------------------------------------------
// Little Sesame Foods' ERP and HRM/Payroll systems are separate products
// built by a different developer (Alerio) — two different logins, on two
// different addresses. This site does NOT store or check Alerio
// usernames/passwords — staff enter those directly on Alerio's own login
// screens (embedded below, or opened in a new tab), which is the safe way
// to do this without Alerio's developer having to share any backend
// access with this codebase.
//
// You can update either link live from the Staff Portal's "ERP & HRM"
// tab without a redeploy — these are just the defaults new visitors see.
export const ALERIO_ERP_URL_KEY = 'lsf_alerio_erp_url'
export const DEFAULT_ALERIO_ERP_URL = 'https://app.alerioerp.net/auth/login'

export const ALERIO_HRM_URL_KEY = 'lsf_alerio_hrm_url'
export const DEFAULT_ALERIO_HRM_URL = 'https://app-hrm.alerioerp.net/login'

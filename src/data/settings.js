// Key used to persist the Google Photos link in the browser's localStorage
// so it can be updated from /admin without a code change or redeploy.
export const GALLERY_URL_KEY = 'lsf_gallery_url'

// Replace with your real Google Photos shared album link, or update it
// any time from the Staff Portal's Website Admin tab.
// In Google Photos: open the album -> Share -> "Create link" -> copy it.
export const DEFAULT_GALLERY_URL = 'https://dennistemituro.pixieset.com/littlesesamegroupmeeting/'

// -----------------------------------------------------------------------
// Departments staff can select when setting up their profile. Keep these
// in sync with the department names in src/data/content.js if you want
// the public Team page and the Staff Portal to read the same way.
// -----------------------------------------------------------------------
export const STAFF_DEPARTMENTS = [
  'Directors',
  'HR/Admin',
  'Accounts & Sales',
  'Operations',
]

// -----------------------------------------------------------------------
// Stock listings ("What we bring in" on the public Home page)
// -----------------------------------------------------------------------
// These are the categories staff can file stock items under — keep them
// in sync with the category names in src/pages/Home.jsx.
export const PRODUCT_CATEGORIES = [
  'Poultry',
  'Beef & Meat',
  'Seafood',
]

// Only staff in one of these departments (or anyone with is_admin) can
// add, edit or remove stock listings — per management's request, that's
// Admin & HR / Accounts and Sales. Directors and Operations do not get
// this tab unless they're separately marked as admin.
export const STOCK_MANAGER_DEPARTMENTS = ['Administration & HR', 'Accounts & Sales']

export function canManageStock(profile) {
  return Boolean(profile?.is_admin) || STOCK_MANAGER_DEPARTMENTS.includes(profile?.department)
}

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

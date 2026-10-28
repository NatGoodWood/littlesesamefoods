import { supabase } from '../supabase.js'
import { SITE_IMAGES_BUCKET, MAX_UPLOAD_BYTES } from '../data/settings.js'

const EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
}

function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('That image could not be read. Please use a JPG or PNG file.'))
    }
    img.src = url
  })
}

export function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Validates the picked file and shrinks large photos (phone photos are often
// 5-10 MB) so pages load quickly. Never returns something bigger than the original.
export async function prepareImage(file, { maxWidth = 1800, quality = 0.85 } = {}) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG or PNG).')
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`That image is larger than ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB — please choose a smaller one.`)
  }
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file

  const img = await loadImage(file)
  const scale = Math.min(1, maxWidth / img.naturalWidth)
  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) return file

  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale))
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
  if (!blob) return file
  return blob.size < file.size ? blob : file
}

// Uploads one picture to the public site-images bucket.
// folder: 'banner' | 'categories' | 'gallery' | 'about' | 'products'
// Returns { path, url }.
export async function uploadSiteImage(file, folder, options) {
  const body = await prepareImage(file, options)
  const type = body.type || 'image/jpeg'
  const path = `${folder}/${uid()}.${EXTENSIONS[type] || 'jpg'}`

  const { error } = await supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .upload(path, body, { contentType: type, cacheControl: '31536000', upsert: false })

  if (error) {
    throw new Error('Upload failed. Please check your connection and that you have permission, then try again.')
  }

  const { data } = supabase.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(path)
  return { path, url: data.publicUrl }
}

// Deletes a previously uploaded picture. Failures are ignored on purpose:
// a leftover file is harmless, a thrown error mid-cleanup would not be.
export async function removeSiteImageFile(path) {
  if (!path) return
  try {
    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([path])
  } catch (err) {
    // ignore
  }
}

export default function StaffAvatar({ name = '', photoURL, size = 40 }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'

  const dims = { width: size, height: size }

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={name}
        style={dims}
        className="rounded-full object-cover shrink-0 border-2 border-ice shadow-[0_4px_14px_-4px_rgba(6,42,32,0.35)]"
      />
    )
  }

  return (
    <div
      style={dims}
      className="rounded-full bg-navy/10 text-navy flex items-center justify-center font-display font-semibold shrink-0"
    >
      {initials}
    </div>
  )
}

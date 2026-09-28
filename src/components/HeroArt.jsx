export default function HeroArt() {
  return (
    <svg viewBox="0 0 480 480" className="w-full h-auto" role="img" aria-label="Illustration of global frozen food shipping routes">
      <defs>
        <radialGradient id="glow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#0B4433" />
          <stop offset="100%" stopColor="#062A20" />
        </radialGradient>
      </defs>

      <circle cx="240" cy="230" r="170" fill="url(#glow)" stroke="#2E5A47" strokeWidth="1" />

      {/* latitude / longitude lines */}
      <g stroke="#2E5A47" strokeWidth="1" fill="none" opacity="0.8">
        <ellipse cx="240" cy="230" rx="170" ry="60" />
        <ellipse cx="240" cy="230" rx="170" ry="115" />
        <line x1="70" y1="230" x2="410" y2="230" />
        <line x1="240" y1="60" x2="240" y2="400" />
      </g>

      {/* route path */}
      <path
        d="M120 170 Q 200 90 260 150 T 380 190"
        fill="none"
        stroke="#D5B840"
        strokeWidth="2"
        strokeDasharray="1 8"
        strokeLinecap="round"
      />

      {/* origin nodes */}
      <g>
        <circle cx="120" cy="170" r="6" fill="#E8D384" />
        <circle cx="120" cy="170" r="10" fill="none" stroke="#D5B840" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g>
        <circle cx="260" cy="150" r="6" fill="#E8D384" />
        <circle cx="260" cy="150" r="10" fill="none" stroke="#D5B840" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g>
        <circle cx="380" cy="190" r="8" fill="#D5B840" />
        <circle cx="380" cy="190" r="14" fill="none" stroke="#D5B840" strokeWidth="1.4" opacity="0.7" />
      </g>

      {/* crate stack, bottom */}
      <g transform="translate(150,300)">
        <rect x="0" y="0" width="70" height="70" rx="4" fill="#0B4433" stroke="#3E7059" strokeWidth="1.5" />
        <path d="M0 24h70M35 0v70" stroke="#3E7059" strokeWidth="1.5" />
        <rect x="90" y="-24" width="70" height="94" rx="4" fill="#0F5A43" stroke="#D5B840" strokeWidth="1.5" />
        <path d="M90 20h70M125 -24v94" stroke="#D5B840" strokeWidth="1" opacity="0.5" />
        <rect x="-70" y="10" width="55" height="60" rx="4" fill="#0B4433" stroke="#3E7059" strokeWidth="1.5" />
      </g>

      {/* snowflake accents */}
      <g stroke="#D5B840" strokeWidth="1.5" strokeLinecap="round" opacity="0.9">
        <g transform="translate(340,300)">
          <path d="M0 -10v20M-8.6 -5l17.2 10M8.6 -5l-17.2 10" />
        </g>
        <g transform="translate(95,110) scale(0.7)">
          <path d="M0 -10v20M-8.6 -5l17.2 10M8.6 -5l-17.2 10" />
        </g>
      </g>
    </svg>
  )
}

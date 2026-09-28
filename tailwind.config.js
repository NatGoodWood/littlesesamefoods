/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "navy" name kept for minimal diff across components; value is the
        // brand's deep green (darkened for use as a dark section background).
        navy: {
          DEFAULT: '#062A20',
          light: '#0B4433',
          soft: '#0F5A43',
        },
        // true brand green, used for headings/accents on light backgrounds
        brandgreen: '#00674E',
        ice: '#FFFFFF',
        mist: '#F1F3ED',
        steel: '#55645C',
        ink: '#14231D',
        border: '#E1E6DF',
        gold: {
          DEFAULT: '#D5B840',
          dark: '#B89A2E',
          light: '#E8D384',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        frost: 'radial-gradient(circle at 20% 20%, rgba(213,184,64,0.10), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 35%)',
      },
    },
  },
  plugins: [],
}

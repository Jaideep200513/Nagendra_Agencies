/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#06170F', // Ultra-deep evergreen agro-slate
          900: '#0C2317', // Deep forest agro
          850: '#112C1E', // Dark pine
          800: '#173B29', // Forest moss
          700: '#1E4D36', // Rich pine
          600: '#2A6649', // Leaf evergreen
          500: '#3D8662', // Muted tech green
          400: '#5BAE84', // Mint green
          300: '#8FD2B1',
          200: '#C2EADB',
          100: '#E4F6EE',
          50: '#F2FAF6',
        },
        brand: {
          // Agro Tech Green (Primary accent, replaces generic blue)
          blue: '#16A34A',        // Vibrant tech emerald green
          'blue-dark': '#15803D', // Deep emerald green
          'blue-light': '#22C55E',
          green: '#16A34A',
          'green-dark': '#15803D',
          'green-deep': '#0C2317',
          // Paddy Grain Gold (from ripe rice crop image)
          gold: '#F59E0B',        // Ripe paddy ear amber-gold
          'gold-dark': '#D97706',
          'gold-light': '#FDE68A',
          // Nagendra Agencies Logo Saffron / Warm Orange
          orange: '#EA580C',      // Logo saffron orange
          'orange-dark': '#C2410C',
          'orange-light': '#FB923C',
          amber: '#EA580C',
          steel: '#334155',
          metal: '#64748B',
        },
        natural: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#E8E1D5',
          DEFAULT: '#FAF7F2',
          card: '#FEFCFA',
          paper: '#FAF8F5',
          border: '#E8E1D5',
        }
      },
      fontFamily: {
        sans: [
          'var(--font-sf-pro)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '"San Francisco"',
          'system-ui',
          'sans-serif',
        ],
        heading: [
          'var(--font-sf-pro)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          '"San Francisco"',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'industrial': '0 4px 20px -2px rgba(11, 21, 40, 0.12)',
        'industrial-hover': '0 12px 30px -4px rgba(11, 21, 40, 0.20)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

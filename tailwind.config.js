/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        obsidian: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#a8a29e',
          400: '#78716c',
          500: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#141210',
          950: '#0a0908',
        },
        amber: {
          50: '#fdf8ee',
          100: '#faedcd',
          200: '#f5d896',
          300: '#efbf5f',
          400: '#e6a83a',
          500: '#d6912a',
          600: '#b57420',
          700: '#8f591c',
          800: '#74481c',
          900: '#603c1b',
        },
        emerald: {
          50: '#eefbf4',
          100: '#d6f5e3',
          200: '#b0eaca',
          300: '#7bd8a9',
          400: '#46bd85',
          500: '#25a06a',
          600: '#1a8156',
          700: '#186747',
          800: '#17523a',
          900: '#144431',
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'editorial': '0 20px 60px -15px rgba(10, 9, 8, 0.35)',
        'glow-amber': '0 0 40px -8px rgba(230, 168, 58, 0.45)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

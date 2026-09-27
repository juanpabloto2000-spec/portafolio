/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#090a10',
          deep: '#06070a',
          subtle: '#0d0f17',
        },
        tungsten: {
          DEFAULT: '#12141e',
          light: '#181b28',
          border: '#23273a',
        },
        platinum: {
          DEFAULT: '#e2e8f0',
          pure: '#f8fafc',
          muted: '#cbd5e1',
        },
        titanium: {
          DEFAULT: '#94a3b8',
          dark: '#64748b',
        },
        telemetry: {
          emerald: '#10b981',
          crimson: '#ef4444',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'monolith': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'tactical': '0 0 30px -5px rgba(16, 185, 129, 0.15)',
        'alert': '0 0 30px -5px rgba(239, 68, 68, 0.2)',
      }
    },
  },
  plugins: [],
}

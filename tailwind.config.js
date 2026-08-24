/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0a0a0c",
        "surface-elevated": "#121216",
        "surface-card": "#0d0d10",
        platinum: {
          50: "#fcfcfd",
          100: "#f6f6f9",
          200: "#ececf1",
          300: "#dedee6",
          400: "#c3c3cf",
          500: "#a0a0b2",
          600: "#7b7b91",
          700: "#5d5d71",
          800: "#3e3e4e",
          900: "#22222d",
        },
        chrome: {
          light: "#E2E8F0",
          base: "#94A3B8",
          dark: "#475569",
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Cinzel"', '"Syne"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'super-wide': '0.35em',
        'ultra-wide': '0.25em',
        'wide-luxury': '0.15em',
      },
      boxShadow: {
        'metal-glow': '0 0 35px -5px rgba(226, 232, 240, 0.08)',
        'metal-glow-lg': '0 0 70px -10px rgba(226, 232, 240, 0.15)',
        'inner-bezel': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
        'double-bezel': '0 0 0 1px rgba(255, 255, 255, 0.07), 0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metallic-shine': 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 30%, #64748B 70%, #F1F5F9 100%)',
        'dark-metallic': 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

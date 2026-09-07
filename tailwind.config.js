/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aeriva: {
          navy: '#040817',
          charcoal: '#090E1F',
          surface: '#0F162D',
          border: 'rgba(255, 255, 255, 0.08)',
          blue: '#2563EB',
          electric: '#3B82F6',
          cyan: '#06B6D4',
          orange: '#FF6B35', // Warm aviation accent
          amber: '#F59E0B',
          light: '#F8FAFC',
          'light-surface': '#FFFFFF',
          'light-border': '#E2E8F0',
          'light-muted': '#64748B',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widestlabel: '0.22em',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.45)',
        'glow-orange': '0 0 30px -5px rgba(255, 107, 53, 0.4)',
        'card-depth': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'light-card': '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [],
}

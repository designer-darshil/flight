/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F6F2EA',
          50: '#FAF8F4',
          100: '#F6F2EA',
          200: '#EFE9DE',
          300: '#E5DDCF',
        },
        sand: {
          DEFAULT: '#EFE9DE',
          50: '#F7F4EE',
          100: '#EFE9DE',
          200: '#E4DCBE',
        },
        ink: {
          DEFAULT: '#171717',
          muted: '#6F6A61',
          faded: '#9E988D',
        },
        'warm-gray': {
          DEFAULT: '#6F6A61',
          light: '#8C867B',
          border: '#D8D1C5',
          subtle: '#E8E2D7',
        },
        terracotta: {
          DEFAULT: '#C96B45',
          dark: '#B15733',
          light: '#D98461',
          subtle: '#FAF0EB',
        },
        olive: {
          DEFAULT: '#596052',
          dark: '#454B3F',
          light: '#707967',
          subtle: '#F0F2ED',
        },
        champagne: {
          DEFAULT: '#B79B69',
          light: '#CFB88D',
          subtle: '#F7F4EE',
        },
        aeriva: {
          cream: '#F6F2EA',
          sand: '#EFE9DE',
          ink: '#171717',
          terracotta: '#C96B45',
          olive: '#596052',
          champagne: '#B79B69',
          border: '#D8D1C5',
          blue: '#C96B45', // Aliased for smooth migration
          surface: '#FFFFFF',
          charcoal: '#F6F2EA',
          navy: '#F6F2EA',
          electric: '#C96B45',
          cyan: '#C96B45',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', '"Instrument Sans"', 'sans-serif'],
        editorial: ['"Instrument Sans"', 'Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        widestlabel: '0.22em',
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(23, 23, 23, 0.04), 0 1px 2px rgba(23, 23, 23, 0.03)',
        'paper-elevated': '0 20px 40px -15px rgba(23, 23, 23, 0.07), 0 4px 10px -2px rgba(23, 23, 23, 0.03)',
        'terracotta': '0 10px 30px -5px rgba(201, 107, 69, 0.3)',
        'card-depth': '0 25px 50px -12px rgba(23, 23, 23, 0.12)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core AERIVA Color System
        'bg-primary': '#F6F2EA',
        'bg-secondary': '#EFE9DE',
        surface: '#FFFFFF',

        'text-primary': '#171717',
        'text-secondary': '#6F6A61',

        border: '#D8D1C5',

        // Accents
        'accent-warm': '#C96B45',
        'accent-primary': '#963F24',      // Accessible primary accent (> 4.5:1 on white)
        'accent-primary-hover': '#7E331B',
        'accent-secondary': '#596052',    // Deep Olive
        'accent-soft': '#E9DDD3',         // Soft Champagne

        // Semantic Status Colors
        success: '#3F6B4F',
        warning: '#8A5A1F',
        error: '#9B3D32',

        // Palette aliases for seamless template compatibility
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
        paper: '#FFFFFF',
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
          accessible: '#963F24',
          dark: '#963F24',
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
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        editorial: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        '4.5': '18px',
        // 4px base grid scale additions
        '18': '72px',
        '28': '112px',
        '30': '120px',
        '36': '144px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'sm': '0 4px 16px rgba(23, 23, 23, 0.06)',
        'md': '0 12px 32px rgba(23, 23, 23, 0.08)',
        'lg': '0 24px 60px rgba(23, 23, 23, 0.10)',
        'modal': '0 20px 60px rgba(23, 23, 23, 0.12)',
        'drawer': '-20px 0 60px rgba(23, 23, 23, 0.08)',
        // Tactile paper shadows
        'paper': '0 4px 16px rgba(23, 23, 23, 0.06)',
        'paper-elevated': '0 12px 32px rgba(23, 23, 23, 0.08)',
      },
      maxWidth: {
        'desktop': '1280px',
        'extended': '1440px',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      purple: '#2E1B5B',
      lowOpacity: 'rgba(255, 255, 255, 0.3)',
      blue: '#5561D3',
      orange: '#FCB482',
      green: '#56C375',
      salmon: '#FF999A',
      grey: '#D9D9D9',
      white: '#FFFFFF',
      error: '#8C0032',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        VT323: ['VT323', 'monospace'],
      },
      animation: {
        slideRight: 'slideRight 1s ease-in-out',
        slideLeft: 'slideLeft 1s ease-in-out',
        disappear: 'disappear 1s ease-in-out',
        centerToRight: 'centerToRight 1s ease-in-out',
        centerToLeft: 'centerToLeft 1s ease-in-out',
        appear: 'appear 0.5s ease-in-out',
      },
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(85%)', scale: '2' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)', scale: '1' },
          '100%': { transform: 'translateX(-85%)', scale: '2' },
        },
        disappear: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        centerToLeft: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(-150%)', scale: '0.5' },
        },
        centerToRight: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(150%)', scale: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
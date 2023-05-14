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
        slideRightUpScale: 'slideRightUpScale 1s ease-in-out',
        slideLeftUpScale: 'slideLeftUpScale 1s ease-in-out',
        centerToRightDownScale: 'centerToRightDownScale 1s ease-in-out',
        centerToLeftDownScale: 'centerToLeftDownScale 1s ease-in-out',
        disappear: 'disappear 1s ease-in-out',
        appear: 'appear 0.5s ease-in-out',
      },
      keyframes: {
        slideRightUpScale: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(75%)', scale: '2' },
        },
        slideLeftUpScale: {
          '0%': { transform: 'translateX(0)', scale: '1' },
          '100%': { transform: 'translateX(-75%)', scale: '2' },
        },
        centerToRightDownScale: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(150%)', scale: '0.5' },
        },
        centerToLeftDownScale: {
          '0%': { transform: 'translateX(0%)', scale: '1' },
          '100%': { transform: 'translateX(-150%)', scale: '0.5' },
        },
        disappear: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
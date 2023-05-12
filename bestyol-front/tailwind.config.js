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
      }
    },
  },
  plugins: [],
}
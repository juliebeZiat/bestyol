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
      darkLowOpacity: 'rgba(0, 0, 0, 0.5)',
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
        hovering: 'hovering 3s ease-in-out infinite',
        hoveringTest: 'hoveringTest 3s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out 3 1s',
        wiggleInfinite: 'wiggle 2s ease-in-out infinite',
        flash: 'flash 4s ease-out 7s',
        jump: 'jump .5s 2 3s'
      },
      keyframes: {
        hovering: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        hoveringTest: {
          '0%': { transform: 'translate(-50%, -50%) scale(2)' },
          '50%': { transform: 'translate(-50%, -70%) scale(2)' },
          '100%': { transform: 'translate(-50%, -50%) scale(2)' },
        },
        wiggle: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '16%': { transform: 'rotate(-3deg)' },
          '33%': { transform: 'rotate(3deg)' },
        },
        flash: {
          '0%, 100%': { opacity: '0' },
          '5%, 25%': { opacity: '1' },
        },
        jump: {
          '0%, 100%': {
            'transform': 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': {
            'transform': 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
        }
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/themes.ts'
  ],
  theme: {
    colors: {
      purple: '#5561d3',
      lowOpacity: 'rgba(0, 0, 0, 0.3)',
      black: '#000',
      darkLowOpacity: 'rgba(0, 0, 0, 0.6)',
      blue: '#55a0d3',
      accentSuccess: '#d35561',
      salmon: '#FF999A',
      grey: '#D9D9D9',
      white: '#FFFFFF',
      error: '#8C0032',
      gradientBlue: '#647DEE',
      gradientPurple: '#7F53AC',
      yellow: '#d3c755',
      green: '#56C375',
      darkGreen: '#166D3B',
      lightBlue: '#83EAF1',
      darkBlue: '#04619F',
      lightOrange: '#FCB482',
      darkYellow: '#D2A813',
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
        spinScaleDownDisapear: 'spinScaleDownDisapear 3s ease-in-out forwards',
        slideLeftRightQuickly: 'slideLeftRightQuickly 0.2s ease-in-out',
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
        spinScaleDownDisapear: {
          '0%': { transform: 'rotate(0deg)', scale: '1', opacity: '1' },
          '100%': { transform: 'rotate(1440deg)', scale: '0.5', opacity: '0' },
        },
        slideLeftRightQuickly: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(-5%)' },
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
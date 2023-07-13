/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/themes.ts'
  ],
  theme: {
    colors: {
      purple: '#5561d3',
      lowOpacity: 'rgba(0, 0, 0, 0.3)',
      darkLowOpacity: 'rgba(0, 0, 0, 0.6)',
      accentSuccess: '#d35561',
      salmon: '#FF999A',
      grey: '#D9D9D9',
      white: '#FFFFFF',
      error: '#8C0032',
      black: '#000',
      gradientBlue: '#647DEE',
      gradientPurple: '#7F53AC',
      lightGreen1: '#56C375',
      lightGreen2: '#83EAF1',
      darkGreen1: '#71B280',
      darkGreen2: '#134E5E',
      lightBlue1: '#6DD5FA',
      lightBlue2: '#2980B9',
      darkBlue1: '#3498db',
      darkBlue2: '#2c3e50',
      lightYellow1: '#FB7BA2',
      lightYellow2: '#FCE043',
      darkYellow1: '#FFC857',
      darkYellow2: '#C11D38',
      plageBlue: '#55a0d3',
      plageOrange: '#FCB482',
      neutral1: '#16A085',
      neutral2: '#F4D03F',
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
        flashEgg: 'flash 4s ease-out 7s',
        flashEvolve: 'flash 4s ease-out 9s',
        jump: 'jump .5s 2 3s',
        jumpInfinite: 'jumpInfinite 2s infinite',
        explode: 'explode .8s ease-in-out 3',
        evolveOut: 'evolveOut 12s forwards',
        evolveIn: 'evolveIn 12s forwards',
        progressBar: 'progressBar 8s',
      },
      keyframes: {
        hovering: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        hoveringTest: {
          '0%': { transform: 'translate(-50%, 70px) scale(1.5)' },
          '50%': { transform: 'translate(-50%, 90px) scale(1.5)' },
          '100%': { transform: 'translate(-50%, 70px) scale(1.5)' },
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
        },
        jumpInfinite: {
          '0%, 25%, 50%': {
            'transform': 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '12.5%, 37.5%': {
            'transform': 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        explode: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(1turn)' },
        },
        evolveOut: {
          '0%': {
            visibility: 'visible',
            filter: 'brightness(100%)',
            transform: 'scale(1)',
          },
          '16.6%, 33.2%, 41.5%, 49.8%, 53.95%, 58.1%, 62.25%, 66.4%, 68.475%, 70.55%, 72.625%, 74.7%, 76.775%, 78.85%, 80.925%': {
            filter: 'brightness(0%) invert(100%)',
            opacity: '1',
            transform: 'scale(1)',
          },
          '24.9%, 37.35%, 45.65%, 51.875%, 56.025%, 60.175%, 64.325%, 67.4375%, 69.5125%, 71.5875%, 73.6625%, 75.7375%, 77.8125%, 79.8875%, 81.9625%': {
            filter: 'brightness(0%) invert(100%)',
            opacity: '0',
            transform: 'scale(0.25)',
          },
          '83.3%, 100%': {
            visibility: 'hidden',
            filter: 'brightness(0%) invert(100%)',
            opacity: '0',
            transform: 'scale(0.25)',
          }
        },
        evolveIn: {
          '0%, 16.6%, 33.2%, 41.5%, 49.8%, 53.95%, 58.1%, 62.25%, 66.4%, 68.475%, 70.55%, 72.625%, 74.7%, 76.775%, 78.85%, 80.925%': {
            visibility: 'visible',
            filter: 'brightness(0%) invert(100%)',
            opacity: '0',
            transform: 'scale(0.25)',
          },
          '24.9%, 37.35%, 45.65%, 51.875%, 56.025%, 60.175%, 64.325%, 67.4375%, 69.5125%, 71.5875%, 73.6625%, 75.7375%, 77.8125%, 79.8875%, 81.9625%, 96%': {
            filter: 'brightness(0%) invert(100%)',
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            filter: 'brightness(100%)',
            transform: 'scale(1)',
            visibility: 'visible',
          }
        },
        progressBar: {
          '0%': {
            width: '0'
          },
          '100%': {
            width: '100%'
          }
        },
      },
    },
  },
  plugins: [],
}
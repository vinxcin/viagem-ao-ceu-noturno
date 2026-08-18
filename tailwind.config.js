/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          DEFAULT: '#07040d',
          dark: '#030014',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0c842',
        },
        cosmic: {
          purple: '#7042f8',
          darkPurple: '#2A0E61',
        },
        starlight: '#E2D9C8',
      },
      fontFamily: {
        zen: ['Zen Dots', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
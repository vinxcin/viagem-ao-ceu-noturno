/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 2px #7b61ff) drop-shadow(0 0 8px #7b61ff)",
          },
          "50%": {
            filter: "drop-shadow(0 0 6px #61eaff) drop-shadow(0 0 12px #61eaff)",
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
        fly: 'fly 10s infinite',
        slowspin: "spin 6s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite"
      },
      colors: {
        'text-primary': '#FFFFFF',
        'text-secondary': '#60604E',
      },
      screens: {
        "md": "995px",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  plugins: [require("tailwindcss-animate")],
}

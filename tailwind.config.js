/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'space' vai ser a classe que você vai usar no código (font-space)
        space: ['"Space Grotesk"', 'sans-serif'], 
        // Você pode manter uma fonte padrão para os textos menores
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}
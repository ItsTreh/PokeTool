/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'poke-bg': '#1a1a2e',
        'poke-secondary': '#16213e',
        'poke-red': '#e63946',
        'poke-yellow': '#ffd60a',
        'poke-card': '#0f3460',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

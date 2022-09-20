/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif']
      },
      colors: {
        yellow: '#F2B139',
        gray: '#A8BEC9',
        ocean: '#32C5BE',
        ocean_dark: '#1F3640',
        dark: '#192A33',
        very_dark: '#10202A'
      }
    }
  },
  plugins: []
}

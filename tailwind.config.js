/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#f7f5f0',
        charcoal: '#1a1a1a',
        travertine: '#e6dfd5',
        bronze: '#8c7a6b',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
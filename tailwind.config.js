/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BE9A',
        danger: '#AA2113',
        dark: '#333',
        gray: {
          light: '#f5f5f5',
          muted: '#a1a1a1'
        }
      },
      fontFamily: {
        sans: ['"Microsoft YaHei"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

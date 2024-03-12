/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ["IBM Plex Mono", "monospace"],
      second: ["IBM Plex Sans Condensed", "sans-serif"]
    },
    extend: {
      width: {
        main: '1350px',
      },
      backgroundColor: {
        main: '#1A1A1A'
      },
      colors: {
        main: '#1A1A1A'
      },
    },
  },
  plugins: [],
}
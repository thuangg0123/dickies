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
        main: '#1A1A1A',
        overlay: 'rgba(0, 0, 0, 0.6)'
      },
      colors: {
        main: '#1A1A1A'
      },
      gridTemplateColumns: {
        '10': "repeat(10, minmax(0, 1fr))",
        "layout": "200px minmax(900px, 1fr) 100px"
      },
      keyframes: {
        "scale-up-ver-center": {
          "0%": {
            transform: "scale(0.4)"
          },
          "100%": {
            transform: "scale(1)"
          }
        }
      },
      animation: {
        "scale-up-ver-center": "scale-up-ver-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#343331",
        "secondary": "#2D2C2A",
        "additional": "#262523",
        "background": "#31302E",
        "accent-500": {
          '50': '#fff8ec',
          '100': '#ffefd3',
          '200': '#ffdca5',
          '300': '#ffc26d',
          '400': '#ff9c32',
          '500': '#ff7f0a',
          '600': '#fb6400',
          '700': '#cc4802',
          '800': '#a1380b',
          '900': '#82310c',
          '950': '#461604',
      },
        "accent-500-light": "#ffefd3",
        "text": "#fff"
      },
      maxWidth: {
        "container": "1212px",
      }
    },
  },
  plugins: [],
}


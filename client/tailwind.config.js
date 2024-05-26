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
        "accent": "#FB6400",
        "accent-light": "#ffefd3",
        "text": "#fff"
      }
    },
  },
  plugins: [],
}


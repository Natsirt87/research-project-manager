/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
  ],
  theme: {
    colors: {
      "primary": "#165fa0ff",
      "secondary": "#4a6b91",
      "info": "#66c6d2",
      "success": "#00a75c",
      "warning": "#e5cb00",
      "error": "#f60800",
      "light": "#e4e5e6",
      "white": "#ffff",
      "dark": "#0d1215"
    },
  },
  plugins: [],
}

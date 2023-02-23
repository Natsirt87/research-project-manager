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
      "primary": "#63E2B7FF",
      "info": "#70C0E8FF"
    },
  },
  plugins: [],
}

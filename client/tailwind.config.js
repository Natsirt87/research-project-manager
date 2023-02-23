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
      "primary": "#154EC1",
      "secondary": "#666E75",
      "info": "#158DE3",
      "success": "#3D9209",
      "warning": "#FFD43A",
      "danger": "#E42222",
      "light": "#e4e5e6",
      "white": "#ffff",
      "dark": "#0d1215"
    },
  },
  plugins: [],
}

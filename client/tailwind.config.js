/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary' : '#E74646',
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}
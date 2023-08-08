/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': '#F9D949',
        'dark-blue': '#3C486B',
        'light-white': '#F0F0F0',
        'red': '#F45050',
        'green': '#98D8AA'
      },
      height: {
        'header': '12%',
        'body': '88%'
      },
      fontSize: {
        'vsm': '10px'
      },
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        'work_sans': 'Work Sans',
        'pacifico': 'Pacifico'
      }
    },
  },
  plugins: [],
}
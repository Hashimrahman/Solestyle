/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0px 0px 20px 1px #cbd5e1', // Custom offset (5px x, 10px y)
      },

      colors:{
        primary : '#383838',
        secondary : '#fb923c'
      },


      
    },
  },
  plugins: [],
}


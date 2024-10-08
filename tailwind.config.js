/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0px 0px 20px 1px #cbd5e1',
        'custom-shadow-2' : '5px 5px 1px 0px #000000a5'
      },

      colors:{
        primary : '#383838',
        secondary : '#fb923c'
      },


      
    },
  },
  plugins: [],
}


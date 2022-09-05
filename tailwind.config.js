/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'dosis' : ['Dosis', 'sans-serif'],
          'open':['Open Sans', 'sans-serif']
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

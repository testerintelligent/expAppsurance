/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    divideWidth: {
      DEFAULT: '1px',
      '0.25': '0.25px',
    },
    extend: {
      boxShadow: {
        'primary-bs': '-1px 1px 13px 3px rgba(0, 0, 0, 0.15)'
      },
      
      colors: {
        'primary': '#6946C6',
        'primary-h': '#5C3DAD',
        'alert': '#EC4848',
      }
    },
  },
  plugins: [],
}
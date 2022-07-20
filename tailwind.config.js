const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily : {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(1.85em, 1fr))'
      }
    }
  },
  plugins: []
};

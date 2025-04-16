/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fb-optimum': ['Fb Optimum'],
        'Assistant': ["Assistant", 'sans-serif'],
      },
      screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }

        'md': '720px',
        // => @media (min-width: 960px) { ... }

        'lg': '1200px',
        // => @media (min-width: 1440px) { ... }
      },

      fontSize: {
        '4xl': '44.70px', // Custom size for consistency
      },
      lineHeight: {
        'custom': '70.62px', // Custom line height
      },
      colors: {
        'custom-whitesmoke': '#FAFAFE',
        'custom-header-bg': '#F6F6FE',
        'custom-blue': '#433EEA',
        'custom-pink': '#D23759',
        'border-color': '#D23759',
      },
      backgroundImage: {
        'custom-categoryImage': "url('/images/categoriesPageBG.webp')",

      },
      backgroundColor: {
        'overlay-black': 'rgba(0, 0, 0, 0.79)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
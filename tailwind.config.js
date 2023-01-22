/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "Arial", "sans-serif"],
        mono: ['"Source Code Pro"', "Consolas", "mono"],
        poppins: ["Poppins"]
      },
      colors: {
        "js-red": "#F1647B",
        "js-green": "#44EAA0",
        "js-blue": "#59B8DF",
        "js-yellow": "#FED557",
      },
      keyframes: {
        underline: {
          '0%': { width:0},
          '100': { width: "100%" },
        }
      },
      animation: {
        underline: 'underline 1s 4.5s backwards ease-in-out',
      },
      maxWidth: {
        'page': '1200px',
      }
    },
  },
  plugins: [],
};

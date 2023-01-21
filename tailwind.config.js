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
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"Source Code Pro"', "Consolas", "mono"],
      },
      colors: {
        "js-red": "#F1647B",
        "js-green": "#44EAA0",
        "js-blue": "#59B8DF",
        "js-yellow": "#FED557",
      },
    },
  },
  plugins: [],
};

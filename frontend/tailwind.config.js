/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Albert Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
        heading: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        stars: "url('/stars.png')",
        light: "url('/light.jpg')",
        galaxy: "url('/galaxy.jpg')",
      },
      fontSize: {
        xl: "1.375rem", // 22px
        "2xl": "1.5625rem", // 25px
        "3xl": "1.875rem", // 30px
        "4xl": "2.5rem", // 40px
        "5xl": "3.125rem", // 50px
        "6xl": "3.75rem", // 60px
        "7xl": "4.375rem", // 70px
      },
      colors: {
        "js-red": "#F1647B",
        "js-green": "#44EAA0",
        "js-blue": "#59B8DF",
        "js-yellow": "#FED557",
        darkbg: "hsl(190, 14%, 6%)",
        lightbg: "hsl(36, 30%, 99%)",
        text: "#2b2a2a",
        darktext: "hsl(195, 32%, 90%)",
      },
      keyframes: {
        underline: {
          "0%": { width: 0 },
          100: { width: "100%" },
        },
      },
      animation: {
        // underline: "underline 1s 7.5s backwards ease-in-out",
      },
      maxWidth: {
        page: "1350px",
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.darktext"),
            "--tw-prose-headings": theme("colors.darktext"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};

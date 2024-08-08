/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: [
    "variant",
    ["@media (prefers-color-scheme:dark) { &:not(.light *) }", "&:is(.dark *)"],
  ],
  theme: {
    fontFamily: {
      sans: ["'Inter'", "sans-serif"],
      serif: ["'Lora'", "serif"],
      mono: ["'Inconsolata'", "monospace"],
    },
    fontSize: {
      sm: ["14px", "17px"],
      base: ["18px", "24px"],
      lg: ["20px", "24px"],
      xl: ["24px", "29px"],
      "2xl": ["64px", "77px"],
    },
    colors: {
      black: "#050505",
      white: "#FFFFFF",
      red: "#FF5252",
      purple: "#A445ED",
      gray: {
        800: "#1F1F1F",
        700: "#2D2D2D",
        600: "#3A3A3A",
        500: "#757575",
        400: "#E9E9E9",
        200: "#F4F4F4",
      },
    },
  },
  plugins: [],
};

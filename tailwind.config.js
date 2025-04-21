/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#132A13",
        secondary: "#FEFAE0",
        accent: "#D4A276",
        background: "#F1F4F8",
        surface: "#FFFFFF",
        text: "#1C1C1C",
        card_background: "#FFFFFF"
      }
    },
  },
  plugins: [],
}
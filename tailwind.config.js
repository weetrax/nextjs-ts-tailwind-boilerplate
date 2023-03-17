/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cceaf0",
          200: "#99d5e0",
          300: "#66c1d1",
          400: "#33acc1",
          500: "#0097b2",
          600: "#00798e",
          700: "#005b6b",
          800: "#003c47",
          900: "#001e24"
        },
        dark: {
          100: "#d0d1d2",
          200: "#a2a3a4",
          300: "#737477",
          400: "#454649",
          500: "#16181c",
          600: "#121316",
          700: "#0d0e11",
          800: "#090a0b",
          900: "#040506"
},
      }
    },
  },
  plugins: [],
}

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
          100: "#d3d3d3",
          200: "#a6a6a6",
          300: "#7a7a7a",
          400: "#4d4d4d",
          450: "#373737",
          500: "#212121",
          600: "#1a1a1a",
          700: "#141414",
          800: "#0d0d0d",
          900: "#070707"
        },    
      }
    },
  },
  plugins: [],
}

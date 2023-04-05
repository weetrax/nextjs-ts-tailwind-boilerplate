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
          100: "#cfcfcf",
          200: "#9e9e9e",
          300: "#6e6e6e",
          400: "#3d3d3d",
          450: "#191919",
          500: "#0d0d0d",
          600: "#0a0a0a",
          700: "#080808",
          800: "#050505",
          900: "#030303"
},
      }
    },
  },
  plugins: [],
}

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
          100: "#e0e0fc",
          200: "#c1c2f9",
          300: "#a2a3f7",
          400: "#8385f4",
          500: "#6466f1",
          600: "#5052c1",
          700: "#3c3d91",
          800: "#282960",
          900: "#141430"
},
      }
    },
  },
  plugins: [],
}

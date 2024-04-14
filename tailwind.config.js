/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          50: "#F3F2FF",
          100: "#EAE7FF",
          200: "#D7D2FF",
          300: "#BAAEFF",
          400: "#9880FF",
          500: "#794DFF",
          600: "#773DFF",
          700: "#5A16EB",
          800: "#4C12C5",
          900: "#3F11A1",
          950: "#24076E",       
      },
      minHeight: {
        "90vh": "90vh",
        "80vh": "80vh",
        "50vh": "50vh",
        "40vh": "40vh",
        "30vh": "30vh",
      },
      maxHeight: {
        "400px": "400px",
      }
    },
  },
  plugins: [],
}
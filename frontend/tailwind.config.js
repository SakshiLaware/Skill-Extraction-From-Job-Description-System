/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4fb", 100: "#d9e7f6", 500: "#3b6ea5", 600: "#2f5883", 900: "#1c3550",
        },
      },
    },
  },
  plugins: [],
};

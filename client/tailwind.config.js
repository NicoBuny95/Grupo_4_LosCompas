/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "los-compas": "url('/src/images/compas.png')",
      },
      screens: {
        sx: "320px",
      },
    },
  },
  plugins: [],
};

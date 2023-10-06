/** @type {import('tailwindcss').Config} */
import { tailwindStyle } from "./src/styles/tailwindStyle";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { ...tailwindStyle },
  },
  plugins: [],
};

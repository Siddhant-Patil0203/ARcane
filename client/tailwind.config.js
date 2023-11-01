// import nextui from "@nextui-org/react";
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#eaf1f5',
        'background': '#030607',
        'primary': '#7b83c1',
        'secondary': '#1e152d',
        'accent': '#7d5cb2',
       },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  
};

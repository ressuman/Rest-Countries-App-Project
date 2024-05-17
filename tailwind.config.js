/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "658px",
      lg: "1155px",
      mdcg: "640px",
      lgcg: "940px",
      xl: "1280px",
    },
    colors: {
      "dark-blue": "#2b3945",
      "very-dark-blue-dm": "	#202c37",
      "very-dark-blue-lm": "	#111517",
      "dark-gray": "#858585",
      "very-light-gray": "	#fafafa",
      white: "	#ffffff",
    },
    fontFamily: {
      "nunito-normal": ["Nunito Sans", "sans-serif"],
    },
    extend: {
      boxShadow: {
        "dark-shadow-xl": "0 35px 60px -15px rgba(0, 0, 0, 0.7)",
        "dark-shadow-lg": "0 35px 60px -15px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

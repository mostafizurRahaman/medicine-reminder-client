/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: "#ffffff",
            secondary: "#000000",
            accent: "#2490EB",
            info: "#295586",
            // warn: "",
         },
      },
   },
   plugins: [],
};

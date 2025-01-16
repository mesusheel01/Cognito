/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../apps/client/**/*.{js,ts,jsx,tsx}", // Add path for the React app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "../../apps/client/**/*.{js,ts,jsx,tsx}", // Add path for the React app
  ],
  theme: {
    extend: {

        colors: {
            backCol: '#F9FDFC',
            myGreen: '#50C6B0',
            myBlack: '#000000',
            myBlue: "#92B8DC",
            myBg:"#bcd4eb",
            buttonBg:"#ED9390",
            signBg: "#D9D9D9"
        },
        fontFamily: {
            play:['Play', 'sans-serif'],
            poppins: ['Poppins', 'sans-serif'],
            overpass: ['Overpass', 'sans-serif'],
            overpassMono: ['Overpass Mono', 'sans-serif'],
            pollerOne: ['Poller One', 'sans-serif'],
            princessSofia: ['Princess Sofia', 'sans-serif'],
            suse: ['SUSE', 'sans-serif'],
        },
    },
  },
  plugins: [],
};

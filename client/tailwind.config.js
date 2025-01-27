import withMT from "@material-tailwind/react/utils/withMT";


/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        playwrite: ['Playwrite NZ', 'sans-serif'],
        sourGummy: ['Sour Gummy', 'sans-serif'],
        menuWrite: ['Playwrite IS', 'sans'],
        'ibm': '"IBM Plex Sans", sans-serif'
      },
      backgroundColor:{
        primary: '#0000A3',
        modal: 'rgba(128, 128, 128, 0.5)',
        secondary: '#4B7BF5'
      },

      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
       'slide-right': {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(0%)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        pulse: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.30s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-in-out',
        'slide-right': 'slide-right 0.3s ease-in-out',
        'slide-left': 'slide-left 0.3s ease-in-out',
        pulse: "pulse 1.5s ease-in-out infinite",

      }
    },
  },
  plugins: [],
})


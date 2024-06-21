/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        playwrite: ['Playwrite NZ', 'sans-serif'],
        menuWrite: ['Playwrite IS', 'sans']
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
      animation: {
        'slide-down': 'slide-down 0.30s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}


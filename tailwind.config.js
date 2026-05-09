/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        umBlue: '#00274c',
        umMaize: '#ffcb05',
      },
    },
  },
  plugins: [],
}

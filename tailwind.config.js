/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}' // ← JSX/TSX を含めるのを忘れずに
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'cursive']
      }
    }
  },
  plugins: []
};

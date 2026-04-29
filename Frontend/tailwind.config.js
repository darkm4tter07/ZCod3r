/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        yellowgreen: '#9ACD32',
      },
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar":{
          display: "none",
        },
        '.no-scrollbar':{
          '-ms-overflow-style':'none',
          'scrollbar-width': "none",
        }
      };
      addUtilities(newUtilities);
    }

  ],
}


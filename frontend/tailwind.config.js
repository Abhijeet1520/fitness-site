/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
            "secondary": "#f97316",
          },
        },
      ],
    },
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
      },
      borderRadius: {
        '7': '7px',
      },
      colors: {
        // 'primary': '#FF6363',
        'secondary': 'orange',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-light': '#3b82f6',
        'primary-dark': '#1e40af',
        secondary: '#14b8a6',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

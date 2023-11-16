/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'gray-100': '#FBF9FE',
        'gray-200': '#322F40',
        'gray-300': '#282533',
        'gray-400': '#1D1B26',
        'gray-500': '#0F0E13',
        blue: '#7FC4ED',
        'blue-light': '#659ABA',
      },
      fontSize: {
        'heading-xl': '24px',
        'heading-lg': '24px',
        title: '16px',
        card: '20px',
        timer: '32px',
        modal: '24px',
      },
      fontWeight: {
        light: '300',
        semibold: '600',
        medium: '500',
        regular: '400',
      },
    },
  },
  plugins: [require('daisyui')],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Londrina Solid', 'cursive']
    },
    colors: {
      transparent: 'transparent',
      background: '#F2F2F2',
      white: {
        DEFAULT: '#FFFFFF',
        dark: '#EBE8E3'
      },
      black: {
        DEFAULT: '#000000',
        text: '#221B1A'
      },
      blue: '#3757FF',
      sky: '#B1D9FE',
      red: {
        DEFAULT: '#FF1F3D',
        background: '#F4CED4'
      },
      yellow: {
        DEFAULT: '#FFC700',
        background: '#F0F3B3'
      },
      orange: '#FFA800',
      purple: '#C24CFE',
      fuchsia: '#DB00FF',
      pink: '#ff638e',
      green: {
        DEFAULT: '#1CC500',
        background: '#B2F5CB'
      },
      teal: '#A6FFDA',
      grey: {
        light: '#C7C7C7',
        DEFAULT: '#7D7D7D',
        dark: '#616161'
      },
      brand: {
        twitter: '#1da1f2',
        instagram: '#e1306c',
        facebook: '#4267b2',
        discord: '#5865F2'
      }
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

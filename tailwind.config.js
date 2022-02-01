const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Barlow Semi Condensed']
    },
    extend: {
      colors: {
        dark: '#3b4363',
        score: '#2a46c0',
        'header-outline': '#606e85',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, #1f3756, #141539)',
      }
    },
  },
  plugins: [],
});
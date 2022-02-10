const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Barlow Semi Condensed', 'Barlow Condensed', 'Bellefair']
    },
    extend: {
      colors: {
        dark: '#3b4363',
        score: '#2a46c0',
        'header-outline': '#606e85',

        space: {
          black: '#0B0D17',
          'gray-purple': '#D0D6F9', 
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, #1f3756, #141539)',
        'space-home-desktop': "url('/src/assets/images/space/home/background-home-desktop.jpg')",
      }
    },
  },
  plugins: [],
});
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
        'heading-color': '#D0D6F9',

        space: {
          black: '#0B0D17',
          'gray-purple': '#D0D6F9', 
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, #1f3756, #141539)',

        'space-home-desktop': "url('/src/assets/images/space/home/background-home-desktop.jpg')",
        'space-home-tablet': "url('/src/assets/images/space/home/background-home-tablet.jpg')",
        'space-home-mobile': "url('/src/assets/images/space/home/background-home-mobile.jpg')",
        'space-destination-desktop': "url('/src/assets/images/space/destination/background-destination-desktop.jpg')",
        'space-destination-tablet': "url('/src/assets/images/space/destination/background-destination-tablet.jpg')",
        'space-destination-mobile': "url('/src/assets/images/space/destination/background-destination-mobile.jpg')",
        'space-crew-desktop': "url('/src/assets/images/space/crew/background-crew-desktop.jpg')",
        'space-crew-tablet': "url('/src/assets/images/space/crew/background-crew-tablet.jpg')",
        'space-crew-mobile': "url('/src/assets/images/space/crew/background-crew-mobile.jpg')",
        'space-technology-desktop': "url('/src/assets/images/space/technology/background-technology-desktop.jpg')",
        'space-technology-tablet': "url('/src/assets/images/space/technology/background-technology-tablet.jpg')",
        'space-technology-mobile': "url('/src/assets/images/space/technology/background-technology-mobile.jpg')",
      }
    },
  },
  plugins: [],
});
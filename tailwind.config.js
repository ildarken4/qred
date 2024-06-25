const options = require("./config"); //options from config.js

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#191919',
        black_02: 'rgba(0, 0, 0, 0.2)',

        dark_accent: '#D7AB50',
        accent: '#F1C025',

        gray_text: '#666666',
        darkgray: '#D9D9D9',
        gray_015: 'rgba(163, 163, 163, 0.15)',
        gray: '#EDEDED',
        lightgray: '#F4F5F7',

        red: '#DD2525',
        lightred: '#FF0000',
        red_75: 'rgba(255, 0, 0, 0.75)',

        green: '#6BD390',
        lightgreen: '#6BD390',
        green_80: 'rgba(107, 211, 144, 0.80)',

        blue_text: '#0E174A',
        blue: '#0E174A',
        darkblue: '#394D69',
        blue_08: 'rgba(14,23,74,.8)',
        blue_01: 'rgba(14,23,74,.1)',

        purple: '#312D4B',
      },
      backgroundImage: {
        'account-banner': "url('../img/backgrounds/banner-background.png')",
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'banner': '25%'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          lg: '991px',
          xl: '1280px',
          '2xl': '1500px',
        },
      },
    },
  },
  plugins: plugins,
};

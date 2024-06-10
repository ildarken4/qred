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

        green: '#6BD390',
        lightgreen: '#6BD390',

        blue_text: '#0E174A',
        blue: '#0E174A',
        darkblue: '#394D69',
        blue_08: 'rgba(14,23,74,.8)',

        purple: '#312D4B',
      },
      backgroundImage: {
        'account-banner': "url('/img/backgrounds/banner-background.svg')",
      }
    },
  },
  plugins: plugins,
};

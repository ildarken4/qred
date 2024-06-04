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
        white: 'rgba(255, 255, 255, 1)',
        black: 'rgba(21, 21, 21, 1)',
        black_02: 'rgba(0, 0, 0, 0.2)',

        error: 'rgba(255, 0, 0, 1)',

        dark_accent: 'rgba(82, 17, 36, 1)',
        accent: 'rgba(205, 39, 89, 1)',

        darkgrey: '#A3A3A3',
        grey_015: 'rgba(163, 163, 163, 0.15)',
        grey: 'rgba(163, 163, 163, 1)',
        lightgrey: 'rgba(245, 245, 245, 1)',

        darkgreen: '#6BD390',
        green: 'rgba(107, 211, 144, 1)',

        orange: '#FCAA75',
      },
    },
  },
  plugins: plugins,
};

module.exports = {
  mode: 'jit',

  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      dark70: 'rgba(0,0,0,.7)',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

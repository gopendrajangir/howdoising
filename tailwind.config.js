module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '2md': { max: '910px' },
        '2xl': { min: '1536px' },
      },
    },
  },
  plugins: [],
};

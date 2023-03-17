const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [require("tailwindcss-inner-border")],
};

module.exports = config;

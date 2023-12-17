const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      mainRed: "#FE5E48",
      dark: "#212429",
      light: "#F7F8FA",
      body: "#2C3033",
      mainYellow: "#D7B297",
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FE5E48",
          secondary: "#D7B297",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Helvetica"],
      body: ['"Open Sans"'],
    },
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "scroll-infinite": "15 s scroll alternate infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};

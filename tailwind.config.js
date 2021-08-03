const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twblue: "#1DA1F2",
        twblack: "#14171A",
        twgray: "#657786",
        "twgray-lt": "#AAB8C2",
        "twgray-xlt": "#E1E8ED",
        "twgray-xxlt": "#F5F8FA",
      },
      borderWidth: {
        1: "1px",
        10: "10px",
        11: "11px",
      },
      maxHeight: {
        "90vh": "90vh",
      },
      minHeight: {
        600: "600px",
      },
      flex: {
        basis: "0 0 100%",
      },
    },
  },
  variants: {
    extend: {
      pointerEvents: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
          background: "transparent",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".word-wrap": {
          "word-wrap": "anywhere",
        },
        ".single-border": {
          "border-color": "transparent #1DA1F2 transparent transparent",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

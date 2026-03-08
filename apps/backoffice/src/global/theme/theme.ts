export const theme = {
  extend: {
    tokens: {
      colors: {
        amcoeurRose: { value: "#e11d48" },
        amcoeurPale: { value: "#fda4af" },
        amcoeurDark: { value: "#1e1e1e" },
        amcoeurDeepRose: { value: "#1a050a" },
        white: { value: "#ffffff" },
      },
      fonts: {
        body: { value: "var(--font-roboto), sans-serif" },
        heading: { value: "var(--font-playfair), serif" },
        dancing: { value: "var(--font-dancing), cursive" },
      },
      fontSizes: {
        header: { value: "24px" },
        subHeader: { value: "24px" },
        body: { value: "16px" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          main: { value: "{colors.amcoeurDark}" },
          sidebar: { value: "{colors.amcoeurDeepRose}" },
        },
        text: {
          main: { value: "{colors.white}" },
          accent: { value: "{colors.amcoeurRose}" },
          pale: { value: "{colors.amcoeurPale}" },
        },
      },
    },
    keyframes: {
      spin: { "from": { transform: "rotate(0deg)" }, "to": { transform: "rotate(360deg)" } },
    },
  },
};

export default theme;

export const theme = {
  extend: {
    tokens: {
      colors: {
        textPrimary: { value: "#333333" },
        textSecondary: { value: "#FFFFF0" },
        pinkExtraLight: { value: "#FFF0F5" },
        pinkLight: { value: "#FFC0CB" },
        pinkMedium: { value: "#FF69B4" },
        pinkBright: { value: "#FF1493" },
        white: { value: "#FFFFFF" },
        whiteIcy: { value: "#F5FFFA" },
        paleGrey: { value: "#F0F0F0" },
        veryPaleGrey: { value: "#F5F5F5" },
        creamWhite: { value: "#FFFFF0" },
        greenish: { value: "#004040 " },
        palePurple: { value: "#E6E6FA " },
        pinkGold: { value: "#FFD700  " },
        skyBlue: { value: "#87CEFA  " },
      },
      fonts: {
        body: { value: "var(--font-roboto), sans-serif" },
        heading: { value: "var(--font-playfair), serif" },
      },
      fontSizes: {
        header: { value: "24px" },
        body: { value: "16px" },
      },
    },
    semanticTokens: {
      colors: {
        buttons: {
          primary: {
            background: { value: "{colors.pinkMedium}" },
            text: { value: "{colors.white}" },
            backgroundHover: { value: "{colors.white}" },
            textHover: { value: "{colors.pinkMedium}" },
          },
          widget: {
            background: { value: "{colors.pinkBright}" },
            backgroundHover: { value: "{colors.pinkMedium}" },
            text: { value: "{colors.white}" },
          },
        },
        backgrounds: {
          primary: {
            extraLight: { value: "{colors.pinkExtraLight}" },
            light: { value: "{colors.pinkLight}" },
            medium: { value: "{colors.pinkMedium}" },
            intense: { value: "{colors.pinkBright}" },
          },
          secondary: {
            light: { value: "{colors.white}" },
            medium: { value: "{colors.paleGrey}" },
            intense: { value: "{colors.palePurple}" },
          },
          tertiary: {
            light: { value: "{colors.pinkGold}" },
            medium: { value: "{colors.skyBlue}" },
            intense: { value: "{colors.greenish}" },
          },
        },
      },
    },
  },
};

export default theme;

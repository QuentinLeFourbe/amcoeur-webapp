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
        dancing: { value: "var(--font-dancing)" },
      },
      fontSizes: {
        header: { value: "24px" },
        medium: { value: "20px" },
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
        input: {
          secondary: {
            text: { value: "{colors.pinkLight}" },
            textHover: { value: "{colors.pinkMedium}" },
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
    keyframes: {
      panelFadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      panelFadeOut: {
        "0%": { opacity: "1" },
        "100%": { opacity: "0", display: "none" },
      },
      rotate: {
        "100%": { transform: "rotate(1turn)" },
      },
      l12: { "100%": { clipPath: "inset(0 -30px 0 0)" } },
    },
  },
};

export default theme;

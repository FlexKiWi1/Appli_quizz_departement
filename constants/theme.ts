import type { Theme } from "@react-navigation/native";

const AppTheme: Theme = {
  dark: true,
  colors: {
    primary: "#2DCC93",
    background: "#0E0B04",
    card: "#262626",
    text: "#FFFFFF",
    border: "#262626",
    notification: "#262626",
  }
}

const COLORS = {
  primary: "#2DCC93",
  white: "#FFFFFF",
  grayLight: "#9A9A9A",
  grayDarkMedium: "#363636",
  grayDark: "#262626",
  black: "#0E0B04",
  success: "#34C759",
  error: "#FF3B30"
};

const FONT = {
  light: "Poppins_300Light",
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  bold: "Poppins_700Bold",
  extraBold: "Poppins_800ExtraBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

export { AppTheme, COLORS, FONT, SIZES };

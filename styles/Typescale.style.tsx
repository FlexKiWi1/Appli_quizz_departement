import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const typescaleStyle = StyleSheet.create({
    h1: {
        fontSize: SIZES.xxLarge + SIZES.xxLarge / 2,
        fontWeight: "700",
        color: COLORS.white
    },
    h2: {
        fontSize: SIZES.xLarge,
        color: COLORS.white
    },
    h3: {
        fontSize: SIZES.large,
        color: COLORS.white
    },
    h4: {
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    default: {
        fontSize: SIZES.small,
        color: COLORS.white
    },
    small: {
        fontSize: SIZES.xSmall,
        color: COLORS.white
    },
    centered: {
        textAlign: "center",
    }
})
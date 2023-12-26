import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS, SIZES } from '../../constants/theme';

type ButtonProps = {
    title: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
} & TouchableOpacity["props"];

export default function Button({title, iconLeft, iconRight, ...props}: ButtonProps) {
  return (
    <TouchableOpacity style={[props.style, styles.container, !iconLeft && !iconRight && {justifyContent: "center"}]} {...props}>
        {iconLeft && iconLeft}
        <Text style={styles.text}>{title}</Text>
        {iconRight && iconRight}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 100,
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontWeight: "600"
    }
})
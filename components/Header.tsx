import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'


type HeaderProps = {
    title: string;
    subtitle?: string;
}

export default function Header({title, subtitle}: HeaderProps) {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        right: 0,
        width: Dimensions.get("window").width - SIZES.xxLarge,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: SIZES.large,
        color: COLORS.white
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.white
    }
})
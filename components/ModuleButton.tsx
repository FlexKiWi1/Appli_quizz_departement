import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import { Module } from '../types'
import { COLORS, SIZES } from '../constants/theme'
import { typescaleStyle } from '../styles/Typescale.style'
import { Feather } from '@expo/vector-icons';

type ModuleButtonProps = {
    module: Module,
    onPress: TouchableOpacity["props"]["onPress"]
}

export default function ModuleButton({module, onPress}: ModuleButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={module.iconSource} />
      <Text style={[typescaleStyle.h3, styles.text]}>{module.name}</Text>
      {/* <Feather name='arrow-right' size={SIZES.large} color={COLORS.white} /> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        backgroundColor: COLORS.grayDark,
        borderRadius: 100,
        marginBottom: SIZES.medium
    },
    image: {
        width: SIZES.xxLarge,
        height: SIZES.xxLarge,
        marginRight: SIZES.medium,
        borderRadius: 100
    },
    text: {
        fontWeight: "600",
    }
})
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import { Module } from '../types'
import { COLORS, SIZES } from '../constants/theme'
import { typescaleStyle } from '../styles/Typescale.style'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'

type ModuleButtonProps = {
  module: Module,
  onPress: TouchableOpacity["props"]["onPress"]
}

export default function ModuleButton({ module, onPress }: ModuleButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <LinearGradient style={styles.gradient} colors={[COLORS.grayDark, "transparent"]} start={[0, 1]}> */}
        {/* <View style={{ position: "absolute", top: 0, elevation: -1 }}>
          <Image style={styles.imageBlur} source={module.iconSource} blurRadius={30} resizeMode='cover' />
        </View> */}
        <Image style={styles.image} source={module.iconSource} />
        <Text style={[typescaleStyle.h3, styles.text]}>{module.name}</Text>
      {/* <Feather name='arrow-right' size={SIZES.large} color={COLORS.white} /> */}
      {/* </LinearGradient> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.grayDark,
    borderRadius: 100,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
  gradient: {
    // flexDirection: "row",
    // alignItems: "center",
    // paddingVertical: SIZES.small,
    // paddingHorizontal: SIZES.medium,
  },
  image: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    marginRight: SIZES.medium,
    borderRadius: 100,
  },
  imageBlur: {
    width: 500,
    top: 0,
    position: "absolute",
  },
  text: {
    fontWeight: "600",
  }
})
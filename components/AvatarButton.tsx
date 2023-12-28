import { StyleSheet, Text, Image, TouchableOpacity, View, ImageProps, ImageSourcePropType } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'


type AvatarButtonProps = {
  source: ImageSourcePropType,
} & TouchableOpacity["props"];

export default function AvatarButton({ source, ...props }: AvatarButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image style={styles.image} source={source} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: SIZES.large,
    backgroundColor: COLORS.grayDarkMedium,
    borderRadius: 100,
    position: "absolute",
    elevation: 2,
  },
  image: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
    borderRadius: 100,
  }
})
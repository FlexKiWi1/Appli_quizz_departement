import { StyleSheet, Text as DefaultText, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

export default function Text({...props}: DefaultText["props"]) {
  return <DefaultText style={[styles.text, props.style]} {...props}>{props.children}</DefaultText>
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.white
    }
})
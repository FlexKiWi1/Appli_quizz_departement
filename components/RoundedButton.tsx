import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS, SIZES } from '../constants/theme'

type RoundedButtonProps = {
    children: ReactNode,
} & TouchableOpacity["props"];

const RoundedButton = ({children, ...props}: RoundedButtonProps) => {
  return (
    <TouchableOpacity {...props} style={[props.style, styles.container]}>
        {children}
    </TouchableOpacity>
  )
}

export default RoundedButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.grayDark,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }
})
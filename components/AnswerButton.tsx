import { TouchableOpacity, StyleSheet, View, Text, GestureResponderEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants/theme';
import { typescaleStyle } from '../styles/Typescale.style';

type AnswerButtonProps = {
    title: string;
    isAnswered: boolean;
    isRightAnswer: boolean;
} & TouchableOpacity["props"]

const AnswerButton = ({title, isAnswered, isRightAnswer, onPress, ...props}: AnswerButtonProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const color = isRightAnswer ? {backgroundColor: COLORS.success} : {backgroundColor: COLORS.error}
  const showColor = isClicked || (isAnswered && isRightAnswer)

  useEffect(() => {
    if (!isAnswered) {
      setIsClicked(false)
    }
  }, [isAnswered])

  const onPressHandler = (event: GestureResponderEvent) => {
    if (!isAnswered) {
      setIsClicked(() => true)
      onPress?.(event)
    }
  }

  return (
    <TouchableOpacity style={[styles.container, showColor && color]} onPress={e => onPressHandler(e)} {...props}>
      <Text style={typescaleStyle.h2}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 120,
        backgroundColor: COLORS.grayDarkMedium,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: "center",
        margin: 10
    }
})

export default AnswerButton

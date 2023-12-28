import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import Text from './Text';
import icons from '../constants/icons';
import { COLORS, SIZES } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Quiz } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuiz } from '../contexts/QuizContext';

type QuizButtonProps = {
  quiz: Quiz;
  onPress: TouchableOpacity["props"]["onPress"];
}

export default function QuizButton({quiz, onPress}: QuizButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient style={styles.container} start={[0, 0.5]} colors={[COLORS.grayDark, COLORS.grayDark]}>
        <Text style={styles.quizNameText}>{quiz.name}</Text>
        <View style={styles.levelContainer}>
            <Text style={styles.levelText}>{quiz.level}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.grayDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 20,
  },
  levelContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.grayDarkMedium,
    borderRadius: 100,
  },
  levelText: {
    fontSize: SIZES.medium,
    fontWeight: "700",
    color: COLORS.white
  },
  quizNameText: {
    fontSize: SIZES.medium,
    color: COLORS.white
  },
  arrow: {

  }
})